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
(async () => {
  const url = process.argv[2], out = process.argv[3];
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const [name, vp] of [['desk', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: name === 'phone', hasTouch: name === 'phone' });
    const page = await ctx.newPage();
    const errs = [], blocked = [];
    page.on('pageerror', e => errs.push('pageerror ' + e.message));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    await page.route('**/*', r => (r.request().url().startsWith('file://') ? r.continue() : route(r, blocked)));
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 700) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800);
    const rep = await page.evaluate(() => {
      const W = document.documentElement.clientWidth, wide = [];
      document.querySelectorAll('body *').forEach(el => { const r = el.getBoundingClientRect(); if (r.width && r.right > W + 1 && !el.closest('.marquee,.marquee-wrap,.gslider,.modal,.case__thumbs')) wide.push(el.className + ' ' + Math.round(r.right)); });
      const broken = [...document.images].filter(i => i.complete && !i.naturalWidth && !i.dataset.remote).map(i => i.src.split('/').pop());
      return { sw: document.documentElement.scrollWidth, W, wide: wide.slice(0, 8), broken, fonts: ['Geist', 'Geist Mono'].map(f => f + ':' + document.fonts.check(`16px "${f}"`)) };
    });
    console.log(name, JSON.stringify(rep), 'errors:', errs.slice(0, 5));
    await page.screenshot({ path: `${out}/${name}-full.jpg`, fullPage: true, type: 'jpeg', quality: 45 });
    // interactions
    const t = async (label, fn) => { try { await fn(); console.log('ok', label); } catch (e) { console.log('FAIL', label, e.message.split('\n')[0]); } };
    await t('case modal', async () => { await page.click('.case[data-id="ornate"] [data-case="ornate"].btn'); await page.waitForTimeout(900); if (await page.getAttribute('.modal[data-modal="case"]', 'data-open') !== 'true') throw new Error('not open'); await page.screenshot({ path: `${out}/${name}-case.jpg`, type: 'jpeg', quality: 50 }); await page.keyboard.press('Escape'); await page.waitForTimeout(600); });
    await t('all projects', async () => { await page.evaluate(() => document.querySelector('[data-all-open]').click()); await page.waitForTimeout(900); await page.click('[data-cat="product"]'); await page.waitForTimeout(400); const n = await page.$$eval('.ap__card', a => a.length); await page.screenshot({ path: `${out}/${name}-all.jpg`, type: 'jpeg', quality: 50 }); console.log('  products filter cards', n); await page.keyboard.press('Escape'); await page.waitForTimeout(600); });
    await t('live modal', async () => { await page.evaluate(() => document.querySelector('[data-live="ngb"]').click()); await page.waitForTimeout(900); const src = await page.getAttribute('#lv-frame iframe', 'src'); if (!src) throw new Error('no iframe'); await page.screenshot({ path: `${out}/${name}-live.jpg`, type: 'jpeg', quality: 50 }); await page.keyboard.press('Escape'); await page.waitForTimeout(600); const left = await page.$$eval('#lv-frame iframe', a => a.length); if (left) throw new Error('iframe kept'); });
    await t('form', async () => { await page.evaluate(() => document.querySelector('#needs [data-n="ERP / dashboard"]').click()); const h = await page.textContent('#hint'); if (!/2–8 weeks/.test(h)) throw new Error(h); });
    await ctx.close();
  }
  await browser.close();
})();
