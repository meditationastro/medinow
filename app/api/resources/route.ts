import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db"
const prisma = db as any;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const session = await auth();
    const isAdmin = session?.user?.role === "ADMIN";

    const resources = await prisma.resource.findMany({
      where: {
        ...(category && category !== "all" ? { category } : {}),
        ...(!isAdmin ? { isPublic: true } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } },
    });
    return NextResponse.json(resources);
  } catch (e) {
    console.error("[RESOURCES_GET]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { title, description, fileUrl, fileType, fileSize, category, isPublic, requiresEmail } = body;
    if (!title || !fileUrl) return new NextResponse("Missing fields", { status: 400 });

    const resource = await prisma.resource.create({
      data: {
        title,
        description: description || "",
        fileUrl,
        fileType: fileType || "other",
        fileSize: fileSize || 0,
        category: category || "general",
        isPublic: isPublic !== false,
        requiresEmail: requiresEmail || false,
        authorId: session.user.id!,
      },
    });
    return NextResponse.json(resource);
  } catch (e) {
    console.error("[RESOURCES_POST]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
