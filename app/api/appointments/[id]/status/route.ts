import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      )
    }

    const { id } = await params
    const appointment = await db.appointment.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(appointment)
  } catch (error) {
    console.error("[APPOINTMENT_STATUS_UPDATE_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to update appointment status" },
      { status: 500 }
    )
  }
}
