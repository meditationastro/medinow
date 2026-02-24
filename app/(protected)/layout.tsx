"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { UserRole } from "@prisma/client"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/auth/login")
      return
    }
    if (session.user?.role !== UserRole.ADMIN) {
      router.push("/h")
      return
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== UserRole.ADMIN) {
    return null
  }

  return <>{children}</>
}
