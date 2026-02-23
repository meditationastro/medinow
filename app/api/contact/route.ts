import { NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";

// Make this route public by adding export const dynamic = "force-dynamic"
export const dynamic = "force-dynamic";

// Add CORS headers if needed
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, service, message } = body;

    console.log("Received form data:", { fullName, email, service });

    // Basic validation
    if (!fullName || !email || !service || !message) {
      console.log("Missing fields:", { fullName, email, service, message });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email:", email);
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    try {
      // Save to database
      await prisma.contactSubmission.create({
        data: {
          fullName,
          email,
          phone,
          service,
          message,
        },
      });

      // Send email
      const result = await sendContactFormEmail({
        fullName,
        email,
        phone,
        service,
        message,
      });

      console.log("Email sent successfully:", result);
      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error saving submission or sending email:", error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Failed to process submission" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again later." },
      { status: 500 }
    );
  }
} 