import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { isStripeEnabled, stripe } from "@/lib/stripe"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    if (!isStripeEnabled()) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please use WhatsApp / manual payment." },
        { status: 400 }
      )
    }

    const body = await req.json().catch(() => ({}))
    const { orderId, email } = body as { orderId?: string; email?: string }
    if (!orderId || !email) {
      return NextResponse.json({ error: "Missing orderId or email" }, { status: 400 })
    }

    const order = await db.order.findUnique({ where: { id: orderId }, include: { items: true } })
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 })
    if (order.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ error: "Order email does not match" }, { status: 403 })
    }

    const session = await auth()
    if (session?.user?.id && order.userId && session.user.id !== order.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = order.items.map((it) => ({
      quantity: it.quantity,
      price_data: {
        currency: (order.currency || "USD").toLowerCase(),
        unit_amount: Math.round(it.unitPrice * 100),
        product_data: {
          name: it.versionTitle ? it.productTitle + " (" + it.versionTitle + ")" : it.productTitle,
        },
      },
    }))

    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: order.email,
      line_items,
      metadata: { orderId: order.id },
      success_url: appUrl + "/h/order-tracking?orderId=" + encodeURIComponent(order.id) + "&email=" + encodeURIComponent(order.email) + "&paid=1",
      cancel_url: appUrl + "/h/order-tracking?orderId=" + encodeURIComponent(order.id) + "&email=" + encodeURIComponent(order.email) + "&cancelled=1",
    })

    await db.order.update({
      where: { id: order.id },
      data: {
        paymentProvider: "STRIPE",
        stripeSessionId: checkout.id,
      },
    })

    return NextResponse.json({ url: checkout.url })
  } catch (error) {
    console.error("[STRIPE_CHECKOUT]", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
