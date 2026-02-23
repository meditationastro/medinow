"use client"
import Link from "next/link"
import Image from "next/image"
import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, CheckCircle, Star, ArrowRight } from "lucide-react"

const LOCATIONS = [
  { id: "kathmandu", name: "Kathmandu Valley", emoji: "🛕", img: "/img/bg-hero-3.jpg", desc: "Ancient temples, Pashupatinath, Boudhanath stupa, sacred rituals, and the mystical energy of the world's highest concentration of UNESCO heritage sites.", highlights: ["Pashupatinath Temple rituals", "Boudhanath kora meditation", "Swayambhunath sunrise practice", "Thangka painting workshop"] },
  { id: "pokhara", name: "Pokhara & Himalayas", emoji: "🏔️", img: "/img/bg-hero-3.jpg", desc: "Crystal Phewa Lake reflections, Annapurna range views, forest meditation, and the profound stillness that comes from being at the foot of the world's mightiest peaks.", highlights: ["Phewa Lake morning meditation", "Sarangkot sunrise yoga", "Forest walking meditation", "Tibetan monastery visits"] },
  { id: "lumbini", name: "Lumbini — Buddha's Birthplace", emoji: "☸️", img: "/img/bg-hero-3.jpg", desc: "The sacred birth site of Siddhartha Gautama. Walk the same ground where the Buddha was born. A profoundly peaceful energy unlike anywhere else on Earth.", highlights: ["Mayadevi Temple meditation", "Sacred garden ceremony", "Buddhist monastery stay", "Chanting and sound healing"] },
  { id: "namo", name: "Namo Buddha", emoji: "🙏", img: "/img/bg-hero-3.jpg", desc: "A hilltop monastery site of extraordinary peace where the Bodhisattva is said to have given his body to feed a starving tiger — a place of supreme compassion.", highlights: ["Monastery meditation retreat", "Thrangu Tashi Yangtse visit", "Karma yoga practice", "Mountain village walks"] },
]

const PACKAGES = [
  { name: "🌱 Starter Journey", subtitle: "Online — Begin Here", price: "€199 / $210", duration: "4 Weeks Online", items: ["3 Vedic astrology sessions", "4 live meditation classes", "Mind-shift journaling prompts", "WhatsApp support"], color: "from-green-500 to-teal-600", popular: false },
  { name: "🔮 Inner Alchemy", subtitle: "6 Weeks Premium Online", price: "€650 / $700", duration: "6 Weeks Online", items: ["6 Vedic astrology deep dives", "6 neuro-meditation workshops", "2 personal mentorship calls", "Neuroplastic Mind Map Tracker", "Priority scheduling"], color: "from-indigo-500 to-violet-600", popular: true },
  { name: "🏔️ Nepal Immersion", subtitle: "14 Days On-Ground", price: "€2,400 / $2,600", duration: "14 Days in Nepal", items: ["All accommodation & meals", "2 Vedic rituals & ceremonies", "Experienced spiritual guides", "3 astrology sessions included", "Daily meditation & yoga", "Group size: 8–12 people"], color: "from-amber-500 to-orange-600", popular: false },
  { name: "🌏 Sacred Travel + Mentorship", subtitle: "The Complete Experience", price: "€3,100 / $3,400", duration: "4 weeks online + 10 days Nepal", items: ["Full 4-week online course", "10-day Nepal immersion", "Full mentor access", "Personalized astrology path", "Pre & post ceremony", "Unlimited WhatsApp support"], color: "from-rose-600 to-purple-700", popular: false },
]

const UPCOMING = [
  { month: "March 2025", type: "Nepal Immersion", location: "Kathmandu Valley", spots: 4, total: 10 },
  { month: "June 2025", type: "Sacred Travel + Mentorship", location: "Pokhara & Kathmandu", spots: 6, total: 12 },
  { month: "September 2025", type: "Nepal Immersion", location: "Lumbini & Namo Buddha", spots: 8, total: 10 },
]

export function RetreatsClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
        <Image src="/img/bg-hero-3.jpg" alt="Nepal Himalayan retreat" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/90 text-black text-sm font-bold px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4" /> Sacred Nepal Retreats 2025
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">Where the Himalayas<br /><span className="text-amber-300">Meet the Soul</span></h1>
            <p className="text-white/80 text-xl max-w-2xl mb-8">Transformative 7–14 day spiritual immersions in Nepal's most sacred sites. Vedic astrology, meditation, yoga, and ancient ritual ceremonies guided by Niaadim.</p>
            <div className="flex flex-wrap gap-4">
              <BookingForm variant="modal" triggerButton={<Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-4 text-lg rounded-2xl">Apply for 2025 Retreat</Button>} />
              <a href="#upcoming"><Button variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-2xl">See Upcoming Dates ↓</Button></a>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Sacred Destinations</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-3">Our Retreat Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Each site carries thousands of years of spiritual practice. We choose locations where the energy itself becomes part of your transformation.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {LOCATIONS.map((loc) => (
              <div key={loc.id} id={loc.id} className="group bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <Image src={loc.img} alt={loc.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-4xl">{loc.emoji}</span>
                    <h3 className="text-white font-bold text-xl">{loc.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{loc.desc}</p>
                  <ul className="space-y-2">
                    {loc.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Dates */}
      <section id="upcoming" className="py-20 px-4 bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">2025 Schedule</span>
            <h2 className="text-4xl font-bold text-white mt-2 mb-3">Upcoming Retreat Dates</h2>
          </div>
          <div className="space-y-4">
            {UPCOMING.map((u, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-wrap items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-black font-bold text-center text-xs leading-tight px-1">
                    {u.month}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{u.type}</div>
                    <div className="text-white/60 text-sm flex items-center gap-1"><MapPin className="w-3 h-3" />{u.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-amber-300 font-bold text-xl">{u.spots}</div>
                    <div className="text-white/50 text-xs">spots left</div>
                  </div>
                  <BookingForm variant="modal" triggerButton={<Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">Reserve Spot →</Button>} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Investment</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-3">Choose Your Journey</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} className={`relative rounded-3xl overflow-hidden border-2 ${pkg.popular ? "border-violet-400 shadow-2xl shadow-violet-200" : "border-gray-100"}`}>
                {pkg.popular && <div className="absolute top-0 left-0 right-0 text-center bg-violet-600 text-white text-xs font-bold py-1.5 uppercase tracking-wide">Most Popular</div>}
                <div className={`bg-gradient-to-br ${pkg.color} p-6 text-white ${pkg.popular ? "pt-8" : ""}`}>
                  <div className="text-2xl mb-1">{pkg.name.split(" ")[0]}</div>
                  <h3 className="font-bold text-lg">{pkg.name.split(" ").slice(1).join(" ")}</h3>
                  <p className="text-white/70 text-xs mb-3">{pkg.subtitle}</p>
                  <div className="text-3xl font-bold">{pkg.price}</div>
                  <p className="text-white/70 text-xs">{pkg.duration}</p>
                </div>
                <div className="p-5 bg-white">
                  <ul className="space-y-2 mb-5">
                    {pkg.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                  <BookingForm variant="modal" triggerButton={
                    <Button className={`w-full bg-gradient-to-r ${pkg.color} text-white font-bold py-2.5 rounded-xl`}>Enquire Now</Button>
                  } />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
