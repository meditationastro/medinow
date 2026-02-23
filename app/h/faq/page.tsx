"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Instagram, Facebook, Youtube } from "lucide-react"

export default function FAQPage() {
  const socialLinks = {
    instagram: "https://www.instagram.com/meditationastro_1/", 
    facebook: "https://www.facebook.com/meditationastro/",  
    youtube: "https://www.youtube.com/@astromeditation1"    
  }

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h1>
          <p className="text-primary/70 text-lg">Find answers to common questions about our services</p>
        </div>

        <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-primary/20">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                1. What is MeditationAstro.com all about?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                MeditationAstro.com offers a unique fusion of Vedic astrology, meditation practices, and spiritual alignment techniques to support personal transformation, clarity, and inner peace. We serve clients globally, with a special focus on seekers from Europe.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                2. What services do you provide?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80 space-y-2">
                <p>We offer:</p>
                <ul className="list-none space-y-2 pl-4">
                  <li>🪐 Vedic Astrology Consultations (Birth chart, compatibility, career, and timing analysis)</li>
                  <li>🧘‍♂️ Meditation Guidance & Techniques (Personalized for mental clarity, focus, and inner healing)</li>
                  <li>🔮 Spiritual Mentorship & Intuitive Sessions</li>
                  <li>🕉️ Custom Rituals & Mantra Prescriptions</li>
                  <li>🌑 Planetary Remedies & Energy Clearing</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                3. How do I book a session?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                Simply visit our Contact page or email us at meditationastro1@gmail.com. You can also call or WhatsApp us at +977-9841647283. We&apos;ll help you choose the right service and schedule a session based on your time zone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                4. Are sessions available online?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                Yes, all our sessions are conducted online via Zoom or WhatsApp video, making them accessible globally. We accommodate European time zones for your convenience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                5. Do I need to prepare anything before my astrology session?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                <p>Yes. Please provide:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Your full name</li>
                  <li>Date, time, and place of birth</li>
                  <li>A brief intention or question you wish to explore</li>
                </ul>
                <p className="mt-2">You&apos;ll receive preparation guidelines via email after booking.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                6. What if I don&apos;t know my exact birth time?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                We offer birth time rectification services to help approximate your accurate birth details using major life events. This adds 1–2 days to the session timeline.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                7. Are your services religious?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                Not at all. Our approach is spiritually rooted but non-dogmatic. We welcome individuals from all beliefs, backgrounds, and paths.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                8. Do you offer services in languages other than English?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                Yes, we offer sessions in English, Nepali, and Hindi. Let us know your preference at the time of booking.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                9. How much do sessions cost?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                Session pricing varies by service and length. A basic astrology or meditation session starts at €44. Customized packages for deeper work are available upon request.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                10. Do you offer refunds?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                Due to the energetic nature of our services, all bookings are final and non-refundable, but sessions can be rescheduled with 24 hours&apos; notice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                11. Can I book for someone else?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                Yes, but we require consent from the individual receiving the session. Gifting sessions is welcome, but informed participation is essential.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                12. How are you different from other astrology or meditation sites?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                Our process is deeply intuitive, lineage-based, and holistic—combining ancient Vedic wisdom with modern embodiment practices. Each session is custom-designed to guide you into self-remembrance, not dependency.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                13. Do you offer long-term mentorship?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                Yes, we offer 3-month and 6-month transformation containers for clients ready to dive deeper into personal evolution, spiritual discipline, and planetary alignment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-14" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                14. Can I follow you on social media?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                <p>Yes! Find us on:</p>
                <div className="flex space-x-4 mt-2">
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-15" className="border-b border-primary/20">
              <AccordionTrigger className="text-primary hover:text-primary/80 text-lg font-semibold">
                15. Is this work confidential?
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                Absolutely. All sessions are strictly confidential, and your data is never shared. We hold your journey with deep integrity and spiritual respect.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </motion.div>
    </div>
  )
}
