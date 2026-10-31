/* ===== Pharmacy OS pitch ===== */
const ST = C.steps, ACT = id => C.acts.find(a => a.id === id);
const kicon = (id, cls = 'ki') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#k-${id}"/></svg>`;
const PHONES = ['dlink', 'wabillm', 'remindm', 'ownerm', 'needsm', 'shopm'], TABLETS = ['billt'];
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

/* ---------- 01 The problem: the chain, link by link ---------- */
const leakHTML = fixed => C.leaks.map((l, i) => `<li class="lk"><span class="lk__n">${pad(i + 1)}</span><span class="lk__ic">${kicon(l.icon, '')}</span><b class="lk__at">${esc(l.at)}</b>${fixed ? `<p class="lk__fix">${esc(l.fix)}</p>` : `<ul class="lk__p">${l.p.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`}</li>`).join('');
function renderProblem() {
  $('#leaks').innerHTML = leakHTML(0);
  $('#fixes').innerHTML = leakHTML(1);
  $('#incidents').innerHTML = C.incidents.map(x => `<li class="ic"><div class="ic__top"><time>${esc(x.when)}</time><span>${esc(x.where)}</span></div><h4>${esc(x.t)}</h4><p>${esc(x.s)}</p><p class="ic__fix"><b>With Pharmacy OS</b>${esc(x.fix)}</p><p class="ic__src">${srcA(x.src)}</p></li>`).join('');
}
/* A light moves along the chain, one link at a time, like a bill travelling through it */
function initLeaks() {
  if (reduce) return;
  $$('.leak__chain').forEach(list => {
    const items = $$('.lk', list);
    let i = -1, t = 0;
    onVisible(list, v => {
      clearInterval(t);
      if (!v) return;
      t = setInterval(() => { i = (i + 1) % (items.length + 2); items.forEach((it, k) => it.classList.toggle('is--on', k === i)); }, 1100);
    }, { threshold: 0.25 });
  });
}

/* ---------- 02 Today's software ---------- */
function renderToday() {
  const word = ['Not found in public material', 'Partial, add-on or higher plan', 'Documented'];
  $('#matrix').innerHTML = `<thead><tr><th scope="col"><span class="sr-only">Feature</span></th>${C.matrixCols.map((c, i) => `<th scope="col"${i === 0 ? ' class="is--us"' : ''}>${esc(c)}</th>`).join('')}</tr></thead><tbody>${C.matrix.map(([f, v]) => `<tr><th scope="row">${esc(f)}</th>${v.map((x, i) => `<td${i === 0 ? ' class="is--us"' : ''}><i class="dotm is--${x}" role="img" aria-label="${word[x]}"></i></td>`).join('')}</tr>`).join('')}</tbody>`;
}
/* Their real screen, beside the same job in ours */
function initRivals() {
  const tabs = $('#rv-tabs'), stage = $('#rv-stage');
  /* The page may be opened as /pharmacy-os or /pharmacy-os/: build the image path from where it really is */
  const base = location.pathname.replace(/\/(index\.html)?$/, '') + '/img/rivals/';
  tabs.innerHTML = C.rivalUI.map((r, i) => `<button type="button" role="tab" id="rv-t${i}" aria-controls="rv-stage" data-rv="${i}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}">${esc(r.n)}</button>`).join('');
  const paint = i => {
    const r = C.rivalUI[i];
    $$('[data-rv]', tabs).forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
    stage.setAttribute('aria-labelledby', 'rv-t' + i);
    stage.innerHTML = `<div class="rv2__pair">
      <figure class="rv2__theirs${r.phone ? ' is--phone' : ''}"><figcaption><span class="tag" data-theme="glass" data-shape="round">${esc(r.n)}</span><span>${esc(r.job)}</span></figcaption><div class="rv2__img"><img src="${base}${esc(r.img)}" alt="${esc(r.n)}: ${esc(r.job)}, as shown in its public listing" decoding="async"></div><p class="rv2__src">Their screen, from <a href="${esc(r.src[1])}" target="_blank" rel="noopener">${esc(r.src[0])}</a></p></figure>
      <figure class="rv2__ours"><figcaption><span class="tag" data-theme="volt" data-shape="round">Pharmacy OS</span><span>The same job</span></figcaption><div class="media">${screen(r.ours)}</div><p class="rv2__src">Our design, with sample data</p></figure></div>
      <ul class="rv2__vs">${r.vs.map(([k, a, b]) => `<li><span class="eyebrow">${esc(k)}</span><p class="is--them">${esc(a)}</p><p class="is--us">${esc(b)}</p></li>`).join('')}</ul>
      <p class="rv2__meta"><span><b>Best at</b>${esc(r.best)}</span><span><b>Price</b>${esc(r.price)}</span></p>`;
  };
  tabs.addEventListener('click', e => { const b = e.target.closest('[data-rv]'); if (b) paint(+b.dataset.rv); });
  tabs.addEventListener('keydown', e => {
    const n = C.rivalUI.length, cur = +(document.activeElement.dataset.rv || 0);
    const to = e.key === 'ArrowRight' ? (cur + 1) % n : e.key === 'ArrowLeft' ? (cur - 1 + n) % n : -1;
    if (to < 0) return;
    e.preventDefault(); paint(to); $(`[data-rv="${to}"]`, tabs).focus();
  });
  paint(0);
}

/* ---------- 04 One flow ---------- */
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

/* ---------- 05 The live demo: every screen, in the order a day runs, and clickable ---------- */
function initTour() {
  const T = C.tour, list = $('#tour-list'), stage = $('#tour-stage'), bar = $('#tour-bar'), playB = $('#tour-play');
  if (!list || !stage) return;
  /* Buttons inside a screen that open the screen they lead to */
  const HOT = { 'Send on WhatsApp': 'send', 'Compare distributors': 'compare', 'Send both orders': 'send', 'Send to Godavari': 'compare', 'Add to stock': 'stock', 'Receive order 1042': 'check', 'Send the claim': 'watch', 'Remind all three': 'watch', 'New bill': 'sell', 'New bill for her': 'sell', 'Take ₹486': 'wabill', 'Mark as sent': 'track', 'Upload the bill file': 'dispatch', 'Post a scheme': 'desk', 'Send reply': 'desk', 'Remind the late ones': 'dpay', 'Close the day': 'dayclose', 'Pay ₹18,200': 'dues', 'Plan the payments': 'dues', 'Share on WhatsApp': 'shopm', 'See the store': 'shopm', 'Add all to the order': 'order', 'Add all 7 to the order': 'order', 'See the order': 'order', 'Send today’s reminders': 'remind', 'Approve order 1057': 'needsm', 'Start the returns': 'returns', 'Send back to distributor': 'returns', 'Download the recall record': 'inspect', 'Download the pack': 'inspect', 'GST summary for all': 'gst', 'Tally files for all': 'ca', 'Add a person': 'staff', 'Alert settings': 'rules', 'Move my data': 'home' };
  const FEAT = {};
  C.jobs.forEach(j => j.f.forEach(([t, k, d]) => { if (!FEAT[k]) FEAT[k] = [j.name, t, d]; }));
  let last = '', html = '';
  T.forEach(([g, , t], i) => { if (g !== last) { html += `<li class="tour__grp" aria-hidden="true">${esc(g)}</li>`; last = g; } html += `<li><button type="button" data-ti="${i}" aria-current="false"><span class="tnum">${pad(i + 1)}</span>${esc(t)}</button></li>`; });
  list.innerHTML = html;
  let cur = 0, raf = 0, t0 = 0, playing = false;
  const DUR = 5200, label = $('.btn__label', playB);
  const paintScreen = k => {
    const kind = PHONES.includes(k) ? 'phone' : TABLETS.includes(k) ? 'tab' : 'desk';
    stage.dataset.kind = kind;
    stage.innerHTML = `<div class="media${kind === 'phone' ? ' is--phone' : kind === 'tab' ? ' is--tab' : ''}">${screen(k)}</div>`;
    $$('.u-btn', stage).forEach(b => { const go = HOT[b.textContent.replace(/\s+/g, ' ').trim()]; if (go && V[go]) b.dataset.go = go; });
  };
  const caption = (g, t, line, n) => { $('#tour-grp').textContent = g; $('#tour-t').textContent = t; $('#tour-line').textContent = line; $('#tour-n').textContent = n; };
  const show = (i, keepList) => {
    cur = (i + T.length) % T.length;
    const [g, k, t, line] = T[cur];
    caption(g, t, line, `${pad(cur + 1)} / ${T.length}`);
    $$('[data-ti]', list).forEach((b, n) => b.setAttribute('aria-current', String(n === cur)));
    paintScreen(k);
    const li = $(`[data-ti="${cur}"]`, list);
    if (li && !keepList) { const a = li.getBoundingClientRect(), r = list.getBoundingClientRect(); list.scrollTo({ top: list.scrollTop + a.top - r.top - (list.clientHeight - a.height) / 2, left: list.scrollLeft + a.left - r.left - (list.clientWidth - a.width) / 2, behavior: reduce ? 'auto' : 'smooth' }); }
    t0 = performance.now();
  };
  const stop = () => { playing = false; cancelAnimationFrame(raf); label.textContent = 'Play the tour'; bar.style.transform = 'scaleX(0)'; };
  const loop = now => {
    if (!playing) return;
    const p = (now - t0) / DUR;
    bar.style.transform = `scaleX(${Math.min(p, 1)})`;
    if (p >= 1) { if (cur === T.length - 1) { stop(); return; } show(cur + 1); }
    raf = requestAnimationFrame(loop);
  };
  const play = () => { playing = true; label.textContent = 'Pause'; t0 = performance.now(); raf = requestAnimationFrame(loop); };
  playB.addEventListener('click', () => (playing ? stop() : play()));
  $('#tour-prev').addEventListener('click', () => { stop(); show(cur - 1); });
  $('#tour-next').addEventListener('click', () => { stop(); show(cur + 1); });
  list.addEventListener('click', e => { const b = e.target.closest('[data-ti]'); if (b) { stop(); show(+b.dataset.ti, true); } });
  /* A click on a menu item or a main button inside the screen opens where it leads */
  stage.addEventListener('click', e => {
    const el = e.target.closest('[data-go]');
    if (!el || !V[el.dataset.go]) return;
    stop();
    const k = el.dataset.go, i = T.findIndex(x => x[1] === k);
    if (i >= 0) { show(i); return; }
    paintScreen(k);
    $$('[data-ti]', list).forEach(b => b.setAttribute('aria-current', 'false'));
    const f = FEAT[k] || ['Pharmacy OS', 'Another screen', ''];
    caption(f[0], f[1], f[2], 'Off the tour');
  });
  stage.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); stop(); show(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); stop(); show(cur - 1); } });
  onVisible($('#tour'), v => { if (!v) stop(); }, { threshold: 0 });
  /* The two ways to try it */
  const modes = $$('.try__mode [data-mode]');
  const setMode = b => {
    const m = b.dataset.mode;
    modes.forEach(x => { const on = x === b; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; });
    $('#tour').hidden = m !== 'tour';
    $('#hands').hidden = m !== 'hands';
    if (m !== 'tour') stop();
  };
  modes.forEach(b => b.addEventListener('click', () => setMode(b)));
  $('.try__mode').addEventListener('keydown', e => { if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; e.preventDefault(); const i = modes.indexOf(document.activeElement), n = modes[(i + 1) % modes.length]; n.focus(); setMode(n); });
  show(0, true);
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
    <div class="pmod__story"><span class="eyebrow">A day in their life, today</span><ol>${p.story.map(([t, x]) => `<li><time>${esc(t)}</time><span>${esc(x)}</span></li>`).join('')}</ol></div>
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
/* The price is set in section 13. Anything that shows it listens here. */
const PRICE = { v: C.model.price, subs: [] };
const setPrice = v => { if (v === PRICE.v) return; PRICE.v = v; PRICE.subs.forEach(f => f()); };
function initCalc() {
  const g = id => +$('#' + id).value;
  const update = () => {
    const bills = g('r-bills'), exp = g('r-exp'), reg = g('r-reg'), price = PRICE.v;
    $('#v-bills').textContent = bills; $('#v-exp').textContent = rs(exp); $('#v-reg').textContent = fmtIN(reg);
    const hours = bills * 20 * (20 - 2) * 26 / 3600, save = hours * 70 * 12 + exp * 0.4, earn = reg * 0.1 * 900 * 12;
    tweenText($('#o-hours'), hours, v => String(Math.round(v)));
    tweenText($('#o-save'), save, rs);
    tweenText($('#o-earn'), earn, rs);
    const max = Math.max(save, price);
    $('#b-back').style.width = (save / max * 100).toFixed(1) + '%';
    $('#b-cost').style.width = (price / max * 100).toFixed(1) + '%';
    $('#b-back-v').textContent = rs(save);
    const x = save / price;
    $('#o-pay').innerHTML = `Savings alone are about <b>${x >= 10 ? Math.round(x) : x.toFixed(1).replace(/\.0$/, '')}×</b> the price, before the extra sales.`;
  };
  bindRanges(['r-bills', 'r-exp', 'r-reg'], update);
  PRICE.subs.push(update);
}

