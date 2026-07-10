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
  const goals = await db.fitnessGoal.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(goals);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { type, title, target, current, unit } = await req.json();

    if (!title || target === undefined) {
      return NextResponse.json({ error: "Title and target are required." }, { status: 400 });
    }

    const goal = await db.fitnessGoal.create({
      data: {
        userId,
        type: type || "WEIGHT",
        title,
        target: Number(target),
        current: Number(current || 0),
        unit: unit || "kg",
        status: "ACTIVE",
      },
    });

    return NextResponse.json(goal, { status: 201 });
  } catch (error) {
    console.error("Create Goal Error:", error);
    return NextResponse.json({ error: "Failed to create fitness goal." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { id, current, status } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing goal ID." }, { status: 400 });
    }

    const updateData: any = {};
    if (current !== undefined) updateData.current = Number(current);
    if (status) updateData.status = status;

    const goal = await db.fitnessGoal.updateMany({
      where: { id, userId },
      data: updateData,
    });

    return NextResponse.json({ success: true, goal });
  } catch (error) {
    console.error("Update Goal Error:", error);
    return NextResponse.json({ error: "Failed to update goal." }, { status: 500 });
  }
}
