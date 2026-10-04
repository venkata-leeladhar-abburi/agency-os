/* ===== Heaven Gadgets growth plan: screens, renderers and motion on the Agency OS system ===== */

/* ---------- Mini screens (illustrative UI, sample data) ---------- */
const P = (t, c = '') => `<span class="mui__p ${c}">${t}</span>`;
const L = (w, c = '') => `<i class="mui__ln ${c}" style="width:${w}%"></i>`;
const TOP = (t, r = '') => `<div class="mui__top"><span class="mui__t">${t}</span>${r}</div>`;
const KI = (id, cls = 'ki') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#k-${id}"/></svg>`;
const GLYPH = '<svg viewBox="0 0 80 80" aria-hidden="true"><use href="#i-glyph"/></svg>';
const PIC = (id, cls = '') => `<i class="hg-pic ${cls}" style="background-image:var(--img-${id})"></i>`;
const TILE = (id, cls = '') => `<i class="hg-tile ${cls}">${KI(id)}</i>`;
const NOW = new Date();
const DAY_S = NOW.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).replace(/,/g, '');
const FLAG = n => `<b class="flag" aria-hidden="true">${n}</b>`;

const V = {
  insta() {
    const posts = [['clog', 'photo'], ['watch'], ['sneaker'], ['buds'], ['shades'], ['camo', 'photo']];
    return `<div class="ig"><div class="ig__head"><span class="ig__av hg-logo"></span><div class="ig__stats"><div><b>41</b><span>posts</span></div><div><b>1,168</b><span>followers</span></div><div><b>—</b><span>website</span></div></div></div>
<div class="ig__bio"><b>heavengadgets_ongole</b><span>Premium gadgets store · Ongole</span><span>Watches | Footwear</span><span class="ig__dm">Dm for orders ${FLAG(2)}</span><span class="ig__link">taplink only ${FLAG(3)}</span></div>
<div class="ig__stories"><i></i><i></i><i class="is--off"></i><span>Offers · 24 h ${FLAG(4)}</span></div>
<div class="ig__grid">${posts.map(([id, k], i) => `<div class="ig__post">${k ? PIC(id) : TILE(id)}${i === 0 ? `<span class="ig__tag">DM for price ${FLAG(1)}</span>` : ''}</div>`).join('')}</div></div>`;
  },
  store() {
    const items = [['clog', 'Classic clog', '₹1,299', 'In stock', 'v', 1], ['watch', 'Steel analog', '₹1,850', '3 left', '', 0], ['sneaker', 'Court sneaker', '₹2,199', 'UK 7–10', '', 0], ['buds', 'Wireless buds', '₹999', 'In stock', 'v', 0]];
    return TOP('heavengadgets.in', P('Live stock', 'v')) + `<div class="mui__search">Search watches, clogs, buds</div><div class="mui__row">${P('Footwear', 'u')}${P('Watches')}${P('Gadgets')}</div><div class="hg-grid">${items.map(([id, n, p, s, c, photo]) => `<div class="hg-item">${photo ? PIC(id) : TILE(id)}<span>${n}</span><div class="mui__row mui__sb"><b>${p}</b>${P(s, c)}</div></div>`).join('')}</div>`;
  },
  product() {
    return `<div class="hg-prod">${PIC('clog', 'is--big')}<div class="mui__col"><span class="mui__mut" style="font-size:.75em">Footwear · Clogs</span><b style="font-size:1.15em">Classic clog · Black</b><span class="mui__big" style="font-size:1.7em">₹1,299</span></div></div><div class="hg-sizes">${['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'].map((s, i) => `<span class="${i === 3 ? 'on' : i === 0 ? 'off' : ''}">${s}</span>`).join('')}</div><div class="mui__row mui__sb" style="font-size:.8em"><span class="mui__mut">UK 9 · 3 left in Ongole</span>${P('Reserve', 'sq')}</div><div class="hg-btn">Buy now · UPI or card</div>`;
  },
  pos() {
    const items = [['Classic clog · UK 9', '₹1,299'], ['Steel analog watch', '₹1,850'], ['Points used', '−₹150']];
    return TOP('Counter 1', P('Bill #0412')) + `<div class="mui__box mui__row mui__sb" style="font-size:.82em"><span>98••• ••210 · <b>Ravi K.</b></span>${P('3rd visit', 'u')}</div><div class="mui__list">${items.map(([n, a]) => `<div class="mui__li"><span>${n}</span><b style="margin-left:auto">${a}</b></div>`).join('')}</div><div class="mui__row mui__sb" style="margin-top:auto"><span class="mui__mut">Total</span><span class="mui__big" style="font-size:1.8em">₹2,999</span></div><div class="mui__row">${P('Cash')}${P('UPI', 'v')}${P('Card')}<span style="margin-left:auto">${P('Send on WhatsApp', 'u')}</span></div>`;
  },
  orders() {
    const cols = [['Paid', 4, [['Ravi K.', 'Clog'], ['Sai T.', 'Watch']]], ['Packed', 2, [['Meghana', 'Buds']]], ['Shipped', 3, [['Arjun', 'Sneaker'], ['Kiran', 'Shades']]], ['Delivered', 9, [['Divya', 'Watch']]]];
    return TOP('Orders', P('All paid · prepaid', 'v')) + `<div class="mui__kan">${cols.map(([n, c, cards], ci) => `<div class="mui__kcol"><div class="mui__kh"><span>${n}</span><span class="mui__mut">${c}</span></div>${cards.map(([w, it]) => `<div class="mui__kc${ci === 3 ? ' won' : ''}"><b style="font-size:.78em">${w}</b>${P(it)}</div>`).join('')}</div>`).join('')}</div>`;
  },
  stock() {
    const rows = [['Classic clog', [2, 5, 4, 1, 0]], ['Court sneaker', [3, 6, 2, 2, 1]], ['Camo slide', [0, 4, 7, 3, 2]]];
    return TOP('Inventory', P('Store + website', 'u')) + `<div class="hg-size"><span></span>${['6', '7', '8', '9', '10'].map(s => `<span class="mui__mut">UK ${s}</span>`).join('')}${rows.map(([n, q]) => `<span>${n}</span>${q.map(v => `<i class="${v === 0 ? 'is--out' : v < 2 ? 'is--low' : ''}">${v}</i>`).join('')}`).join('')}</div><div class="mui__row" style="margin-top:auto">${P('2 sizes low', 'r')}${P('Reorder', 'v')}${P('Barcode labels')}</div>`;
  },
  kpis() {
    return TOP('Owner dashboard', P('Sample data')) + `<div class="mui__grid3"><div class="mui__kpi"><span>Sales today</span><b>₹42,380</b></div><div class="mui__kpi"><span>Online</span><b>₹14,960</b></div><div class="mui__kpi r"><span>Low stock</span><b>6 sizes</b></div></div><svg class="mui__spark" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,50 25,46 50,48 75,36 100,40 125,26 150,30 175,16 200,8" fill="none" stroke="currentColor" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg><div class="mui__row">${P('31 bills')}${P('Repeat 38%', 'u')}${P('8 to ship')}</div>`;
  },
  crm() {
    const buys = [['Classic clog · UK 9', 'Today'], ['Wireless buds', 'Aug'], ['Court sneaker · UK 9', 'Jun']];
    return `<div class="mui__row"><span class="mui__av u" style="width:2.4em;height:2.4em;font-size:.9em">R</span><div class="mui__col" style="gap:.1em"><b>Ravi K.</b><span class="mui__mut" style="font-size:.75em">Ongole · UK 9 · Footwear fan</span></div><span style="margin-left:auto">${P('Regular', 'v')}</span></div><div class="mui__grid3"><div class="mui__kpi"><span>Buys</span><b>3</b></div><div class="mui__kpi"><span>Spent</span><b>₹6,240</b></div><div class="mui__kpi"><span>Points</span><b>320</b></div></div><div class="mui__list">${buys.map(([n, d]) => `<div class="mui__li"><span>${n}</span><span class="mui__mut" style="margin-left:auto">${d}</span></div>`).join('')}</div>`;
  },
  blast() {
    return TOP('New offer', P('Sneaker fans · 214', 'u')) + `<div class="hg-wa"><div class="hg-wa__card">${PIC('clog')}<div class="mui__col" style="gap:.15em"><b style="font-size:.85em">New clogs are in</b><span style="font-size:.72em">Your size UK 9 · ₹1,299</span><span class="hg-wa__link">heavengadgets.in/clog</span></div></div></div><div class="mui__grid3" style="margin-top:auto"><div class="mui__kpi"><span>Read</span><b>82%</b></div><div class="mui__kpi"><span>Clicked</span><b>31%</b></div><div class="mui__kpi"><span>Bought</span><b>12</b></div></div>`;
  },
  voice() {
    return TOP('Voice agent', P('Telugu · English', 'u')) + `<div class="mui__row mui__sb"><span class="mui__row"><span class="mui__av v">R</span><span style="font-size:.85em">Calling Ravi K.</span></span><span class="mui__timer" style="font-size:1.1em">00:48</span></div><div class="mui__chat"><span class="mui__bub">New clogs came in your size. Keep one till Saturday?</span><span class="mui__bub me">Yes, keep it.</span><span class="mui__bub">Done. Details on WhatsApp.</span></div><div class="mui__row" style="margin-top:auto">${P('Kept aside · UK 9', 'v')}${P('Saved to record')}</div>`;
  },
  track() {
    const st = [['Paid · UPI', 1], ['Packed', 1], ['Shipped · DTDC', 1], ['Out for delivery', 0]];
    return TOP('Order HG-W-0187', P('On the way', 'v')) + `<div class="mui__list">${st.map(([t, on]) => `<div class="mui__li"><i class="mui__chk${on ? ' on' : ''}"></i><span>${t}</span></div>`).join('')}</div><div class="mui__row" style="margin-top:auto">${P('Tracking on WhatsApp', 'u')}</div>`;
  },
  report() {
    return TOP('WhatsApp · 9:00', P('Daily report', 'v')) + `<div class="hg-wa"><div class="hg-wa__msg"><b>Yesterday at Heaven Gadgets</b><span>Sales ₹42,380 · 31 bills</span><span>Online ₹14,960 · 6 orders</span><span>Best seller: Classic clog</span><span>Low stock: UK 9, UK 10</span></div></div>`;
  },
  points() {
    return TOP('Heaven points', P('Regular', 'u')) + `<div class="mui__col" style="margin-top:.2em"><span class="mui__mut" style="font-size:.8em">Ravi K.</span><span class="mui__big">320</span></div><div class="mui__box mui__col"><div class="mui__row mui__sb" style="font-size:.8em"><span>To VIP</span><b>180 left</b></div><div class="mui__prog"><i style="width:64%"></i></div></div><div class="mui__row" style="margin-top:auto">${P('Refer: RAVI150', 'v')}${P('Birthday offer')}</div>`;
  },

  /* Phone screens (light) */
  phoneShop() {
    return `<div class="ph__status"><span>9:41</span><i></i></div><div class="ph__brand"><span class="hg-logo"></span>Heaven Gadgets</div><div class="ph__head"><span class="ph__hello">New this week</span><b class="ph__title">Clogs are in</b></div>
<div class="ph__card hg-ph-prod">${PIC('clog')}<div><span class="ph__label">UK 6–10 · live stock</span><b style="font-size:.9em">Classic clog</b><div class="ph__row"><b>₹1,299</b><span class="ph__btn volt">Buy</span></div></div></div>
<div class="ph__card hg-ph-prod">${PIC('camo')}<div><span class="ph__label">3 left in UK 9</span><b style="font-size:.9em">Camo slide</b><div class="ph__row"><b>₹899</b><span class="ph__btn ink">Buy</span></div></div></div>
<div class="ph__card violet"><span class="ph__label">Pay your way</span><div class="ph__row"><span>UPI · Card</span><span class="ph__btn glass">Tracking on WhatsApp</span></div></div>
<div class="ph__tab"><i class="on"></i><i></i><i></i><i></i></div>`;
  },
  phoneOwner() {
    return `<div class="ph__status"><span>21:30</span><i></i></div><div class="ph__head"><span class="ph__hello">Today · ${DAY_S}</span><b class="ph__title">₹42,380</b></div>
<div class="ph__card"><span class="ph__label">Sales</span><div class="ph__kpis"><div><b>₹27.4K</b><span>Store</span></div><div><b>₹15K</b><span>Online</span></div><div><b>31</b><span>Bills</span></div></div></div>
<div class="ph__card volt"><span class="ph__label">To ship</span><div class="ph__row"><b style="font-size:.95em">8 paid orders</b><span class="ph__btn ink">Open</span></div></div>
<div class="ph__card dark"><span class="ph__label">Low stock</span><div class="ph__row"><span>Classic clog · UK 9</span><span class="ph__btn glass">Reorder</span></div></div>
<div class="ph__card"><span class="ph__label">Send an offer</span><div class="ph__row"><span>Sneaker fans · 214</span><span class="ph__btn ink">Send</span></div></div>
<div class="ph__tab"><i></i><i class="on"></i><i></i><i></i></div>`;
  },
  phoneCounter() {
    return `<div class="ph__status"><span>18:42</span><i></i></div><div class="ph__head"><span class="ph__hello">Counter 1 · Bill #0412</span><b class="ph__title">₹2,999</b></div>
<div class="ph__card"><span class="ph__label">Customer</span><div class="ph__row"><span>98••• ••210 · Ravi K.</span><span class="ph__btn">3rd visit</span></div></div>
<div class="ph__card"><span class="ph__label">Items</span><div class="ph__task"><i class="on"></i><span>Classic clog · UK 9</span></div><div class="ph__task"><i class="on"></i><span>Steel analog watch</span></div><div class="ph__task"><i></i><span>Points −₹150</span></div></div>
<div class="ph__card dark"><span class="ph__label">Paid by</span><div class="ph__row"><span>UPI · received</span><span class="ph__btn volt">✓</span></div></div>
<span class="ph__btn volt wide">Send bill on WhatsApp</span>
<div class="ph__tab"><i></i><i></i><i class="on"></i><i></i></div>`;
  },
  phoneCall() {
    return `<div class="ph__status"><span>17:05</span><i></i></div><div class="ph__brand"><span class="hg-logo"></span>Heaven Gadgets · voice agent</div><div class="ph__head"><span class="ph__hello">Calling Ravi K. · 00:48</span><b class="ph__title">New drop</b></div>
<span class="ph__bub">Hi Ravi! Heaven Gadgets here. The new clogs came in your size.</span>
<span class="ph__bub is--me">Oh nice. In black?</span>
<span class="ph__bub">Black and olive, UK 9. Shall I keep one till Saturday?</span>
<span class="ph__bub is--me">Yes, keep it.</span>
<div class="ph__card volt"><span class="ph__label">Outcome · saved</span><div class="ph__row"><b style="font-size:.9em">Kept aside · UK 9</b><span class="ph__btn ink">WhatsApp sent</span></div></div>
<div class="ph__tab"><i></i><i></i><i></i><i class="on"></i></div>`;
  }
};

