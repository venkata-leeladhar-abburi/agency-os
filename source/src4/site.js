/* ===== One Stop Solutions: agency website ===== */
const WA = '919014952056';
const IMG = (k, n, full) => `img/${k}-${n}${full ? '-full' : ''}.webp`;
const FR = 'https://framerusercontent.com/images/';
const CREST = '<img class="crest" src="img/logo-bk.webp" alt="" loading="lazy">';
const GLYPH = '<svg viewBox="0 0 80 80" aria-hidden="true"><use href="#i-glyph"/></svg>';

/* ---------- Projects ----------
   what: one clear line. desc: who it is for and what it does. imgs: [n, 'desk'|'tall'|'phone'].
   live: a public page that can open in the live preview. cs: the case study, phase by phase. */
const P = [
  { id: 'bk', name: 'Beere Kesava ERP', what: 'An ERP for a silk saree business in Dharmavaram.',
    desc: 'Beere Kesava & Brothers Silks has made handloom silk sarees since 1999. Their whole business, from buying yarn to selling sarees, now runs in one portal.',
    cat: 'product', key: 'bk', cover: 1, imgs: [[1, 'tall'], [2, 'tall'], [3, 'tall'], [4, 'tall']], url: 'erp.beere-kesava-and-brothers.org',
    live: 'https://erp.beere-kesava-and-brothers.org/', liveName: 'Beere Kesava ERP',
    links: [['Live ERP', 'https://erp.beere-kesava-and-brothers.org/'], ['Pitch deck', 'beere-kesava/'], ['Design', 'https://beera-keshava-and-brothers-silks.figma.site/']],
    tags: ['ERP', '6 role portals', 'Live'], client: 'Beere Kesava & Brothers Silks', platform: 'Web app · 6 role portals', scope: 'Research, UX/UI, full-stack build, launch',
    cs: { challenge: 'Yarn, looms, stock and sales lived in notebooks and phone calls. Nobody saw the full picture.',
      competitor: ['Off-the-shelf ERPs track accounts, not looms, warps or weavers.', 'Billing apps stop at the shop counter.', 'The gap: one system for the whole saree journey.'],
      research: ['Mapped every step with the owner, accountant and shop staff.', 'Followed a saree from yarn purchase to the shop shelf.', 'Listed what each role needs, and what it must never see.'],
      empathy: ['Which batch is still on the loom?', 'Are we losing money on unpaid bills?', 'Keeps separate books for yarn, weavers and sales.', 'Worried about missing stock and late payments.'],
      users: ['Superadmin', 'Admin', 'Accountant', 'Worker staff', 'Weaver', 'Shop staff'],
      flow: ['Buy yarn', 'Issue to weaver', 'Weave', 'Quality check', 'Finish', 'Sell & bill'], wire: 'dash',
      design: ['Wine, gold and cream from the brand.', 'One layout for all six role portals.', 'Big numbers first. Details one tap away.'],
      build: ['Purchase, production, quality, stock, sales and finance.', 'GST invoices and reports sent on WhatsApp.', 'Overnight checks flag late batches and overdue bills.'],
      stack: ['React', 'NestJS', 'PostgreSQL', 'Prisma', 'WhatsApp API'],
      launch: ['100+ automated test files.', 'Tested role by role.', 'Live on its own domain.'],
      result: ['Every step from yarn to sale is tracked in one place.', 'Each role sees only what it needs.'] } },
  { id: 'ornate', name: 'Ornate ’26', what: 'A space-themed website and event system for a college fest.',
    desc: 'Ornate is the annual fest of RGUKT Ongole. Students explore events like missions in space, and organisers run the fest from one dashboard.',
    cat: 'web', key: 'ornate', cover: 4, imgs: [[4, 'desk'], [1, 'desk'], [5, 'desk'], [2, 'tall'], [3, 'tall'], ['core-1', 'desk'], ['core-3', 'desk'], ['core-4', 'desk'], ['core-5', 'desk']], url: 'ornate-one.vercel.app',
    live: 'https://ornate-one.vercel.app/', liveName: 'Ornate ’26',
    links: [['Visit the site', 'https://ornate-one.vercel.app/'], ['Event system design', 'https://ornate-ems.figma.site/']],
    tags: ['Fest website', 'Event system', 'Gamified'], client: 'RGUKT Ongole', platform: 'Website + admin system', scope: 'UX/UI, gamification, web build',
    cs: { challenge: 'Fest sites are long event lists. Students skim and leave, and organisers juggle sheets and chats.',
      competitor: ['Other fest sites: plain lists, no story.', 'Weak on phones, where students browse.', 'The gap: a fest that feels like an adventure.'],
      research: ['Talked to students about how they find and pick events.', 'Sat with organisers to list what they manage every day.'],
      empathy: ['Which events can I join?', 'Every fest site looks the same.', 'Checks Instagram for updates.', 'Excited, but lost in long lists.'],
      users: ['Students (cadets)', 'Branch admins', 'Fest organisers'],
      flow: ['Land', 'Explore sectors', 'Unlock a mission', 'Register', 'Cadet hub'], wire: 'site',
      design: ['Deep space, neon accents, star fields.', 'Each section is a chapter of the journey.', 'Events shown as missions to unlock.'],
      build: ['Fest website with registration and a cadet profile.', 'Event system: branches, events, schedules, standings.', 'Fully responsive.'],
      stack: ['Web app', 'Admin dashboard', 'Vercel'],
      launch: ['Tested on phones and desktops.', 'Launched for the fest.'],
      result: ['It looked and felt like a product launch.', 'Strong buzz across the student community.'] } },
  { id: 'aaravi', name: 'Aaravi Collectives', what: 'A brand website for a luxury silk saree label.',
    desc: 'Aaravi Collectives is a new silk saree brand. The site tells its heritage story in cinematic scenes and builds a waitlist before launch.',
    cat: 'web', key: 'aaravi', cover: 4, imgs: [[4, 'desk'], [1, 'desk'], [2, 'desk'], [3, 'desk'], [5, 'desk'], [6, 'desk']], url: 'aaravi collectives',
    live: '', links: [], tags: ['Brand website', 'Storytelling', 'Waitlist'], client: 'Aaravi Collectives', platform: 'Brand website', scope: 'Brand story, UX/UI, web build',
    cs: { challenge: 'A new label has to earn trust before its first sale.',
      competitor: ['Saree sites: product grids with little story.', 'A luxury feel is rare online.', 'The gap: heritage, told like cinema.'],
      research: ['Studied how buyers choose silk: trust, story, craft.', 'Looked at luxury fashion sites for pace and tone.'],
      empathy: ['Is this real handloom silk?', 'I want a saree with a story.', 'Saves designs and asks family first.', 'Wants to trust before spending.'],
      users: ['Saree lovers', 'Brides and families', 'Gift buyers'],
      flow: ['Arrive', 'Enter the story', 'Heritage scenes', 'Join the waitlist'], wire: 'site',
      design: ['Warm gold on deep maroon.', 'Full-screen heritage scenes.', 'Slow, calm motion.'],
      build: ['A cinematic scroll story.', 'Waitlist sign-up.', 'A coming-soon launch page.'],
      stack: ['Website', 'Waitlist'],
      launch: ['Ready for launch day.'],
      result: ['A brand world that sells the story before the saree.'] } },
  { id: 'ngb', name: 'NGB · Nawin Golden Boy', what: 'A website for a fitness coaching brand.',
    desc: 'NGB coaches people to get fit. The site shows the training programs and turns visitors into sign-ups, in a bold black-and-lime look.',
    cat: 'web', key: 'ngb', cover: 1, imgs: [[1, 'desk'], [2, 'desk'], [3, 'desk']], url: 'fitness-platform-ngb.vercel.app',
    live: 'https://fitness-platform-ngb.vercel.app/', liveName: 'NGB',
    links: [['View live', 'https://fitness-platform-ngb.vercel.app/']], tags: ['Fitness', 'Coaching', 'Live'], client: 'NGB · Nawin Golden Boy', platform: 'Website', scope: 'UX/UI, web build',
    cs: { challenge: 'Coaching sells on trust and energy. The site had to feel like the gym.',
      competitor: ['Coach sites: stock photos and unclear programs.', 'Sign-up hidden at the bottom.', 'The gap: bold, real, one clear next step.'],
      research: ['Looked at why people join a coach, and why they quit.', 'Listed the questions people ask before signing up.'],
      empathy: ['Which program fits me?', 'Will I stick with it this time?', 'Follows coaches online and tries free plans.', 'Motivated, but needs a push.'],
      users: ['Beginners', 'Regular gym-goers', 'The coach'],
      flow: ['Land', 'See programs', 'Pick a plan', 'Sign up'], wire: 'site',
      design: ['Black, white and lime.', 'Big type and real photos.', 'One clear call to action.'],
      build: ['Programs and coaching pages.', 'A simple sign-up flow.', 'Responsive on every phone.'],
      stack: ['Website', 'Vercel'],
      launch: ['Live on its own domain.'],
      result: ['A site that feels like the gym, and asks people to join.'] } },
  { id: 'limitx', name: 'LimitX', what: 'A mobile app for paying tuition fees.',
    desc: 'Students pay fees in seconds and find tutors. Designed and built in Flutter for Android and iOS.',
    cat: 'app', key: 'limitx', cover: 1, imgs: [[1, 'phone'], [2, 'phone'], [3, 'phone'], [4, 'phone']], url: 'timelly.in/limitx',
    live: 'https://timelly.in/limitx', liveName: 'LimitX',
    links: [['View live', 'https://timelly.in/limitx']], tags: ['Mobile app', 'Fintech', 'Flutter'], client: 'LimitX', platform: 'Mobile app · Android & iOS', scope: 'UX/UI, Flutter app',
    cs: { challenge: 'Paying fees is slow, stressful and full of paper.',
      competitor: ['Payment apps: busy and bank-like.', 'Nothing built around students.', 'The gap: a calm, premium fee app.'],
      research: ['Spoke with students and parents about paying fees.', 'Listed what makes a payment feel safe.'],
      empathy: ['Can I pay fees on my phone?', 'Is this payment safe?', 'Waits in fee queues.', 'Stressed near due dates.'],
      users: ['Students', 'Parents', 'Tutors', 'Schools'],
      flow: ['Sign in with phone', 'Verify', 'Pick a fee', 'Pay', 'Receipt'], wire: 'phone',
      design: ['Black and white. No noise.', 'Two themes.', 'One-hand use, bottom navigation.'],
      build: ['Fee payments and dues.', 'A tutors marketplace with profiles.', 'A dashboard for payments.'],
      stack: ['Flutter', 'Android', 'iOS'],
      launch: ['Live at timelly.in/limitx.'],
      result: ['A premium fee app, from design system to production screens.'] } },
  { id: 'scampus', name: 'S-Campus', what: 'College management software with nine portals.', desc: 'Admissions, academics, exams, hostel, finance and transport. One login each for admins, faculty, students, parents and drivers.', cat: 'product', key: 'scampus', cover: 1, imgs: [[1, 'desk'], [2, 'desk'], [3, 'desk'], [4, 'desk']], url: 's-campus.figma.site', live: 'https://s-campus.figma.site/', liveName: 'S-Campus', links: [['View the design', 'https://s-campus.figma.site/']], tags: ['SaaS', '9 portals'] },
  { id: 'timelly', name: 'Timelly', what: 'Website for Timelly, a school management software.', desc: 'The marketing website for Timelly.', cat: 'web', key: 'timelly', cover: 1, imgs: [[1, 'tall']], url: 'timelly.in', live: 'https://timelly.in/', liveName: 'Timelly', links: [['Website', 'https://timelly.in/']], tags: ['Website'] },
  { id: 'tapp', name: 'Timelly SMS', what: 'Timelly’s school management web app.', cat: 'product', logo: 'timelly', url: 'app.timelly.in', live: '', links: [['Open the app', 'https://app.timelly.in/']], tags: ['Web app'] },
  { id: 'deck', name: 'Timelly pitch deck', what: 'An investor pitch deck website for Timelly.', cat: 'design', key: 'deck', cover: 3, imgs: [[3, 'desk'], [1, 'desk'], [2, 'desk']], url: 'pitchdeck.timelly.in', live: 'https://pitchdeck.timelly.in/', liveName: 'Timelly deck', links: [['Open the deck', 'https://pitchdeck.timelly.in/']], tags: ['Pitch deck'] },
  { id: 'booklet', name: 'Timelly booklet', what: 'A printed product booklet for Timelly.', cat: 'design', logo: 'timelly', links: [], tags: ['Print'] },
  { id: 'core', name: 'Ornate Core', what: 'The event management system behind Ornate.', desc: 'Branches, events, schedules and standings for the fest organisers.', cat: 'product', key: 'core', cover: 3, imgs: [[3, 'desk'], [1, 'desk'], [2, 'desk'], [4, 'desk'], [5, 'desk']], url: 'ornate-ems.figma.site', live: 'https://ornate-ems.figma.site/', liveName: 'Ornate Core', links: [['View the design', 'https://ornate-ems.figma.site/']], tags: ['Dashboards'] },
  { id: 'sapience', name: 'Sapience S2P', what: 'Website for an agentic AI platform for enterprises.', desc: 'One platform where AI agents run business processes end to end.', cat: 'web', key: 'sapience', cover: 1, imgs: [[1, 'desk'], [2, 'desk'], [3, 'desk']], url: 'sapiences2p-bice.vercel.app', live: 'https://sapiences2p-bice.vercel.app/', liveName: 'Sapience S2P', links: [['View live', 'https://sapiences2p-bice.vercel.app/']], tags: ['Website', 'AI'] },
  { id: 'lumora', name: 'Lumora Health', what: 'Website for a modern dental clinic.', desc: 'Services, doctors and bookings for a gentle, modern dental practice.', cat: 'web', key: 'lumora', cover: 1, imgs: [[1, 'tall'], [2, 'tall']], url: 'lumora-health-services.vercel.app', live: 'https://lumora-health-services.vercel.app/', liveName: 'Lumora', links: [['View live', 'https://lumora-health-services.vercel.app/']], tags: ['Website', 'Health'] },
  { id: 'billing', name: 'Billing app', what: 'A billing app for local stores, with WhatsApp offers.', desc: 'Today’s revenue, new bills, customers and WhatsApp campaigns in one app.', cat: 'app', key: 'billing', cover: 1, imgs: [[1, 'phone']], url: '', live: '', links: [], tags: ['Mobile', 'WhatsApp'] },
  { id: 'biglogic', name: 'BigLogic.ai', what: 'Website for a US company building AI agents for construction and insurance.', cat: 'web', logo: 'biglogic', url: 'big-logic-d3.vercel.app', live: 'https://big-logic-d3.vercel.app/', liveName: 'BigLogic.ai', links: [['View live', 'https://big-logic-d3.vercel.app/']], tags: ['US client'] },
  { id: 'bookaholic', name: 'Bookaholic', what: 'An online store for e-books.', cat: 'web', logo: 'bookaholic', url: 'bookaholic-main.vercel.app', live: 'https://bookaholic-main.vercel.app/', liveName: 'Bookaholic', links: [['View live', 'https://bookaholic-main.vercel.app/']], tags: ['E-commerce'] },
  { id: 'agencyos', name: 'Agency OS', what: 'Our own platform to run an agency.', cat: 'product', mark: 'Agency OS', url: 'agency-os-oss.vercel.app', live: 'https://agency-os-oss.vercel.app/', liveName: 'Agency OS', links: [['Open the app', 'https://agency-os-oss.vercel.app/'], ['Pitch deck', 'agency-os/']], tags: ['Our product'] },
  { id: 'moodle', name: 'Moodle + hostel system', what: 'Learning platform and hostel system for SSE College, Puttaparthi.', cat: 'product', logo: 'sanskrithi', links: [], tags: ['LMS', 'Hostel'] },
  { id: 'ums', name: 'UMS for SSIT', what: 'University management system design for SSIT.', cat: 'design', mark: 'UMS', links: [], tags: ['Design'] },
  { id: 'sse', name: 'SSE College redesign', what: 'Website redesign for SSE College, Puttaparthi.', cat: 'design', logo: 'sanskrithi', links: [], tags: ['Design'] },
  { id: 'police', name: 'Police dashboard', what: 'Dashboard design for SatyaSai District Police.', cat: 'design', mark: 'Dashboard', links: [], tags: ['Design'] }
];
const FEATURED = ['bk', 'ornate', 'aaravi', 'ngb', 'limitx'];
const byId = id => P.find(p => p.id === id);
const CATS = [['all', 'All'], ['web', 'Websites'], ['product', 'ERPs & products'], ['app', 'Apps'], ['design', 'Design & decks']];
const LOGOS = [['timelly', 'Timelly'], ['bk', 'Beere Kesava Silks'], ['biglogic', 'BigLogic.ai'], ['sanskrithi', 'Sanskrithi Group of Institutions'], ['sapiences2p', 'Sapience S2P'], ['ngb', 'NGB'], ['bookaholic', 'Bookaholic'], ['talentscore', 'Talent Score'], ['shraddha', 'Shraddha'], ['onlyusmedia', 'Only Us Media']];

