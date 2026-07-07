'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  parseMedia,
  mediaEmbedUrl,
  isEmbeddable,
  type ParsedMedia,
} from '@/lib/parseMedia'
import styles from './MediaLightbox.module.css'

type OpenFn = (url: string) => void

const MediaLightboxContext = createContext<OpenFn>(() => {})

export function useMediaLightbox(): OpenFn {
  return useContext(MediaLightboxContext)
}

type ActiveMedia = {
  parsed: ParsedMedia
  embedUrl: string
  externalUrl: string
}

export default function MediaLightboxProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [active, setActive] = useState<ActiveMedia | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const open = useCallback<OpenFn>((url) => {
    const parsed = parseMedia(url)
    if (!parsed) {
      // Not embeddable — fall back to a new tab.
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    lastFocused.current = document.activeElement as HTMLElement | null
    setActive({ parsed, embedUrl: mediaEmbedUrl(parsed), externalUrl: url })
  }, [])

  const close = useCallback(() => {
    setActive(null)
    lastFocused.current?.focus?.()
  }, [])

  // Global interceptor: any click on an embeddable Instagram/YouTube link
  // opens the in-page lightbox instead of leaving the site. Leaves the real
  // <a href target="_blank"> intact for fallback, SEO, and modified-clicks.
  useEffect(() => {
    const embeddableHref = (el: Element | null | undefined): string | null => {
      const a = el?.closest?.('a[href]') as HTMLAnchorElement | null
      const href = a?.getAttribute('href') || ''
      return href && isEmbeddable(href) ? href : null
    }
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return
      }
      // Direct hit first; otherwise walk the stack of elements under the
      // pointer, since cards layer labels/images over the underlying anchor.
      let href = embeddableHref(e.target as HTMLElement | null)
      if (!href) {
        for (const el of document.elementsFromPoint(e.clientX, e.clientY)) {
          href = embeddableHref(el)
          if (href) break
        }
      }
      if (href) {
        e.preventDefault()
        open(href)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [open])

  useEffect(() => {
    if (!active) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    // focus the close button so Esc / tab work and screen readers land in the dialog
    const t = window.setTimeout(() => closeRef.current?.focus(), 0)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
    }
  }, [active, close])

  const isYouTube = active?.parsed.platform === 'youtube'

  return (
    <MediaLightboxContext.Provider value={open}>
      {children}
      {active && (
        <div
          className={styles.backdrop}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
        >
          <div
            className={`${styles.frame} ${isYouTube ? styles.youtube : styles.instagram}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={close}
              aria-label="Close"
            >
              ✕
            </button>
            <div className={styles.embedWrap}>
              <iframe
                key={active.embedUrl}
                className={styles.embed}
                src={active.embedUrl}
                title="Embedded media"
                loading="eager"
                allow="autoplay; encrypted-media; picture-in-picture; clipboard-write; fullscreen"
                allowFullScreen
                scrolling="no"
              />
            </div>
            <a
              className={styles.external}
              href={active.externalUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open on {isYouTube ? 'YouTube' : 'Instagram'} ↗
            </a>
          </div>
        </div>
      )}
    </MediaLightboxContext.Provider>
  )
}
