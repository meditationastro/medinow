"use client"
import { useState, useEffect } from "react"
import { BookingForm } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import { Download, Music, FileText, Image as ImageIcon, Search, X, ExternalLink, Star } from "lucide-react"
import Link from "next/link"

interface Resource {
  id: string
  title: string
  description: string
  fileUrl: string
  fileType: string
  category: string
  downloadCount: number
  requiresEmail: boolean
  createdAt: string
}

const CATEGORIES = [
  { id: "all", label: "All Resources", emoji: "✨" },
  { id: "meditation", label: "Meditation", emoji: "🧘" },
  { id: "astrology", label: "Astrology", emoji: "🔮" },
  { id: "mantra", label: "Mantra & Sound", emoji: "🕉️" },
  { id: "general", label: "General", emoji: "📚" },
]

const FILE_ICONS: Record<string, { icon: typeof Download; color: string; label: string }> = {
  pdf: { icon: FileText, color: "text-red-500 bg-red-50", label: "PDF" },
  audio: { icon: Music, color: "text-purple-500 bg-purple-50", label: "Audio" },
  docx: { icon: FileText, color: "text-blue-500 bg-blue-50", label: "Document" },
  image: { icon: ImageIcon, color: "text-green-500 bg-green-50", label: "Image" },
  other: { icon: Download, color: "text-gray-500 bg-gray-50", label: "File" },
}

const SAMPLE_RESOURCES: Resource[] = [
  {
    id: "sample-1", title: "Introduction to Nishruti Meditation (PDF Guide)", description: "A comprehensive introduction to the three planes of hearing — Shruti, Anusruti, and Nishruti — with daily practice instructions.", fileUrl: "#", fileType: "pdf", category: "meditation", downloadCount: 342, requiresEmail: false, createdAt: new Date().toISOString()
  },
  {
    id: "sample-2", title: "Vedic Astrology Basics — Your Cosmic Blueprint", description: "Understanding your Lagna (Ascendant), Moon sign, and the 12 houses in your birth chart. A beginner's roadmap.", fileUrl: "#", fileType: "pdf", category: "astrology", downloadCount: 518, requiresEmail: false, createdAt: new Date().toISOString()
  },
  {
    id: "sample-3", title: "108 Sacred Mantras for Daily Practice", description: "A curated collection of 108 Vedic mantras organized by intention — peace, healing, abundance, and liberation — with Sanskrit text and pronunciation guide.", fileUrl: "#", fileType: "pdf", category: "mantra", downloadCount: 271, requiresEmail: false, createdAt: new Date().toISOString()
  },
  {
    id: "sample-4", title: "Guided Nirati Meditation (Audio)", description: "20-minute guided audio for Nirati — effortless presence meditation developed by Niaadim. Perfect for beginners.", fileUrl: "#", fileType: "audio", category: "meditation", downloadCount: 425, requiresEmail: true, createdAt: new Date().toISOString()
  },
  {
    id: "sample-5", title: "Your Vedic Path — Self-Discovery Workbook", description: "Exercises and reflections for exploring your dharma, karma, and life purpose through Vedic principles. 40-page workbook.", fileUrl: "#", fileType: "pdf", category: "astrology", downloadCount: 189, requiresEmail: true, createdAt: new Date().toISOString()
  },
  {
    id: "sample-6", title: "Sound Healing & Tibetan Bowl Tones", description: "Healing audio frequencies — C, D, E, F, G, A, B chakra bowl sounds for home practice. Use with headphones.", fileUrl: "#", fileType: "audio", category: "mantra", downloadCount: 632, requiresEmail: false, createdAt: new Date().toISOString()
  },
]

