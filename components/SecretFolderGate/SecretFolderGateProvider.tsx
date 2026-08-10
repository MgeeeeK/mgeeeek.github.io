'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './SecretFolderGate.module.css'

const TRIGGER_ATTRIBUTE = 'data-secret-folder-gate'

export default function SecretFolderGateProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const trespassRef = useRef<HTMLAnchorElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    setOpen(false)
    window.setTimeout(() => lastFocused.current?.focus(), 0)
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return
      }

      const target = event.target as Element | null
      const trigger = target?.closest(`a[${TRIGGER_ATTRIBUTE}="true"]`)
      if (!trigger) return

      event.preventDefault()
      lastFocused.current = trigger as HTMLElement
      setOpen(true)
    }

    // Capture before Next's delegated Link handler can start navigation.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    trespassRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        return
      }

      if (event.key !== 'Tab') return

      const actions = Array.from(
        document.querySelectorAll<HTMLElement>('[data-secret-folder-dialog] a[href]'),
      )
      if (actions.length === 0) return

      const first = actions[0]
      const last = actions[actions.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [close, open])

  return (
    <>
      {children}
      {open && createPortal(
        <div
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="secret-folder-gate-title"
          onClick={close}
        >
          <div
            className={styles.dialog}
            data-secret-folder-dialog
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="secret-folder-gate-title" className={styles.title}>
              Oops, you&rsquo;re not allowed in there!
            </h2>
            <div className={styles.actions}>
              <Link
                ref={trespassRef}
                href="/work/fun-stuff"
                className={`${styles.action} ${styles.trespass}`}
                onClick={() => setOpen(false)}
              >
                Tresspass
              </Link>
              <Link
                href="/#work"
                className={`${styles.action} ${styles.goBack}`}
                onClick={() => setOpen(false)}
              >
                <span>
                  Go Back <br aria-hidden="true" />
                  to Projects
                </span>
              </Link>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
