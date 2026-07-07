import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AmbientLayer, Starburst, Halo, Sparkle } from '@/components/Ambient/Ambient'
import Magnetic from '@/components/Fx/Magnetic'
import ScaledCanvas from '@/components/ScaledCanvas/ScaledCanvas'
import styles from './page.module.css'

const ASSET = '/images/fun-stuff'

// External link to Abhi's design portfolio (the "View Design Portfolio" puddle CTA).
const DESIGN_PORTFOLIO_HREF = 'https://www.behance.net/'

type Book = {
  img: string
  // Exact center coordinates of the 200x280 cover in the 1280px Figma canvas.
  cx: number
  cy: number
  r: number
  label: string
}

// Figma centers each rotated 200x280 book inside a larger bounding box. We place
// the cover at its exact center and rotate about that center to match 1:1.
const BOOKS: Book[] = [
  // 724:99 — left 80 / top 343, no rotation
  { img: 'book-missing-milk', cx: 180, cy: 483, r: 0, label: 'Missing Milk & Buzzing TVs' },
  // 724:98 — bbox left 243 top 400 (224.995 x 297.268), inner rotate 5.3deg
  { img: 'book-other-girl', cx: 355.4975, cy: 548.634, r: 5.3, label: 'The Other Girl' },
  // 724:97 — bbox left 413 top 318 (246.888 x 311.276), inner rotate -10.31deg
  { img: 'book-train-tracks', cx: 536.444, cy: 473.638, r: -10.31, label: 'By The Train Tracks' },
]

// Title split into per-word spans for the staggered pop-in. Visual only —
// screen readers get the intact sentence via the visually-hidden span.
const TITLE_WORDS = ['You’ve', 'stumbled', 'upon', 'my', 'secret', 'folder']

function Header() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Project navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#contact">Contact &amp; About</Link>
        </nav>
      </header>
      <div className={styles.projectStrip}>
        <span>Fun Stuff</span>
      </div>
    </>
  )
}

function DesktopCanvas() {
  return (
    <ScaledCanvas className={styles.canvas} ariaLabel="Fun stuff — Abhi's secret folder" height={1309}>
      <Header />

      <AmbientLayer>
        {/* Open right zone — big lime starburst filling the empty right half */}
        <Starburst left={760} top={300} size={460} opacity={0.45} />
        {/* Halos drifting off the right and bottom edges */}
        <Halo right={-150} top={520} size={300} />
        <Halo lime left={420} bottom={-170} size={320} />
        {/* Sparkles scattered in the gaps */}
        <Sparkle left={1080} top={170} size={30} delay={0.2} />
        <Sparkle left={900} top={620} size={22} delay={1.1} />
        <Sparkle left={1150} top={760} size={26} delay={0.6} />
        <Sparkle left={700} top={840} size={20} delay={1.5} />
        <Sparkle left={960} top={1040} size={28} delay={0.9} />
        <Sparkle left={620} top={1130} size={18} delay={1.8} />
        {/* Extra playful sparkles in the remaining quiet zones */}
        <Sparkle left={640} top={248} size={18} delay={0.4} />
        <Sparkle left={470} top={1180} size={22} delay={1.3} />
        <Sparkle left={1020} top={930} size={24} delay={0.8} />
      </AmbientLayer>

      {/* 26:231 */}
      <h1 className={styles.title}>
        <span className={styles.srOnly}>You&rsquo;ve stumbled upon my secret folder</span>
        <span aria-hidden="true">
          {TITLE_WORDS.map((word, i) => (
            <Fragment key={word}>
              {i > 0 && ' '}
              <span className={styles.titleWord} data-reveal="pop" data-reveal-delay={i}>
                {word}
              </span>
            </Fragment>
          ))}
        </span>
      </h1>
      {/* 26:232 */}
      <p className={styles.subtitle} data-reveal="rise" data-reveal-delay="1">
        Here&rsquo;s what I write and design for fun
      </p>

      {/* 410:76 */}
      <h2 className={styles.shortStories} data-reveal="rise">
        Short Stories
      </h2>
      {/* 724:105 */}
      <h2 className={styles.designHeading} data-reveal="rise">
        Design, Illustration &amp; Animation
      </h2>

      {/* Short-story book covers (724:99 / 724:98 / 724:97) */}
      {BOOKS.map((book, i) => (
        <div
          key={book.img}
          className={styles.book}
          data-reveal="stamp"
          data-reveal-delay={i}
          style={{
            left: book.cx - 100,
            top: book.cy - 140,
            transform: book.r ? `rotate(${book.r}deg)` : undefined,
          }}
        >
          <Image
            src={`${ASSET}/${book.img}.svg`}
            alt=""
            fill
            sizes="200px"
            className={styles.bookImg}
          />
        </div>
      ))}

      {/* 724:100 — "Missing Milk & Buzzing TVs" (center x = 200) */}
      <p className={`${styles.bookText} ${styles.bookTextMilk}`} data-reveal="rise" data-reveal-delay="1">
        Missing Milk <br aria-hidden="true" />&amp; <br aria-hidden="true" />
        Buzzing TVs
      </p>

      {/* 724:101 — "The Other Girl / (Short Film Script)" (center x = 380.53, rot 5.3) */}
      <div className={styles.bookTextWrapOtherGirl} data-reveal="rise" data-reveal-delay="2">
        <p className={styles.bookTextOtherGirl}>
          <span className={styles.otherGirlTitle}>
            The Other Girl
            <br aria-hidden="true" />
            <br aria-hidden="true" />
          </span>
          <span className={styles.otherGirlSub}>(Short Film Script)</span>
        </p>
      </div>

      {/* 724:103 — "By The Train Tracks" (center x = 558, rot -10.31) */}
      <div className={styles.bookTextWrapTracks} data-reveal="rise" data-reveal-delay="3">
        <p className={styles.bookTextTracks}>
          By <br aria-hidden="true" />
          The Train Tracks
        </p>
      </div>

      {/* 731:152 — milk puddle (CTA link) */}
      <a
        className={styles.puddleLink}
        href={DESIGN_PORTFOLIO_HREF}
        target="_blank"
        rel="noreferrer"
        aria-label="View Design Portfolio"
        data-reveal="pop"
      >
        <span className={styles.puddleInner}>
          <Image
            src={`${ASSET}/puddle.svg`}
            alt=""
            fill
            sizes="290px"
            className={styles.puddleImg}
          />
        </span>
      </a>

      {/* 731:153 — bottle body (lime rounded rect, rot 116.91) */}
      <div className={styles.bottleBody} aria-hidden="true" data-reveal="rise" data-reveal-delay="1" />
      {/* 731:154 — bottle neck (lime rect, rot 116.91) */}
      <div className={styles.bottleNeck} aria-hidden="true" data-reveal="rise" data-reveal-delay="1" />
      {/* 731:146 — spilling milk splash (rot -11.99) */}
      <div className={styles.splash} aria-hidden="true" data-reveal="rise" data-reveal-delay="2">
        <span className={styles.splashInner}>
          <Image src={`${ASSET}/splash.svg`} alt="" fill sizes="45px" className={styles.splashImg} />
        </span>
      </div>

      {/* 731:156 — View Design Portfolio label (center 312.5, 1010) */}
      <span className={styles.viewDesign} data-reveal="fade" data-reveal-delay="1">
        View Design Portfolio
      </span>

      {/* 920:38 — Go Back to Projects */}
      <div className={styles.goBackSlot} data-reveal="pop">
        <Magnetic>
          <Link href="/#work" className={styles.goBackButton}>
            <span className={styles.goBackLabel}>
              Go Back <br aria-hidden="true" />
              to Projects
            </span>
          </Link>
        </Magnetic>
      </div>
      {/* 920:41 — Get in Touch */}
      <div className={styles.getInTouchSlot} data-reveal="pop" data-reveal-delay="1">
        <Magnetic>
          <Link href="/#contact" className={styles.getInTouchButton}>
            <span className={styles.getInTouchLabel}>Get in Touch</span>
          </Link>
        </Magnetic>
      </div>
    </ScaledCanvas>
  )
}

