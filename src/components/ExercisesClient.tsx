'use client';

import React, { useState } from "react";
import { Search, Filter, Dumbbell, Activity, ShieldCheck, Check } from "lucide-react";

export interface ExerciseItem {
  id: string;
  name: string;
  slug: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  tips: string;
}

interface ExercisesClientProps {
  exercises: ExerciseItem[];
}

export default function ExercisesClient({ exercises }: ExercisesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("ALL");
  const [selectedEquipment, setSelectedEquipment] = useState("ALL");

  const muscleGroups = ["Chest", "Back", "Shoulders", "Legs", "Arms", "Core", "Full Body"];
  const equipmentList = ["Barbell", "Dumbbell", "Machine", "Bodyweight"];

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.instructions.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === "ALL" || ex.muscleGroup === selectedMuscle;
    const matchesEquipment = selectedEquipment === "ALL" || ex.equipment === selectedEquipment;

    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  return (
    <div className="container section-pad">
      <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3rem auto" }}>
        <span className="badge badge-violet" style={{ marginBottom: "0.75rem" }}>
          SPORTS SCIENCE
        </span>
        <h1 style={{ fontSize: "2.75rem", marginBottom: "0.85rem" }}>
          Exercise & <span className="gradient-text">Instruction Library</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.08rem", lineHeight: 1.6 }}>
          Master proper lifting technique with step-by-step instructions and safety cues curated by AB Fitness master trainers.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{
        padding: "1.25rem 1.75rem",
        marginBottom: "3rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "1.25rem",
        alignItems: "center",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          flexGrow: 1,
          minWidth: "250px",
          background: "rgba(13, 17, 26, 0.9)",
          border: "1px solid var(--border-glass)",
          borderRadius: "var(--radius-sm)",
          padding: "0.6rem 1rem",
        }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search exercises by name or instructions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-main)",
              outline: "none",
              width: "100%",
              fontSize: "0.95rem",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <select
            className="form-select"
            value={selectedMuscle}
            onChange={(e) => setSelectedMuscle(e.target.value)}
            style={{ padding: "0.6rem 1rem" }}
          >
            <option value="ALL">All Muscle Groups</option>
            {muscleGroups.map((mg) => (
              <option key={mg} value={mg}>{mg}</option>
            ))}
          </select>

          <select
            className="form-select"
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
            style={{ padding: "0.6rem 1rem" }}
          >
            <option value="ALL">All Equipment</option>
            {equipmentList.map((eq) => (
              <option key={eq} value={eq}>{eq}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
        Showing <strong style={{ color: "var(--text-main)" }}>{filteredExercises.length}</strong> exercises
      </div>

      {filteredExercises.length === 0 ? (
        <div className="glass-card" style={{ padding: "4rem", textAlign: "center" }}>
          <h3>No Exercises Found</h3>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Try adjusting your search query or filter selections.
          </p>
        </div>
      ) : (
        <div className="grid-2">
          {filteredExercises.map((ex) => {
            let parsedTips: string[] = [];
            try {
              parsedTips = JSON.parse(ex.tips || "[]");
            } catch {
              parsedTips = ["Keep neutral spine throughout movement", "Control the descent"];
            }

            return (
              <div
                key={ex.id}
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
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <span className="badge badge-violet">{ex.muscleGroup}</span>
                      <span className="badge badge-emerald">{ex.equipment}</span>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-warm)" }}>
                      {ex.difficulty.toUpperCase()}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.45rem", marginBottom: "0.65rem" }}>{ex.name}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.94rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {ex.instructions}
                  </p>

                  <div style={{
                    background: "rgba(13, 17, 26, 0.7)",
                    border: "1px solid var(--border-glass)",
                    borderRadius: "var(--radius-sm)",
                    padding: "1rem",
                  }}>
                    <div style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      color: "var(--text-muted)",
                      letterSpacing: "0.08em",
                      marginBottom: "0.6rem",
                    }}>
                      TRAINER FORM CUES & TIPS
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {parsedTips.map((tip, idx) => (
                        <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.86rem", color: "var(--text-main)" }}>
                          <Check size={14} color="var(--accent-secondary)" style={{ marginTop: "3px", flexShrink: 0 }} />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
