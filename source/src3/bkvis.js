/* ===== Mini ERP screens: simplified copies of the Beere Kesava portal, with sample data ===== */
const KI = id => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#k-${id}"/></svg>`;
const NAVTABS = ['Overview', 'Production', 'Materials', 'Finance', 'People', 'Operations'];
const KN = (on = 0, av = 'SA', tabs = NAVTABS) => `<div class="k__nav"><span class="k__brand"><i class="k__crest"></i><span class="k__bn"><b>BEERE KESAVA</b><small>Since 1999</small></span></span><span class="k__tabs">${tabs.map((t, i) => `<span class="${i === on ? 'on' : ''}">${t}</span>`).join('')}</span><svg class="k__bell" viewBox="0 0 24 24"><use href="#k-bell"/></svg><span class="k__av">${av}</span></div>`;
const KSUB = (items, on, jump = []) => `<div class="k__sub">${items.map((t, i) => `<span class="${i === on ? 'on' : ''}">${t}</span>`).join('')}${jump.length ? `<i></i><small>JUMP TO</small>${jump.map(t => `<span>${t}</span>`).join('')}` : ''}</div>`;
const KH = (eb, h, em, photo) => `<div class="k__hero${photo ? ' has-photo' : ''}"${photo ? ` style="--ph:var(--img-${photo})"` : ''}><span class="k__eb">${eb}</span><span class="k__h">${h} <em>${em}</em></span></div>`;
const KS = cells => `<div class="k__stats">${cells.map(([l, v, g]) => `<div class="k__stat${g ? ' is--gold' : ''}"><small>${l}</small><b>${v}</b></div>`).join('')}</div>`;
const CH = (t, c = '', n) => `<span class="k__chip ${c}">${t}${n != null ? `<i>${n}</i>` : ''}</span>`;
const CODE = t => `<span class="k__code">${t}</span>`;
const BAR = p => `<span class="k__bar"><i style="width:${p}%"></i></span>`;
const PH = (img, w, h) => `<i class="k__ph" style="--ph:var(--img-${img});width:${w}em;height:${h}em"></i>`;
const IC = id => `<span class="k__ic">${KI(id)}</span>`;
const WCARD = (name, place, looms, cls) => `<div class="kw"><div class="kw__top ${cls || ''}"><i class="kw__ring"></i><b>${name}</b><small>CURRENTLY WEAVING</small></div><div class="kw__b"><b>${name}</b><span>${place}</span><span class="kw__loom"><span>LOOMS</span><b style="font-size:1em;color:#845E04">${looms}</b></span></div></div>`;

