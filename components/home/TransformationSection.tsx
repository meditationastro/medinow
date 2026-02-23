"use client"

import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const transformations = [
  { before: "Feeling lost and disconnected", after: "Clear life purpose and direction" },
  { before: "Repeating negative patterns", after: "Breaking karmic cycles through awareness" },
  { before: "Chronic stress and anxiety", after: "Deep inner peace through Nishruti meditation" },
  { before: "Relationship confusion", after: "Understanding your karmic connections" },
  { before: "Career uncertainty", after: "Aligned with your dharmic path" },
  { before: "Spiritual seeking without answers", after: "Authentic connection to your higher self" },
]

export function TransformationSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-primary-950 to-indigo-950 overflow-hidden relative">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Real Transformations</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              From Confusion to<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Clarity</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Our clients come seeking answers and leave with something far greater — a deep understanding of their unique cosmic blueprint and the tools to live it.
            </p>

            <div className="space-y-3 mb-10">
              {transformations.map((t, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-white/40 text-xs font-medium w-32 flex-shrink-0 line-through">{t.before}</div>
                  <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <div className="flex items-center gap-2 text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {t.after}
                  </div>
                </div>
              ))}
            </div>

            <BookingForm variant="modal" triggerButton={
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl hover:shadow-amber-500/25 transition-all hover:scale-105">
                Start Your Transformation →
              </Button>
            } />
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <Image src="/img/bg-hero-3.jpg" alt="Spiritual Transformation" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-2">
                      {["L","M","A","S"].map((l,i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">{l}</div>
                      ))}
                    </div>
                    <span className="text-white text-sm font-medium">2,000+ Lives Transformed</span>
                  </div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-lg">★</span>)}
                    <span className="text-white font-bold ml-1">5.0</span>
                  </div>
                  <p className="text-white/80 text-xs">Average rating from international clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
