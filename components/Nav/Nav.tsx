'use client'

import {
  useState,
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_PROJECTS } from '@/lib/projects'
import styles from './Nav.module.css'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  // On the homepage the same project list is already visible one scroll
  // down as the folder grid — a dropdown menu just duplicates it. On every
  // case-study page there's no visible project list on screen, so the
  // dropdown is the only way to jump laterally to another project.
  const isHome = usePathname() === '/'

  useEffect(() => {
    function handleClickOutside(e: globalThis.MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  function scrollToContact(event: ReactMouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    window.history.pushState(null, '', '#contact')
    setIsOpen(false)
  }

  function scrollToWork(event: ReactMouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
    window.history.pushState(null, '', '#work')
  }

  return (
    <nav className={styles.nav} ref={navRef}>
      <div className={styles.links}>
        {isHome ? (
          <a className={styles.contactBtn} href="#work" onClick={scrollToWork}>
            Work
          </a>
        ) : (
          <div className={styles.workWrapper}>
            <button
              className={styles.workBtn}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
            >
              Work
              <span
                className={isOpen ? `${styles.caret} ${styles.caretOpen}` : styles.caret}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            {isOpen && (
              <div className={styles.dropdown}>
                <ul className={styles.dropdownList} role="list">
                  {NAV_PROJECTS.map((project, index) => (
                    <li
                      key={project.slug}
                      className={styles.dropdownItem}
                      style={{ '--cascade': index } as CSSProperties}
                    >
                      <Link href={project.href} onClick={() => setIsOpen(false)}>
                        <span className={styles.itemMark} aria-hidden="true">
                          ✦
                        </span>
                        {project.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <a className={styles.contactBtn} href="#contact" onClick={scrollToContact}>
          Contact &amp; About
        </a>
      </div>
    </nav>
  )
}
