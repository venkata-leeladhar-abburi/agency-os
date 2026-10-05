/* ===== Heaven Gadgets growth plan ===== */
const ST = C.steps, ACT = id => C.acts.find(a => a.id === id);
const kicon = (id, cls = 'ki') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#k-${id}"/></svg>`;
const portrait = p => `https://images.pexels.com/photos/${p.img}/pexels-photo-${p.img}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=960`;
const facePos = (p, z = 2.6) => `background-image:url(${portrait(p)});background-size:${z * 100}%;background-position:${clamp((p.face[0] * z - 50) / (z - 1), 0, 100).toFixed(1)}% ${clamp((p.face[1] * z * 1.5 - 50) / (z * 1.5 - 1), 0, 100).toFixed(1)}%`;
const photo = p => `<span class="person-card__init" aria-hidden="true">${esc(p.first[0])}</span><img src="${esc(portrait(p))}" alt="" decoding="async" draggable="false" onerror="this.remove()">`;
const facts = rows => `<dl class="person-card__facts">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
const PHONE = ['mhome', 'mwa', 'mproduct'];
const screen = v => `<span class="k${PHONE.includes(v) ? ' is--m' : ''}">${V[v] ? V[v]() : ''}</span>`;
const ACT_THEME = { attract: 'light', convert: 'violet', deliver: 'black', retain: 'volt' };
const fmtIN = n => new Intl.NumberFormat('en-IN').format(Math.round(n));
const lakh = n => (n >= 1e7 ? '₹' + (n / 1e7).toFixed(2) + ' Cr' : n >= 1e5 ? '₹' + (n / 1e5).toFixed(1) + 'L' : '₹' + fmtIN(n));
let stageSlider = null, lane = 'on';

/* ---------- Hero ring: the eight steps, three times round ---------- */
function renderRadial() {
  const all = ST.concat(ST, ST);
  const list = $('#radial-list');
  list.style.setProperty('--step', (360 / all.length) + 'deg');
  list.innerHTML = all.map((s, i) => {
    const dup = i >= ST.length, k = i % ST.length;
    return `<div class="radial__item" style="--i:${i}"${dup ? ' aria-hidden="true"' : ''}><button class="radial__card" type="button" data-stage="${k}"${dup ? ' tabindex="-1"' : ''} aria-label="Step ${s.n}, ${esc(s.name)}: ${esc(s.line)}"><span class="media">${screen(s.vis)}</span><span class="radial__info"><span class="radial__name">${esc(s.name)}</span><span class="eyebrow">${s.n}</span></span></button></div>`;
  }).join('');
}

/* ---------- Reel ticker ---------- */
function renderTicker() {
  const names = ST.concat(ST[0]).map(s => `<span><i>${s.n}</i>${esc(s.name)}</span>`).join('');
  $('#reel-ticker').innerHTML = `<span class="reel__ticker-track">${names}</span>`;
  const track = $('.reel__ticker-track');
  if (reduce) return;
  let i = 0;
  setInterval(() => {
    if (document.hidden) return;
    i++;
    track.style.transition = '';
    track.style.transform = `translateY(${-i * 100 / (ST.length + 1)}%)`;
    if (i === ST.length) setTimeout(() => { track.style.transition = 'none'; track.style.transform = 'translateY(0)'; i = 0; }, 900);
  }, 2000);
}

/* ---------- Your store: what we found + today's chain ---------- */
/* The five gaps: a list on the left and one large screen on the right. It moves on by itself until someone picks a gap. */
function initGaps() {
  const root = $('#gaps'), list = $('#gaps-list'), scr = $('#gaps-screen');
  if (!root || !list || !scr) return;
  const F = C.found, DUR = 5200;
  list.innerHTML = F.map(([, t, l, where, fix], i) => `<li role="presentation"><button type="button" class="gap" role="tab" id="gap-${i}" aria-controls="gaps-stage" aria-selected="false" tabindex="-1" data-i="${i}"><span class="gap__n">${pad(i + 1)}</span><b class="gap__t">${esc(t)}</b><span class="gap__more"><span class="gap__l">${esc(l)}</span><span class="gap__meta"><span class="gap__where">Seen on ${esc(where)}</span><span class="gap__fix">${kicon('check')}${esc(fix)}</span></span></span><i class="gap__bar" aria-hidden="true"></i></button></li>`).join('');
  const btns = $$('.gap', list);
  let cur = -1, auto = !reduce, inView = false, hover = false, elapsed = 0, last = 0;
  function set(i, user, focus) {
    cur = (i + F.length) % F.length;
    btns.forEach((b, k) => { const on = k === cur; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; b.style.setProperty('--p', 0); });
    scr.innerHTML = screen(F[cur][0]);
    scr.classList.remove('is--in');
    void scr.offsetWidth;
    scr.classList.add('is--in');
    $('#gaps-stage').setAttribute('aria-labelledby', 'gap-' + cur);
    elapsed = 0;
    if (user) auto = false;
    if (focus) btns[cur].focus();
  }
  list.addEventListener('click', e => { const b = e.target.closest('.gap'); if (b) set(+b.dataset.i, true); });
  list.addEventListener('keydown', e => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    set(cur + d, true, true);
  });
  root.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover = true; });
  root.addEventListener('pointerleave', () => { hover = false; });
  onVisible(root, v => { inView = v; }, { threshold: 0.25 });
  set(0);
  if (!auto) return;
  const tick = now => {
    const dt = last ? Math.min(100, now - last) : 0;
    last = now;
    if (auto && inView && !hover && !document.hidden) {
      elapsed += dt;
      btns[cur].style.setProperty('--p', clamp(elapsed / DUR, 0, 1).toFixed(3));
      if (elapsed >= DUR) set(cur + 1);
    }
    if (auto) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
function renderFound() {
  initGaps();
  $('#today-chain').innerHTML = C.today.map(([ic, t, weak], i) => `<li class="lk${weak ? ' is--weak' : ''}" style="--k:${i}"><span class="lk__ring">${kicon(ic)}</span><span class="lk__n">Step ${pad(i + 1)}</span><b class="lk__t">${esc(t)}</b>${weak ? `<span class="lk__flag">${esc(weak)}</span>` : ''}</li>`).join('') + '<li class="links__order" aria-hidden="true">Order</li>';
}

/* ---------- The leaks: a flow chart ---------- */
/* A band of buyers runs past five gates. At each gate a share turns red and falls away; with the system the band stays whole.
   The numbers are each stretch's share of the band's full thickness. They show the shape, not measured rates. */
const FLOW = { today: [1, 0.8, 0.63, 0.47, 0.33, 0.23], os: [1, 0.97, 0.94, 0.91, 0.88, 0.85] };
let pipeGeo = null, pipeW = FLOW.today.slice(), pipeRaf = 0;
function renderPipe() {
  $('#pipe-svg').innerHTML = `<defs><linearGradient id="pipe-lost" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0434F"/><stop offset=".3" stop-color="#F0434F" stop-opacity=".9"/><stop offset="1" stop-color="#F0434F" stop-opacity="0"/></linearGradient></defs>`
    + C.leaks.map(() => '<path class="pipe__rib"/>').join('') + '<path class="pipe__band"/>'
    + C.leaks.map(() => '<path class="pipe__cut"/>').join('') + '<rect class="pipe__src" rx="2"/><rect class="pipe__sink" rx="2"/>';
  $('#pipe-holes').innerHTML = C.leaks.map(([a, b], i) => `<li class="pcol" style="--k:${i}"><span class="pcol__k tnum">${pad(i + 1)}</span><b class="pcol__t"><span class="from">${esc(a)}</span><span class="to">${esc(b)}</span></b><span class="pcol__s"><span class="from"><i></i>Leaking</span><span class="to">${icon('check')}Plugged</span></span></li>`).join('');
  measurePipe();
  paintPipe();
}
/* Read the gates off the layout, so the chart always lines up with its labels. Desktop runs left to right, a phone top to bottom:
   u is the distance along the flow, v the distance across it. */
