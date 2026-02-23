"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, ChevronDown, CheckCircle, Volume2, VolumeX, ArrowRight, Star } from "lucide-react"

const PLANES = [
  {
    skt: "श्रुति", name: "Shruti", sub: "That Which Is Heard",
    color: "from-amber-500 to-orange-600", bg: "bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
    desc: "The foundation of divine knowledge — the Vedas, sacred sounds received from the external world. Shruti is truth heard, revelation given.",
    practice: "Begin by closing your eyes. Listen deeply to every sound around you — near and far. Let sounds come and go without labeling them. Simply receive.",
    duration: 5,
  },
  {
    skt: "अनुश्रुति", name: "Anusruti", sub: "That Which Follows",
    color: "from-indigo-500 to-blue-700", bg: "bg-indigo-50 border-indigo-200",
    dot: "bg-indigo-500",
    desc: "Internalization of wisdom through disciplined practice. The seeker turns inward, guided by a teacher's transmission. Sound becomes a doorway.",
    practice: "Now turn attention to sounds within — the rhythm of your breath, the subtle pulse of the heartbeat. Follow these inward sounds as a guide into stillness.",
    duration: 8,
  },
  {
    skt: "निश्रुती", name: "Nishruti", sub: "Transcendental Hearing",
    color: "from-violet-600 to-purple-800", bg: "bg-violet-50 border-violet-200",
    dot: "bg-violet-600",
    desc: "The soundless sound — Anahata Nada. Beyond hearing itself. A state of pure awareness where the boundary between listener and sound dissolves.",
    practice: "Release all effort. Let even the awareness of breath dissolve. Remain as the silent witness — pure knowing, the listener without a sound.",
    duration: 12,
  },
]

const MODULES = [
  { num: "01", title: "Foundations of Sacred Hearing", icon: "📖", subs: ["Understanding Shruti, Anusruti, Nishruti", "The nature of divine sound (Nada)", "The role of the inner ear in mystic traditions"] },
  { num: "02", title: "Nirati — Effortless Presence", icon: "🌬️", subs: ["Mindfulness of breath and body", "Observation without judgment", "Stabilizing awareness in motion"] },
  { num: "03", title: "Nishruti — Inner Listening", icon: "🎧", subs: ["Tuning into inner sounds (heartbeat, breath)", "Developing subtle perception", "Experiencing the Anahata Nada"] },
  { num: "04", title: "Nispaersh — Letting Go", icon: "🍃", subs: ["Visualization and emotional release", "Dissolving thought patterns", "Accessing mental clarity and neutrality"] },
  { num: "05", title: "Supporting Practices", icon: "🔔", subs: ["Sound Healing with Tibetan Bowls", "Metta (Loving-Kindness) Meditation", "Zen Practices: Shikantaza & Koans", "Karma Yoga for mindful daily action"] },
]

const BENEFITS = [
  "Reduced stress, anxiety, and mental restlessness",
  "Improved sleep, focus, and emotional balance",
  "Increased self-awareness and spiritual sensitivity",
  "Tools for cultivating peace in daily life",
  "Deeper connection with your inner guidance",
  "Certificate of completion upon finishing all modules",
]

const TESTIMONIALS = [
  { name: "Laura M.", country: "🇫🇷 France", text: "The progression from Shruti to Nishruti completely transformed how I experience silence. I had never known meditation could go this deep.", stars: 5 },
  { name: "Marcus K.", country: "🇩🇪 Germany", text: "Niaadim's guidance is precise and compassionate. The Nirati technique alone was worth the entire course.", stars: 5 },
  { name: "Sofia R.", country: "🇮🇹 Italy", text: "After years of trying different meditation styles, Nishruti finally gave me what I was looking for — genuine inner stillness.", stars: 5 },
]