/* Owner dashboard */
function dashHTML(light) {
  const nav = [['Dashboard', 1], ['Orders', 0, '8'], ['Billing'], ['Inventory'], ['Customers'], ['WhatsApp'], ['Voice agent'], ['Reports'], ['Website'], ['Settings']];
  const cols = [
    ['Paid', 4, [['Ravi K.', '₹1,299', 'Clog · UK 9'], ['Sai T.', '₹1,850', 'Watch'], ['Nikhil', '₹2,199', 'Sneaker']]],
    ['Packed', 2, [['Meghana', '₹999', 'Buds'], ['Pavan', '₹1,499', 'Shades']]],
    ['Shipped', 3, [['Arjun', '₹2,199', 'Hyderabad'], ['Kiran', '₹899', 'Chennai']]],
    ['Delivered', 9, [['Divya', '₹1,850', 'Ongole'], ['Teja', '₹1,299', 'Kandukur']]]
  ];
  return `<div class="dsh${light ? ' is--light' : ''}">
  <aside class="dsh__side">
    <div class="dsh__brand"><span class="hg-logo dsh__logo"></span><span>Heaven Gadgets</span></div>
    <div class="dsh__ws"><span class="dsh__ws-av">${GLYPH}</span><div><b>Ongole store</b><span>Main branch</span></div></div>
    <nav class="dsh__nav">${nav.map(([n, on, b]) => `<span class="${on ? 'is--on' : ''}"><i></i>${n}${b ? `<em>${b}</em>` : ''}</span>`).join('')}</nav>
    <div class="dsh__side-foot"><i class="dsh__me" style="width:1.6em;height:1.6em"></i>Owner</div>
  </aside>
  <div class="dsh__main">
    <div class="dsh__topbar"><div class="dsh__crumb">Ongole / <b>Dashboard</b></div><div class="dsh__search">Search products, bills, customers…</div><span class="dsh__new">+ New bill</span><span class="dsh__me"></span></div>
    <div class="dsh__content">
      <div class="dsh__hello"><b>Good evening</b><span>Sample data</span></div>
      <div class="dsh__kpis">
        <div class="dsh__kpi"><span>Sales today</span><b>₹42,380</b><small class="is--up">+18% vs last ${NOW.toLocaleDateString('en-GB', { weekday: 'long' })}</small><svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,34 15,31 30,33 45,24 60,26 75,15 90,17 100,6" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/></svg></div>
        <div class="dsh__kpi"><span>Online orders</span><b>14</b><small>₹14,960 · all prepaid</small></div>
        <div class="dsh__kpi is--alert"><span>Low stock</span><b>6 sizes</b><small>UK 9 clogs · reorder</small></div>
        <div class="dsh__kpi"><span>Repeat buyers</span><b>38%</b><small>214 on WhatsApp</small></div>
      </div>
      <div class="dsh__row">
        <div class="dsh__panel"><div class="dsh__panel-h">Orders<span>paid to delivered</span></div>
          <div class="dsh__kanban">${cols.map(([n, c, leads], ci) => `<div class="dsh__kcol"><b><span>${n}</span><span>${c}</span></b>${leads.map(([who, val, src]) => `<div class="dsh__lead${ci === 3 ? ' is--won' : ''}"><b>${who}</b><span>${val}<em>${src}</em></span></div>`).join('')}</div>`).join('')}</div>
        </div>
        <div class="dsh__panel"><div class="dsh__panel-h">Today<span>${DAY_S}</span></div>
          <ul class="dsh__agenda"><li><b>09:00</b>Daily report sent to you</li><li><b>11:00</b>Courier pickup · 6 orders</li><li><b>14:00</b>“UK 9 is back” to 18 buyers</li><li class="is--now"><b>17:00</b>Voice agent · weekend sale</li><li><b>19:30</b>New drop · sneaker fans</li><li><b>21:00</b>Cart reminders</li></ul>
        </div>
      </div>
      <div class="dsh__row">
        <div class="dsh__panel"><div class="dsh__panel-h">Stock alerts<span>store + website</span></div>
          <ul class="dsh__risk"><li><span><b>Classic clog</b> · Black</span><em>UK 9 · 1 left</em></li><li><span><b>Court sneaker</b> · White</span><em>UK 10 · sold out</em></li><li><span><b>Steel analog</b> · Silver</span><em class="is--warn">3 left · selling fast</em></li><li><span><b>Wireless buds</b> · Black</span><em class="is--warn">Slow · 40 days</em></li></ul>
        </div>
        <div class="dsh__panel"><div class="dsh__panel-h">Sales by category<span>this week</span></div>
          <ul class="dsh__load"><li style="--w:82%"><span>Footwear</span><i></i><b>41%</b></li><li style="--w:58%"><span>Watches</span><i></i><b>29%</b></li><li style="--w:30%"><span>Audio</span><i></i><b>15%</b></li><li style="--w:18%"><span>Eyewear</span><i></i><b>9%</b></li><li style="--w:12%"><span>Grooming</span><i></i><b>6%</b></li><li class="is--over" style="--w:100%"><span>Online</span><i></i><b>35%</b></li></ul>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

/* ---------- Section renderers ---------- */
const MK = t => `<i class="mk mk--${t}" aria-hidden="true"></i>`;
const LI = (t, m = 'b') => `<li class="f">${MK(m)}<span>${esc(t)}</span></li>`;

function renderRadial() {
  const items = [['store', 'Online store', 'Sell'], ['pos', 'Billing counter', 'Sell'], ['stock', 'Live stock by size', 'Run'], ['blast', 'Offers on WhatsApp', 'Grow'], ['kpis', 'Owner dashboard', 'Run'], ['voice', 'AI voice agent', 'Grow'], ['orders', 'Orders board', 'Sell'], ['crm', 'Every buyer saved', 'Grow'], ['product', 'Price on every product', 'Sell'], ['track', 'Tracking on WhatsApp', 'Sell'], ['report', 'Daily report', 'Run'], ['points', 'Heaven points', 'Grow']];
  const all = items.concat(items);
  const list = $('#radial-list');
  list.style.setProperty('--step', (360 / all.length) + 'deg');
  list.innerHTML = all.map(([v, t, l], i) => `<div class="radial__item" style="--i:${i}"${i >= items.length ? ' aria-hidden="true"' : ''}><div class="radial__card"><div class="media"><div class="mui">${V[v]()}</div></div><div class="radial__info"><p>${esc(t)}</p><span class="eyebrow">${l}</span></div></div></div>`).join('');
}

function renderTicker() {
  const S = C.steps;
  $('#reel-ticker').innerHTML = `<span class="reel__ticker-track">${S.concat(S[0]).map((s, i) => `<span><i>${pad((i % S.length) + 1)}</i>${esc(s.name)}</span>`).join('')}</span>`;
  const track = $('.reel__ticker-track');
  if (reduce) return;
  let i = 0;
  setInterval(() => {
    if (document.hidden) return;
    i++;
    track.style.transition = '';
    track.style.transform = `translateY(${-i * 100 / (S.length + 1)}%)`;
    if (i === S.length) setTimeout(() => { track.style.transition = 'none'; track.style.transform = 'translateY(0)'; i = 0; }, 900);
  }, 2200);
}

function renderAudit() {
  $('#audit-list').innerHTML = C.audit.map(([t, d], i) => `<li><b class="flag">${i + 1}</b><span><b>${esc(t)}</b>${esc(d)}</span></li>`).join('');
}

function renderMess() {
  const ul = $('#mess-chips');
  const m = isMobile();
  ul.innerHTML = C.mess.map(([from, to, g, a, b, am, bm], k) => {
    const A = m ? am : a, B = m ? bm : b;
    return `<li class="mess__chip" data-g="${g}" style="--k:${k};--ax:${A[0]}%;--ay:${A[1]}%;--ar:${A[2]}deg;--bx:${B[0]}%;--by:${B[1]}%"><span class="mess__chip-inner"><span class="from">${esc(from)}</span><span class="to">${esc(to)}</span></span></li>`;
  }).join('');
  const P0 = i => (m ? C.mess[i][5] : C.mess[i][3]);
  $('#mess-lines').innerHTML = C.messLinks.map(([i, j, red]) => {
    const [x1, y1] = P0(i), [x2, y2] = P0(j);
    const cx = (x1 + x2) / 2 + (y2 - y1) * 0.35, cy = (y1 + y2) / 2 - (x2 - x1) * 0.35;
    return `<path class="${red ? 'is--red' : ''}" d="M${x1} ${y1} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}"/>`;
  }).join('');
  $('.mess__cols').hidden = m;
}
function renderPains() {
  $('#pains').innerHTML = C.pains.map(([a, b], i) => `<li class="pain"><span class="pain__n">${pad(i + 1)}</span><span class="pain__from">${esc(a)}</span><span class="pain__to">${esc(b)}</span></li>`).join('');
}

function renderFunnel() {
  $('#funnel-rows').innerHTML = C.funnel.map(([s, a, b, why, fix], i) => `<li class="fn" style="--a:${a}%;--b:${b}%"><span class="fn__n eyebrow">${pad(i + 1)}</span><span class="fn__name">${esc(s)}</span><span class="fn__track"><i class="fn__bar"></i><i class="fn__gain"></i></span><span class="fn__num tnum"><b class="fn__a">${a}</b><b class="fn__b">${b}</b></span><span class="fn__why"><span class="fn__leak">${esc(why)}</span><span class="fn__fix">${esc(fix)}</span></span></li>`).join('');
  const last = C.funnel[C.funnel.length - 2];
  $('#funnel-sum').innerHTML = `<b>${last[1]} buyers</b> today. <b class="u-violet">${last[2]} buyers</b> with the system. Same reel, ${(last[2] / last[1]).toFixed(1)}× the sales.`;
}
function initFunnel() {
  const root = $('[data-funnel]');
  let touched = false;
  const set = s => { root.dataset.state = s; $$('[data-funnel-set]', root).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.funnelSet === s))); };
  $$('[data-funnel-set]', root).forEach(b => b.addEventListener('click', () => { touched = true; set(b.dataset.funnelSet); }));
  if (!reduce) onVisible(root, (v, io) => { if (v) { io.disconnect(); setTimeout(() => { if (!touched) set('os'); }, 1800); } }, { threshold: 0.5 });
}

const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
function initCalc() {
  const g = id => +$('#i-' + id).value;
  const calc = () => {
    const enq = g('enq'), bill = g('bill'), lost = g('lost') / 100, win = g('win') / 100;
    const lostN = enq * lost * 30, winN = lostN * win;
    $('#o-enq').textContent = enq;
    $('#o-bill').textContent = inr(bill);
    $('#o-lost').textContent = Math.round(lost * 100) + '%';
    $('#o-win').textContent = Math.round(win * 100) + '%';
    $('#c-lost').textContent = inr(lostN * bill);
    $('#c-lost-n').textContent = `${Math.round(lostN)} enquiries that never became a sale`;
    $('#c-win').textContent = inr(winN * bill);
    $('#c-win-n').textContent = `${Math.round(winN)} more sales a month`;
    $('#c-year').textContent = inr(winN * bill * 12);
    $$('#calc input[type=range]').forEach(r => r.style.setProperty('--v', ((r.value - r.min) / (r.max - r.min) * 100).toFixed(1) + '%'));
  };
  $$('#calc input').forEach(i => i.addEventListener('input', calc));
  calc();
}

function renderLoop() {
  const n = C.steps.length, step = 360 / n;
  $('#loop-nodes').innerHTML = C.steps.map((s, k) => {
    const a = k * step * Math.PI / 180, x = 50 + 37.5 * Math.sin(a), y = 50 - 37.5 * Math.cos(a);
    return `<div class="loop__node${k === 4 ? ' is--hl' : ''}" style="--x:${x.toFixed(2)}%;--y:${y.toFixed(2)}%;--delay:${(12 / n * k - 12).toFixed(2)}s"><span class="loop__n">${pad(k + 1)}</span>${esc(s.name)}</div>`;
  }).join('');
  $('#loop-arrows').innerHTML = C.steps.map((_, k) => {
    const deg = k * step + step / 2, a = deg * Math.PI / 180;
    return `<path d="M-6,-5 L6,0 L-6,5 Z" transform="translate(${(200 + 150 * Math.sin(a)).toFixed(1)},${(200 - 150 * Math.cos(a)).toFixed(1)}) rotate(${deg})"/>`;
  }).join('');
}

const STAGE_THEME = ['volt', 'dark', 'violet', 'light', 'black', 'volt', 'cloud', 'violet'];
const STAGE_ICON = ['spark', 'store', 'search', 'card', 'receipt', 'truck', 'user', 'repeat'];
function renderStages() {
  const S = C.steps, N = pad(S.length);
  $('#stage-nav').innerHTML = S.map((s, i) => `<button class="btn" type="button" data-theme="cloud"${i % 2 ? ' data-shape="round"' : ''} data-stage="${i}" aria-pressed="${i === 0}"><span class="btn__label"><span class="eyebrow">${pad(i + 1)}</span> ${esc(s.name)}</span></button>`).join('');
  $('#stage-cards').innerHTML = S.map((s, i) => `<div class="gslider__item" data-i="${i}"><article class="stage-card is--${STAGE_THEME[i]}" aria-label="Step ${i + 1}: ${esc(s.name)}">
      <div class="stage-card__top"><div class="tag-pair"><span class="tag">Step</span><span class="tag" data-shape="round">${pad(i + 1)} / ${N}</span></div>${KI(STAGE_ICON[i], 'stage-card__icon ki')}</div>
      <div class="stage-card__num" aria-hidden="true">${pad(i + 1)}</div>
      <div class="stage-card__body"><h3 class="h-m">${esc(s.name)}</h3><p class="p-m">${esc(s.short)}</p>
      <p class="stage-card__out">${esc(s.out)}</p>
      <div class="stage-card__counts"><span>${MK('n')}Online</span><span>${MK('b')}Store</span><span>${s.runs.length} tools</span></div></div>
    </article></div>`).join('');
  $('#rail-stations').innerHTML = S.map((s, i) => `<li><button class="rail__st" type="button" data-stage="${i}" aria-label="Step ${i + 1}: ${esc(s.name)}"><span class="rail__dot"></span><span class="rail__n">${pad(i + 1)}</span><span class="rail__name">${esc(s.name)}</span></button></li>`).join('');
}
let stageActive = -1;
function setStage(i) {
  if (i === stageActive) return;
  stageActive = i;
  const s = C.steps[i], N = C.steps.length;
  const lane = (label, items, m) => `<div class="sd__lane"><h4>${label}</h4><ul class="fl">${items.map(t => LI(t, m)).join('')}</ul></div>`;
  $('#stage-detail').innerHTML = `<div class="sd"><div class="sd__head"><span class="sd__num">${pad(i + 1)} / ${pad(N)}</span><h3 class="h-m">${esc(s.name)}</h3><p class="sd__out">${esc(s.out)}</p></div><div class="sd__lanes">${lane('Online buyer', s.on, 'n')}${lane('Store buyer', s.st, 'b')}<div class="sd__lane is--kb"><h4>What runs it</h4><div class="kbchips">${s.runs.map(k => `<span>${esc(k)}</span>`).join('')}</div></div><div class="sd__lane is--today"><h4>Today → with the system</h4><p class="sd__was">${esc(s.today)}</p><p class="sd__now">${esc(s.out)}</p></div></div></div>`;
  $$('#stage-nav [data-stage]').forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
  $$('#rail-stations .rail__st').forEach((b, k) => { b.classList.toggle('is--active', k === i); b.classList.toggle('is--passed', k < i); b.setAttribute('aria-current', k === i ? 'step' : 'false'); });
  $('#rail-fill').style.transform = `scaleX(${i / (N - 1)})`;
  $$('#stage-cards .gslider__item').forEach((it, k) => it.setAttribute('aria-current', k === i ? 'true' : 'false'));
}
function initJourney() {
  const coll = $('.gslider__collection'), list = $('#stage-cards');
  const items = $$('.gslider__item', list);
  const N = items.length;
  let snaps = [], current = 0;
  const go = i => { i = clamp(i, 0, N - 1); setStage(i); current = i; move(i); };
  $('#stage-nav').addEventListener('click', e => { const b = e.target.closest('[data-stage]'); if (b) go(+b.dataset.stage); });
  $('#rail-stations').addEventListener('click', e => { const b = e.target.closest('[data-stage]'); if (b) go(+b.dataset.stage); });
  coll.setAttribute('tabindex', '0');
  coll.setAttribute('aria-label', 'Loop steps. Use left and right arrow keys to move between steps.');
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
}

/* One bill */
function renderDocs() {
  const pill = ['Inventory', 'WhatsApp', 'Customers', 'Loyalty', 'Dashboard'];
  $('#docs-rows').innerHTML = C.chain.map(([n, w, d], i) => `<li class="ledger__row" data-t="b"><span class="ledger__name"><span class="ledger__k tnum">${pad(i + 1)}</span><span>${esc(n)}</span></span><span class="stg${i % 2 ? ' is--round' : ''}" data-w="${pill.indexOf(w)}">${esc(w)}</span><span class="ledger__who">${esc(d)}</span></li>`).join('');
  $('#engine').innerHTML = C.engine.map((l, i) => `<li>${MK(i % 3 === 1 ? 'n' : 'b')}<span>${esc(l)}</span></li>`).join('');
}
function scramble(el, to, delay) {
  if (reduce) { el.textContent = to; return; }
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789{}.#';
  const len = Math.max(el.textContent.length, to.length);
  const start = performance.now() + delay, dur = 520;
  const tick = now => {
    if (now < start) { requestAnimationFrame(tick); return; }
    const p = clamp((now - start) / dur, 0, 1), reveal = Math.floor(p * len);
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
  $$('#docs-rows .ledger__row').forEach((r, i) => { r.style.transitionDelay = mode === 'filled' ? (0.35 + i * 0.12) + 's' : '0s'; r.classList.toggle('is--done', mode === 'filled'); });
}
function initPaper() {
  $$('[data-paper-mode]').forEach(b => b.addEventListener('click', () => { paperTouched = true; setPaper(b.dataset.paperMode); }));
  if (reduce) { setPaper('filled'); return; }
  onVisible($('#sow'), (v, io) => { if (v) { io.disconnect(); setTimeout(() => { if (!paperTouched) setPaper('filled'); }, 1500); } }, { threshold: 0.6 });
}

/* Tools: flick cards and their modal */
function renderPortals() {
  $('#portal-cards').innerHTML = C.tools.map((p, i) => `<div class="flick__item" role="listitem" data-i="${i}"><article class="portal-card" aria-label="${esc(p.name)}, ${p.does.length} things it does"><div class="media"><div class="mui">${V[p.vis]()}</div></div><div class="portal-card__info"><div class="portal-card__top"><div><h3 class="h-xs">${esc(p.name)}</h3><p class="p-s">${esc(p.who)}</p></div><span class="tag portal-card__plan" data-theme="${p.layer === 'Sell' ? 'volt' : p.layer === 'Run' ? 'violet' : 'glass'}" data-shape="round">${p.layer}</span></div><div class="portal-card__counts"><span>${p.does.length} things it does</span><span>Replaces: ${esc(p.replaces)}</span></div><div class="portal-card__open"><span>Open the tool</span><svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></div></div></article></div>`).join('');
}
function portalModalHTML(i) {
  const T = C.tools, p = T[i], n = T.length;
  const prev = T[(i - 1 + n) % n].name, next = T[(i + 1) % n].name;
  return `<div class="pm"><div class="pm__head"><div class="tag-pair"><span class="tag">Tool ${pad(i + 1)} / ${pad(n)}</span><span class="tag" data-theme="violet" data-shape="round">${p.layer}</span></div><h2 class="h-l" id="portal-title">${esc(p.name)}</h2><p class="p-l">${esc(p.who)}</p></div><div class="pm__tool"><div class="pm__screen"><div class="media"><div class="mui">${V[p.vis]()}</div></div></div><div class="pm__grid is--one"><section class="pm__sec"><h3>What it does</h3><ul class="fl">${p.does.map(t => LI(t)).join('')}</ul></section><section class="pm__sec"><h3>What it replaces</h3><p class="pm__was">${esc(p.replaces)}</p></section></div></div><div class="pm__nav"><button class="btn" type="button" data-theme="bone" data-pm="-1"><span class="btn__label">← ${esc(prev)}</span></button><button class="btn" type="button" data-theme="ink" data-shape="round" data-pm="1"><span class="btn__label">${esc(next)} →</span></button></div></div>`;
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
    const n = C.tools.length;
    openPortal((portalIndex + (+b.dataset.pm) + n) % n);
    $('.modal[data-modal="portal"] .modal__panel').focus({ preventScroll: true });
  });
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
  root.setAttribute('aria-label', 'Tools. Use left and right arrow keys to browse, Enter to open a tool.');
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

function renderCal(view) {
  const d = C.day[view];
  $('#cal-features').innerHTML = d.feats.map(t => LI(t, 'n')).join('');
  let k = 0;
  $('#cal-grid').innerHTML = d.days.map(evs => `<div class="cal__day">${evs.map(([t, l, c]) => `<div class="cal__ev${c ? ' is--' + c : ''}" style="--k:${k++}">${t ? `<span>${esc(t)}</span>` : ''}<b>${esc(l)}</b></div>`).join('')}</div>`).join('');
  $$('[data-cal-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.calView === view)));
}

function renderStats() {
  const th = ['is--violet', '', '', 'is--dark', 'is--volt'];
  $('#stats').innerHTML = C.stats.map(([n, l, s], i) => `<li class="edge-card stat ${th[i]}"><span class="edge-card__n eyebrow">${esc(s)}</span><b class="stat__n tnum">${esc(n)}</b><p class="p-m">${esc(l)}</p></li>`).join('');
}

let personActive = -1;
function setPerson(i) {
  if (i === personActive) return;
  personActive = i;
  const p = C.people[i], S = C.steps;
  $$('#people-tabs [data-person]').forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
  const rail = S.map((s, k) => `<li class="${k === p.leak ? 'is--leak' : k < p.leak ? 'is--ok' : ''}"><i></i><span>${esc(s.name)}</span></li>`).join('');
  $('#person').innerHTML = `<article class="person__card">
    <div class="person__id">
      <span class="person__icon">${KI(p.icon)}</span>
      <div><span class="eyebrow">${esc(p.age)} · ${esc(p.where)}</span><h4 class="h-m">${esc(p.name)}</h4></div>
      <p class="scribble person__quote">“${esc(p.quote)}”</p>
      <dl class="person__facts"><div><dt>Finds you on</dt><dd>${esc(p.finds)}</dd></div><div><dt>Pays with</dt><dd>${esc(p.pays)}</dd></div><div><dt>Spends</dt><dd>${esc(p.budget)}</dd></div></dl>
    </div>
    <div class="person__loop">
      <span class="eyebrow">Where they drop off today</span>
      <ol class="person__rail">${rail}</ol>
      <p class="person__why"><b>Step ${pad(p.leak + 1)} · ${esc(S[p.leak].name)}.</b> ${esc(p.why)}</p>
      <div class="person__win"><span class="eyebrow">What wins them</span><b class="h-xs">${esc(p.win)}</b><div class="kbchips">${p.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div></div>
      <ul class="fl person__wants">${p.wants.map(t => LI(t, 'b')).join('')}</ul>
    </div>
  </article>`;
}
function renderPeople() {
  $('#people-tabs').innerHTML = C.people.map((p, i) => `<button type="button" role="tab" data-person="${i}" aria-selected="${i === 0}" aria-controls="person"><span class="people__ic">${KI(p.icon)}</span><span>${esc(p.short)}</span></button>`).join('');
  $('#people-tabs').addEventListener('click', e => { const b = e.target.closest('[data-person]'); if (b) setPerson(+b.dataset.person); });
  $('#people-tabs').addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = C.people.length, i = (personActive + (e.key === 'ArrowRight' ? 1 : -1) + n) % n;
    setPerson(i);
    $(`#people-tabs [data-person="${i}"]`).focus();
  });
  setPerson(0);
}
function renderTools() {
  const list = `<div class="marquee__list">${C.tactics.map(t => `<span class="tool-pill"><i></i>${esc(t)}</span>`).join('')}</div>`;
  $('#tools-marquee').innerHTML = list + list.replace('class="marquee__list"', 'class="marquee__list" aria-hidden="true"');
}

