import { fetchAPI } from "@/lib/api";
import DosenListClient, { Dosen, ProgdiGroup } from "@/components/DosenListClient";
import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import { HeroSlider } from "@/lib/types";

export const metadata: Metadata = {
  title: "Biodata Dosen - Politeknik Indonusa Surakarta",
  description: "Daftar Dosen dan Biodata Pengajar Politeknik Indonusa Surakarta.",
};

export const dynamic = 'force-dynamic';

async function getHeroSliders(): Promise<HeroSlider[]> {
  try {
    return await fetchAPI<HeroSlider[]>("/hero-sliders");
  } catch {
    return [];
  }
}

export default async function BiodataDosenPage() {
  let dosens: Dosen[] = [];
  let progdiGroups: ProgdiGroup[] = [];
  let sliders: HeroSlider[] = [];

  try {
    const [dosensData, slidersData] = await Promise.all([
      fetchAPI<Dosen[]>("/biodata-dosens"),
      getHeroSliders(),
    ]);
    dosens = dosensData;
    sliders = slidersData;
  } catch (error) {
    console.error("Gagal memuat data dosen dari API lokal", error);
  }

  return (
    <div>
      {/* Hero Banner */}
      <HeroSection sliders={sliders} />

      {/* Main Content */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--section-bg)", minHeight: "60vh" }}>
        <DosenListClient dosens={dosens} progdiGroups={progdiGroups} />
      </section>
    </div>
  );
}
