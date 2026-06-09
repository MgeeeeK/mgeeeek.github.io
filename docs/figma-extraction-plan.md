# Figma → Code Extraction Plan (12 calls)

Faithful translation of the Portfolio Figma into the Next.js site. This is the
**extraction** plan only — design-language polish and responsive adaptation are
deliberately **deferred to later passes** (the Figma is crude/fixed-1280, so we
translate first, then make it reactive).

**File:** `A1kOawM20UBQ8jgktbglAq` (Portfolio--Copy-, in Pro team) · **Page:** Desktop (`0:1`, 1280px canvas)

> Original `Z1jioIoptHO67oFuNcgyzF` was on a Starter team and hit the 6/month cap.
> Working copy `A1kOawM20UBQ8jgktbglAq` lives in the Pro team → 200/day. Unblocked.

---

## Verified structure (from live metadata)

All nodes confirmed in the copy with identical IDs. Notable findings:

- **No Figma variables exist** — `get_variable_defs` returns `{}`. Tokens are
  reverse-engineered from raw fills/type values per section → `globals.css`.
- **`877:813` = "emails - open emailer"** — the *open/expanded interactive state*
  of the Emails section (`23:106`), NOT a Fun Stuff folder. Implement as
  JS-toggled visibility, not a route.
- **Duplicate "Home" frames** (`1100:171` "Home xyz", `1061:324/646/813`) are
  design iterations/scratch — ignore. Canonical Home is `1:4`.
- **Work (`3:447`) and Contact (`674:104`) are nested inside Home (`1:4`)** — can
  be pulled individually for clean component mapping.
- Section heights: Corp Comms 6473 · Print 5691 · Social Media 5486 · Ad Films
  2723 · Emails 2642 · Fintech 1964 · Fun Stuff 1309 (tall long-scroll pages).

---

## Why `get_design_context`, not screenshots

Each `get_design_context` call returns the **structured subtree** — real
auto-layout, exact spacing, colors, font sizes, and asset references — i.e.
near-ready code, not pixels to eyeball. One call per section ≈ one component
translated faithfully.

---

## The 12 calls

| # | Tool | Node | Section | Repo target | Status |
|---|------|------|---------|-------------|--------|
| 1 | `get_variable_defs` | `1:4` | Tokens — **returned `{}`, no vars** | reverse-engineer per section | ✅ done |
| 2-4 | `get_design_context` | `1:4` | Home (Hero + Work + Contact nested) | `components/{Hero,WorkSection,ContactSection}/` | ✅ done — **built & faithful**, no rebuild |
| 5 | `get_design_context` | `23:101` | Social Media Brand | `app/work/social-media-brand-identity/` | ✅ done — **already built & faithful** |
| 6 | `get_design_context` | `23:102` | Corp Comms / Internal Comms | `app/work/internal-comms/` *(new)* | ⬜ stub |
| 7 | `get_design_context` | `23:103` | Fintech | `app/work/fintech/` *(new)* | ⬜ stub |
| 8 | `get_design_context` | `23:104` | Ad Films / Fully Filmy | `app/work/fully-filmy/` *(new)* | ⬜ stub |
| 9 | `get_design_context` | `23:105` | Print Media | `app/work/print-media/` *(new)* | ⬜ stub |
| 10 | `get_design_context` | `23:106` | Email Strategy | `app/work/email-strategy/` *(new)* | ⬜ stub |
| 11 | `get_design_context` | `23:107` | Fun Stuff | `app/work/fun-stuff/` *(new — extra section)* | ⬜ stub |
| 12 | `get_design_context` | `877:813` | Emails **open-emailer** interactive state | `email-strategy/` (JS-toggled state) | ⬜ |

**Reference pattern for new case studies:** `app/work/social-media-brand-identity/page.tsx` +
`page.module.css` — desktop absolute-positioned canvas matching the 1280px Figma, plus a
separate responsive mobile layout, assets in `public/images/<slug>/`. Replicate this structure.

**Optional 13th:** `get_design_context` `863:555` — Home nav-dropdown open state (JS-toggled).

**Budget:** 12 calls. Trivially within 200/day; leaves headroom for `get_screenshot` spot-checks.

---

## Node ↔ slug map (vs current `lib/projects.ts`)

| Figma node | Card label (Figma) | Current slug | Status |
|---|---|---|---|
| `23:101` | Social Media Brand Identity | `social-media` | page built, reconcile vs Figma |
| `23:102` | Internal Comms ("+1 more") | `internal-comms` | href `#` → build |
| `23:103` | Fintech Schmintech | `fintech` | href `#` → build |
| `23:104` | Fully Filmy (Ad Films) | `fully-filmy` | href `#` → build |
| `23:105` | Print Media | `print-media` | href `#` → build |
| `23:106` | Email Strategy | `email-strategy` | href `#` → build |
| `23:107` | Fun Stuff | *(none yet)* | add to nav/projects |
| `877:813` | **unidentified** | — | identify first |
| `863:555` | Home – Dropdown variant (nav state) | — | optional 13th call (JS-toggled state) |

---

## Sequencing

1. **Call 1** — pull tokens first so every section maps to real variables, not magic numbers.
2. **Calls 2–4** — homepage (Hero, Work, Contact) → reconcile with existing components.
3. **Calls 5–11** — case-study pages, one per route. `23:101` already has a page; treat its pull as a fidelity check, not a rebuild.
4. **Call 12** — identify `877:813` (the "hidden folder" Fun Stuff links to) and wire it as JS-toggled visibility per CLAUDE.md (hidden layers = interactive states, not routes).

## Explicitly deferred to later passes (your note)
- **Design language** — applying the `docs/delight-design-language.md` layer on top of the faithful base.
- **Responsiveness** — making it reactive across breakpoints (Figma is fixed 1280px; we add fluid layout after the 1:1 translation lands).
