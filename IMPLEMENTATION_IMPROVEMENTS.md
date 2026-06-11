# Implementation Plan — Frontend Improvements (Thorne Aesthetics)

Actionable build plan for all frontend-only improvements identified in the site review. **No backend work** — form submission stays client-side (`console.log` + success state).

Use the checklists below to track progress. Mark items with `[x]` as you complete them.

---

## Master progress tracker

| Phase | Focus | Status |
|-------|--------|--------|
| 0 | Assets & image pipeline | [ ] Not started |
| 1 | Navigation, scroll, and mobile menu | [ ] Not started |
| 2 | CTA consistency, dialog refactor, placement | [ ] Not started |
| 3 | Footer contact & trust signals | [ ] Not started |
| 4 | Treatments, transformations, FAQ content UX | [ ] Not started |
| 5 | Form UX polish | [ ] Not started |
| 6 | Accessibility & frontend SEO | [ ] Not started |
| 7 | Visual design, tokens, motion | [ ] Not started |
| 8 | Final QA pass | [ ] Not started |

**Overall:** `[ ]` 0 / 8 phases complete

---

## Scope & constraints

**In scope**
- UI/UX, copy placement, client-side interactivity, metadata, JSON-LD, static assets in `public/`
- Refactoring consultation dialog to a single shared instance
- Image optimization config once assets exist

**Out of scope**
- Backend API, email delivery, CRM, scheduling integrations
- Real form POST / database storage
- Analytics event wiring beyond existing Vercel Analytics
- Multi-page routing or CMS

---

## Phase 0 — Assets & image pipeline

**Goal:** Fix broken visuals and favicons so the page matches the intended editorial luxury aesthetic.

**Why first:** Components already reference images that do not exist in `public/` (only `icon.svg` is present today). Nothing else will look right until this is done.

### Files to touch
- `public/` — add all image assets
- `next.config.mjs` — re-enable image optimization when assets are stable
- `app/layout.tsx` — verify favicon metadata matches files on disk

### Asset checklist

- [ ] **Hero portrait** — `public/dr-thorne.png` (3:4 aspect, clinical-neutral background, consistent with brand)
- [ ] **Philosophy image** — `public/philosophy.png` (4:5 aspect, treatment room or editorial detail)
- [ ] **Transformation set 1** — `public/transform-1-before.png`, `public/transform-1-after.png`
- [ ] **Transformation set 2** — `public/transform-2-before.png`, `public/transform-2-after.png`
- [ ] **Transformation set 3** — `public/transform-3-before.png`, `public/transform-3-after.png`
- [ ] **Favicon light** — `public/icon-light-32x32.png`
- [ ] **Favicon dark** — `public/icon-dark-32x32.png`
- [ ] **Apple touch icon** — `public/apple-icon.png`
- [ ] **Open Graph image** — `public/og-image.png` (1200×630 recommended; can reuse hero or branded composite)

### Image quality guidelines
- [ ] Consistent lighting and color grading across all photos
- [ ] Meaningful `alt` text already in components — verify it matches final images
- [ ] Explicit aspect ratios preserved in components (`aspect-[3/4]`, `aspect-[4/5]`) — no layout shift

### Next.js image config
- [ ] Remove or set `images.unoptimized: false` in `next.config.mjs` after assets are added
- [ ] Confirm `next/image` loads all paths in dev and production build
- [ ] Hero image keeps `priority`; below-fold images use appropriate `sizes`

### Phase 0 verification
- [ ] No broken image placeholders in browser
- [ ] Favicons appear in browser tab (light/dark if applicable)
- [ ] Lighthouse / devtools: no 404s for image requests

---

## Phase 1 — Navigation, scroll, and mobile menu

**Goal:** Smooth, accessible in-page navigation that works with the fixed header.

### Files to touch
- `app/globals.css` — scroll padding, optional smooth scroll
- `components/landing/site-nav.tsx` — active link, mobile menu a11y
- `components/landing/data.ts` — optional: section ids map for observer

