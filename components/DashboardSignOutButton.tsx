"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function DashboardSignOutButton({ callbackUrl = "/h" }: { callbackUrl?: string }) {
  return (
    <Button
      variant="destructive"
      onClick={() => signOut({ callbackUrl })}
      className="w-full justify-start"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Sign out
    </Button>
  )
}
