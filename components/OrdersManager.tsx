"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Trash2, Eye } from "lucide-react"

type OrderItem = {
  id: string
  productTitle: string
  versionTitle?: string | null
  unitPrice: number
  quantity: number
  lineTotal: number
}

type Order = {
  id: string
  fullName: string
  email: string
  phone?: string | null
  status: string
  paymentProvider?: string | null
  paymentStatus?: string | null
  total: number
  currency: string
  createdAt: string
  notes?: string | null
  items: OrderItem[]
}

const STATUSES = ["PENDING", "PENDING_PAYMENT", "CONFIRMED", "SHIPPED", "COMPLETED", "CANCELLED"]

export function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Order | null>(null)
  const [open, setOpen] = useState(false)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/orders", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      toast.error("Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const statusBadgeVariant = useMemo(() => {
    return (status: string) => {
      switch (status) {
        case "PENDING":
          return "secondary"
        case "PENDING_PAYMENT":
          return "secondary"
        case "CONFIRMED":
          return "default"
        case "SHIPPED":
          return "outline"
        case "COMPLETED":
          return "default"
        case "CANCELLED":
          return "destructive"
        default:
          return "secondary"
      }
    }
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed")
      toast.success("Order updated")
      await fetchOrders()
      if (selected?.id === id) {
        const updated = await res.json()
        setSelected(updated)
      }
    } catch (e) {
      console.error(e)
      toast.error("Failed to update status")
    }
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this order? This cannot be undone.")) return
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed")
      toast.success("Order deleted")
      setOpen(false)
      setSelected(null)
      await fetchOrders()
    } catch (e) {
      console.error(e)
      toast.error("Failed to delete order")
    }
  }

  const openDetails = (o: Order) => {
    setSelected(o)
    setOpen(true)
  }

  return (
    <Card className="border-primary-200">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-primary-900">Orders</CardTitle>
          <CardDescription className="text-primary-700">
            View, update, and manage customer orders.
          </CardDescription>
        </div>
        <Button variant="outline" onClick={fetchOrders} className="border-primary-200 text-primary-800">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-primary-700">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="py-8 text-primary-700">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="text-primary-700">{new Date(o.createdAt).toLocaleString()}</TableCell>
                    <TableCell className="font-medium text-primary-900">{o.fullName}</TableCell>
                    <TableCell className="text-primary-700">{o.email}</TableCell>
                    <TableCell>
                      <Badge variant={statusBadgeVariant(o.status) as any}>{o.status}</Badge>
                    </TableCell>
                    <TableCell className="text-primary-700">
                      {(o.paymentProvider || "NONE").toString()} · {(o.paymentStatus || "UNPAID").toString()}
                    </TableCell>
                    <TableCell className="text-primary-900 font-semibold">
                      {o.currency} {o.total.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => openDetails(o)} className="border-primary-200">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto border-primary-200 bg-primary-50">
          <DialogHeader>
            <DialogTitle className="text-primary-900">Order Details</DialogTitle>
          </DialogHeader>
          {selected ? (
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-primary-700">Customer</div>
                  <div className="font-semibold text-primary-900">{selected.fullName}</div>
                </div>
                <div>
                  <div className="text-sm text-primary-700">Email</div>
                  <div className="font-semibold text-primary-900">{selected.email}</div>
                </div>
                <div>
                  <div className="text-sm text-primary-700">Phone</div>
                  <div className="text-primary-900">{selected.phone || "—"}</div>
                </div>
                <div>
                  <div className="text-sm text-primary-700">Placed</div>
                  <div className="text-primary-900">{new Date(selected.createdAt).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-primary-700">Payment</div>
                  <div className="text-primary-900">
                    {(selected.paymentProvider || "NONE").toString()} · {(selected.paymentStatus || "UNPAID").toString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-primary-700">Status</div>
                <div className="w-64">
                  <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v)}>
                    <SelectTrigger className="border-primary-200">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-primary-200">
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selected.notes ? (
                <div className="rounded-lg border border-primary-200 bg-white/70 p-3">
                  <div className="text-sm text-primary-700 mb-1">Notes</div>
                  <div className="text-primary-900 whitespace-pre-wrap">{selected.notes}</div>
                </div>
              ) : null}

              <div className="rounded-lg border border-primary-200 bg-white/70">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selected.items.map((it) => (
                      <TableRow key={it.id}>
                        <TableCell className="text-primary-900 font-medium">{it.productTitle}</TableCell>
                        <TableCell className="text-primary-700">{it.versionTitle || "—"}</TableCell>
                        <TableCell className="text-primary-700">{it.quantity}</TableCell>
                        <TableCell className="text-primary-700">{selected.currency} {it.unitPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-primary-900 font-semibold">{selected.currency} {it.lineTotal.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end p-4">
                  <div className="text-right">
                    <div className="text-sm text-primary-700">Order Total</div>
                    <div className="text-xl font-bold text-primary-900">{selected.currency} {selected.total.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="destructive" onClick={() => remove(selected.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Order
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
