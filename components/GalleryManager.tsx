"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Pencil, Trash2, RefreshCw, Plus, Upload, Search, Images, X, Eye, Loader2 } from "lucide-react"

type GalleryImage = { id: string; title: string; imageUrl: string; createdAt: string }

type Mode = "list" | "add" | "edit"

export function GalleryManager() {
  const [items, setItems] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>("list")
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [preview, setPreview] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewImage, setViewImage] = useState<GalleryImage | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const canSave = useMemo(() => title.trim().length > 0 && imageUrl.trim().length > 0, [title, imageUrl])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      toast.error("Failed to load gallery images")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  function openAdd() {
    setMode("add")
    setTitle("")
    setImageUrl("")
    setPreview(null)
    setSelected(null)
  }

  function openEdit(item: GalleryImage) {
    setMode("edit")
    setSelected(item)
    setTitle(item.title)
    setImageUrl(item.imageUrl)
    setPreview(item.imageUrl)
  }

  function cancelEdit() {
    setMode("list")
    setTitle("")
    setImageUrl("")
    setPreview(null)
    setSelected(null)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) { toast.error("Please upload an image file"); return }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be less than 5MB"); return }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (!res.ok) throw new Error("Upload failed")
      const data = await res.json()
      const url = data.url || data.imageUrl || data.secure_url || ""
      setImageUrl(url)
      setPreview(url)
      toast.success("Image uploaded successfully")
    } catch {
      toast.error("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  async function handleSave() {
    if (!canSave) return
    setSaving(true)
    try {
      const isEdit = mode === "edit" && selected
      const url = isEdit ? `/api/gallery/${selected.id}` : "/api/gallery"
      const method = isEdit ? "PATCH" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), imageUrl }),
      })
      if (!res.ok) throw new Error("Failed to save")
      toast.success(isEdit ? "Image updated successfully!" : "Image added to gallery!")
      setMode("list")
      fetchItems()
    } catch {
      toast.error("Failed to save image")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string, itemTitle: string) {
    if (!confirm(`Delete "${itemTitle}" from the gallery? This cannot be undone.`)) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed")
      toast.success("Image deleted from gallery")
      setItems(prev => prev.filter(i => i.id !== id))
    } catch {
      toast.error("Failed to delete image")
    } finally {
      setDeleting(null)
    }
  }

  const filteredItems = useMemo(() =>
    items.filter(i => !searchQuery || i.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [items, searchQuery]
  )

  // Add/Edit Form
  if (mode === "add" || mode === "edit") {
    return (
      <Card className="border-primary-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-primary-900">{mode === "edit" ? "Edit Gallery Image" : "Add New Image"}</CardTitle>
              <CardDescription>{mode === "edit" ? "Update the title or replace the image" : "Upload a new photo to the gallery"}</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={cancelEdit} className="border-primary-200">
              <X className="w-4 h-4 mr-1" /> Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-primary-800 font-semibold mb-2 block">Image Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Nepal Retreat Meditation Session"
                  className="border-primary-200 focus:ring-primary-500"
                />
              </div>

              <div>
                <Label className="text-primary-800 font-semibold mb-2 block">Upload Image *</Label>
                <label className={`block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${isUploading ? "border-primary-300 bg-primary-50" : "border-primary-200 hover:border-primary-400 hover:bg-primary-50"}`}>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" disabled={isUploading} />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2 text-primary-600">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <span className="text-sm font-medium">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-primary-600">
                      <Upload className="w-8 h-8" />
                      <span className="text-sm font-medium">Click to upload image</span>
                      <span className="text-xs text-primary-400">PNG, JPG, WebP up to 5MB</span>
                    </div>
                  )}
                </label>
              </div>

              <div>
                <Label htmlFor="imageUrl" className="text-primary-800 font-semibold mb-2 block">Or Paste Image URL</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={e => { setImageUrl(e.target.value); setPreview(e.target.value) }}
                  placeholder="https://example.com/image.jpg"
                  className="border-primary-200"
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={!canSave || saving}
                className="w-full bg-primary-800 hover:bg-primary-900 text-white py-3"
              >
                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : mode === "edit" ? "Update Image" : "Add to Gallery"}
              </Button>
            </div>

            {/* Preview */}
            <div>
              <Label className="text-primary-800 font-semibold mb-2 block">Preview</Label>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-primary-100 bg-primary-50 flex items-center justify-center">
                {preview ? (
                  <Image src={preview} alt="Preview" width={400} height={300} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-primary-400">
                    <Images className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Preview will appear here</p>
                  </div>
                )}
              </div>
              {title && <p className="mt-3 text-center font-medium text-primary-800">{title}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // List View
  return (
    <Card className="border-primary-200">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-primary-900 flex items-center gap-2">
              <Images className="w-5 h-5" /> Gallery Manager
            </CardTitle>
            <CardDescription>{items.length} image{items.length !== 1 ? "s" : ""} in your gallery</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchItems} className="border-primary-200">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={openAdd} className="bg-primary-800 hover:bg-primary-900 text-white">
              <Plus className="w-4 h-4 mr-1" /> Add Image
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search gallery images..."
            className="pl-9 border-primary-200"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-700">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary-600 mx-auto mb-3" />
            <p className="text-primary-600">Loading gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center">
            <Images className="w-14 h-14 text-primary-200 mx-auto mb-4" />
            <p className="text-primary-600 mb-4">{items.length === 0 ? "No images yet. Add your first photo!" : "No images match your search."}</p>
            {items.length === 0 && (
              <Button onClick={openAdd} className="bg-primary-800 text-white hover:bg-primary-900">
                <Plus className="w-4 h-4 mr-1" /> Add First Image
              </Button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map(item => (
              <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-primary-100 shadow-sm hover:shadow-md transition-all bg-white">
                <div className="relative aspect-square">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="25vw"
                  />
                  {/* Hover overlay with actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewImage(item)}
                        className="w-10 h-10 rounded-full bg-white/90 text-gray-800 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEdit(item)}
                        className="w-10 h-10 rounded-full bg-blue-600/90 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        disabled={deleting === item.id}
                        className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-primary-50">
                  <p className="font-medium text-primary-900 text-sm truncate">{item.title}</p>
                  <p className="text-primary-400 text-xs mt-0.5">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Full-size Image Viewer */}
      <Dialog open={!!viewImage} onOpenChange={() => setViewImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-black border-none">
          {viewImage && (
            <div className="relative">
              <Image src={viewImage.imageUrl} alt={viewImage.title} width={800} height={600} className="w-full max-h-[80vh] object-contain" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 flex justify-between items-center">
                <p className="text-white font-medium">{viewImage.title}</p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => { openEdit(viewImage); setViewImage(null) }} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Pencil className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => { handleDelete(viewImage.id, viewImage.title); setViewImage(null) }} className="bg-red-600 hover:bg-red-700">
                    <Trash2 className="w-3 h-3 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
