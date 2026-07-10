'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Zap, Award, ShieldCheck } from "lucide-react";

interface Particle {
  id: number;
  left: string;
  top: string;
  size: string;
  color: string;
  delay: string;
}

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Defer particle generation to post-mount to prevent React hydration mismatch
  useEffect(() => {
    const generated: Particle[] = [
      { id: 1, left: "15%", top: "25%", size: "8px", color: "var(--accent-primary)", delay: "0s" },
      { id: 2, left: "80%", top: "20%", size: "12px", color: "var(--accent-secondary)", delay: "1s" },
      { id: 3, left: "70%", top: "70%", size: "6px", color: "var(--accent-tertiary)", delay: "0.5s" },
      { id: 4, left: "20%", top: "75%", size: "10px", color: "var(--accent-primary)", delay: "1.5s" },
      { id: 5, left: "45%", top: "15%", size: "7px", color: "var(--accent-warm)", delay: "0.8s" },
    ];
    setParticles(generated);
  }, []);

  return (
    <section style={{
      position: "relative",
      padding: "6rem 0 7rem 0",
      overflow: "hidden",
    }}>
      {/* Background Radial Glow */}
      <div style={{
        position: "absolute",
        top: "-15%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "900px",
        height: "500px",
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 75%)",
        filter: "blur(70px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Post-Mount Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: p.color,
            boxShadow: `0 0 15px ${p.color}`,
            animation: "pulseGlow 3s infinite ease-in-out",
            animationDelay: p.delay,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{
          textAlign: "center",
          maxWidth: "860px",
          margin: "0 auto",
        }}>
          <div style={{ display: "inline-block", marginBottom: "1.25rem" }}>
            <span className="badge badge-violet" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1.1rem",
              fontSize: "0.8rem",
            }}>
              <Zap size={14} />
              INDIA&apos;S #1 TECH-DRIVEN GYM FRANCHISE
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            One All-India Digital Card.{" "}
            <span className="gradient-text">25+ World-Class Clubs.</span>
          </h1>

          <p style={{
            fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
            color: "var(--text-muted)",
            marginBottom: "2.75rem",
            lineHeight: 1.6,
            maxWidth: "720px",
            margin: "0 auto 2.75rem auto",
          }}>
            Experience next-generation fitness with biometric access, Olympic-grade equipment, certified sports trainers, and seamless digital workout tracking across India.
          </p>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.25rem",
          }}>
            <Link href="#pricing" className="btn btn-primary btn-lg">
              <span>Explore Membership Plans</span>
              <ArrowRight size={20} />
            </Link>
            <Link href="/locations" className="btn btn-secondary btn-lg">
              <MapPin size={20} color="var(--accent-secondary)" />
              <span>Find Nearest Gym (25+ Cities)</span>
            </Link>
          </div>

          {/* Key Trust Metrics */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
            marginTop: "4.5rem",
          }}>
            <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                <Award size={26} color="var(--accent-primary)" />
              </div>
              <div style={{ fontSize: "1.75rem", fontWeight: 900 }}>25+ Cities</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Prime Indian Metros</div>
            </div>

            <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                <ShieldCheck size={26} color="var(--accent-secondary)" />
              </div>
              <div style={{ fontSize: "1.75rem", fontWeight: 900 }}>4.9 / 5.0</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Average Member Rating</div>
            </div>

            <div className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                <Zap size={26} color="var(--accent-warm)" />
              </div>
              <div style={{ fontSize: "1.75rem", fontWeight: 900 }}>100% Digital</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Virtual Card & QR Entry</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
