import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { UserRole } from "@prisma/client"

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        versions: true,
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

    return NextResponse.json(products)
  } catch (error) {
    console.error("[PRODUCTS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (session.user.role !== UserRole.ADMIN) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    const { title, description, image, versions, category } = await req.json()

    if (!title || !description || !image || !versions || !category) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const product = await db.product.create({
      data: {
        title,
        description,
        image,
        category,
        authorId: session.user.id,
        versions: {
          create: versions.map((version: { title: string; price: number }) => ({
            title: version.title,
            price: version.price,
          })),
        },
      },
      include: {
        versions: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCTS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 