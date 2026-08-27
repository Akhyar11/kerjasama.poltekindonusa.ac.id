"use client";

import { useState } from "react";

interface Props {
  programName: string;
  description: string | null;
  graduateProfile: string | null;
  achievements: string | null;
  imageUrl: string | null;
  // Optional Visi Misi fields if updated in the backend
  vision?: string | null;
  mission?: string | null;
  goals?: string | null;
}

type TabType = "tentang" | "visi-misi" | "profil" | "prestasi";

export default function ProgramTabsClient({
  programName,
  description,
  graduateProfile,
  achievements,
  imageUrl,
  vision,
  mission,
  goals
}: Props) {
  // If there's visionary data from the backend, we show a separate tab,
  // otherwise we group the current content elegantly
  const hasVisiMisi = !!(vision || mission || goals);
  const [activeTab, setActiveTab] = useState<TabType>("tentang");

  const tabs = [
    { id: "tentang" as TabType, label: "Tentang Program", show: true },
    { id: "visi-misi" as TabType, label: "Visi, Misi & Tujuan", show: hasVisiMisi },
    { id: "profil" as TabType, label: "Profil Lulusan", show: !!graduateProfile },
    { id: "prestasi" as TabType, label: "Prestasi & Keunggulan", show: !!achievements },
  ];

  return (
    <div className="dept-container">
      {/* Sidebar Tabs List */}
      <div className="dept-tabs-list">
        {tabs
          .filter((t) => t.show)
          .map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`dept-tab-button ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s" }}>
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          ))}
      </div>

      {/* Active Tab Content Panel */}
      <div className="dept-content-panel">
        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap-reverse", alignItems: "flex-start" }}>

          {/* Text Content */}
          <div style={{ flex: "1 1 400px" }}>
            {activeTab === "tentang" && (
              <div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1.25rem", letterSpacing: "-0.5px" }}>
                  Tentang {programName}
                </h3>
                {description ? (
                  <div className="wysiwyg-content" dangerouslySetInnerHTML={{ __html: description }} />
                ) : (
                  <p style={{ color: "var(--muted-foreground)" }}>Detail ringkasan program studi ini belum tersedia.</p>
                )}
              </div>
            )}

            {activeTab === "visi-misi" && hasVisiMisi && (
              <div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1.5rem", letterSpacing: "-0.5px" }}>
                  Visi, Misi & Tujuan
                </h3>

                {vision && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-accent-dark, #c08400)", marginBottom: "0.5rem" }}>Visi</h4>
                    <div className="wysiwyg-content" dangerouslySetInnerHTML={{ __html: vision }} />
                  </div>
                )}

                {mission && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary, #1a3a5c)", marginBottom: "0.5rem" }}>Misi</h4>
                    <div className="wysiwyg-content" dangerouslySetInnerHTML={{ __html: mission }} />
                  </div>
                )}

                {goals && (
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary, #1a3a5c)", marginBottom: "0.5rem" }}>Tujuan</h4>
                    <div className="wysiwyg-content" dangerouslySetInnerHTML={{ __html: goals }} />
                  </div>
                )}
              </div>
            )}

            {activeTab === "profil" && graduateProfile && (
              <div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1.25rem", letterSpacing: "-0.5px" }}>
                  Profil Lulusan
                </h3>
                <div className="wysiwyg-content" dangerouslySetInnerHTML={{ __html: graduateProfile }} />
              </div>
            )}

            {activeTab === "prestasi" && achievements && (
              <div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1.25rem", letterSpacing: "-0.5px" }}>
                  Prestasi Program Studi
                </h3>
                <div className="wysiwyg-content" dangerouslySetInnerHTML={{ __html: achievements }} />
              </div>
            )}
          </div>

          {/* Floating Program Image (MediLab-Style Department Illustration) */}
          {imageUrl && (
            <div style={{ flex: "0 0 240px", maxWidth: "100%", margin: "0 auto" }}>
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
                  border: "4px solid white",
                  background: "white",
                  transform: "rotate(1deg)",
                  transition: "transform 0.3s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(0deg) scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(1deg) scale(1)"}
              >
                <img
                  src={imageUrl}
                  alt={programName}
                  style={{ width: "100%", height: "240px", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
