"use client";

import { useState } from "react";
import { Document } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

interface DocumentListProps {
  initialDocuments: Document[];
}

const typeLabels: Record<string, { label: string; color: string; bg: string }> = {
  pengumuman: { label: "Pengumuman", color: "var(--foreground)", bg: "rgba(26,58,92,0.08)" },
  pedoman: { label: "Pedoman", color: "#c08400", bg: "rgba(240,165,0,0.1)" },
  akademik: { label: "Akademik", color: "#2563eb", bg: "rgba(37,99,235,0.08)" },
};

export default function DocumentList({ initialDocuments }: DocumentListProps) {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredDocuments = initialDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  const displayedDocs = filteredDocuments.slice(0, visibleCount);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* Search Input */}
      <div style={{ marginBottom: "2rem", position: "relative" }}>
        <input
          type="text"
          placeholder="Cari dokumen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "1rem 1.5rem 1rem 3.5rem",
            borderRadius: "16px",
            border: "2px solid var(--border)",
            background: "var(--card)",
            fontSize: "1rem",
            color: "var(--foreground)",
            outline: "none",
            transition: "all 0.2s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#1a3a5c")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
        <div style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", fontSize: "1.2rem", color: "var(--muted-foreground)" }}>
          🔍
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted-foreground)" }}>
          <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>📁</p>
          <p>{search ? "Tidak ada dokumen yang sesuai dengan pencarian." : "Belum ada dokumen tersedia saat ini."}</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {displayedDocs.map((doc) => {
            const typeInfo = typeLabels[doc.type] ?? { label: doc.type, color: "var(--muted-foreground)", bg: "var(--muted)" };
            const downloadUrl = doc.is_external ? doc.external_url : getImageUrl(doc.file_path);
            
            return (
              <div 
                key={doc.id} 
                className="doc-item"
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "1.25rem", 
                  padding: "1.25rem 1.5rem", 
                  background: "var(--card)", 
                  borderRadius: "20px", 
                  border: "1px solid var(--border)", 
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                }}
              >
                <div style={{ 
                  width: "52px", 
                  height: "52px", 
                  borderRadius: "14px", 
                  background: doc.is_external ? "rgba(240,165,0,0.1)" : "rgba(26,58,92,0.1)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontSize: "1.5rem", 
                  flexShrink: 0 
                }}>
                  {doc.is_external ? "🔗" : "📄"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "8px", lineHeight: 1.4 }}>
                    {doc.title}
                  </h3>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ padding: "4px 10px", borderRadius: "8px", background: typeInfo.bg, color: typeInfo.color, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>
                      {typeInfo.label}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 500 }}>
                      📅 {new Date(doc.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <a 
                  href={downloadUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    padding: "10px 24px", 
                    borderRadius: "12px", 
                    background: doc.is_external ? "linear-gradient(135deg, #f0a500, #c08400)" : "linear-gradient(135deg, #1a3a5c, #2a5a8c)", 
                    color: "white", 
                    textDecoration: "none", 
                    fontSize: "0.85rem", 
                    fontWeight: 700, 
                    whiteSpace: "nowrap", 
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: doc.is_external ? "0 4px 12px rgba(240, 165, 0, 0.2)" : "0 4px 12px rgba(26, 58, 92, 0.2)"
                  }}
                >
                  {doc.is_external ? "Buka Tautan" : "Unduh File"}
                  <span>{doc.is_external ? "↗" : "↓"}</span>
                </a>
              </div>
            );
          })}

          {visibleCount < filteredDocuments.length && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button 
                onClick={() => setVisibleCount(prev => prev + 10)}
                style={{
                  padding: "12px 28px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #1a3a5c, #2a5a8c)",
                  color: "white",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(26, 58, 92, 0.2)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(26, 58, 92, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(26, 58, 92, 0.2)";
                }}
              >
                Tampilkan Lebih Banyak
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
