# One Stop Solutions: pitch websites

Nine pages for **One Stop Solutions**. Each page has its CSS and JavaScript inline:

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
| AI website workshop plan | `workshop/index.html` | The One Stop team: the trainer's plan for the three-hour Sunday workshop |

Each page has its own colours:

| Page | Palette |
| --- | --- |
| Agency website and client pitch | Black, white and signal orange (the One Stop brand) |
| Agency OS deck | Concrete, volt green and violet |
| Team playbook | Warm paper, forest green and highlighter yellow |
| Beere Kesava ERP deck | Wine, gold and cream |
| Heaven Gadgets growth plan | Midnight navy, cobalt and price-tag yellow, with a red accent |
| Pharmacy OS deck | Concrete, carbon indigo and honey amber, with a red pen for notes |
| AI website workshop plan | Warm ivory, soft black and burnt orange |

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
| `/workshop/` | AI website workshop plan |

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
| AI website workshop plan | `python3 source/build7.py` | `source/src7/` |

The builders need Python 3 only. `api/leads.js` needs no packages. Project screenshots and logos for the agency website are WebP files in `img/`; the project list, services, products and team are at the top of `source/src4/site.js`.

## Agency website (`index.html`)

One Stop Solutions’ own website: our work, services, products, process and team, in black, white and signal orange on the same layout as the other pages.

The page is told as one pitch in six chapters. An "at a glance" map under the hero shows all six, and a band opens each chapter: 1 The problem (01), 2 Today's tools (02), 3 Our answer (03 to 05), 4 The product (06 to 10), 5 Why we win (11, 12), 6 The business (13 to 16). The chapters live in `C.chapters` in `content.js`.

| Section | What it shows |
| --- | --- |
| Hero | "Pharmacy OS. Typed once." with a rotating ring of the eight steps and a stat bar, then the six chapters at a glance |
| Walkthrough | An eight-step player, one screen per step |
| 01 The problem | One bill, three people: where it hurts for the store owner, the distributor and the accountant; the chain today and with Pharmacy OS; notes from store visits; the trade's 2021 letter |
| 02 Today's software | What the store, the distributor and the accountant run today, a drag slider between a typical screen and ours, eight products (best at, weak at, how we win, price), a twenty-row feature table and a map of the open corner |
| 03 The whole chain | One system for store, distributor and accountant: what each pays (store under ₹6,000 a year, distributor and accountant free) and what passes between them; the distributor's free desk (orders, dispatch, payments) and free billing at launch; the accountant's portal, invited from the store |
| 04 One flow | Eight steps as draggable cards, then a day at the store: what runs by itself |
| 05 Try it | A working demo: order, send, then receive by importing the bill file or ticking. English or తెలుగు, three text sizes |
| 06 One platform | The overview on a counter screen, a tablet and a phone; eight jobs and thirty-nine features, each on its own screen; moving in; what runs by itself |
| 07 One store or many | Separate stock, each store's own distributors, rules set once |
| 08 Customers | WhatsApp bills, refill reminders and a campaign estimator |
| 09 Owner app | What the owner sees on the phone |
| 10 Design for fifty-plus | Evidence, research, personas, flows, design rules, annotated screen, language, measured accessibility, the UI kit |
| 11 Why they will switch | Six reasons, the same feature in today's software and in ours, what gets harder to copy, investor questions |
| 12 What it gives back | Hours, money and typing saved, and what reminders can earn |
| 13 Our costs | Cost to serve, the price plan, year-one cost, the team, unit prices, break-even |
| 14 Why now | Market numbers and a timeline |
| 15 Build with care | Ten things we must get right |
| 16 The plan | Roadmap with gates, open questions and the raise |
| Start | Contact details and every source |

Our planned price is stated as under ₹6,000 a store a year before GST, with WhatsApp messages charged as used; the page shows what competitors publish beside it and says pilots will test the number. The feature set and the price were agreed with the owner on 10 October 2026, after a fresh check of the competitors' public pages: one-click import of the distributor's bill file, comparing distributors by rate, scheme and credit, an optional order-bill-goods check, short items sent to the next distributor, asking the app a question, and pay-later credit through a partner are in; voice billing, prescription photo reading, bill photo reading and approval from WhatsApp are out. The page opens behind a 6-digit code (a SHA-256 hash in `po.html`; the browser remembers it once entered). Every market and competitor fact names its source at the end of the page; competitor features come from public material and are marked as such. Products, stores, medicines and amounts inside the screens are samples. The "typical screen today" is our own drawing of a common layout, not a screenshot of any product. The personas are first sketches with stock photos from Pexels, to be replaced by real interviews. The Telugu wording needs a check by a native speaker before it is shown to store owners.

### The product screens

Every Pharmacy OS screen on the page is drawn from one kit: `source/src6/poui.css` (the parts) and `source/src6/povis.js` (the screens). The look follows a reference dashboard the owner chose: a light side menu with grouped words, white panels in soft grey trays, numbers with a small trend line, a bar chart with today in dark navy, a list of what happened, and tables with a status icon and word on every row. Navy marks what is chosen or next; green, amber and red mean fine, soon and stop, always with an icon and a word. English is set in Inter and Telugu in Anek Telugu. Medicine photos are free stock photos from Pexels with no brand on them; if one does not load, the row shows an icon instead.

- **Artboards.** Screens are drawn in px on fixed artboards: counter screen 1280 × 800, phone 360 × 704, tablet 720 × 960. `build6.py` turns every lowercase `px` in `poui.css` into `calc(var(--px) * n)`, so a screen scales with its container. Write `PX` for a hairline that must stay one pixel. A px value inside a `style` attribute in `povis.js` is scaled the same way.
- **Close-ups.** Small cards (the hero ring, the flow cards, the player) show a screen enlarged about a point, set per step in `content.js` as `zoom: [times, x, y]`.
- **One screen per feature.** The 39 features in section 06 each have their own screen; the keys are in `C.jobs` in `content.js`. The distributor's screens in section 03 are `desk`, `dispatch` and `dpay`; the accountant's portal is `cahome`.
- **The demo** in section 05 is real HTML in the same look (`initDemo` in `po.js`, `.dm__*` in `po.css`).
- **Measured, not promised.** The accessibility table in section 10 comes from measuring the demo in every state, at desktop and phone widths: lowest text contrast 4.5 : 1, smallest button 44 × 44 px, smallest text 14 px, and every control reachable by keyboard with a visible focus ring. Measure again after changing the demo's colours or sizes, and update `C.a11y` in `content.js`.

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
- Geist, Geist Mono and Caveat from Google Fonts, plus Fraunces for the Beere Kesava deck. The Heaven Gadgets plan uses Clash Display and Satoshi from Fontshare. The Pharmacy OS deck uses Instrument Sans for the page, and Inter and Anek Telugu for the product screens, from Google Fonts
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
