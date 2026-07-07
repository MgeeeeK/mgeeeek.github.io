import Image from 'next/image'
import Link from 'next/link'
import { AmbientLayer, Starburst, Halo, Sparkle } from '@/components/Ambient/Ambient'
import Magnetic from '@/components/Fx/Magnetic'
import ScaledCanvas from '@/components/ScaledCanvas/ScaledCanvas'
import { getNextProject } from '@/lib/projects'
import styles from './page.module.css'

const ASSET_PATH = '/images/fully-filmy'
const NEXT = getNextProject('fully-filmy')

const YT_KREDITBEE = 'https://www.youtube.com/watch?v=MhybE-eBjn0'
const YT_SCHNEIDER_BIG = 'https://www.youtube.com/watch?v=Qwg0dtuELIc'
const YT_SCHNEIDER_TILT = 'https://www.youtube.com/watch?v=AS58Xaa19BI'
const YT_EPSON_BIG = 'https://www.youtube.com/watch?v=wRMV6qrXx-s'
const YT_EPSON_SMALL = 'https://www.youtube.com/watch?v=TPIzrnSt-1k'

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Project navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#contact">Contact &amp; About</Link>
      </nav>
      <div className={styles.projectStrip}>
        <span>Ad Films</span>
      </div>
    </header>
  )
}

