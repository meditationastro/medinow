"use client"
import Link from "next/link"
import { Menu, X, ChevronDown, Sun, Moon, Star, BookOpen, Music, Download, Wrench, Home, Phone, Users, ShoppingBag, Image, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion"

const NAV = [
  { label: "Home", href: "/h", icon: Home },
  {
    label: "Services", icon: Star,
    children: [
      { label: "All Services", href: "/h/services", icon: "✨", desc: "Overview of all our offerings" },
      { label: "Vedic Astrology Counseling", href: "/h/astrological-chart-reading", icon: "🔮", desc: "Natal chart, karma mapping, guidance" },
      { label: "Meditation & Yoga", href: "/h/meditation-and-yoga", icon: "🧘", desc: "Nishruti, breathwork, Tibetan bowls" },
      { label: "Jyotish Consultancy", href: "/h/jyotish-consultancy", icon: "⭐", desc: "Classical Vedic astrology readings" },
      { label: "Chakra Balancing", href: "/h/chakra-balancing", icon: "🌀", desc: "Energy healing & chakra alignment" },
      { label: "Sound Healing", href: "/h/sound-healing", icon: "🔊", desc: "Tibetan bowls & mantra therapy" },
      { label: "Spiritual Guidance", href: "/h/spiritual-guidance", icon: "🕊️", desc: "Life coaching & soul alignment" },
    ]
  },
  {
    label: "Retreats", icon: Sparkles,
    children: [
      { label: "Nepal Retreat Overview", href: "/h/retreats", icon: "🏔️", desc: "Sacred Himalayan immersions" },
      { label: "Upcoming Dates & Booking", href: "/h/appointment", icon: "📅", desc: "Reserve your retreat spot" },
      { label: "Kathmandu Valley", href: "/h/retreats#kathmandu", icon: "🛕", desc: "Temples, rituals, ancient wisdom" },
      { label: "Pokhara & Lumbini", href: "/h/retreats#pokhara", icon: "🌊", desc: "Lakes, forests, Buddha's birthplace" },
      { label: "Packages & Pricing", href: "/h/services#packages", icon: "💎", desc: "Starter, Inner Alchemy, Full Immersion" },
    ]
  },
  {
    label: "Learn", icon: BookOpen,
    children: [
      { label: "Nishruti Meditation Course", href: "/h/nishruti-meditation", icon: "🎧", desc: "Transcending the planes of hearing" },
      { label: "Mantra Practice", href: "/h/tools/mantra", icon: "🕉️", desc: "Interactive mantra timer & guide" },
      { label: "Blog & Wisdom", href: "/h/blogs", icon: "📝", desc: "Articles on astrology & meditation" },
      { label: "Resources & Downloads", href: "/h/resources", icon: "📥", desc: "Free PDFs, guided audio, tools" },
      { label: "Dosha Quiz", href: "/h/dosha", icon: "🌿", desc: "Find your Ayurvedic constitution" },
      { label: "FAQ", href: "/h/faq", icon: "❓", desc: "Common questions answered" },
    ]
  },
  {
    label: "Tools", icon: Wrench,
    children: [
      { label: "All Vedic Tools", href: "/h/tools", icon: "🔧", desc: "All astrology & meditation tools" },
      { label: "Birth Chart Calculator", href: "/h/tools/birth-chart", icon: "🌟", desc: "Your Vedic birth chart" },
      { label: "Nakshatra & Numerology", href: "/h/tools/numerology", icon: "🔢", desc: "Vedic numerology reading" },
      { label: "Gemstone Guidance", href: "/h/tools/gemstone", icon: "💎", desc: "Educational gemstone tool" },
      { label: "Muhurta Planner", href: "/h/tools/muhurta", icon: "📅", desc: "Auspicious timing guide" },
      { label: "Breathing Meditation", href: "/h/meditation", icon: "🧘", desc: "Interactive breathing & timer" },
    ]
  },
  { label: "Gallery", href: "/h/gallery", icon: Image },
  { label: "Shop", href: "/h/shop", icon: ShoppingBag },
  { label: "About", href: "/h/about", icon: Users },
  { label: "Contact", href: "/h/contact", icon: Phone },
]

function DropdownMenu({ item, onClose }: { item: typeof NAV[0]; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  if (!("children" in item)) {
    return (
      <Link href={item.href!} className="text-primary-700 hover:text-primary-900 font-medium text-sm transition-colors py-2 px-1">
        {item.label}
      </Link>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 text-primary-700 hover:text-primary-900 font-medium text-sm transition-colors py-2 px-1"
      >
        {item.label}
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50">
          <div className="grid gap-0.5">
            {item.children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => { setOpen(false); onClose() }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary-50 transition-colors group"
              >
                <span className="text-xl mt-0.5 flex-shrink-0">{child.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-primary-800">{child.label}</div>
                  <div className="text-xs text-gray-500 leading-snug">{child.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "ADMIN"

  return (
    <header className="relative z-50 bg-white/95 backdrop-blur-md border-b border-primary-100 sticky top-0 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/h" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <Sun className="w-8 h-8 text-amber-500" />
              <Moon className="w-4 h-4 text-primary-700 absolute -top-0.5 -right-0.5" />
            </div>
            <div>
              <span className="text-primary-900 font-bold text-lg leading-none block">MeditationAstro</span>
              <span className="text-amber-600 text-xs tracking-wide leading-none">Answerforself</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <DropdownMenu key={item.label} item={item} onClose={() => {}} />
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link href="/admin">
                <Button size="sm" className="hidden sm:flex bg-primary-800 hover:bg-primary-900 text-white text-xs">
                  Admin
                </Button>
              </Link>
            )}
            {!isAdmin && (
              <Link href="/auth/login">
                <Button size="sm" variant="outline" className="hidden sm:flex border-primary-300 text-primary-700 text-xs">
                  Login
                </Button>
              </Link>
            )}
            <Link href="/h/appointment">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs px-3">
                Book Free Call
              </Button>
            </Link>

            {/* Mobile Hamburger */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden p-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 bg-white overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Sun className="w-6 h-6 text-amber-500" />
                    <span className="font-bold text-primary-900">MeditationAstro</span>
                  </div>
                </div>
                <div className="p-4">
                  <Accordion type="single" collapsible className="w-full">
                    {NAV.map((item, i) => (
                      "children" in item ? (
                        <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-100">
                          <AccordionTrigger className="text-sm font-semibold text-primary-900 py-3 hover:no-underline">
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-1 pb-2">
                              {item.children!.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-primary-50 text-sm text-gray-700"
                                >
                                  <span>{child.icon}</span> {child.label}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <div key={i} className="border-b border-gray-100">
                          <Link
                            href={item.href!}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 py-3 text-sm font-semibold text-primary-900 hover:text-primary-600"
                          >
                            {item.label}
                          </Link>
                        </div>
                      )
                    ))}
                  </Accordion>
                  <div className="mt-4 space-y-2">
                    <Link href="/h/appointment" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">Book Free Discovery Call</Button>
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-primary-800 text-white hover:bg-primary-900">Admin Panel</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
