'use client';

import React from "react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Aarav Singhania",
      city: "Mumbai — Bandra West",
      membership: "GOLD ALL-INDIA MEMBER",
      comment: "I travel between Mumbai, Bengaluru, and Delhi every month. Having one card that gets me into prime AB Fitness clubs with zero paperwork is a game-changer.",
      rating: 5,
    },
    {
      name: "Divya Kapoor",
      city: "Delhi — Connaught Place",
      membership: "PLATINUM VIP MEMBER",
      comment: "The personal training staff here is exceptional. My coach designed a custom macro plan and lifting split that helped me drop 8kg while adding serious strength.",
      rating: 5,
    },
    {
      name: "Karthik Krishnan",
      city: "Bengaluru — Indiranagar",
      membership: "GOLD ALL-INDIA MEMBER",
      comment: "The digital QR check-in and in-app workout logger make everything so seamless. Best equipment quality and cleanliness I've seen across any Indian gym chain.",
      rating: 5,
    },
  ];

  return (
    <section className="section-pad" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3.5rem auto" }}>
          <span className="badge badge-violet" style={{ marginBottom: "0.75rem" }}>
            MEMBER STORIES
          </span>
          <h2 style={{ fontSize: "2.4rem", marginBottom: "0.85rem" }}>
            Trusted by <span className="gradient-text">100,000+ Athletes</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            Read real reviews from members across our 25+ clubs in India.
          </p>
        </div>

        <div className="grid-3">
          {reviews.map((rev, idx) => (
            <div key={idx} className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <Quote size={28} color="rgba(139, 92, 246, 0.3)" style={{ marginBottom: "0.75rem" }} />
                <p style={{ color: "var(--text-main)", fontSize: "0.98rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: "1rem" }}>
                <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--text-main)" }}>
                  {rev.name}
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--accent-secondary)", fontWeight: 600 }}>
                  {rev.city}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                  {rev.membership}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
