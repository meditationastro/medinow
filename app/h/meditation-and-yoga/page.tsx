"use client"

import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Wind, Droplets, Sun, Sparkles, Moon, Calendar, Users, MapPin, Check, Mail, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
 
const retreatHighlights = [
    { icon: Sun, text: "Vedic Astrology Consultations: Personal birth chart readings to understand karmic patterns and life purpose." },
    { icon: Sparkles, text: "Meditation & Yoga: Daily guided practices to align body, mind, and spirit." },
    { icon: Leaf, text: "Ayurvedic Healing: Lifestyle, diet, and detox guidance based on ancient Ayurvedic principles." },
    { icon: Wind, text: "Spiritual Workshops: Explorations in inner listening, energy healing, and breathwork." },
    { icon: Droplets, text: "Nature Immersion: Quiet time in the sacred natural surroundings of Nepal." },
];

const whatsIncluded = [
    "6 nights / 7 days accommodation",
    "Vegetarian or vegan Ayurvedic meals",
    "Daily meditation, yoga, and wellness sessions",
    "One-on-one astrology consultation",
    "Local transport to/from retreat site",
];

const whoIsItFor = [
    "Seekers of silence and inner clarity",
    "Healers, creatives, and spiritual practitioners",
    "Anyone undergoing life transitions or seeking alignment",
];

export default function MeditationAndYogaPage() {
    const router = useRouter()

  return (
    <div className="min-h-screen bg-primary-50/50">
      <div className="container mx-auto px-4 py-16">
        {/* Meditation and Yoga Section */}
        <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl border-primary-200 rounded-2xl overflow-hidden mb-12">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <Leaf className="w-16 h-16 text-secondary-600 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-2">
                Meditation & Yoga
              </h1>
              <p className="text-xl text-primary-700 font-light">
                Align Body, Mind & Spirit
              </p>
            </div>

            <p className="text-lg text-primary-800 leading-relaxed mb-8">
              Experience the timeless power of meditation and yogic practices rooted in Himalayan wisdom. Our guided sessions combine:
            </p>

            <ul className="list-disc list-inside space-y-3 mb-8 text-primary-800 text-lg">
                <li><span className="font-semibold">Breathwork (Pranayama)</span> for energy purification</li>
                <li><span className="font-semibold">Meditation</span> to cultivate presence and peace</li>
                <li><span className="font-semibold">Asanas (Yoga Poses)</span> to restore strength and flexibility</li>
                <li><span className="font-semibold">Mantras & Mudras</span> for subtle body awakening</li>
            </ul>

            <p className="text-lg text-primary-800 leading-relaxed mb-8">
              These practices are adapted to your level and needs, whether you&apos;re seeking stress relief, spiritual awakening, or a daily anchor of calm. With gentle yet profound instruction, you are invited into wholeness, balance, and inner silence.
            </p>

            <div className="bg-primary-100/70 p-6 rounded-lg text-center mb-10 space-y-2">
                <p className="font-semibold text-primary-800">🌄 Individual and group sessions available online & in-person (Nepal)</p>
                <p className="font-semibold text-primary-800">✨ Includes personalized daily practice plan</p>
            </div>

            <div className="text-center">
             
                  <Button size="lg" className="bg-gradient-to-r from-blue-800 to-amber-600 hover:from-blue-700 hover:to-amber-500 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" onClick={() => {
            router.push("/h/services")
                  }}>
                    <Calendar className="w-5 h-5 mr-2" />
                    Book a Session
                  </Button>
               
            </div>
          </CardContent>
        </Card>

        {/* Retreat Program Section */}
        <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl border-secondary-200 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 md:p-12 bg-primary-800 text-white rounded-t-2xl">
                <div className="text-center">
                    <Moon className="w-16 h-16 text-secondary-100 mx-auto mb-4" />
                    <h2 className="text-3xl md:text-4xl font-bold">Retreat Program: Awaken the Soul</h2>
                </div>
            </CardHeader>
          <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <p className="text-xl text-primary-700"><Calendar className="inline w-6 h-6 mr-2" /> Upcoming Dates: February 2025 | July 2025</p>
                <p className="text-xl text-primary-700"><MapPin className="inline w-6 h-6 mr-2" /> Location: Lalitpur, Nepal</p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary-900 mb-4">Retreat Highlights</h3>
                <div className="space-y-4">
                    {retreatHighlights.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <item.icon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                            <p className="text-primary-800 text-lg" dangerouslySetInnerHTML={{ __html: item.text.replace(/: (.*)/, ': <span class="font-normal">$1</span>') }} />
                        </div>
                    ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-4">What's Included</h3>
                    <ul className="space-y-2">
                        {whatsIncluded.map((item, index) => (
                            <li key={index} className="flex items-center space-x-2 text-primary-800 text-lg">
                                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-4">Who It's For</h3>
                    <ul className="space-y-2">
                        {whoIsItFor.map((item, index) => (
                            <li key={index} className="flex items-center space-x-2 text-primary-800 text-lg">
                                <Users className="w-5 h-5 text-primary-600 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary-900 mb-4 text-center">How to Join</h3>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <a href="mailto:meditationastro1@gmail.com" className="flex items-center justify-center gap-2 text-lg text-primary-800 hover:text-primary-600 transition-colors">
                        <Mail className="w-6 h-6" /> meditationastro1@gmail.com
                    </a>
                    <a href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-lg text-primary-800 hover:text-primary-600 transition-colors">
                        <Phone className="w-6 h-6" /> +977 9841647283
                    </a>
                </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 