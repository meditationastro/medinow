import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { message, author, location, rating } = body;

    if (!message || !author || !location || !rating) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const testimonial = await db.testimonial.create({
      data: {
        message,
        author,
        location,
        rating: parseInt(rating),
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("[TESTIMONIALS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("[TESTIMONIALS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 