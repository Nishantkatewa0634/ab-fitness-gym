import React from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import PricingCards from "@/components/PricingCards";
import Testimonials from "@/components/Testimonials";
import { db } from "@/lib/db";
import Link from "next/link";
import { MapPin, ArrowRight, Activity, Dumbbell, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let plans: any[] = [];
  try {
    plans = await db.plan.findMany({
      where: { active: true },
      orderBy: { price: "asc" },
    });
  } catch (error) {
    console.error("Database fallback on Vercel:", error);
  }

  if (!plans || plans.length === 0) {
    plans = [
      {
        id: "plan-silver",
        name: "Silver Franchise Membership",
        slug: "silver-plan",
        price: 2499,
        interval: "MONTHLY",
        features: JSON.stringify([
          "Access to 1 Home Club Location",
          "Digital Virtual Gym Card",
          "Standard Cardio & Strength Floor",
          "Locker & Shower Access",
          "1 Complimentary Body Composition Scan",
        ]),
      },
      {
        id: "plan-gold",
        name: "Gold All-India Passport",
        slug: "gold-plan",
        price: 4499,
        interval: "MONTHLY",
        features: JSON.stringify([
          "Unlimited Access across 25+ Indian Cities",
          "Fast-Pass Biometric QR Turnstile Entry",
          "All Group Fitness & HIIT Classes",
          "Steam Room & Recovery Lounge Access",
          "Bi-Weekly Coach Check-ins & Body Scans",
          "Priority Support & App Analytics",
        ]),
      },
      {
        id: "plan-platinum",
        name: "Platinum VIP Elite",
        slug: "platinum-plan",
        price: 6999,
        interval: "MONTHLY",
        features: JSON.stringify([
          "All-India VIP Access across All 25+ Clubs",
          "2 Monthly Personal Training Sessions",
          "Customized Nutrition & Macro Blueprint",
          "Unlimited Guest Passes (Weekend Access)",
          "Dedicated Recovery Spa & Cryotherapy Lounge",
          "Free Fit-Track Merchandise Pack",
        ]),
      },
    ];
  }

  return (
    <div>
      <HeroSection />

      <FeaturesGrid />

      {/* Locations Preview Banner across 25+ Indian Cities */}
      <section className="section-pad" style={{ background: "var(--bg-tertiary)" }}>
        <div className="container">
          <div className="glass-card" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "center",
            padding: "3rem",
            border: "1px solid rgba(139, 92, 246, 0.35)",
            boxShadow: "var(--glow-violet)",
          }}>
            <div>
              <span className="badge badge-violet" style={{ marginBottom: "0.85rem" }}>
                NATIONAL PRESENCE
              </span>
              <h2 style={{ fontSize: "2.3rem", marginBottom: "1rem" }}>
                Find Your <span className="gradient-text">Home Arena</span> Across India
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                From Mumbai&apos;s Bandra West to Delhi&apos;s Connaught Place and Bengaluru&apos;s Tech Corridor — workout at any of our 25+ high-tech clubs with your All-India membership card.
              </p>
              <Link href="/locations" className="btn btn-primary">
                <span>Explore All 25+ Clubs & Amenities</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.25rem",
            }}>
              <div style={{
                background: "rgba(13, 17, 26, 0.8)",
                border: "1px solid var(--border-glass)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
              }}>
                <MapPin color="var(--accent-secondary)" size={22} style={{ marginBottom: "0.5rem" }} />
                <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>Mumbai & Delhi</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Premier Flagship Clubs</div>
              </div>

              <div style={{
                background: "rgba(13, 17, 26, 0.8)",
                border: "1px solid var(--border-glass)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
              }}>
                <Dumbbell color="var(--accent-primary)" size={22} style={{ marginBottom: "0.5rem" }} />
                <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>Bengaluru & Pune</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Tech Arenas & HIIT Hubs</div>
              </div>

              <div style={{
                background: "rgba(13, 17, 26, 0.8)",
                border: "1px solid var(--border-glass)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
              }}>
                <Activity color="var(--accent-warm)" size={22} style={{ marginBottom: "0.5rem" }} />
                <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>Hyderabad & Chennai</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>24/7 Biometric Access</div>
              </div>

              <div style={{
                background: "rgba(13, 17, 26, 0.8)",
                border: "1px solid var(--border-glass)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
              }}>
                <Sparkles color="var(--accent-secondary)" size={22} style={{ marginBottom: "0.5rem" }} />
                <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>19+ Tier-2 Metros</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Ahmedabad, Jaipur, Kochi...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards with Razorpay Simulator Modal */}
      <PricingCards plans={plans as any} />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
