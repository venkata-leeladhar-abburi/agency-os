/* ===== Client pitch ===== */
const PH = C.phases, SV = C.services, PI = C.pillars, RS = C.research;
const phaseOf = id => PH.find(p => p.id === id);
const pillarOf = id => PI.find(p => p.id === id);
const TAG_THEME = { volt: 'volt', violet: 'violet', dark: 'ink', light: 'cloud', black: 'steel' };

/* ---------- Hero radial: every service as a card ---------- */
function renderRadial() {
  const items = SV.map((s, i) => [i, s.vis, s.name, pillarOf(s.pillar).name]);
  const all = items.concat(items.slice(0, 8));
  const list = $('#radial-list');
  list.style.setProperty('--step', (360 / all.length) + 'deg');
  list.innerHTML = all.map(([k, v, t, l], i) => {
    const dup = i >= items.length;
    return `<div class="radial__item" style="--i:${i}"${dup ? ' aria-hidden="true"' : ''}><button class="radial__card" type="button" data-svc="${k}"${dup ? ' tabindex="-1"' : ''} aria-label="${esc(t)}: see how we deliver it"><span class="media"><span class="mui">${V[v]()}</span></span><span class="radial__info"><span class="radial__name">${esc(t)}</span><span class="eyebrow">${esc(l)}</span></span></button></div>`;
  }).join('');
}

/* ---------- Reel ticker ---------- */
function renderTicker() {
  const names = PH.concat(PH[0]).map(p => `<span><i>${p.n}</i>${esc(p.name)}</span>`).join('');
  $('#reel-ticker').innerHTML = `<span class="reel__ticker-track">${names}</span>`;
  const track = $('.reel__ticker-track');
  if (reduce) return;
  let i = 0;
  setInterval(() => {
    if (document.hidden) return;
    i++;
    track.style.transition = '';
    track.style.transform = `translateY(${-i * 100 / (PH.length + 1)}%)`;
    if (i === PH.length) setTimeout(() => { track.style.transition = 'none'; track.style.transform = 'translateY(0)'; i = 0; }, 900);
  }, 2200);
}

/* ---------- Selected work ---------- */
function renderWork() {
  $('#work-slides').innerHTML = C.work.map((w, i) => `<article class="live-card"><div class="live-card__start"><div class="tag-pair"><span class="tag">Built by us</span><span class="tag" data-shape="round">${esc(w.kind)}</span></div><div class="live-card__title"><h3 class="h-s">${esc(w.name)}</h3><p class="p-s">${esc(w.line)}</p></div><span class="eyebrow">${pad(i + 1)} / ${pad(C.work.length)}</span></div><div class="media"><div class="mui">${V[w.vis]()}</div></div></article>`).join('');
}

