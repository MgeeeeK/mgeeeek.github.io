'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

const DESIGN_WIDTH = 1280

/**
 * Every case-study "DesktopCanvas" is authored with absolute Figma pixel
 * coordinates for an exact 1280px-wide layout. This wraps the canvas in a
 * fixed 1280px box and uniformly scales it to the available width: down on
 * tablets (until the mobile breakpoint's stacked layout takes over) and UP on
 * wide screens, so the poster fills any monitor the way Figma's zoom-to-fit
 * does and edge-bleeding art (e.g. the email mic) stays off-screen at every
 * width. Overflow is clipped so bleed never scrolls.
 *
 * The sticky page header is passed via `header` and rendered OUTSIDE the
 * scaled box, so it stays the same fluid 60px+40px bar as the homepage nav
 * (sticky offsets and 100vw widths misbehave inside a transformed ancestor).
 * The Figma frames reserve the top `headerHeight` px for that bar, so the
 * scaled box is pulled up underneath the real header by that amount.
 */
export default function ScaledCanvas({
  height,
  ariaLabel,
  className,
  header,
  headerHeight = 100,
  children,
}: {
  height: number
  ariaLabel?: string
  className?: string
  header?: ReactNode
  headerHeight?: number
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
      const nextScale = wrapperWidth / DESIGN_WIDTH
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
      className={className}
      aria-label={ariaLabel}
      style={{ position: 'relative', width: '100%', height: 'auto' }}
    >
      {header}
      <div
        ref={wrapperRef}
        style={{
          position: 'relative',
          width: '100%',
          height: height * scale,
          overflow: 'clip',
          marginTop: header ? -headerHeight : 0,
        }}
      >
        <div
          data-scaled-canvas=""
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
    </div>
  )
}
