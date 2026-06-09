import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

const ASSET_PATH = '/images/fully-filmy'

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
    <div className={styles.canvas} aria-label="Ad Films case study">
      <Header />

      {/* ---- Title block ---- */}
      <p
        className={`${styles.abs} ${styles.serifBold}`}
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
      <div className={styles.abs} style={{ left: 125, top: 631, width: 130, height: 202 }}>
        <div className={styles.tvLegStraight} style={{ width: 130, height: 202 }} />
      </div>
      <div className={styles.abs} style={{ left: 679, top: 631, width: 130, height: 202 }}>
        <div className={styles.tvLegStraight} style={{ width: 130, height: 202 }} />
      </div>
      {/* tilted legs */}
      <div
        className={styles.abs}
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
        style={{ left: 80, top: 281, width: 780, height: 400 }}
      />
      {/* TV screen = clickable video link */}
      <a
        className={styles.abs}
        href={YT_KREDITBEE}
        target="_blank"
        rel="noreferrer"
        aria-label="Watch KreditBee — Har Tarraki Mein Sath"
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
      </a>
      {/* TV buttons */}
      <div
        className={`${styles.abs} ${styles.tvButton}`}
        style={{ left: 720, top: 310, width: 120, height: 22 }}
      />
      <div
        className={`${styles.abs} ${styles.tvButton}`}
        style={{ left: 720, top: 348, width: 120, height: 22 }}
      />
      <div
        className={`${styles.abs} ${styles.tvButton}`}
        style={{ left: 720, top: 388, width: 120, height: 22 }}
      />

      {/* ---- Schneider pink panel ---- */}
      <div className={styles.abs} style={{ left: 80, top: 778, width: 360, height: 723 }}>
        <Image src={`${ASSET_PATH}/rectangle21.svg`} alt="" fill sizes="360px" style={{ display: 'block' }} />
      </div>
      <p
        className={`${styles.abs} ${styles.serifBold}`}
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
        style={{ left: 487, top: 899, width: 710, height: 400 }}
      />
      <p
        className={`${styles.abs} ${styles.helv}`}
        style={{ left: 500, top: 1327, width: 220, fontSize: 15, lineHeight: 1.115, color: 'black' }}
      >
        One line here
      </p>

      {/* Schneider tilted card 1 */}
      <div
        className={styles.abs}
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
          />
        </div>
      </div>
      {/* Schneider tilted card 2 */}
      <div
        className={styles.abs}
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
          />
        </div>
      </div>
      <p
        className={`${styles.abs} ${styles.helv}`}
        style={{ left: 200, top: 1726, width: 220, fontSize: 15, lineHeight: 1.115, color: 'black' }}
      >
        One line here
      </p>

      {/* Starburst */}
      <div className={styles.abs} style={{ left: 258, top: 1792, width: 379, height: 379 }}>
        <div style={{ position: 'absolute', inset: '0 2.45%' }}>
          <Image src={`${ASSET_PATH}/star13.svg`} alt="" fill sizes="379px" style={{ display: 'block' }} />
        </div>
      </div>

      {/* ---- Epson / Feature Shorts ---- */}
      <p
        className={`${styles.abs} ${styles.serifBold}`}
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
        style={{ left: 434, top: 1955, width: 740, height: 417 }}
      />
      {/* Epson small film card */}
      <a
        className={`${styles.abs} ${styles.filmCard}`}
        href={YT_EPSON_SMALL}
        target="_blank"
        rel="noreferrer"
        aria-label="Watch Epson Feature Short"
        style={{ left: 86, top: 2205, width: 296, height: 167 }}
      />
      <p
        className={`${styles.abs} ${styles.helv}`}
        style={{ left: 86, top: 2405, width: 220, fontSize: 15, lineHeight: 1.115, color: 'black' }}
      >
        One line here
      </p>
      <p
        className={`${styles.abs} ${styles.helv}`}
        style={{ left: 434, top: 2405, width: 220, fontSize: 15, lineHeight: 1.115, color: 'black' }}
      >
        One line here
      </p>

      {/* ---- Footer buttons ---- */}
      <Link
        href="/#work"
        className={`${styles.abs} ${styles.footerBtn} ${styles.primaryBtn}`}
        style={{ left: 90, top: 2597, width: 180, height: 60 }}
      >
        Next Project
      </Link>
      <Link
        href="/#contact"
        className={`${styles.abs} ${styles.footerBtn} ${styles.secondaryBtn}`}
        style={{ left: 302, top: 2598, width: 180, height: 60 }}
      >
        Get in Touch
      </Link>
    </div>
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
        <h1 className={styles.mobileTitle}>Turning scripts into action</h1>
        <p className={styles.mobileSubtitle}>A love affair with films</p>

        <h2 className={styles.mobileHeading}>Har Tarraki Mein Sath</h2>
        <p className={styles.mobileBrand}>Kreditbee</p>
        <a className={styles.mobileCard} href={YT_KREDITBEE} target="_blank" rel="noreferrer" aria-label="Watch KreditBee film" />
        <p className={styles.mobileBody}>
          Every time you level up, you gain more questioning looks from nosy neighbours. This film builds on that shared experience and brings it to life by letting us hear those unfiltered thoughts out loud. It captures how quickly people are ready to judge when they see someone doing a little better for themselves.
        </p>
        <p className={styles.mobileBody}>
          Even though the commentary cannot be prevented, it doesn&rsquo;t have to affect you. Because through it all, you&rsquo;ve got KreditBee backing you up and helping you move forward without second-guessing your choices.
        </p>
      </section>

      <section className={styles.mobileSection}>
        <h2 className={styles.mobileHeading}>Complete Home Makeover</h2>
        <p className={styles.mobileBrand}>Schneider Electric</p>
        <p className={styles.mobileBody}>
          When you redo your home for Diwali, you paint your walls a new colour, get fancy new furniture and maybe even replace your lights.
        </p>
        <p className={styles.mobileBody}>But you never think about switching up your switches.</p>
        <p className={styles.mobileBody}>
          This Diwali film series makes you consider redoing your switches to match the new, updated look of your home.
        </p>
        <a className={styles.mobileCard} href={YT_SCHNEIDER_BIG} target="_blank" rel="noreferrer" aria-label="Watch Schneider Electric film" />
        <p className={styles.mobileNote}>One line here</p>
        <a className={styles.mobileCard} href={YT_SCHNEIDER_TILT} target="_blank" rel="noreferrer" aria-label="Watch Schneider Electric film" />
        <a className={styles.mobileCard} href={YT_SCHNEIDER_TILT} target="_blank" rel="noreferrer" aria-label="Watch Schneider Electric film" />
        <p className={styles.mobileNote}>One line here</p>
      </section>

      <section className={styles.mobileSection}>
        <h2 className={styles.mobileHeading}>Feature Shorts</h2>
        <p className={styles.mobileBrand}>Epson</p>
        <p className={styles.mobileBody}>
          A set of short, punch, thirty second videos that highlighted a feature of the Epson office printers. (And more importantly, my first ever video scripts that got made!)
        </p>
        <a className={styles.mobileCard} href={YT_EPSON_BIG} target="_blank" rel="noreferrer" aria-label="Watch Epson Feature Short" />
        <p className={styles.mobileNote}>One line here</p>
        <a className={styles.mobileCard} href={YT_EPSON_SMALL} target="_blank" rel="noreferrer" aria-label="Watch Epson Feature Short" />
        <p className={styles.mobileNote}>One line here</p>
      </section>

      <div className={styles.mobileButtons}>
        <Link href="/#work" className={`${styles.footerBtn} ${styles.primaryBtn}`}>
          Next Project
        </Link>
        <Link href="/#contact" className={`${styles.footerBtn} ${styles.secondaryBtn}`}>
          Get in Touch
        </Link>
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
