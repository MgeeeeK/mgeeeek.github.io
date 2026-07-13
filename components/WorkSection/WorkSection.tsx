import Image from 'next/image'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import ParallaxLayer from '@/components/Fx/ParallaxLayer'
import { PROJECTS } from '@/lib/projects'
import styles from './WorkSection.module.css'

export default function WorkSection() {
  return (
    <section id="work" className={styles.section}>
      {/* Decorative star — desktop only, pointer-parallax */}
      <ParallaxLayer className={styles.decoratives} maxShift={26}>
        <Image
          src="/images/star2.svg"
          alt=""
          width={463}
          height={463}
          className={styles.star2}
          aria-hidden="true"
          data-depth="0.4"
        />
      </ParallaxLayer>

      <div className={styles.contentWrap}>
        <h2 className={styles.heading}>
          <span className={styles.srOnly}>Work, Work, Work</span>
          <span aria-hidden="true">
            <span
              className={styles.headingWord}
              data-reveal="pop"
              data-reveal-delay="0"
            >
              Work,
            </span>{' '}
            <span
              className={styles.headingWord}
              data-reveal="pop"
              data-reveal-delay="1"
            >
              Work,
            </span>{' '}
            <span
              className={styles.headingWord}
              data-reveal="pop"
              data-reveal-delay="2"
            >
              Work
            </span>
          </span>
        </h2>
        <p className={styles.subtitle} data-reveal="rise" data-reveal-delay="3">
          Campaign &amp; Brand Strategy, Copywriting, Design &amp; Film Direction
        </p>

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.slug}
              label={project.label}
              href={project.href}
              reveal="pop"
              revealDelay={i}
            />
          ))}
        </div>

      </div>

      {/* "Don't Look!" — peeks from the section corner above phone sizes. */}
      <div className={styles.dontLookWrapper}>
        <ProjectCard
          label="don't Look!"
          href="/work/fun-stuff"
          variant="purple"
          rotated
          size="large"
          reveal="stamp"
          revealDelay={6}
        />
      </div>
    </section>
  )
}
