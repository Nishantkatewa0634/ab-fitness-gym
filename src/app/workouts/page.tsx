import React from "react";
import { db } from "@/lib/db";
import Link from "next/link";
import { Dumbbell, Clock, Flame, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function WorkoutsPage() {
  let workouts: any[] = [];
  try {
    workouts = await db.workoutPlan.findMany({
      include: {
        exercises: true,
      },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Workouts fallback on Vercel:", error);
  }

  if (!workouts || workouts.length === 0) {
    workouts = [
      {
        id: "wp-push",
        title: "Classic Push-Pull-Legs (PPL) Hypertrophy",
        difficulty: "INTERMEDIATE",
        durationWeeks: 8,
        description: "Optimal 6-day hypertrophy routine splitting Chest/Shoulders/Triceps, Back/Biceps, and Quads/Hamstrings.",
        exercises: [{}, {}, {}],
      },
      {
        id: "wp-full",
        title: "3-Day Full Body Functional Strength",
        difficulty: "BEGINNER",
        durationWeeks: 6,
        description: "Compound lifts 3x a week designed for busy professionals seeking rapid strength and conditioning.",
        exercises: [{}, {}],
      },
    ];
  }

  return (
    <div className="container section-pad">
      <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem auto" }}>
        <span className="badge badge-violet" style={{ marginBottom: "0.75rem" }}>
          TRAINING PROGRAMS
        </span>
        <h1 style={{ fontSize: "2.75rem", marginBottom: "0.85rem" }}>
          Featured <span className="gradient-text">Workout Splits</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.08rem", lineHeight: 1.6 }}>
          Structured multi-week and daily routines curated by certified trainers. Select any routine to view exact sets, rep schemes, rest periods, and instructions.
        </p>
      </div>

      <div className="grid-3">
        {workouts.map((plan) => (
          <div
            key={plan.id}
            className="glass-card"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}>
                <span className="badge badge-violet">{plan.category}</span>
                <span className="badge badge-emerald">{plan.difficulty}</span>
              </div>

              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.65rem" }}>
                {plan.name}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                {plan.description}
              </p>

              <div style={{
                display: "flex",
                gap: "1.25rem",
                color: "var(--text-muted)",
                fontSize: "0.88rem",
                marginBottom: "1.75rem",
                background: "rgba(13, 17, 26, 0.7)",
                padding: "0.85rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-glass)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Clock size={16} color="var(--accent-primary)" />
                  <span>{plan.duration} mins</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Flame size={16} color="var(--accent-warm)" />
                  <span>{plan.calories} kcal</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Dumbbell size={16} color="var(--accent-secondary)" />
                  <span>{plan.exercises.length} Exercises</span>
                </div>
              </div>
            </div>

            <Link
              href={`/workouts/${plan.id}`}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>View Full Routine & Sets</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
