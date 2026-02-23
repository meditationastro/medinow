"use client"

import Image from "next/image"
import Link from "next/link"
import { Sparkles, Layers, Flower2, MessageCircle, CalendarDays } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { redirectToWhatsApp } from "@/lib/whatsapp"

export default function ChakraBalancingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 text-primary-800 mb-4">
                <Sparkles className="w-6 h-6" />
                <span className="font-semibold">Service</span>
              </div>
              <h1 className="text-5xl font-bold text-primary-900 leading-tight">Chakra Balancing & Energy Alignment</h1>
              <p className="mt-5 text-lg text-primary-700 leading-relaxed">
                When energy centers are blocked, we feel stuck—mentally, emotionally, or physically. Chakra balancing is
                a gentle, guided approach to restore flow and harmony so you can move forward with clarity.
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
                      "Hello! I'd like a Chakra Balancing session. Please share available times and pricing."
                    )
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Booking
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-primary-200 shadow-sm h-[320px]">
              <Image src="/img/about-main-image.jpg" alt="Chakra balancing" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 bg-primary-100">
              <TabsTrigger value="overview" className="gap-2"><Layers className="w-4 h-4" /> Overview</TabsTrigger>
              <TabsTrigger value="focus" className="gap-2"><Flower2 className="w-4 h-4" /> What We Work On</TabsTrigger>
              <TabsTrigger value="aftercare" className="gap-2"><Sparkles className="w-4 h-4" /> Aftercare</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card className="border-primary-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4 text-primary-800">
                  <p>
                    This session combines guided meditation, breathwork, visualization, and simple energy practices.
                    It is not a replacement for medical care—but it can support wellbeing, calm the mind, and help you
                    reconnect with confidence.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Grounding (Root) and stability</li>
                    <li>Creativity and emotions (Sacral)</li>
                    <li>Self-worth and motivation (Solar Plexus)</li>
                    <li>Love and forgiveness (Heart)</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="focus" className="mt-6">
              <Card className="border-primary-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4 text-primary-800">
                  <p>
                    We identify your current patterns and focus on 2–3 chakras most related to your goals. Each chakra
                    includes a theme, a healing practice, and a daily micro-ritual you can repeat.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-primary-200 overflow-hidden">
                      <div className="relative h-40">
                        <Image src="/img/home-4.jpg" alt="Meditation" fill className="object-cover" />
                      </div>
                      <div className="p-4 text-sm text-primary-800">Guided visualization to clear blocks.</div>
                    </div>
                    <div className="rounded-xl border border-primary-200 overflow-hidden">
                      <div className="relative h-40">
                        <Image src="/img/bg-hero.jpg" alt="Energy" fill className="object-cover" />
                      </div>
                      <div className="p-4 text-sm text-primary-800">Breath + mantra for alignment.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="aftercare" className="mt-6">
              <Card className="border-primary-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4 text-primary-800">
                  <p>
                    After the session you may feel lighter, sleepy, or emotional. This is normal. We recommend water,
                    gentle food, and 10 minutes of silence daily for 7 days.
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Hydrate and rest</li>
                    <li>Journal your insights</li>
                    <li>Repeat the provided micro-ritual daily</li>
                    <li>Follow up if you feel intense emotional release</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-primary-200 bg-white/70 backdrop-blur-sm p-6">
            <div>
              <div className="text-xl font-bold text-primary-900">Want personalized guidance?</div>
              <div className="text-primary-700">Book now or message on WhatsApp for quick scheduling.</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/h/appointment">
                <Button className="bg-blue-800 hover:bg-primary-900 text-white">Book Appointment</Button>
              </Link>
              <Button
                className="bg-success-500 hover:bg-success-600 text-white"
                onClick={() => redirectToWhatsApp("Hello! I want to book Chakra Balancing. Please guide me.")}
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
