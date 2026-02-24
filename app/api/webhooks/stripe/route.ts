import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { sendNewOrderEmailToOwner, sendOrderConfirmationEmailToCustomer } from "@/lib/mail"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature")
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!sig || !secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 })
  }

  const rawBody = await req.text()

  let event: any
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret)
  } catch (err) {
    console.error("[STRIPE_WEBHOOK_VERIFY]", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      const orderId = session?.metadata?.orderId

      if (orderId) {
        const order = await db.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: "PAID",
            status: "CONFIRMED",
            paidAt: new Date(),
          },
          include: { items: true },
        })

        try {
          const mailPayload = {
            orderId: order.id,
            fullName: order.fullName,
            email: order.email,
            phone: order.phone,
            notes: order.notes,
            currency: order.currency,
            total: order.total,
            status: order.status,
            paymentProvider: order.paymentProvider,
            paymentStatus: order.paymentStatus,
            items: order.items.map((it) => ({
              productTitle: it.productTitle,
              versionTitle: it.versionTitle,
              unitPrice: it.unitPrice,
              quantity: it.quantity,
              lineTotal: it.lineTotal,
            })),
          }
          await Promise.all([
            sendNewOrderEmailToOwner(mailPayload),
            sendOrderConfirmationEmailToCustomer(mailPayload),
          ])
        } catch (mailErr) {
          console.error("[STRIPE_WEBHOOK_EMAIL]", mailErr)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[STRIPE_WEBHOOK]", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
