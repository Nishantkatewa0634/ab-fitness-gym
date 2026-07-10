'use client';

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("nishant@abfitness.in");
    setPassword("password123");
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: "nishant@abfitness.in",
      password: "password123",
    });
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="glass-card" style={{ padding: "2.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <span className="badge badge-violet" style={{ marginBottom: "0.75rem" }}>
          MEMBER PORTAL
        </span>
        <h1 style={{ fontSize: "2.1rem", marginBottom: "0.5rem" }}>
          Welcome Back
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Sign in to access your digital gym card and workouts.
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
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="nishant@abfitness.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "0.75rem" }}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In to Portal"}
        </button>
      </form>

      <div style={{
        marginTop: "1.25rem",
        paddingTop: "1.25rem",
        borderTop: "1px solid var(--border-glass)",
      }}>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="btn btn-secondary"
          style={{ width: "100%", fontSize: "0.85rem", padding: "0.65rem" }}
          disabled={loading}
        >
          Quick Demo Login (Nishant - Gold Member)
        </button>
      </div>

      <div style={{
        marginTop: "1.75rem",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "var(--text-muted)",
      }}>
        Don't have a franchise account?{" "}
        <Link
          href="/register"
          style={{ color: "var(--accent-primary)", fontWeight: 700 }}
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}
