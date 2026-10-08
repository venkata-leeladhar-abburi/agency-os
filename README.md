# One Stop Solutions: pitch websites

Eight pages for **One Stop Solutions**. Each page has its CSS and JavaScript inline:

| Page | File | Who it is for |
| --- | --- | --- |
| Agency website (home page) | `index.html` (images in `img/`) | Clients, partners and hires |
| Agency OS pitch deck | `agency-os/index.html` | Investors |
| Client pitch | `pitch/index.html` | Clients and leads |
| Our process | `process/index.html` | Clients and leads: the client pitch, starting at the seven phases |
| Beere Kesava ERP deck | `beere-kesava/index.html` | Beere Kesava, investors and silk businesses |
| Heaven Gadgets growth plan | `heaven-gadgets/index.html` | Heaven Gadgets, Ongole: a pitch to the store's owner |
| Pharmacy OS pitch deck | `pharmacy-os/index.html` | Investors and founders, written so a medical-store owner can follow it |
| Team playbook | `playbook/index.html` | The One Stop team only |

Each page has its own colours:

| Page | Palette |
| --- | --- |
| Agency website and client pitch | Black, white and signal orange (the One Stop brand) |
| Agency OS deck | Concrete, volt green and violet |
| Team playbook | Warm paper, forest green and highlighter yellow |
| Beere Kesava ERP deck | Wine, gold and cream |
| Heaven Gadgets growth plan | Midnight navy, cobalt and price-tag yellow, with a red accent |
| Pharmacy OS deck | Concrete, carbon indigo and honey amber, with a red pen for notes |

The pitch and the playbook share their sources with the Agency OS deck; `source/build2.py` recolours them (`PALETTES`), so the deck keeps its own look.

## View them

Open `index.html` in a browser for the agency website, or any page's `index.html`. Fonts and the animation libraries load from public CDNs, so an internet connection gives the full experience. Without one, every section still renders and the sliders fall back to native scrolling.

## Host on Vercel

The repository is ready to deploy as a static site. There is no build step.

1. In Vercel, choose **Add New → Project** and import `venkata-leeladhar-abburi/agency-os`.
2. Leave **Framework Preset** on **Other**, the root directory as `./`, and the build and output settings empty.
3. Choose **Deploy**. Every branch gets its own preview link; the production branch (usually `main`) gets the main link.

Once deployed, the pages live at:

| Path | Page |
| --- | --- |
| `/` | Agency website |
| `/agency-os/` | Agency OS pitch deck |
| `/pitch/` | Client pitch |
| `/process/` | Our process |
| `/beere-kesava/` | Beere Kesava ERP deck |
| `/heaven-gadgets/` | Heaven Gadgets growth plan |
| `/pharmacy-os/` | Pharmacy OS pitch deck |
| `/playbook/` | Team playbook |

`vercel.json` adds clean URLs, a week of browser caching for images, and basic security headers. `.vercelignore` keeps the `source/` folder off the live site.

**The playbook is internal.** It is deployed with a `noindex` header, so search engines skip it, but anyone with the link can open it. To keep it off the live site entirely, add `playbook` to `.vercelignore` and remove the playbook links from the agency website.

## Edit and rebuild

Every page is generated from the files in `source/`. Edit a source file, then run its builder from the repository root:

| Page | Builder | Main sources |
| --- | --- | --- |
| Agency website | `python3 source/build4.py` | `source/src4/` |
| Agency OS deck | `python3 source/build.py` | `source/src/` |
| Client pitch, our process and playbook | `python3 source/build2.py` | `source/src2/` |
| Beere Kesava deck | `python3 source/build3.py` | `source/src3/`, `source/bk/img/` |
| Heaven Gadgets plan | `python3 source/build5.py` | `source/src5/`, `source/hg/img/` |
| Pharmacy OS deck | `python3 source/build6.py` | `source/src6/`, `source/src6/hairline/` |

The builders need Python 3 only. `api/leads.js` needs no packages. Project screenshots and logos for the agency website are WebP files in `img/`; the project list, services, products and team are at the top of `source/src4/site.js`.

## Agency website (`index.html`)

One Stop Solutions’ own website: our work, services, products, process and team, in black, white and signal orange on the same layout as the other pages.

