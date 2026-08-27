import Link from "next/link";
import { fetchAPI } from "@/lib/api";
import { HomeData, Page as PageType } from "@/lib/types";
import HeroSection from "@/components/HeroSection";
import NewsGrid from "@/components/NewsGrid";
import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";

async function getHomeData(): Promise<HomeData | null> {
  try {
    return await fetchAPI<HomeData>("/home");
  } catch {
    return null;
  }
}

async function getSettings(): Promise<import("@/lib/types").Settings | null> {
  try {
    return await fetchAPI<import("@/lib/types").Settings>("/settings");
  } catch {
    return null;
  }
}

async function getGalleryData(): Promise<PageType | null> {
  try {
    return await fetchAPI<PageType>("/pages/gallery");
  } catch {
    return null;
  }
}

export default async function Home() {
  const data = await getHomeData();
  const settings = await getSettings();
  const galleryPage = await getGalleryData();
  
  // Ambil maksimal 8 foto/video untuk ditampilkan di halaman beranda
  const galleryPreview = galleryPage?.media ? galleryPage.media.slice(0, 8) : [];

  return (
    <>
      <HeroSection sliders={data?.hero_sliders ?? []} />

      <Reveal>
        <NewsGrid news={data?.latest_news ?? []} />
      </Reveal>

      {/* Galery & Prestasi Section */}
      <Reveal>
        <section style={{ padding: "5rem 1.5rem", background: "var(--section-bg)", textAlign: "center" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "var(--foreground)", marginBottom: "1rem" }}>
              Galery & <span style={{ color: "var(--primary)" }}>Prestasi</span>
            </h2>
            <p style={{ color: "var(--muted-foreground)", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem" }}>
              Kumpulan dokumentasi kegiatan dan berbagai pencapaian membanggakan dari civitas akademika.
            </p>
            
            {galleryPreview.length === 0 ? (
              <div style={{ 
                padding: "4rem", 
                border: "2px dashed var(--border)", 
                borderRadius: "16px", 
                color: "var(--muted-foreground)",
                background: "rgba(0,0,0,0.02)"
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 1rem", opacity: 0.5 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <p>Belum ada foto atau video. Tambahkan media di halaman "gallery" via Admin Panel.</p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: "left" }}>
                  <GalleryGrid mediaItems={galleryPreview} />
                </div>
                
                {/* Tombol Lihat Semua Gallery */}
                <div style={{ marginTop: "3rem" }}>
                  <Link 
                    href="/gallery"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.8rem 2rem",
                      background: "var(--primary)",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: "30px",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(0, 162, 232, 0.3)"
                    }}
                  >
                    Lihat Semua Gallery
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </Reveal>
    </>
  );
}
