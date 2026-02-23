"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, Search } from "lucide-react"

interface Blog {
  id: string
  title: string
  description: string
  category: string
  published: boolean
  createdAt: string
  author?: {
    name: string
  }
}

export function BlogUpdateForm() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBlogs(blogs)
    } else {
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredBlogs(filtered)
    }
  }, [searchQuery, blogs])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/blogs')
      const data = await response.json()
      setBlogs(data.blogs)
      setFilteredBlogs(data.blogs)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCategory = (category: string) => {
    return category.replace(/_/g, " ")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Blog Management
          </CardTitle>
          <CardDescription>
            Search, view, and edit your existing blog posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Filter blogs by title, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
            <Button 
              onClick={fetchBlogs}
              disabled={loading}
              variant="outline"
            >
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {loading ? "Loading blogs..." : "No blogs found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBlogs.map((blog) => (
                    <TableRow 
                      key={blog.id}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium max-w-[200px] truncate" title={blog.title}>
                        {blog.title}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {formatCategory(blog.category)}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {blog.author?.name || "Unknown"}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          blog.published 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(blog.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => router.push(`/h/blog/${blog.id}`)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                          <Button
                            onClick={() => router.push(`/admin/blogs/${blog.id}/edit`)}
                            size="sm"
                            className="bg-[var(--brand-primary)] text-black hover:bg-[var(--brand-secondary)] flex items-center gap-1 border border-black "
                          >
                            <Edit className="h-3 w-3 " />
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 