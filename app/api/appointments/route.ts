import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { UserRole } from "@prisma/client"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Admin can see everything, users can only see their own submissions (matched by email)
if (session.user.role !== UserRole.ADMIN && !session.user.email) {
  return NextResponse.json({ error: "User email missing" }, { status: 400 })
}

const where =
  session.user.role === UserRole.ADMIN
    ? undefined
    : { email: session.user.email as string }

    const appointments = await db.appointment.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    // Create a Response with the appointments data
    const response = NextResponse.json(appointments)

    // Set cache control headers
    response.headers.set('Cache-Control', 'no-store, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    return response
  } catch (error) {
    console.error("[APPOINTMENTS_GET_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    )
  }
} 