import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { OrderStatus, PaymentProvider, PaymentStatus, UserRole } from "@prisma/client"
import { sendNewOrderEmailToOwner, sendOrderConfirmationEmailToCustomer } from "@/lib/mail"

export const dynamic = "force-dynamic"

type OrderItemInput = {
  productId?: string
  productTitle: string
  versionTitle?: string
  unitPrice: number
  quantity: number
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

const userId = session.user.id
const userEmail = session.user.email

if (session.user.role !== UserRole.ADMIN && !userId && !userEmail) {
  return NextResponse.json({ error: "User identity missing" }, { status: 400 })
}

// Admin: all orders. User: only theirs by userId/email.
const where =
  session.user.role === UserRole.ADMIN
    ? undefined
    : {
        OR: [
          ...(userId ? [{ userId }] : []),
          ...(userEmail ? [{ email: userEmail as string }] : []),
        ],
      }

    const orders = await db.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: "desc" },
    })

    const res = NextResponse.json(orders)
    res.headers.set("Cache-Control", "no-store, max-age=0")
    return res
  } catch (error) {
    console.error("[ORDERS_GET]", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, email, phone, notes, currency, items, paymentProvider } = body as {
      fullName: string
      email: string
      phone?: string
      notes?: string
      currency?: string
      items: OrderItemInput[]
      paymentProvider?: PaymentProvider | "STRIPE" | "MANUAL" | "NONE"
    }

    if (!fullName || !email || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const computedItems = items.map((it) => {
      const qty = Math.max(1, Number(it.quantity) || 1)
      const unit = Math.max(0, Number(it.unitPrice) || 0)
      const lineTotal = Number((qty * unit).toFixed(2))
      return {
        productId: it.productId,
        productTitle: it.productTitle,
        versionTitle: it.versionTitle,
        unitPrice: unit,
        quantity: qty,
        lineTotal,
      }
    })

    const total = Number(
      computedItems.reduce((sum, it) => sum + it.lineTotal, 0).toFixed(2)
    )

    // Link to a logged-in user if present
    const session = await auth()
    const userId = session?.user?.id

    const provider: PaymentProvider =
      paymentProvider === "STRIPE"
        ? PaymentProvider.STRIPE
        : paymentProvider === "MANUAL"
          ? PaymentProvider.MANUAL
          : PaymentProvider.NONE

    const initialStatus = provider === PaymentProvider.STRIPE ? OrderStatus.PENDING_PAYMENT : OrderStatus.PENDING
    const initialPaymentStatus = provider === PaymentProvider.STRIPE ? PaymentStatus.UNPAID : PaymentStatus.UNPAID

    const order = await db.order.create({
      data: {
        fullName,
        email,
        phone,
        notes,
        currency: currency || "USD",
        total,
        status: initialStatus,
        paymentProvider: provider,
        paymentStatus: initialPaymentStatus,
        userId,
        items: {
          create: computedItems,
        },
      },
      include: { items: true },
    })

    // Fire-and-forget emails (do not fail the order if mail fails)
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
      console.error("[ORDERS_EMAIL]", mailErr)
    }

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("[ORDERS_POST]", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
