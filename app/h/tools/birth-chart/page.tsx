"use client"

import { useState } from "react"
import { Star, Sun, Moon, Calendar, Clock, MapPin, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookingForm } from "@/components/BookingForm"

// Vedic zodiac signs (Rashis)
const rashis = [
  "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)",
  "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrischika (Scorpio)",
  "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"
]

// 27 Nakshatras
const nakshatras = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu",
  "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta",
  "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
  "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada",
  "Uttara Bhadrapada", "Revati"
]

// Planets in Vedic
const planets = ["Sun (Surya)", "Moon (Chandra)", "Mars (Mangal)", "Mercury (Budha)", "Jupiter (Guru)", "Venus (Shukra)", "Saturn (Shani)", "Rahu (North Node)", "Ketu (South Node)"]

function computeVedicChart(birthDate: Date, birthHour: number, birthMin: number) {
  // Approximate Vedic calculations (for educational/demo purposes)
  const jd = birthDate.getTime() / 86400000 + 2440587.5 // Julian day
  const dayOfYear = Math.floor((birthDate.getTime() - new Date(birthDate.getFullYear(), 0, 0).getTime()) / 86400000)
  const hour = birthHour + birthMin / 60

  // Approximate Lagna (Ascendant) — every ~2 hours a new sign rises
  const lagnaIdx = Math.floor(((hour + (dayOfYear % 12)) / 2) % 12)
  
  // Moon sign (changes every ~2.25 days)
  const moonDayOffset = Math.floor(jd % 27.3)
  const moonSign = Math.floor((moonDayOffset / 27.3) * 12) % 12
  
  // Sun sign (Vedic, ~1 month behind Western due to ayanamsha)
  const month = birthDate.getMonth()
  const day = birthDate.getDate()
  let sunSign = month
  if (day < 14) sunSign = (month - 1 + 12) % 12  // Vedic sun lags ~23 days
  
  // Nakshatra (Moon nakshatra — 27 nakshatras cycle)
  const nakshatraIdx = Math.floor((moonDayOffset / 27.3) * 27) % 27
  
  // Pada (1-4) within nakshatra
  const pada = (Math.floor((moonDayOffset / 27.3) * 108) % 4) + 1
  
  // Planet placements (simplified demo)
  const planetPlacements = planets.map((planet, i) => {
    const sign = Math.floor((jd + i * 137.5) % 12)
    const deg = Math.floor((jd * (i + 1) * 3.14) % 30)
    return { planet, sign: rashis[sign], degrees: deg }
  })

  // Mahadasha based on Moon nakshatra
  const dashaLords = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"]
  const dashaYears = [7, 20, 6, 10, 7, 18, 16, 19, 17]
  const dashaIdx = nakshatraIdx % 9
  const currentDasha = dashaLords[dashaIdx]
  const dashaDuration = dashaYears[dashaIdx]

  return {
    lagna: rashis[lagnaIdx],
    moonSign: rashis[moonSign],
    sunSign: rashis[sunSign],
    nakshatra: nakshatras[nakshatraIdx],
    pada,
    planetPlacements,
    currentDasha,
    dashaDuration,
    nakshatraIdx,
  }
}

const dashaDescriptions: Record<string, string> = {
  "Sun": "Sun Mahadasha brings leadership, authority, and self-realization. A time for career advancement and connecting with your life purpose. Duration: 6 years.",
  "Moon": "Moon Mahadasha emphasizes emotions, intuition, and relationships. Strong influence of mother, homeland, and inner life. Duration: 10 years.",
  "Mars": "Mars Mahadasha brings energy, action, and ambition. A time for bold moves, but also requiring patience with conflict. Duration: 7 years.",
  "Rahu": "Rahu Mahadasha is a period of rapid change, worldly ambition, and karmic acceleration. Unexpected events and transformation. Duration: 18 years.",
  "Jupiter": "Jupiter Mahadasha is the most auspicious period — wisdom, prosperity, spiritual growth, and good fortune. Duration: 16 years.",
  "Saturn": "Saturn Mahadasha demands hard work, discipline, and facing karma. Challenges lead to lasting achievements. Duration: 19 years.",
  "Mercury": "Mercury Mahadasha enhances intellect, communication, business, and learning. Favorable for education and trade. Duration: 17 years.",
  "Ketu": "Ketu Mahadasha encourages spiritual liberation, detachment, and past-life karma resolution. Mystical experiences. Duration: 7 years.",
  "Venus": "Venus Mahadasha brings love, beauty, creativity, and material comforts. The longest and often most enjoyable dasha. Duration: 20 years.",
}

