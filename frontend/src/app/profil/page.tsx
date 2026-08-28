import { fetchAPI } from "@/lib/api";
import { Page as PageType } from "@/lib/types";
import Reveal from "@/components/Reveal";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import { HeroSlider } from "@/lib/types";
export const metadata = {
  title: "Profil & Sejarah - Politeknik Indonusa Surakarta",
  description: "Visi, Misi, dan Sejarah Politeknik Indonusa Surakarta",
};

async function getPageData(slug: string): Promise<PageType | null> {
  try {
    return await fetchAPI<PageType>(`/pages/${slug}`);
  } catch {
    return null;
  }
}

async function getHeroSliders(): Promise<HeroSlider[]> {
  try {
    return await fetchAPI<HeroSlider[]>("/hero-sliders");
  } catch {
    return [];
  }
}

export default async function ProfilPage() {
  const [visi, misi, sejarah, sliders] = await Promise.all([
    getPageData("visi"),
    getPageData("misi"),
    getPageData("sejarah"),
    getHeroSliders(),
  ]);

  return (
    <div style={{ position: "relative", overflow: "hidden", paddingBottom: "5rem", background: "var(--background)" }}>
      {/* Inline styles for hover effects in Server Component */}
      <style>{`
        .visi-hover { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .visi-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0, 162, 232, 0.12); }
        .misi-hover { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .misi-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(240, 165, 0, 0.12); }
      `}</style>
      
      {/* Decorative Background Orbs */}
      <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", right: "-10%", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(240,165,0,0.08) 0%, transparent 70%)", filter: "blur(50px)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "10%", width: "60%", height: "40%", background: "radial-gradient(circle, rgba(26,58,92,0.08) 0%, transparent 70%)", filter: "blur(80px)", zIndex: 0, pointerEvents: "none" }} />

      {/* Hero Header */}
      <HeroSection sliders={sliders} />

      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
        
        {/* Visi & Misi Section */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "1.5rem",
          marginBottom: "3rem"
        }}>
          {/* Visi */}
          <Reveal delay={0.1}>
            <div className="glass visi-hover" style={{ 
              borderRadius: "16px", 
              padding: "2rem", 
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: "100px", height: "100px", background: "linear-gradient(135deg, rgba(0,162,232,0.1), transparent)", borderBottomLeftRadius: "100%" }} />
              
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ 
                  width: "48px", height: "48px", borderRadius: "14px", 
                  background: "linear-gradient(135deg, #00a2e8, #0077b6)", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 6px 12px rgba(0,162,232,0.25)"
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12A10 10 0 0 0 15 21.54A10 10 0 0 1 15 2.46A10 10 0 0 0 2 12Z"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0, color: "var(--foreground)", letterSpacing: "-0.5px" }}>Visi</h2>
              </div>
              
              {visi?.content ? (
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none wysiwyg-content"
                  style={{ color: "var(--text-main)" }}
                  dangerouslySetInnerHTML={{ __html: visi.content }} 
                />
              ) : (
                <p style={{ color: "var(--muted-foreground)", fontStyle: "italic", fontSize: "0.95rem" }}>
                  Data Visi belum tersedia. Silakan atur halaman "visi" di panel admin.
                </p>
              )}
            </div>
          </Reveal>

          {/* Misi */}
          <Reveal delay={0.2}>
            <div className="glass misi-hover" style={{ 
              borderRadius: "16px", 
              padding: "2rem", 
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: "100px", height: "100px", background: "linear-gradient(135deg, rgba(240,165,0,0.1), transparent)", borderBottomLeftRadius: "100%" }} />
              
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ 
                  width: "48px", height: "48px", borderRadius: "14px", 
                  background: "linear-gradient(135deg, #f0a500, #c08400)", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 6px 12px rgba(240,165,0,0.25)"
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0, color: "var(--foreground)", letterSpacing: "-0.5px" }}>Misi</h2>
              </div>
              
              {misi?.content ? (
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none wysiwyg-content"
                  style={{ color: "var(--text-main)" }}
                  dangerouslySetInnerHTML={{ __html: misi.content }} 
                />
              ) : (
                <p style={{ color: "var(--muted-foreground)", fontStyle: "italic", fontSize: "0.95rem" }}>
                  Data Misi belum tersedia. Silakan atur halaman "misi" di panel admin.
                </p>
              )}
            </div>
          </Reveal>
        </div>

        {/* Sejarah Section */}
        <Reveal delay={0.3}>
          <div style={{ 
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
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: sejarah?.image ? "1.2fr 1fr" : "1fr",
              gap: 0
            }}>
              
              <div style={{ padding: "2.5rem 2.5rem 3rem", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ 
                    width: "44px", height: "44px", borderRadius: "12px", 
                    background: "rgba(26,58,92,0.06)", color: "var(--primary)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-heading)", margin: 0, letterSpacing: "-0.5px" }}>
                    Sejarah Singkat
                  </h2>
                </div>
                
                {sejarah?.content ? (
                  <div 
                    className="prose prose-sm dark:prose-invert max-w-none wysiwyg-content"
                    style={{ color: "var(--text-main)" }}
                    dangerouslySetInnerHTML={{ __html: sejarah.content }} 
                  />
                ) : (
                  <div style={{ padding: "1.5rem", background: "rgba(0,0,0,0.02)", borderRadius: "12px", border: "1px dashed var(--border)" }}>
                    <p style={{ color: "var(--muted-foreground)", fontStyle: "italic", margin: 0, fontSize: "0.95rem" }}>
                      Konten Sejarah belum ditambahkan. Silakan buat halaman dengan slug "sejarah" beserta gambarnya di panel admin.
                    </p>
                  </div>
                )}
              </div>
              
              {sejarah?.image && (
                <div style={{ position: "relative", width: "100%", minHeight: "300px" }}>
                  <div style={{ 
                    position: "absolute", top: 0, left: 0, bottom: 0, right: 0, 
                    backgroundImage: `url(${sejarah.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }} />
                  {/* Gradient mask for smooth blending on desktop */}
                  <div style={{ 
                    position: "absolute", top: 0, left: 0, bottom: 0, width: "100px",
                    background: "linear-gradient(to right, var(--card) 0%, transparent 100%)",
                    display: "block"
                  }} className="max-lg:hidden" />
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