| Section | What it shows |
| --- | --- |
| Hero | The Onestop wordmark, what we do, shortcuts to our process, playbook, client pitch and product decks, and a reel of real project screens |
| Brands | Logos of the brands we’ve built for |
| Selected work | Beere Kesava ERP, Ornate ’26, Aaravi Collectives, NGB and LimitX: what each one is, its real screens, a live preview, and a case study from research to launch (competitor analysis, user research, empathy map, users and flows, a wireframe-to-UI slider, build, test and launch, result) |
| All projects | Every project, filtered by type, with live previews and links |
| Services | Four core services with what each includes, plus what we help with around a product |
| Products | Silk ERP, Agency OS and S-Campus, each drawn as a simple diagram, with pitch decks, live previews and “Build something like this” |
| How we work | Three stages, seven draggable phase cards, and diagrams of our process, playbook and client pitch |
| Proof, team, questions | A client quote, facts, the team and answers |
| Have a project in mind? | A short chat; a project map draws itself from the answers, and the brief is saved to our leads |
| Footer | Links, and **Leads**: enter the code to see, search, export or delete every brief |

Live previews load a project’s real website inside the page when someone clicks. A site that blocks this shows a blank box, so the preview always has an **Open site** button. Team photos load from the current Framer site and fall back to initials.

### Leads setup (one time, in Vercel)

Briefs are saved by `api/leads.js`, a Vercel function, in an Upstash Redis database.

1. In the Vercel project, open **Storage → Create Database**, choose **Upstash for Redis** (free plan), and connect it to this project. That adds `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
2. In **Settings → Environment Variables**, add `LEADS_CODE` with your 6-digit code, for Production and Preview.
3. Redeploy. Then use **Leads** in the footer and enter the code.

The code is checked on the server, never in the page. After 8 wrong codes from one network, unlocking pauses for 15 minutes. Without the database, the form offers to send the brief on WhatsApp instead.

To try the whole site locally, with working leads in memory, run `node source/tools/dev-server.js` from the repository root and open `http://localhost:4173/` (local code `123456`, or set `LEADS_CODE`).

## Client pitch (`pitch/`)

A short, visual pitch for clients. Every line is a few words.

`process/` is the same page with the sections before the process hidden, so “Our process” opens at the seven phases. On the client pitch, the process page and the Agency OS deck, every “Book a call” button goes to the Let’s talk section of the agency website: https://www.onestop-solutions.in/#contact.

| Section | What it shows |
| --- | --- |
| Hero | "Build once. Earn for years." with a rotating ring of all sixteen services |
| Process reel | A seven-phase walkthrough player |
| Our work | Who we are, and four products we have built |
| Why one team | Hiring separately versus One Stop (flip between the two) and five differences |
| Services | Five practices and sixteen services. Each card opens its delivery route, deliverables and phases |
| How we work | The Double Diamond as a clickable diagram, draggable phase cards, and what we do, what you get and what we need in each phase |
| Research pack | Ten research documents as flick cards, each with what is inside |
| What you keep | Twenty-one deliverables, phase by phase |
| Working together | Six promises and what guides us |
| Start | Discovery call, proposal, kickoff, and contact details with copy buttons |

## Beere Kesava ERP deck (`beere-kesava/`)

A pitch for the ERP One Stop built for Beere Kesava & Brothers Silks, Dharmavaram. It uses the ERP's own wine, gold and cream colours, its Fraunces headings and its brand photos, on the same layout as the other pages. Every line is a few words, and every product fact comes from the ERP's code. The images are embedded, so the file works on its own.

| Section | What it shows |
| --- | --- |
| Hero | "From yarn to sale. One portal." with a rotating ring of the twelve steps and a stat bar |
| Walkthrough | A twelve-step player, one ERP screen per step |
| Built for | Who it is for, and simplified ERP screens in a slider |
| Before and after | Paper books flip into ERP screens, plus eight questions answered |
| Journey | Buy, Make, Check, Sell as a clickable diagram, draggable step cards, and who, what and what it replaces for each step |
| One scan | Scan a sample saree tag and its whole story appears |
| Six portals | Flick cards for every role, each opening what that role uses and what is kept from them |
| Night shift | A 24-hour dial with the overnight checks and WhatsApp reports |
| Documents | Eight GST-ready documents in a fan, and WhatsApp delivery |
| Control | OTP sign-in, sign-in location, hidden money, approvals, signatures and the audit log |
| What it gives back | Work removed, a savings estimator with drag sliders, leaks plugged, and the one-time investment |
| Built to last | Data tables, modules, tests and the stack, for investors |
| Paper to portal | A six-step roll-out trail, ideas for later, and other silk towns |
| See it live | Walkthrough steps and contact details with copy buttons |

The savings estimator only uses the numbers the visitor sets. No prices are quoted anywhere.

## Heaven Gadgets growth plan (`heaven-gadgets/`)

