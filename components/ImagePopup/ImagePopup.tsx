'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './ImagePopup.module.css'

type ImagePopupProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> & {
  /** Full-size creative shown in the dialog. */
  src: string
  alt: string
  width: number
  height: number
  /** Dialog accessible name; defaults to `alt`. */
  label?: string
  /** Trigger contents (subject line text, thumbnail image, …). */
  children: ReactNode
}

/**
 * Wraps any trigger in a button that opens the given image full-size in a
 * centred dialog. Used for the Email Strategy subject lines and the Internal
 * Comms emailer thumbnails so both behave identically.
 */
export default function ImagePopup({
  src,
  alt,
  width,
  height,
  label,
  children,
  className,
  ...buttonProps
}: ImagePopupProps) {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className={`${styles.trigger} ${className ?? ''}`}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        {...buttonProps}
      >
        {children}
      </button>

      {open && createPortal(
        <div
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-label={label ?? alt}
          onClick={() => setOpen(false)}
        >
          <div className={styles.dialog} onClick={(event) => event.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <Image className={styles.image} src={src} alt={alt} width={width} height={height} priority />
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