function BreathingCircle({ phase }: { phase: "inhale" | "hold" | "exhale" | "idle" }) {
  const scale = phase === "inhale" ? "scale-150" : phase === "exhale" ? "scale-75" : "scale-110"
  const opacity = phase === "idle" ? "opacity-60" : "opacity-100"
  const labels: Record<string, string> = { inhale: "Breathe In", hold: "Hold", exhale: "Breathe Out", idle: "Begin" }
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className={`relative flex items-center justify-center transition-all duration-4000 ${opacity}`}>
        {[1, 2, 3].map(i => (
          <div key={i} className={`absolute rounded-full border-2 border-violet-400/40 transition-all duration-4000 ${scale}`}
            style={{ width: `${i * 60}px`, height: `${i * 60}px`, transitionDelay: `${i * 100}ms` }} />
        ))}
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center transition-all duration-4000 shadow-2xl shadow-violet-500/30 ${scale}`}>
          <span className="text-white text-sm font-semibold text-center px-2">{labels[phase]}</span>
        </div>
      </div>
    </div>
  )
}

function PracticeTimer({ plane }: { plane: typeof PLANES[0] }) {
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(plane.duration * 60)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "idle">("idle")
  const [done, setDone] = useState(false)
  const [muted, setMuted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const phaseRef = useRef<NodeJS.Timeout | null>(null)

  const CYCLE = [
    { phase: "inhale" as const, dur: 4000 },
    { phase: "hold" as const, dur: 4000 },
    { phase: "exhale" as const, dur: 6000 },
  ]

  const runCycle = useCallback(() => {
    let i = 0
    const next = () => {
      setPhase(CYCLE[i].phase)
      phaseRef.current = setTimeout(() => {
        i = (i + 1) % CYCLE.length
        next()
      }, CYCLE[i].dur)
    }
    next()
  }, [])

  useEffect(() => {
    if (running) {
      runCycle()
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            setRunning(false)
            setDone(true)
            setPhase("idle")
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (phaseRef.current) clearTimeout(phaseRef.current)
      if (!done) setPhase("idle")
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (phaseRef.current) clearTimeout(phaseRef.current)
    }
  }, [running])

  function reset() { setRunning(false); setSeconds(plane.duration * 60); setPhase("idle"); setDone(false) }

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className={`rounded-2xl border p-6 ${plane.bg} mt-4`}>
      <p className="text-sm text-gray-600 italic mb-4 leading-relaxed">"{plane.practice}"</p>
      <BreathingCircle phase={phase} />
      {done ? (
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
          <p className="font-bold text-green-700 text-lg">Practice Complete 🙏</p>
          <p className="text-gray-600 text-sm mb-4">Sit quietly for a few minutes before continuing.</p>
          <Button onClick={reset} size="sm" variant="outline">Practice Again</Button>
        </div>
      ) : (
        <div className="text-center space-y-3">
          <div className="text-4xl font-mono font-bold text-gray-800">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </div>
          <div className="flex justify-center gap-3">
            <Button onClick={() => setRunning(r => !r)} className={`bg-gradient-to-r ${plane.color} text-white px-6`}>
              {running ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {running ? "Pause" : "Begin Practice"}
            </Button>
            <Button onClick={reset} variant="outline" size="icon"><RotateCcw className="w-4 h-4" /></Button>
            <Button onClick={() => setMuted(m => !m)} variant="outline" size="icon">
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-gray-500">Recommended: {plane.duration} minutes</p>
        </div>
      )}
    </div>
  )
}

export function NishrutiClient() {
  const [activePlane, setActivePlane] = useState<number | null>(null)
  const [activeModule, setActiveModule] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-violet-950">
      {/* Hero */}
      <section className="relative px-4 py-24 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/5"
              style={{ width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
          ))}
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="text-6xl mb-6">🎧</div>
          <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-400/30 text-violet-300 text-sm px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 fill-violet-300" /> Online Course by Niaadim
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Nishruti<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-violet-400">Meditation</span>
          </h1>
          <p className="text-2xl text-violet-200 font-light mb-4">Transcending the Planes of Hearing</p>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            A sacred journey from outer sound to inner silence — through Shruti, Anusruti, and Nishruti — developed by spiritual teacher Niaadim from 20+ years of Vedic practice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BookingForm variant="modal" triggerButton={
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-4 text-lg rounded-2xl shadow-2xl shadow-amber-500/20">
                Enroll in Course →
              </Button>
            } />
            <Link href="#planes">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-2xl">
                Explore the Journey ↓
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto mt-12 text-center">
            {[["5", "Modules"], ["15–20", "Min/Day"], ["Lifetime", "Access"]].map(([v, l]) => (
              <div key={l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-amber-300">{v}</div>
                <div className="text-white/60 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Planes — Interactive */}
      <section id="planes" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">The Core Teaching</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-3">Three Planes of Hearing</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Click each plane to explore its meaning and try the guided practice timer.</p>
          </div>
          <div className="space-y-4">
            {PLANES.map((plane, i) => (
              <div key={i} className={`rounded-3xl border-2 overflow-hidden transition-all duration-300 ${activePlane === i ? "border-violet-300 shadow-xl" : "border-gray-100"}`}>
                <button
                  onClick={() => setActivePlane(activePlane === i ? null : i)}
                  className={`w-full flex items-center gap-5 p-6 text-left transition-colors ${activePlane === i ? "bg-violet-50" : "bg-white hover:bg-gray-50"}`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plane.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                    <span className="text-xl font-bold">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-bold text-gray-900">{plane.name}</span>
                      <span className="text-lg text-gray-400 font-light">{plane.skt}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{plane.sub}</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${activePlane === i ? "rotate-180" : ""}`} />
                </button>
                {activePlane === i && (
                  <div className="px-6 pb-6 bg-white">
                    <p className="text-gray-700 leading-relaxed mb-2">{plane.desc}</p>
                    <p className="text-sm font-semibold text-violet-700 mb-2 mt-4">🎯 Interactive Practice</p>
                    <PracticeTimer plane={plane} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-violet-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">Course Curriculum</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-3">5 Core Modules</h2>
            <p className="text-gray-600">Self-paced, 15–20 minutes per day. Suitable for beginners and advanced practitioners.</p>
          </div>
          <div className="space-y-3">
            {MODULES.map((mod, i) => (
              <div key={i} className={`rounded-2xl border overflow-hidden transition-all ${activeModule === i ? "border-violet-200 shadow-lg" : "border-gray-100 bg-white"}`}>
                <button
                  onClick={() => setActiveModule(activeModule === i ? null : i)}
                  className={`w-full flex items-center gap-4 p-5 text-left ${activeModule === i ? "bg-violet-50" : "bg-white hover:bg-gray-50"}`}
                >
                  <div className="text-2xl">{mod.icon}</div>
                  <div className="flex-1">
                    <span className="text-xs text-violet-500 font-bold uppercase tracking-wide">Module {mod.num}</span>
                    <div className="font-bold text-gray-900">{mod.title}</div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${activeModule === i ? "rotate-180" : ""}`} />
                </button>
                {activeModule === i && (
                  <div className="px-5 pb-5 bg-white">
                    <ul className="space-y-2">
                      {mod.subs.map((s, j) => (
                        <li key={j} className="flex items-center gap-2 text-gray-700 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">What You Gain</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">Benefits & Outcomes</h2>
              <div className="space-y-3">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-900 to-indigo-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Course Details</h3>
              {[
                ["Duration", "Self-paced, 4–6 weeks recommended"],
                ["Delivery", "100% Online — pre-recorded + PDF guides"],
                ["Modules", "5 Core + 2 Bonus modules"],
                ["Daily Practice", "15–20 minutes"],
                ["Access", "Lifetime + all future updates"],
                ["Language", "English (written guides available)"],
                ["Certificate", "Upon completing all modules"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 border-b border-white/10 text-sm">
                  <span className="text-white/60">{k}</span>
                  <span className="text-white font-medium text-right max-w-[60%]">{v}</span>
                </div>
              ))}
              <div className="mt-8">
                <BookingForm variant="modal" triggerButton={
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-xl">
                    Enroll Now — Begin Your Journey
                  </Button>
                } />
                <p className="text-white/50 text-xs text-center mt-3">Questions? WhatsApp +977-9709598727</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Students Share Their Journey</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-violet-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-3">{[...Array(t.stars)].map((_, j) => <span key={j} className="text-amber-400">★</span>)}</div>
                <p className="text-gray-700 text-sm italic leading-relaxed mb-4">"{t.text}"</p>
                <div className="text-sm font-bold text-gray-900">{t.name}</div>
                <div className="text-xs text-gray-500">{t.country}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-950 to-violet-950 text-white text-center">
        <div className="container mx-auto max-w-2xl">
          <div className="text-5xl mb-4">ॐ</div>
          <h2 className="text-4xl font-bold mb-4">Begin Your Nishruti Journey</h2>
          <p className="text-white/70 text-lg mb-8">
            "Experience the Silence Beyond Sound. Awaken the Inner Listener."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BookingForm variant="modal" triggerButton={
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-10 py-4 text-lg rounded-2xl">
                Enroll Now →
              </Button>
            } />
            <Link href="/h/resources">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-2xl">
                Free Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
