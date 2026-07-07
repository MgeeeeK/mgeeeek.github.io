# Framer Migration Guide

For the broader client-handover platform recommendation and phased migration plan, start with
`docs/client-handover-platform-plan.md`. This file remains the Framer-specific rebuild checklist.
For account, plan, MCP/agent, and pre-build requirements, see
`docs/framer-preimplementation-research.md`.

This guide is for recreating the portfolio page as editable Framer layers.

## Current Framer State

- Project: Rational Independence
- Project ID: `uj9T8YBB5n6l8waBIZIp`
- Active agent sessions used for migration: `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `16`, `18`, `19`
- Active Framer branch created by the agent: `matte-drift`
- Branch editor URL: `https://framer.com/projects/Rational-Independence--uj9T8YBB5n6l8waBIZIp-2UmWW?branch=mkbv014mg&node=augiA20Il`
- Latest branch preview URL: `https://rational-independence-589976--matte-drift-mkbv014mg.framer.app`
- Latest branch preview version verified in the stable all-route parity pass: `16715bc87`
- Latest full visual screenshot audit pass: `f7664fbc5`
- Latest focused Internal Comms phone parity fix: `f7664fbc5`
- Latest focused Social Media phone parity fix: `d99378d9c`
- Latest focused Home phone visual fidelity pass: `647b981d7`
- Latest focused Home desktop visual fidelity pass: `0022c0556`
- Latest focused Fintech phone visual fidelity pass: `8e44d8d19`
- Latest focused Fintech desktop visual fidelity pass: `8cddfb922`
- Latest homepage-specific parity/folder hover pass: `16715bc87`
- Latest site-wide cursor/reactivity pass: `16715bc87`

Implemented so far:

- Native editable Framer homepage first pass: nav, hero, work, contact, and about sections.
- Color tokens for the main portfolio palette.
- Work/project route shells for all local routes.
- Temporary `/resume.pdf` placeholder page because `public/resume.pdf` is missing in the local repo.
- Fidelity-critical Framer code components:
  - `AnimatedFolderCard.tsx` for the folder open/close hover animation. Session 4 aligned the Framer control state, restored the local card query-container behavior, and added 3D rendering hints for the flap/paper hinge motion.
  - `TapeMarquee.tsx` for the animated Work washi-tape strip.
  - `HeroArt.tsx` for the real hero SVG decoratives and `stamp-badge.png`, now with container-responsive mobile/tablet asset placement.
  - `WorkStar.tsx` for the real Work-section starburst SVG.
  - `RetroPhone.tsx` for the About phone body, real photo, keypad, and float/blink animation.
  - `SiteCursor.tsx` for the global custom cursor dot/ring/hot-state/click-burst behavior across routed pages.
- Framer Tablet and Phone breakpoint variants for the homepage.
- Phone breakpoint first pass for hero, Work folders, contact form, and about content.
- Tablet fidelity pass for hero, Work, contact, and about: local tablet screenshots were compared against Framer screenshots; tablet purple-section decorations, About full copy/spacing, Work grid spacing, and hero title wrapping were corrected.
- Reactive canvas pass: CTA/nav links are wired, primary pill buttons use the local hover/press lift model, and Framer code components typecheck cleanly for folder, tape, hero art, starburst, and phone animation behavior.
- Session 12 homepage Work/folder fidelity pass:
  - Patched `AnimatedFolderCard.tsx` so folder CSS is no longer exposed as anchor text, the front flap/back tab/paper transforms match the local hover matrices, and rotated folders carry the local purple variables reliably.
  - Corrected the medium Work breakpoint to match the local responsive section height, scroll offset, full-width tape/separators, card row spacing, star scale/opacity, and visible right-edge "Don’t Look!" card.
  - Published branch preview version `7bba11fb9`; production was not updated.
  - Browser MCP QA verified no horizontal overflow, clean folder link text, local-matching hover transforms, and final Work/folder screenshots.
- `/work/social-media-brand-identity` full case-study route first pass:
  - Replaced the placeholder shell with `SocialMediaCasePage.tsx`.
  - Uploaded the local social-media bitmap/SVG assets to Framer and wired permanent Framer asset URLs into the component.
  - Preserved the local desktop art-directed canvas, tablet/mobile stacked layout, hover lifts, pulsing play badges, animated tape, reveal motion, and reduced-motion fallback.
  - Added Desktop, Tablet, and Phone breakpoint variants. Phone uses a phone-only component instance so the Framer renderer captures a real `390 x 7989` layout instead of the inherited tablet-width canvas.
- `/work/internal-comms` full case-study route first pass:
  - Replaced the placeholder shell with `InternalCommsCasePage.tsx`.
  - Uploaded the local internal-comms bitmap/SVG assets to Framer and wired permanent Framer asset URLs into the component.
  - Preserved the local desktop art-directed canvas and built compact Tablet/Phone variants using the same case content.
  - Added reactive behavior: sticky nav/project strip, scroll-triggered reveal variants, hover depth on framed media/buttons, moving tape/marquee elements, ambient star/halo motion, and reduced-motion fallback.
  - Framer typecheck is clean, publish preview has no warnings/errors, and the branch preview was verified at `390 x 9556` after a real scroll reveal pass.
- `/work/fintech` full case-study route first pass:
  - Replaced the placeholder shell with `FintechCasePage.tsx`.
  - Uploaded the local fintech bitmap assets to Framer and wired permanent Framer asset URLs into the component.
  - Preserved the local desktop art-directed canvas, sticky nav/project strip, ambient star/halo motion, animated tape, scroll reveal, hover-lift cards, and magnetic footer buttons.
  - Added Desktop, Tablet, and Phone breakpoint variants from one primary component instance. Phone uses the compact layout matching the local `390 x 2337` page.
  - Session 11 tightened the desktop first fold by replacing the simplified card renderer with the local page's card/base/mask/overlay/label paint order, restored smart quotes/apostrophes, and kept mobile intact.
  - Framer typecheck is clean, publish preview has no warnings/errors, and live Playwright QA verified desktop/phone screenshots plus card hover reactivity.
- `/work/fun-stuff` full case-study route first pass:
  - Replaced the placeholder shell with `FunStuffCasePage.tsx`.
  - Uploaded the local Fun Stuff SVG assets to Framer and wired permanent Framer asset URLs into the component.
  - Preserved the local desktop art-directed canvas: sticky nav/project strip, book stack, title/subtitle, washi-tape marquee, ambient star/halo/sparkle motion, milk-puddle CTA, bottle/splash art, and footer buttons.
  - Added Desktop, Tablet, and Phone breakpoint variants. The code component also switches to compact layout from the real viewport at `max-width: 809px` so the branch preview cannot render a clipped desktop canvas on phone.
  - Framer typecheck is clean, publish preview has no warnings/errors, and Browser MCP/Playwright verified desktop and phone screenshots against the local static export.
- `/work/fully-filmy` full case-study route first pass:
  - Replaced the placeholder shell with `AdFilmsCasePage.tsx`, a route-level code component for the Fully Filmy / Ad Films page.
  - Uploaded the local Fully Filmy SVG assets to Framer and wired permanent Framer asset URLs into the component.
  - Preserved the local desktop art-directed canvas: sticky nav/project strip, title/subtitle, retro TV video frame, KreditBee copy column, Schneider pink panel, tilted film cards, lime tape seam, Epson cards, ambient star/halo/sparkle motion, hover tilt, pulsing play badges, and magnetic footer buttons.
  - Added Desktop, Tablet, and Phone breakpoint variants. The component renders SSR-stable desktop/mobile markup and lets Framer/CSS breakpoints choose the visible layout, avoiding the earlier recoverable hydration warnings.
  - Framer typecheck is clean, publish preview has no warnings/errors, and Playwright verified desktop first fold, desktop film/tape fold, phone top fold, zero horizontal overflow, and zero console warnings/errors on the live branch.
