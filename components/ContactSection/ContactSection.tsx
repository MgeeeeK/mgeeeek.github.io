'use client'

import { type FormEvent, useState } from 'react'
import Image from 'next/image'
import Magnetic from '@/components/Fx/Magnetic'
import styles from './ContactSection.module.css'

const BIO = `As a marketer, it is in my job description to lie a little. To play fast and dirty with honesty, to exaggerate some things and hide others. But I will cross my heart and die on this hill - I love words. And because I want you to hire me as your creative strategist, I also love brand marketing and good design and GTM strategy and AI optimisation and confusing acronyms (TOFU, BOFU, AIDA, the list goes on).

But in all seriousness, and with more sincerity than I am comfortable with, I really do love words. The way a sentence twists and turns, the flourish of language, the mind tricks a misplaced preposition can do. I would not work late nights or spend hours debating the effectiveness of a full-stop or argue with project managers if I did not simply adore language and all that is born of it.

So if you want someone on your team who is meticulous, passionate and convincing, I'd love to throw my hat in the ring.

P.S. I also have a Bachelor's degree in communication design and designed this portfolio website myself!`

const PHONE_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const CONTACT_FORM_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim()

type SubmissionState = {
  type: 'idle' | 'submitting' | 'success' | 'error'
  message: string
}

const INITIAL_SUBMISSION_STATE: SubmissionState = {
  type: 'idle',
  message: '',
}

export default function ContactSection() {
  const [submission, setSubmission] = useState<SubmissionState>(INITIAL_SUBMISSION_STATE)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const name = (data.get('name') || '').toString().trim()
    const company = (data.get('company') || '').toString().trim()
    const email = (data.get('email') || '').toString().trim()
    const message = (data.get('message') || '').toString().trim()
    const website = (data.get('website') || '').toString().trim()

    if (!name || !email || !message) {
      setSubmission({
        type: 'error',
        message: 'Please fill in your name, email, and a message before sending.',
      })
      return
    }

    if (!CONTACT_FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
      const body = encodeURIComponent(
        `Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\n${message}`
      )

      window.location.href = `mailto:abhiv1999@gmail.com?subject=${subject}&body=${body}`
      setSubmission({
        type: 'success',
        message: 'Opening your email app with this message filled in — send it from there to reach me.',
      })
      return
    }

    setSubmission({ type: 'submitting', message: 'Sending your message…' })

    const body = new URLSearchParams({
      name,
      company,
      email,
      message,
      website,
      source: window.location.href,
    })

    try {
      // Apps Script ContentService responds through a Google redirect. `no-cors`
      // lets this static site submit without requiring a server-side proxy.
      await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow',
        body,
      })

      form.reset()
      setSubmission({
        type: 'success',
        message: 'Thanks — your message has been sent. I’ll get back to you soon.',
      })
    } catch {
      setSubmission({
        type: 'error',
        message: 'Something went wrong while sending. Please email me at abhiv1999@gmail.com instead.',
      })
    }
  }

  return (
    <>
      <section id="contact" className={`${styles.panel} ${styles.contactPage}`}>
        <div className={styles.contactContent}>
          <h2 className={styles.contactHeading} data-reveal="rise">
            Got a brief or role to discuss?
          </h2>
          <p className={styles.emailLine} data-reveal="rise" data-reveal-delay="1">
            Send me an email at{' '}
            <a href="mailto:abhiv1999@gmail.com" className={styles.emailLink}>
              abhiv1999@gmail.com
            </a>{' '}
            or fill out the form below
          </p>

          <form
            aria-label="Contact form"
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <input className={styles.input} name="name" type="text" placeholder="Name" autoComplete="name" maxLength={100} required data-reveal="rise" data-reveal-delay="1" />
            <input className={styles.input} name="company" type="text" placeholder="Company" autoComplete="organization" maxLength={150} data-reveal="rise" data-reveal-delay="2" />
            <input className={styles.input} name="email" type="email" placeholder="Email-id" autoComplete="email" maxLength={254} required data-reveal="rise" data-reveal-delay="3" />
            <textarea className={styles.textarea} name="message" placeholder="Message" maxLength={5000} required data-reveal="rise" data-reveal-delay="4" />
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <Magnetic>
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={submission.type === 'submitting'}
                data-reveal="pop"
                data-reveal-delay="5"
              >
                {submission.type === 'submitting' ? 'Sending…' : 'Send'}
              </button>
            </Magnetic>
            <p
              className={styles.formStatus}
              role="status"
              aria-live="polite"
              data-variant={submission.type === 'success' || submission.type === 'error' ? submission.type : undefined}
            >
              {submission.message}
            </p>
          </form>
        </div>
      </section>

      <section id="about" className={`${styles.panel} ${styles.aboutPage}`}>
        <div className={styles.aboutContentWrap}>
          <div className={styles.phoneIllustration} aria-hidden="true" data-reveal="fade">
            <div className={styles.antennaTop} />
            <div className={styles.antennaMid} />
            <div className={styles.antennaBase} />
            <div className={styles.phoneBody} data-reveal="rise">
              <div className={styles.photoFrame}>
                <Image
                  src="/images/about-photo.jpg"
                  alt="Abhi"
                  width={202}
                  height={426}
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

          <div className={styles.aboutSection}>
            <h2 className={styles.aboutHeading} data-reveal="stamp">About Me</h2>

            <p className={styles.bio} data-reveal="rise" data-reveal-delay="1">{BIO}</p>

            <div className={styles.footerButtons}>
              <Magnetic>
                <a className={styles.btnBrowse} href="#work" data-reveal="pop" data-reveal-delay="2">
                  Browse Projects
                </a>
              </Magnetic>
              <Magnetic>
                <a className={styles.btnResume} href="/resume.pdf" download data-reveal="pop" data-reveal-delay="3">
                  Download Resume
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
