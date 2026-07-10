'use client';

import React, { useState, useEffect } from "react";
import { Target, Plus, CheckCircle, Archive, Trophy, TrendingUp } from "lucide-react";

interface GoalItem {
  id: string;
  type: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  status: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<GoalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("WEIGHT");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [unit, setUnit] = useState("kg");
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    try {
      const res = await fetch("/api/goals");
      if (res.ok) {
        const data = await res.json();
        setGoals(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !target) {
      setError("Title and target value are required.");
      return;
    }

    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          type,
          target: parseFloat(target),
          current: current ? parseFloat(current) : 0,
          unit,
        }),
      });

      if (res.ok) {
        setTitle("");
        setTarget("");
        setCurrent("");
        setModalOpen(false);
        fetchGoals();
      } else {
        const d = await res.json();
        setError(d.error || "Failed to add goal");
      }
    } catch (err) {
      setError("Network error occurred.");
    }
  };

  const handleUpdateProgress = async (id: string, newCurrent: number) => {
    await fetch("/api/goals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, current: newCurrent }),
    });
    fetchGoals();
  };

  const handleToggleArchive = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "ARCHIVED" ? "ACTIVE" : "ARCHIVED";
    await fetch("/api/goals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: nextStatus }),
    });
    fetchGoals();
  };

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "2.5rem",
      }}>
        <div>
          <span className="badge badge-violet" style={{ marginBottom: "0.5rem" }}>
            MILESTONE TRACKING
          </span>
          <h1 style={{ fontSize: "2.3rem" }}>Fitness Goals Tracker</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", marginTop: "0.25rem" }}>
            Set targets, log real-time progress, and conquer your personal bests.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary"
        >
          <Plus size={18} />
          <span>New Fitness Goal</span>
        </button>
      </div>

      {loading ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
          Loading fitness goals...
        </div>
      ) : goals.length === 0 ? (
        <div className="glass-card" style={{ padding: "4rem", textAlign: "center" }}>
          <Target size={48} color="var(--accent-primary)" style={{ marginBottom: "1rem" }} />
          <h3>No Active Goals</h3>
          <p style={{ color: "var(--text-muted)", maxWidth: "480px", margin: "0.5rem auto 1.5rem auto" }}>
            Define your first target milestone — whether it&apos;s reaching target body weight, hitting a 100kg bench press, or running 5km.
          </p>
          <button onClick={() => setModalOpen(true)} className="btn btn-primary">
            Create First Goal
          </button>
        </div>
      ) : (
        <div className="grid-2">
          {goals.map((g) => {
            const percent = g.target > 0 ? Math.min(Math.round((g.current / g.target) * 100), 100) : 0;
            const isCompleted = g.current >= g.target;
            const isArchived = g.status === "ARCHIVED";

            return (
              <div
                key={g.id}
                className="glass-card"
                style={{
                  opacity: isArchived ? 0.65 : 1,
                  border: isCompleted ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid var(--border-glass)",
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}>
                  <span className="badge badge-violet">{g.type}</span>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {isCompleted && (
                      <span className="badge badge-emerald">COMPLETED!</span>
                    )}
                    {isArchived && (
                      <span className="badge badge-gold">ARCHIVED</span>
                    )}
                  </div>
                </div>

                <h3 style={{ fontSize: "1.35rem", marginBottom: "1rem" }}>{g.title}</h3>

                {/* Progress Bar */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Progress</span>
                    <span style={{ fontWeight: 700, color: "var(--text-main)" }}>
                      {g.current} / {g.target} {g.unit} ({percent}%)
                    </span>
                  </div>
                  <div style={{
                    width: "100%",
                    height: "10px",
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "999px",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      width: `${percent}%`,
                      height: "100%",
                      background: isCompleted ? "var(--accent-secondary)" : "var(--gradient-primary)",
                      borderRadius: "999px",
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                </div>

                {/* Update Progress Input */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid var(--border-glass)",
                  paddingTop: "1rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input
                      type="number"
                      step="0.1"
                      placeholder={String(g.current)}
                      className="form-input"
                      style={{ width: "95px", padding: "0.45rem 0.65rem" }}
                      onBlur={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) {
                          handleUpdateProgress(g.id, val);
                        }
                      }}
                    />
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{g.unit}</span>
                  </div>

                  <button
                    onClick={() => handleToggleArchive(g.id, g.status)}
                    className="btn btn-secondary"
                    style={{ padding: "0.45rem 0.85rem", fontSize: "0.8rem" }}
                  >
                    {isArchived ? "Unarchive" : "Archive"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Goal Modal */}
      {modalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(7, 9, 14, 0.8)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1.5rem",
        }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "440px", padding: "2.25rem" }}>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "1.5rem" }}>Create New Milestone</h3>

            {error && (
              <div style={{ color: "#fca5a5", fontSize: "0.88rem", marginBottom: "1rem" }}>{error}</div>
            )}

            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Goal Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Target Body Weight"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="WEIGHT">Body Weight</option>
                    <option value="BODY_FAT">Body Fat %</option>
                    <option value="BENCH_PRESS">Bench Press</option>
                    <option value="RUNNING_5K">Cardio Distance</option>
                    <option value="WORKOUTS">Workout Count</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Unit</label>
                  <select
                    className="form-select"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="%">%</option>
                    <option value="reps">reps</option>
                    <option value="km">km</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Current Value</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    placeholder="75.0"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Target Value *</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    placeholder="70.0"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button type="submit" className="btn btn-primary" style={{ flexGrow: 1 }}>
                  Save Goal
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
