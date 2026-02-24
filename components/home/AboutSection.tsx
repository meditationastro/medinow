import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Mountain, Sparkles } from "lucide-react"

export function AboutSection() {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-4xl font-bold text-primary-900 mb-4">About</h2>
            <p className="text-lg text-primary-700 leading-relaxed">
              We combine Himalayan meditation practice, Vedic astrology (Jyotish), and practical life guidance to help
              you find clarity, purpose, and a grounded spiritual path. Sessions can be online, or in Nepal for deeper
              immersion through retreats and sacred-site journeys.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/h/about">
                <Button className="bg-primary-800 hover:bg-primary-900">Read our story</Button>
              </Link>
              <Link href="/h/spiritual-consultation">
                <Button variant="outline" className="border-primary-300">Spiritual consultation</Button>
              </Link>
              <Link href="/h/nepal-discovery-guide">
                <Button variant="outline" className="border-primary-300">Nepal discovery guide</Button>
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="card-background border-primary-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-xl bg-primary-900/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-900" />
                </div>
                <CardTitle className="text-primary-900 text-lg">Consultations</CardTitle>
              </CardHeader>
              <CardContent className="text-primary-700 text-sm">
                Personalized guidance: Jyotish, meditation mentorship, and remedies for real-life decisions.
              </CardContent>
            </Card>

            <Card className="card-background border-primary-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-xl bg-primary-900/10 flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-primary-900" />
                </div>
                <CardTitle className="text-primary-900 text-lg">Retreats</CardTitle>
              </CardHeader>
              <CardContent className="text-primary-700 text-sm">
                Retreats for silence, breathwork, yoga, and integration—designed for beginners and serious seekers.
              </CardContent>
            </Card>

            <Card className="card-background border-primary-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-xl bg-primary-900/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-900" />
                </div>
                <CardTitle className="text-primary-900 text-lg">Nepal</CardTitle>
              </CardHeader>
              <CardContent className="text-primary-700 text-sm">
                A practical guide to seasons, sacred places, culture, and how to plan a meaningful journey.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
