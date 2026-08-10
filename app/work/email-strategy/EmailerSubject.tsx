'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './page.module.css'

type EmailerSubjectProps = {
  className: string
  imageSrc: string
  subject: string
  revealDelay?: number
}

export default function EmailerSubject({
  className,
  imageSrc,
  subject,
  revealDelay,
}: EmailerSubjectProps) {
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
        className={`${className} ${styles.subjectButton}`}
        onClick={() => setOpen(true)}
        data-reveal="tilt"
        data-reveal-delay={revealDelay}
        aria-haspopup="dialog"
      >
        {subject}
      </button>

      {open && createPortal(
        <div
          className={styles.emailerBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={subject}
          onClick={() => setOpen(false)}
        >
          <div className={styles.emailerDialog} onClick={(event) => event.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              className={styles.emailerClose}
              onClick={() => setOpen(false)}
              aria-label="Close emailer"
            >
              ✕
            </button>
            <Image
              className={styles.emailerImage}
              src={imageSrc}
              alt={`Emailer for ${subject}`}
              width={1024}
              height={1536}
              priority
            />
          </div>
        </div>
        ,
        document.body,
      )}
    </>
  )
}