const lagnaDescriptions: Record<string, string> = {
  "Mesha (Aries)": "Mesha Lagna: Fearless pioneer. You are bold, energetic, and natural leader. Ruled by Mars, you are action-oriented with strong willpower.",
  "Vrishabha (Taurus)": "Vrishabha Lagna: Grounded and sensual. You value stability, beauty, and material comfort. Ruled by Venus, you have artistic talents and persistence.",
  "Mithuna (Gemini)": "Mithuna Lagna: Quick-witted communicator. Versatile, curious, and intellectually gifted. Ruled by Mercury, you excel in expression and learning.",
  "Karka (Cancer)": "Karka Lagna: Nurturing and intuitive. Deeply emotional with strong family bonds. Ruled by Moon, you are empathetic and protective.",
  "Simha (Leo)": "Simha Lagna: Natural royalty. Charismatic, creative, and generous. Ruled by Sun, you are born for leadership and recognition.",
  "Kanya (Virgo)": "Kanya Lagna: Analytical perfectionist. Practical, service-oriented, and health-conscious. Ruled by Mercury, you excel in detail and healing arts.",
  "Tula (Libra)": "Tula Lagna: Seeker of harmony. Diplomatic, artistic, and relationship-focused. Ruled by Venus, you create beauty and balance.",
  "Vrischika (Scorpio)": "Vrischika Lagna: Transformational depth. Intense, psychic, and investigative. Ruled by Mars and Ketu, you penetrate life's mysteries.",
  "Dhanu (Sagittarius)": "Dhanu Lagna: Philosophical adventurer. Freedom-loving, optimistic, and truth-seeking. Ruled by Jupiter, you inspire others with wisdom.",
  "Makara (Capricorn)": "Makara Lagna: Disciplined achiever. Ambitious, patient, and responsible. Ruled by Saturn, you build lasting legacies through hard work.",
  "Kumbha (Aquarius)": "Kumbha Lagna: Humanitarian visionary. Innovative, independent, and social. Ruled by Saturn and Rahu, you work for collective upliftment.",
  "Meena (Pisces)": "Meena Lagna: Spiritual dreamer. Compassionate, intuitive, and artistic. Ruled by Jupiter and Ketu, you dissolve into divine love.",
}