function measurePipe() {
  const stage = $('.pipe__stage'), R = stage.getBoundingClientRect();
  if (!R.width) return;
  const m = isMobile(), cs = getComputedStyle(stage), rem = parseFloat(getComputedStyle(html).fontSize) || 16;
  const v = n => (parseFloat(cs.getPropertyValue(n)) || 0) * rem;
  const at = el => { const r = el.getBoundingClientRect(); return m ? r.top - R.top : r.left - R.left; };
  const g = $$('#pipe-holes > li').map(at), V0 = v('--v0'), H = v('--bh');
  pipeGeo = { m, g, u0: v('--u0'), end: at($('.pipe__meter')), V0, H, r: (m ? 0.75 : 1.25) * rem, node: 0.4 * rem,
    vEnd: m ? R.width - 1.25 * rem : V0 + H + v('--fall') };
  $('#pipe-lost').setAttribute(m ? 'x2' : 'y2', '1');
  $('#pipe-lost').setAttribute(m ? 'y2' : 'x2', '0');
  drawPipe();
}
function drawPipe() {
  const G = pipeGeo;
  if (!G) return;
  const { m, g, u0, end, V0, r, vEnd } = G, w = pipeW.map(f => f * G.H);
  const P = (u, v) => (m ? `${v.toFixed(1)} ${u.toFixed(1)}` : `${u.toFixed(1)} ${v.toFixed(1)}`);
  const arc = (rad, cw, u, v) => `A${rad.toFixed(1)} ${rad.toFixed(1)} 0 0 ${m ? +!cw : +cw} ${P(u, v)}`;
  const box = (el, u1, v1, u2, v2) => { [['x', m ? v1 : u1], ['y', m ? u1 : v1], ['width', m ? v2 - v1 : u2 - u1], ['height', m ? u2 - u1 : v2 - v1]].forEach(([k, n]) => el.setAttribute(k, Math.max(0, n).toFixed(1))); };
  let band = `M${P(u0, V0)}L${P(end, V0)}L${P(end, V0 + w[5])}`;
  for (let i = 4; i >= 0; i--) band += `L${P(g[i], V0 + w[i + 1])}L${P(g[i], V0 + w[i])}`;
  $('.pipe__band').setAttribute('d', band + `L${P(u0, V0 + w[0])}Z`);
  const ribs = $$('.pipe__rib'), cuts = $$('.pipe__cut');
  g.forEach((x, i) => {
    const d = w[i] - w[i + 1], far = V0 + w[i];
    ribs[i].setAttribute('d', d < 0.3 ? '' : `M${P(x, far - d)}${arc(r + d, 1, x + r + d, far + r)}L${P(x + r + d, vEnd)}L${P(x + r, vEnd)}L${P(x + r, far + r)}${arc(r, 0, x, far)}Z`);
    cuts[i].setAttribute('d', `M${P(x, V0)}L${P(x, far)}`);
  });
  box($('.pipe__src'), u0, V0, u0 + G.node, V0 + w[0]);
  box($('.pipe__sink'), end, V0, end + G.node * 1.5, V0 + w[5]);
  $('#pipe-svg').dataset.out = pipeW[5].toFixed(2);
}
function paintPipe() {
  const root = $('#pipe'), os = root.dataset.state === 'os', to = FLOW[os ? 'os' : 'today'];
  $('#pipe-out').textContent = os ? 'Most of it' : 'A trickle';
  $$('.pcol .from', root).forEach(e => e.setAttribute('aria-hidden', String(os)));
  $$('.pcol .to', root).forEach(e => e.setAttribute('aria-hidden', String(!os)));
  cancelAnimationFrame(pipeRaf);
  if (reduce) { pipeW = to.slice(); drawPipe(); return; }
  const from = pipeW.slice(), t0 = performance.now(), DUR = 900, LAG = 90;
  const step = now => {
    let live = false;
    pipeW = to.map((f, i) => { const p = clamp((now - t0 - i * LAG) / DUR, 0, 1); if (p < 1) live = true; return from[i] + (f - from[i]) * (1 - Math.pow(1 - p, 4)); });
    drawPipe();
    if (live) pipeRaf = requestAnimationFrame(step);
  };
  pipeRaf = requestAnimationFrame(step);
}
function initPipe() {
  const root = $('#pipe'), stage = $('.pipe__stage');
  let touched = false;
  const set = s => { root.dataset.state = s; $$('[data-pipe-set]', root).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.pipeSet === s))); paintPipe(); };
  $$('[data-pipe-set]', root).forEach(b => b.addEventListener('click', () => { touched = true; set(b.dataset.pipeSet); }));
  if ('ResizeObserver' in window) new ResizeObserver(measurePipe).observe(stage);
  else window.addEventListener('resize', measurePipe);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measurePipe);
  if (!reduce) onVisible(stage, (v, io) => { if (v) { io.disconnect(); setTimeout(() => { if (!touched) set('os'); }, 2600); } }, { threshold: 0.5 });
}
function initLost() {
  const a = $('#r-lost'), b = $('#r-lost-avg'), out = $('#o-lost'), root = $('.lost');
  let shown = 0, raf = 0;
  const fill = el => el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100).toFixed(1) + '%');
  $$('.lost__stairs i', root).forEach((bar, i) => bar.style.setProperty('--i', i));
  if (reduce) root.classList.add('is--in');
  else onVisible(root, (v, io) => { if (v) { io.disconnect(); root.classList.add('is--in'); } }, { threshold: 0.35 });
  const update = () => {
    const n = +a.value, avg = +b.value, year = n * avg * 365;
    $('#v-lost').textContent = n;
    $('#v-lost-avg').textContent = '₹' + fmtIN(avg);
    $('#o-lost-sub').textContent = n ? `That’s ₹${fmtIN(year / 12)} a month.` : 'Nothing lost. Nice!';
    $('#o-lost-today').textContent = n ? `Today, ${fmtIN(n * 365)} buyers walk away a year.` : 'Today, no buyer walks away.';
    root.classList.toggle('is--zero', !n);
    /* The figure sizes itself to its final length, so the largest sum still fits the card */
    out.style.setProperty('--ch', ('₹' + fmtIN(year)).length);
    [a, b].forEach(fill);
    cancelAnimationFrame(raf);
    if (reduce) { shown = year; out.textContent = '₹' + fmtIN(year); return; }
    const from = shown, t0 = performance.now();
    const step = now => { const p = Math.min(1, (now - t0) / 450), e = 1 - Math.pow(1 - p, 3); shown = from + (year - from) * e; out.textContent = '₹' + fmtIN(shown); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  };
  [a, b].forEach(el => el.addEventListener('input', update));
  update();
}

