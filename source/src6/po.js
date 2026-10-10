/* ===== Pharmacy OS pitch ===== */
const ST = C.steps, ACT = id => C.acts.find(a => a.id === id);
const kicon = (id, cls = 'ki') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#k-${id}"/></svg>`;
const PHONES = ['dlink', 'wabillm', 'remindm', 'ownerm', 'needsm'], TABLETS = ['billt'];
/* A product screen. With a zoom [times, x, y] it is shown enlarged about that point, so a small card stays readable. */
const screen = (v, zoom) => { const big = !PHONES.includes(v) && !TABLETS.includes(v) && zoom; return `<span class="s${PHONES.includes(v) ? ' is--m' : TABLETS.includes(v) ? ' is--t' : ''}${v === 'legacy' ? ' is--old' : ''}${big ? ' is--zoom' : ''}"${big ? ` style="--zm:${zoom[0]};--fx:${zoom[1]};--fy:${zoom[2]}"` : ''}>${V[v] ? V[v]() : ''}</span>`; };
const near = z => z && [1 + (z[0] - 1) * 0.45, z[1], z[2]];
const ACT_THEME = { buy: 'light', stock: 'violet', sell: 'black', grow: 'volt' };
const fmtIN = n => new Intl.NumberFormat('en-IN').format(Math.round(n));
const rs = n => '₹' + fmtIN(n);
const lakh = n => (n >= 1e7 ? '₹' + (n / 1e7).toFixed(2).replace(/\.?0+$/, '') + ' crore' : n >= 1e5 ? '₹' + (n / 1e5).toFixed(1).replace(/\.0$/, '') + ' lakh' : rs(n));
const srcA = id => { const s = C.sources[id]; if (!s) return ''; const t = esc(s[0].split(':')[0]); return s[1] ? `<a href="${esc(s[1])}" target="_blank" rel="noopener">${t}</a>` : `<span class="src-plain">${t}</span>`; };
const portrait = (p, w = 640, h = 800) => `https://images.pexels.com/photos/${p.img}/pexels-photo-${p.img}.jpeg?auto=compress&cs=tinysrgb&fit=crop&crop=focalpoint&fp-x=${p.fp[0]}&fp-y=${p.fp[1]}&fp-z=${p.fp[2]}&w=${w}&h=${h}`;
const photo = p => `<span class="person-card__init" aria-hidden="true">${esc(p.first[0])}</span><img src="${esc(portrait(p))}" alt="" decoding="async" loading="lazy" draggable="false" onerror="this.remove()">`;
let stageSlider = null, stageActive = -1, personIndex = 0;

/* ---------- Hero ring: the eight steps, three times round ---------- */
function renderRadial() {
  const all = ST.concat(ST, ST), list = $('#radial-list');
  list.style.setProperty('--step', (360 / all.length) + 'deg');
  list.innerHTML = all.map((s, i) => {
    const dup = i >= ST.length, k = i % ST.length;
    return `<div class="radial__item" style="--i:${i}"${dup ? ' aria-hidden="true"' : ''}><button class="radial__card" type="button" data-stage="${k}"${dup ? ' tabindex="-1"' : ''} aria-label="Step ${s.n}, ${esc(s.name)}: ${esc(s.line)}"><span class="media">${screen(s.vis, s.zoom)}</span><span class="radial__info"><span class="radial__name">${esc(s.name)}</span><span class="eyebrow">${s.n}</span></span></button></div>`;
  }).join('');
}
function renderTicker() {
  $('#reel-ticker').innerHTML = `<span class="reel__ticker-track">${ST.concat(ST[0]).map(s => `<span><i>${s.n}</i>${esc(s.name)}</span>`).join('')}</span>`;
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

/* ---------- 01 The gap ---------- */
function renderChain(mode) {
  const os = mode === 'os', rows = C.chain[mode];
  $('#chain').innerHTML = rows.map((r, i) => {
    const mark = r.typed
      ? (os ? `<span class="chain__mark is--once">${kicon('keyboard', '')}Typed once</span>` : `<span class="chain__mark is--typed">${i ? 'typed again!' : 'typed'}</span>`)
      : (os ? `<span class="chain__mark is--flow"><svg viewBox="0 0 16 16" aria-hidden="true"><use href="#i-check"/></svg>Flows by itself</span>` : '');
    return `<li class="${r.typed ? 'is--typed' : ''}" style="--k:${i}"><span class="chain__n">${pad(i + 1)}</span><h3>${esc(r.t)}</h3><p>${esc(r.s)}</p>${mark}</li>`;
  }).join('');
  const n = rows.filter(r => r.typed).length;
  $('#chain-n').textContent = n;
  $('#chain-w').textContent = n === 1 ? 'time' : 'times';
}
function initChain() {
  const box = $('.chainbox');
  $$('[data-chain]', box).forEach(b => b.addEventListener('click', () => {
    const m = b.dataset.chain;
    box.dataset.mode = m;
    $$('[data-chain]', box).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    renderChain(m);
  }));
}

/* ---------- 02 Today's software ---------- */
function renderToday() {
  $('#notes').innerHTML = C.notes.map(n => `<div class="note"><span class="tag" data-theme="haze">${esc(n.k)}</span><h3 class="h-xs">${esc(n.t)}</h3><p>${esc(n.s)}</p></div>`).join('');
  $('#stack').innerHTML = C.stack.map(s => `<li><span class="eyebrow">${esc(s.k)}</span><div class="stack__chips">${s.v.map(v => `<span>${esc(v)}</span>`).join('')}</div></li>`).join('');
  $('#rivals').innerHTML = C.rivals.map(r => `<li class="rv"><div class="rv__top"><span class="tag" data-theme="glass" data-shape="round">${esc(r.kind)}</span><h4 class="h-s">${esc(r.n)}</h4><p class="p-s">${esc(r.from)}</p></div>
    <div class="rv__big"><b>${esc(r.big)}</b><span>${esc(r.bigL)}</span></div>
    <dl><div><dt>Best at</dt><dd>${esc(r.best)}</dd></div><div><dt>Weak spot</dt><dd>${esc(r.weak)}</dd></div><div class="is--win"><dt>We win on</dt><dd>${esc(r.win)}</dd></div></dl>
    <div class="rv__foot"><p class="rv__price"><b>Price, published</b>${esc(r.price)}</p><p class="srcs">${r.src.map(srcA).join('')}</p></div></li>`).join('');
  const word = ['Not found in public material', 'Partial, add-on or higher plan', 'Documented'];
  $('#matrix').innerHTML = `<thead><tr><th scope="col"><span class="sr-only">Feature</span></th>${C.matrixCols.map((c, i) => `<th scope="col"${i === 0 ? ' class="is--us"' : ''}>${esc(c)}</th>`).join('')}</tr></thead><tbody>${C.matrix.map(([f, v]) => `<tr><th scope="row">${esc(f)}</th>${v.map((x, i) => `<td${i === 0 ? ' class="is--us"' : ''}><i class="dotm is--${x}" role="img" aria-label="${word[x]}"></i></td>`).join('')}</tr>`).join('')}</tbody>`;
  /* Map: one row per level of typing removed (top = most), bars are published yearly price ranges on a ₹0 to ₹50,000 scale */
  const MAX = 50;
  const rows = [3, 2, 1, 0].map(y => {
    const bars = C.map.filter(m => m.y === y).map(m => {
      const l = m.lo / MAX * 100, w = (m.hi - m.lo) / MAX * 100;
      const inside = l + w > 72;
      return `<div class="mp__bar${m.us ? ' is--us' : ''}${inside ? ' is--in' : ''}" style="--l:${l.toFixed(1)}%;--w:${w.toFixed(1)}%"><span>${esc(m.n)}${m.us ? ' · target' : ''}</span></div>`;
    }).join('');
    return `<div class="mp__row"><p class="mp__lvl"><b>Level ${y}</b>${esc(C.mapY[y])}</p><div class="mp__track">${bars}</div></div>`;
  }).join('');
  $('#map').innerHTML = `<div class="mp">${rows}<div class="mp__axis"><span>Price a store, a year</span><div class="mp__ticks"><span>₹0</span><span>₹10k</span><span>₹20k</span><span>₹30k</span><span>₹40k</span><span>₹50k</span></div></div></div>`;
}
/* Compare slider: drag, or use the arrow keys */
function initCmp() {
  const el = $('#cmp'), h = $('.cmp__handle', el);
  let x = 50, drag = false;
  const set = v => { x = clamp(v, 4, 96); el.style.setProperty('--x', x + '%'); h.setAttribute('aria-valuenow', String(Math.round(x))); h.setAttribute('aria-valuetext', `${Math.round(x)}% typical screen, ${Math.round(100 - x)}% Pharmacy OS`); };
  const at = e => { const r = el.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
  el.addEventListener('pointerdown', e => { if (e.button !== 0) return; drag = true; el.setPointerCapture(e.pointerId); at(e); });
  el.addEventListener('pointermove', e => { if (drag) at(e); });
  const end = () => { drag = false; };
  el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  h.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { e.preventDefault(); set(x - 5); } if (e.key === 'ArrowRight') { e.preventDefault(); set(x + 5); } if (e.key === 'Home') { e.preventDefault(); set(4); } if (e.key === 'End') { e.preventDefault(); set(96); } });
  set(50);
  /* A slow sweep the first time it is seen, so nobody misses that it moves */
  if (!reduce) onVisible(el, (v, io) => {
    if (!v) return; io.disconnect();
    const t0 = performance.now(), dur = 2200;
    const step = now => { if (drag) return; const p = Math.min(1, (now - t0) / dur); set(50 + Math.sin(p * Math.PI * 2) * 22 * (1 - p * 0.3)); if (p < 1) requestAnimationFrame(step); else set(50); };
    requestAnimationFrame(step);
  }, { threshold: 0.6 });
}

