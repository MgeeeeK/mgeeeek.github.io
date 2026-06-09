import Link from 'next/link'
import styles from './page.module.css'

const IMG = '/images/fintech'

const playfairBold = {
  fontFamily: 'var(--font-playfair), serif',
  fontWeight: 700,
  fontStyle: 'normal' as const,
}
const helvBold = {
  fontFamily: "'Helvetica', Arial, sans-serif",
  fontWeight: 700,
  fontStyle: 'normal' as const,
}
const helvReg = {
  fontFamily: "'Helvetica', Arial, sans-serif",
  fontWeight: 400,
  fontStyle: 'normal' as const,
}

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Project navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#contact">Contact &amp; About</Link>
      </nav>
      <div className={styles.projectStrip}>
        <span>Fintech Strategy</span>
      </div>
    </header>
  )
}

function DesktopCanvas() {
  return (
    <div className={styles.canvas} aria-label="Fintech case study">
      <Header />

      {/* ===== Title ===== */}
      <p
        className={styles.abs}
        style={{
          ...playfairBold,
          left: 80,
          top: 153,
          width: 747,
          height: 63,
          fontSize: 48,
          lineHeight: '0.836550064086914',
          color: '#000000',
          wordBreak: 'break-word',
        }}
      >
        Nothing is boring.
      </p>

      {/* ===== Subtitle ===== */}
      <p
        className={styles.abs}
        style={{
          ...helvBold,
          left: 80,
          top: 222,
          width: 776,
          height: 23,
          fontSize: 20,
          lineHeight: 1.115,
          color: '#ff1fa9',
          wordBreak: 'break-word',
        }}
      >
        A lesson in writing and strategising for fintech
      </p>

      {/* ===== Intro body ===== */}
      <p
        className={styles.abs}
        style={{
          ...helvReg,
          left: 80,
          top: 265,
          width: 640,
          height: 264,
          fontSize: 15,
          lineHeight: 1.115,
          color: '#000000',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        <span style={{ ...playfairBold, lineHeight: 1.115 }}>
          Brands: Bharat Connect, Razorpay, KreditBee
        </span>
        <br aria-hidden />
        <br aria-hidden />
        Like everyone else, I groaned when I was given my first fintech brand to work on. “It’s
        so dull, the clients are so rigid, I want to work on something fun,” the complaints were
        endless. But I am a better writer and a more understanding person for having worked with
        fintech brands.
        <br aria-hidden />
        <br aria-hidden />I learnt that it was my duty to make content interesting and to simplify
        complex subjects so that they are engaging and easy to digest.
        <br aria-hidden />
        <br aria-hidden />
        Eventually, I grew to enjoy the challenge of meeting multiple requirements while still
        maintaining the audience’s interest.{' '}
        <br aria-hidden />
        <br aria-hidden />
        Here are some of my favourite ways to do so:
      </p>

      {/* ========================================================= */}
      {/* CARDS (painted in Figma z-order)                          */}
      {/* ========================================================= */}

      {/* rectangle96 — rotated -13.33deg wrapper, left 84 top 1061 w 283.712 h 325.296 */}
      <div
        className={styles.rotWrap}
        style={{ left: 84, top: 1061, width: 283.712, height: 325.296 }}
      >
        <div style={{ transform: 'rotate(-13.33deg)', transformOrigin: 'center' }}>
          <a
            className={styles.card}
            style={{ width: 225, height: 281, borderRadius: 7 }}
            href="https://www.instagram.com/p/DSwOlU3jMlR/?img_index=1"
            target="_blank"
            rel="noreferrer"
          >
            <img className={styles.cardImg} src={`${IMG}/rectangle96.png`} alt="" />
          </a>
        </div>
      </div>

      {/* dark overlay over rectangle96 (rotated wrapper, same box) */}
      <div
        className={styles.rotWrap}
        style={{ left: 84, top: 1061, width: 283.725, height: 325.305 }}
      >
        <div style={{ transform: 'rotate(-13.33deg)', transformOrigin: 'center' }}>
          <a
            className={styles.cardOverlay}
            style={{ width: 225, height: 281, borderRadius: 7 }}
            href="https://www.instagram.com/p/DR6lWEBEswk/?img_index=1"
            target="_blank"
            rel="noreferrer"
            aria-hidden
          />
        </div>
      </div>

      {/* rectangle102 base bg card — left 352 top 866 w 224.8 h 281 */}
      <a
        className={styles.card}
        style={{ left: 352, top: 866, width: 224.8, height: 281, borderRadius: 7, background: '#ffc4e8' }}
        href="https://www.instagram.com/p/DMxlzIiSPOu/?img_index=1"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />
      {/* rectangle102 image */}
      <a
        className={styles.card}
        style={{ left: 352, top: 866, width: 224.8, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DMxlzIiSPOu/?img_index=1"
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.cardImg} src={`${IMG}/rectangle102.png`} alt="" />
      </a>
      {/* dark overlay over rectangle102 */}
      <a
        className={styles.cardOverlay}
        style={{ left: 352, top: 866, width: 225, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DR6lWEBEswk/?img_index=1"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />

      {/* rectangle98 — left 549 top 1512 w 225 h 281 */}
      <a
        className={styles.card}
        style={{ left: 549, top: 1512, width: 225, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DRW5nuSEThN/?img_index=1"
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.cardImg} src={`${IMG}/rectangle98.png`} alt="" />
      </a>

      {/* rectangle100 — left 350 top 1512 w 158 h 281 */}
      <a
        className={styles.card}
        style={{ left: 350, top: 1512, width: 158, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DRR5jH6iJ-R/"
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.cardImg} src={`${IMG}/rectangle100.png`} alt="" />
      </a>

      {/* rectangle106 — rotated 20.98deg + skewX 0.49, wrapper left 679.24 top 771 w 242.041 h 318.304 */}
      <div
        className={styles.rotWrap}
        style={{ left: 679.24, top: 771, width: 242.041, height: 318.304 }}
      >
        <div style={{ transform: 'rotate(20.98deg) skewX(0.49deg)', transformOrigin: 'center' }}>
          <a
            className={styles.card}
            style={{ width: 153.853, height: 281, borderRadius: 7 }}
            href="https://www.instagram.com/p/DXEMmaDEzXV/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={styles.cardImg} src={`${IMG}/rectangle106.png`} alt="" />
          </a>
        </div>
      </div>

      {/* ===== "Be educative" card (mask group 920:22) — pink base 403:5 (sits under the image) ===== */}
      <a
        className={styles.card}
        style={{ left: 152.58, top: 680.35, width: 158.308, height: 281.548, borderRadius: 7, background: '#ffc4e8', borderColor: '#ff1fa9' }}
        href="https://www.instagram.com/p/DU5lwkzkda-/"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />
      {/* mask image (image10) clipped to the 403:5 rect */}
      <div
        className={styles.maskClip}
        style={{ left: 152.58, top: 680.35, width: 158.308, height: 281.548, borderRadius: 7 }}
        aria-hidden
      >
        <img
          src={`${IMG}/image10.png`}
          alt=""
          style={{
            position: 'absolute',
            left: 142.72 - 152.58,
            top: 674.02 - 680.35,
            width: 173.642,
            height: 311.815,
            maxWidth: 'none',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* rectangle97 — left 720 top 1189 w 158 h 281 */}
      <a
        className={styles.card}
        style={{ left: 720, top: 1189, width: 158, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DTIN5eOgQCW/"
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.cardImg} src={`${IMG}/rectangle97.png`} alt="" />
      </a>

      {/* rectangle95 — left 195 top 1189 w 225 h 281 */}
      <a
        className={styles.card}
        style={{ left: 195, top: 1189, width: 225, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DR6lWEBEswk/?img_index=1"
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.cardImg} src={`${IMG}/rectangle95.png`} alt="" />
      </a>
      {/* dark overlay over rectangle95 */}
      <a
        className={styles.cardOverlay}
        style={{ left: 195, top: 1189, width: 225, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DR6lWEBEswk/?img_index=1"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />

      {/* dark overlay over rectangle98 (959:278) — left 549 top 1512 */}
      <a
        className={styles.cardOverlay}
        style={{ left: 549, top: 1512, width: 225, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DR6lWEBEswk/?img_index=1"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />

      {/* rectangle92 — left 461 top 1189 w 224 h 281 */}
      <a
        className={styles.card}
        style={{ left: 461, top: 1189, width: 224, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DQwkxA3jGas/"
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.cardImg} src={`${IMG}/rectangle92.png`} alt="" />
      </a>

      {/* ===== "Hop on a trend" card group 456:2 — pink base 403:6 + label 51:9 ===== */}
      <a
        className={styles.card}
        style={{ left: 352, top: 543, width: 158, height: 281, borderRadius: 7, background: '#ffc4e8' }}
        href="https://www.instagram.com/p/DRqzsdRktBc/"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />
      <p
        className={styles.abs}
        style={{
          ...helvReg,
          left: 433,
          top: 671,
          width: 158,
          height: 34,
          fontSize: 15,
          lineHeight: 1.115,
          color: '#000000',
          textAlign: 'center',
          transform: 'translateX(-50%)',
          wordBreak: 'break-word',
        }}
      >
        Hop on a trend
      </p>

      {/* pink base 403:8 (Address a problem) — left 553 top 543 */}
      <a
        className={styles.card}
        style={{ left: 553, top: 543, width: 158, height: 281, borderRadius: 7, background: '#ffc4e8' }}
        href="https://www.instagram.com/p/DS1bkqoj0yj/"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />

      {/* label "Add an interaction" 959:195 — center left 461 top 978 */}
      <p
        className={styles.abs}
        style={{
          ...playfairBold,
          left: 461,
          top: 978,
          width: 158,
          height: 58,
          fontSize: 24,
          lineHeight: 1.115,
          color: '#bbff6c',
          textAlign: 'center',
          transform: 'translateX(-50%)',
          wordBreak: 'break-word',
        }}
      >
        Add an interaction
      </p>

      {/* label "Provide proof" 959:284 — center left 307.5 top 1307 */}
      <p
        className={styles.abs}
        style={{
          ...playfairBold,
          left: 307.5,
          top: 1307,
          width: 225,
          height: 58,
          fontSize: 24,
          lineHeight: 1.115,
          color: '#bbff6c',
          textAlign: 'center',
          transform: 'translateX(-50%)',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {`Provide `}
        <br aria-hidden />
        {`proof `}
      </p>

      {/* ===== "Hop on a trend" mask group 916:33 (image11 over 403:6 rect) ===== */}
      <div
        className={styles.maskClip}
        style={{ left: 352, top: 543, width: 158, height: 281, borderRadius: 7 }}
        aria-hidden
      >
        <img
          src={`${IMG}/image11.png`}
          alt=""
          style={{
            position: 'absolute',
            left: 337 - 352,
            top: 509 - 543,
            width: 200,
            height: 354,
            maxWidth: 'none',
            objectFit: 'cover',
          }}
        />
      </div>
      {/* dark overlay over hop-on-a-trend card 916:35 */}
      <a
        className={styles.cardOverlay}
        style={{ left: 352, top: 543, width: 158, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DRqzsdRktBc/"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />

      {/* dark overlay over Be-educative card 920:23 — left 152 top 679 w 159 h 283 */}
      <a
        className={styles.cardOverlay}
        style={{ left: 152, top: 679, width: 159, height: 283, borderRadius: 7 }}
        href="https://www.instagram.com/p/DRqzsdRktBc/"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />

      {/* label "Be educative" 920:26 — center left 232 top 810 */}
      <p
        className={styles.abs}
        style={{
          ...playfairBold,
          left: 232,
          top: 810,
          width: 158,
          height: 28,
          fontSize: 24,
          lineHeight: 1.115,
          color: '#bbff6c',
          textAlign: 'center',
          transform: 'translateX(-50%)',
          wordBreak: 'break-word',
        }}
      >
        Be educative
      </p>

      {/* label "Hop on a trend" (two-line) 916:36 — center left 431 top 660 */}
      <div
        className={styles.abs}
        style={{
          ...playfairBold,
          left: 431,
          top: 660,
          width: 158,
          height: 53,
          fontSize: 24,
          lineHeight: 0,
          color: '#bbff6c',
          textAlign: 'center',
          transform: 'translateX(-50%)',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        <p style={{ lineHeight: 1.115, margin: 0 }}>{`Hop on `}</p>
        <p style={{ lineHeight: 1.115, margin: 0 }}>a trend</p>
      </div>

      {/* ===== "Address a problem" mask group 916:53 (screenshot2 over 403:8 rect) ===== */}
      <div
        className={styles.maskClip}
        style={{ left: 553, top: 543, width: 158, height: 281, borderRadius: 7 }}
        aria-hidden
      >
        <img
          src={`${IMG}/screenshot2.png`}
          alt=""
          style={{
            position: 'absolute',
            left: 547 - 553,
            top: 526 - 543,
            width: 167,
            height: 298,
            maxWidth: 'none',
            objectFit: 'cover',
          }}
        />
      </div>
      {/* dark overlay over Address-a-problem card 916:54 */}
      <a
        className={styles.cardOverlay}
        style={{ left: 553, top: 543, width: 158, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DRqzsdRktBc/"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />

      {/* label "Address a problem" 916:57 — center left 632 top 660 */}
      <p
        className={styles.abs}
        style={{
          ...playfairBold,
          left: 632,
          top: 660,
          width: 158,
          height: 35,
          fontSize: 24,
          lineHeight: 1.115,
          color: '#bbff6c',
          textAlign: 'center',
          transform: 'translateX(-50%)',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {`Address `}
        <br aria-hidden />a problem
      </p>

      {/* dark overlay rotated card 959:242 — wrapper left 677.08 top 771.03 w 248.135 h 318.942 rot 20.98 */}
      <div
        className={styles.rotWrap}
        style={{ left: 677.08, top: 771.03, width: 248.135, height: 318.942 }}
      >
        <div style={{ transform: 'rotate(20.98deg)', transformOrigin: 'center' }}>
          <a
            className={styles.cardOverlay}
            style={{ width: 158, height: 281, borderRadius: 7 }}
            href="https://www.instagram.com/p/DRqzsdRktBc/"
            target="_blank"
            rel="noreferrer"
            aria-hidden
          />
        </div>
      </div>

      {/* rectangle104 — left 618 top 866 w 158 h 281 */}
      <a
        className={styles.card}
        style={{ left: 618, top: 866, width: 158, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DSZ39p-gWgz/"
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.cardImg} src={`${IMG}/rectangle104.png`} alt="" />
      </a>

      {/* dark overlay over rectangle97 (959:254) — left 720 top 1189 */}
      <a
        className={styles.cardOverlay}
        style={{ left: 720, top: 1189, width: 158, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DRqzsdRktBc/"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />

      {/* label "Get a founder to speak from the heart" 959:288 — center left 799.5 top 1276 */}
      <p
        className={styles.abs}
        style={{
          ...playfairBold,
          left: 799.5,
          top: 1276,
          width: 141,
          height: 104,
          fontSize: 24,
          lineHeight: 1.115,
          color: '#bbff6c',
          textAlign: 'center',
          transform: 'translateX(-50%)',
          wordBreak: 'break-word',
        }}
      >
        Get a founder to speak from the heart
      </p>

      {/* dark overlay over rectangle100 (959:266) — left 350 top 1512 */}
      <a
        className={styles.cardOverlay}
        style={{ left: 350, top: 1512, width: 158, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DRqzsdRktBc/"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />

      {/* dark overlay over rectangle104 (959:257) — left 618 top 866 */}
      <a
        className={styles.cardOverlay}
        style={{ left: 618, top: 866, width: 158, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DRqzsdRktBc/"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />

      {/* label "Reel 'em in with a hook" 403:12 — center left 695.5 top 978 */}
      <p
        className={styles.abs}
        style={{
          ...playfairBold,
          left: 695.5,
          top: 978,
          width: 161,
          height: 58,
          fontSize: 24,
          lineHeight: 1.115,
          color: '#bbff6c',
          textAlign: 'center',
          transform: 'translateX(-50%)',
          wordBreak: 'break-word',
        }}
      >
        Reel ‘em in with a hook
      </p>

      {/* dark overlay over rectangle92 (959:269) — left 460 top 1189 w 225 */}
      <a
        className={styles.cardOverlay}
        style={{ left: 460, top: 1189, width: 225, height: 281, borderRadius: 7 }}
        href="https://www.instagram.com/p/DR6lWEBEswk/?img_index=1"
        target="_blank"
        rel="noreferrer"
        aria-hidden
      />

      {/* label "Speak from the heart" 959:286 — center left 573 top 1313 */}
      <p
        className={styles.abs}
        style={{
          ...playfairBold,
          left: 573,
          top: 1313,
          width: 224,
          height: 58,
          fontSize: 24,
          lineHeight: 1.115,
          color: '#bbff6c',
          textAlign: 'center',
          transform: 'translateX(-50%)',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {`Speak from `}
        <br aria-hidden />
        {`the heart `}
      </p>

      {/* label "Gameify it" 959:292 — center left 661 top 1642 */}
      <p
        className={styles.abs}
        style={{
          ...playfairBold,
          left: 661,
          top: 1642,
          width: 224,
          height: 28,
          fontSize: 24,
          lineHeight: 1.115,
          color: '#bbff6c',
          textAlign: 'center',
          transform: 'translateX(-50%)',
          wordBreak: 'break-word',
        }}
      >
        Gameify it
      </p>

      {/* label "Show the team" 959:290 — center left 433.5 top 1633 */}
      <p
        className={styles.abs}
        style={{
          ...playfairBold,
          left: 433.5,
          top: 1633,
          width: 141,
          height: 50,
          fontSize: 24,
          lineHeight: 1.115,
          color: '#bbff6c',
          textAlign: 'center',
          transform: 'translateX(-50%)',
          wordBreak: 'break-word',
        }}
      >
        Show the team
      </p>

      {/* ===== Footer buttons ===== */}
      <Link
        href="/#work"
        className={styles.btn}
        style={{ left: 80, top: 1880, width: 181, height: 61 }}
      >
        <span
          className={styles.btnFace}
          style={{ left: 1, top: 1, width: 180, height: 60, background: '#ff61cd', boxShadow: '0 4px 0 0 #000000' }}
        />
        <span className={styles.btnLabel} style={{ left: 91, top: 21, width: 134 }}>
          Next Project
        </span>
      </Link>

      <Link
        href="/#contact"
        className={styles.btn}
        style={{ left: 293, top: 1881, width: 180, height: 60 }}
      >
        <span
          className={styles.btnFace}
          style={{ left: 0, top: 0, width: 180, height: 60, background: '#ffc4e8' }}
        />
        <span className={styles.btnLabel} style={{ left: 89.5, top: 20, width: 115, height: 20 }}>
          Get in Touch
        </span>
      </Link>
    </div>
  )
}

const mobileLinks = [
  { href: 'https://www.instagram.com/p/DSwOlU3jMlR/?img_index=1', src: `${IMG}/rectangle96.png`, label: 'Be educative' },
  { href: 'https://www.instagram.com/p/DMxlzIiSPOu/?img_index=1', src: `${IMG}/rectangle102.png`, label: 'Hop on a trend' },
  { href: 'https://www.instagram.com/p/DS1bkqoj0yj/', src: `${IMG}/screenshot2.png`, label: 'Address a problem' },
  { href: 'https://www.instagram.com/p/DXEMmaDEzXV/', src: `${IMG}/rectangle106.png`, label: 'Reel ’em in with a hook' },
  { href: 'https://www.instagram.com/p/DR6lWEBEswk/?img_index=1', src: `${IMG}/rectangle95.png`, label: 'Add an interaction' },
  { href: 'https://www.instagram.com/p/DTIN5eOgQCW/', src: `${IMG}/rectangle97.png`, label: 'Get a founder to speak from the heart' },
  { href: 'https://www.instagram.com/p/DQwkxA3jGas/', src: `${IMG}/rectangle92.png`, label: 'Provide proof' },
  { href: 'https://www.instagram.com/p/DSZ39p-gWgz/', src: `${IMG}/rectangle104.png`, label: 'Speak from the heart' },
  { href: 'https://www.instagram.com/p/DRR5jH6iJ-R/', src: `${IMG}/rectangle100.png`, label: 'Show the team' },
  { href: 'https://www.instagram.com/p/DRW5nuSEThN/?img_index=1', src: `${IMG}/rectangle98.png`, label: 'Gameify it' },
]

function MobileLayout() {
  return (
    <div className={styles.mobile}>
      <Header />
      <section className={styles.mobileHero}>
        <h1>Nothing is boring.</h1>
        <p className={styles.mobileSub}>A lesson in writing and strategising for fintech</p>
        <p className={styles.mobileIntro}>
          <strong>Brands: Bharat Connect, Razorpay, KreditBee</strong>
          <br />
          <br />
          Like everyone else, I groaned when I was given my first fintech brand to work on. “It’s
          so dull, the clients are so rigid, I want to work on something fun,” the complaints were
          endless. But I am a better writer and a more understanding person for having worked with
          fintech brands.
          <br />
          <br />I learnt that it was my duty to make content interesting and to simplify complex
          subjects so that they are engaging and easy to digest.
          <br />
          <br />
          Eventually, I grew to enjoy the challenge of meeting multiple requirements while still
          maintaining the audience’s interest.
          <br />
          <br />
          Here are some of my favourite ways to do so:
        </p>
        <div className={styles.mobileGrid}>
          {mobileLinks.map((link) => (
            <a
              key={link.label + link.href}
              className={styles.mobileCard}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <img src={link.src} alt="" />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
        <div className={styles.mobileButtons}>
          <Link href="/#work" className={styles.mobilePrimary}>
            Next Project
          </Link>
          <Link href="/#contact" className={styles.mobileSecondary}>
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}

export default function FintechPage() {
  return (
    <main className={`${styles.page} projectCasePage`}>
      <DesktopCanvas />
      <MobileLayout />
    </main>
  )
}
