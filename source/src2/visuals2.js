/* ===== Mini screens for the client pitch (illustrative UI, example data) ===== */
const GLYPH = '<svg viewBox="0 0 80 80" aria-hidden="true"><use href="#i-glyph"/></svg>';
const P = (t, c = '') => `<span class="mui__p ${c}">${t}</span>`;
const L = (w, c = '') => `<i class="mui__ln ${c}" style="width:${w}%"></i>`;
const TOP = (t, r = '') => `<div class="mui__top"><span class="mui__t">${t}</span>${r}</div>`;
const CHK = on => `<i class="mui__chk${on ? ' on' : ''}"></i>`;
const MON = new Date().toLocaleDateString('en-GB', { month: 'long' });
const CHROME = url => `<div class="mb__chrome"><i></i><i></i><i></i><span>${url}</span></div>`;
const BOARD = (nodes, links) => `<div class="mui__board"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${links.map(([a, b]) => { const [x1, y1] = nodes[a], [x2, y2] = nodes[b]; const cx = (x1 + x2) / 2; return `<path d="M${x1} ${y1} C${cx} ${y1} ${cx} ${y2} ${x2} ${y2}"/>`; }).join('')}</svg>${nodes.map(([x, y, t, c]) => `<span class="mui__node ${c || ''}" style="--x:${x}%;--y:${y}%">${t}</span>`).join('')}</div>`;

