import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const blogs = await db.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ blogs })
  } catch (error) {
    console.error("[ADMIN_BLOGS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
