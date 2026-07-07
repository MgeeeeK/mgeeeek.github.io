# Directive: Own This Portfolio End-to-End Through Delivery

You are the agentic developer taking full ownership of this project — a portfolio site for Abhi
(a marketer/creative strategist), built in Next.js with a parallel Framer migration that a previous
contractor started and abandoned mid-build. Nobody is handing this back to design or product. You
scope it, fix it, verify it, and report status until it ships.

**Order of operations is fixed: Phase 1 (Next.js) must be substantially complete before Phase 2
(Framer) starts.** Framer is a mirror of this site — fixing Framer before the source is fixed just
means fixing everything twice.

Read `CLAUDE.md` in the repo root before touching anything. It defines the project's non-negotiable
rules (visual fidelity over refactoring, 1280px canonical breakpoint, no copy rewrites, Figma as
source of truth). This directive does not override CLAUDE.md — it tells you what to do inside the
rules CLAUDE.md already sets.

---

## Setup — do this before anything else

- **Model:** Run this entire directive on **Sonnet 5** (`claude-sonnet-5`). Nothing in this project
  requires deep reasoning or extended thinking — it's mechanical bug-fixing, content wiring, and
  real-browser verification against a fully specified checklist. Don't burn a higher-effort model
  or extended-thinking budget on it; if your harness lets you set effort level, low/default is fine.
- **Tooling: use the Playwright MCP tool set specifically — not the generic "browser" MCP tool set.**
  This project was audited entirely with the Playwright MCP (tools namespaced like
  `mcp__plugin_playwright_playwright__*` — `browser_navigate`, `browser_snapshot`,
  `browser_take_screenshot`, `browser_click`, `browser_type`, `browser_run_code_unsafe`, etc.), not
  the separate `mcp__browser__*` tool family. Do not substitute one for the other and do not treat
  them as interchangeable — use Playwright MCP for every verification step in this document.
- **Before doing anything else, confirm the Playwright MCP connection is actually working**: open a
  tab, navigate to `http://localhost:3000`, and take a screenshot. If the connection is broken,
  missing, or misconfigured, fix that first — do not fall back to the browser MCP tool set, do not
  proceed on code-reading assumptions instead, and do not skip verification for any task below
  because the tool wasn't available. Every acceptance criterion in this document assumes you can
  actually drive a real browser; treat a broken Playwright MCP connection as a blocking setup issue,
  not a reason to lower your verification bar.

---

## Operating principles — read before you start

1. **Do not trust prior status reports at face value, including this one.** A previous audit pass
   (Playwright-driven, documented in two review artifacts referenced below) found real bugs. A
   separate build log for the Framer branch (`docs/framer-migration.md`) claims near-pixel-perfect
   parity across every route with specific screenshot-diff scores — and that log completely missed
   a non-functional contact form and a visibly broken headline, because it was measuring screenshot
   geometry, not function. Re-verify everything yourself, in a real browser, by actually clicking,
   typing, and submitting — not by reading a diff score.
2. **Never rewrite Abhi's copy.** Fix broken interactions, missing assets, and layout bugs. Do not
   "improve" wording, tone, or content unless a fix is explicitly listed below as a content fix
   (e.g. removing literal placeholder text).
3. **1280px is the canonical desktop breakpoint** (per CLAUDE.md). Mobile is secondary but must not
   be broken. The tablet range (768–1279px) is currently broken across most case studies — this is
   real scope, not edge-case polish.
4. **Verify with the Playwright MCP tool set (not the browser MCP tool set, not by reading the code
   and assuming it works).** Every item below was found by actually loading the page in a real
   browser via Playwright MCP and interacting with it. Confirm your fix the same way before marking
   anything done.
