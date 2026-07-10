import React from "react";
import DashboardNav from "@/components/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      display: "flex",
      minHeight: "calc(100vh - 76px)",
      background: "var(--bg-primary)",
    }}>
      <DashboardNav />
      <div style={{
        flexGrow: 1,
        padding: "2.5rem",
        overflowX: "hidden",
      }}>
        {children}
      </div>
    </div>
  );
}
