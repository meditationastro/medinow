import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const orderId = url.searchParams.get("orderId")
    const email = url.searchParams.get("email")

    if (!orderId || !email) {
      return NextResponse.json({ error: "Missing orderId or email" }, { status: 400 })
    }

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    })

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 })
    if (order.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ error: "Order email does not match" }, { status: 403 })
    }

    const res = NextResponse.json({
      id: order.id,
      fullName: order.fullName,
      email: order.email,
      status: order.status,
      paymentProvider: order.paymentProvider,
      paymentStatus: order.paymentStatus,
      currency: order.currency,
      total: order.total,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.items.map((it) => ({
        productTitle: it.productTitle,
        versionTitle: it.versionTitle,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        lineTotal: it.lineTotal,
      })),
    })
    res.headers.set("Cache-Control", "no-store, max-age=0")
    return res
  } catch (error) {
    console.error("[ORDER_TRACK]", error)
    return NextResponse.json({ error: "Failed to track order" }, { status: 500 })
  }
}
