"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, ShoppingBag, ExternalLink } from "lucide-react"

type Appointment = {
  id: string
  name: string
  email: string
  phone: string
  sessionType: string
  preferredDate: string
  preferredTime: string
  status: string
  createdAt: string
}

type Order = {
  id: string
  fullName: string
  email: string
  status: string
  total: number
  currency: string
  createdAt: string
  items: Array<{ id: string; productTitle: string; versionTitle?: string | null; quantity: number }>
}

export default function DashboardPage() {
  const sp = useSearchParams()
  const initialTab = sp.get("tab") === "orders" ? "orders" : "appointments"
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingAppointments, setLoadingAppointments] = useState(true)
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingAppointments(true)
        const res = await fetch("/api/appointments", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to load appointments")
        const data = await res.json()
        setAppointments(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
        toast.error("Could not load appointments")
      } finally {
        setLoadingAppointments(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingOrders(true)
        const res = await fetch("/api/orders", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to load orders")
        const data = await res.json()
        setOrders(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
        toast.error("Could not load orders")
      } finally {
        setLoadingOrders(false)
      }
    }
    load()
  }, [])

  return (
    <div className="pb-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary-900">Dashboard</h1>
          <p className="text-primary-700 mt-1">Track your bookings and shop orders in one place.</p>
        </div>

        <Tabs defaultValue={initialTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 gap-2 bg-primary-100 text-primary-900">
            <TabsTrigger value="appointments" className="gap-2">
              <Calendar className="w-4 h-4" /> Bookings
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="w-4 h-4" /> Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-6">
            <Card className="border-primary-200">
              <CardHeader>
                <CardTitle className="text-primary-900">Your Appointment Requests</CardTitle>
                <CardDescription className="text-primary-700">
                  These are the bookings you submitted (matched by your account email).
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingAppointments ? (
                  <div className="py-8 text-primary-700">Loading...</div>
                ) : appointments.length === 0 ? (
                  <div className="py-8 text-primary-700">
                    No bookings yet. <Link href="/h/appointment" className="underline">Book a session</Link>.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Session</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((a) => (
                          <TableRow key={a.id}>
                            <TableCell className="text-primary-700">{new Date(a.createdAt).toLocaleString()}</TableCell>
                            <TableCell className="font-medium text-primary-900">{a.sessionType}</TableCell>
                            <TableCell className="text-primary-700">
                              {new Date(a.preferredDate).toLocaleDateString()} at {a.preferredTime}
                            </TableCell>
                            <TableCell>
                              <Badge variant={a.status === "CONFIRMED" ? "default" : "secondary"}>
                                {a.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card className="border-primary-200">
              <CardHeader>
                <CardTitle className="text-primary-900">Your Orders</CardTitle>
                <CardDescription className="text-primary-700">
                  Orders placed from the shop will appear here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingOrders ? (
                  <div className="py-8 text-primary-700">Loading...</div>
                ) : orders.length === 0 ? (
                  <div className="py-8 text-primary-700">
                    No orders yet. <Link href="/h/shop" className="underline">Browse the shop</Link>.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((o) => (
                          <TableRow key={o.id}>
                            <TableCell className="text-primary-700">{new Date(o.createdAt).toLocaleString()}</TableCell>
                            <TableCell className="text-primary-900">
                              {o.items
                                .map((it) => `${it.productTitle}${it.versionTitle ? ` (${it.versionTitle})` : ""} ×${it.quantity}`)
                                .join(", ")}
                            </TableCell>
                            <TableCell>
                              <Badge variant={o.status === "COMPLETED" ? "default" : "secondary"}>{o.status}</Badge>
                            </TableCell>
                            <TableCell className="font-semibold text-primary-900 flex items-center gap-2">
                              {o.currency} {o.total.toFixed(2)}
                              <Link href={`/dashboard/orders/${o.id}`} className="inline-flex items-center text-primary-800 underline">
                                Details <ExternalLink className="w-3 h-3 ml-1" />
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </div>
  )
}
