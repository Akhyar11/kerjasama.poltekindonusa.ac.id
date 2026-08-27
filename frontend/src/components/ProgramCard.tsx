"use client";

import Link from "next/link";
import { StudyProgram } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

const programIcons: Record<string, string> = {
  otomotif: "🔧", perangkat: "💻", media: "🎬", ritel: "📊",
  perpajakan: "📋", perhotelan: "🏨", farmasi: "💊", kesehatan: "🏥", laboratorium: "🔬",
};

function getIcon(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(programIcons)) {
    if (lower.includes(key)) return icon;
  }
  return "🎓";
}

function getProgramImage(program: StudyProgram): string {
  // Sama persis dengan logika di StudyProgramCards (beranda)
  if (program.cover_image && program.cover_image.trim() !== "") {
    return getImageUrl(program.cover_image);
  }
  if (program.image && program.image !== "/placeholder.jpg" && program.image.trim() !== "") {
    return getImageUrl(program.image);
  }

  const lower = (program.name || "").toLowerCase();
  if (lower.includes("otomotif"))
    return "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80";
  if (lower.includes("perangkat lunak") || lower.includes("komputer") || lower.includes("informatika") || lower.includes("program"))
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80";
  if (lower.includes("media") || lower.includes("desain") || lower.includes("komunikasi") || lower.includes("produksi"))
    return "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80";
  if (lower.includes("ritel") || lower.includes("bisnis") || lower.includes("pemasaran"))
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
  if (lower.includes("akuntansi") || lower.includes("pajak") || lower.includes("perpajakan") || lower.includes("keuangan"))
    return "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80";
  if (lower.includes("hotel") || lower.includes("perhotelan") || lower.includes("pariwisata"))
    return "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80";
  if (lower.includes("farmasi") || lower.includes("obat"))
    return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80";
  if (lower.includes("informasi kesehatan") || lower.includes("rekam medis"))
    return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80";
  if (lower.includes("laboratorium") || lower.includes("medis") || lower.includes("analis"))
    return "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80";

  return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80";
}

export default function ProgramCard({ program }: { program: StudyProgram }) {
  return (
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
        style={{ backgroundImage: `url('${getProgramImage(program)}')`, opacity: 0.5, backgroundPosition: program.cover_image_focus || "center" }}
      />
      {/* Permanent dark base so white text is always readable */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, rgba(10, 25, 47, 0.82) 0%, rgba(13, 36, 64, 0.78) 100%)",
        zIndex: 0,
      }} />
      <div className="prodi-card-overlay" />

      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
        <div style={{ flex: 1 }}>
          <h3 className="prodi-title">
            {program.name}
          </h3>

          <div style={{ marginBottom: "12px" }}>
            <span style={{
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.8)",
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
                  fontSize: "0.75rem",
                }}>
                  {program.degree}
                </span>
              )}
              {program.degree && program.accreditation && (
                <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
              )}
              {program.accreditation && (
                <span style={{ fontSize: "0.75rem" }}>
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>Akreditasi : </span>
                  <span style={{ fontWeight: 700, color: "#f0a500" }}>
                    {program.accreditation}
                  </span>
                </span>
              )}
            </span>
          </div>

          {program.description && (
            <p
              className="prodi-description"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: "1.25rem"
              }}
              dangerouslySetInnerHTML={{ __html: program.description.replace(/<[^>]*>?/gm, '') }}
            />
          )}

          {/* Interactive Arrow Call-to-action */}
          <div className="prodi-cta">
            Pelajari Lebih Lanjut
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
  );
}

