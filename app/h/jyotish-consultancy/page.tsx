"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookingForm } from "@/components/BookingForm"
import {
  Star, Eye, Clock, Calendar, Gem, Sun, Moon, Sparkles,
  ChevronRight, MapPin, Phone, Mail, Globe, Check
} from "lucide-react"

const offerings = [
  {
    icon: "🪐",
    title: "Dasha & Transit Analysis",
    subtitle: "Mahadasha • Antardasha • Gochar",
    desc: "Understand the planetary periods (Dasha system) currently shaping your life, and how upcoming transits influence your career, health, relationships, and spiritual path.",
    items: ["Current & upcoming Mahadasha interpretation", "Sade Sati and Saturn transit guidance", "Jupiter transit blessings", "Timing of major life events"],
  },
  {
    icon: "🕯️",
    title: "Muhurta — Auspicious Timing",
    subtitle: "Sacred Intelligence of Time",
    desc: "In Vedic tradition, the moment you begin something shapes its entire unfolding. We select the optimal timing for your most important events.",
    items: ["Marriage & engagement dates", "Business launch & investments", "Property purchase & relocation", "Travel & pilgrimage", "Starting spiritual practices"],
  },
  {
    icon: "💎",
    title: "Remedies for Balance",
    subtitle: "Gemstones • Mantras • Rituals • Yantras",
    desc: "Conscious planetary remedies — not superstition, but energetic alignment — to harmonize challenging chart patterns and strengthen beneficial influences.",
    items: ["Chart-specific gemstone recommendations", "Personalized mantra practice", "Yantra and ritual guidance", "Dietary & lifestyle alignment"],
  },
  {
    icon: "📊",
    title: "Focused Life-Question Readings",
    subtitle: "Career • Relationships • Decisions • Health",
    desc: "Sometimes you have one specific question that needs Jyotish clarity. These focused sessions go deep into your area of concern.",
    items: ["Career direction & transitions", "Relationship & marriage compatibility", "Family planning & children", "Foreign travel & relocation", "Periods of confusion or stagnation"],
  },
]

const whyDifferent = [
  { icon: "🪞", text: "Awareness-based — your chart is a mirror, not a verdict" },
  { icon: "📜", text: "Classical Jyotish Shastra (not Western astrology)" },
  { icon: "🌍", text: "Available online worldwide & in Kathmandu, Nepal" },
  { icon: "🔒", text: "Confidential, ethical, and non-fear-based guidance" },
  { icon: "🧘", text: "Integrated with Meditation & Self-Inquiry practices" },
  { icon: "✅", text: "No predictions of doom — only conscious navigation" },
]

const packages = [
  {
    name: "Starter Reading",
    price: "USD 25",
    npr: "NPR 2,500",
    duration: "60 min",
    desc: "Complete birth chart overview with life guidance",
    includes: ["Lagna analysis", "Planetary strengths & weaknesses", "Current Dasha period", "One area of focus"],
    color: "border-amber-300 bg-amber-50",
    popular: false,
  },
  {
    name: "Full Jyotish Session",
    price: "USD 45",
    npr: "NPR 4,500",
    duration: "90 min",
    desc: "Deep dive into chart, timing, and remedies",
    includes: ["Complete chart analysis", "Dasha & transit forecast", "Remedy recommendations", "2 areas of focus", "Follow-up Q&A"],
    color: "border-blue-400 bg-blue-50",
    popular: true,
  },
  {
    name: "Relationship Compatibility",
    price: "USD 35",
    npr: "NPR 3,500",
    duration: "75 min",
    desc: "Synastry & composite chart for couples",
    includes: ["Both birth charts analyzed", "Compatibility scoring", "Strength & challenge areas", "Muhurta for auspicious dates"],
    color: "border-violet-300 bg-violet-50",
    popular: false,
  },
]

const planets = [
  { sym: "☉", name: "Surya", key: "Soul & Authority", color: "text-amber-500" },
  { sym: "☽", name: "Chandra", key: "Mind & Emotions", color: "text-blue-300" },
  { sym: "♂", name: "Mangal", key: "Drive & Courage", color: "text-red-500" },
  { sym: "☿", name: "Budha", key: "Intellect", color: "text-green-500" },
  { sym: "♃", name: "Guru", key: "Wisdom & Dharma", color: "text-yellow-500" },
  { sym: "♀", name: "Shukra", key: "Love & Beauty", color: "text-pink-500" },
  { sym: "♄", name: "Shani", key: "Karma & Time", color: "text-slate-400" },
  { sym: "☊", name: "Rahu", key: "Desires & Ambition", color: "text-violet-400" },
  { sym: "☋", name: "Ketu", key: "Liberation", color: "text-orange-400" },
]

