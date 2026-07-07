'use client'

import { useEffect } from 'react'

/**
 * Site-wide scroll-reveal engine.
 *
 * Any element with `data-reveal="<variant>"` starts hidden (CSS in app/fx.css,
 * gated on `html.fx-ready` + no reduced-motion) and gets `data-revealed`
 * set when it scrolls into view. Variants animate the individual CSS
 * `translate` / `scale` / `rotate` properties so they compose safely with
 * existing `transform` values on the element.
 *
 * Optional: `data-reveal-delay="3"` → animation-delay of 3 × 80ms.
 */
export default function FxProvider() {
  useEffect(() => {
    const docEl = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      docEl.classList.remove('fx-ready')
      return
    }
    docEl.classList.add('fx-ready')

    const pending = new Set<Element>()

    const reveal = (el: Element) => {
      el.setAttribute('data-revealed', el.getAttribute('data-reveal') || 'rise')
      pending.delete(el)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target)
            io.unobserve(entry.target)
          } else if (entry.boundingClientRect.bottom < 0) {
            // Already scrolled past (anchor jump) — never leave content hidden.
            reveal(entry.target)
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    const observe = (el: Element) => {
      const delay = el.getAttribute('data-reveal-delay')
      if (delay) (el as HTMLElement).style.setProperty('--rd', delay)
      pending.add(el)
      io.observe(el)
    }

    // Safety net: a fast fling can carry an element across the viewport
    // between observer ticks (ratio stays 0, no callback). Sweep on scroll
    // and reveal anything that ended up above the fold.
    let sweepRaf = 0
    const onScroll = () => {
      if (sweepRaf) return
      sweepRaf = requestAnimationFrame(() => {
        sweepRaf = 0
        for (const el of pending) {
          if (el.getBoundingClientRect().bottom < 0) {
            reveal(el)
            io.unobserve(el)
          }
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const scan = (root: ParentNode) => {
      root
        .querySelectorAll('[data-reveal]:not([data-revealed])')
        .forEach(observe)
    }
    scan(document.body)

    // Catch client-side navigations: new page content mounts into the DOM.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return
          const el = node as Element
          if (el.hasAttribute('data-reveal') && !el.hasAttribute('data-revealed')) {
            observe(el)
          }
          scan(el)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(sweepRaf)
    }
  }, [])

  return null
}