- `/work/print-media` full case-study route first pass:
  - Replaced the placeholder shell with `PrintMediaCasePage.tsx`.
  - Uploaded the local Green Yodha JPEG assets and Print Media star SVG to Framer and wired permanent Framer asset URLs into the component.
  - Preserved the local desktop art-directed canvas: sticky nav/project strip, sparse diary intro, Green Yodha band, option stars, newspaper ad mocks, washi-tape marquee, ambient star/halo/sparkle motion, hover-lift print images, and magnetic footer buttons.
  - Added Desktop, Tablet, and Phone breakpoint variants. The code component also switches to compact layout from the real viewport at `max-width: 809px`; compact mode resets inherited Framer wrapper height so phone does not keep the desktop `5691px` artboard scroll.
  - Framer typecheck is clean, publish preview has no warnings/errors, and Playwright verified desktop first fold, desktop print-campaign fold, and phone screenshots against the local static export.
- `/work/email-strategy` full case-study route first pass:
  - Replaced the placeholder shell with `EmailStrategyCasePage.tsx`.
  - Uploaded the local Email Strategy SVG assets to Framer and wired permanent Framer asset URLs into the component.
  - Preserved the local desktop art-directed canvas: sticky nav/project strip, problem/solution crop, flowchart diamonds/arrows/pills, drifting mic illustration, washi-tape email seam, result stats, graph/star detail, hover subject lines, and magnetic footer buttons.
  - Added Desktop, Tablet, and Phone breakpoint variants. The Phone breakpoint uses the compact stacked layout matching the local `390 x 2719` page and includes CSS width overrides so the inherited desktop wrapper cannot create phone overflow.
  - Framer typecheck is clean, publish preview has no warnings/errors, and Playwright verified desktop first fold, desktop result/stat fold, phone top fold, phone zero horizontal overflow, and reactive hover states on the live branch.
- Session 16 parity/reactivity pass:
  - Patched `SocialMediaCasePage.tsx`, `InternalCommsCasePage.tsx`, and `FintechCasePage.tsx` so the live branch no longer inherits Framer's oversized tablet wrappers at desktop `1200px`.
  - Rechecked social, internal-comms, and fintech against the local static export at `1200 x 900` and `390 x 844`.
  - Fixed the social route's missing `#SituationshipStatusKyaHai` Instagram hashtag link and tightened the right-side halo/starburst decorative bleed so social now matches local scroll width and link count.
  - Patched social/fintech/print-media/fun-stuff style tags and print/fun compact rendering so Playwright QA now reports zero Framer console warnings/errors across all checked routes.
  - Fixed internal-comms' outer Framer wrapper so desktop stays `6473px` before and after a full scroll sweep instead of expanding to the mobile `9556px` artboard.
  - Switched print-media and fun-stuff to SSR-stable dual desktop/mobile markup with CSS visibility, restoring hidden link/H1 parity and removing phone hydration warnings.
  - Patched `AnimatedFolderCard.tsx` so the folder opens/closes from pointer/focus interaction, tracks pointer tilt through CSS vars, keeps the forced-open Framer canvas preview state, and resets on leave/cancel/blur.
  - Updated root metadata so the live branch title is `Abhi's Portfolio`.
  - Published branch preview version `6d4bc495c`; production was not updated.
- Homepage parity pass after session 16:
  - Updated `HeroArt.tsx` at the `901-1279px` range so the laptop/desktop hero art scales with the local `1200px` layout.
  - Aligned the Work section purple "don't Look!" folder position on the `1200px` breakpoint.
  - Aligned Phone Work, Contact, and About section heights so the Framer phone page is `3161px`, matching local exactly.
  - Aligned Phone Contact content position and restored the compact `Send` button width.
  - Reverted the fixed-nav experiment because it made Phone section flow `60px` too short; branch preview version `0bc43dd3c` keeps the correct page geometry.
  - Playwright verified version `0bc43dd3c` against the local static export at desktop `1200 x 900` and phone `390 x 844`: desktop scroll height `3468` equals local, phone scroll height `3161` equals local, Work/Contact section tops and heights match exactly, Framer reports zero browser warnings/errors, and the folder starts closed, opens on hover, and closes on pointer leave.
  - Production was not updated.
- Homepage semantic/nav/contact parity follow-up:
  - Added DOM-facing homepage semantics in Framer: one H1 for `Abhi’s Portfolio`, H2 tags for Work, Contact, and About, and a real `mailto:abhiv1999@gmail.com` inline email link with underline/italic/bold styling.
  - Restored the Contact dashed halo across desktop/laptop/tablet/phone, including the previously missing phone halo.
  - Added a fixed nav overlay while leaving the original nav in flow, preserving the exact local page heights while keeping the green nav visible over scrolled Work/Contact screenshots.
  - Published branch preview version `760d554a9`; production was not updated.
  - Playwright verified `760d554a9` against the local static export at desktop `1200 x 900` and phone `390 x 844`: desktop scroll height `3468` equals local, phone scroll height `3161` equals local, Framer reports zero browser warnings/errors/page errors, semantic heading/link checks pass, and the folder starts closed, opens on hover, and closes on pointer leave. Browser MCP also confirmed the live branch at `1200 x 900` has scroll height `3468`, one H1, three H2s, and the expected mailto links.
- Route mobile rhythm polish after homepage parity:
  - Patched `AdFilmsCasePage.tsx` mobile typography rhythm so `/work/fully-filmy` phone height now matches local exactly at `390 x 844` (`2766px`).
  - Patched `FunStuffCasePage.tsx` smart apostrophes and mobile line heights so `/work/fun-stuff` phone height and H1 text now match local exactly (`1014px`).
  - Patched `PrintMediaCasePage.tsx` mobile subhead/caption rhythm so `/work/print-media` phone height now matches local exactly (`1981px`).
  - Published branch preview version `2ab9524cd`; production was not updated.
  - Playwright verified `2ab9524cd` against the local static export at desktop `1200 x 900` and phone `390 x 844`: all checked Framer routes report zero console errors, warnings, and page errors. Phone scroll heights now match local on homepage, social-media, fintech, fully-filmy, print-media, email-strategy, and fun-stuff; internal-comms remains `+3px`.
- Internal Comms phone parity follow-up:
  - Patched `InternalCommsCasePage.tsx` compact typography/image rhythm so mobile H3s, recipe items, album/event/mailer grids, buttons, and section bottoms match the local static export.
  - Overrode the compact root and generated Framer parent containers from `9556px` to the local `9553px` height.
  - Framer typecheck is clean, publish preview has no warnings/errors, and branch preview version `efdba2d5c` was published; production was not updated.
  - Playwright verified `efdba2d5c` against the local static export at desktop `1200 x 900` and phone `390 x 844`: all checked route heights now match local exactly, Internal Comms phone is `9553px` on both local and Framer, and Framer reports zero console errors, warnings, and page errors.
  - Homepage folder hover QA was re-run on `efdba2d5c`; Framer desktop and phone both start closed, open on hover with lift/rotation/tilt/paper transforms, and close/reset on pointer leave.
