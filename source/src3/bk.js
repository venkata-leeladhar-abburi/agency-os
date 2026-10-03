/* ===== Beere Kesava ERP deck ===== */
const ST = C.stages, ACT = id => C.acts.find(a => a.id === id);
const kicon = (id, cls = 'ki') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#k-${id}"/></svg>`;
const photo = img => `<span class="photo" style="--ph:var(--img-${img})"></span>`;
const screen = (v, arg) => `<span class="k">${arg ? V[v](arg) : V[v]()}</span>`;
const stageMedia = s => s.photo ? photo(s.photo) : screen(s.vis);
const ACT_THEME = { buy: 'light', make: 'violet', check: 'black', sell: 'volt' };
const fmtIN = n => new Intl.NumberFormat('en-IN').format(Math.round(n));
let stageSlider = null;

/* ---------- Hero ring: the twelve steps, twice round ---------- */
function renderRadial() {
  const all = ST.concat(ST);
  const list = $('#radial-list');
  list.style.setProperty('--step', (360 / all.length) + 'deg');
  list.innerHTML = all.map((s, i) => {
    const dup = i >= ST.length, k = i % ST.length;
    return `<div class="radial__item" style="--i:${i}"${dup ? ' aria-hidden="true"' : ''}><button class="radial__card" type="button" data-stage="${k}"${dup ? ' tabindex="-1"' : ''} aria-label="Step ${s.n}, ${esc(s.name)}: ${esc(s.line)}"><span class="media">${stageMedia(s)}</span><span class="radial__info"><span class="radial__name">${esc(s.name)}</span><span class="eyebrow">${s.n}</span></span></button></div>`;
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

/* ---------- Inside the ERP: screen slider ---------- */
const LIVE = [
  ['overview', 'Superadmin', 'Command center', 'The whole house on one screen.'],
  ['production', 'Admin', 'Production', 'Batches, designs and finishing.'],
  ['qc', 'Worker staff', 'Quality check', 'Pass, semi or defective. Pay set.'],
  ['weaver', 'Weaver', 'My batches', 'Their work, their pay. No calls.'],
  ['pos', 'Shop staff', 'New sale', 'Scan. Pay. Bill.'],
  ['payments', 'Finance', 'Payments', 'Money in and out, per firm.']
];
function renderLive() {
  $('#live-slides').innerHTML = LIVE.map(([v, role, t, l], i) => `<article class="live-card"><div class="live-card__start"><div class="tag-pair"><span class="tag">${esc(role)}</span><span class="tag" data-shape="round">Portal</span></div><div class="live-card__title"><h3 class="h-s">${esc(t)}</h3><p class="p-s">${esc(l)}</p></div><span class="eyebrow">${pad(i + 1)} / ${pad(LIVE.length)}</span></div><div class="media">${screen(v)}</div></article>`).join('');
}

/* ---------- Before / after ---------- */
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
  let wasMobile = isMobile();
  window.addEventListener('resize', () => { if (isMobile() !== wasMobile) { wasMobile = isMobile(); renderMess(); } });
}
function renderPains() {
  $('#pains').innerHTML = C.pains.map(([q, a, b], i) => `<li class="pain3"><span class="pain3__n">${pad(i + 1)}</span><p class="pain3__q">${esc(q)}</p><p class="pain3__from">${esc(a)}</p><p class="pain3__to">${esc(b)}</p></li>`).join('');
}

/* ---------- Journey: thread diagram + drag cards + detail ---------- */
let stageActive = -1, threadTouched = false;
function renderThread() {
  $('#thread').innerHTML = C.acts.map(a => {
    const nodes = ST.map((s, i) => [s, i]).filter(([s]) => s.act === a.id);
    return `<div class="act" data-act="${a.id}"><div class="act__head"><span class="act__name">${esc(a.name)}</span><span class="act__sub">${esc(a.sub)}</span></div><div class="act__nodes">${nodes.map(([s, i]) => `<button class="tnode" type="button" data-st="${i}" aria-label="Step ${s.n}: ${esc(s.name)}"><span class="tnode__dot">${kicon(s.icon)}</span><span class="tnode__n">${s.n}</span><span class="tnode__name">${esc(s.name)}</span></button>`).join('')}</div></div>`;
  }).join('');
}
function renderStages() {
  $('#stage-cards').innerHTML = ST.map((s, i) => `<div class="gslider__item" data-i="${i}"><article class="stage-card is--${ACT_THEME[s.act]}" aria-label="Step ${s.n}: ${esc(s.name)}"><span class="media">${stageMedia(s)}</span><div class="stage-card__top"><div class="tag-pair"><span class="tag">${esc(ACT(s.act).name)}</span><span class="tag" data-shape="round">${s.n} / 12</span></div>${kicon(s.icon)}</div><div class="stage-card__num" aria-hidden="true">${s.n}</div><div class="stage-card__body"><h3 class="h-m">${esc(s.name)}</h3><p class="p-m">${esc(s.line)}</p><p class="stage-card__out">${esc(s.saves)}</p></div></article></div>`).join('');
}
function setStage(i) {
  if (i === stageActive) return;
  stageActive = i;
  const s = ST[i], a = ACT(s.act);
  $('#stage-detail').innerHTML = `<div class="sd"><div class="sd__head"><span class="sd__num">${s.n} / 12 · ${esc(a.name)}</span><h3 class="h-m">${esc(s.name)}</h3><p class="sd__out">${esc(s.line)}</p></div><div class="sd__lanes"><div class="sd__lane"><h4>Who</h4><div class="sd__who">${kicon(s.icon)}<p class="h-xs">${esc(s.who)}</p></div></div><div class="sd__lane"><h4>What it records</h4><ul class="dl">${s.rec.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div><div class="sd__lane is--kb"><h4>Replaces</h4><p class="h-xs"><s>${esc(s.replaces)}</s></p></div><div class="sd__lane is--get"><h4>Gives back</h4><p class="h-xs">${esc(s.saves)}</p></div></div></div>`;
  $$('#thread [data-st]').forEach(b => { const k = +b.dataset.st; b.classList.toggle('is--on', k === i); b.classList.toggle('is--passed', k < i); b.setAttribute('aria-pressed', String(k === i)); });
  $$('#stage-cards .gslider__item').forEach((it, k) => it.setAttribute('aria-current', k === i ? 'true' : 'false'));
}
function initStageSlider() {
  const coll = $('#journey .gslider__collection'), list = $('#stage-cards');
  const items = $$('.gslider__item', list);
  const N = items.length;
  let snaps = [], current = 0, move = () => {};
  const go = i => { i = clamp(i, 0, N - 1); setStage(i); current = i; move(i); };
  coll.setAttribute('tabindex', '0');
  coll.setAttribute('aria-label', 'Steps. Use the left and right arrow keys to move between steps.');
  coll.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); } });
  $('#thread').addEventListener('click', e => { const b = e.target.closest('[data-st]'); if (b) { threadTouched = true; go(+b.dataset.st); } });
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
    onDrag() { dragged = true; threadTouched = true; render(); const i = nearest(this.x); if (i !== current) { current = i; setStage(i); } },
    onThrowUpdate() { render(); const i = nearest(this.x); if (i !== current) { current = i; setStage(i); } },
    onRelease() { if (!hasInertia && dragged) { const i = nearest(this.x); current = i; setStage(i); move(i); } },
    onClick(e) { if (dragged) return; const it = e.target.closest('.gslider__item'); if (it) { threadTouched = true; go(+it.dataset.i); } }
  })[0];
  window.addEventListener('resize', () => { measure(); drag.applyBounds({ minX: snaps[N - 1], maxX: snaps[0] }); gsap.set(list, { x: snaps[current] }); render(); });
  return { go };
}
/* One quick sweep along the thread the first time it shows */
function initThreadSweep() {
  if (reduce) return;
  onVisible($('#thread'), (v, io) => {
    if (!v) return;
    io.disconnect();
    let k = 0;
    const t = setInterval(() => {
      if (threadTouched) { clearInterval(t); $$('#thread .is--sweep').forEach(el => el.classList.remove('is--sweep')); return; }
      k++;
      if (k >= ST.length) { clearInterval(t); $$('#thread .is--sweep').forEach(el => el.classList.remove('is--sweep')); return; }
      $$('#thread [data-st]').forEach(el => el.classList.toggle('is--sweep', +el.dataset.st === k));
    }, 260);
  }, { threshold: 0.6 });
}

