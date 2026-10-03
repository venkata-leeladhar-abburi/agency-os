/* ===== Deck content. Every line is short on purpose. Facts come from the Beere Kesava ERP code. ===== */
const C = {
  acts: [
    { id: 'buy', name: 'Buy', sub: 'Yarn in' },
    { id: 'make', name: 'Make', sub: 'On the loom' },
    { id: 'check', name: 'Check', sub: 'Quality first' },
    { id: 'sell', name: 'Sell', sub: 'And settle' }
  ],
  stages: [
    { id: 'order', n: '01', act: 'buy', name: 'Order', line: 'Buy yarn with approval.', who: 'Admin raises · Owner approves', portal: 'admin',
      rec: ['Vendor, grade, colour, quantity', 'Approved before money moves', 'Booked to the right firm'], replaces: 'Phone orders, loose bills', saves: 'No spend without a yes', photo: 'suppliers', vis: 'po', icon: 'cart' },
    { id: 'receive', n: '02', act: 'buy', name: 'Receive', line: 'Check every delivery at the gate.', who: 'Worker staff', portal: 'worker',
      rec: ['Goods receipt against the order', 'Accepted and rejected, counted', 'A barcode label on every line'], replaces: 'Inward register', saves: 'Short supply caught on day one', photo: 'firm', vis: 'grn', icon: 'package' },
    { id: 'store', n: '03', act: 'buy', name: 'Store', line: 'Know your yarn without counting.', who: 'Admin', portal: 'admin',
      rec: ['Warp, resham and jari in stock', 'Jari graded G1 to G5', 'Alert at reorder level'], replaces: 'Stock register', saves: 'No surprise shortages', photo: 'warp', vis: 'stock', icon: 'spool' },
    { id: 'plan', n: '04', act: 'make', name: 'Plan', line: 'Plan every saree first.', who: 'Admin', portal: 'admin',
      rec: ['Batches with saree slots', 'Design from the design library', 'Saree type from the rate card'], replaces: 'Order diary', saves: 'Bulk orders tracked to the piece', photo: 'jari', vis: 'batch', icon: 'layers' },
    { id: 'issue', n: '05', act: 'make', name: 'Issue', line: 'Every gram, signed for.', who: 'Worker staff · Weaver signs', portal: 'worker',
      rec: ['Material per weaver or factory loom', 'Signature, here or remote', 'Traced back to its receipt'], replaces: 'Material khata', saves: 'No yarn leaves unsigned', photo: 'resham', vis: 'issue', icon: 'pen' },
    { id: 'weave', n: '06', act: 'make', name: 'Weave', line: 'Weavers see their own work.', who: 'Weaver portal', portal: 'weaver',
      rec: ['My batches and due dates', 'Confirm material received', 'Warp request after 50% progress'], replaces: 'Status phone calls', saves: 'No calls to ask “how far?”', photo: 'looms', vis: 'weaver', icon: 'loom' },
    { id: 'collect', n: '07', act: 'make', name: 'Collect', line: 'Each saree logged on arrival.', who: 'Worker staff', portal: 'worker',
      rec: ['Weight, colour and photo', 'Yarn used vs the rate card', 'Leftover yarn recorded for you'], replaces: 'Receipt slips', saves: 'Material balance done for you', photo: 'sareeloom', vis: 'receive', icon: 'camera' },
    { id: 'inspect', n: '08', act: 'check', name: 'Inspect', line: 'Quality checked. Pay worked out.', who: 'Worker staff', portal: 'worker',
      rec: ['Passed, semi or defective', 'Defects with photos', 'Payable = making charge − deduction'], replaces: 'QC notebook', saves: 'Weaver pay, worked out on the spot', photo: 'silk', vis: 'qc', icon: 'check' },
    { id: 'finish', n: '09', act: 'check', name: 'Finish', line: 'Finishing, piece by piece.', who: 'Worker staff', portal: 'worker',
      rec: ['Assigned to finishing staff', 'Back perfect or damaged', 'Damage level and photo'], replaces: 'Finishing book', saves: 'Nothing lost in finishing', photo: null, vis: 'finishing', icon: 'sparkles' },
    { id: 'dispatch', n: '10', act: 'sell', name: 'Dispatch', line: 'Every move has a document.', who: 'Worker staff · Shop receives', portal: 'worker',
      rec: ['Showroom: delivery challan', 'Wholesale: GST invoice', 'Shop confirms what arrived'], replaces: 'Dispatch book', saves: 'Missing pieces flagged at once', photo: 'inventory', vis: 'dispatch', icon: 'truck' },
    { id: 'sell', n: '11', act: 'sell', name: 'Sell', line: 'Scan. Pay. Bill. Done.', who: 'Shop staff', portal: 'shop',
      rec: ['Scan the saree tag', 'Cash, UPI or card', 'GST bill. Returns handled'], replaces: 'Bill book', saves: 'Every bill reaches the owner on WhatsApp', photo: 'showroom', vis: 'pos', icon: 'bag' },
    { id: 'settle', n: '12', act: 'sell', name: 'Settle', line: 'Every rupee traced to a saree.', who: 'Accountant', portal: 'accountant',
      rec: ['Weaver payouts with UTR', 'Invoices and collections', 'Vendor bills, per firm'], replaces: 'Payment ledger', saves: 'Overdue flagged at 45 days', photo: null, vis: 'payments', icon: 'rupee' }
  ],

  /* Before → after, as [book, screen, column, scattered xy+rot, ordered xy, scattered mobile, ordered mobile] */
  mess: [
    ['Material register', 'Raw material stock', 'a', [14, 18, -6], [18, 25], [26, 9, -6], [27, 14]],
    ['Purchase file', 'Orders + goods receipt', 'a', [78, 14, 5], [18, 39], [72, 13, 5], [27, 25]],
    ['Weaver khata', 'Weaver portal', 'a', [37, 31, 4], [18, 53], [34, 24, 4], [27, 36]],
    ['Order diary', 'Batches + designs', 'a', [62, 25, -5], [18, 67], [70, 31, -5], [27, 47]],
    ['QC notebook', 'Quality check + photos', 'b', [86, 42, 7], [50, 25], [28, 41, 7], [27, 58]],
    ['Finishing book', 'Finishing tracker', 'b', [17, 52, 3], [50, 39], [72, 48, 3], [27, 69]],
    ['Stock register', 'Live inventory', 'b', [52, 54, -4], [50, 53], [30, 57, -4], [73, 14]],
    ['Dispatch book', 'Dispatch + challan', 'b', [80, 64, 6], [50, 67], [72, 64, 6], [73, 25]],
    ['Bill book', 'Shop counter + GST bill', 'c', [18, 80, -7], [82, 25], [34, 74, -7], [73, 36]],
    ['Payment ledger', 'Payments + UTR', 'c', [46, 77, 5], [82, 39], [68, 81, 5], [73, 47]],
    ['Phone calls', 'Alerts to each role', 'c', [70, 89, -3], [82, 53], [30, 90, -3], [73, 58]],
    ['Memory', 'Audit log', 'c', [88, 82, 6], [82, 67], [70, 93, 6], [73, 69]]
  ],
  messLinks: [[0, 2, 1], [2, 3, 0], [3, 7, 1], [6, 9, 0], [5, 6, 1], [4, 5, 0], [10, 1, 0], [11, 8, 1], [7, 10, 0], [9, 0, 0], [1, 4, 1], [8, 3, 0]],
  messCols: ['Buy & make', 'Check & move', 'Sell & settle'],

  pains: [
    ['Where is saree #214?', 'Flip through three books', 'Scan the tag. Its story opens.'],
    ['How much jari went out?', 'Add up the khata at night', 'Every gram signed and totalled.'],
    ['What do we owe weavers?', 'Add QC slips by hand', 'Worked out at quality check.'],
    ['Is the stock right?', 'Count the shelves again', 'Live count, by status.'],
    ['Which orders are late?', 'The customer calls first', 'Flagged every night.'],
    ['Who changed this rate?', 'Nobody remembers', 'Logged. Old value and new.'],
    ['Month-end report?', 'Days of copying', 'One click. Or on WhatsApp.'],
    ['Unpaid invoices?', 'Forgotten in a drawer', 'Flagged at 45 days.']
  ],

  /* A sample saree, in the ERP's own code formats */
  story: [
    ['layers', 'Planned', 'BATCH-2026-014 · slot 007', 'Admin'],
    ['loom', 'Woven on', 'Factory loom BKB-F-06', 'Factory floor'],
    ['sparkles', 'Design', 'Peacock border · D-118', 'Design library'],
    ['camera', 'Received', '742 g · colour · photo', 'Worker staff'],
    ['check', 'Quality', 'Passed · payable set', 'Worker staff'],
    ['sparkles', 'Finishing', 'Back perfect', 'Finishing staff'],
    ['truck', 'Dispatched', 'Showroom · DC-2026-031', 'Worker staff'],
    ['bag', 'Sold', 'UPI · GST bill', 'Shop staff']
  ],

  portals: [
    { id: 'superadmin', name: 'Superadmin', who: 'The owner', line: 'Sees everything. Approves what matters.', vis: 'overview', icon: 'crown', count: '27 pages',
      tabs: ['Everything in Admin', 'Purchase approvals', 'Audit log of every action', 'Label and tag settings', 'Sign-in location for staff'],
      hidden: 'Nothing. Full control.', saves: 'Decide from one screen' },
    { id: 'admin', name: 'Admin', who: 'The manager', line: 'Runs the business, day to day.', vis: 'production', icon: 'user', count: '23 pages',
      tabs: ['Production · Batches · Designs · Finishing', 'Materials · Receive · Issue · Return', 'External purchases · Supplier returns', 'Payments · Firms · Reports', 'Weavers · Customers · Vendors · Suppliers', 'Factory looms · Inventory · Rates'],
      hidden: 'Owner-only settings and approvals.', saves: 'One place for every module' },
    { id: 'worker', name: 'Worker staff', who: 'The factory floor', line: 'Receives, checks, finishes, sends.', vis: 'qc', icon: 'hardhat', count: '7 tabs',
      tabs: ['Goods receipt with labels', 'Issue material to weavers', 'Receive sarees from looms', 'Quality check with photos', 'Finishing and dispatch', 'Saree photos · Activity log'],
      hidden: 'Prices and pay, unless allowed.', saves: 'No double entry on the floor' },
    { id: 'weaver', name: 'Weaver', who: 'Home looms', line: 'Their batches, material and pay.', vis: 'weaver', icon: 'grid', count: '5 tabs',
      tabs: ['My batches and due dates', 'Confirm material received', 'Request warp', 'Payment ledger', 'Notifications'],
      hidden: 'Other weavers. Business numbers.', saves: 'Fewer calls. Faster pay.' },
    { id: 'shop', name: 'Shop staff', who: 'The showroom', line: 'Sells, returns and receives stock.', vis: 'pos', icon: 'bag', count: '5 tabs',
      tabs: ['New sale by scan', 'Cash, UPI or card', 'Returns and exchanges', 'Receive dispatches', 'Shop inventory', 'Customers · Reports'],
      hidden: 'Cost and margin, unless allowed.', saves: 'A bill in a few taps' },
    { id: 'accountant', name: 'Accountant', who: 'The books', line: 'Pays, collects and reconciles.', vis: 'accountant', icon: 'calc', count: '8 tabs',
      tabs: ['Weaver payouts with UTR', 'Invoices and collections', 'Vendor bills', 'Firms and their books', 'Customers · Vendors · Suppliers', 'Factory looms · Inventory'],
      hidden: 'Production controls.', saves: 'Books that balance themselves' }
  ],

  night: [
    { h: 1, t: '01:00', title: 'Unpaid invoices', line: '45 days overdue? Flagged.', icon: 'rupee' },
    { h: 2, t: '02:00', title: 'Late batches', line: 'Past the due date? Flagged.', icon: 'layers' },
    { h: 2.35, t: '02:00', title: 'Unconfirmed dispatches', line: 'Not received in 3 days? Flagged.', icon: 'truck' },
    { h: 2.7, t: '02:00', title: 'Low shop stock', line: 'Under 20 pieces? Warned.', icon: 'bag' },
    { h: 9, t: '09:00', title: 'Reports on WhatsApp', line: 'Daily, weekly, monthly or quarterly.', icon: 'chat' }
  ],

  docs: [
    ['Tax invoice', 'Wholesale buyers', 'GST split. Amount in words.'],
    ['Quotation', 'Bulk buyers', 'Sarees, prices, GST. Ready to send.'],
    ['Purchase order', 'Vendors', 'Approved, numbered, shared.'],
    ['Delivery challan', 'Showroom transfers', 'Stock moves without a sale.'],
    ['Payment receipt', 'Customers', 'Proof for every payment.'],
    ['Statement of account', 'Customers', 'Every bill and payment, one view.'],
    ['Debit note', 'Suppliers', 'Returns, piece by piece.'],
    ['Retail bill', 'Shop customers', 'Printed at the counter.']
  ],

  trust: [
    ['chat', 'OTP on WhatsApp', 'No passwords to share.'],
    ['pin', 'On-site sign-in', 'Staff sign-in location, checked.'],
    ['eyeoff', 'Money stays private', 'Prices and pay hidden by role.'],
    ['shield', 'Approvals first', 'Purchases, rates, warp, returns.'],
    ['history', 'Every change logged', 'Who, what, when. Old and new.'],
    ['pen', 'Signed hand-overs', 'Yarn leaves with a signature.'],
    ['key', 'Access per portal', 'Full, restricted, or no downloads.'],
    ['lock', 'Idle log-out', 'Walk away, and it signs out.']
  ],

  work: [
    ['Writing one entry in three books', 'Entered once'],
    ['Yarn math for every weaver', 'Done on receipt'],
    ['Weaver pay math', 'Done at quality check'],
    ['Counting stock', 'Live count'],
    ['Hunting for a saree', 'One scan'],
    ['Writing bills by hand', 'GST bill in a tap'],
    ['Chasing late payments', 'Flagged at 45 days'],
    ['Building month-end reports', 'One click, or on WhatsApp'],
    ['Calling weavers for status', 'Weaver portal'],
    ['Guessing who changed what', 'Audit log']
  ],

  leaks: [
    ['spool', 'Yarn that never comes back', 'Issued vs used, per weaver.'],
    ['check', 'Defects paid in full', 'Deducted at quality check.'],
    ['rupee', 'Invoices that age', 'Flagged at 45 days.'],
    ['scan', 'Stock that walks out', 'Every piece scanned in and out.']
  ],

  tech: [
    ['66', 'Data tables', 'One source of truth'],
    ['50', 'Server modules', 'Each area in its own module'],
    ['48', 'Status sets', 'Every lifecycle defined'],
    ['100+', 'Test files', 'Checked on every change']
  ],
  stack: ['React 18', 'TypeScript', 'Vite', 'NestJS 11', 'Prisma 7', 'PostgreSQL', 'Socket.IO live alerts', 'WhatsApp Business API', 'Cloud file storage', 'Barcode scanning', 'PDF documents', 'CI checks'],
  quality: [
    ['Each portal loads only its own code', 'Fast on shop and factory phones.'],
    ['Typed end to end', 'Fewer bugs reach the floor.'],
    ['Readable by design', 'Contrast checked on every change.'],
    ['Offline-aware', 'It tells staff when the network drops.']
  ],

  road: [
    ['01', 'Map', 'Walk the floor. List every book.'],
    ['02', 'Set up', 'Firms, rates, users, looms.'],
    ['03', 'Load', 'Weavers, designs, stock, suppliers.'],
    ['04', 'Train', 'Each role, on its own portal.'],
    ['05', 'Run side by side', 'Paper and portal for one cycle.'],
    ['06', 'Retire paper', 'One portal. One truth.']
  ],
  next: ['Online catalogue', 'Order updates for buyers', 'e-Invoice and e-way bill', 'Accounting export', 'Demand forecasts', 'More shops and firms'],
  towns: ['Dharmavaram', 'Kanchipuram', 'Pochampally', 'Banaras', 'Mysuru', 'Arani', 'Gadwal', 'Uppada', 'Venkatagiri', 'Narayanpet']
};
