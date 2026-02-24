import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth"

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
    const { title, imageUrl } = body

    if (!title || !imageUrl) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const updated = await db.galleryImage.update({
      where: { id },
      data: { title, imageUrl },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("[GALLERY_PATCH]", error)
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
    await db.galleryImage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[GALLERY_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
