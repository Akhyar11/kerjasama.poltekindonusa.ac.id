"use client";

import { useState } from "react";
import Link from "next/link";
import { News, Document } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

interface SearchResultsProps {
  initialQuery: string;
  initialNews: News[];
  initialDocs: Document[];
  initialPages: { title: string; url: string }[];
}

type SearchResultItem = {
  id: string;
  type: "Berita" | "Download" | "Halaman";
  title: string;
  url: string;
  date?: string;
  badgeColor: string;
  badgeBg: string;
  image?: string | null;
};

export default function SearchResults({ initialQuery, initialNews, initialDocs, initialPages }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Combine all results
  const allResults: SearchResultItem[] = [
    ...initialPages.map((p, i) => ({
      id: `page-${i}`,
      type: "Halaman" as const,
      title: p.title,
      url: p.url,
      badgeColor: "#2563eb",
      badgeBg: "rgba(37,99,235,0.1)"
    })),
    ...initialNews.map((n) => ({
      id: `news-${n.id}`,
      type: "Berita" as const,
      title: n.title,
      url: `/berita/${n.slug}`,
      date: new Date(n.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
      badgeColor: "#16a34a",
      badgeBg: "rgba(22,163,74,0.1)",
      image: n.image
    })),
    ...initialDocs.map((d) => ({
      id: `doc-${d.id}`,
      type: "Download" as const,
      title: d.title,
      url: d.is_external ? (d.external_url || "#") : getImageUrl(d.file_path),
      date: new Date(d.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
      badgeColor: "#f0a500",
      badgeBg: "rgba(240,165,0,0.1)"
    }))
  ];

  const totalPages = Math.ceil(allResults.length / itemsPerPage);
  const currentResults = allResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section style={{ padding: "4rem 1.5rem", background: "var(--section-bg)", minHeight: "60vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <form action="/search" method="GET" style={{ marginBottom: "3rem", display: "flex", gap: "12px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <input 
              type="text" 
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari berita, file download, atau halaman..." 
              style={{
                width: "100%",
                padding: "1rem 1.5rem 1rem 3.5rem",
                borderRadius: "14px",
                border: "2px solid var(--border)",
                background: "var(--card)",
                fontSize: "1rem",
                color: "var(--foreground)",
                outline: "none"
              }}
            />
            <div style={{ position: "absolute", left: "1.2rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
          </div>
          <button type="submit" style={{ padding: "0 2rem", borderRadius: "14px", background: "linear-gradient(135deg, #1a3a5c, #2a5a8c)", color: "white", fontWeight: 700, border: "none", cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            Cari
          </button>
        </form>

        {initialQuery && allResults.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted-foreground)", background: "var(--card)", borderRadius: "20px", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</p>
            <h3 style={{ fontSize: "1.2rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>Tidak ada hasil ditemukan</h3>
            <p>Silakan coba dengan kata kunci lain yang berbeda.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {currentResults.map((item) => (
              <a 
                key={item.id} 
                href={item.url}
                target={item.type === "Download" ? "_blank" : "_self"}
                rel={item.type === "Download" ? "noopener noreferrer" : undefined}
                style={{ 
                  display: "block", 
                  padding: "1.5rem", 
                  background: "var(--card)", 
                  borderRadius: "16px", 
                  border: "1px solid var(--border)", 
                  textDecoration: "none",
                  transition: "all 0.3s",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary-light)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: "1.5rem", flex: 1 }}>
                    {item.image && (
                      <div style={{ width: "120px", height: "80px", flexShrink: 0, borderRadius: "8px", overflow: "hidden", position: "relative", background: "var(--muted)" }}>
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "8px", lineHeight: 1.4 }}>
                        {item.title}
                      </h3>
                      {item.date && (
                        <div style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>
                          {item.date}
                        </div>
                      )}
                    </div>
                  </div>
                  <span style={{ 
                    padding: "4px 12px", 
                    borderRadius: "8px", 
                    background: item.badgeBg, 
                    color: item.badgeColor, 
                    fontSize: "0.75rem", 
                    fontWeight: 700,
                    whiteSpace: "nowrap"
                  }}>
                    {item.type}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "3rem" }}>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ padding: "8px 16px", borderRadius: "8px", background: currentPage === 1 ? "var(--muted)" : "var(--card)", color: currentPage === 1 ? "var(--muted-foreground)" : "var(--foreground)", border: "1px solid var(--border)", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
            >
              Sebelumnya
            </button>
            <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--muted-foreground)" }}>
              Halaman {currentPage} dari {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{ padding: "8px 16px", borderRadius: "8px", background: currentPage === totalPages ? "var(--muted)" : "var(--card)", color: currentPage === totalPages ? "var(--muted-foreground)" : "var(--foreground)", border: "1px solid var(--border)", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
