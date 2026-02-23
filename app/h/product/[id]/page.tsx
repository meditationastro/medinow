"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { redirectToWhatsApp } from "@/lib/whatsapp"

type Version = {
  id: string
  title: string
  price: number
  productId: string
}

type Product = {
  id: string
  title: string
  description: string
  image: string
  category: string
  versions: Version[]
  createdAt: string
  updatedAt: string
  authorId: string
  author: {
    name: string | null
  }
}

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch product")
        const data = await response.json()
        setProduct(data)
        // Set first version as default selected
        if (data.versions && data.versions.length > 0) {
          setSelectedVersion(data.versions[0])
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleBuyNow = () => {
    if (!product || !selectedVersion) return

    const message = `Hi! I'm interested in purchasing:\n\n` +
      `*${product.title}*\n` +
      `Version: ${selectedVersion.title}\n` +
      `Price: $${selectedVersion.price.toFixed(2)}\n\n` +
      `Please provide me with payment details and shipping information.`

    redirectToWhatsApp(message)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto" />
          <p className="mt-4 text-primary-700">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Product Not Found</h2>
          <p className="text-primary-700 mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/h/shop">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 py-12 px-4">
      <div className="container mx-auto">
        <Link href="/h/shop" className="inline-flex items-center text-primary-700 hover:text-primary-600 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative w-full max-w-md mx-auto">
            <Card className="overflow-hidden p-0 w-full aspect-square">
              <div className="relative w-full h-full">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 900px"
                />
              </div>
            </Card>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-primary-900 mb-4">{product.title}</h1>
            <div className="bg-primary-100/50 px-3 py-1 rounded-full text-primary-700 text-sm inline-block mb-6">
              {product.category.replace(/_/g, " ")}
            </div>
            <div 
              className="text-primary-700 mb-8 text-lg leading-relaxed rich-text-content"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {/* Version Selection */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">Select Version</h3>
                <div className="space-y-3">
                  {product.versions.map((version) => (
                    <div key={version.id} className="flex items-center space-x-3 space-y-0">
                      <input
                        type="radio"
                        id={version.id}
                        name="version"
                        value={version.id}
                        checked={selectedVersion?.id === version.id}
                        onChange={(e) => {
                          const version = product.versions.find((v) => v.id === e.target.value)
                          if (version) setSelectedVersion(version)
                        }}
                        className="w-4 h-4 text-primary-600 border-primary-600 focus:ring-primary-500"
                      />
                      <Label htmlFor={version.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center w-full">
                          <span className="font-medium text-primary-900">{version.title}</span>
                          <span className="font-bold text-primary-900">${version.price.toFixed(2)}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Buy Now Button */}
            <Button
              size="lg"
              className="w-full bg-success-500 hover:bg-success-600 text-white text-lg py-6"
              onClick={handleBuyNow}
              disabled={!selectedVersion}
            >
              Buy Now via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
