"use client"

import { Hero } from "@/components/home/Hero"
import { Guidance } from "@/components/home/Guidance"
import { Services } from "@/components/home/Services"
import { ContactForm } from "@/components/home/ContactForm"
import { Testimonial } from "@/components/home/Testimonial"
import { Background } from "@/components/home/Background"
import { Images } from "@/components/home/Images"
import Script from 'next/script'

export default function AstrologyHomepage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <Background />
        <Hero />
        <section aria-label="Our Guidance">
          <Guidance />
        </section>
        <section aria-label="Our Services">
          <Services />
        </section>
        <section aria-label="Gallery">
          <Images />
        </section>
        <section aria-label="Contact Us">
          <ContactForm />
        </section>
        <section aria-label="Testimonials">
          <Testimonial />
        </section>
      </main>

      {/* Structured Data for Local Business */}
      <Script id="structured-data" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Answerforself Inner quest",
            "@id": "https://Answerforself.com",
            "image": "https://Answerforself.com/logo.png",
            "description": ".Discover calm, clarity & purpose through meditation, astrology & spiritual mentorship guided by Himalayan wisdom.
            Expert meditation guidance, astrological readings, and spiritual counseling to help you navigate life's journey.",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates"
            },
            "url": "https://Answerforself.com",
            "telephone": "",
            "sameAs": [
              "https://facebook.com/meditationastro",
              "https://instagram.com/meditationastro",
              "https://twitter.com/meditationastro"
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            }
          }
        `}
      </Script>
    </>
  )
}