export default function JyotishConsultancyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-28 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{
                width: (Math.random() * 2 + 1) + "px",
                height: (Math.random() * 2 + 1) + "px",
                top: (Math.random() * 100) + "%",
                left: (Math.random() * 100) + "%",
                opacity: Math.random() * 0.5 + 0.1,
              }} />
          ))}
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm tracking-widest uppercase">Jyotish Vidya</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Jyotish<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Consultancy
            </span>
          </h1>
          <p className="text-2xl text-blue-200 font-light mb-4">Navigate Life with Vedic Light</p>
          <p className="text-blue-300/80 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
            Jyotish, the "Eye of the Veda," is a sacred science of cosmic intelligence and self-understanding. 
            At AnswerForSelf, we help you recognize your karmic patterns and move forward with clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingForm
              variant="modal"
              triggerButton={
                <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8">
                  <Calendar className="w-5 h-5 mr-2" /> Book a Consultation
                </Button>
              }
            />
            <Link href="#offerings">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Navagraha */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-center text-2xl font-bold mb-8">The Nine Cosmic Influences — Navagraha</h2>
          <div className="grid grid-cols-9 gap-2">
            {planets.map((p, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-3 text-center hover:bg-white/20 transition-colors">
                <div className={`text-3xl font-bold mb-1 ${p.color}`}>{p.sym}</div>
                <div className="text-white text-xs font-bold">{p.name}</div>
                <div className="text-white/50 text-xs mt-0.5 hidden lg:block">{p.key}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 bg-amber-50 border-y border-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">What Makes Our Jyotish Different</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whyDifferent.map((w, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-5 border border-amber-100 shadow-sm">
                <span className="text-2xl flex-shrink-0">{w.icon}</span>
                <span className="text-slate-700 text-sm leading-relaxed">{w.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">🔮 What We Offer</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Each session is contextual, grounded, and deeply personal — tailored to your exact chart and life situation.</p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
            {offerings.map((o, i) => (
              <div key={i} className="border border-slate-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:border-amber-200 bg-gradient-to-r from-white to-amber-50/30">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center text-3xl">
                      {o.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-amber-600 tracking-widest uppercase mb-1">{o.subtitle}</div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">{o.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">{o.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {o.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages / Pricing */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Consultation Packages</h2>
            <p className="text-slate-600">Transparent pricing. Lifetime value. Your chart analyzed with full care and depth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <div key={i} className={`border-2 ${pkg.color} rounded-3xl p-8 relative ${pkg.popular ? "scale-105 shadow-2xl" : "shadow-md"} hover:shadow-xl transition-all duration-300`}>
                {pkg.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-800 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    ⭐ Most Recommended
                  </span>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-blue-800">{pkg.price}</div>
                  <div className="text-slate-500 text-sm">{pkg.npr} • {pkg.duration}</div>
                  <p className="text-slate-600 text-sm mt-3">{pkg.desc}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/h/appointment">
                  <Button className={`w-full ${pkg.popular ? "bg-blue-800 hover:bg-blue-900 text-white" : "bg-white border-2 border-blue-800 text-blue-800 hover:bg-blue-50"}`}>
                    Book This Session
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Booking CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-950 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            <div>
              <div className="text-amber-400 text-5xl mb-4">🔮</div>
              <h2 className="text-4xl font-bold mb-4">Ready to Read Your Stars?</h2>
              <p className="text-blue-200 leading-relaxed mb-8">
                Jyotish is not about predicting a fixed fate — it's about understanding your current karma and 
                making conscious choices that align with your highest purpose. Book your session now.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-blue-200">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span>meditationastro1@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-blue-200">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span>+977 9841647283 (WhatsApp)</span>
                </div>
                <div className="flex items-center gap-3 text-blue-200">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>Kathmandu, Nepal • Available Online Worldwide</span>
                </div>
                <div className="flex items-center gap-3 text-blue-200">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>9:00 AM – 8:00 PM Nepal Time (UTC+5:45)</span>
                </div>
              </div>
              <div className="flex gap-3">
                <BookingForm
                  variant="modal"
                  triggerButton={
                    <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8">
                      <Calendar className="w-5 h-5 mr-2" /> Book Now
                    </Button>
                  }
                />
                <Link href="/h/tools/birth-chart">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Free Birth Chart
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Jyotish & Meditation — A Holistic Path</h3>
              <div className="space-y-4">
                {[
                  { icon: "🔭", title: "Jyotish reveals", desc: "Your karmic patterns, timing, and cosmic blueprint" },
                  { icon: "🧘", title: "Meditation deepens", desc: "Your capacity to witness and respond consciously" },
                  { icon: "🌊", title: "Together they create", desc: "A life lived in alignment with your soul's purpose" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-blue-300 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/20 mt-6 pt-6">
                <div className="text-center text-amber-400 text-3xl mb-2">ॐ</div>
                <p className="text-blue-300 text-sm text-center italic">
                  "True guidance does not end with information — it deepens through inner understanding."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
