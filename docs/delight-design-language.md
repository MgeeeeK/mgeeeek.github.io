# Delight Design Language

This document captures the interaction and motion language already established on the homepage. Use it as the source of truth when adding delight to project pages, Instagram playback cards, embedded media, and future case studies.

## Personality

The portfolio should feel handmade, loud, tactile, and slightly mischievous. Delight comes from objects that behave like physical cutouts: they lift, wobble, rotate, cast chunky shadows, reveal dashed inner details, and drift in the background. The tone is playful, but the mechanics stay simple and readable.

Avoid generic fades, glassmorphism, muted SaaS easing, and polished-but-flat card grids. Motion should feel like stickers, stamps, toys, phones, posters, and paper pieces being nudged around.

## Core Tokens

Use the existing global color tokens from `app/globals.css`.

- `--color-lime-green`: primary homepage and work-section field.
- `--color-light-green`: nav bars, project strips, pale contrast zones.
- `--color-pink-hot`: main outline/accent color.
- `--color-pink-mid`: primary button fill.
- `--color-pink-light`: secondary button fill and soft shadows.
- `--color-pink-pale`: project-card blob fill.
- `--color-purple`, `--color-purple-pale`, `--color-purple-light`, `--color-purple-hot`: contact/about surface family.

Typography:

- Display: `Playfair Display`, usually bold or italic, used for page titles and expressive headings.
- Utility/body: local `Helvetica`, used for nav, buttons, captions, body text, labels, forms, and project card text.
- Button text is Helvetica bold, 17px desktop, line-height `1.115`.
- Do not use negative letter spacing for new UI. Existing nav has slight negative tracking; do not expand that pattern into content surfaces.

## Interaction Families

### Chunky Pill Buttons

Source examples:

- `components/Hero/Hero.module.css`: `.btnPrimary`, `.btnSecondary`
- `components/ContactSection/ContactSection.module.css`: `.sendBtn`, `.btnBrowse`, `.btnResume`

Shape:

- Fixed desktop size around `180px x 60px`.
- `3px solid black` border.
- `63px` pill radius.
- Black text, Helvetica bold.
- Primary fill: `--color-pink-mid`.
- Secondary fill: `--color-pink-light`.
- Resting shadow: `box-shadow: 0 7px 0 black`.

Motion:

- Transition: `transform 180ms ease, box-shadow 180ms ease, background 180ms ease`.
- Hover: `translateY(-4px) rotate(-1deg)`, shadow deepens to `0 11px 0 black`.
- Active: `translateY(2px)`, shadow compresses to `0 3px 0 black`.

Rule:

- Any new CTA on project pages should use this exact tactile press model unless it is intentionally a quieter text link.

### Blob Project Cards

Source examples:

- `components/ProjectCard/ProjectCard.module.css`
- `components/WorkSection/WorkSection.module.css`

Shape:

- Card aspect ratio: `5 / 4`.
- Main radius: `26px`.
- Internal blobs are layered, rounded, and offset.
- Label is centered, Helvetica bold oblique, white, capitalized.
- Resting shadow uses `filter: drop-shadow(0 8px 0 rgb(0 0 0 / 0.16))`.

Motion:

- Card hover: `translateY(-8px) rotate(-2deg)`.
- Hover shadow: `drop-shadow(0 14px 0 rgb(0 0 0 / 0.2))`.
- Dashed inner outline appears on hover using a pseudo-element.
- Blob layers shift independently:
  - top blob moves `translate(6px, -8px) rotate(3deg)`;
  - corner blob moves `translate(-5px, -4px) rotate(-8deg) scale(1.12)`;
  - dark block moves down `translateY(5px)`;
  - label lifts and rotates slightly.

Rule:

- Embedded Instagram cards should borrow this layered hover model: the media tile lifts as one object, while internal play/chrome elements nudge independently.

### Form Fields

Source example:

- `components/ContactSection/ContactSection.module.css`: `.input`, `.textarea`

Shape:

- Soft purple fill, black border, large rounded corners.
- Inputs use `54px` height and `57px` radius.
- Textareas use larger rounded capsules.

Motion:

- Focus changes fill to `#f8e9ff`.
- Focus adds a pale lime ring: `0 0 0 5px rgb(221 255 183 / 0.5)`.
- Focus shifts right with `translateX(6px)`.

Rule:

