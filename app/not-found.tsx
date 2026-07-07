import Link from 'next/link'
import Nav from '@/components/Nav/Nav'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className={styles.page}>
        <p className={styles.eyebrow}>✦ 404 ✦</p>
        <h1 className={styles.heading}>This page wandered off.</h1>
        <p className={styles.body}>
          The page you&rsquo;re looking for doesn&rsquo;t exist &mdash; it may have been moved, or the
          link might be out of date.
        </p>
        <Link href="/" className={styles.homeButton}>
          Back to Portfolio
        </Link>
      </main>
    </>
  )
}
