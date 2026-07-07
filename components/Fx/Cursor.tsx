'use client'

import { useEffect } from 'react'

const DROP_COLORS = ['#ff43b7', '#d586ff', '#bbff6c', '#ff99d8', '#ba43ff']
const GLYPHS = ['a', 'e', 'w', 'k', 'B', 'g', '&', '!', '?', ';']

const TRAIL_LIFE = 550 // ms an ink point stays wet on the page
const TRAIL_MAX = 140

// Nib tip is at (3, 41) in the 44×44 viewBox — fx.css offsets and pivots there.
const QUILL_SVG = `<svg viewBox="0 0 44 44" width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 36 C9 24 16 11 30 4 C34 2 38 2 40 3 C39 8 36 14 31 20 C26 26 19 32 13 35 C11 36 9 36.3 8 36 Z" fill="#ffc4e8" stroke="black" stroke-width="2" stroke-linejoin="round"/>
  <path d="M26 9 L23.5 16 M19 18 L16.5 25" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M8 36 C13 30 22 20 34 8" stroke="black" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M8 36 L3 41" stroke="black" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="3.8" cy="40.2" r="1.7" fill="#ff43b7"/>
</svg>`

/**
 * Custom copywriter cursor: a feather quill whose nib tip rides the pointer,
 * leaning into horizontal travel like a hand writing. A hot-pink ink stroke
 * trails the nib on a fullscreen canvas and fades like drying ink. Clicks
 * splat an ink blot with flying droplets and serif glyphs. Hovering
 * interactive elements dips the quill to writing angle and thickens the ink.
 * Fine pointers only; honors reduced motion. Styles live in app/fx.css.
 */
export default function Cursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const docEl = document.documentElement
    docEl.classList.add('fx-cursor')

    const quill = document.createElement('div')
    quill.className = 'fx-quill'
    quill.setAttribute('aria-hidden', 'true')
    quill.innerHTML = QUILL_SVG

    const canvas = document.createElement('canvas')
    canvas.className = 'fx-ink'
    canvas.setAttribute('aria-hidden', 'true')
    document.body.append(canvas, quill)
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx?.scale(dpr, dpr)
    }
    resize()

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let prevX = x
    let tilt = 0
    let shown = false
    let hot = false
    let raf = 0
    let writeTimer = 0
    const trail: { x: number; y: number; t: number }[] = []

    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element &&
      !!target.closest('a, button, [role="button"], input, textarea, select, label, summary')

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!shown) {
        shown = true
        prevX = x
        quill.classList.add('is-on')
      }
      quill.style.translate = `${x}px ${y}px`
      trail.push({ x, y, t: performance.now() })
      if (trail.length > TRAIL_MAX) trail.shift()
      hot = isInteractive(e.target)
      docEl.classList.toggle('fx-cursor-hot', hot)
    }

    const onLeave = () => {
      shown = false
      quill.classList.remove('is-on')
    }

    const onDown = (e: PointerEvent) => {
      quill.classList.add('is-writing')
      window.clearTimeout(writeTimer)
      writeTimer = window.setTimeout(() => quill.classList.remove('is-writing'), 160)

      const splat = document.createElement('div')
      splat.className = 'fx-splat'
      splat.setAttribute('aria-hidden', 'true')
      splat.style.translate = `${e.clientX}px ${e.clientY}px`
      splat.appendChild(document.createElement('i'))
      for (let i = 0; i < 5; i++) {
        const drop = document.createElement('span')
        drop.style.setProperty('--a', `${i * 72 + 20}deg`)
        drop.style.setProperty('--d', `${30 + (i % 3) * 14}px`)
        drop.style.setProperty('--c', DROP_COLORS[i % DROP_COLORS.length])
        splat.appendChild(drop)
      }
      for (let i = 0; i < 2; i++) {
        const glyph = document.createElement('b')
        glyph.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        glyph.style.setProperty('--a', `${-140 + i * 100 + Math.random() * 30}deg`)
        glyph.style.setProperty('--d', `${34 + Math.random() * 14}px`)
        glyph.style.setProperty('--r', `${i ? 24 : -20}deg`)
        splat.appendChild(glyph)
      }
      document.body.appendChild(splat)
      window.setTimeout(() => splat.remove(), 850)
    }

    const loop = () => {
      // lean into horizontal travel, pivoting at the nib tip
      const vx = x - prevX
      prevX = x
      tilt += (Math.max(-14, Math.min(18, vx * 1.4)) - tilt) * 0.16
      quill.style.rotate = `${tilt.toFixed(2)}deg`

      if (ctx) {
        const now = performance.now()
        while (trail.length && now - trail[0].t > TRAIL_LIFE) trail.shift()
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        ctx.lineCap = 'round'
        for (let i = 1; i < trail.length; i++) {
          const age = (now - trail[i].t) / TRAIL_LIFE
          ctx.strokeStyle = `rgba(255, 67, 183, ${(1 - age) * 0.85})`
          ctx.lineWidth = (hot ? 4.4 : 2.8) * (1 - age * 0.65)
          ctx.beginPath()
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
          ctx.lineTo(trail[i].x, trail[i].y)
          ctx.stroke()
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('resize', resize)
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(writeTimer)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('resize', resize)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      docEl.classList.remove('fx-cursor', 'fx-cursor-hot')
      quill.remove()
      canvas.remove()
    }
  }, [])

  return null
}
