/* Local preview with a working /api/leads, backed by an in-memory stand-in for Upstash Redis.
 * Run from the repository root: node source/tools/dev-server.js [port]   (set LEADS_CODE to choose the local code; it defaults to 123456)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const PORT = +process.argv[2] || 4173;
process.env.KV_REST_API_URL = 'http://redis.mock';
process.env.KV_REST_API_TOKEN = 'mock';
process.env.LEADS_CODE = process.env.LEADS_CODE || '123456';

/* Just enough Redis for the leads API */
const db = new Map();
const realFetch = global.fetch;
global.fetch = async (url, opts) => {
  if (!String(url).startsWith('http://redis.mock')) return realFetch(url, opts);
  const out = JSON.parse(opts.body).map(([cmd, key, ...a]) => {
    switch (cmd) {
      case 'SET': if (a.includes('NX') && db.has(key)) return { result: null }; db.set(key, a[0]); return { result: 'OK' };
      case 'INCR': { const n = Number(db.get(key) || 0) + 1; db.set(key, String(n)); return { result: n }; }
      case 'GET': return { result: db.has(key) ? db.get(key) : null };
      case 'LPUSH': { const l = db.get(key) || []; l.unshift(...a.reverse()); db.set(key, l); return { result: l.length }; }
      case 'LTRIM': { const l = db.get(key) || []; db.set(key, l.slice(+a[0], +a[1] + 1)); return { result: 'OK' }; }
      case 'LRANGE': return { result: (db.get(key) || []).slice(+a[0], +a[1] + 1) };
      case 'LREM': { const l = db.get(key) || []; const i = l.indexOf(a[1]); if (i >= 0) l.splice(i, 1); return { result: i >= 0 ? 1 : 0 }; }
      default: return { error: 'unsupported ' + cmd };
    }
  });
  return { ok: true, status: 200, json: async () => out };
};

const handler = require(path.join(ROOT, 'api', 'leads.js'));
const MIME = { html: 'text/html; charset=utf-8', js: 'text/javascript', css: 'text/css', webp: 'image/webp', svg: 'image/svg+xml', png: 'image/png', json: 'application/json' };

http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (u.pathname.replace(/\/$/, '') === '/api/leads') {
    let body = '';
    req.on('data', c => { body += c; });
    req.on('end', () => {
      req.body = body;
      res.status = code => { res.statusCode = code; return res; };
      res.json = obj => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); return res; };
      handler(req, res);
    });
    return;
  }
  let file = path.join(ROOT, decodeURIComponent(u.pathname));
  if (!file.startsWith(ROOT)) { res.statusCode = 403; return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.statusCode = 404; return res.end('Not found'); }
  res.setHeader('Content-Type', MIME[file.split('.').pop()] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Preview: http://localhost:${PORT}/  (leads code ${process.env.LEADS_CODE})`));
