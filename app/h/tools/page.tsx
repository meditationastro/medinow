import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Vedic Astrology Tools – Birth Chart, Mantra, Numerology | MeditationAstro",
  description: "Free interactive Vedic astrology and meditation tools — birth chart generator, mantra recommender, numerology calculator, gemstone guide, and breathing meditation timer.",
}

const TOOLS = [
  {
    href: "/h/tools/birth-chart", emoji: "🌟", title: "Vedic Birth Chart Generator",
    desc: "Generate your free Vedic birth chart — Lagna, Moon sign, Nakshatra, Mahadasha, and all planetary placements in the 12 houses.",
    tags: ["Free", "Astrology", "Beginner-Friendly"], color: "from-amber-500 to-orange-600", featured: true,
  },
  {
    href: "/h/tools/mantra", emoji: "🕉️", title: "Sacred Mantra Practice",
    desc: "Choose your intention, receive the perfect mantra with Sanskrit text and meaning, interactive japa counter, and 7-day practice plan.",
    tags: ["Free", "Meditation", "Interactive"], color: "from-violet-600 to-purple-700", featured: true,
  },
  {
    href: "/h/meditation", emoji: "🧘", title: "Meditation Timer Studio",
    desc: "5 guided meditation practices including Nirati, Nishruti, and Nispaersh — with breathing animations and session timers.",
    tags: ["Free", "Interactive", "All Levels"], color: "from-indigo-500 to-blue-700", featured: true,
  },
  {
    href: "/h/tools/numerology", emoji: "🔢", title: "Vedic Numerology Calculator",
    desc: "Calculate your Destiny number, Life Path number, and Name number. Get practical Vedic insights for each.",
    tags: ["Free", "Numerology"], color: "from-teal-500 to-cyan-600",
  },
  {
    href: "/h/tools/gemstone", emoji: "💎", title: "Gemstone Guidance Tool",
    desc: "Educational tool to understand gemstones by planetary rulership — cleansing methods, intentions, and traditional uses.",
    tags: ["Free", "Educational"], color: "from-rose-500 to-pink-600",
  },
  {
    href: "/h/tools/muhurta", emoji: "📅", title: "Muhurta Planner",
    desc: "Create a decision-ready checklist for auspicious timing — set your intention, constraints, and receive timing guidance.",
    tags: ["Free", "Planning"], color: "from-green-500 to-emerald-600",
  },
  {
    href: "/h/dosha", emoji: "🌿", title: "Dosha Constitution Quiz",
    desc: "Discover your Ayurvedic constitution — Vata, Pitta, or Kapha — and get lifestyle, diet, and practice recommendations.",
    tags: ["Free", "Ayurveda", "Quiz"], color: "from-lime-500 to-green-600",
  },
  {
    href: "/h/nishruti-meditation", emoji: "🎧", title: "Nishruti Meditation Course",
    desc: "The full 5-module meditation course by Niaadim — from Shruti to Nishruti. Lifetime access with certificate.",
    tags: ["Premium", "Course"], color: "from-slate-700 to-slate-900",
  },
]

export default function ToolsHubPage() {
  const featured = TOOLS.filter(t => t.featured)
  const rest = TOOLS.filter(t => !t.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 text-white py-20 px-4 text-center">
        <div className="text-5xl mb-4">🔧</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Vedic Tools & Interactive Practices</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
          Free, sophisticated tools for self-discovery — birth charts, meditation timers, mantra practice, numerology, and more. Built for serious seekers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/h/appointment">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-3 rounded-xl">
              Book Personal Reading →
            </Button>
          </Link>
          <Link href="/h/resources">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl">
              Free Downloads
            </Button>
          </Link>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Featured Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" /> Most Popular Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map(tool => (
              <Link key={tool.href} href={tool.href} className="group block">
                <div className="h-full rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-primary-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className={`bg-gradient-to-br ${tool.color} p-8 text-white text-center`}>
                    <div className="text-5xl mb-3">{tool.emoji}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 bg-white">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary-700">{tool.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{tool.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.map(t => <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>)}
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Other Tools */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Tools & Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rest.map(tool => (
              <Link key={tool.href} href={tool.href} className="group block bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-primary-200 transition-all">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                  {tool.emoji}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-primary-700">{tool.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{tool.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary-600 font-medium">{tool.tags[0]}</span>
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-primary-900 to-indigo-900 rounded-3xl p-10 text-white text-center">
          <div className="text-4xl mb-4">🔮</div>
          <h2 className="text-3xl font-bold mb-3">Ready for a Personal Reading?</h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">Tools are a starting point. For deep insight into your unique birth chart, karmic patterns, and life timing — book a session with Niaadim.</p>
          <Link href="/h/appointment">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-10 py-4 text-lg rounded-2xl">
              Book a Free Discovery Call →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
