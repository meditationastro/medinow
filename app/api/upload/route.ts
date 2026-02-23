import { NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/uploadImage";
import { auth } from "@/auth";

const ALLOWED_TYPES = [
  // Images
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml",
  // Audio
  "audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/aac", "audio/flac", "audio/x-m4a",
  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // Video
  "video/mp4", "video/webm", "video/ogg",
];

const MAX_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return new NextResponse("No file provided", { status: 400 });
    if (!ALLOWED_TYPES.includes(file.type)) {
      return new NextResponse(`Unsupported file type: ${file.type}`, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return new NextResponse("File too large (max 50MB)", { status: 400 });
    }

    const fileUrl = await uploadToR2(file);

    // Determine file category
    let fileType = "other";
    if (file.type.startsWith("image/")) fileType = "image";
    else if (file.type.startsWith("audio/")) fileType = "audio";
    else if (file.type.startsWith("video/")) fileType = "video";
    else if (file.type === "application/pdf") fileType = "pdf";
    else if (file.type.includes("word") || file.type.includes("document")) fileType = "docx";

    return NextResponse.json({ 
      url: fileUrl, 
      fileType,
      fileSize: file.size,
      fileName: file.name
    });
  } catch (error) {
    console.error("[UPLOAD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
