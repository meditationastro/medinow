"use client"

import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"

interface ContactFormFieldsProps {
  className?: string
}

export function ContactFormFields({ className }: ContactFormFieldsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFocus = (fieldName: string) => setFocusedField(fieldName)
  const handleBlur = () => setFocusedField(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      toast.success("Message sent successfully! We'll get back to you soon.")
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={`space-y-6 ${className}`} onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <label className={`block text-sm font-medium transition-colors duration-200 ${
            focusedField === 'fullName' ? 'text-primary-600' : 'text-primary-800'
          } mb-2`}>
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onFocus={() => handleFocus('fullName')}
            onBlur={handleBlur}
            className="form-input w-full px-4 py-3 rounded-lg bg-white/70 border-2 border-primary-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-500 transition-all duration-200"
            placeholder="Your full name"
            required
          />
        </div>
        <div className="relative">
          <label className={`block text-sm font-medium transition-colors duration-200 ${
            focusedField === 'email' ? 'text-primary-600' : 'text-primary-800'
          } mb-2`}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            className="form-input w-full px-4 py-3 rounded-lg bg-white/70 border-2 border-primary-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-500 transition-all duration-200"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>
      <div className="relative">
        <label className={`block text-sm font-medium transition-colors duration-200 ${
          focusedField === 'phone' ? 'text-primary-600' : 'text-primary-800'
        } mb-2`}>
          Phone (Optional)
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onFocus={() => handleFocus('phone')}
          onBlur={handleBlur}
          className="form-input w-full px-4 py-3 rounded-lg bg-white/70 border-2 border-primary-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-500 transition-all duration-200"
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div className="relative">
        <label className={`block text-sm font-medium transition-colors duration-200 ${
          focusedField === 'service' ? 'text-primary-600' : 'text-primary-800'
        } mb-2`}>
          Service Interest
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          onFocus={() => handleFocus('service')}
          onBlur={handleBlur}
          className="form-select w-full px-4 py-3 rounded-lg bg-white/70 border-2 border-primary-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-500 transition-all duration-200"
          required
        >
          <option value="">Select a service</option>
          <option value="Vedic Astrology Consultation">Vedic Astrology Consultation</option>
          <option value="Meditation & Yoga Session">Meditation & Yoga Session</option>
          <option value="Spiritual Guidance">Spiritual Guidance</option>
          <option value="Astral Chart Reading">Astral Chart Reading</option>
          <option value="General Inquiry">General Inquiry</option>
        </select>
      </div>
      <div className="relative">
        <label className={`block text-sm font-medium transition-colors duration-200 ${
          focusedField === 'message' ? 'text-primary-600' : 'text-primary-800'
        } mb-2`}>
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => handleFocus('message')}
          onBlur={handleBlur}
          rows={5}
          className="form-textarea w-full px-4 py-3 rounded-lg bg-white/70 border-2 border-primary-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-500 transition-all duration-200"
          placeholder="Tell me about your spiritual journey and how I can help you..."
          required
        ></textarea>
      </div>
      <Button 
        className={`w-full py-6 text-lg  bg-gradient-to-r from-blue-800 to-amber-600 hover:fr bg-gradient-to-r from-blue-800 to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg ${
          isLoading ? 'opacity-90 cursor-not-allowed' : ''
        }`} 
        type="submit" 
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
} 