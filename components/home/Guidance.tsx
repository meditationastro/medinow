import { Compass, Eye, NotebookIcon as Lotus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Guidance() {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-6">Allow Your Soul to Begin Anew</h2>
          <p className="text-xl text-primary-700 max-w-3xl mx-auto">
            Allow your body, mind and soul to begin a new, balanced and wonderful life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Guidance Card */}
          <Card className="card-background border-primary-300 hover:shadow-card-hover transition-all duration-500 animate-fade-in-up transform hover:-translate-y-2 hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-800 to-amber-600 to-primary-700 rounded-full flex items-center justify-center">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-primary-900">Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-700 text-center">
                Get rid of the conditioning of your mind, recover your essence and embrace the purpose with which you
                were born. I will help you achieve.
              </p>
            </CardContent>
          </Card>

          {/* Vedic Consultation Card */}
          <Card
            className="card-background border-primary-300 hover:shadow-card-hover transition-all duration-500 animate-fade-in-up transform hover:-translate-y-2 hover:scale-105"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-800 to-amber-600 to-secondary-700 rounded-full flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-primary-900">Vedic Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-700 text-center">
                Discover the vision of the fundamental topics of your life: direction, purpose, health, family,
                wealth, marriage, education, and spirituality.
              </p>
            </CardContent>
          </Card>

          {/* Meditation and Yoga Card */}
          <Card
            className="card-background border-primary-300 hover:shadow-card-hover transition-all duration-500 animate-fade-in-up transform hover:-translate-y-2 hover:scale-105"
            style={{ animationDelay: "0.4s" }}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-amber-600 to-blue-800 to-secondary-600 rounded-full flex items-center justify-center">
                <Lotus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-primary-900">Meditation & Yoga</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-700 text-center">
                Start the spiritual practice towards liberation, nirvana or Moksha; a state that is obtained when you
                come to know who you really are.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 