function renderMoney() {
  $('#plugs').innerHTML = C.plugs.map(t => `<li>${esc(t)}</li>`).join('');
}

function renderRoad() {
  const last = C.road.length - 1;
  $('#road').innerHTML = C.road.map(([code, phase, items, why, when], i) => `<li class="road__item${i === 0 ? ' is--now' : ''}${i === last ? ' is--future' : ''}">
    <div class="road__label"><span class="road__code">${esc(code)}</span><span class="h-xs">${esc(phase)}</span><span class="road__when eyebrow">${esc(when)}</span>${i === last ? '<span class="tag" data-theme="violet" data-shape="round">Future scope</span>' : ''}</div>
    <div class="road__dot" aria-hidden="true"></div>
    <div class="road__body"><ul class="mods is--light">${items.map(t => `<li>${esc(t)}</li>`).join('')}</ul><p class="road__why"><span class="scribble">${i === 0 ? 'First:' : i === last ? 'Later:' : 'Why:'}</span> ${esc(why)}</p></div>
  </li>`).join('');
  $('#need').innerHTML = C.need.map(t => `<li>${esc(t)}</li>`).join('');
}

function renderWorks() {
  $('#works').innerHTML = C.work.map((w, i) => `<article class="wk${i === 0 ? ' is--lead' : ''}${w.phone ? ' is--phone' : ''}">
    <a class="wk__shot" href="${w.href}" target="_blank" rel="noopener" aria-label="${esc(w.cta)}: ${esc(w.name)}">
      <span class="wk__bar" aria-hidden="true"><i></i><i></i><i></i><em>${esc(w.href.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</em></span>
      <img src="${w.img}" alt="${esc(w.name)} screen" loading="lazy" decoding="async">
    </a>
    <div class="wk__text">
      <span class="wk__n tnum">${pad(i + 1)}</span>
      <h3 class="${i === 0 ? 'h-l' : 'h-s'}">${esc(w.name)}</h3>
      <p class="wk__what">${esc(w.what)}</p>
      <p class="p-m wk__line">${esc(w.line)}</p>
      <ul class="pills">${w.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <div class="btn-row">
        <a class="btn" data-theme="${i === 0 ? 'volt' : 'ink'}" data-shape="round" data-size="s" href="${w.href}" target="_blank" rel="noopener"><span class="btn__label">${esc(w.cta)}</span><svg class="btn__icon" viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></a>
        ${w.deck ? `<a class="btn" data-theme="bone" data-size="s" href="${w.deck}"><span class="btn__label">Open the deck</span></a>` : ''}
      </div>
    </div>
  </article>`).join('');
}

