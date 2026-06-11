# Implementation Kickstart — Thorne Aesthetics Landing Page

A build plan for the high-ticket Medical Spa landing page for **"Thorne Aesthetics"**, in the minimalist, editorial luxury aesthetic of the provided reference. **No code is written yet — this document is the plan only.**

---

## 1. Goal / Success Criteria

**Goal:** Ship a single, fully responsive, production-ready landing page that reads as ultra-minimalist clinical luxury and converts visitors into consultation requests via a modal lead-capture form.

The build is **done** when:

- [ ] The page renders all 7 sections in order: Navigation → Hero → Treatment Grid → Philosophy → Transformations → FAQ → Footer.
- [ ] Typography uses an elegant serif for headings and a sharp sans-serif for body, applied via the font tokens (no inline font hacks).
- [ ] The palette is restricted to Alabaster (`#FBFBFA`), Charcoal (`#1A1A1A`), and a soft Slate accent — 3–5 colors total, defined as design tokens in `globals.css`.
- [ ] The "Request an Elite Facial Analysis" CTA opens a shadcn `Dialog` containing the lead form.
- [ ] The form collects Name, Email, Phone, and a `Select` for "Primary Concern" (Botox, Filler, Skin Health, Other), validates required fields, shows a success ("Thank You") state on submit, and `console.log`s the submitted data.
- [ ] FAQ is a working shadcn `Accordion`; Treatment data is rendered from a `treatments` array (data-driven, not hardcoded JSX per card).
- [ ] All copy is real, high-quality marketing copy — zero Lorem Ipsum.
- [ ] The page is keyboard-navigable, has visible focus states, readable contrast (WCAG AA), and works cleanly from 360px mobile up through desktop.

**Out of scope (do not add):** real backend/email delivery, scheduling integrations, analytics events, authentication, CMS, multi-page routing, animations beyond subtle hover scale + smooth transitions.

---

## 2. Open Questions / Assumptions

The brief is mostly self-contained. Where it left gaps, these are the working assumptions (flag if any are wrong before build):

1. **Images** — Hero portrait of "Dr. Evelyn Thorne" and any editorial/before-after imagery will be **AI-generated** with the GenerateImage tool and saved under `public/`. No real assets were provided.
2. **Before/After** — Rendered as **static side-by-side cards** (per brief), not an interactive slider.
3. **Form submission** — Client-side only. Success state + `console.log` is the full requirement; no network call or storage.
4. **Pricing** — Realistic placeholder ranges in the `treatments` data (e.g., `"$650 – $1,200"`).
5. **Footer details** — Placeholder clinic hours and a Union Square, SF address; medical disclaimer is generic copy.

---

## 3. Tech & Dependencies

- **Framework:** Next.js 16 App Router (already set up). `app/page.tsx` is currently the v0 default and will be replaced.
- **Styling:** Tailwind CSS v4 with tokens in `app/globals.css`.
- **Icons:** `lucide-react` (already installed).
- **shadcn components to add via CLI** (only `button` exists today):
  - `dialog`, `accordion`, `card`, `select`, `input`, `label`
- **Fonts:** Add an elegant serif (Playfair Display **or** Cormorant Garamond) via `next/font/google` in `layout.tsx`, exposed as `--font-heading`. Body stays on Geist sans (already wired). Keep total to **2 families**.

---

## 4. UI Structure & Component Responsibilities

Section components live in `components/landing/` and are composed by `app/page.tsx`. (The brief mentioned a single file; for maintainability and accessibility we split into section components but keep the data and the client form logic clearly scoped. This can collapse to one file if strictly required.)

| Order | Component | Responsibility |
|------|-----------|----------------|
| 1 | `SiteNav` | Sticky top nav. Transparent at top; gains `backdrop-blur-md` + thin bottom border once scrolled. Links: Treatments, Philosophy, Transformations, FAQ (anchor scroll). Houses a CTA button on the right. Mobile: condensed menu. |
| 2 | `Hero` | Asymmetric 2-column grid. Left: serif headline "Refined precision. Invisible artistry.", supporting paragraph, primary CTA. Right: tall editorial image of Dr. Thorne. |
| 3 | `TreatmentGrid` | Maps over `treatments` data → `TreatmentCard`s. Section heading + intro. |
| 3a | `TreatmentCard` | Renders name, short description, price range. Subtle hover scale-up + border shift. |
| 4 | `Philosophy` | Split layout: "The Architecture of Natural Elegance" + Dr. Thorne's clinical background. Optional editorial image. |
| 5 | `Transformations` | Heading + grid of `TransformationCard`s (static Before/After pair + testimonial beneath each). |
| 6 | `Faq` | shadcn `Accordion` over `faqs` data. Addresses "Natural Results" and "Recovery Time" objections. |
| 7 | `SiteFooter` | Minimalist: brand, nav repeat, clinic hours, Union Square SF address, medical disclaimer microcopy. |
| — | `ConsultationDialog` | Client component. Owns dialog open state, form state, validation, submit, success state. Triggered by every primary CTA. |

---

## 5. Data / Props Flow & State

- **Static data modules** (`components/landing/data.ts` or co-located consts):
  - `treatments: { name: string; description: string; priceRange: string }[]`
  - `transformations: { beforeSrc; afterSrc; alt; quote; patient }[]`
  - `faqs: { question: string; answer: string }[]`
  - `navLinks: { label: string; href: string }[]`
- **Server vs client:**
  - `app/page.tsx`, `Hero`, `TreatmentGrid`, `Philosophy`, `Transformations`, `SiteFooter` → **Server Components** (static, no interactivity).
  - `SiteNav` (scroll listener) and `ConsultationDialog` (form state) and `Faq` (Accordion uses client behavior) → **Client Components** (`"use client"`).