const CORE = [
  { n: '01', name: 'UI/UX & product design', line: 'Screens your users understand. Research first.', inc: ['User research', 'Clickable prototypes', 'Design systems'], img: IMG('scampus', 2), work: 'S-Campus · Ornate Core', need: 'UI/UX design' },
  { n: '02', name: 'Websites', line: 'Fast, story-led websites that win leads.', inc: ['Brand and story', 'Framer or custom code', 'SEO-ready pages'], img: IMG('aaravi', 4), work: 'Aaravi · NGB · Lumora', need: 'Website' },
  { n: '03', name: 'ERPs, SaaS & dashboards', line: 'Run your whole business from one portal.', inc: ['Role-based portals', 'Reports and approvals', 'WhatsApp and payments'], img: 'img/bk-dash.webp', work: 'Beere Kesava · S-Campus', need: 'ERP or dashboard' },
  { n: '04', name: 'Mobile apps', line: 'One Flutter codebase. Android and iOS.', inc: ['Flutter apps', 'Payments and logins', 'App store launch'], img: IMG('limitx', 1), phone: true, work: 'LimitX · Billing app', need: 'Mobile app' }
];
const ALSO = [['Research & strategy', 'Know the market before you build.'], ['Brand & pitch decks', 'Identity, decks and booklets.'], ['Automation & AI agents', 'n8n flows, WhatsApp and voice agents.'], ['SEO & Meta ads', 'Get found. Get customers.'], ['Hosting & care', 'Domains, uptime, backups, fixes.'], ['Scale & new features', 'Grow the product you already have.']];

