"use client"

import { useState } from "react"
import { Mail, Sparkles, CheckCircle } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-3xl shadow-xl border border-amber-100 p-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-100 rounded-full opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-100 rounded-full opacity-50" />
          <div className="relative z-10">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(3)].map((_,i) => <Sparkles key={i} className="w-4 h-4 text-amber-400" />)}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Sacred Wisdom in Your Inbox</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Subscribe for monthly cosmic insights, meditation practices, Vedic wisdom, and exclusive offers — delivered straight to you.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 text-green-700 bg-green-50 border border-green-200 rounded-2xl p-4">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Thank you! You will receive our next wisdom letter soon. 🙏</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-md hover:shadow-lg">
                  Subscribe →
                </button>
              </form>
            )}
            <p className="text-gray-400 text-xs mt-4">No spam ever. Unsubscribe anytime. 🙏</p>
          </div>
        </div>
      </div>
    </section>
  )
}
