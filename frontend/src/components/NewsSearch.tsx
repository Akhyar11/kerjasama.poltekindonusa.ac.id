"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { News } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

interface Props {
  initialNews: News[];
}

export default function NewsSearch({ initialNews }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedMonth, selectedYear]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    initialNews.forEach(item => {
      if (item.category?.name) cats.add(item.category.name);
    });
    return Array.from(cats).sort();
  }, [initialNews]);

  const years = useMemo(() => {
    const yrs = new Set<string>();
    initialNews.forEach(item => {
      const dateStr = item.published_at || item.created_at;
      if (dateStr) {
        const isoStr = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
        const parsedDate = new Date(isoStr);
        if (!isNaN(parsedDate.getTime())) {
          yrs.add(parsedDate.getFullYear().toString());
        }
      }
    });
    return Array.from(yrs).sort().reverse();
  }, [initialNews]);

  const months = [
    { value: "0", label: "Januari" },
    { value: "1", label: "Februari" },
    { value: "2", label: "Maret" },
    { value: "3", label: "April" },
    { value: "4", label: "Mei" },
    { value: "5", label: "Juni" },
    { value: "6", label: "Juli" },
    { value: "7", label: "Agustus" },
    { value: "8", label: "September" },
    { value: "9", label: "Oktober" },
    { value: "10", label: "November" },
    { value: "11", label: "Desember" },
  ];

  const filteredNews = initialNews.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory ? item.category?.name === selectedCategory : true;
    
    let matchesYear = true;
    let matchesMonth = true;
    
    const dateStr = item.published_at || item.created_at;
    if (dateStr && (selectedYear || selectedMonth)) {
      const isoStr = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
      const date = new Date(isoStr);
      if (!isNaN(date.getTime())) {
        if (selectedYear) {
          matchesYear = date.getFullYear().toString() === selectedYear;
        }
        if (selectedMonth) {
          matchesMonth = date.getMonth().toString() === selectedMonth;
        }
      }
    } else if (selectedYear || selectedMonth) {
      matchesYear = !selectedYear;
      matchesMonth = !selectedMonth;
    }

    return matchesSearch && matchesCategory && matchesYear && matchesMonth;
  });

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = filteredNews.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section style={{ padding: "0 1.5rem 4rem", background: "var(--section-bg)" }}>
      <style>{`
        @media (max-width: 768px) {
          .news-layout { flex-direction: column !important; }
          .news-sidebar { max-width: 100% !important; flex: 1 1 auto !important; }
        }
      `}</style>
      <div className="news-layout" style={{ maxWidth: "1200px", margin: "2rem auto 0", display: "flex", gap: "2rem", flexDirection: "row", alignItems: "flex-start" }}>
        
        {/* Sidebar (col 3) */}
        <div className="news-sidebar" style={{ flex: "1 1 250px", maxWidth: "300px" }}>
          <div style={{ background: "var(--card)", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border)", position: "sticky", top: "2rem" }}>
            <h3 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: 700, color: "var(--text-heading)" }}>Filter Pencarian</h3>
            
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--muted-foreground)" }}>Kata Kunci</label>
              <input
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--section-bg)", color: "var(--foreground)", fontSize: "0.95rem", outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--muted-foreground)" }}>Program Studi / Kategori</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--section-bg)", color: "var(--foreground)", fontSize: "0.95rem", outline: "none" }}
              >
                <option value="">Semua Kategori</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--muted-foreground)" }}>Tahun</label>
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--section-bg)", color: "var(--foreground)", fontSize: "0.95rem", outline: "none" }}
              >
                <option value="">Semua Tahun</option>
                {years.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
            
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--muted-foreground)" }}>Bulan</label>
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--section-bg)", color: "var(--foreground)", fontSize: "0.95rem", outline: "none" }}
              >
                <option value="">Semua Bulan</option>
                {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content (col 9) */}
        <div style={{ flex: "3 1 0%", minWidth: 0 }}>
          {paginatedNews.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted-foreground)", background: "var(--card)", borderRadius: "16px", border: "1px solid var(--border)" }}>
              <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>📰</p>
              <h3 style={{ fontSize: "1.1rem", color: "var(--foreground)" }}>Tidak ada berita yang sesuai dengan filter.</h3>
            </div>
          ) : (
            <>
              <div 
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1.5rem" 
                }}
              >
                {paginatedNews.map((item) => (
                  <Link 
                    key={item.id} 
                    href={`/berita/${item.slug}`} 
                    style={{ display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden", textDecoration: "none", background: "var(--card)", border: "1px solid var(--border)", transition: "all 0.3s", height: "100%" }}
                  >
                    <div style={{ position: "relative", paddingTop: "60%", background: "linear-gradient(135deg, #1a3a5c, #2a5a8c)" }}>
                      {item.image && (
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.title} 
                          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} 
                        />
                      )}
                      {item.category && (
                        <div style={{ position: "absolute", top: "10px", left: "10px", padding: "4px 10px", borderRadius: "6px", background: "linear-gradient(135deg, #f0a500, #ffc940)", color: "#0d2440", fontSize: "0.7rem", fontWeight: 700, boxShadow: "0 2px 8px rgba(240,165,0,0.3)" }}>
                          {item.category.name}
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "1.2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>
                        {new Date(item.published_at || item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      </div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                        {item.title}
                      </h3>
                      {item.content && (
                        <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginTop: "auto" }}>
                          {item.content.replace(/<[^>]*>/g, "").substring(0, 100)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

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
