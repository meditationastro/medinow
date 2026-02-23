"use client"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, Music, FileText, Image as ImageIcon, Trash2, Plus, X, Loader2, Download, Search, RefreshCw, Eye, EyeOff } from "lucide-react"

interface Resource {
  id: string; title: string; description: string; fileUrl: string
  fileType: string; category: string; isPublic: boolean; requiresEmail: boolean
  downloadCount: number; createdAt: string
}

const CATEGORIES = ["meditation", "astrology", "mantra", "general"]
const FILE_ICONS: Record<string, string> = { pdf: "📄", audio: "🎵", video: "🎬", docx: "📝", image: "🖼️", other: "📁" }
const ACCEPT_TYPES = "image/*,audio/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx"

export function ResourceManager() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<"list" | "add">("list")
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState("")
  const [form, setForm] = useState({
    title: "", description: "", fileUrl: "", fileType: "pdf",
    category: "general", isPublic: true, requiresEmail: false
  })

  async function fetchResources() {
    setLoading(true)
    try {
      const r = await fetch("/api/resources")
      const data = await r.json()
      setResources(Array.isArray(data) ? data : [])
    } catch { toast.error("Failed to load resources") }
    setLoading(false)
  }

  useEffect(() => { fetchResources() }, [])

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData(); fd.append("file", file)
    try {
      const r = await fetch("/api/upload", { method: "POST", body: fd })
      if (!r.ok) throw new Error(await r.text())
      const data = await r.json()
      setForm(f => ({ ...f, fileUrl: data.url, fileType: data.fileType || "other" }))
      toast.success(`${file.name} uploaded!`)
    } catch (err: any) { toast.error(err.message || "Upload failed") }
    setUploading(false)
  }

  async function handleSave() {
    if (!form.title || !form.fileUrl) { toast.error("Title and file are required"); return }
    setSaving(true)
    try {
      const r = await fetch("/api/resources", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!r.ok) throw new Error("Failed to save")
      toast.success("Resource saved!")
      setMode("list")
      setForm({ title: "", description: "", fileUrl: "", fileType: "pdf", category: "general", isPublic: true, requiresEmail: false })
      fetchResources()
    } catch { toast.error("Failed to save resource") }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this resource?")) return
    try {
      await fetch(`/api/resources/${id}`, { method: "DELETE" })
      toast.success("Deleted")
      setResources(r => r.filter(x => x.id !== id))
    } catch { toast.error("Failed to delete") }
  }

  async function toggleVisibility(res: Resource) {
    try {
      await fetch(`/api/resources/${res.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isPublic: !res.isPublic }) })
      setResources(rs => rs.map(r => r.id === res.id ? { ...r, isPublic: !r.isPublic } : r))
      toast.success("Updated")
    } catch { toast.error("Failed") }
  }

  const filtered = resources.filter(r => !search || r.title.toLowerCase().includes(search.toLowerCase()))

  if (mode === "add") {
    return (
      <Card className="border-primary-200">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-primary-900">Upload New Resource</CardTitle>
              <CardDescription>Upload PDFs, audio files, documents, images, or any downloadable content</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setMode("list")}><X className="w-4 h-4 mr-1" />Cancel</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <Label className="font-semibold text-primary-800 mb-2 block">Upload File * (PDF, Audio, Video, Word, Images — up to 50MB)</Label>
                <label className={`block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${uploading ? "border-primary-300 bg-primary-50" : "border-primary-200 hover:border-primary-400 hover:bg-primary-50"}`}>
                  <input type="file" accept={ACCEPT_TYPES} onChange={handleFileUpload} className="sr-only" disabled={uploading} />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2 text-primary-600">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <span className="text-sm font-medium">Uploading…</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-primary-600">
                      <Upload className="w-8 h-8" />
                      <span className="text-sm font-medium">Click to upload</span>
                      <span className="text-xs text-primary-400">PDF · Audio · Video · Word · Images</span>
                    </div>
                  )}
                </label>
                {form.fileUrl && (
                  <div className="mt-2 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                    <span className="text-2xl">{FILE_ICONS[form.fileType] || "📁"}</span>
                    <span className="text-green-700 text-sm font-medium">File ready: {form.fileType.toUpperCase()}</span>
                  </div>
                )}
              </div>
              <div>
                <Label className="font-semibold text-primary-800 mb-2 block">Or Paste URL</Label>
                <Input value={form.fileUrl} onChange={e => setForm(f => ({ ...f, fileUrl: e.target.value }))} placeholder="https://…" />
              </div>
              <div>
                <Label className="font-semibold text-primary-800 mb-2 block">File Type</Label>
                <select value={form.fileType} onChange={e => setForm(f => ({ ...f, fileType: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                  {["pdf", "audio", "video", "docx", "image", "other"].map(t => <option key={t} value={t}>{FILE_ICONS[t]} {t.toUpperCase()}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <Label className="font-semibold text-primary-800 mb-2 block">Title *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Guided Nishruti Meditation Audio" />
              </div>
              <div>
                <Label className="font-semibold text-primary-800 mb-2 block">Description</Label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description of this resource…" rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none" />
              </div>
              <div>
                <Label className="font-semibold text-primary-800 mb-2 block">Category</Label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isPublic} onChange={e => setForm(f => ({ ...f, isPublic: e.target.checked }))} className="rounded" />
                  <span className="text-sm font-medium text-gray-700">Public</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.requiresEmail} onChange={e => setForm(f => ({ ...f, requiresEmail: e.target.checked }))} className="rounded" />
                  <span className="text-sm font-medium text-gray-700">Require email</span>
                </label>
              </div>
              <Button onClick={handleSave} disabled={!form.title || !form.fileUrl || saving} className="w-full bg-primary-800 hover:bg-primary-900 text-white py-3">
                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving…</> : "Publish Resource"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary-200">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-primary-900 flex items-center gap-2"><Download className="w-5 h-5" />Resource Library</CardTitle>
            <CardDescription>{resources.length} resources — PDFs, audio, documents, images</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchResources}><RefreshCw className="w-4 h-4" /></Button>
            <Button size="sm" onClick={() => setMode("add")} className="bg-primary-800 hover:bg-primary-900 text-white"><Plus className="w-4 h-4 mr-1" />Upload Resource</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources…" className="pl-9" />
        </div>
        {loading ? (
          <div className="py-12 text-center"><Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2" /><p className="text-primary-600">Loading…</p></div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            {resources.length === 0 ? "No resources yet. Upload your first file!" : "No results found."}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map(res => (
              <div key={res.id} className="flex items-center gap-4 py-4 hover:bg-gray-50 px-2 rounded-xl transition-colors">
                <span className="text-3xl flex-shrink-0">{FILE_ICONS[res.fileType] || "📁"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-semibold text-gray-900 text-sm truncate">{res.title}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase">{res.fileType}</span>
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">{res.category}</span>
                    {!res.isPublic && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Hidden</span>}
                    {res.requiresEmail && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Email gate</span>}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{res.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{res.downloadCount} downloads · {new Date(res.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button size="sm" variant="ghost" onClick={() => toggleVisibility(res)} title={res.isPublic ? "Make private" : "Make public"}>
                    {res.isPublic ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                  </Button>
                  <a href={res.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost"><Download className="w-4 h-4" /></Button>
                  </a>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(res.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
