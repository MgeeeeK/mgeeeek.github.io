import Image from 'next/image'
import Link from 'next/link'
import { AmbientLayer, Starburst, Halo, Sparkle } from '@/components/Ambient/Ambient'
import Magnetic from '@/components/Fx/Magnetic'
import InstagramEmbedCard from './InstagramEmbedCard'
import ScaledCanvas from '@/components/ScaledCanvas/ScaledCanvas'
import { getNextProject } from '@/lib/projects'
import styles from './page.module.css'

const NEXT = getNextProject('social-media')

const ASSET_PATH = '/images/social-media-brand'

// `revealDelay` alternates so the cards land like scattered polaroids
// instead of a strict left-to-right sweep.
const heroCards = [
  {
    className: styles.heroLeftSquareB,
    src: `${ASSET_PATH}/hero-left-square-b.png`,
    alt: 'Cup Noodles social media post before the revamp',
    revealDelay: 0,
  },
  {
    className: styles.heroLeftTall,
    src: `${ASSET_PATH}/hero-left-tall.png`,
    alt: 'Cup Noodles story frame before the revamp',
    revealDelay: 2,
  },
  {
    className: styles.heroLeftSquareA,
    src: `${ASSET_PATH}/hero-left-square-a.png`,
    alt: 'Cup Noodles campaign post before the revamp',
    revealDelay: 1,
  },
  {
    className: styles.heroCenterTall,
    src: `${ASSET_PATH}/hero-center-tall.png`,
    alt: 'Revamped Cup Noodles social video frame',
    revealDelay: 3,
  },
  {
    className: styles.heroRightSquare,
    src: `${ASSET_PATH}/hero-right-square.png`,
    alt: 'Revamped Cup Noodles trend-led post',
    revealDelay: 2,
  },
  {
    className: styles.heroRightTall,
    src: `${ASSET_PATH}/hero-right-tall.png`,
    alt: 'Revamped Cup Noodles vertical social frame',
    revealDelay: 4,
  },
  {
    className: styles.heroRightBottom,
    src: `${ASSET_PATH}/hero-right-bottom.png`,
    alt: 'Revamped Cup Noodles illustration post',
    revealDelay: 3,
  },
]

const commentStrips = [
  { className: styles.commentD, src: `${ASSET_PATH}/comment-d.png` },
  { className: styles.commentE, src: `${ASSET_PATH}/comment-e.png` },
  { className: styles.commentA, src: `${ASSET_PATH}/comment-a.png` },
  { className: styles.commentC, src: `${ASSET_PATH}/comment-c.png` },
  { className: styles.commentB, src: `${ASSET_PATH}/comment-b.png` },
]

const brandLinks = [
  {
    href: 'https://www.instagram.com/p/DFX0krPPU-c/',
    className: styles.brandA,
    label: 'Cup Noodles social reel',
  },
  {
    href: 'https://www.instagram.com/p/DIyjLjxvEzz/',
    className: styles.brandB,
    label: 'Cup Noodles topical post',
  },
  {
    href: 'https://www.instagram.com/p/DC9VN12SONZ/',
    className: styles.brandC,
    label: 'Cup Noodles trend post',
  },
  {
    href: 'https://www.instagram.com/p/DNnidhqvvIC/',
    className: styles.brandD,
    label: 'Cup Noodles social post',
  },
  {
    href: 'https://www.instagram.com/p/DIbfO87Pd3N/',
    className: styles.brandE,
    label: 'Cup Noodles reel',
  },
  {
    href: 'https://www.instagram.com/p/DG5n2cZPpHQ/',
    className: styles.brandF,
    label: 'Cup Noodles creator-first post',
  },
  {
    href: 'https://www.instagram.com/p/DA54CUQyC0U/',
    className: styles.brandG,
    label: 'Cup Noodles Instagram post',
  },
]

