/* Leads from the website's "Have a project in mind?" brief.
 *
 * POST /api/leads              save a brief (public)
 * GET  /api/leads              list briefs, newest first (needs the X-Leads-Code header)
 * DELETE /api/leads?id=<id>    remove one brief (needs the X-Leads-Code header)
 *
 * Storage is Upstash Redis over its REST API. Connect it in Vercel (Storage → Upstash for Redis);
 * that adds KV_REST_API_URL and KV_REST_API_TOKEN. Set LEADS_CODE to the code that unlocks the list.
 */
const crypto = require('crypto');

const KEY = 'onestop:leads';
const MAX_LEADS = 2000;
const env = () => ({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
  code: process.env.LEADS_CODE
});

async function redis(cmds) {
  const { url, token } = env();
  const r = await fetch(url.replace(/\/$/, '') + '/pipeline', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmds.map(c => c.map(String)))
  });
  if (!r.ok) throw new Error('storage ' + r.status);
  const out = await r.json();
  const bad = out.find(x => x && x.error);
  if (bad) throw new Error('storage ' + bad.error);
  return out.map(x => x.result);
}

/* Counts hits per key inside a time window; returns the count after this hit */
async function hit(key, seconds) {
  const [, n] = await redis([['SET', key, '0', 'EX', seconds, 'NX'], ['INCR', key]]);
  return Number(n);
}

const clip = (v, n) => String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, n);
const clipText = (v, n) => String(v == null ? '' : v).replace(/\r/g, '').trim().slice(0, n);
const list = (v, n) => (Array.isArray(v) ? v : []).slice(0, 12).map(x => clip(x, n)).filter(Boolean);

function sameCode(given, real) {
  const a = Buffer.from(String(given || '')), b = Buffer.from(String(real));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch (e) { return {}; }
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  const { url, token, code } = env();
  if (!url || !token) return res.status(503).json({ error: 'Lead storage is not connected yet.' });
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();

  try {
    if (req.method === 'POST') {
      const b = readBody(req);
      if (b.website) return res.status(201).json({ ok: true }); // honeypot: bots fill the hidden field
      const lead = {
        id: Date.now().toString(36) + crypto.randomBytes(4).toString('hex'),
        at: new Date().toISOString(),
        name: clip(b.name, 80),
        email: clip(b.email, 120),
        phone: clip(b.phone, 30),
        company: clip(b.company, 120),
        needs: list(b.needs, 40),
        stage: clip(b.stage, 60),
        when: clip(b.when, 60),
        message: clipText(b.message, 2000)
      };
      if (!lead.name || (!lead.email && !lead.phone)) return res.status(400).json({ error: 'Please add your name and a phone number or email.' });
      if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return res.status(400).json({ error: 'That email doesn’t look right.' });
      if (await hit('onestop:rl:post:' + ip, 3600) > 8) return res.status(429).json({ error: 'Too many briefs from this network. Please try again in an hour.' });
      await redis([['LPUSH', KEY, JSON.stringify(lead)], ['LTRIM', KEY, 0, MAX_LEADS - 1]]);
      return res.status(201).json({ ok: true, id: lead.id });
    }

    if (req.method === 'GET' || req.method === 'DELETE') {
      if (!code) return res.status(503).json({ error: 'Set LEADS_CODE in Vercel to unlock leads.' });
      const failKey = 'onestop:rl:code:' + ip;
      const [fails] = await redis([['GET', failKey]]);
      if (Number(fails) >= 8) return res.status(429).json({ error: 'Too many wrong codes. Try again in 15 minutes.' });
      if (!sameCode(req.headers['x-leads-code'], code)) {
        await hit(failKey, 900);
        return res.status(401).json({ error: 'Wrong code.' });
      }
      const [raw] = await redis([['LRANGE', KEY, 0, MAX_LEADS - 1]]);
      const rows = (raw || []).map(s => { try { return [s, JSON.parse(s)]; } catch (e) { return null; } }).filter(Boolean);
      if (req.method === 'DELETE') {
        const id = new URL(req.url, 'http://x').searchParams.get('id');
        const row = rows.find(([, l]) => l.id === id);
        if (!row) return res.status(404).json({ error: 'Lead not found.' });
        await redis([['LREM', KEY, 1, row[0]]]);
        return res.status(200).json({ ok: true });
      }
      return res.status(200).json({ leads: rows.map(([, l]) => l) });
    }

    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (e) {
    console.error('[leads]', e.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