/* ---------- Diagrams for our products, process, playbook and pitch ---------- */
const PHASES7 = ['Connect', 'Discover', 'Define', 'Design', 'Build', 'Launch', 'Grow'];
/* A smooth line through points (Catmull-Rom as cubic Béziers) */
const smooth = pts => pts.map(([x, y], i) => {
  if (!i) return `M${x} ${y}`;
  const [x0, y0] = pts[Math.max(0, i - 2)], [x1, y1] = pts[i - 1], [x3, y3] = pts[Math.min(pts.length - 1, i + 1)];
  return `C${(x1 + (x - x0) / 6).toFixed(1)} ${(y1 + (y - y0) / 6).toFixed(1)} ${(x - (x3 - x1) / 6).toFixed(1)} ${(y - (y3 - y1) / 6).toFixed(1)} ${x} ${y}`;
}).join(' ');
const LINE_ICON = {
  yarn: '<circle cx="12" cy="12" r="8"/><path d="M6.5 8c4 1 7.5 5 8.5 11M9.5 4.7c3 2 6 6.5 7 12M5 13.5c3 0 6 2 8 6"/>',
  loom: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 4v16M12 4v16M16 4v16M4 12h16"/>',
  check: '<circle cx="12" cy="12" r="8"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
  tag: '<path d="M4 12V5a1 1 0 0 1 1-1h7l8 8-8 8z"/><circle cx="8.5" cy="8.5" r="1.4"/>'
};
const lineIcon = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${LINE_ICON[k]}</svg>`;
const DG = {
  /* Silk ERP: one gold thread from yarn to sale */
  silk: () => `<div class="dg dg-silk"><div class="dg-silk__top">${CREST}<span>Beere Kesava · Dharmavaram</span></div>
    <b class="dg-silk__h">From yarn <i>to sale.</i></b>
    <div class="dg-silk__thread"><span class="dg-silk__line"></span>${[['yarn', 'Buy yarn'], ['loom', 'Weave'], ['check', 'Check'], ['tag', 'Sell']].map(([k, t], i) => `<span class="dg-silk__node" style="--i:${i}"><i>${lineIcon(k)}</i><em>${t}</em></span>`).join('')}</div></div>`,
  /* Agency OS: three layers on one playbook */
  aos: () => `<div class="dg dg-aos"><div class="dg-aos__brand">${GLYPH}<b>Agency OS</b><em>Three layers, one playbook</em></div>
    <div class="dg-aos__stack">${[['Get found', 'Profiles · Marketplace · Free tools', 'found'], ['Grow', 'Leads · Proposals · Lead → client', 'grow'], ['Deliver & run', 'Projects · Client portal · Finance', 'run'], ['Playbook', 'Sits under all three', 'pb']].map(([t, l, k], i) => `<div class="dg-aos__slab is--${k}" style="--i:${i}"><b>${esc(t)}</b><span>${esc(l)}</span></div>`).join('')}<span class="dg-aos__drop" aria-hidden="true"></span></div></div>`,
  /* S-Campus: one platform, nine portals */
  scampus: () => {
    const roles = ['Admin', 'HOD', 'Faculty', 'Student', 'Parent', 'Exam Cell', 'Finance', 'Warden', 'Driver'];
    const pos = roles.map((_, i) => { const a = (-90 + i * 40) * Math.PI / 180; return [50 + Math.cos(a) * 38, 50 + Math.sin(a) * 36]; });
    return `<div class="dg dg-sc"><svg class="dg-sc__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="50" cy="50" rx="38" ry="36"/>${pos.map(([x, y]) => `<line x1="50" y1="50" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`).join('')}</svg>
      <span class="dg-sc__core"><i>S</i><b>S-Campus</b></span>${roles.map((r, i) => `<span class="dg-sc__node" style="left:${pos[i][0].toFixed(1)}%;top:${pos[i][1].toFixed(1)}%;--i:${i}">${r}</span>`).join('')}</div>`;
  },
  /* Our process: seven phases on one line, with your sign-off at the gates */
  process: () => {
    const pts = [[34, 196], [88, 128], [146, 84], [204, 124], [262, 176], [318, 128], [370, 74]];
    const d = smooth(pts);
    return `<div class="dg dg-proc"><svg viewBox="0 0 400 250" aria-hidden="true">
      <polygon class="dg-proc__dd" points="58,150 146,62 234,150 146,238"/><polygon class="dg-proc__dd is--2" points="178,150 262,66 346,150 262,234"/>
      <path class="dg-proc__track" d="${d}"/><path class="dg-proc__run" d="${d}" pathLength="1"/>
      ${pts.map(([x, y], i) => `<g class="dg-proc__st" style="--i:${i}">${PH[i] && PH[i].gate ? `<path class="dg-proc__flag" d="M${x} ${y - 12}v-17l11 4.5-11 4.5"/>` : ''}<circle cx="${x}" cy="${y}" r="10"/><text x="${x}" y="${y + 3.4}" class="dg-proc__n">${pad(i)}</text><text x="${x}" y="${y + 27}" class="dg-proc__t">${PHASES7[i]}</text></g>`).join('')}
      <circle class="dg-proc__dot" r="5.5"><animateMotion dur="8s" repeatCount="indefinite" path="${d}"/></circle>
      <text x="22" y="32" class="dg-proc__cap">7 phases</text><text x="22" y="48" class="dg-proc__sub">Flags mark your sign-off</text></svg></div>`;
  },
  /* The playbook: the library, fanned out */
  playbook: () => `<div class="dg dg-pb">${[['Process', 7, 'phases'], ['Services', 16, 'routes'], ['Research', 10, 'documents'], ['Prompts', 25, 'ready to copy'], ['Tools', 37, 'in the stack'], ['Knowledge', 17, 'notes']].map(([t, n, l], i) => `<span class="dg-pb__card is--${i}" style="--i:${i}"><em>${t}</em><b class="tnum">${n}</b><small>${l}</small></span>`).join('')}</div>`,
  /* Client pitch: five practices, sixteen services, one team */
  pitch: () => {
    const P5 = [['Brand & strategy', 2], ['Product design', 3], ['Build', 6], ['Automate & AI', 3], ['Grow', 2]];
    const cx = 180, cy = 110, r = 56, C = 2 * Math.PI * r;
    let at = 0, k = 0;
    const arcs = P5.map(([, n], i) => { const len = n / 16 * C, s = at; at += len; return `<circle class="dg-pt__arc is--${i}" cx="${cx}" cy="${cy}" r="${r}" stroke-dasharray="${(len - 3).toFixed(1)} ${C.toFixed(1)}" stroke-dashoffset="${(-s).toFixed(1)}" style="--i:${i}"/>`; }).join('');
    const labels = P5.map(([t, n]) => { const mid = (k + n / 2) / 16 * 2 * Math.PI - Math.PI / 2; k += n; const c = Math.cos(mid); return `<text x="${(cx + c * 94).toFixed(1)}" y="${(cy + Math.sin(mid) * 88 + 3).toFixed(1)}" text-anchor="${c > .2 ? 'start' : c < -.2 ? 'end' : 'middle'}" class="dg-pt__t">${esc(t)}</text>`; }).join('');
    const dots = Array.from({ length: 16 }, (_, i) => { const a = (i + .5) / 16 * 2 * Math.PI - Math.PI / 2; return `<circle class="dg-pt__dot" cx="${(cx + Math.cos(a) * 75).toFixed(1)}" cy="${(cy + Math.sin(a) * 75).toFixed(1)}" r="2.6" style="--i:${i}"/>`; }).join('');
    return `<div class="dg dg-pt"><svg viewBox="0 0 360 220" aria-hidden="true"><g transform="rotate(-90 ${cx} ${cy})">${arcs}</g>${dots}${labels}
      <use href="#i-glyph" x="${cx - 13}" y="${cy - 24}" width="26" height="26" class="dg-pt__glyph"/><text x="${cx}" y="${cy + 19}" class="dg-pt__c">16 services</text></svg></div>`;
  }
};
const RES = [
  { dg: 'process', tag: 'How we work', name: 'Our process', line: 'Seven phases. Your sign-off at every gate.', href: 'pitch/#process', cta: 'See the process' },
  { dg: 'playbook', tag: 'Inside the team', name: 'The playbook', line: 'Every phase has a checklist, files and an exit gate.', href: 'playbook/', cta: 'Open the playbook' },
  { dg: 'pitch', tag: 'For clients', name: 'Client pitch', line: 'What we do, how we work and what you keep.', href: 'pitch/', cta: 'Open the pitch' }
];
const PRODS = [
  { name: 'Silk ERP', from: 'Built for Beere Kesava & Brothers Silks', line: 'Run a textile business from yarn to sale. Six role portals, GST billing, WhatsApp reports.', dg: 'silk', status: 'Live', deck: 'beere-kesava/', p: 'bk' },
  { name: 'Agency OS', from: 'Our own product', line: 'Run a whole agency in one place. Leads, projects, client portals and the playbook.', dg: 'aos', status: 'Live', deck: 'agency-os/', p: 'agencyos' },
  { name: 'S-Campus', from: 'College management SaaS', line: 'Admissions to transport. Nine portals, one platform for the whole college.', dg: 'scampus', status: 'Design ready', p: 'scampus' }
];

const STAGES = [
  { n: '.01', name: 'Project kick-off', line: 'Discovery, research & wireframing', first: 0 },
  { n: '.02', name: 'Design & prototype', line: 'UI design & prototype review', first: 3 },
  { n: '.03', name: 'Build & launch', line: 'Build, test & deployment', first: 4 }
];
const stageOf = i => (i < 3 ? 0 : i === 3 ? 1 : 2);
const TEAM = [
  ['Venkata Leeladhar Abburi', 'Product Designer', 'Founder', 'https://www.linkedin.com/in/venkata-leeladhar-abburi', 'LB3wotBeJ0PdlE3kYB0eQbgqyc.jpeg'],
  ['Swarna Rajasekhar', 'Full Stack Developer', 'CoFounder', 'https://www.linkedin.com/in/swarna-rajasekhar', 'plQmQGE0KIlyPplVY5sqdJxgo.jpeg'],
  ['Sk Mayif', 'Full Stack Developer', 'CoFounder', 'https://www.linkedin.com/in/mayif-shaik-57536a318/', 'dGWrbDADO7DUhfazbIzjJZmWF4.png'],
  ['Chaitanya Alubilli', 'Full Stack Developer', 'CoFounder', 'https://in.linkedin.com/in/chaitanya-alubilli-18a686289', 'rBxB0tSKx3dAoHoY7zdpwgxXiGI.jpeg'],
  ['M. Aravind', 'Full Stack Developer', 'CoFounder', 'https://in.linkedin.com/in/aravind-m-8a010a344', 'CugNVMPBIXfiK4vRYyV6DVC3C38.jpg']
];
const QUOTE = ['They delivered a clean, professional landing page for Timelly faster than expected. The design quality was exactly what we needed to represent our brand.', 'Kartheek Srirama', 'M.D, Vision Triad Technologies', 'AHjHbZTFmQd6KSlMf7CaNtOkUw.png'];
const FAQ = [
  ['What does One Stop Solutions do?', 'We design, build and scale digital products. Websites, ERPs, dashboards, SaaS and mobile apps. For startups, institutions and businesses.'],
  ['How long does a project take?', 'A simple website takes 4–7 days. A full product, design and development, takes 2–8 weeks. It depends on scope.'],
  ['Can you build something like your products for us?', 'Yes. Tell us which one you liked. We build your own version, shaped around how your business works.'],
  ['What if I don’t like the design?', 'We work with you throughout. Every project has revision rounds. We refine until it matches your vision.'],
  ['Do you work outside Andhra Pradesh?', 'Yes. We work fully remote, across India and abroad. Calls, Notion and Figma.'],
  ['Who owns the work?', 'You do. Code, designs and accounts are in your name.']
];

const initials = n => n.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const face = (n, file) => `<span class="face"><b>${initials(n)}</b><img src="${FR}${file}?scale-down-to=512" alt="" loading="lazy" referrerpolicy="no-referrer" data-remote></span>`;
const imgSrc = (p, n) => (typeof n === 'string' ? `img/${n}.webp` : IMG(p.key, n));
const coverKind = p => (p.imgs ? (p.imgs.find(i => i[0] === p.cover) || p.imgs[0])[1] : '');
const thumbOf = p => (p.key ? (coverKind(p) === 'phone' ? `<span class="thumb-phone"><img src="${imgSrc(p, p.cover)}" alt="" loading="lazy"></span>` : `<img src="${imgSrc(p, p.cover)}" alt="" loading="lazy">`) : p.logo ? `<span class="tile is--logo"><img src="img/logo-${p.logo}.webp" alt="" loading="lazy"></span>` : `<span class="tile"><b>${esc(p.mark || p.name)}</b></span>`);
const ext = u => (/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : '');
const arrow = '<svg class="btn__icon" viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg>';

/* A browser frame or phones with the project's own screens */
function shot(p, n, kind, url) {
  const src = imgSrc(p, n);
  if (kind === 'phone') return `<span class="phone"><img src="${src}" alt="" loading="lazy"></span>`;
  const tall = kind === 'tall';
  return `<span class="frame${tall ? ' is--tall' : ''}"><span class="frame__bar"><i></i><i></i><i></i><em>${esc(url || p.url || '')}</em></span><span class="frame__view"><img src="${tall ? IMG(p.key, n, true) : src}" alt="" loading="lazy"></span></span>`;
}
function stage(p) {
  const phones = p.imgs.filter(i => i[1] === 'phone');
  if (phones.length) return `<span class="phones n-${Math.min(phones.length, 3)}">${phones.slice(0, 3).map(([n]) => shot(p, n, 'phone')).join('')}</span>`;
  const [n, kind] = p.imgs.find(i => i[0] === p.cover) || p.imgs[0];
  return shot(p, n, kind);
}

/* ---------- Hero reel and brands ---------- */
function renderReel() {
  const items = P.filter(p => p.key).map(p => `<button class="reel-card" type="button" data-case="${p.id}" tabindex="-1"><span class="reel-card__img">${thumbOf(p)}</span><span class="reel-card__cap"><b>${esc(p.name)}</b><em>${esc(p.what)}</em></span></button>`).join('');
  $('#hero-reel').innerHTML = `<div class="marquee__list">${items}</div><div class="marquee__list" aria-hidden="true">${items}</div>`;
  const logos = LOGOS.map(([k, n]) => `<span class="brand"><img src="img/logo-${k}.webp" alt="${esc(n)}" loading="lazy"></span>`).join('');
  $('#brands').innerHTML = `<div class="marquee__list">${logos}</div><div class="marquee__list" aria-hidden="true">${logos}</div>`;
}

/* ---------- Featured work ---------- */
function renderCases() {
  $('#cases').innerHTML = FEATURED.map((id, i) => {
    const p = byId(id);
    const thumbs = p.imgs.length > 1 ? `<div class="case__thumbs" role="group" aria-label="${esc(p.name)} screens">${p.imgs.slice(0, 6).map(([n, k], j) => `<button type="button" class="case__thumb${j === 0 ? ' is--on' : ''}" data-swap="${id}" data-n="${n}" data-k="${k}" aria-label="Screen ${j + 1}"><img src="${imgSrc(p, n)}" alt="" loading="lazy"></button>`).join('')}</div>` : '';
    return `<article class="case${i % 2 ? ' is--flip' : ''}" data-id="${id}">
      <div class="case__visual"><button class="case__stage" type="button" data-case="${id}" aria-label="Open the ${esc(p.name)} case study" id="stage-${id}"><span class="case__inner">${stage(p)}</span></button>${thumbs}</div>
      <div class="case__text">
        <span class="case__n tnum">${pad(i + 1)}</span>
        <h3 class="h-l">${esc(p.name)}</h3>
        <p class="case__what">${esc(p.what)}</p>
        <p class="p-m case__desc">${esc(p.desc)}</p>
        <ul class="pills">${p.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="btn-row">
          <button class="btn" type="button" data-theme="ink" data-case="${id}"><span class="btn__label">View case study</span></button>
          ${p.live ? `<button class="btn" type="button" data-theme="volt" data-shape="round" data-live="${id}"><span class="btn__label">Live preview</span><svg class="btn__icon" viewBox="0 0 12 12" aria-hidden="true"><use href="#i-play"/></svg></button>` : '<span class="case__soon">Launching soon</span>'}
        </div>
      </div></article>`;
  }).join('');
  $('#allband-thumbs').innerHTML = P.filter(p => p.key && !FEATURED.includes(p.id)).slice(0, 5).map(p => `<span>${thumbOf(p)}</span>`).join('');
}
function swapScreen(b) {
  const p = byId(b.dataset.swap), raw = b.dataset.n, n = /^\d+$/.test(raw) ? +raw : raw;
  $('#stage-' + p.id + ' .case__inner').innerHTML = b.dataset.k === 'phone' ? stage(p) : shot(p, n, b.dataset.k);
  $$(`[data-swap="${p.id}"]`).forEach(x => x.classList.toggle('is--on', x === b));
}

/* ---------- Case study: research to launch ---------- */
const WIRE = {
  site: '<div class="wf wf--site"><i class="wf__nav"></i><div class="wf__hero"><i></i><i></i><i class="s"></i><b></b></div><i class="wf__img"></i><div class="wf__row"><i></i><i></i><i></i></div></div>',
  dash: '<div class="wf wf--dash"><i class="wf__side"></i><div class="wf__main"><i class="wf__nav"></i><div class="wf__row is--k"><i></i><i></i><i></i><i></i></div><i class="wf__tbl"></i><i class="wf__tbl s"></i></div></div>',
  phone: '<div class="wf wf--phone"><i class="wf__nav"></i><i class="wf__card"></i><div class="wf__row"><i></i><i></i><i></i></div><i class="wf__line"></i><i class="wf__line s"></i><i class="wf__tab"></i></div>'
};
function compare(p) {
  const c = p.cs, phone = c.wire === 'phone';
  const [n, k] = p.imgs.find(i => i[0] === p.cover) || p.imgs[0];
  const src = k === 'tall' ? IMG(p.key, n) : imgSrc(p, n);
  return `<div class="cmp${phone ? ' is--phone' : ''}" style="--x:62%"><img src="${src}" alt="Final ${esc(p.name)} screen"><div class="cmp__wire">${WIRE[c.wire]}</div>
    <span class="cmp__tag is--l">Wireframe</span><span class="cmp__tag is--r">Final UI</span><span class="cmp__handle" aria-hidden="true"><i></i></span>
    <input class="cmp__range" type="range" min="0" max="100" value="62" aria-label="Slide between the wireframe and the final screen"></div>`;
}
function caseHTML(p) {
  const c = p.cs, ul = a => `<ul class="ticks">${a.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
  const links = `${p.live ? `<button class="btn" type="button" data-theme="volt" data-live="${p.id}"><span class="btn__label">Live preview</span></button>` : ''}${p.links.map(([l, u]) => `<a class="btn" data-theme="bone" data-shape="round" href="${u}"${ext(u)}><span class="btn__label">${esc(l)}</span>${arrow}</a>`).join('')}`;
  const gal = p.imgs.map(([n, k]) => (k === 'phone' ? shot(p, n, 'phone') : `<span class="cm__shot">${shot(p, n, k)}</span>`)).join('');
  const galBlock = `<section class="cm__sec"><p class="eyebrow cm__k">Screens</p><div class="cm__gal${p.imgs.some(i => i[1] === 'phone') ? ' is--phones' : ''}">${gal}</div></section>`;
  const head = `<div class="cm__head"><div class="tag-pair"><span class="tag">Case study</span>${p.tags.map(t => `<span class="tag" data-theme="haze" data-shape="round">${esc(t)}</span>`).join('')}</div><h2 class="h-l" id="case-title">${esc(p.name)}</h2><p class="cm__what">${esc(p.what)}</p>${p.desc ? `<p class="p-m cm__desc">${esc(p.desc)}</p>` : ''}<div class="btn-row">${links}</div></div>`;
  if (!c) return `<div class="cm">${head}${galBlock}</div>`;
  const step = (n, t, phase, body) => `<section class="cs"><div class="cs__n"><span class="tnum">${n}</span><em>${phase}</em></div><div class="cs__body"><h3 class="h-s">${t}</h3>${body}</div></section>`;
  const fi = FEATURED.indexOf(p.id), prev = byId(FEATURED[(fi + 4) % 5]), next = byId(FEATURED[(fi + 1) % 5]);
  return `<div class="cm">${head}
    <dl class="cm__facts"><div><dt>Client</dt><dd>${esc(p.client)}</dd></div><div><dt>Platform</dt><dd>${esc(p.platform)}</dd></div><div><dt>What we did</dt><dd>${esc(p.scope)}</dd></div><div><dt>Users</dt><dd>${c.users.length} types</dd></div></dl>
    <div class="cm__hero">${stage(p)}</div>
    <section class="cm__challenge"><p class="eyebrow">The challenge</p><p class="h-m">${esc(c.challenge)}</p></section>
    <div class="cs-list">
    ${step('01', 'Research', 'Discover', `<div class="cs__two"><div class="cs__card"><p class="eyebrow">Competitor analysis</p>${ul(c.competitor)}</div><div class="cs__card"><p class="eyebrow">User research</p>${ul(c.research)}</div></div>`)}
    ${step('02', 'Empathy map', 'Discover', `<div class="emp">${[['Says', 0], ['Thinks', 1], ['Does', 2], ['Feels', 3]].map(([t, k]) => `<div class="emp__q"><span class="eyebrow">${t}</span><p>${esc(c.empathy[k])}</p></div>`).join('')}<span class="emp__mid">${esc(c.users[0])}</span></div>`)}
    ${step('03', 'Users and flows', 'Define', `<p class="eyebrow cs__lab">Who uses it</p><ul class="pills">${c.users.map(u => `<li>${esc(u)}</li>`).join('')}</ul><p class="eyebrow cs__lab">Main user flow</p><ol class="flow">${c.flow.map((f, i) => `<li style="--i:${i}"><span class="tnum">${pad(i + 1)}</span>${esc(f)}</li>`).join('')}</ol>`)}
    ${step('04', 'From wireframe to UI', 'Design', `${compare(p)}${ul(c.design)}`)}
    ${step('05', 'Build', 'Build', `<ul class="pills is--dark">${c.stack.map(s => `<li>${esc(s)}</li>`).join('')}</ul>${ul(c.build)}`)}
    ${step('06', 'Test and launch', 'Launch', ul(c.launch))}
    </div>
    <section class="cm__result"><p class="eyebrow">The result</p>${c.result.map(r => `<p class="h-s">${esc(r)}</p>`).join('')}<a class="btn" data-theme="ink" data-shape="round" href="pitch/#process"><span class="btn__label">See our full process</span>${arrow}</a></section>
    ${galBlock}
    <div class="pm__nav"><button class="btn" type="button" data-theme="bone" data-case="${prev.id}"><span class="btn__label">← ${esc(prev.name)}</span></button><button class="btn" type="button" data-theme="volt" data-case="${next.id}"><span class="btn__label">${esc(next.name)} →</span></button></div></div>`;
}
function openCase(id, trigger) {
  const p = byId(id);
  if (!p || !p.key) { if (p && p.live) openLive(id, trigger); return; }
  const body = $('#case-body');
  body.innerHTML = caseHTML(p);
  initButtons(body);
  body.scrollTop = 0;
  $$('.cmp', body).forEach(c => { const r = $('.cmp__range', c); r.addEventListener('input', () => c.style.setProperty('--x', r.value + '%')); });
  const m = $('.modal[data-modal="case"]');
  if (m.dataset.open !== 'true') openModal('case', trigger); else $('.modal__panel', m).focus({ preventScroll: true });
}

/* ---------- All projects ---------- */
let apCat = 'all';
function renderAll() {
  $('#ap-cats').innerHTML = CATS.map(([k, l]) => `<button class="chip" type="button" data-cat="${k}" aria-pressed="${k === apCat}">${l} <span class="tnum">${k === 'all' ? P.length : P.filter(p => p.cat === k).length}</span></button>`).join('');
  $('#ap-grid').innerHTML = P.filter(p => apCat === 'all' || p.cat === apCat).map(p => `<article class="ap__card">
    <button class="ap__img" type="button" ${p.key ? `data-case="${p.id}"` : p.live ? `data-live="${p.id}"` : 'disabled'} aria-label="${esc(p.name)}">${thumbOf(p)}</button>
    <div class="ap__body"><div><h3 class="h-xs">${esc(p.name)}</h3><p class="p-s">${esc(p.what)}</p></div>
    <div class="ap__acts">${p.live ? `<button type="button" class="ap__btn is--live" data-live="${p.id}">Live preview</button>` : ''}${p.key ? `<button type="button" class="ap__btn" data-case="${p.id}">${p.cs ? 'Case study' : 'Screens'}</button>` : ''}${p.links.slice(0, 1).map(([l, u]) => `<a class="ap__btn" href="${u}"${ext(u)}>${esc(l)} ↗</a>`).join('')}${!p.live && !p.key && !p.links.length ? '<span class="ap__btn is--muted">Design · on request</span>' : ''}</div></div></article>`).join('');
}

/* ---------- Live preview: fills the window on every screen ---------- */
let lvMode = 'desk';
function sizeLive() {
  const st = $('#lv-stage'), f = $('#lv-frame iframe');
  if (!f) return;
  const sw = st.clientWidth, sh = st.clientHeight;
  let w, h, s;
  if (lvMode === 'desk') { w = Math.max(sw, 1280); s = sw / w; h = sh / s; }
  else if (sw <= 560) { w = sw; h = sh; s = 1; }
  else { w = 390; h = 844; s = Math.min((sh - 24) / h, 1); }
  f.style.width = w + 'px';
  f.style.height = h + 'px';
  f.style.transform = `translate(-50%,-50%) scale(${s.toFixed(4)})`;
  $('#lv-frame').classList.toggle('is--phone', lvMode === 'phone' && sw > 560);
}
function openLive(id, trigger) {
  const p = byId(id);
  if (!p || !p.live) return;
  lvMode = isMobile() ? 'phone' : 'desk';
  $$('[data-lv]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.lv === lvMode)));
  $('#lv-title').textContent = p.liveName || p.name;
  $('#lv-url').textContent = p.live.replace(/^https?:\/\//, '').replace(/\/$/, '');
  $('#lv-open').href = p.live;
  $('#lv-load').hidden = false;
  $('#lv-frame').innerHTML = `<iframe title="Live preview of ${esc(p.name)}" src="${p.live}" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>`;
  $('#lv-frame iframe').addEventListener('load', () => setTimeout(() => { $('#lv-load').hidden = true; }, 400));
  openModal('live', trigger);
  requestAnimationFrame(() => requestAnimationFrame(sizeLive));
}
function initLive() {
  $('.modal[data-modal="live"]').addEventListener('modal:close', () => { $('#lv-frame').innerHTML = ''; });
  $$('[data-lv]').forEach(b => b.addEventListener('click', () => { lvMode = b.dataset.lv; $$('[data-lv]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); sizeLive(); }));
  window.addEventListener('resize', sizeLive);
}

/* ---------- Services, resources, products ---------- */
function renderServices() {
  $('#core').innerHTML = CORE.map(c => `<article class="svc"><div class="svc__img${c.phone ? ' is--phone' : ''}"><img src="${c.img}" alt="" loading="lazy"></div>
    <div class="svc__body"><div class="svc__head"><span class="svc__n tnum">${c.n}</span><h3 class="h-s">${esc(c.name)}</h3></div><p class="p-m svc__line">${esc(c.line)}</p>
    <ul class="ticks">${c.inc.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
    <div class="svc__foot"><span class="svc__work">Seen in ${esc(c.work)}</span><a class="link-arrow" href="#contact" data-need="${esc(c.need)}">Start this project <svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-r"/></svg></a></div></div></article>`).join('');
  $('#also').innerHTML = ALSO.map(([t, l], i) => `<div class="also__item"><span class="eyebrow tnum">${pad(i + 1)}</span><b>${esc(t)}</b><span>${esc(l)}</span></div>`).join('');
  $('#res').innerHTML = RES.map((r, i) => `<a class="res${i === 1 ? ' is--hot' : ''}" href="${r.href}"><span class="res__view">${DG[r.dg]()}</span><span class="res__body"><span class="eyebrow">${esc(r.tag)}</span><b class="h-s">${esc(r.name)}</b><span class="res__line">${esc(r.line)}</span><span class="res__cta">${esc(r.cta)} <svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-ur"/></svg></span></span></a>`).join('');
  $('#prods').innerHTML = PRODS.map(x => {
    const live = byId(x.p).live;
    return `<article class="prod"><div class="prod__view">${DG[x.dg]()}<span class="tag" data-theme="${x.status === 'Live' ? 'volt' : 'white'}" data-shape="round">${x.status}</span></div>
    <div class="prod__body"><p class="eyebrow">${esc(x.from)}</p><h3 class="h-s">${esc(x.name)}</h3><p class="p-s">${esc(x.line)}</p>
    <div class="prod__acts">${x.deck ? `<a class="btn" data-theme="volt" href="${x.deck}"><span class="btn__label">Open pitch deck</span>${arrow}</a>` : ''}${live ? `<button class="btn" type="button" data-theme="${x.deck ? 'glass' : 'volt'}" data-shape="round" data-live="${x.p}"><span class="btn__label">${x.deck ? 'Preview' : 'Preview the design'}</span></button>` : ''}</div>
    <a class="link-arrow is--light" href="#contact" data-need="Something like your products" data-product="${esc(x.name)}">Build something like this <svg viewBox="0 0 12 12" aria-hidden="true"><use href="#i-arrow-r"/></svg></a></div></article>`;
  }).join('');
}

/* Diagrams come alive in view and rest when they leave it */
function initDiagrams() {
  $$('.dg').forEach(el => {
    const svgs = $$('svg', el).filter(x => x.pauseAnimations);
    if (reduce) { el.classList.add('is--in'); svgs.forEach(x => x.pauseAnimations()); return; }
    onVisible(el, v => {
      if (v) el.classList.add('is--in');
      el.classList.toggle('is--live', v);
      svgs.forEach(x => (v ? x.unpauseAnimations() : x.pauseAnimations()));
    }, { threshold: 0.3 });
  });
}

/* ---------- Process: stages + draggable phase cards ---------- */
const PH = C.phases;
const PHASE_THEME = ['volt', 'dark', 'violet', 'light', 'black', 'volt', 'cloud'];
let phaseActive = -1;
function renderProcess() {
  $('#stages').innerHTML = STAGES.map((s, i) => `<button class="stg" type="button" data-stage="${i}" aria-pressed="${i === 0}"><span class="stg__n tnum">${s.n}</span><span class="eyebrow">${esc(s.name)}</span><b>${esc(s.line)}</b></button>`).join('');
  $('#phase-cards').innerHTML = PH.map((p, i) => `<div class="gslider__item" data-i="${i}"><article class="stage-card is--${PHASE_THEME[i]}" aria-label="Phase ${p.n}: ${esc(p.name)}"><div class="stage-card__top"><div class="tag-pair"><span class="tag">${esc(STAGES[stageOf(i)].name)}</span><span class="tag" data-shape="round">${p.n} / 06</span></div></div><div class="stage-card__num" aria-hidden="true">${p.n}</div><div class="stage-card__body"><h3 class="h-m">${esc(p.name)}</h3><p class="p-m">${esc(p.tag)}. ${esc(p.short)}</p><p class="stage-card__out">${p.gate ? 'Sign-off: ' + esc(p.gate) : PH[i + 1] ? 'Flows into ' + esc(PH[i + 1].name) : 'Ongoing. Reviewed every quarter.'}</p></div></article></div>`).join('');
}
function setPhase(i) {
  if (i === phaseActive) return;
  phaseActive = i;
  const p = PH[i];
  const lane = (label, items, cls = '') => `<div class="sd__lane ${cls}"><h4>${label}</h4><ul class="dl">${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
  $('#phase-detail').innerHTML = `<div class="sd"><div class="sd__head"><span class="sd__num">${p.n} / 06</span><h3 class="h-m">${esc(p.name)}</h3><p class="sd__out">${esc(p.intro)}</p></div><div class="sd__lanes">${lane('We do', p.do)}${lane('You get', p.get, 'is--get')}${lane('We need from you', p.need)}<div class="sd__lane is--kb"><h4>Your sign-off</h4><p class="h-xs">${esc(p.gate || 'Ongoing care')}</p></div></div></div>`;
  $$('#stages [data-stage]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.stage === stageOf(i))));
  $$('#phase-cards .gslider__item').forEach((it, k) => it.setAttribute('aria-current', k === i ? 'true' : 'false'));
}
function initPhaseSlider() {
  const coll = $('#process .gslider__collection'), list = $('#phase-cards'), items = $$('.gslider__item', list), N = items.length;
  let snaps = [], current = 0, move = () => {};
  const go = i => { i = clamp(i, 0, N - 1); setPhase(i); current = i; move(i); };
  coll.setAttribute('tabindex', '0');
  coll.setAttribute('aria-label', 'Phases. Use left and right arrow keys.');
  coll.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); } });
  $('#stages').addEventListener('click', e => { const b = e.target.closest('[data-stage]'); if (b) go(STAGES[+b.dataset.stage].first); });
  setPhase(0);
  if (!hasG || !window.Draggable) {
    move = i => { const it = items[i]; coll.scrollTo({ left: it.offsetLeft + it.offsetWidth / 2 - coll.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' }); };
    items.forEach((it, i) => it.addEventListener('click', () => go(i)));
    return;
  }
  const measure = () => { const cw = coll.clientWidth; snaps = items.map(it => cw / 2 - (it.offsetLeft + it.offsetWidth / 2)); };
  const render = () => {
    const x = gsap.getProperty(list, 'x'), cw = coll.clientWidth;
    items.forEach(it => {
      const d = (it.offsetLeft + it.offsetWidth / 2 + x - cw / 2) / (it.offsetWidth + 20);
      const a = clamp(d * 7.5, -36, 36), y = (1 - Math.cos(a * Math.PI / 180)) * it.offsetWidth * 4.2;
      it.style.transform = `translate3d(0,${y.toFixed(1)}px,0) rotate(${a.toFixed(2)}deg)`;
    });
  };
  const nearest = x => { let best = 0, bd = 1e9; snaps.forEach((s, i) => { const d = Math.abs(s - x); if (d < bd) { bd = d; best = i; } }); return best; };
  move = i => gsap.to(list, { x: snaps[i], duration: reduce ? 0 : 1, ease: 'expo.out', onUpdate: render, overwrite: true });
  measure(); gsap.set(list, { x: snaps[0] }); render();
  let dragged = false;
  const drag = Draggable.create(list, {
    type: 'x', inertia: hasInertia, edgeResistance: 0.82, bounds: { minX: snaps[N - 1], maxX: snaps[0] },
    snap: hasInertia ? { x: v => snaps[nearest(v)] } : undefined, zIndexBoost: false, allowContextMenu: true,
    onPress() { dragged = false; gsap.killTweensOf(list); },
    onDrag() { dragged = true; render(); const i = nearest(this.x); if (i !== current) { current = i; setPhase(i); } },
    onThrowUpdate() { render(); const i = nearest(this.x); if (i !== current) { current = i; setPhase(i); } },
    onRelease() { if (!hasInertia && dragged) { const i = nearest(this.x); current = i; setPhase(i); move(i); } },
    onClick(e) { if (dragged) return; const it = e.target.closest('.gslider__item'); if (it) go(+it.dataset.i); }
  })[0];
  window.addEventListener('resize', () => { measure(); drag.applyBounds({ minX: snaps[N - 1], maxX: snaps[0] }); gsap.set(list, { x: snaps[current] }); render(); });
}

/* ---------- Proof, team, FAQ ---------- */
function renderPeople() {
  $('#quote-text').textContent = '“' + QUOTE[0] + '”';
  $('#quote-name').textContent = QUOTE[1];
  $('#quote-role').textContent = QUOTE[2];
  $('[data-face]').outerHTML = face(QUOTE[1], QUOTE[3]);
  $('#crew').innerHTML = TEAM.map(([n, r, t, li, f], i) => `<article class="mate${i === 0 ? ' is--lead' : ''}"><span class="mate__photo">${face(n, f)}</span><div class="mate__body"><span class="tag" data-theme="${i ? 'glass' : 'volt'}" data-shape="round">#${esc(t)}</span><h3 class="h-xs">${esc(n)}</h3><p class="p-s">${esc(r)}</p><a class="mate__in" href="${li}" target="_blank" rel="noopener" aria-label="${esc(n)} on LinkedIn">in</a></div></article>`).join('');
  $('#faq-list').innerHTML = FAQ.map(([q, a], i) => `<details class="qa"${i === 0 ? ' open' : ''}><summary><span class="tnum">${pad(i + 1)}</span><b>${esc(q)}</b><i aria-hidden="true"></i></summary><p>${esc(a)}</p></details>`).join('');
  $$('[data-count-all]').forEach(e => { e.textContent = String(P.length); });
  $$('[data-year]').forEach(e => { e.textContent = String(new Date().getFullYear()); });
}
function initImages() {
  $$('img[data-remote]').forEach(img => {
    const ok = () => img.classList.add('is--ok'), bad = () => img.remove();
    if (img.complete) { if (img.naturalWidth) ok(); else bad(); }
    img.addEventListener('load', ok); img.addEventListener('error', bad);
  });
}

/* ---------- The brief: a short chat that draws your project map, saved to our leads ---------- */
const ICON = {
  web: '<rect x="3" y="5" width="26" height="22" rx="3"/><path d="M3 11h26M8 8h.01M12 8h.01"/>',
  erp: '<rect x="4" y="4" width="10" height="10" rx="2"/><rect x="18" y="4" width="10" height="10" rx="2"/><rect x="4" y="18" width="10" height="10" rx="2"/><path d="M18 23h10M23 18v10"/>',
  saas: '<path d="M16 4 28 10 16 16 4 10z"/><path d="M4 16l12 6 12-6M4 22l12 6 12-6"/>',
  app: '<rect x="9" y="3" width="14" height="26" rx="3"/><path d="M14 25h4"/>',
  ux: '<path d="M6 26l4-1 15-15-3-3L7 22z"/><path d="M19 10l3 3"/>',
  prod: '<path d="M16 3 28 9v14L16 29 4 23V9z"/><path d="M4 9l12 6 12-6M16 15v14"/>',
  brand: '<path d="M16 4l3.6 7.4 8.1 1.2-5.9 5.7 1.4 8.1L16 22.6l-7.2 3.8 1.4-8.1-5.9-5.7 8.1-1.2z"/>',
  unsure: '<circle cx="16" cy="16" r="12"/><path d="M12.5 12.5a3.6 3.6 0 1 1 5 3.3c-1 .5-1.5 1.2-1.5 2.2v1M16 23h.01"/>'
};
const STEPS = [
  { id: 'needs', label: 'What', q: 'Hi! What are we building together?', hint: 'Pick all that apply.', multi: true, opts: [['Website', 'web'], ['ERP or dashboard', 'erp'], ['SaaS or web app', 'saas'], ['Mobile app', 'app'], ['UI/UX design', 'ux'], ['Something like your products', 'prod'], ['Brand or pitch deck', 'brand'], ['Not sure yet', 'unsure']] },
  { id: 'stage', label: 'Stage', q: 'Nice. Where are you today?', opts: [['Just an idea'], ['I have designs'], ['I have a product to improve'], ['I need it live fast']] },
  { id: 'when', label: 'Launch', q: 'When do you want to launch?', opts: [['As soon as possible'], ['In 1–2 months'], ['In 3+ months'], ['Just exploring']] },
  { id: 'message', label: 'About', q: 'Tell us a little about it. Who is it for, and what should it do?', type: 'text', prompts: ['It’s for…', 'It should help people…', 'A site or app we like:'] },
  { id: 'contact', label: 'You', q: 'Last one. Where can we reach you?', type: 'contact' }
];
/* Which of the seven phases a project goes through, by where it starts */
const STAGE_PATH = { 'Just an idea': [0, 1, 2, 3, 4, 5, 6], 'I have designs': [0, 4, 5, 6], 'I have a product to improve': [0, 1, 3, 4, 5, 6], 'I need it live fast': [0, 3, 4, 5] };
const EMPTY = { needs: [], stage: '', when: '', message: '', name: '', phone: '', email: '', company: '' };
const brief = { ...EMPTY, needs: [] };
let qStep = 0, sending = false, done = false, asking = 0;
const chatLog = () => $('#chat-log'), dock = () => $('#chat-dock');
const DAY = '<p class="chat__day">Today</p>';
function timeHint() {
  const big = ['ERP or dashboard', 'SaaS or web app', 'Mobile app', 'Something like your products'];
  if (brief.needs.some(n => big.includes(n))) return 'Typical time: 2–8 weeks for a full product.';
  if (brief.needs.includes('Website')) return 'Typical time: 4–7 days for a simple website.';
  return '';
}
const SHORT = { 'ERP or dashboard': 'ERP / dashboard', 'SaaS or web app': 'SaaS / web app', 'Something like your products': 'Like your products', 'Brand or pitch deck': 'Brand / deck' };
/* Keep every node inside the map, and draw its line from the centre */
function placeNodes(fresh = []) {
  const wrap = $('#pmap-nodes'), W = wrap.parentNode.clientWidth;
  const nodes = $$('.pmap__node[data-v]', wrap);
  if (!W) return;
  $('#pmap-lines').innerHTML = nodes.map(el => {
    const half = el.offsetWidth / 2, x = clamp(+el.dataset.x / 100 * W, half + 6, W - half - 6);
    el.style.left = x + 'px';
    el.style.top = el.dataset.y + '%';
    return `<line x1="50" y1="50" x2="${(x / W * 100).toFixed(1)}" y2="${el.dataset.y}"${fresh.includes(el.dataset.v) ? ' class="is--new"' : ''}/>`;
  }).join('');
}
function paintMap() {
  const needs = brief.needs, n = needs.length;
  const narrow = $('.pmap__orbit').clientWidth < 480, rx = narrow ? 34 : 36, ry = narrow ? 37 : 33;
  const pos = needs.map((_, i) => { const a = ((n < 3 ? 0 : -90) + i * 360 / n) * Math.PI / 180; return [50 + Math.cos(a) * rx, 50 + Math.sin(a) * ry]; });
  const iconOf = v => (STEPS[0].opts.find(o => o[0] === v) || [])[1] || 'unsure';
  const wrap = $('#pmap-nodes'), fresh = [];
  if (!n) {
    wrap.innerHTML = [[14, 50], [86, 50], [50, 12]].map(([x, y]) => `<span class="pmap__node is--ghost" style="left:${x}%;top:${y}%">?</span>`).join('');
  } else {
    $$('.is--ghost', wrap).forEach(g => g.remove());
    const have = new Map($$('.pmap__node', wrap).map(el => [el.dataset.v, el]));
    have.forEach((el, v) => { if (!needs.includes(v)) el.remove(); });
    needs.forEach((v, i) => {
      let el = have.get(v);
      if (el) el.classList.remove('is--new');
      else {
        el = document.createElement('span');
        el.className = 'pmap__node is--new';
        el.dataset.v = v;
        el.innerHTML = `<svg viewBox="0 0 32 32" aria-hidden="true">${ICON[iconOf(v)]}</svg>${esc(SHORT[v] || v)}`;
        wrap.appendChild(el);
        fresh.push(v);
      }
      el.dataset.x = pos[i][0].toFixed(1);
      el.dataset.y = pos[i][1].toFixed(1);
    });
  }
  placeNodes(fresh);
  $('#pmap-name').textContent = brief.company || (brief.name ? brief.name.split(' ')[0] + '’s project' : 'Your project');
  const on = STAGE_PATH[brief.stage] || [];
  $$('#pmap-path li').forEach((li, i) => { li.classList.toggle('is--on', on.includes(i)); li.classList.toggle('is--first', on[0] === i); });
  const flag = $('#pmap-flag');
  flag.textContent = brief.when ? 'Launch · ' + brief.when : 'Launch';
  flag.classList.toggle('is--set', !!brief.when);
  $('#pmap-est').textContent = timeHint() || (n ? 'We plan the timeline with you.' : 'Your timeline appears as you answer.');
  $('#pmap-about').textContent = brief.message ? '“' + brief.message.trim().slice(0, 90) + (brief.message.trim().length > 90 ? '…”' : '”') : '';
}
function scrollLog() { const l = chatLog(); l.scrollTo({ top: l.scrollHeight, behavior: reduce ? 'auto' : 'smooth' }); }
function say(html, who = 'bot') { const m = document.createElement('div'); m.className = 'msg is--' + who; m.innerHTML = html; chatLog().appendChild(m); scrollLog(); return m; }
function botSay(html) {
  return new Promise(res => {
    if (reduce) { say(html); res(); return; }
    const t = say('<i></i><i></i><i></i>', 'typing');
    setTimeout(() => { t.remove(); say(html); res(); }, 700);
  });
}
function paintSteps() {
  $$('#chat-steps li').forEach((li, i) => { li.classList.toggle('is--on', i === qStep && !done); li.classList.toggle('is--done', done || i < qStep); });
  $('[data-chat-reset]').hidden = qStep === 0 && !done;
}
function dockHTML(s) {
  if (s.opts) {
    const val = brief[s.id];
    return `<div class="chat__opts${s.multi ? '' : ' is--one'}">${s.opts.map(([label, ic]) => {
      const on = s.multi ? val.includes(label) : val === label;
      return `<button type="button" class="chat__opt" data-v="${esc(label)}" aria-pressed="${on}">${ic ? `<svg viewBox="0 0 32 32" aria-hidden="true">${ICON[ic]}</svg>` : ''}<span>${esc(label)}</span></button>`;
    }).join('')}</div>${s.multi ? `<div class="chat__send"><span class="chat__hint">${esc(timeHint())}</span><button class="btn" type="submit" data-theme="volt"${val.length ? '' : ' disabled'}><span class="btn__label">Continue</span>${arrow}</button></div>` : ''}`;
  }
  if (s.type === 'text') {
    return `<textarea class="chat__ta" name="message" rows="3" maxlength="2000" aria-label="About your project" placeholder="We run a … and want to …">${esc(brief.message)}</textarea>
      <div class="chat__prompts">${s.prompts.map(t => `<button type="button" class="chat__chip" data-prompt="${esc(t)}">+ ${esc(t)}</button>`).join('')}</div>
      <div class="chat__send"><button type="button" class="chat__skip" data-skip>Skip</button><button class="btn" type="submit" data-theme="volt"><span class="btn__label">Send</span>${arrow}</button></div>`;
  }
  const f = (name, label, type, ac, ph) => `<label class="chat__f"><span>${label}</span><input name="${name}" type="${type}" autocomplete="${ac}" placeholder="${ph}" value="${esc(brief[name])}" maxlength="${name === 'phone' ? 30 : 120}"></label>`;
  return `<div class="chat__fields">${f('name', 'Your name', 'text', 'name', 'Full name')}${f('company', 'Company', 'text', 'organization', 'Optional')}${f('phone', 'Phone / WhatsApp', 'tel', 'tel', '+91')}${f('email', 'Email', 'email', 'email', 'you@company.com')}</div>
    <label class="chat__hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
    <p class="chat__err" role="alert" id="chat-err"></p>
    <div class="chat__send"><span class="chat__hint">A name, plus a phone number or email.</span><button class="btn" type="submit" data-theme="volt"><span class="btn__label">Send my brief</span>${arrow}</button></div>`;
}
async function ask(i) {
  const me = ++asking;
  qStep = i; paintSteps();
  dock().innerHTML = '';
  const s = STEPS[i];
  await botSay(`${esc(s.q)}${s.hint ? `<small>${esc(s.hint)}</small>` : ''}`);
  if (me !== asking) return;
  dock().innerHTML = dockHTML(s);
  initButtons(dock());
  scrollLog();
  const f = $('.chat__opt, textarea, input', dock());
  if (f && i > 0 && !isMobile() && chatLog().getBoundingClientRect().top < innerHeight) f.focus({ preventScroll: true });
}
const answer = text => say(esc(text), 'me');
function waText() {
  return ['Hi One Stop Solutions,', brief.message || 'I have a project in mind.', brief.needs.length ? 'Building: ' + brief.needs.join(', ') : '', brief.stage ? 'Stage: ' + brief.stage : '', brief.when ? 'Launch: ' + brief.when : '', brief.name ? 'Name: ' + brief.name : ''].filter(Boolean).join('\n');
}
async function sendBrief(form) {
  const v = k => String(new FormData(form).get(k) || '').trim();
  ['name', 'company', 'phone', 'email'].forEach(k => { brief[k] = v(k); });
  paintMap();
  const err = $('#chat-err');
  if (!brief.name) { err.textContent = 'Please add your name.'; return; }
  if (!brief.phone && !brief.email) { err.textContent = 'Please add a phone number or email, so we can reply.'; return; }
  if (brief.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email)) { err.textContent = 'That email doesn’t look right.'; return; }
  if (sending) return;
  sending = true; err.textContent = ''; form.classList.add('is--sending');
  let ok = false, msg = '';
  try {
    const r = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...brief, website: v('website') }) });
    ok = r.ok;
    if (!ok) msg = (await r.json().catch(() => ({}))).error || '';
  } catch (e) { msg = ''; }
  sending = false; form.classList.remove('is--sending');
  if (!ok) {
    err.innerHTML = `${esc(msg || 'We couldn’t send your brief just now.')} <a href="https://wa.me/${WA}?text=${encodeURIComponent(waText())}" target="_blank" rel="noopener">Send it on WhatsApp instead →</a>`;
    return;
  }
  done = true; paintSteps();
  answer([brief.name, brief.phone || brief.email].join(' · '));
  dock().innerHTML = '';
  $('#pmap').classList.add('is--sent');
  await botSay(`Thanks, ${esc(brief.name.split(' ')[0])}. Your brief is with us.<ol class="msg__then"><li><b>01</b>We read your brief.</li><li><b>02</b>We call you to talk it through.</li><li><b>03</b>You get a clear plan and timeline.</li></ol>`);
  dock().innerHTML = `<div class="chat__send is--end"><button class="btn" type="button" data-theme="ink" data-shape="round" data-chat-reset-btn><span class="btn__label">Send another brief</span></button><a class="btn" data-theme="bone" data-shape="round" href="#work"><span class="btn__label">Look at our work</span></a></div>`;
  initButtons(dock());
  scrollLog();
}
function resetChat() {
  Object.assign(brief, EMPTY, { needs: [] });
  done = false; chatLog().innerHTML = DAY;
  $('#pmap').classList.remove('is--sent');
  paintMap(); ask(0);
}
function initBrief() {
  const d = dock();
  d.addEventListener('click', e => {
    const o = e.target.closest('.chat__opt');
    if (o) {
      const s = STEPS[qStep], v = o.dataset.v;
      if (s.multi) {
        brief.needs = brief.needs.includes(v) ? brief.needs.filter(x => x !== v) : brief.needs.concat(v);
        o.setAttribute('aria-pressed', String(brief.needs.includes(v)));
        $('.chat__send .btn', d).disabled = !brief.needs.length;
        $('.chat__hint', d).textContent = timeHint();
        paintMap();
      } else {
        brief[s.id] = v;
        $$('.chat__opt', d).forEach(x => { x.setAttribute('aria-pressed', String(x === o)); x.disabled = true; });
        paintMap(); answer(v);
        ask(qStep + 1);
      }
      return;
    }
    const pr = e.target.closest('[data-prompt]');
    if (pr) { const ta = $('textarea', d); ta.value = (ta.value.trim() ? ta.value.trim() + '\n' : '') + pr.dataset.prompt + ' '; ta.focus(); ta.dispatchEvent(new Event('input', { bubbles: true })); return; }
    if (e.target.closest('[data-skip]')) { brief.message = ''; paintMap(); answer('Skip for now'); ask(4); return; }
    if (e.target.closest('[data-chat-reset-btn]')) resetChat();
  });
  d.addEventListener('input', e => {
    const er = $('#chat-err', d); if (er && er.textContent) er.textContent = '';
    if (e.target.name === 'message') { brief.message = e.target.value; paintMap(); }
    else if (['name', 'company'].includes(e.target.name)) { brief[e.target.name] = e.target.value; paintMap(); }
  });
  d.addEventListener('submit', e => {
    e.preventDefault();
    const s = STEPS[qStep];
    if (s.multi) { if (!brief.needs.length) return; answer(brief.needs.join(', ')); ask(1); }
    else if (s.type === 'text') { answer(brief.message.trim() || 'Skip for now'); ask(4); }
    else if (s.type === 'contact') sendBrief(d);
  });
  $('[data-chat-reset]').addEventListener('click', resetChat);
  /* "Start this project" and "Build something like this" pre-fill the first answer */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-need]');
    if (!a || done) return;
    if (!brief.needs.includes(a.dataset.need)) brief.needs = brief.needs.concat(a.dataset.need);
    if (a.dataset.product && !brief.message) brief.message = `I’d like something like your ${a.dataset.product}.`;
    if (qStep === 0 && $('.chat__opts', d)) { d.innerHTML = dockHTML(STEPS[0]); initButtons(d); }
    paintMap();
  });
  $('#pmap-date').textContent = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  window.addEventListener('resize', () => requestAnimationFrame(paintMap));
  paintMap(); paintSteps();
  chatLog().innerHTML = DAY;
  /* Start the chat when the section comes into view */
  onVisible($('#contact'), (v, io) => { if (v) { io.disconnect(); ask(0); } }, { threshold: 0.15 });
}

