"use client";

import { useState } from "react";
import { CampusSystem } from "@/lib/types";
import CampusSystemsSection from "@/components/CampusSystemsSection";

interface Props {
  systems: CampusSystem[];
}

export default function SistemInformasiSearch({ systems }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSystems = systems.filter((system) =>
    system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (system.description && system.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "2rem auto 0", padding: "0 1.5rem" }}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Cari sistem informasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 20px 14px 45px",
              borderRadius: "14px",
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--foreground)",
              fontSize: "0.95rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              outline: "none",
              transition: "all 0.3s"
            }}
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      <CampusSystemsSection systems={filteredSystems} hideHeader={true} />
      
      {filteredSystems.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted-foreground)" }}>
          <p>Sistem informasi tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
}
