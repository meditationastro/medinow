"use client"

import { MapPin, Mail, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from 'next/dynamic'
import { ContactFormFields } from "./ContactFormFields"

const Map = dynamic(() => import('./Map').then(mod => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-primary-50/50 animate-pulse flex items-center justify-center">
      <p className="text-primary-700/60">Loading map...</p>
    </div>
  )
})

export function ContactForm() {
  return (
    <section className="relative z-10 py-16 px-4 min-h-screen flex items-center bg-gradient-to-b from-primary-50 to-secondary-50/50">
      <div className="absolute inset-0 bg-[url('/sacred-geometry.png')] opacity-5 z-0"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6 animate-fade-in-up">
            Get In Touch
          </h2>
          <p className="text-xl text-primary-700/90 animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Ready to begin your spiritual journey? Send me a message and let&apos;s connect for a transformative experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-white/80 backdrop-blur-md border-primary-300 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-left">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-primary-900">
                Send Message
              </CardTitle>
              <p className="text-primary-700/80 text-sm">Fill out the form below and I&apos;ll get back to you soon.</p>
            </CardHeader>
            <CardContent>
              <ContactFormFields />
            </CardContent>
          </Card>

          {/* Map and Contact Info */}
          <div className="space-y-6 animate-slide-in-right">
            {/* Map */}
            <Card className="bg-white/80 backdrop-blur-md border-primary-300 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ">
              <CardHeader>
                <CardTitle className="text-xl text-primary-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Map className="rounded-none" />
                <div className="p-4 bg-gradient-to-t from-primary-50/90 to-primary-50/80 backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-primary-700 font-semibold">Kathmandu, Nepal</p>
                    <p className="text-primary-700 text-sm">Sacred Himalayan Wisdom Center</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Info */}
            <div className="grid gap-4">
              <Card className="bg-white/80 backdrop-blur-md border-primary-300 shadow-md hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-4 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-amber-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900">WhatsApp</p>
                    <p className="text-primary-700">+977 982-3376110</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-primary-300 shadow-md hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-4 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-amber-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900">Email</p>
                    <p className="text-primary-700">meditationastro1@gmail.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 