import Image from 'next/image'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { PROJECTS } from '@/lib/projects'
import styles from './WorkSection.module.css'

export default function WorkSection() {
  return (
    <section id="work" className={styles.section}>
      {/* Decorative star — desktop only */}
      <Image
        src="/images/star2.svg"
        alt=""
        width={463}
        height={463}
        className={styles.star2}
        aria-hidden="true"
      />

      <h2 className={styles.heading}>Work, Work, Work</h2>
      <p className={styles.subtitle}>
        Campaign &amp; Brand Strategy, Copywriting, Design &amp; Film Direction
      </p>

      <div className={styles.grid}>
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.slug}
            label={project.label}
            href={project.href}
          />
        ))}
      </div>

      {/* "Don't Look!" — rotated purple card, desktop only */}
      <div className={styles.dontLookWrapper}>
        <ProjectCard
          label="don't Look!"
          href="/work/fun-stuff"
          variant="purple"
          rotated
          size="large"
        />
      </div>
    </section>
  )
}
