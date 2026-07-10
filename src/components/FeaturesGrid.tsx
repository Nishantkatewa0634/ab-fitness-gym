'use client';

import React from "react";
import { CreditCard, QrCode, Dumbbell, UserCheck, BarChart3, ShieldCheck } from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      icon: <CreditCard size={28} color="var(--accent-primary)" />,
      badge: "NATIONAL PASSPORT",
      title: "All-India Franchise Access",
      description: "Travel anywhere in India. Your AB Fitness virtual card gives you VIP entry to 25+ state-of-the-art gym locations nationwide.",
    },
    {
      icon: <QrCode size={28} color="var(--accent-secondary)" />,
      badge: "TOUCHLESS CHECK-IN",
      title: "Digital Gym Card & QR",
      description: "No physical tags needed. Scan your personalized dynamic QR barcode at the turnstiles for instant touchless check-in.",
    },
    {
      icon: <Dumbbell size={28} color="var(--accent-tertiary)" />,
      badge: "WORLD-CLASS GEAR",
      title: "Olympic & Hammer Strength",
      description: "Train on calibrated power racks, specialty barbells, custom turf zones, and Olympic lifting platforms engineered for champions.",
    },
    {
      icon: <UserCheck size={28} color="var(--accent-warm)" />,
      badge: "EXPERT COACHING",
      title: "Certified Master Trainers",
      description: "Receive personalized form assessments, 1-on-1 personal training sessions, and customized clinical nutrition meal plans.",
    },
    {
      icon: <BarChart3 size={28} color="var(--accent-primary)" />,
      badge: "SMART LOGGING",
      title: "Real-Time Fitness Tracking",
      description: "Log your sets, reps, weight lifted, and body fat percentage directly inside the app to visualize your progress over time.",
    },
    {
      icon: <ShieldCheck size={28} color="var(--accent-secondary)" />,
      badge: "RECOVERY & SPA",
      title: "Recovery Pods & Cryo Suite",
      description: "Accelerate muscle repair with complimentary steam rooms, infrared saunas, cryo plunge pools, and organic protein bars.",
    },
  ];

  return (
    <section className="section-pad" style={{ position: "relative" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 4rem auto" }}>
          <span className="badge badge-emerald" style={{ marginBottom: "0.75rem" }}>
            WHY AB FITNESS
          </span>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Engineered for <span className="gradient-text">Peak Performance</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            Every AB Fitness club combines cutting-edge sports science with luxury hospitality to deliver the ultimate workout experience.
          </p>
        </div>

        <div className="grid-3">
          {features.map((feat, idx) => (
            <div key={idx} className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--border-glass)",
              }}>
                {feat.icon}
              </div>
              <div>
                <span style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--accent-secondary)",
                }}>
                  {feat.badge}
                </span>
                <h3 style={{ fontSize: "1.3rem", margin: "0.35rem 0 0.65rem 0" }}>
                  {feat.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
