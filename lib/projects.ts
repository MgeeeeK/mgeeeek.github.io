export interface Project {
  slug: string
  label: string
  href: string
}

export const PROJECTS: Project[] = [
  { slug: 'social-media',   label: 'Social Media Brand Identity', href: '/work/social-media-brand-identity' },
  { slug: 'internal-comms', label: 'Internal Comms',              href: '/work/internal-comms' },
  { slug: 'fintech',        label: 'Fintech Schmintech',          href: '/work/fintech' },
  { slug: 'fully-filmy',    label: 'Fully Filmy',                 href: '/work/fully-filmy' },
  { slug: 'print-media',    label: 'Print Media',                 href: '/work/print-media' },
  { slug: 'email-strategy', label: 'Email Strategy',              href: '/work/email-strategy' },
]
