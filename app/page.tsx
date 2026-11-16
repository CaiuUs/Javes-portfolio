import Hero           from '@/components/Hero'
import Portfolio      from '@/components/Portfolio'
import Partners       from '@/components/Partners'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="brand-line" aria-hidden="true" />
      <Portfolio />
      <Partners />
      <ContactSection />
    </main>
  )
}
