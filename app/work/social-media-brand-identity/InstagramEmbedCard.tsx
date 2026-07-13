'use client'

import styles from './page.module.css'
import MediaThumbnail from '@/components/MediaThumbnail/MediaThumbnail'

type RevealVariant = 'rise' | 'pop' | 'stamp' | 'tilt' | 'slide-left' | 'slide-right' | 'fade'

interface InstagramEmbedCardProps {
  href: string
  className?: string
  label: string
  /** Optional scroll-reveal variant, forwarded as a data-reveal attribute. */
  reveal?: RevealVariant
  /** Optional stagger step (× 80ms), forwarded as data-reveal-delay. */
  revealDelay?: number
}

/**
 * A media tile matching the Figma's black IG placeholders. Clicking it opens
 * the global in-page MediaLightbox (handled by the app-wide click interceptor),
 * so the reel plays inline without leaving the page — and without loading
 * 16 heavy Instagram iframes on first paint.
 */
export default function InstagramEmbedCard({
  href,
  className,
  label,
  reveal,
  revealDelay,
}: InstagramEmbedCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`${styles.mediaCard} ${className || ''}`}
      data-reveal={reveal}
      data-reveal-delay={reveal !== undefined ? revealDelay : undefined}
    >
      <MediaThumbnail href={href} />
      <span className={styles.playBadge} aria-hidden="true" />
    </a>
  )
}
