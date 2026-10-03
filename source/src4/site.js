/* ===== One Stop Solutions: agency website ===== */
const WA = '919014952056', MAIL = 'workwithonestop@gmail.com';
const IMG = (k, n, full) => `img/${k}-${n}${full ? '-full' : ''}.webp`;
const FR = 'https://framerusercontent.com/images/';

/* Projects. imgs: [n, 'desk'|'tall'|'phone'] from the screenshots; live = public page safe to preview */
const P = [
  { id: 'bk', name: 'Beere Kesava ERP', kind: 'Silk saree ERP, yarn to sale', cat: 'product', key: 'bk', cover: 1,
    imgs: [[1, 'tall'], [2, 'tall'], [3, 'tall'], [4, 'tall']], url: 'erp.beere-kesava-and-brothers.org',
    live: 'https://beera-keshava-and-brothers-silks.figma.site/', liveName: 'ERP design',
    links: [['Live ERP', 'https://erp.beere-kesava-and-brothers.org/'], ['Design', 'https://beera-keshava-and-brothers-silks.figma.site/'], ['Pitch deck', 'beere-kesava/']],
    tags: ['ERP', '6 portals', 'GST', 'WhatsApp'], industry: 'Textiles · Dharmavaram',
    line: 'A silk house, run from one portal.',
    idea: ['Paper books for yarn, looms, stock and sales.', 'One system from yarn to sale.'],
    build: ['Six portals, one per role.', 'Purchase, production, quality, dispatch, billing.', 'GST documents sent on WhatsApp.', 'Overnight checks and reports.'],
    result: ['Live on its own domain.', 'Every step tracked. Every role covered.'] },
  { id: 'ornate', name: 'Ornate ’26', kind: 'Fest website + event system', cat: 'web', key: 'ornate', cover: 4,
    imgs: [[4, 'desk'], [1, 'desk'], [5, 'desk'], [2, 'tall'], [3, 'tall'], ['core-1', 'desk'], ['core-3', 'desk'], ['core-4', 'desk'], ['core-5', 'desk'], ['core-2', 'desk']], url: 'ornate-one.vercel.app',
    live: 'https://ornate-one.vercel.app/', liveName: 'Ornate ’26',
    links: [['Visit the site', 'https://ornate-one.vercel.app/'], ['Event system design', 'https://ornate-ems.figma.site/']],
    tags: ['Space theme', 'Gamified', 'Event system'], industry: 'Education · Events',
    line: 'A college fest that feels like a space mission.',
    idea: ['The official fest site for RGUKT Ongole.', 'Not an event list. A mission briefing.'],
    build: ['Deep blacks, neon accents, star fields.', 'Events unlock as missions.', 'An event system for branch admins: schedules, events, standings.'],
    result: ['It felt like a product launch.', 'Strong buzz across campus.', 'Built from scratch. No template.'] },
  { id: 'aaravi', name: 'Aaravi Collectives', kind: 'Luxury silk brand website', cat: 'web', key: 'aaravi', cover: 4,
    imgs: [[4, 'desk'], [1, 'desk'], [2, 'desk'], [3, 'desk'], [5, 'desk'], [6, 'desk']], url: 'aaravi collectives',
    live: '', links: [],
    tags: ['Brand world', 'Storytelling', 'Waitlist'], industry: 'Fashion · Silk sarees',
    line: 'Heritage silk, told like cinema.',
    idea: ['A luxury silk label, launching soon.', 'The heartbeat of India, in every scene.'],
    build: ['Cinematic heritage scenes, page by page.', 'Warm gold on deep maroon.', 'A waitlist to build demand before launch.'],
    result: ['A brand world ready for launch day.'] },
  { id: 'ngb', name: 'NGB · Nawin Golden Boy', kind: 'Fitness coaching platform', cat: 'web', key: 'ngb', cover: 1,
    imgs: [[1, 'desk'], [2, 'desk'], [3, 'desk']], url: 'fitness-platform-ngb.vercel.app',
    live: 'https://fitness-platform-ngb.vercel.app/', liveName: 'NGB',
    links: [['View live', 'https://fitness-platform-ngb.vercel.app/']],
    tags: ['Fitness', 'Coaching', 'Live'], industry: 'Fitness · Coaching',
    line: 'Transform your body. Elevate your life.',
    idea: ['A coach’s brand, built to inspire.'],
    build: ['Bold black, white and lime.', 'Big type. Cinematic photos.', 'Programs and sign-up, front and centre.'],
    result: ['Live on its own domain.'] },
  { id: 'limitx', name: 'LimitX', kind: 'Fee payments app', cat: 'app', key: 'limitx', cover: 1,
    imgs: [[1, 'phone'], [2, 'phone'], [3, 'phone'], [4, 'phone']], url: 'timelly.in/limitx',
    live: 'https://timelly.in/limitx', liveName: 'LimitX',
    links: [['View live', 'https://timelly.in/limitx']],
    tags: ['Flutter', 'Fintech', 'Edtech'], industry: 'Fintech · Edtech',
    line: 'Pay tuition fees in seconds.',
    idea: ['A premium fee payments app for India.', 'Fees, tutors and money tools for students.'],
    build: ['Built with Flutter. Two themes.', 'Fee payments, tutor profiles, a clean dashboard.', 'One-hand use. Bottom navigation.'],
    result: ['A polished, cross-platform product.'] },
  { id: 'scampus', name: 'S-Campus', kind: 'College management SaaS', cat: 'product', key: 'scampus', cover: 1, imgs: [[1, 'desk'], [2, 'desk'], [3, 'desk'], [4, 'desk']], url: 's-campus.figma.site', live: 'https://s-campus.figma.site/', liveName: 'S-Campus', links: [['View the design', 'https://s-campus.figma.site/']], tags: ['9 portals', 'SaaS'] },
  { id: 'timelly', name: 'Timelly', kind: 'School management website', cat: 'web', key: 'timelly', cover: 1, imgs: [[1, 'tall']], url: 'timelly.in', live: 'https://timelly.in/', liveName: 'Timelly', links: [['Website', 'https://timelly.in/'], ['School ERP app', 'https://app.timelly.in/']], tags: ['Website', 'Edtech'] },
  { id: 'deck', name: 'Timelly pitch deck', kind: 'Investor deck website', cat: 'design', key: 'deck', cover: 3, imgs: [[3, 'desk'], [1, 'desk'], [2, 'desk']], url: 'pitchdeck.timelly.in', live: 'https://pitchdeck.timelly.in/', liveName: 'Timelly deck', links: [['Open the deck', 'https://pitchdeck.timelly.in/']], tags: ['Pitch deck'] },
  { id: 'core', name: 'Ornate Core', kind: 'Event management system', cat: 'product', key: 'core', cover: 3, imgs: [[3, 'desk'], [1, 'desk'], [2, 'desk'], [4, 'desk'], [5, 'desk']], url: 'ornate-ems.figma.site', live: 'https://ornate-ems.figma.site/', liveName: 'Ornate Core', links: [['View the design', 'https://ornate-ems.figma.site/']], tags: ['Dashboards', 'Events'] },
  { id: 'sapience', name: 'Sapience S2P', kind: 'Enterprise AI website', cat: 'web', key: 'sapience', cover: 1, imgs: [[1, 'desk'], [2, 'desk'], [3, 'desk']], url: 'sapiences2p-bice.vercel.app', live: 'https://sapiences2p-bice.vercel.app/', liveName: 'Sapience S2P', links: [['View live', 'https://sapiences2p-bice.vercel.app/']], tags: ['Website', 'AI'] },
  { id: 'lumora', name: 'Lumora Health', kind: 'Dental clinic website', cat: 'web', key: 'lumora', cover: 1, imgs: [[1, 'tall'], [2, 'tall']], url: 'lumora-health-services.vercel.app', live: 'https://lumora-health-services.vercel.app/', liveName: 'Lumora', links: [['View live', 'https://lumora-health-services.vercel.app/']], tags: ['Website', 'Health'] },
  { id: 'billing', name: 'Billing app', kind: 'Billing + WhatsApp for stores', cat: 'app', key: 'billing', cover: 1, imgs: [[1, 'phone']], url: '', live: '', links: [], tags: ['Mobile', 'WhatsApp'] },
  { id: 'biglogic', name: 'BigLogic.ai', kind: 'AI agents landing page', cat: 'web', logo: 'biglogic', url: 'big-logic-d3.vercel.app', live: 'https://big-logic-d3.vercel.app/', liveName: 'BigLogic.ai', links: [['View live', 'https://big-logic-d3.vercel.app/'], ['Design', 'https://biglogic-ai.figma.site/']], tags: ['US client'] },
  { id: 'bookaholic', name: 'Bookaholic', kind: 'E-book store', cat: 'web', logo: 'bookaholic', url: 'bookaholic-main.vercel.app', live: 'https://bookaholic-main.vercel.app/', liveName: 'Bookaholic', links: [['View live', 'https://bookaholic-main.vercel.app/']], tags: ['E-commerce'] },
  { id: 'agencyos', name: 'Agency OS', kind: 'Our agency platform', cat: 'product', mark: 'Agency OS', url: 'agency-os-oss.vercel.app', live: 'https://agency-os-oss.vercel.app/', liveName: 'Agency OS', links: [['Open the app', 'https://agency-os-oss.vercel.app/'], ['Product deck', 'agency-os/']], tags: ['Our product'] },
  { id: 'tapp', name: 'Timelly SMS', kind: 'School ERP web app', cat: 'product', logo: 'timelly', url: 'app.timelly.in', live: '', links: [['Open the app', 'https://app.timelly.in/']], tags: ['Login only'] },
  { id: 'moodle', name: 'Moodle + hostel system', kind: 'For SSE College, Puttaparthi', cat: 'product', logo: 'sanskrithi', links: [], tags: ['LMS', 'Hostel'] },
  { id: 'ums', name: 'UMS for SSIT', kind: 'University management system', cat: 'design', mark: 'UMS', links: [], tags: ['Design'] },
  { id: 'sse', name: 'SSE College redesign', kind: 'College website redesign', cat: 'design', logo: 'sanskrithi', links: [], tags: ['Design'] },
  { id: 'police', name: 'Police dashboard', kind: 'For SatyaSai District Police', cat: 'design', mark: 'Dashboard', links: [], tags: ['Design'] },
  { id: 'tutedude', name: 'Tutedude', kind: 'Ed-tech product design', cat: 'design', mark: 'Tutedude', links: [], tags: ['Design'] }
];
const FEATURED = ['bk', 'ornate', 'aaravi', 'ngb', 'limitx'];
const byId = id => P.find(p => p.id === id);
const CATS = [['all', 'All'], ['web', 'Websites'], ['product', 'ERPs & products'], ['app', 'Apps'], ['design', 'Design & decks']];
const LOGOS = [['timelly', 'Timelly'], ['bk', 'Beere Kesava Silks'], ['biglogic', 'BigLogic.ai'], ['sanskrithi', 'Sanskrithi Group of Institutions'], ['sapiences2p', 'Sapience S2P'], ['ngb', 'NGB'], ['bookaholic', 'Bookaholic'], ['talentscore', 'Talent Score'], ['shraddha', 'Shraddha'], ['onlyusmedia', 'Only Us Media']];

