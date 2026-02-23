"use client"

import {
 
  Star,
  Heart,
  Sun,
  Moon,
  Sparkles,
  Compass,
  Eye,
  NotebookIcon as Lotus,
  Users,
  BookOpen,
  Calendar,
  
  MessageCircle,
  ArrowRight,
  CheckCircle,
  DollarSign,
  ShoppingCart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { redirectToWhatsApp } from "@/lib/whatsapp"
import { BookingForm } from "@/components/BookingForm"
import {  useRouter } from "next/navigation"

const services = [
  {
    id: "01",
    title: "Astrological Chart Reading",
    icon: Eye,
    description:
      "Astral chart Rahu and Ketu Karmic Chart – Reading Request Nakshatra Mandala: Chart based on Fixed Star Reading, Dasa Pravesha: Chart based on Solar and Lunar Revolution Reading together, Astrodiagnosis – Ayur-Jyotish",
    features: ["Birth Chart Analysis", "Karmic Chart Reading", "Nakshatra Mandala", "Dasa Pravesha", "Astrodiagnosis"],
    price: "Starting From USD 27",
    gradient: "from-primary-600 to-primary-800",
  },
  {
    id: "02",
    title: "Meditation And Yoga",
    icon: Lotus,
    description:
      "I teach from a deep spiritual and philosophical perspective, not only to achieve greater physical and mental well-being but also, from the wisdom of this knowledge, to understand a little more about yourself.",
    features: [
      "Spiritual Meditation",
      "Philosophical Yoga",
      "Physical Well-being",
      "Mental Balance",
      "Self-Understanding",
    ],
    price: "Custom Packages",
    gradient: " from-blue-800 to-amber-600",
  },
  {
    id: "03",
    title: "Guidance",
    icon: Compass,
    description: "My goal is to accompany you and help you on the path of personal and spiritual growth",
    features: ["Personal Growth", "Spiritual Development", "Life Direction", "Inner Balance", "Conscious Living"],
    price: "Consultation Based",
    gradient: "from-primary-700 to-primary-900",
  },
  {
    id: "04",
    title: "Consultancy",
    icon: Heart,
    description:
      "I use ancient and ancient astrology to help you find answers that may concern you in your life path and to guide you towards a healthy and balanced change.",
    features: ["Life Path Guidance", "Ancient Astrology", "Balanced Change", "Personal Solutions", "Karmic Management"],
    price: "Personalized Rates",
    gradient: "from-secondary-700 to-primary-800",
  },
]

export default function ServicesPage() {
const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">

      {/* Hero Section - What is Vedic Astrology */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Sun className="w-20 h-20 text-secondary-600" />
                <Moon className="w-10 h-10 text-primary-800 absolute -top-2 -right-2" />
                <Sparkles className="w-6 h-6 text-secondary-500 absolute -bottom-2 -left-2" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-8 leading-tight">
              What is Vedic Astrology or Jyotish
            </h1>
            <div className="text-lg text-primary-800 space-y-6 leading-relaxed">
              <p>
                Originating in the sacred Himalayas, <strong>Jyotish</strong> is an ancient science revealed by the wise
                Rishis. Known as the <em>Mother of All Cosmic Sciences</em>, it is regarded as the most complete and
                profound form of astrology in existence today.
              </p>
              <p>
                The word Jyotish comes from the Sanskrit root <strong>&quot;Jyoti&quot;</strong>, meaning light, splendor, or
                divine illumination. True to its name, Jyotish is the <em>Science of Light</em>—a spiritual tool that
                reveals the path of the soul by understanding the influence of stars and planets on human life.
              </p>
              <p>
                For thousands of years, this wisdom has guided the decisions of conscious beings. In today&apos;s world,
                keeping this knowledge alive is not just valuable—it is essential. Jyotish brings clarity, direction,
                and purpose to the journey of every individual soul and serves as a cosmic compass in the evolving times
                we live in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Grid */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-r from-secondary-100/30 to-primary-100/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-6">Our Sacred Services</h2>
            <p className="text-xl text-primary-800 max-w-3xl mx-auto">
              Discover the ancient wisdom through our comprehensive spiritual services designed to illuminate your path
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="bg-white/80 backdrop-blur-sm border-primary-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary-300 group-hover:text-primary-400 transition-colors">
                      {service.id}
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-primary-900 group-hover:text-primary-700 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-800 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-primary-700">
                        <CheckCircle className="w-4 h-4 mr-2 text-success-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-primary-900">
                      <DollarSign className="w-5 h-5 mr-1" />
                      <span className="font-semibold">{service.price}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary-800 hover:bg-primary-900 text-primary-50 group-hover:scale-105 transition-all duration-300"
                      onClick={() => redirectToWhatsApp("Hello, I'm interested in " + service.title + " services. What is the price?")}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto space-y-20">
          {/* Astrological Chart Reading */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold text-primary-900 mb-6">Astrological Chart Reading</h3>
                <p className="text-lg text-primary-800 mb-6 leading-relaxed">
                  A powerful tool to improve your self-knowledge, with the personalized interpretation of your birth
                  chart you will be able to know the planets, the houses, the signs and aspects that govern your natal
                  chart.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-secondary-600 mr-3" />
                    <span className="text-primary-800">Complete Birth Chart Analysis</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-secondary-600 mr-3" />
                    <span className="text-primary-800">Rahu and Ketu Karmic Chart Reading</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-secondary-600 mr-3" />
                    <span className="text-primary-800">Nakshatra Mandala Fixed Star Reading</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-secondary-600 mr-3" />
                    <span className="text-primary-800">Dasa Pravesha Solar & Lunar Revolution</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-secondary-600 mr-3" />
                    <span className="text-primary-800">Astrodiagnosis – Ayur-Jyotish Integration</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary-900">$27</div>
                  <div className="text-primary-700">Starting Price</div>
                </div>
              </div>
              <Card className="bg-white/80 backdrop-blur-sm border-primary-200 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Eye className="w-16 h-16 text-primary-800 mx-auto mb-6" />
                    <h4 className="text-2xl font-bold text-primary-900 mb-4">Book Your Reading</h4>
                    <p className="text-primary-800 mb-6">
                      Discover the cosmic influences shaping your destiny through detailed chart analysis
                    </p>
                    <BookingForm
                      variant="modal"
                      triggerButton={
                        <Button className="w-full bg-primary-800 hover:bg-primary-900 text-primary-50">
                          <Calendar className="w-5 h-5 mr-2" />
                          Schedule Reading
                        </Button>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Meditation and Yoga */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Card className="bg-white/80 backdrop-blur-sm border-primary-200 shadow-xl order-2 lg:order-1">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Lotus className="w-16 h-16 text-secondary-600 mx-auto mb-6" />
                    <h4 className="text-2xl font-bold text-primary-900 mb-4">Join Our Sessions</h4>
                    <p className="text-primary-800 mb-6">
                      Harmonize your body, mind, and spirit through ancient practices
                    </p>
                    <BookingForm
                      variant="modal"
                      triggerButton={
                        <Button className="w-full bg-secondary-600 hover:bg-secondary-700 text-secondary-50">
                          <Users className="w-5 h-5 mr-2" />
                          Book Session
                        </Button>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="order-1 lg:order-2">
                <h3 className="text-4xl font-bold text-primary-900 mb-6">Meditation And Yoga</h3>
                <p className="text-lg text-primary-800 mb-6 leading-relaxed">
                  Harmonize your body, your mind with your spirit, achieve balance and develop your integral strength. I
                  teach from a deep spiritual and philosophical perspective, not only to achieve greater physical and
                  mental well-being but also, from the wisdom of this knowledge, to understand a little more about
                  yourself.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-secondary-600 mr-3" />
                    <span className="text-primary-800">Spiritual & Philosophical Approach</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-secondary-600 mr-3" />
                    <span className="text-primary-800">Physical & Mental Well-being</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-secondary-600 mr-3" />
                    <span className="text-primary-800">Self-Understanding & Awareness</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-secondary-600 mr-3" />
                    <span className="text-primary-800">Integral Strength Development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guidance */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold text-primary-900 mb-6">Spiritual Guidance</h3>
                <p className="text-lg text-primary-800 mb-6 leading-relaxed">
                  It is important to note that a guide to direct individual development focused on spiritual balance is
                  not something done blindly. The relationship between myself and you will be very important in one&apos;s
                  life. I invite you to work together to achieve that ideal path for your comprehensive renewal.
                </p>
                <div className=" p-6 rounded-lg mb-8">
                  <h4 className="text-xl font-semibold text-primary-900 mb-4">What can you expect from the guide?</h4>
                  <ul className="space-y-3 text-primary-800">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success-500 mr-3 mt-0.5" />
                      <span>Stimulate processes of introspection and personal knowledge</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success-500 mr-3 mt-0.5" />
                      <span>Guide you in the search for balance in your lifestyle</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success-500 mr-3 mt-0.5" />
                      <span>Help you reduce stress and overcome limitations and fears</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success-500 mr-3 mt-0.5" />
                      <span>Teach you how to live consciously, understanding your true nature</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success-500 mr-3 mt-0.5" />
                      <span>Lead to personal empowerment and alignment with your life purpose</span>
                    </li>
                  </ul>
                </div>
              </div>
              <Card className="bg-white/80 backdrop-blur-sm border-primary-200 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Compass className="w-16 h-16 text-primary-800 mx-auto mb-6" />
                    <h4 className="text-2xl font-bold text-primary-900 mb-4">Request Pre-Appointment</h4>
                    <p className="text-primary-800 mb-6">
                      The first meeting aims to get to know you and understand your inner and outer nature
                    </p>
                    <BookingForm
                      variant="modal"
                      triggerButton={
                        <Button className="w-full bg-primary-800 hover:bg-primary-900 text-primary-50">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Request Consultation
                        </Button>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Jyotish Consultancy */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Card className="bg-white/80 backdrop-blur-sm border-primary-200 shadow-xl order-2 lg:order-1">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Heart className="w-16 h-16 text-success-500 mx-auto mb-6" />
                    <h4 className="text-2xl font-bold text-primary-900 mb-4">Jyotish Consultancy</h4>
                    <p className="text-primary-800 mb-6">
                      Personalized consultations combining Jyotish Veda, Ayur-Veda principles and Yoga Vedanta practices
                    </p>
                    <BookingForm
                      variant="modal"
                      triggerButton={
                        <Button className="w-full bg-success-500 hover:bg-success-600 text-white">
                          <Calendar className="w-5 h-5 mr-2" />
                          Book Consultation
                        </Button>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="order-1 lg:order-2">
                <h3 className="text-4xl font-bold text-primary-900 mb-6">Jyotish Consultancy</h3>
                <p className="text-lg text-primary-800 mb-6 leading-relaxed">
                  I offer you personalized consultations to help you find greater self-knowledge, physical-mental
                  well-being and Personal Improvement. Occupying the Jyotish Veda, Ayur-Veda principles and Yoga Vedanta
                  practices.
                </p>
                <div className="bg-success-50 p-6 rounded-lg mb-8">
                  <h4 className="text-xl font-semibold text-primary-900 mb-4">Consultation Topics Include:</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-primary-800">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-success-500 mr-2" />
                      <span>Birth Chart Analysis</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-success-500 mr-2" />
                      <span>Solar Return</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-success-500 mr-2" />
                      <span>Planetary Transits</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-success-500 mr-2" />
                      <span>Dashas & Periods</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-success-500 mr-2" />
                      <span>Karma & Dharma</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-success-500 mr-2" />
                      <span>Life Purpose</span>
                    </div>
                  </div>
                </div>
                <p className="text-primary-800 leading-relaxed">
                  Vedic Astrology is applied in Vedic Guidance, since it clarifies the aspects identified in the first
                  consultation, as well as adds an understanding of karma and dharma (life purpose). It is an important
                  tool for understanding karmic influences (karmic management).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vedic Astrology Course */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-r from-secondary-100/50 to-primary-100/50">
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border-primary-200 shadow-xl">
            <CardContent className="p-6 text-center sm:p-8 md:p-12">
              <BookOpen className="w-20 h-20 mx-auto mb-8 text-primary-800" />
              <h3 className="mb-6 text-3xl font-bold text-primary-900 sm:text-4xl">Vedic Astrology Course</h3>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-800 sm:text-xl">
                Deepen your understanding of the ancient science of Jyotish through our comprehensive course designed
                for both beginners and advanced practitioners.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary-800" />
                  </div>
                  <h4 className="font-semibold text-primary-900 mb-2">Expert Instruction</h4>
                  <p className="text-sm text-primary-800">Learn from experienced Vedic astrologer</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-primary-800" />
                  </div>
                  <h4 className="font-semibold text-primary-900 mb-2">Comprehensive Content</h4>
                  <p className="text-sm text-primary-800">Complete curriculum covering all aspects</p>
                </div>
               
              </div>
              <Button 
                className="bg-primary-800 hover:bg-primary-900 text-primary-50 px-4 py-3 text-base sm:px-8 sm:py-4 sm:text-lg"
                onClick={() => window.open('/course-by-meditationastro.pdf', '_blank')}
              >
                <BookOpen className="mr-2 w-5 h-5" />
                Download Course Content
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-900 mb-6">Ready to Begin Your Spiritual Journey?</h2>
          <p className="text-xl text-primary-800 mb-12 max-w-3xl mx-auto">
            &quot;Astrology is the study of man&apos;s response to planetary stimuli. Contact me to reserve an encounter to
            self-mirror life and find a deep-seated unconscious quest to guide, as this is the seed of mind/moon and
            soul/sun.&quot;
          </p>    
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <BookingForm
              variant="modal"
              triggerButton={
                <Button size="lg" className="bg-gradient-to-r from-blue-800 to-amber-600 hover:bg-primary-900 text-primary-50 px-8 py-4 text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book An Appointment
                </Button>
              }
            />
                <Button   
                  size="lg"
                  variant="outline"
                  onClick={() => router.push("/h/shop")}
                  className="border-primary-800 text-primary-700 hover:bg-primary-800 hover:text-primary-50 px-8 py-4 text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Explore Products
                </Button>
             
          </div>
        </div>
      </section>
    </div>
  )
}
