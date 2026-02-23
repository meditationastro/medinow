"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactFormFields } from "@/components/home/ContactFormFields"
import { Mail, Phone, Clock, Facebook, Instagram, Youtube, MessageCircle, MapPin, Star, Calendar, Globe, ChevronDown, ChevronUp, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useState } from "react"
import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"

const Map = dynamic(() => import("@/components/home/Map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-primary-50/50 animate-pulse flex items-center justify-center">
      <p className="text-primary-800/60">Loading map...</p>
    </div>
  ),
})

const faqs = [
  { q: "How do I book a Vedic astrology reading?", a: "Use the Book Appointment button anywhere on the site, or contact us via WhatsApp at +977-9709598727. Sessions are available online via Zoom, WhatsApp Video, or Google Meet for international clients." },
  { q: "What information do I need for a birth chart reading?", a: "You need your exact date of birth, time of birth (as precise as possible), and place of birth. If you do not know your exact birth time, we can do a chart rectification session." },
  { q: "Do you offer services in German, French, or Italian?", a: "Our primary consultation language is English. We are expanding to serve German, French, Italian, and Swiss clients with translated resources. Written reports can be translated upon request." },
  { q: "How long is a typical consultation session?", a: "Standard consultations are 60-90 minutes. Deep-dive sessions (full birth chart + remedies) run 90-120 minutes. Retreat preparation sessions are 30 minutes." },
  { q: "What is the difference between Western and Vedic astrology?", a: "Vedic (Jyotish) uses the sidereal zodiac based on actual star positions, while Western uses the tropical zodiac. Vedic focuses more on the Moon sign, rising sign, and planetary periods (Dashas) for life timing." },
  { q: "Can I join a Nepal retreat from Europe or USA?", a: "Yes — our retreats are designed for international visitors. We assist with visa guidance, local transport from Kathmandu airport, and pre-retreat online sessions to prepare you." },
  { q: "Do you offer payment plans for longer programs?", a: "Yes. For the 6-week Inner Alchemy and Sacred Travel packages, we offer installment plans. Contact us via WhatsApp to discuss options." },
  { q: "Is there a free introductory consultation?", a: "We offer a 15-minute complimentary discovery call for new clients. Book via the appointment page or WhatsApp to schedule your free call." },
]

const services = [
  { icon: "🔮", title: "Vedic Astrology Reading", price: "From $27", link: "/h/astrological-chart-reading" },
  { icon: "🧘", title: "Meditation and Yoga Session", price: "Custom Packages", link: "/h/meditation-and-yoga" },
  { icon: "🏔️", title: "Nepal Spiritual Retreat", price: "From EUR 2,400", link: "/h/appointment" },
  { icon: "🔊", title: "Sound Healing", price: "Session Based", link: "/h/sound-healing" },
  { icon: "🌀", title: "Chakra Balancing", price: "Consultation", link: "/h/chakra-balancing" },
  { icon: "⭐", title: "Jyotish Consultancy", price: "Personalized", link: "/h/jyotish-consultancy" },
]

const countries = [
  { flag: "🇩🇪", name: "Germany", tz: "CET (UTC+1)" },
  { flag: "🇫🇷", name: "France", tz: "CET (UTC+1)" },
  { flag: "🇮🇹", name: "Italy", tz: "CET (UTC+1)" },
  { flag: "🇨🇭", name: "Switzerland", tz: "CET (UTC+1)" },
  { flag: "🇺🇸", name: "USA", tz: "EST/PST" },
  { flag: "🇳🇵", name: "Nepal", tz: "NPT (UTC+5:45)" },
]

