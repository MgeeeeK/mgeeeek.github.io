import Link from 'next/link'
import styles from './page.module.css'

const A = '/images/email-strategy'

/* ── Flowchart arrow: in Figma each arrow is a horizontal vector of width W
   wrapped in a flex box (width:0, height:W) whose inner child is rotated 90°,
   producing a vertical (downward) arrow centred on the container's left edge. */
function Arrow({
  left,
  top,
  len,
  src,
  rotate = 90,
  containerW = 0,
  containerH,
}: {
  left: number
  top: number
  len: number
  src: string
  rotate?: number
  containerW?: number
  containerH?: number
}) {
  return (
    <div
      className={styles.arrowBox}
      style={{ left, top, width: containerW, height: containerH ?? len }}
    >
      <div style={{ transform: `rotate(${rotate}deg)`, flex: 'none' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ display: 'block', width: len, height: 4.6 }} />
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Project navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#contact">Contact &amp; About</Link>
      </nav>
      <div className={styles.projectStrip}>
        <span>Email Strategy</span>
      </div>
    </header>
  )
}

function DesktopCanvas() {
  return (
    <div className={styles.canvas} aria-label="Email Strategy case study">
      <Header />

      {/* ── Hero ── */}
      <h1 className={styles.title}>Designing Retention for SaaS </h1>
      <p className={styles.subtitle}>Keeping new users active and engaged via email strategy</p>

      {/* Intro paragraph */}
      <p className={styles.intro}>
        <span className={styles.hReg}>MyCheckins</span>
        <span className={styles.hBoldPink}> </span>
        <span className={styles.hReg}>was the answer to every </span>
        <span className={styles.hObl}>“Did we really need a meeting for this?” </span>
        <span className={styles.hReg}>
          In other words, an async, text-based check-in tool designed to replace unnecessary meetings
          with clear, structured updates. It helped teams stay aligned while freeing up time to focus
          on actual work instead of calls.
        </span>
      </p>

      {/* ── The Problem ── */}
      <p className={styles.problem}>
        <span>The Problem: </span>
        <br />
        <span className={styles.pinkBig}>
          People were creating accounts...
          <br />
          and disappearing.
        </span>
      </p>

      {/* ── The Solution ── */}
      <p className={styles.solution}>
        <span>The Solution:</span>
        <br />
        <span className={styles.pinkBig}>
          A set of emails sent over the course of a month addressing common concerns.
        </span>
      </p>

      {/* Solution body */}
      <div className={styles.solutionBody}>
        <p>
          Written from the founder’s point of view, the email journey was built around a simple idea:
          help people understand the product in a way that feels relevant to them. For leaders, it was
          about saving time, keeping teams aligned, and figuring out how to get everyone to adopt
          something new. For team members, it was about having fewer meetings, clearer priorities, and
          a controlled workday.
        </p>
        <p>
          Instead of just nudging people to come back, each email tried to be genuinely useful. It
          showed how to write better check-ins, how to build the habit, and what kind of results to
          expect. It also addressed the real reasons people drop off like not knowing where to start or
          not seeing immediate value. The idea was to reduce that friction step by step and make it
          easier for people to stick with it.
          <br />
          <br />
          Each email set expectations for what was coming next, creating a sense of continuity and
          helping users stay engaged throughout the journey.
          <br />
          <br />
          The journey ended with a custom wrap-up of the hours saved in a month using MyCheckins. If
          users failed to use the product, they were nudged to give it a chance in the next month with a
          predictive wrap-up of the hours they could possibly save.
        </p>
      </div>

      {/* ── Tone of Voice ── */}
      <p className={styles.toneHeading}>
        <span>Tone of Voice</span>
      </p>
      <div className={styles.toneBody}>
        <p>
          <span className={styles.toneLead}>Conversational, approachable, and grounded</span>
        </p>
        <p>
          For founders and team leaders, the tone leaned into shared understanding . It acknowledged the
          reality of leading a team and the constant need to stay informed without disrupting work.{' '}
        </p>
        <p>​</p>
        <p>
          For team members, the tone was practical and relatable. It focused on the everyday benefits of
          writing things down, such as staying organised, keeping track of goals, and saving time
          otherwise spent trying to piece together tasks.{' '}
        </p>
      </div>

      {/* ════════ FLOWCHART ════════ */}

      {/* Route 1 diamond + label */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.dia1} src={`${A}/vector2.svg`} alt="" />
      <div className={styles.route1Label}>
        <p className={styles.fcBold}>Route 1: </p>
        <p className={styles.fcReg}>Founders &amp; Team Leaders</p>
      </div>

      {/* Arrow from Route 1 down to first pill */}
      <Arrow left={260} top={724} len={73} src={`${A}/arrow6.svg`} />

      {/* Pill: Emails explaining how MyCheckins helps teams */}
      <div className={styles.pillR1A} />
      <p className={styles.pillR1AText}>
        Emails explaining how
        <br />
        MyCheckins helps teams
      </p>

      <Arrow left={180} top={846} len={50} src={`${A}/arrow3.svg`} />
      <Arrow left={340} top={847} len={109} src={`${A}/arrow1.svg`} />

      {/* Diamond: vector3 (Scenario A) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.dia2} src={`${A}/vector3.svg`} alt="" />
      <p className={styles.scenA1}>
        <span className={styles.fcBold}>Scenario A: </span>
        <span>
          <br />
          Team makes regular check-ins
        </span>
      </p>

      {/* Diamond: vector3 (Scenario B) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.dia3} src={`${A}/vector3.svg`} alt="" />
      <p className={styles.scenB1}>
        <span className={styles.fcBold}>Scenario </span>
        <span className={styles.fcBold}>B</span>
        <span className={styles.fcBold}>: </span>
        <span>
          <br />
          Team does not make regular check-ins
        </span>
      </p>

      <Arrow left={180} top={989} len={86} src={`${A}/arrow10.svg`} />
      <Arrow left={341} top={1048} len={185} src={`${A}/arrow13.svg`} />

      {/* Pill: Wrap-up email (Route 1) */}
      <div className={styles.pillR1B} />
      <p className={styles.pillR1BText}>Wrap-up email with monthly hours saved and other stats</p>

      {/* Pill: One last nudge (Route 1) */}
      <div className={styles.pillR1C} />
      <p className={styles.pillR1CText}>One last nudge with predictive  hours saved </p>

      {/* ── Route 2 ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.dia4} src={`${A}/vector5.svg`} alt="" />
      <div className={styles.route2Label}>
        <p className={styles.fcBold}>Route 2: </p>
        <p className={styles.fcReg}>Team Members</p>
      </div>

      <Arrow left={598} top={937} len={66.327} src={`${A}/arrow15.svg`} />

      {/* Pill: Emails describing how MyCheckins helps stay organised */}
      <div className={styles.pillR2A} />
      <p className={styles.pillR2AText}>Emails describing how MyCheckins helps stay organised</p>

      <Arrow left={522} top={1059} len={41} src={`${A}/arrow16.svg`} />
      <Arrow left={681} top={1076} len={109} src={`${A}/arrow1.svg`} />

      {/* Diamond: vector5 (Scenario A, Route 2) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.dia5} src={`${A}/vector5.svg`} alt="" />
      <p className={styles.scenA2}>
        <span className={styles.fcBold}>Scenario A: </span>
        <span>
          <br />
          Team member make regular check-ins
        </span>
      </p>

      {/* Diamond: vector5 (Scenario B, Route 2) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.dia6} src={`${A}/vector5.svg`} alt="" />
      <p className={styles.scenB2}>
        <span>
          Scenario B: <br />
        </span>
        <span className={styles.fcReg}>Team member doesnn’t make regular check-ins</span>
      </p>

      <Arrow left={522} top={1210} len={132} src={`${A}/arrow17.svg`} />
      <Arrow
        left={679}
        top={1296}
        len={178.975}
        src={`${A}/arrow18.svg`}
        rotate={89.05}
        containerW={5.965}
        containerH={179}
      />

      {/* Pill: Wrap-up email (Route 2) */}
      <div className={styles.pillR2B} />
      <p className={styles.pillR2BText}>Wrap-up email with monthly hours saved and other stats</p>

      {/* Pill: One last nudge (Route 2) */}
      <div className={styles.pillR2C} />
      <p className={styles.pillR2CText}>One last nudge with predictive  hours saved </p>

      {/* Mic illustration */}
      <div className={styles.micBox}>
        <div className={styles.micRotate}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${A}/group13-mic.svg`} alt="" className={styles.micImg} />
        </div>
      </div>

      {/* ── Click to Read E-mails ── */}
      <p className={styles.readHeading}>Click to Read E-mails</p>

      <p className={styles.route1Tag}>Route 1</p>
      <a className={styles.subj1} href="#">
        <span>Subject: Your meeting-free journey begins today.</span>
      </a>
      <p className={styles.subj2}>Subject: How long does it take to see results from MyCheckins?</p>
      <p className={styles.subj3}>Subject: In an alternative meeting-free universe...</p>

      <p className={styles.route2Tag}>Route 2</p>
      <p className={styles.subj4}>Subject: All meetings cancelled.</p>
      <p className={styles.subj5}>Subject: Do you know what your team is up to? - 3/8</p>

      {/* ── The Result ── */}
      <p className={styles.resultHeading}>
        The Result:
        <br />
        <br />
      </p>
      <p className={styles.resultPink}>
        Uncertainty was reduced{' '}
        <br />
        <br />
      </p>
      <p className={styles.resultBody}>
        Users were able to understand what to do with MyCheckins, why it mattered, and what would come
        next rather than simply being reminding to return.
      </p>

      {/* Stats row 1 labels */}
      <p className={styles.statLbl} style={{ left: 81, top: 2056.5, width: 102 }}>
        Activation rate increased from
      </p>
      <p className={styles.statLbl} style={{ left: 220, top: 2056.5, width: 120 }}>
        Improved Week 1 retention from
      </p>
      <p className={styles.statLbl} style={{ left: 380, top: 2056.5, width: 120 }}>
        Reduced early drop-off from
      </p>
      <p className={styles.statLbl} style={{ left: 537, top: 2056.5, width: 152 }}>
        Increased product adoption from{' '}
      </p>

      {/* Stats row 1 values */}
      <p className={styles.statVal} style={{ left: 81, top: 2094.5 }}>
        <span className={styles.statFrom}>32% → </span>
        <span className={styles.statTo}>41%</span>
      </p>
      <p className={styles.statVal} style={{ left: 220, top: 2094.5 }}>
        <span className={styles.statFrom}>11% → </span>
        <span className={styles.statTo}>16%</span>
      </p>
      <p className={styles.statVal} style={{ left: 380, top: 2094.5 }}>
        <span className={styles.statFrom}>23% → </span>
        <span className={styles.statTo}>18%</span>
      </p>
      <p className={styles.statVal} style={{ left: 537, top: 2094.5 }}>
        <span className={styles.statFrom}>27% → </span>
        <span className={styles.statTo}>38%</span>
      </p>

      {/* Stats row 2 labels */}
      <p className={styles.statLbl2} style={{ left: 80, top: 2207.5, width: 181 }}>
        For the first email, achieved an <br />
        open rate of
      </p>
      <p className={styles.statLbl2} style={{ left: 238, top: 2207.5, width: 177 }}>
        Throughout the <br />
        journey, achieved <br />
        an open rate of
      </p>
      <p className={styles.statLbl2} style={{ left: 390, top: 2207.5, width: 91 }}>
        Maintained click through rates of
      </p>

      {/* Stats row 2 values */}
      <p className={styles.statTo2} style={{ left: 80, top: 2263.5, width: 99 }}>
        48%
      </p>
      <p className={styles.statTo2} style={{ left: 238, top: 2263.5, width: 142 }}>
        32-42%
      </p>
      <p className={styles.statTo2} style={{ left: 390, top: 2263.5, width: 142 }}>
        6-8%
      </p>

      {/* Line graph */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.graph} src={`${A}/vector11-graph.svg`} alt="" />

      {/* Polygon star near footer */}
      <div className={styles.polyBox}>
        <div className={styles.polyRotate}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${A}/polygon1.svg`} alt="" className={styles.polyImg} />
        </div>
      </div>

      {/* ── Footer buttons ── */}
      <Link href="/#work" className={styles.primaryButton}>
        Next Project
      </Link>
      <Link href="/#contact" className={styles.secondaryButton}>
        Get in Touch
      </Link>
    </div>
  )
}

