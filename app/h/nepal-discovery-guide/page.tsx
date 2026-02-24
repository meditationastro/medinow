import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Nepal Spiritual Discovery Guide | Retreats, Sacred Places & Travel Tips",
  description:
    "A practical Nepal discovery guide: best seasons, sacred places (Kathmandu Valley, Lumbini, Pokhara), culture, altitude tips, and how to plan a spiritual journey.",
  alternates: { canonical: "/h/nepal-discovery-guide" },
}

export default function NepalDiscoveryGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
      <section className="container mx-auto px-4 py-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-primary-900">Nepal Spiritual Discovery Guide</h1>
          <p className="mt-4 text-lg text-primary-700">
            Nepal is not only mountains—it is a living spiritual culture. Use this guide to plan a journey that blends
            sacred sites, meditation practice, and a calm, respectful travel rhythm.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/h/appointment">
              <Button className="bg-primary-800 hover:bg-primary-900">Plan with a guide</Button>
            </Link>
            <Link href="/h/gallery">
              <Button variant="outline" className="border-primary-300">See Nepal images</Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card className="card-background border-primary-300">
            <CardHeader>
              <CardTitle className="text-primary-900">Best seasons</CardTitle>
            </CardHeader>
            <CardContent className="text-primary-700 space-y-2">
              <p>
                <strong>Spring (Mar–May):</strong> clear skies, rhododendrons, great for treks and retreats.
              </p>
              <p>
                <strong>Autumn (Sep–Nov):</strong> the most stable weather and festival season.
              </p>
              <p>
                <strong>Winter (Dec–Feb):</strong> cold nights; excellent for Kathmandu, Lumbini, and lower-altitude journeys.
              </p>
              <p>
                <strong>Monsoon (Jun–Aug):</strong> lush landscapes; choose rain-friendly cultural and spiritual programs.
              </p>
            </CardContent>
          </Card>

          <Card className="card-background border-primary-300">
            <CardHeader>
              <CardTitle className="text-primary-900">Signature sacred places</CardTitle>
            </CardHeader>
            <CardContent className="text-primary-700">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Kathmandu Valley:</strong> Swayambhunath, Boudhanath, Pashupatinath, Bhaktapur, Patan.
                </li>
                <li>
                  <strong>Lumbini:</strong> birthplace of Buddha—quiet, reflective, ideal for meditation.
                </li>
                <li>
                  <strong>Pokhara:</strong> lakeside calm, sunrise viewpoints, gentle yoga/retreat base.
                </li>
                <li>
                  <strong>Himalayan trails:</strong> for disciplined practice, simplicity, and deep reset.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <Card className="card-background border-primary-300">
            <CardHeader>
              <CardTitle className="text-primary-900">Altitude basics</CardTitle>
            </CardHeader>
            <CardContent className="text-primary-700 text-sm space-y-2">
              <p>Go slow. Hydrate. Avoid rapid ascent. Sleep lower when possible.</p>
              <p>For treks, add acclimatization days. Listen to your body and guide.</p>
            </CardContent>
          </Card>

          <Card className="card-background border-primary-300">
            <CardHeader>
              <CardTitle className="text-primary-900">Cultural respect</CardTitle>
            </CardHeader>
            <CardContent className="text-primary-700 text-sm space-y-2">
              <p>Dress modestly at temples. Ask before photographing people and rituals.</p>
              <p>Walk clockwise around stupas. Remove shoes in sacred spaces.</p>
            </CardContent>
          </Card>

          <Card className="card-background border-primary-300">
            <CardHeader>
              <CardTitle className="text-primary-900">Your journey plan</CardTitle>
            </CardHeader>
            <CardContent className="text-primary-700 text-sm space-y-2">
              <p>We help you combine: sacred sites + retreat days + local culture.</p>
              <p>
                Want a personal plan? Book a{" "}
                <Link className="underline text-primary-800" href="/h/spiritual-consultation">
                  consultation
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Structured Data (Article) */}
      <Script id="ld-article" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Nepal Spiritual Discovery Guide",
          about: ["Nepal", "Spirituality", "Meditation", "Sacred sites"],
          author: { "@type": "Organization", name: "Answerforself" },
          mainEntityOfPage: { "@type": "WebPage", "@id": "/h/nepal-discovery-guide" },
        })}
      </Script>
    </main>
  )
}