A pitch for Heaven Gadgets, a watches, footwear and gadgets store in Ongole. It shows what the store faces today, the system One Stop would build, the new flow from a reel to a repeat order, and what it earns back. It uses midnight navy, cobalt and price-tag yellow, with the store's logo and photos from its Instagram profile, on the same layout as the other pages. Every line is a few words. The store's own images are embedded. The mock screens (store, product page, checkout, tracking, phone app, admin and counter) use their own neutral look, grey canvas, black pills and big condensed type, with free-licence studio product photos that load from Unsplash, so those need a connection. The page asks search engines not to index it.

| Section | What it shows |
| --- | --- |
| Hero | "Only in Ongole. Soon, all of India." with a rotating ring of the eight steps and a stat bar |
| Walkthrough | An eight-step player, one screen per step |
| Your store | Who they are, what they sell (footwear, watches, gadgets, style), five gaps we found (pick one to see it on a large screen, with where we saw it and what fixes it), and how one buyer’s order works today (Ravi, who carries the story down the page), with its weak links |
| Where sales leak | A flow chart of buyers: at five points a share turns red and falls away, and the system plugs each one (switch between today and with the system). Below it, an estimator with drag sliders for the sales won back each year |
| The new flow | The same buyer with the system: one loop for online and store buyers (switch between the two), draggable step cards, and who, what, today and what it gives back for each step |
| One bill | Bill once at the counter and watch seven things happen |
| One platform | Eight tools around one database, each shown on a screen with numbered call-outs |
| Always on | The second half of One platform, one gap below it: a 24-hour clock of bills, alerts, offers and calls, and the AI voice agent on a live call, then the extras around the platform |
| Your buyers | Research on how young buyers shop, the youth loop, five buyer types and eight ways to win them |
| Your numbers | A growth estimator with drag sliders and a before-and-after bar, and why keeping buyers pays |
| Why One Stop | Beere Kesava ERP, Aaravi Collectives and Nawin Golden Boy as cards, more projects as links, and buttons to all our work and the agency website |
| How we build | Our seven phases as a week-by-week plan: one bar per phase, an approval point at the end of each, and launch day marked in week 7 |
| Branch two | Towns around Ongole on a map, and how the system runs new branches |
| Next step | Store visit, plan and quote, go live, with contact details |

Products, prices, names and numbers inside the screens are samples. The estimators only use the numbers the visitor sets. The research figures name their sources on the page (Meta × GWI 2025, Snap × BCG 2024, Bain & Co. 2025).

To check the page in a browser, run `node source/tools/check_hg.js heaven-gadgets/index.html` after `npm install` in `source/tools/`. It reports console errors, overflow and empty containers, runs the main interactions and saves screenshots at desktop and phone widths.

## Pharmacy OS pitch deck (`pharmacy-os/`)

A pitch for Pharmacy OS, software for medical stores: order from the distributor, tick what arrived against that order, bill, remind customers on WhatsApp, and see every store from the owner's phone. It is written for investors and founders in words a store owner can follow. It uses concrete, carbon indigo and honey amber on the same layout as the other pages; the product screens use Atkinson Hyperlegible Next, a typeface made for low vision, and Anek Telugu. The page asks search engines not to index it.

| Section | What it shows |
| --- | --- |
| Hero | "Pharmacy OS. Typed once." with a rotating ring of the eight steps and a stat bar |
| Walkthrough | An eight-step player, one screen per step |
| 01 The gap | One medicine typed three times: the chain today and with Pharmacy OS (switch between the two), notes from store visits, and the trade's own 2021 letter asking for files "to avoid manual punching" |
| 02 Today's software | What a store runs today, a drag slider between a typical screen today and ours, eight products a store owner knows (best at, weak at, how we win, published price), a feature table and a map of the open corner |
| 03 The flow | Buy, stock, sell, grow: eight steps as draggable cards, with who, what, today and what it gives back |
| 04 Try it | A working sketch: build an order from a list as you type, send it, then receive it by ticking. English and Telugu, three text sizes, and a meter of fields typed |
| 05 Distributors | The answer to "a portal for distributors?": send first (WhatsApp, PDF and a link with no login), an order desk later, then a connection to their software |
| 06 The platform | Six jobs and twenty-four features, each on a screen, and what runs by itself |
| 07 Stores | One store or many: separate stock, each store's own distributors, and rules set once |
| 08 Customers | WhatsApp bills and refill reminders, and a campaign estimator with Meta's India rates |
| 09 Owner app | What the owner sees on the phone |
| 10 UX | The evidence on ageing eyes and hands, research done and planned, five personas, two flows before and after, eight design rules with live examples, and the UI kit |
| 11 What it gives back | Hours, money and typing saved each year, with drag sliders, and what reminders can earn |
| 12 Costs | What one store costs us each year, year-one build cost, the team, unit prices, and a break-even estimator for price, stores and team cost |
| 13 Why ours | Five reasons, what gets harder to copy, and nine investor questions answered |
| 14 Why now | Market numbers and a timeline of what changed |
| 15 What we must get right | Ten risks in building it, each with what we do about it |
| 16 Plan | Ten stores first, the roadmap, open questions and the raise |
| Start | Contact details and every source |

