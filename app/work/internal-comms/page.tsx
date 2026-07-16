import Image from 'next/image'
import Link from 'next/link'
import { AmbientLayer, Starburst, Sparkle } from '@/components/Ambient/Ambient'
import Magnetic from '@/components/Fx/Magnetic'
import ScaledCanvas from '@/components/ScaledCanvas/ScaledCanvas'
import { getNextProject } from '@/lib/projects'
import styles from './page.module.css'

const NEXT = getNextProject('internal-comms')

const ASSET = '/images/internal-comms'

// ---------------------------------------------------------------------------
// Exact Figma coordinates — node 23:102 ("corp comms"), 1280×6473 desktop canvas.
// Every element below carries its precise left/top/width/height (and rotation)
// from the Figma arbitrary values. Rotated layers place the unrotated inner
// image box at the wrapper centre and rotate about that centre.
// ---------------------------------------------------------------------------

type Photo = {
  img: string
  // wrapper (rotated bounding box) center placement
  cx: number
  cy: number
  // inner unrotated image box
  w: number
  h: number
  rot: number
  radius?: number
  alt: string
  // scroll-reveal choreography: variant + stagger step within its visual cluster
  reveal: 'tilt' | 'pop'
  delay: number
}

// Each entry: wrapper left/top/width/height -> we compute center, then rotate
// the inner box about that center. cx/cy are the wrapper-box center.
const PHOTOS: Photo[] = [
  // Slack Wrap up creative 1 — wrapper l286.73 t2484 w295.027 h427.298, inner 271.728×412.331, rot 3.3
  { img: 'slack-wrapup.jpg', cx: 286.73 + 295.027 / 2, cy: 2484 + 427.298 / 2, w: 271.728, h: 412.331, rot: 3.3, alt: 'Slack wrap-up creative', reveal: 'pop', delay: 2 },
  // Asset 20 1 — wrapper l309 t1185 w260.449 h374.507, inner 188.777×340.837, rot 12.97
  { img: 'album-asset-20.png', cx: 309 + 260.449 / 2, cy: 1185 + 374.507 / 2, w: 188.777, h: 340.837, rot: 12.97, alt: 'Intuit-themed AI album cover', reveal: 'pop', delay: 1 },
  // Asset 22 1 — wrapper l180 t1077 w202.849 h352.21, inner 192.302×346.469, rot -1.76
  { img: 'album-asset-22.png', cx: 180 + 202.849 / 2, cy: 1077 + 352.21 / 2, w: 192.302, h: 346.469, rot: -1.76, alt: 'Intuit-themed AI album cover', reveal: 'pop', delay: 0 },
  // Asset 21 1 — wrapper l80 t1314 w271.725 h373.994, inner 185.209×335.569, rot -16.25
  { img: 'album-asset-21.png', cx: 80 + 271.725 / 2, cy: 1314 + 373.994 / 2, w: 185.209, h: 335.569, rot: -16.25, alt: 'Intuit-themed AI album cover', reveal: 'pop', delay: 2 },
  // Group 49 1 (microsite) — wrapper l628.8 t1916.81 w350.203 h502.899, inner 346×500, rot -0.48
  { img: 'microsite-group49.png', cx: 628.8 + 350.203 / 2, cy: 1916.81 + 502.899 / 2, w: 346, h: 500, rot: -0.48, alt: 'Album-maker microsite interface', reveal: 'tilt', delay: 0 },
  // image (6) 1 — wrapper l65.73 t2264 w442.725 h275.342, inner 422.831×237.843, rot -5.22
  { img: 'image-6.png', cx: 65.73 + 442.725 / 2, cy: 2264 + 275.342 / 2, w: 422.831, h: 237.843, rot: -5.22, alt: 'Wrap party event collateral', reveal: 'tilt', delay: 0 },
  // IMG_2013 1 — wrapper l119.11 t2482.8 w218.973 h282.236, inner 202.683×270.244, rot -3.54
  { img: 'img-2013.jpg', cx: 119.11 + 218.973 / 2, cy: 2482.8 + 282.236 / 2, w: 202.683, h: 270.244, rot: -3.54, alt: 'T-shirt printing workshop photo', reveal: 'pop', delay: 1 },
  // Communication mailer_4th Sep_1 1 — wrapper l71.54 t4414.97 w528.886 h906.978, inner 380×852, rot -10.5
  { img: 'mailer-communication.jpg', cx: 71.54 + 528.886 / 2, cy: 4414.97 + 906.978 / 2, w: 380, h: 852, rot: -10.5, alt: 'Communication mailer design', reveal: 'tilt', delay: 0 },
  // Ganesh Chathurthi_Mailer_21st Aug 1 — wrapper l465 t4608 w440.261 h706.072, inner 370×670, rot 6.21
  { img: 'mailer-ganesh.jpg', cx: 465 + 440.261 / 2, cy: 4608 + 706.072 / 2, w: 370, h: 670, rot: 6.21, alt: 'Ganesh Chaturthi mailer design', reveal: 'tilt', delay: 1 },
  // Parenting-Series-Mailer_2 1 — wrapper l154.54 t5210.3 w534.785 h1009.778, inner 382×960, rot 9.47
  { img: 'mailer-parenting.jpg', cx: 154.54 + 534.785 / 2, cy: 5210.3 + 1009.778 / 2, w: 382, h: 960, rot: 9.47, alt: 'Parenting series mailer design', reveal: 'tilt', delay: 1 },
  // WhatsApp Image 2026-05-18 — wrapper l568 t5183 w530.456 h741.19, inner 386.255×670.152, rot -13.34
  { img: 'whatsapp-mailer.jpg', cx: 568 + 530.456 / 2, cy: 5183 + 741.19 / 2, w: 386.255, h: 670.152, rot: -13.34, alt: 'PineLabs corporate emailer design', reveal: 'tilt', delay: 0 },
]

