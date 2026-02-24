import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { secret } = await req.json()
    const SETUP_SECRET = process.env.SETUP_SECRET || "meditation-astro-setup-2025"
    if (secret !== SETUP_SECRET) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const primaryHash = await bcrypt.hash("best@977##??", 10)
    const admin = await db.user.upsert({
      where: { email: "meditationastro1@gmail.com" },
      update: {
        password: primaryHash,
        role: "ADMIN",
        name: "Niaadim Admin",
        emailVerified: new Date(),
      },
      create: {
        name: "Niaadim Admin",
        email: "meditationastro1@gmail.com",
        password: primaryHash,
        role: "ADMIN",
        emailVerified: new Date(),
        isTwoFactorEnabled: false,
      },
    })

    const secondaryHash = await bcrypt.hash("P@ssw0rd", 10)
    await db.user.upsert({
      where: { email: "admin@gmail.com" },
      update: { role: "ADMIN" },
      create: {
        name: "Admin User",
        email: "admin@gmail.com",
        password: secondaryHash,
        role: "ADMIN",
        emailVerified: new Date(),
        isTwoFactorEnabled: false,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Admin accounts created/updated",
      primary: admin.email,
    })
  } catch (error) {
    console.error("[ADMIN_SETUP]", error)
    return NextResponse.json({ error: "Setup failed" }, { status: 500 })
  }
}
