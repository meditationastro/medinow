"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Bell, Volume2, ChevronRight } from "lucide-react"

const SESSIONS = [
  { name: "Nirati Presence", duration: 5, desc: "Effortless attention on breath and body sensations without judgment.", instructions: ["Find a comfortable seated position", "Close your eyes softly", "Let your breath become natural", "Simply observe — breath, body, sounds", "When thoughts arise, gently return to breath"], color: "from-green-500 to-teal-600", emoji: "🌿" },
  { name: "Nishruti Listening", duration: 10, desc: "Tune into inner sounds — heartbeat, breath, the space between thoughts.", instructions: ["Settle into stillness", "Hear outer sounds without naming them", "Follow sounds inward toward the heartbeat", "Listen for the silence between sounds", "Rest in the soundless awareness itself"], color: "from-indigo-500 to-violet-600", emoji: "🎧" },
  { name: "Nispaersh Release", duration: 8, desc: "Letting go of thoughts, tensions, and emotional weights through breath.", instructions: ["Breathe in through the nose for 4 counts", "Hold gently for 4 counts", "Release through the mouth for 6 counts", "With each exhale, let something go", "Feel mental clarity growing"], color: "from-rose-500 to-pink-600", emoji: "🍃" },
  { name: "Metta Loving-Kindness", duration: 15, desc: "Cultivate compassion — for self, loved ones, and all beings.", instructions: ["Begin with your own heart", "Silently: 'May I be peaceful. May I be well.'", "Expand to loved ones — same wish", "Expand to neutral beings", "Expand to all beings everywhere"], color: "from-amber-500 to-orange-600", emoji: "💛" },
  { name: "Deep Silence", duration: 20, desc: "Simply be. No technique. Pure open awareness — the Nishruti state.", instructions: ["Sit in any comfortable position", "No agenda, no goal", "When thoughts arise — notice, release", "Rest as the silent witness", "This is enough. You are enough."], color: "from-violet-600 to-purple-800", emoji: "ॐ" },
]

const BREATHING_PATTERNS = [
  { name: "Box Breathing", inhale: 4, hold1: 4, exhale: 4, hold2: 4, color: "text-blue-500" },
  { name: "4-7-8 Calm", inhale: 4, hold1: 7, exhale: 8, hold2: 0, color: "text-green-500" },
  { name: "Pranayama", inhale: 6, hold1: 6, exhale: 6, hold2: 0, color: "text-amber-500" },
]

function BreathingAnimation({ phase, progress }: { phase: string; progress: number }) {
  const isExpanding = phase === "inhale"
  const size = isExpanding ? 200 : phase === "exhale" ? 80 : 140
  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto">
      {[1, 2, 3].map(i => (
        <div key={i} className="absolute rounded-full border border-violet-400/20 transition-all duration-1000"
          style={{ width: `${size + i * 20}px`, height: `${size + i * 20}px`, opacity: 0.3 + (progress / 100) * 0.4 }} />
      ))}
      <div
        className="rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-2xl shadow-violet-500/30 transition-all duration-1000"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <div className="text-center">
          <div className="text-sm uppercase tracking-wide opacity-80">{phase === "hold1" || phase === "hold2" ? "hold" : phase}</div>
          <div className="text-3xl font-bold">{Math.ceil(progress / 100 * (phase === "inhale" ? 4 : phase === "exhale" ? 4 : 4))}</div>
        </div>
      </div>
    </div>
  )
}

function MeditationTimer({ session }: { session: typeof SESSIONS[0] }) {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [done, setDone] = useState(false)
  const total = session.duration * 60
  const progress = (elapsed / total) * 100

  useEffect(() => {
    let t: NodeJS.Timeout
    if (running && !done) {
      t = setInterval(() => {
        setElapsed(e => {
          if (e >= total - 1) { setDone(true); setRunning(false); return total }
          return e + 1
        })
      }, 1000)
    }
    return () => clearInterval(t)
  }, [running, done, total])

  function reset() { setRunning(false); setElapsed(0); setDone(false) }
  const remaining = total - elapsed
  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60

  return (
    <div className="space-y-6">
      {/* Circular progress */}
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad)" strokeWidth="4"
            strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-1000" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {done ? (
            <div className="text-center"><div className="text-3xl">🙏</div><div className="text-sm font-medium text-green-600">Complete</div></div>
          ) : (
            <>
              <div className="text-3xl font-mono font-bold text-gray-800">
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </div>
              <div className="text-xs text-gray-400">remaining</div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <Button onClick={() => setRunning(r => !r)} disabled={done}
          className={`bg-gradient-to-r ${session.color} text-white px-6 rounded-xl`}>
          {running ? <><Pause className="w-4 h-4 mr-2" />Pause</> : <><Play className="w-4 h-4 mr-2" />Begin</>}
        </Button>
        <Button onClick={reset} variant="outline" size="icon" className="rounded-xl"><RotateCcw className="w-4 h-4" /></Button>
      </div>
    </div>
  )
}

