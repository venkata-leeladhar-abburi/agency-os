/* ===== Heaven Gadgets growth plan ===== */
const ST = C.steps, ACT = id => C.acts.find(a => a.id === id);
const kicon = (id, cls = 'ki') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#k-${id}"/></svg>`;
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
function renderFound() {
  $('#found-slides').innerHTML = C.found.map(([v, t, l], i) => `<article class="live-card"><div class="live-card__start"><div class="tag-pair"><span class="tag">Today</span><span class="tag" data-shape="round">Gap ${pad(i + 1)}</span></div><div class="live-card__title"><h3 class="h-s">${esc(t)}</h3><p class="p-s">${esc(l)}</p></div><span class="eyebrow">${pad(i + 1)} / ${pad(C.found.length)}</span></div><div class="media">${screen(v)}</div></article>`).join('');
  $('#today-chain').innerHTML = C.today.map(([ic, t, weak], i) => `<li class="tc${weak ? ' is--weak' : ''}" style="--k:${i}"><span class="tc__dot">${kicon(ic)}</span><span class="tc__n">${pad(i + 1)}</span><b class="tc__t">${esc(t)}</b>${weak ? `<span class="tc__flag">${esc(weak)}</span>` : ''}</li>`).join('');
}

/* ---------- Chats to system ---------- */
function renderMess() {
  const m = isMobile();
  $('#mess-chips').innerHTML = C.mess.map(([from, to, g, a, b, am, bm], k) => {
    const A = m ? am : a, B = m ? bm : b;
    return `<li class="mess__chip" data-g="${g}" style="--k:${k};--ax:${A[0]}%;--ay:${A[1]}%;--ar:${A[2]}deg;--bx:${B[0]}%;--by:${B[1]}%"><span class="mess__chip-inner"><span class="from">${esc(from)}</span><span class="to">${esc(to)}</span></span></li>`;
  }).join('');
  const P0 = i => (m ? C.mess[i][5] : C.mess[i][3]);
  $('#mess-lines').innerHTML = C.messLinks.map(([i, j, red]) => {
    const [x1, y1] = P0(i), [x2, y2] = P0(j);
    const cx = (x1 + x2) / 2 + (y2 - y1) * 0.35, cy = (y1 + y2) / 2 - (x2 - x1) * 0.35;
    return `<path class="${red ? 'is--red' : ''}" d="M${x1} ${y1} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}"/>`;
  }).join('');
  $('#mess-cols').innerHTML = C.messCols.map(c => `<span class="eyebrow">${esc(c)}</span>`).join('');
  $('#mess-cols').hidden = m;
}
function initMess() {
  const root = $('[data-mess]');
  let touched = false;
  const set = s => { root.dataset.state = s; $$('[data-mess-set]', root).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.messSet === s))); };
  $$('[data-mess-set]', root).forEach(b => b.addEventListener('click', () => { touched = true; set(b.dataset.messSet); }));
  if (!reduce) onVisible($('.mess__stage'), (v, io) => { if (v) { io.disconnect(); setTimeout(() => { if (!touched) set('os'); }, 1700); } }, { threshold: 0.55 });
}
function renderPains() {
  $('#pains').innerHTML = C.pains.map(([q, a, b], i) => `<li class="pain3"><span class="pain3__n">${pad(i + 1)}</span><p class="pain3__q">${esc(q)}</p><p class="pain3__from">${esc(a)}</p><p class="pain3__to">${esc(b)}</p></li>`).join('');
}

