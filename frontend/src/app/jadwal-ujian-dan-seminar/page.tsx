import Link from "next/link";

export const metadata = {
  title: "Pengumuman Jadwal Ujian & Seminar | Politeknik Indonusa Surakarta",
  description: "Informasi perpindahan pengumuman jadwal ujian dan seminar mahasiswa Politeknik Indonusa Surakarta ke portal SIAKAD.",
};

export default function JadwalUjianDanSeminarRedirection() {
  return (
    <div style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1.5rem" }}>
      <div style={{ 
        maxWidth: "680px", 
        width: "100%",
        background: "var(--card)", 
        borderRadius: "24px", 
        border: "1px solid var(--border)", 
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        position: "relative"
      }}>
        {/* Decorative Top Accent Bar */}
        <div style={{ 
          height: "8px", 
          background: "linear-gradient(90deg, #1a3a5c 0%, #f0a500 50%, #2a5a8c 100%)" 
        }} />

        <div style={{ padding: "3.5rem 2.5rem 3rem", textAlign: "center" }}>
          {/* Animated/Glowing Icon Container */}
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            justifyContent: "center", 
            width: "90px", 
            height: "90px", 
            borderRadius: "50%", 
            background: "rgba(240, 165, 0, 0.08)", 
            color: "#f0a500", 
            fontSize: "2.5rem", 
            marginBottom: "2rem",
            position: "relative",
            boxShadow: "0 0 30px rgba(240, 165, 0, 0.1)",
          }}>
            {/* Pulsing indicator */}
            <span style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "2px solid rgba(240, 165, 0, 0.3)"
            }} className="animate-ping" />
            📢
          </div>

          {/* Badge */}
          <div style={{ 
            display: "inline-block", 
            padding: "6px 16px", 
            borderRadius: "99px", 
            background: "rgba(26, 58, 92, 0.06)", 
            color: "var(--primary-light)", 
            fontSize: "0.78rem", 
            fontWeight: 800, 
            letterSpacing: "1px", 
            textTransform: "uppercase", 
            marginBottom: "1.25rem" 
          }}>
            Pengumuman Akademik
          </div>

          {/* Title */}
          <h1 style={{ 
            fontSize: "clamp(1.75rem, 4.5vw, 2.25rem)", 
            fontWeight: 900, 
            color: "var(--text-heading)", 
            lineHeight: 1.25, 
            marginBottom: "1rem",
            letterSpacing: "-0.5px"
          }}>
            Jadwal Ujian & Seminar Dialihkan
          </h1>

          {/* Divider */}
          <div style={{ 
            width: "50px", 
            height: "3px", 
            background: "#f0a500", 
            margin: "0 auto 1.5rem", 
            borderRadius: "99px" 
          }} />

          {/* Message Content */}
          <p style={{ 
            color: "var(--text-main)", 
            fontSize: "1.05rem", 
            lineHeight: 1.7, 
            marginBottom: "2.5rem" 
          }}>
            Halaman ini sedang dalam pemeliharaan dan peningkatan sistem. 
            Untuk mempermudah akses dan integrasi data, seluruh pengumuman dan rincian 
            <strong> Jadwal Ujian Pendadaran serta Seminar Proposal</strong> mahasiswa Politeknik Indonusa Surakarta kini telah dialihkan sepenuhnya ke website portal <strong>SIAKAD</strong>.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <a 
              href="https://siakadv2.poltekindonusa.ac.id/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "1.1rem 2.5rem",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #1a3a5c 0%, #0d2440 100%)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 10px 25px rgba(13, 36, 64, 0.25)",
                width: "100%",
                maxWidth: "340px",
                transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)"
              }}
              className="prodi-more-btn"
            >
              Buka Portal SIAKAD
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            <Link 
              href="/" 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--muted-foreground)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                padding: "0.75rem 1.5rem",
                transition: "color 0.2s ease"
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
    </div>
    </div>
  );
}
