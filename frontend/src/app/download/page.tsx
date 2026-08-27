import { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { Document } from "@/lib/types";

export const metadata: Metadata = {
  title: "Download | Politeknik Indonusa Surakarta",
  description: "Download dokumen, pengumuman, dan pedoman dari Politeknik Indonusa Surakarta",
};

async function getDocuments(): Promise<Document[]> {
  try {
    return await fetchAPI<Document[]>("/documents");
  } catch {
    return [];
  }
}

const typeLabels: Record<string, { label: string; color: string; bg: string }> = {
  pengumuman: { label: "Pengumuman", color: "var(--foreground)", bg: "rgba(26,58,92,0.08)" },
  pedoman: { label: "Pedoman", color: "#c08400", bg: "rgba(240,165,0,0.1)" },
};

import DocumentList from "@/components/DocumentList";

export default async function DownloadPage() {
  const documents = await getDocuments();

  return (
    <div>
      <section style={{ padding: "4rem 1.5rem 5rem", background: "linear-gradient(135deg, #0d2440, #1a3a5c)", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", padding: "8px 20px", borderRadius: "10px", background: "rgba(240,165,0,0.15)", color: "#ffc940", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1.5rem", border: "1px solid rgba(240,165,0,0.3)" }}>Pusat Unduhan</div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, color: "white", marginBottom: "1rem", lineHeight: 1.1 }}>Download & Dokumen</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>Temukan seluruh dokumen resmi, pengumuman akademik, dan pedoman perkuliahan Politeknik Indonusa Surakarta di sini.</p>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "var(--section-bg)", minHeight: "400px" }}>
        <DocumentList initialDocuments={documents} />
      </section>
    </div>
  );
}
