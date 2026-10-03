/* ===== Mini product screens (illustrative UI, example data) ===== */
const pad = n => String(n).padStart(2, '0');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const GLYPH = '<svg viewBox="0 0 80 80" aria-hidden="true"><use href="#i-glyph"/></svg>';
const P = (t, c = '') => `<span class="mui__p ${c}">${t}</span>`;
const L = (w, c = '') => `<i class="mui__ln ${c}" style="width:${w}%"></i>`;
const TOP = (t, r = '') => `<div class="mui__top"><span class="mui__t">${t}</span>${r}</div>`;
const tzPos = h => ((((h - 6) % 24) + 24) % 24) / 24 * 100;
const pct = v => v.toFixed(2) + '%';
const NOW = new Date();
const fmtD = o => NOW.toLocaleDateString('en-GB', o).replace(/,/g, '');
const DAY_S = fmtD({ weekday: 'short', day: 'numeric', month: 'short' }), DAY_L = fmtD({ weekday: 'long' });
const MON = fmtD({ month: 'long' }), MON_PREV = new Date(NOW.getFullYear(), NOW.getMonth() - 1, 1).toLocaleDateString('en-GB', { month: 'long' });

const V = {
  pipeline() {
    const cols = [['New', 4, [['Instagram', 74], ['Referral', 60]]], ['Contacted', 3, [['Marketplace', 68], ['Ads', 52]]], ['Proposal', 2, [['Referral', 64]]], ['Won', 1, [['Website', 72]]]];
    return TOP('Leads', P('₹12.4L pipeline', 'v')) + `<div class="mui__kan">${cols.map(([n, c, cards], ci) => `<div class="mui__kcol"><div class="mui__kh"><span>${n}</span><span class="mui__mut">${c}</span></div>${cards.map(([s, w]) => `<div class="mui__kc${ci === 3 ? ' won' : ''}">${L(w, 'w')}${L(w - 24)}${P(s)}</div>`).join('')}</div>`).join('')}</div>`;
  },
  proposal() {
    return `<div class="mui__paper"><div class="mui__row mui__sb"><span class="mui__t">Proposal</span>${P('Signed', 'v')}</div><span class="mui__mut" style="font-size:.8em">Website redesign · Acme Labs</span>${L(92)}${L(84)}${L(68)}<div class="mui__row mui__sb" style="margin-top:auto;font-size:.85em"><span>Total</span><b>₹2,40,000</b></div><div class="mui__row mui__sb"><span class="mui__sign">A. Rao</span><span class="mui__mut" style="font-size:.7em">e-signed · audit trail</span></div></div>`;
  },
  portal() {
    const ms = [['Discovery', 1], ['Design', 1], ['Build', 0], ['Launch', 0]];
    return TOP('Acme Labs · Portal', P('Your logo', 'u')) + `<div class="mui__box mui__col"><div class="mui__row mui__sb" style="font-size:.85em"><span>Website redesign</span><b>64%</b></div><div class="mui__prog"><i style="width:64%"></i></div></div><div class="mui__list">${ms.map(([t, on]) => `<div class="mui__li"><i class="mui__chk${on ? ' on' : ''}"></i><span>${t}</span>${on ? '' : P(t === 'Build' ? 'In progress' : 'Up next')}</div>`).join('')}</div><div class="mui__row" style="margin-top:auto">${P('Needs you', 'v')}<span style="font-size:.82em">Approve the design gate</span></div>`;
  },
  invoice() {
    return TOP('INV-2026-024', P('Paid', 'v')) + `<div class="mui__col" style="margin-top:.2em"><span class="mui__mut" style="font-size:.8em">Milestone 2 · Design</span><span class="mui__big">₹48,000</span></div><div class="mui__box mui__col" style="font-size:.82em"><div class="mui__row mui__sb"><span>Sent</span><span class="mui__mut">2 Oct</span></div><div class="mui__row mui__sb"><span>Due</span><span class="mui__mut">12 Oct</span></div><div class="mui__row mui__sb"><span>Paid via</span><b>Razorpay link</b></div></div><div class="mui__row" style="margin-top:auto">${P('Milestone', 'sq')}${P('Retainer')}${P('PDF')}</div>`;
  },
  gantt() {
    const rows = [['Discovery', '0%', '18%', '#4a4545'], ['Design', '14%', '30%', 'var(--c-violet)'], ['Build', '38%', '40%', 'var(--c-volt)'], ['QA', '72%', '16%', '#8d8888'], ['Launch', '86%', '14%', '#f4f4f4']];
    return TOP('Website redesign', `<span class="mui__row">${P('Gantt', 'v')}${P('Kanban')}</span>`) + `<div class="mui__gantt">${rows.map(([n, s, w, c]) => `<div class="mui__gr"><span>${n}</span><span class="mui__gt"><i style="--s:${s};--w:${w};--c:${c}"></i></span></div>`).join('')}</div><div class="mui__row mui__mut" style="font-size:.7em;flex-wrap:wrap">Kanban · List · Calendar · Gantt · Whiteboard · Goals</div>`;
  },
  prompt() {
    return TOP('Prompt', P('Team', 'u')) + `<b style="font-size:1.05em">Case study writer</b><div class="mui__box" style="font-family:var(--font-mono);font-size:.78em;line-height:1.55;color:#d8d3d3">Write a case study for <span class="mui__var">{{client}}</span> about <span class="mui__var">{{project}}</span>. Keep the tone <span class="mui__var">{{tone}}</span>.</div><div class="mui__row" style="margin-top:auto">${P('Variables')}${P('Sample output')}${P('★ Rating', 'sq')}</div>`;
  },
  handoff() {
    const t = ['Code', 'Stack', 'Live', 'Docs', 'Videos', 'Design', 'Access', 'Support', 'Sign-off'];
    return TOP('Handoff package', P('In the portal')) + `<div class="mui__tiles">${t.map((x, i) => `<div class="mui__tile${i === 8 ? ' v' : ''}"><i>${pad(i + 1)}</i><span>${x}${i === 8 ? ' ✓' : ''}</span></div>`).join('')}</div>`;
  },
  review() {
    return `<div class="mui__row mui__sb"><span class="mui__stars">★★★★★</span>${P('Verified', 'v')}</div><b style="font-size:1.1em">From a finished portal project</b><div class="mui__box mui__col">${L(96, 'w')}${L(86)}${L(62)}</div><div class="mui__row" style="margin-top:auto"><span class="mui__av u">N</span><span style="font-size:.82em">Client · Northwind Studio</span></div><div class="mui__row">${P('Badge for your site', 'sq')}${P('Case study')}</div>`;
  },
  overlap() {
    const team = [10, 19], rows = [['IST', 10, 19, 1], ['London', 13.5, 22.5, 0], ['New York', 18.5, 27.5, 0]];
    return TOP('Overlap hours', P('5.5 h · London', 'v')) + `<div class="mui__col" style="gap:.5em;margin-top:.3em">${rows.map(([n, s, e, isTeam]) => {
      const ov = isTeam ? '' : (() => { const os = Math.max(s, team[0]), oe = Math.min(e, team[1]); return oe > os ? `<i class="o" style="--s:${pct(tzPos(os))};--w:${pct((oe - os) / 24 * 100)}"></i>` : ''; })();
      return `<div class="mui__tz"><span>${n}</span><span class="mui__tzt"><i class="${isTeam ? 't' : ''}" style="--s:${pct(tzPos(s))};--w:${pct((e - s) / 24 * 100)}"></i>${ov}</span></div>`;
    }).join('')}</div><div class="mui__row mui__mut mui__sb" style="margin-top:auto;font-size:.7em"><span>06:00</span><span>12:00</span><span>18:00</span><span>00:00 IST</span></div>`;
  },
  profile() {
    return `<div class="mui__row"><span class="mui__glyph">${GLYPH}</span><div class="mui__col" style="gap:.15em"><b>One Stop Solutions</b><span class="mui__mut" style="font-size:.75em">Design &amp; development · Andhra Pradesh</span></div></div><div class="mui__tabs"><span>Work</span><span class="on">How we work</span><span>Toolkit</span><span>Reviews</span></div><div class="mui__steps">${['Discovery', 'UX &amp; UI design', 'Build', 'QA &amp; launch', 'Handoff'].map((s, i) => `<div><i>${pad(i + 1)}</i><span>${s}</span></div>`).join('')}</div><div class="mui__row" style="margin-top:auto;flex-wrap:wrap">${['Figma', 'React', 'Supabase'].map(x => P(x, 'sq')).join('')}</div>`;
  },
  sow() {
    return `<div class="mui__paper"><div class="mui__row mui__sb"><span class="mui__t">Statement of Work</span><span class="mui__mut" style="font-size:.7em">v2</span></div><span style="font-size:.78em">For <span class="mui__var">{{client.company}}</span></span><span style="font-size:.78em">Fee <span class="mui__var">{{quote.total}}</span> in <span class="mui__var">{{client.currency}}</span></span>${L(90)}${L(74)}<div class="mui__row mui__sb" style="margin-top:auto;font-size:.72em"><span>Brand kit · clause library</span><b>PDF + link</b></div></div>`;
  },
  attendance() {
    const team = [['Design', 'In', 'v'], ['Frontend', 'In', 'v'], ['Backend', 'Leave', ''], ['QA', 'In', 'v']];
    return TOP('Team · today', P('Check-in 09:58', 'v')) + `<div class="mui__grid2">${team.map(([r, s, c]) => `<div class="mui__li"><span class="mui__av ${c ? 'u' : ''}">${r[0]}</span><span>${r}</span>${P(s, c)}</div>`).join('')}</div><div class="mui__box mui__col" style="margin-top:auto"><span style="font-size:.75em" class="mui__mut">Daily update · Frontend</span>${L(90, 'w')}${L(66)}</div>`;
  },
  kpis() {
    return TOP('Owner dashboard', P('Example data')) + `<div class="mui__grid3"><div class="mui__kpi"><span>Revenue</span><b>₹4.86L</b></div><div class="mui__kpi"><span>Pending</span><b>₹1.2L</b></div><div class="mui__kpi r"><span>Overdue</span><b>₹38.5K</b></div></div><svg class="mui__spark" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,50 25,44 50,47 75,34 100,38 125,24 150,28 175,14 200,10" fill="none" stroke="currentColor" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg><div class="mui__row">${P('Pipeline ₹12.4L')}${P('Win rate 38%', 'u')}${P('Team load')}</div>`;
  },
  search() {
    const r = [['One Stop Solutions', 'u', 'How we work'], ['Studio Kite', '', 'Reviews'], ['Pixel Harbour', '', 'Toolkit']];
    return `<div class="mui__search">Web design · Visakhapatnam</div><div class="mui__row">${P('Verified reviews', 'v')}${P('Budget')}${P('Tech stack')}</div><div class="mui__list">${r.map(([n, c, t]) => `<div class="mui__li"><span class="mui__av ${c}">${n[0]}</span><span>${n}</span>${P(t)}</div>`).join('')}</div><div class="mui__row" style="margin-top:auto">${P('Request a quote', 'v')}<span class="mui__mut" style="font-size:.75em">two steps</span></div>`;
  },
  inbox() {
    const r = [['One Stop Solutions', 'Replied', 'v'], ['Studio Kite', 'Quote sent', 'u'], ['Pixel Harbour', 'New', '']];
    return TOP('Enquiries', P('Google · OTP')) + `<div class="mui__list">${r.map(([n, s, c]) => `<div class="mui__li"><span class="mui__av">${n[0]}</span><span>${n}</span>${P(s, c)}</div>`).join('')}</div><div class="mui__box mui__row mui__sb" style="margin-top:auto"><span style="font-size:.8em">Saved shortlist</span>${P('4 agencies')}</div>`;
  },
  today() {
    const r = [['Meeting', '11:30 Discovery call', 'u'], ['Task', 'Hero section copy', ''], ['Follow-up', 'Lumen Foods', 'v'], ['Due', 'INV-031 · ₹18,000', 'r']];
    return TOP('Today', P('Solo workspace')) + `<div class="mui__list">${r.map(([k, t, c]) => `<div class="mui__li">${P(k, c)}<span>${t}</span></div>`).join('')}</div><div class="mui__row" style="margin-top:auto">${P('Upgrade to Agency · data stays', 'sq')}</div>`;
  },
  tasks() {
    const cols = [['To do', ['Pricing page', 'SEO audit']], ['Doing', ['Checkout flow', 'API auth']], ['Review', ['Hero section']]];
    return TOP('Project lead', P('Request approval', 'v')) + `<div class="mui__cols3">${cols.map(([n, items], ci) => `<div><b>${n}</b>${items.map((t, i) => `<div class="mui__li" style="font-size:.72em"><span class="mui__av ${ci === 1 && !i ? 'u' : ''}">${'DFBQP'[(ci + i) % 5]}</span><span>${t}</span></div>`).join('')}</div>`).join('')}</div>`;
  },
  mytasks() {
    return TOP('My day', P('Checked in', 'v')) + `<div class="mui__box mui__row mui__sb"><div class="mui__col" style="gap:.2em"><span class="mui__mut" style="font-size:.72em">Timer · Hero section</span><span class="mui__timer">01:24:10</span></div>${P('Pause', 'u')}</div><div class="mui__list">${[['Hero section', 1], ['Footer links', 0], ['Daily update', 0]].map(([t, on]) => `<div class="mui__li"><i class="mui__chk${on ? ' on' : ''}"></i><span>${t}</span></div>`).join('')}</div>`;
  },
  hr() {
    const cells = Array.from({ length: 30 }, (_, i) => { const a = [0.9, 0.85, 0.95, 0.2, 0.9, 0.75, 1, 0.1, 0.92, 0.8][i % 10]; return `<i style="--a:${a}"></i>`; }).join('');
    return TOP('Attendance · ' + MON, P('2 leave requests', 'u')) + `<div class="mui__heat">${cells}</div><div class="mui__list" style="margin-top:auto">${[['Leave · 2 days', 'Approve', 'v'], ['Payslips · ' + MON_PREV, 'Ready', '']].map(([t, s, c]) => `<div class="mui__li"><span>${t}</span>${P(s, c)}</div>`).join('')}</div>`;
  },
  mrr() {
    const h = [22, 30, 28, 38, 46, 44, 58, 66, 74, 86];
    return TOP('Super admin', P('Internal')) + `<div class="mui__row">${P('Platform MRR')}${P('Agencies')}${P('Free → paid', 'u')}</div><div class="mui__bars">${h.map(v => `<i style="--h:${v}%"></i>`).join('')}</div><div class="mui__row mui__mut" style="font-size:.72em">Moderation · verification · announcements</div>`;
  },
  chat() {
    return TOP('Design gate', P('Needs approval', 'v')) + `<div class="mui__chat"><span class="mui__bub">Homepage and pricing screens are up for review.</span><span class="mui__bub me">Love it. One change on the hero.</span><span class="mui__bub">Logged as a change request with a quote.</span></div><div class="mui__row" style="margin-top:auto">${P('Approve', 'v')}${P('Comment')}${P('Change request', 'u')}</div>`;
  },
  sop() {
    return TOP('Process · Web project', P('Becomes a template', 'v')) + `<div class="mui__list">${[['Discovery', 'PM', 1], ['Wireframes', 'Design', 1], ['Build', 'Dev', 0], ['QA checklist', 'QA', 0]].map(([s, o, on]) => `<div class="mui__li"><i class="mui__chk${on ? ' on' : ''}"></i><span>${s}</span>${P(o)}</div>`).join('')}</div>`;
  },
  tools() {
    const r = [['Video generation', 'Reels', 'Paid'], ['Icon search', 'UI work', 'Free'], ['Mockup kit', 'Pitch decks', 'Free'], ['Uptime monitor', 'Handoff', 'Paid']];
    return TOP('Tools', P('Team', 'u')) + `<div class="mui__list">${r.map(([n, u, p]) => `<div class="mui__li"><b style="font-size:.95em">${n}</b><span class="mui__mut">· ${u}</span>${P(p, p === 'Free' ? 'v' : '')}</div>`).join('')}</div>`;
  },
  sites() {
    const t = [['Hero', 'v'], ['Pricing', ''], ['Onboarding', 'u'], ['Footer', ''], ['Case study', ''], ['Checkout', 'v']];
    return TOP('Saved websites', P('Inspiration')) + `<div class="mui__thumbs">${t.map(([n, c]) => `<div class="mui__thumb ${c}"><div></div><span>${n}</span></div>`).join('')}</div>`;
  },
  components() {
    return TOP('Component · Pricing card', P('React', 'u')) + `<pre class="mui__code"><span class="c">// reused from the last project</span>
<span class="k">export function</span> PriceCard({ plan }) {
  <span class="k">return</span> &lt;Card tone=<span class="s">"volt"</span>&gt;
    {plan.name} · {plan.price}
  &lt;/Card&gt;
}</pre><div class="mui__row">${P('Preview')}${P('Figma link')}${P('Stack', 'sq')}</div>`;
  },
  notes() {
    return TOP('Notes &amp; docs', P('Linked to a project')) + `<div class="mui__grid2" style="flex:1;min-height:0"><div class="mui__box mui__col" style="font-size:.78em"><b>Wiki</b><span>· Onboarding</span><span>· Meeting notes</span><span class="mui__mut">  · Kickoff</span><span class="mui__mut">  · Weekly sync</span><span>· Research</span></div><div class="mui__box mui__col"><b style="font-size:.85em">Kickoff notes</b>${L(94, 'w')}${L(82)}${L(88)}${L(54)}</div></div>`;
  },
  boards() {
    return TOP('Board · User flow', P('Figma · Miro', 'u')) + `<div class="mui__board"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M20 30 L50 30 M50 30 L80 30 M50 30 L50 70 M50 70 L80 72"/></svg><span class="mui__node v" style="--x:20%;--y:30%">Landing</span><span class="mui__node" style="--x:50%;--y:30%">Sign up</span><span class="mui__node r" style="--x:80%;--y:30%">OTP</span><span class="mui__node u" style="--x:50%;--y:70%">Dashboard</span><span class="mui__node" style="--x:80%;--y:72%">Portal</span></div>`;
  },
  templates() {
    const t = [['SOW', 'Document', 'v'], ['Proposal', 'Document', ''], ['Phases', 'Project', 'u'], ['Welcome email', 'Email', ''], ['Questionnaire', 'Intake', ''], ['Kickoff deck', 'Document', '']];
    return TOP('Templates', P('Start from your best')) + `<div class="mui__thumbs">${t.map(([n, k, c]) => `<div class="mui__thumb ${c}"><div></div><span>${n} · ${k}</span></div>`).join('')}</div>`;
  },
  learnings() {
    return TOP('Retro · Website redesign', P('Saved to Playbook', 'v')) + `<div class="mui__cols3"><div><b>What worked</b>${L(90, 'w')}${L(70)}${L(80)}</div><div><b>What broke</b>${L(84, 'w')}${L(60)}</div><div><b>Client notes</b>${L(88, 'w')}${L(72)}${L(50)}</div></div>`;
  },

  /* Phone screens (light) */
  phoneOwner() {
    return `<div class="ph__status"><span>9:41</span><i></i></div><div class="ph__head"><span class="ph__hello">Good morning</span><b class="ph__title">Today</b></div>
<div class="ph__card volt"><span class="ph__label">New lead · now</span><b style="font-size:.9em">Website redesign · from your profile</b><div class="ph__actions"><span class="ph__btn ink">Reply</span><span class="ph__btn">Book a call</span></div></div>
<div class="ph__card"><span class="ph__label">Money</span><div class="ph__kpis"><div><b>₹4.86L</b><span>Revenue</span></div><div><b>₹1.2L</b><span>Pending</span></div><div><b class="alert">₹38.5K</b><span>Overdue</span></div></div></div>
<div class="ph__card"><span class="ph__label">Approve</span><div class="ph__row"><span>Quote · Northwind</span><span class="ph__btn ink">Approve</span></div><div class="ph__row"><span>Leave · 2 days</span><span class="ph__btn">Review</span></div></div>
<div class="ph__card dark"><span class="ph__label">At risk</span><div class="ph__row"><span>Acme · design gate</span><span class="ph__btn glass">2 days late</span></div></div>
<div class="ph__tab"><i class="on"></i><i></i><i></i><i></i></div>`;
  },
  phoneTeam() {
    return `<div class="ph__status"><span>9:58</span><i></i></div><div class="ph__head"><span class="ph__hello">${DAY_L}</span><b class="ph__title">Your day</b></div>
<span class="ph__btn volt wide">✓ Checked in · 09:58</span>
<div class="ph__card dark"><span class="ph__label">Timer · Hero section</span><div class="ph__row"><span class="ph__timer" data-ticker>01:24:10</span><span class="ph__btn volt">Pause</span></div></div>
<div class="ph__card"><span class="ph__label">Tasks</span><div class="ph__task"><i class="on"></i><s>Hero section</s></div><div class="ph__task"><i></i><span>Footer links</span></div><div class="ph__task"><i></i><span>Fix form errors</span></div></div>
<span class="ph__btn ink wide">Post daily update</span>
<div class="ph__tab"><i></i><i class="on"></i><i></i><i></i></div>`;
  },
  phoneClient() {
    return `<div class="ph__status"><span>18:30</span><i></i></div><div class="ph__brand"><span>${GLYPH}</span>One Stop Solutions</div><div class="ph__head"><span class="ph__hello">Website redesign</span><b class="ph__title">64% done</b></div>
<div class="ph__bar" style="--w:64%"><i></i></div>
<div class="ph__card violet"><span class="ph__label">Needs you</span><b style="font-size:.9em">Approve the design gate</b><div class="ph__actions"><span class="ph__btn volt">Approve</span><span class="ph__btn glass">Comment</span></div></div>
<div class="ph__card"><span class="ph__label">Invoice due 12 Oct</span><div class="ph__row"><b>₹48,000</b><span class="ph__btn ink">Pay now</span></div></div>
<span class="ph__bub">Weekly status report is ready.</span>
<div class="ph__tab"><i></i><i></i><i class="on"></i><i></i></div>`;
  }
};
V.today2 = V.phoneOwner;

