"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CampusOrganization } from "@/lib/types";
import { getImageUrl } from "@/lib/api";
import Reveal from "./Reveal";

export default function OrganisasiKampusListClient({ organizations }: { organizations: CampusOrganization[] }) {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const filteredOrgs = useMemo(() => {
    return organizations.filter(org => {
      // Type filter
      if (filter !== "Semua") {
        if (org.type !== filter) return false;
      }
      // Search text
      if (search) {
        if (!org.name.toLowerCase().includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [organizations, filter, search]);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Filters and Search */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
        
        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["Semua", "BEM", "HMJ", "UKM"].map((tab) => (
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
            placeholder="Cari organisasi kampus..."
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
      {filteredOrgs.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {filteredOrgs.map((org, i) => (
            <Reveal key={org.id} delay={i * 0.05} animation="fadeInUp">
              <Link
                href={`/organisasi-kampus/${org.slug}`}
                className="prodi-card"
              >
                {/* Background image & overlay layer */}
                <div 
                  className="prodi-card-bg" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80')` }}
                />
                <div className="prodi-card-overlay" />
                
                {/* Top accent line */}
                <div className="prodi-card-accent" />

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
                  {/* Icon */}
                  <div className="prodi-icon-container" style={{ padding: "8px", background: "white", overflow: "hidden" }}>
                    {org.logo ? (
                      <img
                        src={getImageUrl(org.logo)}
                        alt={org.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1a3a5c" }}>
                        {org.name.substring(0, 2)}
                      </span>
                    )}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 className="prodi-title" style={{ fontSize: "1.1rem" }}>
                      {org.name}
                    </h3>
                    
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                      <span className="prodi-badge-accred" style={{ background: "rgba(240, 165, 0, 0.2)", color: "#f0a500" }}>
                        {org.type}
                      </span>
                    </div>
                    
                    {/* Interactive Arrow Call-to-action */}
                    <div className="prodi-cta">
                      Lihat Profil
                      <svg 
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal animation="fadeIn">
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted-foreground)", background: "rgba(26,58,92,0.02)", borderRadius: "24px", border: "1px dashed var(--border)" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem", fontWeight: 600 }}>Oops!</p>
            <p>Tidak ada organisasi kampus yang cocok dengan "{search}".</p>
          </div>
        </Reveal>
      )}
    </div>
  );
}