5. **If something is blocked on an asset or decision only Abhi can provide (the real resume PDF,
   the contact form's final destination, whether Fun Stuff is in the public nav), stop and flag it
   explicitly rather than guessing or leaving a placeholder that ships to production.**
6. **Full findings live in two existing review artifacts from this project's audit history** — a
   client-voice walkthrough and a technical handoff brief. This document is the actionable version
   of both; use it as your task list, but pull full context from those if you need more detail on
   any item's reasoning.

---

## Phase 1 — Fix the Next.js site (`localhost:3000`)

Do not start Phase 2 until every item in **1.1 Critical** is fixed and verified, and you have a
credible plan (even if not yet executed) for 1.2 and 1.3.

### 1.1 Critical — fix these first, in any order

- [ ] **Resume download is a dead link.** `public/resume.pdf` does not exist. The button links to
  `/resume.pdf` and the site has no custom 404 page, so it currently 404s to a blank, unbranded
  page. **You cannot generate a real resume — this needs the actual PDF from Abhi.** Until you have
  it: add `app/not-found.tsx` as a proper branded fallback regardless (this is needed either way),
  and flag the missing PDF as a blocking dependency in your status report.
- [ ] **Contact form has zero validation and zero feedback.** `components/ContactSection/ContactSection.tsx`
  — clicking Send with every field blank still fires a `mailto:` with a blank body. Add required-field
  validation and a visible success/error state. Confirm with Abhi (or flag as a question) whether the
  destination should remain a `mailto:` handoff or move to a real backend/service — a `mailto:`-only
  form silently fails for any visitor without a configured default mail client, which is common.
- [ ] **Print Media's entire "Interactive Corporate Diary" section was never built.**
  `app/work/print-media/page.tsx` lines 63–92: the copy describes six "Changemaker" diary spreads
  with pull-tab/flap-lift interactions in detail, but there is no image or interactive markup for any
  of them — the page jumps straight from that paragraph to the unrelated Schneider Electric section.
  This needs actual design assets (six diary spread images/interactions) that do not currently exist
  anywhere in the repo. Flag this to Abhi — you cannot invent this content yourself. If assets can't
  be sourced in time, the fallback is removing the "six Changemakers" copy claim so the page doesn't
  promise work that isn't shown.
- [ ] **Literal placeholder text "One line here" is live in production copy.**
  `app/work/fully-filmy/page.tsx` lines 326, 390, 484, 492, 563, 570, 582, 586 — replace with real
  captions (ask Abhi what these should say, or omit the caption if none exists) or remove the caption
  slot entirely.
- [ ] **"Click to Read E-mails" on Email Strategy is non-functional.**
  `app/work/email-strategy/page.tsx` — of five listed subject lines (`.subj1`–`.subj5`), four have no
  click handler at all and the fifth does nothing when clicked despite having `cursor: pointer`. Either
  wire up a real expand/reveal interaction for all five, or remove the "Click to Read E-mails" banner
  if the reading experience isn't going to be built.
- [ ] **None of the three "short stories" on Fun Stuff can be read.**
  `app/work/fun-stuff/page.tsx` — the three book-cover cards ("Missing Milk & Buzzing TVs," "The Other
  Girl," "By The Train Tracks") are plain non-interactive text with no href or click handler anywhere
  in that section. Either link them to real story content (ask Abhi if these stories exist anywhere)
  or remove the implied interactivity (the tilted book-cover styling currently promises a click that
  goes nowhere).
- [ ] **Case-study text becomes unreadable on every iPad size between 768–1279px.** The `.canvas`
  container shrinks fluidly at these widths (`width: min(100%, 1280px)`), but content inside is
  positioned with hardcoded Figma pixel coordinates built for exactly 1280px, so it runs off the
  visible edge instead of reflowing. Confirmed on Social Media Brand Identity, Internal Comms,
  Fully Filmy, and Email Strategy (where the "Tone of Voice" section disappears entirely at 820px).
  Confirmed at 820×1180, 1024×1366, 1133×744, 1180×820; resolves cleanly at ≥1280px. This needs a
  real fix to the responsive strategy for these pages — not a one-off patch per page, since it's the
  same root cause (absolute Figma coordinates + no tablet breakpoint) across every affected route.
- [ ] **At iPad mini width (744px) specifically, two more bugs appear** that don't exist at any other
  width: Fintech's "Official Apology" card has every line of body text clipped on the left by 1–2
  characters (garbled copy), and Fun Stuff's three short-story titles become fully invisible. These
  are separate from the 768–1279px issue above — 744px triggers the site's mobile layout
  (`max-width: 767px`), so these are mobile-layout bugs, not tablet-canvas bugs.

### 1.2 Major — fix after critical, before Phase 2

- [ ] **Homepage doesn't center itself the way every case-study page does.**
  `components/WorkSection/WorkSection.module.css` and `components/ContactSection/ContactSection.module.css`
  are missing the `margin: 0 auto` that every `app/work/*/page.module.css` `.canvas` rule has. On
  anything wider than a 14" laptop this leaves large, asymmetric dead space (worst at 4K, where
  content pools in the left third of the screen). Add the same centering pattern used everywhere else.
- [ ] **"Next Project" always links back to the homepage grid, never to the actual next project.**
  All 12 instances across `app/work/*/page.tsx` (`Link href="/#work"` labeled "Next Project"). Wire
  up real sequential navigation between case studies (pick and document a fixed order).
- [ ] **The "Fun Stuff" page is unreachable on any phone.** It's absent from the nav dropdown at every
  width, and `components/WorkSection/WorkSection.module.css` lines 176–178 explicitly set
  `.dontLookWrapper { display: none }` below 768px. Either add it to the mobile nav/grid, or confirm
  with Abhi that it's meant to be desktop-only (in which case this is a documented decision, not a bug
  — but it should be a decision, not an accident).