/* Owner dashboard */
function dashHTML(light) {
  const nav = [['Dashboard', 1], ['Leads', 0, '12'], ['Clients'], ['Projects'], ['Documents'], ['Finance'], ['Team'], ['Playbook'], ['Calendar'], ['Handoffs']];
  const cols = [
    ['New', 4, [['Kite & Co', '₹80K', 'Instagram'], ['Lumen Foods', '₹1.5L', 'Referral'], ['Orbit Fitness', '₹45K', 'Marketplace']]],
    ['Contacted', 3, [['Harbor Labs', '₹2.1L', 'Ads'], ['Mitra Clinic', '₹60K', 'Website'], ['Tara Textiles', '₹1.1L', 'IndiaMART']]],
    ['Proposal', 2, [['Northwind', '₹2.4L', 'Marketplace'], ['Bloom Bakery', '₹70K', 'Instagram']]],
    ['Won', 2, [['Acme Labs', '₹3.2L', 'Referral'], ['Saffron Stays', '₹90K', 'Referral']]]
  ];
  return `<div class="dsh${light ? ' is--light' : ''}">
  <aside class="dsh__side">
    <div class="dsh__brand">${GLYPH}<span>Agency OS</span></div>
    <div class="dsh__ws"><span class="dsh__ws-av">${GLYPH}</span><div><b>One Stop Solutions</b><span>Agency workspace</span></div></div>
    <nav class="dsh__nav">${nav.map(([n, on, b]) => `<span class="${on ? 'is--on' : ''}"><i></i>${n}${b ? `<em>${b}</em>` : ''}</span>`).join('')}</nav>
    <div class="dsh__side-foot"><i class="dsh__me" style="width:1.6em;height:1.6em"></i>Settings</div>
  </aside>
  <div class="dsh__main">
    <div class="dsh__topbar"><div class="dsh__crumb">Workspace / <b>Dashboard</b></div><div class="dsh__search">Search leads, clients, projects…</div><span class="dsh__new">+ New</span><span class="dsh__me"></span></div>
    <div class="dsh__content">
      <div class="dsh__hello"><b>Good morning</b><span>Example data</span></div>
      <div class="dsh__kpis">
        <div class="dsh__kpi"><span>Revenue · ${MON}</span><b>₹4,86,000</b><small class="is--up">+12% vs ${MON_PREV}</small><svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,34 15,30 30,32 45,22 60,25 75,14 90,16 100,6" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/></svg></div>
        <div class="dsh__kpi"><span>Pending</span><b>₹1,20,000</b><small>6 invoices</small></div>
        <div class="dsh__kpi is--alert"><span>Overdue</span><b>₹38,500</b><small>2 invoices · reminders on</small></div>
        <div class="dsh__kpi"><span>Pipeline value</span><b>₹12.4L</b><small>Win rate 38%</small></div>
      </div>
      <div class="dsh__row">
        <div class="dsh__panel"><div class="dsh__panel-h">Leads pipeline<span>by source</span></div>
          <div class="dsh__kanban">${cols.map(([n, c, leads], ci) => `<div class="dsh__kcol"><b><span>${n}</span><span>${c}</span></b>${leads.map(([who, val, src]) => `<div class="dsh__lead${ci === 3 ? ' is--won' : ''}"><b>${who}</b><span>${val}<em>${src}</em></span></div>`).join('')}</div>`).join('')}</div>
        </div>
        <div class="dsh__panel"><div class="dsh__panel-h">Today<span>${DAY_S}</span></div>
          <ul class="dsh__agenda"><li><b>10:00</b>Standup · Google Meet</li><li class="is--now"><b>11:30</b>Discovery call · Kite &amp; Co</li><li><b>15:00</b>Design review · Acme Labs</li><li><b>Task</b>Follow up · Lumen Foods</li><li><b>Due</b>INV-024 · Northwind</li><li><b>17:00</b>Retainer review · Mitra Clinic</li></ul>
        </div>
      </div>
      <div class="dsh__row">
        <div class="dsh__panel"><div class="dsh__panel-h">Projects at risk<span>4 of 9 active</span></div>
          <ul class="dsh__risk"><li><span><b>Acme Labs</b> · Website redesign</span><em>Design gate 2 days late</em></li><li><span><b>Northwind</b> · Mobile app</span><em>Budget 92% used</em></li><li><span><b>Lumen Foods</b> · Brand refresh</span><em class="is--warn">Waiting on client assets</em></li><li><span><b>Veda Wellness</b> · App MVP</span><em class="is--warn">Change request open</em></li></ul>
        </div>
        <div class="dsh__panel"><div class="dsh__panel-h">Team load<span>this week</span></div>
          <ul class="dsh__load"><li style="--w:78%"><span>Design</span><i></i><b>78%</b></li><li class="is--over" style="--w:100%"><span>Frontend</span><i></i><b>104%</b></li><li style="--w:62%"><span>Backend</span><i></i><b>62%</b></li><li style="--w:40%"><span>QA</span><i></i><b>40%</b></li><li style="--w:70%"><span>PM</span><i></i><b>70%</b></li><li style="--w:55%"><span>Content</span><i></i><b>55%</b></li></ul>
        </div>
      </div>
    </div>
  </div>
</div>`;
}
