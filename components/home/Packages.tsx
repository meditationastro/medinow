"use client"

import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingForm } from "@/components/BookingForm"
import { Calendar } from "lucide-react"

const packages = [
  {
    name: "🌱 Starter Journey",
    subtitle: "Online",
    price: "€199",
    usd: "$210",
    duration: "4 Weeks",
    features: [
      "3 Vedic Astrology Sessions",
      "4 Live Meditation Classes",
      "Mind-Shift Journaling Guide",
      "Email Support",
      "Access to Resource Library",
    ],
    gradient: "from-teal-50 to-emerald-50",
    border: "border-teal-200",
    badge: null,
    btnClass: "bg-teal-700 hover:bg-teal-800 text-white",
  },
  {
    name: "🔮 Inner Alchemy Premium",
    subtitle: "6 Weeks Online",
    price: "€650",
    usd: "$700",
    duration: "6 Weeks",
    features: [
      "6 Vedic Astrology Deep Dives",
      "6 Neuro-Meditation Workshops",
      "2 Personal Mentorship Calls",
      "Neuroplastic Mind Map Tracker",
      "Chakra Purification Guide",
      "Priority Email Support",
    ],
    gradient: "from-purple-50 to-indigo-50",
    border: "border-purple-300",
    badge: "Most Popular",
    btnClass: "bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white",
  },
  {
    name: "🕉️ Spiritual Nepal Immersion",
    subtitle: "14 Days On-Ground",
    price: "€2,400",
    usd: "$2,600",
    duration: "14 Days",
    features: [
      "Full Accommodation & Meals",
      "2 Vedic Rituals & Ceremonies",
      "Daily Guided Meditation & Yoga",
      "3 Astrology Sessions Pre & Post",
      "Cultural Temple Tours",
      "Experienced Spiritual Guides",
      "Group: 8–12 Participants",
    ],
    gradient: "from-amber-50 to-orange-50",
    border: "border-amber-300",
    badge: "Transformational",
    btnClass: "bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white",
  },
  {
    name: "🌏 Sacred Travel + Mentorship",
    subtitle: "Hybrid Program",
    price: "€3,100",
    usd: "$3,400",
    duration: "4 Weeks Online + 10 Days Nepal",
    features: [
      "4-Week Online Course",
      "10-Day Nepal Immersion",
      "Full Mentor Access",
      "Personalized Astrology Path",
      "Private Ceremony Included",
      "Lifetime Community Access",
      "Certificate of Completion",
    ],
    gradient: "from-rose-50 to-pink-50",
    border: "border-rose-300",
    badge: "Premium",
    btnClass: "bg-gradient-to-r from-rose-700 to-pink-700 hover:from-rose-800 hover:to-pink-800 text-white",
  },
]

export function Packages() {
  return (
    <section className="relative z-10 py-20 px-4 bg-gradient-to-br from-slate-50 to-primary-50">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">Sacred Transformation Packages</h2>
          <p className="text-xl text-primary-700 max-w-3xl mx-auto">
            Tailored programs for every seeker — from your first meditation to a full Himalayan immersion
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative bg-gradient-to-br ${pkg.gradient} rounded-2xl border-2 ${pkg.border} p-6 flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-800 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {pkg.badge}
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-primary-900 mb-1">{pkg.name}</h3>
                <p className="text-sm text-primary-600 font-medium">{pkg.subtitle}</p>
              </div>
              <div className="mb-4">
                <div className="text-3xl font-bold text-primary-900">{pkg.price}</div>
                <div className="text-primary-600 text-sm">{pkg.usd} USD &bull; {pkg.duration}</div>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-primary-800 text-sm">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <BookingForm
                variant="modal"
                triggerButton={
                  <Button className={`w-full ${pkg.btnClass}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                }
              />
            </div>
          ))}
        </div>

        <p className="text-center text-primary-600 mt-8 text-sm">* Flights not included in retreat packages. Custom packages available on request.</p>
      </div>
    </section>
  )
}