- [ ] **The pink category "breadcrumb" bar is inconsistent across case studies at wide viewports.**
  5 of 7 pages (Social Media, Internal Comms, Fintech, Fully Filmy, Email Strategy) render it
  full-bleed edge-to-edge; Print Media and Fun Stuff cap it to the 1280px canvas, leaving visible
  gutters that grow with viewport width. Pick one behavior and make all seven consistent.
- [ ] **"View Design Portfolio" on Fun Stuff links to Behance's bare homepage**, not a real profile.
  `app/work/fun-stuff/page.tsx` line 12, `DESIGN_PORTFOLIO_HREF`. Get the real URL from Abhi.
- [ ] **Internal Comms has two black "video" placeholders that are just static, non-clickable images**
  with no play affordance and nothing behind them (`app/work/internal-comms/page.tsx`, "Rectangle 20"
  hero and "Rectangle 21" CSR section). Compare to Social Media Brand Identity's working Instagram
  lightbox cards — either these need real video/embed content, or should be replaced with static
  images that don't imply a video that isn't there.
- [ ] **Two case studies also clip text at 1133–1180px** (Fully Filmy, Email Strategy) — same root
  cause as the critical tablet-clipping item above; fix once, verify it resolves both.

### 1.3 Moderate / minor — worth doing, not blocking

- [x] Custom cursor sat directly over folder-card text on hover (old `.fx-cursor-ring`, 1.6x scale),
  obscuring labels mid-word. Resolved 2026-07-07 by the quill-cursor redesign (`.fx-quill`): the
  quill extends up-right away from the hotspot, so nothing covers text under the pointer.
- [ ] Typos: "Nissin Cupnoodles" on Print Media (every other page spells it "Cup Noodles"),
  "Illustartion" in the Fun Stuff heading, "doesnn't" on Email Strategy, and a stray "- 3/8" left
  inside a live subject line on Email Strategy ("Do you know what your team is up to? - 3/8").
- [ ] Homepage preloads ~20 Fintech/Email-Strategy assets it never uses (27 browser console warnings
  on every homepage load) — check for an overly broad `priority`/preload prop.
- [ ] "Next Project"/"Get in Touch" footer buttons sit 10–20px left of the rest of the page's margin
  on 4 of 6 case studies (Internal Comms, Fully Filmy, Email Strategy, Fun Stuff). Fintech and Social
  Media Brand Identity get this right — match them.
- [ ] Homepage's Work-section folder grid doesn't redistribute with viewport width — same root cause
  as the homepage-centering item, isolated to that grid.
- [ ] Homepage headline wraps to 3 lines instead of 2 at 1366px width (iPad Pro landscape) — check
  for an unclamped `vw`-based font-size on the hero title.
- [ ] Social Media Brand Identity's masonry photo grid leaves uneven vertical gaps between columns
  at iPad mini portrait width (744px).
- [ ] `public/images/print-media/green-yodha-lake.jpg` ships as a 3.1MB source JPEG — confirm Next's
  image pipeline is actually compressing this in the production build, not just assuming it.
