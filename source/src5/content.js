/* ===== Heaven Gadgets growth plan. Every line is short on purpose. Products, names and numbers inside the screens are samples. ===== */
const C = {
  acts: [
    { id: 'attract', name: 'Attract', sub: 'They find you' },
    { id: 'convert', name: 'Convert', sub: 'They buy' },
    { id: 'deliver', name: 'Deliver', sub: 'It reaches them' },
    { id: 'retain', name: 'Retain', sub: 'They come back' }
  ],

  /* The new flow: one loop for online and store buyers. on/st = what changes by lane */
  steps: [
    { id: 'discover', n: '01', act: 'attract', name: 'Discover', icon: 'spark', vis: 'reels',
      line: 'Reels, friends and ads bring them in.', on: 'Sees a reel or an ad', st: 'Hears from a friend',
      who: 'Your next customer', what: ['Word of mouth', 'Your reels and YouTube', 'Meta ads and Google'], today: 'Reels end at “DM for price”', gives: 'Every view can land on a product' },
    { id: 'visit', n: '02', act: 'convert', name: 'Visit', icon: 'store', vis: 'home',
      line: 'Open the website, or walk into the store.', on: 'Opens the website', st: 'Walks into the store',
      who: 'Customer', what: ['Website open 24/7', 'Map, timings, one tap to WhatsApp', 'Same products, same prices'], today: 'Only the store, only in store hours', gives: 'Your shop never closes' },
    { id: 'browse', n: '03', act: 'convert', name: 'Browse', icon: 'search', vis: 'product',
      line: 'Real prices. Live stock. Every size.', on: 'Filters by size and price', st: 'Staff check stock on a tablet',
      who: 'Customer · Store staff', what: ['Price on every product', 'Sizes and colours in stock', 'Reels on product pages'], today: '“Is size 9 there?” calls', gives: 'No more wasted trips' },
    { id: 'buy', n: '04', act: 'convert', name: 'Buy', icon: 'card', vis: 'checkout',
      line: 'Pay in full online, or at the counter.', on: 'Pays in full: UPI or card', st: 'Billed at the counter',
      who: 'Customer · Counter staff', what: ['UPI, card or net banking', 'Prepaid online orders', 'Counter bill in a few taps'], today: 'UPI screenshots in chats', gives: 'Money first. Then dispatch.' },
    { id: 'bill', n: '05', act: 'deliver', name: 'Bill', icon: 'chat', vis: 'wabill',
      line: 'The bill lands on WhatsApp.', on: 'Order bill on WhatsApp', st: 'Counter bill on WhatsApp',
      who: 'Automatic', what: ['Online and store bills', 'GST or simple bill', 'Kept forever, searchable'], today: 'No bill, or a paper one', gives: 'Every sale on record' },
    { id: 'deliver', n: '06', act: 'deliver', name: 'Deliver', icon: 'truck', vis: 'track',
      line: 'Packed, shipped and tracked. All India.', on: 'Shipped with tracking', st: 'Walks out with it',
      who: 'Packing staff', what: ['Orders board: new to delivered', 'Courier label and tracking link', 'Updates on WhatsApp'], today: '“Bro, where is my parcel?”', gives: 'Fewer “where is it?” calls' },
    { id: 'remember', n: '07', act: 'retain', name: 'Remember', icon: 'user', vis: 'crm',
      line: 'Every buyer saved. Size, taste, history.', on: 'Saved from the order', st: 'Saved from the bill',
      who: 'Owner', what: ['Name, number and city', 'What they bought, their size', 'Birthday and favourite category'], today: 'Buyers forgotten after the sale', gives: 'Know your regulars' },
    { id: 'return', n: '08', act: 'retain', name: 'Return', icon: 'repeat', vis: 'blast',
      line: 'Offers, drops and calls bring them back.', on: 'Taps a WhatsApp offer', st: 'Gets a call about a drop',
      who: 'WhatsApp · Voice agent', what: ['New drops on WhatsApp', 'Festival offers by call', 'Points and referrals'], today: 'Offers vanish with the story', gives: 'One-time buyers become regulars' }
  ],

  /* Before -> after chips: [today, with the system, column, scattered xy+rot, ordered xy, scattered mobile, ordered mobile] */
  mess: [
    ['“DM for price”', 'Price on every product', 'a', [15, 18, -6], [18, 25], [27, 9, -6], [27, 14]],
    ['“Is size 9 there?” calls', 'Live stock online', 'a', [76, 14, 5], [18, 39], [70, 14, 5], [27, 25]],
    ['Screenshots of products', 'Full online catalogue', 'a', [38, 32, 4], [18, 53], [32, 24, 4], [27, 36]],
    ['UPI screenshots', 'Secure checkout', 'a', [62, 26, -5], [18, 67], [70, 31, -5], [27, 47]],
    ['Orders in a notebook', 'Orders dashboard', 'b', [86, 43, 7], [50, 25], [28, 42, 7], [27, 58]],
    ['Stock in someone’s head', 'Live inventory', 'b', [18, 53, 3], [50, 39], [70, 48, 3], [27, 69]],
    ['Paper bills, or none', 'Billing counter', 'b', [52, 55, -4], [50, 53], [30, 57, -4], [73, 14]],
    ['“Where is my parcel?”', 'Tracking on WhatsApp', 'b', [80, 65, 6], [50, 67], [70, 64, 6], [73, 25]],
    ['Offers in 24-hour stories', 'Offers to every buyer', 'c', [18, 80, -7], [82, 25], [32, 74, -7], [73, 36]],
    ['Forgotten buyers', 'Customer list', 'c', [46, 77, 5], [82, 39], [68, 81, 5], [73, 47]],
    ['Boosted posts, no tracking', 'Meta ads that sell', 'c', [72, 89, -3], [82, 53], [30, 90, -3], [73, 58]],
    ['Guesswork', 'Sales reports', 'c', [89, 82, 6], [82, 67], [72, 94, 6], [73, 69]]
  ],
  messLinks: [[0, 2, 1], [2, 3, 0], [3, 7, 1], [6, 9, 0], [5, 6, 1], [4, 5, 0], [10, 1, 0], [11, 8, 1], [7, 10, 0], [9, 0, 0], [1, 4, 1], [8, 3, 0]],
  messCols: ['Sell', 'Run', 'Grow'],

  pains: [
    ['Size 9 in black?', 'Call, wait, check the shelf', 'Live stock on every product.'],
    ['How much is it?', '“DM for price”, and they leave', 'Prices online, day and night.'],
    ['Did we reply to her?', 'Chats buried under chats', 'Every order in one dashboard.'],
    ['Any offers this week?', 'Seen only if they catch the story', 'Offers on WhatsApp to every buyer.'],
    ['Where’s my parcel?', 'Customers keep asking', 'Tracking link sent for you.'],
    ['Who are our regulars?', 'Nobody wrote it down', 'Every buyer saved, with history.'],
    ['What sold today?', 'Count cash and UPI at night', 'Live sales on your phone.'],
    ['Can we run ads?', 'Ads with nowhere to land', 'A store built for Meta ads.']
  ],

  /* The leaky pipe: holes today, patches with the system */
  leaks: [
    ['No prices online', 'Prices on every product'],
    ['Late DM replies', 'Checkout without a chat'],
    ['Out of stock, surprise', 'Live stock, reserve online'],
    ['Offers nobody sees', 'Offers to every buyer'],
    ['Buyers never return', 'Reminders bring them back']
  ],

  /* How an order works today: [icon, step, weak link or ''] */
  today: [
    ['eye', 'Sees your reel', ''],
    ['chat', 'Sends a DM: “price?”', ''],
    ['clock', 'Waits for a reply', 'Slow'],
    ['qr', 'Pays by UPI screenshot', 'No record'],
    ['truck', 'You pack and courier', ''],
    ['user', 'Never hears from you again', 'Lost']
  ],

  /* What we observed: [visual, title, finding] */
  found: [
    ['ig', 'Your reels sell', 'People see the product. Then they have to DM.'],
    ['wachat', 'Every order starts with a question', 'Price? Size? In stock? One chat at a time.'],
    ['shelf', 'Great stock, hidden online', 'The wall is full. The internet can’t see it.'],
    ['nodata', 'No list of buyers', 'After the sale, the customer is gone.'],
    ['noads', 'Ads have nowhere to land', 'A boosted post can’t take a payment.']
  ],

  /* One bill, everything that follows: [icon, title, detail, where] */
  chain: [
    ['box', 'Stock updated', 'Classic Clog · UK 9 · 4 → 3 left', 'Inventory'],
    ['chat', 'Bill on WhatsApp', 'PDF sent to the customer', 'WhatsApp'],
    ['user', 'Customer saved', 'Ravi K. · size UK 9 · 1st buy', 'Customers'],
    ['star', 'Points added', '+18 Heaven points', 'Loyalty'],
    ['chart', 'Owner sees it', 'Today ₹42,380 · 31 bills', 'Dashboard'],
    ['bell', 'Low stock flagged', 'UK 9: reorder suggested', 'Inventory'],
    ['calendar', 'Follow-up set', 'New drop alert in 30 days', 'WhatsApp']
  ],

  /* One platform, eight tools */
  tools: [
    { id: 'web', name: 'Online store', who: 'Your customers', icon: 'globe', vis: 'home', line: 'Your shop, open 24/7 to all of India.',
      does: ['Every product with price and photos', 'Sizes and colours with live stock', 'UPI and card checkout', 'Reels on product pages', 'Order tracking for buyers', 'Ready for Meta ads and Google'],
      pins: [['Live stock badge', 'Buyers see what’s really there'], ['Prices on every product', 'No more “DM for price”'], ['WhatsApp button', 'Questions still welcome']],
      replaces: 'DMs and screenshots', gives: 'Sales while you sleep' },
    { id: 'dash', name: 'Owner dashboard', who: 'You', icon: 'chart', vis: 'dash', line: 'The whole business on one screen.',
      does: ['Today’s sales: store and online', 'Best sellers and slow stock', 'Orders waiting to ship', 'Daily report on WhatsApp', 'Every branch, one login'],
      pins: [['Sales today', 'Store and online, live'], ['Best sellers', 'Know what to restock'], ['Alerts', 'Low stock, late orders']],
      replaces: 'Counting cash at night', gives: 'Decide in a minute' },
    { id: 'stock', name: 'Inventory', who: 'You · Store staff', icon: 'box', vis: 'stock', line: 'One stock for the store and the website.',
      does: ['Size and colour level stock', 'Sell in store, website updates', 'Low-stock alerts', 'Barcode labels', 'Purchase entries from suppliers', 'Dead stock report'],
      pins: [['Size grid', 'Every size, every colour'], ['Low stock', 'Flagged before it runs out'], ['One count', 'Store and website share it']],
      replaces: 'Stock in someone’s head', gives: 'No “sorry, sold out” surprises' },
    { id: 'pos', name: 'Billing counter', who: 'Counter staff', icon: 'receipt', vis: 'pos', line: 'Bill in a few taps. Customer saved.',
      does: ['Scan or tap to add items', 'Cash, UPI or card', 'GST or simple bills', 'Bill sent on WhatsApp', 'Returns and exchanges', 'Customer captured by phone number'],
      pins: [['Phone number first', 'Every bill builds your list'], ['Pay your way', 'Cash, UPI or card'], ['Send', 'Bill lands on WhatsApp']],
      replaces: 'Paper bills, or none', gives: 'Every sale on record' },
    { id: 'orders', name: 'Orders & shipping', who: 'Packing staff', icon: 'truck', vis: 'orders', line: 'From paid to delivered, on one board.',
      does: ['New, packed, shipped, delivered', 'Prepaid orders only', 'Courier labels in one click', 'Tracking link to the buyer', 'Returns and exchanges'],
      pins: [['Board', 'Every order, every stage'], ['Courier', 'Label and tracking number'], ['Auto updates', 'Buyer stays informed']],
      replaces: 'A notebook of orders', gives: 'Ship all over India, calmly' },
    { id: 'crm', name: 'Customers & loyalty', who: 'You', icon: 'users', vis: 'crm', line: 'Know every buyer. Reward the regulars.',
      does: ['Every buyer from store and web', 'Purchase history and sizes', 'New, regular and VIP groups', 'Points and referral codes', 'Birthdays and favourite brands'],
      pins: [['Profile', 'What they bought, their size'], ['Groups', 'New, regular, VIP'], ['Points', 'A reason to come back']],
      replaces: 'Buyers forgotten after the sale', gives: 'Regulars, on purpose' },
    { id: 'wa', name: 'WhatsApp engine', who: 'Automatic', icon: 'chat', vis: 'blast', line: 'Bills, updates and offers. Sent for you.',
      does: ['Bills and order updates', 'Offers to the right group', 'New-drop and back-in-stock alerts', 'Cart reminders', 'Daily report to the owner', 'Opt-in only, with an easy stop'],
      pins: [['Pick a group', 'Sneaker fans, VIPs, new buyers'], ['Offer', 'Photo, price, link'], ['Results', 'Read, clicked, bought']],
      replaces: 'Offers lost in 24-hour stories', gives: 'Buyers hear from you' },
    { id: 'voice', name: 'AI voice agent', who: 'Automatic', icon: 'phonecall', vis: 'voice', line: 'Calls in Telugu or English. Never tired.',
      does: ['Invites regulars to sales and drops', 'Confirms orders and addresses', 'Asks for feedback after a buy', 'Answers “is it in stock?” calls', 'Calls only those who opt in'],
      pins: [['Natural voice', 'Telugu, English, Hindi'], ['Knows your stock', 'Answers from live data'], ['Logs every call', 'Outcome saved to the customer']],
      replaces: 'Calls nobody has time for', gives: 'Every regular, personally invited' }
  ],

  /* 24 hours of the system */
  day: [
    { h: 2, t: '02:00', title: 'Night check', line: 'Low stock and pending orders, listed.', icon: 'moon' },
    { h: 9, t: '09:00', title: 'Owner report', line: 'Yesterday’s sales on your WhatsApp.', icon: 'chart' },
    { h: 11, t: '11:00', title: 'Bills go out', line: 'Every counter bill, on WhatsApp.', icon: 'chat' },
    { h: 14, t: '14:00', title: 'Back in stock', line: '“UK 9 is back” to those who asked.', icon: 'bell' },
    { h: 17, t: '17:00', title: 'Voice agent calls', line: 'Regulars invited to the weekend sale.', icon: 'phonecall' },
    { h: 19.5, t: '19:30', title: 'New drop', line: 'Reel plus a WhatsApp alert to fans.', icon: 'spark' },
    { h: 21, t: '21:00', title: 'Cart reminder', line: '“Still thinking about the watch?”', icon: 'cart' },
    { h: 23, t: '23:00', title: 'Orders while you sleep', line: 'The website keeps selling.', icon: 'globe' }
  ],

  call: [
    ['agent', 'Hi Ravi! Heaven Gadgets, Ongole here. The new clogs just came in your size.'],
    ['you', 'Oh nice. In black?'],
    ['agent', 'Black and olive, UK 9. Shall I keep one for you till Saturday?'],
    ['you', 'Yes, keep it.'],
    ['agent', 'Done. The details are on your WhatsApp. See you Saturday!']
  ],

  /* Youth research */
  stats: [
    ['8 in 10', 'Indian shoppers discover new products on social media', 'Meta × GWI, 2025'],
    ['~60%', 'are likely to buy after seeing an offer on WhatsApp', 'Meta × GWI, 2025'],
    ['1.7×', 'Gen Z is more likely to pick trending styles', 'Snap × BCG, 2024'],
    ['90%+', 'of Gen Z digital payers prefer UPI', 'Bain & Co., 2025'],
    ['3 in 5', 'new online shoppers since 2020 are from tier-3 and smaller towns', 'Bain & Co., 2025'],
    ['377M', 'Gen Z Indians. The largest generation ever', 'Snap × BCG, 2024']
  ],
  loop: [
    ['See', 'A reel, a friend’s story', 'Reels that link to the product', 'eye'],
    ['Check', 'Price, sizes, reviews', 'Prices and live stock online', 'search'],
    ['Ask', 'Friends first, then you', 'Share links, instant replies', 'chat'],
    ['Buy', 'UPI, fast delivery', 'UPI checkout, quick dispatch', 'card'],
    ['Flex', 'Story, tag, unboxing', 'Tag-us rewards', 'camera'],
    ['Repeat', 'Next drop, next offer', 'Drop alerts and points', 'repeat']
  ],
  people: [
    { id: 'sneaker', name: 'The college sneakerhead', age: '18–22', where: 'Colleges in and around Ongole', icon: 'sneaker', quote: 'Is the new pair there in my size?',
      budget: '₹800–2,500', finds: 'Instagram Reels', pays: 'UPI', wants: ['Price and size online', 'First look at new drops', 'Student offers'],
      pains: ['Can’t see sizes without asking', 'Hates waiting for a DM reply'], win: 'Drop alerts on WhatsApp and Student Fridays' },
    { id: 'flex', name: 'The first-job flexer', age: '22–28', where: 'Back home, or working in a city', icon: 'watch', quote: 'Payday watch. Can it come by Friday?',
      budget: '₹1,500–5,000', finds: 'Reels and YouTube reviews', pays: 'UPI or card', wants: ['Real photos and reviews', 'Fast prepaid delivery', 'Combo deals'],
      pains: ['Unsure what is in stock', 'No tracking after paying'], win: 'Quick dispatch, tracking and combo offers' },
    { id: 'gift', name: 'The gift hunter', age: '17–30', where: 'Birthdays, Rakhi, Valentine’s', icon: 'gift', quote: 'Birthday is tomorrow. Help!',
      budget: '₹500–3,000', finds: 'WhatsApp and friends', pays: 'UPI', wants: ['Gift ideas by budget', 'Gift wrap', 'Pick up today'],
      pains: ['Too many choices, no guidance', 'Needs it today'], win: 'A gift finder plus reserve-and-pick-up' },
    { id: 'district', name: 'The district shopper', age: '18–35', where: 'Kandukur, Addanki, Markapur…', icon: 'pin', quote: 'Is it in stock before I travel?',
      budget: '₹1,000–4,000', finds: 'Instagram and word of mouth', pays: 'UPI or cash', wants: ['Live stock', 'Reserve online', 'Ship home instead'],
      pains: ['Travels, then finds it sold out', 'Can’t call during work'], win: 'Live stock and reserve online' },
    { id: 'away', name: 'The out-of-town fan', age: '18–30', where: 'Hyderabad, Chennai, Bengaluru', icon: 'globe', quote: 'Saw your reel. Can you ship to Hyderabad?',
      budget: '₹1,000–3,000', finds: 'Reels', pays: 'UPI, prepaid', wants: ['Secure checkout', 'Tracking', 'Easy size exchange'],
      pains: ['Paying a stranger on chat feels risky', 'No idea when it will arrive'], win: 'A real store website with tracking' }
  ],
  tactics: [
    ['spark', 'Drop countdowns', 'New stock launches like an event.'],
    ['link', 'Reel to product', 'Every reel ends at a buy button.'],
    ['cap', 'Student Fridays', 'College ID, special price.'],
    ['users', 'Refer a friend', 'Both get money off.'],
    ['camera', 'Tag-us rewards', 'Post it, earn points.'],
    ['bell', 'Size alerts', '“UK 9 is back” on WhatsApp.'],
    ['calendar', 'Festival calendar', 'Sankranti, Diwali, Valentine’s, fests.'],
    ['crown', 'Regulars club', 'First look for VIP buyers.']
  ],

  /* Money */
  plugs: [
    ['chat', 'Missed and late chats', 'Orders without a chat'],
    ['box', '“Sold out” surprises', 'Live stock, reserve online'],
    ['tag', 'Offers nobody sees', 'Offers reach every buyer'],
    ['repeat', 'Buyers who never return', 'Reminders bring them back']
  ],

  /* Process: [n, phase, title, line, when] */
  road: [
    ['00', 'Connect', 'Store visit', 'Your goals, counter and stock.', 'Day 1'],
    ['01', 'Discover', 'Know your buyers', 'Chats, reels, nearby stores.', 'Week 1'],
    ['02', 'Define', 'Plan the system', 'Flows, catalogue, offers. You approve.', 'Week 2'],
    ['03', 'Design', 'Design every screen', 'Website, billing, dashboards.', 'Week 3'],
    ['04', 'Build', 'Build and connect', 'Store, stock, WhatsApp, voice.', 'Weeks 4–6'],
    ['05', 'Launch', 'Go live', 'Products loaded. Staff trained.', 'Week 7'],
    ['06', 'Grow', 'Make it earn', 'Ads, offers, monthly reviews.', 'Every month']
  ],
  need: ['Product list', 'Photos, or we shoot them', 'Logo and colours', 'WhatsApp Business number', 'GST details, if any', 'One hour a week'],

  /* Towns around Ongole, placed roughly by direction and distance: [name, x%, y%] */
  towns: [['Ongole', 62, 53.3], ['Chirala', 79.8, 27.5], ['Addanki', 57, 28.1], ['Darsi', 39.8, 31.1], ['Chimakurthi', 51.4, 46.7], ['Markapur', 15.3, 34.1], ['Kanigiri', 29.8, 61.5], ['Kandukur', 53.1, 76.3]],

  proof: [
    { name: 'Beere Kesava ERP', tag: 'Live', line: 'Billing, stock and WhatsApp bills for a silk business.', img: '../img/bk-dash.webp', href: '../beere-kesava/', cta: 'Open the deck' },
    { name: 'Billing app', tag: 'Local stores', line: 'Bills, customers and WhatsApp offers for shops.', img: '../img/billing-1.webp', href: 'https://onestop-solutions.vercel.app/#work', cta: 'See our work', phone: true },
    { name: 'Ornate ’26', tag: 'RGUKT Ongole', line: 'A fest website for Ongole’s students. Your buyers.', img: '../img/ornate-4.webp', href: 'https://ornate-one.vercel.app/', cta: 'Visit the site' }
  ]
};
