export interface Project {
  slug: string
  label: string
  href: string
}

// Canonical order for both the homepage grid and "Next Project" sequencing.
export const PROJECTS: Project[] = [
  { slug: 'social-media',   label: 'Social Media Brand Identity', href: '/work/social-media-brand-identity' },
  { slug: 'internal-comms', label: 'Internal Comms',              href: '/work/internal-comms' },
  { slug: 'fintech',        label: 'Fintech Schmintech',          href: '/work/fintech' },
  { slug: 'fully-filmy',    label: 'Fully Filmy',                 href: '/work/fully-filmy' },
  { slug: 'print-media',    label: 'Print Media',                 href: '/work/print-media' },
  { slug: 'email-strategy', label: 'Email Strategy',              href: '/work/email-strategy' },
]

const FUN_STUFF: Project = { slug: 'fun-stuff', label: 'Fun Stuff', href: '/work/fun-stuff' }

// Nav dropdown includes Fun Stuff so it's reachable from every screen size
// (the homepage's "Don't Look!" folder is desktop-only, so this is its
// only path on mobile). The main homepage grid intentionally omits it —
// that card stays a separate, half-hidden easter egg.
export const NAV_PROJECTS: Project[] = [...PROJECTS, FUN_STUFF]

// Full "Next Project" cycle: the six main case studies in order, ending on
// the Fun Stuff bonus page, then wrapping back to the first case study.
const PROJECT_CYCLE: Project[] = [...PROJECTS, FUN_STUFF]

export function getNextProject(currentSlug: string): Project {
  const i = PROJECT_CYCLE.findIndex((p) => p.slug === currentSlug)
  const next = PROJECT_CYCLE[(i + 1) % PROJECT_CYCLE.length]
  return next
}
