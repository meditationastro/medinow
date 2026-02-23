import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await auth()

    // If user is admin, return all posts with visibility status
    if (session?.user?.role === "ADMIN") {
      const blogs = await db.post.findMany({
        select: {
          id: true,
          title: true,
          published: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      return NextResponse.json(blogs)
    }

    // For non-admin users, only return public posts
    const blogs = await db.post.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error("[BLOGS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 