# Fx Motion System — API Contract

Site-wide motion infrastructure (added 2026-06). Mounted globally in
`app/layout.tsx`: `FxProvider` (scroll reveals), `Cursor` (custom cursor — a
writing quill with an ink-trail canvas; clicks splat an ink blot),
`.fx-progress` (scroll ribbon), paper-grain overlay, and `app/template.tsx`
(page-enter transition). Global styles in `app/fx.css`.

## Scroll reveals — `data-reveal`

Add attributes to ANY existing element. No wrappers, no structural change:

```tsx
<div className={styles.heroCard} data-reveal="tilt" data-reveal-delay="2">
```

- `data-reveal` variants: `rise` (default — up 30px), `pop` (sticker slap,
  bouncy scale), `stamp` (presses down from 1.55× scale), `tilt` (rise +
  settle from −4°), `slide-left`, `slide-right`, `fade`.
- `data-reveal-delay="N"` → N × 80ms animation delay. Use 0–6 for stagger
  runs across sibling cards/letters; reset per visual group.
- Safe on absolutely-positioned Figma elements: animations use the
  individual CSS `translate`/`scale`/`rotate` properties, which COMPOSE
  with any existing `transform` (rotations, offsets stay intact).
- Safe on elements with authored `opacity < 1` (final keyframes omit
  opacity, so they settle to the authored value).
- Reduced motion / no-JS: elements simply stay visible. Never gate
  content on it.

### Discipline
- Reveal content blocks (headings, paragraphs, cards, buttons, images),
  NOT tiny ambient sparkles (they have their own twinkle loops).
- One variant family per section; stagger siblings 1 step apart.
- `pop`/`stamp` for sticker-like media cards and badges; `rise`/`tilt`
  for text; `slide-*` sparingly for asymmetric layouts.
- Do NOT put `data-reveal` on an element that also gets pointer-parallax
  (`data-depth`) — both drive `translate`.

## Pointer parallax — `ParallaxLayer`

```tsx
import ParallaxLayer from '@/components/Fx/ParallaxLayer'

<ParallaxLayer className={styles.decoratives} maxShift={26}>
  <img ... data-depth="0.5" />   {/* 0 = pinned, 1 = full travel */}
</ParallaxLayer>
```

Renders a `<div aria-hidden>` — use for decorative layers only. Fine
pointers only.

## Magnetic buttons — `Magnetic`

```tsx
import Magnetic from '@/components/Fx/Magnetic'

<Magnetic><a className={styles.btnPrimary}>Send</a></Magnetic>
```

Wraps ONE button/link in an `inline-block` span that leans toward the
pointer and springs back. Use on primary pill CTAs only.

## Washi-tape marquee — `Tape`

```tsx
import Tape from '@/components/Fx/Tape'

<Tape text="Work, Work, Work" variant="pink" angle={-2} className={styles.tape} />
```

Chunky bordered looping ribbon, `aria-hidden`. Variants: `pink`
(hot-pink bg / light-green text), `lime`, `purple`. Position via your own
class (typically `position: absolute; left: -2%; width: 104%`) at a
section seam. Text MUST be copy that already exists on the page. Max one
per page section, used at most twice per page.

## Keyframe style guide (for new per-component animations)

- Hover micro-interactions: 180–240ms ease.
- Entrances: 500–700ms, `cubic-bezier(.22,1,.36,1)` (smooth) or
  `cubic-bezier(.3,1.45,.45,1)` (bouncy sticker).
- Ambient loops: 20–38s linear (spins), 6–8s ease-in-out (floats),
  1.8–2.4s (twinkles).
- New keyframes that run on elements with existing `transform`: animate
  `translate`/`scale`/`rotate` individual properties instead.
- Always extend the component's `@media (prefers-reduced-motion: reduce)`
  block: `animation: none` + stable end state.
