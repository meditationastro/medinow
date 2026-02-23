import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { UserRole } from "@prisma/client"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    if (session.user.role !== UserRole.ADMIN) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("[USERS_GET]", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
