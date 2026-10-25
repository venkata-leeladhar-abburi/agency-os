# Agency OS design system: plan

**Decision:** build on **shadcn/ui** (Radix primitives, Tailwind CSS, CSS variables) and make it ours with our own tokens, type, icons, density and SaaS patterns. The references agree: at our stage, start from an open-source foundation, replace its default tokens, keep the core small, and don't adopt a kit whole.

**Why shadcn:**
- The component code lives in our repo, so we own and can change everything.
- Radix gives accessible behaviour (focus, keyboard, ARIA) for free.
- Tokens are CSS variables, so themes (light, dark, client branding) are just a token swap.
- It already includes the SaaS pieces we need: sidebar, data table, command palette, sheet, toast, form and charts.

**Risk, and what fixes it:** a default shadcn app looks like every other one. We change the tokens, radius, type, icons, density, motion and the patterns on top, so it reads as Agency OS, not as a template.

## 1. Tokens (semantic names only in components)

Three layers: **brand** (raw palette), **semantic** (what components use) and **component** (only where needed). Names match in Figma variables and code.

- **Brand palette** (from the Agency OS deck):
  - ink `#151313`
  - concrete `#f4f4f4`
  - violet `#6840ff`, primary
  - volt `#a1ff62`, highlight and success-positive
  - plus a neutral grey ramp tinted slightly warm
- **Semantic:**
  - `--background`, `--surface`, `--surface-raised`, `--surface-sunken`
  - `--border`, `--border-strong`
  - `--text`, `--text-muted`, `--text-subtle`
  - `--primary`, `--primary-fg`, `--accent`, `--accent-fg`
  - `--success`, `--warning`, `--danger`, `--info`, each with a `-soft` background
  - `--ring`, `--overlay`
- **Status rule:** every status colour is paired with a text label (never colour alone).
- **Themes:** light and dark from day one. The client portal can take the agency's brand colour by swapping `--primary`.
- **Type:**
  - Geist for UI and Geist Mono for numbers, IDs and code.
  - A small scale: 12 / 13 / 14 / 16 / 20 / 24 / 32 / 40.
  - Tabular figures for money.
- **Spacing:** a 4px base (`--space-1` to `--space-12`).
- **Density:** two modes, comfortable and compact (for tables).
- **Radius:** `--radius-sm` 6, `--radius` 10, `--radius-lg` 14, `--radius-pill`. A slightly softer shape than default shadcn.
- **Shadow:** three levels plus a focus ring.
- **Motion:** 120ms, 200ms or 320ms durations and one ease-out curve; respect reduced motion.

## 2. Icons

One premium family only, outline style, 1.5px stroke, at 16 / 20 / 24 sizes. **Recommended:** Phosphor (regular for UI, duotone for headings and empty states). Alternatives: Hugeicons or Untitled UI icons. Icons support headings and actions and always come with a label or tooltip.

## 3. Core components (the first set, every state defined)

Each component gets default, hover, focus, active, disabled, loading and error states:

| Group | Components |
| --- | --- |
| Actions | button, icon button, link |
| Forms | input, textarea, select, combobox, checkbox, radio, switch, date picker, file upload, form (react-hook-form + zod) |
| Overlays | dialog, sheet/drawer, popover, tooltip, dropdown menu |
| Display | badge/status pill, avatar and avatar group, card, tabs, breadcrumb |
| Feedback | toast (sonner), skeleton, progress, empty state |
| Navigation | sidebar, command palette (cmdk) |

## 4. Agency OS patterns (built from the core)

- **Data table** (TanStack): about 5 default columns, column picker, saved views, filters that persist, bulk actions, inline edit, density toggle.
- **Kanban board:** leads and tasks, custom stages, drag and drop, card meta (value, source, owner).
- **Record header:** name, status, owner, key numbers, primary action, tabs.
- **Activity feed and timeline:** calls, notes, stage moves, approvals.
- **Phase stepper and approval gate card:** submit, then approve or comment, with an audit trail.
- **Document builder:** blocks, merge fields, clause library, versions, e-sign status.
- **Invoice builder:** line items, GST and export, currency, payment link, status.
- **Metric card and charts:** revenue, pending, overdue, pipeline, team load, usage meter.
- **Portal shell:** the client-facing layout with agency branding.
- **Permission states:** read-only, no access, request access.
- **AI panel:** status messages while working, sources shown, review before apply.
- **Vault field:** reveal once, copy, audit log.
- **Onboarding checklist and empty-state templates.**

## 5. Rules (decided once)

- Modal for short, focused decisions; drawer for viewing or editing a record without losing the list; full page for long forms.
- Confirm only destructive or high-impact actions; everything else gets undo.
- One primary button per view.
- Numbers right-aligned in tables, money in Geist Mono.
- Empty states always give one action.

## 6. Docs and governance

- Storybook for every component and its states, with short do/don't notes.
- A `CLAUDE.md` rules file in the app repo naming the tokens and components to use, so AI coding follows the system.
- A decision log for non-obvious choices.
- SemVer for the component library.
- One owner approves additions. Promote a one-off to the system after it repeats three times.
- Tokens in `globals.css` and `tokens.json`; add Style Dictionary when mobile (React Native) starts.

## 7. Rollout

Tokens, then core components, then patterns, then screens in order of daily use (see `flows.md`). Build screen by screen; no big-bang rewrite.

## Sources

- f1studioz: SaaS design system guide — https://f1studioz.com/blog/saas-design-system-guide/
- designpixil: Design system for SaaS — https://designpixil.com/blog/design-system-for-saas-guide
- Eleken: Design system for SaaS — https://www.eleken.co/blog-posts/design-system-for-saas
- Donux: Design systems — https://donux.com/blog/design-systems
- Not read (the sites block automated readers): uxplanet case study, Medium (wntart)