- Interactive controls should visibly respond to focus, not only hover. New video/embed controls need keyboard-visible focus states with the same lime-ring vocabulary.

## Ambient Motion

### Slow Rotating Halos

Source examples:

- `components/Hero/Hero.module.css`: `.hero::after`, `haloSpin`
- `components/ContactSection/ContactSection.module.css`: `.aboutPage::before`, `.contactPage::before`, `contactHalo`

Treatment:

- Large dashed circles sit partially off-canvas.
- Opacity stays low, around `0.5`.
- Rotation is slow and continuous: 28-30s linear.
- Direction is usually counterclockwise.

Rule:

- Use halos as background rhythm, not focal content. They should never compete with readable text or video playback.

### Spinning Starbursts

Source examples:

- `components/Hero/Hero.module.css`: `.star1`, `slowSpin`
- `components/WorkSection/WorkSection.module.css`: `.star2`, `workStarSpin`

Treatment:

- Large decorative SVGs.
- Slow linear spin: 22-34s.
- Often partially offscreen or behind content.
- Opacity may drop on smaller screens.

Rule:

- A case-study page can use one slow decorative object per major section. Avoid filling every section with motion.

### Twinkling Ornaments

Source example:

- `components/Hero/Hero.module.css`: `.ornamentA`, `.ornamentB`, `.ornamentC`, `twinkle`

Treatment:

- Small SVG ornaments scale from `0.15` to `1`.
- Opacity moves from `0` to `1`.
- Durations are short: 1.8-2.4s.
- Delays are staggered.

Rule:

- Use twinkles around hero collages, play buttons, or a newly loaded embed state. Do not use them as loading spinners.

### Floating Objects

Source examples:

- `components/WorkSection/WorkSection.module.css`: `.dontLookWrapper`, `dontLookFloat`
- `components/ContactSection/ContactSection.module.css`: `.phoneIllustration`, `phoneFloat`

Treatment:

- Objects drift vertically by 16-18px.
- Rotation changes by 1.5-3deg.
- Duration is 6.5-8s with `ease-in-out`.

Rule:

- Floating is for decorative objects, not body copy or primary controls. Project media can float only if it is not actively playing.

## Layout Delight

Homepage delight is not only animation. Layouts use asymmetric placement:

- Cards are intentionally staggered in the Work grid.
- Decorative elements sit off-canvas or behind major sections.
- Hero typography uses offset baselines and mixed font voices.
- Borders and dashed rules frame sections like posters or handmade layouts.
- Scroll snapping gives the homepage a page-by-page feel on desktop.

Case-study pages should preserve the exact Figma content layout first, then add delight in small layers:

- sticky project nav and hot-pink section strip;
- hover/active states for linked media blocks;
- gentle staggered entrance or ambient float only where it does not disturb reading;
- tactile play controls for embeds;
- no scroll snapping on long project pages.

## Instagram Playback Direction

When replacing static Instagram links with embedded playback, use this behavior model:

- Resting state: black or media-preview tile with hot-pink border, matching the Figma placeholder geometry.
- Hover state: tile lifts `-6px to -8px`, rotates `-1deg to -2deg`, and gains a soft hot-pink glow or chunky shadow.
- Internal chrome: a play button, reel badge, or small caption tag shifts separately by 2-5px on hover.
- Active/loading state: preserve tile size, show a small twinkle or pulse around the play control, and avoid layout shift.
- Playing state: reduce decorative motion around the active media so playback remains readable.
- Focus state: use the same pale lime focus ring as form fields.
- Mobile: no hover-dependent information. The play affordance must be visible by default.

Do not redirect users to Instagram as the primary interaction when an embed is available. External Instagram links can remain as secondary fallback text or an icon button.

## Reduced Motion

The homepage already respects `prefers-reduced-motion` by disabling decorative animations and transitions. New delight must follow the same rule:

- Stop infinite animations.
- Remove hover/focus transitions.
- Keep final visual states stable and readable.
- Never remove the control itself.

## Implementation Checklist

Before shipping a new project-page interaction:

- Buttons use the chunky pill model or have a clear reason not to.
- Media cards have hover, active, focus, and mobile-visible states.
- Embedded playback does not cause layout shift.
- Decorative motion pauses or quiets while media is playing.
- `prefers-reduced-motion` is handled.
- Browser QA checks desktop and mobile.
- Console has no relevant app warnings or errors.