/* ---------- Problem: hiring separately vs one team ---------- */
const MESS = [
  ['No research', 'Research first', 'found', [14, 18, -6], [18, 26], [26, 10, -6], [27, 16]],
  ['Logo-only designer', 'Brand system', 'found', [78, 14, 5], [18, 38], [72, 14, 5], [27, 27]],
  ['Copywriter', 'Story-led copy', 'found', [37, 31, 4], [18, 50], [34, 26, 4], [27, 38]],
  ['UI designer', 'Product design', 'deliver', [62, 25, -5], [50, 26], [70, 32, -5], [27, 49]],
  ['Developer', 'Clean build', 'deliver', [86, 42, 7], [50, 38], [28, 44, 7], [27, 60]],
  ['Hosting vendor', 'Launch & handover', 'deliver', [17, 52, 3], [50, 50], [72, 50, 3], [73, 16]],
  ['Ads freelancer', 'Meta ads', 'grow', [52, 54, -4], [82, 26], [30, 60, -4], [73, 27]],
  ['SEO person', 'SEO', 'grow', [80, 64, 6], [82, 38], [72, 66, 6], [73, 38]],
  ['Automation freelancer', 'n8n & AI agents', 'grow', [18, 80, -7], [82, 50], [34, 76, -7], [73, 49]],
  ['WhatsApp vendor', 'WhatsApp agent', 'grow', [46, 77, 5], [82, 62], [68, 84, 5], [73, 60]],
  ['Five group chats', 'One project lead', 'kb', [70, 89, -3], [37, 82], [30, 92, -3], [30, 82]],
  ['Files everywhere', 'One shared workspace', 'kb', [88, 82, 6], [63, 82], [68, 94, 6], [70, 82]]
];
const MESS_LINKS = [[0, 2, 1], [2, 3, 0], [3, 7, 1], [6, 9, 0], [5, 6, 1], [4, 5, 0], [10, 1, 0], [11, 8, 1], [7, 10, 0], [9, 0, 0], [1, 4, 1], [8, 3, 0]];
function renderMess() {
  const m = isMobile();
  $('#mess-chips').innerHTML = MESS.map(([from, to, g, a, b, am, bm], k) => {
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
function renderPains() {
  $('#pains').innerHTML = C.compare.map(([a, b], i) => `<li class="pain"><span class="pain__n">${pad(i + 1)}</span><span class="pain__from">${esc(a)}</span><span class="pain__to">${esc(b)}</span></li>`).join('');
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

/* ---------- Services: practices + every service ---------- */
let svcFilter = 'all';
function renderPillars() {
  const count = id => SV.filter(s => s.pillar === id).length;
  $('#pillars').innerHTML = PI.map((p, i) => `<button class="pillar is--${p.theme}" type="button" data-pillar="${p.id}" aria-pressed="false"><span class="pillar__top"><span class="eyebrow">${pad(i + 1)}</span><span class="pillar__count tnum">${count(p.id)}</span></span><span class="pillar__name">${esc(p.name)}</span><span class="pillar__line">${esc(p.line)}</span></button>`).join('');
}
function svcCard(s, i) {
  const p = pillarOf(s.pillar);
  return `<article class="svc" data-pillar="${s.pillar}"><div class="svc__media media"><div class="mui">${V[s.vis]()}</div></div><div class="svc__body"><div class="svc__top"><span class="svc__pillar is--${p.theme}"><i></i>${esc(p.name)}</span><span class="eyebrow tnum">${pad(i + 1)}</span></div><h3 class="svc__name">${esc(s.name)}</h3><p class="svc__line">${esc(s.line)}</p><p class="svc__get">${esc(s.get)}</p></div><button class="svc__open" type="button" data-svc="${i}"><span>See the route</span>${icon('arrow-ur')}<span class="sr-only">: ${esc(s.name)}</span></button></article>`;
}
function renderServices() {
  $('#svc-grid').innerHTML = SV.map(svcCard).join('');
}
function setSvcFilter(id) {
  svcFilter = svcFilter === id ? 'all' : id;
  $$('#pillars [data-pillar]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.pillar === svcFilter)));
  $('#pillars').classList.toggle('is--filtered', svcFilter !== 'all');
  $$('#svc-grid .svc').forEach(c => { c.hidden = svcFilter !== 'all' && c.dataset.pillar !== svcFilter; });
  const n = svcFilter === 'all' ? SV.length : SV.filter(s => s.pillar === svcFilter).length;
  const p = svcFilter === 'all' ? null : pillarOf(svcFilter);
  $('#svc-count').innerHTML = p
    ? `<b>${esc(p.name)}</b> · ${n} ${n === 1 ? 'service' : 'services'} <button class="svc-bar__reset" type="button" data-pillar-reset>Show all</button><span class="svc-bar__items">Also covers: ${p.items.map(esc).join(' · ')}</span>`
    : `All ${SV.length} services`;
}
let svcIndex = 0;
function serviceHTML(i) {
  const s = SV[i], p = pillarOf(s.pillar), n = SV.length;
  const prev = SV[(i - 1 + n) % n], next = SV[(i + 1) % n];
  const rail = PH.map(ph => `<li class="${s.phases.includes(ph.id) ? 'is--on' : ''}"><span class="svr__dot"></span><span class="svr__n">${ph.n}</span><span class="svr__name">${esc(ph.name)}</span></li>`).join('');
  return `<div class="svm">
    <div class="svm__head"><div class="tag-pair"><span class="tag" data-theme="${TAG_THEME[p.theme]}">${esc(p.name)}</span><span class="tag" data-theme="haze" data-shape="round">Service ${pad(i + 1)} / ${n}</span></div><h2 class="h-l" id="svc-title">${esc(s.name)}</h2><p class="p-l">${esc(s.goal)}</p></div>
    <div class="svm__grid">
      <div class="svm__route"><h3 class="eyebrow svm__label">The route · ${s.steps.length} steps</h3><ol class="route">${s.steps.map((t, k) => `<li style="--k:${k}"><span class="route__n">${pad(k + 1)}</span><span class="route__t">${esc(t)}</span></li>`).join('')}</ol></div>
      <div class="svm__side">
        <div class="media svm__media"><div class="mui">${V[s.vis]()}</div></div>
        <div class="svm__get"><span class="eyebrow">You get</span><p class="h-xs">${esc(s.get)}</p></div>
        <div class="svm__phases"><span class="eyebrow">Phases used</span><ol class="svr">${rail}</ol></div>
        <a class="btn" data-theme="ink" data-size="full" href="#start"><span class="btn__label">Talk about this service</span><svg class="btn__icon" viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></a>
      </div>
    </div>
    <div class="pm__nav"><button class="btn" type="button" data-theme="bone" data-svc-step="-1"><span class="btn__label">← ${esc(prev.name)}</span></button><button class="btn" type="button" data-theme="volt" data-svc-step="1"><span class="btn__label">${esc(next.name)} →</span></button></div>
  </div>`;
}
function openService(i, trigger) {
  svcIndex = (i + SV.length) % SV.length;
  const body = $('#service-body');
  body.innerHTML = serviceHTML(svcIndex);
  initButtons(body);
  body.scrollTop = 0;
  if ($('.modal[data-modal="service"]').dataset.open !== 'true') openModal('service', trigger);
  else $('.modal[data-modal="service"] .modal__panel').focus({ preventScroll: true });
}
function initServices() {
  $('#pillars').addEventListener('click', e => { const b = e.target.closest('[data-pillar]'); if (b) setSvcFilter(b.dataset.pillar); });
  $('#svc-count').addEventListener('click', e => { if (e.target.closest('[data-pillar-reset]')) setSvcFilter(svcFilter); });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-svc]');
    if (b) { openService(+b.dataset.svc, b); return; }
    const st = e.target.closest('[data-svc-step]');
    if (st) openService(svcIndex + (+st.dataset.svcStep));
  });
}

/* ---------- Process: double diamond + draggable phase cards ---------- */
const PHASE_THEME = ['volt', 'dark', 'violet', 'light', 'black', 'volt', 'cloud'];
const PHASE_ICON = [
  '<path d="M10 14h20a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H20l-7 6v-6h-3a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z"/><path d="M38 20h2a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-2v5l-6-5"/>',
  '<circle cx="21" cy="21" r="12"/><path d="M30 30l10 10"/>',
  '<path d="M8 10h32l-12 14v12l-8 4V24z"/>',
  '<rect x="7" y="9" width="34" height="30" rx="3"/><path d="M7 18h34M18 18v21"/>',
  '<path d="M17 15l-9 9 9 9M31 15l9 9-9 9M27 11l-6 26"/>',
  '<path d="M24 6c7 5 10 13 8 24l-8 6-8-6c-2-11 1-19 8-24z"/><circle cx="24" cy="20" r="3"/><path d="M16 30l-6 6 8-1M32 30l6 6-8-1"/>',
  '<path d="M8 38l10-12 8 6 14-18"/><path d="M32 14h8v8"/>'
];
let phaseActive = -1;
function ddHalf(i, side, sub) {
  const p = PH[i];
  return `<button class="dd__half is--${side}" type="button" data-ph="${i}" aria-label="Phase ${p.n}: ${esc(p.name)}${p.gate ? '. Your sign-off: ' + esc(p.gate) : ''}"><span class="dd__n">${p.n}</span><b>${esc(p.name)}</b><small>${sub}</small></button>`;
}
function ddNode(i) {
  const p = PH[i];
  return `<button class="dd__node" type="button" data-ph="${i}" aria-label="Phase ${p.n}: ${esc(p.name)}${p.gate ? '. Your sign-off: ' + esc(p.gate) : ''}"><span class="dd__n">${p.n}</span><b>${esc(p.name)}</b>${p.gate ? `<span class="dd__gate" title="Your sign-off: ${esc(p.gate)}"></span>` : ''}</button>`;
}
function ddDiamond(a, b, title, subs, gates) {
  return `<div class="dd__d"><p class="dd__title eyebrow">${title}</p><div class="dd__shape"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polygon class="dd__fill" data-fill="${a}" points="0,50 50,0 50,100"/><polygon class="dd__fill" data-fill="${b}" points="50,0 100,50 50,100"/><polygon class="dd__edge" points="0,50 50,0 100,50 50,100"/><line class="dd__div" x1="50" y1="2" x2="50" y2="98"/></svg>${ddHalf(a, 'a', subs[0])}${ddHalf(b, 'b', subs[1])}${gates}</div></div>`;
}
function renderDD() {
  const g = (i, cls) => PH[i].gate ? `<span class="dd__gate ${cls}" title="Your sign-off: ${esc(PH[i].gate)}"></span>` : '';
  $('#dd').innerHTML = ddNode(0)
    + ddDiamond(1, 2, 'Find the right problem', ['Explore', 'Decide'], g(2, 'is--end'))
    + ddDiamond(3, 4, 'Build the right solution', ['Create', 'Deliver'], g(3, 'is--mid') + g(4, 'is--end'))
    + ddNode(5) + ddNode(6);
}
function renderPhases() {
  $('#phase-cards').innerHTML = PH.map((p, i) => `<div class="gslider__item" data-i="${i}"><article class="stage-card is--${PHASE_THEME[i]}" aria-label="Phase ${p.n}: ${esc(p.name)}"><div class="stage-card__top"><div class="tag-pair"><span class="tag">${p.dd ? esc(p.dd) : 'Phase'}</span><span class="tag" data-shape="round">${p.n} / 06</span></div><svg class="stage-card__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PHASE_ICON[i]}</svg></div><div class="stage-card__num" aria-hidden="true">${p.n}</div><div class="stage-card__body"><h3 class="h-m">${esc(p.name)}</h3><p class="p-m">${esc(p.tag)}. ${esc(p.short)}</p><p class="stage-card__out">${p.gate ? 'Sign-off: ' + esc(p.gate) : PH[i + 1] ? 'Flows straight into ' + esc(PH[i + 1].name) : 'Ongoing. Reviewed every quarter.'}</p></div></article></div>`).join('');
}
function setPhase(i) {
  if (i === phaseActive) return;
  phaseActive = i;
  const p = PH[i], next = PH[i + 1];
  const lane = (label, items, cls = '') => `<div class="sd__lane ${cls}"><h4>${label}</h4><ul class="dl">${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
  $('#phase-detail').innerHTML = `<div class="sd"><div class="sd__head"><span class="sd__num">${p.n} / 06</span><h3 class="h-m">${esc(p.name)}</h3><p class="sd__out">${esc(p.intro)}</p></div><div class="sd__lanes">${lane('We do', p.do)}${lane('You get', p.get, 'is--get')}${lane('We need from you', p.need)}<div class="sd__lane is--kb"><h4>${p.gate ? 'Your sign-off' : next ? 'Next' : 'After launch'}</h4><p class="h-xs">${p.gate ? esc(p.gate) : next ? 'Straight into ' + esc(next.name) : 'Ongoing care'}</p><p class="p-s sd__then">${p.gate ? (next ? 'Then: ' + esc(next.n + ' ' + next.name) : '') : next ? 'Your sign-off comes after ' + esc(next.name) + '.' : 'Reviewed with you every quarter.'}</p></div></div></div>`;
  $$('#dd [data-ph]').forEach(b => { const k = +b.dataset.ph; b.classList.toggle('is--on', k === i); b.classList.toggle('is--passed', k < i); b.setAttribute('aria-pressed', String(k === i)); });
  $$('#dd [data-fill]').forEach(f => { const k = +f.dataset.fill; f.classList.toggle('is--on', k === i); f.classList.toggle('is--passed', k < i); });
  $$('#phase-cards .gslider__item').forEach((it, k) => it.setAttribute('aria-current', k === i ? 'true' : 'false'));
}
function initPhaseSlider() {
  const coll = $('#process .gslider__collection'), list = $('#phase-cards');
  const items = $$('.gslider__item', list);
  const N = items.length;
  let snaps = [], current = 0, move = () => {};
  const go = i => { i = clamp(i, 0, N - 1); setPhase(i); current = i; move(i); };
  coll.setAttribute('tabindex', '0');
  coll.setAttribute('aria-label', 'Phases. Use left and right arrow keys to move between phases.');
  coll.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); } });
  $('#dd').addEventListener('click', e => { const b = e.target.closest('[data-ph]'); if (b) { ddTouched = true; go(+b.dataset.ph); } });
  setPhase(0);

  if (!hasG || !window.Draggable) {
    let t;
    coll.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(() => { const c = coll.scrollLeft + coll.clientWidth / 2; let best = 0, bd = 1e9; items.forEach((it, i) => { const d = Math.abs(it.offsetLeft + it.offsetWidth / 2 - c); if (d < bd) { bd = d; best = i; } }); current = best; setPhase(best); }, 90); }, { passive: true });
    move = i => { const it = items[i]; coll.scrollTo({ left: it.offsetLeft + it.offsetWidth / 2 - coll.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' }); };
    items.forEach((it, i) => it.addEventListener('click', () => go(i)));
    return { go };
  }
  const measure = () => { const cw = coll.clientWidth; snaps = items.map(it => cw / 2 - (it.offsetLeft + it.offsetWidth / 2)); };
  const render = () => {
    const x = gsap.getProperty(list, 'x'), cw = coll.clientWidth;
    items.forEach(it => {
      const c = it.offsetLeft + it.offsetWidth / 2 + x;
      const d = (c - cw / 2) / (it.offsetWidth + 20);
      const a = clamp(d * 7.5, -36, 36);
      const y = (1 - Math.cos(a * Math.PI / 180)) * it.offsetWidth * 4.2;
      it.style.transform = `translate3d(0,${y.toFixed(1)}px,0) rotate(${a.toFixed(2)}deg)`;
    });
  };
  const nearest = x => { let best = 0, bd = 1e9; snaps.forEach((s, i) => { const d = Math.abs(s - x); if (d < bd) { bd = d; best = i; } }); return best; };
  move = i => gsap.to(list, { x: snaps[i], duration: reduce ? 0 : 1, ease: 'expo.out', onUpdate: render, overwrite: true });
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
    onDrag() { dragged = true; ddTouched = true; render(); const i = nearest(this.x); if (i !== current) { current = i; setPhase(i); } },
    onThrowUpdate() { render(); const i = nearest(this.x); if (i !== current) { current = i; setPhase(i); } },
    onRelease() { if (!hasInertia && dragged) { const i = nearest(this.x); current = i; setPhase(i); move(i); } },
    onClick(e) { if (dragged) return; const it = e.target.closest('.gslider__item'); if (it) { ddTouched = true; go(+it.dataset.i); } }
  })[0];
  window.addEventListener('resize', () => { measure(); drag.applyBounds({ minX: snaps[N - 1], maxX: snaps[0] }); gsap.set(list, { x: snaps[current] }); render(); });
  return { go };
}
/* A quick sweep through the phases the first time the diagram shows, until someone touches it */
let ddTouched = false;
function initDDSweep(slider) {
  if (reduce || !slider) return;
  onVisible($('#dd'), (v, io) => {
    if (!v) return;
    io.disconnect();
    let k = 0;
    const t = setInterval(() => {
      if (ddTouched) { clearInterval(t); return; }
      k++;
      if (k >= PH.length) { clearInterval(t); setTimeout(() => { if (!ddTouched) slider.go(0); }, 500); return; }
      $$('#dd [data-ph], #dd [data-fill]').forEach(el => { const n = +(el.dataset.ph || el.dataset.fill); el.classList.toggle('is--sweep', n === k); });
      setTimeout(() => $$('#dd .is--sweep').forEach(el => el.classList.remove('is--sweep')), 330);
    }, 340);
  }, { threshold: 0.6 });
}

/* ---------- Research pack: flick cards ---------- */
const PH_TAG = { connect: 'volt', discover: 'volt', define: 'violet', design: 'cloud', build: 'white', launch: 'volt', grow: 'violet' };
function renderResearch() {
  $('#research-cards').innerHTML = RS.map((r, i) => {
    const ph = phaseOf(r.phase);
    return `<div class="flick__item" data-i="${i}" role="listitem"><article class="portal-card"><div class="media"><div class="mui">${V[r.vis]()}</div></div><div class="portal-card__info"><div class="portal-card__top"><div><h3 class="h-s">${esc(r.name)}</h3><p class="p-s">${esc(r.line)}</p></div><span class="tag portal-card__plan" data-theme="${PH_TAG[r.phase]}" data-shape="round">${esc(ph.name)}</span></div><div class="portal-card__counts"><span>Doc ${pad(i + 1)}</span><span>${r.sections.length} sections</span></div><div class="portal-card__open"><span>Look inside</span><svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></div></div></article></div>`;
  }).join('');
  $('#research-flow').innerHTML = RS.map((r, i) => `<li><button type="button" data-doc="${i}"><span class="eyebrow tnum">${pad(i + 1)}</span>${esc(r.name)}</button></li>`).join('');
}
let docIndex = 0;
function docHTML(i) {
  const r = RS[i], ph = phaseOf(r.phase), n = RS.length;
  const prev = RS[(i - 1 + n) % n], next = RS[(i + 1) % n];
  return `<div class="pm"><div class="pm__head"><div class="tag-pair"><span class="tag">Research pack</span><span class="tag" data-theme="violet" data-shape="round">${ph.n} ${esc(ph.name)}</span></div><h2 class="h-l" id="doc-title">${esc(r.name)}</h2><p class="p-l">${esc(r.line)}</p></div>
    <div class="docm"><div class="docm__media media"><div class="mui">${V[r.vis]()}</div></div><div class="docm__body"><h3 class="eyebrow svm__label">What’s inside</h3><ol class="route is--compact">${r.sections.map((t, k) => `<li style="--k:${k}"><span class="route__n">${pad(k + 1)}</span><span class="route__t">${esc(t)}</span></li>`).join('')}</ol>${r.example ? `<div class="docm__ex"><span class="eyebrow">From the e-book store project</span><p class="p-m">${esc(r.example)}</p></div>` : ''}</div></div>
    <div class="pm__nav"><button class="btn" type="button" data-theme="bone" data-doc-step="-1"><span class="btn__label">← ${esc(prev.name)}</span></button><button class="btn" type="button" data-theme="volt" data-doc-step="1"><span class="btn__label">${esc(next.name)} →</span></button></div></div>`;
}
function openDoc(i, trigger) {
  docIndex = (i + RS.length) % RS.length;
  const body = $('#doc-body');
  body.innerHTML = docHTML(docIndex);
  initButtons(body);
  body.scrollTop = 0;
  if ($('.modal[data-modal="doc"]').dataset.open !== 'true') openModal('doc', trigger);
  else $('.modal[data-modal="doc"] .modal__panel').focus({ preventScroll: true });
}
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
    $('#research-count').textContent = `${pad(idx(pos) + 1)} / ${pad(n)}`;
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
      if (it) { const i = +it.dataset.i; if (i === idx(pos)) openDoc(i, root); else goTo(nearestTarget(i)); }
      else goTo(Math.round(pos));
      return;
    }
    goTo(Math.round(pos - clamp(vx * 3, -2, 2)));
  };
  root.addEventListener('pointerup', end);
  root.addEventListener('pointercancel', () => { dragging = false; goTo(Math.round(pos)); });
  root.setAttribute('tabindex', '0');
  root.setAttribute('aria-label', 'Research documents. Use left and right arrow keys to browse, Enter to look inside.');
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.round(target) + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.round(target) - 1); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDoc(idx(target), root); }
  });
  $('[data-flick-prev]').addEventListener('click', () => goTo(Math.round(target) - 1));
  $('[data-flick-next]').addEventListener('click', () => goTo(Math.round(target) + 1));
  $('[data-flick-open]').addEventListener('click', e => openDoc(idx(target), e.currentTarget));
  $('#research-flow').addEventListener('click', e => { const b = e.target.closest('[data-doc]'); if (b) { goTo(nearestTarget(+b.dataset.doc)); openDoc(+b.dataset.doc, b); } });
  document.addEventListener('click', e => { const st = e.target.closest('[data-doc-step]'); if (st) openDoc(docIndex + (+st.dataset.docStep)); });
  window.addEventListener('resize', layout);
  layout();
}

/* ---------- What you keep: deliverables by phase ---------- */
function renderRoad() {
  $('#road').innerHTML = PH.map(p => {
    const docs = C.docs.filter(d => d[0] === p.id);
    return `<li class="road__item${p.id === 'grow' ? ' is--now' : ''}"><div class="road__label"><span class="road__code">${p.n}</span><h3 class="h-s">${esc(p.name)}</h3><span class="tag" data-theme="haze" data-shape="round">${docs.length} ${docs.length === 1 ? 'file' : 'files'}</span></div><span class="road__dot" aria-hidden="true"></span><div class="road__body"><ul class="files">${docs.map(([, nm, l]) => `<li class="file"><svg viewBox="0 0 16 16" aria-hidden="true"><use href="#i-file"/></svg><div><b>${esc(nm)}</b><span>${esc(l)}</span></div></li>`).join('')}</ul></div></li>`;
  }).join('');
}

/* ---------- Working together ---------- */
function renderTogether() {
  $('#together-list').innerHTML = C.together.map(([t, l], i) => `<li class="q"><span class="q__n">${pad(i + 1)}</span><h3 class="h-xs">${esc(t)}</h3><p class="p-m">${esc(l)}</p></li>`).join('');
  $('#creed-slides').innerHTML = C.principles.map(([t, l], i) => `<div class="creed__slide"><span class="creed__n tnum">${pad(i + 1)}</span><h3 class="h-l">${esc(t)}</h3><p class="p-l">${esc(l)}</p></div>`).join('');
  $('#about-principles').innerHTML = C.principles.map(([t, l], i) => `<li><i>${pad(i + 1)}</i><div><b>${esc(t)}</b> <span>· ${esc(l)}</span></div></li>`).join('');
}

/* ---------- Walkthrough player ---------- */
function initPlayer() {
  const modal = $('.modal[data-modal="reel"]');
  $('#player-frames').innerHTML = PH.map((p, i) => `<div class="pframe${i === 0 ? ' is--active' : ''}" aria-hidden="${i !== 0}"><div class="pframe__text"><span class="pframe__num">${p.n}</span><h3 class="h-m">${esc(p.name)}</h3><p class="p-l">${esc(p.intro)}</p><p class="pframe__out">You get: ${esc(p.get.join(' · '))}</p><ul class="pframe__lanes"><li><b>We do</b><span>${esc(p.do.slice(0, 3).join(' · '))}</span></li><li><b>We need</b><span>${esc(p.need.join(' · '))}</span></li><li><b>Sign-off</b><span>${esc(p.gate || (PH[i + 1] ? 'After ' + PH[i + 1].name : 'Ongoing care'))}</span></li></ul></div><div class="media"><div class="mui">${V[p.vis]()}</div></div></div>`).join('');
  $('#player-progress').innerHTML = PH.map((p, i) => `<button type="button" aria-label="Go to phase ${p.n}: ${esc(p.name)}" data-pi="${i}"><span><i></i></span></button>`).join('');
  const frames = $$('.pframe'), bars = $$('#player-progress i');
  const DUR = 4200;
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

/* ---------- Motion ---------- */
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
  let boost = 0, lastY = window.scrollY, hovering = false;
  const radial = $('[data-radial]');
  radial.addEventListener('pointerenter', () => { hovering = true; });
  radial.addEventListener('pointerleave', () => { hovering = false; });
  radial.addEventListener('focusin', () => { hovering = true; });
  radial.addEventListener('focusout', () => { hovering = false; });
  gsap.ticker.add(() => {
    const y = window.scrollY, v = Math.abs(y - lastY); lastY = y;
    boost = Math.max(boost * 0.92, Math.min(v, 80));
    const target = hovering ? 0.25 : 1 + boost * 0.9;
    spin.timeScale(spin.timeScale() + (target - spin.timeScale()) * 0.08);
  });
}

/* ---------- Boot ---------- */
safe('render', () => {
  renderRadial(); renderTicker(); renderWork(); renderMess(); renderPains();
  renderPillars(); renderServices(); renderDD(); renderPhases(); renderResearch(); renderRoad(); renderTogether();
  $$('[data-visual]').forEach(el => { const v = V[el.dataset.visual]; if (v) el.innerHTML = v(); });
  $$('[data-year]').forEach(e => { e.textContent = String(new Date().getFullYear()); });
});
safe('buttons', () => initButtons());
safe('lenis', initLenis);
safe('nav', initNav);
safe('events', initGlobalEvents);
safe('vsliders', () => $$('[data-vslider]').forEach(r => initVSlider(r)));
safe('services', initServices);
safe('phases', () => { const s = initPhaseSlider(); initDDSweep(s); });
safe('flick', initFlick);
safe('player', initPlayer);
safe('copy', initCopy);
safe('cursor', () => initCursor('.flick__item.is--active'));
safe('mess', initMess);
safe('hero', initHero);
safe('radial', initRadialMotion);
safe('reveals', initReveals);
if (hasG && window.ScrollTrigger) window.addEventListener('load', () => ScrollTrigger.refresh());