function renderVisuals() {
  $$('[data-visual]').forEach(el => {
    const fn = V[el.dataset.visual];
    if (fn) el.innerHTML = fn();
  });
}
function renderDash() {
  $('#dash').innerHTML = dashHTML(false);
  $('#mini-dash').innerHTML = dashHTML(false);
}

/* ---------- Interactions ---------- */
function initMess() {
  const root = $('[data-mess]');
  let touched = false;
  const set = s => { root.dataset.state = s; $$('[data-mess-set]', root).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.messSet === s))); };
  $$('[data-mess-set]', root).forEach(b => b.addEventListener('click', () => { touched = true; set(b.dataset.messSet); }));
  if (!reduce) onVisible($('.mess__stage'), (v, io) => { if (v) { io.disconnect(); setTimeout(() => { if (!touched) set('os'); }, 1600); } }, { threshold: 0.55 });
  let wasMobile = isMobile();
  window.addEventListener('resize', () => { if (isMobile() !== wasMobile) { wasMobile = isMobile(); renderMess(); } });
}
function initPreview() {
  const end = $('.invest__end');
  $$('[data-preview]', end).forEach(b => b.addEventListener('click', () => {
    const light = b.dataset.preview === 'light';
    end.dataset.themePreview = light ? 'light' : 'dark';
    $$('[data-preview]', end).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    $('#mini-dash').innerHTML = dashHTML(light);
  }));
}

