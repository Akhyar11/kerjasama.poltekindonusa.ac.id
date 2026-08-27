import { fetchAPI, getImageUrl } from "@/lib/api";
import { Page } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPage(slug: string): Promise<Page | null> {
  try {
    return await fetchAPI<Page>(`/pages/${slug}`);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: "Halaman Tidak Ditemukan",
    };
  }

  // Clean the title (e.g. remove newlines if any)
  const cleanTitle = page.title.replace(/\r?\n|\r/g, " ");
  
  // Create description from content
  const description = page.content
    ? page.content.replace(/<[^>]*>/g, "").substring(0, 160).trim()
    : "Halaman Politeknik Indonusa Surakarta";

  // Get image URL if page.image exists
  const imageUrl = page.image ? getImageUrl(page.image) : undefined;

  return {
    title: `${cleanTitle} | Politeknik Indonusa Surakarta`,
    description: description,
    openGraph: {
      title: `${cleanTitle} | Politeknik Indonusa Surakarta`,
      description: description,
      type: "website",
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cleanTitle} | Politeknik Indonusa Surakarta`,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

function getYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function YouTubeEmbed({ url, title }: { url: string; title: string }) {
  const youtubeId = getYouTubeId(url);
  if (!youtubeId) return null;

  return (
    <div style={{ 
      borderRadius: "16px", 
      overflow: "hidden", 
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      position: "relative",
      paddingBottom: "56.25%",
      height: 0,
      background: "#000"
    }}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

function ImageDisplay({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ 
      borderRadius: "16px", 
      overflow: "hidden", 
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)" 
    }}>
      <img 
        src={getImageUrl(src)} 
        alt={alt} 
        style={{ width: "100%", height: "auto", display: "block" }} 
      />
    </div>
  );
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  const youtubeId = getYouTubeId(page.youtube_url);
  const hasMedia = page.media && page.media.length > 0;
  const hasLegacyMedia = youtubeId || page.image;

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        padding: "4rem 1.5rem 5rem", 
        background: "linear-gradient(135deg, #0d2440, #1a3a5c)", 
        textAlign: "center" 
      }}>
        <h1 style={{ 
          fontSize: "clamp(2rem, 4vw, 3rem)", 
          fontWeight: 800, 
          color: "white", 
          lineHeight: 1.3 
        }}>
          {slug === 'sejarah-politeknik-indonusa-surakarta' ? (
            <>
              Sejarah
              <br />
              Politeknik Indonusa Surakarta
            </>
          ) : (
            <>
              {page.title}
              {slug === 'visi-misi-tujuan' && (
                <>
                  <br />
                  Politeknik Indonusa Surakarta
                </>
              )}
            </>
          )}
        </h1>
      </section>

      {/* Content Section */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--card)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>

          {/* Legacy YouTube Video (main) */}
          {youtubeId && (
            <div style={{ marginBottom: "2rem" }}>
              <YouTubeEmbed url={page.youtube_url!} title={page.title} />
            </div>
          )}

          {/* Legacy Image (main) - show only if no YouTube */}
          {!youtubeId && page.image && (
            <div style={{ marginBottom: "2rem" }}>
              <ImageDisplay src={page.image} alt={page.title} />
            </div>
          )}

          {/* Additional Media Items */}
          {hasMedia && (
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ 
                display: "grid", 
                gap: "1.5rem",
                gridTemplateColumns: page.media!.length === 1 ? "1fr" : "repeat(auto-fit, minmax(min(100%, 350px), 1fr))"
              }}>
                {page.media!.map((item) => (
                  <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {item.type === 'youtube' && item.youtube_url ? (
                      <YouTubeEmbed url={item.youtube_url} title={item.caption || page.title} />
                    ) : item.type === 'image' && item.image_path ? (
                      <ImageDisplay src={item.image_path} alt={item.caption || page.title} />
                    ) : null}
                    {item.caption && (
                      <p style={{ 
                        textAlign: "center", 
                        fontSize: "0.85rem", 
                        color: "var(--muted-foreground)", 
                        fontStyle: "italic",
                        margin: "0.25rem 0 0",
                      }}>
                        {item.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          {page.content && (
            <div 
              className="wysiwyg-content" 
              style={{ 
                fontSize: "1.05rem", 
                color: "var(--foreground)", 
                lineHeight: 1.9 
              }} 
              dangerouslySetInnerHTML={{ __html: page.content }} 
            />
          )}

          {/* Empty state */}
          {!page.content && !hasLegacyMedia && !hasMedia && (
            <div 
              className="wysiwyg-content" 
              style={{ 
                fontSize: "1.05rem", 
                color: "var(--foreground)", 
                lineHeight: 1.9 
              }} 
              dangerouslySetInnerHTML={{ __html: "<p>Konten halaman ini belum tersedia.</p>" }} 
            />
          )}

          {/* Back link */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            <Link href="/" style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "6px", 
              color: "var(--foreground)", 
              textDecoration: "none", 
              fontWeight: 600, 
              fontSize: "0.9rem" 
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
