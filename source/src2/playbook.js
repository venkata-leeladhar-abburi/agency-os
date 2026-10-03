/* ===== Team playbook =====
 * Process steps are part of the page. Everything else (services, research, prompts, tools, knowledge)
 * lives in the shared database collection "items", so what one teammate adds, everyone sees.
 * The repository copy has no shared database: it starts from EMBED_SEED and keeps changes in this browser.
 */
const PHASES = S.phases, PILLARS = S.pillars, GROUPS = S.groups, TREE = S.tree;
const phaseById = id => PHASES.find(p => p.id === id);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable: keep going without it */ } }
};
const SEC = {
  process: { label: 'Process', line: 'Seven phases. Steps, files, tools and the exit gate.' },
  services: { label: 'Services', one: 'service route', prefix: 'svc', line: 'How we deliver each service. Step by step.' },
  research: { label: 'Research', one: 'research doc', prefix: 'research', line: 'The research pack. Build in order. Each feeds the next.' },
  prompts: { label: 'Prompts', one: 'prompt', prefix: 'prompt', line: 'Copy. Fill the [brackets]. Paste into Claude.' },
  tools: { label: 'Tools', one: 'tool', prefix: 'tool', line: 'The core stack first. Everything else below.' },
  kb: { label: 'Knowledge', one: 'resource', prefix: 'kb', line: 'Links, docs, templates and notes. Add what helps.' }
};
const TABS = Object.keys(SEC);
const LIBS = TABS.filter(t => t !== 'process');
const KB_TYPES = ['Link', 'Doc', 'Template', 'Video', 'Note'];
const AI_TOOLS = ['Claude', 'Claude Code', 'ChatGPT', 'Gemini', 'Other'];
const PILLAR_TAG = { volt: 'volt', violet: 'violet', dark: 'ink', light: 'cloud', black: 'steel' };
const NEW_DAYS = 14;
const LOCAL_KEY = 'pb-local-v1';

const st = {
  mode: 'loading', // loading | live | local | offline | revoked | error
  items: new Map(),
  tab: TABS.includes(store.get('pb-tab', 'process')) ? store.get('pb-tab', 'process') : 'process',
  phase: phaseById(store.get('pb-phase', 'connect')) ? store.get('pb-phase', 'connect') : 'connect',
  svc: store.get('pb-svc', ''),
  f: { prompts: 'all', tools: 'all', kb: 'all' },
  q: { prompts: '', tools: '', kb: '' },
  write: null, // user.can("data.write"): true | false | null (not told)
  locked: false, // a well-formed write was refused: read-only for this visit
  me: null
};
let checks = store.get('pb-checks', {});
if (!checks || typeof checks !== 'object') checks = {};
let db = null, user = null, local = { put: {}, del: [] };

