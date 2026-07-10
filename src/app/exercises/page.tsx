import React from "react";
import { db } from "@/lib/db";
import ExercisesClient from "@/components/ExercisesClient";

export const dynamic = "force-dynamic";

export default async function ExercisesPage() {
  const exercises = await db.exercise.findMany({
    orderBy: [{ muscleGroup: "asc" }, { name: "asc" }],
  });

  return <ExercisesClient exercises={exercises as any} />;
}
