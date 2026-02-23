import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { published } = body

    if (typeof published !== "boolean") {
      return new NextResponse("Invalid published value", { status: 400 })
    }
    const { id } = await params
    const blog = await db.post.update({
      where: {
        id:id,
      },
      data: {
        published,
      },
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error("[BLOG_VISIBILITY_UPDATE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 