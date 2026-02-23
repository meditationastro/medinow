"use client"

import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, Star, Wind, Heart, Zap, Award } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AstrologicalChartReadingPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-primary-50/50">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl border-primary-200 rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <Star className="w-16 h-16 text-secondary-600 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-2">
                Astrological Chart Reading
              </h1>
              <p className="text-xl text-primary-700 font-light">
                Discover Your Cosmic Blueprint
              </p>
            </div>

            <p className="text-lg text-primary-800 leading-relaxed mb-8">
              At Answer For Self, our Astrological Chart Reading sessions offer a deep dive into your unique birth chart (Janma Kundali), guided by ancient Vedic astrology principles. Each session is personalized, revealing:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                <p className="text-primary-800">Your soul's purpose and karmic patterns</p>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                <p className="text-primary-800">Key life timings (Dashas & Transits)</p>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                <p className="text-primary-800">Career, relationship, and health tendencies</p>
              </div>
              <div className="flex items-start space-x-3">
                <Wind className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                <p className="text-primary-800">Remedies to balance planetary influences</p>
              </div>
            </div>

            <p className="text-lg text-primary-800 leading-relaxed mb-8">
              We believe astrology is not fate, but a map to conscious living. Whether you&apos;re navigating a major life change or simply curious about your destiny, our readings offer clarity, compassion, and empowerment.
            </p>
            
            <div className="bg-primary-100/70 p-6 rounded-lg text-center mb-10">
                <p className="font-semibold text-primary-800">🕉 Sessions available via Zoom | Includes PDF Report & Recording</p>
            </div>

            <div className="text-center">
                <p className="text-lg text-primary-800 mb-4">
                📩 Book now for your first step into self-discovery.
                </p>
             
                  <Button size="lg" className="bg-gradient-to-r from-blue-800 to-amber-600 hover:from-blue-700 hover:to-amber-500 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" onClick={() => {
            router.push("/h/services")
                  }}>
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Your Reading
                  </Button>
                
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 