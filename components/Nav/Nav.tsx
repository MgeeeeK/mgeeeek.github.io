'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { PROJECTS } from '@/lib/projects'
import styles from './Nav.module.css'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
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

  function scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className={styles.nav} ref={navRef}>
      <div className={styles.links}>
        <div className={styles.workWrapper}>
          <button
            className={styles.workBtn}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            Work
          </button>
          {isOpen && (
            <div className={styles.dropdown}>
              <ul className={styles.dropdownList} role="list">
                {PROJECTS.map((project) => (
                  <li key={project.slug} className={styles.dropdownItem}>
                    <Link href={project.href} onClick={() => setIsOpen(false)}>
                      {project.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <a className={styles.contactBtn} href="#contact" onClick={scrollToContact}>
          Contact &amp; About
        </a>
      </div>
    </nav>
  )
}
