"use client"
import Link from "next/link"
import { Menu, X, ChevronDown, Sun, Moon, Star, BookOpen, Music, Download, Wrench, Home, Phone, Users, ShoppingBag, Image, Sparkles, LogIn, User, Shield, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "next-auth/react"
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion"
import {
  DropdownMenu as ShadDropdown,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NAV = [
  { label: "Home", href: "/h", icon: Home },
  {
    label: "Services", icon: Star,
    children: [
      { label: "All Services", href: "/h/services", icon: "✨", desc: "Overview of all our offerings" },
      { label: "Vedic Astrology Counseling", href: "/h/astrological-chart-reading", icon: "🔮", desc: "Natal chart, karma mapping, guidance" },
      { label: "Jyotish Consultancy", href: "/h/jyotish-consultancy", icon: "⭐", desc: "Classical Vedic astrology readings" },
      { label: "Meditation & Yoga", href: "/h/meditation-and-yoga", icon: "🧘", desc: "Nishruti, breathwork, Tibetan bowls" },
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

function NavDropdownItem({ item, onClose }: { item: typeof NAV[0]; onClose: () => void }) {
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
      <Link href={item.href!} className="text-primary-800 hover:text-amber-600 font-medium text-sm transition-colors py-2 px-1">
        {item.label}
      </Link>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 text-primary-800 hover:text-amber-600 font-medium text-sm transition-colors py-2 px-1"
      >
        {item.label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50">
          <div className="grid gap-0.5">
            {item.children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-amber-50 transition-colors group"
              >
                <span className="text-xl leading-none mt-0.5">{child.icon}</span>
                <div>
                  <div className="font-semibold text-primary-900 text-sm group-hover:text-amber-700">{child.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{child.desc}</div>
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
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "ADMIN"
  const isLoggedIn = !!session?.user
  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "Account"

  return (
    <header className="relative z-50 bg-white/96 backdrop-blur-md border-b border-amber-100 sticky top-0 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/h" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <Sun className="w-8 h-8 text-amber-500" />
              <Moon className="w-4 h-4 text-blue-700 absolute -top-0.5 -right-0.5" />
            </div>
            <div>
              <span className="text-blue-900 font-bold text-lg leading-none block">MeditationAstro</span>
              <span className="text-amber-600 text-xs tracking-wide leading-none">Answerforself</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV.map((item) => (
              <NavDropdownItem key={item.label} item={item} onClose={() => {}} />
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* User account menu */}
            {isLoggedIn ? (
              <ShadDropdown>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="hidden sm:flex items-center gap-1.5 border-blue-200 text-blue-800 text-xs h-8">
                    <User className="w-3.5 h-3.5" />
                    <span className="max-w-[80px] truncate">{userName}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard?tab=appointments" className="flex items-center gap-2">
                      <Star className="w-4 h-4" /> My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard?tab=orders" className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" /> My Orders
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2 text-blue-700 font-semibold">
                          <Shield className="w-4 h-4" /> Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/h" })}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </ShadDropdown>
            ) : (
              <Link href="/auth/login">
                <Button size="sm" variant="outline" className="hidden sm:flex items-center gap-1.5 border-blue-300 text-blue-800 text-xs h-8 hover:bg-blue-50">
                  <LogIn className="w-3.5 h-3.5" />
                  Login
                </Button>
              </Link>
            )}

            <Link href="/h/appointment">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs px-3 h-8">
                Book Now
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
                    <span className="font-bold text-blue-900">MeditationAstro</span>
                  </div>
                </div>
                <div className="p-4">
                  <Accordion type="single" collapsible className="w-full">
                    {NAV.map((item, i) => (
                      "children" in item ? (
                        <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-100">
                          <AccordionTrigger className="text-sm font-semibold text-blue-900 py-3 hover:no-underline">
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-1 pb-2">
                              {item.children!.map((child) => (
                                <Link key={child.href} href={child.href} onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-amber-50 text-sm text-gray-700">
                                  <span>{child.icon}</span> {child.label}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <div key={i} className="border-b border-gray-100">
                          <Link href={item.href!} onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 py-3 text-sm font-semibold text-blue-900 hover:text-amber-600">
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
                    {isLoggedIn ? (
                      <>
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="outline" className="w-full border-blue-300 text-blue-800">My Dashboard</Button>
                        </Link>
                        {isAdmin && (
                          <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full bg-blue-800 text-white hover:bg-blue-900">
                              <Shield className="w-4 h-4 mr-2" /> Admin Panel
                            </Button>
                          </Link>
                        )}
                        <Button variant="ghost" className="w-full text-red-600" onClick={() => signOut({ callbackUrl: "/h" })}>
                          <LogOut className="w-4 h-4 mr-2" /> Sign Out
                        </Button>
                      </>
                    ) : (
                      <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full border-blue-300 text-blue-800">
                          <LogIn className="w-4 h-4 mr-2" /> Login / Sign Up
                        </Button>
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
