import Nav from '@/components/Nav/Nav'
import Hero from '@/components/Hero/Hero'
import WorkSection from '@/components/WorkSection/WorkSection'
import ContactSection from '@/components/ContactSection/ContactSection'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkSection />
        <ContactSection />
      </main>
    </>
  )
}
