/* ===== Mini screens: the Heaven Gadgets system, simplified. Products, prices, names and numbers are samples. ===== */
const KI = id => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#k-${id}"/></svg>`;
const inr = n => '₹' + new Intl.NumberFormat('en-IN').format(Math.round(n));
const PR = [
  { n: 'Classic Clog · Black', p: 1499, ph: 'clog', st: 3 },
  { n: 'Chrono Steel Watch', p: 2499, ic: 'watch', tone: 'dark', st: 6 },
  { n: 'Pro Buds ANC', p: 1299, ic: 'buds', tone: 'blue', st: 12 },
  { n: 'Smart Watch X', p: 1999, ic: 'swatch', tone: 'ink', st: 0 },
  { n: 'Studio Headphones', p: 2199, ic: 'phones', tone: 'ice', st: 4 },
  { n: 'Street Sneaker', p: 2299, ic: 'sneaker', tone: 'sand', st: 8 },
  { n: 'Beard Trimmer', p: 999, ic: 'trimmer', tone: 'red', st: 9 },
  { n: 'Aviator Shades', p: 699, ic: 'shades', tone: 'sand', st: 15 }
];
const CH = (t, c = '', n) => `<span class="k__chip ${c}">${t}${n != null ? `<i>${n}</i>` : ''}</span>`;
const IC = id => `<span class="k__ic">${KI(id)}</span>`;
const PI = (p, w) => p.ph ? `<span class="k__pi ph" style="${w ? `width:${w}em;` : ''}--ph:var(--img-${p.ph})"></span>` : `<span class="k__pi ${p.tone || ''}"${w ? ` style="width:${w}em"` : ''}>${KI(p.ic)}</span>`;
const STK = s => (s === 0 ? '<span class="kst out">Sold out</span>' : s <= 3 ? `<span class="kst low">${s} left</span>` : '<span class="kst ok">In stock</span>');
const PCARD = p => `<div class="kp">${PI(p)}<span class="kp__n">${p.n}</span><div class="kp__row"><span class="kp__p">${inr(p.p)}</span>${STK(p.st)}</div></div>`;
const TOP = (on = 0, m = false) => `<div class="k__top"><i class="k__logo"></i><span class="k__word"><b>HEAVEN GADGETS</b><small>Ongole</small></span>${m ? '<span style="flex:1"></span>' : `<span class="k__links">${['New', 'Footwear', 'Watches', 'Gadgets', 'Grooming'].map((t, i) => `<span class="${i === on ? 'on' : ''}">${t}</span>`).join('')}</span>`}<span class="k__icons">${KI('search')}<span class="k__bag">${KI('bag')}<i>2</i></span></span></div>`;
const SIDE = ['home', 'box', 'receipt', 'truck', 'users', 'chat', 'phonecall', 'chart'];
const ADM = (on, body) => `<div class="k__app"><div class="k__side"><i class="k__logo"></i>${SIDE.map((s, i) => `<span class="${i === on ? 'on' : ''}">${KI(s)}</span>`).join('')}</div><div class="k__main">${body}</div></div>`;
const HD = (t, right = '') => `<div class="k__hd"><span class="k__t">${t}</span><span class="k__row" style="gap:.3em">${right}</span></div>`;
const FAB = `<span class="kwa-fab">${KI('chat')}</span>`;
const BIO = future => `<div class="kig__bio"><span>Heaven Gadgets Ongole 📍</span><span>🛍️ Premium Gadgets Store</span><span>⌚ Watches | 👟 Footwear</span>${future ? '<span><b>🛒 Shop online · link below</b></span>' : '<span class="kig__mark">📩 DM for orders</span>'}</div>`;

