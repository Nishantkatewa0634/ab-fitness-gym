'use client';

import React, { useState, useEffect } from "react";
import { TrendingUp, Plus, Activity, Calendar } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ProgressItem {
  id: string;
  weight: number;
  bodyFat?: number;
  notes?: string;
  date: string;
}

export default function ProgressChartsPage() {
  const [entries, setEntries] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [weight, setWeight] = useState("72.5");
  const [bodyFat, setBodyFat] = useState("16.0");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/progress");
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight: parseFloat(weight),
          bodyFat: bodyFat ? parseFloat(bodyFat) : null,
          notes,
        }),
      });

      if (res.ok) {
        setNotes("");
        fetchEntries();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Format chart data
  const chartData = entries.map((item) => ({
    dateLabel: new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    Weight: item.weight,
    BodyFat: item.bodyFat || null,
  }));

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="badge badge-emerald" style={{ marginBottom: "0.5rem" }}>
          BODY COMPOSITION
        </span>
        <h1 style={{ fontSize: "2.3rem" }}>Progress Analytics & Trends</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", marginTop: "0.25rem" }}>
          Visualize your body weight and body fat trajectory over time.
        </p>
      </div>

      <div className="grid-2" style={{ alignItems: "flex-start", marginBottom: "2.5rem" }}>
        {/* Record Entry Form */}
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h3 style={{ fontSize: "1.35rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Plus size={20} color="var(--accent-secondary)" />
            <span>Record Body Metrics</span>
          </h3>

          <form onSubmit={handleAddEntry}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Body Weight (kg) *</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-input"
                  placeholder="72.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Body Fat % (Optional)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-input"
                  placeholder="15.5"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Check-in Notes (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Morning fasted weigh-in"
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
              {submitting ? "Saving Metrics..." : "Save Check-in Data"}
            </button>
          </form>
        </div>

        {/* Quick Insights */}
        <div className="glass-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyItems: "center", justifyContent: "center" }}>
          <Activity size={36} color="var(--accent-primary)" style={{ marginBottom: "1rem" }} />
          <h3 style={{ fontSize: "1.45rem", marginBottom: "0.5rem" }}>Data-Driven Progress</h3>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.6, fontSize: "0.96rem" }}>
            Consistent tracking builds awareness. For the most accurate trend line, weigh in under similar conditions — ideally morning fasted — 2 to 3 times a week.
          </p>
        </div>
      </div>

      {/* Interactive Recharts Line Chart */}
      <div className="glass-card" style={{ padding: "2.25rem", marginBottom: "2.5rem" }}>
        <h3 style={{ fontSize: "1.35rem", marginBottom: "1.5rem" }}>
          Weight & Body Fat Progression Curve
        </h3>

        {entries.length === 0 ? (
          <div style={{ padding: "3.5rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
            No progress check-ins recorded yet. Add your first entry above to generate interactive analytics charts.
          </div>
        ) : (
          <div style={{ width: "100%", height: "360px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="dateLabel" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d111a",
                    border: "1px solid rgba(139, 92, 246, 0.4)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Weight"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#8b5cf6" }}
                  name="Weight (kg)"
                />
                <Line
                  type="monotone"
                  dataKey="BodyFat"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#10b981" }}
                  name="Body Fat (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* History Table */}
      <div className="glass-card" style={{ padding: "2rem" }}>
        <h3 style={{ fontSize: "1.3rem", marginBottom: "1.25rem" }}>Check-in Log History</h3>
        {entries.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No historical check-ins.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "0.85rem", borderBottom: "1px solid var(--border-glass)", fontSize: "0.78rem", color: "var(--text-muted)" }}>DATE</th>
                  <th style={{ textAlign: "left", padding: "0.85rem", borderBottom: "1px solid var(--border-glass)", fontSize: "0.78rem", color: "var(--text-muted)" }}>WEIGHT (KG)</th>
                  <th style={{ textAlign: "left", padding: "0.85rem", borderBottom: "1px solid var(--border-glass)", fontSize: "0.78rem", color: "var(--text-muted)" }}>BODY FAT (%)</th>
                  <th style={{ textAlign: "left", padding: "0.85rem", borderBottom: "1px solid var(--border-glass)", fontSize: "0.78rem", color: "var(--text-muted)" }}>NOTES</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td style={{ padding: "0.85rem", borderBottom: "1px solid var(--border-glass)" }}>
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "0.85rem", borderBottom: "1px solid var(--border-glass)", fontWeight: 700, color: "var(--accent-primary)" }}>
                      {entry.weight} kg
                    </td>
                    <td style={{ padding: "0.85rem", borderBottom: "1px solid var(--border-glass)", color: "var(--accent-secondary)" }}>
                      {entry.bodyFat ? `${entry.bodyFat} %` : "—"}
                    </td>
                    <td style={{ padding: "0.85rem", borderBottom: "1px solid var(--border-glass)", color: "var(--text-muted)", fontStyle: "italic" }}>
                      {entry.notes || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
