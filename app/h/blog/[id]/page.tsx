"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, BookOpen, MessageCircle, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import "@/components/RichTextEditor.css"

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

const catColors: Record<string, string> = {
  MEDITATION: "bg-indigo-100 text-indigo-800",
  ASTROLOGY: "bg-purple-100 text-purple-800",
  SPIRITUALITY: "bg-amber-100 text-amber-800",
  WELLNESS: "bg-green-100 text-green-800",
  MINDFULNESS: "bg-teal-100 text-teal-800",
  PERSONAL_GROWTH: "bg-emerald-100 text-emerald-800",
}

const catEmoji: Record<string, string> = {
  MEDITATION: "🧘", ASTROLOGY: "🔮", SPIRITUALITY: "🌟",
  WELLNESS: "🌿", MINDFULNESS: "🕯️", PERSONAL_GROWTH: "🌱",
}

function readingTime(content: string) {
  const words = content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0
  return Math.max(1, Math.ceil(words / 200))
}

export default function BlogPost() {
  const params = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [related, setRelated] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!params.id) return
    fetch(`/api/blog/${params.id}`).then(r => {
      if (!r.ok) throw new Error("Not found")
      return r.json()
    }).then(data => {
      setBlog(data)
      setIsLoading(false)
      // Fetch related
      fetch("/api/blog").then(r => r.json()).then(all => {
        setRelated(
          (Array.isArray(all) ? all : []).filter((b: Blog) => b.id !== data.id && b.category === data.category).slice(0, 3)
        )
      }).catch(() => {})
    }).catch(() => {
      setError("Failed to load blog post")
      setIsLoading(false)
    })
  }, [params.id])

  function shareArticle() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-800 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
          <p className="text-gray-500 mb-6">This article may have been moved or deleted.</p>
          <Link href="/h/blogs" className="inline-flex items-center gap-2 bg-primary-800 text-white px-6 py-3 rounded-xl hover:bg-primary-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const readTime = readingTime(blog.content)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[480px] md:h-[560px] overflow-hidden">
        {blog.banner ? (
          <Image src={blog.banner} alt={blog.title} fill className="object-cover" priority sizes="100vw" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-900 via-indigo-900 to-purple-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link href="/h/blogs" className="flex items-center gap-2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-xl transition-all text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-xs mb-4">
            <Link href="/h" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/h/blogs" className="hover:text-white">Blog</Link>
            {blog.category && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/70">{blog.category.replace("_"," ")}</span>
              </>
            )}
          </div>

          {blog.category && (
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ${catColors[blog.category] || "bg-white/20 text-white"}`}>
              {catEmoji[blog.category]} {blog.category.replace("_", " ")}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{blog.title}</h1>
          <p className="text-white/70 text-base md:text-lg mb-6 max-w-2xl">{blog.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1.5">
              <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              {blog.author?.name || "Niaadim"}
            </span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{readTime} min read</span>
            <button onClick={shareArticle} className="flex items-center gap-1.5 ml-auto bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-white text-xs font-medium transition-colors">
              <Share2 className="w-3.5 h-3.5" /> {copied ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex gap-12">
          {/* Main Article */}
          <article className="flex-1 min-w-0">
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs text-primary-700 bg-primary-50 border border-primary-200 px-3 py-1.5 rounded-full">
                    <Tag className="w-3 h-3" />#{tag.toLowerCase()}
                  </span>
                ))}
              </div>
            )}

            {/* Article Body */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-primary-700 prose-a:underline
                  prose-ul:list-disc prose-ul:pl-6
                  prose-li:text-gray-700 prose-li:mb-1
                  prose-strong:text-gray-900
                  prose-blockquote:border-l-4 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                  prose-img:rounded-2xl prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Author Box */}
            <div className="mt-10 bg-gradient-to-br from-primary-900 to-indigo-900 rounded-3xl p-8 text-white">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                  {(blog.author?.name || "N")[0]}
                </div>
                <div>
                  <div className="text-xs text-amber-300 uppercase tracking-widest mb-1">About the Author</div>
                  <h3 className="text-xl font-bold mb-2">{blog.author?.name || "Niaadim"}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    Vedic astrologer, meditation teacher, and spiritual guide with 20+ years of study in Jyotish, Nishruti meditation, and Himalayan wisdom traditions. Based in Nepal, serving seekers worldwide.
                  </p>
                  <a href="https://wa.me/9779709598727?text=I%20read%20your%20article%20and%20would%20love%20to%20connect!" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                    <MessageCircle className="w-4 h-4" /> Book a Consultation
                  </a>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {related.map(r => (
                    <Link key={r.id} href={`/h/blog/${r.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all">
                      <div className="relative h-36">
                        {r.banner ? (
                          <Image src={r.banner} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-indigo-100 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-primary-300" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-sm text-gray-800 line-clamp-2 group-hover:text-primary-700">{r.title}</h4>
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />{readingTime(r.content)} min
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden xl:block w-72 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Quick CTA */}
              <div className="bg-gradient-to-br from-primary-900 to-indigo-900 rounded-2xl p-6 text-white text-center">
                <div className="text-4xl mb-3">🔮</div>
                <h3 className="font-bold text-lg mb-2">Personal Reading</h3>
                <p className="text-white/70 text-sm mb-4">Discover what the stars reveal about your path</p>
                <Link href="/h/appointment">
                  <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-3 rounded-xl transition-colors text-sm">
                    Book Your Session →
                  </button>
                </Link>
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/9779709598727" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl transition-colors">
                <MessageCircle className="w-8 h-8 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm">Chat on WhatsApp</div>
                  <div className="text-white/80 text-xs">+977-9709598727</div>
                </div>
              </a>

              {/* Share */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Share This Article</h3>
                <button onClick={shareArticle} className="w-full flex items-center justify-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-800 px-4 py-3 rounded-xl transition-colors text-sm font-medium">
                  <Share2 className="w-4 h-4" /> {copied ? "Link Copied! ✓" : "Copy Link"}
                </button>
              </div>

              {/* Back to Blog */}
              <Link href="/h/blogs" className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-primary-300 text-gray-700 hover:text-primary-700 px-4 py-3 rounded-xl transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> All Articles
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