- **CTA wiring:** The simplest reliable pattern — `ConsultationDialog` renders its own trigger `Button`. Reuse the dialog/trigger component anywhere a CTA is needed (Nav + Hero) so there's no cross-component open-state plumbing.
- **Form state (inside `ConsultationDialog`):**
  - Inputs: `name`, `email`, `phone`, `concern` (controlled).
  - Outputs: on submit → validate → `console.log(data)` → set `submitted = true`.
  - Reset `submitted` and clear fields when the dialog is reopened/closed.

---

## 6. Required States & Edge Cases

**Form (`ConsultationDialog`):**
- **Default:** empty fields, submit enabled but blocked by validation.
- **Validation/error:** required fields (name, email, phone, concern) flagged inline; email format checked; focus moves to first invalid field.
- **Success:** form replaced by a "Thank You" confirmation message; close button available.
- **Edge cases:** double-submit prevented; closing mid-entry discards state; reopening starts clean.

**Nav:**
- At scroll position 0 → transparent/no blur. After threshold → blurred + bordered. Handle resize and ensure no layout shift.

**Imagery:**
- Every image has meaningful `alt` text (or `alt=""` if purely decorative). Define explicit width/height or aspect ratio to avoid CLS.

**Content:**
- Empty/short data arrays should still render section headings gracefully (no broken grids), though arrays will be populated.

---

## 7. File Organization

```
app/
  layout.tsx          # add serif heading font; update metadata (title/description/og)
  globals.css         # add Alabaster/Charcoal/Slate tokens + --font-heading mapping
  page.tsx            # composes the section components in order
components/
  landing/
    data.ts                 # treatments, transformations, faqs, navLinks
    site-nav.tsx            # "use client" — sticky + blur-on-scroll
    hero.tsx
    treatment-grid.tsx
    treatment-card.tsx
    philosophy.tsx
    transformations.tsx
    transformation-card.tsx
    faq.tsx                 # "use client" via shadcn Accordion
    consultation-dialog.tsx # "use client" — CTA modal + form + success
    site-footer.tsx
  ui/                       # shadcn primitives (button exists; add dialog, accordion, card, select, input, label)
public/
  (AI-generated images: dr-thorne portrait, philosophy editorial, before/after sets)
```

---

## 8. Styling / Layout Rules

- **Tokens:** Define in `globals.css` — `--background` (Alabaster `#FBFBFA`), `--foreground` (Charcoal `#1A1A1A`), a Slate `--muted`/`--accent`, plus border token for thin micro-borders. Set `<html className="bg-background">` in `layout.tsx`. No raw `bg-white`/`text-black` — use tokens only.
- **Typography:** Headings use `font-heading` (serif), body uses `font-sans` (Geist). Body line-height `leading-relaxed`. Wrap headlines in `text-balance`, long paragraphs in `text-pretty`.
- **Layout:** Flexbox-first; CSS Grid only for the asymmetric hero and the card/transformation grids. Generous whitespace, thin `border-border` hairlines. Use the Tailwind spacing scale (no arbitrary px values). Use `gap-*` for spacing, never `space-*` or mixed margin+gap.
- **Motion:** Only subtle `hover:scale-[1.02]` on cards + `transition` smoothing. No new visual concepts beyond what the brief specifies.
- **Accessibility:**
  - All interactive elements keyboard-reachable in logical order; visible focus rings (`outline-ring`).
  - Dialog traps focus, closes on Esc, restores focus to trigger (shadcn Dialog handles this — verify).
  - Form fields paired with `<label>`; errors announced (`aria-invalid`, `aria-describedby`).
  - Semantic landmarks: `header`, `main`, `section` with headings, `footer`. Anchor links target section `id`s.
  - Contrast meets WCAG AA against Alabaster/Charcoal.

---

## 9. Build Order

1. Add shadcn components (`dialog`, `accordion`, `card`, `select`, `input`, `label`) via CLI.
2. Wire serif heading font in `layout.tsx`; add color/font tokens to `globals.css`; set `<html>` background; update metadata.
3. Generate required images into `public/`.
4. Create `data.ts` with real copy for treatments, transformations, faqs, navLinks.
5. Build section components top-to-bottom (Nav → Hero → … → Footer).
6. Build `ConsultationDialog` (form + validation + success) and wire it into Nav + Hero CTAs.
7. Compose everything in `app/page.tsx`.

---

## 10. Testing / Verification (plain language)

1. **Visual pass (desktop):** Load the page; confirm all 7 sections appear in order with the luxury/minimalist look, serif headings, and the restricted palette.
2. **Scroll behavior:** Scroll down — nav should gain blur + a hairline border; scroll to top — it returns to transparent.
3. **Anchor nav:** Click each nav link (Treatments, Philosophy, Transformations, FAQ) and confirm it scrolls to the right section.
4. **CTA → Dialog:** Click "Request an Elite Facial Analysis" in both the nav and hero — the modal opens each time.
5. **Form happy path:** Fill all fields, pick a Primary Concern, submit — verify the "Thank You" state shows and the data appears in the console log.
6. **Form validation:** Submit empty / with a bad email — verify inline errors and that submission is blocked.
7. **Dialog reset:** Close and reopen the dialog — fields and success state are cleared.
8. **FAQ:** Expand/collapse each accordion item; confirm only intended panels open.
9. **Keyboard-only run:** Tab through the entire page including the dialog; confirm focus is visible, the dialog traps focus, Esc closes it, and focus returns to the trigger.
10. **Responsive:** Check at ~360px, ~768px, and desktop — grids reflow (hero stacks, cards go single/2-column), no horizontal scroll, no overlapping text.
11. **Console/build hygiene:** No runtime errors or hydration warnings; only the intended form-submit log appears.

---

*End of plan. Awaiting approval before writing any code.*
