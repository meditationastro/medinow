import { ReactNode } from "react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/DashboardSidebar"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <DashboardSidebar role={session.user.role} email={session.user.email} name={session.user.name} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}
