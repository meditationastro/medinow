"use client"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { navigationLinks, services } from "@/constants/navigation"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname === href
  }

  return (
    <header className="relative z-50 bg-gradient-to-b from-primary-50 to-primary-100/80 border-b border-primary-300 sticky top-0 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className={cn(
              "text-2xl font-bold text-primary-700 hover:text-primary-900 transition-colors",
              isActiveRoute('/') && "underline decoration-primary-600 underline-offset-8"
            )}
          >
            Answerforself
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.filter(link => link.label !== "Services").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-primary-700 hover:text-primary-900 transition-colors font-medium relative py-2",
                  isActiveRoute(link.href) && "underline decoration-primary-600 underline-offset-8"
                )}
              >
                {link.label}
              </Link>
            ))}
            {/* Services Dropdown */}
            <Select onValueChange={val => { if (val) window.location.href = val }}>
              <SelectTrigger className="w-auto min-w-[120px] text-primary-700 font-medium  border-0  hover:text-primary-900  focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200">
                Services
              </SelectTrigger>
              <SelectContent className="bg-white border-primary-200 shadow-lg">
                <SelectItem value="/h/astrological-chart-reading" className="text-primary-800 hover:bg-primary-50 focus:bg-primary-50 cursor-pointer">
                  Astrological Chart Reading
                </SelectItem>
                <SelectItem value="/h/meditation-and-yoga" className="text-primary-800 hover:bg-primary-50 focus:bg-primary-50 cursor-pointer">
                  Meditation And Yoga
                </SelectItem>
                <SelectItem value="/h/spiritual-guidance" className="text-primary-800 hover:bg-primary-50 focus:bg-primary-50 cursor-pointer">
                  Spiritual Guidance
                </SelectItem>
                <SelectItem value="/h/jyotish-consultancy" className="text-primary-800 hover:bg-primary-50 focus:bg-primary-50 cursor-pointer">
                  Jyotish Consultancy
                </SelectItem>
                <SelectItem value="/h/sound-healing" className="text-primary-800 hover:bg-primary-50 focus:bg-primary-50 cursor-pointer">
                  Sound Healing
                </SelectItem>
                <SelectItem value="/h/chakra-balancing" className="text-primary-800 hover:bg-primary-50 focus:bg-primary-50 cursor-pointer">
                  Chakra Balancing
                </SelectItem>
                <SelectItem value="/h/vedic-remedies" className="text-primary-800 hover:bg-primary-50 focus:bg-primary-50 cursor-pointer">
                  Vedic Remedies
                </SelectItem>
              </SelectContent>
            </Select>
            {/* Book Now Button */}
            <Link href="/h/appointment">
              <Button className="ml-4  bg-gradient-to-r from-blue-800 to-amber-600 hover:bg-primary-700 text-white">Book Now</Button>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-primary-700 hover:text-primary-900 hover:bg-primary-100/50">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-to-b from-primary-50 to-primary-100/90 backdrop-blur-sm border-l border-primary-300">
              <nav className="flex flex-col space-y-4 mt-8 pl-4">
                {navigationLinks.filter(link => link.label !== "Services").map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "text-primary-700 hover:text-primary-900 transition-colors font-medium py-2",
                      isActiveRoute(link.href) && "underline decoration-primary-600 underline-offset-8"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {/* Services Accordion Dropdown */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="services">
                    <AccordionTrigger className="text-primary-700 font-medium py-2">Services</AccordionTrigger>
                    <AccordionContent className="pl-4">
                      <Link
                        href="/h/astrological-chart-reading"
                        onClick={handleLinkClick}
                        className="block text-primary-700 hover:text-primary-900 py-1"
                      >
                        Astrological Chart Reading
                      </Link>
                      <Link
                        href="/h/meditation-and-yoga"
                        onClick={handleLinkClick}
                        className="block text-primary-700 hover:text-primary-900 py-1"
                      >
                        Meditation And Yoga
                      </Link>
                      <Link
                        href="/h/spiritual-guidance"
                        onClick={handleLinkClick}
                        className="block text-primary-700 hover:text-primary-900 py-1"
                      >
                        Spiritual Guidance
                      </Link>
                      <Link
                        href="/h/jyotish-consultancy"
                        onClick={handleLinkClick}
                        className="block text-primary-700 hover:text-primary-900 py-1"
                      >
                        Jyotish Consultancy
                      </Link>
                      <Link
                        href="/h/sound-healing"
                        onClick={handleLinkClick}
                        className="block text-primary-700 hover:text-primary-900 py-1"
                      >
                        Sound Healing
                      </Link>
                      <Link
                        href="/h/chakra-balancing"
                        onClick={handleLinkClick}
                        className="block text-primary-700 hover:text-primary-900 py-1"
                      >
                        Chakra Balancing
                      </Link>
                      <Link
                        href="/h/vedic-remedies"
                        onClick={handleLinkClick}
                        className="block text-primary-700 hover:text-primary-900 py-1"
                      >
                        Vedic Remedies
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {/* Book Now Button */}
                <Link href="/h/appointment" onClick={handleLinkClick}>
                  <Button className="mt-4 bg-primary-600 hover:bg-primary-700 text-white w-full">Book Now</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
} 