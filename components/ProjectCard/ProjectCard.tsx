import Link from 'next/link'
import styles from './ProjectCard.module.css'

type RevealVariant =
  | 'rise'
  | 'pop'
  | 'stamp'
  | 'tilt'
  | 'slide-left'
  | 'slide-right'
  | 'fade'

interface ProjectCardProps {
  label: string
  href: string
  variant?: 'pink' | 'purple'
  rotated?: boolean
  size?: 'normal' | 'large'
  /** Optional scroll-reveal variant (data-reveal) applied to the card. */
  reveal?: RevealVariant
  /** Stagger step (N × 80ms) for the scroll reveal. */
  revealDelay?: number
}

export default function ProjectCard({
  label,
  href,
  variant = 'pink',
  rotated = false,
  size = 'normal',
  reveal,
  revealDelay,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={`${styles.card} ${styles[variant]} ${rotated ? styles.rotated : ''} ${size === 'large' ? styles.large : ''}`}
      data-reveal={reveal}
      data-reveal-delay={reveal !== undefined ? revealDelay : undefined}
    >
      {/* Folder back: corner tab + back panel (tilt away as the folder opens) */}
      <div className={styles.blobCorner} />
      <div className={styles.blobTop} />
      {/* Paper sheets that rise out of the folder mouth on open */}
      <div className={styles.papers} aria-hidden="true">
        <span className={styles.paperA} />
        <span className={styles.paperB} />
        <span className={styles.paperC} />
      </div>
      {/* Front flap: hinges at the card's bottom edge and tips toward the viewer */}
      <div className={styles.front}>
        <div className={styles.label}>{label}</div>
      </div>
    </Link>
  )
}
