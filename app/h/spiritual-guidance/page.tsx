"use client"

import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, Sparkles, Star, Users, MessageSquare, Calendar, Sun, Moon, Link as LinkIcon, HelpCircle, Combine } from "lucide-react"
import { useRouter } from "next/navigation"

const whatWeOffer = [
    { icon: Heart, title: "Soul-based listening", description: "You are heard, witnessed, and honored in your full human and spiritual truth." },
    { icon: Sparkles, title: "Intuitive insight", description: "With compassionate presence, we reflect back what your soul may be trying to say." },
    { icon: Star, title: "Life lesson integration", description: "We help you weave your pain, questions, or transitions into spiritual growth." },
    { icon: Users, title: "Archetypal reflections", description: "Drawing from the divine mythos of Radha–Krishna–Rukmini, we mirror your journey through sacred love, longing, devotion, and balance." },
    { icon: Sun, title: "Practical tools", description: "Techniques for grounding, surrender, breath, and clarity are shared based on your situation." }
];

const sessionDetails = [
    "One-on-one sessions via Zoom or in-person (Kathmandu, Nepal)",
    "Option to include prayer, ritual, or mantra elements",
    "Ideal for those in spiritual awakening, life transitions, or energetic initiations",
    "Sessions last 60–90 minutes",
    "Audio recording and summary notes provided (optional)"
];

const whoIsThisFor = [
    "In a spiritual awakening or dark night of the soul",
    "Feeling lost, fragmented, or disillusioned",
    "A healer, mystic, or seeker needing grounding",
    "Moving through loss, rebirth, or identity shift",
    "Exploring devotion, surrender, or soul-purpose"
];

const faqs = [
    {
        question: "Is this the same as therapy?",
        answer: "No. While healing may occur, these sessions are not clinical or psychological therapy. They are spiritual conversations rooted in presence, intuition, and sacred archetypes."
    },
    {
        question: "Can I combine this with other services?",
        answer: "Yes! Many clients blend spiritual guidance with Astrology, Meditation, or Jyotish sessions. Contact us for curated packages."
    }
]

export default function SpiritualGuidancePage() {
    const router = useRouter()

  return (
    <div className="min-h-screen bg-primary-50/50">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl border-primary-200 rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <Sparkles className="w-16 h-16 text-secondary-600 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-2">
                Spiritual Guidance
              </h1>
              <p className="text-xl text-primary-700 font-light">
                Walk the Inner Path with Support
              </p>
            </div>

            <p className="text-lg text-primary-800 leading-relaxed mb-6">
              Are you navigating an emotional crossroads, spiritual confusion, or the longing for deeper purpose? Our Spiritual Guidance sessions are sacred containers for transformation, clarity, and heart-centered insight.
            </p>
            <p className="text-lg text-primary-800 leading-relaxed mb-12">
              These sessions are not therapy or advice—they are safe, intuitive, soul-level conversations that support you in reconnecting with your inner truth. This is a non-judgmental, deeply sacred space where your spiritual path is held with respect and devotion.
            </p>

            {/* What We Offer */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-primary-900 mb-6 text-center">🌟 What We Offer</h2>
                <div className="grid md:grid-cols-1 gap-6">
                    {whatWeOffer.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <item.icon className="w-8 h-8 text-primary-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-semibold text-primary-800">{item.title}</h3>
                                <p className="text-primary-700">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Session Details & Who This Is For */}
            <div className="grid md:grid-cols-2 gap-12 mb-12 bg-primary-100/70 p-8 rounded-lg">
                <div>
                    <h2 className="text-3xl font-bold text-primary-900 mb-6 text-center">🙏 Session Details</h2>
                    <ul className="space-y-3">
                        {sessionDetails.map((item, index) => (
                            <li key={index} className="flex items-start space-x-3 text-primary-800">
                                <Calendar className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h2 className="text-3xl font-bold text-primary-900 mb-6 text-center">💠 Who Is This For?</h2>
                    <ul className="space-y-3">
                        {whoIsThisFor.map((item, index) => (
                            <li key={index} className="flex items-start space-x-3 text-primary-800">
                                <Users className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* Testimonial */}
            <div className="mb-12 text-center">
                <MessageSquare className="w-12 h-12 text-secondary-600 mx-auto mb-4"/>
                <blockquote className="text-xl italic text-primary-800 max-w-2xl mx-auto">
                “For the first time, someone listened to my soul—not just my words. I felt met, guided, and blessed. This experience stays with me.”
                </blockquote>
                <p className="mt-4 text-primary-700 font-semibold">— Amara, UK</p>
            </div>

            {/* Book a Session */}
            <div className="text-center bg-primary-800/10 p-8 rounded-lg mb-12">
                <h2 className="text-3xl font-bold text-primary-900 mb-4">📅 Book a Session</h2>
                <p className="text-lg text-primary-800 mb-2 max-w-xl mx-auto">Ready to begin or deepen your inner journey? We invite you to a safe space where your heart, pain, and vision are welcomed as sacred.</p>
                <p className="text-lg font-semibold text-primary-700 mb-6">💰 Pricing: $50 – $90 USD per session</p>
                 
                        <Button size="lg" className="bg-gradient-to-r from-blue-800 to-amber-600 hover:from-blue-700 hover:to-amber-500 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"onClick={() => {
            router.push("/h/services")
                  }} >
                            <LinkIcon className="w-5 h-5 mr-2" />
                            Schedule a Session Now
                        </Button>
                   
                <p className="mt-4 text-primary-700">💌 Contact us for sliding scale or spiritual mentorship bundles</p>
            </div>

            {/* FAQ */}
            <div>
                <h2 className="text-3xl font-bold text-primary-900 mb-6 text-center">❓ Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg font-semibold text-primary-800 hover:text-primary-600">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-primary-700 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 