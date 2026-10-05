/* ===== Mini screens: the Heaven Gadgets system, simplified. Products, prices, names and numbers are samples. ===== */
const KI = id => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#k-${id}"/></svg>`;
const inr = n => '₹' + new Intl.NumberFormat('en-IN').format(Math.round(n));
const PR = [
  { n: 'Classic Clog · Black', p: 1499, ph: 'clog', st: 3 },
  { n: 'Chrono Steel Watch', p: 2499, ph: 'w1', full: 1, st: 6 },
  { n: 'Pro Buds ANC', p: 1299, ph: 'buds', full: 1, st: 12 },
  { n: 'Smart Watch X', p: 1999, ph: 'sw', z: 118, st: 0 },
  { n: 'Studio Headphones', p: 2199, ph: 'hp', z: 122, st: 4 },
  { n: 'Street Runner', p: 2299, ph: 's1', z: 150, st: 8 },
  { n: 'Court Low · Maroon', p: 1899, ph: 's3', full: 1, st: 9 },
  { n: 'Round Shades', p: 699, ph: 'sg', z: 125, st: 15 }
];
const CH = (t, c = '', n) => `<span class="k__chip ${c}">${t}${n != null ? `<i>${n}</i>` : ''}</span>`;
const IC = id => `<span class="k__ic">${KI(id)}</span>`;
const PI = (p, w) => `<span class="k__pi${p.full ? ' full' : ''}" style="${w ? `width:${w}em;` : ''}${p.z ? `--pz:${p.z}%;` : ''}--ph:var(--img-${p.ph})"></span>`;
const STK = s => (s === 0 ? '<span class="kst out">Sold out</span>' : s <= 3 ? `<span class="kst low">${s} left</span>` : '<span class="kst ok">In stock</span>');
const PCARD = p => `<div class="kp">${PI(p)}<span class="kp__n">${p.n}</span><div class="kp__row"><span class="kp__p">${inr(p.p)}</span>${STK(p.st)}</div></div>`;
const TOP = (on = 0) => `<div class="k__top"><i class="k__logo"></i><span class="k__word"><b>HEAVEN GADGETS</b></span><span class="k__links">${['New', 'Footwear', 'Watches', 'Gadgets', 'Style'].map((t, i) => `<span class="${i === on ? 'on' : ''}">${t}</span>`).join('')}</span><span class="k__icons">${KI('search')}${KI('heart')}<span class="k__bag">${KI('bag')}<i>2</i></span></span></div>`;
const STARS = (n, t) => `<span class="kstars"><b>${'★'.repeat(n)}</b>${'★'.repeat(5 - n)}<i>${t}</i></span>`;
const SZ = on => [['6', 5], ['7', 8], ['8', 2], ['9', 3], ['10', 0], ['11', 4]].map(([z, n]) => `<span class="${n === 0 ? 'out' : ''}${z === on ? ' on' : ''}">${z}</span>`).join('');
const MNAV = on => `<div class="km__nav">${[['home', 'Home'], ['search', 'Search'], ['bag', 'Bag'], ['user', 'You']].map(([ic, t], i) => `<span class="${i === on ? 'on' : ''}">${KI(ic)}${i === on ? `<b>${t}</b>` : ''}</span>`).join('')}</div>`;
const SIDE = ['home', 'box', 'receipt', 'truck', 'users', 'chat', 'phonecall', 'chart'];
const ADM = (on, body) => `<div class="k__app"><div class="k__side"><i class="k__logo"></i>${SIDE.map((s, i) => `<span class="${i === on ? 'on' : ''}">${KI(s)}</span>`).join('')}</div><div class="k__main">${body}</div></div>`;
const HD = (t, right = '') => `<div class="k__hd"><span class="k__t">${t}</span><span class="k__row" style="gap:.3em">${right}</span></div>`;
const FAB = `<span class="kwa-fab">${KI('chat')}</span>`;
const DOTS = '<i class="kdots"></i>';
const SBAR = dark => `<div class="ksb${dark ? ' is--dark' : ''}"><b>1:42</b><i></i></div>`;
const PH = inner => `<div class="kph"><div class="kph__scr">${inner}</div></div>`;
const AV = () => `<span class="kav">${KI('user')}</span>`;
const TICKS = '<svg class="kwc__tk" viewBox="0 0 24 24" aria-hidden="true"><use href="#k-ticks"/></svg>';
/* WhatsApp, as it looks on a phone: the chat list and one conversation */
const WLIST = () => {
  const chats = [['Sai Teja', 'Bro price? 👟', '1:40 pm', 3], ['+91 93••• ••417', 'Size 9 undha?', '1:12 pm', 2], ['Priya M.', 'Is the watch there?', '12:58 pm', 1], ['Harsha V.', '📷 Photo', '12:31 pm', 1], ['Kiran R.', 'Where is my parcel?', '11:47 am', 4], ['+91 70••• ••902', 'Hi', '11:20 am', 1], ['Divya', 'Offer still there?', '10:05 am', 0]];
  return `<div class="kapp kw">${SBAR()}<div class="kw__hd"><b>WhatsApp</b><span>${KI('camera')}${DOTS}</span></div><div class="kw__search">${KI('search')}<span>Search</span></div><div class="kw__chips"><i class="on">All</i><i>Unread 12</i><i>Favourites</i><i>Groups</i></div><div class="kw__rows">${chats.map(([n, m, t, c]) => `<div class="kw__row${c ? ' is--new' : ''}">${AV()}<div><b>${n}</b><em>${m}</em></div><span><small>${t}</small>${c ? `<i>${c}</i>` : ''}</span></div>`).join('')}</div><span class="kw__fab">${KI('plus')}</span><div class="kw__nav"><span class="on"><i>${KI('chat')}</i>Chats</span><span><i>${KI('updates')}</i>Updates</span><span><i>${KI('users')}</i>Communities</span><span><i>${KI('call')}</i>Calls</span></div></div>`;
};
const WCHAT = (name, sub, body, biz) => `<div class="kapp kwc">${SBAR()}<div class="kwc__hd">${KI('back')}${biz ? '<i class="k__logo"></i>' : AV()}<div><b>${name}</b><small>${sub}</small></div><span>${KI('video')}${KI('call')}${DOTS}</span></div><div class="kwc__body">${body}</div><div class="kwc__bar"><div>${KI('smile')}<span>Message</span>${KI('clip')}${KI('camera')}</div><i>${KI('mic')}</i></div></div>`;
/* An Instagram reel with its comments open, or (later) with the product a tap away */
const IGREEL = future => `<div class="kapp kir${future ? ' is--shop' : ''}">${SBAR(true)}<i class="kir__bg"></i><div class="kir__top"><b>Reels</b>${KI('camera')}</div><div class="kir__rail"><span class="is--liked">${KI('heart')}<small>727</small></span><span>${KI('chat')}</span><span>${KI('send')}</span><span>${DOTS}</span></div><div class="kir__cap"><span><i class="k__logo"></i><b>heavengadgets_ongole</b><em>Follow</em></span><p>Offer ends Sunday 🔥</p></div>${future
  ? `<div class="kir__sheet"><i></i><div class="kir__prod">${PI(PR[0], 3.6)}<div><b>Classic Clog · Black</b><em>₹1,499 · 3 left in UK 9</em></div></div><span class="kir__buy">Buy now</span></div>`
  : `<div class="kir__sheet"><i></i><b>Comments</b>${[['sai.teja_', 'Price bro?'], ['priya.m', 'Online orders leva bro?'], ['harsha__v', 'Size 9 available?']].map(([u, t]) => `<div class="kir__c">${AV()}<div><b>${u}</b>${t}<small>Reply</small></div>${KI('heart')}</div>`).join('')}</div>`}</div>`;
