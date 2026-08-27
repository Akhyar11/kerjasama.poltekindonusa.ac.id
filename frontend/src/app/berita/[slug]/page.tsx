import { fetchAPI, getImageUrl, formatDate } from "@/lib/api";
import { News } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<News | null> {
  try {
    return await fetchAPI<News>(`/news/${slug}`);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  // Gunakan meta_title jika ada, fallback ke title
  const title = article?.meta_title || article?.title;
  // Gunakan meta_description jika ada, fallback ke excerpt dari content
  const description =
    article?.meta_description ||
    article?.content?.replace(/<[^>]*>/g, "").substring(0, 160) ||
    "";
  // Gunakan meta_keywords jika ada, fallback ke tags
  const keywords = article?.meta_keywords || article?.tags || "";

  return {
    title: title ? `${title} | Politeknik Indonusa Surakarta` : "Berita",
    description,
    keywords,
    openGraph: {
      title: title || "Berita",
      description,
      images: article?.image ? [getImageUrl(article.image)] : [],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const tagList = article.tags
    ? article.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div>
      {/* Header */}
      <section style={{ padding: "3rem 1.5rem 4rem", background: "linear-gradient(135deg, #0d2440, #1a3a5c)", textAlign: "center" }}>
        {article.category && (
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "8px", background: "rgba(240,165,0,0.15)", color: "#ffc940", fontSize: "0.75rem", fontWeight: 600, marginBottom: "1rem" }}>
            {article.category.name}
          </div>
        )}
        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "white", maxWidth: "800px", margin: "0 auto 1rem", lineHeight: 1.3 }}>
          {article.title}
        </h1>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
          {formatDate(article.published_at || article.created_at, { day: "numeric", month: "long", year: "numeric" })}
        </div>

        {/* Tags di header */}
        {tagList.length > 0 && (
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginTop: "1.2rem" }}>
            {tagList.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                style={{ padding: "3px 12px", borderRadius: "9999px", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", border: "1px solid rgba(255,255,255,0.15)", textDecoration: "none" }}
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Content */}
      <section style={{ padding: "3rem 1.5rem", background: "var(--card)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {article.image && (
            <div style={{ borderRadius: "20px", overflow: "hidden", marginBottom: "2rem", position: "relative", aspectRatio: "16/9" }}>
              <Image
                src={getImageUrl(article.image)}
                alt={article.title}
                fill
                sizes="(max-width: 800px) 100vw, 800px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          {/* Additional Images (Horizontal Row) */}
          {article.images && article.images.length > 0 && (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: "1rem", 
              marginBottom: "2rem" 
            }}>
              {article.images.slice(0, 3).map((img) => (
                <div 
                  key={img.id} 
                  style={{ 
                    position: "relative", 
                    aspectRatio: "16/9", 
                    borderRadius: "12px", 
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    border: "1px solid var(--border)"
                  }}
                >
                  <Image
                    src={getImageUrl(img.image_path)}
                    alt={`${article.title} - Galeri`}
                    fill
                    sizes="(max-width: 800px) 33vw, 250px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          )}
          <div
            className="wysiwyg-content"
            style={{ fontSize: "1.05rem", color: "var(--foreground)", lineHeight: 1.9 }}
            dangerouslySetInnerHTML={{ __html: article.content || "" }}
          />

          {/* Tags di bawah konten */}
          {tagList.length > 0 && (
            <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
              <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Tags:
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {tagList.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    style={{ padding: "4px 14px", borderRadius: "9999px", background: "rgba(240,165,0,0.1)", color: "var(--accent-dark)", fontSize: "0.8rem", border: "1px solid rgba(240,165,0,0.2)", fontWeight: 500, textDecoration: "none" }}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            <Link href="/berita" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--foreground)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kembali ke Berita
            </Link>
          </div>
        </div>
      </section>

      {/* Berita Terkait */}
      {article.related_news && article.related_news.length > 0 && (
        <section style={{ padding: "3rem 1.5rem", background: "var(--section-bg)" }}>
          <style>{`
            .related-news-card {
              display: block;
              border-radius: 16px;
              overflow: hidden;
              text-decoration: none;
              background: var(--card);
              border: 1px solid var(--border);
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .related-news-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
            }
          `}</style>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "2rem" }}>
              Berita <span style={{ color: "var(--accent-dark)" }}>Terkait</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {article.related_news.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="related-news-card"
                >
                  {item.image && (
                    <div style={{ position: "relative", paddingTop: "56%", background: "linear-gradient(135deg, #1a3a5c, #2a5a8c)", overflow: "hidden" }}>
                      <Image
                        src={getImageUrl(item.image)}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <div style={{ padding: "1.2rem" }}>
                    {item.category && (
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent-dark)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {item.category.name}
                      </span>
                    )}
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-heading)", lineHeight: 1.4, marginTop: "0.4rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.5rem" }}>
                      {formatDate(item.published_at || item.created_at, { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