export default function MeditationPage() {
  const [selectedSession, setSelectedSession] = useState(0)
  const [selectedBreath, setSelectedBreath] = useState(0)
  const [breathRunning, setBreathRunning] = useState(false)
  const [breathPhase, setBreathPhase] = useState("idle")
  const [breathProgress, setBreathProgress] = useState(0)
  const breathRef = useRef<NodeJS.Timeout | null>(null)

  const pattern = BREATHING_PATTERNS[selectedBreath]

  function stopBreath() {
    setBreathRunning(false); setBreathPhase("idle"); setBreathProgress(0)
    if (breathRef.current) clearTimeout(breathRef.current)
  }

  function runBreathCycle() {
    const phases = [
      { phase: "inhale", dur: pattern.inhale },
      { phase: "hold1", dur: pattern.hold1 },
      { phase: "exhale", dur: pattern.exhale },
      ...(pattern.hold2 > 0 ? [{ phase: "hold2", dur: pattern.hold2 }] : [])
    ]
    let pi = 0
    function next() {
      if (!breathRunning) return
      const { phase, dur } = phases[pi]
      setBreathPhase(phase)
      let tick = 0
      const total = dur * 10
      const t = setInterval(() => {
        tick++
        setBreathProgress((tick / total) * 100)
        if (tick >= total) {
          clearInterval(t)
          pi = (pi + 1) % phases.length
          breathRef.current = setTimeout(next, 100)
        }
      }, 100)
    }
    next()
  }

  useEffect(() => {
    if (breathRunning) runBreathCycle()
    else stopBreath()
    return () => { if (breathRef.current) clearTimeout(breathRef.current) }
  }, [breathRunning, selectedBreath])

  const session = SESSIONS[selectedSession]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-violet-950">
      {/* Header */}
      <section className="py-16 px-4 text-center text-white">
        <div className="text-5xl mb-4">🧘</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Interactive Meditation Studio</h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto">
          Choose your practice. Set your intention. Begin your Nishruti journey.
        </p>
      </section>

      <div className="container mx-auto max-w-6xl px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Session Selector */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-white font-bold text-lg mb-4">Choose Practice</h2>
            {SESSIONS.map((s, i) => (
              <button key={i} onClick={() => setSelectedSession(i)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${selectedSession === i ? "bg-white text-gray-900 border-white shadow-lg" : "bg-white/10 text-white border-white/20 hover:bg-white/20"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.emoji}</span>
                  <div>
                    <div className="font-semibold text-sm">{s.name}</div>
                    <div className={`text-xs ${selectedSession === i ? "text-gray-500" : "text-white/60"}`}>{s.duration} min</div>
                  </div>
                  {selectedSession === i && <ChevronRight className="w-4 h-4 ml-auto text-violet-600" />}
                </div>
              </button>
            ))}
          </div>

          {/* Timer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{session.emoji}</div>
                <h2 className="text-2xl font-bold text-gray-900">{session.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{session.desc}</p>
              </div>
              <MeditationTimer session={session} />
              <div className="mt-8 bg-gray-50 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Practice Guide</h3>
                <ol className="space-y-2">
                  {session.instructions.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Breathing Exercise */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">🌬️ Breathing Exercise</h2>
              <p className="text-gray-500 text-sm mb-5">Prepare your body and mind before meditation</p>
              <div className="flex gap-2 mb-6 flex-wrap">
                {BREATHING_PATTERNS.map((p, i) => (
                  <button key={i} onClick={() => { setSelectedBreath(i); setBreathRunning(false) }}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all border ${selectedBreath === i ? "bg-violet-600 text-white border-violet-600" : "border-gray-200 text-gray-600 hover:border-violet-300"}`}>
                    {p.name}
                  </button>
                ))}
              </div>
              <BreathingAnimation phase={breathPhase} progress={breathProgress} />
              <div className="text-center mt-4 text-xs text-gray-400 mb-4">
                {pattern.inhale}s inhale · {pattern.hold1}s hold · {pattern.exhale}s exhale{pattern.hold2 > 0 ? ` · ${pattern.hold2}s hold` : ""}
              </div>
              <div className="flex justify-center">
                <Button onClick={() => setBreathRunning(r => !r)}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-8 rounded-xl">
                  {breathRunning ? <><Pause className="w-4 h-4 mr-2" />Stop</> : <><Play className="w-4 h-4 mr-2" />Start Breathing</>}
                </Button>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-violet-900 to-indigo-900 rounded-3xl p-8 text-white text-center mt-6">
              <p className="text-lg font-bold mb-2">Ready to go deeper?</p>
              <p className="text-white/70 text-sm mb-5">Enroll in the full Nishruti Meditation course — 5 modules, lifetime access.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/h/nishruti-meditation">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">Nishruti Course →</Button>
                </Link>
                <BookingForm variant="modal" triggerButton={<Button variant="outline" className="border-white/30 text-white hover:bg-white/10">Book Live Session</Button>} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
