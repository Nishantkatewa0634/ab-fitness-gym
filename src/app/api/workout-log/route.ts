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

  const logs = await db.workoutLog.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    take: 50,
  });

  return NextResponse.json(logs);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { exerciseId, exerciseName, sets, reps, weight, notes } = await req.json();

    const log = await db.workoutLog.create({
      data: {
        userId,
        exerciseId: exerciseId || exerciseName || "Custom Exercise",
        sets: Number(sets || 1),
        reps: Number(reps || 10),
        weight: Number(weight || 0),
        notes: notes || "",
        date: new Date(),
      },
    });

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    console.error("Workout Log Error:", error);
    return NextResponse.json({ error: "Failed to create workout log." }, { status: 500 });
  }
}