- Desktop bleed parity follow-up:
  - Patched `AdFilmsCasePage.tsx` so Fully Filmy no longer clips the local washi-tape desktop bleed; desktop scroll width now matches local exactly (`1225px`).
  - Patched `FunStuffCasePage.tsx` so the Fun Stuff tape seam rounds to the same desktop right edge as local; desktop scroll width now matches local exactly (`1225px`).
  - Published branch preview version `a95e70923`; production was not updated.
  - Playwright verified `a95e70923` against the local static export at desktop `1200 x 900` and phone `390 x 844`: all route heights match local exactly, all phone widths match local exactly, Fully Filmy/Fun Stuff desktop widths now match local, and Framer reports zero console errors, warnings, and page errors.
  - Homepage folder hover QA was re-run on `a95e70923`; Framer desktop and phone both start closed, open on hover with lift/rotation/tilt/paper transforms, and close/reset on pointer leave.
- Final cursor/reactivity parity follow-up:
  - Patched `HeroArt.tsx` with the local custom cursor behavior, then added reusable `SiteCursor.tsx` and inserted one invisible instance into each routed page primary root so the cursor works beyond the homepage.
  - `SiteCursor.tsx` guards against duplicate cursor DOM, so the homepage-specific `HeroArt.tsx` cursor hook and the global component do not render duplicate dot/ring elements.
  - Published branch preview version `16715bc87`; production was not updated.
  - Playwright verified `16715bc87` against the local static export at desktop `1200 x 900` and phone `390 x 844`: all route heights match local exactly, all phone widths match local exactly, and Framer reports zero console errors, warnings, and page errors.
  - A follow-up stable metric pass waited for reveal animations to settle before measuring widths. That resolved the earlier Email Strategy animated right-edge residual without a layout patch: desktop Email Strategy is `1428px` on both local and Framer, and every checked route now has `0px` width/height delta.
  - Homepage folder/cursor QA was re-run on `16715bc87`; Framer desktop and phone both start closed, open on hover with lift/rotation/tilt/flap/paper transforms and cursor hot-state, fire a click burst on press, and close/reset on pointer leave.
  - Non-home cursor QA was run on `/work/fintech` desktop and `/work/social-media-brand-identity` phone; both routes inject the Framer cursor DOM, hide the native cursor, switch to the hot state over links, and fire click bursts with no console/page errors.
- Phone homepage visual screenshot audit follow-up:
  - Rechecked the branch after user feedback that the Framer quality was not matching the local Next export closely enough on phone.
  - Patched the Phone Contact/About canvas sections so the Contact email line uses the local `15px / 18px` rhythm, the Contact and About sections keep the local total phone height (`3161px`), and the About buttons sit at the same scroll positions as local.
  - Patched the Phone About heading and bio text rich-text blocks directly so the rendered DOM now matches local mobile values: `About Me` line-height `45.92px`, bio top `2377px`, and bio line-height `19.2px`.
  - Published branch preview version `e8407a7cd`; production was not updated.
  - Playwright verified `e8407a7cd` against the local static export at desktop `1200 x 900` and phone `390 x 844`. Homepage desktop and phone dimensions match exactly; phone homepage visual diff improved from mean channel delta `21.67` to `15.89` after the phone Contact/About fixes.
  - Full-route visual audit artifacts are in `output/playwright/framer-audit-20260705/visual-e8407a7cd/`, including `atlas-desktop.png`, `atlas-phone.png`, `compare-phone-home.png`, and `visual-diff-summary.json`.
  - All checked Framer pages reported zero page errors and zero console errors. One late preload warning referencing `http://127.0.0.1:3000/_next/...` appeared during a Framer route slot after local-page navigation; it is from the local static export timing, not the Framer branch.
  - The only hard-dimension mismatch in this `e8407a7cd` full visual screenshot pass was `/work/internal-comms` phone: local reported `9558px` after the scroll-warm lazy-media capture, while Framer remained `9553px`. This was closed in the focused `f7664fbc5` follow-up below.
