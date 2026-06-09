import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

const ASSET = '/images/print-media'

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
    <div className={styles.canvas} aria-label="Print Media case study">
      {/* Lower-section background band (Green Yodha) */}
      <div className={styles.greenBand} aria-hidden="true" />

      <Header />

      {/* ---------- Interactive Corporate Diary ---------- */}
      <h1 className={styles.diaryTitle}>Interactive Corporate Diary</h1>
      <p className={styles.diarySubtitle}>
        Making a fun and inspirational corporate diary for Nissin&rsquo;s employees
      </p>

      <p className={styles.diaryBodyLeft}>
        We had helped Nissin Cupnoodles establish themselves on Instagram as a current and Gen Z brand. But
        how does this personality translate outside of social media?
        <br />
        <br />
        For the 2025 edition of their annual corporate diary, they wanted us to showcase six
        &ldquo;Changemakers&rdquo; who transformed the world by fighting for a social cause.
      </p>

      <p className={styles.diaryBodyRight}>
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

      {/* ---------- Driving Change with Print Innovation ---------- */}
      <h2 className={styles.printTitle}>Driving Change with Print Innovation</h2>
      <p className={styles.printSubtitle}>Schneider Electric Newspaper Ad</p>
      <p className={styles.printBody}>
        Schneider Electric was driving sustainable transformation in manufacturing through its Green Yodha
        program. But real impact demands collective action.
        <br />
        <br />
        So we created a print campaign aimed at C-suite leaders across large organisations, encouraging them
        to bring the Green Yodha pledge into their own workplaces, positioning sustainability and growth as
        goals that can move forward together.
      </p>

      {/* Option 1 — fragrance strip */}
      <div className={styles.star1}>
        <Image src={`${ASSET}/star.svg`} alt="" fill sizes="160px" />
      </div>
      <p className={styles.option1}>Option 1</p>
      <div className={styles.fragranceStrip}>
        <Image src={`${ASSET}/green-yodha-fragrance-strip.jpg`} alt="Green Yodha fragrance-strip newspaper ad" fill sizes="440px" className={styles.printImg} />
      </div>
      <p className={styles.fragranceBody}>
        We transformed the newspaper ad into a sensory experience using a fragrance strip infused with
        petrichor, the smell of the first rain. The familiar scent introduced an immediate emotional
        connection to nature, encouraging business leaders to take the Green Yodha pledge
      </p>

      {/* Option 2 — lake flap */}
      <div className={styles.star2}>
        <Image src={`${ASSET}/star.svg`} alt="" fill sizes="160px" />
      </div>
      <p className={styles.option2}>Option 2</p>
      <div className={styles.lake}>
        <Image src={`${ASSET}/green-yodha-lake.jpg`} alt="Green Yodha lake interactive flap newspaper ad" fill sizes="440px" className={styles.printImg} />
      </div>
      <p className={styles.lakeBody}>
        We used an interactive flap to mirror the false choice businesses often make between growth and
        sustainability. Readers first encountered the question, &ldquo;Growth or Sustainability?&rdquo; and,
        on opening the flap, revealed the answer: Green Yodhas don&rsquo;t have to choose.
      </p>

      {/* ---------- Footer buttons ---------- */}
      <div className={styles.footerButtons}>
        <Link href="/#work" className={styles.primaryButton}>
          Next Project
        </Link>
        <Link href="/#contact" className={styles.secondaryButton}>
          Get in Touch
        </Link>
      </div>
    </div>
  )
}

function MobileLayout() {
  return (
    <div className={styles.mobile}>
      <Header />

      <section className={styles.mobileHero}>
        <h1>Interactive Corporate Diary</h1>
        <p className={styles.mobileSubhead}>
          Making a fun and inspirational corporate diary for Nissin&rsquo;s employees
        </p>
        <p className={styles.mobileIntro}>
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
      </section>

      <section className={styles.mobileSection}>
        <h2>Driving Change with Print Innovation</h2>
        <p className={styles.mobileSubhead}>Schneider Electric Newspaper Ad</p>
        <p className={styles.mobileIntro}>
          Schneider Electric was driving sustainable transformation in manufacturing through its Green Yodha
          program. But real impact demands collective action.
          <br />
          <br />
          So we created a print campaign aimed at C-suite leaders across large organisations, encouraging
          them to bring the Green Yodha pledge into their own workplaces, positioning sustainability and
          growth as goals that can move forward together.
        </p>

        <div className={styles.mobileGrid}>
          <figure className={styles.mobileFigure}>
            <div className={styles.mobileImg}>
              <Image src={`${ASSET}/green-yodha-fragrance-strip.jpg`} alt="Green Yodha fragrance-strip newspaper ad" fill sizes="46vw" className={styles.printImg} />
            </div>
            <figcaption>Option 1</figcaption>
          </figure>
          <figure className={styles.mobileFigure}>
            <div className={styles.mobileImg}>
              <Image src={`${ASSET}/green-yodha-lake.jpg`} alt="Green Yodha lake interactive flap newspaper ad" fill sizes="46vw" className={styles.printImg} />
            </div>
            <figcaption>Option 2</figcaption>
          </figure>
        </div>

        <p className={styles.mobileIntro}>
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
        <Link href="/#work" className={styles.primaryButton}>
          Next Project
        </Link>
        <Link href="/#contact" className={styles.secondaryButton}>
          Get in Touch
        </Link>
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
