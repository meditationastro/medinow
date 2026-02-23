"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { PackageSearch, RefreshCcw, MessageCircle, ShieldCheck } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { redirectToWhatsApp } from "@/lib/whatsapp"

type TrackedOrder = {
  id: string
  fullName: string
  email: string
  status: string
  paymentProvider?: string
  paymentStatus?: string
  currency: string
  total: number
  createdAt: string
  updatedAt: string
  items: Array<{ productTitle: string; versionTitle?: string | null; quantity: number; unitPrice: number; lineTotal: number }>
}

export default function OrderTrackingPage() {
  const sp = useSearchParams()
  const [orderId, setOrderId] = useState(sp.get("orderId") || "")
  const [email, setEmail] = useState(sp.get("email") || "")
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<TrackedOrder | null>(null)

  const paidFlag = sp.get("paid")
  const cancelledFlag = sp.get("cancelled")

  useEffect(() => {
    if (paidFlag) toast.success("Payment received — thank you!")
    if (cancelledFlag) toast.message("Payment cancelled. You can retry anytime.")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canSearch = useMemo(() => orderId.trim().length > 5 && email.includes("@"), [orderId, email])

  const track = async () => {
    try {
      setLoading(true)
      setOrder(null)
      const res = await fetch(`/api/orders/track?orderId=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`, { cache: "no-store" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Could not find that order")
      setOrder(data)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to track order")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-white/70 border border-primary-200 flex items-center justify-center">
              <PackageSearch className="w-5 h-5 text-primary-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary-900">Order Tracking</h1>
              <p className="text-primary-700">Check your order status using your Order ID and email.</p>
            </div>
          </div>

          <Card className="border-primary-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-primary-900">Find your order</CardTitle>
              <CardDescription className="text-primary-700">Tip: you can copy the Order ID from your confirmation email.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-primary-800">Order ID</label>
                  <Input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g. clx..." className="border-primary-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-primary-800">Email</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="border-primary-200" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <Button onClick={track} disabled={!canSearch || loading} className="bg-primary-800 hover:bg-primary-900">
                  {loading ? (
                    <span className="inline-flex items-center gap-2"><RefreshCcw className="w-4 h-4 animate-spin" /> Checking…</span>
                  ) : (
                    "Track order"
                  )}
                </Button>
                <Link href="/dashboard" className="text-primary-800 underline text-sm inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Log in to your dashboard
                </Link>
              </div>
            </CardContent>
          </Card>

          {order ? (
            <Card className="mt-6 border-primary-200 bg-white/80 backdrop-blur">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <CardTitle className="text-primary-900">Order {order.id}</CardTitle>
                    <CardDescription className="text-primary-700">
                      Placed on {new Date(order.createdAt).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
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
                </div>

                <div className="rounded-xl border border-primary-200 bg-white p-4">
                  <div className="text-sm text-primary-700 mb-2">Items</div>
                  <div className="space-y-2">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between gap-3 text-sm">
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
                  <Button
                    className="bg-success-500 hover:bg-success-600 text-white"
                    onClick={() => redirectToWhatsApp(`Hello! I want an update on my order ${order.id} (${order.email}).`) }
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp support
                  </Button>
                  <Link href="/h/shop" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full border-primary-200">Continue shopping</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  )
}
