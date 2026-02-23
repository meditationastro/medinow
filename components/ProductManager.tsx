"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Plus, Trash2, Pencil, RefreshCw } from "lucide-react"
import { RichTextEditor } from "@/components/RichTextEditor"

const PRODUCT_CATEGORIES = [
  "MEDITATION_TOOLS",
  "CRYSTALS",
  "BOOKS",
  "ACCESSORIES",
  "DIGITAL_PRODUCTS",
  "ASTROLOGY_TOOLS",
] as const

type Version = { id?: string; title: string; price: number }

type Product = {
  id: string
  title: string
  description: string
  image: string
  category: string
  versions: Version[]
  createdAt: string
}

export function ProductManager() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<string>("")
  const [image, setImage] = useState("")
  const [versions, setVersions] = useState<Version[]>([{ title: "", price: 0 }])

  const canSave = useMemo(() => {
    return (
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      category.trim().length > 0 &&
      image.trim().length > 0 &&
      versions.length > 0 &&
      versions.every((v) => v.title.trim().length > 0)
    )
  }, [title, description, category, image, versions])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/products", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch products")
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const openEdit = (p: Product) => {
    setSelected(p)
    setTitle(p.title)
    setDescription(p.description)
    setCategory(p.category)
    setImage(p.image)
    setVersions(p.versions?.length ? p.versions.map((v) => ({ title: v.title, price: v.price })) : [{ title: "", price: 0 }])
    setOpen(true)
  }

  const addVersion = () => setVersions((prev) => [...prev, { title: "", price: 0 }])
  const removeVersion = (idx: number) => setVersions((prev) => prev.filter((_, i) => i !== idx))
  const updateVersion = (idx: number, field: keyof Version, value: string) => {
    setVersions((prev) => {
      const next = [...prev]
      if (field === "price") next[idx].price = value === "" ? 0 : Number(value) || 0
      else next[idx].title = value
      return next
    })
  }

  const save = async () => {
    if (!selected || !canSave) return
    try {
      setSaving(true)
      const res = await fetch(`/api/products/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image, category, versions }),
      })
      if (!res.ok) throw new Error("Failed to update")
      toast.success("Product updated")
      setOpen(false)
      setSelected(null)
      await fetchItems()
    } catch (e) {
      console.error(e)
      toast.error("Failed to update product")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      toast.success("Deleted")
      await fetchItems()
    } catch (e) {
      console.error(e)
      toast.error("Failed to delete product")
    }
  }

  return (
    <Card className="border-primary-200">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-primary-900">Manage Products</CardTitle>
          <CardDescription className="text-primary-700">Edit or delete products already published.</CardDescription>
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
          <div className="py-8 text-primary-700">No products yet. Add a product in the Add Product tab.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Versions</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="relative w-14 h-14 rounded-md overflow-hidden border border-primary-200">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-primary-900">{p.title}</TableCell>
                    <TableCell className="text-primary-700">{p.category.replace(/_/g, " ")}</TableCell>
                    <TableCell className="text-primary-700">{p.versions?.length || 0}</TableCell>
                    <TableCell className="text-primary-700">{new Date(p.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => openEdit(p)} className="border-primary-200">
                          <Pencil className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => remove(p.id)}>
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
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto border-primary-200 bg-primary-50">
          <DialogHeader>
            <DialogTitle className="text-primary-900">Edit Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-primary-800">Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="border-primary-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-primary-800">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-primary-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-primary-200">
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-primary-800">Image URL</Label>
              <Input value={image} onChange={(e) => setImage(e.target.value)} className="border-primary-200" />
              {image ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-primary-200">
                  <Image src={image} alt="Preview" fill className="object-cover" />
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label className="text-primary-800">Description</Label>
              <RichTextEditor content={description} onChange={setDescription} placeholder="Product description..." />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-primary-800">Versions</Label>
                <Button type="button" variant="outline" size="sm" onClick={addVersion} className="border-primary-200">
                  <Plus className="w-4 h-4 mr-1" /> Add Version
                </Button>
              </div>
              <div className="space-y-3">
                {versions.map((v, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-[1fr_160px_80px] gap-2 items-end">
                    <div className="space-y-1">
                      <Label className="text-primary-700">Title</Label>
                      <Input value={v.title} onChange={(e) => updateVersion(idx, "title", e.target.value)} className="border-primary-200" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-primary-700">Price</Label>
                      <Input type="number" value={v.price} onChange={(e) => updateVersion(idx, "price", e.target.value)} className="border-primary-200" />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeVersion(idx)}
                      disabled={versions.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} className="border-primary-200">Cancel</Button>
              <Button onClick={save} disabled={!canSave || saving} className="bg-primary-800 hover:bg-primary-900">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
