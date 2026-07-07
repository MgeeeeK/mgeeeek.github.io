import Image from 'next/image'
import styles from './Hero.module.css'
import ParallaxLayer from '@/components/Fx/ParallaxLayer'
import Magnetic from '@/components/Fx/Magnetic'

const WELCOME = 'Welcome'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.contentWrap}>
        {/* Decorative elements — absolutely positioned, pointer-parallax */}
        <ParallaxLayer className={styles.decoratives} maxShift={26}>
          <Image
            src="/images/star1.svg"
            alt=""
            width={362}
            height={362}
            className={styles.star1}
            loading="eager"
            data-depth="0.5"
          />
          <Image
            src="/images/ornament-a.svg"
            alt=""
            width={84}
            height={84}
            className={styles.ornamentA}
            data-depth="0.9"
          />
          <Image
            src="/images/ornament-b.svg"
            alt=""
            width={30}
            height={30}
            className={styles.ornamentB}
            data-depth="1"
          />
          <Image
            src="/images/ornament-c.svg"
            alt=""
            width={41}
            height={41}
            className={styles.ornamentC}
            data-depth="0.75"
          />
          <div className={styles.stampWrapper} data-depth="0.3">
            <Image
              src="/images/stamp-badge.png"
              alt=""
              width={235}
              height={235}
              className={styles.stamp}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </ParallaxLayer>

        {/* Main content */}
        <div className={styles.content}>
          <div className={styles.welcomeLine}>
            <span className={styles.welcome} aria-hidden="true">
              {WELCOME.split('').map((char, i) => (
                <span
                  key={i}
                  className={styles.letter}
                  style={{ ['--i' as string]: i }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className={styles.srOnly}>Welcome to</span>
            <span className={styles.to} aria-hidden="true">
              to
            </span>
          </div>
          <h1 className={styles.title}>
            <span className={styles.titleWord}>Abhi&apos;s</span>{' '}
            <span className={styles.titleWordB}>Portfolio</span>
          </h1>

          <div className={styles.buttons}>
            <Magnetic>
              <a href="#work" className={styles.btnPrimary}>
                Browse Projects
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className={styles.btnSecondary}>
                Get in Touch
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