/* ---------- One scan ---------- */
function renderScan() {
  let seed = 7;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  let x = 2, bars = '';
  while (x < 117) { const w = 0.6 + Math.round(rnd() * 3) * 0.55; if (x + w > 118) break; bars += `<rect x="${x.toFixed(2)}" y="0" width="${w.toFixed(2)}" height="34"/>`; x += w + 0.7 + rnd() * 1.6; }
  $('#tag-bars').innerHTML = bars;
  $('#story').innerHTML = C.story.map(([ic, t, d, who]) => `<li><span class="story__ic">${kicon(ic)}</span><span class="story__t"><b>${esc(t)}</b><span>${esc(d)}</span></span><span class="story__who">${esc(who)}</span></li>`).join('');
}
function initScan() {
  const tag = $('#tagcard'), btn = $('#scan-btn'), rows = $$('#story li');
  let touched = false, busy = false;
  const label = t => { $$('.btn__label', btn).forEach(l => { l.textContent = t; }); };
  const run = () => {
    if (busy) return;
    busy = true;
    rows.forEach(r => r.classList.remove('is--on'));
    tag.dataset.state = 'scanning';
    setTimeout(() => {
      tag.dataset.state = 'done';
      rows.forEach((r, i) => setTimeout(() => { r.classList.add('is--on'); if (i === rows.length - 1) { busy = false; label('Scan again'); } }, reduce ? 0 : i * 170));
    }, reduce ? 0 : 1900);
  };
  btn.addEventListener('click', () => { touched = true; run(); });
  onVisible(tag, (v, io) => { if (v) { io.disconnect(); setTimeout(() => { if (!touched) run(); }, 700); } }, { threshold: 0.6 });
}