const CORE = [
  { n: '01', name: 'UI/UX & product design', line: 'Screens your users get. Research first.', tags: ['User research', 'Figma prototypes', 'Design systems'], img: IMG('scampus', 2), work: 'S-Campus · Ornate Core' },
  { n: '02', name: 'Websites', line: 'Fast, story-led sites that win leads.', tags: ['Framer', 'Next.js', 'CMS'], img: IMG('aaravi', 2), work: 'Aaravi · NGB · Lumora' },
  { n: '03', name: 'ERPs, SaaS & dashboards', line: 'Run your operations from one portal.', tags: ['Multi-role', 'MERN', 'Full-stack'], img: IMG('bk', 1), work: 'Beere Kesava · S-Campus' },
  { n: '04', name: 'Mobile apps', line: 'One Flutter codebase. Android and iOS.', tags: ['Flutter', 'Cross-platform', 'Mobile UI'], img: IMG('limitx', 1), phone: true, work: 'LimitX · Billing app' }
];
const ALSO = [
  ['Research & strategy', 'Know the market before you build.'],
  ['Brand & pitch decks', 'Identity, decks and booklets.'],
  ['Automation & AI agents', 'n8n flows, WhatsApp and voice agents.'],
  ['SEO & Meta ads', 'Get found. Get customers.'],
  ['Hosting & care', 'Domains, uptime, backups, fixes.'],
  ['Scale & new features', 'Grow the product you already have.']
];
const PRODS = [
  { name: 'Silk ERP', from: 'Built for Beere Kesava', line: 'Yarn to sale for textile businesses. Six portals.', img: IMG('bk', 1), status: 'Live', deck: 'beere-kesava/', p: 'bk' },
  { name: 'Agency OS', from: 'Our own product', line: 'Run a whole agency in one place. Portals, playbook, documents.', mark: true, status: 'Live', deck: 'agency-os/', p: 'agencyos' },
  { name: 'S-Campus', from: 'College SaaS', line: 'Admissions to transport. Nine portals, nine roles.', img: IMG('scampus', 1), status: 'Design ready', p: 'scampus' },
  { name: 'Ornate Core', from: 'Event system', line: 'Branches, events, schedules and standings.', img: IMG('core', 3), status: 'Design ready', p: 'core' },
  { name: 'Billing app', from: 'For local stores', line: 'Bills, customers and WhatsApp campaigns.', img: IMG('billing', 1), phone: true, status: 'Design ready', p: 'billing' }
];
const STAGES = [
  { n: '.01', name: 'Project kick-off', line: 'Discovery, research & wireframing', first: 0 },
  { n: '.02', name: 'Design & prototype', line: 'UI design & prototype review', first: 3 },
  { n: '.03', name: 'Build & launch', line: 'Build, test & deployment', first: 4 }
];
const stageOf = i => (i < 3 ? 0 : i === 3 ? 1 : 2);
const TEAM = [
  ['Venkata Leeladhar Abburi', 'Product Designer', 'Founder', 'https://www.linkedin.com/in/venkata-leeladhar-abburi', 'LB3wotBeJ0PdlE3kYB0eQbgqyc.jpeg'],
  ['Swarna Rajasekhar', 'Full Stack Developer', 'Engineering', 'https://www.linkedin.com/in/swarna-rajasekhar', 'plQmQGE0KIlyPplVY5sqdJxgo.jpeg'],
  ['Sk Mayif', 'Full Stack Developer', 'Engineering', 'https://www.linkedin.com/in/mayif-shaik-57536a318/', 'dGWrbDADO7DUhfazbIzjJZmWF4.png'],
  ['Chaitanya Alubilli', 'Full Stack Developer', 'Engineering', 'https://in.linkedin.com/in/chaitanya-alubilli-18a686289', 'rBxB0tSKx3dAoHoY7zdpwgxXiGI.jpeg'],
  ['M. Aravind', 'Full Stack Developer', 'Engineering', 'https://in.linkedin.com/in/aravind-m-8a010a344', 'CugNVMPBIXfiK4vRYyV6DVC3C38.jpg']
];
const QUOTE = ['They delivered a clean, professional landing page for Timelly faster than expected. The design quality was exactly what we needed to represent our brand.', 'Kartheek Srirama', 'M.D, Vision Triad Technologies', 'AHjHbZTFmQd6KSlMf7CaNtOkUw.png'];
const FAQ = [
  ['What does One Stop Solutions do?', 'We design, build and scale digital products. Websites, ERPs, dashboards, SaaS and mobile apps. For startups, institutions and businesses.'],
  ['How long does a project take?', 'A simple website takes 4–7 days. A full product, design and development, takes 2–8 weeks. It depends on scope.'],
  ['Can we buy one of your products?', 'Yes. License one, customise it, or get your own built the same way. Tell us which one and we’ll talk terms.'],
  ['What if I don’t like the design?', 'We work with you throughout. Every project has revision rounds. We refine until it matches your vision.'],
  ['Do you work outside Andhra Pradesh?', 'Yes. We work fully remote, across India and abroad. Calls, Notion and Figma.'],
  ['Who owns the work?', 'You do. Code, designs and accounts are in your name.']
];
const NEEDS = ['Website', 'ERP / dashboard', 'SaaS / web app', 'Mobile app', 'UI/UX design', 'One of your products', 'Brand or deck', 'Automation & AI'];