// Lime stars (Star 17) — l/t of the 20×21 box. `d` = reveal stagger step,
// reset per row so each step's stars slap in left-to-right.
const STARS = [
  { l: 78.73, t: 693, d: 0 },
  { l: 658.73, t: 793, d: 0 },
  { l: 678.73, t: 793, d: 1 },
  { l: 558.73, t: 1653, d: 0 },
  { l: 578.73, t: 1653, d: 1 },
  { l: 598.73, t: 1653, d: 2 },
  { l: 78.73, t: 2074, d: 0 },
  { l: 98.73, t: 2074, d: 1 },
  { l: 118.73, t: 2074, d: 2 },
  { l: 138.73, t: 2074, d: 3 },
]

// Squiggle / arrow vectors (rotated, wrapper center placement).
type Vec = { img: string; cx: number; cy: number; w: number; h: number; rot: number }
const VECTORS: Vec[] = [
  // Vector1 — wrapper l295.91 t861.36 w335.216 h149.567, inner 323.552×97.872, rot -9.43
  { img: 'vector1.svg', cx: 295.91 + 335.216 / 2, cy: 861.36 + 149.567 / 2, w: 323.552, h: 97.872, rot: -9.43 },
  // Vector15 — wrapper l688.49 t1231.5 w621.284 h618.22, inner 388.344×488.323, rot 46.24
  { img: 'vector15.svg', cx: 688.49 + 621.284 / 2, cy: 1231.5 + 618.22 / 2, w: 388.344, h: 488.323, rot: 46.24 },
  // Vector10 — wrapper l60 t1710.21 w488.214 h315.504, inner 454.588×179.855, rot -18.61
  { img: 'vector10.svg', cx: 60 + 488.214 / 2, cy: 1710.21 + 315.504 / 2, w: 454.588, h: 179.855, rot: -18.61 },
]

