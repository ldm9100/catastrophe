import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const report = await prisma.report.findUnique({ where: { id } });

  if (!report) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(report);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { password } = await req.json();

  const report = await prisma.report.findUnique({ where: { id } });

  if (!report || report.password !== password) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await prisma.report.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { content, password } = await req.json();

  const report = await prisma.report.findUnique({ where: { id } });

  if (!report || report.password !== password) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const updated = await prisma.report.update({
    where: { id },
    data: { content },
  });

  return NextResponse.json(updated);
}