const initials = n => n.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const face = (n, file) => `<span class="face"><b>${initials(n)}</b><img src="${FR}${file}?scale-down-to=512" alt="" loading="lazy" referrerpolicy="no-referrer" data-remote></span>`;
const imgSrc = (p, n) => (typeof n === 'string' ? `img/${n}.webp` : IMG(p.key, n));
const thumbOf = p => (p.key ? `<img src="${imgSrc(p, p.cover)}" alt="" loading="lazy">` : p.logo ? `<span class="tile is--logo"><img src="img/logo-${p.logo}.webp" alt="" loading="lazy"></span>` : `<span class="tile"><b>${esc(p.mark || p.name)}</b></span>`);
const ext = u => (/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : '');

/* A browser frame or a set of phones, with the project's own screens */
function shot(p, n, kind, url) {
  const src = imgSrc(p, n);
  if (kind === 'phone') return `<span class="phone"><img src="${src}" alt="" loading="lazy"></span>`;
  const tall = kind === 'tall';
  return `<span class="frame${tall ? ' is--tall' : ''}"><span class="frame__bar"><i></i><i></i><i></i><em>${esc(url || p.url || '')}</em></span><span class="frame__view"><img src="${tall ? IMG(p.key, n, true) : src}" alt="" loading="lazy"></span></span>`;
}
function stage(p) {
  const phones = p.imgs.filter(i => i[1] === 'phone');
  if (phones.length) return `<span class="phones n-${Math.min(phones.length, 3)}">${phones.slice(0, 3).map(([n]) => shot(p, n, 'phone')).join('')}</span>`;
  const [n, kind] = p.imgs.find(i => i[0] === p.cover) || p.imgs[0];
  return shot(p, n, kind);
}

