/* ===== App ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const html = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const hasG = typeof window.gsap !== 'undefined';
html.classList.add(hasG ? 'has-gsap' : 'no-gsap');
if (hasG) ['ScrollTrigger', 'Draggable', 'InertiaPlugin', 'CustomEase'].forEach(n => { if (window[n]) gsap.registerPlugin(window[n]); });
const hasInertia = hasG && !!window.InertiaPlugin;
const safe = (name, fn) => { try { fn(); } catch (e) { console.error('[' + name + ']', e); } };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const mk = t => `<i class="mk mk--${t}" role="img" aria-label="${T[t]}" title="${T[t]}"></i>`;
const feat = ([label, t, free]) => `<li class="f" data-t="${t}"${free ? ' data-free="1"' : ''}>${mk(t)}<span>${esc(label)}</span>${free ? '<b class="free">Free</b>' : ''}</li>`;
const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
const onVisible = (el, cb, opts = {}) => {
  if (!('IntersectionObserver' in window)) { cb(true); return; }
  const io = new IntersectionObserver(es => es.forEach(e => cb(e.isIntersecting, io)), opts);
  io.observe(el);
  return io;
};
let lenis = null;

/* ---------- Content renderers ---------- */
function renderRadial() {
  const items = [['pipeline', 'Leads pipeline', 'Grow'], ['proposal', 'Proposals, e-signed', 'Grow'], ['portal', 'Client portal', 'Deliver'], ['invoice', 'Milestone invoices', 'Money'], ['gantt', 'Six project views', 'Deliver'], ['prompt', 'Playbook prompts', 'Playbook'], ['handoff', 'Handoff package', 'Hand off'], ['review', 'Verified reviews', 'Get found'], ['overlap', 'Overlap hours', 'Premium'], ['profile', 'Public profile', 'Get found'], ['sow', 'Document studio', 'Paperwork'], ['attendance', 'Attendance & updates', 'Team']];
  const all = items.concat(items);
  const list = $('#radial-list');
  list.style.setProperty('--step', (360 / all.length) + 'deg');
  list.innerHTML = all.map(([v, t, l], i) => `<div class="radial__item" style="--i:${i}"${i >= items.length ? ' aria-hidden="true"' : ''}><div class="radial__card"><div class="media"><div class="mui">${V[v]()}</div></div><div class="radial__info"><p>${esc(t)}</p><span class="eyebrow">${l}</span></div></div></div>`).join('');
}

function renderTicker() {
  const names = STAGES.concat(STAGES[0]).map(s => `<span><i>${pad(s.n)}</i>${esc(s.name)}</span>`).join('');
  $('#reel-ticker').innerHTML = `<span class="reel__ticker-track">${names}</span>`;
  const track = $('.reel__ticker-track');
  if (reduce) return;
  let i = 0;
  setInterval(() => {
    if (document.hidden) return;
    i++;
    track.style.transition = '';
    track.style.transform = `translateY(${-i * 100 / (STAGES.length + 1)}%)`;
    if (i === STAGES.length) setTimeout(() => { track.style.transition = 'none'; track.style.transform = 'translateY(0)'; i = 0; }, 900);
  }, 2200);
}

const LIVE = [
  ['portal', 'Branded client portal', 'Client portal', 'Every client gets a branded login and one welcome page.'],
  ['gantt', 'Six project views', 'Projects', 'Kanban, List, Calendar, Gantt, Whiteboard and Goals.'],
  ['invoice', 'Invoices & Razorpay links', 'Finance', 'Milestone and retainer invoices, paid online.'],
  ['proposal', 'Contracts & e-signature', 'Documents', 'Signed digitally, with an audit trail.'],
  ['attendance', 'Daily updates & attendance', 'Team', 'The team checks in and posts what they did.'],
  ['hr', 'Salaries & payslips', 'HR portal', 'Leave, payslips and notices in the same app.']
];
function renderLive() {
  $('#live-slides').innerHTML = LIVE.map(([v, t, cat, d], i) => `<article class="live-card"><div class="live-card__start"><div class="tag-pair"><span class="tag">Live today</span><span class="tag" data-shape="round">${esc(cat)}</span></div><div class="live-card__title"><h3 class="h-s">${esc(t)}</h3><p class="p-s">${esc(d)}</p></div><span class="eyebrow">${pad(i + 1)} / ${pad(LIVE.length)}</span></div><div class="media"><div class="mui">${V[v]()}</div></div></article>`).join('');
}

const MESS = [
  ['Portfolio PDF', 'Public profile', 'found', [13, 17, -6], [18, 24], [22, 12, -6], [27, 16]],
  ['Review screenshots', 'Verified reviews', 'found', [79, 13, 5], [18, 36], [70, 10, 5], [73, 16]],
  ['Instagram DMs', 'Leads pipeline', 'grow', [36, 30, 4], [50, 24], [34, 24, 4], [27, 27]],
  ['Word quotes', 'Quotes & proposals', 'grow', [63, 24, -5], [50, 36], [72, 30, -5], [73, 27]],
  ['Google Forms', 'Intake forms', 'grow', [87, 41, 7], [50, 48], [26, 40, 7], [27, 38]],
  ['Trello boards', 'Projects & phases', 'deliver', [17, 51, 3], [82, 22], [70, 46, 3], [73, 38]],
  ['WhatsApp groups', 'Client portal', 'deliver', [52, 53, -4], [82, 32], [30, 56, -4], [27, 49]],
  ['Excel invoices', 'Invoices & payments', 'deliver', [80, 63, 6], [82, 42], [72, 62, 6], [73, 49]],
  ['Attendance register', 'Team & HR', 'deliver', [16, 80, -7], [82, 52], [26, 72, -7], [27, 60]],
  ['Zip over email', 'Handoff package', 'deliver', [45, 77, 5], [82, 62], [66, 79, 5], [73, 60]],
  ['Notes app', 'Process & SOPs', 'kb', [68, 89, -3], [38, 82], [30, 88, -3], [27, 82]],
  ['Bookmarks', 'Saved tools & sites', 'kb', [89, 83, 6], [62, 82], [74, 91, 6], [73, 82]]
];
const MESS_LINKS = [[0, 2, 1], [2, 3, 0], [3, 7, 1], [6, 9, 0], [5, 6, 1], [4, 5, 0], [10, 1, 0], [11, 8, 1], [7, 10, 0], [9, 0, 0], [1, 4, 1], [8, 3, 0]];
function renderMess() {
  const ul = $('#mess-chips');
  const m = isMobile();
  ul.innerHTML = MESS.map(([from, to, g, a, b, am, bm], k) => {
    const A = m ? am : a, B = m ? bm : b;
    return `<li class="mess__chip" data-g="${g}" style="--k:${k};--ax:${A[0]}%;--ay:${A[1]}%;--ar:${A[2]}deg;--bx:${B[0]}%;--by:${B[1]}%"><span class="mess__chip-inner"><span class="from">${esc(from)}</span><span class="to">${esc(to)}</span></span></li>`;
  }).join('');
  const P0 = i => (m ? MESS[i][5] : MESS[i][3]);
  $('#mess-lines').innerHTML = MESS_LINKS.map(([i, j, red]) => {
    const [x1, y1] = P0(i), [x2, y2] = P0(j);
    const cx = (x1 + x2) / 2 + (y2 - y1) * 0.35, cy = (y1 + y2) / 2 - (x2 - x1) * 0.35;
    return `<path class="${red ? 'is--red' : ''}" d="M${x1} ${y1} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}"/>`;
  }).join('');
  $('.mess__cols').hidden = m;
}

const PAINS = [
  ['Enquiries scattered across Instagram, referrals and ads', 'Every enquiry in one pipeline, with its source'],
  ['Onboarding starts by retyping the lead', 'Client record prefilled from the lead, in one click'],
  ['Quotes and contracts in loose Word files', 'Branded proposals, SOWs and NDAs, e-signed'],
  ['Clients keep asking for a status update', 'Clients watch progress in their own portal'],
  ['Nobody knows who did what', 'Workload, time logs and payouts per person'],
  ['Invoices chased by hand', 'Milestone invoices, auto-reminders, paid in the portal'],
  ['Handoff is a zip file over email', 'One handoff package, signed in the portal'],
  ['The process lives in someone’s head', 'The Playbook: SOPs, prompts, tools and templates']
];
function renderPains() {
  $('#pains').innerHTML = PAINS.map(([a, b], i) => `<li class="pain"><span class="pain__n">${pad(i + 1)}</span><span class="pain__from">${esc(a)}</span><span class="pain__to">${esc(b)}</span></li>`).join('');
}