const merchLinks = [
  {
    href: 'https://www.instagram.com/p/DRv-MJKjwLU/',
    className: styles.merchA,
    label: 'Cup Noodles merch influencer reel',
  },
  {
    href: 'https://www.instagram.com/p/DQa7RreDwkr/',
    className: styles.merchB,
    label: 'Cup Noodles merch campaign reel',
  },
  {
    href: 'https://www.instagram.com/p/DSXYekOD3iB/',
    className: styles.merchC,
    label: 'Cup Noodles merch drop post',
  },
  {
    href: 'https://www.instagram.com/p/DSz7cDviNNS/',
    className: styles.merchD,
    label: 'Cup Noodles influencer post',
  },
  {
    href: 'https://www.instagram.com/p/DR_pVIbEQcN/',
    className: styles.merchE,
    label: 'Cup Noodles giveaway post',
  },
]

const mobileBrandLinks = [
  ...brandLinks,
  {
    href: 'https://www.instagram.com/p/DF-dRuBPGa7/?hl=en',
    className: '',
    label: 'Cup Noodles Valentine campaign',
  },
  {
    href: 'https://www.instagram.com/p/DBturyDIKot/?hl=en',
    className: '',
    label: 'Cup Noodles Diwaloween campaign',
  },
  {
    href: 'https://www.instagram.com/p/DOLqTWij6Ya/',
    className: '',
    label: 'Cup Noodles Teacher and Mother Day sketch',
  },
  {
    href: 'https://www.instagram.com/p/DJeZGzYvQNc/',
    className: '',
    label: 'Cup Noodles holiday post',
  },
]

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Project navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#contact">Contact &amp; About</Link>
      </nav>
      <div className={styles.projectStrip}>
        <span>Social Media Brand Identity</span>
      </div>
    </header>
  )
}

function HeroCollage() {
  return (
    <>
      {heroCards.map((card) => (
        <div
          className={`${styles.heroCard} ${card.className}`}
          key={card.src}
          data-reveal="tilt"
          data-reveal-delay={card.revealDelay}
        >
          <Image src={card.src} alt={card.alt} fill sizes="300px" loading="eager" />
        </div>
      ))}

      <Image
        className={styles.sparkleA}
        src={`${ASSET_PATH}/sparkle-a.svg`}
        alt=""
        width={42}
        height={42}
        aria-hidden="true"
      />
      <Image
        className={styles.sparkleB}
        src={`${ASSET_PATH}/sparkle-b.svg`}
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
      />
      <Image
        className={styles.sparkleC}
        src={`${ASSET_PATH}/sparkle-c.svg`}
        alt=""
        width={22}
        height={22}
        aria-hidden="true"
      />

      <div className={styles.fromText} data-reveal="rise" data-reveal-delay="4">
        <span>How I took</span>
        <span>the brand</span>
        <span>from this</span>
      </div>
      <p className={styles.toText} data-reveal="rise" data-reveal-delay="5">
        To this
      </p>

      {commentStrips.map((strip, i) => (
        <div
          className={`${styles.commentStrip} ${strip.className}`}
          key={strip.src}
          data-reveal="pop"
          data-reveal-delay={i}
        >
          <Image src={strip.src} alt="" fill sizes="320px" aria-hidden="true" />
        </div>
      ))}
    </>
  )
}