/* ---------- The new flow: the loop ---------- */
const LOOP = { w: 1000, h: 560, x0: 90, x1: 910, y0: 84, y1: 476, r: 120 };
const LOOP_X = [190, 397, 603, 810];
const loopPos = i => (i < 4 ? [LOOP_X[i], LOOP.y0] : [LOOP_X[7 - i], LOOP.y1]);
function loopPath() {
  const { x0, x1, y0, y1, r } = LOOP;
  return `M${x0 + r} ${y0} H${x1 - r} A${r} ${r} 0 0 1 ${x1} ${y0 + r} V${y1 - r} A${r} ${r} 0 0 1 ${x1 - r} ${y1} H${x0 + r} A${r} ${r} 0 0 1 ${x0} ${y1 - r} V${y0 + r} A${r} ${r} 0 0 1 ${x0 + r} ${y0} Z`;
}
function renderLoop() {
  const d = loopPath();
  $('#loop-svg').setAttribute('viewBox', `0 0 ${LOOP.w} ${LOOP.h}`);
  $('#loop-svg').innerHTML = `<path class="loop__track" d="${d}"/><path class="loop__run" d="${d}" id="loop-path"/><path class="loop__arrow" d="M${LOOP.x0} ${LOOP.y0 + 196} l-9 16 h18 z"/><path class="loop__arrow" d="M${LOOP.x1} ${LOOP.y0 + 196} l9 -16 h-18 z"/><g class="loop__buyer" id="loop-buyer"><circle class="loop__halo" r="22"/><circle class="loop__dot" r="9"/></g><text class="loop__side" x="${LOOP.x0 - 26}" y="${LOOP.h / 2}" transform="rotate(-90 ${LOOP.x0 - 26} ${LOOP.h / 2})">They tell friends · they come back</text>`;
  $('#loop-stations').innerHTML = ST.map((s, i) => {
    const [x, y] = loopPos(i);
    return `<button class="lst is--${s.act}" type="button" data-st="${i}" style="left:${(x / LOOP.w * 100).toFixed(2)}%;top:${(y / LOOP.h * 100).toFixed(2)}%" aria-label="Step ${s.n}: ${esc(s.name)}"><span class="lst__top"><span class="lst__ic">${kicon(s.icon)}</span><span class="lst__n">${s.n}</span><span class="lst__act">${esc(ACT(s.act).name)}</span></span><b class="lst__name">${esc(s.name)}</b><span class="lst__line">${esc(s[lane])}</span></button>`;
  }).join('');
}
const LANE_CAP = { on: 'Ravi sees a reel. Buys on the website. Comes back for more.', st: 'Ravi walks in. Billed at the counter. Comes back for more.' };
function setLane(l) {
  lane = l;
  $('#loop').dataset.lane = l;
  $$('[data-lane-set]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.laneSet === l)));
  $$('#loop-stations .lst').forEach((b, i) => { const t = $('.lst__line', b); t.textContent = ST[i][l]; });
  $('#loop-cap').textContent = LANE_CAP[l];
  const sd = $('.sd__lane-now');
  if (sd && stageActive >= 0) sd.textContent = ST[stageActive][l];
}
function initLoop() {
  $$('[data-lane-set]').forEach(b => b.addEventListener('click', () => setLane(b.dataset.laneSet)));
  $('#loop-stations').addEventListener('click', e => { const b = e.target.closest('[data-st]'); if (b) { loopTouched = true; if (stageSlider) stageSlider.go(+b.dataset.st); else setStage(+b.dataset.st); } });
  const path = $('#loop-path'), buyer = $('#loop-buyer');
  if (!path || !buyer || !path.getTotalLength) return;
  const L = path.getTotalLength();
  /* where each station sits along the path */
  const marks = ST.map((_, i) => { const [x, y] = loopPos(i); let best = 0, bd = 1e9; for (let t = 0; t <= L; t += 4) { const p = path.getPointAtLength(t); const dd = (p.x - x) ** 2 + (p.y - y) ** 2; if (dd < bd) { bd = dd; best = t; } } return best; });
  const startAt = marks[0];
  let t = 0, last = performance.now(), inView = false, hover = false, lit = -1;
  const btns = $$('#loop-stations .lst');
  const place = tt => {
    const at = (startAt + tt) % L, p = path.getPointAtLength(at);
    buyer.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
    let near = -1;
    marks.forEach((mk, i) => { const dd = Math.abs(((at - mk) % L + L) % L); if (dd < 60 || L - dd < 6) near = i; });
    if (near !== lit) { lit = near; btns.forEach((b, i) => b.classList.toggle('is--lit', i === near)); }
  };
  place(0);
  if (reduce) return;
  onVisible($('#loop'), v => { inView = v; }, { threshold: 0.2 });
  $('#loop').addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover = true; });
  $('#loop').addEventListener('pointerleave', () => { hover = false; });
  const SPEED = L / 15000;
  const tick = now => {
    const dt = Math.min(64, now - last); last = now;
    if (inView && !document.hidden) { t = (t + dt * SPEED * (hover ? 0.35 : 1)) % L; place(t); }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* Stage cards + detail */
let stageActive = -1, loopTouched = false;
function renderStages() {
  $('#stage-cards').innerHTML = ST.map((s, i) => `<div class="gslider__item" data-i="${i}"><article class="stage-card is--${ACT_THEME[s.act]}" aria-label="Step ${s.n}: ${esc(s.name)}"><span class="media">${screen(s.vis)}</span><div class="stage-card__top"><div class="tag-pair"><span class="tag">${esc(ACT(s.act).name)}</span><span class="tag" data-shape="round">${s.n} / 08</span></div>${kicon(s.icon)}</div><div class="stage-card__num" aria-hidden="true">${s.n}</div><div class="stage-card__body"><h3 class="h-m">${esc(s.name)}</h3><p class="p-m">${esc(s.line)}</p><p class="stage-card__out">${esc(s.gives)}</p></div></article></div>`).join('');
}
function setStage(i) {
  if (i === stageActive) return;
  stageActive = i;
  const s = ST[i], a = ACT(s.act);
  $('#stage-detail').innerHTML = `<div class="sd"><div class="sd__head"><span class="sd__num">${s.n} / 08 · ${esc(a.name)}</span><h3 class="h-m">${esc(s.name)}</h3><p class="sd__out">${esc(s.line)}</p></div><div class="sd__lanes"><div class="sd__lane"><h4>Who</h4><div class="sd__who">${kicon(s.icon)}<p class="h-xs">${esc(s.who)}</p></div><p class="sd__lane-now">${esc(s[lane])}</p></div><div class="sd__lane"><h4>What happens</h4><ul class="dl">${s.what.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div><div class="sd__lane is--kb"><h4>Today</h4><p class="h-xs"><s>${esc(s.today)}</s></p></div><div class="sd__lane is--get"><h4>Gives back</h4><p class="h-xs">${esc(s.gives)}</p></div></div></div>`;
  $$('#loop-stations [data-st]').forEach(b => { const k = +b.dataset.st; b.classList.toggle('is--on', k === i); b.setAttribute('aria-pressed', String(k === i)); });
  $$('#stage-cards .gslider__item').forEach((it, k) => it.setAttribute('aria-current', k === i ? 'true' : 'false'));
}
function initStageSlider() {
  const coll = $('#flow .gslider__collection'), list = $('#stage-cards');
  const items = $$('.gslider__item', list);
  const N = items.length;
  let snaps = [], current = 0, move = () => {};
  const go = i => { i = clamp(i, 0, N - 1); setStage(i); current = i; move(i); };
  coll.setAttribute('tabindex', '0');
  coll.setAttribute('aria-label', 'Steps. Use the left and right arrow keys to move between steps.');
  coll.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); } });
  setStage(0);
  if (!hasG || !window.Draggable) {
    let t;
    coll.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(() => { const c = coll.scrollLeft + coll.clientWidth / 2; let best = 0, bd = 1e9; items.forEach((it, i) => { const d = Math.abs(it.offsetLeft + it.offsetWidth / 2 - c); if (d < bd) { bd = d; best = i; } }); current = best; setStage(best); }, 90); }, { passive: true });
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
    type: 'x', inertia: hasInertia, edgeResistance: 0.82,
    bounds: { minX: snaps[N - 1], maxX: snaps[0] },
    snap: hasInertia ? { x: v => snaps[nearest(v)] } : undefined,
    zIndexBoost: false, allowContextMenu: true,
    onPress() { dragged = false; gsap.killTweensOf(list); },
    onDrag() { dragged = true; loopTouched = true; render(); const i = nearest(this.x); if (i !== current) { current = i; setStage(i); } },
    onThrowUpdate() { render(); const i = nearest(this.x); if (i !== current) { current = i; setStage(i); } },
    onRelease() { if (!hasInertia && dragged) { const i = nearest(this.x); current = i; setStage(i); move(i); } },
    onClick(e) { if (dragged) return; const it = e.target.closest('.gslider__item'); if (it) { loopTouched = true; go(+it.dataset.i); } }
  })[0];
  window.addEventListener('resize', () => { measure(); drag.applyBounds({ minX: snaps[N - 1], maxX: snaps[0] }); gsap.set(list, { x: snaps[current] }); render(); });
  return { go };
}

