'use client'

import { useState } from 'react'
import { mediaThumbnailUrl, parseMedia } from '@/lib/parseMedia'
import styles from './MediaThumbnail.module.css'

type MediaThumbnailProps = {
  href: string
}

export default function MediaThumbnail({ href }: MediaThumbnailProps) {
  const [failed, setFailed] = useState(false)
  const media = parseMedia(href)

  if (!media || failed) return null

  return (
    // Platform thumbnail endpoints are dynamic redirects, so a plain img is intentional.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.thumbnail}
      src={mediaThumbnailUrl(media)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
