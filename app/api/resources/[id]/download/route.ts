import { NextResponse } from "next/server";
import { db } from "@/lib/db"
const prisma = db as any;

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.resource.update({ where: { id }, data: { downloadCount: { increment: 1 } } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
