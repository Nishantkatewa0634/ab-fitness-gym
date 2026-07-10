'use client';

import React, { useState } from "react";
import { ChevronDown, ChevronUp, ShieldAlert, HeartPulse, Utensils, Sparkles } from "lucide-react";

export default function TipsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      category: "Form & Safety Protocols",
      icon: <ShieldAlert color="var(--accent-primary)" size={22} />,
      items: [
        {
          question: "How do I protect my lower back during compound lifts like deadlifts and squats?",
          answer: "Always maintain a neutral lumbar spine by bracing your abdominal wall 360 degrees before descending. Initiate the Romanian or Conventional deadlift by hinging at your hips rather than bending over at the waist. Never hyperextend your back at the top lockout.",
        },
        {
          question: "Should my elbows flare out 90 degrees during barbell bench press?",
          answer: "No. Flaring your elbows out 90 degrees places excessive impingement stress on the anterior shoulder capsule. Tuck your elbows at roughly a 45-to-60 degree angle relative to your torso and keep shoulder blades retracted into the bench.",
        },
        {
          question: "How do I prevent knee pain during lunges and leg press?",
          answer: "Ensure your knees track directly over your toes and do not collapse inward (knee valgus). During leg press, never lock your knees out forcefully at full extension under heavy load.",
        },
      ],
    },
    {
      category: "Recovery & Sleep Cues",
      icon: <HeartPulse color="var(--accent-secondary)" size={22} />,
      items: [
        {
          question: "How many rest days should I take each week for optimal hypertrophy?",
          answer: "Most lifters achieve maximum progress with 2 to 3 dedicated recovery days per week. Muscles grow during rest and deep sleep cycles (REM and Slow-Wave Sleep), not while you are lifting in the gym.",
        },
        {
          question: "What are the benefits of using AB Fitness steam rooms and infrared saunas?",
          answer: "Post-workout sauna sessions increase peripheral vasodilation, enhancing nutrient and oxygen delivery to micro-torn muscle fibers while reducing delayed-onset muscle soreness (DOMS).",
        },
      ],
    },
    {
      category: "Clinical Nutrition & Hydration",
      icon: <Utensils color="var(--accent-warm)" size={22} />,
      items: [
        {
          question: "How much protein do I need daily to build muscle?",
          answer: "Clinical sports dietitians recommend 1.6 to 2.2 grams of high-quality protein per kilogram of body weight per day, spaced across 4 to 5 servings to maximize muscle protein synthesis (MPS).",
        },
        {
          question: "When should I consume carbohydrates around my workout?",
          answer: "Consuming easily digestible carbohydrates 45 to 60 minutes pre-workout saturates muscle glycogen stores for sustained energy, while post-workout carbohydrates replenish depleted stores and blunt cortisol elevation.",
        },
      ],
    },
  ];

  return (
    <div className="container section-pad">
      <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem auto" }}>
        <span className="badge badge-emerald" style={{ marginBottom: "0.75rem" }}>
          TRAINER KNOWLEDGE BASE
        </span>
        <h1 style={{ fontSize: "2.75rem", marginBottom: "0.85rem" }}>
          Fitness Tips & <span className="gradient-text">Safety FAQ</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.08rem", lineHeight: 1.6 }}>
          Expert answers on biomechanics, injury prevention, muscle recovery, and nutrition protocols from our All-India master coaches.
        </p>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {faqCategories.map((section, sIdx) => (
          <div key={sIdx}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {section.icon}
              <h2 style={{ fontSize: "1.5rem" }}>{section.category}</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {section.items.map((item, idx) => {
                const uniqueId = sIdx * 10 + idx;
                const isOpen = openIndex === uniqueId;

                return (
                  <div
                    key={uniqueId}
                    className="glass-card"
                    style={{
                      padding: "1.5rem",
                      cursor: "pointer",
                      border: isOpen ? "1px solid var(--border-glow)" : "1px solid var(--border-glass)",
                    }}
                    onClick={() => setOpenIndex(isOpen ? null : uniqueId)}
                  >
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}>
                      <h3 style={{ fontSize: "1.15rem", color: isOpen ? "var(--accent-primary)" : "var(--text-main)" }}>
                        {item.question}
                      </h3>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>

                    {isOpen && (
                      <p style={{
                        color: "var(--text-muted)",
                        fontSize: "0.96rem",
                        lineHeight: 1.65,
                        marginTop: "1rem",
                        paddingTop: "1rem",
                        borderTop: "1px solid var(--border-glass)",
                      }}>
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
