"use client";

import Link from "next/link";
import { News } from "@/lib/types";
import { getImageUrl, formatDate } from "@/lib/api";
import Reveal from "@/components/Reveal";
import Image from "next/image";

interface Props {
  news: News[];
}

export default function NewsGrid({ news }: Props) {
  const displayNews = news.length > 0 ? news : fallbackNews;

  return (
    <section
      id="news-section"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--background)",
        position: "relative",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "700px", margin: "0 auto 4rem" }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "8px",
            background: "rgba(240, 165, 0, 0.1)",
            color: "var(--accent-dark)",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Portal Berita
        </div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 800,
            color: "var(--text-heading)",
            lineHeight: 1.2,
            marginBottom: "1rem",
            letterSpacing: "-0.5px",
          }}
        >
          Berita <span style={{ color: "var(--accent-dark)" }}>Terkini</span>
        </h2>
        <p style={{ color: "var(--muted-foreground)", fontSize: "1.05rem", lineHeight: 1.7 }}>
          Informasi dan kegiatan terbaru seputar Politeknik Indonusa Surakarta
        </p>
      </div>

      {/* News grid */}
      <div
        className="news-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "2rem",
        }}
      >
        <style>{`
          @media (min-width: 1024px) {
            .news-item-4 {
              display: none !important;
            }
          }
        `}</style>
        {displayNews.slice(0, 4).map((item, index) => (
          <div key={item.id} className={index === 3 ? "news-item-4" : ""}>
            <Reveal delay={index * 0.1}>
              <Link
              href={`/berita/${item.slug}`}
              style={{
                display: "block",
                borderRadius: "20px",
                overflow: "hidden",
                textDecoration: "none",
                background: "var(--card)",
                border: "1px solid var(--border)",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 25px 60px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Image */}
            <div
              style={{
                position: "relative",
                paddingTop: "56%",
                background: `linear-gradient(135deg, #1a3a5c, #2a5a8c)`,
                overflow: "hidden",
              }}
            >
              {item.image && (
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />
              )}
              {/* Category badge */}
              {item.category && (
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    padding: "4px 14px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #f0a500, #ffc940)",
                    color: "#0d2440",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    boxShadow: "0 2px 8px rgba(240,165,0,0.3)",
                  }}
                >
                  {item.category.name}
                </div>
              )}
              {/* Date badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  padding: "4px 12px",
                  borderRadius: "8px",
                  background: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                }}
              >
                {formatDate(item.published_at || item.created_at, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--text-heading)",
                  lineHeight: 1.4,
                  marginBottom: "0.75rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.title}
              </h3>
              {item.content && (
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-main)",
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.content.replace(/<[^>]*>/g, "").substring(0, 150)}
                </p>
              )}
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--accent-dark)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                Baca selengkapnya
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 3l3 4-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
            </Reveal>
          </div>
        ))}
      </div>

      {/* View all button */}
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Link
          href="/berita"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 36px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #1a3a5c, #2a5a8c)",
            color: "white",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(26, 58, 92, 0.25)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(26, 58, 92, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(26, 58, 92, 0.25)";
          }}
        >
          Lihat Semua Berita
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

const fallbackNews: News[] = [
  {
    id: 1,
    news_category_id: 1,
    title: "Politeknik Indonusa Surakarta Raih Akreditasi Unggul",
    slug: "politeknik-indonusa-raih-akreditasi-unggul",
    content: "Politeknik Indonusa Surakarta berhasil meraih akreditasi unggul dari BAN-PT untuk beberapa program studi unggulan...",
    image: null,
    is_published: true,
    published_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 1, name: "Akademik", slug: "akademik" },
  },
  {
    id: 2,
    news_category_id: 2,
    title: "Wisuda Angkatan 2025: Mencetak Generasi Unggul dan Siap Kerja",
    slug: "wisuda-angkatan-2025",
    content: "Politeknik Indonusa Surakarta menggelar wisuda untuk angkatan 2025 dengan total 500 lulusan dari 9 program studi...",
    image: null,
    is_published: true,
    published_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 2, name: "Kegiatan", slug: "kegiatan" },
  },
  {
    id: 3,
    news_category_id: 3,
    title: "Kerjasama Industri: Polinus Gandeng 50 Perusahaan Nasional",
    slug: "kerjasama-industri-polinus",
    content: "Dalam upaya meningkatkan kualitas lulusan, Politeknik Indonusa Surakarta menjalin kerjasama dengan 50 perusahaan...",
    image: null,
    is_published: true,
    published_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 3, name: "Kerjasama", slug: "kerjasama" },
  },
  {
    id: 4,
    news_category_id: 1,
    title: "Pendaftaran Mahasiswa Baru Gelombang 2 Telah Dibuka",
    slug: "pendaftaran-mahasiswa-baru-gelombang-2",
    content: "Politeknik Indonusa Surakarta resmi membuka pendaftaran mahasiswa baru gelombang kedua. Segera daftarkan diri Anda...",
    image: null,
    is_published: true,
    published_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 1, name: "Akademik", slug: "akademik" },
  },
];
