"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Header } from "@/components/home/Header"
import { UserRole } from "@prisma/client"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/login")
      return
    }

    // Check if user has admin role
    if (session.user?.role !== UserRole.ADMIN) {
      router.push("/")
      return
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100/80">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-amber-800">Loading...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100/80">
      <Header />
      <main className="pt-4">
        {children}
      </main>
    </div>
  )
}
