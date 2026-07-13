import Image from 'next/image'
import Link from 'next/link'
import MediaThumbnail from '@/components/MediaThumbnail/MediaThumbnail'
import Magnetic from '@/components/Fx/Magnetic'
import ScaledCanvas from '@/components/ScaledCanvas/ScaledCanvas'
import { getNextProject } from '@/lib/projects'
import styles from './page.module.css'

const ASSET = '/images/print-media'
const NEXT = getNextProject('print-media')
const DIARY_FILM = 'https://www.youtube.com/watch?v=Qwg0dtuELIc'

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
        <span>Print Media</span>
      </div>
    </>
  )
}

function DesktopCanvas() {
  return (
    <ScaledCanvas className={styles.canvas} ariaLabel="Print Media case study" height={4540}>
      {/* Lower-section background band (Green Yodha) */}
      <div className={styles.greenBand} aria-hidden="true" />

      <Header />

      {/* ---------- Interactive Corporate Diary ---------- */}
      <h1 className={styles.diaryTitle} data-reveal="rise">Interactive Corporate Diary</h1>
      <p className={styles.diarySubtitle} data-reveal="rise" data-reveal-delay="1">
        Making a fun and inspirational corporate diary for Nissin&rsquo;s employees
      </p>

      <p className={styles.diaryBodyLeft} data-reveal="rise" data-reveal-delay="2">
        We had helped Nissin Cupnoodles establish themselves on Instagram as a current and Gen Z brand. But
        how does this personality translate outside of social media?
        <br />
        <br />
        For the 2025 edition of their annual corporate diary, they wanted us to showcase six
        &ldquo;Changemakers&rdquo; who transformed the world by fighting for a social cause.
      </p>

      <a
        className={styles.diaryVideo}
        href={DIARY_FILM}
        target="_blank"
        rel="noreferrer"
        aria-label="Watch the Nissin corporate diary film"
      >
        <MediaThumbnail href={DIARY_FILM} />
      </a>

      <div className={styles.diarySpread1} data-reveal="tilt">
        <Image
          src={`${ASSET}/diary-spread-1.jpg`}
          alt="Nissin corporate diary spread featuring changemaker stories"
          fill
          sizes="748px"
          className={styles.diaryImage}
        />
      </div>

      <div className={styles.diaryPanel} aria-hidden="true">
        <Image src={`${ASSET}/diary-panel.svg`} alt="" fill sizes="260px" />
      </div>

      <div className={styles.diarySpread2} data-reveal="tilt" data-reveal-delay="1">
        <Image
          src={`${ASSET}/diary-spread-2.jpg`}
          alt="Nissin corporate diary interactive changemaker spread"
          fill
          sizes="747px"
          className={styles.diaryImage}
        />
      </div>

      <p className={styles.diaryBodyRight} data-reveal="rise" data-reveal-delay="3">
        Turning real lives into simple, 100-word stories with a beginning, middle and end was definitely a
        challenge. After thorough research, I singled out moments from their lives that formed a clear
        narrative, and with a little bit of artistic liberty, put myself in their shoes to infer their
        feelings in different situations.
        <br />
        <br />
        With the help of the design team, I came up with interactive elements like pull tabs and flap lifts
        for each of the changemakers.
        <br />
        <br />
        The result was a set of interactive stories that remained engaging without losing their gravitas.
      </p>

      <div className={styles.diarySpread3} data-reveal="tilt" data-reveal-delay="2">
        <Image
          src={`${ASSET}/diary-spread-3.jpg`}
          alt="Nissin corporate diary spread with illustrated interactive stories"
          fill
          sizes="747px"
          className={styles.diaryImage}
        />
      </div>

      {/* ---------- Driving Change with Print Innovation ---------- */}
      <h2 className={styles.printTitle} data-reveal="rise">Driving Change with Print Innovation</h2>
      <p className={styles.printSubtitle} data-reveal="rise" data-reveal-delay="1">Schneider Electric Newspaper Ad</p>
      <p className={styles.printBody} data-reveal="rise" data-reveal-delay="2">
        Schneider Electric was driving sustainable transformation in manufacturing through its Green Yodha
        program. But real impact demands collective action.
        <br />
        <br />
        So we created a print campaign aimed at C-suite leaders across large organisations, encouraging them
        to bring the Green Yodha pledge into their own workplaces, positioning sustainability and growth as
        goals that can move forward together.
      </p>

      {/* Option 1 — fragrance strip */}
      <div className={styles.star1} data-reveal="stamp">
        <Image src={`${ASSET}/star.svg`} alt="" fill sizes="160px" />
      </div>
      <p className={styles.option1} data-reveal="stamp">Option 1</p>
      <div className={styles.fragranceStrip} data-reveal="tilt" data-reveal-delay="1">
        <Image src={`${ASSET}/green-yodha-fragrance-strip.jpg`} alt="Green Yodha fragrance-strip newspaper ad" fill sizes="440px" className={styles.printImg} />
      </div>
      <p className={styles.fragranceBody} data-reveal="rise" data-reveal-delay="2">
        We transformed the newspaper ad into a sensory experience using a fragrance strip infused with
        petrichor, the smell of the first rain. The familiar scent introduced an immediate emotional
        connection to nature, encouraging business leaders to take the Green Yodha pledge
      </p>

      {/* Option 2 — lake flap */}
      <div className={styles.star2} data-reveal="stamp">
        <Image src={`${ASSET}/star.svg`} alt="" fill sizes="160px" />
      </div>
      <p className={styles.option2} data-reveal="stamp">Option 2</p>
      <div className={styles.lake} data-reveal="tilt" data-reveal-delay="1">
        <Image src={`${ASSET}/green-yodha-lake.jpg`} alt="Green Yodha lake interactive flap newspaper ad" fill sizes="440px" className={styles.printImg} />
      </div>
      <p className={styles.lakeBody} data-reveal="rise" data-reveal-delay="2">
        We used an interactive flap to mirror the false choice businesses often make between growth and
        sustainability. Readers first encountered the question, &ldquo;Growth or Sustainability?&rdquo; and,
        on opening the flap, revealed the answer: Green Yodhas don&rsquo;t have to choose.
      </p>

      {/* ---------- Footer buttons ---------- */}
      <div className={styles.footerButtons}>
        <Magnetic>
          <Link href={NEXT.href} className={styles.primaryButton} data-reveal="pop">
            Next Project
          </Link>
        </Magnetic>
        <Magnetic>
          <Link href="/#contact" className={styles.secondaryButton} data-reveal="pop" data-reveal-delay="1">
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
      <Header />

      <section className={styles.mobileHero}>
        <h1 data-reveal="rise">Interactive Corporate Diary</h1>
        <p className={styles.mobileSubhead} data-reveal="rise" data-reveal-delay="1">
          Making a fun and inspirational corporate diary for Nissin&rsquo;s employees
        </p>
        <p className={styles.mobileIntro} data-reveal="rise" data-reveal-delay="2">
          We had helped Nissin Cupnoodles establish themselves on Instagram as a current and Gen Z brand. But
          how does this personality translate outside of social media?
          <br />
          <br />
          For the 2025 edition of their annual corporate diary, they wanted us to showcase six
          &ldquo;Changemakers&rdquo; who transformed the world by fighting for a social cause.
          <br />
          <br />
          Turning real lives into simple, 100-word stories with a beginning, middle and end was definitely a
          challenge. After thorough research, I singled out moments from their lives that formed a clear
          narrative, and with a little bit of artistic liberty, put myself in their shoes to infer their
          feelings in different situations.
          <br />
          <br />
          With the help of the design team, I came up with interactive elements like pull tabs and flap lifts
          for each of the changemakers.
          <br />
          <br />
          The result was a set of interactive stories that remained engaging without losing their gravitas.
        </p>

        <a
          className={styles.mobileVideo}
          href={DIARY_FILM}
          target="_blank"
          rel="noreferrer"
          aria-label="Watch the Nissin corporate diary film"
        >
          <MediaThumbnail href={DIARY_FILM} />
        </a>

        <div className={styles.mobileDiaryGallery}>
          {[1, 2, 3].map((n) => (
            <figure key={n} className={styles.mobileDiarySpread} data-reveal="tilt">
              <Image
                src={`${ASSET}/diary-spread-${n}.jpg`}
                alt={`Nissin corporate diary spread ${n}`}
                fill
                sizes="92vw"
                className={styles.diaryImage}
              />
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.mobileSection}>
        <h2 data-reveal="rise">Driving Change with Print Innovation</h2>
        <p className={styles.mobileSubhead} data-reveal="rise" data-reveal-delay="1">Schneider Electric Newspaper Ad</p>
        <p className={styles.mobileIntro} data-reveal="rise" data-reveal-delay="2">
          Schneider Electric was driving sustainable transformation in manufacturing through its Green Yodha
          program. But real impact demands collective action.
          <br />
          <br />
          So we created a print campaign aimed at C-suite leaders across large organisations, encouraging
          them to bring the Green Yodha pledge into their own workplaces, positioning sustainability and
          growth as goals that can move forward together.
        </p>

        <div className={styles.mobileGrid}>
          <figure className={styles.mobileFigure} data-reveal="tilt">
            <div className={styles.mobileImg}>
              <Image src={`${ASSET}/green-yodha-fragrance-strip.jpg`} alt="Green Yodha fragrance-strip newspaper ad" fill sizes="46vw" className={styles.printImg} />
            </div>
            <figcaption>Option 1</figcaption>
          </figure>
          <figure className={styles.mobileFigure} data-reveal="tilt" data-reveal-delay="1">
            <div className={styles.mobileImg}>
              <Image src={`${ASSET}/green-yodha-lake.jpg`} alt="Green Yodha lake interactive flap newspaper ad" fill sizes="46vw" className={styles.printImg} />
            </div>
            <figcaption>Option 2</figcaption>
          </figure>
        </div>

        <p className={styles.mobileIntro} data-reveal="rise" data-reveal-delay="2">
          <strong>Option 1:</strong> We transformed the newspaper ad into a sensory experience using a
          fragrance strip infused with petrichor, the smell of the first rain. The familiar scent introduced
          an immediate emotional connection to nature, encouraging business leaders to take the Green Yodha
          pledge
          <br />
          <br />
          <strong>Option 2:</strong> We used an interactive flap to mirror the false choice businesses often
          make between growth and sustainability. Readers first encountered the question, &ldquo;Growth or
          Sustainability?&rdquo; and, on opening the flap, revealed the answer: Green Yodhas don&rsquo;t have
          to choose.
        </p>
      </section>

      <div className={styles.mobileButtons}>
        <Magnetic>
          <Link href={NEXT.href} className={styles.primaryButton} data-reveal="pop">
            Next Project
          </Link>
        </Magnetic>
        <Magnetic>
          <Link href="/#contact" className={styles.secondaryButton} data-reveal="pop" data-reveal-delay="1">
            Get in Touch
          </Link>
        </Magnetic>
      </div>
    </div>
  )
}

export default function PrintMediaPage() {
  return (
    <main className={`${styles.page} projectCasePage`}>
      <DesktopCanvas />
      <MobileLayout />
    </main>
  )
}