export default function BirthChartPage() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    place: "",
  })
  const [chart, setChart] = useState<ReturnType<typeof computeVedicChart> | null>(null)
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.date || !form.time) {
      setError("Please enter your birth date and time.")
      return
    }
    setError("")
    const [h, m] = form.time.split(":").map(Number)
    const d = new Date(form.date)
    setChart(computeVedicChart(d, h || 0, m || 0))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-slate-50">
      {/* Hero */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Star className="w-16 h-16 text-amber-400" />
              <Sparkles className="w-8 h-8 text-purple-300 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Vedic Birth Chart Generator</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover your Lagna, Moon sign, Nakshatra, current Mahadasha, and planetary placements through the ancient science of Jyotish
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-purple-200 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-indigo-900">
                <Calendar className="w-6 h-6" />
                Enter Your Birth Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary-800 mb-2">Your Name (optional)</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Arjun Sharma"
                    className="w-full border border-primary-200 rounded-lg px-4 py-3 text-primary-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-800 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className="w-full border border-primary-200 rounded-lg px-4 py-3 text-primary-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-800 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Time of Birth *
                  </label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                    className="w-full border border-primary-200 rounded-lg px-4 py-3 text-primary-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                  <p className="text-xs text-primary-500 mt-1">Accurate birth time gives the most precise Lagna (Ascendant)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-800 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Place of Birth
                  </label>
                  <input
                    type="text"
                    value={form.place}
                    onChange={(e) => setForm({ ...form, place: e.target.value })}
                    placeholder="e.g. Kathmandu, Nepal"
                    className="w-full border border-primary-200 rounded-lg px-4 py-3 text-primary-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800 text-white py-6 text-lg font-semibold"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Generate My Vedic Chart
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
            <strong>Educational Tool:</strong> This generator provides an approximate overview based on Vedic astrology principles. For a detailed, accurate reading with remedies and personalized guidance, book a consultation with Niaadim.
          </div>
        </div>
      </section>

      {/* Results */}
      {chart && (
        <section className="pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-indigo-900 mb-2">
                {form.name ? `${form.name}'s` : "Your"} Vedic Birth Chart
              </h2>
              <p className="text-primary-600">Born: {new Date(form.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} {form.time && `at ${form.time}`}{form.place && ` · ${form.place}`}</p>
            </div>

            {/* Key Placements */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                <CardContent className="p-6 text-center">
                  <Sun className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                  <p className="text-xs text-amber-600 font-bold uppercase tracking-widest mb-1">Lagna (Ascendant)</p>
                  <p className="text-2xl font-bold text-amber-900">{chart.lagna}</p>
                  <p className="text-xs text-amber-700 mt-2">Your soul expression & physical personality</p>
                </CardContent>
              </Card>
              <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
                <CardContent className="p-6 text-center">
                  <Moon className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                  <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest mb-1">Rashi (Moon Sign)</p>
                  <p className="text-2xl font-bold text-indigo-900">{chart.moonSign}</p>
                  <p className="text-xs text-indigo-700 mt-2">Your emotions, mind & instinctual nature</p>
                </CardContent>
              </Card>
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
                <CardContent className="p-6 text-center">
                  <Star className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                  <p className="text-xs text-purple-600 font-bold uppercase tracking-widest mb-1">Janma Nakshatra</p>
                  <p className="text-2xl font-bold text-purple-900">{chart.nakshatra}</p>
                  <p className="text-xs text-purple-700 mt-2">Pada {chart.pada} · Your lunar mansion</p>
                </CardContent>
              </Card>
            </div>

            {/* Lagna Description */}
            <Card className="mb-8 border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Lagna Insight — {chart.lagna}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-800 leading-relaxed text-lg">
                  {lagnaDescriptions[chart.lagna] || `Your ${chart.lagna} Lagna gives you distinctive qualities shaped by its ruling planet. Book a consultation for a full personality analysis.`}
                </p>
              </CardContent>
            </Card>

            {/* Mahadasha */}
            <Card className="mb-8 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                <CardTitle className="text-purple-900">
                  🌀 Current Mahadasha: <span className="text-indigo-800">{chart.currentDasha}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-primary-800 leading-relaxed text-lg mb-4">
                  {dashaDescriptions[chart.currentDasha] || `Your current Mahadasha period is governed by ${chart.currentDasha}. This is an important cycle for growth and karmic fulfillment.`}
                </p>
                <div className="bg-purple-50 rounded-lg p-4 text-sm text-purple-800">
                  <strong>What is a Mahadasha?</strong> In Vedic astrology, life is divided into planetary periods called Dashas. Each planet rules a major cycle that influences career, relationships, health and spiritual development.
                </div>
              </CardContent>
            </Card>

            {/* Planetary Placements */}
            <Card className="mb-8 border-slate-200">
              <CardHeader>
                <CardTitle className="text-primary-900">🪐 Approximate Planetary Placements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {chart.planetPlacements.map((p) => (
                    <div key={p.planet} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
                      <span className="font-medium text-primary-800 text-sm">{p.planet}</span>
                      <span className="text-primary-600 text-sm">{p.sign.split(" ")[0]}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4">* Approximate placements for educational reference. Precise degrees require exact birth location.</p>
              </CardContent>
            </Card>

            {/* Nakshatra Info */}
            <Card className="mb-8 border-teal-200 bg-teal-50">
              <CardHeader>
                <CardTitle className="text-teal-900">⭐ Nakshatra: {chart.nakshatra}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-teal-800 leading-relaxed">
                  Your Janma (Birth) Nakshatra is <strong>{chart.nakshatra}</strong>, Pada {chart.pada}. In Vedic tradition, your nakshatra reveals your deepest psychological patterns, instincts, and life themes. Each of the 27 nakshatras is ruled by a deity and planet, bringing unique qualities to your Moon energy. Your nakshatra is used for name selection, muhurta (auspicious timing), compatibility matching, and spiritual practice recommendations.
                </p>
              </CardContent>
            </Card>

            {/* CTA for professional reading */}
            <Card className="border-indigo-300 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
              <CardContent className="p-8 text-center">
                <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Get a Professional Vedic Reading</h3>
                <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                  This tool gives you a starting point. For a complete analysis — including full house placements, Navamsha chart, Yogas (planetary combinations), detailed Dasha timeline, and personalized remedies — book a one-on-one session with Niaadim.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <BookingForm
                    variant="modal"
                    triggerButton={
                      <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-4">
                        <Calendar className="w-5 h-5 mr-2" />
                        Book Astrology Session ($27+)
                      </Button>
                    }
                  />
                  <Link href="/h/services">
                    <Button variant="outline" className="border-white/50 text-white hover:bg-white/20 px-8 py-4">
                      View All Services <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Info about Vedic Astrology */}
      {!chart && (
        <section className="pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "🌙", title: "Rashi (Moon Sign)", desc: "Unlike Western astrology, Vedic astrology focuses on the Moon sign as the primary indicator of mind, emotions, and personality." },
                { icon: "⬆️", title: "Lagna (Ascendant)", desc: "The rising sign at birth governs physical appearance, first impressions, and overall life direction according to Jyotish." },
                { icon: "🌀", title: "Vimshottari Dasha", desc: "A 120-year planetary period system that maps when different planets activate karmic events in your life timeline." },
              ].map((item) => (
                <Card key={item.title} className="border-indigo-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-primary-900 mb-2">{item.title}</h3>
                    <p className="text-primary-700 text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