### Scroll & anchor checklist
- [ ] Add `scroll-padding-top` on `html` (match nav height: ~64px mobile, ~80px desktop)
- [ ] Add `scroll-behavior: smooth` on `html` **only when** `prefers-reduced-motion: no-preference`
- [ ] Verify each nav link lands with section heading fully visible (Treatments, Philosophy, Transformations, FAQ)
- [ ] Verify `#top` from logo scrolls to hero without overlap

### Active section highlighting (optional but recommended)
- [ ] Add Intersection Observer in `site-nav.tsx` (or small hook) watching section `id`s
- [ ] Apply active style to matching nav link (e.g. `text-foreground` vs `text-muted-foreground`)
- [ ] Observer respects reduced motion / does not cause jank

### Mobile menu checklist
- [ ] Lock `document.body` overflow while menu is open
- [ ] Trap focus inside mobile menu panel (Tab cycles within menu)
- [ ] Close menu on `Escape`
- [ ] Close menu on anchor link click (already partial — confirm reliable)
- [ ] Return focus to hamburger button when menu closes
- [ ] Optional: full-height overlay with backdrop fade instead of thin strip

### Phase 1 verification
- [ ] Click every nav link on desktop and mobile — no content hidden under fixed header
- [ ] Keyboard-only: open menu, Tab through links, Escape closes
- [ ] No body scroll bleed when mobile menu open

---

## Phase 2 — CTA consistency, dialog refactor, and placement

**Goal:** One consultation flow, consistent messaging, and CTAs where users need them.

### CTA copy decision (pick one approach)

**Option A — Unified primary label**
- [ ] Use **"Request an Elite Facial Analysis"** everywhere (nav + hero + new CTAs)

**Option B — Hierarchy**
- [ ] Primary: **"Request an Elite Facial Analysis"** (hero, section CTAs)
- [ ] Secondary shorthand: **"Book a Consultation"** (nav only, smaller outline button)

Document chosen approach here: _______________

### Shared consultation dialog refactor

**Problem:** Three separate `ConsultationDialog` instances today (nav desktop, nav mobile, hero) — duplicate DOM and state.

### Files to touch
- `components/landing/consultation-dialog.tsx` — split dialog shell vs triggers
- New: `components/landing/consultation-provider.tsx` (or similar) — context + single dialog
- `app/page.tsx` — wrap page with provider; mount dialog once
- `components/landing/site-nav.tsx`, `hero.tsx`, and new CTA locations — use trigger only

### Dialog refactor checklist
- [ ] Create `ConsultationProvider` with `openConsultation()` and optional `defaultConcern` param
- [ ] Mount **one** `Dialog` + form at page level
- [ ] Replace `ConsultationDialog` in nav (desktop + mobile) with `ConsultationTrigger` button
- [ ] Replace `ConsultationDialog` in hero with `ConsultationTrigger`
- [ ] Preserve existing props: `triggerLabel`, `triggerVariant`, `triggerClassName`
- [ ] Confirm open/close/reset behavior unchanged (clean state on close)
- [ ] Confirm only one dialog in DOM (inspect with devtools)

### New CTA placement checklist
- [ ] **Treatment grid** — closing band: "Not sure which treatment fits?" + trigger button
- [ ] **Treatment cards** — subtle "Discuss this treatment" link/button per card (opens dialog; optional pre-select concern)
- [ ] **FAQ section** — "Still have questions?" + trigger below accordion
- [ ] **Footer** — CTA band above disclaimer (outline or ghost on dark background)

### Phase 2 verification
- [ ] Every CTA opens the same dialog with identical form
- [ ] Submit from any entry point logs to console and shows success state
- [ ] CTA labels match chosen copy strategy
- [ ] No duplicate dialog elements in DOM

---

## Phase 3 — Footer contact & trust signals

**Goal:** Make contact actionable and surface credentials above the fold.

### Files to touch
- `components/landing/data.ts` — clinic contact constants, credential stats
- `components/landing/site-footer.tsx` — tel, mailto, maps
- `components/landing/hero.tsx` and/or `philosophy.tsx` — trust row
- New (optional): `components/landing/trust-bar.tsx`

