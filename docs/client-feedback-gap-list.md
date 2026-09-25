# Client feedback gap list (Notion "Portfolio Changes" vs site vs Figma)

> **Status 2026-09-25 (evening):** Sections C and D implemented in commits
> 600cc45 → c4b889a (WP1–WP6). Canvas now scales up to fill wide screens.
> Remaining: Section E questions for Abhi, Fintech/Fun Stuff links.

Compared on 2026-09-25. Figma frames captured at 1:1 from the public prototype view
of the ORIGINAL file (no API reads). Site captured from local dev at 1280px.
Comparison slices live in `.playwright-mcp/cmp/` (Figma left, site right).

Figma is static by design. Black rectangles in Figma are video placeholders; the
site filling them with thumbnails is expected and correct.

## A. Keep as-is (do NOT revert to Figma)

She said she likes these:
- 3D black-offset buttons (Figma buttons are flat with a thin outline).
- Folder card open animation on the Work grid.
- How the homepage scrolling works (viewport-height hero + section snap).

We are assuming she wants these kept (confirm):
- "Don't Look!" folder pushed mostly off-screen (deliberate exception per
  2026-07-05 feedback) and the warning dialog it opens.
- Video thumbnails with play button in place of Figma's black boxes.
- Emailer click-to-popup on Email Strategy (matches Figma open-emailer state).

Tension to flag: the viewport-height hero she likes is the same mechanism that
makes the homepage taller than Figma and pushes "Work, Work, Work" below the fold
on a 1920x1080 screen. "Center homepage to diff screens" and "keep home scrolling"
pull in opposite directions; she has to pick.

## B. Already done in code (tell her to re-check on the live site)

- Internal Comms: both films linked (microsite + CSR).
- Print Media: corporate diary film linked.
- Nissin: a KFC film is linked at page bottom (YouTube short). Confirm it is the
  "ArabellaFever Dream KFC" video she named.
- Email Strategy: all 5 subject lines open their own emailer image.
- Contact form shows "Sent!" after submit.
- Email Strategy "Next Project" opens the secret-folder warning first.
- "Got a brief" subheadline is already bold.

## C. Not done, verifiable from code (no Figma needed)

1. Site-wide: remove pink offset box-shadows on media, keep pink outline
   (every work page module.css has `box-shadow: Npx Npx 0 rgba(255,67,183,…)`).
2. Site-wide: make scrollbar near-invisible (`app/fx.css` sets hot-pink on green).
3. Site-wide: disable text selection / text cursor (only fintech card labels have it).
4. Site-wide: remove the "virus thingy". REVISED guess (was Starburst in the first
   report): the small green `Sparkle` asterisks from `components/Ambient`, which read
   as virus icons in the screenshots on every work page. Second candidate = the large
   `Starburst`. Confirm with her before deleting.
5. Internal Comms: emailers need click-to-popup like Email Strategy (none exists).
6. Email Strategy: remove the polygon star (`polyBox`) and the small green triangle
   at the lower right. Neither exists in Figma.
7. Email Strategy mic: at 1280 it bleeds past the canvas and creates horizontal
   scroll (page renders 1428px wide). At 1920 the canvas is centred with white
   margins, so the mic sits fully inside the viewport, which is her complaint
   ("edge of the mic out of the screen at all sizes"). Fix = clip overflow-x on
   the wrapper AND anchor the mic to the viewport's right edge, not the canvas.
8. Internal Comms: emailer collage also overflows to 1310px wide (same fix).

## D. Confirmed by Figma compare (visual fixes)

### Home
- "About Me" heading is ~2x the Figma size; match other section headings.
- "Got a brief or role to discuss?" wraps to two lines on site; Figma is one line
  at a smaller size.
- Phone illustration sits too low. Figma: phone body top-aligned with the
  "Got a brief" heading, beside the form, antenna reaching up into the green
  Work section. Site: phone sits beside About Me, antenna beside the form.
- Hero is viewport-height: at 1280x900 the page is 3425 tall vs Figma 3000; at
  1920x1080 it is 4140 and "Work, Work, Work" falls below the fold. This is what
  "center homepage to diff screens" refers to. See tension note in Section A.
- Nav "Work / Contact & About": could NOT reproduce at 1280 or 1920; positions are
  identical on home and case-study pages in both captures. Ask her for a screenshot
  or her screen size.
- Work heading → subheadline gap vs Contact heading → subheadline gap: she wants
  them equal. Figma has them equal (~10px); site contact gap is larger.
- Welcome sparkles: Figma has 3 pink sparkles top-left of "Welcome"; site has 1.

### Nissin (Social Media)
- "From this → to this" collage is arranged differently from Figma (Holi post
  overlap, "How I took the brand from this" label position, right-hand cluster
  uses different posts and the "me at 10am" reel is missing). Rebuild to Figma.
- Pink sparkles overlap the top-left border of the mouse-meme post. Figma places
  them clear of the border, up and left.
- Reel thumbnails are smaller than Figma (row 1 ≈ 160×275 on site vs ≈ 190×340
  in Figma; wide card ≈ 275 vs ≈ 340). Enlarge to Figma sizes.
- Green sun starburst overlaps the mailbox post and Diwaloween heading; Figma has
  it behind the Diwaloween text, left edge, below the post. Move behind both.
- Section rhythm: site runs ~150px ahead of Figma from "Topical Holidays" down.

### Fintech
- Two thumbnails misaligned vs Figma: the tilted "extra revenue" card and the
  tilted "Reel 'em in" phone overlap neighbours differently.
- Pink border missing/thin on a few cards ("Official Apology", "Be educative");
  Figma has a solid pink border on all.
- Links: cannot verify from screenshots. Needs fresh Pro-team copy + 1 MCP read,
  or ask her to paste links.

### Ad Films (Fully Filmy)
- Video thumbnails poke outside the rounded pink border (Heart of the office,
  Late for work, both Half painted cards). Clip to border radius.
- Missing captions present in Figma: "Incomplete lighting", "Half painted",
  "Heart of the office", "Late for work".
- "Half painted" pair overlap arrangement differs slightly from Figma.

### Print Media
- Matches Figma. Site adds a light pink frame/shadow on the two Schneider ads.
  Her question: pink borders on print pages? Recommend yes, consistent with the
  "keep pink outline" rule.

### Email Strategy
- Tone of Voice: no gap between "Conversational, approachable, and grounded" and
  the body; Figma has one line of space.
- Scenario B diamonds: the hot-pink Route 1 diamond is bold and off-centre on the
  site (Figma regular, centred). The light-pink Route 2 diamond she named looks
  centred at 1280; re-check at her screen size.
- Graph line is light green on site; Figma is hot pink, ending in an arrow at the
  lower right.
- Copy: Route 1 third subject in Figma reads "…meeting-free universe... (Scenario B)";
  site drops "(Scenario B)".

### Internal Comms
- Emailer collage is ~1.6x Figma size and pushes the footer buttons ~400px lower.
  Figma keeps the five emailers small inside the left ~600px.
- Otherwise matches Figma closely.

### Fun Stuff
- Matches Figma. Links cannot be verified from screenshots.

## E. Questions back to Abhi

- Confirm "virus thingy" = the small green asterisks (or the big starburst).
- Pink borders on print pages: recommend yes.
- "Center homepage to diff screens": does she mean the hero should not resize with
  the viewport, or that the 1280 canvas should sit centred on wide monitors?
- Fintech and Fun Stuff links: paste into Notion, or approve a fresh Figma copy.
