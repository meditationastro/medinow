"use client"

import {
  Mail,
  MapPin,
  Star,
  Heart,
  Sun,
  Moon,
  Sparkles,
  Eye,
  NotebookIcon as Lotus,
  Calendar,
  MessageCircle,
  CheckCircle,
  Video,
} from "lucide-react"
    

import { Card, CardContent } from "@/components/ui/card"
import { BookingForm } from "@/components/BookingForm"

// Define session types here since we need them for the overview cards
const serviceOverviews = [
  {
    type: "Vedic astrology reading",
    duration: "60 min",
    priceNPR: "NPR 2500",
    priceUSD: "USD 25",
    icon: Eye,
    description: "Complete birth chart analysis and life guidance",
  },
  {
    type: "Meditation guidance (online)",
    duration: "45 min",
    priceNPR: "NPR 1800",
    priceUSD: "USD 18",
    icon: Lotus,
    description: "Personalized meditation techniques and practices",
  },
  {
    type: "Spiritual life counselling",
    duration: "60 min",
    priceNPR: "NPR 2000",
    priceUSD: "USD 20",
    icon: Heart,
    description: "Life purpose guidance and spiritual direction",
  },
  {
    type: "Personalized rituals & remedies",
    duration: "30 min",
    priceNPR: "NPR 1000",
    priceUSD: "USD 10",
    icon: Sparkles,
    description: "Custom rituals and remedial solutions",
  },
]

export default function AppointmentPage() {
  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary-300 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-secondary-300 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 border-2 border-primary-200 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 border-2 border-secondary-200 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-primary-200 rounded-full"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 animate-float">
          <Star className="w-6 h-6 text-primary-300 opacity-60" />
        </div>
        <div className="absolute top-48 right-32 animate-float" style={{ animationDelay: "1s" }}>
          <Sparkles className="w-8 h-8 text-secondary-300 opacity-60" />
        </div>
        <div className="absolute bottom-32 left-32 animate-float" style={{ animationDelay: "2s" }}>
          <Sun className="w-10 h-10 text-primary-400 opacity-40" />
        </div>
        <div className="absolute bottom-48 right-16 animate-float" style={{ animationDelay: "3s" }}>
          <Moon className="w-7 h-7 text-secondary-400 opacity-50" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Calendar className="w-20 h-20 text-primary-500" />
                <Sparkles className="w-8 h-8 text-primary-600 absolute -top-2 -right-2" />
                <Heart className="w-6 h-6 text-secondary-500 absolute -bottom-2 -left-2" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
              Consultation Appointment
            </h1>
            <h2 className="text-2xl md:text-3xl text-primary-800 mb-8 font-semibold">Meditation and Vedic Astrology</h2>
            <p className="text-lg text-primary-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Welcome to Meditation Astro. We offer one-on-one guidance for self-discovery, inner peace, and clarity
              through Meditation Practices, Vedic Astrology Readings, and Spiritual Counseling.
            </p>
            <div className="inline-flex items-center bg-primary-100 px-6 py-3 rounded-full">
              <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
              <span className="text-primary-800 font-semibold">Book your appointment below</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary-900 mb-6">Our Services</h2>
              <p className="text-xl text-primary-800">Choose from our range of spiritual guidance services</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {serviceOverviews.map((service, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-primary-200 hover:shadow-xl transition-all duration-500"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-primary-900">{service.type}</h3>
                    </div>
                    <p className="text-primary-800 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-primary-900 font-bold">{service.priceUSD}</p>
                        <p className="text-sm text-primary-700">{service.priceNPR}</p>
                      </div>
                      <p className="text-primary-800">{service.duration}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="relative z-10 py-16 px-4 bg-blue-100/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary-900 mb-6">Book Your Session</h2>
              <p className="text-xl text-primary-800">
                Fill out the form below to request a time that suits you. We&apos;ll confirm your session via email or
                WhatsApp.
              </p>
            </div>
            <BookingForm variant="normal" />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <div className="mx-10 ">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary-900 mb-6">Connect With Us</h2>
              <p className="text-xl text-primary-800">Multiple ways to reach us for your convenience</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-primary-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16  bg-gradient-to-r from-blue-800 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-primary-900 mb-2">Email</h3>
                  <p className="text-primary-800 text-sm break-all">meditationastro1@gmail.com</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-primary-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-primary-900 mb-2">WhatsApp</h3>
                  <p className="text-primary-800 text-sm">+977 9841647283</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-primary-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-primary-900 mb-2">Location</h3>
                  <p className="text-primary-800 text-sm">Kathmandu, Nepal</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-primary-200 hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-primary-900 mb-2">Online Sessions</h3>
                  <p className="text-primary-800 text-sm">Zoom / Google Meet</p>
                </CardContent>
              </Card>
            </div>
            {/* <Card className="mt-12 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
              <CardContent className="p-8 text-center">
                <Globe className="w-16 h-16 mx-auto mb-6 text-primary-100" />
                <h3 className="text-2xl font-bold mb-4">MeditationAstro.com</h3>
                <p className="text-primary-100 mb-6">
                  Ideal for use on your "Consultation Appointment" page or a full landing page. It provides clarity,
                  structure, and flow to engage your visitors and encourage bookings.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                    <Facebook className="w-5 h-5 mr-2" />
                    Follow Us
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                    <Instagram className="w-5 h-5 mr-2" />
                    Instagram
                  </Button>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
