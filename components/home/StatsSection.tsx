"use client"

import { Users, Globe, Star, BookOpen } from "lucide-react"

const stats = [
  { icon: Users, value: "2,000+", label: "Students Worldwide", color: "text-teal-700" },
  { icon: Globe, value: "15+", label: "Countries Served", color: "text-indigo-700" },
  { icon: Star, value: "20+", label: "Years of Vedic Study", color: "text-amber-700" },
  { icon: BookOpen, value: "500+", label: "Astrology Readings", color: "text-rose-700" },
]

export function StatsSection() {
  return (
    <section className="relative z-10 py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <s.icon className={`w-7 h-7 ${s.color}`} />
                </div>
              </div>
              <div className={`text-4xl font-bold mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-primary-700 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