function MobileLayout() {
  return (
    <div className={styles.mobile}>
      <Header />
      <section className={styles.mobileSection}>
        <h1>Designing Retention for SaaS</h1>
        <p className={styles.mobileSub}>Keeping new users active and engaged via email strategy</p>
        <p>
          MyCheckins was the answer to every “Did we really need a meeting for this?” In other words,
          an async, text-based check-in tool designed to replace unnecessary meetings with clear,
          structured updates. It helped teams stay aligned while freeing up time to focus on actual
          work instead of calls.
        </p>
      </section>

      <section className={styles.mobileSection}>
        <h2>
          The Problem: <br />
          <span className={styles.mobilePink}>People were creating accounts... and disappearing.</span>
        </h2>
      </section>

      <section className={styles.mobileSection}>
        <h2>
          The Solution: <br />
          <span className={styles.mobilePink}>
            A set of emails sent over the course of a month addressing common concerns.
          </span>
        </h2>
        <p>
          Written from the founder’s point of view, the email journey was built around a simple idea:
          help people understand the product in a way that feels relevant to them. For leaders, it was
          about saving time, keeping teams aligned, and figuring out how to get everyone to adopt
          something new. For team members, it was about having fewer meetings, clearer priorities, and
          a controlled workday.
        </p>
        <p>
          Instead of just nudging people to come back, each email tried to be genuinely useful. It
          showed how to write better check-ins, how to build the habit, and what kind of results to
          expect. It also addressed the real reasons people drop off like not knowing where to start or
          not seeing immediate value. The idea was to reduce that friction step by step and make it
          easier for people to stick with it.
        </p>
        <p>
          Each email set expectations for what was coming next, creating a sense of continuity and
          helping users stay engaged throughout the journey.
        </p>
        <p>
          The journey ended with a custom wrap-up of the hours saved in a month using MyCheckins. If
          users failed to use the product, they were nudged to give it a chance in the next month with
          a predictive wrap-up of the hours they could possibly save.
        </p>
      </section>

      <section className={styles.mobileSection}>
        <h2>Tone of Voice</h2>
        <p className={styles.mobilePink}>Conversational, approachable, and grounded</p>
        <p>
          For founders and team leaders, the tone leaned into shared understanding . It acknowledged
          the reality of leading a team and the constant need to stay informed without disrupting work.
        </p>
        <p>
          For team members, the tone was practical and relatable. It focused on the everyday benefits
          of writing things down, such as staying organised, keeping track of goals, and saving time
          otherwise spent trying to piece together tasks.
        </p>
      </section>

      <section className={styles.mobileSection}>
        <h2>Click to Read E-mails</h2>
        <p className={styles.mobilePink}>Route 1</p>
        <p>Subject: Your meeting-free journey begins today.</p>
        <p>Subject: How long does it take to see results from MyCheckins?</p>
        <p>Subject: In an alternative meeting-free universe...</p>
        <p className={styles.mobilePink}>Route 2</p>
        <p>Subject: All meetings cancelled.</p>
        <p>Subject: Do you know what your team is up to? - 3/8</p>
      </section>

      <section className={styles.mobileSection}>
        <h2>The Result:</h2>
        <p className={styles.mobilePink}>Uncertainty was reduced</p>
        <p>
          Users were able to understand what to do with MyCheckins, why it mattered, and what would
          come next rather than simply being reminding to return.
        </p>
        <ul className={styles.mobileStats}>
          <li>Activation rate increased from 32% → 41%</li>
          <li>Improved Week 1 retention from 11% → 16%</li>
          <li>Reduced early drop-off from 23% → 18%</li>
          <li>Increased product adoption from 27% → 38%</li>
          <li>For the first email, achieved an open rate of 48%</li>
          <li>Throughout the journey, achieved an open rate of 32-42%</li>
          <li>Maintained click through rates of 6-8%</li>
        </ul>
      </section>

      <section className={styles.mobileSection}>
        <div className={styles.mobileButtons}>
          <Link href="/#work" className={styles.primaryButton}>
            Next Project
          </Link>
          <Link href="/#contact" className={styles.secondaryButton}>
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}

export default function EmailStrategyPage() {
  return (
    <main className={`${styles.page} projectCasePage`}>
      <DesktopCanvas />
      <MobileLayout />
    </main>
  )
}
