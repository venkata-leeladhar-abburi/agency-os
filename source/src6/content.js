/* ===== Pharmacy OS pitch. Every line is short on purpose. Store, medicine and people names inside the screens are samples.
   Facts carry a source id (see C.sources). Estimates are marked as estimates where they appear. ===== */
const C = {
  acts: [
    { id: 'buy', name: 'Buy', sub: 'From the distributor' },
    { id: 'stock', name: 'Stock', sub: 'Onto the shelf' },
    { id: 'sell', name: 'Sell', sub: 'At the counter' },
    { id: 'grow', name: 'Grow', sub: 'They come back' }
  ],

  /* The one flow: a strip of tablets, from order to refill */
  steps: [
    { id: 'order', n: '01', act: 'buy', name: 'Order', icon: 'list', vis: 'order', zoom: [2.05, 0.36, 0.2],
      line: 'Low stock turns into an order. Pick, don’t type.',
      who: 'Owner or purchase staff', what: ['“To order” list fills itself', 'Type three letters, pick from your history', 'A new medicine is saved for next time'],
      today: 'Want list in a notebook', gives: 'A medicine is typed once, ever' },
    { id: 'send', n: '02', act: 'buy', name: 'Send', icon: 'send', vis: 'send', zoom: [1.3, 0.03, 0.62],
      line: 'The distributor gets it on WhatsApp. No login.',
      who: 'Distributor', what: ['Order as a message, a PDF and a link', 'They mark what they can supply', 'Their bill file or photo comes back on the same link'],
      today: 'Calls, chats and three ordering apps', gives: 'Works with every distributor from day one' },
    { id: 'check', n: '03', act: 'stock', name: 'Check', icon: 'ticks', vis: 'check', zoom: [1.7, 0.5, 0.55],
      line: 'Goods arrive. Tick what came. Don’t type.',
      who: 'Whoever opens the carton', what: ['Your own order is already on screen', 'Short supply and swaps stand out', 'Scan the pack for batch and expiry'],
      today: 'Every line typed again from the paper bill', gives: 'A 40-line bill checked in two minutes' },
    { id: 'shelf', n: '04', act: 'stock', name: 'Stock', icon: 'box', vis: 'stock', zoom: [1.9, 0.42, 0.3],
      line: 'One tap. On the shelf, with batch and expiry.',
      who: 'Automatic', what: ['Stock goes up by batch', 'Expiry alerts set at 90, 60 and 30 days', 'Payment due date noted'],
      today: 'Expiry found when the customer finds it', gives: 'Nothing expires quietly' },
    { id: 'sell', n: '05', act: 'sell', name: 'Sell', icon: 'receipt', vis: 'sell', zoom: [2, 1, 0.22],
      line: 'Three items billed in under thirty seconds.',
      who: 'Counter staff', what: ['Search by brand, salt or a wrong spelling', 'Oldest batch picked first', 'Expired stock cannot be billed'],
      today: 'Exact names, function keys, tiny text', gives: 'A new helper bills on day one' },
    { id: 'bill', n: '06', act: 'sell', name: 'Bill', icon: 'chat', vis: 'wabill', zoom: [1.3, 0.03, 0.62],
      line: 'The bill lands on WhatsApp. The customer is saved.',
      who: 'Automatic', what: ['GST bill as a link, or printed', 'Customer and doctor remembered', 'Schedule H1 register fills itself'],
      today: 'Paper bill. Register written by hand.', gives: 'Inspection-ready every day' },
    { id: 'remind', n: '07', act: 'grow', name: 'Remind', icon: 'bell', vis: 'remind', zoom: [1.3, 0.03, 0.62],
      line: 'Three days before the strip runs out, a reminder.',
      who: 'Automatic', what: ['30 tablets, one a day: remind on day 27', 'Reply YES and the order is packed', 'Offers to chosen groups, with consent'],
      today: 'The regular buys from an app next month', gives: 'Regulars stay regular' },
    { id: 'see', n: '08', act: 'grow', name: 'See', icon: 'phone', vis: 'owner', zoom: [1.3, 0.03, 0.3],
      line: 'The whole shop, on the owner’s phone.',
      who: 'Owner', what: ['Sales, cash and profit today', 'Low stock and expiring stock', 'Approve orders from anywhere'],
      today: 'Phone calls to ask “how much today?”', gives: 'Peace of mind, away from the counter' }
  ],

  /* 01 The gap: today's chain against ours. t = typed again */
  chain: {
    today: [
      { t: 'Order', s: 'Notebook, calls, WhatsApp or an ordering app', typed: 1 },
      { t: 'Goods arrive', s: 'A paper bill with 20 to 40 lines' },
      { t: 'Purchase entry', s: 'Every line typed into the billing software', typed: 1 },
      { t: 'Sale', s: 'Billed at the counter' },
      { t: 'Registers and accounts', s: 'H1 book by hand. Tally typed again.', typed: 1 }
    ],
    os: [
      { t: 'Order', s: 'Picked from the store’s own history', typed: 1 },
      { t: 'Goods arrive', s: 'The order is already on screen' },
      { t: 'Tick', s: 'What came is ticked. Batch and expiry scanned.' },
      { t: 'Sale', s: 'Billed at the counter' },
      { t: 'Registers and accounts', s: 'Fill themselves from the bill' }
    ]
  },
  notes: [
    { k: 'Seen', t: 'The screens are hard to use.', s: 'The billing software we were shown is not easy on older eyes or hands.' },
    { k: 'Seen', t: 'The distributor’s bill is typed again.', s: 'The order was already made once. When stock arrives, the same lines go in by hand.' },
    { k: 'Seen', t: 'Ordering and billing live apart.', s: 'One app to order from distributors, another to bill customers.' },
    { k: 'Heard', t: 'They already pay for software.', s: 'Owners know what it costs them. They will compare us line by line.' }
  ],

  /* 02 Today's software. Prices are published list prices before GST. src = ids in C.sources */
  stack: [
    { k: 'Billing', v: ['Marg ERP', 'Profitmaker', 'Medivision', 'C-Square', 'GoFrugal', 'eVitalRx', 'Vyapar'] },
    { k: 'Ordering', v: ['Pharmarack', 'Retailio', 'LiveOrder', 'Distributor’s own app', 'WhatsApp', 'Phone'] },
    { k: 'Registers', v: ['Paper H1 book', 'Prescription file'] },
    { k: 'Customers', v: ['Personal WhatsApp', 'Memory'] },
    { k: 'Accounts', v: ['Tally', 'The CA’s Excel'] }
  ],
  rivals: [
    { n: 'Marg ERP 9+', from: 'Delhi', kind: 'Billing', big: '1 million+', bigL: 'users, by its own count',
      best: 'Reach. Dealers in every town, a thousand reports, a low one-time licence.',
      weak: 'Screens from the desktop era. Support through dealers. 3.2 of 5 on Capterra, 39% of reviews negative.',
      win: 'Readable screens, tick-first buying, a fixed yearly price and a free move.',
      price: '₹8,100 to ₹25,200 once, plus ₹2,500 to ₹5,000 a year', src: ['marg', 'margprice', 'cost', 'capterra'] },
    { n: 'Profitmaker', from: 'Hyderabad · Daxinsoft, since 1999', kind: 'Billing', big: '20,000+', bigL: 'customers, by its own count',
      best: 'Local and long-trusted. Light on old PCs. Customised per shop. Has an order app.',
      weak: 'Windows first. At the counter we found its screens hard to use for older owners. Serves many trades, not only pharmacies.',
      win: 'One job per screen, large type, Telugu, and the owner’s phone app.',
      price: 'Not published', src: ['daxin', 'daxinplay', 'visits'] },
    { n: 'GoFrugal', from: 'Chennai · a Zoho company', kind: 'Billing', big: '3-way', bigL: 'order, goods and bill matching',
      best: 'Chain control. Its GoSure app already checks goods against the order.',
      weak: 'Priced for chains. Matching, alerts and ordering are separate apps to buy and learn.',
      win: 'The same check, built in, for the single store.',
      price: '₹18,000 to ₹50,000 a store, every year', src: ['gosure', 'cost'] },
    { n: 'eVitalRx', from: 'Ahmedabad', kind: 'Billing', big: '10,000+', bigL: 'active pharmacies, by its own count',
      best: 'Cloud and phone first. WhatsApp bills, refill reminders, CSV bill upload.',
      weak: 'The upload needs a file from the distributor. Offline working is not documented. Many stores only on the ₹50,000 plan.',
      win: 'We start from the store’s own order, so it works with any distributor, online or off.',
      price: '₹7,500 to ₹50,000 a year', src: ['evital', 'evitalprice', 'evitalapp'] },
    { n: 'C-Square · Ecogreen', from: 'Owned 82% by Reliance since 2019', kind: 'Billing', big: 'Chains', bigL: 'and distributors first',
      best: 'Strong with distributors. LiveOrder takes orders from chemists, even offline.',
      weak: 'Built for distributors and chains. Its owner also runs Netmeds, a rival to the corner store.',
      win: 'Software that works only for the independent store.',
      price: 'Not published', src: ['csquare'] },
    { n: 'Medivision', from: 'Allied Softech', kind: 'Billing', big: 'H1', bigL: 'and narcotic alerts',
      best: 'Shortcut keys for speed. Alerts for H1 and narcotic drugs. Tally export.',
      weak: 'A keyboard-first desktop tool. Little for the owner away from the shop.',
      win: 'Touch and keyboard both. The owner sees everything on a phone.',
      price: 'Not published', src: ['medivision'] },
    { n: 'Vyapar · myBillBook', from: 'Bengaluru', kind: 'General billing', big: '₹399', bigL: 'a year, to start',
      best: 'Very cheap. Simple. On the phone.',
      weak: 'Made for every kind of shop. No H1 register, no expiry returns, no distributor flow.',
      win: 'Everything a pharmacy needs, at a small-shop price.',
      price: '₹399 to ₹4,299 a year', src: ['cost', 'blueprint'] },
    { n: 'Pharmarack', from: 'Pune · owned by drug makers', kind: 'Ordering', big: '2.3 lakh+', bigL: 'chemists, by its own count',
      best: 'The biggest ordering network: 15,900+ distributors in 110+ cities.',
      weak: 'It orders. It does not bill. Stock that arrives is still entered in the billing software. Revenue ₹41.8 crore, loss ₹58.9 crore in FY25.',
      win: 'Order, receive and bill in one place. Their network can become a partner.',
      price: 'No fee listed for chemists', src: ['pharmarack', 'pharmarackfin'] }
  ],
  /* Feature matrix: 2 = documented, 1 = partial, add-on or higher plan, 0 = not found in public material */
  matrixCols: ['Us (plan)', 'Marg', 'Profitmaker', 'GoFrugal', 'eVitalRx', 'Vyapar'],
  matrix: [
    ['Order to the distributor from the app', [2, 2, 2, 2, 2, 1]],
    ['Receive against your own order: tick, don’t type', [2, 1, 0, 1, 1, 0]],
    ['Batch and expiry from the pack’s QR code', [2, 0, 0, 0, 0, 0]],
    ['Pick medicines from a list as you type', [2, 2, 2, 2, 2, 2]],
    ['Works with no internet', [2, 2, 2, 2, 0, 2]],
    ['Owner’s phone app', [2, 1, 1, 1, 2, 2]],
    ['WhatsApp bills and refill reminders', [2, 1, 0, 1, 2, 1]],
    ['Expiry and low-stock reports', [2, 2, 2, 2, 2, 1]],
    ['GST reports and Tally export', [2, 2, 2, 2, 2, 2]],
    ['Telugu screens', [2, 0, 0, 0, 0, 0]],
    ['Text-size control and 48px buttons', [2, 0, 0, 0, 0, 0]],
    ['Many stores, one owner view', [2, 1, 1, 2, 1, 0]]
  ],
  /* Map: x = published price per store per year (₹ thousand, mid of range), y = typing removed on purchases (0 to 3) */
  map: [
    { n: 'Vyapar', x: 2.3, y: 0, lo: 0.4, hi: 4.3 },
    { n: 'Marg', x: 8, y: 1, lo: 5, hi: 13, note: 'yearly cost over 3 years' },
    { n: 'eVitalRx', x: 15, y: 1, lo: 7.5, hi: 50 },
    { n: 'GoFrugal', x: 30, y: 2, lo: 18, hi: 50 },
    { n: 'Pharmacy OS', x: 5, y: 3, lo: 3, hi: 8, us: 1 }
  ],
  mapY: ['Type every line', 'Import a file, if one is sent', 'Check against the order', 'Tick, scan, done'],

  /* 05 Distributor: portal or just send */
  ladder: [
    { n: '1', t: 'Send', when: 'From day one', tag: 'Start here',
      line: 'The order goes as a WhatsApp message, a PDF and a link.',
      pts: ['No login, no app, nothing to learn', 'They mark “available” or “short” on the link', 'They can attach their bill file or a photo'],
      store: 'Works with every distributor', dist: 'Zero effort', us: 'Costs paise per order' },
    { n: '2', t: 'Free order desk', when: 'When many of their chemists use us', tag: 'Then',
      line: 'One inbox for every order from Pharmacy OS stores.',
      pts: ['All orders and dues in one list', 'Send a scheme to every store at once', 'Free for the distributor, always'],
      store: 'Faster replies, live stock', dist: 'Fewer calls, faster payment', us: 'Each distributor brings stores' },
    { n: '3', t: 'Connect their software', when: 'Later', tag: 'Later',
      line: 'Their billing software sends the bill back by itself.',
      pts: ['Works with what they already run', 'Bill lines arrive with batch and expiry', 'Receiving becomes one tap'],
      store: 'Nothing to scan', dist: 'Nothing to re-enter', us: 'A network that is hard to copy' }
  ],

  /* 06 One platform: six jobs, each a list of features with a screen */
  jobs: [
    { id: 'buy', name: 'Buy', icon: 'truck', line: 'Order, receive, pay, return.',
      f: [['To-order list', 'order', 'Low stock and usual quantities, ready to send'], ['Receive against the order', 'check', 'Tick what came. Short supply flagged.'], ['Pay the distributor', 'dues', 'Due dates, reminders three days before'], ['Expiry returns', 'returns', 'Tracked until the credit note arrives']] },
    { id: 'stock', name: 'Stock', icon: 'box', line: 'Know every strip.',
      f: [['Expiring in 60 days', 'expiry', 'With the rupee value at risk, by distributor'], ['Running low', 'lowstock', 'Below reorder level, with one tap to order'], ['Batch and shelf', 'stock', 'Oldest batch sells first'], ['Dead stock', 'deadstock', 'No sale in 90 days: return or move']] },
    { id: 'sell', name: 'Sell', icon: 'receipt', line: 'Fast, legal bills.',
      f: [['Counter bill', 'sell', 'Scan or search. UPI, cash, card, credit.'], ['Prices and discounts', 'prices', 'Never above MRP. Rules by customer and item.'], ['Returns', 'salereturn', 'One tap from the old bill'], ['Substitutes', 'substitute', 'Same salt, in stock, shown when one runs out']] },
    { id: 'serve', name: 'Serve', icon: 'chat', line: 'Customers on record.',
      f: [['Bill on WhatsApp', 'wabill', 'A link, not a photo of a printout'], ['Refill reminders', 'remind', 'Worked out from the strip and the dose'], ['Campaigns', 'campaign', 'Offers to a chosen group, with consent'], ['Customer page', 'customer', 'Purchases, dues and the family’s regular medicines']] },
    { id: 'money', name: 'Accounts & GST', icon: 'rupee', line: 'Ready for the CA.',
      f: [['Day book', 'accounts', 'Sales, cash, UPI, expenses and profit'], ['GST files', 'gst', 'GSTR-1 and 3B summaries. Tally export.'], ['Money to collect', 'collect', 'Credit customers, with reminders'], ['The CA’s login', 'ca', 'Read-only. Everything downloads.']] },
    { id: 'law', name: 'Law', icon: 'shield', line: 'Inspection-ready.',
      f: [['Schedule H1 register', 'h1', 'Doctor, patient, drug and quantity, filled from the bill'], ['Expired stock blocked', 'blocked', 'It cannot be billed. It moves to “to return”.'], ['Inspection pack', 'inspect', 'Bills, registers and licences in one download'], ['Licence reminders', 'licence', '60 and 30 days before renewal']] }
  ],
  /* 06 Moving in from the old software */
  movein: [
    ['Bring the backup file', 'From Marg, Profitmaker or an Excel sheet. Nothing is changed in the old software.'],
    ['Check what we found', 'Medicines with batch and expiry, customers, distributors and dues. Only the doubtful ones need a look.'],
    ['Run both for a week', 'The old software stays on, and the old keys still work. One tap undoes the move.']
  ],
  autos: [
    ['Low stock', 'Every morning, as one WhatsApp summary'], ['Near expiry', '90, 60 and 30 days before, with value'], ['Expired', 'Blocked from billing at once'],
    ['Pay distributor', 'Three days before the due date'], ['Refill due', 'Three days before the strip ends'], ['Licence renewal', '60 and 30 days before']
  ],

  /* 07 One store or many */
  rules: [
    ['Who can order', 'Each store orders only from its approved distributors'],
    ['Big orders wait', 'Above a limit you set, the owner approves on the phone'],
    ['Stock moves, not expires', 'Near-expiry stock is offered to the store that sells it fastest'],
    ['One price list', 'Prices and discounts are set once and reach every counter'],
    ['Nothing lost on the way', 'A transfer is “in transit” until the other store ticks it in'],
    ['Every edit is logged', 'Deleted bills and changed prices show who and when']
  ],

  /* 09 Owner app */
  appPoints: [
    ['Today, in one look', 'Sales, cash, UPI and profit, for one store or all'],
    ['“Needs you” list', 'Orders to approve, dues to pay, stock about to expire'],
    ['Every bill, live', 'See a bill the moment it is made'],
    ['Works on a basic phone', 'Android first. Telugu, English, Hindi.']
  ],

  /* 10 On the screen: [left %, top %, title, text]. The points sit on the overview screen. */
  anno: [
    [18.9, 20.5, 'Words on every menu item', 'No icon stands alone. Each one has the shop’s own word beside it.'],
    [65, 2, 'Two buttons for language', 'English or తెలుగు. At the top of every screen, never inside a settings page.'],
    [77.3, 2, 'Three sizes of text', 'One tap makes the whole screen bigger for whoever is at the counter.'],
    [86.8, 2, 'One dark button', 'The next step is the only dark button on a screen. Here it is a new bill.'],
    [20.7, 13, 'Numbers first', 'The day’s sales in large type, then one line that says better or worse.'],
    [69.6, 41.4, 'Today stands out', 'The dark bar is today. Nobody has to read an axis to find it.'],
    [75.6, 13.8, 'Plain words for what happened', 'Order received. Stock moved. A person’s name, not a code.'],
    [78.4, 81.6, 'Colour, icon and word together', 'Red, amber and green never work alone. So they work for tired eyes and colour-blind eyes.']
  ],
  langPts: [
    ['Both languages are always on screen', 'No flag, no hidden menu. The chosen one is dark.'],
    ['Telugu is written in Telugu', 'Nobody has to read English to leave English.'],
    ['Each person keeps their own', 'Imran works in English and Padma in Telugu, at the same counter.']
  ],
  /* Measured on the demo in section 04, at desktop and phone widths, in every state of the flow */
  a11y: [
    ['Main text against its background', '12 : 1 or more', '4.5 : 1 or more'],
    ['Grey helper text', '5.4 : 1 or more', '4.5 : 1 or more'],
    ['White text on dark buttons', '7.5 : 1 or more', '4.5 : 1 or more'],
    ['Red, amber, green and blue words', '4.5 : 1 or more', '4.5 : 1 or more'],
    ['Smallest button', '44 × 44 px', '24 × 24 px, and 44 for the top level'],
    ['Smallest text', '14 px', 'No fixed size'],
    ['Body text', '17, 20 or 22 px', 'Text must still work at twice the size'],
    ['Without a mouse', 'Every control', 'Every control reachable by keyboard']
  ],

  /* 10 Design for 50+ */
  evidence: [
    { big: '50.9%', t: 'of adults developed reading-glass eyes within 15 years', s: 'Andhra Pradesh Eye Disease Study, 5,395 people in AP and Telangana. The thirties and forties are when it starts.', src: 'apeds' },
    { big: '0.8%', t: 'a year: how much harder websites get between 25 and 60', s: 'Nielsen Norman Group, from three rounds of testing with 123 people over 65.', src: 'nng' },
    { big: '24px', t: 'is the smallest tap target the web standard allows', s: 'WCAG 2.2 asks for 24px, and 44px for its top level. We use 48.', src: 'wcag' },
    { big: '“manual punching”', t: 'is what the chemists’ own association asked suppliers to end', s: 'AIOCD letter to drug makers, 20 January 2021: send a file, match the batch to the stock.', src: 'aiocd' }
  ],
  research: {
    done: [['Store visits', 'First conversations with owners at the counter, October 2026'], ['Nine products studied', 'Sites, price lists, app listings and help pages'], ['Reviews read', 'What users say after they pay'], ['Trade letters and rules', 'AIOCD, drug control, GST, WhatsApp policy']],
    next: [['30 owner interviews', 'Hyderabad, Vijayawada, Ongole and nearby towns'], ['A day behind the counter', 'Time every purchase bill and every sale'], ['10 design partners', 'Stores that test each screen before we build it'], ['Tests with owners over 50', 'Five owners try every release']]
  },
  people: [
    { first: 'Subba Rao', at: 56, name: 'The owner-pharmacist', img: 10823559, fp: [0.27, 0.32, 1.25],
      where: 'One store, 22 years', uses: 'Desktop billing software', device: 'Old Windows PC, Android phone', lang: 'Telugu',
      quote: 'I type the same bill again every night.',
      wants: ['Text he can read without leaning in', 'Stock received without typing', 'Telugu on every screen'],
      pains: ['Small text and function keys', 'Typing the distributor’s bill line by line', 'Finding expired strips by accident'],
      win: 'Tick-first receiving, a text-size control, and a free move from his old software.' },
    { first: 'Imran', at: 27, name: 'The counter pharmacist', img: 13119975, fp: [0.47, 0.3, 1.5],
      where: 'At the counter, ten hours a day', uses: 'Billing screen and a paper H1 book', device: 'Counter PC, barcode scanner', lang: 'Telugu, Hindi, English',
      quote: 'Three customers are waiting. I can’t hunt for a batch.',
      wants: ['Search that forgives spelling', 'The right batch picked for him', 'A substitute when stock runs out'],
      pains: ['Exact names only', 'Writing the H1 register by hand', 'Customers leaving when a medicine is “not there”'],
      win: 'Three letters to find a medicine, oldest batch first, and registers that fill themselves.' },
    { first: 'Kiran', at: 43, name: 'The owner of four stores', img: 31695306, fp: [0.74, 0.4, 1],
      where: 'Four stores in two towns', uses: 'A separate installation in each store', device: 'Phone, mostly', lang: 'Telugu, English',
      quote: 'I call each store to ask how the day went.',
      wants: ['All four stores on his phone', 'To approve big orders himself', 'Stock moved before it expires'],
      pains: ['Four sets of numbers', 'Stock “lost” between stores', 'No idea who changed a bill'],
      win: 'One owner view, approval rules, tracked transfers and a log of every edit.' },
    { first: 'Padma', at: 38, name: 'The accountant', img: 8837758, fp: [0.72, 0.4, 1.7],
      where: 'Looks after 30 shops', uses: 'Tally, Excel, WhatsApp', device: 'Laptop', lang: 'English, Telugu',
      quote: 'Every month I ask for the same files.',
      wants: ['GST files without asking', 'A clean purchase register', 'Her own login'],
      pains: ['Photos of bills on WhatsApp', 'Purchases typed twice, with mistakes', 'Chasing owners at month end'],
      win: 'A read-only login, GST summaries and a Tally export, ready on the first of the month.' },
    { first: 'Ramesh', at: 35, name: 'The distributor’s order desk', img: 36876208, fp: [0.5, 0.35, 1],
      where: 'Takes orders from 400 chemists', uses: 'His firm’s software and three ordering apps', device: 'Desktop and WhatsApp', lang: 'Telugu, Hindi',
      quote: 'Orders come by call, by chat and from three apps.',
      wants: ['A clear order he can read once', 'No new login', 'To say “short” before the van leaves'],
      pains: ['Voice notes and handwriting photos', 'Returns for the wrong item', 'Chasing payments'],
      win: 'A clean order on WhatsApp with a link. He taps what is short. Nothing to install.' }
  ],
  flows: [
    { id: 'buy', name: 'Buying stock', today: ['Check shelves by eye', 'Write the want list', 'Call or message the distributor', 'Goods and a paper bill arrive', 'Count against the paper', 'Type every line into the software', 'Fix batch and expiry mistakes', 'File the bill', 'Remember the due date'],
      os: ['Open “To order”. It is filled.', 'Send', 'Tick what arrived', 'Done. Stock, expiry and dues are set.'] },
    { id: 'sell', name: 'Selling at the counter', today: ['Ask what they need', 'Search by the exact name', 'Pick a batch', 'Type the quantity', 'Write the H1 register', 'Print the bill', 'The customer is forgotten'],
      os: ['Type three letters', 'Tap the quantity', 'Take UPI or cash', 'Done. Bill on WhatsApp, register filled, reminder set.'] }
  ],
  ux: [
    { n: '01', t: 'Text they can read', s: 'Body text starts at 18px. One control sets the size for the whole app.', demo: 'type' },
    { n: '02', t: 'Buttons they can hit', s: 'Every target is 48px or more, with space around it.', demo: 'target' },
    { n: '03', t: 'One job per screen', s: 'Six words in the menu: Order, Receive, Stock, Bill, Customers, Reports.', demo: 'menu' },
    { n: '04', t: 'Their words, their language', s: '“Stock received”, not “GRN”. Telugu, English and Hindi.', demo: 'words' },
    { n: '05', t: 'Search that remembers', s: 'Three letters, any spelling. What the shop has used before comes first.', demo: 'search' },
    { n: '06', t: 'Stop the mistake', s: 'Expired stock cannot be billed. Undo, instead of “Are you sure?”', demo: 'undo' },
    { n: '07', t: 'Colour never alone', s: 'A red mark always comes with an icon and a word.', demo: 'colour' },
    { n: '08', t: 'Nothing moves', s: 'A button learnt once stays in its place after every update.', demo: 'still' }
  ],

  /* 12 Costs. Planning assumptions, October 2026 */
  serve: [
    { k: 'Cloud', v: 600, s: 'Database, files and backups in India', meter: 0 },
    { k: 'WhatsApp', v: 1200, s: 'About 700 bills and reminders a month at ₹0.115 each, plus GST', meter: 1 },
    { k: 'Support', v: 1000, s: 'Phone and WhatsApp help in Telugu', meter: 0 },
    { k: 'Payments, other', v: 200, s: 'SMS fallback, payment links', meter: 0 }
  ],
  build: [
    ['Salaries, 12 months', '₹120–180 L', 150], ['Sales and dealers', '₹30–50 L', 40], ['Cloud and tools', '₹6–18 L', 12], ['Medicine data', '₹5–15 L', 10], ['Legal and setup', '₹5–10 L', 7.5]
  ],
  team: [
    ['Tech lead', '1', '₹2.5–3.5 L a month'], ['Full-stack developers', '4', '₹1–1.7 L each'], ['Mobile developer', '1', '₹1–1.5 L'], ['UI/UX designer', '1', '₹0.8–1.2 L'],
    ['QA tester', '1', '₹0.6–0.9 L'], ['Pharmacist, part-time', '1', '₹0.4–0.6 L'], ['Onboarding and support', '2', 'From month 6']
  ],
  unit: [
    ['One bill or reminder on WhatsApp', '₹0.115', 'Meta, from 1 Jan 2026, before GST'],
    ['One offer message on WhatsApp', '₹0.86', 'Meta, from 1 Jan 2026, before GST'],
    ['Reading one bill photo by machine', 'about ₹1', 'Google Document AI list price, $0.10 for 10 pages'],
    ['Google Play listing', '$25 once', 'Developer account'],
    ['Apple App Store', '$99 a year', 'Developer account']
  ],
  prices: [
    { n: 'Vyapar, myBillBook', lo: 399, hi: 4299, s: 'a year' },
    { n: 'eVitalRx', lo: 7500, hi: 50000, s: 'a year' },
    { n: 'Marg ERP', lo: 8100, hi: 25200, s: 'once, plus ₹2,500 to ₹5,000 a year' },
    { n: 'GoFrugal', lo: 18000, hi: 50000, s: 'a store, a year' }
  ],

  /* 13 Why we win */
  whys: [
    { n: '1', t: 'Less work on day one', s: 'They tick what arrived. They don’t type it.', go: '#try', cta: 'Try it' },
    { n: '2', t: 'The owner can read it', s: 'Large text, big buttons, plain words, Telugu.', go: '#ux', cta: 'See the rules' },
    { n: '3', t: 'We move them, free', s: 'Items, stock, customers and dues, moved by our team in one or two days.', go: '#care', cta: 'How' },
    { n: '4', t: 'One price, nothing hidden', s: 'Owner app, registers and reminders are part of the product, not add-ons.', go: '#costs', cta: 'The costs' },
    { n: '5', t: 'Help in Telugu, in minutes', s: 'On WhatsApp and on the phone. A short video on every screen.', go: '#start', cta: 'Talk to us' }
  ],
  moats: [
    ['Every distributor’s format', 'Each bill format we learn makes the next store faster to set up.'],
    ['The registers', 'H1 and inspection records live with us. Leaving feels risky.'],
    ['Local trust', 'Telugu support, dealers and on-site moves cannot be copied from far away.'],
    ['What the data teaches', 'Sales across many stores make reorder advice better each month.']
  ],
  asks: [
    ['Strong products exist. Why would a store switch?', 'Because their daily work does not shrink with those products. Ours removes the typing, the owner can read it, and we move the data for free. Owners switched to UPI in two years: they change when it is easier on the first day.'],
    ['GoFrugal already checks goods against the order.', 'Yes, in its GoSure app, inside a product that costs ₹18,000 to ₹50,000 a store each year. We make the same check the normal way to receive stock in a small store.'],
    ['eVitalRx already uploads the distributor’s bill.', 'From a CSV file the distributor must send. We start from the store’s own order, so it works with any distributor, and we read batch and expiry from the pack.'],
    ['Will owners over fifty change software?', 'They will if the first day is easier than their last one. We move the data in one or two days, keep the old software readable for thirty, and sit with them in Telugu.'],
    ['Will distributors cooperate?', 'They do not need to. Stage one asks for nothing but WhatsApp. The free order desk comes only when it helps them.'],
    ['Why can’t Marg or Profitmaker copy this?', 'Features, yes. An offline-and-cloud rebuild with large type, Telugu and tick-first buying on a twenty-year-old codebase, at our price, not quickly. That is our judgement, not a fact.'],
    ['Won’t chains finish the independent store?', 'Organised retail is forecast at about 23% of sales in 2027. Three rupees in four still go through independents, and they need tools to keep them.'],
    ['How do you earn if you charge less?', 'Cost to serve a store is ₹1,800 to ₹3,000 a year, mostly WhatsApp and support. The price, the free message quota and paid add-ons will be set with pilot stores.'],
    ['What if WhatsApp rules change?', 'Messages carry no prescription-drug names. SMS is the fallback. Messages can be metered.']
  ],

  /* 14 Why now */
  now: [
    ['Aug 2023', 'QR codes on the top 300 brands', 'Batch and expiry sit inside the code. We scan it.', 'qr', 1],
    ['22 Sep 2025', 'GST on most medicines: 12% to 5%', 'Every price changed overnight. Old software needed updates.', 'gst', 1],
    ['1 Jan 2026', 'A WhatsApp bill costs ₹0.115', 'Sending every bill is now affordable.', 'wa', 1],
    ['20 May 2026', 'Chemists’ bandh', 'A nationwide shutdown against online discounting.', 'bandh', 1],
    ['2 Sep 2026', '158 shops get notices in Telangana', 'Missing bills and H1 registers, found in one day of raids.', 'raid', 1],
    ['2026', '10-minute medicines arrive', 'Zepto Pharmacy opens in Hyderabad. MedPlus reaches 5,476 stores.', 'quick', 1],
    ['13 May 2027', 'Privacy law duties begin', 'Consent and access logs for every customer record.', 'dpdp', 0],
    ['Jul 2027', 'QR codes on vaccines and cancer drugs', 'Antimicrobials follow in July 2028.', 'blueprint', 0]
  ],
  marketStats: [
    ['12.4 lakh', 'chemists in India', 'aiocdcount'], ['45,000+', 'medical shops in AP and Telangana', 'shops'], ['~80%', 'of pharmacy sales still go through independents', 'share']
  ],

  /* 15 Build with care */
  care: [
    ['Never lose a bill', 'Saved on the shop’s PC and in the cloud. Sales are only added, never overwritten.', 'server'],
    ['Works without internet', 'Billing, printing and stock never stop. Messages send when the line returns.', 'wifioff'],
    ['A clean medicine list', 'Every item mapped to salt, schedule, HSN and the right GST rate.', 'pill'],
    ['Legal by default', 'H1 register filled, expired stock blocked, no drug names in WhatsApp messages.', 'shield'],
    ['A free, safe move', 'Stock value before equals stock value after. Old software kept readable for 30 days.', 'swap'],
    ['Fast on a ₹25,000 PC', 'Under one second for a search, on the machines shops already own.', 'bolt'],
    ['Every printer', 'Thermal, dot-matrix, A4 and A5. Bill formats owners already use.', 'printer'],
    ['Privacy', 'Consent captured at the counter. Data in India. A 72-hour breach plan.', 'lock'],
    ['Roles and a log', 'Staff see what they need. Every edit and deleted bill is recorded.', 'eye'],
    ['Tested by owners over 50', 'Five owners try each release before every other shop gets it.', 'users']
  ],

  /* 16 Plan */
  road: [
    ['Months 0–2', 'Discover', ['30 owner interviews', '10 design partners', 'Medicine list', 'Clickable prototype'], '10 design partners signed'],
    ['Months 2–7', 'Build', ['Order, receive, stock', 'Offline billing', 'H1 register, GST', 'Owner app, Telugu', 'Move from Marg and Profitmaker'], '50 pilot stores billing daily'],
    ['Months 7–12', 'Launch', ['Refill reminders, campaigns', 'Many-store rules', 'Free order desk for distributors', 'Dealer network'], '300 paying stores'],
    ['Months 12–36', 'Scale', ['Reorder advice', 'Distributor software links', 'GST filing', 'Karnataka next'], '3,000 stores']
  ],
  open: [
    ['The price', 'Below what stores pay today. The number comes from pilots, not from this page.'],
    ['When to open the free order desk', 'How many of a distributor’s chemists must use us first?'],
    ['Desktop app or browser', 'Which one stays fast and offline on old shop PCs?'],
    ['Medicine list: buy or build', 'Licence a database, or build ours from bills?'],
    ['Dealers or direct', 'Local dealers reach shops fast, for a share of the price.']
  ],

  /* Sources, checked October 2026 */
  sources: {
    visits: ['Our store visits: October 2026', ''],
    blueprint: ['Our blueprint: Pharmacy OS research, October 2026', ''],
    aiocd: ['AIOCD letter to pharma companies, 20 Jan 2021', 'https://medicaldialogues.in/pdf_upload/issues-causing-concerns-to-trade-members-146429.pdf'],
    aiocdcount: ['Outlook: AIOCD, 12.4 lakh chemists', 'https://www.outlookindia.com/healthcare-spotlight/pharma-market-grows-104-but-chemists-flag-weak-volume-growth'],
    shops: ['IANS: 25,000+ shops in Telangana; Sakshi Post: AP estimate', 'https://english.punjabkesari.com/india/over-25000-medical-shops-remain-shut-in-telangana/'],
    share: ['Business Today, HDFC Securities: organised share of pharmacy retail', 'https://businesstoday.in/industry/pharma/story/why-indian-retail-pharmacy-sector-is-on-a-growth-trajectory-430107-2024-05-18'],
    daxin: ['Daxinsoft: Profitmaker', 'https://www.daxinsoft.com/'],
    daxinplay: ['Google Play: Profitmaker order app', 'https://play.google.com/store/apps/details?id=com.daxinsoft.profitmaker'],
    marg: ['Marg ERP: user counts, company statement 2023', 'https://www.zee5.com/articles/marg-erp-is-on-a-mission-to-computerize-2-5-lakh-chemists-for-the-2023-24-financial-year'],
    margprice: ['IT for SME: Marg ERP editions and prices', 'https://itforsme.in/pricing/marg-erp-india'],
    capterra: ['Capterra: Marg ERP 9+ reviews', 'https://www.capterra.com/p/151832/Erp-Software-9/'],
    cost: ['Codingclave: pharmacy software cost in India, June 2026', 'https://codingclave.com/guides/pharmacy-management-software-cost-india-2026'],
    gosure: ['GoFrugal: GoSure goods-received app', 'https://www.gofrugal.com/inventory-app/grn-goods-received-note.html'],
    evital: ['eVitalRx: product site', 'https://www.evitalrx.in/'],
    evitalprice: ['eVitalRx plans: prices', 'https://www.evitalrx.in/pricing'],
    evitalapp: ['App Store: eVitalRx listing, CSV upload', 'https://apps.apple.com/app/id1637429769'],
    csquare: ['Fibre2Fashion: Reliance to acquire C-Square', 'https://www.fibre2fashion.com/news/e-commerce-logistics/reliance-to-acquire-c-square-to-augment-e-com-services-247815-newsdetails.htm'],
    medivision: ['Techjockey: Medivision Gold Retail', 'https://techjockey.com/detail/medivision-gold-retail'],
    pharmarack: ['Pharmarack: company site', 'https://pharmarack.org/'],
    pharmarackfin: ['Inc42: Pharmarack financials', 'https://inc42.com/company/pharmarack/financials/'],
    apeds: ['L V Prasad Eye Institute: 15-year incidence of presbyopia, APEDS (BJO 2025)', 'https://www.lvpei.org/news/fifteen-year-incidence-of-presbyopia-in-andhra-pradesh/'],
    nng: ['Nielsen Norman Group: usability for older adults', 'https://www.nngroup.com/articles/usability-for-senior-citizens/'],
    wcag: ['W3C: WCAG 2.2, target size', 'https://www.w3.org/TR/WCAG22/#target-size-minimum'],
    older: ['W3C: older users and web accessibility', 'https://www.w3.org/WAI/older-users/'],
    wa: ['AiSensy: WhatsApp per-message prices from 1 Jan 2026', 'https://news.aisensy.com/123053-whatsapp-per-message-pricing-update-effective-january-1-2026'],
    ocr: ['Google Cloud: Document AI pricing', 'https://cloud.google.com/document-ai/pricing'],
    gst: ['Lakshmikumaran & Sridharan: GST rate changes for pharma', 'https://lakshmisri.com/newsroom/news-briefings/impact-of-gst-rate-changes-on-the-health-and-pharma-sector'],
    raid: ['Telangana Today: TG SAFE raids, 2 Sep 2026', 'https://telanganatoday.com/tg-safe-raids-medical-shops-over-illegal-sale-of-habit-forming-drugs'],
    bandh: ['Outlook: chemists’ bandh on 20 May 2026', 'https://www.outlookindia.com/amp/story/healthcare-spotlight/chemists-intensify-protest-against-e-pharmacies-call-for-nationwide-bandh-on-may-20'],
    quick: ['CXO Digital Pulse: Zepto Pharmacy; MedPlus Q1 FY27 investor deck', 'https://www.cxodigitalpulse.com/zepto-enters-10-minute-medicine-delivery-space-with-zepto-pharmacy-rollout-in-major-cities/'],
    medplus: ['MedPlus: Q1 FY27 investor presentation', 'https://nsearchives.nseindia.com/corporate/MEDPLUS_21072026194228_Medplusinvestorpresentataion.pdf'],
    qr: ['CDSCO: FAQs on QR codes for Schedule H2 drugs', 'https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2018/UploadPublic_NoticesFiles/Final%20FAQs%20on%20QR%20code%2021.07.2023.pdf'],
    dpdp: ['Khaitan & Co: DPDP Rules timeline', 'https://www.khaitanco.com/sites/default/files/2025-11/ERGO%20-%20Digital%20Personal%20%20Data%20Protection%20Rules%20-%2015%20November%202025.pdf']
  }
};
