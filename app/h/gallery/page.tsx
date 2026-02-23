import { db } from "@/lib/db"
import { GalleryGrid } from "@/components/GalleryGrid"
import { Metadata } from "next"
import { Images, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Gallery — Sacred Moments | MeditationAstro",
  description: "Explore photos from our spiritual retreats in Nepal, meditation sessions, yoga classes, sound healing, and sacred temple visits. MeditationAstro by Niaadim.",
  keywords: ["meditation gallery", "Nepal spiritual retreat photos", "vedic astrology", "yoga Nepal", "sound healing photos", "Kathmandu temple"],
  openGraph: {
    title: "MeditationAstro Gallery — Sacred Moments from Nepal",
    description: "Photos from spiritual retreats, meditation, yoga, and sacred site visits in Nepal.",
    type: "website",
  },
}

export const revalidate = 3600

async function getGalleryImages() {
  try {
    return await db.galleryImage.findMany({ orderBy: { createdAt: "desc" } })
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "MeditationAstro Gallery",
            "description": "Sacred moments from spiritual retreats, meditation, and sacred site visits in Nepal.",
            "url": "https://meditationastro.com/h/gallery",
            "numberOfItems": images.length,
          }),
        }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-purple-900 to-slate-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-20 w-64 h-64 bg-purple-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
              <Images className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Sacred Moments</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
            Visual journey through our spiritual retreats, meditation sessions, sacred temple visits, and transformational experiences in Nepal.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {["🧘 Meditation", "🏔️ Nepal Retreats", "🔮 Astrology", "🔊 Sound Healing", "🌿 Yoga", "🛕 Sacred Places"].map((tag) => (
              <span key={tag} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 border border-white/20">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-8 px-4 border-b border-primary-100">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-10 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-900">{images.length}+</div>
              <div className="text-primary-600 text-sm">Sacred Photos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-900">6</div>
              <div className="text-primary-600 text-sm">Categories</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-3xl font-bold text-primary-900"><Globe className="w-6 h-6" />15+</div>
              <div className="text-primary-600 text-sm">Countries Represented</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-4 py-12">
        <GalleryGrid images={images} />
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary-900 to-indigo-900 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Experience it in Person</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">Join a retreat in Nepal and create your own sacred memories. Next dates available in 2025.</p>
        <a href="/h/appointment"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105">
          Book a Retreat →
        </a>
      </section>
    </div>
  )
}
