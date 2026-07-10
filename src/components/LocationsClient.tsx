'use client';

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Star, Search, Filter, Sparkles } from "lucide-react";

export interface GymLocationItem {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string | null;
  amenities: string;
  timings: string;
  rating: number;
}

interface LocationsClientProps {
  locations: GymLocationItem[];
}

export default function LocationsClient({ locations }: LocationsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("ALL");

  const states = Array.from(new Set(locations.map((l) => l.state))).sort();

  const filteredLocations = locations.filter((loc) => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesState = selectedState === "ALL" || loc.state === selectedState;

    return matchesSearch && matchesState;
  });

  return (
    <div className="container section-pad">
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3rem auto" }}>
        <span className="badge badge-emerald" style={{ marginBottom: "0.75rem" }}>
          NATIONAL NETWORK
        </span>
        <h1 style={{ fontSize: "2.75rem", marginBottom: "0.85rem" }}>
          All-India <span className="gradient-text">Gym Locator</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.08rem", lineHeight: 1.6 }}>
          One digital passport grants you access to every AB Fitness club across India. Find your nearest location, contact details, and club amenities below.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{
        padding: "1.25rem 1.75rem",
        marginBottom: "3rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "1.25rem",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          flexGrow: 1,
          minWidth: "260px",
          background: "rgba(13, 17, 26, 0.9)",
          border: "1px solid var(--border-glass)",
          borderRadius: "var(--radius-sm)",
          padding: "0.6rem 1rem",
        }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search by city (e.g. Mumbai, Bengaluru, Delhi) or club name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-main)",
              outline: "none",
              width: "100%",
              fontSize: "0.95rem",
            }}
          />
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}>
          <Filter size={18} color="var(--accent-primary)" />
          <select
            className="form-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            style={{ minWidth: "180px", padding: "0.6rem 1rem" }}
          >
            <option value="ALL">All States / Regions ({locations.length})</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Locations Grid */}
      <div style={{ marginBottom: "1.5rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
        Showing <strong style={{ color: "var(--text-main)" }}>{filteredLocations.length}</strong> clubs across India
      </div>

      {filteredLocations.length === 0 ? (
        <div className="glass-card" style={{ padding: "4rem", textAlign: "center" }}>
          <MapPin size={48} color="var(--accent-crimson)" style={{ marginBottom: "1rem" }} />
          <h3>No Gym Locations Found</h3>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Try searching for another city name or clearing the state filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedState("ALL");
            }}
            className="btn btn-secondary"
            style={{ marginTop: "1.5rem" }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid-3">
          {filteredLocations.map((loc) => {
            let parsedAmenities: string[] = [];
            try {
              parsedAmenities = JSON.parse(loc.amenities || "[]");
            } catch {
              parsedAmenities = ["CrossFit Arena", "Steam & Sauna", "Organic Juice Bar"];
            }

            return (
              <div
                key={loc.id}
                className="glass-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.85rem",
                  }}>
                    <span className="badge badge-violet">{loc.city}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#f59e0b", fontWeight: 800 }}>
                      <Star size={16} fill="#f59e0b" />
                      <span>{loc.rating}</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: "1.35rem", marginBottom: "0.5rem" }}>{loc.name}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
                    {loc.address}
                  </p>

                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    marginBottom: "1.5rem",
                    fontSize: "0.88rem",
                    color: "var(--text-muted)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <Phone size={15} color="var(--accent-secondary)" />
                      <span>{loc.phone}</span>
                    </div>
                    {loc.email && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <Mail size={15} color="var(--accent-primary)" />
                        <span>{loc.email}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <Clock size={15} color="var(--accent-warm)" />
                      <span>{loc.timings}</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      color: "var(--text-muted)",
                      letterSpacing: "0.08em",
                      marginBottom: "0.6rem",
                    }}>
                      CLUB AMENITIES
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {parsedAmenities.map((am, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid var(--border-glass)",
                            borderRadius: "6px",
                            padding: "0.25rem 0.65rem",
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            color: "var(--text-main)",
                          }}
                        >
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{
                  borderTop: "1px solid var(--border-glass)",
                  paddingTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--accent-secondary)", fontWeight: 700 }}>
                    All-India Card Accepted
                  </span>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.name + " " + loc.city)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: "0.45rem 0.85rem", fontSize: "0.8rem" }}
                  >
                    Direction Map &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