### Footer contact checklist
- [ ] Add to `data.ts`: phone, email, Google Maps URL (placeholder values OK)
- [ ] Phone: `tel:` link with accessible label
- [ ] Email: `mailto:` link
- [ ] Address: link to Google Maps (opens new tab, `rel="noopener noreferrer"`)
- [ ] Hours remain visible; optional `time` semantics if desired

### Trust signals checklist
- [ ] Define 3–4 trust items in `data.ts` (e.g. "Double-board certified", "15+ years", "0 delegated treatments", "Union Square, SF")
- [ ] Render trust row below hero CTAs **or** below philosophy headline
- [ ] Visual treatment: stat chips, horizontal row, or minimal bordered pills — match existing tokens
- [ ] Copy aligns with FAQ answer ("Every injectable… performed personally by Dr. Thorne")

### Phase 3 verification
- [ ] Footer links work on mobile (tap-to-call, mail client, maps)
- [ ] Trust row readable at 360px width
- [ ] No new horizontal scroll

---

## Phase 4 — Treatments, transformations, and FAQ content UX

**Goal:** Improve discovery, credibility of results, and objection handling.

### 4A — Treatment discovery

**Files:** `data.ts`, `treatment-grid.tsx`, `treatment-card.tsx`, optional new filter component

- [ ] Add `category` field to each treatment in `data.ts` (e.g. `injectables`, `skin`, `comprehensive`)
- [ ] Add category filter chips above grid (client state only; "All" + categories)
- [ ] Optional: "Starting at" prefix on price ranges for scannability
- [ ] Optional: expandable "What to expect" per card (accordion or disclosure — keep minimal)
- [ ] Empty filter state: show message if no treatments match (edge case)

### 4B — Transformations upgrades

**Files:** `transformation-card.tsx`, `transformations.tsx`, `data.ts`

**Low effort (do first)**
- [ ] Increase mobile image prominence (adjust grid gaps / min heights)
- [ ] Ensure Before/After labels meet contrast requirements
- [ ] Add short treatment tag under each image pair (from `data.ts`)

**Compliance**
- [ ] Add section-level disclaimer below grid (short version of footer medical disclaimer)
- [ ] Disclaimer uses `text-xs` / muted styling — visible but not dominant

**Medium effort (optional)**
- [ ] Build drag-to-reveal before/after slider component (one card as pilot)
- [ ] Respect `prefers-reduced-motion` (fallback to static side-by-side)
- [ ] Keyboard accessible slider (arrow keys or two-state toggle)

### 4C — FAQ enhancements

**Files:** `faq.tsx`, `data.ts`, `app/layout.tsx` (JSON-LD in Phase 6)

- [ ] Set accordion `defaultValue` to first item ("Will I still look like myself?")
- [ ] Add FAQ: first visit duration / what to bring
- [ ] Add FAQ: cancellation or rescheduling policy
- [ ] Add FAQ: payment / financing (copy: confirmed at consultation)
- [ ] Review accordion keyboard behavior after changes

### Phase 4 verification
- [ ] Treatment filter toggles cards without layout break
- [ ] Transformations disclaimer visible without scrolling past entire section on desktop
- [ ] New FAQ items expand/collapse correctly
- [ ] Slider (if built) works touch + mouse + keyboard

---

## Phase 5 — Form UX polish (client-side only)

**Goal:** Form feels trustworthy and polished without a backend.

### Files to touch
- `components/landing/consultation-dialog.tsx`
- `components/landing/data.ts` — optional referral source options

### Validation & input checklist
- [ ] US phone formatting or mask on input (display formatted; store normalized or raw — document choice)
- [ ] Phone pattern validation beyond "required" (e.g. 10 digits)
- [ ] On submit with errors: focus first invalid field (`name` → `email` → `phone` → `concern`)
- [ ] Prevent double submit (`isSubmitting` flag)

