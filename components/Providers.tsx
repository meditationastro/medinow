"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { ThemeProvider } from "@/components/Theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        {children}
        <Toaster />
        <SonnerToaster position="top-center" />
      </SessionProvider>
    </ThemeProvider>
  );
}