/* ---------- Hero reel and brands ---------- */
function renderReel() {
  const items = P.filter(p => p.key).map(p => `<button class="reel-card" type="button" data-case="${p.id}" tabindex="-1"><span class="reel-card__img">${thumbOf(p)}</span><span class="reel-card__cap"><b>${esc(p.name)}</b><em>${esc(p.kind)}</em></span></button>`).join('');
  $('#hero-reel').innerHTML = `<div class="marquee__list">${items}</div><div class="marquee__list" aria-hidden="true">${items}</div>`;
  const logos = LOGOS.map(([k, n]) => `<span class="brand"><img src="img/logo-${k}.webp" alt="${esc(n)}" loading="lazy"></span>`).join('');
  $('#brands').innerHTML = `<div class="marquee__list">${logos}</div><div class="marquee__list" aria-hidden="true">${logos}</div>`;
}

/* ---------- Featured work ---------- */
function renderCases() {
  $('#cases').innerHTML = FEATURED.map((id, i) => {
    const p = byId(id);
    const thumbs = p.imgs.length > 1 ? `<div class="case__thumbs" role="group" aria-label="${esc(p.name)} screens">${p.imgs.slice(0, 6).map(([n, k], j) => `<button type="button" class="case__thumb${j === 0 ? ' is--on' : ''}" data-swap="${id}" data-n="${n}" data-k="${k}" aria-label="Screen ${j + 1}"><img src="${imgSrc(p, n)}" alt="" loading="lazy"></button>`).join('')}</div>` : '';
    return `<article class="case${i % 2 ? ' is--flip' : ''}" data-id="${id}">
      <div class="case__visual"><button class="case__stage" type="button" data-case="${id}" aria-label="Open the ${esc(p.name)} case study" id="stage-${id}">${stage(p)}</button>${thumbs}</div>
      <div class="case__text">
        <span class="case__n tnum">${pad(i + 1)}</span>
        <p class="eyebrow">${esc(p.industry)}</p>
        <h3 class="h-l">${esc(p.name)}</h3>
        <p class="p-l case__line">${esc(p.line)}</p>
        <ul class="case__pts">${p.build.slice(0, 3).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="tag-pair">${p.tags.map((t, k) => `<span class="tag" data-theme="${k ? 'haze' : 'ink'}"${k % 2 ? ' data-shape="round"' : ''}>${esc(t)}</span>`).join('')}</div>
        <div class="btn-row">
          <button class="btn" type="button" data-theme="ink" data-case="${id}"><span class="btn__label">Case study</span></button>
          ${p.live ? `<button class="btn" type="button" data-theme="volt" data-shape="round" data-live="${id}"><span class="btn__label">Live preview</span><svg class="btn__icon" viewBox="0 0 12 12" aria-hidden="true"><use href="#i-play"/></svg></button>` : '<span class="case__soon">Launching soon</span>'}
        </div>
      </div></article>`;
  }).join('');
  $('#allband-thumbs').innerHTML = P.filter(p => p.key && !FEATURED.includes(p.id)).slice(0, 5).map(p => `<span>${thumbOf(p)}</span>`).join('');
}
function swapScreen(b) {
  const p = byId(b.dataset.swap), raw = b.dataset.n, n = /^\d+$/.test(raw) ? +raw : raw;
  const el = $('#stage-' + p.id);
  el.innerHTML = b.dataset.k === 'phone' ? stage(p) : shot(p, n, b.dataset.k);
  $$(`[data-swap="${p.id}"]`).forEach(x => x.classList.toggle('is--on', x === b));
}

