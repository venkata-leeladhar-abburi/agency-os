/* ===== Pharmacy OS pitch. Every line is short on purpose. Store, medicine and people names inside the screens are samples.
   Facts carry a source id (see C.sources). Estimates are marked as estimates where they appear. ===== */
const C = {
  /* The pitch in six chapters: the glance map at the top and the band that opens each chapter */
  chapters: [
    { n: 1, t: 'The problem', go: '#chapter-1', line: 'A chain that leaks at every link, and patients pay for it.', big: '16', bigL: 'leaks in one chain', secs: ['01 The problem'] },
    { n: 2, t: 'Today’s tools', go: '#chapter-2', line: 'The real screens owners use today, beside ours.', big: '8', bigL: 'products, screen by screen', secs: ['02 Today’s software'] },
    { n: 3, t: 'Our answer', go: '#chapter-3', line: 'One system that fixes every link: store, distributor, accountant.', big: '1', bigL: 'system for all three', secs: ['03 The whole chain', '04 One flow', '05 Try it'] },
    { n: 4, t: 'The product', go: '#chapter-4', line: 'Eight jobs, an online store, built for eyes over fifty.', big: '41', bigL: 'features, each drawn', secs: ['06 One platform', '07 One store or many', '08 Customers', '09 Owner app', '10 Design for fifty-plus'] },
    { n: 5, t: 'Why we win', go: '#chapter-5', line: 'What an owner gets that he does not get today.', big: '5×', bigL: 'back for each rupee, or more', secs: ['11 Why they will switch', '12 What it gives back'] },
    { n: 6, t: 'The business', go: '#chapter-6', line: 'Price, costs, the market, the risks, the plan and the raise.', big: '₹4 cr', bigL: 'raise, for 18 months', secs: ['13 Price and costs', '14 Why now', '15 Build with care', '16 The plan'] }
  ],
  /* 01 The chain, link by link: what leaks, and what we do about it */
  leaks: [
    { at: 'Order', icon: 'list', p: ['Orders by call, chat and three apps', 'The want list lives in a notebook'], fix: 'Drafted each morning, sent on WhatsApp' },
    { at: 'Dispatch', icon: 'truck', p: ['No tracking: “where is my parcel?”', 'Short supply found at the door'], fix: 'Tracked from packed to door, closed with an OTP' },
    { at: 'Receive', icon: 'ticks', p: ['Every bill typed again', 'Overcharges and missing schemes go unseen'], fix: 'Bill file in one click, differences in rupees' },
    { at: 'Shelf', icon: 'box', p: ['Expired stock found by the customer', 'Recalled batches not pulled in time'], fix: 'Expired and recalled stock blocked at every counter' },
    { at: 'Counter', icon: 'receipt', p: ['H1 register written by hand', 'Deleted bills and big discounts nobody sees'], fix: 'Register fills itself, every edit has a name' },
    { at: 'Customer', icon: 'users', p: ['Regulars drift to apps and online stores', 'No reminder, no record'], fix: 'Refill reminders, and the shop’s own online store' },
    { at: 'Money', icon: 'rupee', p: ['Dues chased by phone', 'Cash short, and nobody knows why'], fix: 'Cash calendar, day close by person' },
    { at: 'Accounts', icon: 'file', p: ['Bill photos typed again into Tally', 'GST mismatches at month end'], fix: 'The accountant’s login, files ready on the 1st' }
  ],
  incidents: [
    { when: 'Oct 2025', where: 'Madhya Pradesh', t: 'A contaminated cough syrup: at least 14 children died', s: 'Drug controllers had to tell every chemist to stop selling batch SR-13 of Coldrif.', fix: 'A recalled batch is blocked at every counter the moment it is flagged', src: 'coldrif' },
    { when: 'Sep 2026', where: 'Telangana', t: '158 medical shops got show-cause notices', s: 'Missing bills and H1 records, found in one day of state-wide raids. Licences can be suspended.', fix: 'Every sale on record, the H1 register filled from the bill', src: 'raid' },
    { when: 'Sep 2026', where: 'Hyderabad', t: 'Expired stock on a shop’s shelves', s: 'A raid near Musheerabad found 32 kinds of medicine, expired stock among them, at a shop without a licence.', fix: 'Expired stock cannot be billed, and is listed for return', src: 'bakaram' },
    { when: 'Aug 2026', where: 'Hyderabad', t: 'A prescription drug sold as a “nutraceutical”', s: 'The drug controller seized tablets that contained gabapentin, a Schedule H drug.', fix: 'Stock comes only from the store’s known distributors, batch by batch', src: 'gabazen' },
    { when: '2026', where: 'Uttar Pradesh, Odisha', t: 'Children fell ill after expired medicine', s: 'An expired cough syrup handed out in Kanpur, an expired antibiotic given in Odisha.', fix: 'Expiry is checked at every sale, and flagged months ahead', src: 'expired' }
  ],
  /* 02 Their real screens, beside ours. img: in pharmacy-os/img/rivals/. vs: [what, theirs, ours] */
  rivalUI: [
    { n: 'Marg ERP 9+', img: 'marg-purchase.jpg', job: 'Entering a distributor’s bill', ours: 'check', src: ['SoftwareSuggest: Marg ERP 9+ listing', 'https://www.softwaresuggest.com/marg-pharmacy'],
      vs: [['Receiving a bill', 'Typed field by field, or imported when the distributor sends a matching file', 'Imported in one click, or ticked against your own order'], ['Reading it', 'Dense form, small type, function keys', 'Large type, three text sizes, one job a screen'], ['Language', 'English', 'Telugu or English, on every screen']], best: 'Reach: dealers in every town.', price: '₹8,100 to ₹25,200 once, plus ₹2,500 to ₹5,000 a year' },
    { n: 'GoFrugal', img: 'gofrugal-h1.jpg', job: 'Billing a scheduled drug', ours: 'sell', src: ['GoFrugal: pharmacy software page', 'https://www.gofrugal.com/retail/pharmacy-software/'],
      vs: [['A scheduled drug', 'Doctor and patient typed into the bill', 'Remembered from the customer; the H1 line writes itself'], ['Reading it', 'A bar of small icons, a grid of small numbers', 'Big buttons and plain words'], ['Who it is for', 'Chains, with separate apps to learn', 'The single store, in one app']], best: 'Chain control and reports.', price: 'Not published now' },
    { n: 'eVitalRx', img: 'evitalrx-web.jpg', job: 'Billing, stock and customers', ours: 'home', src: ['Techjockey: eVitalRx listing', 'https://www.techjockey.com/detail/evitalrx'],
      vs: [['WhatsApp bills', 'A ₹25,000 one-time add-on, messages on top', 'On from day one, no setup fee'], ['No internet', 'Not documented', 'Billing never stops'], ['The distributor', 'Orders go out; his side is not connected', 'A free dashboard: orders, dispatch, tracking, payments']], best: 'Modern and phone-first.', price: '₹7,500 to ₹50,000 a year, plus add-ons' },
    { n: 'Profitmaker', img: 'profitmaker-app.jpg', phone: 1, job: 'Its order app for retailers', ours: 'order', src: ['Google Play: Profit Orders, by Daxinsoft', 'https://play.google.com/store/apps/details?id=com.daxinsoft.profitorders.ProfitOrders'],
      vs: [['Ordering', 'A separate app, for distributors on Profitmaker', 'Any distributor, best rate and scheme picked'], ['Receiving', 'Typed into the desktop software', 'One click, or ticks'], ['The owner', 'Desktop first', 'Every store on his phone']], best: 'Local and long-trusted in Hyderabad.', price: 'Not published' },
    { n: 'Medeil', img: 'medeil-customer.jpg', job: 'A customer’s record', ours: 'customer', src: ['SoftwareSuggest: Medeil listing', 'https://www.softwaresuggest.com/medeil'],
      vs: [['Customer record', 'A long form to fill in', 'Built from the bills, with refills and dues'], ['Reading it', 'Small fields, a desktop toolbar', 'Large type, plain words'], ['On the phone', 'Not found', 'Owner app and WhatsApp bills']], best: 'Low one-time cost.', price: 'About ₹6,500 to ₹11,000 a user, in marketplace listings' },
    { n: 'RetailGraph', img: 'retailgraph-sales.jpg', job: 'Sales and stock report', ours: 'stock', src: ['Techjockey: RetailGraph listing', 'https://www.techjockey.com/detail/softworld-retailgraph'],
      vs: [['A stock report', 'Rows of small numbers to read', 'Low, expiring or not selling, in words'], ['The next step', 'You work it out', 'One button: order, return or move'], ['Language', 'English', 'Telugu or English']], best: 'Deep reports, a published price.', price: '₹12,000 to ₹27,000 once, plus ₹4,000 to ₹6,000 a year' },
    { n: 'Vyapar', img: 'vyapar-home.jpg', job: 'The home screen', ours: 'home', src: ['SoftwareSuggest: Vyapar listing', 'https://www.softwaresuggest.com/vyapar'],
      vs: [['Made for', 'Every kind of shop', 'Medical stores only'], ['Pharmacy rules', 'No H1 register or expiry block found', 'H1 filled; expired and recalled stock blocked'], ['The distributor', 'Not connected', 'Orders, bill files and parcels linked']], best: 'Cheap and simple.', price: '₹399 to ₹4,299 a year' },
    { n: 'Pharmarack', img: 'pharmarack-app.jpg', phone: 1, job: 'Ordering from distributors', ours: 'compare', src: ['Google Play: Pharmarack Retailer 2.0', 'https://play.google.com/store/apps/details?id=com.growthaccel.pharmarack_retailer.pharmarack_retailer'],
      vs: [['After the order', 'Stock still typed into the billing software', 'The bill comes back into stock in one click'], ['Billing', 'Not part of it', 'Billing, stock and registers in the same app'], ['Cost to chemists', 'Reviews report charges', 'Inside one yearly price']], best: 'The biggest ordering network.', price: 'Free to download; reviews report charges' }
  ],

  acts: [
    { id: 'buy', name: 'Buy', sub: 'From the distributor' },
    { id: 'stock', name: 'Stock', sub: 'Onto the shelf' },
    { id: 'sell', name: 'Sell', sub: 'At the counter' },
    { id: 'grow', name: 'Grow', sub: 'They come back' }
  ],

  /* The one flow: a strip of tablets, from order to refill */
  steps: [
    { id: 'order', n: '01', act: 'buy', name: 'Order', icon: 'list', vis: 'order', zoom: [2.05, 0.36, 0.2],
      line: 'The order is drafted overnight. Check it, then send.',
      who: 'Owner or purchase staff', what: ['Drafted from sales, stock and the season', 'Best rate, scheme and credit picked for each line', 'A new medicine is typed once, then remembered'],
      today: 'Want list in a notebook', gives: 'A medicine is typed once, ever' },
    { id: 'send', n: '02', act: 'buy', name: 'Send', icon: 'send', vis: 'send', zoom: [1.3, 0.03, 0.62],
      line: 'The distributor gets it on WhatsApp. No login.',
      who: 'Distributor', what: ['Order as a message, a PDF and a link', 'Sent, seen, packed, on the way: every step shows', 'Short items go to the next distributor in one tap'],
      today: 'Calls, chats and three ordering apps', gives: 'Works with every distributor from day one' },
    { id: 'check', n: '03', act: 'stock', name: 'Receive', icon: 'ticks', vis: 'check', zoom: [1.7, 0.5, 0.55],
      line: 'Their bill file comes in with one click. No file? Tick what came.',
      who: 'Whoever opens the carton', what: ['The Excel or CSV bill is matched to your order', 'Only the differences show, with the rupees', 'Scan the pack for batch and expiry'],
      today: 'Every line typed again from the paper bill', gives: 'Stock received with nothing typed' },
    { id: 'shelf', n: '04', act: 'stock', name: 'Stock', icon: 'box', vis: 'stock', zoom: [1.9, 0.42, 0.3],
      line: 'One tap. On the shelf, with batch and expiry.',
      who: 'Automatic', what: ['Stock goes up by batch', 'Expiry and return-date alerts are set', 'The payment date goes on the cash calendar'],
      today: 'Expiry found when the customer finds it', gives: 'Nothing expires quietly' },
    { id: 'sell', n: '05', act: 'sell', name: 'Sell', icon: 'receipt', vis: 'sell', zoom: [1.75, 0.47, 0.12],
      line: 'Scan the pack, or type three letters.',
      who: 'Counter staff', what: ['Where the pack has a QR code, it picks the exact batch', 'Oldest batch first. Expired stock cannot be billed.', '“Not in stock” is one tap, and joins the next order'],
      today: 'Exact names, function keys, tiny text', gives: 'A new helper bills on day one' },
    { id: 'bill', n: '06', act: 'sell', name: 'Bill', icon: 'chat', vis: 'wabill', zoom: [1.3, 0.03, 0.62],
      line: 'The bill reaches the buyer on WhatsApp. The customer is saved.',
      who: 'Automatic', what: ['Sent to the buyer as the sale closes, or printed', 'Customer and doctor remembered', 'Schedule H1 register fills itself'],
      today: 'Paper bill. Register written by hand.', gives: 'Inspection-ready every day' },
    { id: 'remind', n: '07', act: 'grow', name: 'Remind', icon: 'bell', vis: 'remind', zoom: [1.3, 0.03, 0.62],
      line: 'Three days before the strip runs out, a reminder.',
      who: 'Automatic', what: ['30 tablets, one a day: remind on day 27', 'Reply YES and the order is packed', 'Next week’s refills are stocked ahead'],
      today: 'The regular buys from an app next month', gives: 'Regulars stay regular' },
    { id: 'see', n: '08', act: 'grow', name: 'See', icon: 'phone', vis: 'owner', zoom: [1.3, 0.03, 0.3],
      line: 'The whole shop, on the owner’s phone.',
      who: 'Owner', what: ['Sales, cash and profit today', 'Ask a question, get a number', 'A store score every Monday'],
      today: 'Phone calls to ask “how much today?”', gives: 'Peace of mind, away from the counter' }
  ],

  /* 03 A day at the store: [when, what, what the app does by itself, what a person does] */
  day: [
    ['6:00 am', 'The order is drafted', 'From yesterday’s sales, the stock and the season. The best distributor is picked for each line.', 'Tap Send'],
    ['11:00 am', 'The distributor replies', 'Short items are offered to the next distributor, at his rate.', 'Tap Yes'],
    ['2:00 pm', 'Stock arrives', 'The bill file is read and laid beside the order. Differences show in rupees.', 'Check the differences'],
    ['All day', 'Every sale', 'Oldest batch picked. Expired stock stopped. Bill sent on WhatsApp. Register filled. Refill reminder set.', 'Scan, take the money'],
    ['9:00 pm', 'The day is closed', 'Cash, UPI and credit are added up from the bills, by person.', 'Count the drawer once'],
    ['Monday', 'The week is scored', 'Missed sales, expiry loss, returning regulars and dues, with one thing to do for each.', 'Read one page'],
    ['Days ahead', 'Warnings', 'Return dates, licence renewals, bills to pay and refills due.', 'Nothing, until one needs you']
  ],

  /* Feature matrix: 2 = documented, 1 = partial, add-on or higher plan, 0 = not found in public material */
  matrixCols: ['Us (plan)', 'Marg', 'Profitmaker', 'GoFrugal', 'eVitalRx', 'Vyapar'],
  matrix: [
    ['Order to the distributor from the app', [2, 2, 2, 2, 2, 1]],
    ['Compare distributors’ rates and schemes before ordering', [2, 2, 0, 0, 1, 0]],
    ['Distributor’s bill file imported in one click', [2, 2, 0, 2, 2, 0]],
    ['Receive against your own order: tick, don’t type', [2, 1, 0, 1, 1, 0]],
    ['Batch and expiry from the pack’s QR code', [2, 1, 0, 0, 0, 0]],
    ['Works with no internet', [2, 2, 2, 2, 0, 2]],
    ['Owner’s phone app', [2, 1, 1, 1, 2, 2]],
    ['WhatsApp bills and refill reminders', [2, 2, 1, 1, 1, 1]],
    ['Telugu screens', [2, 0, 0, 0, 0, 1]],
    ['Text-size control and 44px buttons', [2, 0, 0, 0, 0, 0]],
    ['Price published on its own website', [2, 1, 0, 0, 2, 2]],
    ['Sales, discounts and edits, person by person', [2, 1, 1, 1, 1, 0]],
    ['Alerts to the owner for unusual events', [2, 0, 0, 1, 0, 0]],
    ['Parcel tracking from dispatch to the door', [2, 0, 0, 0, 0, 0]],
    ['A free portal for the distributor', [2, 0, 0, 0, 0, 0]],
    ['The accountant sees every store in one login', [2, 0, 0, 0, 0, 0]],
    ['A recalled batch blocked at every counter', [2, 0, 0, 0, 0, 0]],
    ['The store’s own online shop', [2, 0, 0, 1, 1, 2]]
  ],
  /* 05 Distributor: portal or just send */
  ladder: [
    { n: '1', t: 'Send', when: 'From day one', tag: 'Start here',
      line: 'The order goes as a WhatsApp message, a PDF and a link.',
      pts: ['No login, no app, nothing to learn', 'They mark “available” or “short” on the link', 'They attach the bill file their software already makes'],
      store: 'Works with every distributor', dist: 'Zero effort', us: 'Costs paise per order' },
    { n: '2', t: 'Free distributor desk', when: 'In the launch release', tag: 'Then',
      line: 'One page for every order, every parcel and every payment from Pharmacy OS stores.',
      pts: ['Orders in one list, with their status', 'One bill file a day: each store imports its own', 'Dispatch with vehicle, LR and e-way bill', 'Delivery closed with an OTP', 'Payments matched to bills'],
      store: 'One-click receiving, a tracked parcel', dist: 'Fewer calls, faster payment', us: 'Each distributor brings stores' },
    { n: '3', t: 'Their billing too, free', when: 'At launch, if he wants it', tag: 'Also at launch',
      line: 'A full billing system for the distributor, for those ready to leave Marg or Unisolve.',
      pts: ['Stock, batches, GST and e-invoices', 'Their stores already connected', 'Or keep their software: we link to it'],
      store: 'Bills arrive by themselves', dist: 'No software fee, ever', us: 'A network that is hard to copy' }
  ],
  deskPts: [
    ['One file, every store', 'He exports the day’s bills once. Each store receives its own in one click.'],
    ['Dispatch in one place', 'Vehicle, LR and e-way bill. The store watches the parcel move.'],
    ['Paid sooner', 'Reminders three days before. UPI payments matched to the bill.'],
    ['Free, for good', 'We earn from stores, not from distributors.']
  ],
  /* 05 The whole chain: who uses it, what for, what it replaces, what it costs */
  eco: [
    { who: 'The store', price: 'Under ₹6,000 a year', sub: 'One counter, many counters, or many branches', uses: ['Order, receive, bill, remind', 'Team, alerts and every branch on the owner’s phone', 'Gives the accountant access'], replaces: 'Billing software, ordering apps, the H1 book, phone calls' },
    { who: 'The distributor', price: 'Free', sub: 'Order desk, dispatch and payments', uses: ['Takes orders from every store in one list', 'Sends the bill file and the parcel’s journey', 'Collects payments, matched to bills'], replaces: 'Order calls, chat groups, three ordering apps, “where is my parcel” calls' },
    { who: 'The accountant', price: 'Free, invited by the store', sub: 'Every store he serves, in one login', uses: ['Sales, purchases and GST, ready each month', 'Tally files for every store and branch', 'Asks the owner about a missing bill'], replaces: 'Bill photos on WhatsApp, Excel, typing purchases again into Tally' }
  ],
  ecoFlow: [
    ['Store to distributor', 'The order, and the payment'],
    ['Distributor to store', 'Short items, the bill file, the parcel on its way'],
    ['Store to accountant', 'Access, given once: sales, purchases, GST, Tally'],
    ['Accountant to store', 'A question on a missing or different bill'],
    ['Everything to the owner', 'Alerts, the weekly score and every branch, on one phone'],
    ['Branch to branch', 'Stock moved, tracked until the other store ticks it in']
  ],
  accPts: [
    ['Access from the store', 'The owner adds his accountant once, by phone number. He can take it back any time.'],
    ['Every store, one login', 'Thirty shops, three branches each: one list, with what is ready and what is missing.'],
    ['Nothing typed again', 'Sales and purchases come from the bills. GST summaries and Tally files are ready on the first.'],
    ['Read-only, logged', 'He sees and downloads. He cannot change a bill. Every look is recorded.']
  ],

  /* 06 One platform: six jobs, each a list of features with a screen */
  jobs: [
    { id: 'buy', name: 'Buy', icon: 'truck', line: 'Order to pay.',
      f: [['Morning order', 'order', 'Drafted overnight from sales and stock. One tap sends it.'], ['Compare distributors', 'compare', 'Rate, scheme and credit, side by side. The best is picked.'], ['Order status', 'send', 'Sent, seen, packed. Short items go to the next distributor.'], ['Parcel tracking', 'track', 'From packed to delivered, closed with an OTP at the door.'], ['Receive in one click', 'check', 'Their bill file is matched to your order. Or tick what came.'], ['Rate and scheme watch', 'watch', 'Overcharges and missing schemes, in rupees, claimed in one tap.'], ['Pay the distributor', 'dues', 'Due dates, with a reminder three days before'], ['Expiry returns', 'returns', 'A warning before each return date closes. Followed to the credit note.']] },
    { id: 'stock', name: 'Stock', icon: 'box', line: 'Know every strip.',
      f: [['Expiring in 60 days', 'expiry', 'With the rupee value at risk, by distributor'], ['Running low', 'lowstock', 'Days of stock left, with one tap to order'], ['Batch and shelf', 'stock', 'Oldest batch sells first'], ['Dead stock', 'deadstock', 'No sale in 90 days: return or move']] },
    { id: 'sell', name: 'Sell', icon: 'receipt', line: 'Fast, legal bills.',
      f: [['Counter bill', 'sell', 'Scan the pack or type three letters. UPI, cash, card, credit.'], ['“Not in stock” button', 'missed', 'One tap counts the missed sale and adds it to the next order.'], ['Substitutes', 'substitute', 'Same salt, in stock, shown when one runs out'], ['Prices and discounts', 'prices', 'Never above MRP. Rules by customer and item.'], ['Returns', 'salereturn', 'One tap from the old bill']] },
    { id: 'serve', name: 'Serve', icon: 'chat', line: 'Keep customers.',
      f: [['Bill on WhatsApp', 'wabill', 'To the buyer, as the sale closes. A link, not a photo.'], ['Online store', 'shop', 'The shop online in three steps. Orders come to the counter.'], ['Refill reminders', 'remind', 'Worked out from the strip and the dose'], ['Campaigns', 'campaign', 'Offers to a chosen group, with consent'], ['Customer page', 'customer', 'Purchases, dues and the family’s regular medicines']] },
    { id: 'money', name: 'Accounts', icon: 'rupee', line: 'CA-ready.',
      f: [['Day book', 'accounts', 'Sales, cash, UPI, expenses and profit'], ['Day close', 'dayclose', 'Cash counted against the bills, by person. Every edit shown.'], ['Money to collect', 'collect', 'Credit customers, with reminders'], ['GST files', 'gst', 'GSTR-1 and 3B summaries. Tally export.'], ['Accountant access', 'ca', 'Given by the owner. Read-only, every branch, everything downloads.']] },
    { id: 'law', name: 'Law', icon: 'shield', line: 'Always legal.',
      f: [['Schedule H1 register', 'h1', 'Doctor, patient, drug and quantity, filled from the bill'], ['Expired stock blocked', 'blocked', 'It cannot be billed. It moves to “to return”.'], ['Recall block', 'recall', 'A recalled batch stops at every counter. Buyers are listed.'], ['Inspection pack', 'inspect', 'Bills, registers and licences in one download'], ['Licence reminders', 'licence', '60 and 30 days before renewal']] },
    { id: 'team', name: 'Team', icon: 'users', line: 'Who did what.',
      f: [['Team performance', 'staffperf', 'Bills, sales, discounts and edits, per person'], ['People and roles', 'staff', 'Their own phone login. What each person may do.'], ['Owner alerts', 'alerts', 'Deleted bills, big discounts, cash differences, late parcels']] },
    { id: 'ahead', name: 'Look ahead', icon: 'trend', line: 'Know it first.',
      f: [['Ask the app', 'ask', 'Tap a question. Get a number and a list.'], ['Weekly store score', 'score', 'Four numbers, and one thing to do for each'], ['Next week’s demand', 'forecast', 'From the shop’s own bills, with the season learnt'], ['Refills due next week', 'refills', 'Who will come, and for what. Stock is ready first.'], ['Cash calendar', 'cash', 'What goes out and what comes in, day by day'], ['Expiry risk', 'risk', 'Batches that will not sell before their date']] }
  ],
  /* 06 Moving in from the old software */
  movein: [
    ['Bring the backup file', 'From Marg, Profitmaker or an Excel sheet. Nothing is changed in the old software.'],
    ['Check what we found', 'Medicines with batch and expiry, customers, distributors and dues. Only the doubtful ones need a look.'],
    ['Run both for a week', 'The old software stays on, and the old keys still work. One tap undoes the move.']
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
    ['Ask it a question', '“What is low today?” A number and a list come back.'],
    ['A score every Monday', 'Four numbers, and one thing to do for each'],
    ['Alerts that matter', 'Deleted bills, big discounts, cash short, late parcels'],
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
  /* Measured on the demo in section 05, at desktop and phone widths, in every state of the flow */
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
    { big: '24px', t: 'is the smallest tap target the web standard allows', s: 'WCAG 2.2 asks for 24px, and 44px for its top level. We use 44 or more.', src: 'wcag' },
    { big: '“manual punching”', t: 'is what the chemists’ own association asked suppliers to end', s: 'AIOCD letter to drug makers, 20 January 2021: send a file, match the batch to the stock.', src: 'aiocd' }
  ],
  people: [
    { first: 'Subba Rao', at: 56, name: 'The owner-pharmacist', img: 10823559, fp: [0.27, 0.32, 1.25],
      story: [['9:40 pm', 'Still typing the evening’s distributor bills, line by line.'], ['Next day', 'A customer finds an expired strip in her bag. She does not come back.'], ['Month end', 'The accountant asks, again, for the same purchase bills.']], where: 'One store, 22 years', uses: 'Desktop billing software', device: 'Old Windows PC, Android phone', lang: 'Telugu',
      quote: 'I type the same bill again every night.',
      wants: ['Text he can read without leaning in', 'Stock received without typing', 'Telugu on every screen'],
      pains: ['Small text and function keys', 'Typing the distributor’s bill line by line', 'Finding expired strips by accident'],
      win: 'Tick-first receiving, a text-size control, and a free move from his old software.' },
    { first: 'Imran', at: 27, name: 'The counter pharmacist', img: 13119975, fp: [0.47, 0.3, 1.5],
      story: [['11:00 am', 'Three customers wait while he hunts for the right batch.'], ['1:15 pm', 'An H1 sale goes into the paper book, if he remembers.'], ['5:40 pm', '“Telma 40? Not in stock.” The customer walks to the next shop.']], where: 'At the counter, ten hours a day', uses: 'Billing screen and a paper H1 book', device: 'Counter PC, barcode scanner', lang: 'Telugu, Hindi, English',
      quote: 'Three customers are waiting. I can’t hunt for a batch.',
      wants: ['Search that forgives spelling', 'The right batch picked for him', 'A substitute when stock runs out'],
      pains: ['Exact names only', 'Writing the H1 register by hand', 'Customers leaving when a medicine is “not there”'],
      win: 'Three letters to find a medicine, oldest batch first, and registers that fill themselves.' },
    { first: 'Kiran', at: 43, name: 'The owner of four stores', img: 31695306, fp: [0.74, 0.4, 1],
      story: [['8:00 pm', 'Four phone calls to four stores, to ask how the day went.'], ['Tuesday', 'A bill was deleted at one store. Nobody can say who.'], ['Month end', 'Stock has gone missing somewhere between two of his stores.']], where: 'Four stores in two towns', uses: 'A separate installation in each store', device: 'Phone, mostly', lang: 'Telugu, English',
      quote: 'I call each store to ask how the day went.',
      wants: ['All four stores on his phone', 'To know who sold what, and who changed a bill', 'An alert when something is wrong'],
      pains: ['Four sets of numbers', 'Stock “lost” between stores', 'No idea who changed a bill'],
      win: 'One owner view, approval rules, tracked transfers and a log of every edit.' },
    { first: 'Padma', at: 38, name: 'The accountant', img: 8837758, fp: [0.72, 0.4, 1.7],
      story: [['1st of the month', 'Thirty owners, thirty WhatsApp chats full of bill photos.'], ['Week two', 'A purchase does not match the distributor’s bill.'], ['The 20th', 'GST is due. Two stores still have not sent their files.']], where: 'Looks after 30 shops', uses: 'Tally, Excel, WhatsApp', device: 'Laptop', lang: 'English, Telugu',
      quote: 'Every month I ask for the same files.',
      wants: ['GST files without asking', 'A clean purchase register', 'Her own login'],
      pains: ['Photos of bills on WhatsApp', 'Purchases typed twice, with mistakes', 'Chasing owners at month end'],
      win: 'Every store he serves in one free login, given by the owners. GST summaries and Tally files ready on the first of the month.' },
    { first: 'Ramesh', at: 35, name: 'The distributor’s order desk', img: 36876208, fp: [0.5, 0.35, 1],
      story: [['10:00 am', 'Orders by call, voice note and three apps, all at once.'], ['2:00 pm', '“Where is my parcel?” Twelve calls before lunch.'], ['Month end', 'Chasing forty stores for payment, one by one.']], where: 'Takes orders from 400 chemists', uses: 'His firm’s software and three ordering apps', device: 'Desktop and WhatsApp', lang: 'Telugu, Hindi',
      quote: 'Orders come by call, by chat and from three apps.',
      wants: ['A clear order he can read once', 'No new login', 'To say “short” before the van leaves'],
      pains: ['Voice notes and handwriting photos', 'Returns for the wrong item', 'Chasing payments'],
      win: 'A clean order on WhatsApp with a link. A free desk for orders, dispatch, tracking and payments. Nothing to install, nothing to pay.' }
  ],
  flows: [
    { id: 'buy', name: 'The store buys stock', today: ['Check shelves by eye', 'Write the want list', 'Call or message the distributor', 'Goods and a paper bill arrive', 'Count against the paper', 'Type every line into the software', 'Fix batch and expiry mistakes', 'File the bill', 'Remember the due date'],
      os: ['Open “To order”. It is drafted, best distributor picked.', 'Send', 'Import the bill file, or tick what came', 'Done. Stock, expiry and dues are set.'] },
    { id: 'sell', name: 'The store makes a sale', today: ['Ask what they need', 'Search by the exact name', 'Pick a batch', 'Type the quantity', 'Write the H1 register', 'Print the bill', 'The customer is forgotten'],
      os: ['Scan the pack, or type three letters', 'Tap the quantity', 'Take UPI or cash', 'Done. Bill on WhatsApp, register filled, reminder set.'] },
    { id: 'dist', name: 'The distributor: order to cash', today: ['Take the order on a call or chat', 'Write it down', 'Check the stock', 'Pack', 'Type the bill', 'Call the store when it leaves', 'Answer “where is it?” calls', 'Chase the payment', 'Match the payment to the bill'],
      os: ['The order arrives in the dashboard', 'Mark what is short, pack', 'Send the bill file and the vehicle', 'Paid by UPI, matched by itself'] },
    { id: 'acc', name: 'The accountant: month end', today: ['Ask each owner for the files', 'Wait for photos on WhatsApp', 'Type purchases into Tally', 'Match them to distributor bills', 'Chase what is missing', 'Work out the GST', 'File'],
      os: ['Open the list of stores', 'Look only at what is flagged', 'Download GST and Tally files', 'File'] }
  ],
  ux: [
    { n: '01', t: 'Text they can read', s: 'Body text starts at 17px. One control sets the size for the whole app.', demo: 'type' },
    { n: '02', t: 'Buttons they can hit', s: 'Every target is 44px or more, with space around it.', demo: 'target' },
    { n: '03', t: 'One job per screen', s: 'Six words in the menu: Order, Receive, Stock, Bill, Customers, Reports.', demo: 'menu' },
    { n: '04', t: 'Their words, their language', s: '“Stock received”, not “GRN”. Telugu, English and Hindi.', demo: 'words' },
    { n: '05', t: 'Search that remembers', s: 'Three letters, any spelling. What the shop has used before comes first.', demo: 'search' },
    { n: '06', t: 'Stop the mistake', s: 'Expired stock cannot be billed. Undo, instead of “Are you sure?”', demo: 'undo' },
    { n: '07', t: 'Colour never alone', s: 'A red mark always comes with an icon and a word.', demo: 'colour' },
    { n: '08', t: 'Nothing moves', s: 'A button learnt once stays in its place after every update.', demo: 'still' }
  ],

  /* 13 Costs. Planning assumptions, October 2026 */
  build: [
    ['Salaries, 12 months', '₹145–215 L', 180], ['Sales and dealers', '₹30–50 L', 40], ['Cloud and tools', '₹6–18 L', 12], ['Medicine data', '₹5–15 L', 10], ['Legal and setup', '₹5–10 L', 7.5]
  ],
  team: [
    ['Tech lead', '1', '₹2.5–3.5 L a month'], ['Full-stack developers', '4', '₹1–1.7 L each'], ['Mobile developer', '1', '₹1–1.5 L'], ['UI/UX designer', '1', '₹0.8–1.2 L'],
    ['QA tester', '1', '₹0.6–0.9 L'], ['Distributor billing developers', '2', '₹1–1.7 L each'], ['Pharmacist, part-time', '1', '₹0.4–0.6 L'], ['Onboarding and support', '2', 'From month 6']
  ],
  prices: [
    { n: 'Vyapar, myBillBook', lo: 399, hi: 4299, s: 'a year' },
    { n: 'eVitalRx', lo: 7500, hi: 50000, s: 'a year' },
    { n: 'Marg ERP', lo: 8100, hi: 25200, s: 'once, plus ₹2,500 to ₹5,000 a year' },
    { n: 'GoFrugal', lo: 18000, hi: 50000, s: 'a store, a year, by a June 2026 guide. Not published now.' }
  ],

  /* 13 Why we win */
  whys: [
    { n: '1', t: 'Nothing typed twice', s: 'One click when the distributor sends a file. Ticks when he does not.', go: '#try', cta: 'Try it', vis: 'typed' },
    { n: '2', t: 'The owner can read it', s: 'Large text, big buttons, plain words, Telugu.', go: '#ux', cta: 'See the rules', vis: 'aa' },
    { n: '3', t: 'It keeps the shop safe', s: 'Expired and recalled stock stopped at the counter. Every sale on record.', go: '#gap', cta: 'The incidents', vis: 'shield' },
    { n: '4', t: 'It watches the shop for him', s: 'Deleted bills, big discounts, cash differences and late parcels, in one list.', go: '#platform', cta: 'See the screens', vis: 'bell' },
    { n: '5', t: 'One price, on the page', s: 'Under ₹6,000 a year for every feature here. WhatsApp messages are extra, at cost.', go: '#costs', cta: 'The costs', vis: 'price' },
    { n: '6', t: 'The whole chain comes with it', s: 'His distributor and accountant join free. Nobody types the same bill twice.', go: '#distributor', cta: 'See the chain', vis: 'chain' }
  ],
  /* 13 The same feature, a different product: [what, in today's software, in Pharmacy OS] */
  diff: [
    ['Ordering', 'Inside the billing software for distributors on the same network. For the rest: another app, WhatsApp or a call.', 'One screen for every distributor, with the best rate and scheme picked. A WhatsApp link for those with no software.'],
    ['Receiving stock', 'One-click import when a file comes. Line-by-line typing when it does not.', 'One-click import when a file comes. Ticks against your own order when it does not.'],
    ['Checking the bill', 'A separate app or a paid add-on, where it exists.', 'Order, bill and goods side by side as stock is received. Differences shown in rupees.'],
    ['WhatsApp bills', 'Often a paid add-on. One product lists ₹25,000 to switch it on, with messages on top.', 'On from the first day. No setup fee. The store pays only for messages sent.'],
    ['Reading the screen', 'We found no pharmacy product that documents Telugu screens or a text-size control.', 'Telugu or English, three text sizes and 44px buttons, on every screen.'],
    ['The price', 'Often quoted by a dealer, with renewals and add-ons on top.', 'One price on the website: under ₹6,000 a year.'],
    ['Moving in', 'Charged for, where a price is listed: ₹3,000 to ₹5,000 at one product.', 'Done by our team, free. One tap takes it back in the first 30 days.'],
    ['The distributor', 'His own billing software, plus calls, chat groups and ordering apps to take orders.', 'A free desk for orders, dispatch, tracking and payments, linked to every store.'],
    ['The accountant', 'Bill photos on WhatsApp, typed again into Tally.', 'Free access from the store: every branch, GST and Tally files ready, nothing to type.'],
    ['Delivery', 'A phone call to ask where the parcel is.', 'Tracked from packed to delivered, closed with an OTP.'],
    ['The staff', 'Often one shared login. Hard to tell who changed a bill.', 'Each person signs in with their own phone: sales, discounts and edits by name.']
  ],
  moats: [
    ['Every distributor’s format', 'Each bill format we learn makes the next store faster to set up.'],
    ['The registers', 'H1 and inspection records live with us. Leaving feels risky.'],
    ['Local trust', 'Telugu support, dealers and on-site moves cannot be copied from far away.'],
    ['What the data teaches', 'Sales across many stores make reorder advice better each month.']
  ],
  asks: [
    ['Strong products exist. Why would a store switch?', 'Because their daily work does not shrink with those products. Ours removes the typing, keeps the shop safe, the owner can read it, and we move the data for free.'],
    ['Marg already imports the distributor’s bill in one click.', 'Yes, and so do we. What we add is the store’s own order beside the bill, so only the differences need a look, plus recalls, tracking and the accountant, on screens an owner over fifty can read.'],
    ['A Marg store renews for ₹2,500 to ₹5,000 a year. Why pay more?', 'We do not beat a renewal on price. We win on hours and on money found: no purchase typing, no register by hand, overcharges and expiry caught. Section 12 shows the store’s own number.'],
    ['Distributors already run Marg or Unisolve. Why open yours?', 'They do not have to leave it. The free dashboard takes orders, sends the bill file and tracks dispatch beside their billing. Free billing is there at launch for those who want it.'],
    ['If distributors and accountants pay nothing, who pays?', 'The store, under ₹6,000 a year. Each distributor and accountant who joins brings his stores with him. Later: the online store add-on, payments, and credit through a lending partner.'],
    ['How do you earn at under ₹6,000 a year?', 'A store costs us about ₹1,800 a year to serve: cloud, support and payments. WhatsApp messages are paid by the store as used. At ₹5,500 that leaves about ₹3,700 from each store.'],
    ['Will owners over fifty change software?', 'They will if the first day is easier than their last one. We move the data in one or two days, keep the old software readable for thirty, and sit with them in Telugu.'],
    ['Can a pharmacy sell online?', 'The online store lets regulars order from their own shop. Prescription medicines are packed only after the pharmacist sees the prescription. The rules for online sale are still being written, and the add-on follows them as they are notified.']
  ],

  /* 14 Why now */
  now: [
    ['Apr 2018', 'E-way bill above ₹50,000 in AP and Telangana', 'Bigger deliveries already carry one. It travels with the order.', 'eway', 1],
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
    ['Months 2–7', 'Build', ['Morning order, compare distributors', 'One-click bill import, tick to receive', 'Offline billing with pack scan', 'Staff logins, owner alerts', 'H1 register, GST, owner app, Telugu', 'Move from Marg and Profitmaker'], '50 pilot stores billing daily'],
    ['Months 7–12', 'Launch', ['Free distributor desk: orders, dispatch, tracking, payments', 'Free distributor billing, Unisolve-class', 'Free accountant portal', 'Rate and scheme watch, return dates', 'Refill reminders, day close, cash calendar', 'Many-store rules', 'Dealer network'], '300 paying stores'],
    ['Months 12–36', 'Scale', ['Demand forecast, expiry risk', 'Ask the app, store score', 'Links to distributors’ old software', 'Pay-later credit, with a lending partner', 'GST filing', 'Karnataka next'], '3,000 stores']
  ],
  open: [
    ['Yearly or monthly', 'The plan is under ₹6,000 a year. Should a store pay once a year, or about ₹500 a month?'],
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
    margpharm: ['Marg ERP: pharmacy software page', 'https://margcompusoft.com/pharmacy-software.html'],
    margprice: ['IT for SME: Marg ERP editions and prices', 'https://itforsme.in/pricing/marg-erp-india'],
    capterra: ['Capterra: Marg ERP 9+ reviews', 'https://www.capterra.com/p/151832/Erp-Software-9/'],
    cost: ['Codingclave: pharmacy software cost in India, June 2026', 'https://codingclave.com/guides/pharmacy-management-software-cost-india-2026'],
    gosure: ['GoFrugal: GoSure goods-received app', 'https://www.gofrugal.com/inventory-app/grn-goods-received-note.html'],
    gofrugalimport: ['GoFrugal: purchase import', 'https://community.gofrugal.com/portal/en/kb/articles/purchase-import'],
    prices26: ['Nesayo: pharmacy software prices checked 6 September 2026', 'https://nesayo.com/blog/best-pharmacy-software-india-2026'],
    evital: ['eVitalRx: product site', 'https://www.evitalrx.in/'],
    evitalprice: ['eVitalRx plans: prices', 'https://www.evitalrx.in/pricing'],
    evitalapp: ['App Store: eVitalRx listing, CSV upload', 'https://apps.apple.com/app/id1637429769'],
    csquare: ['Fibre2Fashion: Reliance to acquire C-Square', 'https://www.fibre2fashion.com/news/e-commerce-logistics/reliance-to-acquire-c-square-to-augment-e-com-services-247815-newsdetails.htm'],
    medivision: ['Techjockey: Medivision Gold Retail', 'https://techjockey.com/detail/medivision-gold-retail'],
    pharmarack: ['Pharmarack: company site', 'https://pharmarack.org/'],
    pharmarackplay: ['Google Play: Pharmarack Retailer 2.0, listing and reviews', 'https://play.google.com/store/apps/details?id=com.growthaccel.pharmarack_retailer.pharmarack_retailer&hl=en_IN'],
    pharmarackfin: ['Inc42: Pharmarack financials', 'https://inc42.com/company/pharmarack/financials/'],
    retailio: ['App Store: Retailio retailer app', 'https://apps.apple.com/app/id1245047831'],
    vyapar: ['Vyapar: languages listed on its site', 'https://vyaparapp.in/'],
    photo: ['Pharmacy Pro: purchase bills read from email', 'https://pharmacypro.io/features/purchase-inward'],
    coldrif: ['Tribune: Maharashtra FDA flags the Coldrif batch linked to child deaths, Oct 2025', 'https://www.tribuneindia.com/news/india/maharashtra-fda-flags-coldrif-syrup-batch-linked-to-child-deaths'],
    bakaram: ['Telangana Today: TG SAFE raids an unlicensed medical shop, Sep 2026', 'https://telanganatoday.com/tg-safe-raids-unlicensed-medical-shop-in-musheerabad'],
    gabazen: ['Telangana Today: DCA busts a fake nutraceutical racket, Aug 2026', 'https://telanganatoday.com/telangana-dca-busts-fake-nutraceutical-racket-in-hyderabad'],
    expired: ['Daily Pioneer: expired cough syrup given to children in Kanpur, 2026', 'https://dailypioneer.com/news/kanpur-expired-cough-syrup-flood-relief-children-fall-ill'],
    expired2: ['Odisha Bytes: children fall ill after expired medicines, 2026', 'https://odishabytes.com/3-children-fall-ill-after-consuming-expired-medicines/amp/'],
    rivalshots: ['Competitor screens: from each product’s own site, app-store page, or its listing on SoftwareSuggest and Techjockey', ''],
    eway: ['Busy: state-wise e-way bill limits', 'https://busy.in/gst/state-wise-threshold-limits-for-e-way-bills'],
    unisolve: ['SWIL: Unisolve for pharma distributors', 'https://www.swindia.com/unisolve-software/'],
    logicerp: ['Logic ERP: pharma distribution software', 'https://www.logicerp.com/distribution/pharma-and-healthcare/pharmacy-distribution-software'],
    apeds: ['L V Prasad Eye Institute: 15-year incidence of presbyopia, APEDS (BJO 2025)', 'https://www.lvpei.org/news/fifteen-year-incidence-of-presbyopia-in-andhra-pradesh/'],
    nng: ['Nielsen Norman Group: usability for older adults', 'https://www.nngroup.com/articles/usability-for-senior-citizens/'],
    wcag: ['W3C: WCAG 2.2, target size', 'https://www.w3.org/TR/WCAG22/#target-size-minimum'],
    older: ['W3C: older users and web accessibility', 'https://www.w3.org/WAI/older-users/'],
    wa: ['AiSensy: WhatsApp per-message prices from 1 Jan 2026', 'https://news.aisensy.com/123053-whatsapp-per-message-pricing-update-effective-january-1-2026'],
    gst: ['Lakshmikumaran & Sridharan: GST rate changes for pharma', 'https://lakshmisri.com/newsroom/news-briefings/impact-of-gst-rate-changes-on-the-health-and-pharma-sector'],
    raid: ['Telangana Today: TG SAFE raids, 2 Sep 2026', 'https://telanganatoday.com/tg-safe-raids-medical-shops-over-illegal-sale-of-habit-forming-drugs'],
    bandh: ['Outlook: chemists’ bandh on 20 May 2026', 'https://www.outlookindia.com/amp/story/healthcare-spotlight/chemists-intensify-protest-against-e-pharmacies-call-for-nationwide-bandh-on-may-20'],
    quick: ['CXO Digital Pulse: Zepto Pharmacy; MedPlus Q1 FY27 investor deck', 'https://www.cxodigitalpulse.com/zepto-enters-10-minute-medicine-delivery-space-with-zepto-pharmacy-rollout-in-major-cities/'],
    medplus: ['MedPlus: Q1 FY27 investor presentation', 'https://nsearchives.nseindia.com/corporate/MEDPLUS_21072026194228_Medplusinvestorpresentataion.pdf'],
    qr: ['CDSCO: FAQs on QR codes for Schedule H2 drugs', 'https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2018/UploadPublic_NoticesFiles/Final%20FAQs%20on%20QR%20code%2021.07.2023.pdf'],
    dpdp: ['Khaitan & Co: DPDP Rules timeline', 'https://www.khaitanco.com/sites/default/files/2025-11/ERGO%20-%20Digital%20Personal%20%20Data%20Protection%20Rules%20-%2015%20November%202025.pdf']
  }
};
