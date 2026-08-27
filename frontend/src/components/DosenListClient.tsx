"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/api";
import Reveal from "./Reveal";

export interface Dosen {
  nidn: string;
  nama: string;
  foto: string | null;
  keahlian: string | null;
  publikasi: string | null;
  prodi_homebase: string | null;
  pasfoto_focus?: string | null;
  prodi_id?: number | null;
  email?: string | null;
}

export interface ProgdiGroup {
  id: number;
  nama: string;
  total_dosen?: number;
}

const UserIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const AcademicCapIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
);

// Study Programs List as requested by the user
const STUDY_PROGRAMS = [
  { dbName: "Teknologi Rekayasa Perangkat Lunak", displayName: "D4 Teknologi Rekayasa Perangkat Lunak", category: "D4", iconColor: "#60a5fa" },
  { dbName: "Teknologi Rekayasa Otomotif", displayName: "D4 Teknologi Rekayasa Otomotif", category: "D4", iconColor: "#ef4444" },
  { dbName: "Produksi Media", displayName: "D4 Produksi Media", category: "D4", iconColor: "#c084fc" },
  { dbName: "Bisnis Manajemen Ritel", displayName: "D4 Bisnis Manajemen Ritel", category: "D4", iconColor: "#34d399" },
  { dbName: "Akuntansi Perpajakan", displayName: "D4 Akuntansi Perpajakan", category: "D4", iconColor: "#818cf8" },
  { dbName: "Manajemen Informasi Kesehatan", displayName: "D4 Manajemen Informasi Kesehatan", category: "D4", iconColor: "#60a5fa" },
  { dbName: "Teknologi Laboratorium Medis", displayName: "D4 Teknologi Laboratorium Medis", category: "D4", iconColor: "#94a3b8" },
  { dbName: "Perhotelan", displayName: "D3 Perhotelan", category: "D3", iconColor: "#fbbf24" },
  { dbName: "Farmasi", displayName: "D3 Farmasi", category: "D3", iconColor: "#2dd4bf" },
  { dbName: "Kebidanan", displayName: "D3 Kebidanan", category: "D3", iconColor: "#fb7185" },
  { dbName: "Informatika", displayName: "S1 Informatika", category: "S1", iconColor: "#14b8a6" },
  { dbName: "PGSD", displayName: "S1 PGSD", category: "S1", iconColor: "#eab308" },
  { dbName: "Fisioterapi", displayName: "S1 Fisioterapi", category: "S1", iconColor: "#a78bfa" },
  { dbName: "Kesehatan Lingkungan", displayName: "S1 Kesehatan Lingkungan", category: "S1", iconColor: "#34d399" },
  { dbName: "Psikologi", displayName: "S1 Psikologi", category: "S1", iconColor: "#f472b6" },
  { dbName: "Hukum", displayName: "S1 Hukum", category: "S1", iconColor: "#f87171" },
  { dbName: "Manajemen", displayName: "S1 Manajemen", category: "S1", iconColor: "#3b82f6" }
];

const getProdiIcon = (dbName: string) => {
  const code = dbName.toLowerCase();
  if (code.includes("perangkat lunak") || code.includes("informatika")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "24px", height: "24px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    );
  }
  if (code.includes("otomotif")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "24px", height: "24px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0-.255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.936 6.936 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    );
  }
  if (code.includes("produksi media")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "24px", height: "24px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    );
  }
  if (code.includes("ritel") || code.includes("akuntansi") || code.includes("manajemen")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "24px", height: "24px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 0 1 3.75 18.25v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.453.25-.718.25H4.875a1.125 1.125 0 0 1-.718-.25m16.5 0a9 9 0 0 0-16.5 0m0 0a2.18 2.18 0 0 1-.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.114 48.114 0 0 1 3.413-.387m0 0a19.003 19.003 0 0 1 7.18 0m-7.18 0V4.625c0-.621.504-1.125 1.125-1.125h4.125c.621 0 1.125.504 1.125 1.125v1.5" />
      </svg>
    );
  }
  if (code.includes("kesehatan") || code.includes("laboratorium") || code.includes("farmasi") || code.includes("kebidanan") || code.includes("fisioterapi") || code.includes("lingkungan")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "24px", height: "24px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    );
  }
  if (code.includes("perhotelan")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "24px", height: "24px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    );
  }
  if (code.includes("pgsd")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "24px", height: "24px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    );
  }
  if (code.includes("psikologi")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "24px", height: "24px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    );
  }
  if (code.includes("hukum")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "24px", height: "24px" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18 4 4m-4-4L8 7m4 14 4-4m-4 4-4-4m12 0H4" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "24px", height: "24px" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  );
};

// Robust homebase matcher
const matchHomebase = (dosen: Dosen, prodiDbName: string, prodiId?: number) => {
  if (prodiId && dosen.prodi_id && dosen.prodi_id === prodiId) {
    return true;
  }
  if (!dosen.prodi_homebase) return false;
  
  const clean = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "") // strip all non-alphanumeric first
      .replace(/^(d4|d3|d2|s1|s2)/g, ""); // strip level prefix from the start of the alphanumeric string
  };
  
  return clean(dosen.prodi_homebase) === clean(prodiDbName);
};