- Internal Comms lazy-media phone parity follow-up:
  - Patched `InternalCommsCasePage.tsx` on branch `matte-drift` so the compact/mobile image sizing uses the same intrinsic aspect ratios as the local Next image elements after lazy media settles.
  - Updated the compact root and generated Framer parent containers from `9553px` to the local scroll-warmed `9558px` height.
  - Framer typecheck is clean, publish preview has no warnings/errors, and branch preview version `f7664fbc5` was published; production was not updated.
  - Playwright verified `f7664fbc5` against the local static export at phone `390 x 844`: local and Framer both report `9558px` scroll height after scroll-warm, all 11 mobile image boxes match by rounded height, section/grid/text/button positions match, and the focused screenshots are both `390 x 9558`.
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/internal-comms-focused-f7664fbc5/`; the local-vs-Framer phone screenshot diff reports `0px` dimension delta and mean channel delta `1.53`.
- Full-route visual screenshot audit after Internal Comms lazy-media fix:
  - Re-ran the full local-vs-Framer screenshot audit on branch preview version `f7664fbc5`; production was not updated.
  - Playwright captured all implemented routes at desktop `1200 x 900` and phone `390 x 844` after scroll-warming lazy/reveal content. Every checked route now has exact hard dimensions: `0px` width delta and `0px` height delta in the Sharp comparison summary.
  - Framer reported zero page errors and zero console errors across the checked routes. One late preload warning was attributed to the local static export after prior local navigation, not the Framer branch.
  - Full audit artifacts are in `output/playwright/framer-audit-20260705/visual-f7664fbc5/`, including `atlas-desktop.png`, `atlas-phone.png`, every local/Framer screenshot pair, compare images, and `visual-diff-summary.json`.
  - Highest remaining visual deltas by mean channel delta are: phone Social Media `17.88`, phone Home `15.89`, phone Fintech `13.49`, desktop Home `12.83`, and desktop Fintech `10.61`. These are the next fidelity targets now that route-scale geometry is exact.
- Social Media phone visual fidelity pass:
  - Patched `SocialMediaCasePage.tsx` on branch `matte-drift` so mobile copy matches the local Next route, the mobile brand/merch media cards preserve their authored per-card classes, and the phone media-card CSS matches local (`position: static`, Helvetica/Arial text metrics, local weights).
  - Framer typecheck is clean, publish preview has no warnings/errors, and branch preview version `d99378d9c` was published; production was not updated.
  - Playwright verified `d99378d9c` against the local static export at phone `390 x 844`: local and Framer both report `390 x 7989`, every visible mobile media-card box matches by rounded x/y/width/height, and headings match.
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/social-phone-d99378d9c/`; the local-vs-Framer phone screenshot diff reports `0px` dimension delta and mean channel delta `0.50` (down from `17.88` in the full `f7664fbc5` audit).
- Home phone visual fidelity pass:
  - Aligned the six Phone Work folder card instances on branch `matte-drift` to the local mobile grid: `165 x 132` cards at local-matching rounded x/y positions.
  - Patched `HeroArt.tsx` so reduced-motion mode keeps the hero star, stamp, and ornaments visible while disabling animation, matching the local Next reduced-motion behavior used during stable screenshot QA.
  - Framer typecheck is clean, publish preview has no warnings/errors, and branch preview version `5584e2546` was published; production was not updated.
  - Playwright verified `5584e2546` against the local static export at phone `390 x 844`: local and Framer both report `390 x 3161`, all six Work card boxes match exactly by rounded x/y/width/height, and the hero stamp is visible again in the Framer screenshot.
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/home-phone-5584e2546/`; the local-vs-Framer phone screenshot diff reports `0px` dimension delta and mean channel delta `14.70` (down from `15.89` in the full `f7664fbc5` audit). The remaining largest bands are Contact/About typography/form detail and hero text/art anti-aliasing.
- Home phone Contact heading wrap follow-up:
  - Narrowed the Phone Contact heading and pink shadow heading on branch `matte-drift` so the line break matches the local mobile render: `Got a brief or` / `role to discuss?`.
  - Published branch preview version `fb108eaea`; production was not updated.
  - Playwright verified `fb108eaea` against the local static export at phone `390 x 844`: local and Framer both report `390 x 3161`, all six Work card boxes still match exactly by rounded x/y/width/height, and the Contact heading crop now matches the local wrap.
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/home-phone-fb108eaea/`; the local-vs-Framer phone screenshot diff reports `0px` dimension delta and mean channel delta `13.88` (down from `14.70` in `5584e2546`). The Contact-heading band `1600-1760` improved from mean `21.13` to `6.33`; the remaining largest bands are lower Contact/About typography/form detail and hero text/art anti-aliasing.
- Home phone About body typography follow-up:
  - Adjusted the Phone About body text on branch `matte-drift` from `15px` to `14px` while preserving the same text box width, line-height, section geometry, and button positions. This compensates for Framer native text using Inter where the local Next export uses Helvetica/Arial.
  - Published branch preview version `9091e990c`; production was not updated.
  - Playwright verified `9091e990c` against the local static export at phone `390 x 844`: local and Framer both report `390 x 3161`, all six Work card boxes still match exactly by rounded x/y/width/height, and About button positions remain aligned.
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/home-phone-9091e990c/`; the local-vs-Framer phone screenshot diff reports `0px` dimension delta and mean channel delta `12.51` (down from `13.88` in `fb108eaea`). About-heavy bands improved from `30.34 -> 23.34`, `31.38 -> 22.48`, and `23.32 -> 13.99`; the remaining largest bands are Contact form/detail and hero text/art anti-aliasing.
- Home phone Contact form y-alignment follow-up:
  - Moved the four Phone Contact form field frames and Send button on branch `matte-drift` up `3px` to match the local mobile form y positions. Widths, heights, fills, borders, radii, copy, links, section heights, and total page geometry were unchanged.
  - Published branch preview version `e78370bb5`; production was not updated.
  - Playwright verified `e78370bb5` against the local static export at phone `390 x 844`: local and Framer both report `390 x 3161`, all six Work card boxes still match exactly by rounded x/y/width/height, and Send now sits at the local y-position.
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/home-phone-e78370bb5/`; the local-vs-Framer phone screenshot diff reports `0px` dimension delta and mean channel delta `9.35` (down from `12.51` in `9091e990c`). The previous worst Contact form band `1760-1920` dropped out of the top-band list; the remaining largest bands are hero text/art, About body/font detail, and Work folder art/text anti-aliasing.
- Home phone Hero y-alignment follow-up:
  - Moved only the visible Phone Hero text nodes up `4px` and the two hero CTA buttons up `2px` on branch `matte-drift`. Hidden H1, HeroArt, hero frame, artwork, links, sizes, section heights, and total page geometry were unchanged.
  - Published branch preview version `647b981d7`; production was not updated.
  - Playwright verified `647b981d7` against the local static export at phone `390 x 844`: local and Framer both report `390 x 3161`, all six Work card boxes still match exactly by rounded x/y/width/height, Browse Projects now matches the local y-position, and Get in Touch is within `1px` of local.
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/home-phone-647b981d7/`; the local-vs-Framer phone screenshot diff reports `0px` dimension delta and mean channel delta `8.24` (down from `9.35` in `e78370bb5`). Hero bands improved, including `160-320` from `25.33` to `20.67`, `320-480` from `22.75` to `15.34`, and `480-640` from `15.92` to `6.12`.
- Fintech phone visual fidelity follow-up:
  - Patched `FintechCasePage.tsx` on branch `matte-drift` to neutralize the Framer-only global noise layer and mobile-card dark scrim. The local Next route does not render these overlays; layout, links, assets, typography rules, card sizes, and button positions were unchanged.
  - Framer typecheck is clean, publish preview has no warnings/errors, and branch preview version `8e44d8d19` was published; production was not updated.
  - Playwright verified `8e44d8d19` against the local static export at phone `390 x 844`: local and Framer both report `390 x 2337`, all 10 mobile cards are present, the first card box matches exactly, and the two visible footer button boxes match exactly.
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/fintech-phone-8e44d8d19/`; the local-vs-Framer phone screenshot diff reports `0px` dimension delta and mean channel delta `1.55` (down from `13.49` in the full `f7664fbc5` audit).
- Fintech desktop visual fidelity follow-up:
  - Patched `FintechCasePage.tsx` on branch `matte-drift` so rotated desktop card layers inside the rotation wrappers use the same absolute positioning model as the local Next route. This preserves the authored static Figma transforms in reduced-motion screenshot QA.
  - Framer typecheck is clean, publish preview has no warnings/errors, and branch preview version `8cddfb922` was published; production was not updated.
  - Playwright verified `8cddfb922` against the local static export at desktop `1200 x 900`: local and Framer both report `1224 x 1964`, and the previously worst rotated-card band `1080-1260` dropped from mean `43.78` to `0.28`.
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-fintech-8cddfb922/`; the local-vs-Framer desktop screenshot diff reports `0px` dimension delta and mean channel delta `2.38` (down from `10.50` on `8e44d8d19` and `10.61` in the full `f7664fbc5` audit).
- Home desktop visual fidelity follow-up:
  - Patched the editable Framer canvas nodes for the `1200px` Home breakpoint on branch `matte-drift`: Contact/About content positions and widths now follow the local responsive CSS, the About heading and body rhythm are closer to local, the mistaken bottom green strip was neutralized, and the Hero title group was moved/sized closer to the local desktop layout.
  - Framer review and publish preview were clean, and branch preview version `6bafae11a` was published; production was not updated.
  - Playwright verified `6bafae11a` against the local static export at desktop `1200 x 900`: local and Framer both report `1200 x 3468`, and the focused screenshot diff reports mean channel delta `5.87` (down from `12.50` on `8cddfb922`).
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-home-6bafae11a/`; the remaining largest desktop Home bands are Hero typography/art overlap `180-360`, About typography/body `2880-3420`, and Work heading/card detail `900-1080`.
- Home desktop hero/work alignment follow-up:
  - Patched the `1200px` Home breakpoint on branch `matte-drift` so the visible `Portfolio` title word keeps the local gap after `Abhi's`, the Work subtitle uses the local width/size/y-position, and the Work tape strip sits `2px` lower to match the local section edge.
  - Framer review reported no apply errors; the expected Work tape clipped-bounds warning remains because the local tape intentionally bleeds across the section edge.
  - Branch preview version `16c4ca0f4` was published; production was not updated.
  - Playwright verified `16c4ca0f4` against the local static export at desktop `1200 x 900`: local and Framer both report `1200 x 3468`, and the focused screenshot diff reports mean channel delta `5.08` (down from `5.87` on `6bafae11a` and `12.50` on `8cddfb922`).
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-home-16c4ca0f4/`; the biggest remaining desktop Home deltas are now About/body/footer typography bands `2880-3420`, with smaller residuals in Work `900-1080` and Hero `180-360`.
- Home desktop About typography follow-up:
  - Patched the `1200px` Home About body on branch `matte-drift` so Framer's paragraph breaks and Inter text rhythm better compensate for the local Helvetica/Arial rendering: the empty paragraph spacers were reduced and the About body text now uses `15px / 20px`.
  - Browser-only candidates were tested first; the winning candidate was then applied to Framer, reviewed with no warnings/errors, and published to branch preview version `df5d412e0`; production was not updated.
  - Playwright verified `df5d412e0` against the local static export at desktop `1200 x 900`: local and Framer both report `1200 x 3468`, and the focused screenshot diff reports mean channel delta `4.90` (down from `5.08` on `16c4ca0f4`, `5.87` on `6bafae11a`, and `12.50` on `8cddfb922`).
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-home-df5d412e0/`; the remaining largest desktop Home deltas are About/footer button typography `3240-3420`, Work heading/card detail `900-1080`, Hero text/art `180-360`, and Contact heading/form detail `1800-1980`.
- Home desktop footer strip follow-up:
  - Patched the `1200px` Home About/footer strip on branch `matte-drift` to match the local page: moved it from the bottom of the artboard to local y-position `3344px` and restored the local green `#ddffb7` fill.
  - A browser-only candidate was tested first and reduced the focused desktop Home diff to `4.13`; the same change was then applied to Framer, reviewed with no warnings/errors, and published to branch preview version `dfea55245`; production was not updated.
  - Playwright verified `dfea55245` against the local static export at desktop `1200 x 900`: local and Framer both report `1200 x 3468`, and the focused screenshot diff reports mean channel delta `4.13` (down from `4.90` on `df5d412e0`, `5.08` on `16c4ca0f4`, and `12.50` on `8cddfb922`).
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-home-dfea55245/`; the remaining largest desktop Home deltas are About body typography `2880-3060`, Work heading/card detail `900-1080`, Hero text/art `180-360`, and Contact heading/form detail `1800-1980`.
- Home desktop Work heading follow-up:
  - Patched the `1200px` Home Work heading on branch `matte-drift` to match the local heading scale/rhythm: `54px` font size, `57.24px` line-height, wider text box, and `8px` higher placement.
  - A browser-only candidate was tested first and reduced the focused desktop Home diff to `3.91`; the same change was then applied to Framer, reviewed with no warnings/errors, and published to branch preview version `4a495ed55`; production was not updated.
  - Playwright verified `4a495ed55` against the local static export at desktop `1200 x 900`: local and Framer both report `1200 x 3468`, and the focused screenshot diff reports mean channel delta `3.91` (down from `4.13` on `dfea55245`, `4.90` on `df5d412e0`, and `12.50` on `8cddfb922`).
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-home-4a495ed55/`; the Work band `900-1080` dropped from mean `10.70` to `6.44`. The remaining largest desktop Home deltas are About body typography `2880-3060`, Hero text/art `180-360`, Contact heading/form detail `1800-1980`, and lower About body/buttons `3060-3240`.
- Home desktop About spacer follow-up:
  - Patched the `1200px` Home About body spacer rows on branch `matte-drift`, reducing only the empty rich-text paragraph line-height from `6.75px` to `5px` while preserving the visible body text size/rhythm.
  - A browser-only candidate grid was tested first; the winning candidate was then applied to Framer, reviewed with no warnings/errors, and published to branch preview version `859a41033`; production was not updated.
  - Playwright verified `859a41033` against the local static export at desktop `1200 x 900`: local and Framer both report `1200 x 3468`, and the focused screenshot diff reports mean channel delta `3.86` (down from `3.91` on `4a495ed55`, `4.13` on `dfea55245`, and `12.50` on `8cddfb922`).
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-home-859a41033/`; the remaining largest desktop Home deltas are About body typography `2880-3060`, Hero text/art `180-360`, Contact heading/form detail `1800-1980`, lower About body/buttons `3060-3240`, and Work heading/card detail `900-1080`.
- Home desktop Contact heading wrap follow-up:
  - Patched the `1200px` Home Contact heading and pink shadow heading on branch `matte-drift`, narrowing those text boxes from `720px` to `390px` so Framer wraps the heading like the local desktop render: `Got a brief or` / `role to discuss?`.
  - Browser-only candidates were tested first; the winning candidate was then applied to Framer, reviewed with no warnings/errors, and published to branch preview version `d90522b3c`; production was not updated.
  - Playwright verified `d90522b3c` against the local static export at desktop `1200 x 900`: local and Framer both report `1200 x 3468`, and the focused screenshot diff reports mean channel delta `3.44` (down from `3.86` on `859a41033`, `3.91` on `4a495ed55`, and `12.50` on `8cddfb922`).
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-home-d90522b3c/`; the remaining largest desktop Home deltas are About body typography `2880-3060`, Hero text/art `180-360`, lower About body/buttons `3060-3240`, Work heading/card detail `900-1080`, and About upper body `2700-2880`.
- Home desktop Hero Welcome typography follow-up:
  - Patched the `1200px` Home Hero `Welcome` text on branch `matte-drift`, changing only that editable Framer text layer from `84px / 800` to `82px / 700` so its rendered width better matches the local Helvetica bold-italic heading.
  - Browser-only candidates were tested first; the winning candidate was then applied to Framer, reviewed with no warnings/errors, and published to branch preview version `5efd28e18`; production was not updated.
  - Playwright verified `5efd28e18` against the local static export at desktop `1200 x 900`: local and Framer both report `1200 x 3468`, and the focused screenshot diff reports mean channel delta `3.23` (down from `3.44` on `d90522b3c`, `3.86` on `859a41033`, and `12.50` on `8cddfb922`).
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-home-5efd28e18/`; the Hero band `180-360` dropped from mean `9.82` on `d90522b3c` to `5.73`. The remaining largest desktop Home deltas are About body typography `2880-3060`, lower About body/buttons `3060-3240`, Work heading/card detail `900-1080`, Hero text/art `180-360`, and About upper body `2700-2880`.
- Home desktop About dashed-circle follow-up:
  - Patched the `1200px` Home About dashed decorative circle on branch `matte-drift` to match the local CSS geometry: `540px` diameter, `left: 880px`, `top: 62px` inside the About section.
  - Browser-only candidates were tested first; body-font candidates were rejected because they improved the deepest About text band but worsened the full-page score by shifting text. The circle-only candidate was then applied to Framer, reviewed, and published to branch preview version `8af45ec0c`; production was not updated.
  - Playwright verified `8af45ec0c` against the local static export at desktop `1200 x 900`: local and Framer both report `1200 x 3468`, and the focused screenshot diff reports mean channel delta `3.19` (down from `3.23` on `5efd28e18`).
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-home-8af45ec0c/`; About bands improved from `2700-2880: 3.81 -> 3.64`, `2880-3060: 18.64 -> 18.52`, and `3060-3240: 8.02 -> 7.75`. The remaining largest desktop Home deltas are About body typography, Work heading/card detail, and Hero text/art anti-aliasing.
- Home desktop About body rhythm follow-up:
  - Tested browser-only typography candidates against the published `8af45ec0c` Home desktop screenshot. Native Framer text does not accept Helvetica/Arial in this project, so the final branch-safe change keeps Inter and adjusts only the About body rhythm to `15px / 20.48px`.
  - Framer review was clean with no warnings/errors, and branch preview version `d450d113f` was published; production was not updated.
  - Playwright verified `d450d113f` against the local static export at desktop `1200 x 900`: local and Framer both report `1200 x 3468`, and the focused screenshot diff reports mean channel delta `2.73` (down from `3.19` on `8af45ec0c`).
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-home-d450d113f/`; the remaining largest desktop Home deltas are About body typography `2880-3060`, Work heading/card detail `900-1080`, and Hero text/art anti-aliasing `180-360`.
- Home desktop About heading shadow follow-up:
  - Added an editable pink duplicate text layer behind the `1200px` Home About heading on branch `matte-drift` to match the local `6px 6px` pink heading shadow. The black heading remains the foreground editable text layer.
  - Browser-only candidates were tested first; the `6px` pink shadow candidate won. An initial published duplicate had the wrong z-order, so a follow-up z-order correction was published and verified.
  - Framer publish preview for the corrected version was clean with no errors/warnings, and branch preview version `0022c0556` was published; production was not updated.
  - Playwright verified `0022c0556` against the local static export at desktop `1200 x 900`: local and Framer both report `1200 x 3468`, and the focused screenshot diff reports mean channel delta `2.68` (down from `2.73` on `d450d113f`).
  - Focused screenshot diff artifacts are in `output/playwright/framer-audit-20260705/desktop-home-0022c0556/`; the About upper band `2700-2880` improved from mean `3.64` to `2.71`. The remaining largest desktop Home deltas are About body typography `2880-3060`, Work heading/card detail `900-1080`, and Hero text/art anti-aliasing `180-360`.

Baseline screenshots captured from the local static export:

```text
/tmp/portfolio-framer-baseline-settled/local-home-top-desktop.png
/tmp/portfolio-framer-baseline-settled/local-home-top-mobile.png
/tmp/portfolio-framer-baseline-settled/local-home-work-desktop.png
/tmp/portfolio-framer-baseline-settled/local-home-contact-desktop.png
/tmp/portfolio-framer-tablet/local-tablet-top.png
/tmp/portfolio-framer-tablet/local-tablet-work.png
/tmp/portfolio-framer-tablet/local-tablet-contact-viewport.png
/tmp/portfolio-framer-tablet/local-tablet-about-viewport.png
output/playwright/social-local-desktop-revealed.png
output/playwright/social-local-mobile-revealed.png
output/playwright/internal-local-desktop-revealed.png
output/playwright/internal-local-mobile-revealed.png
output/playwright/fintech-local-desktop-viewport.png
output/playwright/fintech-local-phone-revealed.png
output/playwright/fintech-local-desktop-after-framer-patch.png
output/playwright/fintech-local-phone-after-framer-patch.png
output/playwright/work-local-desktop-closed.png
output/playwright/work-local-desktop-first-folder-open.png
output/playwright/fun-stuff-local-desktop-audit.png
output/playwright/fun-stuff-local-phone-audit.png
output/playwright/fully-filmy-local-desktop-audit.png
output/playwright/fully-filmy-local-lower-audit.png
output/playwright/fully-filmy-local-phone-audit.png
output/playwright/print-media-local-desktop-audit.png
output/playwright/print-media-local-green-section-audit.png
output/playwright/print-media-local-phone-audit.png
output/playwright/email-strategy-local-desktop-audit.png
output/playwright/email-strategy-local-lower-audit.png
output/playwright/email-strategy-local-phone-audit.png
output/playwright/framer-audit-20260705/local-desktop-top.png
output/playwright/framer-audit-20260705/local-desktop-work.png
output/playwright/framer-audit-20260705/local-desktop-contact.png
output/playwright/framer-audit-20260705/local-phone-top.png
output/playwright/framer-audit-20260705/local-phone-work.png
output/playwright/framer-audit-20260705/local-phone-contact.png
```

Framer canvas screenshots captured from the current branch:

```text
/tmp/portfolio-framer-current/framer-home-hero-after-real-art.jpg
/tmp/portfolio-framer-current/framer-home-work-after-real-art.jpg
/tmp/portfolio-framer-current/framer-home-contact-refined.jpg
/tmp/portfolio-framer-current/framer-home-about-after-phone.jpg
/tmp/portfolio-framer-current/framer-phone-hero-final-responsive.jpg
/tmp/portfolio-framer-current/framer-phone-work-final-responsive.jpg
/tmp/portfolio-framer-current/framer-phone-contact-final-responsive.jpg
/tmp/portfolio-framer-current/framer-phone-about-final-responsive.jpg
/tmp/portfolio-framer-current/framer-work-folders-motion-closed.jpg
/tmp/portfolio-framer-current/framer-work-folders-motion-open-qa.jpg
/tmp/portfolio-framer-current/framer-work-folders-motion-reset.jpg
/tmp/portfolio-framer-current/framer-folder-card-open-isolated-qa.jpg
/tmp/portfolio-framer-current/framer-folder-card-reset-isolated-qa.jpg
/tmp/portfolio-framer-tablet/framer-tablet-hero-after.jpg
/tmp/portfolio-framer-tablet/framer-tablet-work-after.jpg
/tmp/portfolio-framer-tablet/framer-tablet-contact-after.jpg
/tmp/portfolio-framer-tablet/framer-tablet-about-after.jpg
/tmp/portfolio-framer-tablet/framer-tablet-work-folder-open.jpg
output/playwright/social-framer-desktop.jpg
output/playwright/social-framer-tablet.jpg
output/playwright/social-framer-phone-phoneonly.jpg
output/playwright/internal-framer-desktop.jpg
output/playwright/internal-framer-tablet.jpg
output/playwright/internal-framer-live-phone.png
output/playwright/fintech-framer-desktop-viewport.png
output/playwright/fintech-framer-phone-full.png
output/playwright/fintech-framer-desktop-final-242b530ef.png
output/playwright/fintech-framer-phone-revealed-final-242b530ef.png
output/playwright/work-framer-desktop-closed-final-7bba11fb9.png
output/playwright/work-framer-desktop-first-folder-open-final-7bba11fb9.png
output/playwright/fun-stuff-framer-desktop-final-06244d35e.png
output/playwright/fun-stuff-framer-phone-final-06244d35e.png
output/playwright/fully-filmy-framer-desktop-final-69f6846cf.png
output/playwright/fully-filmy-framer-lower-final-69f6846cf.png
output/playwright/fully-filmy-framer-phone-final-69f6846cf.png
output/playwright/print-media-framer-desktop-final-21e0a0d06.png
output/playwright/print-media-framer-green-section-final-21e0a0d06.png
output/playwright/print-media-framer-phone-final-21e0a0d06.png
output/playwright/email-strategy-framer-desktop-final-83811eac8.png
output/playwright/email-strategy-framer-lower-final-83811eac8.png
output/playwright/email-strategy-framer-phone-final-83811eac8.png
output/playwright/framer-audit-20260703/focused-fixed-routes-metrics-run-code.js
output/playwright/framer-audit-20260703/social-wide-link-diagnostics-run-code.js
output/playwright/framer-audit-20260703/home-folder-motion-check-run-code.js
output/playwright/framer-audit-20260705/framer-desktop-top.png
output/playwright/framer-audit-20260705/framer-desktop-work.png
output/playwright/framer-audit-20260705/framer-desktop-contact.png
output/playwright/framer-audit-20260705/framer-phone-top.png
output/playwright/framer-audit-20260705/framer-phone-work.png
output/playwright/framer-audit-20260705/framer-phone-contact.png
output/playwright/framer-audit-20260705/homepage-folder-audit-run-code.js
output/playwright/framer-audit-20260705/all-routes-current-metrics-run-code.js
output/playwright/framer-audit-20260705/all-routes-stable-metrics-16715bc87-run-code.js
output/playwright/framer-audit-20260705/email-strategy-overflow-after-scroll-run-code.js
output/playwright/framer-audit-20260705/homepage-cursor-folder-final-16715bc87-run-code.js
output/playwright/framer-audit-20260705/site-cursor-final-16715bc87-run-code.js
output/playwright/framer-audit-20260705/framer-desktop-cursor-hover.png
output/playwright/framer-audit-20260705/framer-phone-cursor-hover.png
output/playwright/framer-audit-20260705/framer-fintech-desktop-site-cursor-hover.png
output/playwright/framer-audit-20260705/framer-social-phone-site-cursor-hover.png
output/playwright/framer-audit-20260705/fully-filmy-desktop-overflow-probe-run-code.js
output/playwright/framer-audit-20260705/fully-filmy-tape-width-summary-run-code.js
output/playwright/framer-audit-20260705/email-fun-width-summary-run-code.js
output/playwright/framer-audit-20260705/email-fun-width-after-scroll-run-code.js
output/playwright/framer-audit-20260705/fully-filmy-phone-section-metrics-run-code.js
output/playwright/framer-audit-20260705/fun-stuff-phone-section-metrics-run-code.js
output/playwright/framer-audit-20260705/print-media-phone-section-metrics-run-code.js
```

Known fidelity gaps after the current pass:

- Desktop hero and Work are much closer after replacing rough art/cards with code components.
- Phone hero and Work are now screenshot-verified against the local mobile/desktop references at a first-pass fidelity level.
- Framer image upload via bytes currently fails in the agent runtime. Data-URL uploads work and were used for the social-media route assets.
- Contact heading shadow and visible antenna pass are implemented on desktop; phone/tablet hide the phone illustration like the local responsive CSS.
- All known local project case-study routes are implemented on the `matte-drift` branch preview. Latest stable all-route metric verification was on branch preview version `16715bc87`; the latest homepage-specific folder/cursor parity verification is also branch preview version `16715bc87`.
- Latest full visual screenshot audit is branch preview version `f7664fbc5`. The latest focused Social Media phone visual parity verification is branch preview version `d99378d9c`; the latest focused Home phone visual fidelity verification is branch preview version `647b981d7`; the latest focused Home desktop visual fidelity verification is branch preview version `0022c0556`; the latest focused Fintech phone visual fidelity verification is branch preview version `8e44d8d19`; the latest focused Fintech desktop visual fidelity verification is branch preview version `8cddfb922`; the latest stable all-route metric pass remains `16715bc87`, and the latest homepage-specific folder/cursor parity verification remains `16715bc87`.
- All-route Playwright checks at desktop `1200 x 900` and phone `390 x 844` report zero Framer console errors and page errors across the homepage and all implemented work routes.
- Route-scale height and width parity are now exact for homepage and all implemented work routes at the checked desktop `1200 x 900` and phone `390 x 844` viewports when measured after reveal animations settle:
  - Homepage: desktop scroll height is `3468` on both local and Framer; phone scroll height is `3161` on both local and Framer. Work and Contact section tops/heights match exactly on desktop and phone. Homepage semantics, inline contact email link styling, phone dashed arc, scrolled nav visibility, global cursor behavior, and folder open/close reactivity are handled; the fixed nav overlay intentionally adds duplicate DOM links versus local (`+4` desktop, `+3` phone).
- Home phone visual fidelity was re-run on focused branch preview version `647b981d7`; local and Framer both report `390 x 3161`, all six Work folder card boxes match by rounded x/y/width/height, the hero stamp remains visible in reduced-motion screenshot QA, the visible hero text/button y-alignment is closer to local, the Contact heading mobile wrap matches local, the Contact form y positions match local, the About body line rhythm is closer to local despite Framer's missing Helvetica/Arial native fonts, and the focused screenshot diff reports mean channel delta `8.24`.
  - Home desktop visual fidelity was re-run on focused branch preview version `0022c0556`; local and Framer both report `1200 x 3468`, hero/work spacing is closer to local, the Work heading now matches the local scale/rhythm, the Hero `Welcome` typography is closer to local, Contact/About editable canvas geometry is materially closer to local, the desktop Contact heading wrap now matches local, About body rhythm was tuned against screenshot candidates, the About dashed circle now matches the local CSS geometry, the About heading pink shadow now matches the local treatment, the bottom footer strip now matches local position/color, and the focused screenshot diff reports mean channel delta `2.68`.
  - Social-media: phone visual parity was re-run on focused branch preview version `d99378d9c`; local and Framer both report `390 x 7989`, every visible mobile media-card box matches by rounded x/y/width/height, and the focused screenshot diff reports mean channel delta `0.50`.
  - Fintech: phone visual parity was re-run on focused branch preview version `8e44d8d19`; local and Framer both report `390 x 2337`, all 10 mobile cards are present, the first card and footer button boxes match exactly, and the focused screenshot diff reports mean channel delta `1.55`.
  - Fintech: desktop visual parity was re-run on focused branch preview version `8cddfb922`; local and Framer both report `1224 x 1964`, rotated desktop card geometry now matches local, and the focused screenshot diff reports mean channel delta `2.38`.
  - Internal-comms: desktop height/link metrics match exactly. Phone now matches the local scroll-warmed lazy-media state at `9558px` on focused branch preview version `f7664fbc5`; all 11 mobile image boxes and section bottoms match at `390 x 844`.
  - Fully-filmy: desktop and phone height/link/width metrics now match exactly.
  - Fun-stuff: desktop and phone height/link/width metrics now match exactly.
  - Email-strategy: desktop scroll width is `1428px` on both local and Framer in the stable metric pass; the earlier `-2px`/`-1px` readings were measurement timing against the animated far-right mic reveal, not a persisted layout mismatch.
- `/work/social-media-brand-identity` is implemented as a route-level code component for fidelity and reactive behavior. This preserves quality but is less canvas-editable than native Framer layers.
- `/work/internal-comms` is implemented as a route-level code component for fidelity and reactive behavior. This preserves quality but is less canvas-editable than native Framer layers.
- `/work/fintech` is implemented as a route-level code component for fidelity and reactive behavior. This preserves quality but is less canvas-editable than native Framer layers.
- `/work/fun-stuff` is implemented as a route-level code component for fidelity and reactive behavior. This preserves quality but is less canvas-editable than native Framer layers.
- `/work/fully-filmy` is implemented as a route-level code component for fidelity and reactive behavior. This preserves quality but is less canvas-editable than native Framer layers.
- `/work/print-media` is implemented as a route-level code component for fidelity and reactive behavior. This preserves quality but is less canvas-editable than native Framer layers.
- `/work/email-strategy` is implemented as a route-level code component for fidelity and reactive behavior. This preserves quality but is less canvas-editable than native Framer layers.
- Framer's screenshot API returned the desktop canvas for the internal-comms phone breakpoint, so final phone verification uses the branch preview in Playwright after a scroll reveal sweep.
- Tablet breakpoint now has a screenshot/proportions pass for homepage sections. It may still need a final authenticated preview pass before publish.
- Real browser hover QA for the folder animation is now passing on branch preview version `16715bc87` via Playwright. The checked folder starts closed, opens on hover with lift/tilt/flap/paper transforms and custom cursor hot-state, fires the click burst on press, and closes/resets on pointer leave. `AnimatedFolderCard.tsx` typechecks cleanly and keeps the controlled open preview state plus reduced-motion fallback.
- Framer has Playfair Display available, but Helvetica did not appear in Framer font search. Code components use CSS Helvetica/Arial fallback for the animated art/card labels.
- Broad all-route metric parity and homepage folder/cursor parity were re-run after version `16715bc87`. Metric parity is exact in the stable pass; full visual screenshot parity can still use a human/design pass for subjective polish.
- Full visual screenshot parity was re-run after version `f7664fbc5`. Hard dimensions are now exact across all checked route/viewport pairs. Phone Social was tightened in the focused `d99378d9c` pass, phone Home was improved in the focused `647b981d7` pass, desktop Home was improved in the focused `6bafae11a` pass, phone Fintech was tightened in the focused `8e44d8d19` pass, and desktop Fintech was tightened in the focused `8cddfb922` pass; remaining screenshot-diff targets include Home desktop Hero/Work/About detail bands and the older phone Home visual delta.
- Production/custom domain has not been updated from this branch preview.

## Recommended Path

Use Framer's native canvas and rebuild the page section by section, using this Next project as the visual source.

Avoid importing the whole page as one code component if the goal is editing in Framer. A code component can preserve visual fidelity, but the layout, text, buttons, cards, and decorative elements will not feel like normal editable Framer layers.

Exception now used: `/work/social-media-brand-identity`, `/work/internal-comms`, `/work/fintech`, `/work/fun-stuff`, `/work/fully-filmy`, `/work/print-media`, and `/work/email-strategy` are highly art-directed and reactive, so the first high-fidelity Framer passes use route-level code components.

## Source Page

Build and serve the static export for production-equivalent screenshots:

```bash
npm run build
npx serve@latest out -l tcp://127.0.0.1:3000
```

Open:

```text
http://127.0.0.1:3000
```

Avoid using `npm run dev` for screenshot baselines because the Next.js dev overlay appears in rendered screenshots.

## Assets

Use these files from `public/images`:

- `star1.svg`
- `star2.svg`
- `ornament-a.svg`
- `ornament-b.svg`
- `ornament-c.svg`
- `stamp-badge.png`
- `about-photo.jpg`

Fonts:

- Helvetica from `public/fonts`
- Playfair Display from Google Fonts

Framer may not preserve custom/local fonts during Figma import. Add fonts directly in Framer after import/rebuild.

## Page Structure

Create one Framer page with these sections:

1. Sticky nav
2. Hero
3. Work
4. About
5. Contact

Use Framer breakpoints:

- Desktop: `1200+`
- Tablet: `768`
- Phone: `390`
- Narrow phone check: `320`

## Global Colors

```text
lime-green:   #bbff6c
light-green:  #ddffb7
pink-hot:     #ff43b7
pink-mid:     #ff61cd
pink-light:   #ffc4e8
pink-pale:    #ff99d8
purple:       #d586ff
purple-pale:  #edd1fc
purple-light: #dfa5ff
purple-hot:   #ba43ff
pink-btn:     #ff76ca
black:        #000000
```

## Nav

Desktop and mobile:

- Height: `60`
- Position: sticky top
- Background: `light-green`
- Links aligned right
- Gap: `24` desktop, `20` phone padding
- Text: Helvetica Bold, `16`, `pink-hot`

Links:

- Work
- About & Contact

In Framer, link:

- Work -> section `#work`
- About & Contact -> section `#about`

