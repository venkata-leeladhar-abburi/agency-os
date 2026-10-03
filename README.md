# One Stop Solutions: pitch websites

Five websites for **One Stop Solutions**. Each page has its CSS and JavaScript inline:

| Page | File | Who it is for |
| --- | --- | --- |
| Agency website | `site/index.html` (images in `site/img/`) | Clients, partners and hires |
| Agency OS pitch deck | `index.html` | Investors |
| Client pitch | `pitch/index.html` | Clients and leads |
| Beere Kesava ERP deck | `beere-kesava/index.html` | Beere Kesava, investors and silk businesses |
| Team playbook | `playbook/index.html` | The One Stop team only |

## View them

Open any of the files in a browser. Fonts and the animation libraries load from public CDNs, so an internet connection gives the full experience. Without one, every section still renders and the sliders fall back to native scrolling.

To host the investor deck or the client pitch, publish the repository with GitHub Pages (Settings → Pages → Deploy from a branch) or drop the file on any static host. **Keep `playbook/` off public hosting**: it is internal. If you publish the repository with GitHub Pages, everything in it becomes public, the playbook included.

## Agency website (`site/`)

One Stop Solutions’ own website: our work, services, products, process and team, in black, white and signal orange on the same layout as the other pages.

| Section | What it shows |
| --- | --- |
| Hero | The Onestop wordmark, what we do, and a reel of real project screens |
| Brands | Logos of the brands we’ve built for |
| Selected work | Beere Kesava ERP, Ornate ’26, Aaravi Collectives, NGB and LimitX, each with its real screens, a case study and a live preview |
| All projects | Every project, filtered by type, with live previews and links |
| Services | Four core services, plus what we help with around a product |
| Products | Products a business can license, customise or have built for itself, with links to the decks |
| How we work | Three stages, seven draggable phase cards, and the playbook |
| Proof, team, questions | A client quote, facts, the team and answers |
| Contact | A brief form that opens WhatsApp or email with the message filled in |

Live previews load a project’s real website inside the page when someone clicks. A site that blocks this shows a blank box, so the preview always has an **Open site** button. Team photos load from the current Framer site and fall back to initials.

## Client pitch (`pitch/`)

A short, visual pitch for clients. Every line is a few words.

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

## Team playbook (`playbook/`)

The team's process and library in one place: search everything with `/` or Ctrl+K.

- **Process**: the seven phases with a step checklist, files produced, exit gate, and the tools, prompts and research linked to each phase.
- **Services**: the delivery route for each of the sixteen services.
- **Research, Prompts, Tools, Knowledge**: libraries the team can add to, edit and delete from. The Tools tab pins the simple everyday core stack at the top.

The shared version of the playbook is a Claude artifact with a shared database, so anything a teammate adds appears for everyone. The copy in this repository has no shared database: it starts from the same starter library and saves changes only in the browser that made them.

## Built with

- HTML, CSS and vanilla JavaScript, one file per page
- [GSAP 3.13](https://gsap.com/) (Draggable, InertiaPlugin, ScrollTrigger, CustomEase) and [Lenis 1.3.4](https://lenis.darkroom.engineering/) from jsDelivr
- Geist, Geist Mono and Caveat from Google Fonts, plus Fraunces for the Beere Kesava deck
- Keyboard support for sliders and dialogs, and reduced motion for visitors who ask for it

`assets/onestop-logo.svg` is the Onestop wordmark used on every page.

## Agency OS pitch deck (`index.html`)

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
- Website: https://onestopsolutions.framer.website/
