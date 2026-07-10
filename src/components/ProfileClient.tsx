'use client';

import React, { useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Ruler,
  Phone,
  MapPin,
  ShieldCheck,
  Edit3,
  X,
  CheckCircle2,
  Heart,
  Sparkles,
  CreditCard,
} from "lucide-react";

export interface ProfileData {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  gender: string | null;
  height: number | null;
  dob: string | null;
  role: string;
  createdAt: string;
  memberships?: {
    id: string;
    cardNumber: string;
    status: string;
    plan: {
      name: string;
      tier: string;
    };
  }[];
}

interface ProfileClientProps {
  initialData: ProfileData;
}

export default function ProfileClient({ initialData }: ProfileClientProps) {
  const [profile, setProfile] = useState<ProfileData>(initialData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    gender: initialData.gender || "Male",
    height: initialData.height ? String(initialData.height) : "175",
    dob: initialData.dob || "1996-04-12",
    phone: initialData.phone || "",
    city: initialData.city || "Mumbai",
  });

  const INDIAN_CITIES = [
    "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune",
    "Chennai", "Ahmedabad", "Kolkata", "Gurugram", "Noida",
    "Jaipur", "Chandigarh", "Lucknow", "Kochi", "Indore",
  ];

  const handleOpenEdit = () => {
    setFormData({
      name: profile.name || "",
      gender: profile.gender || "Male",
      height: profile.height ? String(profile.height) : "175",
      dob: profile.dob || "1996-04-12",
      phone: profile.phone || "",
      city: profile.city || "Mumbai",
    });
    setEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          gender: formData.gender,
          height: formData.height ? parseFloat(formData.height) : null,
          dob: formData.dob,
          phone: formData.phone,
          city: formData.city,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to update profile");
      } else {
        setProfile({
          ...profile,
          name: data.user.name,
          gender: data.user.gender,
          height: data.user.height,
          dob: data.user.dob,
          phone: data.user.phone,
          city: data.user.city,
        });
        setEditModalOpen(false);
        setSuccessToast(true);
        setTimeout(() => setSuccessToast(false), 3500);
      }
    } catch (err) {
      setErrorMsg("Network error saving profile.");
    } finally {
      setSaving(false);
    }
  };

  // Helper: Height cm to feet & inches
  const formatHeight = (cm: number | null) => {
    if (!cm) return "Not specified";
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${cm} cm (${feet}' ${inches}")`;
  };

  // Helper: DOB to Age
  const calculateAge = (dobStr: string | null) => {
    if (!dobStr) return null;
    const birthDate = new Date(dobStr);
    const diff = Date.now() - birthDate.getTime();
    const ageDt = new Date(diff);
    const age = Math.abs(ageDt.getUTCFullYear() - 1970);
    return isNaN(age) ? null : age;
  };

  const activeMembership = profile.memberships && profile.memberships[0];
  const calculatedAge = calculateAge(profile.dob);

  return (
    <div>
      {/* Page Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "2.5rem",
      }}>
        <div>
          <span className="badge badge-violet" style={{ marginBottom: "0.5rem" }}>
            ATHLETE PASSPORT
          </span>
          <h1 style={{ fontSize: "2.4rem" }}>Member Identity & Biometrics</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.02rem", marginTop: "0.25rem" }}>
            Manage your personal profile, physical measurements, and All-India membership details.
          </p>
        </div>

        <button
          onClick={handleOpenEdit}
          className="btn btn-primary"
          style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
        >
          <Edit3 size={18} />
          <span>Edit Profile & Biometrics</span>
        </button>
      </div>

      {/* Success Toast Banner */}
      {successToast && (
        <div style={{
          background: "rgba(16, 185, 129, 0.15)",
          border: "1px solid rgba(16, 185, 129, 0.4)",
          color: "#6ee7b7",
          padding: "1rem 1.25rem",
          borderRadius: "var(--radius-sm)",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}>
          <CheckCircle2 size={20} />
          <span style={{ fontWeight: 600 }}>Profile and biometric data successfully updated!</span>
        </div>
      )}

      {/* Hero Profile Banner */}
      <div className="glass-card" style={{
        padding: "2.5rem",
        marginBottom: "2.5rem",
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.22) 0%, rgba(13, 17, 26, 0.85) 100%)",
        border: "1px solid rgba(139, 92, 246, 0.4)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem", flexWrap: "wrap" }}>
          {/* Avatar Circle */}
          <div style={{
            width: "90px",
            height: "90px",
            borderRadius: "24px",
            background: "var(--gradient-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.4rem",
            fontWeight: 900,
            color: "#ffffff",
            boxShadow: "0 12px 30px rgba(139, 92, 246, 0.45)",
          }}>
            {profile.name ? profile.name.charAt(0).toUpperCase() : "M"}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <span className="badge badge-violet">{profile.role}</span>
              {activeMembership ? (
                <span className="badge badge-emerald">ALL-INDIA PASSPORT</span>
              ) : (
                <span className="badge badge-gold">NO PLAN</span>
              )}
            </div>

            <h2 style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>
              {profile.name || "Franchise Member"}
            </h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", color: "var(--text-muted)", fontSize: "0.92rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Mail size={15} color="var(--accent-primary)" />
                <span>{profile.email}</span>
              </div>
              {profile.city && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <MapPin size={15} color="var(--accent-secondary)" />
                  <span>{profile.city}, India</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {activeMembership && (
          <div style={{
            background: "rgba(13, 17, 26, 0.8)",
            border: "1px solid var(--border-glass)",
            borderRadius: "var(--radius-sm)",
            padding: "1.25rem 1.5rem",
            textAlign: "right",
          }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.08em" }}>
              ACTIVE MEMBERSHIP TIER
            </div>
            <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--accent-primary)", marginTop: "0.2rem" }}>
              {activeMembership.plan.name}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "var(--accent-secondary)", marginTop: "0.3rem" }}>
              Card #{activeMembership.cardNumber}
            </div>
          </div>
        )}
      </div>

      {/* 4 Primary Biometrics & Identity Cards: Email, Gender, Height, DOB */}
      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.35rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Sparkles color="var(--accent-primary)" size={20} />
          <span>Core Personal & Physical Biometrics</span>
        </h3>

        <div className="grid-4" style={{ marginBottom: "2.5rem" }}>
          {/* Card 1: Email Address */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                EMAIL ADDRESS
              </span>
              <Mail color="var(--accent-primary)" size={20} />
            </div>
            <div>
              <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-main)", wordBreak: "break-all" }}>
                {profile.email || "Not provided"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "var(--accent-secondary)", marginTop: "0.45rem" }}>
                <ShieldCheck size={14} />
                <span>Verified Account ID</span>
              </div>
            </div>
          </div>

          {/* Card 2: Gender */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                GENDER
              </span>
              <User color="var(--accent-secondary)" size={20} />
            </div>
            <div>
              <div style={{ fontSize: "1.7rem", fontWeight: 900, color: "var(--text-main)" }}>
                {profile.gender || "Not specified"}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                Biometric profile tag
              </div>
            </div>
          </div>

          {/* Card 3: Height */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                HEIGHT
              </span>
              <Ruler color="var(--accent-tertiary)" size={20} />
            </div>
            <div>
              <div style={{ fontSize: "1.55rem", fontWeight: 900, color: "var(--text-main)" }}>
                {formatHeight(profile.height)}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                Used for BMI & caloric expenditure
              </div>
            </div>
          </div>

          {/* Card 4: DOB */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                DATE OF BIRTH (DOB)
              </span>
              <Calendar color="var(--accent-warm)" size={20} />
            </div>
            <div>
              <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "var(--text-main)" }}>
                {profile.dob
                  ? new Date(profile.dob).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Not specified"}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--accent-warm)", marginTop: "0.35rem" }}>
                {calculatedAge !== null ? `${calculatedAge} Years Old` : "Set birthdate above"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Details: Contact & Membership Summary */}
      <div className="grid-2">
        <div className="glass-card" style={{ padding: "2rem" }}>
          <h3 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Phone color="var(--accent-secondary)" size={19} />
            <span>Contact & Location</span>
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "1rem",
              borderBottom: "1px solid var(--border-glass)",
            }}>
              <span style={{ color: "var(--text-muted)" }}>Mobile Phone</span>
              <span style={{ fontWeight: 700, color: "var(--text-main)" }}>{profile.phone || "Not added"}</span>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "1rem",
              borderBottom: "1px solid var(--border-glass)",
            }}>
              <span style={{ color: "var(--text-muted)" }}>Home Arena City</span>
              <span style={{ fontWeight: 700, color: "var(--text-main)" }}>{profile.city || "Mumbai"}</span>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ color: "var(--text-muted)" }}>Member Since</span>
              <span style={{ fontWeight: 700, color: "var(--text-main)" }}>
                {new Date(profile.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CreditCard color="var(--accent-primary)" size={19} />
              <span>All-India Gym Access</span>
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.96rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Your profile is linked across 25+ cities in India. Turnstile biometric check-in automatically verifies your identity using your virtual passport card.
            </p>
          </div>

          <div style={{
            background: "rgba(13, 17, 26, 0.7)",
            border: "1px solid var(--border-glass)",
            borderRadius: "var(--radius-sm)",
            padding: "1rem 1.25rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 700 }}>CARD STATUS</div>
              <div style={{ fontWeight: 800, color: "var(--accent-secondary)", marginTop: "0.15rem" }}>ACTIVE PASSPORT</div>
            </div>
            <a href="/dashboard/membership" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
              View Virtual Card &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(7, 9, 14, 0.8)",
          backdropFilter: "blur(12px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: "100%",
            maxWidth: "520px",
            padding: "2.25rem",
            position: "relative",
            border: "1px solid rgba(139, 92, 246, 0.4)",
            maxHeight: "90vh",
            overflowY: "auto",
          }}>
            <button
              onClick={() => setEditModalOpen(false)}
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

            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.35rem" }}>Edit Profile & Biometrics</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "1.75rem" }}>
              Update your physical measurements and identity across the AB Fitness network.
            </p>

            {errorMsg && (
              <div style={{
                background: "rgba(239, 68, 68, 0.15)",
                color: "#fca5a5",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                marginBottom: "1.25rem",
                fontSize: "0.88rem",
              }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Height (in cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    className="form-input"
                    placeholder="178.5"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Date of Birth (DOB)</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Home City</label>
                  <select
                    className="form-select"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    {INDIAN_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                  style={{ flexGrow: 1 }}
                >
                  {saving ? "Saving Changes..." : "Save Biometrics & Profile"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
