"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import "@/components/RichTextEditor.css"
// Define types from our schema
type BlogCategory = "MEDITATION" | "ASTROLOGY" | "SPIRITUALITY" | "WELLNESS" | "MINDFULNESS" | "PERSONAL_GROWTH"
type BlogTag = "BEGINNERS" | "ADVANCED" | "TECHNIQUES" | "PHILOSOPHY" | "PRACTICE" | "SCIENCE" | "HISTORY" | "LIFESTYLE" | "HEALING" | "ZODIAC" | "PLANETS" | "CHAKRAS"

interface Blog {
  id: string
  title: string
  description: string
  content: string
  published: boolean
  category: BlogCategory | null
  tags: BlogTag[]
  banner: string | null
  createdAt: string
  updatedAt: string
  author: {
    name: string | null
  } | null
  authorId: string
}

export default function BlogPost() {
  const params = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch blog post")
        }
        const data = await response.json()
        setBlog(data)
      } catch (err) {
        setError("Failed to load blog post")
        console.error("Error fetching blog post:", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchBlog()
    }
  }, [params.id])

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-primary-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-primary-800 mb-8">{error || "Blog post not found"}</p>
          <Link href="/h/blogs">
            <Button className="bg-primary-800 hover:bg-primary-900 text-primary-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
      {/* Blog Content */}
      <article className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link href="/h/blogs">
            <Button variant="ghost" className="mb-8 text-primary-800 hover:text-primary-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>

          {/* Banner Image */}
          <div className="w-full aspect-video rounded-xl overflow-hidden mb-12 bg-white/80 backdrop-blur-sm border border-primary-200">
            {blog.banner ? (
              <Image
                src={blog.banner}
                alt={blog.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-secondary-50 flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-secondary-300" />
              </div>
            )}
          </div>

          {/* Blog Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-primary-700 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{blog.author?.name || "Anonymous"}</span>
              </div>
              {blog.category && (
                <Badge variant="outline" className="text-sm border-primary-300 text-primary-700">
                  {blog.category.toLowerCase()}
                </Badge>
              )}
            </div>
            <p className="text-xl text-primary-800 leading-relaxed">{blog.description}</p>
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-6">
                <Tag className="w-4 h-4 text-secondary-600" />
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-sm bg-secondary-100 text-secondary-700 hover:bg-secondary-200">
                      {tag.toLowerCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg prose-primary mx-auto">
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="editor-content"
            />
          </div>
        </div>
      </article>
    </div>
  )
}
