'use client'

import { useEffect, useRef } from 'react'

/**
 * Pointer-parallax container. Descendants with `data-depth="0.4"` drift
 * toward/away from the pointer proportionally to their depth (0 = pinned,
 * 1 = full travel). Applies the individual CSS `translate` property so it
 * composes with any `transform`-based animation already on the element.
 * No-ops on coarse pointers and reduced motion.
 */
export default function ParallaxLayer({
  children,
  className,
  maxShift = 30,
}: {
  children: React.ReactNode
  className?: string
  maxShift?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = ref.current
    if (!root) return

    const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-depth]'))
    if (layers.length === 0) return

    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0
    let raf = 0
    let running = false

    const apply = () => {
      curX += (targetX - curX) * 0.08
      curY += (targetY - curY) * 0.08
      for (const el of layers) {
        const depth = parseFloat(el.dataset.depth || '0')
        el.style.translate = `${(curX * depth).toFixed(2)}px ${(curY * depth).toFixed(2)}px`
      }
      if (Math.abs(targetX - curX) + Math.abs(targetY - curY) > 0.05) {
        raf = requestAnimationFrame(apply)
      } else {
        running = false
      }
    }

    const kick = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(apply)
      }
    }

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2 * maxShift
      targetY = (e.clientY / window.innerHeight - 0.5) * 2 * maxShift
      kick()
    }
    const onLeave = () => {
      targetX = 0
      targetY = 0
      kick()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [maxShift])

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  )
}