/* ---------- 03 One flow ---------- */
function renderStages() {
  $('#stage-nav').innerHTML = ST.map((s, i) => `<button class="btn" type="button" data-theme="haze" data-go-stage="${i}" aria-pressed="false"><span class="btn__label"><span class="eyebrow">${s.n}</span> ${esc(s.name)}</span></button>`).join('');
  $('#stage-cards').innerHTML = ST.map((s, i) => `<div class="gslider__item" data-i="${i}"><article class="stage-card is--${ACT_THEME[s.act]}" aria-label="Step ${s.n}: ${esc(s.name)}"><span class="media">${screen(s.vis, s.zoom)}</span><div class="stage-card__top"><div class="tag-pair"><span class="tag">${esc(ACT(s.act).name)}</span><span class="tag" data-shape="round">${s.n} / 08</span></div>${kicon(s.icon)}</div><div class="stage-card__num" aria-hidden="true">${s.n}</div><div class="stage-card__body"><h3 class="h-m">${esc(s.name)}</h3><p class="p-m">${esc(s.line)}</p><p class="stage-card__out">${esc(s.gives)}</p></div></article></div>`).join('');
}
function setStage(i) {
  if (i === stageActive) return;
  stageActive = i;
  const s = ST[i], a = ACT(s.act);
  $('#stage-detail').innerHTML = `<div class="sd"><div class="sd__head"><span class="sd__num">${s.n} / 08 · ${esc(a.name)} · ${esc(a.sub)}</span><h3 class="h-m">${esc(s.name)}</h3><p class="sd__out">${esc(s.line)}</p></div><div class="sd__lanes"><div class="sd__lane"><h4>Who</h4><div class="sd__who">${kicon(s.icon)}<p class="h-xs">${esc(s.who)}</p></div></div><div class="sd__lane"><h4>What happens</h4><ul class="dl">${s.what.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div><div class="sd__lane is--kb"><h4>Today</h4><p class="h-xs"><s>${esc(s.today)}</s></p></div><div class="sd__lane is--get"><h4>Gives back</h4><p class="h-xs">${esc(s.gives)}</p></div></div></div>`;
  $$('#stage-nav [data-go-stage]').forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
  $$('#stage-cards .gslider__item').forEach((it, k) => it.setAttribute('aria-current', k === i ? 'true' : 'false'));
}
function initStageSlider() {
  const coll = $('#flow .gslider__collection'), list = $('#stage-cards');
  const items = $$('.gslider__item', list), N = items.length;
  let snaps = [], current = 0, move = () => {};
  const go = i => { i = clamp(i, 0, N - 1); setStage(i); current = i; move(i); };
  coll.setAttribute('tabindex', '0');
  coll.setAttribute('aria-label', 'Steps. Use the left and right arrow keys to move between steps.');
  coll.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); } });
  $('#stage-nav').addEventListener('click', e => { const b = e.target.closest('[data-go-stage]'); if (b) go(+b.dataset.goStage); });
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
    onDrag() { dragged = true; render(); const i = nearest(this.x); if (i !== current) { current = i; setStage(i); } },
    onThrowUpdate() { render(); const i = nearest(this.x); if (i !== current) { current = i; setStage(i); } },
    onRelease() { if (!hasInertia && dragged) { const i = nearest(this.x); current = i; setStage(i); move(i); } },
    onClick(e) { if (dragged) return; const it = e.target.closest('.gslider__item'); if (it) go(+it.dataset.i); }
  })[0];
  window.addEventListener('resize', () => { measure(); drag.applyBounds({ minX: snaps[N - 1], maxX: snaps[0] }); gsap.set(list, { x: snaps[current] }); render(); });
  return { go };
}