function DesktopCanvas() {
  return (
    <ScaledCanvas className={styles.canvas} ariaLabel="Social Media Brand Identity case study" height={5486}>
      <Header />

      <AmbientLayer>
        {/* Hero / Not-Like-Other-Brands open right margin */}
        <Sparkle left={1150} top={300} size={26} delay={0.3} />
        {/* empty cream gap between the two hero collage clusters */}
        <Sparkle left={640} top={430} size={24} delay={0.8} />
        <Halo right={-150} top={1180} size={340} />
        <Sparkle left={770} top={1230} size={22} delay={1.0} />
        {/* roomy gap right of brand cards */}
        <Sparkle left={950} top={1880} size={28} delay={0.6} />
        {/* Topical Holidays — right-edge halo (away from existing starburst at left) */}
        <Halo lime right={-120} top={2520} size={320} />
        <Sparkle left={1120} top={2900} size={24} delay={1.3} />
        {/* roomy gap between holidays + merch */}
        <Starburst left={840} top={3160} size={460} opacity={0.38} />
        {/* open cream zone right of the merch intro copy */}
        <Sparkle left={990} top={3770} size={24} delay={0.4} />
        {/* Merch open right margin */}
        <Sparkle left={770} top={4060} size={26} delay={0.5} />
        <Halo right={-160} top={4220} size={300} />
        {/* quiet gap right of the small merch tiles, before the KFC band */}
        <Sparkle left={660} top={4520} size={22} delay={1.1} />
        {/* KFC band roomy right side */}
        <Starburst reverse left={760} top={4870} size={460} opacity={0.38} />
        <Sparkle left={1140} top={5260} size={22} delay={1.5} />
      </AmbientLayer>

      <h1 className={styles.title} data-reveal="rise">
        Making Gen-Z Tap on Follow
      </h1>
      <p className={styles.subtitle} data-reveal="rise" data-reveal-delay="1">
        Nissin Cup Noodles Social Media Revamp
      </p>
      <HeroCollage />

      <section className={styles.notLike}>
        <h2 data-reveal="rise">Not Like Other Brands</h2>
        <p data-reveal="rise" data-reveal-delay="1">
          To be a successful brand on social media, you have to stop behaving like a faceless corporation.
          I led a team that reimagined Nissin Cup Noodles as a creator-first presence with content that
          entertained and sparked cultural relevance. We hopped on trends before other brands picked them
          up and made sure that Gen-Z was writing for Gen-Z. The product was used as a prop, not the
          punchline, seamlessly integrated into content rather than forced into it.
          <br />
          <br />I also encouraged the team to include more reels in the content calendar without overwhelming
          the production team.
        </p>
      </section>

      {brandLinks.map((link, i) => (
        <InstagramEmbedCard
          key={link.href}
          {...link}
          reveal="pop"
          revealDelay={i < 4 ? i : i - 4}
        />
      ))}

      <section className={styles.holidays}>
        <h2 data-reveal="rise">Topical Holidays</h2>
        <InstagramEmbedCard
          href="https://www.instagram.com/p/DF-dRuBPGa7/?hl=en"
          className={styles.valentineCard}
          label="Cup Noodles Valentine campaign"
          reveal="tilt"
          revealDelay={0}
        />
        <div className={styles.valentineText}>
          <h3 data-reveal="rise" data-reveal-delay="1">Valentine’s Day</h3>
          <p data-reveal="rise" data-reveal-delay="2">
            If your “boyfriend” is actually a Hinge match who’s ghosting you, what do you gift him on
            Valentine’s Day?
            <br />
            <br />
            Nissin’s{' '}
            <a
              href="https://www.instagram.com/explore/tags/situationshipstatuskyahai/?hl=en"
              target="_blank"
              rel="noreferrer"
            >
              #SituationshipStatusKyaHai
            </a>{' '}
            brings you a charming and interactive choose-your-own-adventure game that tells you what kind of
            internet-age, hellish situation (Ghosted, Benched, Slow Faded) you’re likely to land in, and an
            anti-greeting card to send to your situationship.
            <br />
            <br />
            The game allows you to make choices on the native Instagram app through a series of tags and
            accounts created exclusively for the campaign.
            <br />
            <br />
            The campaign let me and my team experiment with a new format and dabble in game-building and user
            behaviour.
          </p>
        </div>
        <div className={styles.takeawayText}>
          <p data-reveal="rise" data-reveal-delay="3">
            <strong>The Unfortunate Takeaway:</strong>
            <br />
            <br />
            Although we made the game short, funny and easy to follow, included a gratification (free merch for
            five lucky participants) and usually got good engagement on our other posts, the campaign did not
            perform well.
            <br />
            <br />
            We learnt to never expect a high degree of participation unless its a single post contest.
          </p>
        </div>
        <Image
          className={styles.starburst}
          src={`${ASSET_PATH}/starburst.svg`}
          alt=""
          width={404}
          height={404}
          aria-hidden="true"
        />
        <div className={styles.diwaloweenText}>
          <h3 data-reveal="rise">Diwaloween</h3>
          <p data-reveal="rise" data-reveal-delay="1">
            How many sweets does it take to drive someone mad?
            <br />
            <br />
            One lucky year, Diwali and Halloween fell on the same day. We capitalised on this once-in-a-blue-moon
            event with a high-budget parody trailer that I wrote and helped direct.
          </p>
        </div>
        <InstagramEmbedCard
          href="https://www.instagram.com/p/DBturyDIKot/?hl=en"
          className={styles.diwaliCard}
          label="Cup Noodles Diwaloween campaign"
          reveal="tilt"
          revealDelay={2}
        />
        <InstagramEmbedCard
          href="https://www.instagram.com/p/DOLqTWij6Ya/"
          className={styles.teacherTall}
          label="Cup Noodles Teacher and Mother Day sketch"
          reveal="tilt"
          revealDelay={0}
        />
        <div className={styles.teacherRotated} data-reveal="tilt" data-reveal-delay="1">
          <InstagramEmbedCard href="https://www.instagram.com/p/DJeZGzYvQNc/" label="Cup Noodles holiday post" />
        </div>
        <div className={styles.teacherText}>
          <h3 data-reveal="rise" data-reveal-delay="2">Teacher’s Day &amp; Mother’s Day</h3>
          <p data-reveal="rise" data-reveal-delay="3">
            Sometimes, simple sketches pay off more than expected (especially on Instagram).
          </p>
        </div>
      </section>

      <section className={styles.merch}>
        <h2 data-reveal="rise">Merch Drop x Influencer Campaign</h2>
        <p data-reveal="rise" data-reveal-delay="1">
          Nissin wanted to launch merch that felt Gen Z, memorable, and worth talking about beyond social media.
          So... not want a basic T-shirt drop. We landed on two weird, playful products - a hands-free cup holder
          and a thumb-wrestling fighting ring.
          <br />
          <br />
          To build buzz, we handed the merch out through on-ground games and vox-pops.
          <br />
          <br />
          On social media, we used hook-led, scroll-stopping content to lead into giveaways and contests. using a
          mix of influencers and in-house cast. The films were intentionally made to feel unpolished and real with
          blurry footage, awkward framing and clips that looked like they were shot by strangers. Some leaned into
          the absurdity of the products, while others opened with chaotic or heated interactions to instantly grab
          attention before revealing the merch.
        </p>
      </section>
      {merchLinks.map((link, i) => (
        <InstagramEmbedCard
          key={link.href}
          {...link}
          reveal="pop"
          revealDelay={i < 2 ? i : i - 2}
        />
      ))}

      <section className={styles.kfc}>
        <h2 data-reveal="rise">KFC Meta Trend Compilation</h2>
        <p className={styles.kfcSubhead} data-reveal="rise" data-reveal-delay="1">
          An idea that won my agency the KFC Pitch
        </p>
        <InstagramEmbedCard
          href="https://www.instagram.com/p/DIyjLjxvEzz/"
          className={styles.kfcCard}
          label="KFC Meta Trend Compilation post"
          reveal="tilt"
          revealDelay={0}
        />
        <p className={styles.kfcBody} data-reveal="rise" data-reveal-delay="1">
          Among many other tasks, KFC wanted my agency to promote their new chicken wings on Instagram while
          proving their in-depth understanding of social media culture.
          <br />
          <br />
          Of course, we couldn’t just hop on a relevant trend and call it a day. I created a looping “fever dream”
          of internet culture, an amalgamation of current and past trends connected by vague, dream-like logic that
          transformed fleeting references into something timeless.
        </p>
        <div className={styles.footerButtons}>
          <Magnetic>
            <Link href={NEXT.href} className={styles.primaryButton} data-reveal="pop">
              Next Project
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/#contact"
              className={styles.secondaryButton}
              data-reveal="pop"
              data-reveal-delay="1"
            >
              Get in Touch
            </Link>
          </Magnetic>
        </div>
      </section>
    </ScaledCanvas>
  )
}

