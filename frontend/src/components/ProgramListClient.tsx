"use client";

import { useState, useMemo } from "react";
import { StudyProgram } from "@/lib/types";
import ProgramCard from "./ProgramCard";
import Reveal from "./Reveal";

export default function ProgramListClient({ programs }: { programs: StudyProgram[] }) {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const filteredPrograms = useMemo(() => {
    return programs.filter(p => {
      // Degree filter
      if (filter !== "Semua") {
        if (!p.degree || !p.degree.includes(filter)) return false;
      }
      // Search text
      if (search) {
        if (!p.name.toLowerCase().includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [programs, filter, search]);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Filters and Search */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
        
        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["Semua", "D3", "S1 Terapan"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                border: "none",
                background: filter === tab ? "linear-gradient(135deg, #f0a500, #d98f00)" : "rgba(26,58,92,0.06)",
                color: filter === tab ? "white" : "var(--foreground)",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: filter === tab ? "0 4px 12px rgba(240, 165, 0, 0.3)" : "none"
              }}
              onMouseEnter={(e) => {
                if (filter !== tab) e.currentTarget.style.background = "rgba(26,58,92,0.1)";
              }}
              onMouseLeave={(e) => {
                if (filter !== tab) e.currentTarget.style.background = "rgba(26,58,92,0.06)";
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 250px", maxWidth: "320px" }}>
          <input
            type="text"
            placeholder="Cari program studi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 16px 10px 42px",
              borderRadius: "14px",
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--foreground)",
              outline: "none",
              fontSize: "0.9rem",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#f0a500";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(240, 165, 0, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* Grid */}
      {filteredPrograms.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {filteredPrograms.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} animation="fadeInUp">
              <ProgramCard program={p} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal animation="fadeIn">
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted-foreground)", background: "rgba(26,58,92,0.02)", borderRadius: "24px", border: "1px dashed var(--border)" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem", fontWeight: 600 }}>Oops!</p>
            <p>Tidak ada program studi yang cocok dengan "{search}".</p>
          </div>
        </Reveal>
      )}
    </div>
  );
}
