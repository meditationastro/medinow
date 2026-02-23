"use client"

import { useState, useEffect } from "react"
import {
  Sparkles,
  Search,
  Calendar,
  User,
  Tag,
 
  BookOpen,
  ImageIcon
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Define types
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

// Blog categories from our enum
const categories = [
  { id: "all", name: "All Posts" },
  { id: "MEDITATION", name: "Meditation" },
  { id: "ASTROLOGY", name: "Astrology" },
  { id: "SPIRITUALITY", name: "Spirituality" },
  { id: "WELLNESS", name: "Wellness" },
  { id: "MINDFULNESS", name: "Mindfulness" },
  { id: "PERSONAL_GROWTH", name: "Personal Growth" },
]

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog")
        if (!response.ok) throw new Error("Failed to fetch blogs")
        const data = await response.json()
        setBlogs(data)
        setFilteredBlogs(data)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      }
    }

    fetchBlogs()
  }, [])

  // Filter blogs based on search query and category
  useEffect(() => {
    const filtered = blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.tags && blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

      const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    setFilteredBlogs(filtered)
  }, [searchQuery, selectedCategory, blogs])

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
      {/* Hero Section */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-r from-primary-100/50 to-secondary-100/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <BookOpen className="w-16 h-16 text-primary-600" />
                <Sparkles className="w-6 h-6 text-primary-500 absolute -top-2 -right-2" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
              Cosmic Insights & Wisdom
            </h1>
            <p className="text-xl text-primary-800 mb-8 max-w-3xl mx-auto">
              Explore our collection of articles on astrology, meditation, spiritual growth, and ancient Vedic wisdom to
              guide your journey toward self-discovery and enlightenment.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-primary-500" />
              </div>
              <input
                type="text"
                placeholder="Search for articles..."
                className="w-full pl-10 pr-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Content */}
      <section className="relative z-10 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white/80 backdrop-blur-sm border border-primary-200 rounded-lg p-6 sticky top-28">
                <h3 className="text-xl font-bold text-primary-900 mb-6">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
                          selectedCategory === category.id
                            ? "bg-primary-100 text-primary-900 font-medium"
                            : "text-primary-700 hover:bg-primary-50"
                        }`}
                      >
                        <span>{category.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                {/* <div className="mt-8 pt-6 border-t border-primary-200">
                  <h3 className="text-lg font-bold text-primary-900 mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary-100 text-primary-800 hover:bg-primary-200 cursor-pointer">advanced</Badge>
                    <Badge className="bg-primary-100 text-primary-800 hover:bg-primary-200 cursor-pointer">astrology</Badge>
                    <Badge className="bg-primary-100 text-primary-800 hover:bg-primary-200 cursor-pointer">
                      planetary transits
                    </Badge>
                    <Badge className="bg-primary-100 text-primary-800 hover:bg-primary-200 cursor-pointer">
                      spiritual growth
                    </Badge>
                    <Badge className="bg-primary-100 text-primary-800 hover:bg-primary-200 cursor-pointer">chakras</Badge>
                    <Badge className="bg-primary-100 text-primary-800 hover:bg-primary-200 cursor-pointer">
                      vedic wisdom
                    </Badge>
                  </div>
                </div> */}

                {/* <div className="mt-8 pt-6 border-t border-primary-200">
                  <h3 className="text-lg font-bold text-primary-900 mb-4">Subscribe</h3>
                  <p className="text-primary-800 text-sm mb-4">
                    Get the latest articles and insights delivered straight to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-3 py-2 border border-primary-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    />
                    <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">Subscribe</Button>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Mobile Category Filter */}
            <div className="lg:hidden mb-6">
              <Button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="w-full bg-white border border-primary-200 text-primary-900 hover:bg-primary-50"
              >
                <Tag className="w-4 h-4 mr-2" />
                Filter by Category
              </Button>

              {isMobileFilterOpen && (
                <div className="mt-4 bg-white/90 backdrop-blur-sm border border-primary-200 rounded-lg p-4">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategory === category.id
                            ? "bg-primary-500 text-white"
                            : "bg-primary-100 text-primary-800 hover:bg-primary-200"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Blog Posts Grid */}
            <div className="flex-1">
              {/* Results Info */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-primary-800">
                  Showing <span className="font-semibold">{filteredBlogs.length}</span> articles
                </p>
              </div>

              {/* Blog Posts */}
              {filteredBlogs.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredBlogs.map((blog) => (
                    <Card
                      key={blog.id}
                      className="bg-white/80 backdrop-blur-sm border-primary-200 hover:shadow-xl transition-all duration-500 overflow-hidden group pt-0 gap-2"
                    >
                      <div className="relative w-full aspect-video">
                        {blog.banner ? (
                          <Image
                            src={blog.banner}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary-50 flex items-center justify-center">
                            <ImageIcon className="w-10 h-10 text-primary-200" />
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center text-sm text-primary-700 mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(blog.createdAt)}</span>
                          {blog.category && (
                            <>
                              <span className="mx-2">•</span>
                              <Badge variant="outline" className="text-xs">
                                {blog.category.toLowerCase()}
                              </Badge>
                            </>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-primary-900 line-clamp-2 group-hover:text-primary-700 transition-colors">
                          {blog.title}
                        </h3>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-primary-800 line-clamp-3">{blog.description}</p>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {blog.tags.map((tag, index) => (
                              <span key={index} className="text-xs text-primary-700 bg-primary-50 px-2 py-1 rounded-full">
                                #{tag.toLowerCase()}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                            <User className="w-4 h-4 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-primary-900">{blog.author?.name || "Anonymous"}</p>
                          </div>
                        </div>
                        <Link href={`/h/blog/${blog.id}`}>
                          <Button size="sm" className="bg-gradient-to-r from-blue-800 to-amber-600 hover:bg-primary-700 text-white">
                            Read More
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">No Articles Found</h3>
                  <p className="text-primary-800">
                    We couldn&apos;t find any articles matching your search. Try different keywords or browse categories.
                  </p>
                  <Button
                    className="mt-4 bg-primary-600 hover:bg-primary-700 text-white"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="relative z-10 py-16 px-4 bg-gradient-to-r from-primary-100/50 to-secondary-100/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm border border-primary-200 rounded-xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Mail className="w-12 h-12 text-primary-600" />
                  <Sparkles className="w-5 h-5 text-primary-500 absolute -top-2 -right-2" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-primary-900 mb-2">Subscribe to Our Newsletter</h2>
              <p className="text-primary-800 max-w-2xl mx-auto">
                Stay updated with our latest articles, spiritual insights, and exclusive content delivered directly to
                your inbox.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              />
              <Button className="bg-primary-600 hover:bg-primary-700 text-white px-6">Subscribe</Button>
            </div>
            <p className="text-center text-primary-700 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section> */}

    
    </div>
  )
}
