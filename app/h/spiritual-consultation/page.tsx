import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Spiritual Consultation in Nepal | Meditation & Vedic Guidance",
  description:
    "Book a spiritual consultation in Nepal (or online): meditation mentorship, Vedic astrology (Jyotish), and practical guidance for clarity, purpose, and healing.",
  alternates: { canonical: "/h/spiritual-consultation" },
}

export default function SpiritualConsultationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
      <section className="container mx-auto px-4 py-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-primary-900">Spiritual Consultation</h1>
          <p className="mt-4 text-lg text-primary-700">
            A consultation is a structured, supportive session to help you understand what you are moving through and
            what to do next—using meditation insight, Vedic astrology, and grounded life coaching.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/h/appointment">
              <Button className="bg-primary-800 hover:bg-primary-900">Book a consultation</Button>
            </Link>
            <Link href="/h/jyotish-consultancy">
              <Button variant="outline" className="border-primary-300">Vedic astrology options</Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <Card className="card-background border-primary-300">
            <CardHeader>
              <CardTitle className="text-primary-900">Best for</CardTitle>
            </CardHeader>
            <CardContent className="text-primary-700">
              <ul className="list-disc pl-5 space-y-2">
                <li>Confusion, anxiety, burnout</li>
                <li>Relationship & family crossroads</li>
                <li>Career direction & purpose (dharma)</li>
                <li>Spiritual practice & discipline</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-background border-primary-300">
            <CardHeader>
              <CardTitle className="text-primary-900">What you receive</CardTitle>
            </CardHeader>
            <CardContent className="text-primary-700">
              <ul className="list-disc pl-5 space-y-2">
                <li>Clear action steps for the next 2–4 weeks</li>
                <li>A personalized meditation practice plan</li>
                <li>Astrology insights (if birth details provided)</li>
                <li>Optional remedies: mantra / ritual / lifestyle</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-background border-primary-300">
            <CardHeader>
              <CardTitle className="text-primary-900">Format</CardTitle>
            </CardHeader>
            <CardContent className="text-primary-700">
              <ul className="list-disc pl-5 space-y-2">
                <li>Online (Zoom/Meet) or in-person in Nepal</li>
                <li>60–90 minutes</li>
                <li>Follow-up notes by email/WhatsApp</li>
                <li>Private & confidential</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold text-primary-900">How to prepare</h2>
          <div className="mt-3 text-primary-700 space-y-2">
            <p>Bring 2–3 questions. If you want Jyotish insights, include birth date, birth time, and place.</p>
            <p>
              For deep travel + spiritual planning, read the{" "}
              <Link className="underline text-primary-800" href="/h/nepal-discovery-guide">
                Nepal discovery guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Structured Data (Service) */}
      <Script id="ld-service" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Spiritual Consultation",
          description:
            "Spiritual consultation combining meditation mentorship, Vedic astrology (Jyotish), and practical guidance. Online or in-person in Nepal.",
          areaServed: "Nepal",
          provider: {
            "@type": "Organization",
            name: "Answerforself",
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "NPR",
            availability: "https://schema.org/InStock",
          },
        })}
      </Script>
    </main>
  )
}
