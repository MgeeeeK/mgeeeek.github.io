'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './page.module.css'

interface InstagramEmbedCardProps {
  href: string
  className?: string
  label: string
}

function getInstagramEmbedUrl(href: string) {
  try {
    const url = new URL(href)
    const [kind, shortcode] = url.pathname.split('/').filter(Boolean)
    if (!shortcode) return href

    const embedKind = kind === 'reel' || kind === 'tv' ? kind : 'p'
    return `https://www.instagram.com/${embedKind}/${shortcode}/embed/`
  } catch {
    return href
  }
}

export default function InstagramEmbedCard({
  href,
  className,
  label,
}: InstagramEmbedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [shouldEmbed, setShouldEmbed] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const embedUrl = useMemo(() => getInstagramEmbedUrl(href), [href])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    if (!('IntersectionObserver' in window)) {
      setShouldEmbed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldEmbed(true)
          observer.disconnect()
        }
      },
      { rootMargin: '700px 0px' }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`${styles.mediaCard} ${className || ''} ${shouldEmbed ? styles.mediaCardActive : ''}`}
      data-embedded={shouldEmbed ? 'true' : 'false'}
    >
      {!isLoaded && <span className={styles.embedLoading}>Loading embed</span>}
      {shouldEmbed && (
        <iframe
          className={styles.embedFrame}
          src={embedUrl}
          title={label}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  )
}
