# Client Handover Platform Plan

Research checked: 2026-07-02

For the Framer-specific account, plan, MCP/agent, access, and launch prerequisites, see
`docs/framer-preimplementation-research.md`.

## Current project snapshot

- Stack: Next.js 16.2.6, React 19.2.4, static App Router routes.
- Build status: `npm run build` passes and prerenders all routes.
- Routes: homepage plus `/work/email-strategy`, `/work/fintech`, `/work/fully-filmy`, `/work/fun-stuff`, `/work/internal-comms`, `/work/print-media`, `/work/social-media-brand-identity`.
- Work grid: `lib/projects.ts` lists 6 visible work items. `/work/fun-stuff` exists separately and needs an explicit include/exclude decision.
- Assets: 61 SVG, 30 PNG, 9 JPG, 4 TTF files under `public`.
- Fonts: local Helvetica files plus Playfair Display through `next/font/google`.
- Behavior: sticky nav, contact mailto form, resume download link, Instagram/YouTube links with in-page lightbox, scroll reveals, parallax, magnetic hover, custom cursor, ambient decor.
- Architecture: no backend, no CMS, no database. Most project pages are bespoke layouts with absolute positioning and custom responsive alternatives.

## Recommendation

Use Framer for the first client handover if the client mainly needs to update copy, images, links, resume, SEO, and contact-form destination while preserving the current playful visual identity.

Recommended Framer setup:

- Framer Pro site plan for the live project. The current Framer pricing page lists Pro at $30/month, 10 CMS collections, 100 GB bandwidth, redirects, staging, and branching with previews.
- Add the client as a Content Editor when they only need CMS, localization, and on-page editing. Framer lists content editors at $10/editor/month and additional full editors at $20/editor/month.
- Rebuild as native Framer pages/components. Do not import the Next app as one code component because that would preserve developer dependency and make client editing worse.

Why Framer fits this project:

- This is a design-led static portfolio, not an app with backend logic.
- The strongest handover need is editable visual pages, not complex data operations.
- Framer supports editable Figma imports/layers, built-in CMS, forms, SEO, hosting, and on-canvas collaboration.
- The current custom motion can be approximated with Framer interactions. Exact custom cursor/magnetic/lightbox behavior should be treated as optional polish, not the basis of the handover.

Main caveat:

- If the client expects to add many future project pages by themselves, choose Webflow or Wix Studio instead, or standardize future Framer project pages into a CMS template. The current case-study layouts are too unique for a clean one-template CMS migration.

## Platform comparison

| Platform | Fit | When to choose it | Tradeoff |
| --- | --- | --- | --- |
| Framer | Best default | Visual fidelity, designer-like editing, fast portfolio launch, light CMS, forms | Less ideal for highly structured future project creation; avoid CMS-heavy code components |
| Webflow | Best structured handover | Client will add projects, edit CMS, use roles, and needs stronger permissions | More complex builder; recreating this expressive visual style may take longer |
| Wix Studio | Safest non-technical editing | Client should edit text/images in content mode with low risk of breaking design | Less precise/premium for this specific custom visual language and motion |
| Squarespace | Simplified portfolio only | Client wants the easiest mainstream editor and accepts a redesigned/simplified portfolio | Lower fidelity for the current bespoke pages and interactions |
| Readymag | Artistic one-off | Editorial/freeform visual site with occasional collaborator edits | Not the best for repeatable client-managed project additions |

## Migration approach for Framer

1. Keep the current Next site running locally as the visual source of truth.
2. Build global styles in Framer: colors, typography, buttons, cards, page widths, and breakpoints.
3. Upload the local Helvetica font files and use Playfair Display in Framer.
4. Create reusable native Framer components:
   - Nav
   - Primary/secondary button
   - Project card
   - Contact form
   - Media/Instagram/YouTube card
   - Case-study footer nav
   - Decorative star/halo/ornament components
5. Rebuild the homepage as native Framer sections.
6. Rebuild each work page as a native page, using reusable components where possible.
7. Use Framer CMS only where content is repeatable:
   - Work-card labels, slugs, thumbnails, order, and short descriptions
   - Optional simple future-project template
   - Do not force the existing bespoke case studies into one CMS schema unless the client agrees to simplify them.
8. Replace the current mailto form with Framer Forms. Route submissions to email, Google Sheets, or webhook.
9. Recreate media behavior:
   - Preferred: use native embeds/cards that open Instagram/YouTube externally or in a simple overlay.
   - Optional: build one reusable overlay/lightbox pattern if that experience is required.
10. Recreate motion with Framer-native scroll and hover effects. Keep reduced-motion behavior in mind.

