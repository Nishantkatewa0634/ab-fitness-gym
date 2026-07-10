import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const entries = await db.progressEntry.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });

  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { weight, bodyFat, notes } = await req.json();

    if (!weight) {
      return NextResponse.json({ error: "Weight is required." }, { status: 400 });
    }

    const entry = await db.progressEntry.create({
      data: {
        userId,
        weight: Number(weight),
        bodyFat: bodyFat ? Number(bodyFat) : null,
        notes: notes || null,
        date: new Date(),
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Progress Entry Error:", error);
    return NextResponse.json({ error: "Failed to record progress entry." }, { status: 500 });
  }
}
