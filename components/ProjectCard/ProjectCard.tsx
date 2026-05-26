import Link from 'next/link'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  label: string
  href: string
  variant?: 'pink' | 'purple'
  rotated?: boolean
  size?: 'normal' | 'large'
}

export default function ProjectCard({
  label,
  href,
  variant = 'pink',
  rotated = false,
  size = 'normal',
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={`${styles.card} ${styles[variant]} ${rotated ? styles.rotated : ''} ${size === 'large' ? styles.large : ''}`}
    >
      <div className={styles.blobCorner} />
      <div className={styles.blobTop} />
      <div className={styles.darkBlock} />
      <div className={styles.label}>{label}</div>
    </Link>
  )
}
