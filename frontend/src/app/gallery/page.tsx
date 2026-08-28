import { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { Page as PageType } from "@/lib/types";
import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";
import HeroSection from "@/components/HeroSection";
import { HeroSlider } from "@/lib/types";

export const metadata: Metadata = {
  title: "Gallery | Politeknik Indonusa Surakarta",
  description: "Dokumentasi kegiatan dan prestasi Politeknik Indonusa Surakarta",
};

async function getGalleryPage(): Promise<PageType | null> {
  try {
    return await fetchAPI<PageType>("/pages/gallery");
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

export default async function GalleryPage() {
  const [galleryPage, sliders] = await Promise.all([
    getGalleryPage(),
    getHeroSliders(),
  ]);
  
  // Ambil data media dari halaman (jika ada), jika tidak ada berikan array kosong
  const mediaItems = galleryPage?.media || [];

  return (
    <div style={{ position: "relative", overflow: "hidden", paddingBottom: "5rem", background: "var(--background)", minHeight: "100vh" }}>
      
      {/* Decorative Background Orbs */}
      <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(240,165,0,0.08) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }} />

      {/* Hero Header */}
      <HeroSection sliders={sliders} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
        {!galleryPage ? (
          <Reveal>
            <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--card)", borderRadius: "24px", border: "1px solid var(--border)", boxShadow: "0 15px 40px rgba(0,0,0,0.04)" }}>
              <div style={{ 
                width: "64px", height: "64px", borderRadius: "16px", margin: "0 auto 1.5rem",
                background: "rgba(240,165,0,0.08)", color: "var(--accent-dark)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-heading)" }}>
                Halaman Gallery Belum Tersedia
              </h3>
              <p style={{ color: "var(--muted-foreground)", margin: "0 auto 1.5rem", fontSize: "0.95rem", maxWidth: "500px" }}>
                Silakan buat halaman dengan slug <strong>"gallery"</strong> di panel admin (Pages), lalu unggah foto dan video di bagian <strong>Media/Gallery</strong>.
              </p>
            </div>
          </Reveal>
        ) : mediaItems.length === 0 ? (
          <Reveal>
            <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--card)", borderRadius: "24px", border: "1px dashed var(--border)" }}>
              <p style={{ color: "var(--muted-foreground)" }}>Halaman gallery sudah ada, namun belum ada media yang diunggah.</p>
            </div>
          </Reveal>
        ) : (
          <GalleryGrid mediaItems={mediaItems} />
        )}
      </div>
    </div>
  );
}
