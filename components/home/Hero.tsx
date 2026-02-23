'use client';

import { Sun, Moon, Sparkles, Calendar, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BookingForm } from "@/components/BookingForm"

export function Hero() {
  const router = useRouter()
  return (
    <section className="relative z-10 py-20 px-4 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/bg-hero-3.jpg"
          alt="Cosmic Background"
          fill
          className="object-cover filter blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/40 to-neutral-900/80" />
      </div>

      {/* Floating Elements */}
    
      <div className="container mx-auto text-center relative z-10">
        <div className="animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sun className="w-16 h-16 text-primary-600" />
              <Moon className="w-8 h-8 text-primary-700 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-50 mb-6 leading-tight animate-text-shimmer">
            Awakening the Soul
          </h1>
          <div className="flex justify-center items-center gap-4 mb-6">
            <Sparkles className="w-6 h-6 text-secondary-600" />
            <p className="text-xl md:text-2xl text-primary-100 max-w-4xl leading-relaxed">
              Integrating Vedic Astrology, Meditation, and Yoga for a Fulfilling Life
            </p>
            <Sparkles className="w-6 h-6 text-secondary-600" style={{ animationDelay: "1s" }} />
          </div>
          <p className="text-lg text-primary-100 mb-12 max-w-3xl mx-auto animate-fade-in-delayed">
            Transform your life through authentic Himalayan wisdom with personalized online consultations in Vedic
            astrology, meditation, and Ayurveda. Receive spiritual guidance directly from Nepal&apos;s sacred traditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <BookingForm 
              variant="modal" 
              triggerButton={
                <Button
                  size="lg"
                  className="button-primary bg-gradient-to-r from-blue-800 to-amber-600 hover:bg-primary-900 text-primary-50"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
              }
            />
            <Button
              size="lg"
              variant="outline"
              className="button-outline border-primary-600 text-primary-50 hover:bg-primary-50 cursor-pointer"
              onClick={() => router.push("/h/shop")}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Explore Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 