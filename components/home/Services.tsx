import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Services() {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-6">Our Services</h2>
          <p className="text-xl text-primary-700 max-w-3xl mx-auto">
            Meet and try our services to help you fully change your body, soul and spirit, each of them will provide
            you with adequate answers and open your senses of your reality and purpose of life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="card-background border-primary-300 hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-primary-900">Astral Chart Reading</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-700">
                Shows the cosmic influences on you, thorough study of personality; whose information will then serve
                to know what we constantly fail at, what our repetitive patterns are.
              </p>
            </CardContent>
          </Card>

          <Card className="card-background border-primary-300 hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-primary-900">Vedic Astrology Course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-700">
                Learn the ancient wisdom of Vedic astrology and discover how to read the cosmic influences in your own
                life and others.
              </p>
            </CardContent>
          </Card>

          <Card className="card-background border-primary-300 hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-primary-900">Spiritual Ebook</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-700">
                Meet my ebook &quot;The Creator of the Universe&quot; - a comprehensive guide to understanding your spiritual
                journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 