/* ---------- Motion (GSAP) ---------- */
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
  gsap.ticker.add(() => {
    const y = window.scrollY, v = Math.abs(y - lastY); lastY = y;
    boost = Math.max(boost * 0.92, Math.min(v, 80));
    const t = hovering ? 0.25 : 1 + boost * 0.9;
    spin.timeScale(spin.timeScale() + (t - spin.timeScale()) * 0.08);
  });
}
function initFunnelMotion() {
  if (!hasG || reduce || !window.ScrollTrigger) return;
  gsap.from('#funnel-rows .fn__track', { scaleX: 0, transformOrigin: '0 50%', duration: 1.2, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: '#funnel-rows', start: 'top 85%', once: true } });
}

/* ---------- Boot ---------- */
safe('render', () => {
  renderVisuals(); renderRadial(); renderTicker(); renderAudit(); renderMess(); renderPains(); renderFunnel();
  renderLoop(); renderStages(); renderDocs(); renderDash(); renderPortals(); renderCal('owner');
  renderStats(); renderTools(); renderMoney(); renderRoad(); renderWorks();
  $$('[data-year]').forEach(e => { e.textContent = String(new Date().getFullYear()); });
});
safe('people', renderPeople);
safe('buttons', () => initButtons());
safe('lenis', initLenis);
safe('nav', initNav);
safe('events', initGlobalEvents);
safe('journey', initJourney);
safe('flick', initFlick);
safe('portalModal', initPortalModal);
safe('copy', initCopy);
safe('cursor', () => initCursor('.flick__item.is--active'));
safe('mess', initMess);
safe('funnel', initFunnel);
safe('calc', initCalc);
safe('paper', initPaper);
safe('preview', initPreview);
safe('cal', () => $$('[data-cal-view]').forEach(b => b.addEventListener('click', () => renderCal(b.dataset.calView))));
safe('hero', initHero);
safe('radial', initRadialMotion);
safe('funnelMotion', initFunnelMotion);
safe('reveals', initReveals);
if (hasG && window.ScrollTrigger) window.addEventListener('load', () => ScrollTrigger.refresh());
