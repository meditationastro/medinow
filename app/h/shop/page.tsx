"use client"

import { useState, useEffect } from "react"
import {
 
  Sparkles,
  Search,
  ShoppingCart,
  ArrowRight,
  Filter,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderDialog } from "@/components/OrderDialog"
import { redirectToWhatsApp } from "@/lib/whatsapp"

// Product categories from schema
const categories = [
  { id: "all", name: "All Products" },
  { id: "MEDITATION_TOOLS", name: "Meditation Tools" },
  { id: "CRYSTALS", name: "Crystals" },
  { id: "BOOKS", name: "Books" },
  { id: "ACCESSORIES", name: "Accessories" },
  { id: "DIGITAL_PRODUCTS", name: "Digital Products" },
  { id: "ASTROLOGY_TOOLS", name: "Astrology Tools" },
]

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

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [orderOpen, setOrderOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Helper function to strip HTML tags and get clean text
  const stripHtmlTags = (html: string): string => {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  // Helper function to get truncated description
  const getTruncatedDescription = (html: string, maxLength: number = 150): string => {
    const cleanText = stripHtmlTags(html)
    if (cleanText.length <= maxLength) return cleanText
    return cleanText.substring(0, maxLength) + '...'
  }

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (!response.ok) throw new Error("Failed to fetch products")
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products based on search query and category
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, products])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
      {/* Hero Section */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-r from-primary-100/50 to-secondary-100/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <ShoppingCart className="w-16 h-16 text-primary-600" />
                <Sparkles className="w-6 h-6 text-secondary-600 absolute -top-2 -right-2" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
              Sacred Products & Tools
            </h1>
            <p className="text-xl text-primary-700 mb-8 max-w-3xl mx-auto">
              Discover our curated collection of spiritual items to enhance your meditation practice, astrological
              studies, and personal growth journey.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-primary-600" />
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative z-10 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white/80 backdrop-blur-sm border border-primary-300 rounded-lg p-6 sticky top-28">
                <h3 className="text-xl font-bold text-primary-900 mb-6">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
                          selectedCategory === category.id
                            ? "bg-primary-100 text-primary-900 font-medium"
                            : "text-primary-700 hover:bg-primary-50"
                        }`}
                      >
                        <span>{category.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <Button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="w-full bg-white border border-primary-300 text-primary-900 hover:bg-primary-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter Products
              </Button>

              {/* Mobile Filters */}
              {isMobileFilterOpen && (
                <div className="mt-4 bg-white/90 backdrop-blur-sm border border-primary-300 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-primary-900 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-3 py-1 rounded-full text-sm flex items-center ${
                          selectedCategory === category.id
                            ? "bg-primary-600 text-white"
                            : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                        }`}
                      >
                        <span className="text-primary-700">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Info */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-primary-700">
                  Showing <span className="font-semibold">{filteredProducts.length}</span> products
                </p>
              </div>

              {/* Products */}
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-primary-700">Loading products...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="bg-white/80 backdrop-blur-sm border-primary-300 hover:shadow-xl transition-all duration-500 overflow-hidden group p-0 pb-6"
                    >
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105 aspect-square"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg text-primary-900">{product.title}</CardTitle>
                          <div className="text-lg font-bold text-primary-900">
                            ${product.versions[0]?.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-primary-700 ml-auto">
                            {product.category.replace(/_/g, " ")}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-primary-700 text-sm line-clamp-2">
                          {getTruncatedDescription(product.description)}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <div className="w-full grid grid-cols-1 gap-2">
                          <Link href={`/h/product/${product.id}`} className="w-full">
                            <Button className="w-full bg-blue-800 hover:bg-primary-700 text-white">
                              View Product
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="w-full border-primary-300 text-primary-900 hover:bg-primary-50"
                            onClick={() => {
                              setSelectedProduct(product)
                              setOrderOpen(true)
                            }}
                          >
                            Buy / Order Now
                          </Button>
                          <Button
                            className="w-full bg-success-500 hover:bg-success-600 text-white"
                            onClick={() =>
                              redirectToWhatsApp(
                                `Hello! I'm interested in ordering: ${product.title}. Please share availability and next steps.`
                              )
                            }
                          >
                            Order via WhatsApp
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">No Products Found</h3>
                  <p className="text-primary-700">
                    We couldn&apos;t find any products matching your search. Try different keywords or browse categories.
                  </p>
                  <Button
                    className="mt-4 bg-primary-600 hover:bg-primary-700 text-white"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <OrderDialog
        product={selectedProduct ? {
          id: selectedProduct.id,
          title: selectedProduct.title,
          image: selectedProduct.image,
          versions: selectedProduct.versions,
        } : null}
        open={orderOpen}
        onOpenChange={setOrderOpen}
      />
    </div>
  )
}
