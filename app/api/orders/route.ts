import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { OrderStatus, PaymentStatus, UserRole } from "@prisma/client"
import { sendNewOrderEmailToOwner, sendOrderConfirmationEmailToCustomer } from "@/lib/mail"

export const dynamic = "force-dynamic"

type PaymentProviderInput = "STRIPE" | "MANUAL" | "NONE"

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
      paymentProvider?: PaymentProviderInput
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

    const session = await auth()
    const userId = session?.user?.id

    // Use string literals instead of enum to avoid stale Prisma client issues
    const provider: PaymentProviderInput =
      paymentProvider === "STRIPE" ? "STRIPE"
      : paymentProvider === "MANUAL" ? "MANUAL"
      : "NONE"

    const initialStatus: OrderStatus =
      provider === "STRIPE" ? OrderStatus.PENDING_PAYMENT : OrderStatus.PENDING

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
        paymentStatus: PaymentStatus.UNPAID,
        userId,
        items: {
          create: computedItems,
        },
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
      console.error("[ORDERS_EMAIL]", mailErr)
    }

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("[ORDERS_POST]", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
