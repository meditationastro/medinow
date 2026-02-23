import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()

    // Check if user is authenticated and is an admin
    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, description, content, category, tags, banner } = body

    // Validate required fields
    if (!title || !description || !content) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Create blog post with type casting for Prisma enums
    const post = await prisma.post.create({
      data: {
        title,
        description,
        content,
        banner: banner || null,
        category: category || null, // Make it optional as per schema
        tags: Array.isArray(tags) ? tags : [], // Ensure tags is an array
        authorId: session.user.id,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("[BLOG_POST_ERROR]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
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

    return NextResponse.json(posts)
  } catch (error) {
    console.error("[BLOG_GET_ERROR]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 