/* ---------- The leaky pipe ---------- */
function pipeGeom(m) {
  /* Desktop: a pipe left to right. Phone: top to bottom. Coordinates in the SVG's own units. */
  return m
    ? { w: 360, h: 760, holes: [150, 255, 360, 465, 570].map(y => [96, y]), seg: [70, 150, 255, 360, 465, 570, 650] }
    : { w: 1000, h: 400, holes: [230, 370, 510, 650, 790].map(x => [x, 150]), seg: [118, 230, 370, 510, 650, 790, 868] };
}
const WATER = { today: [30, 24, 19, 14, 10, 7], os: [30, 30, 29, 29, 28, 28] };
function renderPipe() {
  const m = isMobile(), g = pipeGeom(m), svg = $('#pipe-svg');
  svg.setAttribute('viewBox', `0 0 ${g.w} ${g.h}`);
  const wg = m ? 'x1="0" y1="70" x2="0" y2="760"' : 'x1="118" y1="0" x2="980" y2="0"';
  let s = `<defs><linearGradient id="pipe-water" gradientUnits="userSpaceOnUse" ${wg}><stop offset="0" stop-color="#FFD43A"/><stop offset="1" stop-color="#2B4DFF"/></linearGradient><linearGradient id="pipe-body" x1="0" y1="0" x2="${m ? 1 : 0}" y2="${m ? 0 : 1}"><stop offset="0" stop-color="#2D3978"/><stop offset=".5" stop-color="#18225E"/><stop offset="1" stop-color="#0D154A"/></linearGradient></defs>`;
  const people = Array.from({ length: 9 }, (_, i) => i);
  if (!m) {
    s += `<path class="pipe__funnel" d="M14 54 Q70 92 118 112 L118 188 Q70 208 14 246 Z"/><text class="pipe__lbl" x="16" y="34">People who see your reels</text>`;
    s += people.map(i => `<circle class="pipe__in" r="${3 + (i % 3)}" cx="0" cy="${(78 + i * 18).toFixed(0)}" style="--d:${(i * 0.29).toFixed(2)}s;--ty:${(150 - (78 + i * 18)).toFixed(0)}px"/>`).join('');
    s += `<rect class="pipe__body" x="112" y="112" width="764" height="76" rx="16"/>`;
    for (let i = 0; i < 6; i++) s += `<line class="pipe__water" data-i="${i}" x1="${g.seg[i]}" y1="150" x2="${g.seg[i + 1]}" y2="150"/>`;
    s += `<path class="pipe__jar" d="M884 96 h96 v190 a14 14 0 0 1 -14 14 h-68 a14 14 0 0 1 -14 -14 z"/><rect class="pipe__fill" id="pipe-fill" x="890" y="120" width="84" height="174" rx="8"/><text class="pipe__lbl" x="932" y="80" text-anchor="middle">Sales</text>`;
    g.holes.forEach(([x, y], i) => { s += `<g class="pipe__hole" data-i="${i}"><ellipse cx="${x}" cy="${y + 38}" rx="13" ry="5"/><circle class="pipe__drip" cx="${x}" cy="${y + 44}" r="5" style="--d:${(i * 0.37).toFixed(2)}s"/><circle class="pipe__drip is--2" cx="${x}" cy="${y + 44}" r="3.6" style="--d:${(i * 0.37 + 0.6).toFixed(2)}s"/><rect class="pipe__patch" x="${x - 30}" y="${y + 26}" width="60" height="24" rx="8"/></g>`; });
  } else {
    s += `<path class="pipe__funnel" d="M28 6 Q62 50 76 70 L116 70 Q130 50 164 6 Z"/><text class="pipe__lbl" x="190" y="30">People who see</text><text class="pipe__lbl" x="190" y="50">your reels</text>`;
    s += people.map(i => `<circle class="pipe__in is--v" r="${3 + (i % 3)}" cx="${(40 + i * 14).toFixed(0)}" cy="0" style="--d:${(i * 0.29).toFixed(2)}s;--tx:${(96 - (40 + i * 14)).toFixed(0)}px"/>`).join('');
    s += `<rect class="pipe__body" x="58" y="64" width="76" height="592" rx="16"/>`;
    for (let i = 0; i < 6; i++) s += `<line class="pipe__water" data-i="${i}" x1="96" y1="${g.seg[i]}" x2="96" y2="${g.seg[i + 1]}"/>`;
    s += `<path class="pipe__jar" d="M40 662 h112 v80 a14 14 0 0 1 -14 14 h-84 a14 14 0 0 1 -14 -14 z"/><rect class="pipe__fill" id="pipe-fill" x="46" y="668" width="100" height="82" rx="8"/>`;
    g.holes.forEach(([x, y], i) => { s += `<g class="pipe__hole is--side" data-i="${i}"><ellipse cx="${x + 38}" cy="${y}" rx="5" ry="13"/><circle class="pipe__drip" cx="${x + 44}" cy="${y}" r="5" style="--d:${(i * 0.37).toFixed(2)}s"/><circle class="pipe__drip is--2" cx="${x + 44}" cy="${y}" r="3.6" style="--d:${(i * 0.37 + 0.6).toFixed(2)}s"/><rect class="pipe__patch" x="${x + 26}" y="${y - 30}" width="24" height="60" rx="8"/></g>`; });
  }
  svg.innerHTML = s;
  $('#pipe-holes').innerHTML = C.leaks.map(([a, b], i) => {
    const [x, y] = g.holes[i];
    const style = m ? `left:${((x + 70) / g.w * 100).toFixed(1)}%;top:${(y / g.h * 100).toFixed(1)}%` : `left:${(x / g.w * 100).toFixed(1)}%;top:${((y + 104 + (i % 2) * 70) / g.h * 100).toFixed(1)}%`;
    return `<li class="pipe__tag" style="${style};--k:${i}"><span class="pipe__tag-n">${pad(i + 1)}</span><span class="pipe__tag-t"><span class="from">${esc(a)}</span><span class="to">${esc(b)}</span></span></li>`;
  }).join('');
  paintPipe();
}
function paintPipe() {
  const root = $('#pipe'), st = root.dataset.state, w = WATER[st];
  $$('.pipe__water', root).forEach((l, i) => { l.style.strokeWidth = w[i] + 'px'; });
  const f = $('#pipe-fill');
  if (f) {
    const m = isMobile(), H = m ? 82 : 174, top = m ? 668 : 120, p = st === 'os' ? 0.86 : 0.24;
    f.setAttribute('y', (top + H * (1 - p)).toFixed(1));
    f.setAttribute('height', (H * p).toFixed(1));
  }
  $('#pipe-out').textContent = st === 'os' ? 'Most of it' : 'A trickle';
}
function initPipe() {
  const root = $('#pipe');
  let touched = false;
  const set = s => { root.dataset.state = s; $$('[data-pipe-set]', root).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.pipeSet === s))); paintPipe(); };
  $$('[data-pipe-set]', root).forEach(b => b.addEventListener('click', () => { touched = true; set(b.dataset.pipeSet); }));
  if (!reduce) onVisible($('.pipe__stage'), (v, io) => { if (v) { io.disconnect(); setTimeout(() => { if (!touched) set('os'); }, 2600); } }, { threshold: 0.5 });
}
function initLost() {
  const a = $('#r-lost'), b = $('#r-lost-avg'), out = $('#o-lost');
  let shown = 0, raf = 0;
  const fill = el => el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100).toFixed(1) + '%');
  const update = () => {
    const n = +a.value, avg = +b.value, year = n * avg * 365;
    $('#v-lost').textContent = n;
    $('#v-lost-avg').textContent = '₹' + fmtIN(avg);
    $('#o-lost-sub').textContent = n ? `That’s ₹${fmtIN(year / 12)} a month.` : 'Nothing lost. Nice!';
    [a, b].forEach(fill);
    $('.lost').style.setProperty('--drip', String(Math.min(n, 5)));
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
const LANE_CAP = { on: 'Sees a reel. Buys on the website. Comes back for more.', st: 'Walks in. Billed at the counter. Comes back for more.' };
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
  $('#people-cards').innerHTML = C.people.map((p, i) => `<div class="flick__item" data-i="${i}" role="listitem"><article class="person-card"><div class="person-card__top"><span class="person-card__av">${kicon(p.icon)}</span><span class="tag" data-theme="volt" data-shape="round">${esc(p.age)}</span></div><p class="person-card__q">“${esc(p.quote)}”</p><div class="person-card__info"><h3 class="h-s">${esc(p.name)}</h3><p class="p-s">${esc(p.where)}</p></div><div class="portal-card__counts"><span>${esc(p.budget)}</span><span>${esc(p.finds)}</span><span>${esc(p.pays)}</span></div><div class="portal-card__open"><span>Meet them</span><svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></div></article></div>`).join('');
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
  return `<div class="pmod"><div class="pmod__head"><div class="tag-pair"><span class="tag">Buyer ${pad(i + 1)} / ${pad(n)}</span><span class="tag" data-theme="volt" data-shape="round">${esc(p.age)}</span></div><h2 class="h-l" id="person-title">${esc(p.name)}</h2><p class="p-l">“${esc(p.quote)}”</p></div>
    <div class="pmod__grid"><div class="pmod__tabs"><span class="eyebrow">What they want</span><ol class="route">${p.wants.map((t, k) => `<li style="--k:${k}"><span class="route__n">${pad(k + 1)}</span><span class="route__t">${esc(t)}</span></li>`).join('')}</ol><span class="eyebrow" style="margin-top:1.5rem">What annoys them today</span><ul class="pmod__pains">${p.pains.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>
    <div class="pmod__side"><div class="pmod__card is--dark"><div class="pmod__facts"><span><small>Lives</small>${esc(p.where)}</span><span><small>Spends</small>${esc(p.budget)}</span><span><small>Finds you on</small>${esc(p.finds)}</span><span><small>Pays with</small>${esc(p.pays)}</span></div></div><div class="pmod__card is--gold"><span class="eyebrow">How we win them</span><p class="h-xs">${esc(p.win)}</p></div></div></div>
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
    $('#people-count').textContent = `${pad(idx(pos) + 1)} / ${pad(n)}`;
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

/* ---------- Lists: plugs, road, need, proof, map ---------- */
function renderLists() {
  $('#plugs').innerHTML = C.plugs.map(([ic, a, b]) => `<li>${kicon(ic)}<b><s>${esc(a)}</s></b><span>${esc(b)}</span></li>`).join('');
  $('#road').innerHTML = C.road.map(([n, ph, t, l, w]) => `<li><span class="trail__dot" aria-hidden="true">${n}</span><div class="trail__card"><span class="trail__ph">${esc(ph)} · ${esc(w)}</span><h3>${esc(t)}</h3><p>${esc(l)}</p></div></li>`).join('');
  $('#need').innerHTML = C.need.map(t => `<li>${esc(t)}</li>`).join('');
  $('#proof-list').innerHTML = C.proof.map(p => `<li class="pf${p.phone ? ' is--phone' : ''}"><a class="pf__link" href="${esc(p.href)}"${/^https?:/.test(p.href) ? ' target="_blank" rel="noopener"' : ''}><span class="pf__img"><img src="${esc(p.img)}" alt="${esc(p.name)} screen" loading="lazy"></span><span class="pf__body"><span class="tag" data-theme="haze" data-shape="round">${esc(p.tag)}</span><b class="pf__name">${esc(p.name)}</b><span class="pf__line">${esc(p.line)}</span><span class="pf__cta">${esc(p.cta)}<svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></span></span></a></li>`).join('');
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
  const els = $$('.today, .map, .chain');
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
function initResize() {
  let wasMobile = isMobile();
  window.addEventListener('resize', () => { if (isMobile() !== wasMobile) { wasMobile = isMobile(); renderMess(); renderPipe(); } });
}

/* ---------- Boot ---------- */
safe('render', () => {
  renderRadial(); renderTicker(); renderFound(); renderMess(); renderPains(); renderPipe(); renderLoop(); renderStages();
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
safe('mess', initMess);
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
safe('resize', initResize);
safe('hero', initHero);
safe('radial', initRadialMotion);
safe('reveals', initReveals);
if (hasG && window.ScrollTrigger) window.addEventListener('load', () => ScrollTrigger.refresh());
