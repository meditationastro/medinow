"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const topics = [
  {
    title: "Vedic Astrology & Jyotish",
    subtitle: "Ancient Science of Light",
    desc: "Discover how the cosmic dance of planets shapes your destiny. Receive personalized birth chart readings, karmic mapping, and timing guidance rooted in 5,000+ year old Himalayan wisdom.",
    cta: "Explore Astrology",
    href: "/h/astrological-chart-reading",
    bg: "from-indigo-900 via-purple-900 to-slate-900",
    emoji: "🌙",
  },
  {
    title: "Nishruti Meditation",
    subtitle: "Transcending the Planes of Hearing",
    desc: "Journey through Shruti → Anusruti → Nishruti. Experience the soundless sound beyond physical reality, developed by spiritual teacher Niaadim. Suitable for beginners and advanced seekers.",
    cta: "Start Meditating",
    href: "/h/meditation-and-yoga",
    bg: "from-teal-900 via-emerald-900 to-slate-900",
    emoji: "🧘",
  },
  {
    title: "Spiritual Retreats in Nepal",
    subtitle: "Sacred Himalayan Immersion",
    desc: "14-day immersive retreats at Kathmandu Valley, Pokhara, Lumbini & Namo Buddha. Daily meditation, Vedic rituals, temple visits, and cultural immersion. Groups of 8–12 participants.",
    cta: "View Retreat Dates",
    href: "/h/appointment",
    bg: "from-amber-900 via-orange-900 to-slate-900",
    emoji: "🏔️",
  },
  {
    title: "Neuroplastic Mind Acceleration",
    subtitle: "Science Meets Spirit",
    desc: "Brain rewiring meets ancient wisdom. Our neuroscience-backed meditation techniques combine brainwave training, breathwork, and mantra immersion to create lasting transformation.",
    cta: "Learn More",
    href: "/h/services",
    bg: "from-blue-900 via-cyan-900 to-slate-900",
    emoji: "⚡",
  },
  {
    title: "Vedic Birth Chart Generator",
    subtitle: "Know Your Cosmic Blueprint",
    desc: "Generate your free Vedic astrology birth chart instantly. Understand your Lagna (Ascendant), planetary placements, nakshatras, and get personalized insights for your spiritual journey.",
    cta: "Generate Your Chart",
    href: "/h/tools/birth-chart",
    bg: "from-rose-900 via-pink-900 to-slate-900",
    emoji: "✨",
  },
  {
    title: "Sound Healing & Chakra Balancing",
    subtitle: "Tibetan Bowl Therapy",
    desc: "Ancient Tibetan singing bowls, mantra chanting, and vibrational healing realign your energy centers. Each session is custom-tailored to your chakra imbalances and spiritual needs.",
    cta: "Book a Session",
    href: "/h/sound-healing",
    bg: "from-violet-900 via-purple-900 to-slate-900",
    emoji: "🔮",
  },
]

export function TopicsCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback((idx: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(idx)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prev = () => goTo((current - 1 + topics.length) % topics.length)
  const next = useCallback(() => goTo((current + 1) % topics.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const t = topics[current]

  return (
    <section className="relative z-10 py-16 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-primary-900 mb-3">Explore Our Sacred Offerings</h2>
          <p className="text-lg text-primary-700 max-w-2xl mx-auto">Ancient wisdom for the modern seeker — journey through our transformational programs</p>
        </div>

        <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${t.bg} transition-all duration-500 min-h-[340px] flex items-center`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-8 md:px-16 py-12 gap-8">
            <div className="text-center md:text-left max-w-2xl">
              <div className="text-6xl mb-4">{t.emoji}</div>
              <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-2">{t.subtitle}</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.title}</h3>
              <p className="text-white/80 text-lg leading-relaxed mb-8">{t.desc}</p>
              <Link
                href={t.href}
                className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full border border-white/40 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                {t.cta} →
              </Link>
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {topics.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary-700 w-8" : "bg-primary-300"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
