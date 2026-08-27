import { fetchAPI, getImageUrl } from "@/lib/api";
import { StudyProgram, OrgMember } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProgramTabsClient from "@/components/ProgramTabsClient";

interface Props {
  params: Promise<{ slug: string }>;
}

interface OrgTreeNode {
  id: string;
  name: string;
  position: string;
  photo?: string | null;
  parent_id?: string | null;
  children: OrgTreeNode[];
}

function buildOrgTree(members: OrgMember[]): OrgTreeNode[] {
  const map: { [key: string]: OrgTreeNode } = {};
  const roots: OrgTreeNode[] = [];

  members.forEach((member) => {
    const id = (member as any).id || member.name;
    map[id] = {
      id,
      name: member.name,
      position: member.position,
      photo: member.photo,
      parent_id: member.parent_id,
      children: [],
    };
  });

  members.forEach((member) => {
    const id = (member as any).id || member.name;
    const parentId = member.parent_id;
    if (parentId && map[parentId]) {
      map[parentId].children.push(map[id]);
    } else {
      roots.push(map[id]);
    }
  });

  return roots;
}

function renderTree(node: OrgTreeNode) {
  const photoUrl = node.photo ? getImageUrl(node.photo) : null;
  return (
    <li key={node.id}>
      <div className="org-node-card">
        {photoUrl ? (
          <img src={photoUrl} alt={node.name} className="org-node-avatar" />
        ) : (
          <div className="org-node-avatar flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-[#1a3a5c] dark:text-gray-300 font-bold text-xl" style={{ margin: "0 auto 0.75rem auto" }}>
            {node.name.charAt(0)}
          </div>
        )}
        <div className="org-node-name">{node.name}</div>
        <div className="org-node-position">{node.position}</div>
      </div>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => renderTree(child))}
        </ul>
      )}
    </li>
  );
}

async function getProgram(slug: string): Promise<StudyProgram | null> {
  try {
    return await fetchAPI<StudyProgram>(`/study-programs/${slug}`);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const program = await getProgram(slug);
  
  if (!program) {
    return {
      title: "Program Studi Tidak Ditemukan",
    };
  }

  const title = `${program.name} | Politeknik Indonusa Surakarta`;
  const description = program.description ?? "Program studi di Politeknik Indonusa Surakarta";
  const imageUrl = program.cover_image ? getImageUrl(program.cover_image) : (program.image ? getImageUrl(program.image) : undefined);

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
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) notFound();

  const coverUrl = program.cover_image ? getImageUrl(program.cover_image) : null;

  // Helper untuk mendapatkan ID YouTube dengan aman dari berbagai format URL (termasuk Shorts, youtu.be, dll)
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url; // Jika user hanya input ID
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|shorts\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = program.video_url ? getYoutubeId(program.video_url) : null;
  const prestasiHtml = program.achievements || program.prestasi;
  const sertifikat = program.accreditation_certificate || program.sertifikat_akreditasi;

  return (
    <div>
      <section
        style={{
          padding: "clamp(4rem, 10vh, 6rem) 1.5rem",
          minHeight: "clamp(300px, 45vh, 550px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: coverUrl
            ? `linear-gradient(rgba(13, 36, 64, 0.7), rgba(13, 36, 64, 0.8)), url("${coverUrl}")`
            : "linear-gradient(135deg, #0d2440, #1a3a5c)",
          backgroundSize: "cover",
          backgroundPosition: program.cover_image_focus || "center",
          textAlign: "center",
          position: "relative"
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {program.degree && <span style={{ padding: "4px 14px", borderRadius: "8px", background: "rgba(240,165,0,0.15)", color: "#ffc940", fontSize: "0.75rem", fontWeight: 600, backdropFilter: "blur(4px)" }}>{program.degree}</span>}
            {program.accreditation && (
              sertifikat ? (
                <a href={getImageUrl(sertifikat)} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "4px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.2)", color: "white", fontSize: "0.75rem", fontWeight: 600, backdropFilter: "blur(4px)", textDecoration: "none", cursor: "pointer", border: "1px solid rgba(255,255,255,0.4)" }}>
                  ⭐ Akreditasi {program.accreditation} <span>(Lihat Sertifikat)</span>
                </a>
              ) : (
                <span style={{ padding: "4px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: 600, backdropFilter: "blur(4px)" }}>⭐ Akreditasi {program.accreditation}</span>
              )
            )}
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 900, color: "white", maxWidth: "900px", margin: "0 auto", lineHeight: 1.2, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>{program.name}</h1>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "var(--card)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <ProgramTabsClient
            programName={program.name}
            description={program.description}
            graduateProfile={program.graduate_profile ?? null}
            achievements={prestasiHtml ?? null}
            imageUrl={program.image ? getImageUrl(program.image) : null}
            vision={(program as any).vision || (program as any).visi}
            mission={(program as any).mission || (program as any).misi}
            goals={(program as any).goals || (program as any).tujuan}
          />

          {sertifikat && (
            <div style={{ marginTop: "2.5rem" }}>
              <a href={getImageUrl(sertifikat)} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "linear-gradient(135deg, #f0a500, #ffc940)", color: "#0d2440", fontWeight: 700, borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 15px rgba(240,165,0,0.3)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                Lihat Sertifikat Akreditasi
              </a>
            </div>
          )}



          {/* Struktur Organisasi Section */}
          {program.org_structure && program.org_structure.length > 0 && (
            <div style={{ marginTop: "4.5rem" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--foreground)", marginBottom: "2rem", textAlign: "center" }}>
                Struktur Organisasi
              </h2>
              <div className="org-chart-container">
                <div className="org-tree">
                  <ul>
                    {buildOrgTree(program.org_structure).map((root) => renderTree(root))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {videoId && (
            <div style={{ marginTop: "3rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--foreground)", marginBottom: "1.5rem" }}>Video Profil</h2>
              <div style={{ borderRadius: "20px", overflow: "hidden", position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
                <iframe
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            <Link href="/program-studi" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--foreground)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Semua Program Studi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