function DesktopCanvas() {
  return (
    <ScaledCanvas className={styles.canvas} ariaLabel="Ad Films case study" height={2723}>
      <Header />

      <AmbientLayer>
        {/* top-right: open space beside the KreditBee text column */}
        <Halo right={-150} top={120} size={360} />
        <Sparkle left={1190} top={300} size={30} delay={0.2} />
        <Sparkle left={840} top={560} size={20} delay={1.1} />
        <Sparkle left={1130} top={760} size={24} delay={0.6} />
        {/* right-middle: large empty zone beside the Schneider stack */}
        <Starburst left={840} top={1380} size={520} opacity={0.45} reverse />
        <Sparkle left={1080} top={1180} size={26} delay={0.9} />
        {/* drifting off the left edge below the tilted cards */}
        <Halo lime left={-130} top={1760} size={320} />
        <Sparkle left={700} top={2010} size={22} delay={1.4} />
        {/* beside the Epson section */}
        <Sparkle left={1150} top={2260} size={28} delay={0.4} />
        <Sparkle left={400} top={2480} size={18} delay={1.7} />
        {/* top-left: open air above the title */}
        <Sparkle left={750} top={108} size={22} delay={0.8} />
        {/* bottom-right footer zone is otherwise empty */}
        <Starburst left={980} top={2400} size={290} opacity={0.4} />
        <Sparkle left={560} top={2620} size={20} delay={1.2} />
      </AmbientLayer>

      {/* ---- Title block ---- */}
      <p
        className={`${styles.abs} ${styles.serifBold}`}
        data-reveal="rise"
        style={{
          left: 79,
          top: 153,
          width: 747,
          height: 63,
          fontSize: 48,
          lineHeight: '83.655%',
          color: 'black',
        }}
      >
        Turning scripts into action{' '}
      </p>
      <p
        className={`${styles.abs} ${styles.helvBold}`}
        data-reveal="rise"
        data-reveal-delay="1"
        style={{
          left: 79,
          top: 222,
          width: 776,
          height: 23,
          fontSize: 20,
          lineHeight: 1.115,
          color: '#ff1fa9',
        }}
      >
        A love affair with films
      </p>

      {/* ---- KreditBee text column ---- */}
      <p
        className={`${styles.abs} ${styles.serifBold}`}
        data-reveal="rise"
        style={{
          left: 900,
          top: 278,
          width: 300,
          height: 23,
          fontSize: 24,
          lineHeight: 1.115,
          color: 'black',
        }}
      >
        Har Tarraki Mein Sath
      </p>
      <p
        className={`${styles.abs} ${styles.helvOblique}`}
        data-reveal="rise"
        data-reveal-delay="1"
        style={{
          left: 900,
          top: 322,
          width: 216,
          height: 23,
          fontSize: 20,
          lineHeight: 1.115,
          color: '#ff43b7',
        }}
      >
        Kreditbee
      </p>
      <div
        className={`${styles.abs} ${styles.helv}`}
        data-reveal="rise"
        data-reveal-delay="2"
        style={{
          left: 900,
          top: 367,
          width: 300,
          height: 442,
          fontSize: 15,
          lineHeight: 1.115,
          color: 'black',
          textAlign: 'justify',
          whiteSpace: 'pre-wrap',
        }}
      >
        <p style={{ marginBottom: 0, lineHeight: 1.115 }}>
          Every time you level up, you gain more questioning looks from nosy neighbours.
          <br aria-hidden />
          This film builds on that shared experience and brings it to life by letting us hear those unfiltered thoughts out loud. It captures how quickly people are ready to judge when they see someone doing a little better for themselves.
          <br aria-hidden />
          <br aria-hidden />
        </p>
        <p style={{ lineHeight: 1.115, margin: 0 }}>
          Even though the commentary cannot be prevented, it doesn&rsquo;t have to affect you. Because through it all, you&rsquo;ve got KreditBee backing you up and helping you move forward without second-guessing your choices.
        </p>
      </div>

      {/* ---- TV (multi-part vector) ---- */}
      {/* straight legs */}
      <div className={styles.abs} data-reveal="pop" data-reveal-delay="1" style={{ left: 125, top: 631, width: 130, height: 202 }}>
        <div className={styles.tvLegStraight} style={{ width: 130, height: 202 }} />
      </div>
      <div className={styles.abs} data-reveal="pop" data-reveal-delay="1" style={{ left: 679, top: 631, width: 130, height: 202 }}>
        <div className={styles.tvLegStraight} style={{ width: 130, height: 202 }} />
      </div>
      {/* tilted legs */}
      <div
        className={styles.abs}
        data-reveal="pop"
        data-reveal-delay="2"
        style={{
          left: 133.77,
          top: 587,
          width: 168.232,
          height: 212.461,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(29.31deg) skewX(10.79deg) scaleY(0.98)' }}>
          <div style={{ background: '#ff43b7', width: 137.11, height: 153.279 }} />
        </div>
      </div>
      <div
        className={styles.abs}
        data-reveal="pop"
        data-reveal-delay="2"
        style={{
          left: 632.12,
          top: 587,
          width: 168.232,
          height: 212.462,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(-29.31deg) skewX(-10.79deg) scaleY(0.98)' }}>
          <div style={{ background: '#ff43b7', width: 137.11, height: 153.279 }} />
        </div>
      </div>
      {/* TV body */}
      <div
        className={`${styles.abs} ${styles.tvBody}`}
        data-reveal="pop"
        style={{ left: 80, top: 281, width: 780, height: 400 }}
      />
      {/* TV screen = clickable video link */}
      <a
        className={`${styles.abs} ${styles.screenLink}`}
        href={YT_KREDITBEE}
        target="_blank"
        rel="noreferrer"
        aria-label="Watch KreditBee — Har Tarraki Mein Sath"
        data-reveal="pop"
        data-reveal-delay="3"
        style={{ left: 114, top: 317, width: 586, height: 330, cursor: 'pointer', display: 'block' }}
      >
        <div style={{ position: 'absolute', inset: '-1.52% -0.85%' }}>
          <Image
            src={`${ASSET_PATH}/rectangle11.svg`}
            alt=""
            fill
            sizes="600px"
            style={{ display: 'block' }}
          />
        </div>
        <span className={styles.playBadge} aria-hidden="true" />
      </a>
      {/* TV buttons */}
      <div
        className={`${styles.abs} ${styles.tvButton}`}
        data-reveal="pop"
        data-reveal-delay="4"
        style={{ left: 720, top: 310, width: 120, height: 22 }}
      />
      <div
        className={`${styles.abs} ${styles.tvButton}`}
        data-reveal="pop"
        data-reveal-delay="5"
        style={{ left: 720, top: 348, width: 120, height: 22 }}
      />
      <div
        className={`${styles.abs} ${styles.tvButton}`}
        data-reveal="pop"
        data-reveal-delay="6"
        style={{ left: 720, top: 388, width: 120, height: 22 }}
      />

      {/* ---- Schneider pink panel ---- */}
      <div className={styles.abs} data-reveal="rise" style={{ left: 80, top: 778, width: 360, height: 723 }}>
        <Image src={`${ASSET_PATH}/rectangle21.svg`} alt="" fill sizes="360px" style={{ display: 'block' }} />
      </div>
      <p
        className={`${styles.abs} ${styles.serifBold}`}
        data-reveal="rise"
        data-reveal-delay="1"
        style={{
          left: 120,
          top: 938,
          width: 240,
          height: 23,
          fontSize: 24,
          lineHeight: 1.115,
          color: 'black',
        }}
      >
        Complete Home Makeover
      </p>
      <p
        className={`${styles.abs} ${styles.helvOblique}`}
        data-reveal="rise"
        data-reveal-delay="2"
        style={{
          left: 120,
          top: 1003,
          width: 240,
          height: 23,
          fontSize: 20,
          lineHeight: 1.115,
          color: '#ff43b7',
        }}
      >
        Schneider Electric
      </p>
      <div
        className={`${styles.abs} ${styles.helv}`}
        data-reveal="rise"
        data-reveal-delay="3"
        style={{
          left: 120,
          top: 1047,
          width: 240,
          fontSize: 15,
          lineHeight: 1.115,
          color: 'black',
          whiteSpace: 'pre-wrap',
        }}
      >
        <p style={{ marginBottom: 0, lineHeight: 1.115 }}>
          When you redo your home for Diwali, you paint your walls a new colour, get fancy new furniture and maybe even replace your lights.
          <br aria-hidden />
          <br aria-hidden />
        </p>
        <p style={{ marginBottom: 0, lineHeight: 1.115 }}>
          But you never think about switching up your switches.
          <br aria-hidden />
          <br aria-hidden />
        </p>
        <p style={{ lineHeight: 1.115, margin: 0 }}>
          This Diwali film series makes you consider redoing your switches to match the new, updated look of your home.
        </p>
      </div>

      {/* Schneider big film card */}
      <a
        className={`${styles.abs} ${styles.filmCard}`}
        href={YT_SCHNEIDER_BIG}
        target="_blank"
        rel="noreferrer"
        aria-label="Watch Schneider Electric film"
        data-reveal="tilt"
        style={{ left: 487, top: 899, width: 710, height: 400 }}
      >
        <span className={styles.playBadge} aria-hidden="true" />
      </a>
      {/* Schneider tilted card 1 */}
      <div
        className={styles.abs}
        data-reveal="tilt"
        style={{
          left: 152,
          top: 1372,
          width: 510.479,
          height: 328.701,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(-7.2deg)' }}>
          <a
            className={styles.filmCard}
            href={YT_SCHNEIDER_TILT}
            target="_blank"
            rel="noreferrer"
            aria-label="Watch Schneider Electric film"
            style={{ width: 480.342, height: 270.615, position: 'relative' }}
          >
            <span className={styles.playBadge} aria-hidden="true" />
          </a>
        </div>
      </div>
      {/* Schneider tilted card 2 */}
      <div
        className={styles.abs}
        data-reveal="tilt"
        data-reveal-delay="1"
        style={{
          left: 521,
          top: 1465,
          width: 499.426,
          height: 306.156,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(4.34deg)' }}>
          <a
            className={styles.filmCard}
            href={YT_SCHNEIDER_TILT}
            target="_blank"
            rel="noreferrer"
            aria-label="Watch Schneider Electric film"
            style={{ width: 480.342, height: 270.615, position: 'relative' }}
          >
            <span className={styles.playBadge} aria-hidden="true" />
          </a>
        </div>
      </div>
      {/* Starburst */}
      <div className={styles.abs} data-reveal="pop" style={{ left: 258, top: 1792, width: 379, height: 379 }}>
        <div style={{ position: 'absolute', inset: '0 2.45%' }}>
          <Image src={`${ASSET_PATH}/star13.svg`} alt="" fill sizes="379px" style={{ display: 'block' }} />
        </div>
      </div>

      {/* ---- Epson / Feature Shorts ---- */}
      <p
        className={`${styles.abs} ${styles.serifBold}`}
        data-reveal="rise"
        style={{
          left: 80,
          top: 1974,
          width: 206,
          height: 22,
          fontSize: 24,
          lineHeight: 1.115,
          color: 'black',
        }}
      >
        Feature Shorts
      </p>
      <p
        className={`${styles.abs} ${styles.helvOblique}`}
        data-reveal="rise"
        data-reveal-delay="1"
        style={{
          left: 80,
          top: 2019,
          width: 206,
          height: 21,
          fontSize: 20,
          lineHeight: 1.115,
          color: '#ff43b7',
        }}
      >
        Epson
      </p>
      <p
        className={`${styles.abs} ${styles.helv}`}
        data-reveal="rise"
        data-reveal-delay="2"
        style={{
          left: 80,
          top: 2063,
          width: 305,
          height: 134,
          fontSize: 15,
          lineHeight: 1.115,
          color: 'black',
          textAlign: 'justify',
        }}
      >
        A set of short, punch, thirty second videos that highlighted a feature of the Epson office printers. (And more importantly, my first ever video scripts that got made!){' '}
      </p>

      {/* Epson big film card */}
      <a
        className={`${styles.abs} ${styles.filmCard}`}
        href={YT_EPSON_BIG}
        target="_blank"
        rel="noreferrer"
        aria-label="Watch Epson Feature Short"
        data-reveal="tilt"
        style={{ left: 434, top: 1955, width: 740, height: 417 }}
      >
        <span className={styles.playBadge} aria-hidden="true" />
      </a>
      {/* Epson small film card */}
      <a
        className={`${styles.abs} ${styles.filmCard}`}
        href={YT_EPSON_SMALL}
        target="_blank"
        rel="noreferrer"
        aria-label="Watch Epson Feature Short"
        data-reveal="tilt"
        data-reveal-delay="1"
        style={{ left: 86, top: 2205, width: 296, height: 167 }}
      >
        <span className={`${styles.playBadge} ${styles.playBadgeSm}`} aria-hidden="true" />
      </a>
      {/* ---- Footer buttons ---- */}
      <div className={styles.abs} data-reveal="pop" style={{ left: 79, top: 2597 }}>
        <Magnetic>
          <Link
            href={NEXT.href}
            className={`${styles.footerBtn} ${styles.primaryBtn}`}
            style={{ width: 180, height: 60 }}
          >
            Next Project
          </Link>
        </Magnetic>
      </div>
      <div className={styles.abs} data-reveal="pop" data-reveal-delay="1" style={{ left: 291, top: 2598 }}>
        <Magnetic>
          <Link
            href="/#contact"
            className={`${styles.footerBtn} ${styles.secondaryBtn}`}
            style={{ width: 180, height: 60 }}
          >
            Get in Touch
          </Link>
        </Magnetic>
      </div>
    </ScaledCanvas>
  )
}

function MobileLayout() {
  return (
    <div className={styles.mobile}>
      <header className={styles.mobileHeader}>
        <nav className={styles.mobileNav} aria-label="Project navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#contact">Contact &amp; About</Link>
        </nav>
        <div className={styles.mobileStrip}>Ad Films</div>
      </header>

      <section className={styles.mobileSection}>
        <h1 className={styles.mobileTitle} data-reveal="rise">Turning scripts into action</h1>
        <p className={styles.mobileSubtitle} data-reveal="rise" data-reveal-delay="1">A love affair with films</p>

        <h2 className={styles.mobileHeading} data-reveal="rise">Har Tarraki Mein Sath</h2>
        <p className={styles.mobileBrand} data-reveal="rise" data-reveal-delay="1">Kreditbee</p>
        <a className={styles.mobileCard} href={YT_KREDITBEE} target="_blank" rel="noreferrer" aria-label="Watch KreditBee film" data-reveal="tilt">
          <span className={styles.playBadge} aria-hidden="true" />
        </a>
        <p className={styles.mobileBody} data-reveal="rise" data-reveal-delay="1">
          Every time you level up, you gain more questioning looks from nosy neighbours. This film builds on that shared experience and brings it to life by letting us hear those unfiltered thoughts out loud. It captures how quickly people are ready to judge when they see someone doing a little better for themselves.
        </p>
        <p className={styles.mobileBody} data-reveal="rise" data-reveal-delay="2">
          Even though the commentary cannot be prevented, it doesn&rsquo;t have to affect you. Because through it all, you&rsquo;ve got KreditBee backing you up and helping you move forward without second-guessing your choices.
        </p>
      </section>

      <section className={styles.mobileSection}>
        <h2 className={styles.mobileHeading} data-reveal="rise">Complete Home Makeover</h2>
        <p className={styles.mobileBrand} data-reveal="rise" data-reveal-delay="1">Schneider Electric</p>
        <p className={styles.mobileBody} data-reveal="rise" data-reveal-delay="2">
          When you redo your home for Diwali, you paint your walls a new colour, get fancy new furniture and maybe even replace your lights.
        </p>
        <p className={styles.mobileBody} data-reveal="rise">But you never think about switching up your switches.</p>
        <p className={styles.mobileBody} data-reveal="rise" data-reveal-delay="1">
          This Diwali film series makes you consider redoing your switches to match the new, updated look of your home.
        </p>
        <a className={styles.mobileCard} href={YT_SCHNEIDER_BIG} target="_blank" rel="noreferrer" aria-label="Watch Schneider Electric film" data-reveal="tilt">
          <span className={styles.playBadge} aria-hidden="true" />
        </a>
        <a className={styles.mobileCard} href={YT_SCHNEIDER_TILT} target="_blank" rel="noreferrer" aria-label="Watch Schneider Electric film" data-reveal="tilt">
          <span className={styles.playBadge} aria-hidden="true" />
        </a>
        <a className={styles.mobileCard} href={YT_SCHNEIDER_TILT} target="_blank" rel="noreferrer" aria-label="Watch Schneider Electric film" data-reveal="tilt" data-reveal-delay="1">
          <span className={styles.playBadge} aria-hidden="true" />
        </a>
      </section>

      <section className={styles.mobileSection}>
        <h2 className={styles.mobileHeading} data-reveal="rise">Feature Shorts</h2>
        <p className={styles.mobileBrand} data-reveal="rise" data-reveal-delay="1">Epson</p>
        <p className={styles.mobileBody} data-reveal="rise" data-reveal-delay="2">
          A set of short, punch, thirty second videos that highlighted a feature of the Epson office printers. (And more importantly, my first ever video scripts that got made!)
        </p>
        <a className={styles.mobileCard} href={YT_EPSON_BIG} target="_blank" rel="noreferrer" aria-label="Watch Epson Feature Short" data-reveal="tilt">
          <span className={styles.playBadge} aria-hidden="true" />
        </a>
        <a className={styles.mobileCard} href={YT_EPSON_SMALL} target="_blank" rel="noreferrer" aria-label="Watch Epson Feature Short" data-reveal="tilt">
          <span className={styles.playBadge} aria-hidden="true" />
        </a>
      </section>

      <div className={styles.mobileButtons}>
        <Magnetic>
          <Link href={NEXT.href} className={`${styles.footerBtn} ${styles.primaryBtn}`} data-reveal="pop">
            Next Project
          </Link>
        </Magnetic>
        <Magnetic>
          <Link href="/#contact" className={`${styles.footerBtn} ${styles.secondaryBtn}`} data-reveal="pop" data-reveal-delay="1">
            Get in Touch
          </Link>
        </Magnetic>
      </div>
    </div>
  )
}

export default function FullyFilmyPage() {
  return (
    <main className={`${styles.page} projectCasePage`}>
      <DesktopCanvas />
      <MobileLayout />
    </main>
  )
}
