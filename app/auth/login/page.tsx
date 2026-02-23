"use client"

import { Suspense } from "react"
import LoginComp from "@/components/auth/LoginComp"
import Image from "next/image"
import { Star, Moon, Sun, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-950 to-indigo-950">
        <div className="absolute inset-0">
          <Image
            src="/img/bg-hero-3.jpg"
            alt="Sacred Space"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-primary-900/60 to-amber-900/40" />
        </div>

        {/* Decorative orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl" />

        {/* Top Logo */}
        <div className="relative z-10 p-10">
          <Link href="/h" className="flex items-center gap-3">
            <div className="relative">
              <Sun className="w-10 h-10 text-amber-400" />
              <Moon className="w-5 h-5 text-indigo-300 absolute -top-1 -right-1" />
            </div>
            <div>
              <div className="text-white font-bold text-xl leading-none">MeditationAstro</div>
              <div className="text-amber-300 text-xs tracking-widest uppercase">Sacred Admin Portal</div>
            </div>
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 px-10 text-center">
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Sacred Knowledge<br />
            <span className="text-amber-400">Awaits Within</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-md mx-auto">
            Access the inner sanctum of MeditationAstro. Manage wisdom, guide seekers, 
            and nurture souls on their spiritual journey.
          </p>

          {/* Decorative Sanskrit */}
          <div className="mt-10 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-4">
              <div className="text-3xl text-amber-300 mb-1">ॐ</div>
              <div className="text-white/60 text-sm">Om — The Sound of Creation</div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="relative z-10 p-10">
          <div className="border-l-2 border-amber-400/50 pl-4">
            <p className="text-white/70 italic text-sm">
              &ldquo;The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.&rdquo;
            </p>
            <p className="text-amber-400 text-xs mt-2">— Carl Sagan</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-amber-50 via-white to-primary-50 px-6 py-12">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="relative">
              <Sun className="w-10 h-10 text-amber-500" />
              <Moon className="w-5 h-5 text-primary-700 absolute -top-1 -right-1" />
            </div>
            <div className="text-primary-900 font-bold text-2xl">MeditationAstro</div>
          </div>
          <div className="text-primary-600 text-sm tracking-widest uppercase">Admin Portal</div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-800 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary-900 mb-2">Admin Login</h1>
            <p className="text-primary-600">Sign in to access the dashboard</p>
          </div>

          {/* Credentials Hint */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm">
            <div className="font-semibold text-amber-800 mb-1 flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Admin Credentials
            </div>
            <div className="text-amber-700 space-y-1">
              <div><span className="font-medium">Email:</span> meditationastro1@gmail.com</div>
              <div><span className="font-medium">Password:</span> best@977##??</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-primary-100 p-8">
            <Suspense fallback={<div className="text-center py-8 text-primary-600">Loading...</div>}>
              <LoginComp />
            </Suspense>
          </div>

          <div className="mt-6 text-center">
            <Link href="/h" className="text-primary-600 hover:text-primary-800 text-sm transition-colors">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