/* ---------- Case study modal ---------- */
let caseIdx = 0;
function caseHTML(p) {
  const list = (h, a) => (a && a.length ? `<div class="cm__col"><h4 class="eyebrow">${h}</h4><ul>${a.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>` : '');
  const gal = p.imgs.map(([n, k]) => k === 'phone' ? shot(p, n, 'phone') : `<span class="cm__shot">${shot(p, n, k)}</span>`).join('');
  const feat = FEATURED.includes(p.id), fi = FEATURED.indexOf(p.id);
  const nav = feat ? `<div class="pm__nav"><button class="btn" type="button" data-theme="bone" data-case="${FEATURED[(fi + 4) % 5]}"><span class="btn__label">← ${esc(byId(FEATURED[(fi + 4) % 5]).name)}</span></button><button class="btn" type="button" data-theme="volt" data-case="${FEATURED[(fi + 1) % 5]}"><span class="btn__label">${esc(byId(FEATURED[(fi + 1) % 5]).name)} →</span></button></div>` : '';
  return `<div class="cm"><div class="cm__head"><div class="tag-pair"><span class="tag">${esc(p.industry || p.kind)}</span>${p.tags.map(t => `<span class="tag" data-theme="haze" data-shape="round">${esc(t)}</span>`).join('')}</div><h2 class="h-l" id="case-title">${esc(p.name)}</h2><p class="p-l">${esc(p.line || p.kind)}</p>
    <div class="btn-row">${p.live ? `<button class="btn" type="button" data-theme="volt" data-live="${p.id}"><span class="btn__label">Live preview</span></button>` : ''}${p.links.map(([l, u]) => `<a class="btn" data-theme="bone" data-shape="round" href="${u}"${ext(u)}><span class="btn__label">${esc(l)}</span><svg class="btn__icon" viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></a>`).join('')}</div></div>
    ${p.idea ? `<div class="cm__story">${list('The idea', p.idea)}${list('What we built', p.build)}${list('The result', p.result)}</div>` : ''}
    <div class="cm__gal${p.imgs.some(i => i[1] === 'phone') ? ' is--phones' : ''}">${gal}</div>${nav}</div>`;
}
function openCase(id, trigger) {
  const p = byId(id);
  if (!p || !p.key) { if (p && p.live) openLive(id, trigger); return; }
  const body = $('#case-body');
  body.innerHTML = caseHTML(p);
  initButtons(body);
  body.scrollTop = 0;
  const m = $('.modal[data-modal="case"]');
  if (m.dataset.open !== 'true') openModal('case', trigger); else $('.modal__panel', m).focus({ preventScroll: true });
}

/* ---------- All projects ---------- */
let apCat = 'all';
function renderAll() {
  $('#ap-cats').innerHTML = CATS.map(([k, l]) => `<button class="chip" type="button" data-cat="${k}" aria-pressed="${k === apCat}">${l} <span class="tnum">${k === 'all' ? P.length : P.filter(p => p.cat === k).length}</span></button>`).join('');
  $('#ap-grid').innerHTML = P.filter(p => apCat === 'all' || p.cat === apCat).map(p => `<article class="ap__card">
    <button class="ap__img" type="button" ${p.key ? `data-case="${p.id}"` : p.live ? `data-live="${p.id}"` : 'disabled'} aria-label="${esc(p.name)}">${thumbOf(p)}</button>
    <div class="ap__body"><div><h3 class="h-xs">${esc(p.name)}</h3><p class="p-s">${esc(p.kind)}</p></div>
    <div class="ap__acts">${p.live ? `<button type="button" class="ap__btn is--live" data-live="${p.id}">Live preview</button>` : ''}${p.key ? `<button type="button" class="ap__btn" data-case="${p.id}">Screens</button>` : ''}${p.links.slice(0, 1).map(([l, u]) => `<a class="ap__btn" href="${u}"${ext(u)}>${esc(l)} ↗</a>`).join('')}${!p.live && !p.key && !p.links.length ? '<span class="ap__btn is--muted">Design · on request</span>' : ''}</div></div></article>`).join('');
}

