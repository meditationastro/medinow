import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { UserRole } from "@prisma/client"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    if (session.user.role !== UserRole.ADMIN) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const { id } = await params
    const { role } = await req.json()

    if (!role || !Object.values(UserRole).includes(role as UserRole)) {
      return NextResponse.json({ error: "Invalid role. Must be ADMIN or USER." }, { status: 400 })
    }

    // Prevent admins from revoking their own admin role
    if (id === session.user.id && role === UserRole.USER) {
      return NextResponse.json({ error: "You cannot revoke your own admin role." }, { status: 400 })
    }

    const updated = await db.user.update({
      where: { id },
      data: { role: role as UserRole },
      select: { id: true, name: true, email: true, role: true },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("[USER_ROLE_PATCH]", error)
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 })
  }
}