/* ---------- One bill: the chain reaction ---------- */
function renderChain() {
  $('#chain').innerHTML = C.chain.map(([ic, t, d, w], i) => `<li style="--k:${i}"><span class="chain__ic">${kicon(ic)}</span><span class="chain__t"><b>${esc(t)}</b><span>${esc(d)}</span></span><span class="chain__w">${esc(w)}</span></li>`).join('');
}
function initBill() {
  const r = $('#receipt'), btn = $('#bill-btn'), rows = $$('#chain li');
  let touched = false, busy = false;
  const label = t => { $$('.btn__label', btn).forEach(l => { l.textContent = t; }); };
  const run = () => {
    if (busy) return;
    busy = true;
    rows.forEach(x => x.classList.remove('is--on'));
    r.dataset.state = 'billing';
    setTimeout(() => {
      r.dataset.state = 'done';
      rows.forEach((x, i) => setTimeout(() => { x.classList.add('is--on'); if (i === rows.length - 1) { busy = false; label('Bill again'); } }, reduce ? 0 : 250 + i * 260));
    }, reduce ? 0 : 1500);
  };
  btn.addEventListener('click', () => { touched = true; run(); });
  onVisible(r, (v, io) => { if (v) { io.disconnect(); setTimeout(() => { if (!touched) run(); }, 700); } }, { threshold: 0.6 });
}

