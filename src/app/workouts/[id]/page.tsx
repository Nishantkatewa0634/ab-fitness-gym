import React from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Flame, ArrowLeft, Dumbbell, Check } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await db.workoutPlan.findUnique({
    where: { id },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!workout) {
    notFound();
  }

  return (
    <div className="container section-pad">
      <Link
        href="/workouts"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--text-muted)",
          marginBottom: "2rem",
          fontWeight: 600,
        }}
      >
        <ArrowLeft size={18} />
        <span>Back to All Workout Splits</span>
      </Link>

      <div className="glass-card" style={{ padding: "2.5rem", marginBottom: "3rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
          <span className="badge badge-violet">{workout.category}</span>
          <span className="badge badge-emerald">{workout.difficulty}</span>
        </div>

        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
          {workout.name}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "780px", marginBottom: "1.75rem" }}>
          {workout.description}
        </p>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          borderTop: "1px solid var(--border-glass)",
          paddingTop: "1.5rem",
        }}>
          <div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontWeight: 700 }}>ESTIMATED DURATION</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 900, marginTop: "0.2rem" }}>{workout.duration} Minutes</div>
          </div>

          <div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontWeight: 700 }}>CALORIC BURN</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--accent-warm)", marginTop: "0.2rem" }}>~{workout.calories} kcal</div>
          </div>

          <div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontWeight: 700 }}>TOTAL EXERCISES</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--accent-secondary)", marginTop: "0.2rem" }}>{workout.exercises.length} Exercises</div>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
        Routine Breakdown & Exercise Order
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {workout.exercises.map((item, index) => {
          const ex = item.exercise;
          let parsedTips: string[] = [];
          try {
            parsedTips = JSON.parse(ex.tips || "[]");
          } catch {
            parsedTips = ["Focus on controlled eccentric phase"];
          }

          return (
            <div key={item.id} className="glass-card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "var(--gradient-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "1.1rem",
                    color: "#fff",
                  }}>
                    #{index + 1}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.45rem" }}>{ex.name}</h3>
                    <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.25rem" }}>
                      <span className="badge badge-violet" style={{ fontSize: "0.68rem" }}>{ex.muscleGroup}</span>
                      <span className="badge badge-emerald" style={{ fontSize: "0.68rem" }}>{ex.equipment}</span>
                    </div>
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  gap: "1rem",
                  background: "rgba(13, 17, 26, 0.85)",
                  border: "1px solid var(--border-glass)",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "var(--radius-sm)",
                }}>
                  <div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700 }}>SETS</div>
                    <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--accent-primary)" }}>{item.sets}</div>
                  </div>
                  <div style={{ width: "1px", background: "var(--border-glass)" }} />
                  <div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700 }}>REPS</div>
                    <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--accent-secondary)" }}>{item.reps}</div>
                  </div>
                  <div style={{ width: "1px", background: "var(--border-glass)" }} />
                  <div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700 }}>REST</div>
                    <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--accent-warm)" }}>{item.restSeconds}s</div>
                  </div>
                </div>
              </div>

              <p style={{ color: "var(--text-muted)", fontSize: "0.96rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                {ex.instructions}
              </p>

              <div style={{
                background: "rgba(13, 17, 26, 0.7)",
                border: "1px solid var(--border-glass)",
                borderRadius: "var(--radius-sm)",
                padding: "1rem",
              }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  COACHING CUES
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                  {parsedTips.map((tip, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.85rem", color: "var(--text-main)" }}>
                      <Check size={14} color="var(--accent-secondary)" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
