# Framer Pre-Implementation Research

Research checked: 2026-07-02

This document defines what is needed before rebuilding this Next.js portfolio in Framer.

## Recommendation

Use **Framer Pro** for the live migration.

Why Pro instead of Basic:

- This project has 8 possible pages/routes if `/work/fun-stuff` is included. Basic page limits are enough, but Pro gives more room for future pages.
- Pro includes 10 CMS collections, 100 GB bandwidth, site redirects, staging, and branching with previews.
- Staging and redirects are important for a client handover because we need QA before DNS cutover and URL continuity after launch.
- Framer currently lists Pro at `$30/month` on yearly billing, with additional full editors at `$20/editor/month` and content editors at `$10/editor/month`.

Basic can be used only if cost is the overriding constraint and the client accepts no staging/branching safety net. I do not recommend that for this handover.

## What accounts and access are needed

### Required

- A client-owned Framer account/workspace.
- A new Framer project created inside the client workspace.
- A paid Framer Pro site plan before launch. We can start rebuilding before DNS cutover, but launch should not happen without the paid plan.
- Access for the migration worker with:
  - `Design` permission for building pages/components.
  - `Content` permission for CMS and page content.
  - `Deploy` permission only when publishing/staging/live deployment is needed.
- Domain registrar/DNS access, or someone available to update records when the site is approved.
- Final form destination: email, Google Sheet, or webhook.
- Final resume PDF, because the current code links to `/resume.pdf` but the file is missing.

### Recommended

- Client remains the workspace owner and billing owner.
- Migration worker gets temporary full project access during build.
- Client is invited as Content Editor after build, not as full editor unless they need layout control.
- Keep one full editor/designer seat after launch only if the client wants ongoing structural edits.

## Is MCP required?

No separate MCP server is required.

Framer now has native **External Agents** for tools like Codex, Claude Code, Cursor, Gemini, and others. Framer's own FAQ says a separate Framer MCP server is not needed because the native External Agent connection gives compatible tools access to canvas, components, CMS, and project context.

For implementation, the likely setup is:

```bash
npx @framer/agent setup
```

The first connection requires browser authorization to the Framer project. We should not use an unofficial marketplace MCP plugin unless the official External Agent flow fails.

Current local setup, verified 2026-07-05:

- `npx @framer/agent@latest setup` has installed Framer skills into both `~/.agents/skills` and `~/.claude/skills`.
- Claude Code is installed locally (`claude --version` reported `2.1.199`).
- The project-specific Claude skill exists at `~/.claude/skills/framer-project-uj9T8YBB5n6l8waBIZIp`.
- `claude mcp list` does not show Framer, and that is expected. The official Framer External Agent path is not a separate Claude MCP server entry.
- Framer project URL for future Claude Code sessions: `https://framer.com/projects/Rational-Independence--uj9T8YBB5n6l8waBIZIp`.

### Agent limitations to plan around

Official Framer docs say external agents currently cannot:

- update some site/project settings like project names and domains,
- assign overrides to nodes,
- access analytics data.

So DNS, project naming, final domain setup, analytics review, and some advanced interaction wiring may still need manual Framer UI work.

## Are extra AI credits or a higher plan needed?

Not initially.

Framer pricing currently says External Agents are **free during preview**. Framer Agents and AI workflows use monthly AI credits, and Pro includes more credits than Basic. For this migration, the main cost driver is the site plan and editor seats, not AI credits.

If we rely heavily on Framer's native AI Agent for large visual rewrites, we may need extra credits later. For a controlled migration from this repo, I would avoid depending on native AI credits and treat the external-agent route as an implementation accelerator, not a requirement.

## Current project scope to migrate

Source app:

- Next.js 16.2.6, React 19.2.4.
- `npm run build` passed on the previous audit and prerendered all routes.
- Routes:
  - `/`
  - `/work/email-strategy`
  - `/work/fintech`
  - `/work/fully-filmy`
  - `/work/fun-stuff`
  - `/work/internal-comms`
  - `/work/print-media`
  - `/work/social-media-brand-identity`
- Public work grid currently lists 6 work items in `lib/projects.ts`.
- `/work/fun-stuff` exists but is not in that work grid; include/exclude must be confirmed before Framer build.

Assets under `public`:

- 61 SVG files
- 30 PNG files
- 9 JPG files
- 4 TTF font files
- 2 `.DS_Store` files to exclude from handoff
- 1 `.nojekyll` file that is not relevant to Framer

Framer asset imports needed:

- All files under `public/images`.
- Helvetica TTF files from `public/fonts`.
- Playfair Display or equivalent Google font in Framer.
- Final `resume.pdf`.
- Favicon/social share image if the client has one.

## Features to rebuild in Framer

### Must-have

- Homepage with nav, hero, work grid, about/contact section.
- All included case-study pages.
- Responsive desktop/tablet/mobile layouts, including 320px narrow phone check.
- Project navigation and CTAs.
- Contact form replacing the current mailto form.
- Resume download.
- External Instagram/YouTube links.
- Basic SEO metadata and social previews.
- Redirects if any route paths change.

### Should-have

- Scroll reveal effects.
- Hover/tap polish on buttons/cards.
- Light motion on decorative elements.
- Media cards for Instagram/YouTube.
- Simple client-editable CMS collection for project cards and future simple projects.

### Optional polish

- Exact custom cursor.
- Exact magnetic hover physics.
- Exact parallax layer behavior.
- Exact in-page Instagram/YouTube lightbox.

These optional items are custom-coded in the current repo. In Framer they should be approximated with native interactions unless the client explicitly values exact parity over editability.

## CMS decision

Use Framer CMS lightly.

Recommended CMS collections:

- `Projects`: label, slug, order, card thumbnail/decor, short description, live page link.
- Optional `Simple Case Studies`: only for future projects that can use a repeatable template.

Do not force the existing bespoke case studies into one CMS template unless the client agrees to simplify them. The current pages use custom compositions, absolute positioning, and unique responsive layouts.

## Launch checklist

Before build:

- Confirm Framer Pro plan owner and workspace.
- Confirm whether `/work/fun-stuff` is included.
- Provide final resume PDF.
- Confirm contact form destination.
- Confirm domain registrar access or DNS owner.
- Confirm whether exact lightbox/custom cursor/parallax behavior is required.

Before DNS cutover:

- All pages rebuilt and reviewed in Framer preview/staging.
- All links and forms tested.
- Responsive QA completed at desktop, tablet, phone, and 320px.
- SEO titles/descriptions/social previews added.
- Redirects configured for any changed URLs.
- Client signs off on preview.

After launch:

- Client invited as Content Editor.
- Migration worker access reduced or removed.
- Short handover recording/document delivered.

## Source links

- Framer pricing: https://www.framer.com/pricing
- Framer roles and permissions: https://www.framer.com/help/articles/member-roles-and-permissions/
- Framer External Agents overview: https://www.framer.com/agents/external/
- Framer External Agents setup/help: https://www.framer.com/help/articles/use-external-agents-with-framer/
- Framer AI credits: https://www.framer.com/help/articles/how-ai-credits-and-agents-pricing-work/
- Framer on-page editing: https://www.framer.com/help/articles/on-page-editing/
- Framer Forms: https://www.framer.com/forms/
- Framer custom domains: https://www.framer.com/help/articles/how-to-connect-a-custom-domain/
- Framer Figma import: https://www.framer.com/solutions/figma-to-html/
