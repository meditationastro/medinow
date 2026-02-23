"use client"

import { MessageCircle, Phone, Mail } from "lucide-react"

export function ContactCTA() {
  return (
    <section className="relative z-10 py-16 px-4 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
      </div>
      <div className="relative container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Begin Your Transformation Today</h2>
        <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
          Connect with Niaadim directly — WhatsApp is the fastest way to book your first session
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/9779709598727"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp: +977-9709598727
          </a>
          <a
            href="mailto:meditationastro@gmail.com"
            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-2xl border border-white/40 backdrop-blur-sm transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            meditationastro@gmail.com
          </a>
          <a
            href="tel:+9779709598727"
            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-2xl border border-white/40 backdrop-blur-sm transition-all hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            Call Us
          </a>
        </div>
        <p className="text-white/50 text-sm mt-6">Khumaltar, Lalitpur, Nepal • Available for International Clients</p>
      </div>
    </section>
  )
}
