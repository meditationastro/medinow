"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { CreditCard, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Version = { id: string; title: string; price: number }

type Product = {
  id: string
  title: string
  image: string
  versions: Version[]
}

export function OrderDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [versionId, setVersionId] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const [paymentMethod, setPaymentMethod] = useState<"MANUAL" | "STRIPE">("MANUAL")
  const [submitting, setSubmitting] = useState(false)

  const selectedVersion = useMemo(() => {
    if (!product) return null
    return product.versions.find((v) => v.id === versionId) || product.versions[0] || null
  }, [product, versionId])

  const total = useMemo(() => {
    const unit = selectedVersion?.price ?? 0
    const qty = Math.max(1, Number(quantity) || 1)
    return Number((unit * qty).toFixed(2))
  }, [selectedVersion, quantity])

  const canSubmit = useMemo(() => {
    if (!product) return false
    return fullName.trim() && email.trim() && selectedVersion
  }, [product, fullName, email, selectedVersion])

  const reset = () => {
    setFullName("")
    setEmail("")
    setPhone("")
    setNotes("")
    setQuantity(1)
    setVersionId("")
    setPaymentMethod("MANUAL")
  }

  const submit = async () => {
    if (!product || !selectedVersion) return
    try {
      setSubmitting(true)
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          notes,
          currency: "USD",
          paymentProvider: paymentMethod,
          items: [
            {
              productId: product.id,
              productTitle: product.title,
              versionTitle: selectedVersion.title,
              unitPrice: selectedVersion.price,
              quantity: Math.max(1, Number(quantity) || 1),
            },
          ],
        }),
      })
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}))
        throw new Error(msg?.error || "Failed to place order")
      }

      const payload = await res.json().catch(() => ({}))
      const createdOrderId = payload?.order?.id as string | undefined

      if (paymentMethod === "STRIPE") {
        if (!createdOrderId) throw new Error("Order created but missing id")
        const checkoutRes = await fetch("/api/checkout/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: createdOrderId, email }),
        })
        const checkoutData = await checkoutRes.json().catch(() => ({}))
        if (!checkoutRes.ok) {
          throw new Error(checkoutData?.error || "Could not start online payment")
        }
        if (checkoutData?.url) {
          toast.success("Redirecting to secure payment…")
          window.location.href = checkoutData.url
          return
        }
        throw new Error("Stripe checkout URL missing")
      }

      toast.success("Order submitted! We'll contact you soon.")
      onOpenChange(false)
      reset()
    } catch (e) {
      console.error(e)
      toast.error(e instanceof Error ? e.message : "Failed to place order")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset(); }}>
      <DialogContent className="max-w-2xl border-primary-200 bg-primary-50">
        <DialogHeader>
          <DialogTitle className="text-primary-900">Place Order</DialogTitle>
        </DialogHeader>
        {product ? (
          <div className="grid gap-5">
            <div className="flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-md overflow-hidden border border-primary-200">
                <Image src={product.image} alt={product.title} fill className="object-cover" />
              </div>
              <div>
                <div className="font-semibold text-primary-900">{product.title}</div>
                <div className="text-sm text-primary-700">Total: USD {total.toFixed(2)}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-primary-800">Full Name *</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="border-primary-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-primary-800">Email *</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="border-primary-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-primary-800">Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="border-primary-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-primary-800">Version</Label>
                <Select value={versionId || (product.versions[0]?.id ?? "")} onValueChange={setVersionId}>
                  <SelectTrigger className="border-primary-200">
                    <SelectValue placeholder="Choose a version" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-primary-200">
                    {product.versions.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.title} — USD {v.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-primary-800">Quantity</Label>
                <Input type="number" value={quantity} min={1} onChange={(e) => setQuantity(Number(e.target.value) || 1)} className="border-primary-200" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-primary-800">Notes</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="border-primary-200" placeholder="Anything you'd like to add (delivery, questions, etc.)" />
            </div>

            <div className="rounded-xl border border-primary-200 bg-white p-4">
              <div className="text-sm font-semibold text-primary-900 mb-3">Payment method</div>
              <div className="grid sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("MANUAL")}
                  className={`rounded-lg border px-3 py-3 text-left transition ${paymentMethod === "MANUAL" ? "border-primary-500 bg-primary-50" : "border-primary-200 bg-white hover:bg-primary-50"}`}
                >
                  <div className="flex items-center gap-2 font-medium text-primary-900"><MessageCircle className="w-4 h-4" /> WhatsApp / Manual</div>
                  <div className="text-xs text-primary-700 mt-1">Pay via WhatsApp instructions or bank transfer.</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("STRIPE")}
                  className={`rounded-lg border px-3 py-3 text-left transition ${paymentMethod === "STRIPE" ? "border-primary-500 bg-primary-50" : "border-primary-200 bg-white hover:bg-primary-50"}`}
                >
                  <div className="flex items-center gap-2 font-medium text-primary-900"><CreditCard className="w-4 h-4" /> Pay Online</div>
                  <div className="text-xs text-primary-700 mt-1">Secure card payment (Stripe).</div>
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="border-primary-200">Cancel</Button>
              <Button onClick={submit} disabled={!canSubmit || submitting} className="bg-primary-800 hover:bg-primary-900">
                {submitting ? "Submitting..." : "Submit Order"}
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
