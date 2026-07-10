'use client';

import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Youtube, Facebook, Dumbbell, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-secondary)",
      borderTop: "1px solid var(--border-glass)",
      paddingTop: "4.5rem",
      paddingBottom: "2.5rem",
      color: "var(--text-main)",
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "3rem",
          marginBottom: "3.5rem",
        }}>
          {/* Brand Col */}
          <div>
            <Link href="/" style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.6rem",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
            }}>
              <div style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "var(--gradient-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Dumbbell size={20} color="#fff" />
              </div>
              <span>
                AB<span className="gradient-text">FITNESS</span>
              </span>
            </Link>
            <p style={{
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
            }}>
              India's leading high-tech gym network across 25+ cities. Providing premier equipment, biometric check-in, AI workout guidance, and elite personal trainers.
            </p>
            <div style={{ display: "flex", gap: "0.85rem" }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-main)",
                }}
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-main)",
                }}
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-main)",
                }}
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-main)",
                }}
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Quick Explore</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <Link href="/locations" style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  All-India Gym Locator (25+ Cities)
                </Link>
              </li>
              <li>
                <Link href="/workouts" style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  Featured Workout Splits
                </Link>
              </li>
              <li>
                <Link href="/exercises" style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  Exercise Instruction Library
                </Link>
              </li>
              <li>
                <Link href="/tips" style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  Fitness & Form Safety FAQ
                </Link>
              </li>
              <li>
                <Link href="/#pricing" style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  Franchise Membership Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Hubs */}
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Prime Locations</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Mumbai — Bandra West Hub</li>
              <li style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Delhi NCR — Connaught Place</li>
              <li style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Bengaluru — Indiranagar Tech Arena</li>
              <li style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Hyderabad — Gachibowli Cyber Club</li>
              <li style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Pune — Koregaon Park Rooftop</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>Franchise Helpdesk</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Phone size={16} color="var(--accent-primary)" />
                <span>1800-212-ABFIT (Toll Free India)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Mail size={16} color="var(--accent-primary)" />
                <span>franchise@abfitness.in</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <MapPin size={16} color="var(--accent-primary)" />
                <span>HQ: Horizon Tower, Bandra West, Mumbai 400050</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border-glass)",
          paddingTop: "2rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          fontSize: "0.85rem",
          color: "var(--text-muted)",
        }}>
          <div>
            &copy; {new Date().getFullYear()} AB Fitness India Pvt Ltd. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Franchise Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
