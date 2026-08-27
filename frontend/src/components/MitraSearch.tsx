"use client";

import { useState } from "react";
import { Partnership } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

interface Props {
  initialPartnerships: Partnership[];
}

export default function MitraSearch({ initialPartnerships }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Filter based on search query
  const filteredPartners = initialPartnerships.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPartners.length / ITEMS_PER_PAGE);
  const paginatedPartners = filteredPartners.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section style={{ padding: "0 1.5rem 4rem", background: "var(--section-bg)", minHeight: "60vh" }}>
      <style>{`
        @media (max-width: 768px) {
          .mitra-layout { flex-direction: column !important; }
          .mitra-sidebar { max-width: 100% !important; flex: 1 1 auto !important; }
        }
        .mitra-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
          height: 100%;
          text-align: center;
        }
        .mitra-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
          border-color: rgba(240, 165, 0, 0.4);
        }
        .mitra-logo-container {
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          padding: 10px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        .mitra-logo-container img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      `}</style>
      
      <div className="mitra-layout" style={{ maxWidth: "1200px", margin: "2rem auto 0", display: "flex", gap: "2rem", flexDirection: "row", alignItems: "flex-start" }}>
        
        {/* Sidebar Pencarian (mengadopsi layout mirip berita) */}
        <div className="mitra-sidebar" style={{ flex: "1 1 250px", maxWidth: "300px" }}>
          <div style={{ background: "var(--card)", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border)", position: "sticky", top: "2rem" }}>
            <h3 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: 700, color: "var(--text-heading)" }}>Pencarian Mitra</h3>
            
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--muted-foreground)" }}>Nama Instansi / Perusahaan</label>
              <input
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // reset halaman saat mencari
                }}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--section-bg)", color: "var(--foreground)", fontSize: "0.95rem", outline: "none" }}
              />
            </div>
            
            {/* Hanya field pencarian yang diperlukan untuk Mitra saat ini, 
                kategori/tanggal tidak relevan kecuali ditambahkan di database. */}
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{ flex: "3 1 0%", minWidth: 0 }}>
          {paginatedPartners.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted-foreground)", background: "var(--card)", borderRadius: "16px", border: "1px solid var(--border)" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 1rem", opacity: 0.5 }}>
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              <h3 style={{ fontSize: "1.1rem", color: "var(--foreground)" }}>Mitra tidak ditemukan.</h3>
            </div>
          ) : (
            <>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1.5rem" 
              }}>
                {paginatedPartners.map((mitra) => (
                  <div key={mitra.id} className="mitra-card">
                    <div className="mitra-logo-container">
                      <img src={getImageUrl(mitra.logo)} alt={mitra.name} loading="lazy" />
                    </div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.4, margin: 0 }}>
                      {mitra.name}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "3rem" }}>
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    style={{ padding: "8px 16px", borderRadius: "8px", background: currentPage === 1 ? "var(--muted)" : "var(--card)", color: currentPage === 1 ? "var(--muted-foreground)" : "var(--foreground)", border: "1px solid var(--border)", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontWeight: 600, fontSize: "0.9rem" }}
                  >
                    Sebelumnya
                  </button>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--muted-foreground)" }}>
                    Halaman {currentPage} dari {totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    style={{ padding: "8px 16px", borderRadius: "8px", background: currentPage === totalPages ? "var(--muted)" : "var(--card)", color: currentPage === totalPages ? "var(--muted-foreground)" : "var(--foreground)", border: "1px solid var(--border)", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontWeight: 600, fontSize: "0.9rem" }}
                  >
                    Selanjutnya
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
