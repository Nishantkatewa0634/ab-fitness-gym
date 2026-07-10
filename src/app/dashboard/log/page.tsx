'use client';

import React, { useState, useEffect } from "react";
import { ClipboardList, Plus, Dumbbell, Calendar, CheckCircle } from "lucide-react";

interface LogItem {
  id: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
  date: string;
}

export default function WorkoutLoggerPage() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("10");
  const [weight, setWeight] = useState("60");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/workout-log");
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseName) return;

    setSubmitting(true);
    setSuccessMsg(false);

    try {
      const res = await fetch("/api/workout-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseName,
          sets: Number(sets),
          reps: Number(reps),
          weight: Number(weight),
          notes,
        }),
      });

      if (res.ok) {
        setExerciseName("");
        setNotes("");
        setSuccessMsg(true);
        fetchLogs();
        setTimeout(() => setSuccessMsg(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="badge badge-violet" style={{ marginBottom: "0.5rem" }}>
          EXERCISE DIARY
        </span>
        <h1 style={{ fontSize: "2.3rem" }}>Digital Workout Logger</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", marginTop: "0.25rem" }}>
          Record your sets, reps, and resistance to track progressive overload.
        </p>
      </div>

      <div className="grid-2" style={{ alignItems: "flex-start" }}>
        {/* Log Form */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h3 style={{ fontSize: "1.35rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Plus size={20} color="var(--accent-primary)" />
            <span>Log Workout Set</span>
          </h3>

          {successMsg && (
            <div style={{
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#6ee7b7",
              padding: "0.85rem 1rem",
              borderRadius: "var(--radius-sm)",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.9rem",
            }}>
              <CheckCircle size={18} />
              <span>Workout set successfully recorded!</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Exercise Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Barbell Bench Press or Romanian Deadlift"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.85rem" }}>
              <div className="form-group">
                <label className="form-label">Sets</label>
                <input
                  type="number"
                  className="form-input"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  min={1}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Reps per Set</label>
                <input
                  type="number"
                  className="form-input"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  min={1}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  step="0.5"
                  className="form-input"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Coach Notes / RPE (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. RPE 8, felt strong on lockout"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "0.75rem" }}
            >
              {submitting ? "Saving Log..." : "Save Workout Set"}
            </button>
          </form>
        </div>

        {/* Recent Workout History */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h3 style={{ fontSize: "1.35rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <ClipboardList size={20} color="var(--accent-secondary)" />
            <span>Recent Log History</span>
          </h3>

          {loading ? (
            <p style={{ color: "var(--text-muted)" }}>Loading history...</p>
          ) : logs.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>No sets recorded yet. Use the form to add your first workout!</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxHeight: "500px", overflowY: "auto" }}>
              {logs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    background: "rgba(13, 17, 26, 0.7)",
                    border: "1px solid var(--border-glass)",
                    borderRadius: "var(--radius-sm)",
                    padding: "1rem",
                  }}
                >
                  <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <div style={{ fontWeight: 800, fontSize: "1.02rem" }}>
                      {log.exerciseId}
                    </div>
                    <span className="badge badge-violet" style={{ fontSize: "0.7rem" }}>
                      {log.sets} &times; {log.reps} @ {log.weight}kg
                    </span>
                  </div>

                  {log.notes && (
                    <div style={{ fontSize: "0.84rem", color: "var(--text-muted)", fontStyle: "italic", marginBottom: "0.4rem" }}>
                      &ldquo;{log.notes}&rdquo;
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.76rem", color: "var(--text-muted)" }}>
                    <Calendar size={13} />
                    <span>{new Date(log.date).toLocaleDateString()} at {new Date(log.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