/* ---------- One platform: hub + showcase ---------- */
const PINS = {
  home: [[45, 93], [59, 93], [93, 87]],
  dash: [[17, 23], [78, 47], [86, 88]],
  stock: [[42, 38], [68, 8], [42, 94]],
  pos: [[80, 8], [81, 62], [80, 90]],
  orders: [[22, 34], [93, 8], [70, 32]],
  crm: [[82, 30], [74, 8], [84, 65]],
  blast: [[24, 26], [30, 66], [78, 44]],
  voice: [[24, 52], [72, 8], [72, 66]]
};
const HUB = { cx: 500, cy: 280, rx: 400, ry: 205 };
function renderHub() {
  const n = C.tools.length;
  const pos = C.tools.map((_, i) => { const a = (-90 + i * 360 / n) * Math.PI / 180; return [HUB.cx + Math.cos(a) * HUB.rx, HUB.cy + Math.sin(a) * HUB.ry]; });
  $('#hub-svg').innerHTML = `<ellipse class="hub__orbit" cx="${HUB.cx}" cy="${HUB.cy}" rx="${HUB.rx}" ry="${HUB.ry}"/><ellipse class="hub__orbit is--2" cx="${HUB.cx}" cy="${HUB.cy}" rx="${HUB.rx * 0.62}" ry="${HUB.ry * 0.62}"/>` + pos.map(([x, y], i) => `<line class="hub__line" data-i="${i}" x1="${HUB.cx}" y1="${HUB.cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/><line class="hub__flow" data-i="${i}" x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${HUB.cx}" y2="${HUB.cy}" style="--d:${(i * 0.4).toFixed(1)}s"/>`).join('');
  $('#hub-nodes').innerHTML = C.tools.map((t, i) => `<button class="hub__node" type="button" role="tab" data-tool="${i}" aria-selected="false" style="left:${(pos[i][0] / 10).toFixed(2)}%;top:${(pos[i][1] / 560 * 100).toFixed(2)}%"><span class="hub__ic">${kicon(t.icon)}</span><span class="hub__name">${esc(t.name)}</span><i class="hub__prog"></i></button>`).join('');
}
let toolActive = -1;
/* Each numbered pin sits on the corner of the element it describes (offsets ignore the swap animation) */
function placePins() {
  const root = $('#tool-screen .k');
  if (!root) return;
  const W = root.offsetWidth, H = root.offsetHeight;
  if (!W || !H) return;
  $$('#tool-pins li').forEach((li, k) => {
    const el = root.querySelector(`[data-pin="${k + 1}"]`);
    if (!el) return;
    let x = 0, y = 0, n = el;
    while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    if (n !== root) return;
    if (el.dataset.pinAt === 'r') { x += el.offsetWidth + W * 0.022; y += el.offsetHeight / 2; }
    li.style.left = clamp(x / W * 100, 3, 97).toFixed(1) + '%';
    li.style.top = clamp(y / H * 100, 4, 96).toFixed(1) + '%';
  });
}
function setTool(i) {
  if (i === toolActive) return;
  toolActive = i;
  const t = C.tools[i];
  $$('#hub-nodes .hub__node').forEach((b, k) => { b.classList.toggle('is--on', k === i); b.setAttribute('aria-selected', String(k === i)); });
  $$('#hub-svg .hub__line, #hub-svg .hub__flow').forEach(l => l.classList.toggle('is--on', +l.dataset.i === i));
  const scr = $('#tool-screen');
  scr.innerHTML = screen(t.vis);
  scr.classList.remove('is--swap'); void scr.offsetWidth; scr.classList.add('is--swap');
  $('#tool-pins').innerHTML = (PINS[t.vis] || []).map(([x, y], k) => `<li style="left:${x}%;top:${y}%;--k:${k}">${k + 1}</li>`).join('');
  placePins();
  $('#tool-info').innerHTML = `<div class="si"><div class="si__head"><div class="tag-pair"><span class="tag">Tool ${pad(i + 1)} / ${pad(C.tools.length)}</span><span class="tag" data-theme="haze" data-shape="round">${esc(t.who)}</span></div><h3 class="h-m">${esc(t.name)}</h3><p class="p-m">${esc(t.line)}</p></div><ol class="si__pins">${t.pins.map(([a, b], k) => `<li><i>${k + 1}</i><span><b>${esc(a)}</b>${esc(b)}</span></li>`).join('')}</ol><ul class="si__does">${t.does.map(x => `<li>${esc(x)}</li>`).join('')}</ul><div class="si__pair"><div class="si__card is--kb"><span class="eyebrow">Replaces</span><p><s>${esc(t.replaces)}</s></p></div><div class="si__card is--get"><span class="eyebrow">Gives back</span><p>${esc(t.gives)}</p></div></div></div>`;
}
function initHub() {
  const nodes = $$('#hub-nodes .hub__node');
  window.addEventListener('resize', placePins);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placePins);
  let touched = false, elapsed = 0, last = performance.now(), inView = false, hover = false;
  const DUR = 5200;
  setTool(0);
  $('#hub-nodes').addEventListener('click', e => { const b = e.target.closest('[data-tool]'); if (b) { touched = true; nodes.forEach(n => n.style.setProperty('--p', 0)); setTool(+b.dataset.tool); } });
  $('#hub-nodes').addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault(); touched = true;
    const n = (toolActive + (e.key === 'ArrowRight' ? 1 : -1) + nodes.length) % nodes.length;
    setTool(n); nodes[n].focus();
  });
  if (reduce) return;
  onVisible($('#show'), v => { inView = v; }, { threshold: 0.3 });
  $('#platform').addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover = true; });
  $('#platform').addEventListener('pointerleave', () => { hover = false; });
  const tick = now => {
    const dt = now - last; last = now;
    if (!touched && inView && !hover && !document.hidden) {
      elapsed += dt;
      nodes[toolActive].style.setProperty('--p', clamp(elapsed / DUR, 0, 1).toFixed(3));
      if (elapsed >= DUR) { elapsed = 0; nodes[toolActive].style.setProperty('--p', 0); setTool((toolActive + 1) % nodes.length); }
    }
    if (!touched) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Always on: the 24-hour dial ---------- */
const ang = h => (h / 24) * 2 * Math.PI - Math.PI / 2;
const pt = (h, r) => [200 + r * Math.cos(ang(h)), 200 + r * Math.sin(ang(h))];
function arcPath(h1, h2, r) {
  const [x1, y1] = pt(h1, r), [x2, y2] = pt(h2, r);
  let span = h2 - h1; if (span < 0) span += 24;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${span > 12 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}
function renderDay() {
  let svg = `<circle class="dial__face" cx="200" cy="200" r="196"/><circle class="dial__inner" cx="200" cy="200" r="68"/><path class="dial__day" d="${arcPath(6, 18, 168)}"/><path class="dial__night" d="${arcPath(18, 6, 168)}"/>`;
  for (let h = 0; h < 24; h += 0.5) {
    const major = h % 6 === 0, hour = h % 1 === 0;
    const [x1, y1] = pt(h, major ? 140 : hour ? 145 : 149), [x2, y2] = pt(h, 153);
    svg += `<line class="dial__tick${major ? ' is--major' : ''}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }
  [0, 6, 12, 18].forEach(h => { const [x, y] = pt(h, 124); svg += `<text class="dial__lbl" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle">${pad(h)}:00</text>`; });
  C.day.forEach((e, i) => { const [x, y] = pt(e.h, 168); svg += `<g class="dial__ev" data-i="${i}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14"/><text x="${x.toFixed(1)}" y="${(y + 3.5).toFixed(1)}">${pad(Math.floor(e.h))}</text></g>`; });
  svg += `<g class="dial__hand" id="dial-hand"><line x1="200" y1="128" x2="200" y2="62"/><circle cx="200" cy="62" r="5"/></g>`;
  $('#dial-svg').innerHTML = svg;
  $('#day-list').innerHTML = C.day.map((e, i) => `<li data-i="${i}"><button type="button" data-day="${i}"><span class="night__t">${e.t}</span><span class="night__ic">${kicon(e.icon)}</span><span class="night__body"><b>${esc(e.title)}</b><span>${esc(e.line)}</span></span></button></li>`).join('');
}
function initDay() {
  const hand = $('#dial-hand'), time = $('#dial-time'), items = $$('#day-list li'), evs = $$('.dial__ev');
  const LOOPMS = 20000;
  const ENDS = C.day.map((e, i) => (i < C.day.length - 1 ? Math.min(C.day[i + 1].h, e.h + 2.4) : e.h + 2.4));
  let t = 0, playing = !reduce, last = performance.now(), inView = false, held = false;
  const set = h => {
    h = ((h % 24) + 24) % 24;
    hand.setAttribute('transform', `rotate(${(h / 24 * 360).toFixed(2)} 200 200)`);
    const hh = Math.floor(h), mm = Math.floor((h - hh) * 60 / 15) * 15;
    time.textContent = `${pad(hh)}:${pad(mm)}`;
    let act = -1;
    C.day.forEach((e, i) => { const end = ENDS[i] % 24; if (ENDS[i] > 24 ? (h >= e.h || h < end) : (h >= e.h && h < ENDS[i])) act = i; });
    items.forEach((li, i) => li.classList.toggle('is--on', i === act));
    evs.forEach((g, i) => g.classList.toggle('is--on', i === act));
  };
  onVisible($('#dial'), v => { inView = v; }, { threshold: 0.3 });
  const loop = now => {
    const dt = now - last; last = now;
    if (playing && inView && !held && !document.hidden) { t = (t + dt / LOOPMS * 24) % 24; set(t); }
    requestAnimationFrame(loop);
  };
  set(reduce ? 9.2 : 8.5);
  t = 8.5;
  if (!reduce) requestAnimationFrame(loop);
  $('#day-list').addEventListener('click', e => { const b = e.target.closest('[data-day]'); if (!b) return; playing = false; t = C.day[+b.dataset.day].h + 0.01; set(t); });
  $('#day-list').addEventListener('pointerenter', () => { held = true; });
  $('#day-list').addEventListener('pointerleave', () => { held = false; });
}

/* Voice agent call */
function renderCall() {
  $('#call-wave').innerHTML = Array.from({ length: 28 }, (_, i) => `<i style="--k:${i};--h:${(30 + Math.abs(Math.sin(i * 1.7)) * 70).toFixed(0)}%"></i>`).join('');
  $('#call-lines').innerHTML = C.call.map(([who, t], i) => `<li class="cl is--${who}" style="--k:${i}"><span class="cl__who">${who === 'agent' ? 'Agent' : 'Ravi'}</span><p>${esc(t)}</p></li>`).join('');
}
function initCall() {
  const root = $('#call'), lines = $$('#call-lines li'), out = $('#call-out'), tm = $('#call-time'), stt = $('#call-state');
  let secs = 0, timer = 0, run = 0, inView = false;
  const show = n => { lines.forEach((l, i) => l.classList.toggle('is--on', i < n)); };
  const play = () => {
    clearInterval(timer); clearTimeout(run);
    secs = 0; show(0); out.classList.remove('is--on'); root.classList.add('is--live'); stt.textContent = 'On call with Ravi K.';
    timer = setInterval(() => { secs++; tm.textContent = `${pad(Math.floor(secs / 60))}:${pad(secs % 60)}`; }, 1000);
    let k = 0;
    const next = () => {
      k++; show(k);
      if (k < lines.length) run = setTimeout(next, 1700);
      else run = setTimeout(() => { out.classList.add('is--on'); root.classList.remove('is--live'); stt.textContent = 'Call ended · saved'; clearInterval(timer); run = setTimeout(() => { if (inView) play(); }, 5200); }, 900);
    };
    next();
  };
  if (reduce) { show(lines.length); out.classList.add('is--on'); return; }
  onVisible(root, v => { const was = inView; inView = v; if (v && !was) play(); if (!v) { clearInterval(timer); clearTimeout(run); root.classList.remove('is--live'); } }, { threshold: 0.4 });
}

/* ---------- Your buyers ---------- */
function renderYouth() {
  $('#ystats').innerHTML = C.stats.map(([v, t, s], i) => `<li class="ys${i === 0 ? ' is--blue' : ''}"><b class="ys__v">${esc(v)}</b><span class="ys__t">${esc(t)}</span><small>${esc(s)}</small></li>`).join('');
  const n = C.loop.length;
  $('#yloop-ring').innerHTML = `<svg class="yloop__svg" viewBox="0 0 100 100" aria-hidden="true"><circle class="yloop__track" cx="50" cy="50" r="40"/><circle class="yloop__prog" id="yloop-prog" cx="50" cy="50" r="40" pathLength="100"/></svg>` + C.loop.map(([name, , , ic], i) => { const a = (-90 + i * 360 / n) * Math.PI / 180; return `<button class="yl" type="button" data-yl="${i}" style="left:${(50 + Math.cos(a) * 40).toFixed(2)}%;top:${(50 + Math.sin(a) * 40).toFixed(2)}%" aria-label="${esc(name)}"><span class="yl__ic">${kicon(ic)}</span><span class="yl__n">${esc(name)}</span></button>`; }).join('');
  $('#people-cards').innerHTML = C.people.map((p, i) => `<div class="flick__item" data-i="${i}" role="listitem"><article class="person-card"><div class="person-card__photo" style="--py:${p.py}%">${photo(p)}<span class="person-card__age">Ages ${esc(p.age)}</span><span class="person-card__go" aria-hidden="true"><svg viewBox="0 0 12 12"><use href="#i-arrow-ur"/></svg></span><p class="person-card__q">“${esc(p.quote)}”</p></div><div class="person-card__body"><div class="person-card__who"><h3 class="person-card__name">${esc(p.first)}, ${p.at}</h3><p class="person-card__type">${esc(p.name)}</p><p class="person-card__where">${esc(p.where)}</p></div>${facts([['Spends', p.budget], ['Finds you on', p.finds], ['Pays with', p.pays]])}</div></article></div>`).join('');
  $('#people-faces').innerHTML = C.people.map((p, i) => `<button class="face" type="button" data-face="${i}" aria-pressed="false" aria-label="${esc(p.first)}, ${esc(p.name.replace(/^The /, 'the '))}"><span style="${esc(facePos(p))}"></span></button>`).join('');
  $('#tactics').innerHTML = C.tactics.map(([ic, t, l], i) => `<li class="tac" style="--k:${i}"><span class="tac__ic">${kicon(ic)}</span><b>${esc(t)}</b><span>${esc(l)}</span></li>`).join('');
}
function initYLoop() {
  const btns = $$('#yloop-ring .yl'), n = btns.length, prog = $('#yloop-prog');
  let cur = -1, touched = false, inView = false;
  const set = i => {
    cur = i;
    const [name, did, give] = C.loop[i];
    btns.forEach((b, k) => { b.classList.toggle('is--on', k === i); b.classList.toggle('is--past', k < i); });
    $('#yloop-name').textContent = name; $('#yloop-do').textContent = did; $('#yloop-give').textContent = give;
    if (prog) prog.style.strokeDasharray = `${((i + 1) / n * 100).toFixed(1)} 100`;
    const c = $('.yloop__center'); c.classList.remove('is--swap'); void c.offsetWidth; c.classList.add('is--swap');
  };
  set(0);
  $('#yloop-ring').addEventListener('click', e => { const b = e.target.closest('[data-yl]'); if (b) { touched = true; set(+b.dataset.yl); } });
  if (reduce) return;
  onVisible($('#yloop'), v => { inView = v; }, { threshold: 0.4 });
  setInterval(() => { if (!touched && inView && !document.hidden) set((cur + 1) % n); }, 2400);
}
let personIndex = 0;
function personHTML(i) {
  const p = C.people[i], n = C.people.length;
  const prev = C.people[(i - 1 + n) % n], next = C.people[(i + 1) % n];
  return `<div class="pmod"><div class="pmod__top"><div class="pmod__id"><div class="pmod__photo" style="--py:${p.py}%">${photo(p)}<p class="pmod__name">${esc(p.first)}, ${p.at}</p></div>${facts([[p.whereAs || 'Lives', p.where], ['Spends', p.budget], ['Finds you on', p.finds], ['Pays with', p.pays]])}</div>
    <div class="pmod__main"><div class="pmod__head"><div class="tag-pair"><span class="tag">Buyer ${pad(i + 1)} / ${pad(n)}</span><span class="tag" data-theme="volt" data-shape="round">Ages ${esc(p.age)}</span></div><h2 class="h-l" id="person-title">${esc(p.name)}</h2><p class="pmod__q">“${esc(p.quote)}”</p></div>
    <div class="pmod__cols"><div class="pmod__box"><span class="eyebrow">What they want</span><ul class="pmod__list is--want">${p.wants.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div><div class="pmod__box"><span class="eyebrow">What annoys them today</span><ul class="pmod__list is--pain">${p.pains.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div></div>
    <div class="pmod__win"><span class="eyebrow">How we win them</span><p class="h-xs">${esc(p.win)}</p></div></div></div>
    <div class="pm__nav"><button class="btn" type="button" data-theme="haze" data-person-step="-1"><span class="btn__label">← ${esc(prev.name)}</span></button><button class="btn" type="button" data-theme="volt" data-person-step="1"><span class="btn__label">${esc(next.name)} →</span></button></div></div>`;
}
function openPerson(i, trigger) {
  personIndex = (i + C.people.length) % C.people.length;
  const body = $('#person-body');
  body.innerHTML = personHTML(personIndex);
  initButtons(body);
  body.scrollTop = 0;
  if ($('.modal[data-modal="person"]').dataset.open !== 'true') openModal('person', trigger);
  else $('.modal[data-modal="person"] .modal__panel').focus({ preventScroll: true });
}
function initFlick() {
  const root = $('[data-flick]');
  const items = $$('.flick__item', root);
  const n = items.length;
  let pos = 0, target = 0, dragging = false, raf = 0;
  const cardW = () => items[0].offsetWidth;
  const idx = v => ((Math.round(v) % n) + n) % n;
  const faces = $$('#people-faces .face'), openLabels = $$('[data-flick-open] .btn__label');
  let shown = -1;
  function show(i) {
    if (i === shown) return;
    shown = i;
    const p = C.people[i];
    faces.forEach((b, k) => { b.classList.toggle('is--on', k === i); b.setAttribute('aria-pressed', String(k === i)); });
    openLabels.forEach(l => { l.textContent = `Meet ${p.first}`; });
    $('#people-count').textContent = `${p.first}, ${p.name.replace(/^The /, 'the ')}. Buyer ${i + 1} of ${n}.`;
  }
  function layout() {
    const w = cardW(), sp = w * (isMobile() ? 0.56 : 0.7);
    items.forEach((it, i) => {
      let o = i - pos;
      o = ((o % n) + n + n / 2) % n - n / 2;
      const ao = Math.abs(o);
      const x = o * sp, rot = o * 6.5, s = 1 - Math.min(ao, 3) * 0.075, y = ao * ao * 9;
      it.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(3)})`;
      it.style.zIndex = String(100 - Math.round(ao * 10));
      it.style.opacity = ao > 2.4 ? String(clamp(1 - (ao - 2.4) * 2.5, 0, 1)) : '1';
      const act = idx(pos) === i;
      it.classList.toggle('is--active', act);
      it.setAttribute('aria-current', String(act));
    });
    show(idx(pos));
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
    pos = sp0 - dx / (cardW() * 0.7);
    layout();
  });
  const end = e => {
    if (!dragging) return;
    dragging = false;
    if (!moved) {
      const it = document.elementsFromPoint(e.clientX, e.clientY).map(el => el.closest && el.closest('.flick__item')).find(Boolean);
      if (it) { const i = +it.dataset.i; if (i === idx(pos)) openPerson(i, root); else goTo(nearestTarget(i)); }
      else goTo(Math.round(pos));
      return;
    }
    goTo(Math.round(pos - clamp(vx * 3, -2, 2)));
  };
  root.addEventListener('pointerup', end);
  root.addEventListener('pointercancel', () => { dragging = false; goTo(Math.round(pos)); });
  root.setAttribute('tabindex', '0');
  root.setAttribute('aria-label', 'Your buyers. Use the left and right arrow keys to browse, Enter to meet them.');
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.round(target) + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.round(target) - 1); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPerson(idx(target), root); }
  });
  $('[data-flick-prev]').addEventListener('click', () => goTo(Math.round(target) - 1));
  $('[data-flick-next]').addEventListener('click', () => goTo(Math.round(target) + 1));
  $('[data-flick-open]').addEventListener('click', e => openPerson(idx(target), e.currentTarget));
  faces.forEach(b => b.addEventListener('click', () => goTo(nearestTarget(+b.dataset.face))));
  document.addEventListener('click', e => { const st = e.target.closest('[data-person-step]'); if (st) openPerson(personIndex + (+st.dataset.personStep)); });
  window.addEventListener('resize', layout);
  layout();
}

/* ---------- Your numbers ---------- */
function initCalc() {
  const ins = { bills: $('#r-bills'), avg: $('#r-avg'), online: $('#r-online'), ret: $('#r-return') };
  const out = { month: $('#o-month'), year: $('#o-year'), records: $('#o-records') };
  const shown = { month: 0, year: 0, records: 0 };
  const tweens = {};
  const fill = el => el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100).toFixed(1) + '%');
  const show = (k, v) => {
    const fmt = k === 'records' ? fmtIN : x => '₹' + fmtIN(x);
    cancelAnimationFrame(tweens[k]);
    if (reduce) { shown[k] = v; out[k].textContent = fmt(v); return; }
    const from = shown[k], t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / 450), e = 1 - Math.pow(1 - p, 3);
      shown[k] = from + (v - from) * e;
      out[k].textContent = fmt(shown[k]);
      if (p < 1) tweens[k] = requestAnimationFrame(step);
    };
    tweens[k] = requestAnimationFrame(step);
  };
  const update = () => {
    const s = +ins.bills.value, a = +ins.avg.value, o = +ins.online.value, r = +ins.ret.value / 100;
    $('#v-bills').textContent = fmtIN(s);
    $('#v-avg').textContent = '₹' + fmtIN(a);
    $('#v-online').textContent = fmtIN(o);
    $('#v-return').textContent = Math.round(r * 100) + '%';
    Object.values(ins).forEach(fill);
    const today = s * a * 30, online = o * a * 30, repeat = (s + o) * 30 * r * a, extra = online + repeat;
    show('month', extra); show('year', extra * 12); show('records', (s + o) * 365);
    $('#o-pct').textContent = today ? `+${Math.round(extra / today * 100)}% on today` : '';
    const max = Math.max(today + extra, 1) / 0.84;
    $('#bar-a').style.height = (today / max * 100).toFixed(1) + '%';
    $('#bar-b').style.height = (today / max * 100).toFixed(1) + '%';
    $('#bar-o').style.height = (online / max * 100).toFixed(1) + '%';
    $('#bar-r').style.height = (repeat / max * 100).toFixed(1) + '%';
    $('#bar-a-v').textContent = lakh(today) + ' / mo';
    $('#bar-b-v').textContent = lakh(today + extra) + ' / mo';
    $('#bar-delta').textContent = '+' + lakh(extra);
    $('#bar-delta').style.bottom = `calc(${((today + extra) / max * 100).toFixed(1)}% + .5rem)`;
  };
  Object.values(ins).forEach(el => el.addEventListener('input', update));
  update();
}

/* ---------- Lists: road, proof, map ---------- */
function renderLists() {
  /* Plan: one bar per phase on an eight-column track (weeks 1 to 7, then after launch) */
  const gate = '<i class="plan__gate"><svg viewBox="0 0 16 16"><use href="#i-check"/></svg></i>';
  $('#road').innerHTML = C.road.map(([n, ph, t, l, w, s, d], i, a) => {
    const live = i === a.length - 2, open = i === a.length - 1;
    const kind = open ? ' is--open' : live ? ' is--live' : d ? '' : ' is--day';
    return `<li class="plan__row${kind}" style="--s:${s};--d:${d};--k:${i}"><div class="plan__id"><span class="plan__n">${n}</span><span class="plan__ph">${esc(ph)}</span></div><div class="plan__text"><h3>${esc(t)}</h3><p>${esc(l)}</p></div><span class="plan__when">${esc(w)}</span><div class="plan__track" aria-hidden="true"><span class="plan__bar">${live || open ? '' : gate}</span>${live ? '<b class="plan__flag">Live</b>' : ''}</div></li>`;
  }).join('');
  $('#proof-list').innerHTML = C.proof.map(p => `<li class="pf${p.phone ? ' is--phone' : ''}"><a class="pf__link" href="${esc(p.href)}"${/^https?:/.test(p.href) ? ' target="_blank" rel="noopener"' : ''}><span class="pf__img"><img src="${esc(p.img)}" alt="${esc(p.name)} screen" loading="lazy"></span><span class="pf__body"><span class="tag" data-theme="haze" data-shape="round">${esc(p.tag)}</span><b class="pf__name">${esc(p.name)}</b><span class="pf__line">${esc(p.line)}</span><span class="pf__cta">${esc(p.cta)}<svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></span></span></a></li>`).join('');
  $('#more-list').innerHTML = C.more.map(([n, k, h]) => `<li><a class="more__chip" href="${esc(h)}" target="_blank" rel="noopener"><b>${esc(n)}</b><span>${esc(k)}</span><svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></a></li>`).join('');
  /* Map: rings, coast, arcs from Ongole */
  const [, hx, hy] = C.towns[0];
  const coast = 'M98 0 C95 6 91.5 12 88.7 16.6 C87 19 85.5 20.8 83.4 22.1 C78 30 72 38 69.1 44.3 C67.8 48 67 52 66.2 55.4 C64.8 60 62.8 64.6 61.4 68.4 C60.8 70.5 60.1 73 59.5 75';
  let s = `<path class="map__sea-fill" d="${coast} L100 75 L100 0 Z"/><path class="map__coast" d="${coast}"/>`;
  [10, 20, 32, 46].forEach(r => { s += `<ellipse class="map__ring" cx="${hx}" cy="${hy * 0.75}" rx="${r}" ry="${r}"/>`; });
  C.towns.slice(1).forEach(([, x, y], i) => { const ty = y * 0.75, sy = hy * 0.75, mx = (hx + x) / 2, my = (sy + ty) / 2 - 6; s += `<path class="map__arc" style="--k:${i}" d="M${hx} ${sy} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x} ${ty.toFixed(1)}"/>`; });
  $('#map-svg').innerHTML = s;
  $('#map-towns').innerHTML = C.towns.map(([t, x, y], i) => `<span class="town${i === 0 ? ' is--home' : ''}" style="left:${x}%;top:${y}%;--k:${i}"><i></i><b>${esc(t)}</b></span>`).join('');
}
function initWork() {
  const els = $$('.today, .map, .chain, .plan');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is--in')); return; }
  els.forEach(el => onVisible(el, (v, io) => { if (v) { io.disconnect(); el.classList.add('is--in'); } }, { threshold: 0.3 }));
}

/* ---------- Walkthrough player ---------- */
function initPlayer() {
  const modal = $('.modal[data-modal="reel"]');
  $('#player-frames').innerHTML = ST.map((s, i) => `<div class="pframe${i === 0 ? ' is--active' : ''}" aria-hidden="${i !== 0}"><div class="pframe__text"><span class="pframe__act">${esc(ACT(s.act).name)} · step ${s.n} of 08</span><span class="pframe__num">${s.n}</span><h3 class="h-m">${esc(s.name)}</h3><p class="p-l">${esc(s.line)}</p><p class="pframe__out">${esc(s.gives)}</p><ul class="pframe__lanes"><li><b>Online</b><span>${esc(s.on)}</span></li><li><b>In store</b><span>${esc(s.st)}</span></li><li><b>Today</b><span>${esc(s.today)}</span></li></ul></div><div class="media">${screen(s.vis)}</div></div>`).join('');
  $('#player-progress').innerHTML = ST.map((s, i) => `<button type="button" aria-label="Go to step ${s.n}: ${esc(s.name)}" data-pi="${i}"><span><i></i></span></button>`).join('');
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
  $$('[data-reel-open]').forEach(b => b.addEventListener('click', e => openModal('reel', e.currentTarget)));
}

/* Ring cards jump to their step in the flow */
function initRadialLinks() {
  $('#radial-list').addEventListener('click', e => {
    const b = e.target.closest('[data-stage]');
    if (!b) return;
    loopTouched = true;
    const i = +b.dataset.stage;
    scrollToEl($('#flow'));
    setTimeout(() => { if (stageSlider) stageSlider.go(i); else setStage(i); }, reduce ? 0 : 700);
  });
}

/* ---------- Motion ---------- */
function initHero() {
  if (!hasG || reduce) return;
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from('.nav__bar', { yPercent: -120, duration: 1.1 }, 0)
    .from('[data-hero-line]', { yPercent: 105, duration: 1.2, stagger: 0.1 }, 0.1)
    .from('[data-hero-fade]', { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.35)
    .from('.radial__circle', { y: 160, duration: 1.8 }, 0.2)
    .from('.undernav__inner', { y: -12, autoAlpha: 0, duration: 0.8 }, 0.5);
}
function initRadialMotion() {
  const list = $('#radial-list');
  if (!hasG) return;
  if (reduce) { gsap.set(list, { rotation: -4 }); return; }
  const spin = gsap.to(list, { rotation: -360, duration: 320, ease: 'none', repeat: -1 });
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
  renderRadial(); renderTicker(); renderFound(); renderPipe(); renderLoop(); renderStages();
  renderChain(); renderHub(); renderDay(); renderCall(); renderYouth(); renderLists();
  $$('[data-visual]').forEach(el => { const n = el.dataset.visual, v = V[n]; if (v) { el.innerHTML = v(); if (PHONE.includes(n)) el.classList.add('is--m'); } });
  $$('[data-year]').forEach(e => { e.textContent = String(new Date().getFullYear()); });
});
safe('buttons', () => initButtons());
safe('lenis', initLenis);
safe('nav', initNav);
safe('events', initGlobalEvents);
safe('vsliders', () => $$('[data-vslider]').forEach(r => initVSlider(r)));
safe('stages', () => { stageSlider = initStageSlider(); });
safe('loop', initLoop);
safe('radial-links', initRadialLinks);
safe('pipe', initPipe);
safe('lost', initLost);
safe('bill', initBill);
safe('hub', initHub);
safe('day', initDay);
safe('call', initCall);
safe('yloop', initYLoop);
safe('flick', initFlick);
safe('calc', initCalc);
safe('work', initWork);
safe('player', initPlayer);
safe('copy', initCopy);
safe('cursor', () => initCursor('.flick__item.is--active'));
safe('hero', initHero);
safe('radial', initRadialMotion);
safe('reveals', initReveals);
if (hasG && window.ScrollTrigger) window.addEventListener('load', () => ScrollTrigger.refresh());
