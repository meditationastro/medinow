"use client"

import { Mail, Phone, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "/h" },
    { name: "About", href: "/h/about" },
    { name: "Services", href: "/h/services" },
    { name: "Blog", href: "/h/blogs" },
    { name: "Gallery", href: "/h/gallery" },
    { name: "Contact", href: "/h/contact" },
  ]

  const serviceLinks = [
    { name: "Astrological Chart Reading", href: "/h/astrological-chart-reading" },
    { name: "Meditation And Yoga", href: "/h/meditation-and-yoga" },
    { name: "Spiritual Guidance", href: "/h/spiritual-guidance" },
    { name: "Jyotish Consultancy", href: "/h/jyotish-consultancy" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/h/privacy" },
    { name: "Terms & Conditions", href: "/h/terms-and-conditions" },
    { name: "FAQ", href: "/h/faq" },
  ]

  
  return (
    <footer className="bg-slate-900 border-primary-600">
      <div className="container mx-auto px-6 pt-12 pb-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/h" className="block">
              <Image
                src="/logo.png"
                alt="Meditation & Astrology"
                width={180}
                height={60}
                className="h-12 w-auto rounded-full"
              />
            </Link>
            <p className="text-neutral-300 text-sm">
              Discover the ancient wisdom of meditation and astrology with our expert guidance and personalized consultations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                  {/* If this is the Services link, add the 4 service options below it */}
                  {link.name === "Services" && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {serviceLinks.map((service) => (
                        <li key={service.name}>
                          <Link
                            href={service.href}
                            className="text-neutral-400 hover:text-secondary-300 text-xs transition-colors"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:meditationastro1@gmail.com"
                  className="flex items-center text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  meditationastro1@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/9779823376110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  +977 982-3376110
                </a>
              </li>
              <li className="flex items-center text-neutral-300 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                Kathmandu, Nepal
              </li>
              <li className="flex items-center text-neutral-300 text-sm">
                <Clock className="h-4 w-4 mr-2" />
                9:00 AM - 8:00 PM (NPT)
              </li>
            </ul>
          </div>

          


          


    
  
<script>
  document.getElementById("yearAFS").textContent = new Date().getFullYear();
</script>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} Answerforself. All rights reserved.
            </p>
            
           
          </div>
        </div>
      </div>
    </footer>
  )
} 
