"use client"

import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"

const steps = [
  { num: "01", title: "Share Your Story", desc: "Contact us via WhatsApp or our booking form. Share your birth details and what you seek guidance on.", icon: "💬", color: "bg-blue-100 border-blue-200 text-blue-800" },
  { num: "02", title: "Chart Analysis", desc: "Niaadim analyzes your complete birth chart, planetary periods, and karmic patterns before the session.", icon: "🔮", color: "bg-purple-100 border-purple-200 text-purple-800" },
  { num: "03", title: "Sacred Session", desc: "90-minute deep consultation via Zoom or WhatsApp Video. Real questions, real answers, real remedies.", icon: "🌟", color: "bg-amber-100 border-amber-200 text-amber-800" },
  { num: "04", title: "Your Path Forward", desc: "Receive a written report, personalized mantras, gemstone recommendations, and ongoing support.", icon: "🛤️", color: "bg-green-100 border-green-200 text-green-800" },
]

export function JourneyProcess() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Your Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-primary-700 text-lg max-w-2xl mx-auto">
            From first contact to life-changing insight — your spiritual consultation in four sacred steps.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-amber-200 to-green-200 hidden md:block" style={{left: '12.5%', right: '12.5%'}} />

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center group">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-white rounded-3xl shadow-lg border-2 border-gray-100 flex flex-col items-center justify-center relative z-10 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                    <div className="text-3xl mb-1">{step.icon}</div>
                    <div className="text-xs font-bold text-gray-400">{step.num}</div>
                  </div>
                </div>
                <h3 className="font-bold text-primary-900 text-lg mb-3">{step.title}</h3>
                <p className="text-primary-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <BookingForm variant="modal" triggerButton={
            <Button className="bg-primary-900 hover:bg-primary-800 text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Begin Your Journey →
            </Button>
          } />
        </div>
      </div>
    </section>
  )
}
