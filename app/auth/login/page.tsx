"use client"

import type React from "react"

import LoginComp from "@/components/auth/LoginComp"
export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:px-0">
      <div className="text-sm text-muted-foreground absolute top-10 left-10">Note: If you are not a admin there are no benifits of creating an account</div>
      <LoginComp/>
     
    </div>
  )
}

