"use client"

import Image from "next/image"
import Link from "next/link"
import { Leaf, Sun, Shield, MessageCircle, CalendarDays } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { redirectToWhatsApp } from "@/lib/whatsapp"

export default function VedicRemediesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 text-primary-800 mb-4">
                <Leaf className="w-6 h-6" />
                <span className="font-semibold">Service</span>
              </div>
              <h1 className="text-5xl font-bold text-primary-900 leading-tight">Vedic Remedies & Planetary Support</h1>
              <p className="mt-5 text-lg text-primary-700 leading-relaxed">
                Vedic remedies are practical tools to support your life path—especially during intense planetary
                periods. Remedies may include mantra, mindful routines, charitable actions, and simple lifestyle
                alignments based on your chart.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/h/appointment">
                  <Button className="bg-blue-800 hover:bg-primary-900 text-white">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    Book a Consultation
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-primary-300 text-primary-900 hover:bg-primary-50"
                  onClick={() =>
                    redirectToWhatsApp(
                      "Hello! I'd like Vedic Remedies based on my birth chart. Please share how to book a consultation."
                    )
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Booking
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-primary-200 shadow-sm h-[320px]">
              <Image src="/img/bg-hero-3.jpg" alt="Vedic remedies" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="when" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 bg-primary-100">
              <TabsTrigger value="when" className="gap-2"><Sun className="w-4 h-4" /> When to Use</TabsTrigger>
              <TabsTrigger value="types" className="gap-2"><Shield className="w-4 h-4" /> Remedy Types</TabsTrigger>
              <TabsTrigger value="plan" className="gap-2"><Leaf className="w-4 h-4" /> 7-Day Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="when" className="mt-6">
              <Card className="border-primary-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4 text-primary-800">
                  <p>
                    Remedies are especially helpful during challenging dashas (planetary periods), Sade Sati, Rahu/Ketu
                    transitions, or when repeating patterns keep showing up.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Career confusion or repeated delays</li>
                    <li>Relationship instability or emotional heaviness</li>
                    <li>Financial fluctuations</li>
                    <li>Loss of confidence, purpose, or direction</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="types" className="mt-6">
              <Card className="border-primary-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4 text-primary-800">
                  <p>
                    Remedies are selected with care—simple, doable, and aligned to your lifestyle. We focus on the
                    remedies that create stability rather than overwhelm.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-primary-200 bg-white/70 p-4">
                      <div className="font-semibold text-primary-900 mb-1">Mantra & Breath</div>
                      <div className="text-sm text-primary-800">Specific mantra practice with timing + breathing guidance.</div>
                    </div>
                    <div className="rounded-xl border border-primary-200 bg-white/70 p-4">
                      <div className="font-semibold text-primary-900 mb-1">Charity & Seva</div>
                      <div className="text-sm text-primary-800">Small weekly acts that harmonize planetary energies.</div>
                    </div>
                    <div className="rounded-xl border border-primary-200 bg-white/70 p-4">
                      <div className="font-semibold text-primary-900 mb-1">Lifestyle Alignment</div>
                      <div className="text-sm text-primary-800">Morning routine tweaks, color/day alignment, mindful habits.</div>
                    </div>
                    <div className="rounded-xl border border-primary-200 bg-white/70 p-4">
                      <div className="font-semibold text-primary-900 mb-1">Protective Practices</div>
                      <div className="text-sm text-primary-800">Grounding, energetic boundaries, and simple cleansing.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="plan" className="mt-6">
              <Card className="border-primary-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4 text-primary-800">
                  <p>
                    After your consultation, you receive a simple plan. Here is an example of a beginner-friendly
                    7‑day routine that we customize for your chart.
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Day 1: Intention + grounding breath (10 min)</li>
                    <li>Day 2: Mantra (108 times) + gratitude journaling</li>
                    <li>Day 3: Charity action (small but consistent)</li>
                    <li>Day 4: Digital detox (30–60 min)</li>
                    <li>Day 5: Sunlight walk + mindful affirmations</li>
                    <li>Day 6: Relationship repair (one kind action)</li>
                    <li>Day 7: Review, rest, and next-week focus</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-primary-200 bg-white/70 backdrop-blur-sm p-6">
            <div>
              <div className="text-xl font-bold text-primary-900">Want remedies tailored to your chart?</div>
              <div className="text-primary-700">Book now or message on WhatsApp for quick guidance.</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/h/appointment">
                <Button className="bg-blue-800 hover:bg-primary-900 text-white">Book Appointment</Button>
              </Link>
              <Button
                className="bg-success-500 hover:bg-success-600 text-white"
                onClick={() => redirectToWhatsApp("Hello! I want Vedic Remedies based on my chart. Please guide me.")}
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
