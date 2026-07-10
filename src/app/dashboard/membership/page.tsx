import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import "./membership.css";
import { QrCode, ShieldCheck, CreditCard, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { formatINR } from "@/lib/razorpay";

export const dynamic = "force-dynamic";

export default async function MembershipDetailPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
        <h2>Session Expired</h2>
        <Link href="/login" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Sign In
        </Link>
      </div>
    );
  }

  const userId = (session.user as any).id;
  const userName = session.user.name || "Member";

  const [membership, payments] = await Promise.all([
    db.membership.findFirst({
      where: { userId, status: "ACTIVE" },
      include: { plan: true },
      orderBy: { createdAt: "desc" },
    }),
    db.payment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  return (
    <div className="membership-container">
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="badge badge-violet" style={{ marginBottom: "0.65rem" }}>
          DIGITAL PASSPORT
        </span>
        <h1 style={{ fontSize: "2.3rem" }}>Virtual Gym Card & Status</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", marginTop: "0.35rem" }}>
          Present this dynamic card or scan the QR code at any Fit-Track turnstile across India.
        </p>
      </div>

      {membership ? (
        <div>
          {/* Virtual Gym Card */}
          <div className="virtual-card">
            <div className="virtual-card-hologram" />

            <div className="virtual-card-header">
              <div className="virtual-card-brand">
                FIT<span style={{ color: "#c4b5fd" }}>-TRACK</span> PASSPORT
              </div>
              <div className="virtual-card-tier-badge">
                {membership.plan.tier} TIER VIP
              </div>
            </div>

            <div className="virtual-card-body">
              <div>
                <div className="virtual-card-number">
                  {membership.cardNumber}
                </div>

                <div className="virtual-card-details-grid">
                  <div>
                    <div className="virtual-card-label">CARDHOLDER NAME</div>
                    <div className="virtual-card-value">{userName}</div>
                  </div>

                  <div>
                    <div className="virtual-card-label">PLAN TIER</div>
                    <div className="virtual-card-value">{membership.plan.name}</div>
                  </div>

                  <div>
                    <div className="virtual-card-label">VALID FROM</div>
                    <div className="virtual-card-value">
                      {new Date(membership.startDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="virtual-card-label">RENEWAL DATE</div>
                    <div className="virtual-card-value">
                      {new Date(membership.endDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative QR Check-in Box */}
              <div className="virtual-card-qr-box">
                <QrCode size={110} color="#0f172a" />
                <span className="virtual-card-qr-caption">FAST-PASS QR ENTRY</span>
              </div>
            </div>
          </div>

          {/* Membership Benefits summary */}
          <div className="glass-card" style={{ marginTop: "2rem", padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ShieldCheck color="var(--accent-secondary)" />
              <span>Active Passport Privileges</span>
            </h3>
            <div className="grid-2">
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-main)", fontSize: "0.95rem" }}>
                <CheckCircle2 size={18} color="var(--accent-secondary)" />
                <span>Unlimited All-India access across 25+ clubs</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-main)", fontSize: "0.95rem" }}>
                <CheckCircle2 size={18} color="var(--accent-secondary)" />
                <span>Complimentary Group Classes & HIIT Studio</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-main)", fontSize: "0.95rem" }}>
                <CheckCircle2 size={18} color="var(--accent-secondary)" />
                <span>Smart biometric lockers & recovery saunas</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-main)", fontSize: "0.95rem" }}>
                <CheckCircle2 size={18} color="var(--accent-secondary)" />
                <span>In-app digital workout tracking & charts</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: "3.5rem", textAlign: "center" }}>
          <CreditCard size={52} color="var(--accent-primary)" style={{ marginBottom: "1rem" }} />
          <h2 style={{ fontSize: "1.9rem", marginBottom: "0.5rem" }}>No Active Membership</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "520px", margin: "0 auto 2rem auto", lineHeight: 1.6 }}>
            You haven&apos;t activated your AB Fitness All-India passport yet. Choose a membership plan to unlock your Virtual Gym Card and access 25+ clubs.
          </p>
          <Link href="/#pricing" className="btn btn-primary btn-lg">
            <span>Explore Franchise Plans</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      )}

      {/* Payment Transaction History */}
      <div className="glass-card" style={{ marginTop: "2.5rem", padding: "2rem" }}>
        <h3 style={{ fontSize: "1.3rem", marginBottom: "1.25rem" }}>Payment & Billing History</h3>
        {payments.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            No transaction records found.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="payment-history-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>DESCRIPTION</th>
                  <th>ORDER ID</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td>{p.description || "Franchise Plan Subscription"}</td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.84rem" }}>{p.razorpayOrderId || p.id}</td>
                    <td style={{ fontWeight: 700 }}>{formatINR(p.amount)}</td>
                    <td>
                      <span className={`badge ${p.status === "SUCCESS" ? "badge-emerald" : "badge-gold"}`}>
                        {p.status}
                      </span>
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
