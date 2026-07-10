'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INDIAN_CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune",
  "Chennai", "Ahmedabad", "Kolkata", "Gurugram", "Noida",
  "Jaipur", "Chandigarh", "Lucknow", "Kochi", "Indore",
  "Bhopal", "Surat", "Nagpur", "Patna", "Vadodara",
  "Coimbatore", "Visakhapatnam", "Ludhiana", "Agra", "Bhubaneswar"
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "Mumbai",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create account.");
        setLoading(false);
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("Network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ padding: "2.5rem" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <span className="badge badge-emerald" style={{ marginBottom: "0.75rem" }}>
          NEW MEMBERSHIP
        </span>
        <h1 style={{ fontSize: "2.1rem", marginBottom: "0.5rem" }}>
          Create Account
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Start your fitness journey at any AB Fitness club in India.
        </p>
      </div>

      {error && (
        <div style={{
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.4)",
          color: "#fca5a5",
          padding: "0.85rem 1rem",
          borderRadius: "var(--radius-sm)",
          marginBottom: "1.5rem",
          fontSize: "0.9rem",
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Rahul Verma"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="rahul@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-input"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="city">
              Home City *
            </label>
            <select
              id="city"
              name="city"
              className="form-select"
              value={formData.city}
              onChange={handleChange}
            >
              {INDIAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password *
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-input"
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "0.75rem" }}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Franchise Account"}
        </button>
      </form>

      <div style={{
        marginTop: "1.75rem",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "var(--text-muted)",
      }}>
        Already have an account?{" "}
        <Link
          href="/login"
          style={{ color: "var(--accent-primary)", fontWeight: 700 }}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
