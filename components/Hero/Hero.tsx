'use client'

import Image from 'next/image'
import styles from './Hero.module.css'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Decorative elements — absolutely positioned, desktop only */}
      <div className={styles.decoratives} aria-hidden="true">
        <Image
          src="/images/star1.svg"
          alt=""
          width={362}
          height={362}
          className={styles.star1}
        />
        <Image
          src="/images/ornament-a.svg"
          alt=""
          width={84}
          height={84}
          className={styles.ornamentA}
        />
        <Image
          src="/images/ornament-b.svg"
          alt=""
          width={30}
          height={30}
          className={styles.ornamentB}
        />
        <Image
          src="/images/ornament-c.svg"
          alt=""
          width={41}
          height={41}
          className={styles.ornamentC}
        />
        <div className={styles.stampWrapper}>
          <Image
            src="/images/stamp-badge.png"
            alt=""
            width={235}
            height={235}
            className={styles.stamp}
          />
        </div>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.welcomeLine}>
          <span className={styles.welcome}>Welcome </span>
          <span className={styles.to}>to</span>
        </div>
        <h1 className={styles.title}>Abhi&apos;s Portfolio</h1>

        <div className={styles.buttons}>
          <button
            className={styles.btnPrimary}
            onClick={() => scrollTo('work')}
          >
            Browse Projects
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => scrollTo('contact')}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  )
}