const V = {
  /* ---------- Today (what we found) ---------- */
  ig(future = false) {
    const posts = [['sign', 0], ['camo', 1], ['clog', 1], ['owner', 1]];
    return `<div class="kig"><div class="kig__head"><div class="kig__who"><i class="k__logo"></i><div class="k__col" style="gap:.4em"><b class="kig__name">heavengadgets_ongole</b><div class="kig__nums"><span><b>41</b> posts</span><span><b>1,168</b> followers</span></div></div></div>${BIO(future)}<div class="kig__btns"><span>Following</span><span class="${future ? 'blue' : ''}">${future ? 'Shop now' : 'Message'}</span></div></div><div class="kig__grid">${posts.map(([img, s]) => `<i class="${future && s ? 'shop' : ''}" style="--ph:var(--img-${img})"></i>`).join('')}</div></div>`;
  },
  reels() { return V.ig(true); },
  wachat() {
    const chats = [['ST', 'Sai Teja', 'Bro price?', 3, 'b'], ['+91', '+91 93••• ••417', 'Size 9 undha?', 2, ''], ['PM', 'Priya M.', 'Is the watch there?', 1, 'r'], ['HV', 'Harsha V.', 'Sent UPI screenshot', 1, 'g'], ['KR', 'Kiran R.', 'Where is my parcel?', 4, 'a'], ['+91', '+91 70••• ••902', 'Hi', 1, '']];
    return `<div class="kwa" style="flex-direction:row"><div class="kwa__list"><b>Chats · 12 unread</b>${chats.map(([a, n, m, c, t], i) => `<div class="kwa__chat"${i === 0 ? ' style="background:#F0F2F5"' : ''}><span class="k__av ${t}">${a}</span><span><b>${n}</b><em>${m}</em></span><i>${c}</i></div>`).join('')}</div><div class="k__col" style="flex:1;gap:0"><div class="kwa__top"><span class="k__av b">ST</span><span><b>Sai Teja</b><small>online</small></span></div><div class="kwa__msgs"><div class="kwa__b">Bro price? 👟<small>10:02</small></div><div class="kwa__b">Black clog size 9 undha?<small>10:15</small></div><div class="kwa__b">Bro??<small>13:40</small></div><span class="k__chip bad" style="align-self:center;margin-top:auto">No reply for 3 hours</span></div></div></div>`;
  },
  shelf() {
    return `<i class="kshelf"></i><div class="kshelf__card"><div class="kshelf__search">${KI('search')}<span>heaven gadgets ongole clogs</span></div><div class="k__row"><span class="kq">?</span><span class="k__s"><b>No website.</b> No online catalogue.</span></div><span class="k__ln" style="width:82%"></span><span class="k__ln" style="width:56%"></span></div>`;
  },
  nodata() {
    const rows = [['Bought clogs', 'March'], ['Bought a watch', 'Last week'], ['Gift for a friend', 'Diwali']];
    return ADM(4, HD('Customers', CH('0 saved', 'bad')) + `<div class="k__col" style="gap:.4em">${rows.map(([w, t]) => `<div class="kghost"><span class="kq">?</span><span style="flex:1">Name? · Number? · ${w}</span><span>${t}</span></div>`).join('')}</div><div class="k__card" style="margin-top:auto;align-items:center;text-align:center"><b class="k__t" style="white-space:normal">Who bought from you <em>last month?</em></b><span class="k__s k__mut">No names. No numbers. No history.</span></div>`);
  },
  noads() {
    const st = [['eye', 'Reach', '2,300'], ['user', 'Profile visits', '160'], ['chat', 'Messages', '41']];
    return `<div class="kad"><div class="kad__post"><div class="k__row" style="padding:.45em .55em"><i class="k__logo" style="width:1.4em;height:1.4em"></i><b class="k__s">heavengadgets_ongole</b><span class="k__xs k__mut" style="margin-left:auto">Sponsored</span></div><i class="kad__img"></i><div class="kad__cta"><span>Send message</span>${KI('chat')}</div></div><div class="k__col" style="gap:.4em"><span class="k__t">Boosted <em>post</em></span>${st.map(([i, l, v]) => `<div class="k__li">${IC(i)}<span>${l}</span><b style="margin-left:auto">${v}</b></div>`).join('')}<div class="k__li">${IC('rupee')}<span>Sales from this ad</span>${CH('Unknown', 'bad')}</div><div class="kalert" style="margin-top:auto">${KI('link')}<span>No store page for the ad to open</span></div></div></div>`;
  },

  /* ---------- Customer side ---------- */
  home(m = false) {
    const items = m ? [0, 1, 2, 4] : [0, 1, 2, 3];
    return TOP(0, m) + `<div class="kbanner"><div class="k__col" style="gap:.35em"><span class="kbanner__eb">New drop · this week</span><b class="kbanner__h">Clogs for <em>every mood.</em></b><span class="k__btn" style="align-self:flex-start;margin-top:.3em">Shop the drop</span></div><i class="kbanner__img"></i></div><div class="kcats">${['All', 'Footwear', 'Watches', 'Gadgets', 'Grooming', 'Style'].map((t, i) => CH(t, i ? '' : 'on')).join('')}</div><div class="kgrid">${items.map((i, k) => { let c = PCARD(PR[i]); if (k === 0) c = c.replace('<span class="kst', '<span data-pin="1" class="kst'); if (k === 2) c = c.replace('<span class="kp__p"', '<span data-pin="2" class="kp__p"'); return c; }).join('')}</div>${FAB.replace('<span class="kwa-fab"', '<span data-pin="3" class="kwa-fab"')}`;
  },
  mhome() { return V.home(true); },
  product(m = false) {
    const sz = [['6', 5], ['7', 8], ['8', 2], ['9', 3], ['10', 0], ['11', 4]];
    const info = `<div class="kpdp__info"><span class="k__xs k__mut">FOOTWEAR · CLOGS</span><b class="k__t">Classic Clog · Black</b><div class="kpdp__price"><b>₹1,499</b><s>₹1,999</s>${CH('25% off', 'bad')}</div><span class="k__s k__mut">Pick your size (UK)</span><div class="ksz">${sz.map(([s, n]) => `<span class="${n === 0 ? 'out' : n <= 3 ? 'low' : ''}${s === '9' ? ' on' : ''}">${s}<small>${n === 0 ? 'Sold' : n <= 3 ? n + ' left' : 'In'}</small></span>`).join('')}</div><div class="kalert">${KI('bolt')}<span>Only 3 left in UK 9</span></div><div class="k__row"><span class="k__btn" style="flex:1">Add to bag</span><span class="k__btn wa">Ask</span></div><span class="ksafe">${KI('truck')}<span>Ships in 24 hours · all India</span></span></div>`;
    return TOP(1, m) + `<div class="kpdp"${m ? ' style="grid-template-columns:minmax(0,1fr);grid-template-rows:auto 1fr"' : ''}><div class="kpdp__img"${m ? ' style="aspect-ratio:1.15"' : ''}><i class="kpdp__reel"></i></div>${info}</div>`;
  },
  mproduct() { return V.product(true); },
  checkout() {
    return TOP(1) + `<div class="kco"><div class="k__col" style="gap:.45em"><span class="k__t">Checkout</span><div class="k__card"><span class="k__xs k__mut">DELIVER TO</span><b class="k__s">Sai Teja · Hyderabad 500032</b><span class="k__s k__mut">+91 93••• ••417</span></div><span class="k__s k__mut">Pay in full</span><div class="kpay"><span class="on">${KI('qr')}UPI</span><span>${KI('card')}Card</span><span>${KI('building')}Net banking</span></div><span class="ksafe">${KI('shield')}<span>Paid orders ship first</span></span><div class="k__li" style="margin-top:auto">${IC('truck')}<span>Arrives in 3–5 days · tracking on WhatsApp</span></div></div><div class="k__card" style="gap:.45em"><span class="k__s k__mut">Your order</span><div class="k__row k__s">${PI(PR[0], 2.2)}<span style="flex:1">Classic Clog · UK 9</span><b>₹1,499</b></div><div class="k__row k__s"><span class="k__pi ice" style="width:2.2em">${KI('swatch')}</span><span style="flex:1">Silicone strap</span><b>₹299</b></div><div class="k__row k__sb k__s"><span class="k__mut">Delivery</span><b style="color:#067647">Free</b></div><div class="ktot"><span>Total</span><b>₹1,798</b></div><span class="k__btn" style="width:100%">Pay ₹1,798</span></div></div>`;
  },
  wabill(m = false) {
    return `<div class="kwa"><div class="kwa__top"><i class="k__logo"></i><span><b>Heaven Gadgets</b><small>Business account</small></span></div><div class="kwa__msgs"><div class="kwa__b">Thanks for shopping, Ravi! 🙌 Here is your bill.<div class="kwa__doc" style="margin-top:.4em"><i>PDF</i><span><b>Bill HG-1042</b><br><span class="k__mut">₹1,798 · UPI</span></span></div><small>11:04</small></div><div class="kwa__b">+18 Heaven points added. You have 54. ⭐<small>11:04</small></div><div class="kwa__b out">Super, thanks! 👍<small>11:06</small></div>${m ? '' : '<div class="kwa__b">How was your visit today?<span class="kwa__cta">⭐ ⭐ ⭐ ⭐ ⭐</span><small>11:07</small></div>'}${m ? '<div class="kwa__b"><i class="kwa__img"></i>New clogs just landed in UK 9. Want first pick?<span class="kwa__cta">Shop the drop</span><small>Sat 19:30</small></div>' : ''}</div></div>`;
  },
  mwa() { return V.wabill(true); },
  track() {
    return TOP(0) + `<div class="k__main"><div class="k__hd"><span class="k__t">Order <em>#HG-2087</em></span>${CH('Prepaid', 'ok')}</div><div class="k__card"><div class="ktrack"><span class="done"><i>${KI('check')}</i>Paid</span><span class="done"><i>${KI('box')}</i>Packed</span><span class="done now"><i>${KI('truck')}</i>Shipped</span><span><i>${KI('home')}</i>Delivered</span></div></div><div class="k__grid2"><div class="k__li">${IC('truck')}<span>Courier · AWB 7741 2290</span></div><div class="k__li">${IC('clock')}<span>Arrives Thursday</span></div></div><div class="k__li">${IC('chat')}<span>Updates on WhatsApp · Hyderabad 500032</span>${CH('On', 'blue')}</div></div>`;
  },

  /* ---------- Owner side ---------- */
  dash() {
    const bars = [[52, 18], [60, 22], [48, 20], [70, 30], [64, 26], [88, 40], [76, 34]];
    const top = [[PR[0], '14 sold'], [PR[2], '9 sold'], [PR[1], '6 sold']];
    return ADM(0, HD('Today <em>at a glance</em>', CH('Ongole store', 'on') + CH('Live', 'ok'))
      + `<div class="kkpi"><div data-pin="1"><small>Sales today</small><b>₹42,380</b><em>▲ 12%</em></div><div><small>Bills</small><b>31</b><em>▲ 4</em></div><div class="is--dark"><small>Online orders</small><b>9</b><em>▲ 3</em></div><div class="is--blue"><small>New buyers</small><b>14</b><em>saved</em></div></div>`
      + `<div class="k__row" style="flex:1;align-items:stretch;gap:.5em;min-height:0"><div class="k__card" style="flex:1.4"><div class="k__row k__sb"><b class="k__s">Sales this week</b><div class="klegend"><span><i></i>Store</span><span><i class="b"></i>Online</span></div></div><div class="kchart">${bars.map(([a, b]) => `<div><i style="height:${a}%"></i><i style="height:${b}%"></i></div>`).join('')}</div></div><div class="k__card" style="flex:1"><b class="k__s" data-pin="2">Best sellers</b>${top.map(([p, s]) => `<div class="k__row k__s">${PI(p, 1.9)}<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">${p.n}</span><b>${s}</b></div>`).join('')}<div class="k__li" data-pin="3" style="margin-top:auto">${IC('bell')}<span>UK 9 clogs: 3 left</span>${CH('Reorder', 'warn')}</div></div></div>`);
  },
  stock() {
    const rows = [[PR[0], [5, 8, 2, 3, 0, 4]], [{ n: 'Camo Clog · Forest', ph: 'camo' }, [3, 6, 4, 1, 2, 0]], [PR[5], [4, 5, 7, 6, 3, 1]], [{ n: 'Slide · Olive', ic: 'clog', tone: 'ice' }, [6, 9, 8, 5, 4, 2]]];
    const cell = n => `<span class="c${n === 0 ? ' out' : n <= 2 ? ' low' : ''}">${n}</span>`;
    return ADM(1, HD('Inventory <em>· live</em>', CH('All stores') + CH('Low', 'warn', 6).replace('<span class="k__chip', '<span data-pin="2" class="k__chip') + '<span class="k__btn">Add stock</span>')
      + `<div class="k__card"><div class="kstock"><span class="h" data-pin="1">FOOTWEAR · UK</span>${['6', '7', '8', '9', '10', '11'].map(s => `<span class="h">${s}</span>`).join('')}${rows.map(([p, c]) => `<span class="p">${PI(p)}<span>${p.n}</span></span>${c.map(cell).join('')}`).join('')}</div></div>`
      + `<div class="k__grid3">${[[PR[1], 6], [PR[2], 12], [PR[3], 0]].map(([p, n]) => `<div class="k__li">${PI(p, 1.8)}<span>${p.n}</span>${n ? CH(n + ' in', n < 5 ? 'warn' : 'ok') : CH('Out', 'bad')}</div>`).join('')}</div><div class="k__grid2"><div class="k__card"><div class="k__row k__sb"><b class="k__s">Reorder list</b>${CH('3 sizes', 'warn')}</div><span class="k__s k__mut">Classic Clog · UK 8, 9, 10</span><span class="k__bar"><i style="width:28%;background:linear-gradient(90deg,#F79009,#FDB022)"></i></span><span class="k__btn" style="align-self:flex-start">Order from supplier</span></div><div class="k__card"><div class="k__row k__sb"><b class="k__s">Barcode labels</b>${CH('24 ready', 'blue')}</div><span class="k__s k__mut">New stock, tagged by size</span><span class="k__s" style="font-family:var(--font-mono);letter-spacing:.2em">▮▯▮▮▯▮▯▮▮▯▮</span><span class="k__btn ink" style="align-self:flex-start">Print labels</span></div></div><div class="k__row k__s k__mut" data-pin="3" style="margin-top:auto">${KI('repeat').replace('<svg', '<svg style="width:1.2em;height:1.2em"')}<span>The store and the website share one count</span></div>`);
  },
  pos() {
    const grid = [0, 1, 2, 4, 5, 6];
    return ADM(2, HD('New bill <em>#HG-1042</em>', `<span class="kphone" data-pin="1">${KI('phone')}+91 98••• ••210 · Ravi K.</span>`)
      + `<div class="kpos"><div class="kpos__grid">${grid.map(i => PCARD(PR[i]).replace('class="kp"', `class="kp${i === 0 ? ' on' : ''}"`)).join('')}</div><div class="k__card" style="gap:.45em"><b class="k__s">This bill</b><div class="k__row k__s">${PI(PR[0], 2)}<span style="flex:1">Clog · UK 9</span><b>₹1,499</b></div><div class="k__row k__s"><span class="k__pi ice" style="width:2em">${KI('swatch')}</span><span style="flex:1">Strap</span><b>₹299</b></div><div class="kseg" data-pin="2"><span>Cash</span><span class="on">UPI</span><span>Card</span></div><div class="k__row k__sb k__s"><span class="k__mut">GST bill</span>${CH('On', 'blue')}</div><div class="ktot"><span>Total</span><b>₹1,798</b></div><span class="k__btn" data-pin="3" style="width:100%">Bill · send on WhatsApp</span></div></div>`);
  },
  orders() {
    const col = (t, n, cards, pin) => `<div${pin ? ` data-pin="${pin}"` : ''}><h6>${t}<i>${n}</i></h6>${cards.map(([id, who, v, hot]) => `<div class="kord${hot ? ' is--hot' : ''}"><b>${id} · ${v}</b><span>${who}</span></div>`).join('')}</div>`;
    return ADM(3, HD('Online orders <em>· today</em>', CH('Prepaid only', 'ok') + '<span class="k__btn ink" data-pin="2">Print labels</span>')
      + `<div class="kkan">${col('New', 3, [['#2091', 'Sai T. · Hyderabad', '₹2,299', 1], ['#2090', 'Anil · Chirala', '₹1,499'], ['#2089', 'Divya · Chennai', '₹999']], 1)}${col('Packed', 2, [['#2088', 'Rahul · Guntur', '₹2,499'], ['#2087', 'Priya · Bengaluru', '₹1,798']])}${col('Shipped', 4, [['#2086', 'Kiran · Nellore', '₹1,299'], ['#2085', 'Teja · Vijayawada', '₹2,199']], 3)}${col('Delivered', 12, [['#2081', 'Manoj · Ongole', '₹699'], ['#2080', 'Sneha · Kurnool', '₹1,499']])}</div>`);
  },
  crm() {
    const list = [['RK', 'Ravi K.', 'Ongole · clogs, straps', 'VIP', 'blue', 'b'], ['PM', 'Priya M.', 'Kandukur · watches', 'Regular', '', 'r'], ['ST', 'Sai Teja', 'Hyderabad · sneakers', 'New', 'ok', 'g'], ['HV', 'Harsha V.', 'Addanki · earbuds', 'Regular', '', 'a'], ['KR', 'Keerthi R.', 'Ongole · gifts', 'VIP', 'blue', 'l']];
    return ADM(4, HD('Customers <em>1,284</em>', CH('VIP', 'on', 86).replace('<span class="k__chip', '<span data-pin="2" class="k__chip') + CH('Regular', '', 412) + CH('New', '', 786))
      + `<div class="kcrm"><div class="k__col" style="gap:.35em">${list.map(([a, n, d, t, c, av]) => `<div class="k__li"><span class="k__av ${av}">${a}</span><span><b>${n}</b> <span class="k__mut">${d}</span></span>${CH(t, c)}</div>`).join('')}<div class="k__li" style="margin-top:auto;background:#EAF1FF;border-color:#C7D9FF">${IC('gift')}<span><b>3 birthdays</b> this week</span><span class="k__btn" style="margin-left:auto;font-size:.9em">Send wishes</span></div></div><div class="kprof" data-pin="1"><div class="kprof__top"><span class="k__av">RK</span><div class="k__col" style="gap:.15em"><b class="k__s" style="font-size:.75em">Ravi K.</b><span class="k__xs k__mut">Ongole · since March</span></div></div><div class="kprof__stats"><span><b>6</b>bills</span><span><b>₹9.4K</b>spent</span><span><b>UK 9</b>size</span></div><div class="k__row" style="flex-wrap:wrap;gap:.3em">${CH('Footwear fan', 'blue')}${CH('Watches')}<span class="k__chip" data-pin="3">54 points</span></div><span class="k__xs k__mut">Birthday · 14 November</span><span class="k__btn" style="margin-top:auto">Send an offer</span></div></div>`);
  },
  blast() {
    const res = [['Sent', 412, 100], ['Read', 371, 90], ['Clicked', 96, 23], ['Bought', 23, 6]];
    return ADM(5, HD('Offers <em>on WhatsApp</em>', '<span class="k__btn wa">Send to 412</span>')
      + `<div class="k__row" style="flex:1;align-items:stretch;gap:.5em;min-height:0"><div class="k__card" style="flex:1"><span class="k__xs k__mut">WHO GETS IT</span><div class="k__row" data-pin="1" style="flex-wrap:wrap;gap:.3em">${CH('Sneaker fans', 'on', 412)}${CH('VIP', '', 86)}${CH('Quiet 60 days', '', 230)}</div><span class="k__xs k__mut">MESSAGE</span><div class="kwa" data-pin="2" style="flex:none;border-radius:.5em;padding:.45em"><div class="kwa__b" style="max-width:100%"><i class="kwa__img" style="height:3.6em"></i>New clogs just landed. UK 6–11. Regulars get first pick!<span class="kwa__cta">Shop the drop</span></div></div></div><div class="k__card" style="flex:.9"><span class="k__xs k__mut" data-pin="3">LAST OFFER · RESULTS</span>${res.map(([l, v, p]) => `<div class="k__col" style="gap:.2em"><div class="k__row k__sb k__s"><span>${l}</span><b>${v}</b></div>${`<span class="k__bar"><i style="width:${p}%"></i></span>`}</div>`).join('')}<div class="k__li" style="margin-top:auto">${IC('rupee')}<span>Sales from it</span><b style="margin-left:auto">₹34,500</b></div></div></div>`);
  },
  voice() {
    const calls = [['RK', 'Ravi K.', 'Kept UK 9 for Saturday', 'Reserved', 'ok', 'b'], ['PM', 'Priya M.', 'Coming for the sale', 'Visit', 'blue', 'r'], ['HV', 'Harsha V.', 'No answer · retry 6 pm', 'Retry', 'warn', 'a'], ['KR', 'Keerthi R.', 'Asked about gift combos', 'WhatsApp sent', 'blue', 'l']];
    const wave = [30, 60, 90, 50, 75, 40, 85, 55, 35, 70, 45, 25];
    return ADM(6, HD('Voice agent <em>· calls</em>', CH('Opt-in list', 'ok', 86) + CH('Telugu', 'on'))
      + `<div class="kvoice"><div class="kcall" data-pin="1"><i class="k__logo"></i><b class="k__s" style="font-size:.7em">Calling Ravi K.</b><span class="kcall__wave">${wave.map(h => `<i style="height:${h}%"></i>`).join('')}</span><small>01:12 · Weekend drop invite</small>${CH('Live', 'blue')}</div><div class="k__col" style="gap:.35em">${calls.map(([a, n, d, t, c, av], i) => `<div class="k__li"${i === 0 ? ' data-pin="2"' : i === calls.length - 1 ? ' data-pin="3"' : ''}><span class="k__av ${av}">${a}</span><span><b>${n}</b> <span class="k__mut">${d}</span></span>${CH(t, c)}</div>`).join('')}</div></div>`);
  }
};
