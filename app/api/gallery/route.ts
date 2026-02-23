import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, imageUrl } = body;

    if (!title || !imageUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const galleryImage = await db.galleryImage.create({
      data: {
        title,
        imageUrl,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(galleryImage);
  } catch (error) {
    console.error("[GALLERY_IMAGE_UPLOAD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const galleryImages = await db.galleryImage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(galleryImages);
  } catch (error) {
    console.error("[GALLERY_IMAGES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 