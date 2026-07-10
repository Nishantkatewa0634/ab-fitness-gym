import React from "react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      minHeight: "100vh",
      background: "var(--bg-primary)",
    }}>
      {/* Left Column: Brand & Motivation */}
      <div style={{
        background: "linear-gradient(135deg, rgba(13, 17, 26, 0.95) 0%, rgba(139, 92, 246, 0.15) 100%)",
        borderRight: "1px solid var(--border-glass)",
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative Glow Elements */}
        <div style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }} />

        <div>
          <Link href="/" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.75rem",
            fontWeight: 900,
            letterSpacing: "-0.03em",
          }}>
            Fit<span className="gradient-text">-Track</span>
          </Link>
          <span className="badge badge-violet" style={{ marginLeft: "0.75rem" }}>
            ALL-INDIA FRANCHISE
          </span>
        </div>

        <div style={{ margin: "4rem 0", position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontSize: "2.75rem",
            lineHeight: 1.15,
            marginBottom: "1.5rem",
          }}>
            Forge Your Legacy Across <span className="gradient-text">25+ Cities</span> in India.
          </h2>
          <p style={{
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            marginBottom: "2.5rem",
            maxWidth: "480px",
          }}>
            One digital passport unlocks premium clubs, high-tech biometric check-ins, AI-driven workout plans, and certified trainers nationwide.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
          }}>
            <div className="glass-card" style={{ padding: "1.25rem" }}>
              <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "var(--accent-secondary)" }}>
                25+
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
                High-Tech Gym Locations
              </div>
            </div>
            <div className="glass-card" style={{ padding: "1.25rem" }}>
              <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "var(--accent-primary)" }}>
                100,000+
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
                Active Franchise Members
              </div>
            </div>
          </div>
        </div>

        <div style={{
          color: "var(--text-muted)",
          fontSize: "0.85rem",
        }}>
          &copy; 2026 AB Fitness India Pvt Ltd. All rights reserved.
        </div>
      </div>

      {/* Right Column: Auth Forms */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 2rem",
      }}>
        <div style={{ width: "100%", maxWidth: "440px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
