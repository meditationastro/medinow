"use client"

import {
  Mail,
  Heart,
  Sun,
  Sparkles,
  Eye,
  NotebookIcon as Lotus,
  BookOpen,
  Calendar,
  Building,
  Globe,
  Lightbulb,
  Leaf,
  Quote,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { redirectToWhatsApp } from "@/lib/whatsapp"
import { BookingForm } from "@/components/BookingForm"

const ventures = [
  {
    icon: Building,
    title: "Prefab / Steel Structure",
    description: "Green and Energy Efficient building as a Profession",
    category: "Professional",
    image: "/img/eco-friendly-house.jpg",
  },
  {
    icon: Globe,
    title: "Agrotech Business",
    description: "Looking for growth and networking opportunities",
    category: "Business",
    image: "/img/Agrotech-Business.jpg",
  },
  {
    icon: BookOpen,
    title: "Language Learning Platform",
    description: "Online Nepali-Sanskrit Language Learning platform",
    category: "Education",
    image: "/img/Online-Language-Learning.jpg",
  },
  {
    icon: Heart,
    title: "Help2self",
    description: "A site to motivate and inspire to seek the goal of life",
    category: "Inspiration",
    image: "/img/motivation.png",
  },
  {
    icon: Leaf,
    title: "Ayurvedic Research",
    description: "Herbs/Ayurvedic product Research and vitality of life",
    category: "Wellness",
    image: "/img/young-man-ayurvedic-medicine.png",

  },
  {
    icon: Lightbulb,
    title: "Planetgloss Blog",
    description: "Writing perspective on life and its dimension",
    category: "Philosophy",
    image: "/img/blogging.jpeg",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
                Unfolding More About Me
              </h1>
              <p className="text-xl text-primary-700 mb-8 leading-relaxed">
                Let&apos;s talk to guide your life towards a change of balance with bliss, peace and well being
              </p>
              <p className="text-lg text-primary-700 mb-8 leading-relaxed">
                I have felt that we can transform the state of being and with pure energy we can certainly bring{" "}
                <em className="font-semibold">sat, chit, ananda</em> - that is pure consciousness with blissful
                blessing. I am filled with gratitude to the cosmic source for everything that I am offering here.Sat-Chit-Ananda (सच्चिदानन्द) is a Sanskrit expression that encapsulates the essence of the ultimate reality or Brahman in Vedanta philosophy. It is composed of three words:

Sat (सत्) – Existence or Truth
That which is eternal, unchanging, and real beyond time and form.

Chit (चित्) – Consciousness or Awareness
The pure, limitless awareness that illuminates all experiences.

Ananda (आनन्द) – Bliss or Joy
The uncaused, natural state of joy that arises from the realization of one's true nature.


Together, Sat-Chit-Ananda represents the transcendental, non-dual nature of the Self — ever-existing, ever-conscious, and ever-blissful. It is not something to be attained, but realized as one's innermost being.


              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <BookingForm
                  variant="modal"
                  triggerButton={
                    <Button size="lg" className="bg-gradient-to-r from-blue-800 to-amber-600 hover:bg-primary-700 text-white px-8 py-4">
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Consultation
                    </Button>
                  }
                />
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-600 text-primary-700 hover:bg-blue-600 px-8 py-4 hover:text-white"
                  onClick={() => redirectToWhatsApp("Hello, I&apos;m interested in your services.")}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Connect With Me
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Card className="bg-white/80 backdrop-blur-sm border-primary-300 shadow-xl overflow-hidden p-0">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src="/img/about-main-image.jpg"
                      alt="Dinesh - Vedic Astrologer and Spiritual Guide"
                      width={600}
                      height={600}
                      className="w-full h-auto object-cover aspect-square"
                    />
                    <div className="absolute inset-0 "></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Dinesh</h3>
                      <p className="text-primary-100">Vedic Astrologer & Spiritual Guide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative z-10 py-16 px-4 bg-primary-100/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary-900 mb-6">Unfolding the Story of Perspective</h2>
              <div className="flex justify-center items-center gap-8 mb-8">
                <div className="text-center">
                  <Eye className="w-12 h-12 text-primary-600 mx-auto mb-2" />
                  <p className="text-primary-700 font-semibold">Astrology</p>
                </div>
                <div className="w-16 h-px bg-primary-300"></div>
                <div className="text-center">
                  <Lotus className="w-12 h-12 text-secondary-600 mx-auto mb-2" />
                  <p className="text-primary-700 font-semibold">Meditation</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-primary-300 shadow-xl overflow-hidden p-0">
                <CardContent className="p-0 w-full h-full">
                  <div className="">
                    <Image
                      src="/img/about-image-1.jpg"
                      alt="Meditation Journey"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-primary-300 shadow-xl">
                <CardContent className="p-8">
                  <div className="space-y-6 text-lg text-primary-700 leading-relaxed">
                    <p>
                      As a quest to know life is <strong>Fortune (Bhagya)</strong> or <strong>Karma</strong>, I began to
                      unfold the quest of knowing self and this has led me fathom the profoundness of life.
                    </p>
                    <p>
                      I am deeply moved and grateful with bowing down to whole world to unfold a moment of my life with
                      this counselling session bringing astrology and meditation together. It is the expression of
                      consciousness by human physiology. Time has been so beautifully defined in Vedic System and we are
                      just unfolding the very vibration of time and frequency.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Background */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary-900 mb-6">Professional Journey & Ventures</h2>
              <p className="text-xl text-primary-700 max-w-3xl mx-auto">
                As a vocation profession I am involved in Prefab / Steel structure Green and Energy Efficient building.
                I have developed and experimented multiple web / online business ventures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ventures.map((venture, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-primary-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <CardHeader className="pb-4">
                    <div className="relative aspect-[16/9] mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={venture.image}
                        alt={venture.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-800/70 rounded-full flex items-center justify-center">
                        <venture.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-white bg-gradient-to-r from-blue-800 to-amber-600 px-2 py-1 rounded-full">
                        {venture.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg text-primary-900">{venture.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-700 text-sm">{venture.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative z-10 py-16 px-4 bg-blue-100/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary-900 mb-6">Philosophy of Life & Consciousness</h2>
            </div>

            <div className="space-y-8">
              <Card className="bg-white/80 backdrop-blur-sm border-primary-300 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <Quote className="w-8 h-8 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-primary-900 mb-4">On Becoming & Expression</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4 text-lg text-primary-700 leading-relaxed">
                          <p>
                            The very fundamental nature of human being is it want to manifest and express in the best form
                            it can. People often say that they want to become something in life. I think,{" "}
                            <strong>Becoming is not truly goal</strong>, the expression of human emotion after being in
                            that state is what plays in the background.
                          </p>
                          <p>
                            It is like we sow the seed in the ground but the background is seeds got nurtured by soil so
                            it started to germinate. Similarly for us we wanted to become but the germination of our seed
                            sometime takes place quickly because we sowed in the fertile soil of our creativity.
                          </p>
                        </div>
                        <div className="relative rounded-lg h-full overflow-hidden">
                          <Image
                            src="/img/about-image-2.jpg"
                            alt="Philosophy of Expression"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-primary-300 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <Sparkles className="w-8 h-8 text-secondary-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-primary-900 mb-4">On Failure & Growth</h3>
                      <div className="space-y-4 text-lg text-primary-700 leading-relaxed">
                        <p>
                          If we understand things deeply then there is nothing in life where we get failed. It is all
                          about our assumption and presumption that we are failing, we are losing because it is an
                            abstract idea. The very thing that is happening for everyone&apos;s life is it is{" "}
                          <strong>glowing at the expense of dying in each moment</strong>.
                        </p>
                        <p>
                          I think <em>Genius is an experience</em>. Over the period time, the experience brings the
                          dexterity in us the constant metaphoric reflection and projection of my set of beliefs and
                          conviction.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-primary-300 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <Heart className="w-8 h-8 text-primary-700 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-primary-900 mb-4">Current Focus</h3>
                      <div className="space-y-4 text-lg text-primary-700 leading-relaxed">
                        <p>
                          <strong>Love and Compassion</strong> the foundational seed of Human connection we can offer.
                          Futuristic in Professional / New way of Connecting. Can collaborate with people who are
                          interested in sharing and exchanging knowledge insight in{" "}
                          <em>Vedic Ashtang Yog and Meditation and Spiritual flowering and Life Energy</em>.
                        </p>
                        <p>
                          Unfolding the every split moment of life completely with new experiences. The constant
                          metaphoric reflection and projection of my set of beliefs and conviction guides this journey.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sanskrit Wisdom */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary-900 to-primary-800 text-white shadow-2xl">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <Sun className="w-16 h-16 text-primary-300 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold mb-6">Ancient Wisdom</h2>
                </div>

                <div className="space-y-8">
                  <div className="text-2xl font-bold text-primary-200 leading-relaxed">
                    <p>इदं कृतमिदं नेति</p>
                    <p>द्वंद्वैर्मुक्तं यदा मनः।</p>
                    <p>धर्मार्थकाममोक्षेषु</p>
                    <p>निरपेक्षं तदा भवेत्॥१६-</p>
                  </div>

                  <div className="text-lg text-primary-100 leading-relaxed italic">
                    <p>
                      &quot;When mind is free from confusion of doing and not doing, it does not desire righteousness,
                      wealth, or liberation.&quot;
                    </p>
                  </div>

                  <div className="border-t border-primary-700 pt-8">
                    <h3 className="text-xl font-bold text-primary-200 mb-4">Life Philosophy</h3>
                    <p className="text-primary-100 leading-relaxed">
                      <strong>Life:</strong> I am ever eternal. My Body - Five (Physical, Mental, Emotional, Conscious
                      and Bliss Body)
                    </p>
                    <p className="text-primary-100 leading-relaxed mt-4">
                      <strong>State of Mind:</strong> dual striving the effortless effort for non-duality.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consciousness Section */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-r from-primary-100/30 to-secondary-100/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm border-primary-300 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-primary-900 mb-6">Consciousness & Universal Plan</h2>
                </div>
                <div className="space-y-6 text-lg text-primary-700 leading-relaxed">
                  <p>
                    Seeking, Rummaging and Circumventing in Life the very intrinsic conscience of Consciousness (Life):
                    Destiny is ahead with the equation of manifestation of these dimensions of life. Here I express.{" "}
                    <strong>I am the consciousness of universal plan</strong>.
                  </p>
                  <p>
                    Identities in the life have been the biggest search and wandering in human life implicitly or
                    explicitly and we tend to keep changing every now and then, am predicate or variable which is
                    transitory. I am the ripple of hearable and non-hearable sound and thought projection.
                  </p>
                  <div className="text-center pt-6">
                    <p className="text-2xl font-bold text-primary-900">🙏 Namaste 🙏</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-900 mb-6">Start Your Path to Change Your Life</h2>
          <p className="text-xl text-primary-700 mb-12 max-w-3xl mx-auto">
            Begin your journey towards a balanced way of life filled with bliss, peace, and well-being
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <BookingForm
              variant="modal"
              triggerButton={
                <Button size="lg" className=" bg-gradient-to-r from-blue-800 to-amber-600 hover:bg-primary-700 text-white px-8 py-4 text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
              }
            />
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("mailto:prefabhousenepal@gmail.com")}
              className="border-primary-600 text-primary-700 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Connect via Email
            </Button>
          </div>
        </div>
      </section>

   
    </div>
  )
}
