import { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { News, PaginatedResponse } from "@/lib/types";
import NewsSearch from "@/components/NewsSearch";

export const metadata: Metadata = {
  title: "Berita | Politeknik Indonusa Surakarta",
  description: "Portal berita dan informasi terkini seputar Politeknik Indonusa Surakarta",
};

async function getNews(): Promise<PaginatedResponse<News> | null> {
  try {
    return await fetchAPI<PaginatedResponse<News>>("/news?per_page=all");
  } catch {
    return null;
  }
}

export default async function BeritaPage() {
  const newsData = await getNews();
  const newsList = newsData?.data ?? (Array.isArray(newsData) ? newsData : []);

  return (
    <div>
      {/* Header */}
      <section style={{ padding: "4rem 1.5rem 6rem", background: "linear-gradient(135deg, #0d2440, #1a3a5c)", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: "8px", background: "rgba(240,165,0,0.15)", color: "#ffc940", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>Portal Berita</div>
        <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, color: "white", marginBottom: "0.5rem", letterSpacing: "-1px" }}>Berita & Informasi</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem" }}>Ikuti perkembangan terbaru dan informasi resmi dari kampus kami</p>
      </section>

      <NewsSearch initialNews={newsList} />
    </div>
  );
}
