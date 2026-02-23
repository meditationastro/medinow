"use client"

import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Clock, Calendar, Gem, Star, Home, Briefcase, GraduationCap, Users } from "lucide-react"
import { useRouter } from "next/navigation"
const offerings = [
    {
        icon: Clock,
        title: "Dasha & Transit Analysis",
        description: "Understand your current planetary periods (Mahadasha, Antardasha) and how upcoming transits (Gochar) are influencing your life in areas like career, health, love, and spiritual growth."
    },
    {
        icon: Calendar,
        title: "Muhurta Selection",
        description: "Auspicious timing is everything. We help you choose the right dates for sacred events like marriage, travel, home purchase, business launch, or spiritual practices."
    },
    {
        icon: Gem,
        title: "Remedies for Balance",
        description: "Based on your chart, we recommend Gemstones, Mantras, Rituals, Yantras, or lifestyle adjustments that bring harmony to challenging planetary energies."
    },
    {
        icon: Star,
        title: "Chart-based Insight for Specific Concerns",
        description: "We also provide focused Jyotish analysis for personal decisions, family planning, relocation, education, and more."
    }
];

export default function JyotishConsultancyPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-primary-50/50">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl border-primary-200 rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <Eye className="w-16 h-16 text-secondary-600 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-2">
                Jyotish Consultancy
              </h1>
              <p className="text-xl text-primary-700 font-light">
                Navigate Life with Vedic Light

🔮 Jyotish Consultancy

Navigate Life with Vedic Light

Jyotish Consultancy in Nepal | Online Vedic Astrology Guidance Worldwide

Jyotish, known as the “Eye of the Veda,” is not merely a system of prediction. It is a sacred science of cosmic intelligence, divine timing, and self-understanding.

At AnswerForSelf, our Jyotish Consultancy is designed to help you recognize your karmic patterns, understand life cycles, and move forward with clarity, balance, and awareness.

This is not fortune-telling.
This is conscious guidance rooted in authentic Vedic wisdom.


---

🌿 What Makes Our Jyotish Consultancy Different

✔ Awareness-based (not fear-based)
✔ Rooted in classical Vedic astrology (Jyotish Shastra)
✔ Focused on understanding patterns, not fixing fate
✔ Personalized, confidential, and ethical
✔ Available online worldwide & in Kathmandu, Nepal

Your birth chart is treated as a mirror, not a verdict.


---

🔍 What We Offer

🪐 Dasha & Transit Analysis (Mahadasha, Antardasha & Gochar)

Understand the planetary periods currently influencing your life and how upcoming transits are shaping:

Career and professional growth

Relationships and family life

Health and emotional well-being

Spiritual development and inner transformation


We help you align with time — instead of resisting it.


---

🕯️ Muhurta Selection (Auspicious Timing)

Timing is a sacred intelligence in Vedic tradition.
We assist in selecting auspicious dates (Muhurta) for:

Marriage and engagement

Travel or relocation

Business launch or investments

Property purchase

Spiritual practices and rituals


Right timing reduces resistance and supports harmony.


---

💎 Remedies for Balance & Harmony

Based on your chart, conscious remedies may be suggested — not as superstition, but as energetic alignment.

Possible recommendations include:

Mantras

Gemstones

Yantras

Simple rituals

Lifestyle or awareness-based adjustments


Remedies are offered only when appropriate and explained clearly.


---

📊 Chart-Based Insight for Specific Life Questions

Focused Jyotish analysis for areas such as:

Career direction and work transitions

Relationship and marriage decisions

Family planning and children

Education and study paths

Relocation or foreign travel

Periods of confusion or stagnation


Each consultation is contextual, grounded, and personal.


---

📅 Book a Jyotish Consultation

In-Depth Vedic Astrology Sessions

Our Jyotish consultations are suitable for:

Individuals

Couples

Family planning and guidance


📌 Sessions include chart interpretation, timing insights, and space for questions.


---

📲 Schedule Your Consultation

📧 Email: meditationastro1@gmail.com
📱 WhatsApp: +977 9841647283
📍 Location: Kathmandu, Nepal
🌍 Available Online Worldwide

🕘 Consultation Hours:
9:00 AM – 8:00 PM (Nepal Time)


---

🧘 Meditation & Astrology — A Holistic Approach

At AnswerForSelf, Jyotish is often integrated with:

Meditation

Inner listening (Nishruti)

Self-inquiry and awareness practices


Because true guidance does not end with information —
it deepens through inner understanding.


---

🔗 Quick Links

Home

About

Services

Astrological Chart Reading

Meditation & Yoga

Spiritual Guidance

Jyotish Consultancy

Blog

Gallery

Contact



---

⚖️ Legal

Privacy Policy

Terms & Conditions

FAQ


© 2026 AnswerForSelf. All rights reserved.


---

🔑 KEYWORDS INCLUDED (Naturally)

Jyotish Consultancy Nepal

Vedic Astrology Consultation

Online Jyotish Astrologer

Mahadasha Transit Analysis

Muhurta Selection Nepal

Awareness-based Vedic Astrology

Spiritual Astrology Consultation

Kathmandu Jyotish Services


              </p>
            </div>

            <p className="text-lg text-primary-800 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
              Jyotish, known as the "Eye of the Veda," is not merely a system of prediction—it is a sacred science of divine timing, inner reflection, and cosmic intelligence. At Answer for Self, our Jyotish Consultancy sessions help you attune to your unique karmic path and walk forward with clarity, timing, and grace.
            </p>
            <p className="text-lg text-primary-800 leading-relaxed mb-12 text-center font-semibold max-w-3xl mx-auto">
              This is not just a reading—it is a living consultation that honors your soul's contract with the stars.
            </p>

            {/* What We Offer */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">🔮 What We Offer</h2>
                <div className="space-y-8">
                    {offerings.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                            <div className="flex-shrink-0">
                                <item.icon className="w-12 h-12 text-primary-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-primary-800 mb-2">{item.title}</h3>
                                <p className="text-primary-700 text-lg leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking */}
            <div className="text-center bg-primary-100/70 p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-primary-900 mb-4">Book a Consultation</h2>
                <p className="text-lg text-primary-800 mb-6 max-w-xl mx-auto">
                    In-depth sessions with charts and future forecasting. Suitable for individuals, couples, or family planning.
                </p>
                 
                        <Button size="lg" className="bg-gradient-to-r from-blue-800 to-amber-600 hover:from-blue-700 hover:to-amber-500 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" onClick={() => {
            router.push("/h/services")
                  }}>
                            <Calendar className="w-5 h-5 mr-2" />
                            Schedule Your Consultation
                        </Button>
                    
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
