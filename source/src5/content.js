/* ===== Heaven Gadgets growth plan: content. Every line is short on purpose. Names, products and numbers inside the screens are samples. ===== */
const C = {
  /* The customer loop. on = online buyer, st = store buyer */
  steps: [
    { name: 'Discover', short: 'Reels, friends, ads', out: 'Every view can land on a product',
      on: ['Sees a reel or a Meta ad', 'Taps the link to the product'], st: ['Hears from a friend', 'Sees the store on Google Maps'],
      runs: ['Reels linked to products', 'Meta ads and Google profile', 'Refer-a-friend codes'], today: 'Reels end at “DM for price”' },
    { name: 'Visit', short: 'Website or the store', out: 'Your shop never closes',
      on: ['Opens the website, day or night', 'Same products, same prices as the store'], st: ['Walks into the store', 'Map, timings and WhatsApp in one tap'],
      runs: ['Online store', 'Store page with map and timings'], today: 'Only the store, only in store hours' },
    { name: 'Browse', short: 'Prices, sizes, live stock', out: 'No wasted trips',
      on: ['Filters by size, colour and price', 'Sees what is really in stock'], st: ['Staff check sizes on a tablet', 'Reserve online, pick up today'],
      runs: ['Inventory by size and colour', 'Reels on product pages'], today: '“Is size 9 there?” calls' },
    { name: 'Buy', short: 'Pay online or at the counter', out: 'Money first, then dispatch',
      on: ['Pays in full by UPI or card', 'No cash on delivery'], st: ['Billed at the counter', 'Cash, UPI or card'],
      runs: ['Secure checkout', 'Billing counter'], today: 'UPI screenshots in chats' },
    { name: 'Bill', short: 'The bill lands on WhatsApp', out: 'Every sale on record',
      on: ['Order bill on WhatsApp', 'GST or simple bill'], st: ['Counter bill on WhatsApp', 'No paper to lose'],
      runs: ['WhatsApp engine', 'Billing counter'], today: 'No bill, or a paper one' },
    { name: 'Deliver', short: 'Packed, shipped, tracked', out: 'Fewer “where is it?” calls',
      on: ['Packed and couriered across India', 'Tracking link on WhatsApp'], st: ['Walks out with it', 'Easy size exchange later'],
      runs: ['Orders & shipping board', 'Courier labels'], today: '“Bro, where is my parcel?”' },
    { name: 'Remember', short: 'Every buyer saved', out: 'Know your regulars',
      on: ['Saved from the order', 'Size, city and taste kept'], st: ['Saved from the bill', 'Points added to the number'],
      runs: ['Customers & loyalty', 'One customer record'], today: 'Buyers forgotten after the sale' },
    { name: 'Return', short: 'Offers, drops and calls', out: 'One-time buyers become regulars',
      on: ['Taps a WhatsApp offer', 'Gets a back-in-stock alert'], st: ['Gets a call before the sale', 'Brings a friend with a code'],
      runs: ['WhatsApp engine', 'AI voice agent'], today: 'Offers vanish with the 24-hour story' }
  ],

  /* What we found: [finding, detail] numbered on the Instagram screen */
  audit: [
    ['No prices', 'Every post ends at “DM for price”.'],
    ['Orders by DM', 'One chat at a time, easy to miss.'],
    ['No website', 'Ads and Google have nowhere to land.'],
    ['Offers vanish', 'Stories last 24 hours, then they’re gone.']
  ],

  /* Before -> after chips: [today, with the system, column, scattered xy+rot, ordered xy, scattered mobile, ordered mobile] */
  mess: [
    ['“DM for price”', 'Price on every product', 'found', [13, 17, -6], [18, 25], [22, 12, -6], [27, 14]],
    ['“Is size 9 there?”', 'Live stock online', 'found', [79, 13, 5], [18, 37], [70, 10, 5], [73, 14]],
    ['Product screenshots', 'Online catalogue', 'found', [36, 30, 4], [18, 49], [34, 24, 4], [27, 25]],
    ['UPI screenshots', 'Secure checkout', 'found', [63, 24, -5], [18, 61], [72, 30, -5], [73, 25]],
    ['Orders in a notebook', 'Orders board', 'grow', [87, 41, 7], [50, 25], [26, 40, 7], [27, 40]],
    ['Stock in memory', 'Live inventory', 'grow', [17, 51, 3], [50, 37], [70, 46, 3], [73, 40]],
    ['Paper bills, or none', 'Billing counter', 'grow', [52, 53, -4], [50, 49], [30, 56, -4], [27, 51]],
    ['“Where’s my parcel?”', 'Tracking on WhatsApp', 'grow', [80, 63, 6], [50, 61], [72, 62, 6], [73, 51]],
    ['Offers in stories', 'Offers to every buyer', 'deliver', [16, 80, -7], [82, 25], [26, 72, -7], [27, 66]],
    ['Forgotten buyers', 'Customer list', 'deliver', [45, 77, 5], [82, 37], [66, 79, 5], [73, 66]],
    ['Boosted posts', 'Meta ads that sell', 'deliver', [68, 89, -3], [82, 49], [30, 88, -3], [27, 77]],
    ['Guesswork', 'Sales reports', 'deliver', [89, 83, 6], [82, 61], [74, 91, 6], [73, 77]]
  ],
  messLinks: [[0, 2, 1], [2, 3, 0], [3, 7, 1], [6, 9, 0], [5, 6, 1], [4, 5, 0], [10, 1, 0], [11, 8, 1], [7, 10, 0], [9, 0, 0], [1, 4, 1], [8, 3, 0]],

  pains: [
    ['Customers DM for the price, then leave', 'Prices on every product, day and night'],
    ['“Is size 9 there?” means a call and a shelf check', 'Live stock by size and colour'],
    ['Orders buried under chats', 'Every order on one board'],
    ['Payments arrive as UPI screenshots', 'Checkout that records every payment'],
    ['Offers seen only by people who catch the story', 'Offers on WhatsApp to every buyer'],
    ['“Where’s my parcel?” calls all day', 'Tracking sent for you'],
    ['Nobody knows who the regulars are', 'Every buyer saved, with size and history'],
    ['Ads boost posts with nowhere to buy', 'A store built for Meta ads']
  ],

  /* Funnel: [step, today out of 100, with the system, why it leaks, what fixes it] */
  funnel: [
    ['See the reel', 100, 100, 'Your reels already work', 'Same reel, with a link'],
    ['Want to know the price', 60, 70, 'Price hidden behind a DM', 'Price on the product'],
    ['Ask, or open the product', 35, 60, 'Many never send the DM', 'One tap, no chat needed'],
    ['Find their size', 20, 45, 'Late replies, sold-out sizes', 'Live stock, reserve online'],
    ['Pay', 12, 30, 'Payment by screenshot', 'UPI or card checkout'],
    ['Come back', 3, 12, 'No list, no reminder', 'WhatsApp offers and calls']
  ],

  /* One bill: [what happens, where, example] */
  chain: [
    ['Stock updated', 'Inventory', 'Clog · UK 9 · 4 → 3 left'],
    ['Bill sent on WhatsApp', 'WhatsApp', 'PDF to Ravi, delivered'],
    ['Customer saved', 'Customers', 'Ravi K. · UK 9 · 3rd buy'],
    ['Points added', 'Loyalty', '+30 Heaven points'],
    ['Sales updated', 'Dashboard', 'Today ₹42,380 · 31 bills'],
    ['Low stock flagged', 'Inventory', 'UK 9 · reorder suggested'],
    ['Follow-up set', 'WhatsApp', 'New-drop alert in 30 days']
  ],
  engine: ['Bill by phone number first', 'Scan a barcode or tap the item', 'Cash, UPI or card, even split', 'GST or simple bill', 'PDF on WhatsApp, no paper', 'Returns and size exchanges', 'Points earned and used', 'Day-end cash and UPI report', 'Every bill searchable forever'],

  /* Eight tools. vis = the mini screen */
  tools: [
    { name: 'Online store', who: 'Your customers', vis: 'store', layer: 'Sell',
      does: ['Every product with price and photos', 'Sizes and colours with live stock', 'UPI and card checkout, prepaid only', 'Reels on product pages', 'Order tracking for buyers', 'Ready for Meta ads and Google'], replaces: 'DMs and screenshots' },
    { name: 'Billing counter', who: 'Counter staff', vis: 'pos', layer: 'Sell',
      does: ['Phone number first, customer found', 'Scan or tap to add items', 'Cash, UPI or card', 'GST or simple bills', 'Bill sent on WhatsApp', 'Returns and exchanges'], replaces: 'Paper bills, or none' },
    { name: 'Orders & shipping', who: 'Packing staff', vis: 'orders', layer: 'Sell',
      does: ['Paid, packed, shipped, delivered', 'Prepaid orders only', 'Courier labels in one click', 'Tracking link to the buyer', 'Returns back to stock'], replaces: 'A notebook of orders' },
    { name: 'Inventory', who: 'You and the staff', vis: 'stock', layer: 'Run',
      does: ['Stock by size and colour', 'Sell in store, website updates', 'Low-stock alerts', 'Barcode labels', 'Supplier purchase entries', 'Slow-stock report'], replaces: 'Stock in someone’s memory' },
    { name: 'Owner dashboard', who: 'You', vis: 'kpis', layer: 'Run',
      does: ['Sales today, store and online', 'Best sellers and slow stock', 'Orders waiting to ship', 'Daily report on WhatsApp', 'Every branch, one login'], replaces: 'Counting cash at night' },
    { name: 'Customers & loyalty', who: 'You', vis: 'crm', layer: 'Grow',
      does: ['Every buyer from store and web', 'Purchase history and sizes', 'New, regular and VIP groups', 'Points and referral codes', 'Birthdays and favourite categories'], replaces: 'Buyers forgotten after the sale' },
    { name: 'WhatsApp engine', who: 'Runs on its own', vis: 'blast', layer: 'Grow',
      does: ['Bills and order updates', 'Offers to the right group', 'New-drop and back-in-stock alerts', 'Cart reminders', 'Daily report to the owner', 'Opt-in only, with an easy stop'], replaces: 'Offers lost in 24-hour stories' },
    { name: 'AI voice agent', who: 'Runs on its own', vis: 'voice', layer: 'Grow',
      does: ['Invites regulars to drops and sales', 'Confirms orders and addresses', 'Answers “is it in stock?”', 'Asks for feedback after a buy', 'Calls only people who opted in'], replaces: 'Calls nobody has time for' }
  ],

  /* One day, three views: [time, event, colour] per time block */
  day: {
    owner: {
      feats: ['Sales report on WhatsApp at 9', 'Low-stock and late-order alerts', 'Offers and calls that run on their own'],
      days: [[['09:00', 'Yesterday’s report on WhatsApp', 'violet'], ['10:00', 'Store opens', 'line']], [['13:00', '6 online orders paid', 'volt'], ['14:00', 'Low stock · UK 9', '']], [['17:00', 'Voice agent invites 40 regulars', 'violet'], ['19:30', 'New drop to sneaker fans', 'volt']], [['21:00', 'Cart reminders sent', ''], ['22:00', 'Day closed · ₹42,380', 'line']], [['02:00', '3 orders while you sleep', 'volt'], ['02:30', 'Night stock check', '']]]
    },
    customer: {
      feats: ['Sees a reel, buys in two taps', 'Bill and tracking on WhatsApp', 'Hears about drops in their size'],
      days: [[['08:30', 'Sees your reel on the bus', 'violet']], [['13:10', 'Buys the clog, pays by UPI', 'volt'], ['13:11', 'Bill on WhatsApp', '']], [['18:00', 'Tracking · out for delivery', 'line']], [['20:15', 'Unboxes and tags you', 'violet']], [['Day 30', '“Your size is back”', 'volt']]]
    },
    staff: {
      feats: ['Bill in a few taps', 'Paid orders to pack, labels ready', 'Size checks on a tablet'],
      days: [[['10:00', 'Check today’s orders', 'line'], ['10:30', 'Pack 6 paid orders', 'volt']], [['12:00', 'Courier pickup · labels ready', '']], [['17:00', 'Counter rush · 18 bills', 'violet']], [['20:00', 'Returns back to stock', ''], ['21:30', 'Cash and UPI match', 'line']], [['', 'Off. The system keeps going.', 'line']]]
    }
  },

  /* Youth research: [stat, line, source] */
  stats: [
    ['8 in 10', 'Indian shoppers discover new products on social media', 'Meta × GWI, 2025'],
    ['~60%', 'are likely to buy after seeing an offer on WhatsApp', 'Meta × GWI, 2025'],
    ['1.7×', 'more likely: Gen Z picking trending styles', 'Snap × BCG, 2024'],
    ['90%+', 'of Gen Z digital payers prefer UPI', 'Bain & Co., 2025'],
    ['3 in 5', 'new online shoppers since 2020 live in tier-3 and smaller towns', 'Bain & Co., 2025']
  ],

  /* Five buyers. leak = the loop step where they drop today (index into steps) */
  people: [
    { name: 'The college sneakerhead', short: 'Sneakerhead', age: '18–22', where: 'Colleges in and around Ongole', icon: 'sneaker', quote: 'Is the new pair there in my size?',
      budget: '₹800–2,500', finds: 'Instagram Reels', pays: 'UPI', leak: 2, why: 'Can’t see sizes without a DM, and hates waiting for the reply.',
      wants: ['Price and size online', 'First look at new drops', 'Student offers'], win: 'Drop alerts on WhatsApp and Student Fridays', tools: ['Online store', 'Inventory', 'WhatsApp engine'] },
    { name: 'The first-job flexer', short: 'First job', age: '22–28', where: 'Back home, or working in a city', icon: 'watch', quote: 'Payday watch. Can it come by Friday?',
      budget: '₹1,500–5,000', finds: 'Reels and YouTube reviews', pays: 'UPI or card', leak: 5, why: 'Pays, then hears nothing until the parcel arrives.',
      wants: ['Real photos and reviews', 'Fast prepaid delivery', 'Combo deals'], win: 'Quick dispatch, tracking and combo offers', tools: ['Online store', 'Orders & shipping'] },
    { name: 'The gift hunter', short: 'Gift hunter', age: '17–30', where: 'Birthdays, Rakhi, Valentine’s', icon: 'gift', quote: 'Birthday is tomorrow. Help!',
      budget: '₹500–3,000', finds: 'WhatsApp and friends', pays: 'UPI', leak: 3, why: 'Too many choices, no guidance, and it’s needed today.',
      wants: ['Gift ideas by budget', 'Gift wrap', 'Pick up today'], win: 'A gift finder plus reserve-and-pick-up', tools: ['Online store', 'Billing counter'] },
    { name: 'The district shopper', short: 'District', age: '18–35', where: 'Kandukur, Addanki, Markapur', icon: 'pin', quote: 'Is it in stock before I travel?',
      budget: '₹1,000–4,000', finds: 'Instagram and word of mouth', pays: 'UPI or cash', leak: 1, why: 'Travels an hour, then finds the size sold out.',
      wants: ['Live stock', 'Reserve online', 'Ship home instead'], win: 'Live stock and reserve online', tools: ['Inventory', 'Online store'] },
    { name: 'The out-of-town fan', short: 'Out of town', age: '18–30', where: 'Hyderabad, Chennai, Bengaluru', icon: 'globe', quote: 'Saw your reel. Can you ship to Hyderabad?',
      budget: '₹1,000–3,000', finds: 'Reels', pays: 'UPI, prepaid', leak: 3, why: 'Paying a stranger on chat feels risky.',
      wants: ['Secure checkout', 'Tracking', 'Easy size exchange'], win: 'A real store website with tracking', tools: ['Online store', 'Orders & shipping'] }
  ],
  tactics: ['Drop countdowns', 'Every reel ends at a buy button', 'Student Fridays', 'Refer a friend', 'Tag-us rewards', '“Your size is back” alerts', 'Festival calendar', 'Regulars club'],

  plugs: ['Missed and late chats', '“Sold out” surprises', 'Offers nobody sees', 'Buyers who never return'],

  /* Process: [code, phase, items, why, when] */
  road: [
    ['00', 'Connect', ['Store visit', 'Your goals and numbers', 'How the counter runs today'], 'We see the store before we plan anything.', 'Day 1'],
    ['01', 'Discover', ['Read your chats and reels', 'Talk to buyers and staff', 'Study stores nearby'], 'We learn why people buy, and why they leave.', 'Week 1'],
    ['02', 'Define', ['Customer loop and flows', 'Catalogue and sizes', 'Offers and points plan'], 'You approve the plan before design starts.', 'Week 2'],
    ['03', 'Design', ['Website screens', 'Billing counter', 'Owner dashboard'], 'You click through every screen before we build.', 'Week 3'],
    ['04', 'Build', ['Store, stock and billing', 'WhatsApp and payments', 'Voice agent'], 'A weekly demo on your phone.', 'Weeks 4–6'],
    ['05', 'Launch', ['Products loaded', 'Staff trained', 'First offer sent'], 'Live in about seven weeks.', 'Week 7'],
    ['06', 'Grow', ['Meta ads', 'Monthly offers', 'A review every month'], 'We stay to make it earn.', 'Every month'],
    ['Next', 'Branches', ['A second store', 'One stock across stores', 'One dashboard, every branch'], 'When you are ready to open the next one.', 'When ready']
  ],
  need: ['Product list', 'Photos, or we shoot them', 'Logo and colours', 'WhatsApp Business number', 'GST details, if any', 'One hour a week'],

  /* Selected work, in the agency site’s order */
  work: [
    { name: 'Beere Kesava ERP', what: 'An ERP for a silk saree business in Dharmavaram.', line: 'Billing, stock, WhatsApp bills and six role portals. The same engine your counter and stock would run on.',
      img: '../img/bk-dash.webp', tags: ['ERP', 'Billing & stock', 'Live'], href: 'https://erp.beere-kesava-and-brothers.org/', cta: 'Open the live ERP', deck: '../beere-kesava/' },
    { name: 'Ornate ’26', what: 'A space-themed website and event system for RGUKT Ongole’s fest.', line: 'Built for Ongole’s students, the same buyers who follow your reels.',
      img: '../img/ornate-4.webp', tags: ['Fest website', 'Ongole'], href: 'https://ornate-one.vercel.app/', cta: 'Visit the site' },
    { name: 'Aaravi Collectives', what: 'A brand website for a luxury silk saree label.', line: 'Story-led pages that build trust before the first sale.',
      img: '../img/aaravi-4.webp', tags: ['Brand website', 'Storytelling'], href: 'https://aaravi-collectives.vercel.app/', cta: 'View live' },
    { name: 'NGB · Nawin Golden Boy', what: 'A website for a fitness coaching brand.', line: 'Bold, fast and built to turn visitors into sign-ups.',
      img: '../img/ngb-1.webp', tags: ['Website', 'Live'], href: 'https://fitness-platform-ngb.vercel.app/', cta: 'View live' },
    { name: 'LimitX', what: 'A mobile app for paying tuition fees.', line: 'Payments that feel safe on a phone. Flutter, Android and iOS.',
      img: '../img/limitx-1.webp', tags: ['Mobile app', 'Payments'], href: 'https://timelly.in/limitx', cta: 'View live', phone: true }
  ]
};
