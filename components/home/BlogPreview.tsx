"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen } from "lucide-react"

type Post = {
  id: string
  title: string
  description: string
  banner: string | null
  category: string
  createdAt: string
}

export function BlogPreview() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => setPosts(Array.isArray(d) ? d.slice(0, 3) : []))
      .catch(() => {})
  }, [])

  if (posts.length === 0) return null

  return (
    <section className="relative z-10 py-20 px-4 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-primary-900 mb-2">Sacred Wisdom Blog</h2>
            <p className="text-primary-700 text-lg">Insights on Vedic astrology, meditation, and conscious living</p>
          </div>
          <Link
            href="/h/blogs"
            className="flex items-center gap-2 text-primary-700 hover:text-primary-900 font-semibold transition-colors"
          >
            View All Posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/h/blog/${post.id}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden border border-primary-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="relative h-48 bg-primary-100">
                  {post.banner ? (
                    <Image
                      src={post.banner}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-primary-300" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.category.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-primary-600 text-sm leading-relaxed flex-1 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary-700 text-sm font-semibold">
                    Read More <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
