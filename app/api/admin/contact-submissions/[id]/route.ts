import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
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
    
    const body = await req.json()
    const { status } = body
    
    if (!status) {
      return new NextResponse("Status is required", { status: 400 })
    }
    
    // Await the params since they're now a Promise
    const { id } = await params
    
    const submission = await prisma.contactSubmission.update({
      where: {
        id: id
      },
      data: {
        status
      }
    })
    
    return NextResponse.json(submission)
  } catch (error) {
    console.error("[CONTACT_SUBMISSION_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}