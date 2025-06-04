import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { content, password, lat, lng } = await req.json();

  if (!content || !password || lat == null || lng == null) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const report = await prisma.report.create({
    data: { content, password, lat, lng },
  });

  return NextResponse.json(report);
}

export async function GET() {
  const reports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reports);
}
