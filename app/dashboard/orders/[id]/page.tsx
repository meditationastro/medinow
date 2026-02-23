"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { CreditCard, MessageCircle, ArrowLeft } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { redirectToWhatsApp } from "@/lib/whatsapp"

type Order = {
  id: string
  fullName: string
  email: string
  phone?: string | null
  notes?: string | null
  status: string
  paymentProvider?: string
  paymentStatus?: string
  currency: string
  total: number
  createdAt: string
  items: Array<{ id: string; productTitle: string; versionTitle?: string | null; quantity: number; unitPrice: number; lineTotal: number }>
}

export default function OrderDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/orders/${id}`, { cache: "no-store" })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data?.error || "Failed to load order")
        setOrder(data)
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load order")
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  const payNow = async () => {
    if (!order) return
    try {
      setPaying(true)
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, email: order.email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Could not start payment")
      if (data?.url) window.location.href = data.url
      else throw new Error("Payment URL missing")
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Payment failed")
    } finally {
      setPaying(false)
    }
  }

  return (
    <div className="pb-10">
      <div className="mb-4">
        <Link href="/dashboard?tab=orders" className="inline-flex items-center text-primary-800 underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to orders
        </Link>
      </div>

      {loading ? (
        <div className="text-primary-700">Loading…</div>
      ) : order ? (
        <Card className="border-primary-200 bg-white/80 backdrop-blur">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <CardTitle className="text-primary-900">Order {order.id}</CardTitle>
                <CardDescription className="text-primary-700">
                  Placed on {new Date(order.createdAt).toLocaleString()}
                </CardDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant={order.status === "COMPLETED" ? "default" : "secondary"}>{order.status}</Badge>
                <Badge variant={order.paymentStatus === "PAID" ? "default" : "secondary"}>
                  {order.paymentProvider || "NONE"} · {order.paymentStatus || "UNPAID"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-primary-200 bg-white p-4">
              <div className="text-sm text-primary-700">Customer</div>
              <div className="font-semibold text-primary-900">{order.fullName}</div>
              <div className="text-primary-700 text-sm">{order.email}</div>
              {order.phone ? <div className="text-primary-700 text-sm">{order.phone}</div> : null}
            </div>

            <div className="rounded-xl border border-primary-200 bg-white p-4">
              <div className="text-sm text-primary-700 mb-2">Items</div>
              <div className="space-y-2">
                {order.items.map((it) => (
                  <div key={it.id} className="flex justify-between gap-3 text-sm">
                    <div className="text-primary-900">
                      {it.productTitle}{it.versionTitle ? ` (${it.versionTitle})` : ""} ×{it.quantity}
                    </div>
                    <div className="text-primary-900 font-semibold">
                      {order.currency} {it.lineTotal.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-primary-100 flex justify-between">
                <div className="text-primary-700">Total</div>
                <div className="text-primary-900 font-bold">{order.currency} {order.total.toFixed(2)}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {order.paymentStatus !== "PAID" ? (
                <Button onClick={payNow} disabled={paying} className="bg-primary-800 hover:bg-primary-900">
                  <CreditCard className="w-4 h-4 mr-2" /> {paying ? "Redirecting…" : "Pay online"}
                </Button>
              ) : null}
              <Button
                variant="outline"
                className="border-primary-200"
                onClick={() => redirectToWhatsApp(`Hello! I want an update on my order ${order.id} (${order.email}).`) }
              >
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp support
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-primary-700">Order not found.</div>
      )}
    </div>
  )
}
