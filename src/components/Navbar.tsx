'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Dumbbell, MapPin, Activity, Sparkles, UserCheck } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Locations", href: "/locations", icon: <MapPin size={16} /> },
    { name: "Workouts", href: "/workouts", icon: <Dumbbell size={16} /> },
    { name: "Exercises", href: "/exercises", icon: <Activity size={16} /> },
    { name: "Fitness Tips", href: "/tips", icon: <Sparkles size={16} /> },
  ];

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(7, 9, 14, 0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border-glass)",
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "76px",
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.55rem",
          fontWeight: 900,
          letterSpacing: "-0.03em",
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "var(--gradient-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
          }}>
            <Dumbbell size={22} color="#fff" />
          </div>
          <span>
            Fit<span className="gradient-text">-Track</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--text-main)",
                fontWeight: 600,
                fontSize: "0.95rem",
                transition: "color 0.2s ease",
              }}
            >
              <span style={{ color: "var(--accent-primary)" }}>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Auth / Action Buttons */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }} className="desktop-auth">
          {session?.user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <Link href="/dashboard" className="btn btn-primary" style={{ padding: "0.6rem 1.25rem" }}>
                <UserCheck size={18} />
                <span>Member Portal</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="btn btn-secondary"
                style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <Link
                href="/login"
                style={{
                  color: "var(--text-main)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  padding: "0.5rem 0.85rem",
                }}
              >
                Sign In
              </Link>
              <Link href="/register" className="btn btn-primary" style={{ padding: "0.65rem 1.35rem" }}>
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Burger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "transparent",
            border: "1px solid var(--border-glass)",
            borderRadius: "8px",
            padding: "0.5rem",
            color: "var(--text-main)",
            cursor: "pointer",
            display: "none",
          }}
          aria-label="Toggle Mobile Menu"
          className="mobile-toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Responsive Styles for Mobile Navbar */}
      <style jsx>{`
        @media (max-width: 860px) {
          .desktop-nav, .desktop-auth {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-glass)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                color: "var(--text-main)",
                fontWeight: 600,
                fontSize: "1.05rem",
                padding: "0.5rem 0",
              }}
            >
              <span style={{ color: "var(--accent-primary)" }}>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}

          <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: "1rem" }}>
            {session?.user ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Member Portal Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="btn btn-secondary"
                  style={{ width: "100%" }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-secondary"
                  style={{ width: "100%" }}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Get Started - Join Franchise
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
