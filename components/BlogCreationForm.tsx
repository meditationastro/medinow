"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { RichTextEditor } from "@/components/RichTextEditor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, ImageIcon } from "lucide-react"
import Image from "next/image"

const BLOG_CATEGORIES = [
  "MEDITATION",
  "ASTROLOGY",
  "SPIRITUALITY",
  "WELLNESS",
  "MINDFULNESS",
  "PERSONAL_GROWTH",
] as const

const BLOG_TAGS = [
  "BEGINNERS",
  "ADVANCED",
  "TECHNIQUES",
  "PHILOSOPHY",
  "PRACTICE",
  "SCIENCE",
  "HISTORY",
  "LIFESTYLE",
  "HEALING",
  "ZODIAC",
  "PLANETS",
  "CHAKRAS",
] as const

export function BlogCreationForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [banner, setBanner] = useState<string>("")
  const [bannerFile, setBannerFile] = useState<File | null>(null)

  const handleAddTag = (tag: string) => {
    if (selectedTags.length < 3 && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    } else if (selectedTags.length >= 3) {
      toast.error("You can only select up to 3 tags")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove))
  }

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

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

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file)

    // Create a promise to handle image loading
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

    try {
      await checkImageDimensions()
      setBannerFile(file)
      setBanner(objectUrl)
    } catch (error) {
      toast.error(error as string)
      setBanner("")
      setBannerFile(null)
    }
  }

  const handleSubmit = async () => {
    if (!title || !description || !content || !category) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // First upload the banner if exists
      let bannerUrl = ""
      if (bannerFile) {
        const formData = new FormData()
        formData.append('file', bannerFile)
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload banner image')
        }

        const { url } = await uploadResponse.json()
        bannerUrl = url
      }

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          content,
          category,
          tags: selectedTags,
          banner: bannerUrl,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create blog post")
      }

      toast.success("Blog post created successfully!")
      setTitle("")
      setDescription("")
      setContent("")
      setCategory("")
      setSelectedTags([])
      setBanner("")
      setBannerFile(null)
    } catch (error) {
      toast.error("Failed to create blog post")
      console.error("Error creating blog post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-primary-200">
      <CardHeader>
        <CardTitle className="text-primary-900">Write New Blog Post</CardTitle>
        <CardDescription className="text-primary-700">Create and publish new blog content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="banner" className="text-primary-800">Banner Image (16:9)</Label>
          <div className="flex flex-col gap-4">
            {banner && (
              <div className="relative max-w-2xl mx-auto w-full aspect-video rounded-lg overflow-hidden border border-primary-200 shadow-sm">
                <div className="absolute inset-0">
                  <Image 
                    src={banner} 
                    alt="Banner preview" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      URL.revokeObjectURL(banner)
                      setBanner("")
                      setBannerFile(null)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            {!banner && (
              <div className="max-w-2xl mx-auto w-full border-2 border-dashed border-primary-200 rounded-lg p-8 text-center hover:border-primary-300 transition-colors">
                <Input
                  id="banner"
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="hidden"
                />
                <Label 
                  htmlFor="banner" 
                  className="flex flex-col items-center gap-3 cursor-pointer"
                >
                  <div className="p-4 rounded-full bg-primary-50">
                    <ImageIcon className="h-8 w-8 text-primary-700" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary-900">Upload banner image</p>
                    <p className="text-xs text-primary-600">Must be 16:9 aspect ratio • 5MB max</p>
                  </div>
                </Label>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="title" className="text-primary-800">Title</Label>
          <Input
            id="title"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-primary-800">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter blog description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-primary-800">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="border-primary-200 focus:border-primary-500 focus:ring-primary-500">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="border-primary-200 bg-primary-100">
              {BLOG_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-primary-800 hover:bg-primary-50 focus:bg-primary-50">
                  {cat.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-primary-800">Tags (up to 3)</Label>
          <Select onValueChange={handleAddTag} >
            <SelectTrigger className="border-primary-200 focus:border-primary-500 focus:ring-primary-500">
              <SelectValue placeholder="Add a tag" />
            </SelectTrigger>
            <SelectContent className="border-primary-200 bg-primary-100">
              {BLOG_TAGS.map((tag) => (
                <SelectItem
                  key={tag}
                  value={tag}
                  disabled={selectedTags.includes(tag)}
                  className="text-primary-800 hover:bg-primary-50 focus:bg-primary-50"
                >
                  {tag.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-secondary-100 text-secondary-700 hover:bg-secondary-200">
                {tag.replace("_", " ")}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-primary-800">Content</Label>
          <RichTextEditor
            content={content}
            onChange={setContent}
          />
        </div>
        <Button
          className="w-full bg-primary-800 hover:bg-primary-900 text-primary-50"
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publishing..." : "Publish Blog Post"}
        </Button>
      </CardContent>
    </Card>
  )
} 