/* ---------- 04 Try it: a working sketch of Order and Receive ---------- */
function initDemo() {
  const root = $('#demo');
  if (!root) return;
  const L = {
    en: { order: 'Order', recv: 'Receive', langL: 'Language', reset: 'Start again', add: 'Add a medicine', ph: 'Type three letters, like “par”', hist: 'From your own history', low: 'Running low in your shop', have: n => `You have ${n}`, usual: n => `You usually order ${n}`, newMed: q => `Add “${q}” as a new medicine`, saved: 'Saved for next time', inOrder: 'In the order', tip: 'Try “par”, “met”, or a wrong spelling like “amoxilin”.', toOrder: 'This order', items: n => `${n} ${n === 1 ? 'medicine' : 'medicines'}`, about: 'about', send: 'Send on WhatsApp', empty: 'Nothing here yet. Add a medicine.', sentT: 'Sent on WhatsApp', sentMsg: n => `Order 1042 from ${STORE}. ${n} ${n === 1 ? 'medicine' : 'medicines'}, with a PDF and a link.`, reply: '5 available. Pantoprazole: only 6.', arrived: 'The goods have arrived', recvT: 'Receive order 1042', recvS: `${DIST}, their bill KP/3391`, imp: 'Import the bill file', impDone: 'KP-3391.xlsx read. 6 lines laid beside your order.', tickAll: 'Tick all that match', of: 'of', scan: 'Scan the pack', short: n => `Short by ${n}. Credit note asked.`, soon: 'Expires in 4 months.', keep: 'Keep', back: 'Send back', kept: 'Kept. Expiry alert set.', sentBack: 'Sent back. Return noted.', needScan: 'Scan the pack to read batch and expiry', match: 'Matches the order', wait: 'Not checked yet', checked: (a, b) => `${a} of ${b} checked`, addStock: 'Add to stock', doneT: 'In stock. Nothing typed.', d1: n => `${n} medicines added to stock, by batch`, d2: 'Purchase entry made by itself', d3: a => `${a} to pay by 7 November`, d4: '4 strips short: credit note asked', d5a: 'Expiry alert set for Cetirizine', d5b: '1 medicine sent back: return noted', fields: 'Fields typed', fNote: 'The same bill, typed by hand: 6 lines × 7 fields.', again: 'Do it again', taps: 'Taps', secs: 'Seconds', isNew: 'New', arrivedA: 'Arrived', pack: 'New medicine', size: 'Text size', smaller: 'Small text', mid: 'Medium text', larger: 'Large text', remove: 'Remove', less: 'One less', more: 'One more', cMed: 'Medicine', cBatch: 'Batch', cExp: 'Expires', cSt: 'Status' },
    te: { order: 'ఆర్డర్', recv: 'వచ్చిన సరుకు', langL: 'భాష', reset: 'మళ్లీ మొదలు', add: 'మందు చేర్చండి', ph: 'మూడు అక్షరాలు టైప్ చేయండి, ఉదా: “par”', hist: 'మీరు ఇంతకు ముందు వాడినవి', low: 'మీ షాపులో తక్కువగా ఉన్నవి', have: n => `మీ దగ్గర ${n} ఉన్నాయి`, usual: n => `సాధారణంగా ${n} ఆర్డర్ చేస్తారు`, newMed: q => `“${q}” కొత్త మందుగా చేర్చు`, saved: 'తర్వాత కోసం సేవ్ అవుతుంది', inOrder: 'ఆర్డర్‌లో ఉంది', tip: '“par”, “met” లేదా తప్పు స్పెల్లింగ్ “amoxilin” ప్రయత్నించండి.', toOrder: 'ఈ ఆర్డర్', items: n => `${n} మందులు`, about: 'సుమారు', send: 'వాట్సాప్‌లో పంపు', empty: 'ఇంకా ఏమీ లేదు. మందు చేర్చండి.', sentT: 'వాట్సాప్‌లో పంపాం', sentMsg: n => `${STORE} నుండి ఆర్డర్ 1042. ${n} మందులు, PDF మరియు లింక్‌తో.`, reply: '5 ఉన్నాయి. Pantoprazole: 6 మాత్రమే.', arrived: 'సరుకు వచ్చింది', recvT: 'వచ్చిన సరుకు: ఆర్డర్ 1042', recvS: `${DIST}, వారి బిల్ KP/3391`, imp: 'బిల్ ఫైల్ దిగుమతి చేయి', impDone: 'KP-3391.xlsx చదివాం. 6 లైన్లు మీ ఆర్డర్ పక్కన పెట్టాం.', tickAll: 'సరిపోయినవన్నీ టిక్ చేయి', of: '/', scan: 'ప్యాక్ స్కాన్ చేయి', short: n => `${n} తక్కువ వచ్చాయి. క్రెడిట్ నోట్ అడిగాం.`, soon: '4 నెలల్లో గడువు ముగుస్తుంది.', keep: 'ఉంచు', back: 'వెనక్కి పంపు', kept: 'ఉంచాం. గడువు హెచ్చరిక పెట్టాం.', sentBack: 'వెనక్కి పంపాం. రిటర్న్ నమోదైంది.', needScan: 'బ్యాచ్, గడువు కోసం ప్యాక్ స్కాన్ చేయండి', match: 'ఆర్డర్‌తో సరిపోయింది', wait: 'ఇంకా చూడలేదు', checked: (a, b) => `${b} లో ${a} పూర్తి`, addStock: 'స్టాక్‌లో చేర్చు', doneT: 'స్టాక్‌లో చేరింది. ఏమీ టైప్ చేయలేదు.', d1: n => `${n} మందులు బ్యాచ్ వారీగా స్టాక్‌లో చేరాయి`, d2: 'కొనుగోలు ఎంట్రీ దానంతట అదే అయింది', d3: a => `${a}, 7 నవంబర్ లోపు చెల్లించాలి`, d4: '4 స్ట్రిప్‌లు తక్కువ: క్రెడిట్ నోట్ అడిగాం', d5a: 'Cetirizine కు గడువు హెచ్చరిక పెట్టాం', d5b: '1 మందు వెనక్కి పంపాం: రిటర్న్ నమోదైంది', fields: 'టైప్ చేసిన ఫీల్డ్‌లు', fNote: 'అదే బిల్ చేత్తో టైప్ చేస్తే: 6 లైన్లు × 7 ఫీల్డ్‌లు.', again: 'మళ్లీ చేయి', taps: 'ట్యాప్‌లు', secs: 'సెకన్లు', isNew: 'కొత్త', arrivedA: 'వచ్చింది', pack: 'కొత్త మందు', size: 'అక్షరాల పరిమాణం', smaller: 'చిన్న అక్షరాలు', mid: 'మధ్యస్థ అక్షరాలు', larger: 'పెద్ద అక్షరాలు', remove: 'తీసివేయి', less: 'ఒకటి తగ్గించు', more: 'ఒకటి పెంచు', cMed: 'మందు', cBatch: 'బ్యాచ్', cExp: 'గడువు', cSt: 'స్థితి' }
  };
  /* The shop's history: name, pack, in stock, usual order, last rate, other spellings people type, pack photo */
  const HIST = [
    { n: 'Paracetamol 650 mg', p: 'Strip of 15', have: 4, usual: 20, rate: 18.4, k: 'parasitamol pcm', img: 13105348 },
    { n: 'Paracetamol 500 mg', p: 'Strip of 10', have: 22, usual: 10, rate: 9.6, k: 'parasitamol pcm', img: 3683039 },
    { n: 'Pantoprazole 40 mg', p: 'Strip of 15', have: 3, usual: 10, rate: 58, k: 'pantaprazol gas', img: 4210613 },
    { n: 'Amoxicillin 500 mg', p: 'Strip of 10', have: 6, usual: 10, rate: 62.1, k: 'amoxilin amoxycillin', img: 9742749, f: 'pill' },
    { n: 'Metformin 500 mg SR', p: 'Strip of 15', have: 7, usual: 15, rate: 24.9, k: 'metformine sugar', img: 4226771 },
    { n: 'Telmisartan 40 mg', p: 'Strip of 15', have: 9, usual: 12, rate: 71.5, k: 'telmisartin bp', img: 9742748 },
    { n: 'Cetirizine 10 mg', p: 'Strip of 10', have: 12, usual: 10, rate: 11.2, k: 'cetrizine cold', img: 5995306 },
    { n: 'Atorvastatin 10 mg', p: 'Strip of 10', have: 14, usual: 10, rate: 42.3, k: 'atorvastatine', img: 3683113, f: 'pill' },
    { n: 'Azithromycin 500 mg', p: 'Strip of 3', have: 5, usual: 10, rate: 68.9, k: 'azithromicin', img: 3923166 },
    { n: 'ORS sachet', p: 'Box of 25', have: 2, usual: 4, rate: 310, k: 'oral', f: 'sachet' },
    { n: 'Vitamin D3 60K', p: 'Strip of 4', have: 6, usual: 10, rate: 83, k: 'vitamin d', img: 7277984, f: 'drop' }
  ];
  /* The order that arrives: [history index, ordered, came, batch, expiry] */
  const ARR = [[0, 20, 20, 'PK2291', '08/2028'], [3, 10, 10, 'AX7730', '03/2028'], [4, 15, 15, 'MF1184', '11/2027'], [5, 12, 12, 'TL5521', '06/2028'], [2, 10, 6, 'PZ0917', '01/2028'], [6, 10, 10, 'CT3340', '02/2027']];
  const fresh = () => ({ tab: 'order', sent: false, order: [{ i: 3, qty: 10 }, { i: 4, qty: 15 }], rows: ARR.map(() => ({ s: 'todo', scanned: false })), imp: false, done: false, taps: 0, t0: 0, t1: 0 });
  let st = fresh(), lang = 'en', z = 1, timer = 0;
  const t = () => L[lang];
  const svg = (id, k) => `<svg viewBox="0 0 ${k ? 24 : 16} ${k ? 24 : 16}" aria-hidden="true"><use href="#${k ? 'k' : 'i'}-${id}"/></svg>`;
  const pic = h => `<i class="u-ph"${h.img ? ` style="--img:url(${PEX(h.img)})"` : ''}>${svg(h.f || 'strip', 1)}</i>`;
  const dist = (a, b) => { const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i]); for (let j = 1; j <= n; j++) d[0][j] = j; for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; };
  const find = q => {
    q = q.trim().toLowerCase();
    if (!q) return [];
    return HIST.map((h, i) => {
      const words = (h.n + ' ' + h.k).toLowerCase().split(/\s+/);
      let score = 9;
      if (h.n.toLowerCase().startsWith(q)) score = 0;
      else if (words.some(w => w.startsWith(q))) score = 1;
      else if (h.n.toLowerCase().includes(q)) score = 2;
      else if (q.length >= 4 && words.some(w => w.length >= 4 && dist(q, w.slice(0, Math.max(q.length, 4))) <= (q.length >= 7 ? 2 : 1))) score = 3;
      return { i, score };
    }).filter(x => x.score < 9).sort((a, b) => a.score - b.score || a.i - b.i).slice(0, 4).map(x => x.i);
  };
  const total = () => st.order.reduce((s, o) => s + HIST[o.i].rate * o.qty, 0) * 1.05;
  const resolved = () => st.rows.filter(r => r.s !== 'todo').length;
  const secs = () => (st.t0 ? Math.round(((st.t1 || performance.now()) - st.t0) / 1000) : 0);

  function optHTML(i) {
    const h = HIST[i], inO = st.order.some(o => o.i === i);
    return `<li role="none"><button class="dm__opt${inO ? ' is--have' : ''}" type="button" role="option" data-pick="${i}"${inO ? ' disabled' : ''}>${pic(h)}<span class="dm__optn"><b>${esc(h.n)}</b><small>${esc(h.isNew ? t().pack : h.p)}</small></span><em>${inO ? t().inOrder : `<b>${t().have(h.have)}</b><br>${t().usual(h.usual)}`}</em></button></li>`;
  }
  function listHTML(q) {
    const hits = find(q), clean = q.trim();
    if (!clean) return `<li class="dm__cap" role="presentation">${t().low}</li>` + HIST.map((h, i) => ({ h, i })).filter(x => x.h.have <= 4).slice(0, 3).map(x => optHTML(x.i)).join('');
    const exact = HIST.some(h => h.n.toLowerCase() === clean.toLowerCase());
    return (hits.length ? `<li class="dm__cap" role="presentation">${t().hist}</li>` + hits.map(optHTML).join('') : '')
      + (exact || clean.length < 3 ? '' : `<li role="none"><button class="dm__opt is--new" type="button" role="option" data-new="${esc(clean)}"><i class="dm__plus" aria-hidden="true">+</i><span class="dm__optn"><b>${esc(t().newMed(clean))}</b><small>${t().saved}</small></span></button></li>`);
  }
  function linesHTML() {
    if (!st.order.length) return `<p class="dm__empty">${t().empty}</p>`;
    return st.order.map((o, k) => { const h = HIST[o.i]; return `<li class="dm__line">${pic(h)}<div><b>${esc(h.n)}${h.isNew ? `<span class="is--newtag">${t().isNew}</span>` : ''}</b><small>${esc(h.isNew ? t().pack : h.p)}</small></div><div class="dm__step"><button type="button" data-qty="${k},-1" aria-label="${t().less}: ${esc(h.n)}">−</button><b aria-live="polite">${o.qty}</b><button type="button" data-qty="${k},1" aria-label="${t().more}: ${esc(h.n)}">+</button></div><button class="dm__x" type="button" data-rm="${k}" aria-label="${t().remove}: ${esc(h.n)}">${svg('x')}</button></li>`; }).join('');
  }
  function orderHTML() {
    if (st.sent) return `<div class="dm__sent"><section class="dm__tray"><header><span>${t().sentT}</span><em>${esc(DIST)}</em></header><div class="dm__card dm__chat"><p class="dm__bubble is--out">${esc(t().sentMsg(st.order.length))}</p><p class="dm__bubble"><b>${esc(DIST)}</b><br>${t().reply}</p></div></section><div class="dm__act"><p>${t().recvS}</p><button class="dm__btn" type="button" data-tab="recv">${t().arrived}${svg('arrow', 1)}</button></div></div>`;
    return `<div class="dm__order"><section class="dm__tray"><header><label for="dm-q">${t().add}</label></header><div class="dm__card"><div class="dm__search">${svg('search', 1)}<input id="dm-q" type="text" inputmode="search" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(t().ph)}" role="combobox" aria-expanded="true" aria-controls="dm-list" aria-autocomplete="list"></div><ul class="dm__list" id="dm-list" role="listbox" aria-label="${esc(t().hist)}">${listHTML('')}</ul><p class="dm__tip">${svg('info', 1)}${t().tip}</p></div></section>
      <section class="dm__tray"><header><span>${t().toOrder}</span><em>${esc(DIST)}</em></header><div class="dm__card"><ul class="dm__lines" id="dm-lines">${linesHTML()}</ul></div></section></div>
      <div class="dm__act"><p id="dm-sum"></p><button class="dm__btn" type="button" data-send>${svg('send', 1)}${t().send}</button></div>`;
  }
  function rowHTML(a, k) {
    const h = HIST[a[0]], r = st.rows[k], short = a[2] < a[1], scan = k === 5;
    const on = r.s === 'ok', back = r.s === 'back';
    const be = scan && !r.scanned ? `<button class="dm__btn is--ghost is--sm" type="button" data-scan="${k}">${svg('qr', 1)}${t().scan}</button>` : `<span>${a[3]}</span><span>${a[4]}</span>`;
    let stat = on ? `<div class="dm__st is--ok"><span>${svg('tick', 1)}${t().match}</span></div>` : `<div class="dm__st is--wait"><span>${t().wait}</span></div>`;
    if (short) stat = `<div class="dm__st is--bad"><span>${svg('alert', 1)}${t().short(a[1] - a[2])}</span></div>`;
    if (scan && !r.scanned) stat = `<div class="dm__st is--warn"><span>${svg('qr', 1)}${t().needScan}</span></div>`;
    if (scan && r.scanned && r.s === 'todo') stat = `<div class="dm__st is--warn"><span>${svg('clock', 1)}${t().soon}</span><button class="dm__btn is--sm" type="button" data-keep="${k}">${t().keep}</button><button class="dm__btn is--ghost is--sm" type="button" data-back="${k}">${t().back}</button></div>`;
    if (scan && on) stat = `<div class="dm__st is--warn"><span>${svg('clock', 1)}${t().kept}</span></div>`;
    if (back) stat = `<div class="dm__st"><span>${svg('undo', 1)}${t().sentBack}</span></div>`;
    return `<li class="dm__r${on ? ' is--on' : ''}${short ? ' is--short' : ''}${scan && r.scanned && !back ? ' is--soon' : ''}${back ? ' is--back' : ''}"><button class="dm__tick" type="button" role="checkbox" aria-checked="${on}" data-tick="${k}" aria-label="${t().arrivedA}: ${esc(h.n)}"${scan || back ? ' disabled' : ''}>${svg('check')}</button><div class="dm__name">${pic(h)}<div><b>${esc(h.n)}</b><small>${esc(h.p)}</small></div></div><div class="dm__qty"><b>${a[2]}</b> <span>${t().of} ${a[1]}</span></div><div class="dm__be">${be}</div>${stat}</li>`;
  }
  function recvHTML() {
    if (st.done) {
      const backd = st.rows[5].s === 'back', n = backd ? 5 : 6;
      const amt = ARR.reduce((s, a, k) => s + (st.rows[k].s === 'ok' ? HIST[a[0]].rate * a[2] : 0), 0) * 1.05;
      return `<div class="dm__done"><section class="dm__tray"><header><span>${t().doneT}</span></header><div class="dm__card"><ul class="dm__ok"><li>${t().d1(n)}</li><li>${t().d2}</li><li>${t().d3(rs(amt))}</li><li>${t().d4}</li><li>${backd ? t().d5b : t().d5a}</li></ul></div></section><div class="dm__score"><div><p>${t().fields}</p><b class="is--big">0 <span>/ 42</span></b></div><p>${t().fNote}</p><button class="dm__btn" type="button" data-reset>${t().again}</button></div></div>`;
    }
    const all = resolved() === ARR.length;
    return `<section class="dm__tray"><header><span>${t().recvT}</span><em>${esc(t().recvS)}</em><span class="dm__hbtns"><button class="dm__btn is--sm${!st.imp && resolved() ? ' is--ghost' : ''}" type="button" data-imp${st.imp ? ' disabled' : ''}>${svg('upload', 1)}${t().imp}</button><button class="dm__btn is--ghost is--sm" type="button" data-all>${svg('ticks', 1)}${t().tickAll}</button></span></header><div class="dm__card is--flush">${st.imp ? `<p class="dm__imp">${svg('tick', 1)}${t().impDone}</p>` : ''}<div class="dm__r is--h" aria-hidden="true"><span></span><span>${t().cMed}</span><span>${t().arrivedA}</span><span class="dm__be"><span>${t().cBatch}</span><span>${t().cExp}</span></span><span>${t().cSt}</span></div><ul class="dm__rows">${ARR.map(rowHTML).join('')}</ul></div></section>
      <div class="dm__act"><p aria-live="polite"><b>${t().checked(resolved(), ARR.length)}</b></p><button class="dm__btn" type="button" data-stock${all ? '' : ' disabled'}>${t().addStock}${svg('arrow', 1)}</button></div>`;
  }
  function sum() { const el = $('#dm-sum', root); if (el) el.innerHTML = `<b>${t().items(st.order.length)}</b>${st.order.length ? `, ${t().about} ${rs(total())}` : ''}`; const b = $('[data-send]', root); if (b) b.disabled = !st.order.length; }
  function meter() { const m = $('.dm__meter', root); if (!m) return; m.hidden = st.tab !== 'recv'; m.innerHTML = `<span>${t().fields} <b>0</b> / 42</span><span>${t().taps} <b>${st.taps}</b></span><span>${t().secs} <b id="dm-secs">${secs()}</b></span>`; }
  function body() { $('.dm__body', root).innerHTML = st.tab === 'order' ? orderHTML() : recvHTML(); sum(); meter(); }
  function shell() {
    root.dataset.lang = lang;
    root.lang = lang;
    root.classList.add('u');
    root.style.setProperty('--z', String(z));
    root.innerHTML = `<div class="dm__bar"><div class="dm__brand"><i class="a-logo"><svg viewBox="0 0 80 80" aria-hidden="true"><use href="#i-capsule"/></svg></i><span><b>Pharmacy OS</b><small>${STORE}</small></span></div><div class="dm__tabs" role="tablist"><button type="button" role="tab" data-tab="order" aria-selected="${st.tab === 'order'}"><i>1</i>${t().order}</button><button type="button" role="tab" data-tab="recv" aria-selected="${st.tab === 'recv'}"><i>2</i>${t().recv}</button></div><div class="dm__tools"><div class="dm__seg" role="group" aria-label="${t().langL}"><button type="button" data-lang="en" lang="en" aria-pressed="${lang === 'en'}">English</button><button type="button" data-lang="te" lang="te" aria-pressed="${lang === 'te'}">తెలుగు</button></div><div class="dm__seg is--aa" role="group" aria-label="${t().size}">${[1, 1.15, 1.3].map((v, i) => `<button type="button" data-z="${v}" aria-pressed="${z === v}" aria-label="${[t().smaller, t().mid, t().larger][i]}">A</button>`).join('')}</div><button class="dm__pill" type="button" data-reset>${svg('undo', 1)}${t().reset}</button></div></div><div class="dm__body" role="tabpanel"></div><div class="dm__meter" hidden></div>`;
    body();
  }
  root.addEventListener('input', e => { if (e.target.id === 'dm-q') $('#dm-list', root).innerHTML = listHTML(e.target.value); });
  root.addEventListener('keydown', e => {
    if (e.target.id !== 'dm-q') return;
    if (e.key === 'Enter') { e.preventDefault(); const first = $('#dm-list button:not([disabled])', root); if (first) first.click(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); const first = $('#dm-list button:not([disabled])', root); if (first) first.focus(); }
  });
  root.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    const d = b.dataset;
    if (st.tab === 'recv' && !st.done && !('z' in d) && !('lang' in d) && !('tab' in d) && !('reset' in d)) { st.taps++; if (!st.t0) { st.t0 = performance.now(); clearInterval(timer); timer = setInterval(() => { const el = $('#dm-secs', root); if (el && !st.t1) el.textContent = secs(); }, 1000); } }
    if ('z' in d) { z = +d.z; shell(); return; }
    if ('lang' in d) { lang = d.lang; shell(); return; }
    if ('reset' in d) { clearInterval(timer); st = fresh(); shell(); return; }
    if ('tab' in d) { st.tab = d.tab; shell(); return; }
    if ('pick' in d) { const i = +d.pick; st.order.push({ i, qty: HIST[i].usual }); }
    if ('new' in d) { const name = d.new.replace(/\b\w/g, c => c.toUpperCase()); HIST.push({ n: name, p: '', have: 0, usual: 5, rate: 0, k: '', isNew: true }); st.order.push({ i: HIST.length - 1, qty: 5 }); }
    if ('pick' in d || 'new' in d) { const q = $('#dm-q', root); q.value = ''; $('#dm-list', root).innerHTML = listHTML(''); $('#dm-lines', root).innerHTML = linesHTML(); sum(); q.focus({ preventScroll: true }); return; }
    if ('qty' in d) { const [k, dv] = d.qty.split(',').map(Number); st.order[k].qty = clamp(st.order[k].qty + dv, 1, 999); $('#dm-lines', root).innerHTML = linesHTML(); sum(); return; }
    if ('rm' in d) { st.order.splice(+d.rm, 1); $('#dm-lines', root).innerHTML = linesHTML(); $('#dm-list', root).innerHTML = listHTML($('#dm-q', root).value); sum(); return; }
    if ('send' in d) { st.sent = true; body(); return; }
    if ('tick' in d) { const r = st.rows[+d.tick]; r.s = r.s === 'ok' ? 'todo' : 'ok'; }
    if ('all' in d) st.rows.forEach((r, k) => { if (k < 4) r.s = 'ok'; });
    if ('imp' in d) { st.imp = true; st.rows.forEach((r, k) => { if (k < 4) r.s = 'ok'; }); st.rows[5].scanned = true; }
    if ('scan' in d) st.rows[+d.scan].scanned = true;
    if ('keep' in d) st.rows[+d.keep].s = 'ok';
    if ('back' in d) st.rows[+d.back].s = 'back';
    if ('stock' in d) { st.done = true; st.t1 = performance.now(); clearInterval(timer); }
    body();
  });
  shell();
}

