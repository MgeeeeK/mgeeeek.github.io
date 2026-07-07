import type { CSSProperties } from 'react'
import styles from './Ambient.module.css'

type Pos = {
  left?: number | string
  top?: number | string
  right?: number | string
  bottom?: number | string
  size?: number
  opacity?: number
  rotate?: number
  className?: string
  style?: CSSProperties
}

function base({ left, top, right, bottom, size, opacity, rotate, style }: Pos): CSSProperties {
  return {
    left,
    top,
    right,
    bottom,
    width: size,
    height: size,
    opacity,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    ...style,
  }
}

/** Big spinning starburst SVG (reuses the homepage star assets). Place behind content. */
export function Starburst({
  src = '/images/star1.svg',
  reverse,
  ...pos
}: Pos & { src?: string; reverse?: boolean }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`${styles.obj} ${reverse ? styles.starburstReverse : styles.starburst} ${pos.className ?? ''}`}
      style={base(pos)}
    />
  )
}

/** Slow-rotating dashed halo ring. Usually sits partly off-canvas. */
export function Halo({ lime, ...pos }: Pos & { lime?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.obj} ${styles.halo} ${lime ? styles.haloLime : ''} ${pos.className ?? ''}`}
      style={base(pos)}
    />
  )
}

/** Small twinkling star ornament. */
export function Sparkle({
  src = '/images/star2.svg',
  delay = 0,
  ...pos
}: Pos & { src?: string; delay?: number }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`${styles.obj} ${styles.sparkle} ${pos.className ?? ''}`}
      style={{ ...base(pos), animationDelay: `${delay}s` }}
    />
  )
}

/** Wrapper that pins decoration behind content within a positioned parent. */
export function AmbientLayer({ children }: { children: React.ReactNode }) {
  return <div className={styles.layer} aria-hidden="true">{children}</div>
}
