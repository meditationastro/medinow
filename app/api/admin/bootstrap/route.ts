import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

// This endpoint is intentionally DISABLED in production.
// Use it only in local/dev environments to create the first ADMIN user
// without running `prisma db seed`.
export const runtime = "nodejs";

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export async function GET() {
  if (isProduction()) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    message:
      "POST { email, password, name? } to this endpoint to bootstrap an ADMIN user (dev only).",
    example: {
      email: "admin@answerforself.com",
      password: "ChangeMe123!",
      name: "Admin User",
    },
  });
}

export async function POST(req: Request) {
  if (isProduction()) {
    return new NextResponse(null, { status: 404 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");
  const name = String(body?.name || "Admin User").trim();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Valid email is required" },
      { status: 400 }
    );
  }

  if (!password || password.length < 8) {
    return NextResponse.json(
      { ok: false, error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await db.user.upsert({
    where: { email },
    update: {
      name,
      role: UserRole.ADMIN,
      password: hashedPassword,
      emailVerified: new Date(),
    },
    create: {
      name,
      email,
      role: UserRole.ADMIN,
      password: hashedPassword,
      emailVerified: new Date(),
      isTwoFactorEnabled: false,
    },
  });

  return NextResponse.json({
    ok: true,
    user: {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
    note: "Dev-only bootstrap complete. In production, create admin via prisma seed or a secure backoffice process.",
  });
}
