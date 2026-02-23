import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { 
        email: session.user.email 
      },
      select: { 
        role: true 
      }
    })

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    // Fetch all contact submissions
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error("[CONTACT_SUBMISSIONS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, email, phone, service, message } = body

    if (!fullName || !email || !service || !message) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        fullName,
        email,
        phone,
        service,
        message,
      }
    })

    return NextResponse.json(submission)
  } catch (error) {
    console.error("[CONTACT_SUBMISSIONS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 