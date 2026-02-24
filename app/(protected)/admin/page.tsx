"use client"

import { useState } from "react"
import { BlogCreationForm } from "@/components/BlogCreationForm"
import { BlogUpdateForm } from "@/components/BlogUpdateForm"
import { ProductUploadForm } from "@/components/ProductUploadForm"
import { GalleryUploadForm } from "@/components/GalleryUploadForm"
import { ProductManager } from "@/components/ProductManager"
import { GalleryManager } from "@/components/GalleryManager"
import { OrdersManager } from "@/components/OrdersManager"
import { BlogVisibilityManager } from "@/components/BlogVisibilityManager"
import { ContactSubmissionsManager } from "@/components/ContactSubmissionsManager"
import { TestimonialUploadForm } from "@/components/TestimonialUploadForm"
import { AppointmentManager } from "@/components/AppointmentManager"
import { HomepageCMS } from "@/components/HomepageCMS"
import { ResourceManager } from "@/components/ResourceManager"
import { UsersManager } from "@/components/UsersManager"
import LogoutButton from "@/components/auth/logout-button"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  LogOut, Home, PenTool, BookOpen, Eye, ShoppingBag, Package,
  Images, Star, Mail, Calendar, Users, Sun, Moon, ChevronRight, Menu, X, LayoutDashboard, Download
} from "lucide-react"
import Link from "next/link"

const navGroups = [
  {
    label: "Website",
    items: [
      { id: "homepage", icon: Home, label: "Homepage CMS", color: "text-amber-600" },
      { id: "users", icon: Users, label: "User Roles", color: "text-violet-600" },
    ]
  },
  {
    label: "Blog",
    items: [
      { id: "blog-create", icon: PenTool, label: "Create Post", color: "text-blue-600" },
      { id: "blog-manage", icon: BookOpen, label: "Manage Posts", color: "text-indigo-600" },
      { id: "blog-visibility", icon: Eye, label: "Visibility", color: "text-cyan-600" },
    ]
  },
  {
    label: "Shop",
    items: [
      { id: "shop-add", icon: ShoppingBag, label: "Add Product", color: "text-emerald-600" },
      { id: "shop-manage", icon: Package, label: "Manage Products", color: "text-green-600" },
      { id: "orders", icon: Package, label: "Orders", color: "text-orange-600" },
    ]
  },
  {
    label: "Gallery",
    items: [
      { id: "gallery-upload", icon: Images, label: "Upload Image", color: "text-pink-600" },
      { id: "gallery-manage", icon: Images, label: "Manage Gallery", color: "text-rose-600" },
    ]
  },
  {
    label: "Resources",
    items: [
      { id: "resources", icon: Download, label: "Resource Library", color: "text-blue-600" },
    ]
  },
  {
    label: "Engagement",
    items: [
      { id: "testimonials", icon: Star, label: "Testimonials", color: "text-yellow-600" },
      { id: "contact", icon: Mail, label: "Contact Msgs", color: "text-sky-600" },
      { id: "appointments", icon: Calendar, label: "Appointments", color: "text-teal-600" },
    ]
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blog-create")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function renderContent() {
    switch (activeTab) {
      case "homepage": return <HomepageCMS />
      case "users": return <UsersManager />
      case "blog-create": return <BlogCreationForm />
      case "blog-manage": return <BlogUpdateForm />
      case "blog-visibility": return <BlogVisibilityManager />
      case "shop-add": return <ProductUploadForm />
      case "shop-manage": return <ProductManager />
      case "orders": return <OrdersManager />
      case "gallery-upload": return <GalleryUploadForm />
      case "gallery-manage": return <GalleryManager />
      case "testimonials": return <TestimonialUploadForm />
      case "contact": return <ContactSubmissionsManager />
      case "appointments": return <AppointmentManager />
      default: return <BlogCreationForm />
    }
  }

  function getActiveLabel() {
    for (const group of navGroups) {
      const item = group.items.find(i => i.id === activeTab)
      if (item) return item.label
    }
    return "Dashboard"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Sun className="w-7 h-7 text-amber-400" />
              <Moon className="w-3.5 h-3.5 text-indigo-300 absolute -top-0.5 -right-0.5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-none">MeditationAstro</div>
              <div className="text-slate-400 text-xs mt-0.5">Admin Panel</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navGroups.map(group => (
            <div key={group.label} className="mb-4">
              <div className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-2">{group.label}</div>
              {group.items.map(item => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-amber-400" : item.color}`} />
                    {item.label}
                    {isActive && <ChevronRight className="w-3 h-3 ml-auto text-amber-400" />}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Bottom Links */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <Link href="/h" target="_blank" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <LayoutDashboard className="w-4 h-4" /> View Website
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 text-sm px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be redirected to the login page and will need to sign in again to access the admin dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <LogoutButton>Sign Out</LogoutButton>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-800">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">{getActiveLabel()}</h1>
              <p className="text-gray-500 text-xs">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/h" target="_blank">
              <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:text-gray-900 text-xs">
                View Site →
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
