import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await params
    const order = await db.order.findUnique({
      where: { id },
      include: { items: true },
    })

    if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 })

    if (
      session.user.role !== "ADMIN" &&
      order.userId !== session.user.id &&
      order.email !== session.user.email
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("[ORDER_GET]", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const { id } = await params
    await db.order.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[ORDER_DELETE]", error)
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 })
  }
}