function renderDash() {
  $('#dash').innerHTML = dashHTML(false);
  $('#mini-dash').innerHTML = dashHTML(false);
}

const CAL = {
  owner: {
    feats: [['Meetings, deadlines & milestones', 'n'], ['Team leave & holidays', 'n'], ['Invoice due dates', 'n'], ['Google Calendar & Meet sync', 'c']],
    days: [[['10:00', 'Kickoff · Google Meet', 'violet'], ['16:00', 'Milestone: design gate', 'volt']], [['11:30', 'Discovery call · Meet', 'violet'], ['Due', 'Invoice INV-024', 'line']], [['All day', 'Team leave · Backend', ''], ['15:00', 'Design review', 'violet']], [['Due', 'Invoice INV-031', 'line'], ['12:00', 'Weekly status report', '']], [['All day', 'Public holiday', 'line'], ['17:00', 'Retainer renewal call', 'violet']]]
  },
  team: {
    feats: [['My tasks by due date', 'n'], ['My meetings with reminders', 'c'], ['Leave & holiday calendar', 'b']],
    days: [[['10:00', 'Standup · Meet', 'violet'], ['Due', 'Task: hero section', 'volt']], [['Due', 'Task: pricing page', 'volt'], ['14:00', 'Design sync · Meet', 'violet']], [['All day', 'My leave · approved', '']], [['10:00', 'Standup · Meet', 'violet'], ['Due', 'Task: QA fixes', 'volt']], [['All day', 'Public holiday', 'line']]]
  },
  client: {
    feats: [['Meetings with the agency', 'c'], ['Milestones & approvals due', 'n'], ['Invoice due dates', 'n'], ['Booking link for the next call', 'n']],
    days: [[['11:00', 'Review call with the agency', 'violet']], [['Due', 'Approve the PRD', 'volt']], [['Due', 'Invoice · ₹48,000', 'line']], [['15:00', 'Design demo', 'violet'], ['Due', 'Approve the design gate', 'volt']], [['Book', 'Next call · booking link', 'line']]]
  }
};
function renderCal(view) {
  const d = CAL[view];
  $('#cal-features').innerHTML = d.feats.map(feat).join('');
  let k = 0;
  $('#cal-grid').innerHTML = d.days.map(evs => `<div class="cal__day">${evs.map(([t, l, c]) => `<div class="cal__ev${c ? ' is--' + c : ''}" style="--k:${k++}"><span>${esc(t)}</span><b>${esc(l)}</b></div>`).join('')}</div>`).join('');
  $$('[data-cal-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.calView === view)));
}

const STAGE_THEME = ['volt', 'dark', 'violet', 'light', 'black', 'volt', 'cloud', 'violet', 'dark', 'light'];
const STAGE_ICON = [
  '<circle cx="21" cy="21" r="12"/><path d="M30 30l10 10"/>',
  '<path d="M8 10h32l-12 14v12l-8 4V24z"/>',
  '<path d="M8 38c6-2 9-10 14-10s4 6 9 6 7-5 9-7"/><path d="M30 8l8 8-14 14h-8v-8z"/>',
  '<circle cx="20" cy="17" r="7"/><path d="M7 40c1-8 6-12 13-12s12 4 13 12M37 14v12M31 20h12"/>',
  '<rect x="8" y="8" width="32" height="32" rx="3"/><path d="M15 17h18M15 24h18M15 31h10"/>',
  '<rect x="8" y="8" width="14" height="14" rx="2"/><rect x="26" y="8" width="14" height="14" rx="2"/><rect x="8" y="26" width="14" height="14" rx="2"/><path d="M26 33h14M33 26v14"/>',
  '<path d="M8 12h24v16H18l-6 6v-6H8z"/><path d="M32 18h8v14h-4v5l-5-5h-7"/>',
  '<path d="M14 10h22M14 18h22M14 10c10 0 14 4 14 8s-4 8-14 8l14 14"/>',
  '<path d="M8 16l16-8 16 8v18l-16 8-16-8z"/><path d="M8 16l16 8 16-8M24 24v18"/>',
  '<path d="M8 38l10-10 7 6 15-16"/><path d="M30 18h10v10"/>'
];
function renderStages() {
  $('#stage-nav').innerHTML = STAGES.map((s, i) => `<button class="btn" type="button" data-theme="cloud"${i % 2 ? ' data-shape="round"' : ''} data-stage="${i}" aria-pressed="${i === 0}"><span class="btn__label"><span class="eyebrow">${pad(s.n)}</span> ${esc(s.name)}</span></button>`).join('');
  $('#stage-cards').innerHTML = STAGES.map((s, i) => {
    const all = [...s.agency, ...s.team, ...s.client];
    const c = t => all.filter(x => x[1] === t).length;
    return `<div class="gslider__item" data-i="${i}"><article class="stage-card is--${STAGE_THEME[i]}" aria-label="Stage ${s.n}: ${esc(s.name)}">
      <div class="stage-card__top"><div class="tag-pair"><span class="tag">Stage</span><span class="tag" data-shape="round">${pad(s.n)} / 10</span></div><svg class="stage-card__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${STAGE_ICON[i]}</svg></div>
      <div class="stage-card__num" aria-hidden="true">${pad(s.n)}</div>
      <div class="stage-card__body"><h3 class="h-m">${esc(s.name)}</h3><p class="p-m">${esc(s.short)}</p>
      <p class="stage-card__out">${esc(s.out)}</p>
      <div class="stage-card__counts"><span>${all.length} features</span><span>${mk('b')}${c('b')}</span><span>${mk('c')}${c('c')}</span><span>${mk('n')}${c('n')}</span><span>${s.kb.length} Playbook</span></div></div>
    </article></div>`;
  }).join('');
  $('#rail-stations').innerHTML = STAGES.map((s, i) => `<li><button class="rail__st" type="button" data-stage="${i}" aria-label="Stage ${s.n}: ${esc(s.name)}"><span class="rail__dot"></span><span class="rail__n">${pad(s.n)}</span><span class="rail__name">${esc(s.name)}</span></button></li>`).join('');
}
let stageActive = -1;
function setStage(i) {
  if (i === stageActive) return;
  stageActive = i;
  const s = STAGES[i];
  const lane = (label, items) => `<div class="sd__lane"><h4>${label}</h4><ul class="fl">${items.map(feat).join('')}</ul></div>`;
  $('#stage-detail').innerHTML = `<div class="sd"><div class="sd__head"><span class="sd__num">${pad(s.n)} / 10</span><h3 class="h-m">${esc(s.name)}</h3><p class="sd__out">${esc(s.out)}</p></div><div class="sd__lanes">${lane('Agency owner &amp; lead', s.agency)}${lane('Team', s.team)}${lane('Client &amp; hirer', s.client)}<div class="sd__lane is--kb"><h4>From the Playbook</h4><div class="kbchips">${s.kb.map(k => `<span>${esc(k)}</span>`).join('')}</div></div></div></div>`;
  $$('#stage-nav [data-stage]').forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
  $$('#rail-stations .rail__st').forEach((b, k) => { b.classList.toggle('is--active', k === i); b.classList.toggle('is--passed', k < i); b.setAttribute('aria-current', k === i ? 'step' : 'false'); });
  $('#rail-fill').style.transform = `scaleX(${i / (STAGES.length - 1)})`;
  $$('#stage-cards .gslider__item').forEach((it, k) => it.setAttribute('aria-current', k === i ? 'true' : 'false'));
}

const LOOP = [['Free profile + free tools'], ['Hirers find your profile'], ['Leads land in your pipeline'], ['Deliver on Agency OS', 1], ['Verified review + case study'], ['Profile ranks higher']];
function renderLoop() {
  $('#loop-nodes').innerHTML = LOOP.map(([t, hl], k) => {
    const a = k * Math.PI / 3, x = 50 + 37.5 * Math.sin(a), y = 50 - 37.5 * Math.cos(a);
    return `<div class="loop__node${hl ? ' is--hl' : ''}" style="--x:${x.toFixed(2)}%;--y:${y.toFixed(2)}%;--delay:${2 * k - 12}s">${esc(t)}</div>`;
  }).join('');
  $('#loop-arrows').innerHTML = LOOP.map((_, k) => {
    const deg = k * 60 + 30, a = deg * Math.PI / 180;
    return `<path d="M-6,-5 L6,0 L-6,5 Z" transform="translate(${(200 + 150 * Math.sin(a)).toFixed(1)},${(200 - 150 * Math.cos(a)).toFixed(1)}) rotate(${deg})"/>`;
  }).join('');
}

const FREE_TOOLS = ['Invoice generator', 'GST & rate calculators', 'Time-zone converter', 'Contract & proposal templates', 'PRD & SOW generator', 'Project estimate calculator', 'Client questionnaire templates', 'Tech-stack sheet maker'];
function renderTools() {
  const list = `<div class="marquee__list">${FREE_TOOLS.map(t => `<span class="tool-pill"><i></i>${esc(t)}</span>`).join('')}</div>`;
  $('#tools-marquee').innerHTML = list + list.replace('class="marquee__list"', 'class="marquee__list" aria-hidden="true"');
}

const PORTAL_ORDER = ['Agency owner', 'Client portal', 'Solo workspace', 'Project lead', 'Team member', 'HR', 'Public site & marketplace', 'Hirer account', 'Super admin'];
const PORTAL_VIS = { 'Public site & marketplace': 'search', 'Agency owner': 'kpis', 'Hirer account': 'inbox', 'Solo workspace': 'today', 'Client portal': 'portal', 'Project lead': 'tasks', 'Team member': 'mytasks', 'HR': 'hr', 'Super admin': 'mrr' };
const PORTALS_O = PORTAL_ORDER.map(n => PORTALS.find(p => p.name === n)).filter(Boolean);
const countT = items => ({ b: items.filter(x => x[1] === 'b').length, c: items.filter(x => x[1] === 'c').length, n: items.filter(x => x[1] === 'n').length });
function renderPortals() {
  $('#portal-cards').innerHTML = PORTALS_O.map((p, i) => {
    const items = p.sections.flatMap(s => s.items), c = countT(items);
    return `<div class="flick__item" role="listitem" data-i="${i}"><article class="portal-card" aria-label="${esc(p.name)} portal, ${items.length} features"><div class="media"><div class="mui">${V[PORTAL_VIS[p.name]]()}</div></div><div class="portal-card__info"><div class="portal-card__top"><div><h3 class="h-xs">${esc(p.name)}</h3><p class="p-s">${esc(p.who)}</p></div><span class="tag portal-card__plan" data-theme="${p.plan === 'Free' ? 'volt' : 'glass'}" data-shape="round">${esc(p.plan)}</span></div><div class="portal-card__counts"><span>${items.length} features</span><span>${mk('b')}${c.b}</span><span>${mk('c')}${c.c}</span><span>${mk('n')}${c.n}</span></div><div class="portal-card__open"><span>${p.sections.length} sections · open sitemap</span><svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></div></div></article></div>`;
  }).join('');
}
function portalModalHTML(i) {
  const p = PORTALS_O[i], items = p.sections.flatMap(s => s.items), c = countT(items);
  const prev = PORTALS_O[(i - 1 + PORTALS_O.length) % PORTALS_O.length].name, next = PORTALS_O[(i + 1) % PORTALS_O.length].name;
  return `<div class="pm"><div class="pm__head"><div class="tag-pair"><span class="tag">Portal ${pad(i + 1)} / ${pad(PORTALS_O.length)}</span><span class="tag" data-theme="violet" data-shape="round">${esc(p.plan)}</span></div><h2 class="h-l" id="portal-title">${esc(p.name)}</h2><p class="p-l">${esc(p.who)}</p><div class="pm__counts"><span>${items.length} features</span><span>${mk('b')}${T.b} · ${c.b}</span><span>${mk('c')}${T.c} · ${c.c}</span><span>${mk('n')}${T.n} · ${c.n}</span></div></div><div class="pm__grid">${p.sections.map(s => `<section class="pm__sec"><h3>${esc(s.t)}</h3><ul class="fl">${s.items.map(feat).join('')}</ul></section>`).join('')}</div><div class="pm__nav"><button class="btn" type="button" data-theme="bone" data-pm="-1"><span class="btn__label">← ${esc(prev)}</span></button><button class="btn" type="button" data-theme="ink" data-shape="round" data-pm="1"><span class="btn__label">${esc(next)} →</span></button></div></div>`;
}

const KB_VIS = ['sop', 'prompt', 'tools', 'sites', 'components', 'notes', 'boards', 'templates', 'learnings'];
function renderKB() {
  $('#kb-slides').innerHTML = KBT.map(([n, u, f], i) => `<article class="kb-slide"><div class="media"><div class="mui">${V[KB_VIS[i]]()}</div></div><div class="kb-slide__text"><h3 class="h-m">${esc(n)}</h3><p class="p-m">${esc(u)}</p><div class="fields">${f.map(x => `<span>${esc(x)}</span>`).join('')}</div></div></article>`).join('');
}
const VIS_LEVEL = { private: 1, team: 2, client: 3, public: 4 };
function setVis(v) {
  $$('.vis-panel [data-v]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === v)));
  $('.rings').dataset.level = VIS_LEVEL[v];
  const [h, d] = VIS[v];
  $('#vis-desc').innerHTML = `<b>${esc(h)}</b>${esc(d)}`;
}

function renderDocs() {
  $('#docs-rows').innerHTML = DOCS.map(([n, s, w, t], i) => `<li class="ledger__row" data-t="${t}"><span class="ledger__name">${mk(t)}<span>${esc(n)}</span></span><span class="stg${i % 2 ? ' is--round' : ''}">${esc(s)}</span><span class="ledger__who">${esc(w)}</span></li>`).join('');
  $('#engine').innerHTML = ENGINE.map(([l, t]) => `<li>${mk(t)}<span>${esc(l)}</span></li>`).join('');
}
function scramble(el, to, delay) {
  if (reduce) { el.textContent = to; return; }
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789{}.#';
  const from = el.textContent, len = Math.max(from.length, to.length);
  const start = performance.now() + delay, dur = 520;
  const tick = now => {
    const p = clamp((now - start) / dur, 0, 1);
    if (now < start) { requestAnimationFrame(tick); return; }
    const reveal = Math.floor(p * len);
    let out = '';
    for (let i = 0; i < len; i++) out += i < reveal ? (to[i] || '') : (i < to.length ? chars[(Math.random() * chars.length) | 0] : '');
    el.textContent = p >= 1 ? to : out;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
let paperTouched = false;
function setPaper(mode) {
  const paper = $('#sow');
  if (paper.dataset.mode === mode) return;
  paper.dataset.mode = mode;
  $$('.mf', paper).forEach((el, i) => scramble(el, mode === 'filled' ? el.dataset.v : `{{${el.dataset.f}}}`, i * 45));
  $$('[data-paper-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.paperMode === mode)));
}

const CITIES = [
  { name: 'London', zone: 'BST · UTC+1', row: 1, lat: 51.5, lon: -0.13, feats: [['Quotes & invoices in USD, EUR, GBP, AED, AUD', 'n'], ['Data processing addendum for EU & UK clients', 'n'], ['Meetings shown in both time zones', 'n']] },
  { name: 'Dubai', zone: 'GST · UTC+4', row: 2, lat: 25.2, lon: 55.27, feats: [['International payment links', 'n'], ['Preferred channel: email, Slack or WhatsApp', 'n'], ['Client-country holiday calendar', 'n']] },
  { name: 'New York', zone: 'EDT · UTC−4', row: 3, lat: 40.71, lon: -74.0, feats: [['Export-of-services invoice with LUT declaration', 'n'], ['Response-time SLA per client', 'n'], ['Weekly status report, auto-drafted', 'n']] }
];
const HOME = { lat: 17.69, lon: 83.22 };
const overlapOf = row => { const [, , s, e] = TZ[row], team = TZ[0]; const os = Math.max(s, team[2]), oe = Math.min(e, team[3]); return { os, oe, hrs: Math.max(0, oe - os) }; };
const fmtH = h => (h % 1 ? h.toFixed(1) : String(h));
function renderPremium() {
  $('#city-slides').innerHTML = CITIES.map(c => {
    const [, , s, e] = TZ[c.row], { os, oe, hrs } = overlapOf(c.row), team = TZ[0];
    return `<article class="city"><div class="city__top"><span class="tag">Client city</span><span class="tag" data-shape="round">${esc(c.zone)}</span></div><div class="city__name"><h3 class="h-l">${esc(c.name)}</h3><p class="p-l">9:00–18:00 local</p></div><div class="city__ov"><b class="tnum">${fmtH(hrs)} h</b><span class="p-m">overlap with a team in India working 10:00–19:00 IST</span></div><div><div class="city__track" role="img" aria-label="${esc(c.name)} working hours against the team’s hours, ${fmtH(hrs)} hours overlap"><i class="is--team" style="left:${pct(tzPos(team[2]))};width:${pct((team[3] - team[2]) / 24 * 100)}"></i><i class="is--client" style="left:${pct(tzPos(s))};width:${pct((e - s) / 24 * 100)}"></i>${hrs > 0 ? `<i class="is--ov" style="left:${pct(tzPos(os))};width:${pct((oe - os) / 24 * 100)}"></i>` : ''}</div><div class="city__axis"><span>06:00</span><span>12:00</span><span>18:00</span><span>00:00</span><span>06:00 IST</span></div></div><ul class="city__list">${c.feats.map(feat).join('')}</ul></article>`;
  }).join('');
  const team = TZ[0];
  $('#tz-rows').innerHTML = TZ.map(([nm, z, s, e, kind], i) => {
    let bars = `<span class="tzr__bar is--${kind}" style="left:${pct(tzPos(s))};width:${pct((e - s) / 24 * 100)}"></span>`, ov;
    if (kind === 'client') { const o = overlapOf(i); if (o.hrs > 0) bars += `<span class="tzr__bar is--ov" style="left:${pct(tzPos(o.os))};width:${pct(o.hrs / 24 * 100)}"></span>`; ov = `<b>${fmtH(o.hrs)} h</b> overlap`; }
    else ov = '9 h day';
    return `<div class="tzr"><div class="tzr__nm">${esc(nm)}<small>${esc(z)}</small></div><div class="tzr__track" role="img" aria-label="${esc(nm)} working hours on an IST timeline">${bars}</div><div class="tzr__ov">${ov}</div></div>`;
  }).join('');
  $('#tz-axis').innerHTML = [6, 9, 12, 15, 18, 21, 24, 27].map(h => `<span style="left:${pct(tzPos(h))}">${pad(h % 24)}:00</span>`).join('');
  $('#prem-grid').innerHTML = PREM.map(([h, items], i) => `<div class="pg"><div class="pg__head"><h3 class="h-xs">${esc(h)}</h3><span class="eyebrow">${pad(i + 1)}</span></div><ul class="fl">${items.map(feat).join('')}</ul></div>`).join('');
}

function renderHandoff() {
  $('#pkg').innerHTML = HAND.map(([b, s], i) => `<li class="${i === HAND.length - 1 ? 'is--sign' : ''}"><b>${pad(i + 1)} · ${esc(b)}</b><span>${esc(s)}</span></li>`).join('');
}
const STACK_ORDER = ['Frontend', 'Build', 'Mobile', 'Backend', 'Database', 'Payments', 'Services', 'Hosting', 'CMS'];
function renderStack() {
  const txt = $('#stack-in').value, f = {}; let n = 0;
  STACK.forEach(([name, grp, re]) => { if (re.test(txt)) { (f[grp] = f[grp] || []).push(name); n++; } });
  const groups = STACK_ORDER.filter(g => f[g]);
  $('#stack-out').innerHTML = groups.length ? groups.map(g => `<div class="sgroup"><b>${g}</b><div>${f[g].map(x => `<span class="schip">${esc(x)}</span>`).join('')}</div></div>`).join('') : '<p class="stackd__empty">Nothing detected yet. Try a line like “React, Supabase, Razorpay, Vercel”.</p>';
  $('#stack-count').textContent = n ? `${n} detected` : '';
}

function renderEdge() {
  const rows = CMP.flatMap(g => g[1]), N = rows.length;
  const ty = rows.filter(r => r[1] === 'y').length, tp = rows.filter(r => r[1] === 'p').length;
  const w = v => (v / N * 100).toFixed(1) + '%';
  $('#coverage').innerHTML = `<div class="cov"><span class="eyebrow">Live today</span><span class="cov__num tnum">${ty}<small> of ${N} features</small></span><span class="cov__bar"><i class="is--b" style="width:${w(ty)}"></i></span></div><div class="cov"><span class="eyebrow">Live or partly there</span><span class="cov__num tnum">${ty + tp}<small> of ${N} · ${tp} partial</small></span><span class="cov__bar"><i class="is--b" style="width:${w(ty)}"></i><i class="is--p" style="width:${w(tp)}"></i></span></div><div class="cov is--final"><span class="eyebrow">After the build order</span><span class="cov__num tnum">${N}<small> of ${N} features</small></span><span class="cov__bar"><i class="is--all" style="width:100%"></i></span></div>`;
  const st = t => t === 'y' ? '<span class="st is--y"><svg viewBox="0 0 16 16" aria-hidden="true"><use href="#i-check"/></svg>Live</span>' : t === 'p' ? '<span class="st is--p">Partial</span>' : '<span class="st is--n">Planned</span>';
  $('#feature-ledger').innerHTML = CMP.map(([g, rs]) => `<div class="lg__card"><div class="lg__head"><h3 class="h-xs">${esc(g)}</h3><span class="eyebrow">${rs.length} features</span></div><ul class="lg__rows">${rs.map(([f, t, tn, p]) => `<li class="lg__row f" data-t="${p}"><span class="lg__feat">${mk(p)}<span>${esc(f)}${tn ? `<small class="lg__note">Today: ${esc(tn)}</small>` : ''}</span></span>${st(t)}</li>`).join('')}</ul></div>`).join('');
}

function renderVisuals() {
  $$('[data-visual]').forEach(el => {
    const v = el.dataset.visual, fn = V[v] || (v === 'today' ? V.phoneOwner : null);
    if (!fn) return;
    el.innerHTML = fn();
    if (v.startsWith('phone') || v === 'today') el.classList.add('mui', 'is--phone');
  });
}

/* ---------- Interactions ---------- */
function initButtons(root = document) {
  $$('.btn', root).forEach(b => {
    if (b.querySelector('.btn__labels')) return;
    const label = b.querySelector('.btn__label');
    if (!label) return;
    const wrap = document.createElement('span');
    wrap.className = 'btn__labels';
    label.replaceWith(wrap);
    wrap.appendChild(label);
    const clone = label.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    wrap.appendChild(clone);
    const bg = document.createElement('span');
    bg.className = 'btn__bg';
    b.prepend(bg);
  });
}

function scrollToEl(t) {
  if (lenis) lenis.scrollTo(t, { offset: 0, duration: 1.4 });
  else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

const nav = $('.nav');
function setNav(open) {
  nav.dataset.open = String(open);
  $('[data-nav-toggle]').setAttribute('aria-expanded', String(open));
}
function initNav() {
  $('[data-nav-toggle]').addEventListener('click', () => setNav(nav.dataset.open !== 'true'));
  $('.nav__panel-grid').setAttribute('data-lenis-prevent', '');
}

let openStack = [];
function openModal(name, trigger) {
  const m = $(`.modal[data-modal="${name}"]`);
  if (!m) return;
  m._trigger = trigger || document.activeElement;
  m.dataset.open = 'true';
  m.setAttribute('aria-hidden', 'false');
  openStack.push(m);
  if (lenis) lenis.stop();
  html.classList.add('is-locked');
  setNav(false);
  setTimeout(() => m.querySelector('.modal__panel').focus({ preventScroll: true }), 40);
  m.dispatchEvent(new CustomEvent('modal:open'));
}
function closeModal(m) {
  if (!m || m.dataset.open !== 'true') return;
  m.dataset.open = 'false';
  m.setAttribute('aria-hidden', 'true');
  openStack = openStack.filter(x => x !== m);
  if (!openStack.length) { if (lenis) lenis.start(); html.classList.remove('is-locked'); }
  if (m._trigger && m._trigger.focus) m._trigger.focus({ preventScroll: true });
  m.dispatchEvent(new CustomEvent('modal:close'));
}
function initGlobalEvents() {
  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-modal-open]');
    if (opener) { e.preventDefault(); openModal(opener.dataset.modalOpen, opener); return; }
    const closer = e.target.closest('[data-modal-close]');
    if (closer) closeModal(closer.closest('.modal'));
    if (e.target.closest('[data-nav-close]')) setNav(false);
    const a = e.target.closest('a[href^="#"]');
    if (a) {
      const id = a.getAttribute('href').slice(1);
      const t = id && document.getElementById(id);
      if (t) { e.preventDefault(); setNav(false); setTimeout(() => scrollToEl(t), closer ? 60 : 0); }
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (openStack.length) closeModal(openStack[openStack.length - 1]);
      else if (nav.dataset.open === 'true') { setNav(false); $('[data-nav-toggle]').focus(); }
    }
    if (e.key === 'Tab' && openStack.length) {
      const m = openStack[openStack.length - 1];
      const f = $$('a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])', m).filter(x => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === m.querySelector('.modal__panel'))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

/* Vertical sliders with autoplay */
function initVSlider(root) {
  const list = $('.vslider__list', root);
  const items = Array.from(list.children);
  if (items.length < 2) return null;
  const bulletsWrap = $('[data-vslider-bullets]', root);
  const countEl = $('[data-vslider-count]', root);
  const ring = $('[data-vslider-ring]', root);
  const dur = reduce ? 0 : (+root.dataset.autoplay || 0);
  let active = 0, elapsed = 0, last = performance.now(), hover = false, focusIn = false, inView = false;
  items.forEach((it, i) => {
    it.classList.add('vslider__item');
    it.dataset.pos = i === 0 ? 'active' : 'after';
    it.setAttribute('aria-hidden', String(i !== 0));
    if (i) it.inert = true;
  });
  const bullets = items.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'vslider__bullet';
    b.setAttribute('aria-label', `Show slide ${i + 1} of ${items.length}`);
    b.innerHTML = '<i></i>';
    b.addEventListener('click', () => go(i, i > active ? 1 : -1));
    if (bulletsWrap) bulletsWrap.appendChild(b);
    return b;
  });
  function paint() {
    bullets.forEach((b, i) => { b.classList.toggle('is--active', i === active); b.setAttribute('aria-current', String(i === active)); b.firstChild.style.transform = 'scaleY(0)'; });
    if (countEl) countEl.textContent = `${pad(active + 1)} / ${pad(items.length)}`;
  }
  function go(n, dir) {
    n = (n + items.length) % items.length;
    if (n === active) return;
    const cur = items[active], nxt = items[n];
    nxt.classList.add('no-tr');
    nxt.dataset.pos = dir > 0 ? 'after' : 'before';
    void nxt.offsetWidth;
    nxt.classList.remove('no-tr');
    cur.dataset.pos = dir > 0 ? 'before' : 'after';
    nxt.dataset.pos = 'active';
    cur.setAttribute('aria-hidden', 'true'); cur.inert = true;
    nxt.setAttribute('aria-hidden', 'false'); nxt.inert = false;
    active = n; elapsed = 0;
    paint();
    root.dispatchEvent(new CustomEvent('vslide', { detail: { index: n } }));
  }
  const prev = $('[data-vslider-prev]', root), next = $('[data-vslider-next]', root);
  if (prev) prev.addEventListener('click', () => go(active - 1, -1));
  if (next) next.addEventListener('click', () => go(active + 1, 1));
  root.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover = true; });
  root.addEventListener('pointerleave', () => { hover = false; });
  root.addEventListener('focusin', () => { focusIn = true; });
  root.addEventListener('focusout', () => { focusIn = false; });
  let sx = 0, sy = 0, down = false;
  root.addEventListener('pointerdown', e => { if (e.target.closest('button,a,textarea')) return; down = true; sx = e.clientX; sy = e.clientY; });
  root.addEventListener('pointerup', e => {
    if (!down) return; down = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (e.pointerType === 'mouse' && Math.abs(dy) > 40 && Math.abs(dy) > Math.abs(dx)) go(active + (dy < 0 ? 1 : -1), dy < 0 ? 1 : -1);
    else if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(active + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  });
  onVisible(root, v => { inView = v; }, { threshold: 0.25 });
  paint();
  if (dur) {
    const tick = now => {
      const dt = now - last; last = now;
      if (inView && !hover && !focusIn && !document.hidden) elapsed += dt;
      const p = clamp(elapsed / dur, 0, 1);
      bullets[active].firstChild.style.transform = `scaleY(${p})`;
      if (ring) ring.style.strokeDashoffset = String(1000 * (1 - p));
      if (p >= 1) go(active + 1, 1);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  } else if (ring) ring.style.strokeDashoffset = '0';
  return { go, get active() { return active; } };
}

/* Journey: draggable rotating slider */
function initJourney() {
  const coll = $('.gslider__collection'), list = $('#stage-cards');
  const items = $$('.gslider__item', list);
  const N = items.length;
  let snaps = [], current = 0;
  const go = i => { i = clamp(i, 0, N - 1); setStage(i); current = i; move(i); };
  $('#stage-nav').addEventListener('click', e => { const b = e.target.closest('[data-stage]'); if (b) go(+b.dataset.stage); });
  $('#rail-stations').addEventListener('click', e => { const b = e.target.closest('[data-stage]'); if (b) { go(+b.dataset.stage); } });
  coll.setAttribute('tabindex', '0');
  coll.setAttribute('aria-label', 'Journey stages. Use left and right arrow keys to move between stages.');
  coll.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); } });
  setStage(0);

  if (!hasG || !window.Draggable) {
    let t;
    coll.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(() => { const c = coll.scrollLeft + coll.clientWidth / 2; let best = 0, bd = 1e9; items.forEach((it, i) => { const d = Math.abs(it.offsetLeft + it.offsetWidth / 2 - c); if (d < bd) { bd = d; best = i; } }); current = best; setStage(best); }, 90); }, { passive: true });
    function move(i) { const it = items[i]; coll.scrollTo({ left: it.offsetLeft + it.offsetWidth / 2 - coll.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' }); }
    return;
  }
  function measure() { const cw = coll.clientWidth; snaps = items.map(it => cw / 2 - (it.offsetLeft + it.offsetWidth / 2)); }
  function render() {
    const x = gsap.getProperty(list, 'x'), cw = coll.clientWidth;
    items.forEach(it => {
      const c = it.offsetLeft + it.offsetWidth / 2 + x;
      const d = (c - cw / 2) / (it.offsetWidth + 20);
      const a = clamp(d * 7.5, -36, 36);
      const y = (1 - Math.cos(a * Math.PI / 180)) * it.offsetWidth * 4.2;
      it.style.transform = `translate3d(0,${y.toFixed(1)}px,0) rotate(${a.toFixed(2)}deg)`;
    });
  }
  const nearest = x => { let best = 0, bd = 1e9; snaps.forEach((s, i) => { const d = Math.abs(s - x); if (d < bd) { bd = d; best = i; } }); return best; };
  function move(i) { gsap.to(list, { x: snaps[i], duration: reduce ? 0 : 1, ease: 'expo.out', onUpdate: render, overwrite: true }); }
  measure();
  gsap.set(list, { x: snaps[0] });
  render();
  let dragged = false;
  const drag = Draggable.create(list, {
    type: 'x',
    inertia: hasInertia,
    edgeResistance: 0.82,
    bounds: { minX: snaps[N - 1], maxX: snaps[0] },
    snap: hasInertia ? { x: v => snaps[nearest(v)] } : undefined,
    zIndexBoost: false,
    allowContextMenu: true,
    onPress() { dragged = false; gsap.killTweensOf(list); },
    onDrag() { dragged = true; render(); const i = nearest(this.x); if (i !== current) { current = i; setStage(i); } },
    onThrowUpdate() { render(); const i = nearest(this.x); if (i !== current) { current = i; setStage(i); } },
    onRelease() { if (!hasInertia && dragged) { const i = nearest(this.x); current = i; setStage(i); move(i); } },
    onClick(e) { if (dragged) return; const it = e.target.closest('.gslider__item'); if (it) go(+it.dataset.i); }
  })[0];
  window.addEventListener('resize', () => { measure(); drag.applyBounds({ minX: snaps[N - 1], maxX: snaps[0] }); gsap.set(list, { x: snaps[current] }); render(); });
}

/* Portals: flick cards */
function initFlick() {
  const root = $('[data-flick]');
  const items = $$('.flick__item', root);
  const n = items.length;
  let pos = 0, target = 0, dragging = false, raf = 0;
  const cardW = () => items[0].offsetWidth;
  const idx = v => ((Math.round(v) % n) + n) % n;
  function layout() {
    const w = cardW(), sp = w * (isMobile() ? 0.56 : 0.66);
    items.forEach((it, i) => {
      let o = i - pos;
      o = ((o % n) + n + n / 2) % n - n / 2;
      const ao = Math.abs(o);
      const x = o * sp, rot = o * 6.5, s = 1 - Math.min(ao, 3) * 0.075, y = ao * ao * 9;
      it.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(3)})`;
      it.style.zIndex = String(100 - Math.round(ao * 10));
      it.style.opacity = ao > 2.6 ? String(clamp(1 - (ao - 2.6) * 2.5, 0, 1)) : '1';
      const act = idx(pos) === i;
      it.classList.toggle('is--active', act);
      it.setAttribute('aria-current', String(act));
    });
    $('#portal-count').textContent = `${pad(idx(pos) + 1)} / ${pad(n)}`;
  }
  function animate() {
    cancelAnimationFrame(raf);
    const step = () => {
      pos += (target - pos) * (reduce ? 1 : 0.14);
      if (Math.abs(target - pos) < 0.001) pos = target;
      layout();
      if (pos !== target && !dragging) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }
  const goTo = t => { target = t; animate(); };
  const nearestTarget = i => { let d = i - idx(target); if (d > n / 2) d -= n; if (d < -n / 2) d += n; return Math.round(target) + d; };
  let sx = 0, sp0 = 0, lastX = 0, lastT = 0, vx = 0, moved = false;
  root.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    dragging = true; moved = false; sx = lastX = e.clientX; lastT = performance.now(); sp0 = pos; vx = 0;
    cancelAnimationFrame(raf);
    root.setPointerCapture(e.pointerId);
  });
  root.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 4) moved = true;
    const now = performance.now();
    vx = (e.clientX - lastX) / Math.max(1, now - lastT);
    lastX = e.clientX; lastT = now;
    pos = sp0 - dx / (cardW() * 0.66);
    layout();
  });
  const end = e => {
    if (!dragging) return;
    dragging = false;
    if (!moved) {
      const it = document.elementsFromPoint(e.clientX, e.clientY).map(el => el.closest && el.closest('.flick__item')).find(Boolean);
      if (it) { const i = +it.dataset.i; if (i === idx(pos)) openPortal(i, it); else goTo(nearestTarget(i)); }
      else goTo(Math.round(pos));
      return;
    }
    goTo(Math.round(pos - clamp(vx * 3, -2, 2)));
  };
  root.addEventListener('pointerup', end);
  root.addEventListener('pointercancel', () => { dragging = false; goTo(Math.round(pos)); });
  root.setAttribute('tabindex', '0');
  root.setAttribute('aria-label', 'Portals. Use left and right arrow keys to browse, Enter to open the sitemap.');
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.round(target) + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.round(target) - 1); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPortal(idx(target), root); }
  });
  $('[data-flick-prev]').addEventListener('click', () => goTo(Math.round(target) - 1));
  $('[data-flick-next]').addEventListener('click', () => goTo(Math.round(target) + 1));
  $('[data-flick-open]').addEventListener('click', e => openPortal(idx(target), e.currentTarget));
  window.addEventListener('resize', layout);
  layout();
}
let portalIndex = 0;
function openPortal(i, trigger) {
  portalIndex = i;
  const body = $('#portal-modal-body');
  body.innerHTML = portalModalHTML(i);
  initButtons(body);
  body.scrollTop = 0;
  if ($('.modal[data-modal="portal"]').dataset.open !== 'true') openModal('portal', trigger);
}
function initPortalModal() {
  $('#portal-modal-body').addEventListener('click', e => {
    const b = e.target.closest('[data-pm]');
    if (!b) return;
    const n = PORTALS_O.length;
    openPortal((portalIndex + (+b.dataset.pm) + n) % n);
    $('.modal[data-modal="portal"] .modal__panel').focus({ preventScroll: true });
  });
}

/* Globe */
const LAND = '__LAND__';
function initGlobe(slider) {
  const cv = $('#globe');
  if (!cv || !cv.getContext) return;
  const ctx = cv.getContext('2d');
  const D = Math.PI / 180;
  const dots = [];
  LAND.split(';').forEach((row, r) => {
    const [nStr, runs] = row.split(':');
    const n = parseInt(nStr, 36), lat = (80 - r * 2) * D;
    if (!runs) return;
    runs.split(',').forEach(run => { const [s, l] = run.split('.').map(v => parseInt(v, 36)); for (let i = s; i < s + l; i++) dots.push([lat, (-180 + (i + 0.5) * 360 / n) * D]); });
  });
  const toVec = (lat, lon) => [Math.cos(lat) * Math.cos(lon), Math.cos(lat) * Math.sin(lon), Math.sin(lat)];
  const angDist = (a, b) => { const va = toVec(a[0], a[1]), vb = toVec(b[0], b[1]); return Math.acos(clamp(va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2], -1, 1)); };
  const home = [HOME.lat * D, HOME.lon * D];
  const cities = CITIES.map(c => [c.lat * D, c.lon * D]);
  const mid = (a, b) => { const va = toVec(a[0], a[1]), vb = toVec(b[0], b[1]); const m = [va[0] + vb[0], va[1] + vb[1], va[2] + vb[2]]; const l = Math.hypot(...m); return [Math.asin(m[2] / l), Math.atan2(m[1], m[0])]; };
  let active = 0, lam = mid(home, cities[0])[1], phi = clamp(mid(home, cities[0])[0], -0.1, 0.6), tLam = lam, tPhi = phi;
  let W = 0, R = 0, dpr = 1, running = false, t0 = performance.now();
  function size() { dpr = Math.min(2, window.devicePixelRatio || 1); W = cv.clientWidth; cv.width = Math.round(W * dpr); cv.height = Math.round(W * dpr); R = W / 2 * 0.86; }
  function proj(lat, lon) {
    const cosc = Math.sin(phi) * Math.sin(lat) + Math.cos(phi) * Math.cos(lat) * Math.cos(lon - lam);
    const x = Math.cos(lat) * Math.sin(lon - lam);
    const y = Math.cos(phi) * Math.sin(lat) - Math.sin(phi) * Math.cos(lat) * Math.cos(lon - lam);
    return [W / 2 + R * x, W / 2 - R * y, cosc];
  }
  function arcPts(a, b, k = 64) {
    const va = toVec(a[0], a[1]), vb = toVec(b[0], b[1]);
    const om = Math.acos(clamp(va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2], -1, 1)), so = Math.sin(om);
    const pts = [];
    for (let i = 0; i <= k; i++) {
      const t = i / k, s1 = Math.sin((1 - t) * om) / so, s2 = Math.sin(t * om) / so;
      const v = [va[0] * s1 + vb[0] * s2, va[1] * s1 + vb[1] * s2, va[2] * s1 + vb[2] * s2];
      const lift = 1 + Math.sin(Math.PI * t) * 0.12;
      pts.push([Math.asin(v[2] / Math.hypot(...v)), Math.atan2(v[1], v[0]), lift]);
    }
    return pts;
  }
  function draw(now) {
    lam += (tLam - lam) * 0.06; phi += (tPhi - phi) * 0.06;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, W);
    const city = cities[active];
    for (const [lat, lon] of dots) {
      const [x, y, c] = proj(lat, lon);
      if (c <= 0) continue;
      const dh = angDist([lat, lon], home), dc = angDist([lat, lon], city);
      let col;
      if (dc < 7 * D) col = '161,255,98';
      else if (dh < 8 * D) col = '164,145,255';
      else col = '244,244,244';
      const a = col === '244,244,244' ? 0.12 + c * 0.32 : 0.55 + c * 0.45;
      ctx.fillStyle = `rgba(${col},${a.toFixed(3)})`;
      const r = (0.55 + c * 0.75) * 1.25;
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    }
    const pts = arcPts(home, city);
    const prog = ((now - t0) / 1600) % 1;
    ctx.setLineDash([3, 4]); ctx.lineWidth = 1.6; ctx.strokeStyle = 'rgba(161,255,98,.9)';
    ctx.beginPath();
    let pen = false;
    pts.forEach(([la, lo, lift], i) => {
      const [x, y, c] = proj(la, lo);
      const X = W / 2 + (x - W / 2) * lift, Y = W / 2 + (y - W / 2) * lift;
      if (c > -0.05) { if (!pen) { ctx.moveTo(X, Y); pen = true; } else ctx.lineTo(X, Y); } else pen = false;
      pts[i].push(X, Y, c);
    });
    ctx.stroke(); ctx.setLineDash([]);
    const pi = Math.floor(prog * (pts.length - 1)), pp = pts[pi];
    if (pp && pp[5] > -0.05) { ctx.fillStyle = '#a1ff62'; ctx.beginPath(); ctx.arc(pp[3], pp[4], 3, 0, 6.2832); ctx.fill(); }
    const pin = (p, fill, label) => { const [x, y, c] = proj(p[0], p[1]); if (c <= 0) return; ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(x, y, 5, 0, 6.2832); ctx.fill(); ctx.strokeStyle = '#151313'; ctx.lineWidth = 2; ctx.stroke(); ctx.font = '500 11px Geist, Helvetica, Arial, sans-serif'; ctx.fillStyle = '#f4f4f4'; ctx.textAlign = x > W / 2 ? 'right' : 'left'; ctx.fillText(label, x + (x > W / 2 ? -9 : 9), y - 8); };
    pin(home, '#a491ff', 'India · IST');
    pin(city, '#a1ff62', CITIES[active].name);
    ctx.strokeStyle = 'rgba(244,244,244,.12)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(W / 2, W / 2, R, 0, 6.2832); ctx.stroke();
    if (running) requestAnimationFrame(draw);
  }
  function focus(i) { active = i; const m = mid(home, cities[i]); tLam = m[1]; tPhi = clamp(m[0], -0.1, 0.65); let d = tLam - lam; while (d > Math.PI) { lam += 2 * Math.PI; d -= 2 * Math.PI; } while (d < -Math.PI) { lam -= 2 * Math.PI; d += 2 * Math.PI; } if (!running) requestAnimationFrame(draw); }
  size();
  window.addEventListener('resize', () => { size(); if (!running) requestAnimationFrame(draw); });
  onVisible(cv, v => { if (v && !running) { running = true; requestAnimationFrame(draw); } else if (!v) running = false; }, { threshold: 0.05 });
  requestAnimationFrame(draw);
  if (slider) $('#globe-slider').addEventListener('vslide', e => focus(e.detail.index));
}

/* Journey player (modal) */
const PLAYER_VIS = ['search', 'pipeline', 'proposal', 'portal', 'gantt', 'tasks', 'chat', 'invoice', 'handoff', 'review'];
function initPlayer() {
  const modal = $('.modal[data-modal="reel"]');
  $('#player-frames').innerHTML = STAGES.map((s, i) => `<div class="pframe${i === 0 ? ' is--active' : ''}" aria-hidden="${i !== 0}"><div class="pframe__text"><span class="pframe__num">${pad(s.n)}</span><h3 class="h-m">${esc(s.name)}</h3><p class="p-l">${esc(s.short)}</p><p class="pframe__out">${esc(s.out)}</p><ul class="pframe__lanes"><li><b>Agency</b><span>${esc(s.agency[0][0])}</span></li><li><b>Team</b><span>${esc(s.team[0][0])}</span></li><li><b>Client</b><span>${esc(s.client[0][0])}</span></li></ul></div><div class="media"><div class="mui">${V[PLAYER_VIS[i]]()}</div></div></div>`).join('');
  $('#player-progress').innerHTML = STAGES.map((s, i) => `<button type="button" aria-label="Go to stage ${s.n}: ${esc(s.name)}" data-pi="${i}"><span><i></i></span></button>`).join('');
  const frames = $$('.pframe'), bars = $$('#player-progress i');
  const DUR = 4000;
  let cur = 0, elapsed = 0, playing = false, last = 0, raf = 0, open = false;
  const pp = $('#player-pp');
  const setPP = () => { pp.innerHTML = `<svg viewBox="0 0 12 12"><use href="#i-${playing ? 'pause' : 'play'}"/></svg>`; pp.setAttribute('aria-label', playing ? 'Pause' : 'Play'); };
  function show(i) {
    cur = (i + frames.length) % frames.length; elapsed = 0;
    frames.forEach((f, k) => { f.classList.toggle('is--active', k === cur); f.setAttribute('aria-hidden', String(k !== cur)); });
    bars.forEach((b, k) => { b.style.transform = `scaleX(${k < cur ? 1 : 0})`; });
    $('#player-count').textContent = `${pad(cur + 1)} / ${pad(frames.length)}`;
  }
  function loop(now) {
    if (!open) return;
    const dt = now - last; last = now;
    if (playing) {
      elapsed += dt;
      bars[cur].style.transform = `scaleX(${clamp(elapsed / DUR, 0, 1)})`;
      if (elapsed >= DUR) { if (cur === frames.length - 1) { playing = false; setPP(); } else show(cur + 1); }
    }
    raf = requestAnimationFrame(loop);
  }
  modal.addEventListener('modal:open', () => { open = true; playing = !reduce; setPP(); show(0); last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); });
  modal.addEventListener('modal:close', () => { open = false; playing = false; cancelAnimationFrame(raf); });
  pp.addEventListener('click', () => { if (!playing && cur === frames.length - 1 && elapsed >= DUR) show(0); playing = !playing; setPP(); });
  $('#player-prev').addEventListener('click', () => show(cur - 1));
  $('#player-next').addEventListener('click', () => show(cur + 1));
  $('#player-progress').addEventListener('click', e => { const b = e.target.closest('[data-pi]'); if (b) show(+b.dataset.pi); });
  modal.addEventListener('keydown', e => { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });
  $('[data-reel-open]').addEventListener('click', e => openModal('reel', e.currentTarget));
}

/* Copy + toast */
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('is--on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('is--on'), 2200); }
function initCopy() {
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const v = b.dataset.copy;
    const fallback = () => { const el = b.parentElement.querySelector('.contact-list__value'); if (el) { const r = document.createRange(); r.selectNodeContents(el); const s = window.getSelection(); s.removeAllRanges(); s.addRange(r); } toast('Selected. Press Ctrl+C or ⌘C to copy'); };
    try { navigator.clipboard.writeText(v).then(() => toast('Copied ' + v), fallback); } catch (err) { fallback(); }
  });
}

function initFilters() {
  $$('[data-filter-for]').forEach(group => {
    const target = document.getElementById(group.dataset.filterFor);
    group.addEventListener('click', e => {
      const b = e.target.closest('[data-f]');
      if (!b || !target) return;
      $$('[data-f]', group).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      if (b.dataset.f === 'all') delete target.dataset.filter; else target.dataset.filter = b.dataset.f;
    });
  });
}

function initCursor() {
  if (!finePointer) return;
  const c = $('.cursor'), txt = $('.cursor__text', c);
  let x = -100, y = -100, tx = -100, ty = -100, on = false;
  document.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX; ty = e.clientY;
    if (!on) { x = tx; y = ty; on = true; }
    const t = e.target;
    const zone = t.closest && t.closest('[data-cursor]');
    const openable = t.closest && t.closest('.flick__item.is--active');
    const state = openable ? 'open' : zone ? zone.dataset.cursor : '';
    if (c.dataset.state !== state) { c.dataset.state = state; txt.textContent = state === 'open' ? 'Open' : 'Drag'; }
    c.dataset.tone = (zone && zone.dataset.cursorTone) || '';
  }, { passive: true });
  document.addEventListener('pointerleave', () => { c.dataset.state = ''; });
  const loop = () => { x += (tx - x) * 0.22; y += (ty - y) * 0.22; c.style.transform = `translate3d(${(x + 36).toFixed(1)}px,${(y + 30).toFixed(1)}px,0)`; requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
}

function initMess() {
  const root = $('[data-mess]');
  let touched = false;
  const set = s => { root.dataset.state = s; $$('[data-mess-set]', root).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.messSet === s))); };
  $$('[data-mess-set]', root).forEach(b => b.addEventListener('click', () => { touched = true; set(b.dataset.messSet); }));
  if (!reduce) onVisible($('.mess__stage'), (v, io) => { if (v) { io.disconnect(); setTimeout(() => { if (!touched) set('os'); }, 1600); } }, { threshold: 0.55 });
  let wasMobile = isMobile();
  window.addEventListener('resize', () => { if (isMobile() !== wasMobile) { wasMobile = isMobile(); renderMess(); } });
}

function initPaper() {
  $$('[data-paper-mode]').forEach(b => b.addEventListener('click', () => { paperTouched = true; setPaper(b.dataset.paperMode); }));
  if (!reduce) onVisible($('#sow'), (v, io) => { if (v) { io.disconnect(); setTimeout(() => { if (!paperTouched) setPaper('filled'); }, 1800); } }, { threshold: 0.6 });
}

function initTiers() {
  const sec = $('#plans');
  const PR = { starter: ['1,499', 'Up to 5 members, 10 clients'], growth: ['3,499', 'Up to 20 members, unlimited clients'], enterprise: ['7,999', 'Unlimited, multi-branch'] };
  $$('[data-tier-set]').forEach(b => b.addEventListener('click', () => {
    const t = b.dataset.tierSet;
    sec.dataset.tier = t;
    $$('[data-tier-set]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    $('#tier-price-sr').textContent = PR[t][0];
    $('#tier-limit-sr').textContent = PR[t][1];
  }));
}

function initPreview() {
  const end = $('.invest__end');
  $$('[data-preview]', end).forEach(b => b.addEventListener('click', () => {
    const light = b.dataset.preview === 'light';
    $$('[data-preview]', end).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    $('#mini-dash').innerHTML = dashHTML(light);
  }));
}

function initTickers() {
  $$('[data-ticker]').forEach(el => {
    let s = 1 * 3600 + 24 * 60 + 10;
    setInterval(() => { if (document.hidden) return; s++; el.textContent = `${pad((s / 3600) | 0)}:${pad(((s % 3600) / 60) | 0)}:${pad(s % 60)}`; }, 1000);
  });
}

/* ---------- Motion (GSAP) ---------- */
function initLenis() {
  if (!window.Lenis || reduce) return;
  lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
  if (hasG && window.ScrollTrigger) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}

function initHero() {
  if (!hasG || reduce) return;
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from('.nav__bar', { yPercent: -120, duration: 1.1 }, 0)
    .from('[data-hero-line]', { yPercent: 105, duration: 1.2, stagger: 0.09 }, 0.1)
    .from('[data-hero-glyph]', { rotate: -135, scale: 0.2, duration: 1.4 }, 0.15)
    .from('[data-hero-fade]', { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.35)
    .from('.radial__circle', { y: 160, duration: 1.8 }, 0.2)
    .from('.undernav__inner', { y: -12, autoAlpha: 0, duration: 0.8 }, 0.5);
}

function initRadialMotion() {
  const list = $('#radial-list');
  if (!hasG) return;
  if (reduce) { gsap.set(list, { rotation: -4 }); return; }
  const spin = gsap.to(list, { rotation: -360, duration: 300, ease: 'none', repeat: -1 });
  let boost = 0, lastY = window.scrollY;
  const radial = $('[data-radial]');
  let hovering = false;
  radial.addEventListener('pointerenter', () => { hovering = true; });
  radial.addEventListener('pointerleave', () => { hovering = false; });
  gsap.ticker.add(() => {
    const y = window.scrollY, v = Math.abs(y - lastY); lastY = y;
    boost = Math.max(boost * 0.92, Math.min(v, 80));
    const target = hovering ? 0.25 : 1 + boost * 0.9;
    spin.timeScale(spin.timeScale() + (target - spin.timeScale()) * 0.08);
  });
}

function initReveals() {
  if (!hasG || reduce || !window.ScrollTrigger) return;
  $$('[data-reveal]').forEach(el => gsap.from(el, { y: 44, autoAlpha: 0, duration: 1, ease: 'expo.out', immediateRender: false, scrollTrigger: { trigger: el, start: 'top 94%', once: true } }));
  $$('[data-reveal-group]').forEach(g => gsap.from(g.children, { y: 56, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.07, immediateRender: false, scrollTrigger: { trigger: g, start: 'top 90%', once: true } }));
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count, o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 95%', once: true, onEnter: () => gsap.fromTo(o, { v: 0 }, { v: end, duration: 1.6, ease: 'expo.out', onUpdate: () => { el.textContent = Math.round(o.v); } }) });
  });
  const road = $('#road');
  gsap.fromTo(road, { '--p': 0 }, { '--p': 1, ease: 'none', scrollTrigger: { trigger: road, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
  $$('.dots-circle').forEach(c => gsap.to(c, { rotate: 40, ease: 'none', scrollTrigger: { trigger: c.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
  gsap.from('.footer__logo svg', { yPercent: 40, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });
}

/* ---------- Boot ---------- */
safe('render', () => {
  renderRadial(); renderTicker(); renderLive(); renderMess(); renderPains(); renderDash(); renderCal('owner');
  renderStages(); renderLoop(); renderTools(); renderPortals(); renderKB(); setVis('team'); renderDocs();
  renderPremium(); renderHandoff(); renderEdge(); renderVisuals();
  $('#stack-in').value = SAMPLE; renderStack();
  $$('[data-year]').forEach(e => { e.textContent = String(new Date().getFullYear()); });
});
safe('buttons', () => initButtons());
safe('lenis', initLenis);
safe('nav', initNav);
safe('events', initGlobalEvents);
safe('vsliders', () => $$('[data-vslider]').forEach(r => { const s = initVSlider(r); if (r.id === 'globe-slider') safe('globe', () => initGlobe(s)); }));
safe('journey', initJourney);
safe('flick', initFlick);
safe('portalModal', initPortalModal);
safe('player', initPlayer);
safe('copy', initCopy);
safe('filters', initFilters);
safe('cursor', initCursor);
safe('mess', initMess);
safe('paper', initPaper);
safe('tiers', initTiers);
safe('preview', initPreview);
safe('tickers', initTickers);
safe('cal', () => $$('[data-cal-view]').forEach(b => b.addEventListener('click', () => renderCal(b.dataset.calView))));
safe('vis', () => $$('.vis-panel [data-v]').forEach(b => b.addEventListener('click', () => setVis(b.dataset.v))));
safe('stack', () => { $('#stack-in').addEventListener('input', renderStack); $('#stack-sample').addEventListener('click', () => { $('#stack-in').value = SAMPLE; renderStack(); }); $('#stack-clear').addEventListener('click', () => { $('#stack-in').value = ''; renderStack(); $('#stack-in').focus(); }); });
safe('hero', initHero);
safe('radial', initRadialMotion);
safe('reveals', initReveals);
if (hasG && window.ScrollTrigger) window.addEventListener('load', () => ScrollTrigger.refresh());
