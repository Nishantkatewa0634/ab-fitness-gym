import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import {
  CreditCard,
  Target,
  ClipboardList,
  TrendingUp,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardOverviewPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
        <h2>Session Expired</h2>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
          Please sign in to view your dashboard.
        </p>
        <Link href="/login" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
          Sign In
        </Link>
      </div>
    );
  }

  const userId = (session.user as any).id;
  const userName = session.user.name || "Member";

  const [activeMembership, activeGoalsCount, logsCount, recentLogs] = await Promise.all([
    db.membership.findFirst({
      where: { userId, status: "ACTIVE" },
      include: { plan: true },
      orderBy: { createdAt: "desc" },
    }),
    db.fitnessGoal.count({
      where: { userId, status: "ACTIVE" },
    }),
    db.workoutLog.count({
      where: { userId },
    }),
    db.workoutLog.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div>
      {/* Welcoming Banner */}
      <div className="glass-card" style={{
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(13, 17, 26, 0.8) 100%)",
        border: "1px solid rgba(139, 92, 246, 0.4)",
        padding: "2.25rem",
        marginBottom: "2.5rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
            <span className="badge badge-violet">ALL-INDIA PASS</span>
            {activeMembership && (
              <span className="badge badge-emerald">ACTIVE STATUS</span>
            )}
          </div>
          <h1 style={{ fontSize: "2.25rem" }}>
            Welcome Back, <span className="gradient-text">{userName}</span>!
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", marginTop: "0.35rem" }}>
            Your digital passport is active across 25+ cities in India. Keep forging your legacy!
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
          <Link href="/dashboard/profile" className="btn btn-secondary">
            <span>My Profile</span>
          </Link>
          <Link href="/dashboard/membership" className="btn btn-primary">
            <CreditCard size={18} />
            <span>View Digital Gym Card</span>
          </Link>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid-4" style={{ marginBottom: "2.5rem" }}>
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>
              MEMBERSHIP TIER
            </span>
            <ShieldCheck color="var(--accent-primary)" size={20} />
          </div>
          <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "var(--text-main)" }}>
            {activeMembership ? activeMembership.plan.name : "No Active Plan"}
          </div>
          <div style={{ fontSize: "0.82rem", color: activeMembership ? "var(--accent-secondary)" : "var(--accent-crimson)", marginTop: "0.35rem" }}>
            {activeMembership ? `Card #: ${activeMembership.cardNumber}` : "Subscribe to access all 25+ cities"}
          </div>
        </div>

        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>
              ACTIVE GOALS
            </span>
            <Target color="var(--accent-secondary)" size={20} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-main)" }}>
            {activeGoalsCount}
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
            Milestones & Body Composition
          </div>
        </div>

        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>
              TOTAL WORKOUTS LOGGED
            </span>
            <ClipboardList color="var(--accent-tertiary)" size={20} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-main)" }}>
            {logsCount}
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
            Recorded sets & exercises
          </div>
        </div>

        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>
              NATIONWIDE CLUBS
            </span>
            <MapPin color="var(--accent-warm)" size={20} />
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-main)" }}>
            25+ Cities
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
            All-India access included
          </div>
        </div>
      </div>

      {/* Action Split: Recent Activity & Quick Navigation */}
      <div className="grid-2">
        {/* Recent Workouts Timeline */}
        <div className="glass-card">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}>
            <h3 style={{ fontSize: "1.25rem" }}>Recent Workout Activity</h3>
            <Link href="/dashboard/log" style={{ color: "var(--accent-primary)", fontSize: "0.88rem", fontWeight: 700 }}>
              Log Workout &rarr;
            </Link>
          </div>

          {recentLogs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
              <Zap size={32} style={{ marginBottom: "0.75rem", opacity: 0.5 }} />
              <p>No workout logs yet. Start logging your sets today!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    background: "rgba(13, 17, 26, 0.7)",
                    border: "1px solid var(--border-glass)",
                    borderRadius: "var(--radius-sm)",
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.98rem" }}>
                      Exercise Set Logged
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                      {log.sets} sets &times; {log.reps} reps @ {log.weight}kg
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    <Calendar size={14} />
                    <span>{new Date(log.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Action Navigation */}
        <div className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1.25rem" }}>Your Fitness Toolkit</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <Link href="/dashboard/goals" className="btn btn-secondary" style={{ justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <Target size={18} color="var(--accent-primary)" />
                  <span>Track & Add Fitness Goals</span>
                </span>
                <ArrowRight size={16} />
              </Link>

              <Link href="/dashboard/progress" className="btn btn-secondary" style={{ justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <TrendingUp size={18} color="var(--accent-secondary)" />
                  <span>Body Weight & Fat Trends (Interactive Chart)</span>
                </span>
                <ArrowRight size={16} />
              </Link>

              <Link href="/locations" className="btn btn-secondary" style={{ justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <MapPin size={18} color="var(--accent-warm)" />
                  <span>Find All-India Gym Clubs (25+ Cities)</span>
                </span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div style={{
            marginTop: "2rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--border-glass)",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}>
            Need help booking a trainer or guest pass? Contact our 24/7 concierge at <strong style={{ color: "var(--text-main)" }}>1800-212-ABFIT</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}
