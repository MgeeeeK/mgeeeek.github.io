# Homepage Design Spec
**Date:** 2026-05-26
**Figma source:** `Z1jioIoptHO67oFuNcgyzF` — nodes `1:4` (default) and `863:555` (nav dropdown open)

---

## Goal
Build Abhi's portfolio homepage as a pixel-faithful translation of the Figma (1280px desktop canvas), fully responsive down to mobile, using a hybrid layout approach: Flex/Grid for content structure, `position: absolute` only for purely decorative elements.

A Framer handoff version will follow — component boundaries and prop shapes are designed to map cleanly to Framer components.

---

## Tech Stack
- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS (design tokens) + CSS Modules (per-component scoping)
- **Fonts:** Self-hosted Helvetica from `public/fonts/` via `@font-face`; Playfair Display via `next/font/google`
- **No external UI libraries**

---

## Design Tokens (tailwind.config.ts)

| Token | Value | Usage |
|---|---|---|
| `lime-green` | `#bbff6c` | Hero bg, Work section bg |
| `light-green` | `#ddffb7` | Nav bg, footer strip |
| `pink-hot` | `#ff43b7` | Card dark block, nav text, borders |
| `pink-mid` | `#ff61cd` | Primary button bg |
| `pink-light` | `#ffc4e8` | Secondary button bg, card pale top |
| `pink-pale` | `#ff99d8` | Card body bg |
| `purple` | `#d586ff` | Contact section bg |
| `purple-pale` | `#edd1fc` | Form field bg |

---

## Font Setup (`app/globals.css`)
```css
@font-face { font-family: 'Helvetica'; src: url('/fonts/Helvetica.ttf'); font-weight: 400; }
@font-face { font-family: 'Helvetica'; src: url('/fonts/Helvetica-Bold.ttf'); font-weight: 700; }
@font-face { font-family: 'Helvetica'; src: url('/fonts/Helvetica-Oblique.ttf'); font-weight: 400; font-style: oblique; }
@font-face { font-family: 'Helvetica'; src: url('/fonts/Helvetica-BoldOblique.ttf'); font-weight: 700; font-style: oblique; }
```
CSS vars: `--font-helvetica`, `--font-playfair` applied on `:root` and `body`.

---

## File Structure
```
app/
  page.tsx                  ← composes all sections
  globals.css               ← @font-face, CSS vars, resets
  layout.tsx                ← font loading, metadata

components/
  Nav/
    Nav.tsx                 ← sticky nav + dropdown logic
    Nav.module.css
  Hero/
    Hero.tsx
    Hero.module.css
  WorkSection/
    WorkSection.tsx
    WorkSection.module.css
  ProjectCard/
    ProjectCard.tsx         ← reusable blob card, used in Work grid only
    ProjectCard.module.css
  ContactSection/
    ContactSection.tsx
    ContactSection.module.css

public/
  fonts/                    ← copied from helvetica-255/
  images/                   ← star, stamp, ornaments (downloaded from Figma asset URLs)
```

---

## Component Specs

### `Nav`
- **Styling:** `position: sticky; top: 0; z-index: 50; background: #ddffb7; height: 60px`
- **State:** `isOpen: boolean` (client component)
- **Default (closed):** "Work" and "Contact & About" right-aligned, Helvetica Bold 16px, `#ff43b7`
- **Open:** Links shift to left-aligned; dropdown panel slides down below nav
- **Dropdown panel:** `#ddffb7` bg, `#ffc4e8` border, rounded bottom corners, lists 6 project names as plain `<a>` tags (Helvetica Bold 15px, black), each links to `/work/[slug]` (placeholder `href="#"` until case study pages exist). These are NOT `ProjectCard` components — just styled text links.
- **Close triggers:** click outside, Escape key, second click on "Work"
- **"Contact & About":** `scrollIntoView({ behavior: 'smooth' })` to `#contact`
- **Mobile:** Same sticky bar; dropdown becomes full-width panel

### `Hero`
- **Background:** `#bbff6c`
- **Layout:** `position: relative`, content centered with max-width container
- **Headline block:**
  - "Welcome " — Helvetica Bold Oblique, 84px → scales to ~48px on mobile
  - "to" — Playfair Display Italic, 48px, inline
  - "Abhi's Portfolio" — Playfair Display Bold Italic, 96px, line-height 79% → scales to ~56px on mobile
