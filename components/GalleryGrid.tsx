"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Grid3X3, LayoutGrid, Search, X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  id: string
  title: string
  imageUrl: string
}

interface GalleryGridProps {
  images: GalleryImage[]
}

function getCategory(title: string): string {
  const t = title.toLowerCase()
  if (t.includes("meditation") || t.includes("mindful")) return "Meditation"
  if (t.includes("retreat") || t.includes("nepal") || t.includes("himalaya") || t.includes("kathmandu")) return "Retreats"
  if (t.includes("astrology") || t.includes("chart") || t.includes("cosmic")) return "Astrology"
  if (t.includes("yoga") || t.includes("asana")) return "Yoga"
  if (t.includes("healing") || t.includes("sound") || t.includes("bowl") || t.includes("chakra")) return "Healing"
  if (t.includes("nature") || t.includes("mountain") || t.includes("temple") || t.includes("sacred")) return "Sacred Places"
  return "Gallery"
}

const ALL = "All"

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"masonry" | "grid">("masonry")

  const enriched = useMemo(() => images.map((img) => ({ ...img, category: getCategory(img.title) })), [images])
  const categories = useMemo(() => [ALL, ...Array.from(new Set(enriched.map((i) => i.category))).sort()], [enriched])
  const filtered = useMemo(() =>
    enriched.filter((img) => {
      const matchCat = activeCategory === ALL || img.category === activeCategory
      const matchSearch = !searchQuery || img.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    }), [enriched, activeCategory, searchQuery])

  function openImage(img: GalleryImage) {
    const idx = filtered.findIndex((i) => i.id === img.id)
    setSelectedIndex(idx)
    setSelectedImage(img)
  }

  function showPrev() {
    const idx = (selectedIndex - 1 + filtered.length) % filtered.length
    setSelectedIndex(idx); setSelectedImage(filtered[idx])
  }

  function showNext() {
    const idx = (selectedIndex + 1) % filtered.length
    setSelectedIndex(idx); setSelectedImage(filtered[idx])
  }

  const columns = view === "masonry" ? [
    filtered.filter((_, i) => i % 3 === 0),
    filtered.filter((_, i) => i % 3 === 1),
    filtered.filter((_, i) => i % 3 === 2),
  ] : null

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <input type="text" placeholder="Search gallery..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 border border-primary-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" />
          {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400"><X className="w-4 h-4" /></button>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView("masonry")} title="Masonry"
            className={`p-2 rounded-lg border transition-colors ${view === "masonry" ? "bg-primary-800 text-white border-primary-800" : "border-primary-200 text-primary-600 hover:bg-primary-50"}`}>
            <LayoutGrid className="w-4 h-4" /></button>
          <button onClick={() => setView("grid")} title="Grid"
            className={`p-2 rounded-lg border transition-colors ${view === "grid" ? "bg-primary-800 text-white border-primary-800" : "border-primary-200 text-primary-600 hover:bg-primary-50"}`}>
            <Grid3X3 className="w-4 h-4" /></button>
          <span className="text-sm text-primary-500 ml-2">{filtered.length} photos</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "bg-primary-800 text-white shadow-md" : "bg-white border border-primary-200 text-primary-700 hover:bg-primary-50"}`}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-primary-900 mb-2">No images found</h3>
          <button onClick={() => { setSearchQuery(""); setActiveCategory(ALL) }} className="bg-primary-800 text-white px-6 py-2 rounded-xl hover:bg-primary-900">Clear Filters</button>
        </div>
      )}

      {view === "masonry" && columns && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {column.map((image) => (
                <div key={image.id} onClick={() => openImage(image)}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Image src={image.imageUrl} alt={image.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-4">
                      <p className="text-white text-sm font-semibold truncate">{image.title}</p>
                      <span className="text-white/70 text-xs">{image.category}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">{image.category}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {view === "grid" && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((image) => (
            <div key={image.id} onClick={() => openImage(image)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300">
              <Image src={image.imageUrl} alt={image.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 p-3"><p className="text-white text-xs font-semibold truncate">{image.title}</p></div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full p-0 overflow-hidden bg-black/97 border-none">
          {selectedImage && (
            <div className="relative w-full h-[90vh] flex items-center justify-center">
              <Image src={selectedImage.imageUrl} alt={selectedImage.title} fill className="object-contain" sizes="95vw" priority quality={95} />
              {filtered.length > 1 && <>
                <button onClick={showPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white"><ChevronLeft className="w-6 h-6" /></button>
                <button onClick={showNext} className="absolute right-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white"><ChevronRight className="w-6 h-6" /></button>
              </>}
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white/80 bg-black/30 hover:bg-black/50 rounded-full p-2 z-10"><X className="w-5 h-5" /></button>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-lg font-semibold text-center">{selectedImage.title}</p>
                <p className="text-white/60 text-sm text-center">{selectedIndex + 1} / {filtered.length}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
