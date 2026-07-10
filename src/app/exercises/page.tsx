import React from "react";
import { db } from "@/lib/db";
import ExercisesClient from "@/components/ExercisesClient";

export const dynamic = "force-dynamic";

export default async function ExercisesPage() {
  let exercises: any[] = [];
  try {
    exercises = await db.exercise.findMany({
      orderBy: [{ muscleGroup: "asc" }, { name: "asc" }],
    });
  } catch (error) {
    console.error("Exercises fallback on Vercel:", error);
  }

  if (!exercises || exercises.length === 0) {
    exercises = [
      {
        id: "ex-1",
        name: "Barbell Bench Press",
        muscleGroup: "CHEST",
        category: "STRENGTH",
        difficulty: "INTERMEDIATE",
        equipment: "Barbell & Flat Bench",
        instructions: "Retract scapula, lower bar to lower chest, press upward explosively.",
      },
      {
        id: "ex-2",
        name: "Romanian Deadlift (RDL)",
        muscleGroup: "LEGS",
        category: "STRENGTH",
        difficulty: "INTERMEDIATE",
        equipment: "Barbell or Dumbbells",
        instructions: "Hinge at hips keeping back flat, lower bar to mid-shin, drive through glutes.",
      },
      {
        id: "ex-3",
        name: "Pull-Ups / Chin-Ups",
        muscleGroup: "BACK",
        category: "CALISTHENICS",
        difficulty: "BEGINNER",
        equipment: "Pull-Up Bar",
        instructions: "Grip bar slightly wider than shoulder width, pull upper chest to bar.",
      },
    ];
  }

  return <ExercisesClient exercises={exercises as any} />;
}