## Hero Section

Section:

- Background: `lime-green`
- Min height: viewport minus nav
- Desktop padding top roughly `132-220`
- Phone padding top roughly `84-90`

Headline:

- "Welcome" Helvetica Bold Oblique
- "to" Playfair Italic
- "Abhi's Portfolio" Playfair Bold Italic

Approx desktop sizes:

- Welcome: `58-92`
- to: `34-52`
- Title: `68-110`

Approx phone sizes:

- Welcome: `44-54`
- to: `28`
- Title: `52-64`

Buttons:

- `Browse Projects` -> `#work`
- `Get in Touch` -> `#contact`
- Size desktop: `181 x 61`
- Phone: full-width within content
- Border: `3` black
- Radius: `63`
- Shadow: `0 7 black`

Decoratives:

- Keep as absolute positioned decorative images.
- Hide or crop overflow at section boundary.
- On phone, keep stamp/star partially off-canvas to the right.

## Work Section

Section:

- Background: `lime-green`
- Desktop padding: about `72-112` top, `24-80` sides
- Phone padding: `56 24 72`

Text:

- Heading: `Work, Work, Work`
- Playfair Bold, `38-54`
- Subtitle: Helvetica `16-20`, `pink-hot`

Cards:

- Desktop grid: 3 columns
- Phone grid: 2 columns
- Card aspect ratio: `5 / 4`
- Desktop max width: `200`
- Phone card width: fluid
- Border radius: `26`

