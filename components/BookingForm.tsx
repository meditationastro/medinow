"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"

export const sessionTypes = [
  {
    type: "Vedic astrology reading",
    duration: "60 min",
    priceNPR: "NPR 2500",
    priceUSD: "USD 25",
    description: "Complete birth chart analysis and life guidance",
  },
  {
    type: "Meditation guidance (online)",
    duration: "45 min",
    priceNPR: "NPR 1800",
    priceUSD: "USD 18",
    description: "Personalized meditation techniques and practices",
  },
  {
    type: "Spiritual life counselling",
    duration: "60 min",
    priceNPR: "NPR 2000",
    priceUSD: "USD 20",
    description: "Life purpose guidance and spiritual direction",
  },
  {
    type: "Personalized rituals & remedies",
    duration: "30 min",
    priceNPR: "NPR 1000",
    priceUSD: "USD 10",
    description: "Custom rituals and remedial solutions",
  },
]

interface BookingFormProps {
  variant?: "normal" | "modal"
  triggerButton?: React.ReactNode
}

interface FormData {
  sessionType: string
  name: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  dateOfBirth: string
  timeOfBirth: string
  placeOfBirth: string
  message: string
}

interface FormContentProps {
  formData: FormData
  isLoading: boolean
  formRef: React.RefObject<HTMLFormElement>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

const FormContent: React.FC<FormContentProps> = ({
  formData,
  isLoading,
  formRef,
  onSubmit,
  onChange
}) => (
  <form ref={formRef as React.LegacyRef<HTMLFormElement>} onSubmit={onSubmit} className="space-y-6">
    {/* Personal Information */}
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-primary-800 mb-2">
          Full Name *
        </label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={onChange}
          placeholder="Your full name"
          className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary-800 mb-2">
          Email *
        </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="your@email.com"
          className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
          required
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-primary-800 mb-2">
        Phone / WhatsApp *
      </label>
      <input
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={onChange}
        placeholder="+977 9841647283"
        className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
        required
      />
    </div>

    {/* Session Details */}
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-primary-800 mb-2">
          Preferred Session Type *
        </label>
        <select
          name="sessionType"
          value={formData.sessionType}
          onChange={onChange}
          className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
          required
        >
          <option value="">Select session type</option>
          {sessionTypes.map((session, index) => (
            <option key={index} value={session.type}>
              {session.type} - {session.duration} - {session.priceUSD}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-primary-800 mb-2">
          Preferred Date *
        </label>
        <input
          name="preferredDate"
          type="date"
          value={formData.preferredDate}
          onChange={onChange}
          className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
          required
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-primary-800 mb-2">
        Preferred Time *
      </label>
      <input
        name="preferredTime"
        type="time"
        value={formData.preferredTime}
        onChange={onChange}
        className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
        required
      />
    </div>

    {/* Birth Details for Astrology */}
    <div className="bg-primary-50 p-6 rounded-lg border border-secondary-200">
      <h3 className="text-lg font-semibold text-primary-900 mb-4">
        Birth Details (Required for Astrology Sessions)
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary-800 mb-2">Date of Birth</label>
          <input
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={onChange}
            className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary-800 mb-2">Time of Birth</label>
          <input
            name="timeOfBirth"
            type="time"
            value={formData.timeOfBirth}
            onChange={onChange}
            className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary-800 mb-2">Place of Birth</label>
          <input
            name="placeOfBirth"
            type="text"
            value={formData.placeOfBirth}
            onChange={onChange}
            placeholder="City, Country"
            className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>
    </div>

    {/* Message */}
    <div>
      <label className="block text-sm font-medium text-primary-800 mb-2">
        Message / Special Request
      </label>
      <textarea
        name="message"
        value={formData.message}
        onChange={onChange}
        rows={4}
        placeholder="Share any preferences, notes, or questions you may have"
        className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
      ></textarea>
    </div>

    {/* Submit Button */}
    <div className="text-center pt-6">
      <Button
        type="submit"
        size="lg"
        className="bg-primary-800 hover:bg-primary-900 text-primary-50 px-12 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Appointment Request"}
      </Button>
    </div>
  </form>
)

export function BookingForm({ variant = "normal", triggerButton }: BookingFormProps) {
  const [formData, setFormData] = useState({
    sessionType: "",
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    message: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit booking")
      }

      toast.success(result.message || "Booking request submitted successfully!")
      setFormData({
        sessionType: "",
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        dateOfBirth: "",
        timeOfBirth: "",
        placeOfBirth: "",
        message: ""
      })
      if (formRef.current) {
        formRef.current.reset()
      }
    } catch (error) {
      console.error("Booking error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to submit booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {triggerButton || (
            <Button className="bg-primary-800 hover:bg-primary-900 text-primary-50">Book Appointment</Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-primary-50">
          <DialogHeader>
            <DialogTitle>Book Your Session</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <FormContent
              formData={formData}
              isLoading={isLoading}
              formRef={formRef}
              onSubmit={handleSubmit}
              onChange={handleInputChange}
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary-200 shadow-2xl">
      <CardContent className="p-8">
        <FormContent
          formData={formData}
          isLoading={isLoading}
          formRef={formRef}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
        />
      </CardContent>
    </Card>
  )
} 