/* ---------- 05 Distributor ---------- */
function renderLadder() {
  $('#ladder').innerHTML = C.ladder.map((l, i) => `<li class="ld${i === 0 ? ' is--now' : ''}"><span class="ld__n" aria-hidden="true">${l.n}</span><div class="ld__body"><div class="ld__head"><span class="tag"${i === 0 ? ' data-theme="volt"' : ' data-theme="haze"'} data-shape="round">${esc(l.tag)}</span><h3 class="h-s">${esc(l.t)}</h3><span class="p-s">${esc(l.when)}</span></div><p class="ld__line">${esc(l.line)}</p><ul class="ld__pts">${l.pts.map(p => `<li>${esc(p)}</li>`).join('')}</ul><dl class="ld__for"><div><dt>For the store</dt><dd>${esc(l.store)}</dd></div><div><dt>For the distributor</dt><dd>${esc(l.dist)}</dd></div><div><dt>For us</dt><dd>${esc(l.us)}</dd></div></dl></div></li>`).join('');
}

/* ---------- 06 One platform ---------- */
function initJobs() {
  const tabs = $('#job-tabs'), feats = $('#job-feats');
  let job = 0, feat = 0;
  tabs.innerHTML = C.jobs.map((j, i) => `<button class="jt" type="button" role="tab" data-job="${i}" aria-selected="${i === 0}"><i>${kicon(j.icon)}</i><b>${esc(j.name)}</b><span>${esc(j.line)}</span></button>`).join('');
  const paint = () => {
    $$('.jt', tabs).forEach((b, i) => b.setAttribute('aria-selected', String(i === job)));
    const n = C.jobs[job].f.length;
    feats.style.setProperty('--cols', String(n <= 5 ? n : Math.ceil(n / 2)));
    feats.innerHTML = C.jobs[job].f.map((f, i) => `<button class="jf" type="button" data-feat="${i}" aria-pressed="${i === feat}"><b>${esc(f[0])}</b><span>${esc(f[2])}</span></button>`).join('');
    const cur = $('#job-screen'); cur.outerHTML = `<span class="s" id="job-screen">${V[C.jobs[job].f[feat][1]]()}</span>`;
  };
  tabs.addEventListener('click', e => { const b = e.target.closest('[data-job]'); if (!b) return; job = +b.dataset.job; feat = 0; paint(); });
  feats.addEventListener('click', e => { const b = e.target.closest('[data-feat]'); if (!b) return; feat = +b.dataset.feat; paint(); });
  paint();
  $('#autos').innerHTML = C.autos.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('');
}