/* ---------- Portals ---------- */
function renderPortals() {
  $('#portal-cards').innerHTML = C.portals.map((p, i) => `<div class="flick__item" data-i="${i}" role="listitem"><article class="portal-card"><div class="media">${screen(p.vis)}</div><div class="portal-card__info"><div class="portal-card__top"><div><h3 class="h-s">${esc(p.name)}</h3><p class="p-s">${esc(p.line)}</p></div><span class="tag portal-card__plan" data-theme="volt" data-shape="round">${esc(p.who)}</span></div><div class="portal-card__counts"><span>${esc(p.count)}</span><span>Own login</span></div><div class="portal-card__open"><span>Look inside</span><svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></div></div></article></div>`).join('');
  $('#usedby').innerHTML = C.portals.map((p, i) => `<li><button type="button" data-portal="${i}">${kicon(p.icon)}<span>${esc(p.name)}</span></button></li>`).join('');
}
let portalIndex = 0;
function portalHTML(i) {
  const p = C.portals[i], n = C.portals.length;
  const prev = C.portals[(i - 1 + n) % n], next = C.portals[(i + 1) % n];
  return `<div class="pmod"><div class="pmod__head"><div class="tag-pair"><span class="tag">Portal ${pad(i + 1)} / ${pad(n)}</span><span class="tag" data-theme="volt" data-shape="round">${esc(p.who)}</span></div><h2 class="h-l" id="portal-title">${esc(p.name)}</h2><p class="p-l">${esc(p.line)}</p></div>
    <div class="pmod__grid"><div class="pmod__tabs"><span class="eyebrow">What they use · ${esc(p.count)}</span><ol class="route">${p.tabs.map((t, k) => `<li style="--k:${k}"><span class="route__n">${pad(k + 1)}</span><span class="route__t">${esc(t)}</span></li>`).join('')}</ol></div>
    <div class="pmod__side"><div class="media">${screen(p.vis)}</div><div class="pmod__card"><span class="eyebrow">Kept from them</span><p class="h-xs">${esc(p.hidden)}</p></div><div class="pmod__card is--gold"><span class="eyebrow">Gives back</span><p class="h-xs">${esc(p.saves)}</p></div></div></div>
    <div class="pm__nav"><button class="btn" type="button" data-theme="haze" data-portal-step="-1"><span class="btn__label">← ${esc(prev.name)}</span></button><button class="btn" type="button" data-theme="volt" data-portal-step="1"><span class="btn__label">${esc(next.name)} →</span></button></div></div>`;
}
function openPortal(i, trigger) {
  portalIndex = (i + C.portals.length) % C.portals.length;
  const body = $('#portal-body');
  body.innerHTML = portalHTML(portalIndex);
  initButtons(body);
  body.scrollTop = 0;
  if ($('.modal[data-modal="portal"]').dataset.open !== 'true') openModal('portal', trigger);
  else $('.modal[data-modal="portal"] .modal__panel').focus({ preventScroll: true });
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
    pos = sp0 - dx / (cardW() * 0.7);
    layout();
  });
  const end = e => {
    if (!dragging) return;
    dragging = false;
    if (!moved) {
      const it = document.elementsFromPoint(e.clientX, e.clientY).map(el => el.closest && el.closest('.flick__item')).find(Boolean);
      if (it) { const i = +it.dataset.i; if (i === idx(pos)) openPortal(i, root); else goTo(nearestTarget(i)); }
      else goTo(Math.round(pos));
      return;
    }
    goTo(Math.round(pos - clamp(vx * 3, -2, 2)));
  };
  root.addEventListener('pointerup', end);
  root.addEventListener('pointercancel', () => { dragging = false; goTo(Math.round(pos)); });
  root.setAttribute('tabindex', '0');
  root.setAttribute('aria-label', 'Portals. Use the left and right arrow keys to browse, Enter to look inside.');
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.round(target) + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.round(target) - 1); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPortal(idx(target), root); }
  });
  $('[data-flick-prev]').addEventListener('click', () => goTo(Math.round(target) - 1));
  $('[data-flick-next]').addEventListener('click', () => goTo(Math.round(target) + 1));
  $('[data-flick-open]').addEventListener('click', e => openPortal(idx(target), e.currentTarget));
  $('#usedby').addEventListener('click', e => { const b = e.target.closest('[data-portal]'); if (b) { goTo(nearestTarget(+b.dataset.portal)); openPortal(+b.dataset.portal, b); } });
  document.addEventListener('click', e => { const st = e.target.closest('[data-portal-step]'); if (st) openPortal(portalIndex + (+st.dataset.portalStep)); });
  window.addEventListener('resize', layout);
  layout();
}

