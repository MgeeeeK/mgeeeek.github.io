'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

const DESIGN_WIDTH = 1280

/**
 * Every case-study "DesktopCanvas" is authored with absolute Figma pixel
 * coordinates for an exact 1280px-wide layout. Below 1280px the canvas
 * itself used to shrink fluidly while its children kept their raw
 * coordinates, so content ran off the right edge (and some sections landed
 * fully outside the visible area) anywhere from 768–1279px. This wraps the
 * canvas in a fixed 1280px box and uniformly scales it down to fit the
 * available width instead, preserving the exact desktop layout at every size
 * down to the mobile breakpoint where a separate stacked layout takes over.
 */
export default function ScaledCanvas({
  height,
  ariaLabel,
  className,
  children,
}: {
  height: number
  ariaLabel?: string
  className?: string
  children: ReactNode
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [offsetX, setOffsetX] = useState(0)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const update = () => {
      const wrapperWidth = wrapper.offsetWidth
      const nextScale = Math.min(1, wrapperWidth / DESIGN_WIDTH)
      setScale(nextScale)
      // Percentage-based translate resolves against the element's own
      // (unscaled) box, so it can't be combined with scale() to center a
      // scaled box — compute the pixel offset directly instead.
      setOffsetX((wrapperWidth - DESIGN_WIDTH * nextScale) / 2)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(wrapper)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={className}
      aria-label={ariaLabel}
      style={{ position: 'relative', width: '100%', height: height * scale }}
    >
      <div
        style={{
          position: 'absolute',
          left: offsetX,
          top: 0,
          width: DESIGN_WIDTH,
          height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
