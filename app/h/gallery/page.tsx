import { db } from "@/lib/db"
import { GalleryGrid } from "@/components/GalleryGrid"

export const revalidate = 3600 // Revalidate every hour

async function getGalleryImages() {
  try {
    const images = await db.galleryImage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return images
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return []
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Gallery</h1>
      <GalleryGrid images={images} />
    </div>
  )
}
