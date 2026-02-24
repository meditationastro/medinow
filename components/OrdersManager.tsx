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
import { RefreshCw, Trash2, Eye, ShoppingBag, DollarSign, Clock, CheckCircle, Search, X } from "lucide-react"

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
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")

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

  // Stats
  const stats = useMemo(() => {
    const total = orders.length
    const revenue = orders.filter(o => ["CONFIRMED","SHIPPED","COMPLETED"].includes(o.status)).reduce((s, o) => s + o.total, 0)
    const pending = orders.filter(o => o.status === "PENDING" || o.status === "PENDING_PAYMENT").length
    const completed = orders.filter(o => o.status === "COMPLETED").length
    return { total, revenue, pending, completed }
  }, [orders])

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStatus = statusFilter === "ALL" || o.status === statusFilter
      const matchSearch = !search ||
        o.fullName.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase()) ||
        o.id.includes(search)
      return matchStatus && matchSearch
    })
  }, [orders, search, statusFilter])

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
          <CardTitle className="text-primary-900">Order Management</CardTitle>
          <CardDescription className="text-primary-700">
            View, update, search and manage all customer orders.
          </CardDescription>
        </div>
        <Button variant="outline" onClick={fetchOrders} className="border-primary-200 text-primary-800">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <div><div className="text-2xl font-bold text-blue-900">{stats.total}</div><div className="text-blue-600 text-xs">Total Orders</div></div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-600" />
            <div><div className="text-2xl font-bold text-green-900">${stats.revenue.toFixed(2)}</div><div className="text-green-600 text-xs">Revenue</div></div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <Clock className="w-8 h-8 text-amber-600" />
            <div><div className="text-2xl font-bold text-amber-900">{stats.pending}</div><div className="text-amber-600 text-xs">Pending</div></div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
            <div><div className="text-2xl font-bold text-emerald-900">{stats.completed}</div><div className="text-emerald-600 text-xs">Completed</div></div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
            <input type="text" placeholder="Search by name, email, order ID..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 border border-primary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" />
            {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400"><X className="w-4 h-4" /></button>}
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 border-primary-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        {loading ? (
          <div className="py-8 text-primary-700">Loading...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-8 text-primary-700">{orders.length === 0 ? "No orders yet." : "No orders match your search."}</div>
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
                {filteredOrders.map((o) => (
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