## Handover plan

### Phase 1 - Decision and scope

- Confirm target platform: Framer unless future project self-creation is the highest priority.
- Confirm whether `/work/fun-stuff` is included in the public handover.
- Confirm which behaviors must be exact: custom cursor, magnetic hover, parallax, lightbox, and decorative motion.
- Confirm owner account, domain registrar, form destination, resume PDF, analytics, and SEO/social metadata.

### Phase 2 - Content and asset audit

- Export a route-by-route content checklist.
- Clean unused source artifacts from the handover asset pack, especially `.DS_Store`.
- Normalize image names for client readability.
- Record every external Instagram/YouTube URL and every page CTA.

### Phase 3 - Framer build

- Create the project in the client's Framer workspace, not a developer-owned workspace.
- Configure global tokens, fonts, breakpoints, and base components.
- Rebuild homepage first and review fidelity before moving to all case studies.
- Rebuild case-study pages in priority order:
  1. Social Media Brand Identity
  2. Internal Comms
  3. Fintech Schmintech
  4. Fully Filmy
  5. Print Media
  6. Email Strategy
  7. Fun Stuff, if included

### Phase 4 - QA and launch

- Test desktop, tablet, phone, and 320px narrow phone layouts.
- Check all CTAs, work links, external media links, resume download, and contact form delivery.
- Add page titles, descriptions, Open Graph images, favicon, sitemap, and redirects if URL paths change.
- Publish on a Framer staging/domain preview before DNS cutover.
- Move DNS only after client signs off on the preview.

### Phase 5 - Client training

- Invite the client as Content Editor first.
- Record a short walkthrough covering:
  - editing homepage copy and images
  - updating project card content
  - editing project page text/media
  - changing form destination
  - publishing and reverting
- Keep one full editor/designer account for structural changes.

## Rough effort estimate

- Framer faithful rebuild: 5-8 working days.
- Webflow structured rebuild: 7-10 working days.
- Wix Studio safe-editor rebuild: 5-8 working days.
- Squarespace simplified redesign: 3-5 working days, but with meaningful visual compromises.

These estimates assume the existing visual design remains the source of truth and no major copy rewrite is required.

## Acceptance criteria

- Client owns the platform workspace/project and billing.
- Client can update core copy, images, project labels, external links, resume file, SEO metadata, and form destination without touching code.
- All current public routes have a matching live page or an agreed redirect.
- Homepage and work pages are checked at desktop, tablet, phone, and 320px.
- Form submissions arrive at the agreed destination.
- Instagram/YouTube links have an agreed behavior and all links work.
- Future updates do not require the local Next.js repo unless a structural redesign is requested.

## Source links

- Framer pricing: https://www.framer.com/pricing
- Framer CMS: https://www.framer.com/cms/
- Framer Figma import/editable layers: https://www.framer.com/solutions/figma-to-html/
- Framer Forms: https://www.framer.com/forms/
- Framer code/CMS limitation note: https://www.framer.com/help/articles/issues-with-code-components-accessing-the-cms/
- Webflow pricing: https://webflow.com/pricing
- Webflow content editor role: https://help.webflow.com/hc/en-us/articles/33961251014931-Edit-site-content-as-a-content-editor
- Webflow client seats: https://webflow.com/updates/client-seats
- Webflow CMS collections: https://help.webflow.com/hc/en-us/articles/33961244391059-Manage-CMS-Collections
- Webflow GSAP interactions: https://help.webflow.com/hc/en-us/articles/42832301823635-Intro-to-Interactions-with-GSAP
- Wix Studio CMS: https://www.wix.com/studio
- Wix Studio client content mode: https://support.wix.com/en/article/studio-editor-understanding-how-clients-edit-their-site
- Wix dynamic pages: https://support.wix.com/en/article/cms-about-dynamic-pages
- Wix CMS permissions: https://support.wix.com/en/article/cms-collection-permissions-overview
- Squarespace pricing: https://www.squarespace.com/pricing
- Squarespace Fluid Engine: https://support.squarespace.com/hc/en-us/articles/6421525446541-Edit-your-site-with-Fluid-Engine
- Squarespace portfolio pages: https://support.squarespace.com/hc/en-us/articles/360035611791-Portfolio-pages
- Squarespace permissions: https://support.squarespace.com/hc/en-us/articles/206537297-Squarespace-permissions-explained
- Readymag pricing/plans: https://readymag.com/pricing
- Readymag collaborators: https://help.readymag.com/hc/en-us/articles/360029207812-Collaborating-on-projects
- Readymag editor modes: https://help.readymag.com/hc/en-us/articles/5063595458203-Editor-modes
