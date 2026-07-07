'use client'

import { useEffect, useRef } from 'react'

/**
 * Magnetic hover wrapper: while the pointer is over the wrapped element it
 * leans toward the pointer; on leave it springs back. Wrap a single button
 * or link. Uses the individual `translate` property (composes with the
 * child's own hover transforms). Inert on coarse pointers / reduced motion.
 */
export default function Magnetic({
  children,
  strength = 0.28,
}: {
  children: React.ReactNode
  strength?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      el.style.transition = 'translate 160ms ease-out'
      el.style.translate = `${(dx * strength).toFixed(1)}px ${(dy * strength).toFixed(1)}px`
    }
    const onLeave = () => {
      el.style.transition = 'translate 420ms cubic-bezier(.18, 1.6, .4, 1)'
      el.style.translate = '0px 0px'
    }

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [strength])

  return (
    <span ref={ref} style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}