Our own price is not stated: the page shows what competitors publish and says ours is set after the pilots. Every market and competitor fact names its source at the end of the page; competitor features come from public material and are marked as such. Products, stores, medicines and amounts inside the screens are samples. The "typical screen today" is our own drawing of a common layout, not a screenshot of any product. The personas are first sketches with stock photos from Pexels, to be replaced by real interviews. The Telugu wording needs a check by a native speaker before it is shown to store owners.

The five line figures come from [Hairline](https://github.com/lucasmarkes/hairline) (MIT). Four load from jsDelivr; the blister strip is our own figure on the same engine, in `source/src6/hairline/` (`kernel.js` is Hairline's engine, unchanged, with its `LICENSE` beside it and on the page; `host.js` mounts our figure on the page; `strip.js` is the figure). If the library cannot load, those figures hide and the page still works.

## Team playbook (`playbook/`)

The team's process and library in one place: search everything with `/` or Ctrl+K.

- **Process**: the seven phases with a step checklist, files produced, exit gate, and the tools, prompts and research linked to each phase.
- **Services**: the delivery route for each of the sixteen services.
- **Research, Prompts, Tools, Knowledge**: libraries the team can add to, edit and delete from. The Tools tab pins the simple everyday core stack at the top.

The shared version of the playbook is a Claude artifact with a shared database, so anything a teammate adds appears for everyone. The copy in this repository has no shared database: it starts from the same starter library and saves changes only in the browser that made them.

## Built with

- HTML, CSS and vanilla JavaScript, one file per page
- [GSAP 3.13](https://gsap.com/) (Draggable, InertiaPlugin, ScrollTrigger, CustomEase) and [Lenis 1.3.4](https://lenis.darkroom.engineering/) from jsDelivr
- Geist, Geist Mono and Caveat from Google Fonts, plus Fraunces for the Beere Kesava deck. The Heaven Gadgets plan uses Clash Display and Satoshi from Fontshare. The Pharmacy OS deck uses Instrument Sans, Atkinson Hyperlegible Next and Anek Telugu from Google Fonts
- [Hairline 0.3.0](https://github.com/lucasmarkes/hairline) line figures on the Pharmacy OS deck
- Keyboard support for sliders and dialogs, and reduced motion for visitors who ask for it

`assets/onestop-logo.svg` is the Onestop wordmark used on every page.

## Agency OS pitch deck (`agency-os/`)

| Section | What it shows |
| --- | --- |
| Hero | Agency OS, end to end, with a rotating ring of product screens |
| Journey reel | A ten-stage walkthrough player |
| Intro | Who builds it, and what is live in Agency OS today |
| The problem | Scattered tools versus one platform (flip between the two) and eight pains solved |
| The platform | The owner dashboard |
| Three layers | Get found, Grow, Deliver & run, with the Playbook underneath and one shared calendar |
| The journey | Ten stages as a draggable card slider, with features per role and Playbook items |
| Strategy | The free-to-paid growth loop and free tools |
| Nine portals | Flick cards for every role, each opening its full sitemap |
| Playbook | Nine item types, visibility levels and the public profile |
| Document studio | Fourteen documents and a live merge-field demo |
| Premium & foreign clients | Globe, overlap-hours finder and international mode |
| Handoff | The handoff package and a tech-stack detector |
| Our edge | What only Agency OS does, plus the full feature ledger |
| Plans | Free, Solo and Agency tiers |
| Build order | NOW through R6, with R7 mobile apps as future scope |
| Mobile (future scope) | Concept screens and what each role needs on the phone |
| Open questions | Six decisions to settle before design |
| Invest | Contact details with copy buttons |

## Contact

- Phone / WhatsApp: +91 90149 52056
- Agency: workwithonestop@gmail.com
- Email: leeladharabburi2032@gmail.com
- Website: https://www.onestop-solutions.in/
