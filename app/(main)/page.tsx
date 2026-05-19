import { AboutSection } from "./_components/about-section"
import { ContactSection } from "./_components/contact-section"
import { Footer } from "./_components/footer"
import { HeroSection } from "./_components/hero-section"
import { Navbar } from "./_components/navbar"
import { ServicesSection } from "./_components/services-section"
import { TestimonialsSection } from "./_components/testimonials-section"
import { WhyChooseSection } from "./_components/why-choose-section"

export default async function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