### Submit & success checklist
- [ ] Disable submit button while "submitting"
- [ ] Show spinner on button for ~600ms before success (simulated latency)
- [ ] Success view: numbered "What happens next" steps (call within 1 day → analysis → plan)
- [ ] Privacy note under submit: "We never share your information."
- [ ] Placeholder Privacy Policy link (`/privacy` or `#privacy` until page exists)

### Optional fields
- [ ] "How did you hear about us?" select (options in `data.ts`)
- [ ] Include in `console.log` payload on submit
- [ ] Field is optional — does not block submission

### Phase 5 verification
- [ ] Invalid submit focuses first error; screen reader announces via `aria-invalid`
- [ ] Double-click submit does not duplicate logs or break UI
- [ ] Close dialog → reopen → clean form (existing behavior preserved)
- [ ] Success steps render correctly on mobile

---

## Phase 6 — Accessibility & frontend SEO

**Goal:** WCAG-friendly polish and shareable metadata — all static frontend.

### Files to touch
- `app/layout.tsx` — metadata, JSON-LD
- `app/page.tsx` or `layout.tsx` — skip link
- `components/landing/faq.tsx` — ensure FAQ content matches JSON-LD

### Accessibility checklist
- [ ] Skip link: first focusable element — "Skip to main content" → `#main` or first section
- [ ] Add `id="main"` on `<main>` in `page.tsx` if using skip target
- [ ] Confirm visible focus rings on all interactive elements (nav, CTAs, accordion, form)
- [ ] Dialog: verify focus trap, Esc close, focus return (shadcn Dialog — re-test after refactor)
- [ ] All decorative vs informative images: correct `alt` (no change if already correct)

### Metadata checklist
- [ ] Remove `generator: 'v0.app'` from metadata
- [ ] Add `openGraph`: title, description, url, siteName, images (`/og-image.png`), locale
- [ ] Add `twitter`: card (`summary_large_image`), title, description, images
- [ ] Add `metadataBase` for absolute OG URLs in production

### Structured data (JSON-LD)
- [ ] `MedicalBusiness` or `LocalBusiness` schema: name, address, phone, hours, url
- [ ] `FAQPage` schema: questions/answers mirroring `faqs` in `data.ts`
- [ ] Validate with Google Rich Results Test or schema validator

### Phase 6 verification
- [ ] Tab from page load: skip link → nav → content (logical order)
- [ ] Share preview debugger shows OG title, description, image
- [ ] JSON-LD parses without errors
- [ ] No hydration warnings in console

---

## Phase 7 — Visual design, tokens, and motion

**Goal:** Elevate luxury feel without breaking minimalism.

### Files to touch
- `app/globals.css` — tokens, texture, motion queries
- `components/ui/button.tsx` — optional radius alignment
- Section components — rhythm breaks, scroll animations
- `components/landing/treatment-card.tsx` — hover behavior

### Design token consistency
- [ ] Decide radius strategy: align cards + buttons (e.g. both `rounded-md`) **or** document intentional contrast
- [ ] Consider bumping `--radius` slightly for softer luxury feel
- [ ] Use `--accent` for secondary links, blockquote marks, or focus accents (sparingly)
- [ ] Audit: no raw `bg-white` / `text-black` — tokens only

### Visual rhythm (pick 2–3, not all)
- [ ] Pull quote or stat band between sections (e.g. "15+ years in facial aesthetics")
- [ ] Thin horizontal rule or letter-spaced divider between major sections
- [ ] Full-bleed image band between Philosophy and Transformations (reuse or crop `philosophy.png`)
- [ ] Subtle paper/grain texture on `bg-secondary` sections (CSS only, low opacity)

### Motion & micro-interactions
- [ ] Replace card `hover:scale-[1.02]` with border/opacity shift (less layout jitter)
- [ ] Optional: fade-up on scroll for section headers (Intersection Observer)
- [ ] Wrap animations in `@media (prefers-reduced-motion: no-preference)`
- [ ] Mobile menu: match nav transition easing
- [ ] Form submit spinner (Phase 5) uses same motion language

