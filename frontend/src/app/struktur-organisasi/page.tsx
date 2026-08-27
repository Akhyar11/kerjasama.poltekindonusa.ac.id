import { fetchAPI } from "@/lib/api";
import { Page as PageType } from "@/lib/types";
import Reveal from "@/components/Reveal";
import Image from "next/image";

export const metadata = {
  title: "Struktur Organisasi - Politeknik Indonusa Surakarta",
  description: "Struktur Organisasi Politeknik Indonusa Surakarta",
};

async function getPageData(slug: string): Promise<PageType | null> {
  try {
    return await fetchAPI<PageType>(`/pages/${slug}`);
  } catch {
    return null;
  }
}

export default async function StrukturOrganisasiPage() {
  const strukturPage = await getPageData("struktur-organisasi");

  return (
    <div style={{ position: "relative", overflow: "hidden", paddingBottom: "5rem", background: "var(--background)", minHeight: "100vh" }}>
      
      {/* Decorative Background Orbs */}
      <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(240,165,0,0.08) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }} />

      {/* Hero Header */}
      <section style={{ 
        position: "relative",
        padding: "5rem 1.5rem 2.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        zIndex: 1
      }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", background: "rgba(0,162,232,0.1)", border: "1px solid rgba(0,162,232,0.2)", borderRadius: "20px", marginBottom: "1rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00a2e8", boxShadow: "0 0 8px #00a2e8" }}></span>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00a2e8", letterSpacing: "1px", textTransform: "uppercase" }}>Manajemen & Tata Kelola</span>
          </div>
          <h1 style={{ 
            fontSize: "clamp(2rem, 4vw, 3rem)", 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: "1rem",
            color: "var(--foreground)",
            letterSpacing: "-0.5px"
          }}>
            Struktur <span style={{ 
              background: "linear-gradient(135deg, #00a2e8 0%, #0077b6 100%)", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent" 
            }}>Organisasi</span>
          </h1>
          <p style={{ 
            fontSize: "clamp(1rem, 2vw, 1.1rem)", 
            color: "var(--muted-foreground)", 
            maxWidth: "600px", 
            margin: "0 auto",
            lineHeight: 1.6
          }}>
            Sistem tata kelola dan bagan struktur organisasi Politeknik Indonusa Surakarta dalam mewujudkan pendidikan vokasi yang unggul.
          </p>
        </Reveal>
      </section>

      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
        <Reveal delay={0.1}>
          <div className="glass" style={{ 
            background: "var(--card)", 
            borderRadius: "20px", 
            boxShadow: "0 15px 40px rgba(0,0,0,0.04)",
            border: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative"
          }}>
            {/* Dynamic Accent Line */}
            <div style={{ height: "4px", width: "100%", background: "linear-gradient(90deg, #1a3a5c, #00a2e8, #f0a500)" }} />

            <div style={{ padding: "2.5rem" }}>
              
              {!strukturPage ? (
                <div style={{ padding: "3rem 1.5rem", textAlign: "center", background: "rgba(0,0,0,0.02)", borderRadius: "12px", border: "1px dashed var(--border)" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 1rem", color: "var(--muted-foreground)", opacity: 0.5 }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-heading)" }}>Bagan Belum Tersedia</h3>
                  <p style={{ color: "var(--muted-foreground)", margin: 0, fontSize: "0.95rem" }}>
                    Silakan buat halaman dengan slug "<strong>struktur-organisasi</strong>" di panel admin, lalu unggah gambar (Bagan) atau isi konten teksnya.
                  </p>
                </div>
              ) : (
                <>
                  {/* Tampilkan Gambar Bagan jika admin mengunggahnya */}
                  {strukturPage.image && (
                    <div style={{ marginBottom: "2.5rem", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)", background: "rgba(0,0,0,0.02)" }}>
                      <img 
                        src={strukturPage.image} 
                        alt="Bagan Struktur Organisasi" 
                        style={{ width: "100%", height: "auto", display: "block" }} 
                      />
                    </div>
                  )}

                  {/* Tampilkan Konten Teks jika ada penjelasan tambahan */}
                  {strukturPage.content && (
                    <div 
                      className="prose prose-sm sm:prose-base dark:prose-invert max-w-none wysiwyg-content"
                      style={{ color: "var(--text-main)" }}
                      dangerouslySetInnerHTML={{ __html: strukturPage.content }} 
                    />
                  )}
                  
                  {/* Jika data halaman ada tapi kosong */}
                  {!strukturPage.image && !strukturPage.content && (
                    <p style={{ color: "var(--muted-foreground)", fontStyle: "italic", textAlign: "center", margin: "2rem 0" }}>
                      Halaman struktur-organisasi sudah ada, namun konten (gambar bagan atau teks) masih kosong.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