const V = {
  overview() {
    return KN(0) + KH('Since 1999 · Superadmin overview', 'Command', '&amp; Control Center', 'showroom')
      + KS([['Active weavers', '38'], ['In production', '214'], ['Ready for sale', '96', 1], ['Dispatched', '152'], ['Approvals', '3']])
      + `<div class="k__body"><div class="k__row k__sb"><span class="k__t">Active <em>Weavers</em></span><span class="k__s k__mut">View all →</span></div><div class="k__grid3">${WCARD('WEAVER 12', 'Dharmavaram', '2 Looms')}${WCARD('WEAVER 07', 'Anantapur', '4 Looms', 'is--plum')}${WCARD('WEAVER 21', 'Dharmavaram', '1 Loom', 'is--cream')}</div></div>`;
  },
  production() {
    const rows = [['BATCH-2026-014', '24 sarees', 58, 'On track', 'ok'], ['BATCH-2026-013', '18 sarees', 89, 'At risk', 'warn'], ['BATCH-2026-012', '30 sarees', 100, 'Done', 'g']];
    return KN(1) + KSUB(['Production', 'Batches', 'Designs', 'Finishing'], 0, ['Bulk orders', 'Analytics'])
      + KH('Since 1999 · Production management', 'Production', '&amp; Batch Overview', 'looms')
      + `<div class="k__body"><div class="k__row" style="flex-wrap:wrap;gap:.3em">${CH('Assigned', 'on', 120)}${CH('QC passed', '', 86)}${CH('Semi', '', 4)}${CH('Defective', '', 2)}${CH('Sold', '', 41)}</div>${rows.map(([c, n, p, s, k]) => `<div class="k__li"><span class="k__code">${c}</span><span class="k__mut">${n}</span><span style="flex:1;min-width:2em">${BAR(p)}</span>${CH(s, k)}</div>`).join('')}</div>`;
  },
  po() {
    const lines = [['Jari · G2 gold', '12 reels'], ['Resham · kumkum red', '8 kg'], ['Warp · pure silk', '14 kg']];
    return KN(2) + KSUB(['Materials', 'Receive stock', 'Issue', 'Returns'], 0)
      + `<div class="k__body"><div class="k__row k__sb"><span class="k__t">Purchase <em>order</em></span>${CH('Approved', 'ok')}</div><div class="k__row">${CODE('PO-2026-041')}<span class="k__s k__mut">Vendor VENDOR-007 · Firm FIRM-001</span></div><div class="k__col">${lines.map(([m, q]) => `<div class="k__li">${IC('spool')}<span>${m}</span><b style="margin-left:auto">${q}</b></div>`).join('')}</div><div class="k__row k__sb" style="margin-top:auto"><span class="k__s k__mut">Raised by Admin · Approved by Owner</span><span class="k__btn g">Send on WhatsApp</span></div></div>`;
  },
  grn() {
    const lines = [['Jari · G2 gold', '12', '11', '1'], ['Resham · kumkum red', '8 kg', '8 kg', '0'], ['Warp · pure silk', '14 kg', '14 kg', '0']];
    return KN(2) + KSUB(['Materials', 'Receive stock', 'Issue', 'Returns'], 1)
      + `<div class="k__body"><div class="k__row k__sb"><span class="k__t">Goods <em>receipt</em></span>${CODE('GRN-2026-019')}</div><div class="k__card" style="gap:.3em"><div class="k__row k__s k__mut" style="font-size:.5em;letter-spacing:.12em;font-family:var(--font-mono)"><span style="flex:1">MATERIAL</span><span style="width:4.5em">ORDERED</span><span style="width:4.5em">ACCEPTED</span><span style="width:3.5em">REJECTED</span></div>${lines.map(([m, o, a, r]) => `<div class="k__row k__s"><span style="flex:1">${m}</span><span style="width:4.5em">${o}</span><b style="width:4.5em;color:#1F774E">${a}</b><b style="width:3.5em;color:${r === '0' ? '#69635E' : '#AB3832'}">${r}</b></div>`).join('')}</div><div class="k__row" style="flex-wrap:wrap;gap:.3em">${['GRN-019-1', 'GRN-019-2', 'GRN-019-3'].map(c => `<span class="k__chip g">▮▯▮▮▯▮ ${c}</span>`).join('')}</div><div class="k__row k__sb" style="margin-top:auto"><span class="k__s k__mut">Labels ready to print</span><span class="k__btn">Print labels</span></div></div>`;
  },
  stock() {
    const m = [['warp', 'Warp', 'Base thread · silk', '142 kg', 72, ''], ['resham', 'Resham', 'Silk thread · 6 colours', '86 kg', 55, ''], ['jari', 'Jari', 'Gold &amp; silver · G1–G5', '9 reels', 24, 'warn']];
    return KN(2) + KH('Since 1999 · Raw materials', 'Raw Material', 'Overview', 'jari')
      + `<div class="k__body" style="padding-top:.8em"><div class="k__grid3" style="flex:1">${m.map(([img, n, s, q, p, w]) => `<div class="k__card" style="padding:.35em;gap:.3em">${PH(img, 100, 3.4).replace('width:100em', 'width:100%')}<div class="k__row k__sb"><b style="font-family:var(--font-display);color:#4A061B;font-size:.85em">${n}</b>${w ? CH('Reorder', 'warn') : ''}</div><span class="k__s k__mut">${s}</span><b style="font-size:.9em">${q}</b>${BAR(p)}</div>`).join('')}</div></div>`;
  },
  batch() {
    const cells = 'wwwwffddwwwwffdd wwwwffdwweeeeee'.replace(/\s/g, '').split('');
    return KN(1) + KSUB(['Production', 'Batches', 'Designs', 'Finishing'], 1)
      + `<div class="k__body"><div class="k__row k__sb"><span class="k__t">BATCH-2026-014</span>${CH('Active', 'on')}</div><div class="k__row" style="gap:.35em;flex-wrap:wrap">${CH('24 sarees', 'g')}${CH('Due 30 Oct')}${CH('Order ORD-2026-022')}</div><div class="kslots">${cells.map(c => `<i class="${c}"></i>`).join('')}</div><div class="klegend"><span><i></i>Weaver</span><span><i class="f"></i>Factory loom</span><span><i class="d"></i>Received</span><span><i class="e"></i>Open slot</span></div><div class="k__li" style="margin-top:auto">${IC('sparkles')}<span>Design D-118 · Peacock border</span>${CH('Silk · Kanchi type', 'g')}</div></div>`;
  },
  issue() {
    const l = [['Warp · pure silk', '1.20 kg'], ['Resham · kumkum red', '0.90 kg'], ['Jari · G2 gold', '2 reels']];
    return KN(2) + KSUB(['Materials', 'Receive stock', 'Issue', 'Returns'], 2)
      + `<div class="k__body"><div class="k__row k__sb"><span class="k__t">Issue <em>material</em></span>${CODE('MIR-2026-058')}</div><div class="k__li">${IC('user')}<span>Weaver WEA-012 · Loom 2</span>${CH('BATCH-2026-014', 'g')}</div>${l.map(([m, q]) => `<div class="k__row k__sb k__s"><span>${m}</span><b>${q}</b></div>`).join('')}<div class="k__card" style="margin-top:auto;flex-direction:row;align-items:flex-end;justify-content:space-between"><div class="k__col"><span class="k__s k__mut">Weaver signature</span><span class="k__sign">R. Weaver</span></div>${CH('Signed · 10:42', 'ok')}</div></div>`;
  },
  weaver() {
    return KN(0, 'W', ['My batches', 'Confirm', 'Warp request', 'Payments'])
      + KH('Weaver portal · WEA-012', 'My', 'Batches', 'looms')
      + `<div class="k__body"><div class="k__card"><div class="k__row k__sb"><b class="k__s" style="font-size:.7em">BATCH-2026-014</b>${CH('Due 30 Oct', 'g')}</div><div class="k__row k__sb k__s"><span class="k__mut">2 of 6 sarees</span><b>33%</b></div>${BAR(33)}</div><div class="k__grid2"><div class="k__li">${IC('check')}<span>Confirm material</span>${CH('1', 'on')}</div><div class="k__li">${IC('lock')}<span>Warp request</span>${CH('At 50%', 'warn')}</div></div><div class="k__li" style="margin-top:auto">${IC('rupee')}<span>Last payout · UTR ···4821</span>${CH('Paid', 'ok')}</div></div>`;
  },
  receive() {
    return KN(1, 'WS', ['Home', 'Quality check', 'Receive', 'Finishing', 'Dispatch'])
      + `<div class="k__body"><div class="k__row k__sb"><span class="k__t">Receive <em>saree</em></span>${CODE('BKB-F-06-B014-007')}</div><div class="k__row" style="align-items:stretch;gap:.6em">${PH('sareeloom', 6, 6.6)}<div class="k__col" style="flex:1;justify-content:space-between"><div class="k__row k__sb k__s"><span class="k__mut">Weight</span><b>742 g</b></div><div class="k__row k__sb k__s"><span class="k__mut">Colour</span><span class="k__row" style="gap:.3em"><i style="width:.9em;height:.9em;border-radius:50%;background:#A3122F"></i><b>Kumkum red</b></span></div><div class="k__row k__sb k__s"><span class="k__mut">Selling price</span><b>Set here</b></div>${CH('Photo saved', 'ok')}</div></div><div class="k__card"><span class="k__s k__mut">Yarn used vs rate card</span><div class="ksplit"><div><span>Warp</span>${BAR(96)}<b>310 g</b></div><div><span>Resham</span>${BAR(88)}<b>280 g</b></div><div><span>Jari</span>${BAR(100)}<b>1.5 reels</b></div></div></div><div class="k__row k__sb k__s" style="margin-top:auto"><span class="k__mut">Leftover yarn recorded automatically</span>${CH('Saved', 'ok')}</div></div>`;
  },
  qc() {
    return KN(1, 'WS', ['Home', 'Quality check', 'Receive', 'Finishing', 'Dispatch'])
      + `<div class="k__body"><div class="k__row k__sb"><span class="k__t">Quality <em>check</em></span>${CODE('BKB-F-06-B014-007')}</div><div class="k__row" style="gap:.6em">${PH('silk', 5.2, 4.2)}<div class="k__col" style="flex:1"><span class="k__s k__mut">Factory loom F-06 · Peacock border</span><span class="k__s">Received 742 g · today</span></div></div><div class="kqc"><span class="ok">Passed</span><span class="warn">Semi</span><span class="bad">Defective</span></div><div class="k__row" style="flex-wrap:wrap;gap:.3em"><span class="k__s k__mut">Defects:</span>${CH('None')}${CH('+ Add photo')}</div><div class="kpay" style="margin-top:auto"><span>Making charge − deduction</span><span>Payable <b>₹2,400</b></span></div></div>`;
  },
  finishing() {
    const rows = [['BKB-F-06-B014-007', 'MK', 'Back · perfect', 'ok'], ['WEA12-L2-B014-003', 'SR', 'Awaiting return', 'g'], ['WEA07-L4-B013-011', 'MK', 'Damaged · minor', 'warn'], ['BKB-F-02-B013-005', 'AP', 'Back · perfect', 'ok']];
    return KN(1, 'WS', ['Home', 'Quality check', 'Receive', 'Finishing', 'Dispatch'])
      + `<div class="k__body"><div class="k__row k__sb"><span class="k__t">Finishing <em>tracker</em></span>${CH('2 out', 'g')}</div>${rows.map(([c, s, t, k]) => `<div class="k__li"><span class="k__code">${c}</span><span class="k__av" style="font-size:.85em;width:1.9em;height:1.9em;border-radius:50%">${s}</span>${CH(t, k)}</div>`).join('')}<div class="k__row k__sb k__s" style="margin-top:auto"><span class="k__mut">Damage? Level and photo, recorded.</span><span class="k__btn">Assign</span></div></div>`;
  },
  dispatch() {
    return KN(1, 'WS', ['Home', 'Quality check', 'Receive', 'Finishing', 'Dispatch'])
      + `<div class="k__body"><div class="k__row k__sb"><span class="k__t">Dispatch <em>to showroom</em></span>${CODE('DC-2026-031')}</div><div class="k__grid3"><div class="k__card"><span class="k__s k__mut">Sarees</span><b style="font-family:var(--font-display);font-size:1.2em;color:#4A061B">18</b></div><div class="k__card"><span class="k__s k__mut">Transport</span><b class="k__s">LR ···7731</b></div><div class="k__card"><span class="k__s k__mut">Document</span><b class="k__s">Challan</b></div></div><div class="k__card"><span class="k__s k__mut">Shop receipt · SGR-2026-044</span><div class="k__row" style="gap:.3em">${CH('Received', 'ok', 17)}${CH('Damaged', 'warn', 1)}${CH('Missing', '', 0)}</div></div><div class="k__row k__sb k__s" style="margin-top:auto"><span class="k__mut">Wholesale? GST invoice instead.</span>${CH('Confirmed', 'ok')}</div></div>`;
  },
  pos() {
    return KN(1, 'SS', ['Home', 'New sale', 'Inventory', 'Customers', 'Reports'])
      + `<div class="k__body"><div class="kpos"><div class="k__col" style="gap:.45em"><span class="k__t">New <em>sale</em></span><div class="k__li">${PH('sareeloom', 2.2, 2.2)}<span>BKB-F-06-B014-007</span><b style="margin-left:auto">₹18,400</b></div><div class="k__li">${PH('silk', 2.2, 2.2)}<span>WEA12-L2-B014-003</span><b style="margin-left:auto">₹14,900</b></div><div class="k__li">${IC('user')}<span>Customer CUST-218</span></div></div><div class="k__card" style="gap:.45em"><span class="k__s k__mut">Payment</span><div class="kseg"><span>Cash</span><span class="on">UPI</span><span>Card</span></div><div class="k__row k__sb k__s"><span>GST 5%</span>${CH('On', 'on')}</div><div class="ktotal"><span>Total</span><b>₹33,300</b></div><span class="k__btn g" style="width:100%">Print bill · WhatsApp</span></div></div></div>`;
  },
  payments() {
    return KN(3) + KSUB(['Payments', 'Firms', 'Reports'], 0, ['Making charges', 'Collections'])
      + KH('Since 1999 · Payment management', 'Payments', '&amp; Financial Overview', 'silk')
      + `<div class="k__body"><div class="karch"><div><small>RECEIVED</small><b>₹4.2L</b></div><div><small>PAID OUT</small><b>₹2.9L</b></div><div><small>NET INCOME</small><b>₹1.3L</b></div><div><small>PROJECTED</small><b>₹5.1L</b></div></div></div>`;
  },
  accountant() {
    const rows = [['Weaver WEA-012', 'UTR ···4821', 'Paid', 'ok'], ['INV-WHL-003-007', 'Wholesale', 'Partial', 'warn'], ['Vendor VENDOR-007', 'Bill ···118', 'Due', 'bad']];
    return KN(0, 'AC', ['Payments', 'Firms', 'Weavers', 'Customers', 'Vendors'])
      + KH('Accountant · Payments', 'Money', 'In &amp; Out', 'silk')
      + KS([['Paid to weavers', '₹2.1L'], ['Collected', '₹4.2L', 1], ['Outstanding', '₹0.8L']])
      + `<div class="k__body">${rows.map(([a, b, s, k]) => `<div class="k__li">${IC('rupee')}<span>${a}</span><span class="k__mut">${b}</span>${CH(s, k)}</div>`).join('')}</div>`;
  },
  reports() {
    const m = [[40, 28], [52, 36], [46, 41], [64, 50], [58, 47], [72, 61]];
    return KN(3) + KSUB(['Payments', 'Firms', 'Reports'], 2)
      + `<div class="k__body"><div class="k__row k__sb"><span class="k__t">Reports <em>&amp; analytics</em></span><span class="k__btn">Download Excel</span></div><div class="k__row" style="flex:1;align-items:stretch;gap:.7em"><div class="k__col" style="flex:1"><div class="kchart">${m.map(([a, b]) => `<div><i style="height:${a}%"></i><i style="height:${b}%"></i></div>`).join('')}</div><div class="klegend"><span><i></i>Woven</span><span><i class="f"></i>Sold</span></div></div><div class="k__col" style="align-items:center;justify-content:center"><i class="kdonut"></i><span class="k__s k__mut">Sales by type</span></div></div></div>`;
  },
  scan() {
    return `<div class="kscan"><div class="k__row k__sb k__s"><b style="font-family:var(--font-display);font-size:1.4em;color:#E2BE74">Scan</b><span class="k__chip g">Camera on</span></div><div class="kscan__vf"></div><div class="kscan__res">${PH('sareeloom', 2.6, 2.6)}<div class="k__col" style="flex:1"><b class="k__s" style="font-size:.7em">BKB-F-06-B014-007</b><span class="k__s k__mut">Passed · In showroom</span></div>${CH('Full story', 'on')}</div></div>`;
  },
  login() {
    return `<div class="klog"><div class="klog__l"><i class="klog__crest"></i><small>SREE</small><b>BEERE KESAVA</b><p>Weaving <em>Heritage</em><br>Into Every Thread</p><i class="klog__rib"></i></div><div class="klog__r"><div class="klog__card"><span class="k__t">Welcome Back</span><span class="k__orn"><i></i></span><span class="k__s k__mut" style="white-space:normal">A 6-digit code on your WhatsApp.</span><span class="klog__in"><b>+91</b>98765 43210</span><span class="k__btn" style="width:100%">Send OTP via WhatsApp</span></div></div></div>`;
  },
  audit() {
    const r = [['10:41', 'Admin', 'Rate · Kanchi type', '2,400 → 2,550'], ['10:12', 'Worker', 'QC · B014-007', 'Semi → Passed'], ['09:58', 'Shop', 'Sale · bill 118', 'UPI'], ['09:30', 'Owner', 'PO-2026-041', 'Approved']];
    return KN(5) + KSUB(['Inventory', 'Rates', 'Approvals', 'Audit log'], 3)
      + `<div class="k__body"><div class="k__row k__sb"><span class="k__t">Audit <em>log</em></span>${CH('Every action', 'g')}</div>${r.map(([t, w, a, c]) => `<div class="k__li"><span class="k__code">${t}</span><b style="font-size:.95em">${w}</b><span>${a}</span><span class="k__chip">${c}</span></div>`).join('')}</div>`;
  },
  wa() {
    return `<div class="kwa"><div class="kwa__top"><i class="k__crest"></i><div><b>Beere Kesava Silks</b><small>Business account</small></div></div><div class="kwa__msgs"><div class="kwa__b"><span class="kwa__otp">482 197</span> is your verification code.<small>09:02</small></div><div class="kwa__b"><div class="kwa__doc"><i>PDF</i><span>Tax invoice · INV-WHL-003-007</span></div><small>11:40</small></div><div class="kwa__b"><div class="kwa__doc"><i class="x">XLS</i><span>Weekly report · production &amp; sales</span></div><small>09:00</small></div><div class="kwa__b">New sale · 2 sarees · UPI · bill 118<small>17:26</small></div></div></div>`;
  },
  doc(type = 'Tax invoice') {
    const D = {
      'Tax invoice': ['Bill to · WHL-003', [['Silk saree · Kanchi type', '6', '₹1,10,400'], ['Silk saree · Peacock border', '4', '₹59,600'], ['CGST 2.5% · SGST 2.5%', '', '₹8,500']], 'Total', '₹1,78,500', 'Amount in words, printed'],
      'Quotation': ['For · WHL-003', [['Silk saree · Temple border', '12', '₹2,20,800'], ['Silk saree · Kanchi type', '8', '₹1,47,200'], ['GST 5%', '', '₹18,400']], 'Quoted', '₹3,86,400', 'Valid for 15 days'],
      'Purchase order': ['Vendor · VENDOR-007', [['Jari · G2 gold', '12 reels', 'Approved'], ['Resham · kumkum red', '8 kg', 'Approved'], ['Warp · pure silk', '14 kg', 'Approved']], 'Status', 'Approved', 'Firm FIRM-001'],
      'Delivery challan': ['To · Showroom', [['Silk sarees · tagged', '18', 'pcs'], ['Transport · LR ···7731', '', ''], ['No sale. Stock moves only.', '', '']], 'Pieces', '18', 'Shop confirms on arrival'],
      'Payment receipt': ['Received from · CUST-218', [['Bill 118 · 2 sarees', '', '₹33,300'], ['Paid by UPI', '', 'Ref ···5520'], ['Balance', '', '₹0']], 'Received', '₹33,300', 'Thank you'],
      'Statement of account': ['Customer · WHL-003', [['Invoice ···007', 'Debit', '₹1,78,500'], ['Payment · NEFT', 'Credit', '₹1,00,000'], ['Payment · UPI', 'Credit', '₹40,000']], 'Balance', '₹38,500', 'Every bill and payment'],
      'Debit note': ['Supplier · SUPPLIER-004', [['Line ···INV118-003', '2', 'pieces'], ['Reason · weave defect', '', ''], ['Pieces 4 and 7', '', 'Approved']], 'Returned', '2 pcs', 'Piece by piece'],
      'Retail bill': ['Customer · CUST-218', [['Silk saree · Kanchi type', '1', '₹18,400'], ['Silk saree · Peacock border', '1', '₹14,900'], ['GST 5% included', '', '']], 'Paid · UPI', '₹33,300', 'Sent on WhatsApp']
    };
    const [party, rows, totL, tot, foot] = D[type] || D['Tax invoice'];
    return `<div class="kdoc"><i class="kdoc__wm"></i><div class="kdoc__lh"><i class="k__crest"></i><div><b>BEERE KESAVA</b><small>&amp; Brothers Silks · Since 1999</small></div><span class="kdoc__type">${type}</span></div><div class="k__row k__sb" style="font-size:.5em;color:#69635E"><span>${party}</span><span>No. ···041 · GSTIN on file</span></div><div class="kdoc__tbl"><div><span>ITEM</span><span>QTY</span><span>AMOUNT</span></div>${rows.map(([a, b, c]) => `<div><span>${a}</span><span>${b}</span><span>${c}</span></div>`).join('')}</div><div class="kdoc__fill"><i class="k__ln" style="width:92%"></i><i class="k__ln" style="width:78%"></i><i class="k__ln" style="width:85%"></i><i class="k__ln" style="width:60%"></i></div><div class="kdoc__tot"><span class="k__mut">${totL}</span><b>${tot}</b></div><div class="kdoc__sig"><span>${foot}</span><span class="k__sign" style="font-size:2.2em">BK</span></div></div>`;
  }
};
