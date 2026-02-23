"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Plus, Minus, CheckCircle, ArrowRight } from "lucide-react"

const MANTRAS = [
  {
    goal: "Peace & Calm", emoji: "🕊️", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50 border-blue-200",
    mantras: [
      { name: "Om Shanti", skt: "ॐ शान्तिः शान्तिः शान्तिः", meaning: "Om — Peace in body, mind, and spirit", count: 108, how: "Slow, rhythmic. One breath per repetition." },
      { name: "Mahamrityunjaya", skt: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्", meaning: "We worship the three-eyed Lord — healer of suffering, liberator from death.", count: 27, how: "Deep and steady, especially at sunrise." },
    ],
    plan: ["Day 1–2: 5 min breath meditation + 27 japa", "Day 3–4: 10 min + 54 japa at sunset", "Day 5–7: Full 108 japa + 15 min silence after"]
  },
  {
    goal: "Focus & Wisdom", emoji: "🎯", color: "from-amber-500 to-yellow-600", bg: "bg-amber-50 border-amber-200",
    mantras: [
      { name: "Gayatri Mantra", skt: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्", meaning: "May the divine light of the sun illuminate our intellect and inspire us toward righteousness.", count: 108, how: "Morning, facing East. Clear pronunciation." },
      { name: "Saraswati Mantra", skt: "ॐ ऐं सरस्वत्यै नमः", meaning: "Salutations to Saraswati — goddess of wisdom, art, and knowledge.", count: 108, how: "Before study, work, or creative practice." },
    ],
    plan: ["Morning routine: Gayatri 27x before breakfast", "Before any study session: Saraswati 21x", "Weekly: Full 108 Gayatri with sankalpa"]
  },
  {
    goal: "Healing & Protection", emoji: "🛡️", color: "from-rose-500 to-red-600", bg: "bg-rose-50 border-rose-200",
    mantras: [
      { name: "Durga Mantra", skt: "ॐ दुं दुर्गायै नमः", meaning: "Salutations to Durga — remover of difficulties, protector of devotees.", count: 108, how: "Tuesdays and Saturdays are especially powerful." },
      { name: "Hanuman Mantra", skt: "ॐ हनुमते नमः", meaning: "Salutations to Hanuman — strength, courage, and unwavering devotion.", count: 108, how: "Recite with full breath and steady mind." },
    ],
    plan: ["Light a candle or incense before starting", "Tuesday/Saturday: Full 108 with devotion", "Daily: 21 repetitions as morning protection"]
  },
  {
    goal: "Abundance & Prosperity", emoji: "✨", color: "from-emerald-500 to-green-600", bg: "bg-emerald-50 border-emerald-200",
    mantras: [
      { name: "Lakshmi Mantra", skt: "ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः", meaning: "Invocation of Sri Lakshmi — goddess of wealth, fortune, and divine grace.", count: 108, how: "Friday mornings, ideally with flowers and ghee lamp." },
      { name: "Ganesha Mantra", skt: "ॐ गं गणपतये नमः", meaning: "Salutations to Ganesha — remover of obstacles, lord of new beginnings.", count: 108, how: "Before any new endeavor or important day." },
    ],
    plan: ["Friday mornings: Lakshmi 108x + offering", "New venture/week: Ganesha 21x with intention", "Monthly: Full Lakshmi sadhana — 40 days"]
  },
  {
    goal: "Liberation & Self-Discovery", emoji: "🔱", color: "from-violet-600 to-purple-800", bg: "bg-violet-50 border-violet-200",
    mantras: [
      { name: "So'Ham — I Am That", skt: "सोऽहम् / सोऽहम्", meaning: "'So' on the inhale (I am that), 'Ham' on the exhale (I am). The breath itself is the mantra.", count: 108, how: "Synchronized with breath. Natural, effortless rhythm." },
      { name: "Om Namah Shivaya", skt: "ॐ नमः शिवाय", meaning: "Salutations to Shiva — the auspicious, the destroyer of ego, the cosmic consciousness.", count: 108, how: "Steady and meditative. Can be silent or whispered." },
    ],
    plan: ["Morning: 10 min So'Ham breath meditation", "Evening: 108 Om Namah Shivaya with mala", "Daily: Hold one question — 'Who am I?' — in silence after"]
  },
]

function MantraTimer({ count, mantraName }: { count: number; mantraName: string }) {
  const [target, setTarget] = useState(count)
  const [current, setCurrent] = useState(0)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const JAPA_DURATION = 8000 // ms per bead

  useEffect(() => {
    if (running && !done) {
      intervalRef.current = setInterval(() => {
        setCurrent(c => {
          if (c >= target - 1) { setDone(true); setRunning(false); return target }
          return c + 1
        })
      }, JAPA_DURATION)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, done, target])

  function reset() { setCurrent(0); setDone(false); setRunning(false) }
  const pct = (current / target) * 100

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-4 mb-2">
        <Button size="sm" variant="outline" onClick={() => setTarget(t => Math.max(1, t - 27))}><Minus className="w-3 h-3" /></Button>
        <span className="font-mono text-xl font-bold text-gray-800">{target} japa</span>
        <Button size="sm" variant="outline" onClick={() => setTarget(t => Math.min(1080, t + 27))}><Plus className="w-3 h-3" /></Button>
      </div>
      <div className="relative w-40 h-40 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="#8b5cf6" strokeWidth="6"
            strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - pct / 100)}`}
            className="transition-all duration-500" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {done ? (
            <><CheckCircle className="w-8 h-8 text-green-500" /><div className="text-xs font-bold text-green-600">Done 🙏</div></>
          ) : (
            <><div className="text-3xl font-bold font-mono text-gray-800">{current}</div><div className="text-xs text-gray-400">of {target}</div></>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {!done ? (
          <Button onClick={() => setRunning(r => !r)} className="bg-violet-600 hover:bg-violet-700 text-white">
            {running ? <><Pause className="w-4 h-4 mr-1" />Pause</> : <><Play className="w-4 h-4 mr-1" />Start Japa</>}
          </Button>
        ) : null}
        <Button onClick={reset} variant="outline" size="icon"><RotateCcw className="w-4 h-4" /></Button>
      </div>
      {running && <p className="text-xs text-gray-400 animate-pulse">Reciting {mantraName}… each bead ~8 seconds</p>}
    </div>
  )
}

export default function MantraPage() {
  const [selected, setSelected] = useState(0)
  const [selectedMantra, setSelectedMantra] = useState(0)
  const m = MANTRAS[selected]
  const mantra = m.mantras[selectedMantra] || m.mantras[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-violet-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 text-white py-20 px-4 text-center">
        <div className="text-6xl mb-4">🕉️</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Sacred Mantra Practice</h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto mb-6">
          Ancient Vedic mantras with Sanskrit text, meaning, interactive japa counter, and personalized 7-day practice plans.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {MANTRAS.map((m, i) => (
            <button key={i} onClick={() => { setSelected(i); setSelectedMantra(0) }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${selected === i ? "bg-amber-500 text-black border-amber-500" : "border-white/30 text-white hover:bg-white/10"}`}>
              {m.emoji} {m.goal}
            </button>
          ))}
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — Mantra Selection */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-bold text-gray-900 text-lg">{m.emoji} {m.goal}</h2>
            {m.mantras.map((ma, i) => (
              <button key={i} onClick={() => setSelectedMantra(i)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${selectedMantra === i ? "border-violet-400 bg-violet-50 shadow-md" : "border-gray-100 bg-white hover:border-violet-200"}`}>
                <div className="font-bold text-gray-900 text-sm mb-1">{ma.name}</div>
                <div className="text-2xl text-gray-700 font-light leading-relaxed mb-2">{ma.skt.slice(0, 30)}…</div>
                <div className="text-xs text-gray-500">Recommended: {ma.count} repetitions</div>
              </button>
            ))}

            {/* 7-Day Plan */}
            <div className={`rounded-2xl border p-5 ${m.bg}`}>
              <h3 className="font-bold text-gray-900 mb-3 text-sm">📅 Practice Plan</h3>
              <ul className="space-y-2">
                {m.plan.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Mantra Detail & Timer */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-6">
              {/* Sanskrit Display */}
              <div className={`bg-gradient-to-br ${m.color} rounded-2xl p-6 mb-6 text-center text-white`}>
                <p className="text-3xl md:text-4xl font-light leading-relaxed tracking-wide mb-3">{mantra.skt}</p>
                <p className="text-sm text-white/80 font-semibold">{mantra.name}</p>
              </div>

              {/* Meaning */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Meaning</h3>
                <p className="text-gray-700 leading-relaxed italic">"{mantra.meaning}"</p>
              </div>

              {/* How to Practice */}
              <div className={`rounded-xl border p-4 mb-6 ${m.bg}`}>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">How to Practice</h3>
                <p className="text-gray-700 text-sm">{mantra.how}</p>
              </div>

              {/* Timer */}
              <div className={`rounded-2xl border p-6 ${m.bg}`}>
                <h3 className="font-bold text-gray-900 text-center mb-4">🙏 Japa Counter</h3>
                <MantraTimer count={mantra.count} mantraName={mantra.name} />
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6 mb-6">
              <h3 className="font-bold text-amber-900 mb-4">Sacred Practice Tips</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {["Sit in a clean, dedicated space", "Use a mala (rosary) of 108 beads", "Keep eyes closed, spine straight", "Set a fixed time daily — consistency matters", "Whisper or mental recitation are both valid", "Complete your count without interruption"].map((tip, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-amber-800">
                    <span className="text-amber-500">◆</span> {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-violet-900 to-indigo-900 rounded-2xl p-6 text-white text-center">
              <p className="font-bold text-lg mb-2">Want a personalized mantra prescription?</p>
              <p className="text-white/70 text-sm mb-4">Based on your Vedic birth chart, Niaadim selects the exact mantra for your planetary period.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <BookingForm variant="modal" triggerButton={<Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">Get My Mantra Reading</Button>} />
                <Link href="/h/nishruti-meditation">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">Nishruti Course →</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