Project labels:

- Social Media Brand Identity
- Internal Comms
- Fintech Schmintech
- Fully Filmy
- Print Media
- Email Strategy

Card colors:

- Top/corner blob: `pink-pale`
- Main block: `pink-hot`
- Text: white, Helvetica Bold Oblique

## About Section

Section:

- Background: `purple`
- Desktop: two visual areas, text left and phone illustration right/middle
- Tablet/phone: hide phone illustration

Heading:

- `About Me`
- Playfair Bold
- Desktop: `64-118`
- Phone: `56`
- Shadow: pink-light

Body:

- Helvetica regular
- Desktop: `16-19`
- Phone: `15`
- Line-height around `1.28`

Buttons:

- Browse Projects -> `#work`
- Download Resume: add a file in Framer when available

Phone illustration desktop:

- Wrapper: `210 x 660`
- Antenna: `12 x 146`
- Body: `210 x 560`
- Photo frame: `176 x 370`
- Keypad: 3 columns, `38 x 38`, gap `9`
- Hide below tablet.

## Contact Section

Section:

- Background: `purple`
- Padding top: `84-116` desktop
- Phone: `56` top, `18-24` sides

Heading:

- `Got a brief or role to discuss?`
- Playfair Bold
- Desktop: `44-72`
- Phone: `42`
- Shadow: pink-light

