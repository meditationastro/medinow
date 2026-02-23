import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await params;
  await db.resource.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const updated = await db.resource.update({ where: { id }, data: body });
  return NextResponse.json(updated);
}
