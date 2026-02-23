"use client"

import Image from "next/image"
import Link from "next/link"
import { Music, Waves, HeartPulse, MessageCircle, CalendarDays } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { redirectToWhatsApp } from "@/lib/whatsapp"

export default function SoundHealingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 text-primary-800 mb-4">
                <Music className="w-6 h-6" />
                <span className="font-semibold">Service</span>
              </div>
              <h1 className="text-5xl font-bold text-primary-900 leading-tight">Sound Healing Journey</h1>
              <p className="mt-5 text-lg text-primary-700 leading-relaxed">
                Sound is one of the oldest tools for meditation. Through carefully selected frequencies (mantra, bowls,
                and gentle vibration), we guide your nervous system into a calmer state—so the mind can soften and the
                heart can open.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/h/appointment">
                  <Button className="bg-blue-800 hover:bg-primary-900 text-white">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    Book a Session
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-primary-300 text-primary-900 hover:bg-primary-50"
                  onClick={() =>
                    redirectToWhatsApp(
                      "Hello! I'd like to book a Sound Healing session. Please share available times and the process."
                    )
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Booking
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-primary-200 shadow-sm h-[320px]">
              <Image src="/img/home-3.jpg" alt="Sound healing" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="benefits" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 bg-primary-100">
              <TabsTrigger value="benefits" className="gap-2"><HeartPulse className="w-4 h-4" /> Benefits</TabsTrigger>
              <TabsTrigger value="process" className="gap-2"><Waves className="w-4 h-4" /> Process</TabsTrigger>
              <TabsTrigger value="prepare" className="gap-2"><Music className="w-4 h-4" /> How to Prepare</TabsTrigger>
            </TabsList>

            <TabsContent value="benefits" className="mt-6">
              <Card className="border-primary-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4 text-primary-800">
                  <p>
                    Sound healing supports deep relaxation and helps you release stress stored in the body. Many clients
                    report better sleep, improved focus, and a feeling of emotional lightness.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Calms the nervous system and reduces anxiety</li>
                    <li>Creates a meditative state without effort</li>
                    <li>Supports emotional release and heart coherence</li>
                    <li>Helps you reconnect to intuition and inner silence</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="process" className="mt-6">
              <Card className="border-primary-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4 text-primary-800">
                  <p>
                    Sessions are guided gently and can be online or in-person (depending on availability). We begin with
                    a short check-in, set an intention, and then move into the sound journey.
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Grounding breath & intention</li>
                    <li>Sound immersion (mantra / bowls / soft frequency work)</li>
                    <li>Silent integration</li>
                    <li>Closing reflection and recommendations</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prepare" className="mt-6">
              <Card className="border-primary-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4 text-primary-800">
                  <p>
                    Wear comfortable clothing, keep water nearby, and allow yourself a quiet space for 45–60 minutes.
                    For online sessions, headphones are recommended.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-primary-200 overflow-hidden">
                      <div className="relative h-40">
                        <Image src="/img/home-1.jpg" alt="Meditation space" fill className="object-cover" />
                      </div>
                      <div className="p-4 text-sm text-primary-800">Create a calm space (low light, minimal noise).</div>
                    </div>
                    <div className="rounded-xl border border-primary-200 overflow-hidden">
                      <div className="relative h-40">
                        <Image src="/img/home-2.jpg" alt="Breath" fill className="object-cover" />
                      </div>
                      <div className="p-4 text-sm text-primary-800">Arrive with a gentle intention—no pressure.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-primary-200 bg-white/70 backdrop-blur-sm p-6">
            <div>
              <div className="text-xl font-bold text-primary-900">Ready to experience calm?</div>
              <div className="text-primary-700">Book now or message on WhatsApp for quick scheduling.</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/h/appointment">
                <Button className="bg-blue-800 hover:bg-primary-900 text-white">Book Appointment</Button>
              </Link>
              <Button
                className="bg-success-500 hover:bg-success-600 text-white"
                onClick={() => redirectToWhatsApp("Hello! I want to book Sound Healing. Please guide me.")}
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
