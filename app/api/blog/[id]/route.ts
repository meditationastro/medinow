import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!post) {
      return new NextResponse("Blog post not found", { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("[BLOG_GET_ERROR]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { id } = await params
    const body = await req.json()

    const { title, description, banner, content, published, category, tags } = body

    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        banner,
        content,
        published,
        category,
        tags,
      },
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("[BLOG_PATCH_ERROR]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 