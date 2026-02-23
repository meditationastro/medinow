"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2, RefreshCcw } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  published: boolean
  createdAt: Date
}

export function BlogVisibilityManager() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState(false)

  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      setError(false)
      const response = await fetch("/api/blogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Failed to fetch blogs")
      }

      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      console.error("Error fetching blogs:", error)
      setError(true)
      toast.error("Failed to load blogs")
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch blogs when component mounts
  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleVisibilityChange = async (blog: BlogPost) => {
    setSelectedBlog(blog)
    setShowConfirmDialog(true)
  }

  const confirmVisibilityChange = async () => {
    if (!selectedBlog) return

    setIsUpdating(true)
    try {
      const response = await fetch(`/api/blogs/${selectedBlog.id}/visibility`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: !selectedBlog.published,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Failed to update blog visibility")
      }

      // Update local state
      setBlogs(blogs.map(blog => 
        blog.id === selectedBlog.id 
          ? { ...blog, published: !blog.published }
          : blog
      ))

      toast.success(
        `Blog is now ${!selectedBlog.published ? "public" : "private"}`
      )
    } catch (error) {
      console.error("Error updating blog visibility:", error)
      toast.error("Failed to update blog visibility")
    } finally {
      setIsUpdating(false)
      setShowConfirmDialog(false)
      setSelectedBlog(null)
    }
  }

  if (isLoading) {
    return (
      <Card className="border-primary-200">
        <CardContent className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-primary-200">
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <p className="text-primary-600">Failed to load blogs</p>
          <Button
            variant="outline"
            onClick={fetchBlogs}
            disabled={isLoading}
            className="border-primary-200 text-primary-700 hover:bg-primary-50 hover:text-primary-900"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="border-primary-200">
        <CardHeader>
          <CardTitle className="text-primary-900">Blog Visibility Management</CardTitle>
          <CardDescription className="text-primary-700">Control which blog posts are public or private</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {blogs.length === 0 ? (
            <p className="text-center text-primary-600 py-8">
              No blog posts found
            </p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex items-center justify-between p-4 rounded-lg border border-primary-200 hover:bg-primary-50/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-medium text-primary-900">{blog.title}</p>
                  <p className="text-sm text-primary-600">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant={blog.published ? "outline" : "default"}
                  onClick={() => handleVisibilityChange(blog)}
                  className={blog.published 
                    ? "border-primary-200 text-primary-700 hover:bg-primary-50 hover:text-primary-900" 
                    : "bg-primary-800 text-primary-50 hover:bg-primary-900"
                  }
                >
                  {blog.published ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Make Private
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Make Public
                    </>
                  )}
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="border-primary-200 bg-primary-50">
          <DialogHeader>
            <DialogTitle className="text-primary-900">Confirm Visibility Change</DialogTitle>
            <DialogDescription className="text-primary-700">
              Are you sure you want to make &quot;{selectedBlog?.title}&quot;{" "}
              {selectedBlog?.published ? "private" : "public"}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isUpdating}
              className="border-primary-200 text-primary-700 hover:bg-primary-50 hover:text-primary-900"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmVisibilityChange}
              disabled={isUpdating}
              className="bg-primary-800 text-primary-50 hover:bg-primary-900"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 