const V = {
  /* ---- Services ---- */
  research() {
    const rows = [['Competitor analysis', 'Done', 'v'], ['User personas', 'Done', 'v'], ['Userflows', 'In progress', 'u'], ['UX strategy', 'Up next', '']];
    return TOP('User research', P('10 docs', 'v')) + `<div class="mui__list">${rows.map(([t, s, c]) => `<div class="mui__li">${CHK(c === 'v')}<span>${t}</span>${P(s, c)}</div>`).join('')}</div><div class="mui__row mui__sb" style="margin-top:auto;font-size:.8em"><span class="mui__mut">Research pack</span><b>4 of 10</b></div><div class="mui__prog"><i style="width:40%"></i></div>`;
  },
  brand() {
    return TOP('Brand system', P('9 parts', 'v')) + `<div class="mbr"><div class="mbr__logo">${GLYPH}<b>Your brand</b></div><div class="mbr__sw"><i style="background:#6840ff"></i><i style="background:#a1ff62"></i><i style="background:#f4f4f4"></i><i style="background:#4f4c4c"></i></div><div class="mbr__type"><span>Aa</span><small>Display · Body</small></div><div class="mbr__voice"><small>Voice</small><b>Warm. Clear. Proud.</b></div></div>`;
  },
  audit() {
    const issues = [['CTA below the fold', 'High', 'r'], ['Low-contrast text', 'Med', ''], ['Slow hero image', 'High', 'r']];
    return TOP('UX audit', P('12 issues', 'r')) + `<div class="mau"><div class="mau__page">${L(60, 'w')}${L(85)}<i class="mau__hero"></i>${L(75)}${L(55)}${['1', '2', '3'].map((n, i) => `<span class="mau__pin" style="--x:${[78, 28, 66][i]}%;--y:${[18, 52, 84][i]}%">${n}</span>`).join('')}</div><div class="mui__list">${issues.map(([t, s, c], i) => `<div class="mui__li"><b class="mau__n">${i + 1}</b><span>${t}</span>${P(s, c)}</div>`).join('')}</div></div>`;
  },
  uiux() {
    return TOP('Figma · Product UI', `<span class="mui__row">${P('Desktop', 'v')}${P('Mobile')}</span>`) + `<div class="mcv"><div class="mcv__frame is--d"><i class="mcv__bar"></i>${L(55, 'w')}${L(80)}<div class="mcv__row"><i></i><i></i><i></i></div></div><div class="mcv__frame is--m"><i class="mcv__bar"></i>${L(70, 'w')}<i class="mcv__blk"></i>${L(80)}<i class="mcv__btn"></i></div><span class="mcv__cur" style="--x:60%;--y:70%"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l9 4-4 1.2L4.8 10z" fill="currentColor"/></svg><b>Designer</b></span></div>`;
  },
  landing() {
    return `<div class="mbw">${CHROME('yourbrand.com/offer')}<div class="mlp"><div class="mui__col" style="gap:.45em">${P('Limited offer', 'v')}<b class="mlp__h">One offer.<br>One action.</b>${L(80)}${L(55)}<span class="mlp__cta">Book now →</span></div><div class="mlp__form"><span>Name</span><span>Phone</span><b>Send</b></div></div></div>`;
  },
  website() {
    return `<div class="mbw">${CHROME('yourbrand.com')}<div class="mws__nav"><b>${GLYPH}Brand</b><span>Work</span><span>About</span><em>Contact</em></div><div class="mws__hero"><b>Your story,<br>told well.</b>${L(50)}</div><div class="mws__cards"><i></i><i></i><i></i></div></div>`;
  },
  nocode() {
    const rows = [['Blog posts', 24], ['Products', 18], ['Team', 6]];
    return TOP('CMS · Framer', P('Publish', 'v')) + `<div class="mui__grid2" style="flex:1;min-height:0"><div class="mui__list">${rows.map(([t, n], i) => `<div class="mui__li${i === 1 ? ' is--on' : ''}"><span>${t}</span><span class="mui__mut" style="margin-left:auto">${n}</span></div>`).join('')}</div><div class="mui__box mui__col"><span class="mui__mut" style="font-size:.7em">Title</span><b style="font-size:.85em">Monsoon edit</b><span class="mui__mut" style="font-size:.7em">Cover</span><i class="mnc__img"></i></div></div>`;
  },
  saas() {
    const k = [['Students', '1,240'], ['Rooms', '86'], ['Fees due', '42']];
    const rows = [['Hostel A · Room 12', 'Paid', 'v'], ['Hostel B · Room 4', 'Due', 'r'], ['Hostel A · Room 7', 'Paid', 'v']];
    return TOP('Campus · Admin', `<span class="mui__row">${P('Admin', 'u')}${P('Warden')}${P('Student')}</span>`) + `<div class="mui__grid3">${k.map(([l, v]) => `<div class="mui__kpi"><span>${l}</span><b>${v}</b></div>`).join('')}</div><div class="mui__list">${rows.map(([t, s, c]) => `<div class="mui__li"><span>${t}</span>${P(s, c)}</div>`).join('')}</div>`;
  },
  erp() {
    const st = [['Yarn', 42], ['Dyeing', 18], ['Loom', 26], ['Finish', 9], ['Orders', 31]];
    return TOP('Production · ERP', P('Live', 'v')) + `<div class="merp">${st.map(([t, n], i) => `<div class="merp__st${i === 2 ? ' is--on' : ''}"><b>${n}</b><span>${t}</span></div>`).join('<i class="merp__ar" aria-hidden="true"></i>')}</div><div class="merp__mods">${['Inventory', 'Production', 'Orders', 'Billing', 'HR', 'Reports'].map((m, i) => `<span class="${i === 1 ? 'on' : ''}">${m}</span>`).join('')}</div>`;
  },
  store() {
    const items = [['Silk saree', '₹12,400', 'u'], ['Cotton weave', '₹3,800', 'v'], ['Ikat drape', '₹6,200', '']];
    return TOP('Store', P('Cart · 2', 'v')) + `<div class="mui__thumbs">${items.map(([n, p, c]) => `<div class="mui__thumb ${c}"><div></div><span>${n}</span><b class="mst__p">${p}</b></div>`).join('')}</div><div class="mui__row" style="margin-top:auto">${P('UPI', 'sq')}${P('Razorpay')}<span class="mui__mut" style="font-size:.72em;margin-left:auto;white-space:nowrap">Updates on WhatsApp</span></div>`;
  },
  lms() {
    const m = [['Module 1 · Basics', 1], ['Module 2 · Practice', 1], ['Module 3 · Project', 0], ['Final quiz', 0]];
    return TOP('Course · Design 101', P('Student', 'u')) + `<div class="mui__box mui__col"><div class="mui__row mui__sb" style="font-size:.85em"><span>Progress</span><b>50%</b></div><div class="mui__prog"><i style="width:50%"></i></div></div><div class="mui__list">${m.map(([t, on]) => `<div class="mui__li">${CHK(on)}<span>${t}</span>${on ? '' : P(t === 'Final quiz' ? 'Quiz' : 'Up next')}</div>`).join('')}</div>`;
  },
  flow() {
    const n = [[12, 30, 'New lead', 'v r'], [38, 30, 'Filter'], [64, 16, 'CRM'], [64, 44, 'WhatsApp', 'u'], [88, 30, 'Email'], [50, 78, 'Alert on error', 'r']];
    return TOP('n8n · Lead flow', P('Active', 'v')) + BOARD(n, [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [1, 5]]);
  },
  whatsapp() {
    return TOP('WhatsApp · AI agent', P('Online', 'v')) + `<div class="mui__chat"><span class="mui__bub">Is the blue saree in stock?</span><span class="mui__bub me">Yes, 2 left. Want to order?</span><div class="mwa__btns"><span>Order now</span><span>See more</span></div><span class="mui__bub me">Done. Payment link sent ✓</span></div>`;
  },
  voice() {
    const bars = [30, 60, 45, 80, 50, 92, 40, 70, 35, 65, 50, 85, 45, 60, 30, 55, 75, 40];
    return TOP('AI receptionist', P('On call', 'v')) + `<div class="mui__row mui__sb"><span class="mui__timer">02:14</span>${P('AI disclosed')}</div><div class="mvo">${bars.map(h => `<i style="--h:${h}%"></i>`).join('')}</div><div class="mui__box mui__col" style="font-size:.78em;gap:.2em"><span class="mui__mut">Caller: Can I book for Tuesday?</span><b>Booked: Tue, 4:30 pm ✓</b></div>`;
  },
  ads() {
    return TOP('Meta ads · Festive sale', P('Testing', 'u')) + `<div class="mad">${['A', 'B', 'C'].map((x, i) => `<div class="mad__cr${i === 0 ? ' is--on' : ''}"><i></i><span>Creative ${x}</span></div>`).join('')}</div><div class="mui__row" style="flex-wrap:wrap">${P('Interest')}${P('Lookalike')}${P('Retargeting')}</div><div class="mui__row mui__sb" style="font-size:.75em;margin-top:auto"><span class="mui__mut">Pixel + Conversions API</span>${P('Tracking ✓', 'v')}</div>`;
  },
  seo() {
    const c = [['Sitemap submitted', 1], ['Pages indexed', 1], ['Core Web Vitals: good', 1]];
    return `<div class="mui__search">handloom sarees online</div><div class="mui__box mui__col" style="gap:.3em"><span class="mui__mut" style="font-size:.7em">yourbrand.com › sarees</span><b class="mse__t">Handloom Sarees, Woven by Hand</b>${L(92)}${L(66)}</div><div class="mui__list">${c.map(([t, on]) => `<div class="mui__li">${CHK(on)}<span>${t}</span></div>`).join('')}</div>`;
  },

  /* ---- Research pack ---- */
  competitor() {
    const cols = ['You', 'A', 'B', 'C'];
    const rows = [['Chapter preview', [1, 1, 0, 2]], ['Timed links', [1, 0, 0, 1]], ['UPI checkout', [1, 1, 2, 0]], ['Low fees', [1, 0, 2, 0]]];
    const sym = v => (v === 1 ? '<i class="mx__y">✓</i>' : v === 2 ? '<i class="mx__p">~</i>' : '<i class="mx__n">✗</i>');
    return TOP('Competitor analysis', P('Gap found', 'v')) + `<div class="mx"><span></span>${cols.map((c, i) => `<b class="${i === 0 ? 'is--you' : ''}">${c}</b>`).join('')}${rows.map(([f, v]) => `<span>${f}</span>${v.map(sym).join('')}`).join('')}</div>`;
  },
  personas() {
    const lv = [['Social proof', 90], ['Preview', 74], ['Price', 52]];
    return `<div class="mui__row"><span class="mui__av u mpe__av">H</span><div class="mui__col" style="gap:.1em"><b>The Hungry Learner</b><span class="mui__mut" style="font-size:.75em">Student · Mobile · Reels</span></div></div><div class="mui__box mpe__q">“Show me a chapter before I pay.”</div><div class="mui__col" style="gap:.4em">${lv.map(([t, w]) => `<div class="mpe__lv"><span>${t}</span><span class="mui__prog"><i style="width:${w}%"></i></span></div>`).join('')}</div>`;
  },
  userflows() {
    const n = [[12, 22, 'Instagram', 'r'], [12, 62, 'Google', 'r'], [36, 42, 'Landing'], [58, 42, 'Book page'], [80, 22, 'Paid ✓', 'v'], [80, 62, 'Failed', 'u'], [58, 84, 'Retry link']];
    return TOP('Userflows', P('8 zones')) + BOARD(n, [[0, 2], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6]]);
  },
  attraction() {
    const s = ['Hero', 'Social proof', 'Preview', 'Trust', 'CTA'];
    const m = [[1, 1, 0, 1], [1, 0, 1, 1], [0, 1, 1, 0], [1, 1, 0, 0], [1, 1, 1, 1]];
    return TOP('Attraction strategy', P('4 personas', 'u')) + `<div class="mat"><span></span>${['P1', 'P2', 'P3', 'P4'].map(p => `<b>${p}</b>`).join('')}${s.map((x, i) => `<span>${x}</span>${m[i].map(v => `<i class="${v ? 'on' : ''}"></i>`).join('')}`).join('')}</div>`;
  },
  uxstrategy() {
    return TOP('UX strategy · 375px', P('Mobile first', 'v')) + `<div class="mux"><div class="mux__phone">${['Hero + CTA', 'Social proof', 'Products', 'Trust', 'FAQ'].map((t, i) => `<span class="${i === 0 ? 'on' : ''}">${t}</span>`).join('')}</div><div class="mui__col mux__rules">${[['Tap target', '44px'], ['CTA height', '52px'], ['Body text', '16px'], ['Side padding', '20px']].map(([a, b]) => `<div class="mui__row mui__sb"><span class="mui__mut">${a}</span><b>${b}</b></div>`).join('')}</div></div>`;
  },
  brief() {
    return `<div class="mui__paper"><div class="mui__row mui__sb"><span class="mui__t">Strategy brief</span>${P('Signed off', 'v')}</div>${['Goals + KPIs', 'Audience', 'Positioning', 'Scope + roadmap'].map(t => `<div class="mui__col" style="gap:.25em"><b style="font-size:.78em">${t}</b>${L(88)}</div>`).join('')}<span class="mui__sign" style="margin-top:auto">Approved</span></div>`;
  },
  deck() {
    return TOP('UX research deck', P('12 slides')) + `<div class="mdk"><div class="mdk__main"><span class="mui__mut" style="font-size:.7em">04 · Personas</span><b>Four buyers. One store.</b><div class="mdk__cards"><i></i><i></i><i></i><i></i></div></div><div class="mdk__strip">${[1, 2, 3, 4, 5, 6].map(i => `<i class="${i === 4 ? 'on' : ''}"></i>`).join('')}</div></div>`;
  },
  inspiration() {
    return TOP('Design inspirations', `<span class="mui__row">${P('Refero')}${P('Mobbin')}</span>`) + `<div class="mui__thumbs">${[['Hero', 'u'], ['Product', 'v'], ['Checkout', ''], ['Reviews', ''], ['Pricing', 'u'], ['Footer', '']].map(([t, c]) => `<div class="mui__thumb ${c}"><div></div><span>${t}</span></div>`).join('')}</div>`;
  },
  wireframes() {
    return TOP('Wireframes', `<span class="mui__row">${P('Desktop', 'v')}${P('Mobile')}</span>`) + `<div class="mwf"><div class="mwf__d"><i class="h"></i><i class="b"></i><div class="mwf__row"><i></i><i></i><i></i></div><i class="t"></i></div><div class="mwf__m"><i class="h"></i><i class="b"></i><i></i><i></i></div></div>`;
  },

  /* ---- Phases ---- */
  call() {
    return TOP('Discovery call', P('45 min', 'v')) + `<div class="mui__box mui__col"><div class="mui__row mui__sb"><b>Tue · 11:00</b>${P('Meet link', 'u')}</div><span class="mui__mut" style="font-size:.78em">You + your One Stop lead</span></div><div class="mui__steps">${['Your business', 'Your customers', 'Goals and budget', 'What to build first'].map((t, i) => `<div><i>${pad(i + 1)}</i><span>${t}</span></div>`).join('')}</div><div class="mui__row" style="margin-top:auto">${P('Recap in 24 h', 'sq')}${P('Proposal next')}</div>`;
  },
  code() {
    return TOP('Build · Weekly sprint', P('Staging ✓', 'v')) + `<pre class="mui__code"><span class="c">// checkout.ts</span>\n<span class="k">export async function</span> placeOrder(cart) {\n  <span class="k">await</span> validate(cart)\n  <span class="k">return</span> payments.<span class="s">createOrder</span>(cart)\n}</pre><div class="mui__row">${P('Tests pass', 'sq')}${P('Reviewed')}${P('Secure')}</div>`;
  },
  launch() {
    const c = [['SSL + domain', 1], ['301 redirects', 1], ['Sitemap to Google', 1], ['GA4 events', 1], ['Accounts in your name', 1], ['Training video', 0]];
    return TOP('Launch checklist', P('Go live', 'v')) + `<div class="mui__grid2 mla">${c.map(([t, on]) => `<div class="mui__li">${CHK(on)}<span>${t}</span></div>`).join('')}</div>`;
  },
  report() {
    const k = [['Traffic', [30, 42, 38, 55, 61, 70]], ['Leads', [20, 26, 33, 31, 45, 52]], ['Sales', [12, 18, 16, 25, 30, 38]]];
    return TOP('Monthly report', P(MON)) + `<div class="mui__grid3">${k.map(([l, b]) => `<div class="mui__kpi"><span>${l}</span><div class="mui__bars mrp">${b.map(h => `<i style="--h:${h}%"></i>`).join('')}</div></div>`).join('')}</div><div class="mui__box mui__col" style="font-size:.8em;gap:.3em"><b>Next month</b><span class="mui__mut">3 improvements, agreed with you</span></div>`;
  },

  /* ---- Work ---- */
  saree() {
    return `<div class="mbw">${CHROME('handloom story')}<div class="msa"><div class="mui__col" style="gap:.4em"><span class="mui__mut" style="font-size:.7em">The weavers</span><b class="msa__h">Woven by hand.<br>Worn with pride.</b>${L(70)}<span class="msa__btn">Read their story</span></div><div class="msa__img"><i></i></div></div></div>`;
  },

  /* ---- Start ---- */
  proposal() {
    const rows = [['Discover', '0%', '18%', '#4a4545'], ['Define', '15%', '17%', 'var(--c-violet)'], ['Design', '30%', '24%', 'var(--c-violet-lite)'], ['Build', '50%', '36%', 'var(--c-volt)'], ['Launch', '86%', '14%', '#f4f4f4']];
    return TOP('Your plan', P('Proposal', 'u')) + `<div class="mui__gantt">${rows.map(([n, s, w, c]) => `<div class="mui__gr"><span>${n}</span><span class="mui__gt"><i style="--s:${s};--w:${w};--c:${c}"></i></span></div>`).join('')}</div><div class="mui__row mui__sb"><span class="mui__mut" style="font-size:.78em">Scope · Phases · Timeline</span>${P('Accept ✓', 'v')}</div>`;
  }
};