- [ ] Add `app/not-found.tsx` (branded 404) regardless of the resume-link fix — currently there is
  none anywhere on the site.

### 1.4 Verification checklist for Phase 1

Before calling Phase 1 done:

- [ ] Re-run a full click-through of every interactive element on all 8 routes (nav dropdown, every
  card hover, the contact form end-to-end including a real submission, every "Click to
  read"/lightbox-style element, every footer CTA) using the Playwright MCP tool set — don't just
  read the code, and don't substitute the browser MCP tool set.
- [ ] Re-check all 8 routes at, at minimum: 390×844 (phone), 744×1133 and 1024×1366 (iPad portrait),
  1133×744 and 1366×1024 (iPad landscape), 1280×900 (canonical desktop), 1920×1080, and 2560×1440.
  The tablet range is where most of the critical bugs live — do not skip it.
- [ ] Confirm zero console errors on every route at every size checked.
- [ ] Confirm the specific pixel/behavior claims above are actually resolved (e.g. Email Strategy's
  "Tone of Voice" section is visible at 820px, not just "looks better").

---

## Phase 2 — Framer: mirror replica, no compromises

**Do not start this phase until Phase 1's critical list is fixed and verified.** Framer is being
rebuilt as a faithful copy of the Next.js site. If you copy the Next.js site's current bugs into
Framer before fixing them, you'll fix every bug twice, on two different platforms, and they will
drift apart. Fix the source first.

"No compromises" means: once Phase 1 is done, the Framer branch must match it exactly — same
content, same working interactions, same responsive behavior, nothing silently dropped or faked.
The previous contractor's build did not meet this bar. Specifically, verified directly on the live
branch preview (`https://rational-independence-589976--matte-drift-mkbv014mg.framer.app`, branch
`matte-drift`):

### 2.1 Confirmed blockers on the current Framer branch

- [ ] **The contact form does not work at all.** Direct DOM inspection on the live branch found zero
  `<input>`/`<textarea>` elements and zero `<form>` elements anywhere on the page. The Name/Company/
  Email-id/Message boxes are static text styled to look like inputs — nothing typed into them is
  captured. "Send" is a hardcoded `<a href="mailto:abhiv1999@gmail.com">` with no subject or body.
  This must become a real, working form — Framer Forms is the native option — that actually captures
  and delivers what a visitor submits. This is not optional for "no compromises."
- [ ] **The homepage's main headline visibly renders "Abhi' Portfolio" — the "s" is missing on
  screen**, reproducible across multiple fresh loads with long settle waits, at both CSS and device
  pixel scale. The underlying text node is correct ("Abhi's"), but its computed font-family resolves
  to `"Playfair Display", "Playfair Display Placeholder", serif` — that literal "Placeholder" name
  is the tell that the real webfont isn't binding for this specific italic-bold text style. Find and
  fix the font-loading/binding issue for this text layer. This is the single most visible piece of
  text on the entire site — it cannot ship like this.
- [ ] **The in-page Instagram lightbox does not exist in Framer.** On the live Next.js site, clicking
  an Instagram post on Social Media Brand Identity opens a real in-page overlay with live post data
  (author, like count, thumbnail) without leaving the site — genuinely the most polished feature on
  the whole project. In Framer, every one of those links is a plain outbound `<a>` straight to
  instagram.com. For a true mirror, this needs to be rebuilt (a Framer code component reproducing the
  lightbox is the most direct path, since Framer doesn't have a native equivalent).
- [ ] **Every Next.js bug that existed at migration time was copied faithfully, not fixed** — confirmed
  identical on the Framer branch: the "One line here" placeholder text on Fully Filmy, the missing
  Print Media diary section (page height matches the Next.js site to the pixel, `5691px` on both),
  and Fun Stuff being unreachable on mobile. Once you've fixed these in Phase 1, re-sync the fixes
  into Framer — do not just re-verify the old broken state still matches.
- [ ] **None of the 7 case-study routes are built as native, editable Framer layers** — every one is
  a dropped-in React code component (confirmed in `docs/framer-migration.md`'s own build notes). Per
  `CLAUDE.md`, the entire point of the Framer deliverable is that it's "simple enough for an amateur
  to edit copy, swap images, and add projects without touching code." As currently built, Abhi cannot
  edit a single word of any case study without a developer opening the code component. This is a
  direct conflict between "no compromises visual/functional mirror" (which code components achieve
  well) and the project's actual documented purpose (self-editability, which code components defeat).
  **Do not silently pick one.** Rebuild what's feasible as native Framer layers/CMS-driven content
  (start with whichever case study is simplest structurally), and explicitly flag to Abhi/the project
  owner which pages, if any, must remain code components for fidelity reasons, and why — this is an
  actual scope decision, not something to resolve unilaterally.
- [ ] **The "Don't Look!" folder is more visible than Abhi explicitly asked for.** Project history
  confirms Abhi asked for this folder pushed far enough off-screen that only a small corner peeks
  (the Next.js site does this correctly). On the Framer branch, roughly half the folder is visible —
  match the Next.js site's positioning, not the original unmodified Figma spec.
- [ ] **Resume link:** Framer's placeholder route at `/resume.pdf` at least renders a real, readable
  "Resume PDF pending" message rather than a blank 404 — keep that pattern as the fallback, but replace
  it with the real PDF as soon as it's available from Abhi, on both platforms simultaneously.

### 2.2 What's already holding up (don't regress this)

- Visual fidelity at desktop width is genuinely close on the homepage, Social Media Brand Identity,
  Internal Comms, and Fintech — zero console errors were found on any route checked. The geometry-
  matching work already done is a reasonable foundation; the gaps above are functional, not visual.

### 2.3 Verification checklist for Phase 2

- [ ] Real click-through of every interactive element on the Framer branch preview via Playwright
  MCP, same as the Phase 1 checklist — including an actual form submission that you confirm arrives
  somewhere. Screenshot-diffing against the Next.js site is not sufficient on its own; it already
  missed the fake form and the broken headline once.
- [ ] Same multi-viewport sweep as Phase 1 (phone through 4K, both iPad orientations), run
  independently on the Framer branch — Framer's breakpoint system is different from CSS media
  queries and may not fail (or succeed) at the same widths as the Next.js site.
- [ ] Confirm every route that's supposed to be reachable actually is reachable via the Framer nav,
  at every breakpoint, including whatever was decided for Fun Stuff.
- [ ] Get explicit sign-off from Abhi (or whoever owns that decision) on the code-component vs.
  native-layer question before considering Framer done.

---

## Reference

- Repo stack: Next.js 16.2.6, React 19.2.4, static App Router, dev server at `localhost:3000`.
- Existing docs (read, but verify against reality — see operating principles):
  `docs/framer-migration.md`, `docs/client-handover-platform-plan.md`,
  `docs/framer-preimplementation-research.md`.
- Framer project: "Rational Independence", project ID `uj9T8YBB5n6l8waBIZIp`, branch `matte-drift`
  (`mkbv014mg`).
- Framer branch preview: `https://rational-independence-589976--matte-drift-mkbv014mg.framer.app`
- Framer branch editor: `https://framer.com/projects/Rational-Independence--uj9T8YBB5n6l8waBIZIp-2UmWW?branch=mkbv014mg`
- Production/custom domain: not connected — nothing has gone live from Framer yet.
- Client ownership: Framer project is still developer-owned; no Content Editor invite has happened.

## Blocking dependencies you cannot resolve yourself — flag these immediately, don't guess

- The real resume PDF (blocks both platforms' Download Resume button).
- The six Changemaker diary spread assets/content for Print Media, or a decision to remove that
  copy claim.
- Confirmation of the contact form's real destination (stay on personal `mailto:`, or move to a
  real backend/service/Framer Forms target).
- Whether `/work/fun-stuff` is meant to be publicly reachable on mobile, or is intentionally
  desktop-only.
- The Behance profile URL (or replacement) for Fun Stuff's "View Design Portfolio" link.
- The code-component vs. native-Framer-layer decision for case studies (Section 2.1, last item) —
  this has real cost/timeline implications and is not yours to decide alone.

## Reporting

Report status against the checklists above, not in prose summaries. When you mark something done,
state how you verified it (viewport sizes checked, interaction tested, screenshot taken). When
you're blocked, say so explicitly and name the specific blocking dependency from the list above
rather than working around it with a guess or a silent placeholder.