function MobileLayout() {
  return (
    <div className={styles.mobile}>
      <Header />
      <section className={styles.mobileHero}>
        <h1 data-reveal="rise">You&rsquo;ve stumbled upon my secret folder</h1>
        <p className={styles.mobileSubhead} data-reveal="rise" data-reveal-delay="1">
          Here&rsquo;s what I write and design for fun
        </p>
      </section>

      <section className={styles.mobileSection}>
        <h2 data-reveal="rise">Short Stories</h2>
        <div className={styles.mobileBooks}>
          {BOOKS.map((book, i) => (
            <div key={book.img} className={styles.mobileBook} data-reveal="pop" data-reveal-delay={i}>
              <Image
                src={`${ASSET}/${book.img}.svg`}
                alt=""
                fill
                sizes="30vw"
                className={styles.bookImg}
              />
              <span className={styles.mobileBookTitle}>{book.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.mobileSection}>
        <h2 data-reveal="rise">Design, Illustration &amp; Animation</h2>
        <a
          className={styles.mobilePuddle}
          href={DESIGN_PORTFOLIO_HREF}
          target="_blank"
          rel="noreferrer"
          data-reveal="pop"
          data-reveal-delay="1"
        >
          <Image
            src={`${ASSET}/puddle.svg`}
            alt=""
            fill
            sizes="90vw"
            className={styles.puddleImg}
          />
          <span className={styles.mobileViewDesign}>View Design Portfolio</span>
        </a>
      </section>

      <div className={styles.mobileButtons}>
        <Magnetic>
          <Link href="/#work" className={styles.mobilePrimaryButton} data-reveal="pop">
            Go Back to Projects
          </Link>
        </Magnetic>
        <Magnetic>
          <Link
            href="/#contact"
            className={styles.mobileSecondaryButton}
            data-reveal="pop"
            data-reveal-delay="1"
          >
            Get in Touch
          </Link>
        </Magnetic>
      </div>
    </div>
  )
}

export default function FunStuffPage() {
  return (
    <main className={`${styles.page} projectCasePage`}>
      <DesktopCanvas />
      <MobileLayout />
    </main>
  )
}
