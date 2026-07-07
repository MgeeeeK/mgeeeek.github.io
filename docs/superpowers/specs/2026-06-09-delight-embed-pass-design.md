# Delight & In-Page Embed Pass — Design Spec

**Date:** 2026-06-09
**Status:** Approved (direction chosen by user; execution delegated to designer judgment)

## Goal

Bring the faithful-but-flat case-study pages up to the homepage's richness — depth, layering, and ambient delight so nothing reads as empty — **without changing layouts, colors, copy, or card positions (no revamp).** Plus: embed all Instagram/YouTube media so users never leave the page.

## Decisions

1. **Direction: "Ambient on cream."** Keep each page's cream `#fbfff7` background, exact Figma layout and colors. Depth comes from (a) decoration placed *behind* content in empty zones, (b) chunky resting shadows + hover-lift on media cards.
2. **Embeds: click-to-play lightbox** for both Instagram and YouTube. Cards stay as their Figma preview tiles; clicking opens an in-page modal with the real embed. Preserves layout pixel-for-pixel, loads embeds on demand (fast), keeps users on-site.

## Components

### 1. Ambient decoration layer (per page)
- Reuse the homepage vocabulary: star/starburst SVGs (`public/images/star1.svg`, `star2.svg`), dashed CSS halos, sparkle ornaments.
- Placed in each page's empty zones; sits behind content (`z-index:0`, `pointer-events:none`, `aria-hidden`).
- Motion: slow halo rotation (28–34s linear), starburst slow-spin, twinkle-on-load for sparkles. Discipline: ~one slow moving object per section; never behind readable text/active media.
- Honors `prefers-reduced-motion` (freeze, stable end states).

### 2. Card depth (shared)
- Resting: chunky offset shadow (`box-shadow`/`filter: drop-shadow`).
- Hover: `translateY(-8px) rotate(-2deg)` + hot-pink glow.
- Keyboard: `:focus-visible` pale-lime ring (matches form fields).
- Applied to every media/preview card across case studies. Mobile: affordance visible by default (no hover-only info).

### 3. MediaLightbox (client component)
- A provider (mounted in `app/layout.tsx`) exposes `openMedia({platform, id})` via context.
- Each media card renders as a real `<a href={externalUrl}>` (graceful fallback / SEO) but `onClick` `preventDefault`s and calls `openMedia`.
- Modal: dark backdrop, embed centered in a chunky black-bordered frame on the cream/pink palette; close via chunky pill button, `Esc`, and backdrop click. Focus trap, body scroll-lock, `aria-modal`. No layout shift.
- Embeds (lightweight, no third-party script):
  - Instagram: `https://www.instagram.com/p/<CODE>/embed` (iframe). Extract `<CODE>` from `/p/<code>/` or `/reel/<code>/`.
  - YouTube: `https://www.youtube.com/embed/<ID>?autoplay=1`. Extract ID from `youtu.be/<id>` or `watch?v=<id>` or `/embed/<id>`.

## Per-page application
- **Heavy media (wire to lightbox + depth + ambient):** social-media (~16 IG), fintech (~12 IG), fully-filmy (~5 YouTube).
- **Ambient + depth only (few/no embeds):** internal-comms, print-media, email-strategy, fun-stuff (fun-stuff's design-portfolio link stays external).
- Ambient decoration tuned per page to its actual empty zones (e.g., print-media's long lower band).

## Constraints
- Preserve exact Figma layout/colors/copy/positions — decoration is additive and behind content only.
- `prefers-reduced-motion`: stop infinite animation, keep end states stable, never remove a control.
- Mobile: lightbox works on touch; play affordance always visible.

## Out of scope (later passes)
- Responsive/mobile layout redesign.
- Emails "open-emailer" interactive state (`877:813`).