/* ---------- Leads: footer button, code, list ---------- */
let leadsCode = '', leads = [], leadsQ = '';
const LOCK = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
async function leadsApi(method, q = '') {
  const r = await fetch('/api/leads' + q, { method, headers: { 'X-Leads-Code': leadsCode } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error(j.error || 'Could not reach the leads service.'); e.status = r.status; throw e; }
  return j;
}
function lockView(msg = '') {
  $('#leads-body').innerHTML = `<form class="lk" id="lk-form" novalidate><span class="lk__icon">${LOCK}</span><h2 class="h-m" id="leads-title">Leads</h2><p class="p-m">Enter your 6-digit code to see every brief.</p>
    <label class="lk__code"><input id="lk-code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]*" aria-label="6-digit code" data-autofocus><span class="lk__boxes" aria-hidden="true">${'<i></i>'.repeat(6)}</span></label>
    <p class="lk__err" role="alert">${esc(msg)}</p><button class="btn" type="submit" data-theme="volt" data-size="l"><span class="btn__label">Unlock</span></button></form>`;
  initButtons($('#leads-body'));
  const inp = $('#lk-code'), boxes = $$('.lk__boxes i');
  const paint = () => boxes.forEach((b, i) => { b.textContent = inp.value[i] || ''; b.classList.toggle('is--on', i === Math.min(inp.value.length, 5)); });
  inp.addEventListener('input', () => { inp.value = inp.value.replace(/\D/g, '').slice(0, 6); paint(); if (inp.value.length === 6) unlock(inp.value); });
  $('#lk-form').addEventListener('submit', e => { e.preventDefault(); unlock(inp.value); });
  paint();
  setTimeout(() => inp.focus({ preventScroll: true }), 80);
}
async function unlock(code) {
  if (!/^\d{6}$/.test(code)) { $('.lk__err').textContent = 'Enter all 6 digits.'; return; }
  leadsCode = code;
  $('.lk__err').textContent = 'Checking…';
  try { leads = (await leadsApi('GET')).leads || []; listView(); }
  catch (e) {
    leadsCode = '';
    const form = $('#lk-form');
    if (form) { form.classList.remove('is--shake'); void form.offsetWidth; form.classList.add('is--shake'); $('#lk-code').value = ''; $('#lk-code').dispatchEvent(new Event('input')); }
    $('.lk__err').textContent = e.status === 401 ? 'Wrong code. Try again.' : e.message;
  }
}
const ago = iso => { const s = (Date.now() - new Date(iso)) / 1000; return s < 60 ? 'just now' : s < 3600 ? Math.floor(s / 60) + ' min ago' : s < 86400 ? Math.floor(s / 3600) + ' h ago' : Math.floor(s / 86400) + ' d ago'; };
function leadCard(l) {
  const when = new Date(l.at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
  const wa = l.phone ? `https://wa.me/${l.phone.replace(/\D/g, '').replace(/^(?=\d{10}$)/, '91')}` : '';
  return `<article class="ldc"><div class="ldc__top"><div><b>${esc(l.name)}</b>${l.company ? `<span>${esc(l.company)}</span>` : ''}</div><time datetime="${esc(l.at)}">${esc(when)} · ${ago(l.at)}</time></div>
    <div class="ldc__contact">${l.phone ? `<a href="tel:${esc(l.phone.replace(/[^\d+]/g, ''))}">${esc(l.phone)}</a><a href="${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}${l.email ? `<a href="mailto:${esc(l.email)}">${esc(l.email)}</a>` : ''}</div>
    ${l.needs && l.needs.length ? `<ul class="pills">${l.needs.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
    <dl class="ldc__meta">${l.stage ? `<div><dt>Stage</dt><dd>${esc(l.stage)}</dd></div>` : ''}${l.when ? `<div><dt>Launch</dt><dd>${esc(l.when)}</dd></div>` : ''}</dl>
    ${l.message ? `<p class="ldc__msg">${esc(l.message)}</p>` : ''}
    <button type="button" class="ldc__del" data-del="${esc(l.id)}">Delete</button></article>`;
}
function listView() {
  const q = leadsQ.toLowerCase();
  const shown = leads.filter(l => !q || JSON.stringify(l).toLowerCase().includes(q));
  $('#leads-body').innerHTML = `<div class="ld"><div class="ld__head"><h2 class="h-m" id="leads-title">Leads <span class="tnum">(${leads.length})</span></h2>
    <div class="ld__tools"><input type="search" class="ld__search" placeholder="Search name, need, message" value="${esc(leadsQ)}" aria-label="Search leads"><button type="button" class="ap__btn" data-ld="refresh">Refresh</button><button type="button" class="ap__btn" data-ld="csv">Export CSV</button><button type="button" class="ap__btn is--live" data-ld="lock">Lock</button></div></div>
    <div class="ld__list">${shown.length ? shown.map(leadCard).join('') : `<p class="ld__empty">${leads.length ? 'No leads match your search.' : 'No leads yet. Briefs from the website appear here.'}</p>`}</div></div>`;
  const s = $('.ld__search');
  s.addEventListener('input', () => { leadsQ = s.value; const pos = s.selectionStart; listView(); const n = $('.ld__search'); n.focus(); n.setSelectionRange(pos, pos); });
}
function csv() {
  const cols = ['at', 'name', 'company', 'phone', 'email', 'needs', 'stage', 'when', 'message'];
  const cell = v => `"${String(Array.isArray(v) ? v.join('; ') : v || '').replace(/"/g, '""')}"`;
  const text = [cols.join(','), ...leads.map(l => cols.map(c => cell(l[c])).join(','))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + text], { type: 'text/csv' }));
  a.download = `onestop-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
}
function initLeads() {
  document.addEventListener('click', async e => {
    if (e.target.closest('[data-leads-open]')) { if (leadsCode) listView(); else lockView(); openModal('leads', e.target.closest('[data-leads-open]')); return; }
    const t = e.target.closest('[data-ld]');
    if (t) {
      const a = t.dataset.ld;
      if (a === 'lock') { leadsCode = ''; leads = []; leadsQ = ''; lockView(); }
      if (a === 'csv') csv();
      if (a === 'refresh') { try { leads = (await leadsApi('GET')).leads || []; listView(); toast('Leads refreshed'); } catch (err) { toast(err.message); } }
      return;
    }
    const d = e.target.closest('[data-del]');
    if (d) {
      if (!window.confirm('Delete this lead? This cannot be undone.')) return;
      try { await leadsApi('DELETE', '?id=' + encodeURIComponent(d.dataset.del)); leads = leads.filter(l => l.id !== d.dataset.del); listView(); toast('Lead deleted'); } catch (err) { toast(err.message); }
    }
  });
}

/* ---------- Clicks, motion ---------- */
function initClicks() {
  document.addEventListener('click', e => {
    const lv = e.target.closest('[data-live]');
    if (lv) { e.preventDefault(); openLive(lv.dataset.live, lv); return; }
    const sw = e.target.closest('[data-swap]');
    if (sw) { swapScreen(sw); return; }
    const c = e.target.closest('[data-case]');
    if (c) { e.preventDefault(); openCase(c.dataset.case, c); return; }
    const all = e.target.closest('[data-all-open]');
    if (all) { setNav(false); closeModal($('.modal[data-modal="case"]')); renderAll(); openModal('all', all); return; }
    const cat = e.target.closest('[data-cat]');
    if (cat) { apCat = cat.dataset.cat; renderAll(); }
  });
}
function initHero() {
  if (!hasG || reduce) return;
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.nav__bar', { yPercent: -120, duration: 1.1 }, 0)
    .from('[data-hero-word]', { yPercent: 105, duration: 1.4 }, 0.1)
    .from('[data-hero-fade]', { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.4)
    .from('.oh__reel', { y: 80, autoAlpha: 0, duration: 1.4 }, 0.5);
}
/* Case visuals tilt toward the pointer and drift on scroll */
function initDepth() {
  if (reduce) return;
  if (finePointer) $$('.case__stage, .res, .prod').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--ry', (x * 6).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg');
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--ry', '0deg'); el.style.setProperty('--rx', '0deg'); });
  });
  if (hasG && window.ScrollTrigger) $$('.case__inner').forEach(el => gsap.fromTo(el, { yPercent: 7 }, { yPercent: -7, ease: 'none', scrollTrigger: { trigger: el.closest('.case'), start: 'top bottom', end: 'bottom top', scrub: true } }));
}

/* ---------- Boot ---------- */
safe('render', () => { renderReel(); renderCases(); renderServices(); renderProcess(); renderPeople(); renderAll(); });
safe('diagrams', initDiagrams);
safe('images', initImages);
safe('buttons', () => initButtons());
safe('lenis', initLenis);
safe('nav', initNav);
safe('events', initGlobalEvents);
safe('clicks', initClicks);
safe('live', initLive);
safe('phases', initPhaseSlider);
safe('brief', initBrief);
safe('leads', initLeads);
safe('copy', initCopy);
safe('cursor', () => initCursor('.case__stage, .ap__img:not([disabled]), .reel-card'));
safe('hero', initHero);
safe('depth', initDepth);
safe('reveals', initReveals);
if (hasG && window.ScrollTrigger) window.addEventListener('load', () => ScrollTrigger.refresh());
