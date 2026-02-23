import Link from "next/link"
import { UserRole } from "@prisma/client"
import { Home, LayoutDashboard, Calendar, ShoppingBag, Shield } from "lucide-react"

import { DashboardSignOutButton } from "@/components/DashboardSignOutButton"
import { Button } from "@/components/ui/button"

export function DashboardSidebar({
  role,
  email,
}: {
  role: UserRole
  email?: string | null
}) {
  return (
    <aside className="w-full md:w-72 shrink-0">
      <div className="md:sticky md:top-6 rounded-2xl border border-primary-200 bg-white/80 backdrop-blur p-4">
        <div className="mb-4">
          <div className="text-sm text-primary-700">Signed in as</div>
          <div className="font-semibold text-primary-900 truncate">{email || "User"}</div>
          <div className="text-xs text-primary-700 mt-1">Role: {role}</div>
        </div>

        <div className="space-y-2">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full justify-start border-primary-200">
              <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
            </Button>
          </Link>
          <Link href="/dashboard?tab=appointments">
            <Button variant="outline" className="w-full justify-start border-primary-200">
              <Calendar className="w-4 h-4 mr-2" /> Bookings
            </Button>
          </Link>
          <Link href="/dashboard?tab=orders">
            <Button variant="outline" className="w-full justify-start border-primary-200">
              <ShoppingBag className="w-4 h-4 mr-2" /> Orders
            </Button>
          </Link>

          {role === UserRole.ADMIN ? (
            <Link href="/admin">
              <Button className="w-full justify-start bg-primary-800 hover:bg-primary-900">
                <Shield className="w-4 h-4 mr-2" /> Admin Panel
              </Button>
            </Link>
          ) : null}

          <div className="pt-2">
            <Link href="/h">
              <Button variant="outline" className="w-full justify-start border-primary-200">
                <Home className="w-4 h-4 mr-2" /> Website
              </Button>
            </Link>
          </div>

          <DashboardSignOutButton />
        </div>
      </div>
    </aside>
  )
}