/* ---------- 13 Price and costs: a model anyone with the code can change ----------
   Defaults live in C.model. Changes are kept in this browser, and a scenario can be shared as a link (?s=...). */
function initCosts() {
  const KEY = 'po-model-v1', GROUPS = ['store', 'team', 'office', 'product', 'mkt', 'win'], FIXED = ['team', 'office', 'product', 'mkt'];
  const LEVERS = { price: 'r-price', stores: 'r-stores', perMonth: 'r-new', churn: 'r-churn', build: 'r-build', raise: 'r-raise' };
  const SHOPS = 45000, MONTHS = 60;
  const BLANK = { store: { n: 'New cost', v: 100 }, team: { n: 'New role', q: 1, v: 30000 }, office: { n: 'New cost', v: 5000 }, product: { n: 'New cost', v: 5000 }, mkt: { n: 'New cost', v: 10000 }, win: { n: 'New cost', v: 500 } };
  const clone = o => JSON.parse(JSON.stringify(o));
  const num = (v, lo, hi, d) => { v = +v; return Number.isFinite(v) ? clamp(v, lo, hi) : d; };
  const DEF = clone(C.model);

  /* Anything read from a link or storage is checked field by field */
  const clean = raw => {
    const out = clone(DEF);
    if (!raw || typeof raw !== 'object') return out;
    Object.keys(LEVERS).forEach(k => { const el = $('#' + LEVERS[k]); if (raw[k] != null) out[k] = num(raw[k], +el.min, +el.max, out[k]); });
    GROUPS.forEach(g => {
      if (!Array.isArray(raw[g])) return;
      out[g] = raw[g].slice(0, 40).filter(r => r && typeof r === 'object').map(r => {
        const row = { n: String(r.n == null ? '' : r.n).slice(0, 60), v: num(r.v, 0, r.p ? 100 : 1e8, 0) };
        if (r.p) row.p = 1;
        if (g === 'team') row.q = num(r.q, 0, 99, 1);
        if (r.s) row.s = String(r.s).slice(0, 120);
        return row;
      });
    });
    return out;
  };
  const enc = o => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const dec = t => JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, '+').replace(/_/g, '/')))));
  const strip = o => { const c = clone(o); GROUPS.forEach(g => c[g].forEach(r => delete r.s)); return c; };
  const same = (a, b) => JSON.stringify(strip(a)) === JSON.stringify(strip(b));

  let S = clone(DEF), from = 'plan';
  try {
    const q = new URLSearchParams(location.search).get('s');
    if (q) { S = clean(dec(q)); from = 'link'; }
    else { const saved = localStorage.getItem(KEY); if (saved) { S = clean(JSON.parse(saved)); from = 'saved'; } }
  } catch (e) { S = clone(DEF); from = 'plan'; }

  /* ----- The sums ----- */
  const amt = (r, price) => (r.p ? price * r.v / 100 : r.v);
  const sumG = g => S[g].reduce((t, r) => t + amt(r, S.price) * (g === 'team' ? r.q : 1), 0);
  const calc = () => {
    const price = S.price, serve = sumG('store'), win = sumG('win'), groups = {};
    FIXED.forEach(g => { groups[g] = sumG(g); });
    const fixed = FIXED.reduce((t, g) => t + groups[g], 0);
    const contrib = price - serve, grow = S.perMonth * win;   /* winning new stores, every month we keep growing */
    const runM = fixed + grow;
    const be = contrib > 0 ? Math.ceil(runM * 12 / contrib) : Infinity;
    const n = S.stores, inM = n * price / 12, outM = runM + n * serve / 12, profM = inM - outM;
    const cac = (S.perMonth ? groups.mkt / S.perMonth : 0) + win;
    const life = S.churn > 0 ? Math.min(100 / S.churn, 5) : 5;
    const ltv = contrib * life, payback = contrib > 0 ? cac / (contrib / 12) : Infinity;
    /* Five years, month by month, from today */
    const sim = [];
    let st = 0, cum = 0, beM = null, out = null, low = 0, y1 = 0;
    for (let m = 1; m <= MONTHS; m++) {
      const add = m > S.build ? S.perMonth : 0;
      st = st * (1 - S.churn / 1200) + add;
      const i = st * price / 12, o = fixed + st * serve / 12 + add * win;
      cum += i - o;
      if (m <= 12) y1 += o;
      if (beM == null && m > S.build && i >= o) beM = m;
      if (out == null && S.raise + cum < 0) out = m;
      low = Math.min(low, cum);
      sim.push({ m, st, i, o, cash: S.raise + cum });
    }
    const team = S.team.reduce((t, r) => t + r.q, 0);
    return { price, serve, win, groups, fixed, contrib, grow, runM, be, n, inM, outM, profM, cac, life, ltv, payback, sim, beM, out, need: -low, y1, team };
  };

  /* ----- Editable lists ----- */
  const UNIT = { store: 'a year', team: 'each, a month', office: 'a month', product: 'a month', mkt: 'a month', win: 'once' };
  const rowHTML = (g, r, i) => `<div class="med__row${g === 'team' ? ' is--team' : ''}" data-i="${i}">
      <input class="med__n" type="text" value="${esc(r.n)}" maxlength="60" aria-label="Name">
      ${g === 'team' ? `<label class="med__q"><input type="text" inputmode="numeric" value="${r.q}" data-f="q" data-step="1" aria-label="${esc(r.n)}: people"><span>×</span></label>` : ''}
      <label class="med__v${r.p ? ' is--pct' : ''}">${r.p ? '' : '<span>₹</span>'}<input type="text" inputmode="decimal" value="${r.p ? r.v : fmtIN(r.v)}" data-f="v" data-step="${r.p ? 0.5 : FIXED.includes(g) ? 1000 : 10}" aria-label="${esc(r.n)}: ${r.p ? 'percent of the price' : 'rupees ' + UNIT[g]}">${r.p ? '<span>% of price</span>' : ''}</label>
      <button type="button" class="med__x" aria-label="Remove ${esc(r.n)}">×</button>
      ${r.s ? `<small>${esc(r.s)}</small>` : ''}
    </div>`;
  const lim = (r, f) => (f === 'q' ? 99 : r.p ? 100 : 1e8);
  const renderGroup = g => {
    const box = $('#g-' + g);
    box.innerHTML = S[g].length ? S[g].map((r, i) => rowHTML(g, r, i)).join('') : '<p class="med__empty">Nothing here. Add a row below.</p>';
  };
  GROUPS.forEach(g => {
    const box = $('#g-' + g);
    renderGroup(g);
    box.addEventListener('input', e => {
      const row = e.target.closest('.med__row'); if (!row) return;
      const r = S[g][+row.dataset.i];
      if (e.target.classList.contains('med__n')) { r.n = e.target.value.slice(0, 60); delete r.s; save(); return; }
      const f = e.target.dataset.f; if (!f) return;
      r[f] = num(e.target.value.replace(/[^\d.]/g, '') || 0, 0, lim(r, f), 0);
      update();
    });
    /* Typed amounts show with Indian commas once you leave the box; arrow keys step them */
    const show = (r, f) => (f === 'v' && !r.p ? fmtIN(r.v) : String(r[f]));
    box.addEventListener('change', e => { const f = e.target.dataset.f; if (f) e.target.value = show(S[g][+e.target.closest('.med__row').dataset.i], f); });
    box.addEventListener('keydown', e => {
      const f = e.target.dataset.f; if (!f || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
      e.preventDefault();
      const r = S[g][+e.target.closest('.med__row').dataset.i], st = +e.target.dataset.step * (e.shiftKey ? 10 : 1);
      r[f] = clamp(Math.round((r[f] + (e.key === 'ArrowUp' ? st : -st)) / st) * st, 0, lim(r, f));
      e.target.value = show(r, f);
      update();
    });
    box.addEventListener('click', e => {
      const x = e.target.closest('.med__x'); if (!x) return;
      const i = +x.closest('.med__row').dataset.i;
      S[g].splice(i, 1);
      renderGroup(g); update();
      const next = box.querySelectorAll('.med__x')[Math.min(i, S[g].length - 1)];
      (next || box.parentElement.querySelector('.med__add')).focus();
    });
  });
  $$('[data-add]').forEach(b => b.addEventListener('click', () => {
    const g = b.dataset.add;
    S[g].push(clone(BLANK[g]));
    renderGroup(g); update();
    const inp = $$('#g-' + g + ' .med__n').pop();
    if (inp) { inp.focus(); inp.select(); }
  }));

  /* ----- Levers ----- */
  const fmtL = { price: rs, stores: fmtIN, perMonth: fmtIN, churn: v => v + '%', build: v => v + (v === 1 ? ' month' : ' months'), raise: v => (v ? lakh(v) : 'None') };
  const setLevers = () => Object.keys(LEVERS).forEach(k => { const el = $('#' + LEVERS[k]); el.value = S[k]; fillRange(el); });
  setLevers();

  /* ----- Charts: plain SVG, one axis each, a crosshair on hover ----- */
  const W = 640, H = 260, PAD = { l: 58, r: 16, t: 14, b: 30 };
  const nice = v => { if (v <= 0) return 1; const p = Math.pow(10, Math.floor(Math.log10(v))), f = v / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p; };
  const short = v => { const a = Math.abs(v), s = v < 0 ? '−' : ''; return a >= 1e7 ? s + '₹' + +(a / 1e7).toFixed(1) + ' Cr' : a >= 1e5 ? s + '₹' + +(a / 1e5).toFixed(1) + ' L' : a >= 1e3 ? s + '₹' + +(a / 1e3).toFixed(0) + 'k' : s + '₹' + Math.round(a); };
  const chart = (fig, { xMax, yMin, yMax, series, xFmt, xLabel, marks = [], tip }) => {
    const plot = $('.chart__plot', fig), iw = W - PAD.l - PAD.r, ih = H - PAD.t - PAD.b;
    const step = nice((yMax - yMin) / 4), y0 = Math.floor(yMin / step) * step, y1 = Math.ceil(yMax / step) * step || step;
    const X = v => PAD.l + v / xMax * iw, Y = v => PAD.t + (1 - (v - y0) / (y1 - y0)) * ih;
    let g = '';
    for (let v = y0; v <= y1 + step / 2; v += step) g += `<line class="ch__grid${Math.abs(v) < step / 2 ? ' is--zero' : ''}" x1="${PAD.l}" x2="${W - PAD.r}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ch__ax" x="${PAD.l - 8}" y="${Y(v) + 4}" text-anchor="end">${short(v)}</text>`;
    const xs = nice(xMax / 5);
    for (let v = 0; v <= xMax + 1e-9; v += xs) g += `<text class="ch__ax" x="${X(v)}" y="${H - 8}" text-anchor="middle">${xFmt(v)}</text>`;
    g += `<text class="ch__ax is--title" x="${W - PAD.r}" y="${H - 8 - 14}" text-anchor="end">${esc(xLabel)}</text>`;
    marks.forEach(mk => { if (mk.x >= 0 && mk.x <= xMax) g += `<line class="ch__mark${mk.cls ? ' ' + mk.cls : ''}" x1="${X(mk.x)}" x2="${X(mk.x)}" y1="${PAD.t}" y2="${PAD.t + ih}"/><text class="ch__ax is--mark" x="${X(mk.x) + (X(mk.x) > W * 0.8 ? -6 : 6)}" y="${PAD.t + 12}" text-anchor="${X(mk.x) > W * 0.8 ? 'end' : 'start'}">${esc(mk.label)}</text>`; });
    series.forEach(s => {
      const d = s.pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(1)} ${Y(clamp(p[1], y0, y1)).toFixed(1)}`).join('');
      g += `<path class="ch__line ${s.cls}" d="${d}"/>`;
      if (s.label) { const p = s.pts[s.pts.length - 1]; g += `<text class="ch__lab" x="${X(p[0]) - 4}" y="${Y(clamp(p[1], y0, y1)) + (s.below ? 16 : -8)}" text-anchor="end">${esc(s.label)}</text>`; }
    });
    plot.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(fig.querySelector('.eyebrow').textContent)}">${g}<g class="ch__hover"><line class="ch__cross" y1="${PAD.t}" y2="${PAD.t + ih}"/>${series.map(s => `<circle class="ch__dot ${s.cls}" r="4.5"/>`).join('')}</g><rect class="ch__hit" x="${PAD.l}" y="${PAD.t}" width="${iw}" height="${ih}"/></svg><div class="ch__tip" hidden></div>`;
    const svg = $('svg', plot), hov = $('.ch__hover', svg), tipEl = $('.ch__tip', plot), dots = $$('.ch__dot', svg), cross = $('.ch__cross', svg);
    const move = e => {
      const r = svg.getBoundingClientRect(), sx = (e.clientX - r.left) / r.width * W;
      const xv = clamp((sx - PAD.l) / iw * xMax, 0, xMax), t = tip(xv);
      hov.classList.add('is--on'); tipEl.hidden = false;
      cross.setAttribute('x1', X(t.x)); cross.setAttribute('x2', X(t.x));
      t.ys.forEach((y, i) => { dots[i].setAttribute('cx', X(t.x)); dots[i].setAttribute('cy', Y(clamp(y, y0, y1))); });
      tipEl.innerHTML = t.html;
      const px = X(t.x) / W * r.width;
      tipEl.style.left = clamp(px, 70, r.width - 70) + 'px';
    };
    const leave = () => { hov.classList.remove('is--on'); tipEl.hidden = true; };
    const hit = $('.ch__hit', svg);
    hit.addEventListener('pointermove', move); hit.addEventListener('pointerdown', move); hit.addEventListener('pointerleave', leave);
  };

  /* ----- Draw everything ----- */
  const signed = v => (v < 0 ? '−' : '') + lakh(Math.abs(v));
  const monthTxt = m => `month ${m}`;
  let t = null;
  function save() {
    clearTimeout(t);
    t = setTimeout(() => { try { if (same(S, DEF)) localStorage.removeItem(KEY); else localStorage.setItem(KEY, JSON.stringify(strip(S))); } catch (e) { /* private mode */ } }, 250);
    $('#m-saved').textContent = same(S, DEF) ? 'Our plan, as written' : from === 'link' ? 'Opened from a shared link. Your changes stay in this browser.' : 'Your changes, kept in this browser';
  }

  function update() {
    const R = calc(), p = R.price;
    setPrice(p);
    $$('[data-m="price"]').forEach(e => { e.textContent = rs(p); });
    $$('[data-m="serve"]').forEach(e => { e.textContent = rs(R.serve); });

    /* Where one store's money goes */
    const parts = S.store.map(r => [r.n, amt(r, p), r.s || '']).concat([[R.contrib >= 0 ? 'Left for us' : 'Short on each store', Math.abs(R.contrib), R.contrib >= 0 ? 'Pays the team, the office and marketing, then profit' : 'Costs more to serve than the price. Raise the price or cut a cost.']]);
    const last = parts.length - 1;
    $('#pc-bar').innerHTML = parts.map(([k, v], i) => `<i class="${i === last ? (R.contrib >= 0 ? 'is--us' : 'is--short') : ''}${v < p * 0.05 ? ' is--tiny' : ''}" style="flex-grow:${Math.max(v, 1)}" title="${esc(k)}: ${rs(v)}"><span>${esc(k)}</span><b>${rs(v)}</b></i>`).join('');
    $('#t-store').textContent = rs(R.serve);
    $('#pc-who').innerHTML = [['The store', rs(p), `a year, every feature. About ${rs(p / 12)} a month, ${rs(p * 1.18)} with GST.`, 'store'], ['The distributor', 'Free', 'dashboard, and billing at launch', 'truck'], ['The accountant', 'Free', 'invited by the store', 'file']].map(([a, b, c, ic], i) => `<li class="${i ? '' : 'is--pay'}"><i>${kicon(ic, '')}</i><span class="eyebrow">${a}</span><b>${b}</b><small>${c}</small></li>`).join('');

    /* Group totals and the split of monthly costs */
    const GN = { team: 'Team', office: 'Office', product: 'Software', mkt: 'Marketing' };
    FIXED.forEach(g => { $('#t-' + g).textContent = rs(R.groups[g]) + ' a month'; });
    $('#t-team').textContent = `${R.team} ${R.team === 1 ? 'person' : 'people'}, ${rs(R.groups.team)} a month`;
    $('#t-win').textContent = rs(R.win) + ' a store';
    $('#t-fixed').textContent = lakh(R.fixed);
    $('#t-fixed-y').textContent = `· ${lakh(R.fixed * 12)} a year`;
    $('#m-split').innerHTML = FIXED.map(g => `<i style="flex-grow:${Math.max(R.groups[g], 1)}"><span>${GN[g]}</span><b>${R.fixed ? Math.round(R.groups[g] / R.fixed * 100) : 0}%</b></i>`).join('');

    /* Income tracker tiles */
    const beTxt = Number.isFinite(R.be) ? fmtIN(R.be) : 'Never';
    $('#m-tiles').innerHTML = [
      ['Income a month', rs(R.inM), `${lakh(R.n * p)} a year`, ''],
      ['Costs a month', rs(R.outM), 'team, office, software, marketing, serving stores', ''],
      [R.profM >= 0 ? 'Profit a month' : 'Loss a month', rs(Math.abs(R.profM)), R.profM >= 0 ? `${R.inM ? Math.round(R.profM / R.inM * 100) : 0}% of income` : R.inM ? `costs are ${(R.outM / R.inM).toFixed(1)}× income` : 'no income yet', R.profM >= 0 ? 'is--pos' : 'is--neg'],
      ['Stores to break even', beTxt, Number.isFinite(R.be) ? `${(R.be / SHOPS * 100).toFixed(1)}% of ${fmtIN(SHOPS)} shops in AP and Telangana` : 'each store costs more than it pays', '']
    ].map(([a, b, c, cls]) => `<li class="${cls}"><span class="eyebrow">${a}</span><b class="tnum">${b}</b><small>${c}</small></li>`).join('');
    $('#m-read').innerHTML = R.profM >= 0
      ? `At <b>${fmtIN(R.n)}</b> stores and <b>${rs(p)}</b> a store: <b>${rs(R.inM)}</b> a month in, <b>${rs(R.outM)}</b> out. <b>${lakh(R.profM * 12)}</b> a year left over.`
      : `At <b>${fmtIN(R.n)}</b> stores and <b>${rs(p)}</b> a store: <b>${rs(R.inM)}</b> a month in, <b>${rs(R.outM)}</b> out, <b>${rs(-R.profM)}</b> short each month. ${Number.isFinite(R.be) ? `<b>${beTxt}</b> stores cover every cost while adding ${fmtIN(S.perMonth)} a month.` : 'No number of stores covers the costs at this price.'}`;

    /* Chart 1: by stores */
    const xMax = Math.max(10000, Number.isFinite(R.be) ? Math.min(50000, Math.ceil(R.be * 1.2 / 1000) * 1000) : 10000);
    const inc = x => x * p / 12, cost = x => R.runM + x * R.serve / 12;
    chart($('#ch-stores'), {
      xMax, yMin: 0, yMax: Math.max(inc(xMax), cost(xMax)), xFmt: v => (v >= 1000 ? +(v / 1000).toFixed(1) + 'k' : String(v)), xLabel: 'paying stores',
      series: [{ cls: 'is--out', pts: [[0, cost(0)], [xMax, cost(xMax)]], label: 'Costs', below: inc(xMax) > cost(xMax) }, { cls: 'is--in', pts: [[0, 0], [xMax, inc(xMax)]], label: 'Income', below: inc(xMax) <= cost(xMax) }],
      marks: [{ x: R.n, label: `${fmtIN(R.n)} stores`, cls: 'is--you' }].concat(Number.isFinite(R.be) && Math.abs(R.be - R.n) > xMax * 0.08 ? [{ x: R.be, label: 'Break even' }] : []),
      tip: x => { x = Math.round(x / 50) * 50; const a = inc(x), b = cost(x); return { x, ys: [b, a], html: `<b>${fmtIN(x)} stores</b><span><i class="is--in"></i>Income ${rs(a)}</span><span><i class="is--out"></i>Costs ${rs(b)}</span><span>${a >= b ? 'Profit' : 'Loss'} ${rs(Math.abs(a - b))} a month</span>` }; }
    });

    /* Chart 2: cash over five years */
    const cashes = R.sim.map(s => s.cash);
    chart($('#ch-cash'), {
      xMax: MONTHS, yMin: Math.min(0, ...cashes), yMax: Math.max(S.raise, ...cashes, 1), xFmt: v => (v ? 'M' + v : 'Now'), xLabel: 'months from today',
      series: [{ cls: 'is--in', pts: [[0, S.raise]].concat(R.sim.map(s => [s.m, s.cash])) }],
      marks: [].concat(S.build ? [{ x: S.build, label: 'First store' }] : []).concat(R.beM ? [{ x: R.beM, label: 'Break even', cls: 'is--you' }] : []).concat(R.out ? [{ x: R.out, label: 'Cash runs out', cls: 'is--neg' }] : []),
      tip: x => { const m = clamp(Math.round(x), 1, MONTHS), s = R.sim[m - 1]; return { x: m, ys: [s.cash], html: `<b>Month ${m}</b><span>${fmtIN(s.st)} paying stores</span><span>In ${rs(s.i)} · out ${rs(s.o)}</span><span><i class="is--in"></i>Cash ${signed(s.cash)}</span>` }; }
    });
    const covers = !R.out;
    $('#m-run').innerHTML = (R.beM
      ? `Adding <b>${fmtIN(S.perMonth)}</b> stores a month after <b>${S.build}</b> months of building, the plan breaks even in <b>${monthTxt(R.beM)}</b> with about <b>${fmtIN(R.sim[R.beM - 1].st)}</b> paying stores. `
      : `Adding <b>${fmtIN(S.perMonth)}</b> stores a month after <b>${S.build}</b> months of building, the plan does not break even within five years. `)
      + `It needs about <b>${lakh(R.need)}</b> to get through the low point. `
      + (covers ? `<b>${S.raise ? lakh(S.raise) : 'No money'}</b> raised covers it${S.raise > R.need ? `, with about <b>${lakh(S.raise - R.need)}</b> to spare` : ''}.` : `<b>${S.raise ? lakh(S.raise) : 'No money'}</b> raised runs out in <b>${monthTxt(R.out)}</b>, with ${fmtIN(R.sim[R.out - 1].st)} stores.`);

    /* What an investor asks */
    const ratio = R.cac > 0 ? R.ltv / R.cac : 0;
    $('#m-kpi').innerHTML = [
      ['Revenue a year', lakh(R.n * p), `at ${fmtIN(R.n)} stores`],
      ['Gross margin a store', `${rs(R.contrib)}`, p ? `${Math.round(R.contrib / p * 100)}% of the price, after serving it` : ''],
      ['Cost to win a store', rs(R.cac), `marketing ÷ ${fmtIN(S.perMonth)} new stores, plus ${rs(R.win)} once`],
      ['Value of a store', rs(R.ltv), `margin over ${+R.life.toFixed(1)} years${S.churn > 0 && 100 / S.churn > 5 ? ', capped at 5' : ''}`],
      ['Value ÷ cost to win', ratio ? ratio.toFixed(1) + '×' : '–', ratio >= 3 ? 'healthy, above 3×' : 'below 3×: win stores for less, or keep them longer'],
      ['Pays back the cost to win', Number.isFinite(R.payback) ? `${Math.max(1, Math.round(R.payback))} months` : 'Never', 'from the store’s margin'],
      ['Spend before the first store', lakh(R.fixed * S.build), `${S.build} months at ${lakh(R.fixed)} a month`],
      ['Spend in year one', lakh(R.y1), 'every cost, first 12 months'],
      ['Break even', R.beM ? monthTxt(R.beM) : 'Not in 5 years', R.beM ? `about ${Math.round(R.beM / 12 * 10) / 10} years from today` : 'raise the price, add stores faster or cut costs'],
      ['Money needed', lakh(R.need), 'the deepest point of the cash line'],
      ['Runway', covers ? 'Covered' : `${R.out - 1} months`, covers ? `${S.raise ? lakh(S.raise) : 'Nothing'} raised lasts past the low point` : `on ${lakh(S.raise)} raised`],
      ['Team', `${R.team} ${R.team === 1 ? 'person' : 'people'}`, `${lakh(R.groups.team)} a month`]
    ].map(([a, b, c]) => `<li><span class="eyebrow">${a}</span><b class="tnum">${b}</b><small>${esc(c)}</small></li>`).join('');

    /* The rival prices, with ours where the slider puts it */
    const PMAX = 50000;
    $('#prices').innerHTML = C.prices.map(q => `<li><b>${esc(q.n)}</b><div class="pr__track"><i style="--l:${(q.lo / PMAX * 100).toFixed(1)}%;--w:${((q.hi - q.lo) / PMAX * 100).toFixed(1)}%"></i></div><small>${rs(q.lo)} to ${rs(q.hi)} ${esc(q.s)}</small></li>`).join('')
      + `<li class="is--us"><b>Pharmacy OS</b><div class="pr__track"><i style="--l:0%;--w:${(Math.min(p, PMAX) / PMAX * 100).toFixed(1)}%"></i></div><small>${rs(p)} a year, the test price. WhatsApp messages as used.</small></li>`;

    /* Section 16 follows the raise */
    $$('[data-m="raise"]').forEach(e => { e.textContent = S.raise ? lakh(S.raise) : 'To be set'; });
    $$('[data-m="raise-read"]').forEach(e => {
      e.textContent = !S.raise ? 'Set the amount in section 13.' : covers
        ? (R.beM ? `Enough to reach break even in ${monthTxt(R.beM)}, at about ${fmtIN(R.sim[R.beM - 1].st)} paying stores.` : 'Enough to cover five years at this plan.')
        : `For ${R.out - 1} months, to reach about ${fmtIN(R.sim[R.out - 1].st)} paying stores.`;
    });
    save();
  }

  /* ----- Share, download, reset ----- */
  const flash = (b, txt) => { const o = b.dataset.txt || (b.dataset.txt = b.textContent); b.textContent = txt; clearTimeout(b._t); b._t = setTimeout(() => { b.textContent = o; }, 2200); };
  $$('[data-m-act]').forEach(b => b.addEventListener('click', () => {
    const act = b.dataset.mAct;
    if (act === 'reset') {
      S = clone(DEF); from = 'plan';
      try { localStorage.removeItem(KEY); } catch (e) { /* private mode */ }
      if (location.search) history.replaceState(null, '', location.pathname + location.hash);
      GROUPS.forEach(renderGroup); setLevers();
      Object.keys(LEVERS).forEach(k => { $('#v-' + LEVERS[k].slice(2)).textContent = fmtL[k](S[k]); });
      update(); flash(b, 'Back to our plan');
    }
    if (act === 'share') {
      const url = location.origin + location.pathname + '?s=' + enc(strip(S)) + '#costs';
      const done = () => flash(b, 'Link copied');
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(done, () => prompt('Copy this link', url));
      else prompt('Copy this link', url);
    }
    if (act === 'csv') {
      const R = calc(), q = v => `"${String(v).replace(/"/g, '""')}"`;
      const NAME = { store: 'Serving one store (a year)', team: 'Team (a month, each)', office: 'Office and infrastructure (a month)', product: 'Keeping the software running (a month)', mkt: 'Marketing (a month)', win: 'Winning one store (once)' };
      const rows = [['Section', 'Item', 'People', 'Amount', 'Unit']];
      rows.push(['Levers', 'Price a store a year', '', S.price, '₹'], ['Levers', 'Paying stores', '', S.stores, 'stores'], ['Levers', 'New stores a month', '', S.perMonth, 'stores'], ['Levers', 'Stores that leave a year', '', S.churn, '%'], ['Levers', 'Months to build', '', S.build, 'months'], ['Levers', 'Money raised', '', S.raise, '₹']);
      GROUPS.forEach(g => S[g].forEach(r => rows.push([NAME[g], r.n, g === 'team' ? r.q : '', r.v, r.p ? '% of price' : '₹'])));
      rows.push(['Results', 'Cost to serve a store a year', '', Math.round(R.serve), '₹'], ['Results', 'Monthly costs before stores', '', Math.round(R.fixed), '₹'], ['Results', 'Stores to break even', '', Number.isFinite(R.be) ? R.be : 'never', 'stores'], ['Results', 'Break-even month', '', R.beM || 'not in 5 years', 'month'], ['Results', 'Money needed', '', Math.round(R.need), '₹'], ['Results', 'Cost to win a store', '', Math.round(R.cac), '₹'], ['Results', 'Value of a store', '', Math.round(R.ltv), '₹']);
      rows.push([], ['Month', 'Paying stores', 'Income', 'Costs', 'Cash left']);
      R.sim.forEach(s => rows.push([s.m, Math.round(s.st), Math.round(s.i), Math.round(s.o), Math.round(s.cash)]));
      const blob = new Blob(['﻿' + rows.map(r => r.map(q).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'pharmacy-os-plan.csv';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      flash(b, 'Downloaded');
    }
  }));

  bindRanges(Object.values(LEVERS), () => {
    Object.keys(LEVERS).forEach(k => { S[k] = +$('#' + LEVERS[k]).value; $('#v-' + LEVERS[k].slice(2)).textContent = fmtL[k](S[k]); });
    update();
  });
}

/* ---------- Top: try the demo, back to top ---------- */
function initFab() {
  const fab = $('#fab'), demo = $('#try');
  const upd = () => { fab.classList.toggle('is--on', scrollY > innerHeight * 0.8); const r = demo.getBoundingClientRect(); fab.classList.toggle('is--atdemo', r.top < innerHeight * 0.7 && r.bottom > innerHeight * 0.3); };
  /* The chapter you are in lights up in the top bar */
  const links = $$('.nav__chap a'), map = { gap: 0, today: 1, distributor: 2, flow: 2, try: 3, platform: 4, stores: 4, customers: 4, app: 4, ux: 4, why: 5, money: 5, costs: 6, now: 6, care: 6, plan: 6, start: 6 };
  const secs = Object.keys(map).map(id => $('#' + id)).filter(Boolean);
  const lite = () => { let on = -1; secs.forEach(el => { if (el.getBoundingClientRect().top < innerHeight * 0.4) on = map[el.id]; }); links.forEach((a, i) => a.classList.toggle('is--on', i === on)); };
  addEventListener('scroll', () => { upd(); lite(); }, { passive: true });
  upd(); lite();
  $('#to-top').addEventListener('click', () => { if (lenis) lenis.scrollTo(0); else scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
}

/* ---------- 13 to 16: lists ---------- */
function renderLists() {
  const WV = {
    typed: '<div class="wv wv--typed"><s>42</s><b>0</b><small>fields typed to receive one bill</small></div>',
    aa: '<div class="wv wv--aa"><i>Aa</i><i>Aa</i><i>Aa</i></div>',
    shield: `<div class="wv wv--shield">${kicon('shield', '')}<span>Expired: stopped</span><span>Recalled: stopped</span></div>`,
    bell: `<div class="wv wv--bell">${kicon('bell', '')}<span>Bill deleted</span><span>15% discount</span><span>₹50 short</span></div>`,
    price: '<div class="wv wv--price"><i style="--w:100%"><span>Others, up to ₹50,000</span></i><i class="is--us" style="--w:12%"><span>Us, <span data-m="price">₹5,500</span></span></i></div>',
    chain: '<div class="wv wv--chain"><span>Store</span><i></i><span>Distributor</span><i></i><span>Accountant</span></div>'
  };
  $('#whys').innerHTML = C.whys.map(w => `<li class="wy"><div class="wy__vis" aria-hidden="true">${WV[w.vis] || ''}</div><span class="wy__n" aria-hidden="true">${w.n}</span><h3>${esc(w.t)}</h3><p>${esc(w.s)}</p><a class="btn" data-theme="${w.n === '1' ? 'ink' : 'cloud'}" data-shape="round" data-size="s" href="${esc(w.go)}"><span class="btn__label">${esc(w.cta)}</span></a></li>`).join('');
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
  $('#glance').innerHTML = C.chapters.map(c => `<li><a class="gl" href="${esc(c.go)}"><span class="gl__n">Chapter ${c.n}</span><b class="gl__t">${esc(c.t)}</b><span class="gl__line">${esc(c.line)}</span><span class="gl__big"><b>${esc(c.big)}</b><small>${esc(c.bigL)}</small></span><span class="gl__secs">${c.secs.map(x => `<i>${esc(x)}</i>`).join('')}</span></a></li>`).join('');
  $$('[data-chap]').forEach(el => { const c = C.chapters[+el.dataset.chap - 1]; el.innerHTML = `<div class="container is--m chap__in"><span class="chap__n" aria-hidden="true">${c.n}</span><div><span class="eyebrow">Chapter ${c.n} of 6</span><h2 class="chap__t">${esc(c.t)}</h2><p class="chap__p">${esc(c.line)}</p></div><ul class="chap__secs">${c.secs.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`; });
  $('#acc-pts').innerHTML = C.accPts.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('');
  $('#eco').innerHTML = C.eco.map((e, i) => `<li class="ec${i === 0 ? ' is--store' : ''}"><div class="ec__top"><span class="tag" data-shape="round"${i ? ' data-theme="volt"' : ''}>${esc(e.price)}</span></div><h3 class="h-s">${esc(e.who)}</h3><p class="ec__sub">${esc(e.sub)}</p><ul>${e.uses.map(u => `<li>${esc(u)}</li>`).join('')}</ul><p class="ec__rep"><span>Replaces</span>${esc(e.replaces)}</p></li>`).join('');
  $('#eco-flow').innerHTML = C.ecoFlow.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('');
  $$('[data-desk]').forEach(b => b.addEventListener('click', () => { $$('[data-desk]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); const el = $('#desk-screen'); el.innerHTML = V[b.dataset.desk](); }));
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
safe('render', () => { renderRadial(); renderTicker(); renderProblem(); renderToday(); renderStages(); renderLadder(); renderUX(); renderLists(); });
safe('buttons', () => initButtons());
safe('lenis', initLenis);
if (lenis && window.planGate) { lenis.stop(); window.planGate.then(() => lenis.start()); }
safe('nav', initNav);
safe('events', initGlobalEvents);
safe('leaks', initLeaks);
safe('rivals', initRivals);
safe('fab', initFab);
safe('stages', () => { stageSlider = initStageSlider(); });
safe('radial-links', initRadialLinks);
safe('demo', initDemo);
safe('tour', initTour);
safe('jobs', initJobs);
safe('stores', initStores);
safe('camp', initCamp);
safe('flick', initFlick);
safe('calc', initCalc);
safe('costs', initCosts);
safe('player', initPlayer);
safe('copy', initCopy);
safe('cursor', () => initCursor('.flick__item.is--active'));
(window.planGate || Promise.resolve()).then(() => safe('hero', initHero));
safe('radial', initRadialMotion);
safe('reveals', initReveals);
