import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import axios from "axios"

interface Testimonial {
  id: string
  message: string
  author: string
  location: string
  rating: number
  isActive: boolean
}

export function Testimonial() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const AUTOPLAY_DELAY = 5000 // 5 seconds

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/testimonials")
        // Filter only active testimonials
        const activeTestimonials = response.data.filter((t: Testimonial) => t.isActive)
        setTestimonials(activeTestimonials)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch testimonials:", error)
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const handlePrevious = useCallback(() => {
    if (testimonials.length === 0) return
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }, [testimonials.length])

  const handleNext = useCallback(() => {
    if (testimonials.length === 0) return
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }, [testimonials.length])

  // Auto-scroll effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (!isHovered && testimonials.length > 0) {
      intervalId = setInterval(() => {
        handleNext()
      }, AUTOPLAY_DELAY)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isHovered, handleNext, testimonials.length])

  if (isLoading) {
    return (
      <section className="relative z-10 py-16 px-4 section-testimonial-background">
        <div className="container mx-auto">
          <div className="relative max-w-3xl mx-auto">
            <Card className="card-background border-primary-300">
              <CardContent className="p-8 text-center">
                <div className="animate-pulse space-y-4">
                  <div className="flex justify-center mb-4 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-primary-200 rounded-full" />
                    ))}
                  </div>
                  <div className="h-20 bg-primary-100 rounded" />
                  <div className="h-4 w-32 mx-auto bg-primary-100 rounded" />
                  <div className="h-4 w-24 mx-auto bg-primary-100 rounded" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="relative z-10 py-16 px-4 section-testimonial-background">
      <div className="container mx-auto">
        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-background border-primary-300">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < testimonials[currentIndex].rating 
                            ? "text-blue-800 fill-current" 
                            : "text-neutral-300"
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-lg text-primary-700 mb-6 italic">
                    &quot;{testimonials[currentIndex].message}&quot;
                  </p>
                  <p className="text-primary-900 font-semibold">{testimonials[currentIndex].author}</p>
                  <p className="text-primary-600">{testimonials[currentIndex].location}</p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  className="rounded-full bg-primary-100 hover:bg-primary-200 text-primary-700"
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous testimonial</span>
                </Button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="rounded-full bg-primary-100 hover:bg-primary-200 text-primary-700"
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next testimonial</span>
                </Button>
              </div>

              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary-600" : "bg-primary-200"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
} 