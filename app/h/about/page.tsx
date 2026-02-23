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

      {/* Mission & Vision */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary-900 mb-4">Mission, Vision & Values</h2>
              <p className="text-xl text-primary-700 max-w-2xl mx-auto">The principles that guide every session, retreat, and teaching</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎯",
                  title: "Mission",
                  text: "To awaken the seeker within every individual by offering holistic, soul-aligned paths through the timeless wisdom of Vedic astrology and the power of deep meditation — making ancient knowledge accessible to the modern world.",
                },
                {
                  icon: "🌟",
                  title: "Vision",
                  text: "A world where every conscious being has access to the inner tools that bring clarity, purpose, and peace. We envision a global community of awakened souls living in alignment with their dharma and cosmic blueprint.",
                },
                {
                  icon: "💎",
                  title: "Values",
                  text: "Authenticity in every teaching. Compassion for every seeker. Scientific rigor combined with spiritual depth. Respect for all traditions. Commitment to your transformation — not just sessions, but genuine life change.",
                },
              ].map((item) => (
                <Card key={item.title} className="border-indigo-200 hover:shadow-xl transition-shadow bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-4">{item.title}</h3>
                    <p className="text-primary-700 leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nishruti System Deep Dive */}
      <section className="relative z-10 py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">The Nishruti Meditation System</h2>
            <p className="text-xl text-primary-700">Developed by Niaadim — a unique synthesis of Vedic science and modern consciousness research</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                sanskrit: "श्रुति",
                name: "Shruti",
                subtitle: "That Which is Heard",
                color: "from-amber-100 to-orange-100",
                border: "border-amber-300",
                text: "The foundation of divine knowledge. Sacred revelations like the Vedas — received as outer truth from cosmic intelligence, heard by the ancient rishis in deep meditative states.",
                num: "01",
              },
              {
                sanskrit: "अनुश्रुति",
                name: "Anusruti",
                subtitle: "That Which Follows",
                color: "from-teal-100 to-emerald-100",
                border: "border-teal-300",
                text: "The internalization of teachings through the teacher-student relationship (guru-shishya parampara). Disciplined daily practice that transforms intellectual understanding into living wisdom.",
                num: "02",
              },
              {
                sanskrit: "निश्रुती",
                name: "Nishruti",
                subtitle: "Transcendental Hearing",
                color: "from-purple-100 to-indigo-100",
                border: "border-purple-300",
                text: "Beyond physical sound — the soundless sound. The Anahata Nada that arises spontaneously from within. The dissolution of the boundary between the listener and the sound. Pure awareness.",
                num: "03",
              },
            ].map((stage) => (
              <div key={stage.name} className={`bg-gradient-to-br ${stage.color} rounded-2xl border-2 ${stage.border} p-6`}>
                <div className="text-4xl font-bold text-primary-300 mb-2">{stage.num}</div>
                <div className="text-3xl font-bold text-primary-800 mb-1">{stage.sanskrit}</div>
                <div className="font-bold text-primary-900 text-xl mb-1">{stage.name}</div>
                <div className="text-sm text-primary-600 italic mb-4">{stage.subtitle}</div>
                <p className="text-primary-800 text-sm leading-relaxed">{stage.text}</p>
              </div>
            ))}
          </div>
          <Card className="bg-gradient-to-r from-primary-900 to-indigo-900 text-white border-0">
            <CardContent className="p-8 text-center">
              <p className="text-xl leading-relaxed text-white/90 italic">
                &ldquo;Nishruti is the culmination — an experience of causeless grace, where the practitioner connects directly with the divine, beyond words, thoughts, or form. It is the meeting point of the individual and the universal.&rdquo;
              </p>
              <p className="mt-4 text-amber-300 font-semibold">— Niaadim</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* International Reach */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-br from-slate-50 to-primary-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">Our Global Community</h2>
            <p className="text-xl text-primary-700">Serving conscious seekers across continents</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {[
              { flag: "🇩🇪", country: "Germany" },
              { flag: "🇫🇷", country: "France" },
              { flag: "🇮🇹", country: "Italy" },
              { flag: "🇨🇭", country: "Switzerland" },
              { flag: "🇺🇸", country: "USA" },
            ].map((c) => (
              <div key={c.country} className="text-center bg-white rounded-2xl py-6 border border-primary-100 hover:shadow-md transition-shadow">
                <div className="text-5xl mb-2">{c.flag}</div>
                <div className="font-semibold text-primary-800">{c.country}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "My retreat in Nepal was life-changing. The depth of astrology and energy work was beyond anything I've ever experienced.", name: "Laura", country: "France" },
              { quote: "The online mentorship gave me clarity and tools to navigate a major life transition. Truly transformational.", name: "Mark", country: "USA" },
              { quote: "Incredible mix of ancient knowledge and modern insights. The birth chart reading opened my eyes to patterns I'd never seen.", name: "Julia", country: "Germany" },
            ].map((t) => (
              <Card key={t.name} className="border-primary-200 bg-white">
                <CardContent className="p-6">
                  <Quote className="w-6 h-6 text-primary-300 mb-3" />
                  <p className="text-primary-800 italic leading-relaxed mb-4 text-sm">{t.quote}</p>
                  <div className="font-semibold text-primary-900">{t.name}</div>
                  <div className="text-primary-600 text-sm">{t.country}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Journey Timeline */}
      <section className="relative z-10 py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">Niaadim&apos;s Spiritual Journey</h2>
            <p className="text-xl text-primary-700">Decades of seeking, learning, and synthesizing ancient wisdom</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-200" />
            {[
              { year: "Early Life", title: "Seeds of Seeking", desc: "Born into a family with deep Vedic traditions in Nepal. First encounters with meditation and astrology planted seeds for a lifelong journey." },
              { year: "10+ Years", title: "Jyotish Studies", desc: "Deep immersion in Vedic astrology under traditional Himalayan teachers. Mastery of planetary periods, nakshatras, and karmic analysis." },
              { year: "Study Phase", title: "Meditation Lineages", desc: "Training in multiple meditation traditions including Vipassana, Zen shikantaza, Tibetan Vajrayana, and Vedic mantra practices." },
              { year: "Discovery", title: "Nishruti System Born", desc: "Synthesis of years of practice and teaching culminates in the Nishruti Meditation system — a unique three-stage method for transcendental awareness." },
              { year: "Ongoing", title: "Global Teaching", desc: "Online and in-person teaching to students from Europe, USA, and across Asia. Personal consultations, retreats, and the digital programs at MeditationAstro.com." },
            ].map((item, i) => (
              <div key={i} className="relative pl-16 pb-10 last:pb-0">
                <div className="absolute left-3 top-1 w-6 h-6 rounded-full bg-primary-800 border-4 border-white shadow" />
                <div className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-1">{item.year}</div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">{item.title}</h3>
                <p className="text-primary-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
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
              onClick={() => window.open("mailto:meditationastro@gmail.com")}
              className="border-primary-600 text-primary-700 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Connect via Email
            </Button>
          </div>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Our Philosophy</span>
            <h2 className="text-4xl font-bold text-primary-900 mt-3 mb-4">The Pillars of Our Teaching</h2>
            <p className="text-primary-700 text-lg max-w-2xl mx-auto">
              Every teaching from Niaadim rests on four interconnected pillars that form a complete system of human flourishing.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: "🔭", title: "Jyotish — The Eye of the Veda", color: "from-indigo-500 to-purple-600", bg: "bg-indigo-50 border-indigo-100",
                points: ["Birth chart as the map of your soul's journey", "Dasha system for precise life timing", "Nakshatra wisdom for deepest self-understanding", "Remedial measures rooted in classical texts"],
                desc: "Vedic astrology (Jyotish) is the foundational diagnostic tool — it reveals your karmic inheritance, your dharmic purpose, and the timing of life's key chapters." },
              { icon: "🧘", title: "Nishruti — Beyond Listening", color: "from-amber-500 to-orange-600", bg: "bg-amber-50 border-amber-100",
                points: ["Transcending ordinary sensory consciousness", "Direct access to inner silence", "Integration of Vedic sound science", "Progressive stages: Shruti → Anusruti → Nishruti"],
                desc: "Nishruti is a meditation system developed by Niaadim from deep study of Vedic sound science. It goes beyond ordinary listening into the listening behind listening." },
              { icon: "🌿", title: "Ayurveda — Living in Harmony", color: "from-green-500 to-emerald-600", bg: "bg-green-50 border-green-100",
                points: ["Dosha assessment and balancing", "Seasonal and diurnal rhythms", "Food as medicine and consciousness", "Lifestyle aligned with cosmic cycles"],
                desc: "Ayurveda completes the picture by showing how to live in the body in alignment with your astrological constitution and the rhythms of nature." },
              { icon: "🔊", title: "Nada — The Science of Sound", color: "from-rose-500 to-pink-600", bg: "bg-rose-50 border-rose-100",
                points: ["Mantras as vibrational remedies", "Singing bowls and sacred instruments", "Chakra harmonics and resonance", "Sound as a bridge between worlds"],
                desc: "Sound and vibration underpin all of creation. Our sound healing work uses Himalayan singing bowls, mantras, and Vedic chanting to restore harmonic balance." },
            ].map((pillar, i) => (
              <div key={i} className={`rounded-3xl border p-8 ${pillar.bg} hover:shadow-lg transition-shadow`}>
                <div className="flex items-start gap-5 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pillar.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {pillar.points.map((point, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Approach */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-primary-950 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Teaching Approach</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">How Niaadim Teaches</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Our approach combines ancient rigor with modern accessibility — rooted in lineage, alive in application.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📖", title: "Textual Foundations", desc: "Sessions are grounded in classical Jyotish texts — Brihat Parashara Hora Shastra, Sarvartha Chintamani, and Vedic Upanishads." },
              { icon: "🎯", title: "Precision Over Generality", desc: "No sun-sign horoscopes. Your individual birth chart, exact planetary positions, and specific Dasha period are always the foundation." },
              { icon: "💊", title: "Practical Remedies", desc: "Every session concludes with specific, doable remedies: mantras, gemstones, rituals, lifestyle changes — nothing vague or theoretical." },
              { icon: "🌍", title: "Cross-Cultural Bridge", desc: "Niaadim has deep experience bridging Vedic worldviews with the questions and contexts of European and Western seekers." },
              { icon: "🤝", title: "Ongoing Relationship", desc: "We are not one-time consultants. Many clients return quarterly, annually, or for retreats — evolving together over years." },
              { icon: "❤️", title: "Compassion First", desc: "Every reading is delivered with deep compassion, sensitivity, and a genuine desire for your highest wellbeing — not just information." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials / Lineage */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Background & Lineage</span>
            <h2 className="text-4xl font-bold text-primary-900 mt-3 mb-4">Authentic Credentials</h2>
            <p className="text-primary-700 text-lg max-w-2xl mx-auto">
              Niaadim&apos;s knowledge comes not from books alone but from decades of practice, study under masters, and lived experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { year: "Early Life", title: "Born into Spiritual Tradition", desc: "Raised in a family with deep roots in Nepali spiritual traditions, Niaadim was exposed to Vedic chanting, temple rituals, and astrology from childhood.", badge: "Foundation" },
              { year: "Study Years", title: "Jyotish Under Traditional Masters", desc: "Studied Vedic astrology formally under lineage teachers in Nepal, covering Brihat Parashara Hora Shastra, Jaimini sutras, and predictive astrology.", badge: "Jyotish" },
              { year: "Realization", title: "Nishruti — A Direct Discovery", desc: "Through intensive meditation retreats, Niaadim discovered the Nishruti listening meditation — a direct experiential method beyond technique.", badge: "Meditation" },
              { year: "Practice", title: "20+ Years of Client Work", desc: "Over two decades of consultations with clients from 15+ countries — astrology readings, retreats, meditation courses, and ongoing guidance.", badge: "Experience" },
              { year: "Current", title: "Global Teaching & Retreats", desc: "Now offering online consultations worldwide and periodic in-person retreats at our Khumaltar, Lalitpur center near Kathmandu.", badge: "Global" },
              { year: "Research", title: "Neuroplasticity & Spirituality", desc: "Active exploration of the intersection of modern neuroscience and ancient meditation — bridging Eastern wisdom with Western science.", badge: "Innovation" },
            ].map((cred, i) => (
              <div key={i} className="bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow p-6 flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs text-center leading-tight shadow-lg px-1">
                    {cred.year}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900">{cred.title}</h3>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">{cred.badge}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{cred.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   
    </div>
  )
}