"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, Calendar, User, BookOpen, Clock, ArrowRight, Tag, Flame, Star, Filter, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type BlogCategory = "MEDITATION" | "ASTROLOGY" | "SPIRITUALITY" | "WELLNESS" | "MINDFULNESS" | "PERSONAL_GROWTH"

interface Blog {
  id: string
  title: string
  description: string
  content: string
  published: boolean
  category: BlogCategory | null
  tags: string[]
  banner: string | null
  createdAt: string
  updatedAt: string
  author: { name: string | null } | null
  authorId: string
}

const categories = [
  { id: "all", name: "All", emoji: "✨", color: "bg-slate-800 text-white" },
  { id: "MEDITATION", name: "Meditation", emoji: "🧘", color: "bg-indigo-700 text-white" },
  { id: "ASTROLOGY", name: "Astrology", emoji: "🔮", color: "bg-purple-700 text-white" },
  { id: "SPIRITUALITY", name: "Spirituality", emoji: "🌟", color: "bg-amber-700 text-white" },
  { id: "WELLNESS", name: "Wellness", emoji: "🌿", color: "bg-green-700 text-white" },
  { id: "MINDFULNESS", name: "Mindfulness", emoji: "🕯️", color: "bg-teal-700 text-white" },
  { id: "PERSONAL_GROWTH", name: "Growth", emoji: "🌱", color: "bg-emerald-700 text-white" },
]

const catColors: Record<string, string> = {
  MEDITATION: "bg-indigo-100 text-indigo-800 border-indigo-200",
  ASTROLOGY: "bg-purple-100 text-purple-800 border-purple-200",
  SPIRITUALITY: "bg-amber-100 text-amber-800 border-amber-200",
  WELLNESS: "bg-green-100 text-green-800 border-green-200",
  MINDFULNESS: "bg-teal-100 text-teal-800 border-teal-200",
  PERSONAL_GROWTH: "bg-emerald-100 text-emerald-800 border-emerald-200",
}

const catEmoji: Record<string, string> = {
  MEDITATION: "🧘", ASTROLOGY: "🔮", SPIRITUALITY: "🌟",
  WELLNESS: "🌿", MINDFULNESS: "🕯️", PERSONAL_GROWTH: "🌱",
}

function readingTime(content: string) {
  const words = content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0
  return Math.max(1, Math.ceil(words / 200))
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function stripHtml(html: string) {
  return html?.replace(/<[^>]*>/g, "") || ""
}

// Featured large card
function FeaturedCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/h/blog/${blog.id}`} className="group block">
      <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl">
        {blog.banner ? (
          <Image src={blog.banner} alt={blog.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="100vw" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-900 via-indigo-900 to-purple-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <Flame className="w-3 h-3" /> Featured
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          {blog.category && (
            <span className="text-xs text-amber-300 font-semibold uppercase tracking-widest mb-3 block">
              {catEmoji[blog.category]} {blog.category.replace("_", " ")}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight group-hover:text-amber-200 transition-colors">
            {blog.title}
          </h2>
          <p className="text-white/70 text-sm mb-4 line-clamp-2 max-w-2xl">{blog.description}</p>
          <div className="flex items-center gap-4 text-white/60 text-xs">
            <span className="flex items-center gap-1"><User className="w-3 h-3" />{blog.author?.name || "Niaadim"}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(blog.createdAt)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readingTime(blog.content)} min read</span>
            <span className="flex items-center gap-1 ml-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full transition-colors">
              Read Article <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Regular blog card
function BlogCard({ blog, featured = false }: { blog: Blog; featured?: boolean }) {
  return (
    <Link href={`/h/blog/${blog.id}`} className="group block h-full">
      <article className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
        <div className="relative overflow-hidden" style={{ height: featured ? "240px" : "200px" }}>
          {blog.banner ? (
            <Image src={blog.banner} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="50vw" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-indigo-100 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-primary-300" />
            </div>
          )}
          {blog.category && (
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${catColors[blog.category] || "bg-gray-100 text-gray-700"}`}>
                {catEmoji[blog.category]} {blog.category.replace("_", " ")}
              </span>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-snug group-hover:text-primary-700 transition-colors">
            {blog.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{blog.description}</p>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><User className="w-3 h-3" />{blog.author?.name || "Niaadim"}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readingTime(blog.content)} min</span>
            </div>
            <span className="text-primary-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Read <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// Small horizontal card for sidebar
function MiniCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/h/blog/${blog.id}`} className="group flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-primary-100">
        {blog.banner ? (
          <Image src={blog.banner} alt={blog.title} width={64} height={64} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><BookOpen className="w-6 h-6 text-primary-300" /></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-primary-700 leading-snug">{blog.title}</h4>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
          <Calendar className="w-3 h-3" />{formatDate(blog.createdAt)}
        </div>
      </div>
    </Link>
  )
}

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blog").then(r => r.json()).then(data => {
      setBlogs(Array.isArray(data) ? data : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => {
      const q = searchQuery.toLowerCase()
      const matchSearch = !searchQuery || b.title.toLowerCase().includes(q) || b.description?.toLowerCase().includes(q) || stripHtml(b.content).toLowerCase().includes(q)
      const matchCat = selectedCategory === "all" || b.category === selectedCategory
      return matchSearch && matchCat
    })
  }, [blogs, searchQuery, selectedCategory])

  const featuredPost = filteredBlogs[0]
  const restPosts = filteredBlogs.slice(1)
  const sidebarPosts = blogs.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-indigo-950 text-white py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 text-sm px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 fill-amber-300" /> Sacred Wisdom Journal
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Cosmic Insights &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400"> Ancient Wisdom</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Explore Vedic astrology, meditation practices, spiritual teachings, and transformational insights from Himalayan wisdom traditions.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id ? cat.color + " shadow-md scale-105" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{cat.emoji}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-6">Try different keywords or browse all categories</p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all") }} className="bg-primary-800 text-white hover:bg-primary-900">
              Show All Articles
            </Button>
          </div>
        ) : (
          <div className="flex gap-10">
            {/* Main Column */}
            <div className="flex-1 min-w-0">
              {/* Result Count */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-500 text-sm">
                  <span className="font-bold text-gray-900">{filteredBlogs.length}</span> articles {selectedCategory !== "all" ? `in ${selectedCategory.replace("_"," ")}` : ""}
                </p>
                {(searchQuery || selectedCategory !== "all") && (
                  <button onClick={() => { setSearchQuery(""); setSelectedCategory("all") }} className="text-primary-600 text-sm flex items-center gap-1 hover:text-primary-800">
                    <X className="w-3 h-3" /> Clear filters
                  </button>
                )}
              </div>

              {/* Featured Post */}
              {featuredPost && !searchQuery && (
                <div className="mb-10">
                  <FeaturedCard blog={featuredPost} />
                </div>
              )}

              {/* Grid */}
              {(searchQuery ? filteredBlogs : restPosts).length > 0 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {(searchQuery ? filteredBlogs : restPosts).map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Popular Posts */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" /> Recent Articles
                  </h3>
                  <div className="space-y-1">
                    {sidebarPosts.map(blog => <MiniCard key={blog.id} blog={blog} />)}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary-600" /> Browse Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.filter(c => c.id !== "all").map(cat => (
                      <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedCategory === cat.id ? "bg-primary-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-800"
                        }`}>
                        {cat.emoji} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-primary-900 to-indigo-900 rounded-2xl p-6 text-white text-center">
                  <div className="text-3xl mb-3">🔮</div>
                  <h3 className="font-bold text-lg mb-2">Get Your Reading</h3>
                  <p className="text-white/70 text-sm mb-4">Personalized Vedic astrology consultation from Niaadim</p>
                  <Link href="/h/appointment">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                      Book Session →
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