function ResourceCard({ resource }: { resource: Resource }) {
  const [emailInput, setEmailInput] = useState("")
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const typeInfo = FILE_ICONS[resource.fileType] || FILE_ICONS.other
  const Icon = typeInfo.icon

  async function handleDownload() {
    if (resource.requiresEmail && !downloaded) {
      setShowEmailForm(true)
      return
    }
    // Track download
    await fetch(`/api/resources/${resource.id}/download`, { method: "POST" }).catch(() => {})
    window.open(resource.fileUrl, "_blank")
    setDownloaded(true)
  }

  function handleEmailSubmit() {
    if (emailInput.includes("@")) {
      setShowEmailForm(false)
      setDownloaded(true)
      fetch(`/api/resources/${resource.id}/download`, { method: "POST" }).catch(() => {})
      window.open(resource.fileUrl, "_blank")
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all hover:border-primary-200 flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${typeInfo.color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium uppercase tracking-wide">{typeInfo.label}</span>
            {resource.requiresEmail && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Email required</span>}
          </div>
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1">{resource.title}</h3>
          <p className="text-gray-500 text-xs leading-relaxed">{resource.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
        <span className="text-xs text-gray-400">{resource.downloadCount} downloads</span>
        {showEmailForm ? (
          <div className="flex gap-2">
            <input type="email" placeholder="your@email.com" value={emailInput} onChange={e => setEmailInput(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 w-32 focus:outline-none focus:ring-1 focus:ring-primary-400" />
            <Button size="sm" onClick={handleEmailSubmit} className="bg-primary-800 text-white text-xs px-3 py-1.5 h-auto">Get it</Button>
          </div>
        ) : (
          <Button size="sm" onClick={handleDownload}
            className={`flex items-center gap-1.5 text-xs h-auto py-1.5 ${downloaded ? "bg-green-600 text-white" : "bg-primary-800 hover:bg-primary-900 text-white"}`}>
            {downloaded ? <><Star className="w-3 h-3" />Downloaded</> : <><Download className="w-3 h-3" />Download Free</>}
          </Button>
        )}
      </div>
    </div>
  )
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/resources")
      .then(r => r.json())
      .then(data => {
        setResources(Array.isArray(data) && data.length > 0 ? data : SAMPLE_RESOURCES)
        setLoading(false)
      })
      .catch(() => { setResources(SAMPLE_RESOURCES); setLoading(false) })
  }, [])

  const filtered = resources.filter(r => {
    const matchCat = category === "all" || r.category === category
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-indigo-900 to-violet-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-5xl mb-4">📥</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Spiritual Resources</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Download guided meditations, Vedic astrology guides, mantra collections, and sacred sound files — all free from MeditationAstro.
          </p>
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input type="text" placeholder="Search resources…" value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-sm" />
            {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50"><X className="w-4 h-4" /></button>}
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${category === cat.id ? "bg-primary-900 text-white border-primary-900 shadow-md" : "border-gray-200 text-gray-600 hover:border-primary-300"}`}>
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm"><span className="font-bold text-gray-900">{filtered.length}</span> resources</p>
          {(search || category !== "all") && (
            <button onClick={() => { setSearch(""); setCategory("all") }} className="text-primary-600 text-sm flex items-center gap-1"><X className="w-3 h-3" />Clear filters</button>
          )}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-44 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white">
            <div className="text-4xl mb-3">🔮</div>
            <h3 className="text-2xl font-bold mb-2">Personal Vedic Reading</h3>
            <p className="text-white/80 mb-5 text-sm">Beyond resources — get a personalized consultation based on your unique birth chart and life questions.</p>
            <BookingForm variant="modal" triggerButton={<Button className="bg-white hover:bg-white/90 text-amber-700 font-bold">Book Free Discovery Call</Button>} />
          </div>
          <div className="bg-gradient-to-br from-violet-800 to-indigo-900 rounded-3xl p-8 text-white">
            <div className="text-4xl mb-3">🎧</div>
            <h3 className="text-2xl font-bold mb-2">Nishruti Course</h3>
            <p className="text-white/80 mb-5 text-sm">Our full online meditation course — 5 modules, lifetime access, certificate upon completion.</p>
            <Link href="/h/nishruti-meditation">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">Explore Course →</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