### Dark mode decision
- [ ] **Option A:** Remove unused `.dark` tokens from `globals.css` to reduce noise
- [ ] **Option B:** Add dark mode toggle + test all sections (lower priority for med-spa)

Document choice: _______________

### Phase 7 verification
- [ ] Reduced motion: no scroll animations or scale hovers when preference set
- [ ] Visual pass at 360px, 768px, 1280px — rhythm changes don't break grid
- [ ] Hover states feel consistent across cards, links, buttons

---

## Phase 8 — Final QA pass

**Goal:** Ship-ready frontend with no regressions.

### Cross-browser / device
- [ ] Chrome (desktop + mobile viewport)
- [ ] Safari (iOS if available)
- [ ] Firefox (desktop)
- [ ] No horizontal scroll at 360px

### Functional regression
- [ ] All nav anchors scroll correctly
- [ ] All CTAs open shared dialog
- [ ] Form: happy path, validation errors, success, reset on close
- [ ] FAQ accordion: single open item, default first open
- [ ] Treatment filter (if implemented): all categories work
- [ ] Mobile menu: open, navigate, close, focus

### Performance & build
- [ ] `pnpm build` or `npm run build` succeeds
- [ ] No console errors on load or interaction
- [ ] Images optimized (if Phase 0 config updated)
- [ ] Lighthouse: Accessibility ≥ 90, Best Practices reasonable

### Content & legal
- [ ] Placeholder phone/email/maps clearly placeholders or replaced with real data
- [ ] Medical disclaimer present in footer + transformations section
- [ ] Copyright year dynamic in footer (already implemented — confirm)

### Phase 8 sign-off
- [ ] All phase checklists above reviewed
- [ ] Master progress tracker updated
- [ ] Ready for deploy / PR

---

## Recommended build order

Execute phases in this order for best impact per effort:

1. **Phase 0** — Assets (unblocks everything visual)
2. **Phase 1** — Scroll + mobile menu (quick UX wins)
3. **Phase 2** — Dialog refactor + CTAs (conversion)
4. **Phase 3** — Footer contact + trust bar (credibility)
5. **Phase 4** — Content UX (treatments, transformations, FAQ)
6. **Phase 5** — Form polish
7. **Phase 6** — SEO + a11y
8. **Phase 7** — Visual polish (can overlap with 4–6)
9. **Phase 8** — Final QA

---

## File change map (quick reference)

| File | Phases |
|------|--------|
| `public/*` | 0 |
| `next.config.mjs` | 0 |
| `app/globals.css` | 1, 7 |
| `app/layout.tsx` | 0, 6 |
| `app/page.tsx` | 2, 6 |
| `components/landing/data.ts` | 2, 3, 4, 5 |
| `components/landing/site-nav.tsx` | 1, 2 |
| `components/landing/hero.tsx` | 2, 3 |
| `components/landing/consultation-dialog.tsx` | 2, 5 |
| `components/landing/consultation-provider.tsx` (new) | 2 |
| `components/landing/treatment-grid.tsx` | 2, 4 |
| `components/landing/treatment-card.tsx` | 2, 4, 7 |
| `components/landing/transformations.tsx` | 4 |
| `components/landing/transformation-card.tsx` | 4 |
| `components/landing/faq.tsx` | 4, 6 |
| `components/landing/site-footer.tsx` | 2, 3 |
| `components/landing/trust-bar.tsx` (new, optional) | 3 |
| `components/ui/button.tsx` | 7 |

---

## Notes for implementers

- Keep **server components** where possible; add `"use client"` only for scroll observers, filters, sliders, and dialog provider.
- Extend `data.ts` for new copy and config — avoid hardcoding strings in multiple components.
- When adding CTAs after dialog refactor, prefer `<ConsultationTrigger />` over mounting new dialogs.
- Match existing patterns: eyebrow labels, `font-heading` for titles, `text-muted-foreground` for body, `border-border` hairlines.
- Do not add backend routes or API calls — form success remains UI-only until explicitly scoped.

---

*End of implementation plan. Update checkboxes in this file as work completes.*
