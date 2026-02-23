import { NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/uploadImage";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return new NextResponse("Invalid file type", { status: 400 });
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return new NextResponse("File too large", { status: 400 });
    }

    const imageUrl = await uploadToR2(file);

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("[IMAGE_UPLOAD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 