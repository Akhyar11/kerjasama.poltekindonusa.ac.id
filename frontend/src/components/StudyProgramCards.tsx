"use client";

import Link from "next/link";
import { StudyProgram } from "@/lib/types";
import Reveal from "@/components/Reveal";
import { getImageUrl } from "@/lib/api";

// Icon map for each program type
const programIcons: Record<string, string> = {
  otomotif: "🔧",
  perangkat: "💻",
  media: "🎬",
  ritel: "📊",
  perpajakan: "📋",
  perhotelan: "🏨",
  farmasi: "💊",
  kesehatan: "🏥",
  laboratorium: "🔬",
};

function getIcon(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(programIcons)) {
    if (lower.includes(key)) return icon;
  }
  return "🎓";
}

function getProgramImage(program: StudyProgram): string {
  // Try Background Cover Image first
  if (program.cover_image && program.cover_image.trim() !== "") {
    return getImageUrl(program.cover_image);
  }
  // Try Program Icon/Image second
  if (program.image && program.image !== "/placeholder.jpg" && program.image.trim() !== "") {
    return getImageUrl(program.image);
  }
  
  const name = program.name || "";
  const lower = name.toLowerCase();
  if (lower.includes("otomotif")) {
    return "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80";
  }
  if (lower.includes("perangkat lunak") || lower.includes("komputer") || lower.includes("informatika") || lower.includes("program")) {
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80";
  }
  if (lower.includes("media") || lower.includes("desain") || lower.includes("komunikasi") || lower.includes("produksi")) {
    return "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80";
  }
  if (lower.includes("ritel") || lower.includes("bisnis") || lower.includes("pemasaran")) {
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
  }
  if (lower.includes("akuntansi") || lower.includes("pajak") || lower.includes("perpajakan") || lower.includes("keuangan")) {
    return "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80";
  }
  if (lower.includes("hotel") || lower.includes("perhotelan") || lower.includes("pariwisata")) {
    return "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80";
  }
  if (lower.includes("farmasi") || lower.includes("obat")) {
    return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80";
  }
  if (lower.includes("informasi kesehatan") || lower.includes("rekam medis")) {
    return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80";
  }
  if (lower.includes("laboratorium") || lower.includes("medis") || lower.includes("analis")) {
    return "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80";
  }

  return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80";
}

