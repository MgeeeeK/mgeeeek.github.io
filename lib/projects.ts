export interface Project {
  slug: string
  label: string
  href: string
}

export const PROJECTS: Project[] = [
  { slug: 'social-media',   label: 'Social Media Brand Identity', href: '#' },
  { slug: 'internal-comms', label: 'Internal Comms',              href: '#' },
  { slug: 'fintech',        label: 'Fintech Schmintech',          href: '#' },
  { slug: 'fully-filmy',    label: 'Fully Filmy',                 href: '#' },
  { slug: 'print-media',    label: 'Print Media',                 href: '#' },
  { slug: 'email-strategy', label: 'Email Strategy',              href: '#' },
]