function MobileLayout() {
  return (
    <div className={styles.mobile}>
      <Header />
      <section className={styles.mobileHero}>
        <h1 data-reveal="rise">Making Gen-Z Tap on Follow</h1>
        <p data-reveal="rise" data-reveal-delay="1">Nissin Cup Noodles Social Media Revamp</p>
        <div className={styles.mobileCollage}>
          {heroCards.map((card, i) => (
            <div
              className={styles.mobileHeroCard}
              key={card.src}
              data-reveal="tilt"
              data-reveal-delay={i % 2}
            >
              <Image src={card.src} alt={card.alt} fill sizes="46vw" loading="eager" />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.mobileSection}>
        <h2 data-reveal="rise">Not Like Other Brands</h2>
        <p data-reveal="rise" data-reveal-delay="1">
          To be a successful brand on social media, you have to stop behaving like a faceless corporation. I led a
          team that reimagined Nissin Cup Noodles as a creator-first presence with content that entertained and
          sparked cultural relevance. We hopped on trends before other brands picked them up and made sure that
          Gen-Z was writing for Gen-Z. The product was used as a prop, not the punchline, seamlessly integrated
          into content rather than forced into it.
        </p>
        <div className={styles.mobileGrid}>
          {mobileBrandLinks.slice(0, 7).map((link, i) => (
            <InstagramEmbedCard key={link.href} {...link} reveal="pop" revealDelay={i % 2} />
          ))}
        </div>
      </section>

      <section className={styles.mobileSection}>
        <h2 data-reveal="rise">Topical Holidays</h2>
        <div className={styles.mobileFeatureGrid}>
          {mobileBrandLinks.slice(7).map((link) => (
            <InstagramEmbedCard key={link.href} {...link} reveal="tilt" revealDelay={0} />
          ))}
        </div>
        <h3 data-reveal="rise">Valentine’s Day</h3>
        <p data-reveal="rise" data-reveal-delay="1">
          Nissin’s #SituationshipStatusKyaHai brings you a charming and interactive choose-your-own-adventure game
          that tells you what kind of internet-age, hellish situation you’re likely to land in, and an
          anti-greeting card to send to your situationship.
        </p>
        <h3 data-reveal="rise">Diwaloween</h3>
        <p data-reveal="rise" data-reveal-delay="1">
          One lucky year, Diwali and Halloween fell on the same day. We capitalised on this once-in-a-blue-moon
          event with a high-budget parody trailer that I wrote and helped direct.
        </p>
      </section>

      <section className={styles.mobileSection}>
        <h2 data-reveal="rise">Merch Drop x Influencer Campaign</h2>
        <p data-reveal="rise" data-reveal-delay="1">
          Nissin wanted to launch merch that felt Gen Z, memorable, and worth talking about beyond social media.
          We landed on two weird, playful products - a hands-free cup holder and a thumb-wrestling fighting ring.
        </p>
        <div className={styles.mobileGrid}>
          {merchLinks.map((link, i) => (
            <InstagramEmbedCard key={link.href} {...link} reveal="pop" revealDelay={i % 2} />
          ))}
        </div>
      </section>

      <section className={`${styles.mobileSection} ${styles.mobileKfc}`}>
        <h2 data-reveal="rise">KFC Meta Trend Compilation</h2>
        <p className={styles.mobileSubhead} data-reveal="rise" data-reveal-delay="1">
          An idea that won my agency the KFC Pitch
        </p>
        <InstagramEmbedCard
          href="https://www.instagram.com/p/DIyjLjxvEzz/"
          label="KFC Meta Trend Compilation post"
          reveal="tilt"
          revealDelay={0}
        />
        <p data-reveal="rise" data-reveal-delay="1">
          I created a looping “fever dream” of internet culture, an amalgamation of current and past trends
          connected by vague, dream-like logic that transformed fleeting references into something timeless.
        </p>
        <div className={styles.mobileButtons}>
          <Magnetic>
            <Link href={NEXT.href} className={styles.primaryButton} data-reveal="pop">
              Next Project
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/#contact"
              className={styles.secondaryButton}
              data-reveal="pop"
              data-reveal-delay="1"
            >
              Get in Touch
            </Link>
          </Magnetic>
        </div>
      </section>
    </div>
  )
}

export default function SocialMediaBrandIdentityPage() {
  return (
    <main className={`${styles.page} projectCasePage`}>
      <DesktopCanvas />
      <MobileLayout />
    </main>
  )
}