/* ---------- Night shift dial ---------- */
const ang = h => (h / 24) * 2 * Math.PI - Math.PI / 2;
const pt = (h, r) => [200 + r * Math.cos(ang(h)), 200 + r * Math.sin(ang(h))];
function arcPath(h1, h2, r) {
  const [x1, y1] = pt(h1, r), [x2, y2] = pt(h2, r);
  let span = h2 - h1; if (span < 0) span += 24;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${span > 12 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}
function renderNight() {
  let svg = `<circle class="dial__face" cx="200" cy="200" r="196"/><circle class="dial__inner" cx="200" cy="200" r="68"/><path class="dial__day" d="${arcPath(6, 18, 168)}"/><path class="dial__night" d="${arcPath(18, 6, 168)}"/>`;
  for (let h = 0; h < 24; h += 0.5) {
    const major = h % 6 === 0, hour = h % 1 === 0;
    const [x1, y1] = pt(h, major ? 140 : hour ? 145 : 149), [x2, y2] = pt(h, 153);
    svg += `<line class="dial__tick${major ? ' is--major' : ''}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }
  [0, 6, 12, 18].forEach(h => { const [x, y] = pt(h, 124); svg += `<text class="dial__lbl" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle">${pad(h)}:00</text>`; });
  const hours = [...new Set(C.night.map(e => Math.floor(e.h)))];
  hours.forEach(h => { const [x, y] = pt(h, 168); svg += `<g class="dial__ev" data-h="${h}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14"/><text x="${x.toFixed(1)}" y="${(y + 3.5).toFixed(1)}">${pad(h)}</text></g>`; });
  svg += `<g class="dial__hand" id="dial-hand"><line x1="200" y1="128" x2="200" y2="62"/><circle cx="200" cy="62" r="5"/></g>`;
  $('#dial-svg').innerHTML = svg;
  $('#night-list').innerHTML = C.night.map((e, i) => `<li data-i="${i}"><button type="button" data-night="${i}"><span class="night__t">${e.t}</span><span class="night__ic">${kicon(e.icon)}</span><span class="night__body"><b>${esc(e.title)}</b><span>${esc(e.line)}</span></span></button></li>`).join('');
}
function initNight() {
  const hand = $('#dial-hand'), time = $('#dial-time'), items = $$('#night-list li'), evs = $$('.dial__ev');
  const LOOP = 18000;
  const ENDS = C.night.map((e, i) => (i < C.night.length - 1 ? Math.min(C.night[i + 1].h, e.h + 3.3) : e.h + 3));
  let t = 0, playing = !reduce, last = performance.now(), inView = false, held = false;
  const set = h => {
    h = ((h % 24) + 24) % 24;
    hand.setAttribute('transform', `rotate(${(h / 24 * 360).toFixed(2)} 200 200)`);
    const hh = Math.floor(h), mm = Math.floor((h - hh) * 60 / 15) * 15;
    time.textContent = `${pad(hh)}:${pad(mm)}`;
    let act = -1;
    C.night.forEach((e, i) => { if (h >= e.h && h < ENDS[i]) act = i; });
    items.forEach((li, i) => li.classList.toggle('is--on', i === act));
    evs.forEach(g => g.classList.toggle('is--on', act >= 0 && Math.floor(C.night[act].h) === +g.dataset.h));
  };
  onVisible($('#dial'), v => { inView = v; }, { threshold: 0.3 });
  const loop = now => {
    const dt = now - last; last = now;
    if (playing && inView && !held && !document.hidden) { t = (t + dt / LOOP * 24) % 24; set(t); }
    requestAnimationFrame(loop);
  };
  set(reduce ? 2 : 0);
  if (!reduce) requestAnimationFrame(loop);
  $('#night-list').addEventListener('click', e => { const b = e.target.closest('[data-night]'); if (!b) return; playing = false; t = C.night[+b.dataset.night].h + 0.01; set(t); });
  $('#night-list').addEventListener('pointerenter', () => { held = true; });
  $('#night-list').addEventListener('pointerleave', () => { held = false; });
}

/* ---------- Documents fan ---------- */
function renderDocs() {
  $('#doc-fan').innerHTML = C.docs.map(([name], i) => `<div class="fcard" data-i="${i}"><span class="tag fcard__label" data-theme="volt">${esc(name)}</span><div class="media">${screen('doc', name)}</div></div>`).join('');
  $('#doc-list').innerHTML = C.docs.map(([name, who, line], i) => `<li data-i="${i}"><button type="button" data-doc="${i}" aria-pressed="false"><small>${esc(who)}</small><b>${esc(name)}</b><span>${esc(line)}</span></button></li>`).join('');
}
function initDocs() {
  const cards = $$('#doc-fan .fcard'), lis = $$('#doc-list li'), n = cards.length;
  let sel = 0, touched = false, inView = false;
  const layout = () => {
    const m = isMobile();
    cards.forEach((c, i) => {
      let o = i - sel; o = ((o % n) + n + n / 2) % n - n / 2;
      const ao = Math.abs(o), on = o === 0;
      const x = o * (m ? 1.3 : 2.1), r = o * (m ? 5 : 6), y = ao * 0.45 - (on ? 1.2 : 0);
      c.style.transform = `translate(${x}rem,${y}rem) rotate(${r}deg) scale(${on ? 1.04 : 1 - ao * 0.02})`;
      c.style.zIndex = String(100 - ao * 10);
      c.style.opacity = ao > 3 ? '0' : '1';
      c.classList.toggle('is--on', on);
    });
    lis.forEach((li, i) => { li.classList.toggle('is--on', i === sel); li.firstElementChild.setAttribute('aria-pressed', String(i === sel)); });
  };
  const go = i => { sel = (i + n) % n; layout(); };
  $('#doc-list').addEventListener('click', e => { const b = e.target.closest('[data-doc]'); if (b) { touched = true; go(+b.dataset.doc); } });
  onVisible($('#doc-fan'), v => { inView = v; }, { threshold: 0.3 });
  if (!reduce) setInterval(() => { if (!touched && inView && !document.hidden) go(sel + 1); }, 2600);
  window.addEventListener('resize', layout);
  layout();
}

/* ---------- Trust, work, leaks, tech, road ---------- */
function renderLists() {
  $('#trust').innerHTML = C.trust.map(([ic, t, l]) => `<li><span class="trust__ic">${kicon(ic)}</span><h3>${esc(t)}</h3><p>${esc(l)}</p></li>`).join('');
  $('#work-list').innerHTML = C.work.map(([a, b], i) => `<li class="wo" style="--k:${i}"><span class="wo__n">${pad(i + 1)}</span><span class="wo__from">${esc(a)}</span><span class="wo__to">${esc(b)}</span></li>`).join('');
  $('#leaks').innerHTML = C.leaks.map(([ic, t, l]) => `<li>${kicon(ic)}<b>${esc(t)}</b><span>${esc(l)}</span></li>`).join('');
  const TI = ['server', 'layers', 'check', 'shield'];
  $('#tech-stats').innerHTML = C.tech.map(([v, l, c], i) => `<div class="stat${i === 3 ? ' is--gold' : ''}"><span class="eyebrow stat__l">${esc(l)}</span><span class="stat__v"><span class="stat__ic">${kicon(TI[i])}</span><b class="tnum">${esc(v)}</b></span><span class="stat__c">${esc(c)}</span></div>`).join('');
  $('#tech-quality').innerHTML = C.quality.map(([t, l]) => `<li><b>${esc(t)}</b><span>${esc(l)}</span></li>`).join('');
  $('#tech-chips').innerHTML = C.stack.map(t => `<li>${esc(t)}</li>`).join('');
  $('#road').innerHTML = C.road.map(([n, t, l]) => `<li><span class="trail__dot" aria-hidden="true">${n}</span><div class="trail__card"><h3>${esc(t)}</h3><p>${esc(l)}</p></div></li>`).join('');
  $('#next-chips').innerHTML = C.next.map(t => `<li>${esc(t)}</li>`).join('');
  $('#towns').innerHTML = C.towns.map(t => `<li>${esc(t)}</li>`).join('');
}
function initWork() {
  const w = $('.workoff');
  if (reduce || !('IntersectionObserver' in window)) { w.classList.add('is--in'); return; }
  onVisible(w, (v, io) => { if (v) { io.disconnect(); w.classList.add('is--in'); } }, { threshold: 0.3 });
}

/* ---------- Savings estimator ---------- */
function initCalc() {
  const ins = { sarees: $('#r-sarees'), mins: $('#r-mins'), cost: $('#r-cost') };
  const out = { hours: $('#o-hours'), days: $('#o-days'), money: $('#o-money') };
  const shown = { hours: 0, days: 0, money: 0 };
  const tweens = {};
  const fill = el => el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100).toFixed(1) + '%');
  const show = (k, v) => {
    const fmt = k === 'money' ? x => '₹' + fmtIN(x) : fmtIN;
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
    const s = +ins.sarees.value, m = +ins.mins.value, c = +ins.cost.value;
    $('#v-sarees').textContent = fmtIN(s);
    $('#v-mins').textContent = m;
    $('#v-cost').textContent = '₹' + fmtIN(c);
    Object.values(ins).forEach(fill);
    const hours = s * 12 * m / 60;
    show('hours', hours); show('days', hours / 8); show('money', hours * c);
  };
  Object.values(ins).forEach(el => el.addEventListener('input', update));
  update();
}