/* ---------- small helpers ---------- */
const haveData = () => st.mode === 'live' || st.mode === 'local';
const canWrite = () => st.mode === 'local' || (st.mode === 'live' && st.write !== false && !st.locked);
const itemsOf = sec => [...st.items.values()].filter(x => x.section === sec).sort(sortItems);
function sortItems(a, b) {
  const ao = typeof a.order === 'number', bo = typeof b.order === 'number';
  if (ao && bo) return a.order - b.order;
  if (ao !== bo) return ao ? 1 : -1;
  return (b.createdAt || 0) - (a.createdAt || 0);
}
const isNew = x => !!x.createdAt && Date.now() - x.createdAt < NEW_DAYS * 864e5;
const newTag = x => (isNew(x) ? '<span class="new">New</span>' : '');
const safeUrl = u => { const s = String(u || '').trim(); return /^https?:\/\/\S+$/i.test(s) ? s : ''; };
const lines = s => String(s || '').split('\n').map(x => x.trim()).filter(Boolean);
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'item';
const rand = () => Math.random().toString(36).slice(2, 7);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const phaseTag = id => { const p = phaseById(id); return p ? `<span class="tag" data-theme="haze">${p.n} ${esc(p.name)}</span>` : '<span class="tag" data-theme="haze">Any phase</span>'; };
const tagChips = arr => (Array.isArray(arr) ? arr : []).filter(Boolean).map(t => `<span class="tag" data-theme="haze" data-shape="round">${esc(t)}</span>`).join('');
const extLink = (x, cls = 'icon-link') => { const u = safeUrl(x.url); return u ? `<a class="${cls}" href="${esc(u)}" target="_blank" rel="noopener" aria-label="Open ${esc(x.title)} in a new tab">${icon('arrow-ur')}</a>` : ''; };
function ago(ms) {
  const s = Math.max(1, Math.round((Date.now() - ms) / 1000));
  if (s < 60) return 'just now';
  const m = Math.round(s / 60); if (m < 60) return m + ' min ago';
  const h = Math.round(m / 60); if (h < 24) return h + ' h ago';
  const d = Math.round(h / 24); if (d < 30) return d + (d === 1 ? ' day ago' : ' days ago');
  return new Date(ms).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
function whoHTML(x) {
  const id = x.updatedBy || x.createdBy;
  if (!id) return x.order ? '<span class="pb-who">From the starter playbook</span>' : '';
  const when = x.updatedAt || x.createdAt;
  const verb = x.updatedAt && x.createdAt && x.updatedAt !== x.createdAt ? 'Updated' : 'Added';
  return `<span class="pb-who">${verb} by <b data-uid="${esc(id)}">a teammate</b>${when ? ' · ' + ago(when) : ''}</span>`;
}
async function resolveNames(root) {
  const els = $$('[data-uid]', root || document);
  if (!els.length) return;
  if (st.mode === 'local') { els.forEach(e => { e.textContent = 'you'; }); return; }
  if (!user) return;
  const ids = [...new Set(els.map(e => e.dataset.uid))];
  try {
    const ps = await user.profiles(ids);
    els.forEach(e => { const p = ps[e.dataset.uid]; e.textContent = p && p.isMe ? 'you' : (p && p.name) || 'Someone'; });
  } catch (err) { /* names are a nicety */ }
}
/* Re-render without losing the focused control (matched by data-fk) */
function keepFocus(fn) {
  const a = document.activeElement;
  const key = a && a.dataset ? a.dataset.fk : null;
  fn();
  if (key) { const n = document.querySelector(`[data-fk="${CSS.escape(key)}"]`); if (n && n !== document.activeElement) n.focus({ preventScroll: true }); }
}
function scrollToLib() {
  const el = $('#lib');
  const off = parseFloat(getComputedStyle(el).top) || 0;
  const y = el.getBoundingClientRect().top + window.scrollY - off;
  if (lenis) lenis.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
}

/* ---------- connection ---------- */
async function connect() {
  if (EMBED_SEED) { startLocal(); return; }
  const cl = window.claude;
  if (!cl || typeof cl.use !== 'function') { setMode('offline'); return; }
  let d = null, u = null;
  try { [d, u] = await Promise.all([cl.use('db'), cl.use('user')]); } catch (e) { d = null; }
  user = u;
  if (!d) { setMode('offline'); return; }
  db = d;
  if (user) {
    user.can('data.write').then(v => { st.write = v; applyWrite(); refresh(); }, () => {});
    user.id().then(v => { st.me = v; }, () => {});
  }
  db.collection('items').onSnapshot(snap => {
    const m = new Map();
    snap.docs.forEach(doc => { const v = doc.data(); if (v) m.set(doc.id, Object.assign({}, v, { id: doc.id })); });
    st.items = m;
    if (st.mode !== 'live') setMode('live'); else refresh();
  }, err => {
    setMode(err && err.code === 'revoked' ? 'revoked' : 'error');
  });
}
function startLocal() {
  const saved = store.get(LOCAL_KEY, null);
  local = saved && typeof saved === 'object' && saved.put && Array.isArray(saved.del) ? saved : { put: {}, del: [] };
  const m = new Map(EMBED_SEED.map(x => [x.id, Object.assign({}, x)]));
  Object.entries(local.put).forEach(([id, v]) => m.set(id, Object.assign({}, v, { id })));
  local.del.forEach(id => m.delete(id));
  st.items = m;
  st.me = 'local';
  setMode('local');
}
const SYNC = {
  loading: 'Connecting to the team library…',
  live: 'Live · shared with the team',
  local: 'Offline copy · changes stay in this browser',
  offline: 'Team library unavailable here · open the team link signed in',
  revoked: 'Your access changed · reload the page',
  error: 'Lost the connection · reload the page'
};
function setMode(m) {
  st.mode = m;
  const el = $('#pb-sync');
  el.dataset.state = m;
  el.querySelector('span').textContent = SYNC[m];
  applyWrite();
  refresh(true);
}
function applyWrite() {
  html.classList.toggle('pb-can-write', canWrite());
  const el = $('#pb-sync span');
  if (st.mode === 'live') el.textContent = SYNC.live + (canWrite() ? '' : ' · view only');
}

/* ---------- writes ---------- */
async function withRetry(op) {
  try { await op(); }
  catch (e) {
    if (e && e.code === 'unavailable') { await sleep(500 + Math.random() * 700); await op(); return; }
    if (e && e.code === 'invalid_argument') { st.locked = true; applyWrite(); }
    throw e;
  }
}
async function writeItem(id, body) {
  if (st.mode === 'local') {
    local.put[id] = body;
    local.del = local.del.filter(x => x !== id);
    store.set(LOCAL_KEY, local);
    st.items.set(id, Object.assign({}, body, { id }));
    refresh();
    return;
  }
  if (!db) throw { code: 'not_granted' };
  await withRetry(() => db.collection('items').doc(id).set(body));
}
async function deleteItem(id) {
  if (st.mode === 'local') {
    delete local.put[id];
    if (!local.del.includes(id)) local.del.push(id);
    store.set(LOCAL_KEY, local);
    st.items.delete(id);
    refresh();
    return;
  }
  if (!db) throw { code: 'not_granted' };
  await withRetry(() => db.collection('items').doc(id).delete());
}
function writeError(e) {
  const code = e && e.code;
  return ({
    invalid_argument: 'You can view the playbook, but not change it. Ask the owner for edit access.',
    quota_exceeded: 'The playbook is full. Delete old items first.',
    resource_exhausted: 'Too many changes at once. Wait a moment, then try again.',
    revoked: 'Your access changed. Reload the page.',
    not_granted: 'Saving isn’t available here. Open the team link while signed in.',
    capability_disabled: 'Saving isn’t available here. Open the team link while signed in.'
  })[code] || 'Couldn’t save. Check your connection and try again.';
}

/* ---------- top: stats + tabs ---------- */
function renderStats() {
  const n = t => (t === 'process' ? PHASES.length : haveData() ? itemsOf(t).length : '–');
  const tiles = [['process', 'Phases'], ['services', 'Service routes'], ['research', 'Research docs'], ['prompts', 'Prompts'], ['tools', 'Tools'], ['kb', 'Knowledge']];
  $('#pb-stats').innerHTML = tiles.map(([t, l], i) => `<button class="pb-stat is--${i}" type="button" data-tab="${t}" data-go aria-label="${n(t)} ${l}. Open ${SEC[t].label}"><span class="pb-stat__n tnum">${n(t)}</span><span class="pb-stat__label"><span class="eyebrow">${l}</span>${icon('arrow-r')}</span></button>`).join('');
}
function renderTabs() {
  keepFocus(() => {
    $('#pb-tabs').innerHTML = TABS.map((t, i) => `<button class="pb-tab" type="button" role="tab" id="tab-${t}" data-tab="${t}" data-fk="tab-${t}" aria-selected="${t === st.tab}" aria-controls="pb-panel" tabindex="${t === st.tab ? 0 : -1}"><span class="pb-tab__n eyebrow">${pad(i + 1)}</span>${SEC[t].label}${t !== 'process' && haveData() ? `<span class="pb-tab__c tnum">${itemsOf(t).length}</span>` : ''}</button>`).join('');
  });
  $('#pb-panel').setAttribute('aria-labelledby', 'tab-' + st.tab);
}
function setTab(t, scroll) {
  if (!SEC[t]) return;
  const changed = t !== st.tab;
  st.tab = t;
  store.set('pb-tab', t);
  renderTabs();
  if (changed) buildPanel();
  if (scroll || $('#pb-panel').getBoundingClientRect().top < 0) scrollToLib();
}

/* ---------- panels ---------- */
function head(t) {
  const s = SEC[t];
  return `<div class="ph"><div class="ph__text"><h2 class="h-m">${s.label}</h2><p class="p-m">${s.line}</p></div>${s.one ? `<div class="ph__actions"><button class="btn" type="button" data-theme="ink" data-add="${t}" data-write><svg class="btn__icon is--lead" viewBox="0 0 12 12" aria-hidden="true"><use href="#i-plus"/></svg><span class="btn__label">Add a ${s.one}</span></button></div>` : ''}</div>`;
}
function emptyHTML(t) {
  if (st.mode === 'loading') return '<div class="pb-empty"><p class="p-m">Loading the team library…</p></div>';
  if (!haveData()) return '<div class="pb-empty"><p class="h-xs">The team library opens on the team link.</p><p class="p-m">Open this page from the link we shared, signed in.</p></div>';
  return `<div class="pb-empty"><p class="h-xs">Nothing here yet.</p><p class="p-m">Add the first ${SEC[t].one}. Everyone will see it.</p><button class="btn" type="button" data-theme="volt" data-add="${t}" data-write><span class="btn__label">Add a ${SEC[t].one}</span></button></div>`;
}
const PANELS = {};
function buildPanel() {
  PANELS[st.tab].build();
  initButtons($('#pb-panel'));
}
function refresh(full) {
  renderStats();
  renderTabs();
  if (full) buildPanel();
  else { PANELS[st.tab].update(); initButtons($('#pb-panel')); }
  refreshOpenItem();
}

/* Process */
const doneCount = p => p.team.steps.filter((_, i) => checks[p.id + ':' + i]).length;
PANELS.process = {
  build() {
    $('#pb-panel-inner').innerHTML = head('process') + '<div class="sop"><div class="sop__list" id="sop-list" role="group" aria-label="Phases"></div><div class="sop__detail" id="sop-detail" aria-live="polite"></div></div>';
    this.update();
  },
  update() {
    keepFocus(() => {
      $('#sop-list').innerHTML = PHASES.map(p => { const d = doneCount(p), n = p.team.steps.length; return `<button class="sop__ph${p.id === st.phase ? ' is--on' : ''}" type="button" data-phase="${p.id}" data-fk="ph-${p.id}" aria-pressed="${p.id === st.phase}"><span class="sop__n eyebrow">${p.n}</span><span class="sop__name">${esc(p.name)}</span><span class="sop__count tnum">${d}/${n}</span><span class="sop__bar" aria-hidden="true"><i style="width:${n ? (d / n) * 100 : 0}%"></i></span></button>`; }).join('');
      const p = phaseById(st.phase) || PHASES[0];
      const d = doneCount(p), n = p.team.steps.length;
      const tools = haveData() ? itemsOf('tools').filter(x => (x.phases || []).includes(p.id)) : [];
      const prompts = haveData() ? itemsOf('prompts').filter(x => x.phase === p.id) : [];
      const research = haveData() ? itemsOf('research').filter(x => x.phase === p.id) : [];
      const none = haveData() ? '<span class="p-s pb-muted">Nothing linked yet.</span>' : '<span class="p-s pb-muted">Opens with the team library.</span>';
      $('#sop-detail').innerHTML = `
        <div class="sop__top">
          <div><p class="eyebrow sop__meta">Phase ${p.n}${p.dd ? ' · ' + esc(p.dd) : ''}${p.gate ? ' · Gate: ' + esc(p.gate) : ''}</p><h3 class="h-l">${esc(p.name)}</h3><p class="p-l sop__purpose">${esc(p.team.purpose)}</p></div>
          <div class="sop__progress"><span class="eyebrow tnum">${d} of ${n} done</span><span class="sop__track" aria-hidden="true"><i style="width:${n ? (d / n) * 100 : 0}%"></i></span>${d ? '<button class="sop__reset" type="button" data-reset data-fk="reset">Reset this phase</button>' : '<span class="p-s pb-muted">Ticks save in this browser</span>'}</div>
        </div>
        <ol class="steps">${p.team.steps.map((s, i) => { const k = p.id + ':' + i, on = !!checks[k]; return `<li><label class="step${on ? ' is--done' : ''}" for="chk-${p.id}-${i}"><input type="checkbox" id="chk-${p.id}-${i}" data-k="${k}" data-fk="chk-${p.id}-${i}"${on ? ' checked' : ''}><span class="step__box" aria-hidden="true"><svg viewBox="0 0 16 16"><use href="#i-check"/></svg></span><span class="step__n eyebrow">${pad(i + 1)}</span><span class="step__t">${esc(s)}</span></label></li>`; }).join('')}</ol>
        <div class="sop__grid">
          <div class="pb-box"><h4 class="eyebrow">Files you produce</h4><div class="chips-l">${p.team.outputs.map(o => `<span class="file-chip"><svg viewBox="0 0 16 16" aria-hidden="true"><use href="#i-file"/></svg>${esc(o)}</span>`).join('')}</div></div>
          <div class="pb-box is--gate"><h4 class="eyebrow">Exit gate</h4><p class="h-xs">${esc(p.team.exit)}</p></div>
          <div class="pb-box"><h4 class="eyebrow">Tools · ${tools.length}</h4><div class="chips-l">${tools.map(t => `<button class="tool-chip" type="button" data-item="${esc(t.id)}" data-fk="t-${esc(t.id)}">${esc(t.title)}</button>`).join('') || none}</div></div>
          <div class="pb-box"><h4 class="eyebrow">Research · ${research.length}</h4><div class="chips-l">${research.map(t => `<button class="tool-chip" type="button" data-item="${esc(t.id)}" data-fk="r-${esc(t.id)}">${esc(t.title)}</button>`).join('') || none}</div></div>
          <div class="pb-box is--wide"><h4 class="eyebrow">Prompts · ${prompts.length}</h4>${prompts.length ? `<ul class="plinks">${prompts.map(pr => `<li><button class="plink" type="button" data-item="${esc(pr.id)}" data-fk="p-${esc(pr.id)}"><span>${esc(pr.title)}</span><span class="tag" data-theme="violet" data-shape="round">${esc(pr.tool || 'Claude')}</span></button><button class="copy-btn" type="button" data-copy-item="${esc(pr.id)}" data-fk="pc-${esc(pr.id)}">${icon('copy')}Copy</button></li>`).join('')}</ul>` : none}</div>
        </div>`;
    });
  }
};

/* Services */
function phaseRail(list) {
  const on = Array.isArray(list) ? list : [];
  return `<ol class="svr">${PHASES.map(ph => `<li class="${on.includes(ph.id) ? 'is--on' : ''}"><span class="svr__dot"></span><span class="svr__n">${ph.n}</span><span class="svr__name">${esc(ph.name)}</span></li>`).join('')}</ol>`;
}
function routeSteps(steps) {
  return `<ol class="route">${(steps || []).map((s, k) => `<li style="--k:${k}"><span class="route__n">${pad(k + 1)}</span><span class="route__t">${esc(s)}</span></li>`).join('')}</ol>`;
}
PANELS.services = {
  build() {
    $('#pb-panel-inner').innerHTML = head('services') + '<div class="routes"><div class="routes__list" id="routes-list" role="group" aria-label="Service routes"></div><div class="routes__detail" id="routes-detail" aria-live="polite"></div></div>';
    this.update();
  },
  update() {
    const list = itemsOf('services');
    if (!list.length) { $('#routes-list').innerHTML = ''; $('#routes-detail').innerHTML = emptyHTML('services'); return; }
    if (!list.find(x => x.id === st.svc)) st.svc = list[0].id;
    const groups = PILLARS.map(pl => ({ name: pl.name, theme: pl.theme, items: list.filter(x => x.pillar === pl.id) }));
    const other = list.filter(x => !PILLARS.find(pl => pl.id === x.pillar));
    if (other.length) groups.push({ name: 'Other', theme: 'light', items: other });
    keepFocus(() => {
      $('#routes-list').innerHTML = groups.filter(g => g.items.length).map(g => `<div class="routes__group"><p class="eyebrow routes__gname"><i class="dot is--${g.theme}" aria-hidden="true"></i>${esc(g.name)}</p><div class="routes__chips">${g.items.map(x => `<button class="route-btn${x.id === st.svc ? ' is--on' : ''}" type="button" data-svc="${esc(x.id)}" data-fk="svc-${esc(x.id)}" aria-pressed="${x.id === st.svc}"><span>${esc(x.title)}</span>${newTag(x)}</button>`).join('')}</div></div>`).join('');
      const x = st.items.get(st.svc);
      const pl = PILLARS.find(p => p.id === x.pillar);
      $('#routes-detail').innerHTML = `<article class="rd"><div class="rd__head"><div class="tag-pair">${pl ? `<span class="tag" data-theme="${PILLAR_TAG[pl.theme]}">${esc(pl.name)}</span>` : ''}<span class="tag" data-theme="haze" data-shape="round">${(x.steps || []).length} steps</span>${newTag(x)}</div><h3 class="h-l">${esc(x.title)}</h3>${x.note ? `<p class="p-l">${esc(x.note)}</p>` : ''}</div><div class="rd__body"><div class="pb-box"><h4 class="eyebrow">The route</h4>${routeSteps(x.steps)}</div><div class="rd__side">${x.deliv ? `<div class="pb-box is--volt"><h4 class="eyebrow">Deliverable</h4><p class="h-xs">${esc(x.deliv)}</p></div>` : ''}<div class="pb-box"><h4 class="eyebrow">Phases</h4>${phaseRail(x.phases)}</div></div></div><div class="rd__foot">${whoHTML(x)}<div class="btn-row">${extLink(x)}<button class="btn" type="button" data-theme="bone" data-shape="round" data-size="s" data-edit="${esc(x.id)}" data-fk="e-${esc(x.id)}" data-write><svg class="btn__icon is--lead" viewBox="0 0 16 16" aria-hidden="true"><use href="#i-edit"/></svg><span class="btn__label">Edit route</span></button></div></div></article>`;
    });
    resolveNames($('#routes-detail'));
  }
};

/* Research */
PANELS.research = {
  build() {
    $('#pb-panel-inner').innerHTML = head('research') + '<div class="rflow2-wrap"><p class="eyebrow rflow2__label">Build order</p><ol class="rflow2" id="rflow"></ol></div><div class="rgrid" id="rgrid"></div>';
    this.update();
  },
  update() {
    const list = itemsOf('research');
    keepFocus(() => {
      $('#rflow').innerHTML = list.map((x, i) => `<li><button type="button" data-item="${esc(x.id)}" data-fk="f-${esc(x.id)}"><span class="eyebrow tnum">${pad(i + 1)}</span>${esc(x.title)}</button></li>`).join('');
      $('#rgrid').innerHTML = list.length ? list.map((x, i) => {
        const pr = x.prompt ? st.items.get(x.prompt) : null;
        return `<article class="rcard"><div class="rcard__top"><span class="rcard__n tnum">${pad(i + 1)}</span>${phaseTag(x.phase)}${newTag(x)}</div><h3 class="h-s">${esc(x.title)}</h3>${x.note ? `<p class="p-m rcard__note">${esc(x.note)}</p>` : ''}<p class="eyebrow rcard__meta">${(x.sections || []).length} sections${pr ? ' · prompt ready' : ''}${safeUrl(x.url) ? ' · template linked' : ''}</p><div class="rcard__actions">${pr ? `<button class="copy-btn" type="button" data-copy-item="${esc(pr.id)}" data-fk="rc-${esc(x.id)}">${icon('copy')}Copy prompt</button>` : '<span></span>'}<button class="rcard__open" type="button" data-item="${esc(x.id)}" data-fk="ro-${esc(x.id)}">Open${icon('arrow-ur')}</button></div></article>`;
      }).join('') : emptyHTML('research');
    });
  }
};

/* Prompts */
const matches = (x, q) => { const t = q.trim().toLowerCase(); if (!t) return true; const hay = [x.title, x.note, x.body, x.tool, x.group, x.type, (x.tags || []).join(' ')].join(' ').toLowerCase(); return t.split(/\s+/).every(w => hay.includes(w)); };
function chipsHTML(key, opts, cur, label) {
  return `<div class="chips pb-chips" role="group" aria-label="${label}">${opts.map(([v, l, n]) => `<button class="chip" type="button" data-f="${key}" data-v="${esc(v)}" data-fk="f-${key}-${esc(v)}" aria-pressed="${cur === v}">${esc(l)}${n != null ? `<span class="chip__n tnum">${n}</span>` : ''}</button>`).join('')}</div>`;
}
function findHTML(key, ph) {
  return `<label class="pb-find"><svg viewBox="0 0 16 16" aria-hidden="true"><use href="#i-search"/></svg><input type="search" data-q="${key}" value="${esc(st.q[key])}" placeholder="${ph}" aria-label="${ph}"></label>`;
}
PANELS.prompts = {
  build() {
    const all = itemsOf('prompts');
    const opts = [['all', 'All', all.length], ...PHASES.map(p => [p.id, p.name, all.filter(x => x.phase === p.id).length])];
    $('#pb-panel-inner').innerHTML = head('prompts') + `<div class="pbar" id="pbar">${chipsHTML('prompts', opts, st.f.prompts, 'Filter prompts by phase')}${findHTML('prompts', 'Filter prompts')}</div><div class="pgrid" id="pgrid"></div>`;
    this.update();
  },
  update() {
    const all = itemsOf('prompts');
    $$('#pbar [data-f="prompts"]').forEach(b => { const v = b.dataset.v; const n = v === 'all' ? all.length : all.filter(x => x.phase === v).length; const c = b.querySelector('.chip__n'); if (c) c.textContent = n; });
    let list = all;
    if (st.f.prompts !== 'all') list = list.filter(x => x.phase === st.f.prompts);
    list = list.filter(x => matches(x, st.q.prompts));
    keepFocus(() => {
      $('#pgrid').innerHTML = list.length ? list.map(x => `<article class="pcard"><div class="pcard__top"><div class="tag-pair">${phaseTag(x.phase)}<span class="tag" data-theme="violet" data-shape="round">${esc(x.tool || 'Claude')}</span></div>${newTag(x)}</div><h3 class="h-xs pcard__title">${esc(x.title)}</h3>${x.note ? `<p class="p-s pcard__note">${esc(x.note)}</p>` : ''}<pre class="pcard__body">${esc(x.body || '')}</pre><div class="pcard__actions"><button class="btn" type="button" data-theme="volt" data-size="s" data-copy-item="${esc(x.id)}" data-fk="c-${esc(x.id)}"><svg class="btn__icon is--lead" viewBox="0 0 16 16" aria-hidden="true"><use href="#i-copy"/></svg><span class="btn__label">Copy prompt</span></button><button class="btn" type="button" data-theme="bone" data-size="s" data-shape="round" data-item="${esc(x.id)}" data-fk="o-${esc(x.id)}"><span class="btn__label">Open</span></button></div></article>`).join('')
        : all.length ? '<div class="pb-empty"><p class="p-m">No prompts match. Try another word or phase.</p></div>' : emptyHTML('prompts');
    });
  }
};

/* Tools */
const groupsOf = all => GROUPS.concat([...new Set(all.map(x => x.group).filter(g => g && !GROUPS.includes(g)))]);
PANELS.tools = {
  build() {
    const all = itemsOf('tools');
    const opts = [['all', 'All', all.length], ...groupsOf(all).map(g => [g, g, all.filter(x => x.group === g).length])];
    $('#pb-panel-inner').innerHTML = head('tools') + `<div class="core"><div class="core__head"><h3 class="h-s">Core stack</h3><p class="p-m">The simple, everyday set. Start here.</p></div><div class="core__grid" id="core-grid"></div></div><div class="pbar" id="tbar">${chipsHTML('tools', opts, st.f.tools, 'Filter tools by group')}${findHTML('tools', 'Filter tools')}</div><div id="tlist"></div>`;
    this.update();
  },
  update() {
    const all = itemsOf('tools');
    const core = all.filter(x => x.core);
    keepFocus(() => {
      $('#core-grid').innerHTML = core.length ? core.map(x => `<article class="ctile"><span class="ctile__av" aria-hidden="true">${esc(x.title.charAt(0))}</span><button class="ctile__main" type="button" data-item="${esc(x.id)}" data-fk="k-${esc(x.id)}"><span class="ctile__name">${esc(x.title)}</span><span class="ctile__note">${esc(x.note || '')}</span></button>${extLink(x, 'ctile__link')}</article>`).join('') : `<p class="p-m core__empty">${haveData() ? 'Mark a tool as core to pin it here.' : 'Opens with the team library.'}</p>`;
      let list = all;
      if (st.f.tools !== 'all') list = list.filter(x => x.group === st.f.tools);
      list = list.filter(x => matches(x, st.q.tools));
      const groups = groupsOf(all).concat(list.some(x => !x.group) ? [''] : []);
      $('#tlist').innerHTML = list.length ? groups.map(g => {
        const rows = list.filter(x => (x.group || '') === g);
        if (!rows.length) return '';
        return `<section class="tgroup"><h4 class="eyebrow tgroup__name">${esc(g || 'Other')} · ${rows.length}</h4><ul class="trows">${rows.map(x => `<li class="trow"><button class="trow__main" type="button" data-item="${esc(x.id)}" data-fk="tr-${esc(x.id)}"><span class="trow__name">${esc(x.title)}${x.core ? '<span class="core-dot" title="Core stack"></span>' : ''}${newTag(x)}</span><span class="trow__note">${esc(x.note || '')}</span></button><span class="trow__phases">${(x.phases || []).map(ph => phaseById(ph)).filter(Boolean).map(ph => `<span class="mini-ph">${esc(ph.name)}</span>`).join('')}</span><span class="trow__actions">${x.cmd ? `<button class="copy-btn" type="button" data-copy-cmd="${esc(x.id)}" data-fk="cc-${esc(x.id)}">${icon('copy')}Install</button>` : ''}${extLink(x)}</span></li>`).join('')}</ul></section>`;
      }).join('') : all.length ? '<div class="pb-empty"><p class="p-m">No tools match.</p></div>' : emptyHTML('tools');
    });
  }
};

/* Knowledge */
function treeHTML(nodes) {
  return `<ul>${nodes.map(n => `<li><span class="tree__t">${esc(n.t)}</span>${n.db ? '<span class="tree__db">database</span>' : ''}${n.n ? `<span class="tree__n">${esc(n.n)}</span>` : ''}${n.c ? treeHTML(n.c) : ''}</li>`).join('')}</ul>`;
}
PANELS.kb = {
  build() {
    const all = itemsOf('kb');
    const opts = [['all', 'All', all.length], ...KB_TYPES.map(t => [t, t, all.filter(x => x.type === t).length])];
    $('#pb-panel-inner').innerHTML = head('kb') + `<div class="kb"><div class="kb__main"><div class="pbar" id="kbar">${chipsHTML('kb', opts, st.f.kb, 'Filter by type')}${findHTML('kb', 'Filter knowledge')}</div><ul class="kblist" id="kblist"></ul></div><aside class="kb__side"><div class="pb-box is--dark tree"><h4 class="eyebrow">How our Notion is organised</h4>${treeHTML(TREE)}</div><div class="pb-box"><h4 class="eyebrow">Tip</h4><p class="p-m">Paste the Notion, Drive or Figma link when you add a resource. Everyone can open it from here.</p></div></aside></div>`;
    this.update();
  },
  update() {
    const all = itemsOf('kb');
    $$('#kbar [data-f="kb"]').forEach(b => { const v = b.dataset.v; const n = v === 'all' ? all.length : all.filter(x => x.type === v).length; const c = b.querySelector('.chip__n'); if (c) c.textContent = n; });
    let list = all;
    if (st.f.kb !== 'all') list = list.filter(x => x.type === st.f.kb);
    list = list.filter(x => matches(x, st.q.kb));
    keepFocus(() => {
      $('#kblist').innerHTML = list.length ? list.map(x => `<li class="kbrow"><span class="kbrow__type is--${esc((x.type || 'Link').toLowerCase())}">${esc(x.type || 'Link')}</span><button class="kbrow__main" type="button" data-item="${esc(x.id)}" data-fk="kb-${esc(x.id)}"><span class="kbrow__title">${esc(x.title)}${newTag(x)}</span>${x.note ? `<span class="kbrow__note">${esc(x.note)}</span>` : ''}${(x.tags || []).length ? `<span class="kbrow__tags">${tagChips(x.tags)}</span>` : ''}</button><span class="kbrow__actions">${extLink(x)}</span></li>`).join('')
        : all.length ? '<li class="pb-empty"><p class="p-m">Nothing matches.</p></li>' : `<li>${emptyHTML('kb')}</li>`;
    });
  }
};

/* ---------- item sheet ---------- */
let openId = null, openSnap = '';
function itemHTML(x) {
  const sec = SEC[x.section] || { label: 'Item' };
  const pl = x.section === 'services' ? PILLARS.find(p => p.id === x.pillar) : null;
  const top = `<div class="tag-pair"><span class="tag">${esc(sec.label)}</span>${x.section === 'tools' ? `<span class="tag" data-theme="haze" data-shape="round">${esc(x.group || 'Other')}</span>${x.core ? '<span class="tag" data-theme="volt">Core stack</span>' : ''}` : ''}${x.section === 'kb' ? `<span class="tag" data-theme="haze" data-shape="round">${esc(x.type || 'Link')}</span>` : ''}${x.section === 'prompts' ? `${phaseTag(x.phase)}<span class="tag" data-theme="violet" data-shape="round">${esc(x.tool || 'Claude')}</span>` : ''}${x.section === 'research' ? phaseTag(x.phase) : ''}${pl ? `<span class="tag" data-theme="${PILLAR_TAG[pl.theme]}">${esc(pl.name)}</span>` : ''}${newTag(x)}</div>`;
  let main = '';
  if (x.section === 'prompts') {
    main = `<div><div class="im__bar"><span class="eyebrow">The prompt</span><button class="btn" type="button" data-theme="volt" data-size="s" data-copy-item="${esc(x.id)}"><svg class="btn__icon is--lead" viewBox="0 0 16 16" aria-hidden="true"><use href="#i-copy"/></svg><span class="btn__label">Copy prompt</span></button></div><pre class="im__pre">${esc(x.body || '')}</pre></div>`;
  } else if (x.section === 'research') {
    const pr = x.prompt ? st.items.get(x.prompt) : null;
    main = `<div class="im__grid"><div class="pb-box"><h4 class="eyebrow">Sections on the page</h4>${routeSteps(x.sections)}</div><div class="im__col">${x.example ? `<div class="pb-box is--gate"><h4 class="eyebrow">Example</h4><p class="p-m">${esc(x.example)}</p></div>` : ''}${pr ? `<div class="pb-box is--dark"><div class="im__bar"><h4 class="eyebrow">Prompt · ${esc(pr.title)}</h4><button class="copy-btn is--volt" type="button" data-copy-item="${esc(pr.id)}">${icon('copy')}Copy</button></div><pre class="im__pre is--short">${esc(pr.body || '')}</pre><button class="im__more" type="button" data-item="${esc(pr.id)}">Open the full prompt →</button></div>` : ''}<div class="pb-box"><h4 class="eyebrow">Status in Notion</h4><p class="p-m">Not started → In progress → Done</p></div></div></div>`;
  } else if (x.section === 'tools') {
    main = `<div class="im__grid"><div class="pb-box"><h4 class="eyebrow">Used in</h4>${phaseRail(x.phases)}</div>${x.cmd ? `<div class="pb-box is--dark"><div class="im__bar"><h4 class="eyebrow">Install</h4><button class="copy-btn is--volt" type="button" data-copy-cmd="${esc(x.id)}">${icon('copy')}Copy</button></div><pre class="im__pre is--cmd">${esc(x.cmd)}</pre><p class="p-s pb-muted">Check the project README for the latest command before running.</p></div>` : ''}</div>`;
  } else if (x.section === 'services') {
    main = `<div class="im__grid"><div class="pb-box"><h4 class="eyebrow">Route · ${(x.steps || []).length} steps</h4>${routeSteps(x.steps)}</div><div class="im__col">${x.deliv ? `<div class="pb-box is--volt"><h4 class="eyebrow">Deliverable</h4><p class="h-xs">${esc(x.deliv)}</p></div>` : ''}<div class="pb-box"><h4 class="eyebrow">Phases</h4>${phaseRail(x.phases)}</div></div></div>`;
  } else if (x.section === 'kb') {
    main = x.phase && x.phase !== 'any' ? `<div class="pb-box"><h4 class="eyebrow">Phase</h4><p class="p-m">${esc((phaseById(x.phase) || {}).name || '')}</p></div>` : '';
  }
  const u = safeUrl(x.url);
  const link = u ? `<a class="btn" data-theme="ink" data-shape="round" href="${esc(u)}" target="_blank" rel="noopener"><span class="btn__label">${x.section === 'tools' ? 'Visit website' : 'Open link'}</span><svg class="btn__icon" viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></a>` : '';
  return `<article class="im"><header class="im__head">${top}<h2 class="h-l" id="item-title">${esc(x.title)}</h2>${x.note ? `<p class="p-l im__note">${esc(x.note)}</p>` : ''}${(x.tags || []).length ? `<div class="tag-pair">${tagChips(x.tags)}</div>` : ''}${u ? `<p class="im__url"><span class="eyebrow">Link</span><a href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^https?:\/\//, ''))}</a></p>` : ''}</header>${main}<footer class="im__foot">${whoHTML(x)}<div class="btn-row">${link}<button class="btn" type="button" data-theme="bone" data-shape="round" data-edit="${esc(x.id)}" data-write><svg class="btn__icon is--lead" viewBox="0 0 16 16" aria-hidden="true"><use href="#i-edit"/></svg><span class="btn__label">Edit</span></button></div></footer></article>`;
}
function openItem(id, trigger) {
  const x = st.items.get(id);
  if (!x) return;
  openId = id;
  openSnap = JSON.stringify(x);
  const body = $('#item-body');
  body.innerHTML = itemHTML(x);
  initButtons(body);
  resolveNames(body);
  body.scrollTop = 0;
  const m = $('.modal[data-modal="item"]');
  if (m.dataset.open !== 'true') openModal('item', trigger);
  else m.querySelector('.modal__panel').focus({ preventScroll: true });
}
function refreshOpenItem() {
  const m = $('.modal[data-modal="item"]');
  if (!openId || m.dataset.open !== 'true') return;
  const x = st.items.get(openId);
  if (!x) { closeModal(m); toast('That item was removed'); openId = null; return; }
  const snap = JSON.stringify(x);
  if (snap === openSnap) return;
  openSnap = snap;
  const body = $('#item-body');
  body.innerHTML = itemHTML(x);
  initButtons(body);
  resolveNames(body);
}

/* ---------- add / edit form ---------- */
const form = { section: 'prompts', editing: null, saving: false };
const fInput = (name, label, val, o = {}) => `<label class="field${o.wide ? ' is--wide' : ''}"><span class="field__label">${label}${o.req ? ' <b>*</b>' : ''}</span><input class="input${o.mono ? ' is--mono' : ''}" name="${name}" value="${esc(val || '')}"${o.ph ? ` placeholder="${esc(o.ph)}"` : ''}${o.type ? ` type="${o.type}"` : ''}${o.max ? ` maxlength="${o.max}"` : ''}${o.req ? ' required' : ''}${o.auto ? ' data-autofocus' : ''}></label>`;
const fArea = (name, label, val, o = {}) => `<label class="field${o.wide === false ? '' : ' is--wide'}"><span class="field__label">${label}${o.req ? ' <b>*</b>' : ''}</span><textarea class="input${o.mono ? ' is--mono' : ''}" name="${name}" rows="${o.rows || 3}"${o.ph ? ` placeholder="${esc(o.ph)}"` : ''}${o.max ? ` maxlength="${o.max}"` : ''}${o.req ? ' required' : ''}>${esc(val || '')}</textarea>${o.hint ? `<span class="field__hint">${o.hint}</span>` : ''}</label>`;
const fSelect = (name, label, opts, val) => `<label class="field"><span class="field__label">${label}</span><select class="input" name="${name}">${opts.map(([v, l]) => `<option value="${esc(v)}"${v === val ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></label>`;
const fPhases = val => `<fieldset class="field is--wide"><legend class="field__label">Phases</legend><div class="pf__checks">${PHASES.map(p => `<label class="pf__check"><input type="checkbox" name="phases" value="${p.id}"${(val || []).includes(p.id) ? ' checked' : ''}><span>${p.n} ${esc(p.name)}</span></label>`).join('')}</div></fieldset>`;
const phaseOpts = [['any', 'Any phase'], ...PHASES.map(p => [p.id, `${p.n} ${p.name}`])];
const PH_TEXT = { services: 'e.g. Mobile app', research: 'e.g. Content audit', prompts: 'e.g. Case study writer', tools: 'e.g. Notion', kb: 'e.g. Proposal template' };
const NOTE_LABEL = { services: 'Goal', research: 'What it gives', prompts: 'What it’s for', tools: 'What we use it for', kb: 'Short description' };
const URL_LABEL = { services: 'Link', research: 'Template link', prompts: 'Link', tools: 'Website', kb: 'Link' };
function fieldsHTML(s, x) {
  let f = fInput('title', 'Title', x.title, { req: true, ph: PH_TEXT[s], max: 140, auto: true, wide: true })
    + fArea('note', NOTE_LABEL[s], x.note, { rows: 2, max: 400, ph: 'One or two short lines.' });
  if (s === 'prompts') {
    f += fSelect('phase', 'Phase', phaseOpts, x.phase || st.f.prompts !== 'all' && st.f.prompts || 'any')
      + fSelect('tool', 'Use with', AI_TOOLS.map(t => [t, t]), x.tool || 'Claude')
      + fArea('body', 'Prompt text', x.body, { req: true, rows: 10, mono: true, max: 12000, ph: 'Write the prompt. Use [brackets] for parts to fill in.' });
  } else if (s === 'research') {
    const prompts = itemsOf('prompts').slice().sort((a, b) => a.title.localeCompare(b.title));
    f += fSelect('phase', 'Phase', phaseOpts, x.phase || 'any')
      + fSelect('prompt', 'Prompt that writes it', [['', 'None'], ...prompts.map(p => [p.id, p.title])], x.prompt || '')
      + fArea('sections', 'Sections on the page', (x.sections || []).join('\n'), { rows: 6, ph: 'One section per line', hint: 'One per line.' })
      + fInput('example', 'Example', x.example, { ph: 'Optional. A real example from a project.', max: 300, wide: true });
  } else if (s === 'tools') {
    const groups = groupsOf(itemsOf('tools'));
    f += fSelect('group', 'Group', [...groups.map(g => [g, g]), ['Other', 'Other']], x.group || (st.f.tools !== 'all' ? st.f.tools : groups[0]))
      + `<label class="field pf__core"><span class="field__label">Core stack</span><span class="pf__check"><input type="checkbox" name="core"${x.core ? ' checked' : ''}><span>Pin to the core stack</span></span></label>`
      + fPhases(x.phases)
      + fArea('cmd', 'Install command', x.cmd, { rows: 2, mono: true, max: 1000, ph: 'Optional. e.g. npm install -g …' });
  } else if (s === 'kb') {
    f += fSelect('type', 'Type', KB_TYPES.map(t => [t, t]), x.type || (st.f.kb !== 'all' ? st.f.kb : 'Link'))
      + fSelect('phase', 'Phase', phaseOpts, x.phase || 'any');
  } else if (s === 'services') {
    f += fSelect('pillar', 'Practice', PILLARS.map(p => [p.id, p.name]), x.pillar || PILLARS[0].id)
      + fInput('deliv', 'Deliverable', x.deliv, { ph: 'e.g. Live app · Admin guide', max: 200 })
      + fArea('steps', 'Steps', (x.steps || []).join('\n'), { req: true, rows: 7, ph: 'One step per line', hint: 'One per line, in order.' })
      + fPhases(x.phases);
  }
  f += fInput('url', URL_LABEL[s], x.url, { ph: 'https://', type: 'url', max: 600 })
    + fInput('tags', 'Tags', (x.tags || []).join(', '), { ph: 'Comma separated', max: 200 });
  return f;
}
function readCommon() {
  const fd = new FormData($('#pf'));
  return { title: fd.get('title') || '', note: fd.get('note') || '', url: fd.get('url') || '', tags: String(fd.get('tags') || '').split(',').map(t => t.trim()).filter(Boolean) };
}
function renderForm(keep) {
  const s = form.section, x = form.editing || keep || {};
  $('#pf-mode').textContent = form.editing ? 'Edit' : 'New';
  $('#pf-where').textContent = st.mode === 'local' ? 'Saved in this browser' : 'Shared with the team';
  $('#form-title').textContent = form.editing ? `Edit ${SEC[s].one}` : `Add a ${SEC[s].one}`;
  $('#pf-kinds').hidden = !!form.editing;
  $('#pf-kind-grid').innerHTML = LIBS.map(k => `<button class="pf__kind${k === s ? ' is--on' : ''}" type="button" data-kind="${k}" aria-pressed="${k === s}"><span class="pf__kind-name">${esc(SEC[k].label)}</span><span class="pf__kind-one">${esc(cap(SEC[k].one))}</span></button>`).join('');
  $('#pf-fields').innerHTML = fieldsHTML(s, x);
  $('#pf-danger').hidden = !form.editing;
  $('#pf-confirm').hidden = true;
  $('#pf-delete').hidden = false;
  $('#pf-error').hidden = true;
  initButtons($('#pf'));
  $$('#pf-submit .btn__label').forEach(l => { l.textContent = form.editing ? 'Save changes' : st.mode === 'local' ? 'Save' : 'Add for everyone'; });
}
function openForm(section, id, trigger) {
  if (!canWrite()) { toast(st.mode === 'live' ? 'You can view the playbook, not change it' : 'Adding needs the team link'); return; }
  form.editing = id ? st.items.get(id) || null : null;
  form.section = form.editing ? form.editing.section : LIBS.includes(section) ? section : LIBS.includes(st.tab) ? st.tab : 'kb';
  renderForm();
  const im = $('.modal[data-modal="item"]');
  if (im.dataset.open === 'true') closeModal(im);
  openModal('form', trigger);
}
function formError(msg) { const el = $('#pf-error'); el.textContent = msg; el.hidden = false; el.scrollIntoView({ block: 'nearest' }); }
function setSaving(on) {
  form.saving = on;
  const b = $('#pf-submit');
  b.disabled = on;
  b.classList.toggle('is--busy', on);
}
async function submitForm(e) {
  e.preventDefault();
  if (form.saving) return;
  const fd = new FormData($('#pf'));
  const v = k => String(fd.get(k) || '').trim();
  const s = form.section;
  const title = v('title');
  if (!title) { formError('Add a title.'); $('#pf [name="title"]').focus(); return; }
  let url = v('url');
  if (url && !/^https?:\/\//i.test(url)) url = 'https://' + url;
  if (url && !/^https?:\/\/[^\s/]+\.[^\s]+$/i.test(url)) { formError('Check the link. It should look like https://…'); return; }
  const body = { section: s, title: title.slice(0, 140), note: v('note').slice(0, 400), url, tags: v('tags').split(',').map(t => t.trim()).filter(Boolean).slice(0, 12) };
  if (s === 'prompts') { body.phase = v('phase') || 'any'; body.tool = v('tool') || 'Claude'; body.body = String(fd.get('body') || '').trim(); if (!body.body) { formError('Paste the prompt text.'); return; } }
  if (s === 'research') { body.phase = v('phase') || 'any'; body.sections = lines(fd.get('sections')).slice(0, 40); body.example = v('example'); body.prompt = v('prompt'); }
  if (s === 'tools') { body.group = v('group') || 'Other'; body.phases = fd.getAll('phases').map(String); body.cmd = String(fd.get('cmd') || '').trim(); body.core = fd.get('core') === 'on'; }
  if (s === 'kb') { body.type = v('type') || 'Link'; body.phase = v('phase') || 'any'; }
  if (s === 'services') { body.pillar = v('pillar'); body.deliv = v('deliv'); body.steps = lines(fd.get('steps')).slice(0, 40); body.phases = fd.getAll('phases').map(String); if (!body.steps.length) { formError('Add at least one step.'); return; } }
  const prev = form.editing, now = Date.now();
  if (prev) ['order', 'createdBy', 'createdAt'].forEach(k => { if (prev[k] !== undefined && prev[k] !== null) body[k] = prev[k]; });
  else { body.createdAt = now; if (st.me) body.createdBy = st.me; }
  body.updatedAt = now;
  if (st.me) body.updatedBy = st.me;
  const id = prev ? prev.id : `${SEC[s].prefix}-${slug(title)}-${rand()}`;
  setSaving(true);
  try {
    await writeItem(id, body);
    closeModal($('.modal[data-modal="form"]'));
    toast(st.mode === 'local' ? 'Saved in this browser' : prev ? 'Saved for everyone' : 'Added for everyone');
    if (!prev) {
      if (s === 'services') st.svc = id;
      if (s === 'prompts' && st.f.prompts !== 'all' && body.phase !== st.f.prompts) st.f.prompts = 'all';
      if (s === 'tools' && st.f.tools !== 'all' && body.group !== st.f.tools) st.f.tools = 'all';
      if (s === 'kb' && st.f.kb !== 'all' && body.type !== st.f.kb) st.f.kb = 'all';
      st.q[s] = '';
      if (st.tab !== s) setTab(s, true); else buildPanel();
    }
  } catch (err) {
    formError(writeError(err));
  } finally {
    setSaving(false);
  }
}
async function confirmDelete() {
  const x = form.editing;
  if (!x || form.saving) return;
  setSaving(true);
  try {
    await deleteItem(x.id);
    closeModal($('.modal[data-modal="form"]'));
    toast(st.mode === 'local' ? 'Deleted in this browser' : 'Deleted for everyone');
  } catch (err) {
    formError(writeError(err));
  } finally {
    setSaving(false);
  }
}

/* ---------- search ---------- */
const KIND_ICON = { process: 'SOP', services: 'SVC', research: 'DOC', prompts: 'AI', tools: 'APP', kb: 'KB' };
let results = [], sel = 0;
function searchIndex() {
  const out = [];
  PHASES.forEach(p => out.push({ kind: 'process', id: p.id, title: `${p.n} ${p.name}`, sub: p.team.purpose, parts: [p.team.purpose, ...p.team.steps, ...p.team.outputs, p.team.exit] , text: [p.name, p.tag, p.team.purpose, ...p.team.steps, ...p.team.outputs, p.team.exit].join(' ').toLowerCase() }));
  st.items.forEach(x => out.push({ kind: x.section, id: x.id, title: x.title, sub: x.note || (x.body ? x.body.split('\n')[0] : '') || (x.steps || [])[0] || '', parts: [x.note, ...(x.steps || []), ...(x.sections || []), x.body].filter(Boolean), text: [x.title, x.note, x.body, x.tool, x.group, x.type, x.deliv, (x.tags || []).join(' '), (x.sections || []).join(' '), (x.steps || []).join(' ')].filter(Boolean).join(' ').toLowerCase() }));
  return out;
}
function runSearch() {
  const q = $('#pb-q').value.trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  const box = $('#pb-results');
  if (!words.length) {
    const recent = [...st.items.values()].filter(x => x.createdAt).sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt)).slice(0, 5);
    results = recent.map(x => ({ kind: x.section, id: x.id, title: x.title, sub: x.note || '' }));
    const jump = TABS.map((t, i) => `<button class="sr is--jump" type="button" data-jump="${t}"><span class="sr__icon">${pad(i + 1)}</span><span><span class="sr__title">${SEC[t].label}</span><span class="sr__sub">${SEC[t].line}</span></span><span class="sr__go">Go</span></button>`).join('');
    box.innerHTML = (results.length ? `<p class="eyebrow sr-group">Recently added</p>${results.map((r, i) => resultHTML(r, i)).join('')}` : '') + `<p class="eyebrow sr-group">Jump to</p>${jump}`;
    sel = 0; markSel();
    return;
  }
  results = searchIndex().filter(r => words.every(w => r.text.includes(w))).map(r => {
    const t = r.title.toLowerCase();
    const hit = (r.parts || []).find(p => words.some(w => String(p).toLowerCase().includes(w)));
    return Object.assign({}, r, { score: (t.includes(q) ? 4 : 0) + words.filter(w => t.includes(w)).length, sub: t.includes(words[0]) ? r.sub : (hit ? String(hit).split('\n').find(l => words.some(w => l.toLowerCase().includes(w))) || r.sub : r.sub) });
  }).sort((a, b) => b.score - a.score).slice(0, 40);
  if (!results.length) { box.innerHTML = `<div class="sr-empty"><p class="p-m">Nothing found for “${esc(q)}”.</p>${canWrite() ? '<button class="btn" type="button" data-theme="volt" data-size="s" data-add="kb"><span class="btn__label">Add it to the playbook</span></button>' : ''}</div>`; initButtons(box); return; }
  const best = k => Math.max(...results.filter(r => r.kind === k).map(r => r.score));
  const order = TABS.filter(t => results.some(r => r.kind === t)).sort((a, b) => best(b) - best(a));
  let i = 0;
  box.innerHTML = order.map(k => `<p class="eyebrow sr-group">${SEC[k].label}</p>` + results.filter(r => r.kind === k).map(r => resultHTML(r, i++)).join('')).join('');
  results = order.flatMap(k => results.filter(r => r.kind === k));
  sel = 0; markSel();
}
function resultHTML(r, i) {
  return `<button class="sr" type="button" role="option" id="sr-${i}" data-res="${i}" aria-selected="false"><span class="sr__icon">${KIND_ICON[r.kind] || '•'}</span><span><span class="sr__title">${esc(r.title)}</span>${r.sub ? `<span class="sr__sub">${esc(String(r.sub).slice(0, 140))}</span>` : ''}</span><span class="sr__go">Open</span></button>`;
}
function markSel() {
  const all = $$('#pb-results [data-res]');
  all.forEach((b, k) => b.setAttribute('aria-selected', String(k === sel)));
  const cur = all[sel];
  $('#pb-q').setAttribute('aria-activedescendant', cur ? cur.id : '');
  if (cur) cur.scrollIntoView({ block: 'nearest' });
}
function openResult(r) {
  if (!r) return;
  closeModal($('.modal[data-modal="search"]'));
  if (r.kind === 'process') { st.phase = r.id; store.set('pb-phase', r.id); if (st.tab !== 'process') setTab('process', true); else { PANELS.process.update(); scrollToLib(); } return; }
  if (r.kind === 'services') { st.svc = r.id; store.set('pb-svc', r.id); if (st.tab !== 'services') setTab('services', true); else { PANELS.services.update(); scrollToLib(); } return; }
  setTimeout(() => openItem(r.id), 80);
}
function openSearch(trigger) {
  $('#pb-q').value = '';
  runSearch();
  openModal('search', trigger);
}

/* ---------- events ---------- */
function copyItem(id, btn) {
  const x = st.items.get(id);
  if (!x) return;
  const pre = btn && btn.closest('.pcard, .im, .pb-box') ? btn.closest('.pcard, .im, .pb-box').querySelector('pre') : null;
  copyText(x.body || x.cmd || x.url || x.title, pre, x.section === 'prompts' ? `Copied. Paste into ${x.tool || 'Claude'}` : 'Copied');
}
function initPlaybook() {
  /* Menu links and stat tiles: choose the tab, then scroll (before the shared hash-link handler) */
  document.addEventListener('click', e => {
    const l = e.target.closest('[data-tab-link]');
    if (!l) return;
    e.preventDefault();
    e.stopPropagation();
    setNav(false);
    setTab(l.dataset.tabLink, true);
  }, true);
  document.addEventListener('click', e => {
    const t = e.target;
    let b;
    if ((b = t.closest('[data-tab]'))) { setTab(b.dataset.tab, b.hasAttribute('data-go')); return; }
    if ((b = t.closest('[data-search-open]'))) { openSearch(b); return; }
    if ((b = t.closest('[data-add]'))) { setNav(false); const sm = $('.modal[data-modal="search"]'); if (sm.dataset.open === 'true') closeModal(sm); openForm(b.dataset.add, null, b); return; }
    if ((b = t.closest('[data-edit]'))) { openForm(null, b.dataset.edit, b); return; }
    if ((b = t.closest('[data-copy-item]'))) { copyItem(b.dataset.copyItem, b); return; }
    if ((b = t.closest('[data-copy-cmd]'))) { const x = st.items.get(b.dataset.copyCmd); if (x) copyText(x.cmd, b.closest('.pb-box') ? b.closest('.pb-box').querySelector('pre') : null, 'Install command copied'); return; }
    if ((b = t.closest('[data-item]'))) { openItem(b.dataset.item, b); return; }
    if ((b = t.closest('[data-phase]'))) { st.phase = b.dataset.phase; store.set('pb-phase', st.phase); PANELS.process.update(); return; }
    if ((b = t.closest('[data-svc]'))) { st.svc = b.dataset.svc; store.set('pb-svc', st.svc); PANELS.services.update(); initButtons($('#pb-panel')); if (isMobile()) $('#routes-detail').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); return; }
    if ((b = t.closest('[data-f]'))) { const k = b.dataset.f; st.f[k] = b.dataset.v; $$(`[data-f="${k}"]`).forEach(c => c.setAttribute('aria-pressed', String(c === b))); PANELS[k].update(); initButtons($('#pb-panel')); return; }
    if ((b = t.closest('[data-reset]'))) { Object.keys(checks).forEach(k => { if (k.startsWith(st.phase + ':')) delete checks[k]; }); store.set('pb-checks', checks); PANELS.process.update(); return; }
    if ((b = t.closest('[data-kind]'))) { const keep = readCommon(); form.section = b.dataset.kind; renderForm(keep); const f = $('#pf [name="title"]'); if (f) f.focus(); return; }
    if ((b = t.closest('[data-res]'))) { openResult(results[+b.dataset.res]); return; }
    if ((b = t.closest('[data-jump]'))) { closeModal($('.modal[data-modal="search"]')); setTab(b.dataset.jump, true); }
  });
  /* Checklist ticks, filters as you type */
  document.addEventListener('change', e => {
    const k = e.target.dataset && e.target.dataset.k;
    if (!k) return;
    if (e.target.checked) checks[k] = true; else delete checks[k];
    store.set('pb-checks', checks);
    PANELS.process.update();
  });
  document.addEventListener('input', e => {
    const k = e.target.dataset && e.target.dataset.q;
    if (k) { st.q[k] = e.target.value; PANELS[k].update(); initButtons($('#pb-panel')); return; }
    if (e.target.id === 'pb-q') runSearch();
  });
  /* Tabs: arrow keys move between them */
  $('#pb-tabs').addEventListener('keydown', e => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    let i = TABS.indexOf(st.tab);
    i = e.key === 'Home' ? 0 : e.key === 'End' ? TABS.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;
    setTab(TABS[i]);
    $('#tab-' + TABS[i]).focus();
  });
  /* Search palette keys */
  $('#pb-q').addEventListener('keydown', e => {
    const n = $$('#pb-results [data-res]').length;
    if (e.key === 'ArrowDown' && n) { e.preventDefault(); sel = (sel + 1) % n; markSel(); }
    if (e.key === 'ArrowUp' && n) { e.preventDefault(); sel = (sel - 1 + n) % n; markSel(); }
    if (e.key === 'Enter') { e.preventDefault(); if (n) openResult(results[sel]); }
  });
  /* "/" or Ctrl/⌘+K opens search */
  document.addEventListener('keydown', e => {
    const a = document.activeElement;
    const typing = a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable);
    if ((e.key === '/' && !typing && !e.ctrlKey && !e.metaKey) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
      if (openStack.length) return;
      e.preventDefault();
      openSearch(a);
    }
  });
  /* Form */
  $('#pf').addEventListener('submit', submitForm);
  $('#pf-delete').addEventListener('click', () => { $('#pf-delete').hidden = true; $('#pf-confirm').hidden = false; $('#pf-confirm-no').focus(); });
  $('#pf-confirm-no').addEventListener('click', () => { $('#pf-confirm').hidden = true; $('#pf-delete').hidden = false; $('#pf-delete').focus(); });
  $('#pf-confirm-yes').addEventListener('click', confirmDelete);
  $('.modal[data-modal="item"]').addEventListener('modal:close', () => { openId = null; });
  /* Footer link to the client pitch */
  if (PITCH_HREF) { const a = $('#pb-pitch-link'); a.href = PITCH_HREF; a.hidden = false; }
}

/* ---------- boot ---------- */
safe('render', () => {
  renderStats(); renderTabs(); buildPanel();
  $$('[data-year]').forEach(e => { e.textContent = String(new Date().getFullYear()); });
});
safe('buttons', () => initButtons());
safe('lenis', initLenis);
safe('nav', initNav);
safe('events', initGlobalEvents);
safe('playbook', initPlaybook);
connect().catch(err => { console.error('[connect]', err); setMode('offline'); });
