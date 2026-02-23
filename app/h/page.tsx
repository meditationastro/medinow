"use client"

import { Hero } from "@/components/home/Hero"
import { Guidance } from "@/components/home/Guidance"
import { Services } from "@/components/home/Services"
import { ContactForm } from "@/components/home/ContactForm"
import { Testimonial } from "@/components/home/Testimonial"
import { Background } from "@/components/home/Background"
import { Images } from "@/components/home/Images"
import { TopicsCarousel } from "@/components/home/TopicsCarousel"
import { StatsSection } from "@/components/home/StatsSection"
import { Packages } from "@/components/home/Packages"
import { BlogPreview } from "@/components/home/BlogPreview"
import { ContactCTA } from "@/components/home/ContactCTA"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"
import { TransformationSection } from "@/components/home/TransformationSection"
import { JourneyProcess } from "@/components/home/JourneyProcess"
import { NewsletterSection } from "@/components/home/NewsletterSection"
import Script from 'next/script'

export default function AstrologyHomepage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <Background />
        <Hero />

        {/* Stats Bar */}
        <StatsSection />

        {/* Topics Carousel */}
        <TopicsCarousel />

        {/* Why Choose Us */}
        <WhyChooseUs />

        <section aria-label="Our Guidance">
          <Guidance />
        </section>

        {/* How It Works */}
        <JourneyProcess />

        <section aria-label="Our Services">
          <Services />
        </section>

        {/* Packages Section */}
        <Packages />

        {/* Transformation Stories */}
        <TransformationSection />

        <section aria-label="Gallery">
          <Images />
        </section>

        {/* Blog Preview */}
        <BlogPreview />

        <section aria-label="Testimonials">
          <Testimonial />
        </section>

        {/* Newsletter */}
        <NewsletterSection />

        {/* Contact CTA */}
        <ContactCTA />

        <section aria-label="Contact Us">
          <ContactForm />
        </section>
      </main>

      <Script id="structured-data" type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "MeditationAstro - Answerforself Inner Quest",
          "@id": "https://MeditationAstro.com",
          "image": "https://MeditationAstro.com/logo.png",
          "description": "Vedic Astrology, Meditation, Spiritual Retreats in Nepal. Expert guidance from Niaadim. Serving Germany, France, Italy, Switzerland and USA.",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Khumaltar",
            "addressLocality": "Lalitpur",
            "addressCountry": "NP"
          },
          "telephone": "+977-9709598727",
          "email": "meditationastro1@gmail.com",
          "url": "https://meditationastro.com",
          "sameAs": [
            "https://www.facebook.com/meditationastro/",
            "https://www.instagram.com/meditationastro_1/",
            "https://www.youtube.com/@astromeditation1"
          ]
        }
      `}</Script>
    </>
  )
}
