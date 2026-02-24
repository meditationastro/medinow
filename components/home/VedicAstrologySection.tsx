"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Star, Gem, BookOpen, Compass, Sun, Moon, ChevronRight } from "lucide-react"

const planets = [
  { name: "Surya", english: "Sun", symbol: "☉", color: "text-amber-400", desc: "Soul, authority, father" },
  { name: "Chandra", english: "Moon", symbol: "☽", color: "text-blue-300", desc: "Mind, mother, emotions" },
  { name: "Mangal", english: "Mars", symbol: "♂", color: "text-red-400", desc: "Energy, courage, siblings" },
  { name: "Budha", english: "Mercury", symbol: "☿", color: "text-green-400", desc: "Intellect, communication" },
  { name: "Guru", english: "Jupiter", symbol: "♃", color: "text-yellow-300", desc: "Wisdom, dharma, expansion" },
  { name: "Shukra", english: "Venus", symbol: "♀", color: "text-pink-400", desc: "Love, beauty, luxury" },
  { name: "Shani", english: "Saturn", symbol: "♄", color: "text-slate-400", desc: "Karma, discipline, delay" },
  { name: "Rahu", english: "Rahu Node", symbol: "☊", color: "text-violet-400", desc: "Worldly desires, ambition" },
  { name: "Ketu", english: "Ketu Node", symbol: "☋", color: "text-orange-400", desc: "Liberation, past karma" },
]

const services = [
  {
    icon: Star,
    title: "Natal Birth Chart Reading",
    price: "USD 25 / NPR 2,500",
    duration: "60 min",
    desc: "Complete Vedic birth chart (Kundali) analysis — your life's cosmic blueprint covering career, relationships, health, and dharma.",
    highlights: ["Lagna & rising sign analysis", "Planetary period (Dasha) forecast", "Strengths & karmic lessons", "Practical life guidance"],
    color: "border-amber-200 bg-amber-50/50",
    badge: "Most Popular",
  },
  {
    icon: Calendar,
    title: "Jyotish Consultancy",
    price: "USD 35 / NPR 3,500",
    duration: "75 min",
    desc: "Classical Vedic astrology for specific life questions — career crossroads, relationship decisions, relocation, auspicious timing.",
    highlights: ["Dasha & transit analysis", "Muhurta (timing) selection", "Specific question focus", "Remedy recommendations"],
    color: "border-blue-200 bg-blue-50/50",
    badge: "Deep Dive",
  },
  {
    icon: Gem,
    title: "Gemstone & Remedy Session",
    price: "USD 20 / NPR 2,000",
    duration: "45 min",
    desc: "Personalized Jyotish remedies — gemstones, mantras, yantras, and lifestyle practices aligned with your specific chart.",
    highlights: ["Chart-based gemstone guidance", "Mantra & yantra recommendations", "Ritual and lifestyle alignment", "Follow-up support"],
    color: "border-violet-200 bg-violet-50/50",
    badge: "Healing",
  },
]

const facts = [
  { emoji: "📅", title: "5,000+ Years Old", desc: "Vedic astrology predates Western astrology by millennia" },
  { emoji: "🌍", title: "27 Nakshatras", desc: "Lunar mansions that reveal your soul's unique nature" },
  { emoji: "⭐", title: "9 Grahas (Planets)", desc: "Including the shadow planets Rahu and Ketu" },
  { emoji: "🔮", title: "12 Rashis (Signs)", desc: "The sidereal zodiac grounded in actual star positions" },
]

export function VedicAstrologySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-amber-50/30 to-blue-50/20 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-amber-600" />
            <span className="text-amber-700 text-sm font-semibold tracking-wide">Jyotish Vidya</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 leading-tight">
            Vedic Astrology &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              Jyotish Wisdom
            </span>
          </h2>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Jyotish — "the eye of the Veda" — is a sacred science of self-understanding and cosmic timing. 
            Not fortune-telling, but a map of your soul's unique journey.
          </p>
        </div>

        {/* The 9 Planets */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-blue-900 text-center mb-8">The Nine Cosmic Influences (Navagraha)</h3>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
            {planets.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-0.5 transform duration-200">
                <div className={`text-3xl font-bold mb-1 ${p.color}`}>{p.symbol}</div>
                <div className="text-xs font-bold text-slate-800">{p.name}</div>
                <div className="text-xs text-slate-400">{p.english}</div>
                <div className="text-xs text-slate-500 mt-1 hidden md:block">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {facts.map((f, i) => (
            <div key={i} className="bg-white border border-amber-100 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-3xl mb-2">{f.emoji}</div>
              <div className="font-bold text-blue-900 text-sm">{f.title}</div>
              <div className="text-slate-500 text-xs mt-1">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Services */}
        <h3 className="text-3xl font-bold text-blue-900 text-center mb-10">Consultation Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map((s, i) => (
            <div key={i} className={`border-2 ${s.color} rounded-3xl p-8 relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
              {s.badge && (
                <span className="absolute -top-3 left-6 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">{s.badge}</span>
              )}
              <s.icon className="w-10 h-10 text-blue-800 mb-4" />
              <h4 className="text-xl font-bold text-blue-900 mb-2">{s.title}</h4>
              <div className="flex gap-3 mb-4">
                <span className="text-amber-700 font-bold text-sm">{s.price}</span>
                <span className="text-slate-400 text-sm">• {s.duration}</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{s.desc}</p>
              <ul className="space-y-2 mb-6">
                {s.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-amber-500 mt-0.5">✦</span> {h}
                  </li>
                ))}
              </ul>
              <Link href="/h/appointment">
                <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white">
                  Book This Session <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Tools CTA */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-10 text-center text-white">
          <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-3">Explore Free Vedic Tools</h3>
          <p className="text-blue-200 max-w-xl mx-auto mb-8">
            Calculate your birth chart, find your Nakshatra, discover auspicious timing, and explore Vedic gemstone guidance — all free.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/h/tools/birth-chart">
              <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold">🌟 Birth Chart Calculator</Button>
            </Link>
            <Link href="/h/tools/numerology">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">🔢 Numerology</Button>
            </Link>
            <Link href="/h/tools/gemstone">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">💎 Gemstone Guide</Button>
            </Link>
            <Link href="/h/tools/muhurta">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">📅 Muhurta Planner</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
