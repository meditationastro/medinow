"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { toast } from "sonner"
import { RichTextEditor } from "@/components/RichTextEditor"
import type { BlogCategory as PrismaBlogCategory, BlogTag as PrismaBlogTag } from "@prisma/client"

interface Blog {
  id: string
  title: string
  description: string
  banner: string | null
  content: string
  published: boolean
  category: PrismaBlogCategory
  tags: PrismaBlogTag[]
  createdAt: string
  updatedAt: string
}

// Use the same enum values as defined in Prisma schema
enum BlogCategory {
  MEDITATION = "MEDITATION",
  ASTROLOGY = "ASTROLOGY",
  SPIRITUALITY = "SPIRITUALITY",
  WELLNESS = "WELLNESS",
  MINDFULNESS = "MINDFULNESS",
  PERSONAL_GROWTH = "PERSONAL_GROWTH"
}

enum BlogTag {
  BEGINNERS = "BEGINNERS",
  ADVANCED = "ADVANCED",
  TECHNIQUES = "TECHNIQUES",
  PHILOSOPHY = "PHILOSOPHY",
  PRACTICE = "PRACTICE",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  LIFESTYLE = "LIFESTYLE",
  HEALING = "HEALING",
  ZODIAC = "ZODIAC",
  PLANETS = "PLANETS",
  CHAKRAS = "CHAKRAS"
}

export default function EditBlogPage({ params }: { params: { blogId: string } }) {
  const router = useRouter()
  const { blogId } = params
  const [loading, setLoading] = useState(false)
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [editorContent, setEditorContent] = useState("")

  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blog/${blogId}`)
      const data = await response.json()
      setBlog(data)
      setEditorContent(data.content)
      setBannerPreview(data.banner) // Set banner preview from fetched data
    } catch (error) {
      console.error("Error fetching blog:", error)
      toast.error("Failed to fetch blog")
    } finally {
      setLoading(false)
    }
  }, [blogId])

  useEffect(() => {
    fetchBlog()
  }, [fetchBlog])

  useEffect(() => {
    // Initialize editor content when blog is loaded
    if (blog) {
      setEditorContent(blog.content)
    }
  }, [blog])

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingBanner(true)

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file')
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }

      // Create FormData for upload
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const { url } = await response.json()

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file)

      // Check image dimensions
      const checkImageDimensions = () => {
        return new Promise((resolve, reject) => {
          const img = document.createElement('img')
          img.src = objectUrl
          
          img.onload = () => {
            const aspectRatio = img.width / img.height
            if (Math.abs(aspectRatio - 16/9) > 0.1) {
              URL.revokeObjectURL(objectUrl)
              reject('Please upload an image with 16:9 aspect ratio')
            } else {
              resolve(true)
            }
          }

          img.onerror = () => {
            URL.revokeObjectURL(objectUrl)
            reject('Failed to load image')
          }
        })
      }

      await checkImageDimensions()
      if (blog) {
        setBlog({
          ...blog,
          banner: url
        })
      }
      setBannerPreview(objectUrl)
      toast.success('Banner uploaded successfully')
    } catch (error) {
      console.error('Error uploading banner:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to upload banner')
      if (blog) {
        setBlog({ ...blog, banner: null })
      }
      setBannerPreview("")
    } finally {
      setUploadingBanner(false)
      // Reset input
      e.target.value = ''
    }
  }

  const handleTagToggle = (tag: PrismaBlogTag) => {
    if (!blog) return

    const newTags = blog.tags.includes(tag)
      ? blog.tags.filter(t => t !== tag)
      : blog.tags.length < 3
        ? [...blog.tags, tag]
        : blog.tags

    if (blog.tags.length >= 3 && !blog.tags.includes(tag)) {
      toast.error("Maximum Tags Reached")
      return
    }

    setBlog({ ...blog, tags: newTags })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!blog) return

    try {
      setLoading(true)

      const response = await fetch(`/api/blog/${blog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...blog,
          content: editorContent,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update blog")
      }

      toast.success("Blog updated successfully!")
    } catch (error) {
      console.error("Error updating blog:", error)
      toast.error("Failed to update blog")
    } finally {
      setLoading(false)
    }
  }

  if (!blog) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[var(--brand-light)] py-8">
      <div className="container mx-auto">
        {loading ? (
          <div>Loading...</div>
        ) : blog ? (
          <Card className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-[var(--brand-primary)]">Edit Blog</h1>
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                className="border-[var(--brand-primary)] text-[var(--brand-primary)]"
              >
                Back
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={blog.title}
                    onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={blog.category}
                    onValueChange={(value: PrismaBlogCategory) => setBlog({ ...blog, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(BlogCategory).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Banner Image</Label>
                <div className="mt-2">
                  {(bannerPreview || blog.banner) ? (
                    <div className="relative group">
                      <div className="aspect-video relative overflow-hidden rounded-lg border border-gray-200 w-[300px]">
                        <Image
                          src={bannerPreview || blog.banner || ''}
                          alt="Blog banner"
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setBlog({ ...blog, banner: null })
                            setBannerPreview(null)
                          }}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video relative border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors w-[300px] h-[300px]">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerUpload}
                        disabled={uploadingBanner}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">+</div>
                        <div className="text-sm text-gray-600">
                          {uploadingBanner ? "Uploading..." : "Upload Banner Image"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Tags (Max 3)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.values(BlogTag).map((tag) => (
                    <Button
                      key={tag}
                      type="button"
                      variant={blog.tags.includes(tag) ? "default" : "outline"}
                      onClick={() => handleTagToggle(tag)}
                      className={blog.tags.includes(tag) 
                        ? "bg-slate-500 text-white"
                        : "border-[var(--brand-primary)] text-[var(--brand-primary)]"
                      }
                    >
                      {tag.replace(/_/g, " ")}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={blog.description}
                  onChange={(e) => setBlog({ ...blog, description: e.target.value })}
                />
              </div>

              <div>
                <Label>Content</Label>
                <div className="mt-2 min-h-[500px]">
                  <RichTextEditor 
                    content={editorContent}
                    onChange={setEditorContent}
                    placeholder="Write your blog content here..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={loading}
                  className="bg-[var(--brand-primary)] text-black border border-black"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <div>Blog not found</div>
        )}
      </div>
    </div>
  )
} 