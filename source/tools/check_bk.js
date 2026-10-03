// One pass over the Beere Kesava deck: console errors, overflow, empty containers,
// key interactions, and screenshots at desktop and phone widths.
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const SCR = path.resolve(__dirname, '..');
const NM = path.join(__dirname, 'node_modules');
const PAGE = process.argv[2];
const OUT = path.join(SCR, process.argv[3] || 'shots_bk');
fs.mkdirSync(OUT, { recursive: true });
const MIME = { js: 'application/javascript', css: 'text/css', woff2: 'font/woff2' };
async function route(r, blocked) {
  const u = r.request().url();
  if (u.startsWith('file:') || u.startsWith('data:')) return r.continue();
  let file = null, m;
  if ((m = u.match(/cdn\.jsdelivr\.net\/npm\/gsap@3\.13\.0\/dist\/(.+)$/))) file = path.join(NM, 'gsap/dist', m[1]);
  else if ((m = u.match(/cdn\.jsdelivr\.net\/npm\/lenis@1\.3\.4\/dist\/(.+)$/))) file = path.join(NM, 'lenis/dist', m[1]);
  else if (u.startsWith('https://fonts.googleapis.com/')) file = path.join(SCR, 'bk/fonts/fonts.css');
  else if (u.startsWith('https://fonts.gstatic.com/')) file = path.join(SCR, 'bk/fonts', u.replace('https://fonts.gstatic.com/', ''));
  if (file && fs.existsSync(file)) return r.fulfill({ status: 200, body: fs.readFileSync(file), headers: { 'content-type': MIME[file.split('.').pop()] || 'application/octet-stream', 'access-control-allow-origin': '*' } });
  blocked.push(u);
  return r.abort();
}
const CONTAINERS = ['radial-list', 'reel-ticker', 'live-slides', 'mess-chips', 'mess-lines', 'mess-cols', 'pains', 'thread', 'stage-cards', 'stage-detail', 'tag-bars', 'story', 'portal-cards', 'usedby', 'dial-svg', 'night-list', 'doc-fan', 'doc-list', 'trust', 'work-list', 'leaks', 'tech-stats', 'tech-quality', 'tech-chips', 'road', 'towns', 'player-frames', 'player-progress'];
const SECTIONS = ['top', 'reel', 'intro', 'problem', 'journey', 'scan', 'portals', 'night', 'docs', 'control', 'savings', 'tech', 'roadmap', 'start', 'contact'];
async function run(name, opts) {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  const errors = [], blocked = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', e => errors.push('pageerror: ' + (e.stack || e.message)));
  await page.route('**/*', r => route(r, blocked));
  await page.goto(PAGE, { waitUntil: 'load' });
  await page.waitForTimeout(2600);
  const H = opts.viewport.height;
  const rep = { name, errors, blocked };
  rep.empty = await page.evaluate(ids => ids.filter(id => { const el = document.getElementById(id); return !el || !el.children.length; }), CONTAINERS);
  rep.fonts = await page.evaluate(() => ['Fraunces', 'Geist', 'Geist Mono', 'Caveat'].map(f => f + ':' + document.fonts.check(`16px "${f}"`)));
  await page.screenshot({ path: `${OUT}/${name}-top.png` });
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += Math.round(H * 0.7)) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(140); }
  await page.waitForTimeout(1500);
  rep.height = await page.evaluate(() => document.documentElement.scrollHeight);
  rep.overflow = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth, out = [];
    const clips = el => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (/(hidden|clip|auto|scroll)/.test(s.overflowX) || s.position === 'fixed') return true; } return false; };
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if ((r.right > vw + 1 || r.left < -1) && !clips(el) && getComputedStyle(el).position !== 'fixed') out.push(`${el.tagName.toLowerCase()}.${String(el.className.baseVal ?? el.className).split(' ').join('.')}#${el.id} [${Math.round(r.left)}..${Math.round(r.right)}]`);
    }
    return { scrollW: document.documentElement.scrollWidth, vw, items: out.slice(0, 20), count: out.length };
  });
  rep.textClip = await page.evaluate(() => {
    const out = [];
    const skip = '.radial, .marquee, .undernav, .flick, .gslider, .k, .reel__ticker, .mess, .modal, .nav, .footer__logo, .vslider__list, .fan, .media';
    for (const el of document.querySelectorAll('body *')) {
      if (el.closest(skip)) continue;
      const s = getComputedStyle(el);
      if (!/(hidden|clip)/.test(s.overflowX + s.overflowY)) continue;
      if (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2) out.push(`${el.tagName.toLowerCase()}.${String(el.className.baseVal ?? el.className).split(' ').join('.')} sw${el.scrollWidth}/cw${el.clientWidth} sh${el.scrollHeight}/ch${el.clientHeight}`);
    }
    return out.slice(0, 20);
  });
  for (const id of SECTIONS) {
    const el = await page.$('#' + id);
    if (!el) { rep['missing_' + id] = true; continue; }
    const geo = await page.evaluate(i => { const e = document.getElementById(i); const r = e.getBoundingClientRect(); return { top: r.top + window.scrollY, h: r.height }; }, id);
    await page.evaluate(t => window.scrollTo(0, t - 10), geo.top);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${name}-s-${id}.png`, clip: { x: 0, y: Math.max(0, geo.top), width: opts.viewport.width, height: Math.min(geo.h, 4200) }, fullPage: true }).catch(e => rep['shotfail_' + id] = String(e).slice(0, 120));
  }
  const act = {};
  // Journey: tap step 8
  await page.evaluate(() => document.querySelector('#thread [data-st="7"]').click());
  await page.waitForTimeout(1200);
  act.stage = await page.evaluate(() => document.querySelector('#stage-detail h3')?.textContent);
  await page.evaluate(() => { const e = document.getElementById('journey'); window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY + 200); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/${name}-i-journey.png` });
  // Scan
  await page.evaluate(() => document.getElementById('scan').scrollIntoView());
  await page.waitForTimeout(3600);
  act.story = await page.evaluate(() => document.querySelectorAll('#story li.is--on').length);
  // Night dial: pick the 02:00 dispatch alert
  await page.evaluate(() => document.querySelector('#night-list [data-night="2"]').click());
  await page.waitForTimeout(600);
  act.night = await page.evaluate(() => ({ time: document.getElementById('dial-time').textContent, on: [...document.querySelectorAll('.dial__ev.is--on')].map(g => g.dataset.h), item: document.querySelector('#night-list li.is--on b')?.textContent }));
  // Docs fan
  await page.evaluate(() => document.querySelector('#doc-list [data-doc="3"]').click());
  await page.waitForTimeout(900);
  act.doc = await page.evaluate(() => document.querySelector('#doc-fan .fcard.is--on .fcard__label')?.textContent);
  await page.evaluate(() => document.getElementById('docs').scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${name}-i-docs.png` });
  // Portals modal
  await page.evaluate(() => document.querySelector('[data-flick-open]').click());
  await page.waitForTimeout(900);
  act.portal = await page.evaluate(() => document.getElementById('portal-title')?.textContent);
  await page.screenshot({ path: `${OUT}/${name}-i-portal.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  // Calculator
  await page.evaluate(() => { const r = document.getElementById('r-sarees'); r.value = 600; r.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.waitForTimeout(800);
  act.calc = await page.evaluate(() => ['o-hours', 'o-days', 'o-money'].map(i => document.getElementById(i).textContent));
  await page.evaluate(() => document.getElementById('calc').scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${name}-i-calc.png` });
  // Player
  await page.evaluate(() => document.querySelector('[data-reel-open]').click());
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${name}-i-player.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  // Menu
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.evaluate(() => document.querySelector('[data-nav-toggle]').click());
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${name}-i-menu.png` });
  await page.evaluate(() => document.querySelector('[data-nav-toggle]').click());
  await page.evaluate(() => document.querySelector('[data-modal-open="about"]').click());
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${name}-i-about.png` });
  rep.act = act;
  rep.errorsAfter = errors.length;
  await browser.close();
  return rep;
}
(async () => {
  const which = process.argv[4] || 'both';
  if (which !== 'phone') console.log(JSON.stringify(await run('desk', { viewport: { width: 1440, height: 900 } }), null, 1));
  if (which !== 'desk') console.log(JSON.stringify(await run('phone', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }), null, 1));
})();
