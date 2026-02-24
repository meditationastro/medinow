"use client"

import Link from "next/link"
import { UserRole } from "@prisma/client"
import {
  Home,
  LayoutDashboard,
  Calendar,
  ShoppingBag,
  Shield,
  User,
  Settings,
  BookOpen,
  Images,
  MessageSquare,
  Star,
  Package,
  PenTool,
  Users,
  Download,
} from "lucide-react"

import { DashboardSignOutButton } from "@/components/DashboardSignOutButton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SidebarItem {
  href: string
  label: string
  icon: React.ElementType
  badge?: string
}

interface SidebarGroup {
  label: string
  items: SidebarItem[]
}

const userGroups: SidebarGroup[] = [
  {
    label: "My Account",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard?tab=appointments", label: "My Bookings", icon: Calendar },
      { href: "/dashboard?tab=orders", label: "My Orders", icon: ShoppingBag },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
  {
    label: "Explore",
    items: [
      { href: "/h/appointment", label: "Book a Session", icon: Calendar },
      { href: "/h/shop", label: "Shop", icon: Package },
      { href: "/h/blogs", label: "Blog", icon: BookOpen },
      { href: "/h/resources", label: "Resources", icon: Download },
    ],
  },
]

const adminGroups: SidebarGroup[] = [
  {
    label: "Admin Tools",
    items: [
      { href: "/admin", label: "Admin Panel", icon: Shield },
      { href: "/admin?tab=users", label: "Manage Users", icon: Users },
      { href: "/admin?tab=appointments", label: "Appointments", icon: Calendar },
      { href: "/admin?tab=orders", label: "Orders", icon: ShoppingBag },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin?tab=blog-create", label: "Create Blog Post", icon: PenTool },
      { href: "/admin?tab=blog-manage", label: "Manage Blog", icon: BookOpen },
      { href: "/admin?tab=shop-add", label: "Add Product", icon: Package },
      { href: "/admin?tab=gallery", label: "Gallery", icon: Images },
      { href: "/admin?tab=testimonials", label: "Testimonials", icon: Star },
      { href: "/admin?tab=resources", label: "Resources", icon: Download },
    ],
  },
  {
    label: "Communication",
    items: [
      { href: "/admin?tab=contact", label: "Contact Messages", icon: MessageSquare },
      { href: "/admin?tab=homepage", label: "Homepage CMS", icon: Home },
    ],
  },
]

function NavGroup({ group }: { group: SidebarGroup }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-semibold text-primary-500 uppercase tracking-widest px-2 mb-1.5">
        {group.label}
      </div>
      <div className="space-y-0.5">
        {group.items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start text-primary-800 hover:bg-primary-100 hover:text-primary-900 h-9 px-2 text-sm font-normal"
            >
              <item.icon className="w-4 h-4 mr-2 shrink-0 text-primary-500" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs h-4 px-1">
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function DashboardSidebar({
  role,
  email,
  name,
}: {
  role: UserRole
  email?: string | null
  name?: string | null
}) {
  const isAdmin = role === UserRole.ADMIN

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="md:sticky md:top-6 rounded-2xl border border-primary-200 bg-white/90 backdrop-blur shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary-800 to-amber-700 px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-white font-semibold truncate text-sm">
                {name || email?.split("@")[0] || "User"}
              </div>
              <div className="text-white/70 text-xs truncate">{email || ""}</div>
              <div className="mt-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs text-white">
                  {isAdmin ? (
                    <><Shield className="w-3 h-3" /> Admin</>
                  ) : (
                    <><User className="w-3 h-3" /> {role}</>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="p-3">
          {userGroups.map((g) => (
            <NavGroup key={g.label} group={g} />
          ))}

          {isAdmin && (
            <>
              <div className="border-t border-primary-100 my-3" />
              <div className="text-xs font-bold text-amber-600 uppercase tracking-widest px-2 mb-2 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Admin Zone
              </div>
              {adminGroups.map((g) => (
                <NavGroup key={g.label} group={g} />
              ))}
            </>
          )}

          {/* Footer */}
          <div className="border-t border-primary-100 pt-3 mt-2 space-y-0.5">
            <Link href="/h">
              <Button variant="ghost" className="w-full justify-start text-primary-800 hover:bg-primary-100 h-9 px-2 text-sm font-normal">
                <Home className="w-4 h-4 mr-2 shrink-0 text-primary-500" />
                Back to Website
              </Button>
            </Link>
            <DashboardSignOutButton />
          </div>
        </div>
      </div>
    </aside>
  )
}