export default function DosenListClient({
  dosens,
  progdiGroups = [],
}: {
  dosens: Dosen[];
  progdiGroups?: ProgdiGroup[];
}) {
  type ProgramType = {
    id?: number;
    dbName: string;
    displayName: string;
    category: string;
    iconColor: string;
    customCount?: number;
  };

  const activePrograms = useMemo<ProgramType[]>(() => {
    if (progdiGroups && progdiGroups.length > 0) {
      return progdiGroups.map((group) => {
        const name = group.nama;
        let category = "Akademik";
        let iconColor = "#60a5fa";
        const upper = name.toUpperCase();

        if (upper.includes("D3") || upper.startsWith("D3")) {
          category = "D3";
          iconColor = "#fbbf24";
        } else if (upper.includes("D4") || upper.startsWith("D4")) {
          category = "D4";
          iconColor = "#60a5fa";
        } else if (upper.includes("S1") || upper.startsWith("S1")) {
          category = "S1";
          iconColor = "#34d399";
        }

        return {
          id: group.id,
          dbName: group.nama,
          displayName: group.nama,
          category,
          iconColor,
          customCount: group.total_dosen,
        };
      });
    }
    return STUDY_PROGRAMS.map((p) => ({ ...p, id: undefined, customCount: undefined }));
  }, [progdiGroups]);

  const [selectedProdi, setSelectedProdi] = useState<ProgramType | null>(null);
  const [search, setSearch] = useState("");

  // Calculate dynamic lecturer count for each program
  const prodiCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    activePrograms.forEach((program) => {
      if (typeof program.customCount === "number" && program.customCount > 0) {
        counts[program.dbName] = program.customCount;
      } else {
        counts[program.dbName] = dosens.filter((dosen) => 
          matchHomebase(dosen, program.dbName, program.id)
        ).length;
      }
    });
    return counts;
  }, [dosens, activePrograms]);

  // Filtered lecturers belonging to the selected program
  const filteredDosens = useMemo(() => {
    if (!selectedProdi) return [];

    return dosens.filter((dosen) => {
      // Must match active program
      if (!matchHomebase(dosen, selectedProdi.dbName, selectedProdi.id)) {
        return false;
      }

      // Search input matching
      const searchLower = search.toLowerCase();
      const namaMatch = (dosen.nama || "").toLowerCase().includes(searchLower);
      const nidnMatch = (dosen.nidn || "").toLowerCase().includes(searchLower);
      const keahlianMatch = (dosen.keahlian || "").toLowerCase().includes(searchLower);

      return namaMatch || nidnMatch || keahlianMatch;
    });
  }, [dosens, selectedProdi, search]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Program Studi Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
        {activePrograms.map((program) => {
          const isActive = selectedProdi?.dbName === program.dbName;
          const count = prodiCounts[program.dbName] || 0;
          
          let badgeBg = "rgba(96, 165, 250, 0.1)";
          let badgeColor = "#60a5fa";
          if (program.category === "D3") {
            badgeBg = "rgba(251, 191, 36, 0.1)";
            badgeColor = "#fbbf24";
          } else if (program.category === "S1") {
            badgeBg = "rgba(52, 211, 153, 0.1)";
            badgeColor = "#34d399";
          }

          return (
            <div
              key={program.dbName}
              onClick={() => {
                setSelectedProdi(program);
                setSearch(""); // Reset search on changing prodi
                setTimeout(() => {
                  const el = document.getElementById("lecturer-section");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }, 100);
              }}
              style={{
                background: isActive ? "linear-gradient(135deg, rgba(26,58,92,0.18) 0%, rgba(30,136,229,0.15) 100%)" : "var(--card)",
                border: isActive ? "2px solid var(--accent-dark)" : "1px solid var(--border)",
                borderRadius: "20px",
                padding: "1.5rem",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isActive ? "0 12px 30px rgba(240, 165, 0, 0.15)" : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "180px",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = "var(--accent-dark)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {isActive && (
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "60px",
                  height: "60px",
                  background: "rgba(240, 165, 0, 0.1)",
                  filter: "blur(20px)",
                  borderRadius: "50%"
                }} />
              )}
              
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <div style={{
                    color: isActive ? "var(--accent-dark)" : program.iconColor,
                    background: isActive ? "rgba(240, 165, 0, 0.1)" : "rgba(255, 255, 255, 0.05)",
                    padding: "8px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {getProdiIcon(program.dbName)}
                  </div>
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: badgeBg,
                    color: badgeColor,
                    textTransform: "uppercase"
                  }}>
                    {program.category}
                  </span>
                </div>

                <h4 style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--text-heading)",
                  lineHeight: 1.4,
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {program.displayName}
                </h4>
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid var(--border)",
                paddingTop: "0.75rem",
                marginTop: "auto"
              }}>
                <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                  Jumlah Pengajar
                </span>
                <span style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--text-heading)",
                  background: "rgba(26,58,92,0.06)",
                  padding: "2px 8px",
                  borderRadius: "6px"
                }}>
                  {count} Dosen
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lecturer Section */}
      {!selectedProdi ? (
        <Reveal animation="fadeIn">
          <div style={{
            textAlign: "center",
            padding: "5rem 2rem",
            background: "rgba(26,58,92,0.01)",
            borderRadius: "24px",
            border: "1px dashed var(--border)",
            marginTop: "1rem"
          }}>
            <div style={{
              background: "rgba(240, 165, 0, 0.06)",
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              color: "var(--accent-dark)"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "32px", height: "32px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "0.5rem" }}>
              Pilih Program Studi
            </h3>
            <p style={{ color: "var(--muted-foreground)", maxWidth: "450px", margin: "0 auto", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Silakan klik salah satu kartu program studi di atas untuk melihat daftar dosen pengajar yang berada di homebase tersebut.
            </p>
          </div>
        </Reveal>
      ) : (
        <div id="lecturer-section" style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem", marginTop: "2rem" }}>
          {/* Section Header */}
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-dark)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                <span>Daftar Pengajar</span>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent-dark)" }}></span>
                <span>{selectedProdi.displayName}</span>
              </div>
              <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>
                Dosen {selectedProdi.displayName.replace(/^(D4|D3|S1)\s+/i, "")}
              </h3>
            </div>

            {/* Search Bar */}
            <div style={{ position: "relative", width: "100%", maxWidth: "380px" }}>
              <input
                type="text"
                placeholder="Cari dosen berdasarkan nama, NIDN, atau keahlian..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 46px",
                  borderRadius: "14px",
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  color: "var(--foreground)",
                  outline: "none",
                  fontSize: "0.9rem",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-dark)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(240, 165, 0, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {/* Grid of Lecturers */}
          {filteredDosens.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
              {filteredDosens.map((dosen, i) => (
                <Reveal key={dosen.nidn} delay={i * 0.05} animation="fadeInUp">
                  <Link href={`/biodata-dosen/${dosen.nidn}`} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        background: "var(--card)",
                        borderRadius: "24px",
                        border: "1px solid var(--border)",
                        overflow: "hidden",
                        height: "100%",
                        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)";
                        const title = e.currentTarget.querySelector(".dosen-name") as HTMLElement;
                        if (title) title.style.color = "var(--accent-dark)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                        const title = e.currentTarget.querySelector(".dosen-name") as HTMLElement;
                        if (title) title.style.color = "var(--text-heading)";
                      }}
                    >
                      {/* Photo container */}
                      <div style={{ position: "relative", height: "280px", width: "100%", background: "var(--muted)", overflow: "hidden" }}>
                        {dosen.foto ? (
                          dosen.foto.startsWith("http") ? (
                            <img
                              src={dosen.foto}
                              alt={dosen.nama}
                              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: dosen.pasfoto_focus || "center", transition: "transform 0.5s ease" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                            />
                          ) : (
                            <Image
                              src={getImageUrl(dosen.foto)}
                              alt={dosen.nama}
                              fill
                              sizes="(max-width: 600px) 100vw, 300px"
                              style={{ objectFit: "cover", objectPosition: dosen.pasfoto_focus || "center", transition: "transform 0.5s ease" }}
                              className="dosen-img-hover"
                            />
                          )
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--muted-foreground)", opacity: 0.5 }}>
                            <UserIcon style={{ width: "80px", height: "80px" }} />
                          </div>
                        )}
                      </div>

                      {/* Content info */}
                      <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <h3
                          className="dosen-name"
                          style={{
                            fontSize: "1.15rem",
                            fontWeight: 700,
                            color: "var(--text-heading)",
                            lineHeight: 1.35,
                            marginBottom: "6px",
                            transition: "color 0.3s",
                          }}
                        >
                          {dosen.nama}
                        </h3>
                        <div style={{ display: "inline-block", alignSelf: "flex-start", padding: "3px 10px", borderRadius: "6px", background: "rgba(26,58,92,0.06)", color: "var(--muted-foreground)", fontSize: "0.78rem", fontWeight: 600, marginBottom: "1.25rem" }}>
                          NIDN: {dosen.nidn}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", flexGrow: 1 }}>
                          {/* Keahlian */}
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-dark)", marginBottom: "4px" }}>
                              <AcademicCapIcon style={{ width: "16px", height: "16px" }} />
                              Keahlian
                            </div>
                            <p style={{ fontSize: "0.88rem", color: "var(--text-main)", lineHeight: 1.5, margin: 0 }}>
                              {dosen.keahlian || "-"}
                            </p>
                          </div>

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
                <p>
                  {search 
                    ? "Tidak ada data dosen yang cocok dengan pencarian Anda." 
                    : "Belum ada dosen yang terdaftar di program studi ini."}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      )}
    </div>
  );
}