/* ---------- Live preview ---------- */
let lvMode = 'desk', lvP = null;
function sizeLive() {
  const st = $('#lv-stage'), f = $('#lv-frame iframe');
  if (!f) return;
  const W = lvMode === 'desk' ? 1440 : 390, H = lvMode === 'desk' ? 900 : 844;
  const s = Math.min(st.clientWidth / W, st.clientHeight / H, lvMode === 'desk' ? 1 : 1.1);
  f.style.width = W + 'px'; f.style.height = H + 'px';
  f.style.transform = `translate(-50%,-50%) scale(${s.toFixed(4)})`;
  $('#lv-frame').classList.toggle('is--phone', lvMode === 'phone');
}
function openLive(id, trigger) {
  const p = byId(id);
  if (!p || !p.live) return;
  lvP = p;
  lvMode = isMobile() ? 'phone' : 'desk';
  $$('[data-lv]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.lv === lvMode)));
  $('#lv-title').textContent = p.liveName || p.name;
  $('#lv-url').textContent = p.live.replace(/^https?:\/\//, '').replace(/\/$/, '');
  $('#lv-open').href = p.live;
  $('#lv-load').hidden = false;
  $('#lv-frame').innerHTML = `<iframe title="Live preview of ${esc(p.name)}" src="${p.live}" loading="eager" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>`;
  $('#lv-frame iframe').addEventListener('load', () => setTimeout(() => { $('#lv-load').hidden = true; }, 400));
  openModal('live', trigger);
  requestAnimationFrame(sizeLive);
}
function initLive() {
  const m = $('.modal[data-modal="live"]');
  m.addEventListener('modal:close', () => { $('#lv-frame').innerHTML = ''; });
  $$('[data-lv]').forEach(b => b.addEventListener('click', () => { lvMode = b.dataset.lv; $$('[data-lv]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); sizeLive(); }));
  window.addEventListener('resize', sizeLive);
}

/* ---------- Services and products ---------- */
function renderServices() {
  $('#core').innerHTML = CORE.map(c => `<article class="svc4"><div class="svc4__top"><span class="svc4__n">${c.n}.</span><div class="tag-pair">${c.tags.map((t, k) => `<span class="tag" data-theme="haze"${k % 2 ? ' data-shape="round"' : ''}>${esc(t)}</span>`).join('')}</div></div>
    <h3 class="h-m">${esc(c.name)}</h3><p class="p-m">${esc(c.line)}</p><span class="svc4__img${c.phone ? ' is--phone' : ''}"><img src="${c.img}" alt="" loading="lazy"></span>
    <div class="svc4__foot"><span class="eyebrow">${esc(c.work)}</span><a class="btn" data-theme="ink" data-shape="round" data-size="s" href="#contact" data-need="${esc(c.name)}"><span class="btn__label">Start this project</span></a></div></article>`).join('');
  $('#also').innerHTML = ALSO.map(([t, l], i) => `<div class="also__item"><span class="eyebrow tnum">${pad(i + 1)}</span><b>${esc(t)}</b><span>${esc(l)}</span></div>`).join('');
  $('#prods').innerHTML = PRODS.map(x => `<article class="prod"><div class="prod__img${x.phone ? ' is--phone' : ''}">${x.mark ? '<span class="prod__mark"><svg viewBox="0 0 80 80" aria-hidden="true"><use href="#i-glyph"/></svg>Agency OS</span>' : `<img src="${x.img}" alt="" loading="lazy">`}<span class="tag" data-theme="${x.status === 'Live' ? 'volt' : 'white'}" data-shape="round">${x.status}</span></div>
    <div class="prod__body"><p class="eyebrow">${esc(x.from)}</p><h3 class="h-s">${esc(x.name)}</h3><p class="p-s">${esc(x.line)}</p>
    <div class="prod__acts"><a class="btn" data-theme="volt" data-size="s" href="#contact" data-need="One of your products" data-product="${esc(x.name)}"><span class="btn__label">License or build one</span></a>${x.deck ? `<a class="btn" data-theme="glass" data-shape="round" data-size="s" href="${x.deck}"><span class="btn__label">Deck</span></a>` : ''}${byId(x.p).live ? `<button class="btn" type="button" data-theme="glass" data-shape="round" data-size="s" data-live="${x.p}"><span class="btn__label">Preview</span></button>` : ''}</div></div></article>`).join('');
}

/* ---------- Process: stages + draggable phase cards ---------- */
const PH = C.phases;
const PHASE_THEME = ['volt', 'dark', 'violet', 'light', 'black', 'volt', 'cloud'];
let phaseActive = -1;
function renderProcess() {
  $('#stages').innerHTML = STAGES.map((s, i) => `<button class="stg" type="button" data-stage="${i}" aria-pressed="${i === 0}"><span class="stg__n tnum">${s.n}</span><span class="eyebrow">${esc(s.name)}</span><b>${esc(s.line)}</b></button>`).join('');
  $('#phase-cards').innerHTML = PH.map((p, i) => `<div class="gslider__item" data-i="${i}"><article class="stage-card is--${PHASE_THEME[i]}" aria-label="Phase ${p.n}: ${esc(p.name)}"><div class="stage-card__top"><div class="tag-pair"><span class="tag">${esc(STAGES[stageOf(i)].name)}</span><span class="tag" data-shape="round">${p.n} / 06</span></div></div><div class="stage-card__num" aria-hidden="true">${p.n}</div><div class="stage-card__body"><h3 class="h-m">${esc(p.name)}</h3><p class="p-m">${esc(p.tag)}. ${esc(p.short)}</p><p class="stage-card__out">${p.gate ? 'Sign-off: ' + esc(p.gate) : PH[i + 1] ? 'Flows into ' + esc(PH[i + 1].name) : 'Ongoing. Reviewed every quarter.'}</p></div></article></div>`).join('');
}
function setPhase(i) {
  if (i === phaseActive) return;
  phaseActive = i;
  const p = PH[i];
  const lane = (label, items, cls = '') => `<div class="sd__lane ${cls}"><h4>${label}</h4><ul class="dl">${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
  $('#phase-detail').innerHTML = `<div class="sd"><div class="sd__head"><span class="sd__num">${p.n} / 06</span><h3 class="h-m">${esc(p.name)}</h3><p class="sd__out">${esc(p.intro)}</p></div><div class="sd__lanes">${lane('We do', p.do)}${lane('You get', p.get, 'is--get')}${lane('We need from you', p.need)}<div class="sd__lane is--kb"><h4>Your sign-off</h4><p class="h-xs">${esc(p.gate || 'Ongoing care')}</p></div></div></div>`;
  $$('#stages [data-stage]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.stage === stageOf(i))));
  $$('#phase-cards .gslider__item').forEach((it, k) => it.setAttribute('aria-current', k === i ? 'true' : 'false'));
}
function initPhaseSlider() {
  const coll = $('#process .gslider__collection'), list = $('#phase-cards'), items = $$('.gslider__item', list), N = items.length;
  let snaps = [], current = 0, move = () => {};
  const go = i => { i = clamp(i, 0, N - 1); setPhase(i); current = i; move(i); };
  coll.setAttribute('tabindex', '0');
  coll.setAttribute('aria-label', 'Phases. Use left and right arrow keys.');
  coll.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); } });
  $('#stages').addEventListener('click', e => { const b = e.target.closest('[data-stage]'); if (b) go(STAGES[+b.dataset.stage].first); });
  setPhase(0);
  if (!hasG || !window.Draggable) {
    move = i => { const it = items[i]; coll.scrollTo({ left: it.offsetLeft + it.offsetWidth / 2 - coll.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' }); };
    items.forEach((it, i) => it.addEventListener('click', () => go(i)));
    return;
  }
  const measure = () => { const cw = coll.clientWidth; snaps = items.map(it => cw / 2 - (it.offsetLeft + it.offsetWidth / 2)); };
  const render = () => {
    const x = gsap.getProperty(list, 'x'), cw = coll.clientWidth;
    items.forEach(it => {
      const d = (it.offsetLeft + it.offsetWidth / 2 + x - cw / 2) / (it.offsetWidth + 20);
      const a = clamp(d * 7.5, -36, 36), y = (1 - Math.cos(a * Math.PI / 180)) * it.offsetWidth * 4.2;
      it.style.transform = `translate3d(0,${y.toFixed(1)}px,0) rotate(${a.toFixed(2)}deg)`;
    });
  };
  const nearest = x => { let best = 0, bd = 1e9; snaps.forEach((s, i) => { const d = Math.abs(s - x); if (d < bd) { bd = d; best = i; } }); return best; };
  move = i => gsap.to(list, { x: snaps[i], duration: reduce ? 0 : 1, ease: 'expo.out', onUpdate: render, overwrite: true });
  measure(); gsap.set(list, { x: snaps[0] }); render();
  let dragged = false;
  const drag = Draggable.create(list, {
    type: 'x', inertia: hasInertia, edgeResistance: 0.82, bounds: { minX: snaps[N - 1], maxX: snaps[0] },
    snap: hasInertia ? { x: v => snaps[nearest(v)] } : undefined, zIndexBoost: false, allowContextMenu: true,
    onPress() { dragged = false; gsap.killTweensOf(list); },
    onDrag() { dragged = true; render(); const i = nearest(this.x); if (i !== current) { current = i; setPhase(i); } },
    onThrowUpdate() { render(); const i = nearest(this.x); if (i !== current) { current = i; setPhase(i); } },
    onRelease() { if (!hasInertia && dragged) { const i = nearest(this.x); current = i; setPhase(i); move(i); } },
    onClick(e) { if (dragged) return; const it = e.target.closest('.gslider__item'); if (it) go(+it.dataset.i); }
  })[0];
  window.addEventListener('resize', () => { measure(); drag.applyBounds({ minX: snaps[N - 1], maxX: snaps[0] }); gsap.set(list, { x: snaps[current] }); render(); });
}

/* ---------- Proof, team, FAQ ---------- */
function renderPeople() {
  $('#quote-text').textContent = '“' + QUOTE[0] + '”';
  $('#quote-name').textContent = QUOTE[1];
  $('#quote-role').textContent = QUOTE[2];
  $('[data-face]').outerHTML = face(QUOTE[1], QUOTE[3]);
  $('#crew').innerHTML = TEAM.map(([n, r, t, li, f], i) => `<article class="mate${i === 0 ? ' is--lead' : ''}"><span class="mate__photo">${face(n, f)}</span><div class="mate__body"><span class="tag" data-theme="${i ? 'glass' : 'volt'}" data-shape="round">#${esc(t)}</span><h3 class="h-xs">${esc(n)}</h3><p class="p-s">${esc(r)}</p><a class="mate__in" href="${li}" target="_blank" rel="noopener" aria-label="${esc(n)} on LinkedIn">in</a></div></article>`).join('');
  $('#faq-list').innerHTML = FAQ.map(([q, a], i) => `<details class="qa"${i === 0 ? ' open' : ''}><summary><span class="tnum">${pad(i + 1)}</span><b>${esc(q)}</b><i aria-hidden="true"></i></summary><p>${esc(a)}</p></details>`).join('');
  $$('[data-count-all]').forEach(e => { e.textContent = String(P.length); });
  $$('[data-year]').forEach(e => { e.textContent = String(new Date().getFullYear()); });
}
function initImages() {
  $$('img[data-remote]').forEach(img => {
    const ok = () => img.classList.add('is--ok'), bad = () => img.remove();
    if (img.complete) { if (img.naturalWidth) ok(); else bad(); }
    img.addEventListener('load', ok); img.addEventListener('error', bad);
  });
}

/* ---------- Contact form: compose a WhatsApp or email message ---------- */
const picked = new Set();
let product = '';
function hint() {
  const quick = ['Website', 'UI/UX design', 'Brand or deck'], big = ['ERP / dashboard', 'SaaS / web app', 'Mobile app', 'One of your products'];
  const has = a => a.some(x => picked.has(x));
  $('#hint').textContent = !picked.size ? 'Pick what you need. We’ll suggest a timeline.'
    : has(big) ? 'Typical time: 2–8 weeks for a full product. We confirm on a call.'
    : has(quick) ? 'Typical time: 4–7 days for a simple website.' : 'We’ll plan the timeline with you on a call.';
}
function setNeed(n, on) {
  if (on) picked.add(n); else picked.delete(n);
  $$('#needs [data-n]').forEach(b => b.setAttribute('aria-pressed', String(picked.has(b.dataset.n))));
  hint();
}
function initForm() {
  $('#needs').innerHTML = NEEDS.map(n => `<button class="chip" type="button" data-n="${esc(n)}" aria-pressed="false">${esc(n)}</button>`).join('');
  $('#needs').addEventListener('click', e => { const b = e.target.closest('[data-n]'); if (b) setNeed(b.dataset.n, !picked.has(b.dataset.n)); });
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-need]');
    if (!a) return;
    const map = { 'UI/UX & product design': 'UI/UX design', Websites: 'Website', 'ERPs, SaaS & dashboards': 'ERP / dashboard', 'Mobile apps': 'Mobile app' };
    setNeed(map[a.dataset.need] || a.dataset.need, true);
    if (a.dataset.product) { product = a.dataset.product; const t = $('#brief [name="msg"]'); if (!t.value) t.value = `I’m interested in ${product}.`; }
  });
  let via = 'wa';
  $$('#brief [data-via]').forEach(b => b.addEventListener('click', () => { via = b.dataset.via; }));
  $('#brief').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.currentTarget), v = k => String(f.get(k) || '').trim();
    const lines = ['Hi One Stop Solutions,', v('msg') || 'I have a project in mind.', picked.size ? 'I need: ' + [...picked].join(', ') : '', v('name') ? 'Name: ' + v('name') : '', v('phone') ? 'Phone: ' + v('phone') : '', v('email') ? 'Email: ' + v('email') : ''].filter(Boolean);
    const text = lines.join('\n');
    if (via === 'wa') window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    else window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent('Project enquiry' + (v('name') ? ' from ' + v('name') : ''))}&body=${encodeURIComponent(text)}`;
    toast(via === 'wa' ? 'Opening WhatsApp…' : 'Opening your email app…');
  });
}

/* ---------- Clicks, hero motion ---------- */
function initClicks() {
  document.addEventListener('click', e => {
    const lv = e.target.closest('[data-live]');
    if (lv) { e.preventDefault(); openLive(lv.dataset.live, lv); return; }
    const sw = e.target.closest('[data-swap]');
    if (sw) { swapScreen(sw); return; }
    const c = e.target.closest('[data-case]');
    if (c) { e.preventDefault(); openCase(c.dataset.case, c); return; }
    const all = e.target.closest('[data-all-open]');
    if (all) { setNav(false); closeModal($('.modal[data-modal="case"]')); renderAll(); openModal('all', all); return; }
    const cat = e.target.closest('[data-cat]');
    if (cat) { apCat = cat.dataset.cat; renderAll(); }
  });
}
function initHero() {
  if (!hasG || reduce) return;
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.nav__bar', { yPercent: -120, duration: 1.1 }, 0)
    .from('[data-hero-word]', { yPercent: 105, duration: 1.4 }, 0.1)
    .from('[data-hero-fade]', { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.4)
    .from('.oh__reel', { y: 80, autoAlpha: 0, duration: 1.4 }, 0.5);
}

/* ---------- Boot ---------- */
safe('render', () => { renderReel(); renderCases(); renderServices(); renderProcess(); renderPeople(); renderAll(); });
safe('images', initImages);
safe('buttons', () => initButtons());
safe('lenis', initLenis);
safe('nav', initNav);
safe('events', initGlobalEvents);
safe('clicks', initClicks);
safe('live', initLive);
safe('phases', initPhaseSlider);
safe('form', initForm);
safe('copy', initCopy);
safe('cursor', () => initCursor('.case__stage, .ap__img:not([disabled]), .reel-card'));
safe('hero', initHero);
safe('reveals', initReveals);
if (hasG && window.ScrollTrigger) window.addEventListener('load', () => ScrollTrigger.refresh());
