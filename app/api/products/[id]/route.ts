import { NextResponse } from "next/server"
import { db } from "@/lib/db"
const prisma = db as any
import { auth } from "@/auth"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        versions: true,
        author: {
          select: { name: true },
        },
      },
    })

    if (!product) {
      return new NextResponse("Product not found", { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCT_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })
    if (session.user.role !== "ADMIN") return new NextResponse("Forbidden", { status: 403 })

    const { id } = await params
    const body = await req.json()
    const { title, description, image, category, versions } = body

    if (!title || !description || !image || !category || !Array.isArray(versions)) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        image,
        category,
        versions: {
          deleteMany: {},
          create: versions.map((v: { title: string; price: number }) => ({
            title: v.title,
            price: Number(v.price) || 0,
          })),
        },
      },
      include: { versions: true },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("[PRODUCT_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 })
    if (session.user.role !== "ADMIN") return new NextResponse("Forbidden", { status: 403 })

    const { id } = await params
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