/* ---------- 07 One store or many ---------- */
function initStores() {
  const card = $('.stores__card'), net = $('#net');
  $('#rules').innerHTML = C.rules.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('');
  const D = ['Krishna Pharma', 'Godavari Dist.', 'Sri Venkat Pharma'];
  const swap = `<span class="net__swap" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#k-swap"/></svg></span>`;
  const paint = m => {
    card.dataset.mode = m; net.dataset.mode = m;
    $$('[data-stores]', card).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.stores === m)));
    const stores = m === 'one' ? `<div class="net__s"><b>Your store</b><small>Its own stock. Its own orders.</small></div>` : ['Main road', 'Bus stand', 'Hospital gate'].map(n => `<div class="net__s"><b>${n}</b><small>Own stock, own orders</small></div>`).join(swap);
    net.innerHTML = `<div class="net__row">${D.map(d => `<span class="net__d">${d}</span>`).join('')}</div><div class="net__wire"><span>Orders out · stock in</span></div><div class="net__row is--stores">${stores}</div><div class="net__wire"><span>${m === 'one' ? 'Every bill, live' : 'Rules down · numbers up'}</span></div><div class="net__row"><span class="net__o">${m === 'one' ? 'The owner’s phone' : 'The owner: rules, prices, approvals'}</span></div>`;
    $('#stores-screen').innerHTML = V[m === 'one' ? 'one' : 'multi']();
  };
  $$('[data-stores]', card).forEach(b => b.addEventListener('click', () => paint(b.dataset.stores)));
  paint('one');
}

