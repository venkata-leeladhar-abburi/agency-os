// One pass over the Heaven Gadgets growth plan: console errors, overflow, empty containers,
// key interactions, and screenshots at desktop and phone widths.
// Run from the repository root: node source/tools/check_hg.js heaven-gadgets/index.html [outdir]
// GSAP and Lenis load from node_modules here. Set FONTS_DIR to a folder holding fonts.css and the
// fonts.gstatic.com files to test with the real fonts; without it, fonts fall back to system ones.
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const NM = path.join(__dirname, 'node_modules');
const PAGE = 'file://' + path.resolve(process.argv[2] || 'heaven-gadgets/index.html');
const OUT = path.resolve(process.argv[3] || path.join(__dirname, '..', 'shots_hg'));
const FONTS = process.env.FONTS_DIR || '';
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
fs.mkdirSync(OUT, { recursive: true });
const MIME = { js: 'application/javascript', css: 'text/css', woff2: 'font/woff2' };
async function route(r, blocked) {
  const u = r.request().url();
  if (u.startsWith('file:') || u.startsWith('data:')) return r.continue();
  let file = null, m;
  if ((m = u.match(/cdn\.jsdelivr\.net\/npm\/gsap@3\.13\.0\/dist\/(.+)$/))) file = path.join(NM, 'gsap/dist', m[1]);
  else if ((m = u.match(/cdn\.jsdelivr\.net\/npm\/lenis@1\.3\.4\/dist\/(.+)$/))) file = path.join(NM, 'lenis/dist', m[1]);
  else if (FONTS && u.startsWith('https://fonts.googleapis.com/')) file = path.join(FONTS, 'fonts.css');
  else if (FONTS && u.startsWith('https://fonts.gstatic.com/')) file = path.join(FONTS, u.replace('https://fonts.gstatic.com/', ''));
  if (file && fs.existsSync(file)) return r.fulfill({ status: 200, body: fs.readFileSync(file), headers: { 'content-type': MIME[file.split('.').pop()] || 'application/octet-stream', 'access-control-allow-origin': '*' } });
  blocked.push(u.slice(0, 90));
  return r.abort();
}
const CONTAINERS = ['radial-list', 'reel-ticker', 'found-slides', 'today-chain', 'pipe-svg', 'pipe-holes',
  'loop-svg', 'loop-stations', 'stage-cards', 'stage-detail', 'chain', 'hub-svg', 'hub-nodes', 'tool-screen', 'tool-pins', 'tool-info', 'dial-svg', 'day-list',
  'call-wave', 'call-lines', 'ystats', 'yloop-ring', 'people-cards', 'people-faces', 'tactics', 'proof-list', 'more-list', 'road', 'map-svg', 'map-towns', 'player-frames', 'player-progress'];
