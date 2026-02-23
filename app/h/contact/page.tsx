"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactFormFields } from "@/components/home/ContactFormFields"
import { Mail, Phone, Clock, Facebook, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/home/Map').then(mod => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-primary-50/50 animate-pulse flex items-center justify-center">
      <p className="text-primary-800/60">Loading map...</p>
    </div>
  )
})

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call or WhatsApp",
      details: [
        { text: "+977 982-3376110", link: "https://wa.me/9779823376110" },
        { text: "+977-9841647283", link: "https://wa.me/9779841647283" }
      ],
      color: "from-success-500 to-success-600"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Us",
      details: [
        { text: "meditationastro1@gmail.com", link: "mailto:meditationastro1@gmail.com" }
      ],
      color: "bg-blue-800"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Availability",
      details: [
        { text: "Mon-Sat: 9:00 AM - 8:00 PM (NPT)", link: "https://time.is/Nepal" },
        { text: "Available for International Clients", link: "/h/appointment" }
      ],
      color: "from-secondary-500 to-secondary-600"
    }
  ]

  const socialLinks = [
    {
      icon: <Facebook className="h-6 w-6" />,
      name: "Facebook",
      url: "https://www.facebook.com/meditationastro/",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: <Instagram className="h-6 w-6" />,
      name: "Instagram",
      url: "https://www.instagram.com/meditationastro_1/",
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      icon: <Youtube className="h-6 w-6" />,
      name: "YouTube",
      url: "https://www.youtube.com/@astromeditation1",
      color: "bg-red-600 hover:bg-red-700"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100/50 py-16 px-4">
      <div className="absolute inset-0 bg-[url('/sacred-geometry.png')] opacity-5 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-primary-800/90 max-w-2xl mx-auto">
            Ready to begin your spiritual journey? We&apos;re here to guide you through your transformation with personalized astrology and meditation practices.
          </p>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-4 mb-12"
        >
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.color} text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg`}
            >
              {social.icon}
              <span className="sr-only">{social.name}</span>
            </Link>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Form and Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-primary-200">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-full bg-blue-800/70 flex items-center justify-center flex-shrink-0`}>
                      <div className="text-white ">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <Link
                          key={idx}
                          href={detail.link}
                          target={detail.link.startsWith('http') ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                          className="block text-primary-700 hover:text-primary-500 transition-colors duration-200"
                        >
                          {detail.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="bg-white/80 backdrop-blur-sm border-primary-200">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-900">Send us a Message</CardTitle>
                <p className="text-primary-700">Fill out the form below and we&apos;ll get back to you soon.</p>
              </CardHeader>
              <CardContent>
                <ContactFormFields />
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: Map and Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-primary-200 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-900">Visit Our Center</CardTitle>
                <p className="text-primary-700">Sacred Himalayan Wisdom Center, Kathmandu</p>
              </CardHeader>
              <CardContent className="p-0">
                <Map className="h-[400px] w-full" />
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-primary-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Important Information</h3>
                <div className="space-y-4 text-primary-700">
                  <p>
                    While we welcome in-person visits, most of our consultations are conducted online 
                    via Zoom or WhatsApp to accommodate our international clients. We ensure the same 
                    level of spiritual connection and guidance in our virtual sessions.
                  </p>
                  <p>
                    We accommodate clients from all time zones. Please use our booking system to 
                    find a time that works best for you, or contact us directly to arrange a 
                    suitable consultation time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
