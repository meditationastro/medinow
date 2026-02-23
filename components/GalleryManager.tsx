"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2, RefreshCw } from "lucide-react"

type GalleryImage = {
  id: string
  title: string
  imageUrl: string
  createdAt: string
}

export function GalleryManager() {
  const [items, setItems] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  const [open, setOpen] = useState(false)

  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const canSave = useMemo(() => title.trim().length > 0 && imageUrl.trim().length > 0, [title, imageUrl])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/gallery", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch gallery")
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      toast.error("Failed to load gallery")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const openEdit = (img: GalleryImage) => {
    setSelected(img)
    setTitle(img.title)
    setImageUrl(img.imageUrl)
    setOpen(true)
  }

  const save = async () => {
    if (!selected || !canSave) return
    try {
      setSaving(true)
      const res = await fetch(`/api/gallery/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, imageUrl }),
      })
      if (!res.ok) throw new Error("Failed to update")
      toast.success("Gallery image updated")
      setOpen(false)
      setSelected(null)
      await fetchItems()
    } catch (e) {
      console.error(e)
      toast.error("Failed to update gallery image")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this image?")) return
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      toast.success("Deleted")
      await fetchItems()
    } catch (e) {
      console.error(e)
      toast.error("Failed to delete")
    }
  }

  return (
    <Card className="border-primary-200">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-primary-900">Manage Gallery</CardTitle>
          <CardDescription className="text-primary-700">
            Edit titles, replace images, or delete old images.
          </CardDescription>
        </div>
        <Button variant="outline" onClick={fetchItems} className="border-primary-200 text-primary-800">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-primary-700">Loading...</div>
        ) : items.length === 0 ? (
          <div className="py-8 text-primary-700">No images yet. Upload some in the Upload tab.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((img) => (
                  <TableRow key={img.id}>
                    <TableCell>
                      <div className="relative w-14 h-14 rounded-md overflow-hidden border border-primary-200">
                        <Image src={img.imageUrl} alt={img.title} fill className="object-cover" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-primary-900">{img.title}</TableCell>
                    <TableCell className="text-primary-700">
                      {new Date(img.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => openEdit(img)} className="border-primary-200">
                          <Pencil className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => remove(img.id)}>
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl border-primary-200 bg-primary-50">
          <DialogHeader>
            <DialogTitle className="text-primary-900">Edit Gallery Image</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label className="text-primary-800">Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} className="border-primary-200" />
            </div>
            <div className="space-y-2">
              <Label className="text-primary-800">Image URL</Label>
              <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="border-primary-200" />
              <p className="text-xs text-primary-700">Tip: paste an R2 upload URL or a public image URL.</p>
            </div>
            {imageUrl ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-primary-200">
                <Image src={imageUrl} alt="Preview" fill className="object-cover" />
              </div>
            ) : null}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} className="border-primary-200">Cancel</Button>
              <Button onClick={save} disabled={!canSave || saving} className="bg-primary-800 hover:bg-primary-900">
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