Email line:

- Helvetica `15-20`
- Color: `light-green`
- Email is underlined, bold oblique

Form:

- Width max: `614`
- Gap: `20` desktop, `16` phone
- Inputs: `54` high
- Textarea: `124` high
- Background: `purple-pale`
- Border: `3` black
- Radius: `57` inputs, `47` textarea
- Send button: `181 x 61`, pink-mid

Footer strip:

- Height: `40`
- Background: `light-green`
- Full-width edge to edge.

## Framer Build Notes

- Use Framer Stacks for section internals instead of absolute positioning wherever possible.
- Keep decorative images absolute, but keep primary content in stacks.
- Build phone/tablet breakpoints manually instead of relying on desktop scaling.
- Check `320px` width before publishing; this page was specifically fixed to avoid horizontal overflow at that width.
- Recreate hover effects in Framer interactions only after the base responsive layout is correct.

## Alternative Import Paths

### Figma to Framer

If you have the original Figma file, clean it first:

- Use Auto Layout for real layout groups.
- Remove hidden/unused layers.
- Flatten complex decorative vector groups if you do not need to edit their internals.
- Import only one section at a time.

Then use Framer's Figma plugin and paste the selected layers into Framer.

### Web/HTML Import

Framer has a web/HTML import workflow, but use it as a visual starting point only. Imported webpage layers often need manual cleanup for responsiveness.

### Code Component

Only use this if you want a nearly exact embedded version of the current page and do not care about visual editing inside Framer.

This page currently uses Next.js `Image`, CSS modules, local fonts, and section hash links. A Framer code component would need to be rewritten as React 18-compatible plain React/CSS and assets uploaded to Framer.