/* ---------- Walkthrough player ---------- */
function initPlayer() {
  const modal = $('.modal[data-modal="reel"]');
  $('#player-frames').innerHTML = ST.map((s, i) => `<div class="pframe${i === 0 ? ' is--active' : ''}" aria-hidden="${i !== 0}"><div class="pframe__text"><span class="pframe__act">${esc(ACT(s.act).name)} · step ${s.n} of 12</span><span class="pframe__num">${s.n}</span><h3 class="h-m">${esc(s.name)}</h3><p class="p-l">${esc(s.line)}</p><p class="pframe__out">${esc(s.saves)}</p><ul class="pframe__lanes"><li><b>Who</b><span>${esc(s.who)}</span></li><li><b>Records</b><span>${esc(s.rec.join(' · '))}</span></li><li><b>Replaces</b><span>${esc(s.replaces)}</span></li></ul></div><div class="media">${screen(s.vis)}</div></div>`).join('');
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

/* Ring cards jump to their step in the journey */
function initRadialLinks() {
  $('#radial-list').addEventListener('click', e => {
    const b = e.target.closest('[data-stage]');
    if (!b) return;
    threadTouched = true;
    const i = +b.dataset.stage;
    scrollToEl($('#journey'));
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
  renderRadial(); renderTicker(); renderLive(); renderMess(); renderPains();
  renderThread(); renderStages(); renderScan(); renderPortals(); renderNight(); renderDocs(); renderLists();
  $$('[data-visual]').forEach(el => { const v = V[el.dataset.visual]; if (v) el.innerHTML = v(); });
  $$('[data-year]').forEach(e => { e.textContent = String(new Date().getFullYear()); });
});
safe('buttons', () => initButtons());
safe('lenis', initLenis);
safe('nav', initNav);
safe('events', initGlobalEvents);
safe('vsliders', () => $$('[data-vslider]').forEach(r => initVSlider(r)));
safe('stages', () => { stageSlider = initStageSlider(); initThreadSweep(); });
safe('radial-links', initRadialLinks);
safe('scan', initScan);
safe('flick', initFlick);
safe('night', initNight);
safe('docs', initDocs);
safe('work', initWork);
safe('calc', initCalc);
safe('player', initPlayer);
safe('copy', initCopy);
safe('cursor', () => initCursor('.flick__item.is--active'));
safe('mess', initMess);
safe('hero', initHero);
safe('radial', initRadialMotion);
safe('reveals', initReveals);
if (hasG && window.ScrollTrigger) window.addEventListener('load', () => ScrollTrigger.refresh());