const howSteps = [
  { num: "01", icon: "💬", title: "Contact Us", desc: "Reach out via WhatsApp, email, or the booking form." },
  { num: "02", icon: "📅", title: "Discovery Call", desc: "Free 15-min call to recommend the best service for you." },
  { num: "03", icon: "🔮", title: "Your Session", desc: "Deep, personalized consultation via Zoom or in-person." },
  { num: "04", icon: "🌟", title: "Transformation", desc: "Receive your report, remedies, and ongoing support." },
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-60 h-60 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <div className="flex justify-center gap-4 mb-6">
            {[
              { href: "https://www.facebook.com/meditationastro/", color: "bg-blue-600 hover:bg-blue-700", label: "Facebook", Icon: Facebook },
              { href: "https://www.instagram.com/meditationastro_1/", color: "bg-pink-600 hover:bg-pink-700", label: "Instagram", Icon: Instagram },
              { href: "https://www.youtube.com/@astromeditation1", color: "bg-red-600 hover:bg-red-700", label: "YouTube", Icon: Youtube },
              { href: "https://wa.me/9779709598727", color: "bg-green-600 hover:bg-green-700", label: "WhatsApp", Icon: MessageCircle },
            ].map(({ href, color, label, Icon }) => (
              <Link key={label} href={href} target="_blank" rel="noopener noreferrer"
                className={`${color} text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg`}>
                <Icon className="h-6 w-6" />
                <span className="sr-only">{label}</span>
              </Link>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Connect With Us</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Begin your spiritual journey. We serve seekers from Nepal, Europe, USA, and across the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://wa.me/9779709598727" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5" /> WhatsApp Now
            </Link>
            <BookingForm variant="modal" triggerButton={
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-3 rounded-xl">
                <Calendar className="w-5 h-5 mr-2" /> Book Appointment
              </Button>
            } />
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              { IconComp: MessageCircle, title: "WhatsApp", details: [{ text: "+977-9709598727", link: "https://wa.me/9779709598727" }, { text: "+977 982-3376110", link: "https://wa.me/9779823376110" }], color: "bg-green-600" },
              { IconComp: Phone, title: "Phone", details: [{ text: "+977-9841647283", link: "tel:+9779841647283" }], color: "bg-blue-700" },
              { IconComp: Mail, title: "Email", details: [{ text: "meditationastro1@gmail.com", link: "mailto:meditationastro1@gmail.com" }, { text: "meditationastro@gmail.com", link: "mailto:meditationastro@gmail.com" }], color: "bg-indigo-600" },
              { IconComp: MapPin, title: "Address", details: [{ text: "Khumaltar, Lalitpur, Nepal", link: "https://maps.google.com/?q=Khumaltar,Lalitpur,Nepal" }], color: "bg-rose-600" },
              { IconComp: Clock, title: "Availability", details: [{ text: "Mon-Sat: 9AM-8PM NPT", link: "https://time.is/Nepal" }, { text: "International: flexible", link: "/h/appointment" }], color: "bg-amber-600" },
            ].map((info, i) => (
              <div key={i}>
                <Card className="h-full border-primary-100 hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className={`w-10 h-10 ${info.color} rounded-xl flex items-center justify-center mb-3`}>
                      <info.IconComp className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-bold text-primary-900 text-sm mb-2">{info.title}</h3>
                    {info.details.map((d, j) => (
                      <Link key={j} href={d.link} target={d.link.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="block text-primary-700 hover:text-primary-500 text-xs transition-colors">
                        {d.text}
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Quick Reference */}
      <section className="py-14 px-4 bg-gradient-to-br from-primary-50 to-indigo-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary-900 mb-2">Our Services</h2>
            <p className="text-primary-700">What would you like to explore? Each service can be booked via the form below or WhatsApp.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((svc) => (
              <Link key={svc.title} href={svc.link}
                className="group flex items-center gap-4 bg-white rounded-xl p-4 border border-primary-100 hover:shadow-md hover:border-primary-300 transition-all">
                <span className="text-3xl">{svc.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary-900 text-sm group-hover:text-primary-700">{svc.title}</p>
                  <p className="text-primary-500 text-xs">{svc.price}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form + Map */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div className="space-y-6">
              <Card className="border-primary-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary-900">Send a Message</CardTitle>
                  <p className="text-primary-600 text-sm">We reply within 24 hours. For faster response use WhatsApp.</p>
                </CardHeader>
                <CardContent>
                  <ContactFormFields />
                </CardContent>
              </Card>

              <Card className="border-indigo-200 bg-indigo-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-indigo-700" />
                    <h3 className="font-bold text-indigo-900">International Clients Welcome</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                    {countries.map((c) => (
                      <div key={c.name} className="flex items-center gap-2 text-sm">
                        <span className="text-xl">{c.flag}</span>
                        <div>
                          <p className="font-medium text-indigo-900 leading-none">{c.name}</p>
                          <p className="text-indigo-600 text-xs">{c.tz}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-indigo-800 text-sm">All consultations available online via Zoom, WhatsApp, or Google Meet. We schedule around your timezone.</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-primary-200 overflow-hidden shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary-900">Visit Our Center</CardTitle>
                  <p className="text-primary-600 text-sm">Khumaltar, Lalitpur — 15 min from Kathmandu airport</p>
                </CardHeader>
                <CardContent className="p-0">
                  <Map className="h-[350px] w-full" />
                </CardContent>
              </Card>

              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white text-center shadow-lg">
                <MessageCircle className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">Fastest: WhatsApp</h3>
                <p className="text-white/80 text-sm mb-5">Niaadim personally responds. Book, ask questions, or just say hello.</p>
                <Link href="https://wa.me/9779709598727?text=Hello%20Niaadim%2C%20I%20am%20interested%20in%20your%20services."
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-all">
                  <MessageCircle className="w-5 h-5" /> +977-9709598727
                </Link>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-amber-600 fill-amber-600" />
                  <h3 className="font-bold text-amber-900">Client Trust</h3>
                </div>
                <div className="flex gap-1 mb-2">
                  {[0,1,2,3,4].map((i) => <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />)}
                  <span className="text-amber-800 font-semibold ml-2">5.0</span>
                </div>
                <p className="text-amber-800 text-sm italic">
                  &ldquo;Niaadim&apos;s reading was the most accurate and profound I have ever received.&rdquo;
                </p>
                <p className="text-amber-600 text-xs mt-1">— Laura M., France</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["🇩🇪 Germany","🇫🇷 France","🇺🇸 USA","🇮🇹 Italy","🇨🇭 Switzerland"].map((c) => (
                    <span key={c} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 px-4 bg-gradient-to-br from-slate-50 to-primary-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary-900 mb-2">How It Works</h2>
            <p className="text-primary-700">From first contact to transformation in 4 steps</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {howSteps.map((step) => (
              <div key={step.num} className="text-center bg-white rounded-2xl p-5 border border-primary-100 hover:shadow-md">
                <div className="text-3xl font-bold text-primary-200 mb-1">{step.num}</div>
                <div className="text-4xl mb-2">{step.icon}</div>
                <h3 className="font-bold text-primary-900 mb-1 text-sm">{step.title}</h3>
                <p className="text-primary-700 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-primary-700">Everything you need to know before your first session</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-primary-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-primary-50 transition-colors"
                >
                  <span className="font-semibold text-primary-900 pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-primary-600 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-primary-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 bg-primary-50/50">
                    <p className="text-primary-700 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-gradient-to-r from-primary-900 to-indigo-900 rounded-2xl text-white text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Still Have Questions?</h3>
            <p className="text-white/80 mb-5 text-sm">Happy to answer anything about our services, retreats, or payment options.</p>
            <Link href="https://wa.me/9779709598727" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-all">
              <MessageCircle className="w-5 h-5" /> Ask on WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
