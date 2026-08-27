import { fetchAPI, getImageUrl } from "@/lib/api";
import { CampusOrganization } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const org = await fetchAPI<CampusOrganization>(`/campus-organizations/${slug}`);
    const title = `${org.name} | Politeknik Indonusa Surakarta`;
    const description = `Profil ${org.name} (${org.type}) di Politeknik Indonusa Surakarta. Visi, misi, dan prestasi organisasi mahasiswa.`;
    const imageUrl = org.logo ? getImageUrl(org.logo) : undefined;
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch {
    return {
      title: "Organisasi Kampus Tidak Ditemukan",
    };
  }
}

export default async function OrganisasiKampusDetailPage({ params }: Props) {
  const { slug } = await params;
  let org: CampusOrganization | null = null;
  
  try {
    org = await fetchAPI<CampusOrganization>(`/campus-organizations/${slug}`);
  } catch (error) {
    notFound();
  }

  if (!org) {
    notFound();
  }

  return (
    <div>
      <section
        style={{
          padding: "clamp(4rem, 10vh, 6rem) 1.5rem",
          minHeight: "clamp(300px, 40vh, 450px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0d2440, #1a3a5c)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          position: "relative"
        }}
      >
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ 
            width: "120px", height: "120px", 
            backgroundColor: "white", 
            borderRadius: "50%", 
            padding: "10px", 
            marginBottom: "1.5rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"
          }}>
            {org.logo ? (
              <img src={getImageUrl(org.logo)} alt={org.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            ) : (
              <span style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1a3a5c" }}>{org.name.substring(0, 2)}</span>
            )}
          </div>
          
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{ padding: "4px 14px", borderRadius: "8px", background: "rgba(240,165,0,0.15)", color: "#ffc940", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px", backdropFilter: "blur(4px)" }}>
              {org.type === "BEM" ? "BADAN EKSEKUTIF MAHASISWA" : org.type === "HMJ" ? "HIMPUNAN MAHASISWA JURUSAN" : "UNIT KEGIATAN MAHASISWA"}
            </span>
          </div>
          
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, color: "white", maxWidth: "900px", margin: "0 auto", lineHeight: 1.2, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
            {org.name}
          </h1>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "var(--card)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            {/* Visi */}
            <div style={{ background: "rgba(26,58,92,0.03)", padding: "2rem", borderRadius: "24px", border: "1px solid rgba(26,58,92,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, #1a3a5c, #0d2440)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Visi</h2>
              </div>
              {org.vision ? (
                <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: org.vision }} />
              ) : (
                <p style={{ color: "var(--muted-foreground)", fontStyle: "italic" }}>Belum ada data visi.</p>
              )}
            </div>

            {/* Misi */}
            <div style={{ background: "rgba(26,58,92,0.03)", padding: "2rem", borderRadius: "24px", border: "1px solid rgba(26,58,92,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, #f0a500, #d98f00)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Misi</h2>
              </div>
              {org.mission ? (
                <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: org.mission }} />
              ) : (
                <p style={{ color: "var(--muted-foreground)", fontStyle: "italic" }}>Belum ada data misi.</p>
              )}
            </div>
          </div>

          {/* Prestasi */}
          <div style={{ background: "rgba(240,165,0,0.05)", padding: "2rem", borderRadius: "24px", border: "1px solid rgba(240,165,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, #f0a500, #ffc940)", color: "#0d2440", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Prestasi & Penghargaan</h2>
            </div>
            {org.achievements ? (
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: org.achievements }} />
            ) : (
              <p style={{ color: "var(--muted-foreground)", fontStyle: "italic" }}>Belum ada data prestasi.</p>
            )}
          </div>

          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            <Link href="/organisasi-kampus" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--foreground)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Semua Organisasi Kampus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
