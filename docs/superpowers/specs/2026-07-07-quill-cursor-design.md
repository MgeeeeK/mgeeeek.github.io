# Quill Cursor — Design (2026-07-07)

Re-theme the sitewide custom cursor (`components/Fx/Cursor.tsx` + `app/fx.css`)
from the sticker dot + dashed-ring follower to a copywriting motif: a feather
quill that writes ink. Direction approved by user over two alternatives
(typewriter caret, fountain-pen nib).

## Behavior

1. **Quill pointer** — a small sticker-style quill SVG (black outline,
   pale-pink feather, inked nib) replaces the dot. The nib tip sits exactly at
   the pointer hotspot. `aria-hidden`, fine pointers only, honors
   `prefers-reduced-motion` (component bails, native cursor remains).
2. **Velocity tilt** — the quill leans into horizontal travel (smoothed
   ±~15°, pivot at the nib tip) like a hand writing across a page.
3. **Ink trail** — replaces the dashed ring follower. A fullscreen fixed
   `<canvas>` (z-index below the quill) draws a hot-pink stroke through recent
   pointer points; each segment fades and thins over ~550ms like drying ink.
4. **Click = ink splat** — replaces the confetti star burst. An irregular ink
   blob squash-pops at the click point, 5 droplets fly outward
   (pink/purple/lime), and 2 italic serif glyphs (Playfair — writerly) pop
   upward and fade. The quill itself does a brief press-down jab.
5. **Interactive hover** (`fx-cursor-hot`, same detection as before) — the
   quill dips to a steeper writing angle and scales up slightly; the ink
   trail thickens.

## Out of scope

Native `cursor:` fallbacks per element, sounds, mobile/coarse pointers,
Framer version (motion is rebuilt natively there).
