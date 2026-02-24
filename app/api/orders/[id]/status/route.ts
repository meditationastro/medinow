import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"

const VALID_ORDER_STATUSES = ["PENDING", "PENDING_PAYMENT", "CONFIRMED", "SHIPPED", "COMPLETED", "CANCELLED"]

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const { id } = await params
    const { status } = await req.json()

    if (!status || !VALID_ORDER_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updated = await db.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("[ORDER_STATUS_PATCH]", error)
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 })
  }
}
