"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, RefreshCw, CheckCircle } from "lucide-react"

const STORAGE_KEY = "homepage_cms_content"

const defaultContent = {
  heroTitle: "Awakening the Soul",
  heroSubtitle: "Integrating Vedic Astrology, Meditation, and Yoga for a Fulfilling Life",
  heroDesc: "Transform your life through authentic Himalayan wisdom with personalized online consultations in Vedic astrology, meditation, and Ayurveda.",
  statsStudents: "2,000+",
  statsCountries: "15+",
  statsYears: "20+",
  statsReadings: "500+",
  packagesTitle: "Sacred Transformation Packages",
  packagesSubtitle: "Tailored programs for every seeker — from your first meditation to a full Himalayan immersion",
  ctaTitle: "Begin Your Transformation Today",
  ctaSubtitle: "Connect with Niaadim directly — WhatsApp is the fastest way to book your first session",
  whatsapp: "+977-9709598727",
  email: "meditationastro@gmail.com",
  featuredBlogTitle: "Sacred Wisdom Blog",
  featuredBlogSubtitle: "Insights on Vedic astrology, meditation, and conscious living",
}

type ContentKey = keyof typeof defaultContent

export function HomepageCMS() {
  const [content, setContent] = useState(defaultContent)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setContent({ ...defaultContent, ...JSON.parse(stored) })
    } catch {}
  }, [])

  function handleChange(key: ContentKey, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSave() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {}
  }

  function handleReset() {
    setContent(defaultContent)
    localStorage.removeItem(STORAGE_KEY)
    setSaved(false)
  }

  const field = (label: string, key: ContentKey, multiline = false) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-primary-800 mb-1">{label}</label>
      {multiline ? (
        <textarea
          rows={3}
          value={content[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full border border-primary-200 rounded-lg px-3 py-2 text-primary-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      ) : (
        <input
          type="text"
          value={content[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full border border-primary-200 rounded-lg px-3 py-2 text-primary-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary-900">Homepage Content Manager</h2>
          <p className="text-primary-600 text-sm mt-1">Edit text that appears on the home page. Changes save to browser storage.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} className="border-red-300 text-red-700 hover:bg-red-50">
            <RefreshCw className="w-4 h-4 mr-1" /> Reset
          </Button>
          <Button size="sm" onClick={handleSave} className="bg-primary-800 text-white hover:bg-primary-900">
            {saved ? <CheckCircle className="w-4 h-4 mr-1 text-green-400" /> : <Save className="w-4 h-4 mr-1" />}
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-900 text-lg">🦸 Hero Section</CardTitle>
          </CardHeader>
          <CardContent>
            {field("Hero Title", "heroTitle")}
            {field("Hero Subtitle", "heroSubtitle")}
            {field("Hero Description", "heroDesc", true)}
          </CardContent>
        </Card>

        <Card className="border-primary-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-900 text-lg">📊 Stats Bar</CardTitle>
          </CardHeader>
          <CardContent>
            {field("Students Worldwide", "statsStudents")}
            {field("Countries Served", "statsCountries")}
            {field("Years of Study", "statsYears")}
            {field("Astrology Readings", "statsReadings")}
          </CardContent>
        </Card>

        <Card className="border-primary-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-900 text-lg">📦 Packages Section</CardTitle>
          </CardHeader>
          <CardContent>
            {field("Section Title", "packagesTitle")}
            {field("Section Subtitle", "packagesSubtitle", true)}
          </CardContent>
        </Card>

        <Card className="border-primary-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-900 text-lg">💬 Contact CTA</CardTitle>
          </CardHeader>
          <CardContent>
            {field("CTA Title", "ctaTitle")}
            {field("CTA Subtitle", "ctaSubtitle", true)}
            {field("WhatsApp Number", "whatsapp")}
            {field("Email Address", "email")}
          </CardContent>
        </Card>

        <Card className="border-primary-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-900 text-lg">📰 Blog Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {field("Blog Section Title", "featuredBlogTitle")}
            {field("Blog Section Subtitle", "featuredBlogSubtitle", true)}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>Note:</strong> Content is stored in browser local storage and applied on page load. For database-backed CMS with full persistence across all devices, a database schema extension is needed. The content saved here updates this browser&apos;s display of the homepage.
      </div>
    </div>
  )
}
