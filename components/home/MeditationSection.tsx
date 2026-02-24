"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wind, Brain, Heart, Sunrise, Moon, Waves, ChevronRight, Play } from "lucide-react"

const practices = [
  {
    icon: "🧘",
    name: "Nishruti Meditation",
    sanskrit: "निश्रुति",
    desc: "The art of deep inner listening — transcending sound into pure awareness. Our flagship practice developed from Himalayan tradition.",
    duration: "10–60 min",
    level: "All levels",
    benefit: "Inner silence",
    color: "from-indigo-900 to-violet-900",
    href: "/h/nishruti-meditation",
  },
  {
    icon: "🌬️",
    name: "Pranayama Breathwork",
    sanskrit: "प्राणायाम",
    desc: "Ancient yogic breathing techniques to regulate vital life force, calm the nervous system, and expand consciousness.",
    duration: "5–30 min",
    level: "Beginner friendly",
    benefit: "Stress relief",
    color: "from-teal-800 to-emerald-900",
    href: "/h/meditation",
  },
  {
    icon: "🔔",
    name: "Tibetan Sound Healing",
    sanskrit: "नाद योग",
    desc: "Sacred singing bowls and mantra create resonant frequencies that harmonize body, mind, and spirit at a cellular level.",
    duration: "30–90 min",
    level: "All levels",
    benefit: "Deep healing",
    color: "from-amber-800 to-orange-900",
    href: "/h/sound-healing",
  },
  {
    icon: "💛",
    name: "Metta Loving-Kindness",
    sanskrit: "मेत्ता",
    desc: "A heart-opening practice of compassion for self and all beings. Dissolves grief, anger, and separation into boundless warmth.",
    duration: "15–45 min",
    level: "Intermediate",
    benefit: "Emotional healing",
    color: "from-rose-800 to-pink-900",
    href: "/h/meditation-and-yoga",
  },
]

const benefits = [
  { icon: Brain, label: "Mental Clarity", desc: "Quieten the endless mental chatter" },
  { icon: Heart, label: "Emotional Balance", desc: "Release stored stress and trauma" },
  { icon: Sunrise, label: "Spiritual Growth", desc: "Awaken deeper levels of consciousness" },
  { icon: Waves, label: "Physical Wellbeing", desc: "Lower cortisol, improve sleep quality" },
  { icon: Moon, label: "Inner Peace", desc: "Access the stillness beneath all thought" },
  { icon: Wind, label: "Breathwork Mastery", desc: "Regulate your nervous system naturally" },
]

export function MeditationSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* cosmic background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="text-amber-400 text-sm font-medium tracking-widest uppercase">Ancient Wisdom</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The Path of<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-violet-400">
              Meditation
            </span>
          </h2>
          <p className="text-indigo-200 text-xl max-w-2xl mx-auto leading-relaxed">
            Rooted in Himalayan tradition, our meditation practices guide you from surface-level relaxation 
            to profound states of inner stillness and self-discovery.
          </p>
        </div>

        {/* Practice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {practices.map((p, i) => (
            <Link key={i} href={p.href} className="group">
              <div className={`bg-gradient-to-br ${p.color} rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-900/40 h-full`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{p.icon}</span>
                  <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
                </div>
                <div className="text-white/50 text-sm tracking-widest uppercase mb-1">{p.sanskrit}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{p.name}</h3>
                <p className="text-white/70 leading-relaxed mb-6">{p.desc}</p>
                <div className="flex gap-3 flex-wrap">
                  <span className="bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full">⏱ {p.duration}</span>
                  <span className="bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full">📊 {p.level}</span>
                  <span className="bg-amber-500/20 text-amber-300 text-xs px-3 py-1.5 rounded-full">✦ {p.benefit}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-10">Why Meditate?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <b.icon className="w-8 h-8 text-amber-400 mb-3" />
                <div className="text-white font-semibold mb-1">{b.label}</div>
                <div className="text-white/50 text-sm">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-violet-900/50 to-indigo-900/50 border border-white/10 rounded-3xl p-12">
          <div className="text-4xl mb-4">ॐ</div>
          <h3 className="text-3xl font-bold text-white mb-4">Begin Your Practice Today</h3>
          <p className="text-indigo-200 mb-8 max-w-xl mx-auto">
            Join thousands who have found clarity, peace, and purpose through our guided meditation programs.
            Your first session is always free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/h/meditation">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8">
                <Play className="w-5 h-5 mr-2" /> Try Free Session
              </Button>
            </Link>
            <Link href="/h/appointment">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Book 1-on-1 Guidance
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
