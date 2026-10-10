/* ===== Pharmacy OS product screens (design sketches, sample data). Each returns HTML for a .s artboard that scales with its container.
   One design system, after the owner's reference dashboard: a light side menu with grouped words, white panels in soft trays,
   one dark navy for what is chosen or next, and a bar at the bottom that always holds the next step.
   Store, people, medicines and amounts are samples. ===== */
const KI = (id, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" aria-hidden="true"><use href="#k-${id}"/></svg>`;
const CAP = '<svg viewBox="0 0 80 80" aria-hidden="true"><use href="#i-capsule"/></svg>';
const PEX = (id, w = 132, h = w, fp = '') => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop${fp}&w=${w}&h=${h}`;
const STORE = 'Ananya Medicals', DIST = 'Krishna Pharma Agencies', DSHORT = 'Krishna Pharma';
/* name, pack, form icon, pack photo (Pexels, free to use), then the order that arrives: quantity, batch, expiry, rate, MRP */
const MED = [
  { n: 'Paracetamol 650 mg', p: 'Strip of 15', f: 'strip', img: 13105348, q: 20, b: 'PK2291', e: '08/2028', r: 18.4, mrp: 36 },
  { n: 'Amoxicillin 500 mg', p: 'Strip of 10', f: 'pill', img: 9742749, q: 10, b: 'AX7730', e: '03/2028', r: 62.1, mrp: 96 },
  { n: 'Metformin 500 mg SR', p: 'Strip of 15', f: 'strip', img: 4226771, q: 15, b: 'MF1184', e: '11/2027', r: 24.9, mrp: 44 },
  { n: 'Telmisartan 40 mg', p: 'Strip of 15', f: 'strip', img: 9742748, q: 12, b: 'TL5521', e: '06/2028', r: 71.5, mrp: 118 },
  { n: 'Pantoprazole 40 mg', p: 'Strip of 15', f: 'strip', img: 4210613, q: 10, b: 'PZ0917', e: '01/2028', r: 58.0, mrp: 92 },
  { n: 'Cetirizine 10 mg', p: 'Strip of 10', f: 'strip', img: 5995306, q: 10, b: 'CT3340', e: '02/2027', r: 11.2, mrp: 19 },
  { n: 'Vitamin D3 60K', p: 'Strip of 4', f: 'drop', img: 7277984 },
  { n: 'Cough syrup 100 ml', p: 'Bottle', f: 'bottle', img: 5921726 },
  { n: 'Azithromycin 500 mg', p: 'Strip of 3', f: 'strip', img: 3923166 },
  { n: 'ORS sachet', p: 'Box of 25', f: 'sachet', img: 0 },
  { n: 'Paracetamol 500 mg', p: 'Strip of 10', f: 'strip', img: 3683039 },
  { n: 'Telma 40', p: 'Strip of 15', f: 'strip', img: 13779114 }
];
const FACE = { imran: PEX(13119975, 96, 96, '&crop=focalpoint&fp-x=0.47&fp-y=0.3&fp-z=1.5'), rao: PEX(10823559, 96, 96, '&crop=focalpoint&fp-x=0.27&fp-y=0.32&fp-z=1.25'), ramesh: PEX(36876208, 96, 96, '&crop=focalpoint&fp-x=0.5&fp-y=0.35&fp-z=1') };
const WHO = { imran: ['Imran', 'Counter 1, Main road'], rao: ['Subba Rao', 'Owner, all stores'] };

/* Parts */
const BTN = (t, cls = '', icon = '', after = '') => `<span class="u-btn ${cls}">${icon ? KI(icon) : ''}${t}${after}</span>`;
const CHIP = (t, on, n) => `<span class="u-chip${on ? ' on' : ''}">${t}${n != null ? `<em>${n}</em>` : ''}</span>`;
const STAT = (tone, icon, t) => `<span class="u-bdg is--${tone}">${icon ? KI(icon) : ''}${t}</span>`;
const BDG = (tone, icon, t) => `<span class="u-bdg is--fill is--${tone}">${icon ? KI(icon) : ''}${t}</span>`;
const LVL = (n, t) => `<span class="u-bdg"><span class="u-lvl is--${n}"><i></i><i></i><i></i></span>${t}</span>`;
const QTY = n => `<span class="u-qty"><i>−</i><b>${n}</b><i>+</i></span>`;
const PH = (m, cls = '') => `<i class="u-ph ${cls}"${m.img ? ` style="--img:url(${PEX(m.img)})"` : ''}>${KI(m.f || 'strip')}</i>`;
const MEDC = (m, sub, extra = '') => `<span class="u-med">${PH(m)}<div><b>${m.n}${extra}</b><small>${sub == null ? m.p : sub}</small></div></span>`;
const AV = (t, tone = '', img = '', cls = '') => `<i class="u-av${tone ? ' is--' + tone : ''}${cls ? ' ' + cls : ''}"${img ? ` style="--img:url(${img})"` : ''}>${img ? '' : t}</i>`;
const INI = n => n.split(' ').map(w => w[0]).slice(0, 2).join('');
const WHOC = (name, sub, tone) => `<span class="u-med">${AV(INI(name), tone, '', 'is--lg')}<div><b>${name}</b><small>${sub}</small></div></span>`;
const PERSON = (name, tone, img) => `<span class="u-bdg">${AV(INI(name), tone, img)}${name}</span>`;
const CHK = (on, cls = '') => `<i class="u-chk${on ? ' on' : ''}${cls ? ' ' + cls : ''}">${on ? '<svg viewBox="0 0 16 16" aria-hidden="true"><use href="#i-check"/></svg>' : ''}</i>`;
const RX = '<i class="u-rx">Rx</i>';
const MORE = KI('more');
const NOTE = (icon, t) => `<span class="u-note">${KI(icon)}${t}</span>`;
const SEG = (items, on, cls = '') => `<span class="u-seg ${cls}">${items.map((t, i) => `<span class="${i === on ? 'on' : ''}"${t === 'తెలుగు' ? ' lang="te"' : ''}>${t}</span>`).join('')}</span>`;
const LANG = (te = 0) => SEG(['English', 'తెలుగు'], te ? 1 : 0);
const SIZE = (k = 1) => SEG(['A', 'A', 'A'], k, 'is--aa');
const INP = (t, kbd = '') => `<span class="u-inp">${KI('search')}${t}${kbd ? `<kbd>${kbd}</kbd>` : ''}</span>`;
/* A sparkline with a soft fill, drawn from the numbers */
let SPN = 0;
const SPARK = (v, tone = 'ok') => {
  const id = 'po-sp' + (++SPN), c = tone === 'bad' ? '#EC5A5F' : '#2DB47C', w = 118, h = 44, mx = Math.max(...v), mn = Math.min(...v);
  const d = v.map((y, i) => (i ? 'L' : 'M') + (i * w / (v.length - 1)).toFixed(1) + ' ' + (h - 5 - (y - mn) / (mx - mn || 1) * (h - 12)).toFixed(1)).join('');
  return `<svg class="u-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".3"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient></defs><path d="${d}L${w} ${h}L0 ${h}Z" fill="url(#${id})"/><path d="${d}" stroke="${c}"/></svg>`;
};
const TRAY = (title, icon, body, o = {}) => `<section class="u-tray${o.cls ? ' ' + o.cls : ''}"><header>${o.lead ? KI(icon) : ''}<span>${title}</span><span class="sp"></span>${o.right || ''}${o.lead ? '' : KI(icon)}</header>${body}</section>`;
const KPI = (t, ic, n, d, tone, vs, data) => TRAY(t, ic, `<div class="u-card u-kpi"><div><b class="u-num">${n}</b><span class="u-delta"><b class="u-${tone}">${d}</b>${vs}</span></div>${data ? SPARK(data, tone) : ''}</div>`, { cls: 'is--kpi' });
const KPIS = items => `<div class="u-kpis" style="--n:${items.length}">${items.map(k => KPI(...k)).join('')}</div>`;
const PLOT = (v, on, tip, ys, xs, xon, next = 99) => `<div class="u-plot"><div class="u-bars">${v.map((h, i) => `<i class="${i === on ? 'on' : h < 3 ? 'is--nil' : i > next ? 'is--next' : ''}" style="--h:${h}%">${i === on ? `<span class="u-tip">${tip}</span>` : ''}</i>`).join('')}</div><div class="u-yax">${ys.map(y => `<span>${y}</span>`).join('')}</div><div class="u-xax">${xs.map((x, i) => i === xon ? `<b>${x}</b>` : `<span>${x}</span>`).join('')}</div></div>`;
const MINI = (v, on) => `<div class="u-mini">${v.map((h, i) => `<i class="${i === on ? 'on' : ''}" style="--h:${h}%"></i>`).join('')}</div>`;
const FEED = items => `<ul class="u-feed">${items.map(([ic, c, t, time, p]) => `<li style="--c:var(--u-${c})"><i>${KI(ic)}</i><b>${t}</b><time>${time}</time><p>${p}</p></li>`).join('')}</ul>`;
const STEPS = items => `<ul class="u-steps">${items.map(([a, b, c]) => `<li class="${c || ''}"><i>${c === 'on' ? KI('tick') : ''}</i><div><b>${a}</b><small>${b}</small></div></li>`).join('')}</ul>`;
const DAYS = [58, 66, 49, 62, 71, 44, 60, 74, 68, 57, 65, 70, 52, 67];
/* One distributor's offer for a line: rate, then scheme and credit. `on` is the one picked. */
const CMP = (rate, note, on) => `<span class="u-cmp${on ? ' on' : ''}${rate ? '' : ' is--no'}"><b>${rate ? '₹' + rate : 'Not stocked'}</b><small>${note}</small></span>`;
const METER = (w, tone = 'pri') => `<span class="u-meter" style="--c:var(--u-${{ ok: 'ok-l', warn: 'warn', bad: 'bad-l' }[tone] || 'pri'})"><i style="--w:${w}%"></i></span>`;
const ROWI = (icon, t, sub) => `<span class="u-med"><span class="u-ico">${KI(icon)}</span><div><b>${t}</b><small>${sub}</small></div></span>`;
const ROW = cells => `<div class="u-tr">${cells.map(CELL).join('')}</div>`;

/* The frame every counter screen sits in: grouped words on the left, the work on the right */
const MENU = [
  ['Main navigation', [['home', 'grid', 'Overview'], ['bill', 'receipt', 'Billing', 0, [['sell', 'New bill'], ['salereturn', 'Returns'], ['prices', 'Prices and discounts']]], ['buy', 'truck', 'Orders', 12, [['order', 'To order'], ['check', 'Receive'], ['watch', 'Claims'], ['dues', 'Pay distributors']]], ['stock', 'box', 'Stock', 0, [['stock', 'On the shelf'], ['expiry', 'Expiring'], ['lowstock', 'Running low']]], ['cust', 'users', 'Customers']]],
  ['Money and reports', [['money', 'rupee', 'Day book'], ['gst', 'file', 'GST and accountant'], ['reports', 'chart', 'Reports']]],
  ['Support', [['help', 'headset', 'Help in Telugu'], ['set', 'gear', 'Settings']]]
];
const SIDE = (on, sub, who = 'imran') => {
  const open = on === 'home' || on === 'cust' ? 'bill' : on;
  return `<div class="a-side"><div class="a-brand"><i class="a-logo">${CAP}</i><b>Pharmacy OS</b>${KI('panel')}</div><div class="a-dash"></div>${INP('Search or ask', 'Ctrl K')}
    ${MENU.map(([cap, items]) => `<div class="a-cap">${cap}</div>${items.map(([k, ic, t, n, subs]) => `<span class="a-nav${k === on && !sub ? ' on' : ''}">${KI(ic)}${t}${n ? `<em>${n}</em>` : ''}${subs ? KI(k === open ? 'chevu' : 'chevd', 'chev') : ''}</span>${subs && k === open ? subs.map(([sk, st]) => `<span class="a-sub${sk === sub ? ' on' : ''}">${st}</span>`).join('') : ''}`).join('')}`).join('')}
    <div class="a-user">${AV('', '', FACE[who])}<span><b>${WHO[who][0]}</b>${WHO[who][1]}</span>${KI('updown')}</div></div>`;
};
const HD = (t, sub, right = '') => `<div class="a-hd"><div><b class="a-t">${t}</b>${sub ? `<small>${sub}</small>` : ''}</div><div class="u-row">${LANG()}${SIZE()}${right}</div></div>`;
const APP = (on, sub, body, who) => `${SIDE(on, sub, who)}<div class="a-main">${body}</div>`;
const BAR = (left, right) => `<div class="a-act"><div>${left}</div><div class="u-row">${right}</div></div>`;
/* A table. A cell that starts with > is set to the right. */
const CELL = c => { const r = typeof c === 'string' && c[0] === '>'; return `<span${r ? ' class="is--r"' : ''}>${r ? c.slice(1) : c}</span>`; };
const HEADC = h => CELL(typeof h === 'string' && h && h[0] !== '<' ? h + KI('sort') : h);
const TBL = (cols, head, rows, cls = '') => `<div class="u-card u-tbl${cls ? ' ' + cls : ''}" style="--cols:${cols}">${head ? `<div class="u-tr is--h">${head.map(HEADC).join('')}</div>` : ''}${rows.map(r => `<div class="u-tr${r.c ? ' ' + r.c : ''}">${(r.v || r).map(CELL).join('')}</div>`).join('')}</div>`;
const TOOLS = (search, tabs = '') => `${tabs}${search ? INP(search) : ''}<span class="u-chip">${KI('filter')}Filter</span>`;
/* A list screen: title, a tray that holds the table, and the bar for the next step */
const LIST = (on, sub, title, lead, kpis, tray, icon, right, cols, head, rows, act = '', who) => APP(on, sub, `${HD(title, lead)}<div class="a-body">${kpis ? KPIS(kpis) : ''}${TRAY(tray, icon, TBL(cols, head, rows, 'is--tall'), { lead: 1, right })}${act}</div>`, who);

/* Phone parts */
const PHONE = inner => `<div class="u-phone"><div>${inner}</div></div>`;
const DUO = (phone, title, sub, steps, extra = '') => `<div class="u-duo">${PHONE(phone)}<div class="u-side"><div><b class="a-t">${title}</b><small style="font-size:15px;margin-top:6px">${sub}</small></div>${TRAY('What happened', 'clock', `<div class="u-card">${STEPS(steps)}</div>`, { lead: 1 })}${extra}</div></div>`;
const CHAT = (name, sub, msgs) => `<div class="w"><div class="w-hd">${KI('back')}${AV(name[0])}<div><b>${name}</b><small>${sub}</small></div></div><div class="w-body">${msgs.join('')}</div><div class="w-in"><span>Message</span>${KI('send')}</div></div>`;
const OUT = (h, extra = '', t = '10:42') => `<div class="w-m is--out">${h}${extra}<small>${t} ✓✓</small></div>`;
const INC = (h, t = '11:05') => `<div class="w-m">${h}<small>${t}</small></div>`;
const DOC = (t, s) => `<div class="w-doc">${KI('file')}<div><b>${t}</b><small>${s}</small></div></div>`;
const LINK = t => `<span class="w-link">${KI('link')}${t}</span>`;
const TABS = on => `<div class="m-tabs">${[['grid', 'Today'], ['store', 'Stores'], ['receipt', 'Bills'], ['bell', 'Alerts']].map(([ic, t], i) => `<span class="${i === on ? 'on' : ''}">${KI(ic)}${t}</span>`).join('')}</div>`;
const WA_ORDER = CHAT(DIST, 'Distributor', [OUT(`<b>Order 1042</b> from ${STORE}<br>6 medicines, about ₹3,060`, DOC('Order-1042.pdf', 'One page') + LINK('Open the order')), INC('5 available.<br>Pantoprazole: only 6.')]);
const WA_BILL = CHAT(STORE, 'Business account', [INC(`Thank you, Lakshmi garu.<br><b>Bill 2281</b><br>3 medicines, ₹486 paid by UPI${LINK('See your bill')}`, '6:14 pm')]);
const WA_REMIND = CHAT(STORE, 'Business account', [INC('Your regular medicines may be running low. Reply <b>YES</b> and we will keep them ready.', '9:00 am'), OUT('YES', '', '9:12 am'), INC('Packed. Ready from 11 am.', '9:13 am')]);
const OWNER = `<div class="m-top"><div><small>Thursday, 8 October</small><b>Good evening, Subba Rao</b></div>${AV('', '', FACE.rao)}</div><div class="m-body">
  ${TRAY('All three stores, today', 'store', `<div class="u-card"><b class="u-num">₹48,260</b><span class="u-delta"><b class="u-ok">+8%</b>vs last Thursday</span>${MINI(DAYS.slice(2), 11)}</div>`, { cls: 'm-hero' })}
  <div class="m-two"><div class="u-card"><small>Cash</small><b>₹18,400</b></div><div class="u-card"><small>UPI</small><b>₹29,860</b></div></div>
  ${TRAY('Needs you', 'bell', `<div class="u-card m-list" style="padding:4px 12px"><div><i>${KI('list')}</i><span><b>Approve an order</b>Bus stand store, ₹62,000</span>${KI('chev')}</div><div><i style="--c:var(--u-bad-l)">${KI('alert')}</i><span><b>9 medicines expire soon</b>₹3,140 at risk</span>${KI('chev')}</div><div><i style="--c:var(--u-warn)">${KI('rupee')}</i><span><b>Pay ${DSHORT}</b>₹18,200, due tomorrow</span>${KI('chev')}</div></div>`, { right: BDG('bad', '', '3') })}</div>${TABS(0)}`;
const NEEDS = `<div class="m-top"><div><small>Bus stand store</small><b>Order 1057 waits for you</b></div></div><div class="m-body">
  ${TRAY('Above your ₹50,000 limit', 'alert', `<div class="u-card"><b class="u-num">₹62,000</b><span class="u-delta">42 medicines, 31 are low or out</span></div>`, { cls: 'm-hero' })}
  ${TRAY('What is in it', 'list', `<div class="u-card m-list" style="padding:4px 12px"><div><i>${KI('pill')}</i><span><b>42 medicines</b>31 are low or out</span></div><div><i style="--c:var(--u-vio)">${KI('truck')}</i><span><b>${DSHORT}</b>The usual distributor</span></div><div><i style="--c:var(--u-teal)">${KI('user')}</i><span><b>Asked by Imran</b>At the counter, 4:12 pm</span></div></div>`)}</div>
  <div class="m-act">${BTN('Approve', 'is--wide is--lg', 'tick')}${BTN('Open the list', 'is--ghost is--wide')}</div>${TABS(3)}`;
const DLINK = `<div class="m-url">${KI('lock')}Order link. Opens in the browser.</div><div class="m-top" style="padding-top:14px"><div><small>Order 1042 from</small><b class="m-big">${STORE}</b><small>6 medicines. No login needed.</small></div></div><div class="m-body">
  ${TRAY('Tap what you can send', 'ticks', `<div class="u-card m-list" style="padding:2px 12px">${MED.slice(0, 6).map((m, i) => `<div>${PH(m)}<span><b>${m.n}</b>${m.q} × ${m.p.toLowerCase()}</span>${i === 4 ? BDG('bad', 'alert', 'Only 6') : BDG('ok', 'tick', 'Available')}</div>`).join('')}</div>`)}</div>
  <div class="m-act">${BTN('Send reply', 'is--wide is--lg', 'send')}${BTN('Attach your bill file', 'is--ghost is--wide', 'clip')}</div>`;

const V = {
  /* ----- Overview: the day in one look, what happened, and what to watch ----- */
  home: () => APP('home', '', `${HD('Overview', 'Thursday, 8 October', BTN('New bill', '', 'plus', '<span class="u-key">F2</span>'))}
    <div class="h-grid">
      ${KPI('Sales today', 'rupee', '₹21,400', '+8%', 'ok', 'vs last week', [12, 19, 15, 22, 17, 20, 14, 21, 18])}
      ${KPI('Bills today', 'receipt', '62', '+2%', 'ok', 'vs last week', [8, 9, 14, 12, 15, 13, 17, 14, 16])}
      ${KPI('Found on the shelf', 'box', '92%', '−1.3%', 'bad', 'vs last week', [16, 12, 14, 19, 13, 14, 20, 21, 12, 15])}
      ${TRAY('Latest updates', 'book', `<div class="u-card">${SEG(['Today', 'Yesterday', 'This week'], 0)}${INP('Search activity')}<p class="h-count"><b>8</b>new things today</p>
        ${FEED([['truck', 'blue', 'Order received', '11:20 AM', 'Order <b>1042</b>: bill read, 3 to check'], ['user', 'ok-l', 'New customer saved', '11:15 AM', '<b>Lakshmi</b>, with her doctor'], ['swap', 'vio', 'Stock moved', '11:00 AM', '20 strips to <b>Bus stand</b>'], ['alert', 'bad-l', 'Expiry risk', '10:45 AM', '<b>Cetirizine 10 mg</b>, 18 days left'], ['bell', 'warn', 'Refill reminder', '10:30 AM', '<b>Lakshmi</b> replied YES']])}</div>`, { cls: 'h-feed' })}
      ${TRAY('Sales in the last 14 days', 'chart', `<div class="u-card"><div class="h-big"><b class="u-num">₹2,71,300</b><span class="u-delta"><b class="u-ok">+8%</b>vs the 14 days before</span></div>${PLOT(DAYS, 13, 'Today : ₹21,400', ['0', '8k', '16k', '24k', '32k'], ['26 Sep', '28', '30', '2 Oct', '4', '6', '8 Oct'], 6)}</div>`, { lead: 1, cls: 'h-chart', right: `<span class="u-chip">${KI('calendar')}Last 14 days${KI('chevd')}</span>` })}
      ${TRAY('Stock to watch', 'eye', TBL('18px minmax(0,1.9fr) .65fr .75fr minmax(0,1.3fr) 1.05fr .7fr .7fr 18px', [CHK(0), 'Medicine', 'Batch', 'Risk', 'Distributor', 'Status', 'Expires', 'Left', ''],
        [[CHK(1), MEDC(MED[5], 'Strip of 10'), 'CT2217', LVL(3, 'High'), PERSON(DSHORT, 'amber'), STAT('bad', 'alert', 'Expiring'), '26 Oct', '18 days', MORE],
          [CHK(0), MEDC(MED[0]), 'PK2291', LVL(3, 'High'), PERSON(DSHORT, 'amber'), STAT('warn', 'box', 'Running low'), '08/2028', '4 strips', MORE],
          [CHK(0), MEDC(MED[8]), 'AZ4410', LVL(2, 'Medium'), PERSON('Godavari Dist.', 'vio'), STAT('bad', 'alert', 'Expiring'), '18 Nov', '41 days', MORE]]), { lead: 1, cls: 'h-table', right: `${INP('Medicine')}<span class="u-chip">${KI('filter')}Filter</span><span class="u-ico">${MORE}</span>` })}
    </div>`),

  /* ----- Orders ----- */
  order: () => APP('buy', 'order', `${HD('To order', 'Drafted at 6 am from your sales and stock. Check it, then send.')}
    <div class="a-body"><div class="a-split" style="--side:470px">
      ${TRAY('Add a medicine', 'search', `<div class="u-card u-col"><div class="u-find">${KI('search')}<b>par</b><i class="u-caret"></i><span>Type three letters</span></div>
        <div class="u-drop"><small>From your own history</small>
          <div class="u-opt on">${MEDC(MED[0])}<em><b>You have 4</b><br>You usually order 20</em></div>
          <div class="u-opt">${MEDC(MED[10])}<em>You have 22</em></div>
          <div class="u-opt is--new"><i>${KI('plus')}</i>Add “par…” as a new medicine</div></div>
        ${NOTE('info', 'A wrong spelling is fine. “Parasitamol” finds it too.')}
        <div class="u-drop" style="margin-top:6px"><small>Also running low. One tap adds it.</small>
          ${[[6, 6, 10], [8, 5, 10], [9, 2, 4]].map(([k, have, usual]) => `<div class="u-opt">${MEDC(MED[k], `You have ${have}. You usually order ${usual}.`)}${BTN('Add', 'is--ghost is--sm', 'plus')}</div>`).join('')}</div></div>`, { lead: 1, cls: 'is--fill' })}
      ${TRAY('This order', 'truck', TBL('minmax(0,1fr) auto 64px 18px', null, [1, 2, 3, 4, 5].map(k => [MEDC(MED[k], `Have ${[6, 7, 9, 3, 12][k - 1]}. Lasts ${[5, 4, 6, 2, 9][k - 1]} days.`), QTY(MED[k].q), `>₹${Math.round(MED[k].q * MED[k].r)}`, MORE]), 'is--tall'), { lead: 1, cls: 'is--fill', right: CHIP(DSHORT, 1, 5) + CHIP('Godavari', 0, 3) })}
    </div>${BAR('<b>5 medicines</b>, about ₹2,670<small>The best rate and scheme is picked for each line. You can change any of it.</small>', BTN('Compare distributors', 'is--ghost', 'swap') + BTN('Send on WhatsApp', '', 'send'))}</div>`),

  send: () => DUO(WA_ORDER, 'Order 1042, every step in the open', 'A message, a PDF and a link. The distributor needs no login.', [['Sent on WhatsApp', '10:42 am', 'on'], ['Seen by Krishna Pharma', '10:44 am', 'on'], ['Confirmed: 5 of 6. Pantoprazole, only 6.', '11:05 am', 'on'], ['Packed, with the bill file', '1:30 pm', 'on'], ['On the way', 'Arrives by 4 pm', 'is--now']],
    `<div class="a-act" style="min-height:0;padding:10px 10px 10px 14px"><div><b>4 strips of Pantoprazole are short</b><small>Godavari has them, at ₹58.60 a strip.</small></div><div class="u-row">${BTN('Send to Godavari', 'is--ghost is--sm', 'send')}</div></div>`),

  check: () => APP('buy', 'check', `${HD('Receive order 1042', `From ${DIST}. Their bill file came on the link.`)}
    <div class="a-body">${KPIS([['Bill file read', 'upload', '6 lines', '1 click', 'ok', 'KP-3391.xlsx'], ['Match your order', 'ticks', '3 of 6', '3', 'bad', 'need a look'], ['To claim back', 'rupee', '₹316', '2', 'bad', 'differences'], ['To pay by', 'calendar', '7 Nov', '30', 'ok', 'days credit']])}
    ${TRAY('Order, bill and goods, side by side', 'ticks', TBL('28px minmax(0,1.8fr) .62fr .55fr .55fr .6fr .62fr minmax(0,1.6fr)', [CHK(0, 'is--lg'), 'Medicine', 'Ordered', 'Billed', 'Came', 'Batch', 'Expires', 'Status'],
      MED.slice(0, 6).map((m, i) => ({ c: i === 4 ? 'is--bad' : i === 3 || i === 5 ? 'is--warn' : '', v: [CHK(1, 'is--lg'), MEDC(m), m.q, m.q, i === 4 ? '<b class="u-bad">6</b>' : `<b>${m.q}</b>`, m.b, m.e, i === 3 ? STAT('warn', 'tag', 'Free strip missing: ₹72') : i === 4 ? STAT('bad', 'alert', 'Billed 10, 6 came: ₹244') : i === 5 ? STAT('warn', 'clock', 'Expires in 4 months') : STAT('ok', 'tick', 'Matches the order')] })), 'is--tall'), { lead: 1, cls: 'is--fill', right: `<span class="u-chip on">${KI('upload')}KP-3391.xlsx</span><span class="u-chip">${KI('ticks')}Tick by hand</span><span class="u-chip">${KI('qr')}Scan a pack</span>` })}
    ${BAR('<b>3 lines match. 3 need a look.</b> Nothing typed.<small>No file from the distributor? Tick what came against your own order instead.</small>', BTN('Send the claim', 'is--ghost', 'send') + BTN('Add to stock', '', '', KI('arrow')))}</div>`),

  stock: () => APP('stock', 'stock', `${HD('On the shelf', '1,284 medicines, worth ₹6.2 lakh')}
    <div class="a-body">${KPIS([['In good shape', 'tick', '86%', '+1.2%', 'ok', 'vs last week', [10, 12, 11, 13, 12, 14, 13, 15, 16]], ['Running low', 'box', '12', '+3', 'bad', 'since Monday', [4, 5, 5, 7, 8, 8, 9, 11, 12]], ['Expiring in 60 days', 'clock', '9', '₹3,140', 'bad', 'at risk', [3, 4, 4, 5, 7, 6, 8, 9, 9]], ['Just added', 'truck', '6', 'Order 1042', 'ok', 'today', [2, 2, 3, 2, 4, 3, 5, 4, 6]]])}
    ${TRAY('Every batch', 'box', TBL('minmax(0,1.7fr) .5fr .5fr .7fr .8fr 1fr 18px', ['Medicine', 'Shelf', 'Have', 'Expires', 'Sells in a week', 'Status', ''], [[0, 'A2', 24, 18, 0], [1, 'B1', 14, 8, 0], [2, 'B3', 19, 11, 0], [3, 'C1', 15, 6, 0], [4, 'C2', 9, 9, 1], [5, 'A4', 12, 4, 2], [6, 'D1', 6, 1, 3], [8, 'B2', 8, 1, 3], [7, 'E2', 14, 0, 4]].map(([k, sh, q, wk, stt]) => [MEDC(MED[k], MED[k].b ? 'Batch ' + MED[k].b : MED[k].p), sh, `<b>${q}</b>`, MED[k].e || ['', '', '', '', '', '', '5 Dec', '09/2027', '18 Nov'][k], wk ? wk + (k === 7 ? ' bottles' : ' strips') : 'None', [STAT('ok', 'tick', 'Fine'), STAT('warn', 'box', 'Running low'), STAT('warn', 'clock', 'In 4 months'), STAT('bad', 'alert', 'Expiring'), STAT('pri', 'hourglass', 'Not selling')][stt], MORE])), { lead: 1, cls: 'is--fill', right: CHIP('All', 1) + CHIP('Running low', 0, 12) + CHIP('Expiring', 0, 9) + CHIP('Fridge', 0, 4) })}</div>`),

  dues: () => LIST('buy', 'dues', 'Pay distributors', 'A reminder comes three days before each date.', [['To pay in 30 days', 'rupee', '₹61,730', '4', 'ink', 'bills', [20, 26, 22, 31, 28, 36, 40, 44]], ['Due tomorrow', 'clock', '₹18,200', '1', 'bad', 'bill'], ['Paid on time', 'tick', '96%', '+2%', 'ok', 'vs last quarter', [8, 9, 9, 10, 9, 11, 11, 12]], ['Distributors', 'truck', '23', '3', 'ink', 'used this week']], 'What you owe', 'rupee', CHIP('Due this week', 1, 3) + CHIP('All'), 'minmax(0,1.6fr) .5fr .8fr 1fr 1fr 18px', ['Distributor', 'Bills', 'Amount', 'Due', 'Status', ''],
    [{ c: 'is--warn', v: [WHOC(DIST, '30 days credit', 'amber'), '2', '<b>₹18,200</b>', '9 October', STAT('warn', 'clock', 'Tomorrow'), MORE] }, [WHOC('Godavari Distributors', '21 days credit', 'vio'), '1', '<b>₹9,640</b>', '12 October', STAT('ok', 'tick', 'On time'), MORE], [WHOC('Sri Venkat Pharma', '30 days credit', 'ok'), '3', '<b>₹31,075</b>', '15 October', STAT('ok', 'tick', 'On time'), MORE], [WHOC(DIST, 'Order 1042, received today', 'amber'), '1', '<b>₹2,815</b>', '7 November', STAT('pri', 'file', 'New today'), MORE]],
    BAR('<b>₹18,200</b> to Krishna Pharma is due tomorrow<small>You get 30 days of credit from them.</small>', BTN('Mark as paid', 'is--ghost') + BTN('Pay ₹18,200', '', 'rupee'))),

  returns: () => LIST('stock', 'expiry', 'Expiry returns', 'You are told before each distributor’s return date closes.', [['Waiting to come back', 'undo', '₹5,070', '3', 'bad', 'returns open'], ['Credited this year', 'tick', '₹18,400', '11', 'ok', 'credit notes', [2, 3, 5, 6, 8, 11, 14, 18]], ['Oldest open', 'clock', '40 days', 'Sri Venkat', 'bad', 'Pharma'], ['Next return date', 'calendar', '31 Oct', '23 days', 'bad', 'left to send back']], 'Sent back to distributors', 'undo', CHIP('Open', 1, 4) + CHIP('Credited'), 'minmax(0,1.6fr) .6fr .7fr .9fr 1.2fr 18px', ['Sent back to', 'Medicines', 'Value', 'Sent on', 'Where it stands', ''],
    [[WHOC(DIST, 'Return note 31', 'amber'), '7', '<b>₹2,310</b>', '26 September', STAT('warn', 'clock', 'Waiting, 12 days'), MORE], [WHOC('Godavari Distributors', 'Return note 30', 'vio'), '3', '<b>₹890</b>', '18 September', STAT('ok', 'tick', 'Credit note received'), MORE], [WHOC('Sri Venkat Pharma', 'Return note 29', 'ok'), '5', '<b>₹1,640</b>', '29 August', STAT('bad', 'alert', 'No reply, 40 days'), MORE], [WHOC('Godavari Distributors', 'Return note 32', 'vio'), '4', '<b>₹1,120</b>', 'This week', STAT('pri', 'box', 'Packed, not sent'), MORE]],
    BAR('<b>₹5,070</b> is waiting to come back<small>Each return is followed until its credit note arrives. Nothing is thrown away without a note.</small>', BTN('Remind all three', 'is--ghost', 'bell'))),

  /* ----- Stock ----- */
  expiry: () => LIST('stock', 'expiry', 'Expiring', 'Sell these first, or send them back while they still count.', [['At risk in 60 days', 'clock', '₹3,140', '9', 'bad', 'medicines', [3, 4, 4, 5, 7, 6, 8, 9, 9]], ['Expires this month', 'alert', '₹134', '1', 'bad', 'medicine'], ['Sent back in time', 'undo', '₹5,070', '16', 'ok', 'medicines', [2, 3, 5, 6, 8, 11, 14, 16]], ['Blocked at the counter', 'lock', '1', 'strip', 'ink', 'this week']], 'Expiring in 60 days', 'clock', CHIP('60 days', 1) + CHIP('90 days') + CHIP('This year'), '18px minmax(0,1.6fr) .5fr .9fr .7fr 1fr 18px', [CHK(0), 'Medicine', 'Have', 'Expires', 'Value', 'Risk', ''],
    [{ c: 'is--bad', v: [CHK(1), MEDC(MED[5], 'From ' + DSHORT), '12', '26 Oct 2026', '<b>₹134</b>', LVL(3, 'In 18 days'), MORE] }, [CHK(0), MEDC(MED[8], 'From Godavari Distributors'), '8', '18 Nov 2026', '<b>₹968</b>', LVL(2, 'In 41 days'), MORE], [CHK(0), MEDC(MED[9], 'From Sri Venkat Pharma'), '30', '29 Nov 2026', '<b>₹540</b>', LVL(2, 'In 52 days'), MORE], [CHK(0), MEDC(MED[6], 'From ' + DSHORT), '6', '5 Dec 2026', '<b>₹498</b>', LVL(1, 'In 58 days'), MORE]],
    BAR('<b>₹3,140</b> at risk in 9 medicines<small>This list reaches your phone every Monday.</small>', BTN('Download', 'is--ghost', 'download') + BTN('Send back to distributor', '', 'undo'))),

  lowstock: () => LIST('stock', 'lowstock', 'Running low', 'Below the level you usually keep. The order is already filled in.', [['Running low', 'box', '12', '+3', 'bad', 'since Monday', [4, 5, 5, 7, 8, 8, 9, 11, 12]], ['Out of stock', 'alert', '3', 'Today', 'bad', ''], ['Already in the order', 'list', '5', 'of 12', 'ink', 'medicines'], ['Asked for, not found', 'users', '7', 'times', 'bad', 'last week', [1, 0, 2, 1, 1, 0, 2]]], 'Twelve medicines are low', 'box', CHIP('Low', 1, 12) + CHIP('Out of stock', 0, 3), 'minmax(0,1.6fr) .6fr .9fr 1fr auto 18px', ['Medicine', 'Have', 'Sells in a week', 'Risk', 'Order', ''],
    [[MEDC(MED[0]), '<b class="u-bad">4</b>', '18 strips', LVL(3, 'Out in 2 days'), QTY(20), MORE], [MEDC(MED[4]), '<b class="u-bad">3</b>', '9 strips', LVL(3, 'Out in 3 days'), QTY(10), MORE], [MEDC(MED[1]), '<b>6</b>', '8 strips', LVL(2, 'Out in 5 days'), QTY(10), MORE], [MEDC(MED[2]), '<b>7</b>', '11 strips', LVL(2, 'Out in 5 days'), QTY(15), MORE]],
    BAR('<b>12 medicines</b> are low today<small>The same list comes to your phone every morning.</small>', BTN('Add all to the order', '', 'plus'))),

  deadstock: () => LIST('stock', 'expiry', 'Not selling', 'No sale in 90 days. Money sitting on the shelf.', [['Sitting on the shelf', 'hourglass', '₹4,009', '3', 'bad', 'medicines'], ['Longest wait', 'clock', '112 days', 'Cough syrup', 'ink', ''], ['Can go back', 'undo', '₹1,260', '1', 'ok', 'medicine'], ['Can move to a store', 'swap', '₹1,660', 'Bus stand', 'ok', 'sells it']], 'Three medicines have not moved', 'hourglass', CHIP('90 days', 1) + CHIP('180 days'), 'minmax(0,1.6fr) .5fr .9fr .7fr 1.2fr 18px', ['Medicine', 'Have', 'Last sold', 'Value', 'Best move', ''],
    [[MEDC(MED[7], 'From Godavari Distributors'), '14', '112 days ago', '<b>₹1,260</b>', STAT('pri', 'undo', 'Send back'), MORE], [MEDC(MED[6], 'From ' + DSHORT), '20', '96 days ago', '<b>₹1,660</b>', STAT('pri', 'swap', 'Move to Bus stand'), MORE], [MEDC(MED[8], 'From Sri Venkat Pharma'), '9', '94 days ago', '<b>₹1,089</b>', STAT('ok', 'tag', 'Offer 10% off'), MORE]],
    BAR('<b>₹4,009</b> in 3 medicines has not moved<small>In a group, we show which store sells each one fastest.</small>', BTN('Start a return', 'is--ghost', 'undo') + BTN('Move stock', '', 'swap'))),

  /* ----- Billing ----- */
  sell: () => APP('bill', 'sell', `${HD('New bill', 'Bill 2281, at Counter 1')}
    <div class="a-body"><div class="a-split" style="--side:384px">
      ${TRAY('Find a medicine', 'search', `<div class="u-card u-col"><div class="u-find is--idle">${KI('search')}<span>Type three letters</span></div><div class="b-two">${BTN('Scan a pack', 'is--ghost is--wide', 'qr')}${BTN('Not in stock', 'is--ghost is--wide', 'alert')}</div><small class="u-lbl">Sold most often here</small>
        <div class="b-fav">${[[0, 36, 24], [3, 118, 15], [2, 44, 19], [1, 96, 14], [5, 19, 12], [7, 85, 6]].map(([k, mrp, have]) => `<div>${PH(MED[k], 'is--lg')}<div><b>${MED[k].n}</b><small><span>₹${mrp}</span><span>${have} left</span></small></div></div>`).join('')}</div></div>`, { lead: 1, right: STAT('ok', 'tick', 'Oldest batch sells first') })}
      ${TRAY('This bill', 'receipt', `<div class="u-card b-pay"><div class="b-cust">${AV('L', 'amber', '', 'is--lg')}<div><b>Lakshmi</b>98765 •••43</div>${BDG('pri', '', '4th visit')}</div>
        <div class="b-lines">${[[3, 2, 236, 1], [2, 3, 132, 1], [0, 4, 144, 0]].map(([k, q, amt, rx]) => `<div class="b-line">${PH(MED[k], 'is--sm')}<div><b>${MED[k].n}${rx ? RX : ''}</b><small>${q} × ₹${MED[k].mrp} · batch ${MED[k].b}</small></div><em>₹${amt}</em></div>`).join('')}</div>
        <div class="b-doc">${KI('user')}<div><b>Dr. Rao</b>Remembered for her two prescription medicines</div>${KI('tick')}</div>
        <div class="b-sum"><div><span>MRP total</span><span>₹512</span></div><div class="u-ok"><span>Regular customer, 5% off</span><span>−₹26</span></div><div class="is--tot"><span>To pay</span><b>₹486</b></div></div>
        <div class="b-ways"><span class="on">UPI</span><span>Cash</span><span>Card</span><span>Credit</span></div>
        ${BTN('Take ₹486', 'is--wide is--lg', '', KI('arrow'))}<div class="b-two">${BTN('Print', 'is--ghost is--wide', 'printer')}${BTN('Hold this bill', 'is--ghost is--wide', 'clock')}</div>${NOTE('chat', 'The bill goes to her WhatsApp.')}</div>`, { lead: 1 })}
    </div></div>`),

  prices: () => APP('bill', 'prices', `${HD('Prices and discounts', 'Set once. Every counter follows.', BTN('Add a rule', '', 'plus'))}
    <div class="a-body">${KPIS([['Discount given this week', 'percent', '₹1,860', '38', 'ink', 'bills', [3, 5, 4, 6, 5, 7, 8]], ['Average discount', 'tag', '4.2%', '−0.6%', 'ok', 'vs last week', [9, 8, 8, 7, 7, 6, 6]], ['Stopped by a rule', 'shield', '3', 'bills', 'ink', 'this week'], ['Above MRP', 'lock', '0', 'Never', 'ok', 'allowed']])}
    ${TRAY('Rules', 'sliders', `<div class="u-card u-tbl is--rules">
      <div class="u-rule"><span class="u-ico">${KI('shield')}</span><div><b>Never above MRP</b><small>A bill cannot charge more than the printed price.</small></div>${STAT('ok', 'lock', 'Always on')}</div>
      <div class="u-rule"><span class="u-ico">${KI('users')}</span><div><b>Regular customers: 5% off</b><small>From the third visit. 214 people get it today.</small></div><span class="u-tog"></span></div>
      <div class="u-rule"><span class="u-ico">${KI('user')}</span><div><b>Senior citizens: 7% off</b><small>Marked once on the customer’s page. 61 people.</small></div><span class="u-tog"></span></div>
      <div class="u-rule"><span class="u-ico">${KI('percent')}</span><div><b>Counter staff: up to 8% off</b><small>More than that asks the owner on the phone.</small></div><span class="u-tog"></span></div>
      <div class="u-rule"><span class="u-ico">${KI('tag')}</span><div><b>Near expiry: 10% off</b><small>For medicines inside 60 days. 9 medicines today.</small></div><span class="u-tog is--off"></span></div>
      <div class="u-rule"><span class="u-ico">${KI('rupee')}</span><div><b>Keep at least 12% margin</b><small>A discount that goes below it is stopped.</small></div><span class="u-tog"></span></div></div>`, { lead: 1, cls: 'is--fill', right: CHIP('Rules', 1, 6) + CHIP('Price list') })}
    ${BAR('Every change to a price shows <b>who made it, and when</b><small>The same rules reach every counter, in every store.</small>', BTN('See the price list', 'is--ghost'))}</div>`, 'rao'),

  salereturn: () => LIST('bill', 'salereturn', 'Take a return', 'Bill 2274, Suresh, 6 October. Tap what came back.', [['Bill 2274', 'receipt', '₹426', '3', 'ink', 'medicines'], ['Coming back', 'undo', '1 strip', 'Amoxicillin', 'ink', ''], ['Refund', 'rupee', '₹96', 'By UPI', 'ok', 'as he paid'], ['Return window', 'calendar', '7 days', '2 days', 'ok', 'used']], 'Bill 2274', 'receipt', CHIP('From an old bill', 1) + CHIP('Without a bill'), '18px minmax(0,1.6fr) .7fr auto .7fr 1.2fr', [CHK(0), 'Medicine', 'Sold', 'Coming back', 'Refund', 'Status'],
    [[CHK(1), MEDC(MED[1], 'Batch AX7730'), '2 strips', QTY(1), '<b>₹96</b>', STAT('ok', 'tick', 'Goes back on the shelf')], [CHK(0), MEDC(MED[0], 'Batch PK2291'), '3 strips', '<span class="u-mut">Not returned</span>', '—', ''], [CHK(0), MEDC(MED[7], 'Opened bottle'), '1 bottle', '—', '—', STAT('bad', 'alert', 'Cannot be returned')]],
    BAR('<b>₹96</b> to give back to Suresh, by UPI<small>The stock, the day book and the GST file all correct themselves.</small>', BTN('Refund ₹96', '', '', KI('arrow')))),

  substitute: () => LIST('bill', 'sell', 'Out of stock? Same salt, in stock.', 'Telma 40 is finished. These have the same salt and strength.', null, 'Same as Telmisartan 40 mg', 'swap', STAT('warn', 'alert', 'Telma 40: none left'), 'minmax(0,1.6fr) .9fr .5fr .5fr 1fr auto', ['Medicine', 'Maker', 'Have', 'MRP', 'Match', ''],
    [[MEDC(MED[3], 'Strip of 15'), 'Sample maker A', '<b>15</b>', '<b>₹118</b>', STAT('ok', 'tick', 'Same salt and strength'), BTN('Add to bill', 'is--sm', 'plus')], [MEDC(MED[11], 'Strip of 10'), 'Sample maker B', '<b>8</b>', '<b>₹84</b>', STAT('ok', 'tick', 'Same salt and strength'), BTN('Add to bill', 'is--ghost is--sm', 'plus')], [MEDC(MED[4], 'Strip of 15'), '—', '10', '₹92', STAT('bad', 'lock', 'Different salt. Not offered.'), '']],
    BAR('<b>Telma 40</b> is added to tomorrow’s order<small>The pharmacist decides. The app only shows what is on the shelf.</small>', BTN('Back to the bill', 'is--ghost'))),

  /* ----- Customers ----- */
  wabill: () => DUO(WA_BILL, 'Bill 2281 is on her phone', 'A link to the bill. No medicine names in the message.', [['Bill sent as a link', '6:14 pm, as the sale closed', 'on'], ['Customer saved', 'Lakshmi, 4th visit', 'on'], ['H1 register filled', 'One line, by itself', 'on'], ['Refill reminder set', 'For 4 November', 'on']]),
  remind: () => DUO(WA_REMIND, 'A refill, before it runs out', 'Worked out from the strip and the dose.', [['30 tablets, one a day', 'Billed on 8 October', 'on'], ['Reminder sent on day 27', '9:00 am', 'on'], ['She replied YES', 'The order is in the store inbox', 'on'], ['Packed and ready', 'From 11 am', 'on']]),

  campaign: () => APP('cust', '', `${HD('Send an offer', 'Only to people who said yes at the counter.')}
    <div class="a-body"><div class="a-split" style="--side:360px"><div class="u-col" style="gap:11px">
      ${TRAY('Who gets it', 'users', `<div class="u-card"><div class="u-pick">${CHIP('Sugar and BP regulars', 1, 214)}${CHIP('Bought baby care', 0, 96)}${CHIP('Not seen in 60 days', 0, 140)}${CHIP('Senior citizens', 0, 61)}</div></div>`, { lead: 1, right: CHIP('1 Who') + CHIP('2 Message', 1) + CHIP('3 Send') })}
      ${TRAY('The message', 'chat', `<div class="u-card u-col"><p class="u-msg">Free sugar check this Sunday, 8 to 11 am, at ${STORE}. Reply STOP to end.</p><div class="u-row" style="justify-content:space-between">${STAT('ok', 'tick', 'No medicine names. Checked.')}${STAT('ok', 'tick', 'Telugu copy ready')}</div></div>`, { lead: 1 })}
      ${KPIS([['What it costs', 'rupee', '₹218', '₹1.02', 'ink', 'each, with GST'], ['People', 'users', '214', 'All', 'ok', 'said yes'], ['Usually read', 'eye', '7 in 10', 'Within', 'ink', 'a day']])}</div>
      <div class="u-duo" style="padding:0;display:grid;place-items:center">${PHONE(CHAT(STORE, 'Business account', [INC(`Free sugar check this Sunday, 8 to 11 am, at ${STORE}.<br>Reply STOP to end.`, '9:00 am')]))}</div>
    </div>${BAR('<b>214 people</b> will get this on Sunday at 9 am<small>“STOP” ends it for that person, for good.</small>', BTN('Send a test to me', 'is--ghost') + BTN('Send on WhatsApp', '', 'send'))}</div>`),

  customer: () => APP('cust', '', `${HD('Lakshmi', '98765 •••43. Said yes to messages on 2 June.', BTN('New bill for her', '', 'plus'))}
    <div class="a-body">${KPIS([['Visits this year', 'calendar', '4', '+1', 'ok', 'this month', [1, 1, 2, 2, 3, 3, 4]], ['Spent this year', 'rupee', '₹1,930', '+₹486', 'ok', 'today', [3, 4, 4, 9, 9, 14, 19]], ['To collect', 'wallet', '₹0', 'Nothing', 'ok', 'is due'], ['Next refill', 'bell', '11 Oct', 'In 3 days', 'bad', 'Telmisartan']])}
    ${TRAY('Her regular medicines', 'pill', TBL('minmax(0,1.6fr) .7fr .8fr .8fr 1fr 18px', ['Medicine', 'Dose', 'A strip lasts', 'Doctor', 'Refill', ''], [[MEDC(MED[3], 'Strip of 15', RX), '1 a day', '15 days', 'Dr. Rao', STAT('warn', 'clock', 'In 3 days'), MORE], [MEDC(MED[2], 'Strip of 15', RX), '2 a day', '15 days', 'Dr. Rao', STAT('ok', 'tick', '19 October'), MORE], [MEDC(MED[6], 'Strip of 4'), '1 a week', '4 weeks', '—', STAT('ok', 'tick', '2 November'), MORE]]), { lead: 1, right: `<span class="u-chip">${KI('bell')}Remind now</span>` })}
    ${TRAY('Her bills', 'receipt', TBL('.7fr .8fr .9fr .7fr .7fr 1fr 18px', ['Bill', 'Date', 'Medicines', 'Paid by', 'Amount', 'Status', ''], [['2281', '8 October', '3 medicines', 'UPI', '<b>₹486</b>', STAT('ok', 'tick', 'Sent on WhatsApp'), MORE], ['2107', '9 September', '3 medicines', 'UPI', '<b>₹512</b>', STAT('ok', 'tick', 'Sent on WhatsApp'), MORE], ['1946', '11 August', '2 medicines', 'Cash', '<b>₹468</b>', STAT('ok', 'tick', 'Printed'), MORE]]), { lead: 1, cls: 'is--fill', right: CHIP('This year', 1) + CHIP('All') })}</div>`),

  /* ----- Money ----- */
  accounts: () => APP('money', '', `${HD('Day book', 'Thursday, 8 October. Everything here comes from the bills.', BTN('Close the day', '', 'lock'))}
    <div class="a-body">${KPIS([['Sales', 'rupee', '₹21,400', '+8%', 'ok', 'vs last week', [12, 19, 15, 22, 17, 20, 14, 21, 18]], ['Profit', 'trend', '₹4,180', '19.5%', 'ok', 'margin', [9, 10, 12, 11, 13, 12, 14, 15]], ['Cash in the drawer', 'wallet', '₹8,330', '62', 'ink', 'bills today'], ['To collect', 'users', '₹2,960', '3', 'bad', 'customers', [1, 1, 2, 2, 2, 3, 3]]])}
    ${TRAY('Money in and out', 'list', TBL('minmax(0,1.7fr) 1.1fr .7fr .7fr 1fr 18px', ['Entry', 'How', 'Money in', 'Money out', 'Status', ''], [[WHOC('62 bills', 'At the counter', 'ok'), 'UPI ₹13,150, cash ₹8,250', '<b class="u-ok">₹21,400</b>', '', STAT('ok', 'tick', 'From the bills'), MORE], [WHOC('Anitha', 'Paid an old bill', 'vio'), 'Cash', '<b class="u-ok">₹340</b>', '', STAT('ok', 'tick', 'Credit cleared'), MORE], [WHOC(DIST, 'Bills 3391 and 3378', 'amber'), 'From the bank', '', '<b>₹12,000</b>', STAT('ok', 'tick', 'Paid on time'), MORE], [WHOC('Refund to Suresh', 'Bill 2274, one strip', ''), 'UPI', '', '<b>₹96</b>', STAT('pri', 'undo', 'Return'), MORE], [WHOC('Shop expenses', 'Tea and a courier', 'ink'), 'Cash', '', '<b>₹260</b>', STAT('ok', 'tick', 'Noted'), MORE]], 'is--tall'), { lead: 1, cls: 'is--fill', right: CHIP('Today', 1) + CHIP('This week') + CHIP('This month') })}
    ${BAR('<b>₹8,330</b> should be in the drawer now<small>Count it at closing. Any difference is noted, not hidden.</small>', BTN('Add an expense', 'is--ghost', 'plus') + BTN('Close the day', '', 'lock'))}</div>`, 'rao'),

  collect: () => LIST('money', '', 'Money to collect', 'Customers who buy on credit. A polite reminder goes on WhatsApp.', [['To collect', 'wallet', '₹2,960', '3', 'bad', 'customers'], ['Oldest bill', 'clock', '38 days', 'Venkatesh', 'bad', ''], ['Collected this month', 'tick', '₹6,480', '9', 'ok', 'payments', [1, 2, 2, 4, 5, 5, 7, 9]], ['Credit limit used', 'percent', '41%', 'of ₹7,200', 'ink', '']], 'Three customers owe you', 'wallet', CHIP('To collect', 1, 3) + CHIP('Paid this month'), 'minmax(0,1.6fr) .5fr .7fr 1fr 1fr auto', ['Customer', 'Bills', 'Amount', 'Oldest bill', 'Risk', ''],
    [[WHOC('Venkatesh', 'Hostel warden', 'amber'), '4', '<b>₹1,640</b>', '38 days ago', LVL(3, 'High'), BTN('Remind', 'is--ghost is--sm', 'bell')], [WHOC('Sarada Clinic', 'Dr. Sarada', 'vio'), '2', '<b>₹980</b>', '16 days ago', LVL(2, 'Medium'), BTN('Remind', 'is--ghost is--sm', 'bell')], [WHOC('Anitha', 'Lakshmi’s daughter', 'ok'), '1', '<b>₹340</b>', '4 days ago', LVL(1, 'Low'), BTN('Remind', 'is--ghost is--sm', 'bell')]],
    BAR('<b>₹2,960</b> to collect from 3 customers<small>Each one has a limit. Above it, credit stops.</small>', BTN('Take a payment', '', 'rupee')), 'rao'),

  gst: () => LIST('gst', '', 'GST for September', 'Worked out from every bill and every purchase. Nothing to add up.', [['Tax on sales', 'rupee', '₹30,680', '1,874', 'ink', 'bills'], ['Tax on purchases', 'truck', '₹27,290', '61', 'ink', 'purchase bills'], ['GST to pay', 'file', '₹3,390', 'By', 'bad', '20 October'], ['Bills that match', 'tick', '100%', '0', 'ok', 'to fix']], 'Summary by rate', 'file', CHIP('GSTR-1') + CHIP('GSTR-3B', 1) + CHIP('Tally file'), 'minmax(0,1.6fr) 1fr 1fr 1fr 1fr', ['Rate', 'Sales', 'Tax on sales', 'Tax on purchases', 'Status'],
    [[WHOC('5%', 'Most medicines', ''), '₹5,12,300', '<b>₹24,395</b>', '₹21,880', STAT('ok', 'tick', 'Matches the bills')], [WHOC('Nil', 'Listed life-saving drugs', 'ok'), '₹18,640', '—', '—', STAT('ok', 'tick', 'Matches the bills')], [WHOC('18%', 'Other items', 'amber'), '₹41,200', '<b>₹6,285</b>', '₹5,410', STAT('ok', 'tick', 'Matches the bills')]],
    BAR('<b>₹3,390</b> of GST to pay for September<small>Your accountant checks it before it is filed.</small>', BTN('Excel', 'is--ghost', 'download') + BTN('Send to the accountant', '', 'send')), 'rao'),

  ca: () => APP('gst', '', `${HD('Your accountant’s login', 'He can see and download. He cannot change a thing.')}
    <div class="a-body"><div class="a-split" style="--side:360px">
      ${TRAY('Ready for him', 'file', TBL('minmax(0,1.6fr) .9fr 1fr auto', ['File', 'Period', 'Status', ''], [[WHOC('GSTR-1 and 3B summary', 'From the bills', ''), 'September', STAT('ok', 'tick', 'Ready'), BTN('Download', 'is--ghost is--sm', 'download')], [WHOC('Tally file', 'Sales, purchases, payments', 'amber'), 'September', STAT('ok', 'tick', 'Ready'), BTN('Download', 'is--ghost is--sm', 'download')], [WHOC('Purchase register', 'By distributor', 'ok'), 'September', STAT('ok', 'tick', 'Ready'), BTN('Download', 'is--ghost is--sm', 'download')], [WHOC('Stock statement', 'Value at cost, by batch', 'ink'), '30 September', STAT('ok', 'tick', 'Ready'), BTN('Download', 'is--ghost is--sm', 'download')], [WHOC('Day book', 'Every day of the month', 'vio'), 'September', STAT('ok', 'tick', 'Ready'), BTN('Download', 'is--ghost is--sm', 'download')], [WHOC('H1 register', 'For the drugs inspector', ''), 'September', STAT('ok', 'tick', 'Ready'), BTN('Download', 'is--ghost is--sm', 'download')]], 'is--tall'), { lead: 1, cls: 'is--fill', right: STAT('ok', 'lock', 'Read only') })}
      ${TRAY('Ravi Kumar, accountant', 'user', `<div class="u-card u-col"><div class="u-row">${AV('RK', 'amber', '', 'is--lg')}<div><b>Ravi Kumar</b><small style="font-size:13px">Last opened on 3 October</small></div></div>${STEPS([['Sees every report', 'For all three stores', 'on'], ['Downloads Excel and Tally', 'No calls to ask for files', 'on'], ['Cannot edit a bill', 'Every look is logged', 'on'], ['Files GST from his office', 'With numbers that already match', 'on']])}${BTN('Send him September', 'is--wide', 'send')}</div>`, { cls: 'is--fill' })}
    </div></div>`, 'rao'),

  /* ----- Law ----- */
  h1: () => LIST('reports', '', 'Schedule H1 register', 'One line is written each time such a medicine is billed.', [['Lines this month', 'book', '41', 'All', 'ok', 'from the bills', [2, 5, 9, 14, 20, 27, 33, 41]], ['Written by hand', 'keyboard', '0', 'None', 'ok', 'this year'], ['Kept for', 'calendar', '3 years', 'As the', 'ink', 'rule asks'], ['Inspection pack', 'download', 'Ready', 'Up to', 'ok', 'today']], '41 lines this month, all from the bills', 'book', CHIP('October', 1) + CHIP('September'), '.5fr minmax(0,1.1fr) minmax(0,1fr) minmax(0,1.3fr) .4fr 1fr', ['Date', 'Patient', 'Doctor', 'Medicine', 'Qty', 'Status'],
    [['8 Oct', PERSON('Lakshmi', 'amber'), 'Dr. Rao', 'Levofloxacin 500 mg', '<b>5</b>', STAT('ok', 'tick', 'From bill 2281')], ['8 Oct', PERSON('Suresh', 'vio'), 'Dr. Fatima', 'Cefixime 200 mg', '<b>10</b>', STAT('ok', 'tick', 'From bill 2274')], ['7 Oct', PERSON('Anitha', 'ok'), 'Dr. Rao', 'Alprazolam 0.25 mg', '<b>10</b>', STAT('ok', 'tick', 'From bill 2260')], ['7 Oct', PERSON('Venkatesh', 'ink'), 'Dr. Sarada', 'Levofloxacin 500 mg', '<b>5</b>', STAT('ok', 'tick', 'From bill 2251')]],
    BAR('<b>Kept for three years.</b> Nothing written by hand.<small>The register prints in the format the inspector expects.</small>', BTN('Download the register', '', 'download'))),

  blocked: () => LIST('bill', 'sell', 'This strip has expired', 'It cannot go on a bill. Here is one that can.', null, 'Cetirizine 10 mg on your shelf', 'shield', STAT('bad', 'lock', 'Stopped at the counter'), 'minmax(0,1.6fr) .7fr .9fr 1.2fr auto', ['Medicine', 'Batch', 'Expires', 'Status', ''],
    [{ c: 'is--bad', v: [MEDC(MED[5], 'Scanned just now'), 'CT2217', 'September 2026', STAT('bad', 'alert', 'Expired. Moved to returns.'), ''] }, [MEDC(MED[5], '12 strips on shelf A4'), 'CT3340', '02/2027', STAT('ok', 'tick', 'Good to sell'), BTN('Use this one', 'is--sm', 'plus')]],
    BAR('<b>1 strip</b> is in the return box for Krishna Pharma<small>An expired or recalled batch cannot be billed, by anyone, at any counter.</small>', BTN('See all returns', 'is--ghost'))),

  inspect: () => APP('reports', '', `${HD('Inspection pack', 'Everything a drugs inspector asks for, in one download.', BTN('Download the pack', '', 'download'))}
    <div class="a-body">${KPIS([['Records in the pack', 'file', '5', 'All', 'ok', 'up to date'], ['H1 lines this year', 'book', '386', 'All', 'ok', 'from the bills', [2, 5, 9, 14, 20, 27, 33, 41]], ['Bills with a batch', 'receipt', '100%', '0', 'ok', 'missing'], ['Licences', 'shield', '2 of 4', '54', 'bad', 'days to renew']])}
    ${TRAY('In the pack', 'shield', TBL('minmax(0,1.6fr) 1fr 1fr 1.1fr 18px', ['Record', 'Covers', 'Last entry', 'Up to date?', ''], [[WHOC('Schedule H1 register', '41 lines this month', ''), '12 months', 'Today, 6:14 pm', STAT('ok', 'tick', 'Till today'), MORE], [WHOC('Purchase bills', 'From 23 distributors', 'amber'), '12 months', 'Today, 11:20 am', STAT('ok', 'tick', 'Till today'), MORE], [WHOC('Sale bills', 'With batch on every line', 'ok'), '12 months', 'Today, 6:14 pm', STAT('ok', 'tick', 'Till today'), MORE], [WHOC('Expired stock list', 'With return notes', 'vio'), '12 months', '26 September', STAT('ok', 'tick', 'Till today'), MORE], [WHOC('Licences', 'Forms 20 and 21', 'ink'), 'Valid', '1 December 2026', STAT('warn', 'clock', 'Renew in 54 days'), MORE]], 'is--tall'), { lead: 1, cls: 'is--fill', right: STAT('ok', 'tick', 'Ready today') })}
    ${BAR('<b>One file</b>: a PDF and the Excel sheets behind it<small>Every download is logged, with who and when.</small>', BTN('Print the register', 'is--ghost', 'printer') + BTN('Download the pack', '', 'download'))}</div>`, 'rao'),

  licence: () => LIST('reports', '', 'Licences and renewals', 'You are told 60 and 30 days before each one ends.', [['Licences', 'shield', '4', '2', 'bad', 'to renew'], ['Next renewal', 'calendar', '1 Dec', '54', 'bad', 'days left'], ['Reminders', 'bell', '2', '60 and 30', 'ink', 'days before'], ['Copies kept', 'file', '4', 'All', 'ok', 'scanned']], 'Four licences', 'shield', CHIP('This store', 1) + CHIP('All stores'), 'minmax(0,1.6fr) 1fr 1.1fr auto', ['Licence', 'Valid till', 'Status', ''],
    [{ c: 'is--warn', v: [WHOC('Drug licence, Form 20', 'Retail sale', 'amber'), '1 December 2026', STAT('warn', 'clock', 'Renew in 54 days'), BTN('Start', 'is--sm')] }, [WHOC('Drug licence, Form 21', 'Schedule C and C1', 'amber'), '1 December 2026', STAT('warn', 'clock', 'Renew in 54 days'), BTN('Start', 'is--sm')], [WHOC('GST registration', '37AAAAA0000A1Z5', ''), 'No end date', STAT('ok', 'tick', 'Nothing to do'), ''], [WHOC('Pharmacist registration', 'Imran', 'ok'), '31 March 2027', STAT('ok', 'tick', 'Nothing to do'), '']],
    BAR('<b>2 licences</b> to renew before 1 December<small>The scanned copies are kept here, with the pack.</small>', BTN('Add a licence', 'is--ghost', 'plus')), 'rao'),

  /* ----- One store or many ----- */
  one: () => V.home(),
  multi: () => APP('home', '', `${HD('All three stores', 'Thursday, 8 October', BTN('Approve order 1057', '', 'tick'))}
    <div class="h-grid" style="grid-template-rows:122px auto minmax(0,1fr)">
      ${KPI('Sales, all stores', 'rupee', '₹48,260', '+8%', 'ok', 'vs last week', [12, 19, 15, 22, 17, 20, 14, 21, 18])}
      ${KPI('Profit', 'trend', '₹9,410', '19.5%', 'ok', 'margin', [9, 10, 12, 11, 13, 12, 14, 15])}
      ${KPI('Running low', 'box', '42', '+6', 'bad', 'in 3 stores', [4, 5, 5, 7, 8, 8, 9, 11, 12])}
      ${TRAY('Needs you', 'bell', `<div class="u-card">${SEG(['Today', 'Yesterday', 'This week'], 0)}<p class="h-count"><b>2</b>things wait for you</p>
        ${FEED([['list', 'blue', 'Approve an order', '4:12 PM', '<b>Bus stand</b>, ₹62,000, above your limit'], ['swap', 'bad-l', 'A transfer does not match', '2:40 PM', '1 strip missing, <b>Main road</b> to Bus stand'], ['rupee', 'warn', 'Pay Krishna Pharma', 'Tomorrow', '<b>₹18,200</b> for Main road'], ['alert', 'bad-l', 'Expiry risk', 'This week', '<b>24 medicines</b> in 3 stores'], ['user', 'ok-l', 'New person added', 'Yesterday', '<b>Padma</b>, counter, Bus stand']])}</div>`, { cls: 'h-feed' })}
      ${TRAY('Each store keeps its own stock and its own orders', 'store', TBL('minmax(0,1.7fr) .8fr .7fr .5fr 1.2fr auto', ['Store', 'Sales', 'Margin', 'Low', 'Expiring', ''], [[WHOC('Main road', 'Imran, 62 bills today', ''), '<b>₹21,400</b>', '19%', '12', STAT('warn', 'clock', '9 medicines'), BTN('Open', 'is--ghost is--sm')], [WHOC('Bus stand', 'Padma, 54 bills today', 'amber'), '<b>₹18,960</b>', '21%', '7', STAT('ok', 'tick', '4 medicines'), BTN('Open', 'is--ghost is--sm')], { c: 'is--warn', v: [WHOC('Hospital gate', 'Ramesh, 31 bills today', 'ok'), '<b>₹7,900</b>', '17%', '<b class="u-bad">23</b>', STAT('warn', 'clock', '11 medicines'), BTN('Open', 'is--ghost is--sm')] }], 'is--tall'), { lead: 1, cls: 'h-chart', right: CHIP('Today', 1) + CHIP('This week') })}
      ${TRAY('Sales in the last 14 days, all stores', 'chart', `<div class="u-card" style="display:flex;flex-direction:column;gap:6px;padding:14px 16px 10px 18px"><div class="h-big"><b class="u-num">₹6,12,400</b><span class="u-delta"><b class="u-ok">+8%</b>vs the 14 days before</span></div>${PLOT(DAYS, 13, 'Today : ₹48,260', ['0', '20k', '40k', '60k', '80k'], ['26 Sep', '28', '30', '2 Oct', '4', '6', '8 Oct'], 6)}</div>`, { lead: 1, cls: 'h-table', right: `<span class="u-chip">${KI('calendar')}Last 14 days${KI('chevd')}</span>` })}
    </div>`, 'rao'),

  rules: () => APP('set', '', `${HD('Rules for every store', 'Set once here. Every counter follows.', BTN('Add a rule', '', 'plus'))}
    <div class="a-body">${KPIS([['Rules that are on', 'sliders', '6', 'All', 'ok', 'stores follow'], ['Orders that waited', 'list', '3', 'This', 'ink', 'week'], ['Stock moved in time', 'swap', '₹4,860', '12', 'ok', 'medicines', [1, 2, 2, 4, 5, 7, 9, 12]], ['Edits logged', 'eye', '27', 'This', 'ink', 'month']])}
    ${TRAY('Rules', 'sliders', `<div class="u-card u-tbl is--rules">
      <div class="u-rule"><span class="u-ico">${KI('truck')}</span><div><b>Each store orders from its own distributors</b><small>Main road: 3. Bus stand: 2. Hospital gate: 3.</small></div><span class="u-tog"></span></div>
      <div class="u-rule"><span class="u-ico">${KI('rupee')}</span><div><b>Orders above ₹50,000 wait for the owner</b><small>You approve on your phone. One tap.</small></div><span class="u-tog"></span></div>
      <div class="u-rule"><span class="u-ico">${KI('swap')}</span><div><b>Near-expiry stock is offered to the store that sells it fastest</b><small>Before it is sent back.</small></div><span class="u-tog"></span></div>
      <div class="u-rule"><span class="u-ico">${KI('tag')}</span><div><b>One price list for all stores</b><small>Prices and discounts reach every counter the same minute.</small></div><span class="u-tog"></span></div>
      <div class="u-rule"><span class="u-ico">${KI('box')}</span><div><b>A transfer is “on the way” until the other store ticks it in</b><small>Nothing is lost between two counters.</small></div><span class="u-tog"></span></div>
      <div class="u-rule"><span class="u-ico">${KI('eye')}</span><div><b>Deleted bills and changed prices are logged</b><small>Who, when, and what it was before.</small></div>${STAT('ok', 'lock', 'Always on')}</div></div>`, { lead: 1, cls: 'is--fill', right: CHIP('Rules', 1, 6) + CHIP('Who changed what') })}</div>`, 'rao'),

  transfer: () => LIST('stock', 'stock', 'Move stock between stores', 'Main road to Bus stand. It is “on the way” until they tick it in.', [['Sent', 'truck', '38', 'strips', 'ink', 'from Main road'], ['Ticked in', 'ticks', '37', 'strips', 'ok', 'at Bus stand'], ['Missing', 'alert', '1', 'strip', 'bad', 'Pantoprazole'], ['On the way for', 'clock', '2 hours', 'Since', 'ink', '2:10 pm']], 'Transfer 208', 'swap', STAT('pri', 'truck', 'On the way'), 'minmax(0,1.6fr) .7fr .5fr 1.2fr 18px', ['Medicine', 'Batch', 'Sent', 'At Bus stand', ''],
    [[MEDC(MED[6], 'Sells 3 times faster at Bus stand'), 'VD1180', '<b>20</b>', STAT('ok', 'tick', 'Ticked in: 20'), MORE], [MEDC(MED[8], 'Expires in 41 days'), 'AZ4410', '<b>8</b>', STAT('ok', 'tick', 'Ticked in: 8'), MORE], { c: 'is--bad', v: [MEDC(MED[4], 'Does not match'), 'PZ0917', '<b>10</b>', STAT('bad', 'alert', 'Ticked in: 9. One is missing.'), MORE] }],
    BAR('<b>37 of 38 strips</b> have arrived at Bus stand<small>Stock leaves one store’s count only when the other accepts it.</small>', BTN('Ask Bus stand', 'is--ghost', 'chat') + BTN('New transfer', '', 'plus')), 'rao'),

  staff: () => LIST('set', '', 'People and what they can do', 'Each person signs in with a phone number. No shared passwords.', [['People here', 'users', '3', 'Main road', 'ink', ''], ['In all stores', 'store', '9', '3', 'ink', 'stores'], ['Shared passwords', 'lock', '0', 'None', 'ok', ''], ['Languages in use', 'lang', '2', 'English,', 'ink', 'Telugu']], 'Three people at Main road', 'users', CHIP('Main road', 1, 3) + CHIP('All stores', 0, 9), 'minmax(0,1.3fr) .8fr minmax(0,1.6fr) .7fr 18px', ['Person', 'Role', 'Can do', 'Language', ''],
    [[PERSON('Imran', '', FACE.imran), STAT('pri', 'receipt', 'Counter'), 'Bill, receive, order up to ₹50,000', 'English', MORE], [PERSON('Padma', 'amber'), STAT('pri', 'receipt', 'Counter'), 'Bill only. Discount up to 8%.', '<span lang="te">తెలుగు</span>', MORE], [PERSON('Ravi Kumar', 'ok'), STAT('ok', 'eye', 'Read only'), 'See and download reports', 'English', MORE]],
    BAR('Each person picks their own language and text size<small>It follows them to any counter they sign in at.</small>', BTN('Add a person', '', 'plus')), 'rao'),

  /* ----- Moving in, and the first minute ----- */
  migrate: () => APP('set', '', `${HD('Move in from your old software', 'Your old software keeps running until you say stop.')}
    <div class="a-body"><div class="u-row" style="gap:6px;flex:none">${CHIP(KI('tick') + 'Choose your old software')}${KI('chev')}${CHIP('Check what we found', 1)}${KI('chev')}${CHIP('Start using it')}</div><div class="mv">
      ${TRAY('Where are you coming from?', 'upload', `<div class="u-card u-col"><div class="mv-from"><span class="on"><i></i>Marg</span><span><i></i>Profitmaker</span><span><i></i>An Excel sheet</span><span><i></i>Another software</span></div>
        <div class="mv-file">${KI('file')}<div><b>Backup file read</b>Nothing was changed in your old software.</div></div>
        <small class="u-lbl">Old word, new word</small><div class="mv-words"><div><s>Party</s>${KI('arrow')}<b>Distributor</b></div><div><s>Purchase entry</s>${KI('arrow')}<b>Receive</b></div><div><s>Item master</s>${KI('arrow')}<b>Medicines</b></div><div><s>Outstanding</s>${KI('arrow')}<b>To pay, to collect</b></div></div>
        <small class="u-lbl">What comes with you</small><div class="mv-from">${['Medicines and prices', 'Batches and expiry', 'Customers and doctors', 'Distributors', 'What you owe and are owed', 'Two years of bills'].map(t => `<span>${CHK(1)}${t}</span>`).join('')}</div>
        ${NOTE('keyboard', 'The keys your hands know still work: F2 opens a new bill.')}</div>`, { lead: 1, cls: 'is--fill' })}
      ${TRAY('What we found', 'search', `<div class="u-card u-col"><div class="mv-got"><div><b>4,218</b>medicines, with batch and expiry</div><div><b>1,930</b>customers</div><div><b>23</b>distributors</div><div><b>₹1,84,300</b>to pay and to collect</div></div>
        <div class="u-row" style="justify-content:space-between">${STAT('ok', 'tick', '4,206 matched by themselves')}${STAT('warn', 'alert', '12 need one look')}</div>
        <div class="u-tbl" style="--cols:minmax(0,1fr) minmax(0,1fr) auto;padding:0;margin:0 -6px">${[['PARACIP-650 TAB', 0], ['TELMA 40MG', 3], ['AMOXYCILLIN 500 CAP', 1], ['PAN-40 TAB 15S', 4], ['CETRIZINE 10', 5]].map(([old, k], i) => `<div class="u-tr"><span><small>In your old software</small>${old}</span><span>${MEDC(MED[k], 'Is it this one?')}</span><span>${BTN('Yes', i ? 'is--ghost is--sm' : 'is--sm', 'tick')}</span></div>`).join('')}</div>
        ${NOTE('undo', 'One tap takes it all back, any time in the first 30 days.')}</div>`, { lead: 1, cls: 'is--fill' })}
    </div>${BAR('<b>Ready to move.</b> About 4 minutes.<small>Your stock count will match the old software on the day you switch.</small>', BTN('Look at the 12', 'is--ghost') + BTN('Move my data', '', '', KI('arrow')))}</div>`, 'rao'),

  lang: () => `<div class="a-main" style="padding:0"><div class="lg"><i class="a-logo" style="width:52px;height:52px;border-radius:14px">${CAP.replace('<svg', '<svg style="width:34px;height:34px"')}</i><b>Choose your language<span lang="te">మీ భాషను ఎంచుకోండి</span></b>
    <div class="lg-two"><div lang="te"><b>తెలుగు</b><small>అన్నీ తెలుగులో</small><i></i></div><div class="on"><b>English</b><small>Everything in English</small><i>${KI('tick')}</i></div></div>
    ${NOTE('info', 'You can change it any time, from the top of every screen.')}${BTN('Continue', 'is--lg', '', KI('arrow'))}</div></div>`,

  /* ----- Owner on the counter screen: the phone, beside the stores ----- */
  owner: () => `<div class="u-duo">${PHONE(OWNER)}<div class="u-side"><div><b class="a-t">All three stores, live</b><small style="font-size:15px;margin-top:6px">Every bill shows here the moment it is made.</small></div>
    ${TRAY('Sales today, by store', 'store', `<div class="u-card u-col" style="gap:14px">${[['Main road', 100, '₹21,400'], ['Bus stand', 88, '₹18,960'], ['Hospital gate', 37, '₹7,900']].map(([n, w, v]) => `<div class="u-hbar" style="--w:${w}%"><span>${n}</span><b>${v}</b><i></i></div>`).join('')}</div>`, { lead: 1 })}
    ${NOTE('phone', 'Android first. Telugu, English and Hindi.')}</div></div>`,

  /* Our drawing of the layout common to desktop billing tools. Not a screenshot of any product. */
  legacy: () => `<div class="so__title"><span>PURCHASE ENTRY - [COMPANY 2026-27]</span><i>_ ☐ ✕</i></div><div class="so__menu">${['Masters', 'Transactions', 'Display', 'Reports', 'GST', 'Utilities', 'Tools', 'Window', 'Help'].map(m => `<span>${m}</span>`).join('')}</div>
    <div class="so__form">${[['Party', 'KRISHNA PHARMA AGENCIES'], ['Bill No', 'KP/3391'], ['Date', '08-10-2026'], ['Type', 'CREDIT'], ['Due', '07-11-2026'], ['GSTIN', '37AAAAA0000A1Z5']].map(([k, v]) => `<label>${k}<b>${v}</b></label>`).join('')}</div>
    <div class="so__grid"><div class="so__r is--h">${['Sr', 'Item Name', 'Pack', 'Batch', 'Exp', 'Qty', 'Free', 'P.Rate', 'Dis%', 'MRP', 'GST%', 'Amount'].map(h => `<span>${h}</span>`).join('')}</div>${MED.slice(0, 6).map((m, i) => `<div class="so__r${i === 4 ? ' is--sel' : ''}"><span>${i + 1}</span><span>${m.n.toUpperCase()}</span><span>${m.p.replace('Strip of ', '1*')}</span><span>${i < 4 ? m.b : ''}</span><span>${i < 4 ? m.e.replace('/20', '/') : ''}</span><span>${i < 4 ? m.q : ''}</span><span>${i < 4 ? '0' : ''}</span><span>${i < 4 ? m.r.toFixed(2) : ''}</span><span>${i < 4 ? '0.00' : ''}</span><span>${i < 4 ? m.mrp.toFixed(2) : ''}</span><span>${i < 4 ? '5' : ''}</span><span>${i < 4 ? (m.r * m.q).toFixed(2) : ''}</span></div>`).join('')}${Array.from({ length: 5 }, () => `<div class="so__r">${'<span></span>'.repeat(12)}</div>`).join('')}</div>
    <div class="so__sum"><span>Items: 4/6</span><span>Gross: 2,225.10</span><span>Disc: 0.00</span><span>GST: 111.26</span><b>Net: 2,336.36</b></div>
    <div class="so__keys">${['F2-New', 'F3-Edit', 'F4-Party', 'F5-Batch', 'F6-Item', 'F7-Scheme', 'F8-Delete', 'F9-Save', 'F10-Print', 'Esc-Exit'].map(k => `<span>${k}</span>`).join('')}</div>`,

  /* ----- Tablet: the touch counter ----- */
  billt: () => `<div class="t-top"><div class="a-brand"><i class="a-logo">${CAP}</i><b>Pharmacy OS</b></div><span class="u-grow"></span>${LANG()}${SIZE(2)}</div>
    <div class="t-body"><div class="a-hd" style="padding:0"><div><b class="a-t" style="font-size:26px">New bill</b><small>Bill 2281, Counter 1, Imran</small></div></div><div class="u-row" style="gap:10px"><div class="u-find is--idle" style="flex:1;height:56px;font-size:18px">${KI('search')}<span>Type three letters</span></div>${BTN('Scan a pack', 'is--ghost is--lg', 'qr')}</div>
      ${TRAY('This bill', 'receipt', `<div class="u-card b-pay" style="gap:14px;padding:18px"><div class="b-cust">${AV('L', 'amber', '', 'is--lg')}<div><b style="font-size:17px">Lakshmi</b>98765 •••43</div>${BDG('pri', '', '4th visit')}</div>
        <div class="b-lines" style="gap:14px">${[[3, 2, 236, 1], [2, 3, 132, 1], [0, 4, 144, 0]].map(([k, q, amt, rx]) => `<div class="b-line" style="grid-template-columns:44px minmax(0,1fr) auto auto;gap:14px"><i class="u-ph" style="width:44px;height:44px;--img:url(${PEX(MED[k].img)})">${KI(MED[k].f)}</i><div><b style="font-size:17px">${MED[k].n}${rx ? RX : ''}</b><small style="font-size:14px">₹${MED[k].mrp} a strip</small></div>${QTY(q)}<em style="font-size:18px;min-width:70px;text-align:right">₹${amt}</em></div>`).join('')}</div>
        <div class="b-doc">${KI('user')}<div><b>Dr. Rao</b>Remembered for her two prescription medicines</div>${KI('tick')}</div>
        <div class="b-sum" style="font-size:15.5px"><div><span>MRP total</span><span>₹512</span></div><div class="u-ok"><span>Regular customer, 5% off</span><span>−₹26</span></div><div class="is--tot"><span>To pay</span><b style="font-size:40px">₹486</b></div></div>
        <div class="b-ways">${['UPI', 'Cash', 'Card', 'Credit'].map((w, i) => `<span class="${i ? '' : 'on'}" style="height:48px;font-size:16px">${w}</span>`).join('')}</div>
        ${BTN('Take ₹486', 'is--wide is--lg', '', KI('arrow'))}<div class="b-two">${BTN('Print', 'is--ghost is--wide is--lg', 'printer')}${BTN('Hold this bill', 'is--ghost is--wide is--lg', 'clock')}</div></div>`, { lead: 1, right: STAT('ok', 'tick', 'Oldest batch sells first') })}
      ${NOTE('chat', 'The bill goes to her WhatsApp. The H1 register fills itself.')}</div>
    <div class="t-tabs">${[['grid', 'Overview'], ['receipt', 'Billing'], ['box', 'Stock'], ['truck', 'Orders'], ['users', 'Customers']].map(([ic, t], i) => `<span class="${i === 1 ? 'on' : ''}">${KI(ic)}${t}</span>`).join('')}</div>`,

  /* ----- Buying, with the numbers beside each other ----- */
  compare: () => APP('buy', 'order', `${HD('Compare distributors', 'Rate, scheme and credit for every line. The best one is already picked.')}
    <div class="a-body">${KPIS([['To order today', 'list', '9', '2', 'ink', 'distributors'], ['Saved by picking the best', 'rupee', '₹221', 'Less', 'ok', 'than from one distributor'], ['Free strips', 'tag', '3', '2', 'ok', 'schemes used'], ['Credit', 'calendar', '30 days', 'Longest', 'ink', 'wins a tie']])}
    ${TRAY('Rate, scheme and credit, side by side', 'swap', TBL('minmax(0,1.45fr) .45fr 1fr 1fr 1fr', ['Medicine', 'Order', DSHORT, 'Godavari Dist.', 'Sri Venkat Pharma'],
      [[MEDC(MED[1]), '<b>10</b>', CMP('62.10', '30 days', 1), CMP('63.40', '21 days'), CMP('62.90', '30 days')],
        [MEDC(MED[3]), '<b>12</b>', CMP('71.50', '10+1 · 30 days', 1), CMP('72.00', '21 days'), CMP('71.50', '30 days')],
        [MEDC(MED[4]), '<b>10</b>', CMP('58.00', '30 days', 1), CMP('58.60', '21 days'), CMP('', 'Not with them')],
        [MEDC(MED[6]), '<b>10</b>', CMP('83.00', '30 days'), CMP('79.50', '5+1 · 21 days', 1), CMP('82.00', '30 days')],
        [MEDC(MED[8]), '<b>10</b>', CMP('68.90', '30 days'), CMP('66.20', '21 days', 1), CMP('67.80', '30 days')]], 'is--tall'), { lead: 1, cls: 'is--fill', right: CHIP('Best for each line', 1) + CHIP('All from one') })}
    ${BAR('<b>Krishna Pharma: 6 lines. Godavari: 3 lines.</b><small>Rates come from your own last bills. A distributor on the free desk shows today’s rate and stock.</small>', BTN('Change by hand', 'is--ghost') + BTN('Send both orders', '', 'send'))}</div>`),

  watch: () => LIST('buy', 'watch', 'Rate and scheme watch', 'Every bill is laid beside your order and your last rate.', [['Found this month', 'eye', '₹1,460', '9', 'bad', 'differences'], ['Credited back', 'tick', '₹1,128', '6', 'ok', 'credit notes', [1, 2, 2, 4, 5, 6, 8, 11]], ['Still open', 'clock', '₹332', '3', 'bad', 'claims'], ['Typed by you', 'keyboard', '0', 'None', 'ok', 'of these']], 'Three claims are open', 'tag', CHIP('Open', 1, 3) + CHIP('Credited', 0, 6), 'minmax(0,1.45fr) minmax(0,1.35fr) 1fr .55fr 1.15fr 18px', ['Medicine', 'What we found', 'Distributor', 'Value', 'Where it stands', ''],
    [{ c: 'is--bad', v: [MEDC(MED[4], 'Order 1042, today'), 'Billed 10, 6 came', PERSON(DSHORT, 'amber'), '<b>₹244</b>', STAT('warn', 'clock', 'Claim sent today'), MORE] }, { c: 'is--warn', v: [MEDC(MED[3], 'Order 1042, today'), 'Free strip missing, 10+1', PERSON(DSHORT, 'amber'), '<b>₹72</b>', STAT('warn', 'clock', 'Claim sent today'), MORE] }, [MEDC(MED[8], 'Order 1031, 2 October'), 'Rate ₹1.60 above your last bill', PERSON('Godavari Dist.', 'vio'), '<b>₹16</b>', STAT('bad', 'alert', 'No reply, 6 days'), MORE], [MEDC(MED[1], 'Order 1024, 28 September'), 'Bill MRP above the pack', PERSON('Sri Venkat Pharma', 'ok'), '<b>₹96</b>', STAT('ok', 'tick', 'Credit note received'), MORE]],
    BAR('<b>₹332</b> is still to come back, from 3 claims<small>Each claim goes on WhatsApp with the bill line attached. Nothing to write.</small>', BTN('Remind all three', 'is--ghost', 'bell'))),

  missed: () => LIST('bill', 'sell', 'Asked for, not on the shelf', 'One tap at the counter. The missed sale is counted, and the medicine joins the next order.', [['Asked, not found', 'users', '7', 'times', 'bad', 'this week', [1, 0, 2, 1, 1, 0, 2]], ['Sales missed', 'rupee', '₹917', 'About', 'bad', 'this week'], ['Now in the order', 'list', '5', 'of 7', 'ok', 'medicines'], ['Given a substitute', 'swap', '2', 'times', 'ok', 'same salt']], 'Missed this week', 'alert', BTN('Not in stock', 'is--ghost is--sm', 'alert'), 'minmax(0,1.5fr) .6fr .9fr .6fr 1.3fr 18px', ['Medicine', 'Asked', 'Last asked', 'Missed', 'What happens next', ''],
    [[MEDC(MED[11], 'Strip of 15'), '<b>3 times</b>', 'Today, 5:40 pm', '<b>₹354</b>', STAT('ok', 'list', 'In tomorrow’s order'), MORE], [MEDC(MED[7], 'Bottle'), '<b>2 times</b>', 'Yesterday', '<b>₹170</b>', STAT('ok', 'list', 'In tomorrow’s order'), MORE], [MEDC(MED[9], 'Box of 25'), '<b>1 time</b>', 'Monday', '<b>₹310</b>', STAT('pri', 'swap', 'A substitute was given'), MORE], [MEDC(MED[6], 'Strip of 4'), '<b>1 time</b>', 'Monday', '<b>₹83</b>', STAT('warn', 'clock', 'Waiting for the distributor'), MORE]],
    BAR('<b>7 customers</b> asked for something that was not there<small>Without this button, a missed sale leaves no trace.</small>', BTN('Add all to the order', '', 'plus'))),

  /* ----- Customers and money, a week ahead ----- */
  refills: () => LIST('cust', '', 'Refills due next week', 'Who will come, and for what. So the stock is ready before they are.', [['Refills due', 'bell', '38', 'customers', 'ink', 'in 7 days', [3, 4, 6, 5, 7, 6, 7]], ['Worth', 'rupee', '₹31,200', 'If all', 'ok', 'come back'], ['Stock ready', 'tick', '34 of 38', '4', 'bad', 'need an order'], ['Came back last month', 'trend', '71%', '+9%', 'ok', 'after a reminder', [5, 6, 6, 7, 8, 8, 9]]], 'Due in the next 7 days', 'calendar', CHIP('This week', 1, 38) + CHIP('Next week', 0, 41), 'minmax(0,1fr) minmax(0,1.6fr) .55fr 1.1fr 1.1fr 18px', ['Customer', 'Medicine', 'Due', 'On the shelf', 'Reminder', ''],
    [[PERSON('Lakshmi', 'amber'), MEDC(MED[3], '1 a day. A strip lasts 15 days.', RX), '11 Oct', STAT('ok', 'tick', '15 strips'), STAT('ok', 'bell', 'Sent today'), MORE], [PERSON('Venkatesh', 'ink'), MEDC(MED[2], '2 a day', RX), '12 Oct', STAT('ok', 'tick', '19 strips'), STAT('pri', 'clock', 'Goes on 9 Oct'), MORE], { c: 'is--bad', v: [PERSON('Suresh', 'vio'), MEDC(MED[11], '1 a day', RX), '13 Oct', STAT('bad', 'alert', 'None. In the order.'), STAT('pri', 'clock', 'Goes on 10 Oct'), MORE] }, [PERSON('Anitha', 'ok'), MEDC(MED[6], '1 a week'), '14 Oct', STAT('ok', 'tick', '6 strips'), STAT('pri', 'clock', 'Goes on 11 Oct'), MORE]],
    BAR('<b>4 medicines</b> join tomorrow’s order, so every refill is ready<small>Messages carry no medicine names. Only people who said yes get them.</small>', BTN('See the order', 'is--ghost') + BTN('Send today’s reminders', '', 'send'))),

  dayclose: () => APP('money', '', `${HD('Close the day', 'Thursday, 8 October. Count each drawer once.')}
    <div class="a-body">${KPIS([['Sales today', 'rupee', '₹21,400', '62', 'ink', 'bills'], ['Cash the bills expect', 'wallet', '₹8,330', '2', 'ink', 'drawers'], ['Cash counted', 'ticks', '₹8,280', '−₹50', 'bad', 'difference'], ['UPI received', 'phone', '₹13,150', 'Matches', 'ok', 'the bank']])}
    ${TRAY('By person', 'users', TBL('minmax(0,1.3fr) .5fr .9fr .9fr .8fr 1.2fr', ['Person', 'Bills', 'Cash expected', 'Cash counted', 'UPI', 'Status'], [[PERSON('Imran', '', FACE.imran), '38', '₹5,120', '<b>₹5,120</b>', '₹8,030', STAT('ok', 'tick', 'Matches')], { c: 'is--warn', v: [PERSON('Padma', 'amber'), '24', '₹3,210', '<b>₹3,160</b>', '₹5,120', STAT('warn', 'alert', '₹50 less. Noted.')] }]), { lead: 1, right: STAT('ok', 'lock', 'Counted once, then locked') })}
    ${TRAY('Changed today', 'eye', TBL('.5fr minmax(0,1.7fr) .9fr .6fr 1.3fr', ['Bill', 'What changed', 'Who', 'When', 'Status'], [['2274', 'One strip of Amoxicillin came back', PERSON('Imran', '', FACE.imran), '4:10 pm', STAT('pri', 'undo', 'Refund ₹96')], ['2259', 'Discount raised from 5% to 8%', PERSON('Padma', 'amber'), '1:22 pm', STAT('ok', 'tick', 'Inside her limit')], ['—', 'An expired strip was scanned', PERSON('Imran', '', FACE.imran), '11:02 am', STAT('bad', 'lock', 'Stopped at the counter')]]), { lead: 1, cls: 'is--fill', right: CHIP('Today', 1) + CHIP('This week') })}
    ${BAR('<b>₹50</b> less in one drawer today<small>Nothing is rounded away. The owner sees the same page on his phone.</small>', BTN('Count again', 'is--ghost') + BTN('Close the day', '', 'lock'))}</div>`, 'rao'),

  cash: () => APP('money', '', `${HD('Cash calendar', 'The next 14 days: what goes out, what comes in.')}
    <div class="a-body">${KPIS([['To pay in 30 days', 'rupee', '₹61,730', '4', 'ink', 'bills'], ['Heavy day', 'alert', '15 Oct', '₹31,075', 'bad', 'goes out'], ['To collect', 'wallet', '₹2,960', '3', 'ink', 'customers'], ['GST to pay', 'file', '₹3,390', 'By', 'ink', '20 October']])}
    <div class="a-split" style="--side:540px">
      ${TRAY('Going out, day by day', 'chart', `<div class="u-card" style="display:flex;flex-direction:column;gap:6px;padding:14px 16px 10px 18px"><div class="h-big"><b class="u-num">₹62,305</b><span class="u-delta"><b class="u-bad">4 payments</b>in the next 14 days</span></div>${PLOT([1, 46, 1, 1, 24, 1, 1, 78, 1, 1, 1, 1, 8, 1], 7, '15 Oct : ₹31,075', ['0', '10k', '20k', '30k', '40k'], ['8 Oct', '10', '12', '14', '16', '18', '20 Oct'], 0)}</div>`, { lead: 1 })}
      ${TRAY('In order of date', 'calendar', TBL('.55fr minmax(0,1.7fr) .7fr 1.05fr', ['Date', 'What', 'Amount', 'Status'], [{ c: 'is--warn', v: ['9 Oct', 'Pay Krishna Pharma', '<b>₹18,200</b>', STAT('warn', 'clock', 'Tomorrow')] }, ['12 Oct', 'Pay Godavari Dist.', '<b>₹9,640</b>', STAT('ok', 'calendar', 'In 4 days')], { c: 'is--bad', v: ['15 Oct', 'Pay Sri Venkat Pharma', '<b>₹31,075</b>', STAT('bad', 'alert', 'Heavy day')] }, ['20 Oct', 'GST for September', '<b>₹3,390</b>', STAT('ok', 'calendar', 'In 12 days')], ['Any day', 'Collect from Venkatesh', '<b class="u-ok">+₹1,640</b>', STAT('pri', 'bell', 'Remind')]], 'is--tall'), { lead: 1, cls: 'is--fill' })}
    </div>
    ${BAR('<b>15 October</b> is the heavy day: ₹31,075 to Sri Venkat Pharma<small>You are told a week before, so the money is ready.</small>', BTN('Remind who owes you', 'is--ghost', 'bell') + BTN('Plan the payments', '', 'calendar'))}</div>`, 'rao'),

  /* ----- Look ahead ----- */
  ask: () => APP('home', '', `${HD('Ask the app', 'Tap a question, or type your own. In English or in Telugu.')}
    <div class="a-body"><div class="a-split" style="--side:548px">
      ${TRAY('Your question', 'search', `<div class="u-card u-col"><div class="u-find">${KI('search')}<b>What will run out this week?</b><i class="u-caret" style="margin-left:0"></i></div>
        <small class="u-lbl">Ready questions. One tap.</small>
        <div class="u-pick">${['What is low today?', 'What expires this month?', 'How much do I owe Krishna Pharma?', 'Who has not paid me?', 'What sold most this week?', 'How was yesterday?'].map(q => CHIP(q)).join('')}</div>
        <small class="u-lbl">In Telugu too</small>
        <div class="u-pick"><span class="u-chip" lang="te">ఈ రోజు అమ్మకాలు ఎంత?</span><span class="u-chip" lang="te">ఏ మందులు తక్కువగా ఉన్నాయి?</span></div>
        ${NOTE('info', 'Every answer shows where its numbers came from.')}</div>`, { lead: 1, cls: 'is--fill' })}
      ${TRAY('The answer', 'chat', `<div class="u-card u-col"><div><b class="u-num">7 medicines</b><span class="u-delta">will run out before Friday, at the speed they sell now</span></div>
        <div class="u-tbl" style="--cols:minmax(0,1.6fr) .45fr 1fr;padding:0;margin:0 -6px">${[[0, 4, 3, 'Out in 2 days'], [4, 3, 3, 'Out in 3 days'], [1, 6, 2, 'Out in 5 days'], [2, 7, 2, 'Out in 5 days']].map(([k, have, lv, t]) => ROW([MEDC(MED[k], `Sells ${[18, 8, 11, 0, 9][k]} strips a week`), `<b class="u-bad">${have}</b>`, LVL(lv, t)])).join('')}</div>
        ${STAT('ok', 'tick', 'From today’s stock and 30 days of bills')}
        <div class="b-two" style="margin-top:auto">${BTN('Add all 7 to the order', 'is--wide', 'plus')}${BTN('Show all 7', 'is--ghost is--wide')}</div></div>`, { lead: 1, cls: 'is--fill' })}
    </div></div>`, 'rao'),

  score: () => APP('reports', '', `${HD('Your store this week', 'Monday 5 to Sunday 11 October. One thing to do for each number.')}
    <div class="a-body">${KPIS([['Store score', 'star', '82', '+4', 'ok', 'vs last week', [70, 72, 71, 75, 76, 78, 78, 82]], ['Found on the shelf', 'box', '92%', '−1.3%', 'bad', 'vs last week', [16, 12, 14, 19, 13, 14, 20, 21, 12, 15]], ['Lost to expiry', 'alert', '₹134', '−₹410', 'ok', 'vs last month'], ['Regulars who came back', 'users', '71%', '+9%', 'ok', 'after a reminder', [5, 6, 6, 7, 8, 8, 9]]])}
    ${TRAY('One thing to do for each', 'list', TBL('minmax(0,1.5fr) .62fr .9fr minmax(0,1.6fr) 150px', ['What we measure', 'This week', 'How it stands', 'Do this', ''],
      [[ROWI('box', 'Found on the shelf', 'Asked for, and in stock'), '<b>92%</b>', METER(92, 'warn'), 'Order the 7 medicines people asked for', BTN('Add to order', 'is--ghost is--sm', 'plus')],
        [ROWI('clock', 'Lost to expiry', 'Stock that passed its date'), '<b>₹134</b>', METER(96, 'ok'), 'Send back 1 medicine before 26 October', BTN('Start the return', 'is--ghost is--sm', 'undo')],
        [ROWI('users', 'Regulars who came back', 'After a refill reminder'), '<b>71%</b>', METER(71, 'ok'), 'Remind 4 people who are a week late', BTN('Remind them', 'is--ghost is--sm', 'bell')],
        [ROWI('rupee', 'Bills paid on time', 'To distributors'), '<b>96%</b>', METER(96, 'ok'), 'Pay Krishna Pharma tomorrow: ₹18,200', BTN('Pay now', 'is--ghost is--sm', 'rupee')]], 'is--tall'), { lead: 1, cls: 'is--fill', right: CHIP('This week', 1) + CHIP('Last 8 weeks') })}
    ${BAR('<b>82 out of 100</b> this week. Four more than last week.<small>The same page reaches the owner’s phone every Monday morning.</small>', BTN('Share with the staff', 'is--ghost', 'send'))}</div>`, 'rao'),

  forecast: () => APP('reports', '', `${HD('Next week, worked out', 'From your own bills: the season, the weekday, what really sells.')}
    <div class="a-body">${KPIS([['Sales expected next week', 'trend', '₹1.42 lakh', '+6%', 'ok', 'vs this week', [12, 14, 13, 15, 16, 15, 17, 18]], ['Will run out', 'alert', '7', 'medicines', 'bad', 'before Friday'], ['Season now', 'calendar', 'Monsoon', '+38%', 'ink', 'fever and cold'], ['Order to place', 'list', '₹18,400', '9', 'ink', 'medicines']])}
    <div class="a-split" style="--side:520px">
      ${TRAY('Sales, day by day', 'chart', `<div class="u-card" style="display:flex;flex-direction:column;gap:6px;padding:14px 16px 10px 18px"><div class="h-big"><b class="u-num">₹1,42,000</b><span class="u-delta"><b class="u-ok">+6%</b>expected next week</span></div>${PLOT([58, 66, 49, 62, 71, 44, 60, 64, 70, 55, 66, 76, 50, 63], 6, 'Today : ₹21,400', ['0', '8k', '16k', '24k', '32k'], ['2 Oct', '4', '6', '8 Oct', '10', '12', '14 Oct'], 3, 6)}</div>`, { lead: 1, right: STAT('pri', 'trend', 'Striped bars are expected') })}
      ${TRAY('Have these ready', 'box', TBL('minmax(0,1.5fr) .45fr .5fr 100px', ['Medicine', 'Have', 'Need', 'Order'], [[MEDC(MED[0], 'Fever season'), '<b class="u-bad">4</b>', '26', QTY(24)], [MEDC(MED[5], 'Colds, this month'), '12', '21', QTY(10)], [MEDC(MED[4], 'Sells steadily'), '<b class="u-bad">3</b>', '9', QTY(10)], [MEDC(MED[8], 'After the rains'), '8', '14', QTY(10)], [MEDC(MED[9], 'Fever season'), '<b class="u-bad">2</b>', '6', QTY(4)]], 'is--tall'), { lead: 1, cls: 'is--fill' })}
    </div>
    ${BAR('<b>7 medicines</b> will run out before next Friday<small>The numbers get better each month. You can change any of them.</small>', BTN('Add all to the order', '', 'plus'))}</div>`, 'rao'),

  risk: () => LIST('stock', 'expiry', 'Will it sell before its date?', 'Each batch, at the speed it really sells.', [['Will not sell in time', 'hourglass', '₹1,088', '4', 'bad', 'batches'], ['Can still go back', 'undo', '₹651', '2', 'ok', 'inside the return date'], ['Next return date', 'calendar', '31 Oct', '23 days', 'bad', 'left to send back'], ['Saved this year', 'tick', '₹18,400', '11', 'ok', 'credit notes', [2, 3, 5, 6, 8, 11, 14, 18]]], 'Four batches will outlast their date', 'hourglass', CHIP('At risk', 1, 4) + CHIP('All batches'), 'minmax(0,1.5fr) .45fr .8fr .8fr .8fr 1.3fr 18px', ['Medicine', 'Have', 'Sells a month', 'Expires', 'Will be left', 'Best move', ''],
    [{ c: 'is--bad', v: [MEDC(MED[9], 'From Sri Venkat Pharma'), '30', '8 sachets', '29 Nov 2026', '<b class="u-bad">16 sachets</b>', STAT('pri', 'undo', 'Send back by 31 Oct'), MORE] }, [MEDC(MED[6], 'Batch VD1180'), '20', '3 strips', 'Mar 2027', '<b class="u-bad">5 strips</b>', STAT('pri', 'swap', 'Move to Bus stand'), MORE], [MEDC(MED[8], 'From Godavari Distributors'), '8', '4 strips', '18 Nov 2026', '<b class="u-bad">3 strips</b>', STAT('pri', 'undo', 'Send back by 31 Oct'), MORE], [MEDC(MED[5], 'Batch CT2217'), '12', '16 strips', '26 Oct 2026', '<b class="u-bad">2 strips</b>', STAT('ok', 'tag', 'Offer 10% off'), MORE]],
    BAR('<b>₹1,088</b> will expire on the shelf unless something changes<small>You are told while the distributor still takes it back.</small>', BTN('Offer 10% off', 'is--ghost', 'tag') + BTN('Start the returns', '', 'undo'))),

  /* ----- The distributor's side: a free page, no app ----- */
  desk: () => `<div class="a-side"><div class="a-brand"><i class="a-logo">${CAP}</i><b>Pharmacy OS</b>${KI('panel')}</div><div class="a-dash"></div>${INP('Search orders', 'Ctrl K')}
    <div class="a-cap">Order desk</div>${[['list', 'Orders', 7, 1], ['file', 'Bills sent'], ['tag', 'Rates and schemes'], ['store', 'Stores'], ['rupee', 'Payments']].map(([ic, t, n, on]) => `<span class="a-nav${on ? ' on' : ''}">${KI(ic)}${t}${n ? `<em>${n}</em>` : ''}</span>`).join('')}
    <div class="a-cap">Support</div><span class="a-nav">${KI('headset')}Help in Telugu</span><span class="a-nav">${KI('gear')}Settings</span>
    <div class="a-user">${AV('', '', FACE.ramesh)}<span><b>Ramesh</b>${DSHORT}</span>${KI('updown')}</div></div>
    <div class="a-main">${HD('Orders from your stores', `${DIST}. Thursday, 8 October.`)}
    <div class="a-body">${KPIS([['New orders', 'list', '7', '₹48,300', 'ink', 'today'], ['To pack', 'box', '4', '3', 'ok', 'packed'], ['Schemes live', 'tag', '4', 'Seen by', 'ink', 'every store'], ['To collect', 'wallet', '₹1.84 lakh', '₹18,200', 'bad', 'due tomorrow']])}
    ${TRAY('Today’s orders', 'list', TBL('minmax(0,1.6fr) 1fr .45fr .6fr 1.35fr 1.2fr 106px', ['Store', 'Order', 'Lines', 'Value', 'Status', 'Bill file', ''],
      [{ c: 'is--warn', v: [WHOC(STORE, 'Main road', 'amber'), '1042, 10:42 am', '6', '<b>₹3,060</b>', STAT('warn', 'alert', 'Short: Pantoprazole'), STAT('pri', 'clock', 'Not sent yet'), BTN('Send file', 'is--ghost is--sm', 'upload')] },
        [WHOC('Sri Sai Medicals', 'Bus stand road', 'vio'), '311, 10:15 am', '14', '<b>₹9,420</b>', STAT('ok', 'box', 'Packed'), STAT('pri', 'clock', 'Not sent yet'), BTN('Send file', 'is--ghost is--sm', 'upload')],
        [WHOC('Lakshmi Medicals', 'Temple street', 'ok'), '87, 9:50 am', '9', '<b>₹5,180</b>', STAT('pri', 'truck', 'On the way'), STAT('ok', 'tick', 'File sent'), ''],
        [WHOC('New Life Pharmacy', 'Hospital gate', 'ink'), '164, 9:20 am', '22', '<b>₹14,760</b>', STAT('ok', 'tick', 'Received'), STAT('ok', 'tick', 'Imported'), ''],
        [WHOC('Balaji Medicals', 'Market road', 'amber'), '52, 9:05 am', '11', '<b>₹6,240</b>', STAT('pri', 'eye', 'New. Not opened.'), '—', BTN('Open', 'is--ghost is--sm')]], 'is--tall'), { lead: 1, cls: 'is--fill', right: CHIP('New', 1, 7) + CHIP('Packed', 0, 3) + CHIP('Sent', 0, 5) })}
    ${BAR('<b>One file for the whole day.</b> Export today’s bills and drop the file here.<small>Each store gets its own bill and adds it to stock in one click. Free for distributors.</small>', BTN('Post a scheme', 'is--ghost', 'tag') + BTN('Upload the bill file', '', 'upload'))}</div></div>`,

  /* ----- Phone-only artboards ----- */
  dlink: () => DLINK,
  wabillm: () => WA_BILL,
  remindm: () => WA_REMIND,
  ownerm: () => OWNER,
  needsm: () => NEEDS
};
/* Sizes written in px inside a style attribute scale with the artboard, the same way the stylesheet does */
Object.keys(V).forEach(k => { const f = V[k]; V[k] = () => f().replace(/style="([^"]*)"/g, (m, st) => 'style="' + st.replace(/(-?\d*\.?\d+)px/g, 'calc(var(--px)*$1)') + '"'); });