/* ---------- Sliders ---------- */
const fillRange = el => el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100).toFixed(1) + '%');
function tweenText(el, to, fmt) {
  if (!el) return;
  const from = el._v == null ? to : el._v;
  cancelAnimationFrame(el._raf);
  if (reduce || from === to) { el._v = to; el.textContent = fmt(to); return; }
  const t0 = performance.now();
  const step = now => { const p = Math.min(1, (now - t0) / 420), e = 1 - Math.pow(1 - p, 3); el._v = from + (to - from) * e; el.textContent = fmt(el._v); if (p < 1) el._raf = requestAnimationFrame(step); };
  el._raf = requestAnimationFrame(step);
}
function bindRanges(ids, update) { const els = ids.map(id => $('#' + id)); els.forEach(el => el.addEventListener('input', () => { fillRange(el); update(); })); els.forEach(fillRange); update(); }

/* ---------- 08 Customers: what an offer costs ---------- */
function initCamp() {
  const r = $('#r-camp');
  bindRanges(['r-camp'], () => { const n = +r.value; $('#v-camp').textContent = fmtIN(n); tweenText($('#o-camp'), n * 0.8631 * 1.18, rs); });
  $('#app-points').innerHTML = C.appPoints.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('');
}

/* ---------- 10 Design for fifty-plus ---------- */
const UXD = {
  type: '<div class="ud ud--type"><s>Aa</s><b>Aa</b></div>',
  target: '<div class="ud ud--target"><i></i><i><svg viewBox="0 0 16 16" aria-hidden="true"><use href="#i-check"/></svg></i></div>',
  menu: '<div class="ud ud--menu"><span>Order</span><span>Receive</span><span>Stock</span><span>Bill</span><span>Customers</span><span>Reports</span></div>',
  words: '<div class="ud ud--words"><s>GRN</s><b>Stock received</b><span lang="te">వచ్చిన సరుకు</span></div>',
  search: '<div class="ud ud--search"><span>par</span><span>Paracetamol 650 mg</span></div>',
  undo: '<div class="ud ud--undo">Bill deleted <b>Undo</b></div>',
  colour: '<div class="ud ud--colour"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#k-alert"/></svg>Short by 4</div>',
  still: '<div class="ud ud--still"><i></i><i></i><i></i></div>'
};
function renderUX() {
  $('#evidence').innerHTML = C.evidence.map(e => `<li class="ev${e.big.length > 6 ? ' is--q' : ''}"><b class="ev__big">${esc(e.big)}</b><h4>${esc(e.t)}</h4><p>${esc(e.s)}</p>${srcA(e.src)}</li>`).join('');
  const li = ([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`;
  $('#rs-done').innerHTML = C.research.done.map(li).join('');
  $('#rs-next').innerHTML = C.research.next.map(li).join('');
  $('#people-list').innerHTML = C.people.map((p, i) => `<div class="flick__item" data-i="${i}"><article class="person-card" aria-label="${esc(p.first)}, ${p.at}: ${esc(p.name)}"><div class="person-card__photo">${photo(p)}<span class="person-card__age">${esc(p.first)}, ${p.at}</span><span class="person-card__go" aria-hidden="true"><svg viewBox="0 0 12 12"><use href="#i-arrow-ur"/></svg></span><p class="person-card__q">“${esc(p.quote)}”</p></div><div class="person-card__body"><h4 class="person-card__name">${esc(p.name)}</h4><p class="person-card__type">${esc(p.where)}</p><p class="person-card__where">Uses: ${esc(p.uses)}</p></div></article></div>`).join('');
  $('#people-faces').innerHTML = C.people.map((p, i) => `<button class="face" type="button" data-face="${i}" aria-pressed="false" aria-label="${esc(p.first)}, ${esc(p.name)}"><span style="background-image:url(${esc(portrait(p, 120, 120))})"></span></button>`).join('');
  $('#flows').innerHTML = C.flows.map(f => `<div class="fl"><div class="fl__head"><h4 class="h-s">${esc(f.name)}</h4><p class="fl__count"><s>${f.today.length}</s>${f.os.length}<span>steps</span></p></div><div class="fl__cols"><div class="fl__col"><span class="eyebrow">Today</span><ol>${f.today.map(s => `<li><span>${esc(s)}</span></li>`).join('')}</ol></div><div class="fl__col is--os"><span class="eyebrow">With Pharmacy OS</span><ol>${f.os.map(s => `<li><span>${esc(s)}</span></li>`).join('')}</ol></div></div></div>`).join('');
  $('#ux-rules').innerHTML = C.ux.map(u => `<li class="ur"><div class="ur__demo" aria-hidden="true">${UXD[u.demo]}</div><span class="ur__n">${u.n}</span><h4>${esc(u.t)}</h4><p>${esc(u.s)}</p></li>`).join('');
}
function personHTML(i) {
  const p = C.people[i], n = C.people.length, prev = C.people[(i - 1 + n) % n], next = C.people[(i + 1) % n];
  const facts = [['Where', p.where], ['Uses today', p.uses], ['Works on', p.device], ['Speaks', p.lang]];
  return `<div class="pmod"><div class="pmod__top"><div class="pmod__id"><div class="pmod__photo">${photo(p)}<p class="pmod__name">${esc(p.first)}, ${p.at}</p></div><dl class="pfacts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div>
    <div class="pmod__main"><div class="pmod__head"><div class="tag-pair"><span class="tag">Persona ${pad(i + 1)} / ${pad(n)}</span><span class="tag" data-theme="haze" data-shape="round">To test in interviews</span></div><h2 class="h-l" id="person-title">${esc(p.name)}</h2><p class="pmod__q">“${esc(p.quote)}”</p></div>
    <div class="pmod__cols"><div class="pmod__box"><span class="eyebrow">What they want</span><ul class="pmod__list is--want">${p.wants.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div><div class="pmod__box"><span class="eyebrow">What hurts today</span><ul class="pmod__list is--pain">${p.pains.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div>
    <div class="pmod__win"><span class="eyebrow">How we win them</span><p class="h-xs">${esc(p.win)}</p></div></div></div>
    <p class="pmod__note">A first sketch from store visits and desk research. The photo is a stock image, not a real customer.</p>
    <div class="pm__nav"><button class="btn" type="button" data-theme="haze" data-person-step="-1"><span class="btn__label">← ${esc(prev.name)}</span></button><button class="btn" type="button" data-theme="ink" data-person-step="1"><span class="btn__label">${esc(next.name)} →</span></button></div></div>`;
}
function openPerson(i, trigger) {
  personIndex = (i + C.people.length) % C.people.length;
  const body = $('#person-body');
  body.innerHTML = personHTML(personIndex);
  initButtons(body);
  body.scrollTop = 0;
  const m = $('.modal[data-modal="person"]');
  if (m.dataset.open !== 'true') openModal('person', trigger);
  else $('.modal__panel', m).focus({ preventScroll: true });
}
function initFlick() {
  const root = $('[data-flick]');
  const items = $$('.flick__item', root), n = items.length;
  let pos = 0, target = 0, dragging = false, raf = 0, shown = -1;
  const cardW = () => items[0].offsetWidth;
  const idx = v => ((Math.round(v) % n) + n) % n;
  const faces = $$('#people-faces .face'), openLabels = () => $$('[data-flick-open] .btn__label');
  function show(i) {
    if (i === shown) return;
    shown = i;
    const p = C.people[i];
    faces.forEach((b, k) => { b.classList.toggle('is--on', k === i); b.setAttribute('aria-pressed', String(k === i)); });
    openLabels().forEach(l => { l.textContent = `Meet ${p.first}`; });
    $('#people-count').textContent = `${p.first}, ${p.name}. Person ${i + 1} of ${n}.`;
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
    const step = () => { pos += (target - pos) * (reduce ? 1 : 0.14); if (Math.abs(target - pos) < 0.001) pos = target; layout(); if (pos !== target && !dragging) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  }
  const goTo = t => { target = t; animate(); };
  const nearestTarget = i => { let d = i - idx(target); if (d > n / 2) d -= n; if (d < -n / 2) d += n; return Math.round(target) + d; };
  let sx = 0, sp0 = 0, lastX = 0, lastT = 0, vx = 0, moved = false;
  root.addEventListener('pointerdown', e => { if (e.button !== 0) return; dragging = true; moved = false; sx = lastX = e.clientX; lastT = performance.now(); sp0 = pos; vx = 0; cancelAnimationFrame(raf); root.setPointerCapture(e.pointerId); });
  root.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 4) moved = true;
    const now = performance.now();
    vx = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now;
    pos = sp0 - dx / (cardW() * 0.7);
    layout();
  });
  root.addEventListener('pointerup', e => {
    if (!dragging) return;
    dragging = false;
    if (!moved) {
      const it = document.elementsFromPoint(e.clientX, e.clientY).map(el => el.closest && el.closest('.flick__item')).find(Boolean);
      if (it) { const i = +it.dataset.i; if (i === idx(pos)) openPerson(i, root); else goTo(nearestTarget(i)); } else goTo(Math.round(pos));
      return;
    }
    goTo(Math.round(pos - clamp(vx * 3, -2, 2)));
  });
  root.addEventListener('pointercancel', () => { dragging = false; goTo(Math.round(pos)); });
  root.setAttribute('tabindex', '0');
  root.setAttribute('aria-label', 'Personas. Use the left and right arrow keys to browse, Enter to open.');
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.round(target) + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.round(target) - 1); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPerson(idx(target), root); }
  });
  $('[data-flick-prev]').addEventListener('click', () => goTo(Math.round(target) - 1));
  $('[data-flick-next]').addEventListener('click', () => goTo(Math.round(target) + 1));
  $('[data-flick-open]').addEventListener('click', e => openPerson(idx(target), e.currentTarget));
  faces.forEach(b => b.addEventListener('click', () => goTo(nearestTarget(+b.dataset.face))));
  document.addEventListener('click', e => { const s = e.target.closest('[data-person-step]'); if (s) openPerson(personIndex + (+s.dataset.personStep)); });
  window.addEventListener('resize', layout);
  layout();
}

/* ---------- 11 What it gives back ---------- */
function initCalc() {
  const g = id => +$('#' + id).value;
  bindRanges(['r-bills', 'r-lines', 'r-sec', 'r-wage', 'r-exp', 'r-cut'], () => {
    const bills = g('r-bills'), lines = g('r-lines'), sec = g('r-sec'), wage = g('r-wage'), exp = g('r-exp'), cut = g('r-cut') / 100;
    $('#v-bills').textContent = bills; $('#v-lines').textContent = lines; $('#v-sec').textContent = sec + ' s'; $('#v-wage').textContent = rs(wage); $('#v-exp').textContent = rs(exp); $('#v-cut').textContent = Math.round(cut * 100) + '%';
    const TICK = 2, days = 26;
    const perBillToday = lines * sec / 60, perBillUs = lines * TICK / 60;
    const hours = bills * lines * Math.max(sec - TICK, 0) * days / 3600;
    const timeYear = hours * wage * 12, expYear = exp * cut, year = timeYear + expYear;
    tweenText($('#o-year'), year, rs);
    $('#o-split').textContent = `${rs(timeYear)} of staff time and ${rs(expYear)} of stock that does not expire`;
    const back = year / 6000;
    $('#o-pay').textContent = (back >= 10 ? String(Math.round(back)) : back.toFixed(1).replace(/\.0$/, '')) + '×';
    tweenText($('#o-hours'), hours, v => String(Math.round(v)));
    tweenText($('#o-fields'), bills * lines * 7 * days, fmtIN);
    const max = Math.max(perBillToday, 1);
    $('#b-today').style.width = '100%';
    $('#b-us').style.width = (perBillUs / max * 100).toFixed(1) + '%';
    const mins = v => (v >= 1 ? `${v.toFixed(v >= 10 ? 0 : 1).replace(/\.0$/, '')} min` : `${Math.round(v * 60)} sec`);
    $('#b-today-v').textContent = mins(perBillToday);
    $('#b-us-v').textContent = mins(perBillUs);
  });
  bindRanges(['r-reg', 'r-bas', 'r-back'], () => {
    const reg = g('r-reg'), bas = g('r-bas'), back = g('r-back') / 100;
    $('#v-reg').textContent = fmtIN(reg); $('#v-bas').textContent = rs(bas); $('#v-back').textContent = Math.round(back * 100) + '%';
    tweenText($('#o-earn'), reg * back * bas * 12, rs);
    $('#o-earn-n').textContent = String(Math.round(reg * back));
  });
}

/* ---------- 12 Our costs ---------- */
function initCosts() {
  const box = $('.serve-cost');
  let meter = 1;
  const direct = () => C.serve.reduce((s, x) => s + (meter && x.meter ? 0 : x.v), 0);
  $('#serve-leg').innerHTML = C.serve.map(x => `<li class="${x.meter ? 'is--meter' : ''}"><b>${esc(x.k)}<em>${rs(x.v)}</em></b><span>${esc(x.s)}</span></li>`).join('');
  $('#build').innerHTML = C.build.map(([k, v, n]) => `<li><span>${esc(k)}</span><b>${esc(v)}</b><i style="--w:${(n / 150 * 100).toFixed(0)}%"></i></li>`).join('');
  $('#team').innerHTML = C.team.map(([k, n, v]) => `<tr><td>${esc(k)}</td><td>${esc(n)}</td><td>${esc(v)}</td></tr>`).join('');
  const unit = $('#unit'); unit.classList.add('is--unit');
  unit.innerHTML = C.unit.map(([k, v, s]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td><td>${esc(s)}</td></tr>`).join('');
  const PMAX = 50000;
  $('#prices').innerHTML = C.prices.map(p => `<li><b>${esc(p.n)}</b><div class="pr__track"><i style="--l:${(p.lo / PMAX * 100).toFixed(1)}%;--w:${((p.hi - p.lo) / PMAX * 100).toFixed(1)}%"></i></div><small>${rs(p.lo)} to ${rs(p.hi)} ${esc(p.s)}</small></li>`).join('')
    + `<li class="is--us"><b>Pharmacy OS</b><div class="pr__track"><i style="--l:0%;--w:12%"></i></div><small>Under ₹6,000 a year, the plan. WhatsApp messages as used.</small></li>`;
  const g = id => +$('#' + id).value;
  const update = () => {
    const d = direct();
    $('#serve-bar').innerHTML = C.serve.map(x => `<i style="flex-grow:${meter && x.meter ? 300 : x.v}">${esc(x.k)}${meter && x.meter ? ' · store pays' : ''}</i>`).join('');
    tweenText($('#o-serve'), d, rs);
    $('#o-serve-m').textContent = fmtIN(d / 12);
    const price = g('r-price'), stores = g('r-stores'), fixed = g('r-fixed');
    $('#v-price').textContent = rs(price); $('#v-stores').textContent = fmtIN(stores); $('#v-fixed').textContent = lakh(fixed);
    const gp = price - d, rev = price * stores, be = gp > 0 ? Math.ceil(fixed * 12 / gp) : Infinity;
    tweenText($('#o-gp'), gp, rs);
    $('#o-gm').textContent = `${Math.round(gp / price * 100)}% of the price`;
    $('#o-rev').textContent = lakh(rev);
    $('#o-rev-s').textContent = `from ${fmtIN(stores)} stores`;
    $('#o-be').textContent = isFinite(be) ? fmtIN(be) : 'Never';
    const share = isFinite(be) ? be / 45000 * 100 : 0;
    $('#o-be-s').textContent = isFinite(be) ? `That is ${share < 1 ? 'under 1' : Math.round(share)}% of the 45,000 shops in AP and Telangana` : 'The price is below the cost to serve';
    const left = gp * stores - fixed * 12;
    $('#o-read').innerHTML = !isFinite(be) ? 'At this price a store pays no more than it costs to serve.'
      : left >= 0 ? `At <b>${fmtIN(stores)}</b> stores this covers the team and leaves <b>${lakh(left)}</b> a year.`
      : `At <b>${fmtIN(stores)}</b> stores this is <b>${lakh(-left)}</b> a year short of the team’s cost. It needs more stores, or a leaner team.`;
  };
  $$('[data-meter]', box).forEach(b => b.tagName === 'BUTTON' && b.addEventListener('click', () => { meter = +b.dataset.meter; box.dataset.meter = String(meter); $$('button[data-meter]', box).forEach(x => x.setAttribute('aria-pressed', String(x === b))); update(); }));
  bindRanges(['r-price', 'r-stores', 'r-fixed'], update);
}

/* ---------- 13 to 16: lists ---------- */
function renderLists() {
  $('#whys').innerHTML = C.whys.map(w => `<li class="wy"><span class="wy__n" aria-hidden="true">${w.n}</span><h3>${esc(w.t)}</h3><p>${esc(w.s)}</p><a class="btn" data-theme="${w.n === '1' ? 'ink' : 'cloud'}" data-shape="round" data-size="s" href="${esc(w.go)}"><span class="btn__label">${esc(w.cta)}</span></a></li>`).join('');
  $('#moats').innerHTML = C.moats.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('');
  $('#asks').innerHTML = C.asks.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  $('#market-stats').innerHTML = C.marketStats.map(([b, t, s]) => `<li><b>${esc(b)}</b><span>${esc(t)}</span>${srcA(s)}</li>`).join('');
  $('#now-list').innerHTML = C.now.map(([d, t, s, src, past]) => `<li class="${past ? '' : 'is--next'}"><time>${esc(d)}</time><h3>${esc(t)}</h3><p>${esc(s)}</p>${srcA(src)}</li>`).join('');
  $('#care-list').innerHTML = C.care.map(([t, s, ic], i) => `<li class="cr"><div class="cr__top"><i>${kicon(ic)}</i><span>${pad(i + 1)}</span></div><h3>${esc(t)}</h3><p>${esc(s)}</p></li>`).join('');
  $('#road').innerHTML = C.road.map(([w, t, l, gate]) => `<li class="rd"><time>${esc(w)}</time><h3>${esc(t)}</h3><ul>${l.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p class="rd__gate"><span>Gate</span>${esc(gate)}</p></li>`).join('');
  $('#open').innerHTML = C.open.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('');
  $('#sources').innerHTML = Object.values(C.sources).map(([t, u]) => `<li>${u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>` : esc(t)}</li>`).join('');
  $('#anno-pins').innerHTML = C.anno.map(([x, y], i) => `<li style="--x:${x}%;--y:${y}%">${i + 1}</li>`).join('');
  $('#anno-list').innerHTML = C.anno.map(([, , a, b], i) => `<li tabindex="0" data-anno="${i}"><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('');
  const pins = $$('#anno-pins li'), lit = (i, on) => pins[i] && pins[i].classList.toggle('is--on', on);
  $$('#anno-list li').forEach(li => { const i = +li.dataset.anno; ['pointerenter', 'focus'].forEach(ev => li.addEventListener(ev, () => lit(i, true))); ['pointerleave', 'blur'].forEach(ev => li.addEventListener(ev, () => lit(i, false))); });
  $('#lang-pts').innerHTML = C.langPts.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('');
  $('#a11y').innerHTML = C.a11y.map(([a, b, c]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('');
  $('#movein').innerHTML = C.movein.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('');
  $('#day-list').innerHTML = C.day.map(([w, t, app, you]) => `<li><time>${esc(w)}</time><h4>${esc(t)}</h4><p class="day__app">${esc(app)}</p><p class="day__you">${kicon('hand', '')}${esc(you)}</p></li>`).join('');
  $('#desk-pts').innerHTML = C.deskPts.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('');
  $('#diff').innerHTML = C.diff.map(([k, a, b]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('');
  $$('[data-screen]').forEach(el => { el.innerHTML = V[el.dataset.screen] ? V[el.dataset.screen]() : ''; });
}

/* ---------- Walkthrough player ---------- */
function initPlayer() {
  const modal = $('.modal[data-modal="reel"]');
  $('#player-frames').innerHTML = ST.map((s, i) => `<div class="pframe${i === 0 ? ' is--active' : ''}" aria-hidden="${i !== 0}"><div class="pframe__text"><span class="pframe__act">${esc(ACT(s.act).name)} · step ${s.n} of 08</span><span class="pframe__num">${s.n}</span><h3 class="h-m">${esc(s.name)}</h3><p class="p-l">${esc(s.line)}</p><p class="pframe__out">${esc(s.gives)}</p><ul class="pframe__lanes"><li><b>Who</b><span>${esc(s.who)}</span></li><li><b>Today</b><span><s>${esc(s.today)}</s></span></li></ul></div><div class="media">${screen(s.vis, near(s.zoom))}</div></div>`).join('');
  $('#player-progress').innerHTML = ST.map((s, i) => `<button type="button" aria-label="Go to step ${s.n}: ${esc(s.name)}" data-pi="${i}"><span><i></i></span></button>`).join('');
  const frames = $$('.pframe'), bars = $$('#player-progress i');
  const DUR = 4600;
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
function initRadialLinks() {
  $('#radial-list').addEventListener('click', e => {
    const b = e.target.closest('[data-stage]');
    if (!b) return;
    const i = +b.dataset.stage;
    scrollToEl($('#flow'));
    setTimeout(() => { if (stageSlider) stageSlider.go(i); else setStage(i); }, reduce ? 0 : 700);
  });
}

/* ---------- Motion ---------- */
function initHero() {
  if (!hasG || reduce) return;
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.nav__bar', { yPercent: -120, duration: 1.1 }, 0)
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
safe('render', () => { renderRadial(); renderTicker(); renderChain('today'); renderToday(); renderStages(); renderLadder(); renderUX(); renderLists(); });
safe('buttons', () => initButtons());
safe('lenis', initLenis);
safe('nav', initNav);
safe('events', initGlobalEvents);
safe('chain', initChain);
safe('cmp', initCmp);
safe('stages', () => { stageSlider = initStageSlider(); });
safe('radial-links', initRadialLinks);
safe('demo', initDemo);
safe('jobs', initJobs);
safe('stores', initStores);
safe('camp', initCamp);
safe('flick', initFlick);
safe('calc', initCalc);
safe('costs', initCosts);
safe('player', initPlayer);
safe('copy', initCopy);
safe('cursor', () => initCursor('.flick__item.is--active'));
safe('hero', initHero);
safe('radial', initRadialMotion);
safe('reveals', initReveals);
