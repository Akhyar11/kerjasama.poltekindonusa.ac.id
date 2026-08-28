import { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { Document, HeroSlider } from "@/lib/types";
import HeroSection from "@/components/HeroSection";

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

async function getHeroSliders(): Promise<HeroSlider[]> {
  try {
    return await fetchAPI<HeroSlider[]>("/hero-sliders");
  } catch {
    return [];
  }
}

export default async function DownloadPage() {
  const [documents, sliders] = await Promise.all([
    getDocuments(),
    getHeroSliders(),
  ]);

  return (
    <div>
      <HeroSection sliders={sliders} />

      <section style={{ padding: "4rem 1.5rem", background: "var(--section-bg)", minHeight: "400px" }}>
        <DocumentList initialDocuments={documents} />
      </section>
    </div>
  );
}
