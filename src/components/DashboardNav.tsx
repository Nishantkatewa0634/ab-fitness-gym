'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Target,
  ClipboardList,
  TrendingUp,
  MapPin,
  Dumbbell,
  User,
} from "lucide-react";

export default function DashboardNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "My Profile", href: "/dashboard/profile", icon: <User size={18} /> },
    { name: "Virtual Gym Card", href: "/dashboard/membership", icon: <CreditCard size={18} /> },
    { name: "Fitness Goals", href: "/dashboard/goals", icon: <Target size={18} /> },
    { name: "Workout Logger", href: "/dashboard/log", icon: <ClipboardList size={18} /> },
    { name: "Progress Charts", href: "/dashboard/progress", icon: <TrendingUp size={18} /> },
  ];

  const quickLinks = [
    { name: "All-India Gym Locator", href: "/locations", icon: <MapPin size={16} /> },
    { name: "Exercise Library", href: "/exercises", icon: <Dumbbell size={16} /> },
  ];

  return (
    <aside style={{
      width: "260px",
      flexShrink: 0,
      background: "var(--bg-secondary)",
      borderRight: "1px solid var(--border-glass)",
      padding: "1.75rem 1.25rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }} className="dashboard-sidebar">
      <div>
        <div style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "var(--text-muted)",
          marginBottom: "1rem",
          paddingLeft: "0.5rem",
        }}>
          MEMBER WORKSPACE
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  background: active ? "var(--gradient-primary)" : "transparent",
                  color: active ? "#ffffff" : "var(--text-main)",
                  fontWeight: active ? 700 : 500,
                  transition: "all 0.2s ease",
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{
          marginTop: "2.5rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--border-glass)",
        }}>
          <div style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            marginBottom: "0.85rem",
            paddingLeft: "0.5rem",
          }}>
            QUICK ACCESS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {quickLinks.map((ql) => (
              <Link
                key={ql.href}
                href={ql.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-muted)",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                }}
              >
                {ql.icon}
                <span>{ql.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        background: "rgba(139, 92, 246, 0.1)",
        border: "1px solid rgba(139, 92, 246, 0.25)",
        borderRadius: "var(--radius-sm)",
        padding: "1rem",
        fontSize: "0.82rem",
        color: "#c4b5fd",
      }}>
        <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
          All-India Support
        </div>
        <div>Toll Free: 1800-212-ABFIT</div>
      </div>
    </aside>
  );
}
