'use client'

import ImagePopup from '@/components/ImagePopup/ImagePopup'
import styles from './page.module.css'

type EmailerSubjectProps = {
  className: string
  imageSrc: string
  subject: string
  revealDelay?: number
}

/** A "Click to Read" subject line that opens its emailer creative full-size. */
export default function EmailerSubject({ className, imageSrc, subject, revealDelay }: EmailerSubjectProps) {
  return (
    <ImagePopup
      className={`${className} ${styles.subjectButton}`}
      src={imageSrc}
      alt={`Emailer for ${subject}`}
      label={subject}
      width={1024}
      height={1536}
      data-reveal="tilt"
      data-reveal-delay={revealDelay}
    >
      {subject}
    </ImagePopup>
  )
}
