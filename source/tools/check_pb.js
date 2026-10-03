// Playbook checks: the repo copy (offline seed + browser storage) and the artifact page with a mocked
// shared database, exercising tabs, checklist, filters, add / edit / delete, search and view-only mode.
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const SCR = path.resolve(__dirname, '..'), NM = path.join(__dirname, 'node_modules');
const OUT = path.join(SCR, 'shots5');
fs.mkdirSync(OUT, { recursive: true });
const SEED = JSON.parse(fs.readFileSync(path.join(SCR, 'artifact2/playbook-seed.json'), 'utf8'));
// Wrap the artifact fragment the way the viewer does: a document skeleton around the page content.
const frag = fs.readFileSync(path.join(SCR, 'artifact2/one-stop-playbook.html'), 'utf8');
fs.writeFileSync(path.join(SCR, 'site2/pb-artifact.html'), '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>' + frag + '</body></html>');
async function route(r) {
  const u = r.request().url(); let m, f = null;
  if ((m = u.match(/lenis@1\.3\.4\/dist\/(.+)$/))) f = path.join(NM, 'lenis/dist', m[1]);
  else if (u.startsWith('https://fonts.googleapis.com/')) f = path.join(SCR, 'fonts/fonts.css');
  else if (u.startsWith('https://fonts.gstatic.com/')) f = path.join(SCR, 'fonts', u.replace('https://fonts.gstatic.com/', ''));
  if (f) return r.fulfill({ body: fs.readFileSync(f), headers: { 'access-control-allow-origin': '*', 'content-type': f.endsWith('.js') ? 'application/javascript' : f.endsWith('.css') ? 'text/css' : 'font/woff2' } });
  return u.startsWith('file:') || u.startsWith('data:') ? r.continue() : r.abort();
}
const MOCK = (seed, canWrite) => `
(() => {
  const store = new Map(${JSON.stringify(seed.map(x => { const { id, ...rest } = x; return [id, rest]; }))});
  const subs = new Set();
  const snap = () => { const docs = [...store.keys()].sort().map(id => ({ id, exists: true, data: () => Object.freeze(JSON.parse(JSON.stringify(store.get(id)))), metadata: { fromCache: false, hasPendingWrites: false } })); return { docs, size: docs.length, empty: !docs.length, docChanges: () => [], metadata: {} }; };
  const emit = () => subs.forEach(f => f(snap()));
  window.__writes = [];
  const DB = Object.freeze({ collection: p => ({ path: p, onSnapshot(next) { subs.add(next); setTimeout(() => next(snap()), 40); return () => subs.delete(next); },
    doc: id => ({ id, path: p + '/' + id,
      set: async d => { ${canWrite ? '' : "throw { code: 'invalid_argument', message: 'no' };"} window.__writes.push(['set', id]); store.set(id, JSON.parse(JSON.stringify(d))); setTimeout(emit, 5); },
      delete: async () => { window.__writes.push(['delete', id]); store.delete(id); setTimeout(emit, 5); } }) }) });
  const USER = Object.freeze({ can: async () => ${canWrite ? 'true' : 'false'}, id: async () => 'u_me', isOwner: async () => true,
    profiles: async ids => Object.fromEntries([].concat(ids).map(i => [i, { id: i, name: i === 'u_me' ? 'Leela' : 'Ravi', isMe: i === 'u_me', avatarUrl: '', color: '#000', email: null, guest: false }])) });
  window.claude = { use: n => new Promise(r => setTimeout(() => r(n === 'db' ? DB : n === 'user' ? USER : null), 60)) };
})();`;
async function session(label, url, opts, mock) {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + (e.stack || e.message)));
  await page.route('**/*', route);
  if (mock) await page.addInitScript(mock);
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  return { browser, page, errors };
}
const shot = (page, name, full) => page.screenshot({ path: `${OUT}/${name}.png`, fullPage: !!full });
const info = page => page.evaluate(() => ({ sync: document.querySelector('#pb-sync span').textContent, stats: [...document.querySelectorAll('.pb-stat__n')].map(e => e.textContent).join(' '), canWrite: document.documentElement.classList.contains('pb-can-write'), overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
async function tabs(page, prefix, full) {
  const out = {};
  for (const t of ['process', 'services', 'research', 'prompts', 'tools', 'kb']) {
    await page.evaluate(t => document.querySelector(`#pb-tabs [data-tab="${t}"]`).click(), t);
    await page.waitForTimeout(500);
    await page.evaluate(() => { const el = document.getElementById('lib'); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 70); });
    await page.waitForTimeout(400);
    out[t] = await page.evaluate(() => ({ cards: document.querySelectorAll('#pb-panel-inner article, #pb-panel-inner .kbrow, #pb-panel-inner .trow, #pb-panel-inner .step').length, empty: !!document.querySelector('#pb-panel-inner .pb-empty'), overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
    await shot(page, `${prefix}-tab-${t}`, full);
  }
  return out;
}
(async () => {
  const R = {};
  // 1. Repo copy: embedded seed, saves in this browser
  {
    const { browser, page, errors } = await session('repo', 'file://' + path.join(SCR, 'site2/playbook/index.html'), { viewport: { width: 1440, height: 900 } });
    R.repo = await info(page);
    await shot(page, 'repo-top');
    R.repoTabs = await tabs(page, 'repo', false);
    await page.evaluate(() => document.querySelector('[data-tab="process"]').click());
    await page.waitForTimeout(300);
    await page.evaluate(() => document.querySelector('#chk-connect-0').click());
    await page.waitForTimeout(200);
    R.repoCheck = await page.evaluate(() => document.querySelector('.sop__ph[data-phase="connect"] .sop__count').textContent);
    // add a resource in local mode
    await page.evaluate(() => document.querySelector('.nav__buttons [data-add]').click());
    await page.waitForTimeout(600);
    await page.evaluate(() => document.querySelector('#pf [data-kind="kb"]').click());
    await page.fill('#pf [name="title"]', 'Brand questionnaire');
    await page.fill('#pf [name="url"]', 'notion.so/onestop/brand-questionnaire');
    await page.evaluate(() => document.querySelector('#pf-submit').click());
    await page.waitForTimeout(900);
    R.repoAdd = await page.evaluate(() => ({ tab: document.querySelector('.pb-tab[aria-selected="true"]').dataset.tab, first: document.querySelector('.kbrow__title')?.textContent, stored: !!localStorage.getItem('pb-local-v1') }));
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(900);
    R.repoPersist = await page.evaluate(() => [...document.querySelectorAll('.kbrow__title')].some(e => e.textContent.includes('Brand questionnaire')));
    R.repoErrors = errors;
    await browser.close();
  }
  // 2. Artifact page, no window.claude (opened outside the viewer)
  {
    const { browser, page, errors } = await session('none', 'file://' + path.join(SCR, 'site2/pb-artifact.html'), { viewport: { width: 1440, height: 900 } });
    R.none = await info(page);
    await page.evaluate(() => document.querySelector('[data-tab="prompts"]').click());
    await page.waitForTimeout(300);
    await shot(page, 'none-prompts');
    R.noneErrors = errors;
    await browser.close();
  }
  // 3. Artifact page with a mocked shared database (editor)
  {
    const { browser, page, errors } = await session('live', 'file://' + path.join(SCR, 'site2/pb-artifact.html'), { viewport: { width: 1440, height: 900 } }, MOCK(SEED, true));
    await page.waitForTimeout(600);
    R.live = await info(page);
    await shot(page, 'live-top');
    R.liveTabs = await tabs(page, 'live', false);
    // add a prompt
    await page.evaluate(() => document.querySelector('[data-tab="prompts"]').click());
    await page.waitForTimeout(300);
    await page.evaluate(() => document.querySelector('#pb-panel-inner [data-add="prompts"]').click());
    await page.waitForTimeout(700);
    await shot(page, 'live-form');
    await page.fill('#pf [name="title"]', 'Case study writer');
    await page.selectOption('#pf [name="phase"]', 'grow');
    await page.fill('#pf [name="body"]', 'Write a case study for [client] about [project].');
    await page.fill('#pf [name="tags"]', 'marketing, case study');
    await page.evaluate(() => document.querySelector('#pf-submit').click());
    await page.waitForTimeout(900);
    R.liveAdd = await page.evaluate(() => ({ writes: window.__writes, first: document.querySelector('.pcard__title')?.textContent, who: null, toast: document.getElementById('toast').textContent }));
    // open it, check attribution, edit it
    await page.evaluate(() => document.querySelector('.pcard [data-item]').click());
    await page.waitForTimeout(700);
    R.liveWho = await page.evaluate(() => document.querySelector('#item-body .pb-who')?.textContent);
    await shot(page, 'live-item');
    await page.evaluate(() => document.querySelector('#item-body [data-edit]').click());
    await page.waitForTimeout(700);
    await page.fill('#pf [name="title"]', 'Case study writer (v2)');
    await page.evaluate(() => document.querySelector('#pf-submit').click());
    await page.waitForTimeout(800);
    R.liveEdit = await page.evaluate(() => ({ first: document.querySelector('.pcard__title')?.textContent, writes: window.__writes.length }));
    // delete it
    await page.evaluate(() => document.querySelector('.pcard [data-item]').click());
    await page.waitForTimeout(600);
    await page.evaluate(() => document.querySelector('#item-body [data-edit]').click());
    await page.waitForTimeout(600);
    await page.evaluate(() => document.querySelector('#pf-delete').click());
    await page.waitForTimeout(200);
    await shot(page, 'live-delete-confirm');
    await page.evaluate(() => document.querySelector('#pf-confirm-yes').click());
    await page.waitForTimeout(800);
    R.liveDelete = await page.evaluate(() => ({ gone: ![...document.querySelectorAll('.pcard__title')].some(e => e.textContent.includes('Case study')), writes: window.__writes }));
    // search
    await page.keyboard.press('/');
    await page.waitForTimeout(500);
    await page.keyboard.type('competitor');
    await page.waitForTimeout(300);
    await shot(page, 'live-search');
    R.liveSearch = await page.evaluate(() => [...document.querySelectorAll('#pb-results .sr__title')].map(e => e.textContent).slice(0, 6));
    await page.keyboard.press('Enter');
    await page.waitForTimeout(900);
    R.liveSearchOpen = await page.evaluate(() => document.getElementById('item-title')?.textContent);
    await shot(page, 'live-search-open');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    // services tab detail + process with linked tools
    await page.evaluate(() => document.querySelector('[data-tab="services"]').click());
    await page.waitForTimeout(300);
    await page.evaluate(() => document.querySelector('[data-svc="svc-store"]').click());
    await page.waitForTimeout(500);
    await shot(page, 'live-services-store', true);
    R.liveErrors = errors;
    await browser.close();
  }
  // 4. Read-only viewer
  {
    const { browser, page, errors } = await session('ro', 'file://' + path.join(SCR, 'site2/pb-artifact.html'), { viewport: { width: 1440, height: 900 } }, MOCK(SEED, false));
    await page.waitForTimeout(600);
    R.ro = await info(page);
    R.roAddVisible = await page.evaluate(() => [...document.querySelectorAll('[data-add]')].some(b => b.offsetParent !== null));
    R.roErrors = errors;
    await browser.close();
  }
  // 5. Phone
  {
    const { browser, page, errors } = await session('phone', 'file://' + path.join(SCR, 'site2/pb-artifact.html'), { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, MOCK(SEED, true));
    await page.waitForTimeout(600);
    R.phone = await info(page);
    await shot(page, 'phone-top');
    R.phoneTabs = await tabs(page, 'phone', true);
    await page.evaluate(() => document.querySelector('.nav__buttons [data-add]').click());
    await page.waitForTimeout(700);
    await shot(page, 'phone-form');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await page.evaluate(() => document.querySelector('.pb-nav-search').click());
    await page.waitForTimeout(500);
    await page.keyboard.type('n8n');
    await page.waitForTimeout(300);
    await shot(page, 'phone-search');
    R.phoneErrors = errors;
    await browser.close();
  }
  console.log(JSON.stringify(R, null, 1));
})();