/* One gap, one layout: the real screen on the left, the point in big type on the right */
const GAP = (ghost, dev, eb, h, sub, extra, pill) => `<div class="kx"><b class="kx__ghost">${ghost}</b><div class="kx__dev">${dev}</div><div class="kx__txt"><span class="khero__eb">${eb}</span><b class="khero__h">${h}</b><span class="khero__sub">${sub}</span>${extra || ''}${pill ? `<span class="kgap">${pill}</span>` : ''}</div></div>`;
const QS = list => `<div class="kx__chips">${list.map(t => `<span class="kx__q">${t}</span>`).join('')}</div>`;

const V = {
  /* ---------- Today (what we found) ---------- */
  ig(future = false) {
    return future
      ? GAP('BUY', PH(IGREEL(true)), 'From the same reel', 'See it. Tap it.<br>Buy it.', 'Every reel opens the product, with its price and live stock.', `<div class="kx__chips">${['Price shown', 'Size picked', 'Paid by UPI'].map(t => `<span class="kx__ok">${KI('check')}${t}</span>`).join('')}</div>`)
      : GAP('DM', PH(IGREEL(false)), 'Gap 01 · Instagram', '727 likes.<br>No buy button.', 'The reel sells. Then every buyer has to ask.', QS(['Price?', 'Size?', 'Online order?']), 'No way to buy from the reel');
  },
  reels() { return V.ig(true); },
  wachat() {
    const body = '<span class="kwc__day">Today</span><div class="kwc__in">Bro price? 👟<small>10:02 am</small></div><div class="kwc__in">Black clog size 9 undha?<small>10:15 am</small></div><div class="kwc__in">Bro??<small>1:40 pm</small></div>';
    return GAP('12', PH(WCHAT('Sai Teja', 'online', body)) + PH(WLIST()), 'Gap 02 · WhatsApp', '12 chats.<br>One phone.', 'Price? Size? In stock? Every buyer waits for a reply.', '', '3 hours without a reply');
  },
  shelf() {
    const app = `<div class="kapp kmp">${SBAR()}<div class="kmp__map"><i class="kmp__pin"></i></div><div class="kmp__search">${KI('back')}<span>heaven gadgets ongole</span>${KI('mic')}</div><div class="kmp__sheet"><i></i><b>Heaven Gadgets</b><span class="kmp__rate">5.0 <em>★★★★★</em> (2)</span><span class="kmp__type">Electronics store · Opens 10 am</span><div class="kmp__acts"><span class="on">${KI('dir')}Directions</span><span>${KI('bookmark')}Save</span><span>${KI('send')}Share</span></div><div class="kmp__row">${KI('pin')}<span>Lambadi St, Ongole 523001</span></div><div class="kmp__row is--miss">${KI('globe')}<span>Add website</span></div><div class="kmp__row is--miss">${KI('call')}<span>Add place’s phone number</span></div><div class="kmp__photos"><i style="--ph:var(--img-owner)"></i><i style="--ph:var(--img-sign)"></i><i style="--ph:var(--img-clog)"></i></div></div></div>`;
    return GAP('?', PH(app), 'Gap 03 · Google', 'Full wall.<br>Empty Google.', 'A search finds a pin. No products, no prices, no way to buy.', QS(['Website: missing', 'Phone: missing']), 'Nothing to open online');
  },
  nodata() {
    const bill = '<div class="kbp"><i></i><i></i><div class="kbp__page"><div class="kbp__hd"><div><b>Cash bill</b><span>Heaven Gadgets · Ongole</span></div><em>No. 0412</em></div><div class="kbp__f"><span>Name</span><i></i></div><div class="kbp__f"><span>Phone</span><i></i></div><span class="kbp__ring"></span><div class="kbp__items"><p><span>Clogs, black, 9</span><i>1,499</i></p><p><span>Watch strap</span><i>299</i></p></div><div class="kbp__tot"><span>Total</span><b>1,798</b></div><span class="kbp__paid">Paid by UPI</span></div></div>';
    return GAP('0', bill, 'Gap 04 · The counter', 'Sold today.<br>Gone tomorrow.', 'The bill has the price. It never has the buyer.', QS(['No offers', 'No call-backs', 'No regulars']), '0 buyers saved');
  },
  noads() {
    const app = `<div class="kapp kip">${SBAR(true)}<div class="kip__hd"><i class="k__logo"></i><div><b>heavengadgets_ongole</b><small>Sponsored</small></div>${DOTS}</div><i class="kip__img"></i><div class="kip__cta"><span>Send message</span>${KI('chev')}</div><div class="kip__acts">${KI('heart')}${KI('chat')}${KI('send')}<i></i>${KI('bookmark')}</div><p class="kip__cap"><b>heavengadgets_ongole</b> New clogs just landed 🔥 DM for orders</p></div>`;
    return GAP('AD', PH(app), 'Gap 05 · Meta ads', 'The ad ends<br>in a chat.', 'A boosted post can’t show a price or take a payment.', '<div class="kx__flow"><span>Reach<b>2,300</b></span><i></i><span>Messages<b>41</b></span><i></i><span class="is--bad">Sales<b>?</b></span></div><small class="kx__note">Sample numbers</small>', 'No page for the ad to open');
  },

  /* ---------- Customer side ---------- */
  home() {
    const side = [[PR[0], 1], [PR[4], 0], [PR[1], 0]];
    return TOP(1) + `<div class="khero"><b class="khero__ghost">RUNNER</b><i class="khero__img"></i><div class="khero__txt"><span class="khero__eb">New drop · this week</span><b class="khero__h">Street<br>Runner</b><span class="khero__sub">Feel light. Move free.</span><div class="khero__cta"><span class="k__btn">Shop now ${KI('trend')}</span><b class="khero__price" data-pin="2" data-pin-at="r">₹2,299</b></div></div><div class="khero__list">${side.map(([p, pin], i) => `<div class="kmini${i === 0 ? ' on' : ''}">${PI(p)}<span><b>${p.n}</b><em>${inr(p.p)}</em>${STK(p.st).replace('<span class="kst', `<span${pin ? ' data-pin="1" data-pin-at="r"' : ''} class="kst`)}</span></div>`).join('')}</div><div class="khero__dots"><i class="on"></i><i></i><i></i></div></div><div class="kstrip">${['All', 'Footwear', 'Watches', 'Gadgets', 'Style'].map((t, i) => CH(t, i ? '' : 'on')).join('')}<span class="kstrip__note">${KI('truck')}Free delivery across India</span></div>${FAB.replace('<span class="kwa-fab"', '<span data-pin="3" class="kwa-fab"')}`;
  },
  mhome() {
    return `<div class="km"><div class="km__top"><i class="k__logo"></i><span><small>Hello, Ravi</small><b>Heaven Gadgets</b></span><span class="k__bag">${KI('bag')}<i>2</i></span></div><div class="km__hero"><span class="khero__eb">New drop</span><b class="khero__h">Street<br>Runner</b><span class="k__btn white">Shop now</span><i class="km__heroimg"></i></div><div class="km__search">${KI('search')}<span>Search clogs, watches…</span><i>${KI('filter')}</i></div><div class="kcats">${['All', 'Footwear', 'Watches', 'Gadgets'].map((t, i) => CH(t, i ? '' : 'on')).join('')}</div><div class="kgrid">${[0, 4, 1, 3].map(i => PCARD(PR[i])).join('')}</div>${MNAV(0)}</div>`;
  },
  product() {
    return TOP(1) + `<div class="kpdp"><div class="kpdp__gal"><div class="kpdp__img"><i></i><span class="kpdp__badge">25% off</span></div><div class="kpdp__thumbs"><i class="on" style="--ph:var(--img-clog)"></i><i style="--ph:var(--img-clog);--fx:scaleX(-1)"></i><i class="is--reel" style="--ph:var(--img-owner)"></i><span>+4</span></div></div><div class="kpdp__info"><div class="k__row"><i class="k__logo"></i><span class="k__s" style="font-weight:600">Heaven Gadgets</span><span class="k__xs k__mut" style="margin-left:auto">HG-CL-009</span></div><b class="kpdp__name">Classic Clog · Black</b>${STARS(4, '42 reviews')}<div class="kpdp__price"><b>₹1,499</b><s>₹1,999</s></div><div class="kopt"><span>Colour <em>Black</em></span><div class="kcol"><i class="on" style="--c:#1B1B1D"></i><i style="--c:#D8CFBD"></i><i style="--c:#8C9A84"></i></div></div><div class="kopt"><span>Size <em>UK</em></span><div class="ksz">${SZ('9')}</div></div><div class="kalert">${KI('bolt')}<span>Only 3 left in UK 9</span></div><div class="k__row" style="margin-top:auto"><span class="k__btn" style="flex:1">${KI('bag')}Add to bag</span><span class="kround">${KI('heart')}</span></div><span class="ksafe">${KI('truck')}<span>Free delivery across India · 3 to 5 days</span></span></div></div>`;
  },
  mproduct() {
    return `<div class="km is--pdp"><div class="kmp__img"><i></i><span class="kround">${KI('search')}</span><span class="kround">${KI('heart')}</span><div class="khero__dots"><i class="on"></i><i></i><i></i></div></div><div class="kmp__body"><div class="k__row k__sb" style="align-items:flex-start"><span class="k__col" style="gap:.2em"><b class="kpdp__name">Classic Clog</b><span class="k__s k__mut">Black · Footwear</span></span><span class="kpdp__price"><b>₹1,499</b></span></div>${STARS(4, '42 reviews')}<div class="kopt"><span>Size <em>UK</em></span><div class="ksz">${SZ('9')}</div></div><div class="kalert">${KI('bolt')}<span>Only 3 left in UK 9</span></div><div class="kopt"><span>Colour <em>Black</em></span><div class="kcol"><i class="on" style="--c:#1B1B1D"></i><i style="--c:#D8CFBD"></i><i style="--c:#8C9A84"></i></div></div><span class="ksafe" style="margin-top:auto">${KI('truck')}<span>Free delivery across India</span></span><span class="k__btn" style="height:2.7em">${KI('bag')}Add to bag</span></div></div>`;
  },
  checkout() {
    return TOP(1) + `<div class="kco"><div class="k__col" style="gap:.5em"><span class="k__t">Checkout</span><div class="ksteps"><span class="done">${KI('check')}Bag</span><i></i><span class="done">${KI('check')}Address</span><i></i><span class="now">Pay</span></div><div class="k__card"><span class="k__xs k__mut">Deliver to</span><b class="k__s">Sai Teja · Hyderabad 500032</b><span class="k__s k__mut">+91 93••• ••417</span></div><span class="k__xs k__mut">Pay in full</span><div class="kpay"><span class="on">${KI('qr')}UPI</span><span>${KI('card')}Card</span><span>${KI('building')}Net banking</span></div><span class="ksafe" style="margin-top:auto">${KI('shield')}<span>Paid orders ship first · tracking on WhatsApp</span></span></div><div class="k__card kco__sum"><span class="k__xs k__mut">Your order</span><div class="k__row k__s">${PI(PR[0], 2.6)}<span style="flex:1"><b>Classic Clog</b><br><span class="k__mut">UK 9 · Black</span></span><b>₹1,499</b></div><div class="k__row k__s">${PI(PR[3], 2.6)}<span style="flex:1"><b>Silicone strap</b><br><span class="k__mut">44 mm</span></span><b>₹299</b></div><div class="k__row k__sb k__s" style="margin-top:auto"><span class="k__mut">Delivery</span><b style="color:#067647">Free</b></div><div class="ktot"><span>Total</span><b>₹1,798</b></div><span class="k__btn" style="width:100%;height:2.5em">Pay ₹1,798</span></div></div>`;
  },
  wabill(m = false) {
    const body = `<span class="kwc__day">Today</span><div class="kwc__in">Thanks for shopping, Ravi! 🙌 Here is your bill.<div class="kwc__doc"><i>PDF</i><span><b>Bill HG-1042.pdf</b><em>1 page · ₹1,798 · UPI</em></span></div><small>11:04 am</small></div><div class="kwc__in">+18 Heaven points added. You have 54. ⭐<small>11:04 am</small></div><div class="kwc__out">Super, thanks! 👍<small>11:06 am ${TICKS}</small></div>${m ? '<div class="kwc__in"><i class="kwc__img"></i>New clogs just landed in UK 9. Want first pick?<span class="kwc__cta">Shop the drop</span><small>Sat, 7:30 pm</small></div>' : '<div class="kwc__in">How was your visit today?<span class="kwc__cta">Rate your visit</span><small>11:07 am</small></div>'}`;
    const chat = WCHAT('Heaven Gadgets', 'Business account', body, true);
    return m ? chat : GAP('BILL', PH(chat), 'Every sale · on WhatsApp', 'Paid. Billed.<br>Saved.', 'The bill lands in the buyer’s chat. The buyer lands in your list.', `<div class="kx__chips">${['PDF bill', '+18 points', 'Buyer saved'].map(t => `<span class="kx__ok">${KI('check')}${t}</span>`).join('')}</div>`);
  },
  mwa() { return V.wabill(true); },
  track() {
    const rows = [['Receiver', 'Sai Teja'], ['Address', 'Hyderabad 500032'], ['Item', 'Classic Clog · UK 9'], ['Paid', '₹1,798 · UPI']];
    const tl = [['09:30', 'Packed at Heaven Gadgets, Ongole', 1], ['12:00', 'Picked up by the courier', 1], ['Thu', 'Out for delivery', 0]];
    return TOP(0) + `<div class="ktr"><div class="ktr__card"><div class="k__row k__sb"><span class="ktr__id"><span class="kround ink">${KI('box')}</span><span><small>Tracking ID</small><b>HG-2087</b></span></span>${CH('In transit', 'blue')}</div><div class="ktrack"><span class="done"><i>${KI('check')}</i><b>Packed</b><small>09:30</small></span><span class="done now"><i>${KI('check')}</i><b>In transit</b><small>12:00</small></span><span><i></i><b>Delivered</b><small>Thursday</small></span></div><span class="k__btn" style="height:2.5em">${KI('chat')}Track on WhatsApp</span><div class="kdet">${rows.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('')}</div></div><div class="k__col" style="gap:.5em"><div class="krider"><span class="k__av">AK</span><span><b>Anil Kumar</b><small>Courier partner</small></span><span class="kround">${KI('chat')}</span><span class="kround ink">${KI('phonecall')}</span></div><div class="ktr__card" style="flex:1"><span class="k__xs k__mut">Updates</span><div class="ktl">${tl.map(([t, x, d]) => `<div class="${d ? 'done' : ''}"><small>${t}</small><i></i><span>${x}</span></div>`).join('')}</div><div class="k__li" style="margin-top:auto;background:#F4F4F1">${IC('truck')}<span>Arrives Thursday · AWB 7741 2290</span></div></div></div></div>`;
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
    const rows = [[PR[0], [5, 8, 2, 3, 0, 4]], [PR[5], [3, 6, 4, 1, 2, 0]], [PR[6], [4, 5, 7, 6, 3, 1]], [{ n: 'Retro Runner · Multi', ph: 's2', full: 1 }, [6, 9, 8, 5, 4, 2]]];
    const cell = n => `<span class="c${n === 0 ? ' out' : n <= 2 ? ' low' : ''}">${n}</span>`;
    return ADM(1, HD('Inventory <em>· live</em>', CH('All stores') + CH('Low', 'warn', 6).replace('<span class="k__chip', '<span data-pin="2" class="k__chip') + '<span class="k__btn">Add stock</span>')
      + `<div class="k__card"><div class="kstock"><span class="h" data-pin="1">FOOTWEAR · UK</span>${['6', '7', '8', '9', '10', '11'].map(s => `<span class="h">${s}</span>`).join('')}${rows.map(([p, c]) => `<span class="p">${PI(p)}<span>${p.n}</span></span>${c.map(cell).join('')}`).join('')}</div></div>`
      + `<div class="k__grid3">${[[PR[1], 6], [PR[2], 12], [PR[3], 0]].map(([p, n]) => `<div class="k__li">${PI(p, 1.8)}<span>${p.n}</span>${n ? CH(n + ' in', n < 5 ? 'warn' : 'ok') : CH('Out', 'bad')}</div>`).join('')}</div><div class="k__grid2"><div class="k__card"><div class="k__row k__sb"><b class="k__s">Reorder list</b>${CH('3 sizes', 'warn')}</div><span class="k__s k__mut">Classic Clog · UK 8, 9, 10</span><span class="k__bar"><i style="width:28%;background:linear-gradient(90deg,#F79009,#FDB022)"></i></span><span class="k__btn" style="align-self:flex-start">Order from supplier</span></div><div class="k__card"><div class="k__row k__sb"><b class="k__s">Barcode labels</b>${CH('24 ready', 'blue')}</div><span class="k__s k__mut">New stock, tagged by size</span><span class="k__s" style="font-family:var(--font-mono);letter-spacing:.2em">▮▯▮▮▯▮▯▮▮▯▮</span><span class="k__btn ink" style="align-self:flex-start">Print labels</span></div></div><div class="k__row k__s k__mut" data-pin="3" style="margin-top:auto">${KI('repeat').replace('<svg', '<svg style="width:1.2em;height:1.2em"')}<span>The store and the website share one count</span></div>`);
  },
  pos() {
    const grid = [0, 1, 2, 4, 5, 6];
    return ADM(2, HD('New bill <em>#HG-1042</em>', `<span class="kphone" data-pin="1">${KI('phone')}+91 98••• ••210 · Ravi K.</span>`)
      + `<div class="kpos"><div class="kpos__grid">${grid.map(i => PCARD(PR[i]).replace('class="kp"', `class="kp${i === 0 ? ' on' : ''}"`)).join('')}</div><div class="k__card" style="gap:.45em"><b class="k__s">This bill</b><div class="k__row k__s">${PI(PR[0], 2)}<span style="flex:1">Clog · UK 9</span><b>₹1,499</b></div><div class="k__row k__s">${PI(PR[3], 2)}<span style="flex:1">Strap</span><b>₹299</b></div><div class="kseg" data-pin="2"><span>Cash</span><span class="on">UPI</span><span>Card</span></div><div class="k__row k__sb k__s"><span class="k__mut">GST bill</span>${CH('On', 'blue')}</div><div class="ktot"><span>Total</span><b>₹1,798</b></div><span class="k__btn" data-pin="3" style="width:100%">Bill · send on WhatsApp</span></div></div>`);
  },
  orders() {
    const col = (t, n, cards, pin) => `<div${pin ? ` data-pin="${pin}"` : ''}><h6>${t}<i>${n}</i></h6>${cards.map(([id, who, v, hot]) => `<div class="kord${hot ? ' is--hot' : ''}"><b>${id} · ${v}</b><span>${who}</span></div>`).join('')}</div>`;
    return ADM(3, HD('Online orders <em>· today</em>', CH('Prepaid only', 'ok') + '<span class="k__btn ink" data-pin="2">Print labels</span>')
      + `<div class="kkan">${col('New', 3, [['#2091', 'Sai T. · Hyderabad', '₹2,299', 1], ['#2090', 'Anil · Chirala', '₹1,499'], ['#2089', 'Divya · Chennai', '₹999']], 1)}${col('Packed', 2, [['#2088', 'Rahul · Guntur', '₹2,499'], ['#2087', 'Priya · Bengaluru', '₹1,798']])}${col('Shipped', 4, [['#2086', 'Kiran · Nellore', '₹1,299'], ['#2085', 'Teja · Vijayawada', '₹2,199']], 3)}${col('Delivered', 12, [['#2081', 'Manoj · Ongole', '₹699'], ['#2080', 'Sneha · Kurnool', '₹1,499']])}</div>`);
  },
  crm() {
    const list = [['RK', 'Ravi K.', 'Ongole · clogs, straps', 'VIP', 'blue', 'b'], ['PM', 'Priya M.', 'Kandukur · watches', 'Regular', '', 'r'], ['ST', 'Sai Teja', 'Hyderabad · sneakers', 'New', 'ok', 'g'], ['HV', 'Harsha V.', 'Addanki · earbuds', 'Regular', '', 'a'], ['KR', 'Keerthi R.', 'Ongole · gifts', 'VIP', 'blue', 'l']];
    return ADM(4, HD('Customers <em>1,284</em>', CH('VIP', 'on', 86).replace('<span class="k__chip', '<span data-pin="2" class="k__chip') + CH('Regular', '', 412) + CH('New', '', 786))
      + `<div class="kcrm"><div class="k__col" style="gap:.35em">${list.map(([a, n, d, t, c, av]) => `<div class="k__li"><span class="k__av ${av}">${a}</span><span><b>${n}</b> <span class="k__mut">${d}</span></span>${CH(t, c)}</div>`).join('')}<div class="k__li" style="margin-top:auto;background:#E6EBFF">${IC('gift')}<span><b>3 birthdays</b> this week</span><span class="k__btn" style="margin-left:auto;font-size:.9em">Send wishes</span></div></div><div class="kprof" data-pin="1"><div class="kprof__top"><span class="k__av">RK</span><div class="k__col" style="gap:.15em"><b class="k__s" style="font-size:.75em">Ravi K.</b><span class="k__xs k__mut">Ongole · since March</span></div></div><div class="kprof__stats"><span><b>6</b>bills</span><span><b>₹9.4K</b>spent</span><span><b>UK 9</b>size</span></div><div class="k__row" style="flex-wrap:wrap;gap:.3em">${CH('Footwear fan', 'blue')}${CH('Watches')}<span class="k__chip" data-pin="3">54 points</span></div><span class="k__xs k__mut">Birthday · 14 November</span><span class="k__btn" style="margin-top:auto">Send an offer</span></div></div>`);
  },
  blast() {
    const res = [['Sent', 412, 100], ['Read', 371, 90], ['Clicked', 96, 23], ['Bought', 23, 6]];
    return ADM(5, HD('Offers <em>on WhatsApp</em>', '<span class="k__btn wa">Send to 412</span>')
      + `<div class="k__row" style="flex:1;align-items:stretch;gap:.5em;min-height:0"><div class="k__card" style="flex:1"><span class="k__xs k__mut">WHO GETS IT</span><div class="k__row" data-pin="1" style="flex-wrap:wrap;gap:.3em">${CH('Sneaker fans', 'on', 412)}${CH('VIP', '', 86)}${CH('Quiet 60 days', '', 230)}</div><span class="k__xs k__mut">MESSAGE</span><div class="kwc is--mini" data-pin="2"><div class="kwc__in"><i class="kwc__img"></i>New clogs just landed. UK 6–11. Regulars get first pick!<span class="kwc__cta">Shop the drop</span><small>7:30 pm</small></div></div></div><div class="k__card" style="flex:.9"><span class="k__xs k__mut" data-pin="3">LAST OFFER · RESULTS</span>${res.map(([l, v, p]) => `<div class="k__col" style="gap:.2em"><div class="k__row k__sb k__s"><span>${l}</span><b>${v}</b></div>${`<span class="k__bar"><i style="width:${p}%"></i></span>`}</div>`).join('')}<div class="k__li" style="margin-top:auto">${IC('rupee')}<span>Sales from it</span><b style="margin-left:auto">₹34,500</b></div></div></div>`);
  },
  voice() {
    const calls = [['RK', 'Ravi K.', 'Kept UK 9 for Saturday', 'Reserved', 'ok', 'b'], ['PM', 'Priya M.', 'Coming for the sale', 'Visit', 'blue', 'r'], ['HV', 'Harsha V.', 'No answer · retry 6 pm', 'Retry', 'warn', 'a'], ['KR', 'Keerthi R.', 'Asked about gift combos', 'WhatsApp sent', 'blue', 'l']];
    const wave = [30, 60, 90, 50, 75, 40, 85, 55, 35, 70, 45, 25];
    return ADM(6, HD('Voice agent <em>· calls</em>', CH('Opt-in list', 'ok', 86) + CH('Telugu', 'on'))
      + `<div class="kvoice"><div class="kcall" data-pin="1"><i class="k__logo"></i><b class="k__s" style="font-size:.7em">Calling Ravi K.</b><span class="kcall__wave">${wave.map(h => `<i style="height:${h}%"></i>`).join('')}</span><small>01:12 · Weekend drop invite</small>${CH('Live', 'blue')}</div><div class="k__col" style="gap:.35em">${calls.map(([a, n, d, t, c, av], i) => `<div class="k__li"${i === 0 ? ' data-pin="2"' : i === calls.length - 1 ? ' data-pin="3"' : ''}><span class="k__av ${av}">${a}</span><span><b>${n}</b> <span class="k__mut">${d}</span></span>${CH(t, c)}</div>`).join('')}</div></div>`);
  }
};