// Recipe "A Sprinkle of Humour" doodle lines (tiny rotated strokes), node 304:*.
const DOODLE_LINES: Vec[] = [
  { img: 'line5.svg', cx: 371.92 + 19.617 / 2, cy: 4196.43 + 9.88 / 2, w: 21.965, h: 0, rot: 26.73 },
  { img: 'line5.svg', cx: 371.92 + 19.617 / 2, cy: 4196.43 + 9.88 / 2, w: 21.965, h: 0, rot: 26.73 },
  { img: 'line7.svg', cx: 371.92 + 19.617 / 2, cy: 4196.43 + 9.88 / 2, w: 21.965, h: 0, rot: 26.73 },
  { img: 'line8.svg', cx: 388.73 + 3.642 / 2, cy: 4172.69 + 21.661 / 2, w: 21.965, h: 0, rot: 99.54 },
  { img: 'line9.svg', cx: 386.93 + 21.691 / 2, cy: 4222.26 + 3.456 / 2, w: 21.965, h: 0, rot: 9.05 },
  { img: 'line10.svg', cx: 362.39 + 20.721 / 2, cy: 4210.51 + 7.286 / 2, w: 21.965, h: 0, rot: 160.63 },
  { img: 'line11.svg', cx: 395.81 + 14.162 / 2, cy: 4183.02 + 16.79 / 2, w: 21.965, h: 0, rot: 130.15 },
  { img: 'line12.svg', cx: 399.27 + 14.659 / 2, cy: 4197.97 + 16.357 / 2, w: 21.965, h: 0, rot: 131.87 },
]

function rotStyle(cx: number, cy: number, w: number, h: number, rot: number): React.CSSProperties {
  return {
    position: 'absolute',
    left: cx - w / 2,
    top: cy - h / 2,
    width: w,
    height: h,
    transform: `rotate(${rot}deg)`,
    transformOrigin: 'center',
  }
}

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Project navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#contact">Contact &amp; About</Link>
      </nav>
      <div className={styles.projectStrip}>
        <span>Internal Communications</span>
      </div>
    </header>
  )
}

