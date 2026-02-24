import { NextResponse } from "next/server"
import { sendBookingEmail } from "@/lib/mail"
import { db } from "@/lib/db"
const prisma = db as any

// Make the route public
export const dynamic = "force-dynamic"

// Add CORS headers
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  )
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      phone,
      sessionType,
      preferredDate,
      preferredTime,
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      message,
    } = body

    // Validate required fields
    if (!name || !email || !phone || !sessionType || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Store appointment in database
    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        sessionType,
        preferredDate: new Date(preferredDate),
        preferredTime,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        timeOfBirth,
        placeOfBirth,
        message,
      },
    })

    // Build extra details string with explicit newline escape sequences
    const newline = "\n"
    const extraDetails = [
      dateOfBirth ? "Date of Birth: " + dateOfBirth : null,
      timeOfBirth ? "Time of Birth: " + timeOfBirth : null,
      placeOfBirth ? "Place of Birth: " + placeOfBirth : null,
    ]
      .filter(Boolean)
      .join(newline)

    const combinedMessage = [message, extraDetails]
      .filter(Boolean)
      .join(newline + newline)

    // Send booking confirmation email
    await sendBookingEmail({
      fullName: name,
      email,
      phone,
      service: sessionType,
      preferredDate,
      preferredTime,
      message: combinedMessage || undefined,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Booking request submitted successfully",
        appointment,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    console.error("[BOOKING_ERROR]", error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process request. Please try again later.",
      },
      { status: 500 }
    )
  }
}