// Fallback study programs if API returns empty
const fallbackPrograms: StudyProgram[] = [
  { id: 1, name: "Teknologi Rekayasa Otomotif", slug: "teknologi-rekayasa-otomotif", description: "S1 Terapan", image: null, icon: null, accreditation: "Baik Sekali", degree: "S1 Terapan", hover_bg_color: "linear-gradient(135deg, #1e293b 0%, #3f0e0e 100%)", hover_border_color: "#ef4444", hover_text_color: "#ffffff" },
  { id: 2, name: "Teknologi Rekayasa Perangkat Lunak", slug: "teknologi-rekayasa-perangkat-lunak", description: "S1 Terapan", image: null, icon: null, accreditation: "Baik Sekali", degree: "S1 Terapan", hover_bg_color: "linear-gradient(135deg, #0d2440 0%, #1e3a8a 100%)", hover_border_color: "#f0a500", hover_text_color: "#ffffff" },
  { id: 3, name: "Produksi Media", slug: "produksi-media", description: "S1 Terapan", image: null, icon: null, accreditation: "Baik", degree: "S1 Terapan", hover_bg_color: "linear-gradient(135deg, #1f1235 0%, #3b0764 100%)", hover_border_color: "#a855f7", hover_text_color: "#ffffff" },
  { id: 4, name: "Bisnis Manajemen Ritel", slug: "bisnis-manajemen-ritel", description: "S1 Terapan", image: null, icon: null, accreditation: "Baik Sekali", degree: "S1 Terapan", hover_bg_color: "linear-gradient(135deg, #062f22 0%, #064e3b 100%)", hover_border_color: "#34d399", hover_text_color: "#ffffff" },
  { id: 5, name: "Akuntansi Perpajakan", slug: "akuntansi-perpajakan", description: "S1 Terapan", image: null, icon: null, accreditation: "Baik Sekali", degree: "S1 Terapan", hover_bg_color: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", hover_border_color: "#818cf8", hover_text_color: "#ffffff" },
  { id: 6, name: "Perhotelan", slug: "perhotelan", description: "D3", image: null, icon: null, accreditation: "Baik", degree: "D3", hover_bg_color: "linear-gradient(135deg, #2d1a0e 0%, #451a03 100%)", hover_border_color: "#fbbf24", hover_text_color: "#ffffff" },
  { id: 7, name: "Farmasi", slug: "farmasi", description: "D3", image: null, icon: null, accreditation: "Baik Sekali", degree: "D3", hover_bg_color: "linear-gradient(135deg, #064e3b 0%, #0d9488 100%)", hover_border_color: "#2dd4bf", hover_text_color: "#ffffff" },
  { id: 8, name: "Manajemen Informasi Kesehatan", slug: "manajemen-informasi-kesehatan", description: "S1 Terapan", image: null, icon: null, accreditation: "Baik", degree: "S1 Terapan", hover_bg_color: "linear-gradient(135deg, #0d3b66 0%, #1e40af 100%)", hover_border_color: "#60a5fa", hover_text_color: "#ffffff" },
  { id: 9, name: "Teknologi Laboratorium Medis", slug: "teknologi-laboratorium-medis", description: "S1 Terapan", image: null, icon: null, accreditation: "Baik", degree: "S1 Terapan", hover_bg_color: "linear-gradient(135deg, #1e293b 0%, #475569 100%)", hover_border_color: "#94a3b8", hover_text_color: "#ffffff" },
];

interface Props {
  programs: StudyProgram[];
}

export default function StudyProgramCards({ programs }: Props) {
  const allPrograms = programs.length > 0 ? programs : fallbackPrograms;
  const displayPrograms = allPrograms.slice(0, 9);

  return (
    <section
      id="study-programs"
      style={{
        padding: "6rem 1.5rem",
        background: "linear-gradient(rgba(13, 36, 64, 0.88), rgba(26, 58, 92, 0.88)), url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Decorative */}
      <div
        style={{
          position: "absolute",
          top: "0%",
          left: "0%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(240, 165, 0, 0.05)",
          filter: "blur(80px)",
        }}
      />

      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "700px", margin: "0 auto 4rem", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "8px",
            background: "rgba(240, 165, 0, 0.15)",
            color: "#f0a500",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Program Studi
        </div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
            marginBottom: "1rem",
            letterSpacing: "-0.5px",
          }}
        >
          Program Studi <span style={{ color: "#f0a500" }}>Unggulan</span>
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.05rem", lineHeight: 1.7 }}>
          Pilih program studi yang sesuai dengan minat dan bakatmu untuk masa depan yang lebih cerah
        </p>
      </div>

      {/* Cards grid */}
      <div
        className="program-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "1.5rem",
        }}
      >
        {displayPrograms.map((program, index) => (
          <Reveal key={program.id} delay={index * 0.1} animation="fadeInUp">
            <Link
              href={`/program-studi/${program.slug}`}
              className="prodi-card"
              style={{
                "--hover-bg": program.hover_bg_color || "linear-gradient(135deg, rgba(13, 36, 64, 0.96) 0%, rgba(26, 58, 92, 0.9) 100%)",
                "--hover-border": program.hover_border_color || "rgba(240, 165, 0, 0.3)",
                "--hover-text": program.hover_text_color || "#ffffff",
              } as React.CSSProperties}
            >
              {/* Background image & overlay layer */}
              <div 
                className="prodi-card-bg" 
                style={{ backgroundImage: `url('${getProgramImage(program)}')`, backgroundPosition: program.cover_image_focus || "center" }}
              />
              <div className="prodi-card-overlay" />

              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", position: "relative", zIndex: 2 }}>
                <div style={{ flex: 1 }}>
                  <h3 className="prodi-title">
                    {program.name}
                  </h3>

                  <div>
                    <span style={{
                      fontSize: "0.75rem",
                      lineHeight: 1.5,
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "6px",
                    }}>
                      {program.degree && (
                        <span style={{
                          fontWeight: 700,
                          color: "#f0a500",
                          fontSize: "0.72rem",
                        }}>
                          {program.degree}
                        </span>
                      )}
                      {program.degree && program.accreditation && (
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
                      )}
                      {program.accreditation && (
                        <span style={{ fontSize: "0.72rem" }}>
                          <span style={{ color: "rgba(255,255,255,0.8)" }}>Akreditasi : </span>
                          <span style={{ fontWeight: 700, color: "#f0a500" }}>
                            {program.accreditation}
                          </span>
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Arrow icon container */}
                <div className="prodi-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* View all button CTA */}
      <div 
        style={{ 
          textAlign: "center", 
          marginTop: "4rem", 
          position: "relative", 
          zIndex: 2 
        }}
      >
        <Reveal delay={0.2} animation="fadeInUp">
          <Link
            href="/program-studi"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 40px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "14px",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            }}
            className="prodi-more-btn"
          >
            <span>Lihat Semua Program Studi</span>
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 18 18" 
              fill="none" 
              style={{ 
                transition: "transform 0.3s",
                color: "#f0a500"
              }}
              className="prodi-more-arrow"
            >
              <path 
                d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
