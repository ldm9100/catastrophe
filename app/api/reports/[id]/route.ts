import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const report = await prisma.report.findUnique({ where: { id: Number(id) } });

  if (!report) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(report);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { password } = await req.json();

  const report = await prisma.report.findUnique({ where: { id: Number(id) } });

  if (!report || report.password !== password) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  await prisma.report.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { content, password } = await req.json();

  const report = await prisma.report.findUnique({ where: { id: Number(id) } });

  if (!report || report.password !== password) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const updated = await prisma.report.update({
    where: { id: Number(id) },
    data: { content },
  });

  return NextResponse.json(updated);
}
