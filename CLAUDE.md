# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Goal

Convert Abhi's Figma portfolio design into two deliverables:
1. **A production website** — faithful pixel-close translation of the Figma, deployed and functional.
2. **A Framer project** — a hand-off-ready Framer version the client (Abhi) can self-manage as a non-developer. The Framer output must be simple enough for an amateur to edit copy, swap images, and add projects without touching code.

The design was created by an amateur in Figma. Priority is **visual fidelity**, not refactoring the design's imperfections.

---

## Figma Source

**File:** `Z1jioIoptHO67oFuNcgyzF` — [Portfolio](https://www.figma.com/design/Z1jioIoptHO67oFuNcgyzF/Portfolio)
**Page:** Desktop (`0:1`) — 1280px canvas width

### Section Map (node IDs for design context fetching)

| Section | Node ID | Dimensions | Notes |
|---|---|---|---|
| Home / Hero | `1:4` | 1280×3000 | Contains Work and Contact nested |
| Work cards | `3:447` | 1280×720 | 6 project cards |
| Contact & About | `674:104` | 1280×1602 | Bio + contact form |
| Social Media Brand (case study) | `23:101` | 1280×5486 | Nissin Cup Noodles |
| Corporate Comms (case study) | `23:102` | 1280×6473 | AI Microsite, Intuit, CSR |
| Fintech (case study) | `23:103` | 1280×1964 | Bharat Connect, Razorpay |
| Ad Films (case study) | `23:104` | 1280×2723 | Schneider, KreditBee |
| Print (case study) | `23:105` | 1280×5691 | Diary, Green Yodha, Ads |
| Emails (case study) | `23:106` | 1280×2642 | MyCheckins email strategy |
| Fun Stuff | `23:107` | 1280×1309 | Personal/creative work |
| Home - Dropdown variant | `863:555` | 1280×3001 | Mobile/nav dropdown state |

### Design Details
- **Canvas:** 1280px wide desktop-first
- **Navigation labels:** Work · Contact & About · Browse Projects · Get in Touch
- **Section headings:** "Welcome to Abhi's Portfolio", "Work, Work, Work", "Got a brief or role to discuss?", "About Me"
- **Contact email:** abhiv1999@gmail.com
- **Decorative motif:** Star shapes scattered throughout
- **Cards:** 6 project category cards on Work section (Social Media, Fintech, Fully Filmy, Print Media, Email Strategy + 1 more)
- **Form fields:** Name, Company → Send button
- **Buttons:** Browse Projects, Get in Touch, Download Resume, Send

---

## Architecture

### Website (to be scaffolded)
- **Framework:** Next.js (App Router) — SSG output for simple hosting
- **Styling:** Tailwind CSS — utility-first, matches Figma spacing directly
- **Routing:** Each case study page is a separate route (`/work/social-media`, `/work/fintech`, etc.)
- **Structure:**
  ```
  app/
    page.tsx          ← Hero + Work cards + Contact/About (single scroll)
    work/
      [slug]/page.tsx ← Individual case study pages
  components/
    Hero.tsx
    WorkGrid.tsx
    CaseStudyLayout.tsx
    ContactForm.tsx
    Navigation.tsx
  ```

### Framer Deliverable
- Built in Framer's web editor, not code-exported
- Use Framer's CMS for project cards so Abhi can add/edit entries without code
- Each section as a Framer component with editable text props
- Navigation uses Framer's built-in page linking

---

## Dev Commands (once scaffolded)

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # tsc --noEmit
```

---

## Key Constraints

- **Framer first mindset for copy:** All text content must come from Figma as-is — do not rewrite or improve Abhi's copy.
- **1280px breakpoint is canonical** — mobile is secondary; match desktop Figma exactly at 1280px viewport.
- **No CMS for the website** — static content only; Framer handles the editable version.
- **Case study pages are long-scroll** — some reach 5000–6000px in Figma; preserve section rhythm when translating.
- **Hidden layers in Figma** are interactive states (dropdowns, modals) — implement as JS-toggled visibility, not separate pages.