- **Buttons (flex row, gap-4):**
  - "Browse Projects" — `#ff61cd` bg, 3px black border, `border-radius: 63px`, `scrollIntoView` to `#work`
  - "Get in Touch" — `#ffc4e8` bg, 3px black border, same radius, `scrollIntoView` to `#contact`
  - Mobile: buttons stack vertically, full-width
- **Decoratives (`position: absolute`, `hidden` on mobile via `lg:block`):**
  - Star burst — positioned left-center of headline area
  - Small ornament cluster — top-left of headline
  - Circular stamp badge — top-right, `rotate-12`

### `WorkSection`
- **id:** `"work"`
- **Background:** `#bbff6c`
- **Heading:** "Work, Work, Work" — Playfair Display Bold, 48px, black
- **Subtitle:** Helvetica Regular, 20px, `#ff43b7` — "Campaign & Brand Strategy, Copywriting, Design & Film Direction"
- **Grid:** 3-col at `lg`, 2-col at `md` and below, gap `40px` horizontal / `20px` vertical → 6 `ProjectCard` components
- **"Don't Look!" card:** Purple variant, `rotate-[-24.88deg]`, `position: absolute`, bottom-right of section — hidden on mobile

### `ProjectCard`
**Props:**
```ts
interface ProjectCardProps {
  label: string       // e.g. "Social Media Brand Identity"
  href: string        // "/work/social-media" or "#"
  variant?: 'pink' | 'purple'  // default pink
}
```
- **Structure:** Light blob top (`#ff99d8`), dark block bottom (`#ff43b7`) overlapping, white Helvetica Bold Oblique label centered
- **Purple variant:** Light `#dfa5ff`, dark `#ba43ff`
- **Hover:** subtle scale-up (`transform: scale(1.03)`) for interactivity signal

### `ContactSection`
- **id:** `"contact"`
- **Background:** `#d586ff`
- **"Got a brief or role to discuss?"** — Playfair Display Bold 48px
- **Email line:** Helvetica Regular 20px; email address bold underlined, links to `mailto:abhiv1999@gmail.com`
- **Form (static, `onSubmit` prevented):**
  - 3 single-line inputs: Name, Company, Email-id — `#edd1fc` bg, 3px black border, `border-radius: 57px`, placeholder text in `#737171`
  - 1 textarea: Message — `border-radius: 47px`
  - "Send" button — `#ff61cd`, does nothing
- **Decorative phone illustration:** `position: absolute`, right side, hidden on mobile (`lg:block`)
- **"About Me"** subsection:
  - Heading: Playfair Display Bold 48px
  - Bio text: Helvetica Regular 15px, left column
  - Photo frame: right column, `#ff43b7` border, slight skew, `position: relative`
  - 3×3 numbered grid: purely decorative, `#ff76ca` squares with numbers 1–9
- **Footer buttons:** "Browse Projects" (`#ff61cd`) + "Download Resume" (`#ffc4e8`) side by side
- **Footer strip:** `#ddffb7`, 40px tall, full width, bottom of section

---

## Responsive Strategy

| Breakpoint | Layout change |
|---|---|
| `base` (mobile) | Stack all content, hide all decoratives, cards go 2-col |
| `md` (768px) | Decoratives reappear at 60% size |
| `lg` (1280px) | Full Figma layout, decoratives full size |

---

## Interactions Summary
| Trigger | Action |
|---|---|
| Click "Work" in nav | Toggle dropdown open/close |
| Click project name in dropdown | Navigate to `/work/[slug]` (placeholder `#`) |
| Click "Contact & About" in nav | Smooth scroll to `#contact` |
| Click "Browse Projects" (hero) | Smooth scroll to `#work` |
| Click "Get in Touch" (hero) | Smooth scroll to `#contact` |
| Click "Send" (form) | No-op (static) |
| Click "Download Resume" | No-op (placeholder until PDF provided) |
| Click outside open dropdown | Close dropdown |
| Press Escape with dropdown open | Close dropdown |

---

## Framer Notes
- Each component folder maps 1:1 to a Framer component
- `ProjectCard` props (`label`, `href`, `variant`) map directly to Framer component properties
- No computed state crosses component boundaries — each component is self-contained
- Decorative elements are isolated in their own `<div>` wrappers so Framer can show/hide them independently
- CSS Module class names are descriptive and match what Framer layer names should be