const SECTIONS = ['top', 'reel', 'store', 'leaks', 'flow', 'bill', 'platform', 'always', 'youth', 'money', 'proof', 'process', 'scale', 'start', 'contact'];
async function run(name, opts) {
  const browser = await chromium.launch({ executablePath: CHROME });
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  const errors = [], blocked = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', e => errors.push('pageerror: ' + (e.stack || e.message)));
  await page.route('**/*', r => route(r, blocked));
  await page.goto(PAGE, { waitUntil: 'load' });
  await page.waitForTimeout(2600);
  const H = opts.viewport.height;
  const rep = { name, errors, blocked: [...new Set(blocked)].slice(0, 6) };
  rep.empty = await page.evaluate(ids => ids.filter(id => { const el = document.getElementById(id); return !el || !el.children.length; }), CONTAINERS);
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
    const skip = '.radial, .marquee, .undernav, .flick, .gslider, .k, .reel__ticker, .modal, .nav, .footer__logo, .vslider__list, .media, .pipe, .loop, .hub, .map, .yloop';
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
    await page.screenshot({ path: `${OUT}/${name}-s-${id}.png`, clip: { x: 0, y: Math.max(0, geo.top), width: opts.viewport.width, height: Math.min(geo.h, 5200) }, fullPage: true }).catch(e => { rep['shotfail_' + id] = String(e).slice(0, 120); });
  }
  const act = {};
  const shotOf = async (sel, file, block = 'center') => {
    await page.evaluate(([s, b]) => document.querySelector(s).scrollIntoView({ block: b }), [sel, block]);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${name}-${file}.png` });
  };
  // Leaks: back to today
  await page.evaluate(() => document.querySelector('[data-pipe-set="today"]').click());
  await page.waitForTimeout(1400);
  act.pipe = await page.evaluate(() => ({ state: document.getElementById('pipe').dataset.state, out: document.getElementById('pipe-out').textContent, w0: document.getElementById('pipe-svg').dataset.out }));
  await shotOf('.pipe__stage', 'i-pipe-today');
  // Lost calculator
  await page.evaluate(() => { const r = document.getElementById('r-lost'); r.value = 4; r.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.waitForTimeout(700);
  act.lost = await page.evaluate(() => document.getElementById('o-lost').textContent);
  // Flow: store lane + step 4
  await page.evaluate(() => document.querySelector('[data-lane-set="st"]').click());
  await page.evaluate(() => document.querySelector('#loop-stations [data-st="3"]').click());
  await page.waitForTimeout(1300);
  act.flow = await page.evaluate(() => ({ lane: document.getElementById('loop').dataset.lane, step: document.querySelector('#stage-detail h3')?.textContent, line: document.querySelector('#loop-stations [data-st="3"] .lst__line')?.textContent }));
  await shotOf('#loop', 'i-loop');
  // Bill
  await page.evaluate(() => document.getElementById('bill-btn').click());
  await page.waitForTimeout(4200);
  act.bill = await page.evaluate(() => document.querySelectorAll('#chain li.is--on').length);
  await shotOf('.bill__grid', 'i-bill');
  // Platform: pick the billing counter
  await page.evaluate(() => document.querySelector('#hub-nodes [data-tool="3"]').click());
  await page.waitForTimeout(900);
  act.tool = await page.evaluate(() => document.querySelector('#tool-info h3')?.textContent);
  await shotOf('#show', 'i-show');
  // Always on: pick the voice calls
  await page.evaluate(() => document.querySelector('#day-list [data-day="4"]').click());
  await page.waitForTimeout(600);
  act.day = await page.evaluate(() => ({ time: document.getElementById('dial-time').textContent, item: document.querySelector('#day-list li.is--on b')?.textContent }));
  await shotOf('#call', 'i-call');
  await page.waitForTimeout(6000);
  act.call = await page.evaluate(() => document.querySelectorAll('#call-lines li.is--on').length);
  await page.screenshot({ path: `${OUT}/${name}-i-call-later.png` });
  // Youth loop + persona modal
  await page.evaluate(() => document.querySelector('#yloop-ring [data-yl="3"]').click());
  await page.waitForTimeout(700);
  act.yloop = await page.evaluate(() => document.getElementById('yloop-name').textContent);
  await page.evaluate(() => document.querySelector('[data-flick-open]').click());
  await page.waitForTimeout(1000);
  act.person = await page.evaluate(() => document.getElementById('person-title')?.textContent);
  await page.screenshot({ path: `${OUT}/${name}-i-person.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  // Calculator
  await page.evaluate(() => { const r = document.getElementById('r-online'); r.value = 10; r.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.waitForTimeout(900);
  act.calc = await page.evaluate(() => ['o-month', 'o-year', 'o-records', 'o-pct'].map(i => document.getElementById(i).textContent));
  await shotOf('#calc', 'i-calc');
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
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/${name}-i-menu.png` });
  rep.act = act;
  await browser.close();
  return rep;
}
(async () => {
  const reps = [];
  reps.push(await run('desk', { viewport: { width: 1440, height: 900 } }));
  reps.push(await run('phone', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }));
  console.log(JSON.stringify(reps, null, 1));
})();
