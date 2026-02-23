"use client"

import { Shield, Heart, Globe, Zap, Users, Award } from "lucide-react"
import { motion } from "framer-motion"

const reasons = [
  { icon: Award, title: "20+ Years of Mastery", desc: "Niaadim has spent over two decades studying Jyotish, Nishruti meditation, Ayurveda, and Himalayan spiritual traditions under authentic lineage teachers.", color: "from-amber-500 to-orange-600", bg: "from-amber-50 to-orange-50" },
  { icon: Globe, title: "Serving 15+ Countries", desc: "Thousands of seekers from Germany, France, Italy, Switzerland, USA, and beyond have transformed their lives through our online consultations.", color: "from-indigo-500 to-blue-600", bg: "from-indigo-50 to-blue-50" },
  { icon: Heart, title: "Holistic Approach", desc: "We integrate Vedic astrology, meditation, yoga, sound healing, and chakra work — addressing the whole person: body, mind, and spirit.", color: "from-rose-500 to-pink-600", bg: "from-rose-50 to-pink-50" },
  { icon: Shield, title: "Authentic Lineage", desc: "Our teachings come directly from Nepal's sacred traditions — not from books, but from lived experience and initiation into ancient wisdom streams.", color: "from-emerald-500 to-teal-600", bg: "from-emerald-50 to-teal-50" },
  { icon: Zap, title: "Practical Results", desc: "Sessions provide actionable remedies, personalized mantras, gemstone guidance, and meditation practices you can apply immediately.", color: "from-violet-500 to-purple-600", bg: "from-violet-50 to-purple-50" },
  { icon: Users, title: "Personalized Guidance", desc: "Every reading is unique to you. No generic interpretations — your birth chart, your current Dasha, your specific life questions.", color: "from-cyan-500 to-sky-600", bg: "from-cyan-50 to-sky-50" },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Why MeditationAstro</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mt-3 mb-4">
            Wisdom You Can Trust
          </h2>
          <p className="text-primary-700 text-lg max-w-2xl mx-auto">
            Not all spiritual guidance is equal. Here is why thousands of seekers from across the world choose Niaadim for their journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <div key={i} className={`group relative rounded-3xl p-8 bg-gradient-to-br ${r.bg} border border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/40 blur-xl" />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{r.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
