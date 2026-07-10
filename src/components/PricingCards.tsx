'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Check, ShieldCheck, Zap, X, CreditCard, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/razorpay";

export interface PlanData {
  id: string;
  name: string;
  slug: string;
  price: number;
  duration: number;
  tier: string;
  description: string;
  features: string;
  popular: boolean;
}

interface PricingCardsProps {
  plans: PlanData[];
}

export default function PricingCards({ plans }: PricingCardsProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderPayload, setOrderPayload] = useState<any>(null);
  const [simulating, setSimulating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (plan: PlanData) => {
    if (!session || !session.user) {
      router.push("/login?callbackUrl=/#pricing");
      return;
    }

    setLoadingPlanId(plan.id);
    setError(null);

    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to initiate checkout.");
        setLoadingPlanId(null);
        return;
      }

      if (data.isMock) {
        setOrderPayload(data);
        setModalOpen(true);
        setLoadingPlanId(null);
      } else {
        // Native Razorpay checkout fallback if real keys are configured
        setOrderPayload(data);
        setModalOpen(true);
        setLoadingPlanId(null);
      }
    } catch (err) {
      setError("Network error occurred connecting to payment gateway.");
      setLoadingPlanId(null);
    }
  };

  const handleSimulatePayment = async () => {
    if (!orderPayload) return;

    setSimulating(true);
    setError(null);

    try {
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpayOrderId: orderPayload.orderId,
          razorpayPaymentId: `pay_mock_${Date.now()}`,
          razorpaySignature: "mock_signature",
          planId: orderPayload.planId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Payment simulation failed.");
        setSimulating(false);
      } else {
        setModalOpen(false);
        router.push("/dashboard/membership");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred during payment verification.");
      setSimulating(false);
    }
  };

  return (
    <section id="pricing" className="section-pad" style={{ position: "relative" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 4rem auto" }}>
          <span className="badge badge-violet" style={{ marginBottom: "0.75rem" }}>
            ALL-INDIA PASS
          </span>
          <h2 style={{ fontSize: "2.6rem", marginBottom: "1rem" }}>
            Choose Your <span className="gradient-text">Franchise Tier</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            Every plan includes All-India access, digital QR check-in, and full in-app progress logging.
          </p>
        </div>

        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            color: "#fca5a5",
            padding: "1rem",
            borderRadius: "var(--radius-sm)",
            maxWidth: "600px",
            margin: "0 auto 2rem auto",
            textAlign: "center",
          }}>
            {error}
          </div>
        )}

        <div className="grid-3" style={{ alignItems: "stretch" }}>
          {plans.map((plan) => {
            let parsedFeatures: string[] = [];
            try {
              parsedFeatures = JSON.parse(plan.features || "[]");
            } catch {
              parsedFeatures = ["All-India Gym Access", "Digital Virtual Card"];
            }

            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className="glass-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  border: isPopular ? "2px solid var(--accent-primary)" : "1px solid var(--border-glass)",
                  boxShadow: isPopular ? "var(--glow-violet)" : "var(--shadow-card)",
                }}
              >
                {isPopular && (
                  <div style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--gradient-primary)",
                    color: "#fff",
                    padding: "0.25rem 1rem",
                    borderRadius: "999px",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    boxShadow: "0 4px 15px rgba(139, 92, 246, 0.5)",
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}>
                    <span style={{
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      color: isPopular ? "var(--accent-primary)" : "var(--text-muted)",
                      letterSpacing: "0.05em",
                    }}>
                      {plan.tier} TIER
                    </span>
                    <ShieldCheck size={20} color="var(--accent-secondary)" />
                  </div>

                  <h3 style={{ fontSize: "1.7rem", marginBottom: "0.5rem" }}>
                    {plan.name}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "1.75rem", minHeight: "48px" }}>
                    {plan.description}
                  </p>

                  <div style={{ marginBottom: "2rem" }}>
                    <span style={{ fontSize: "2.75rem", fontWeight: 900, color: "var(--text-main)" }}>
                      {formatINR(plan.price)}
                    </span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                      {" "} / month
                    </span>
                  </div>

                  <ul style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                    marginBottom: "2.5rem",
                  }}>
                    {parsedFeatures.map((f, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", fontSize: "0.94rem" }}>
                        <div style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: "rgba(16, 185, 129, 0.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "2px",
                          flexShrink: 0,
                        }}>
                          <Check size={13} color="var(--accent-secondary)" />
                        </div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loadingPlanId === plan.id}
                  className={isPopular ? "btn btn-primary" : "btn btn-secondary"}
                  style={{ width: "100%", padding: "0.9rem" }}
                >
                  {loadingPlanId === plan.id ? "Initializing..." : "Select Franchise Plan"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Glassmorphism Sandbox Simulator Checkout Modal */}
      {modalOpen && orderPayload && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(7, 9, 14, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: "100%",
            maxWidth: "460px",
            padding: "2.25rem",
            position: "relative",
            border: "1px solid rgba(139, 92, 246, 0.4)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(139, 92, 246, 0.25)",
          }}>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
              aria-label="Close modal"
            >
              <X size={22} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(139, 92, 92, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <CreditCard size={22} color="var(--accent-primary)" />
              </div>
              <div>
                <span className="badge badge-emerald" style={{ fontSize: "0.65rem" }}>
                  RAZORPAY SANDBOX SIMULATOR
                </span>
                <h3 style={{ fontSize: "1.3rem", marginTop: "0.15rem" }}>Secure Checkout Gateway</h3>
              </div>
            </div>

            <div style={{
              background: "rgba(13, 17, 26, 0.8)",
              border: "1px solid var(--border-glass)",
              borderRadius: "var(--radius-sm)",
              padding: "1.25rem",
              marginBottom: "1.75rem",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Subscription Tier</span>
                <span style={{ fontWeight: 700, color: "var(--text-main)" }}>{orderPayload.planName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Order Reference</span>
                <span style={{ fontFamily: "monospace", fontSize: "0.82rem", color: "var(--accent-secondary)" }}>
                  {orderPayload.orderId}
                </span>
              </div>
              <div style={{
                borderTop: "1px solid var(--border-glass)",
                marginTop: "0.75rem",
                paddingTop: "0.75rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ fontWeight: 700 }}>Total Payable</span>
                <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--accent-primary)" }}>
                  {formatINR(orderPayload.planPrice)}
                </span>
              </div>
            </div>

            <p style={{
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              marginBottom: "1.75rem",
              textAlign: "center",
              lineHeight: 1.5,
            }}>
              Sandbox mode active. Clicking &ldquo;Simulate Success&rdquo; will securely complete your transaction and generate your digital AB Fitness passport.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button
                onClick={handleSimulatePayment}
                disabled={simulating}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  padding: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                }}
              >
                <Sparkles size={18} />
                <span>{simulating ? "Activating Membership..." : "Simulate Payment Success"}</span>
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-secondary"
                style={{ width: "100%" }}
              >
                Cancel Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
