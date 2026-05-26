'use client'

import Image from 'next/image'
import styles from './ContactSection.module.css'

const BIO = `As a marketer, it is in my job description to lie a little. To play fast and dirty with honesty, to exaggerate some things and hide others. But I will cross my heart and die on this hill - I love words. And because I want you to hire me as your creative strategist, I also love brand marketing and good design and GTM strategy and AI optimisation and confusing acronyms (TOFU, BOFU, AIDA, the list goes on).

But in all seriousness, and with more sincerity than I am comfortable with, I really do love words. The way a sentence twists and turns, the flourish of language, the mind tricks a misplaced preposition can do. I would not work late nights or spend hours debating the effectiveness of a full-stop or argue with project managers if I did not simply adore language and all that is born of it.

So if you want someone on your team who is meticulous, passionate and convincing, I'd love to throw my hat in the ring.

P.S. I also have a Bachelor's degree in communication design and designed this portfolio website myself!`

const PHONE_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function scrollToWork() {
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
}

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      {/* Decorative phone illustration — desktop only */}
      <div className={styles.phoneIllustration} aria-hidden="true">
        <div className={styles.phoneAntenna} />
        <div className={styles.phoneBody}>
          <div className={styles.photoFrame}>
            <Image
              src="/images/about-photo.jpg"
              alt="Abhi"
              width={195}
              height={462}
              className={styles.photo}
            />
          </div>
          <div className={styles.phoneKeypad}>
            {PHONE_KEYS.map((n) => (
              <div key={n} className={styles.phoneKey}>{n}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact form */}
      <h2 className={styles.contactHeading}>Got a brief or role to discuss?</h2>
      <p className={styles.emailLine}>
        Send me an email at{' '}
        <a href="mailto:abhiv1999@gmail.com" className={styles.emailLink}>
          abhiv1999@gmail.com
        </a>{' '}
        or fill out the form below
      </p>

      <form
        aria-label="Contact form"
        className={styles.form}
        onSubmit={(e) => e.preventDefault()}
      >
        <input className={styles.input} type="text"  placeholder="Name"     />
        <input className={styles.input} type="text"  placeholder="Company"  />
        <input className={styles.input} type="email" placeholder="Email-id" />
        <textarea className={styles.textarea}        placeholder="Message"  />
        <button type="submit" className={styles.sendBtn}>Send</button>
      </form>

      {/* About Me */}
      <div className={styles.aboutSection}>
        <h2 className={styles.aboutHeading}>About Me</h2>

        <p className={styles.bio}>{BIO}</p>

        <div className={styles.footerButtons}>
          <button className={styles.btnBrowse} onClick={scrollToWork}>
            Browse Projects
          </button>
          <button className={styles.btnResume}>
            Download Resume
          </button>
        </div>
      </div>

      <div className={styles.footerStrip} />
    </section>
  )
}