function DesktopCanvas() {
  return (
    <ScaledCanvas className={styles.canvas} ariaLabel="Internal Communications case study" height={6473}>
      <Header />

      {/* ===== Ambient decoration (behind content; ~one slow object per section) ===== */}
      <AmbientLayer>
        {/* Section 1 — AI Microsite (top, steps + album cluster) */}
        <Sparkle left={1010} top={320} size={30} delay={0.2} />
        <Starburst left={980} top={1480} size={520} opacity={0.4} />
        <Sparkle left={520} top={1020} size={22} delay={1.1} />
        <Sparkle left={1080} top={2360} size={26} delay={0.7} />

        {/* Section 2 — CSR pink band (mid) */}
        <Sparkle left={1130} top={3160} size={24} delay={1.4} />
        <Sparkle left={1090} top={3640} size={20} delay={0.5} />

        {/* Section 3 — Recipe / mailers (bottom) */}
        <Sparkle left={640} top={3850} size={24} delay={1.2} />
        <Starburst reverse left={900} top={4520} size={540} opacity={0.4} />
        <Sparkle left={1000} top={4120} size={28} delay={0.9} />
        <Sparkle left={1140} top={5320} size={22} delay={1.6} />
        <Sparkle left={70} top={5980} size={26} delay={0.3} />

        {/* Footer corner (below the mailers, behind nothing readable) */}
        <Sparkle left={560} top={6280} size={20} delay={0.6} />
      </AmbientLayer>

      {/* ===== Section 1: AI Powered Microsite Innovation ===== */}
      <h1 className={styles.h1} style={{ left: 80, top: 153, width: 888 }} data-reveal="rise">
        AI Powered Microsite Innovation
      </h1>
      <p className={styles.subhead} style={{ left: 80, top: 222, width: 776 }} data-reveal="rise" data-reveal-delay="1">
        Intuit&rsquo;s Greatest Hits
      </p>

      {/* black hero embed frame (Rectangle 20) */}
      <Image
        className={styles.frameImg}
        src={`${ASSET}/frame-hero.svg`}
        alt=""
        width={607}
        height={347}
        style={{ left: 80 - 6, top: 285 - 6, width: 595 + 12, height: 335 + 12 }}
        aria-hidden="true"
        data-reveal="tilt"
        data-reveal-delay="2"
      />

      <p className={styles.body} style={{ left: 720, top: 280, width: 319, height: 368 }} data-reveal="rise" data-reveal-delay="2">
        Intuit India hit 2,000 employees and wanted to celebrate with something big. The goal was to create a
        digital-first experience that gave every employee a custom keepsake. It had to be easy to execute and
        uncomplicated for users.
        <br />
        <br />
        So after many discussions, and throwing away more ambitions ideas (virtual museum, choose your own
        adventure game), we finally landed on
        <br />
        an AI-powered microsite through which employees could create custom Intuit-themed album covers for
        themselves.
      </p>

      {/* Step 1 */}
      <p className={styles.stepHead} style={{ left: 78.73, top: 717, width: 65 }} data-reveal="rise">
        Step 1
      </p>
      <p className={styles.body} style={{ left: 78.73, top: 757, width: 320, height: 170 }} data-reveal="rise" data-reveal-delay="1">
        <span className={styles.bold}>Mapping &amp; Prepping: </span>
        <br />
        <span>
          We started by identifying six of Intuit&rsquo;s core themes such as Customer-Driven Innovation, Grow
          with Intuit and Engineer Culture. Every theme was mapped to 3 albums, giving us 18 distinct album
          concepts to build from. We then shortlisted iconic album cover styles that could be reinterpreted for
          Intuit.{' '}
        </span>
      </p>

      {/* Step 2 */}
      <p className={styles.stepHead} style={{ left: 658.73, top: 817, width: 96 }} data-reveal="rise">
        Step 2
      </p>
      <p className={styles.body} style={{ left: 667.73, top: 868, width: 300, height: 204 }} data-reveal="rise" data-reveal-delay="1">
        <span className={styles.bold}>Writing Prompts for Image Generation: </span>
        <span>
          {' '}
          Every prompt was based on an iconic album cover. It consisted of a base description of and three
          elements that could be changed. Each of these elements had three options. This allowed employees to
          shape and personalise the output. With 18 albums and 27 combinations each, there were 486 possible
          variations.{' '}
        </span>
      </p>

      {/* prompt example panel (pink box) */}
      <div
        className={styles.promptBox}
        style={{ left: 658.73, top: 1057, width: 327, height: 380 }}
        aria-hidden="true"
        data-reveal="pop"
        data-reveal-delay="2"
      />
      <div className={styles.body} style={{ left: 678.73, top: 1086, width: 285, height: 317 }} data-reveal="rise" data-reveal-delay="3">
        <p style={{ margin: 0 }}>
          <span className={styles.boldPink}>What the prompts looked like:</span>
          <br />
          <br />
          In the style of an old school utopian comic book, show me
          <span className={styles.bold}> a robot made of AI chips </span>
          against the backdrop of <span className={styles.bold}>neon buildings</span>.{' '}
          <span className={styles.bold}>Puzzle pieces</span> are flying around.
        </p>
        <p style={{ margin: 0 }}>&#8203;</p>
        <p style={{ margin: 0 }}>Group of engineers working</p>
        <p style={{ margin: 0 }}>Robot made of AI pipelines</p>
        <p style={{ margin: 0 }}>Glowing human</p>
        <p style={{ margin: 0 }}>&#8203;</p>
        <p style={{ margin: 0 }}>Floating skyscrapers</p>
        <p style={{ margin: 0 }}>A large futuristic fort</p>
        <p style={{ margin: 0 }}>Metallic trees</p>
        <p style={{ margin: 0 }}>&#8203;</p>
        <p style={{ margin: 0 }}>Binary code</p>
        <p style={{ margin: 0 }}>Open locks</p>
        <p style={{ margin: 0 }}>Hoverboards </p>
        <p style={{ margin: 0 }}>&#8203;</p>
      </div>

      {/* prompt-number badges (lime "1/2/3") */}
      <p className={styles.numTag} style={{ left: 959.73, top: 1138 }} data-reveal="pop" data-reveal-delay="3">1</p>
      <p className={styles.numTag} style={{ left: 672.73, top: 1204 }} data-reveal="pop" data-reveal-delay="4">1</p>
      <p className={styles.numTag} style={{ left: 949.73, top: 1154 }} data-reveal="pop" data-reveal-delay="4">2</p>
      <p className={styles.numTag} style={{ left: 672.73, top: 1273 }} data-reveal="pop" data-reveal-delay="5">2</p>
      <p className={styles.numTag} style={{ left: 672.73, top: 1340 }} data-reveal="pop" data-reveal-delay="6">3</p>

      {/* Step 3 */}
      <p className={styles.stepHead} style={{ left: 558.73, top: 1677, width: 80 }} data-reveal="rise">
        Step 3
      </p>
      <div className={styles.body} style={{ left: 558.73, top: 1716, width: 300, height: 295 }} data-reveal="rise" data-reveal-delay="1">
        <p style={{ margin: 0 }}>
          <span className={styles.bold}>Playing with Microsite Copy: </span>
          <br />
          <span>
            With the visuals in place, I shaped the microsite into an experience people would want explore and
            share.
          </span>
        </p>
        <p style={{ margin: 0 }}>
          The copy kept the album-making process easy to follow and tied it all together with music-inspired
          language. Each step was quick and satisfying, guiding employees from choices to their final album cover
          without friction.
        </p>
        <p style={{ margin: 0 }}>&#8203;</p>
      </div>

      {/* Step 4 */}
      <p className={styles.stepHead} style={{ left: 77.73, top: 2098, width: 491 }} data-reveal="rise">
        Step 4
      </p>
      <div className={styles.body} style={{ left: 77.73, top: 2133, width: 303, height: 116 }} data-reveal="rise" data-reveal-delay="1">
        <p style={{ margin: 0 }}>
          <span className={styles.bold}>T-shirt Drives, Wrap Parties and More: </span>
          <span>
            <br />
            The album-making experience was a great success! But we wanted to keep the vibe going and took it
            offline. The team and I suggested and created collaterals for a t-shirt printing workshop and a live
            karaoke party.
          </span>
        </p>
        <p style={{ margin: 0 }}>&#8203;</p>
      </div>

      {/* ===== Section 2: Reimagining CSR as an Interactive Classroom ===== */}
      <div
        className={styles.csrBand}
        style={{ left: 0, top: 3067, width: 1280, height: 680 }}
        aria-hidden="true"
        data-reveal="fade"
      />
      <h1 className={styles.h1} style={{ left: 80, top: 3127, width: 1140, height: 170 }} data-reveal="rise">
        Reimagining CSR as an Interactive Classroom
      </h1>
      <p className={styles.subhead} style={{ left: 80, top: 3196, width: 776 }} data-reveal="rise" data-reveal-delay="1">
        Intuit Rise: From India to Global
      </p>
      <div className={styles.body} style={{ left: 80, top: 3249, width: 260, height: 398 }} data-reveal="rise" data-reveal-delay="2">
        <p style={{ margin: 0 }}>
          The Intuit Rise Girl Child Empowerment Program supports underprivileged girls in India from 8th grade
          through graduation. It began as an initiative funded by Intuit employees in India and was opening up for
          global participation. Instead of sending an emailer that might be ignored, we built something people
          could explore.
          <br />
          <br />
        </p>
        <p style={{ margin: 0 }}>
          We created a 360&deg; interactive classroom in which very object became a way to access different parts
          of the program, from impact stats and student journeys to aspirations, scholarships, and STEM education
          initiatives.
          <br />
          <br />
        </p>
        <p style={{ margin: 0 }}>
          Beyond awareness, the classroom was built to drive action. Each interaction led to a donation
          touchpoint, turning curiosity into contribution.
        </p>
      </div>
      {/* black CSR embed frame (Rectangle 21) */}
      <Image
        className={styles.frameImg}
        src={`${ASSET}/frame-csr.svg`}
        alt=""
        width={674.874}
        height={402.874}
        style={{ left: 395 - 7.437, top: 3249 - 7.437, width: 660 + 14.874, height: 388 + 14.874 }}
        aria-hidden="true"
        data-reveal="tilt"
        data-reveal-delay="1"
      />

      {/* ===== Section 3: Recipe for Perfect Corporate Emailers ===== */}
      <h1 className={styles.h1} style={{ left: 80, top: 3960, width: 900 }} data-reveal="rise">
        Recipe for Perfect Corporate Emailers
      </h1>
      <p className={styles.subhead} style={{ left: 80, top: 4029, width: 776 }} data-reveal="rise" data-reveal-delay="1">
        As seen on PineLabs
      </p>

      {/* recipe ingredient list (Playfair) */}
      <p className={styles.recipeItalic} style={{ left: 100, top: 4285, width: 340 }} data-reveal="rise" data-reveal-delay="1">1 Cup</p>
      <p className={styles.recipeReg} style={{ left: 100, top: 4305, width: 248 }} data-reveal="rise" data-reveal-delay="1">Clear Communication</p>
      <p className={styles.recipeItalic} style={{ left: 601, top: 4285, width: 276 }} data-reveal="rise" data-reveal-delay="2">1 Tablespoon</p>
      <p className={styles.recipeReg} style={{ left: 601, top: 4305, width: 248 }} data-reveal="rise" data-reveal-delay="2">Warmth &amp; Human-ness</p>
      <p className={styles.recipeItalic} style={{ left: 428, top: 4165, width: 340 }} data-reveal="rise" data-reveal-delay="0">A Sprinkle of</p>
      <p className={styles.recipeReg} style={{ left: 428, top: 4185, width: 248 }} data-reveal="rise" data-reveal-delay="0">Humour</p>
      <p className={styles.recipeItalic} style={{ left: 100, top: 4685, width: 100 }} data-reveal="rise" data-reveal-delay="3">1 Cup</p>

      {/* recipe bowl + spoon doodles */}
      <Image
        src={`${ASSET}/ellipse6.svg`}
        alt=""
        width={199.723}
        height={39.078}
        style={rotStyle(102.49 + 200.484 / 2, 4146.18 + 43.172 / 2, 199.723, 39.078, 178.82)}
        aria-hidden="true"
        data-reveal="fade"
        data-reveal-delay="2"
      />
      <Image
        src={`${ASSET}/ellipse7.svg`}
        alt=""
        width={99.774}
        height={199.548}
        style={rotStyle(102.83 + 201.788 / 2, 4166.49 + 104.332 / 2, 99.774, 199.548, -91.32)}
        aria-hidden="true"
        data-reveal="fade"
        data-reveal-delay="2"
      />
      {/* spoon (ellipse8 + ellipse9 + handle rectangle78) */}
      <Image
        src={`${ASSET}/frame-microsite-embed.svg`}
        alt=""
        width={183.237}
        height={14.176}
        style={rotStyle(545.63 + 161.31 / 2, 4185 + 111.83 / 2, 183.237, 14.176, -33.06)}
        aria-hidden="true"
        data-reveal="fade"
        data-reveal-delay="3"
      />
      <Image
        src={`${ASSET}/ellipse9.svg`}
        alt=""
        width={84.006}
        height={48.103}
        style={rotStyle(475.63 + 96.646 / 2, 4265 + 86.138 / 2, 84.006, 48.103, -33.06)}
        aria-hidden="true"
        data-reveal="fade"
        data-reveal-delay="3"
      />
      <Image
        src={`${ASSET}/ellipse8.svg`}
        alt=""
        width={86.089}
        height={40.795}
        style={rotStyle(474 + 94.406 / 2, 4263 + 81.15 / 2, 86.089, 40.795, -33.06)}
        aria-hidden="true"
        data-reveal="fade"
        data-reveal-delay="3"
      />
      {/* "sprinkle of humour" doodle strokes */}
      {DOODLE_LINES.map((d, i) => (
        <Image
          key={`doodle-${i}`}
          src={`${ASSET}/${d.img}`}
          alt=""
          width={Math.max(1, Math.round(d.w))}
          height={4}
          style={{ ...rotStyle(d.cx, d.cy, d.w, 3, d.rot) }}
          aria-hidden="true"
        />
      ))}

      {/* ===== Squiggle vectors ===== */}
      {VECTORS.map((v) => (
        <Image
          key={v.img}
          src={`${ASSET}/${v.img}`}
          alt=""
          width={Math.round(v.w)}
          height={Math.round(v.h)}
          style={rotStyle(v.cx, v.cy, v.w, v.h, v.rot)}
          aria-hidden="true"
          data-reveal="fade"
          data-reveal-delay="2"
        />
      ))}

      {/* ===== Lime stars ===== */}
      {STARS.map((s, i) => (
        <Image
          key={`star-${i}`}
          src={`${ASSET}/star17.svg`}
          alt=""
          width={20}
          height={21}
          style={{ position: 'absolute', left: s.l, top: s.t, width: 20, height: 21 }}
          aria-hidden="true"
          data-reveal="pop"
          data-reveal-delay={s.d}
        />
      ))}

      {/* ===== Photos / album covers / mailers ===== */}
      {PHOTOS.map((p) => (
        <div
          key={p.img}
          className={styles.photo}
          style={{ ...rotStyle(p.cx, p.cy, p.w, p.h, p.rot), borderRadius: p.radius ?? 0 }}
          data-reveal={p.reveal}
          data-reveal-delay={p.delay}
        >
          <Image src={`${ASSET}/${p.img}`} alt={p.alt} fill sizes="430px" />
        </div>
      ))}

      {/* ===== Footer buttons ===== */}
      <div className={styles.btnSlot} style={{ left: 80, top: 6339 }} data-reveal="pop">
        <Magnetic>
          <Link className={styles.primaryButton} href={NEXT.href}>
            Next Project
          </Link>
        </Magnetic>
      </div>
      <div className={styles.btnSlot} style={{ left: 293, top: 6340 }} data-reveal="pop" data-reveal-delay="1">
        <Magnetic>
          <Link className={styles.secondaryButton} href="/#contact">
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

      <section className={styles.mobileSection}>
        <h1 data-reveal="rise">AI Powered Microsite Innovation</h1>
        <p className={styles.mobileSubhead} data-reveal="rise" data-reveal-delay="1">Intuit&rsquo;s Greatest Hits</p>
        <div className={styles.mobileEmbed} aria-hidden="true" data-reveal="tilt" data-reveal-delay="2" />
        <p data-reveal="rise" data-reveal-delay="2">
          Intuit India hit 2,000 employees and wanted to celebrate with something big. The goal was to create a
          digital-first experience that gave every employee a custom keepsake. It had to be easy to execute and
          uncomplicated for users.
          <br />
          <br />
          So after many discussions, and throwing away more ambitions ideas (virtual museum, choose your own
          adventure game), we finally landed on an AI-powered microsite through which employees could create
          custom Intuit-themed album covers for themselves.
        </p>

        <h3 data-reveal="rise">Step 1</h3>
        <p data-reveal="rise" data-reveal-delay="1">
          <strong>Mapping &amp; Prepping: </strong>
          We started by identifying six of Intuit&rsquo;s core themes such as Customer-Driven Innovation, Grow
          with Intuit and Engineer Culture. Every theme was mapped to 3 albums, giving us 18 distinct album
          concepts to build from. We then shortlisted iconic album cover styles that could be reinterpreted for
          Intuit.
        </p>

        <h3 data-reveal="rise">Step 2</h3>
        <p data-reveal="rise" data-reveal-delay="1">
          <strong>Writing Prompts for Image Generation: </strong>
          Every prompt was based on an iconic album cover. It consisted of a base description of and three
          elements that could be changed. Each of these elements had three options. This allowed employees to
          shape and personalise the output. With 18 albums and 27 combinations each, there were 486 possible
          variations.
        </p>

        <div className={styles.mobileGrid}>
          <Image src={`${ASSET}/album-asset-22.png`} alt="Intuit-themed AI album cover" width={192} height={346} data-reveal="pop" />
          <Image src={`${ASSET}/album-asset-20.png`} alt="Intuit-themed AI album cover" width={189} height={341} data-reveal="pop" data-reveal-delay="1" />
          <Image src={`${ASSET}/album-asset-21.png`} alt="Intuit-themed AI album cover" width={185} height={336} data-reveal="pop" data-reveal-delay="2" />
          <Image src={`${ASSET}/microsite-group49.png`} alt="Album-maker microsite interface" width={346} height={500} data-reveal="tilt" />
        </div>

        <h3 data-reveal="rise">Step 3</h3>
        <p data-reveal="rise" data-reveal-delay="1">
          <strong>Playing with Microsite Copy: </strong>
          With the visuals in place, I shaped the microsite into an experience people would want explore and
          share. The copy kept the album-making process easy to follow and tied it all together with
          music-inspired language. Each step was quick and satisfying, guiding employees from choices to their
          final album cover without friction.
        </p>

        <h3 data-reveal="rise">Step 4</h3>
        <p data-reveal="rise" data-reveal-delay="1">
          <strong>T-shirt Drives, Wrap Parties and More: </strong>
          The album-making experience was a great success! But we wanted to keep the vibe going and took it
          offline. The team and I suggested and created collaterals for a t-shirt printing workshop and a live
          karaoke party.
        </p>
        <div className={styles.mobileGrid}>
          <Image src={`${ASSET}/image-6.png`} alt="Wrap party event collateral" width={423} height={238} data-reveal="tilt" />
          <Image src={`${ASSET}/img-2013.jpg`} alt="T-shirt printing workshop photo" width={203} height={270} data-reveal="pop" data-reveal-delay="1" />
          <Image src={`${ASSET}/slack-wrapup.jpg`} alt="Slack wrap-up creative" width={272} height={412} data-reveal="pop" data-reveal-delay="2" />
        </div>
      </section>

      <section className={`${styles.mobileSection} ${styles.mobileCsr}`}>
        <h2 data-reveal="rise">Reimagining CSR as an Interactive Classroom</h2>
        <p className={styles.mobileSubhead} data-reveal="rise" data-reveal-delay="1">Intuit Rise: From India to Global</p>
        <div className={styles.mobileEmbed} aria-hidden="true" data-reveal="tilt" data-reveal-delay="2" />
        <p data-reveal="rise" data-reveal-delay="2">
          The Intuit Rise Girl Child Empowerment Program supports underprivileged girls in India from 8th grade
          through graduation. It began as an initiative funded by Intuit employees in India and was opening up for
          global participation. Instead of sending an emailer that might be ignored, we built something people
          could explore.
          <br />
          <br />
          We created a 360&deg; interactive classroom in which very object became a way to access different parts
          of the program, from impact stats and student journeys to aspirations, scholarships, and STEM education
          initiatives.
          <br />
          <br />
          Beyond awareness, the classroom was built to drive action. Each interaction led to a donation
          touchpoint, turning curiosity into contribution.
        </p>
      </section>

      <section className={styles.mobileSection}>
        <h2 data-reveal="rise">Recipe for Perfect Corporate Emailers</h2>
        <p className={styles.mobileSubhead} data-reveal="rise" data-reveal-delay="1">As seen on PineLabs</p>
        <ul className={styles.mobileRecipe}>
          <li data-reveal="rise"><em>1 Cup</em> Clear Communication</li>
          <li data-reveal="rise" data-reveal-delay="1"><em>1 Tablespoon</em> Warmth &amp; Human-ness</li>
          <li data-reveal="rise" data-reveal-delay="2"><em>A Sprinkle of</em> Humour</li>
        </ul>
        <div className={styles.mobileGrid}>
          <Image src={`${ASSET}/mailer-communication.jpg`} alt="Communication mailer design" width={380} height={852} data-reveal="tilt" />
          <Image src={`${ASSET}/mailer-ganesh.jpg`} alt="Ganesh Chaturthi mailer design" width={370} height={670} data-reveal="tilt" data-reveal-delay="1" />
          <Image src={`${ASSET}/whatsapp-mailer.jpg`} alt="PineLabs corporate emailer design" width={386} height={670} data-reveal="tilt" />
          <Image src={`${ASSET}/mailer-parenting.jpg`} alt="Parenting series mailer design" width={382} height={960} data-reveal="tilt" data-reveal-delay="1" />
        </div>

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
      </section>
    </div>
  )
}

export default function InternalCommsPage() {
  return (
    <main className={`${styles.page} projectCasePage`}>
      <DesktopCanvas />
      <MobileLayout />
    </main>
  )
}
