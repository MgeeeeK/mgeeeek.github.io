'use client'

import { useMediaLightbox } from './MediaLightboxProvider'
import { isEmbeddable } from '@/lib/parseMedia'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

/**
 * Drop-in replacement for an external media <a>. If the href is an embeddable
 * Instagram/YouTube link, clicking opens the in-page lightbox instead of
 * navigating away. Otherwise it behaves like a normal external link.
 * Keeps the real href for graceful fallback, SEO, and middle-click.
 */
export default function LightboxAnchor({ href, children, onClick, ...rest }: Props) {
  const open = useMediaLightbox()
  const embeddable = isEmbeddable(href)

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => {
        onClick?.(e)
        if (embeddable && !e.defaultPrevented && !e.metaKey && !e.ctrlKey) {
          e.preventDefault()
          open(href)
        }
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
