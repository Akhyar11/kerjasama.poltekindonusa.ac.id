import { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { CampusSystem, HeroSlider } from "@/lib/types";
import SistemInformasiSearch from "@/components/SistemInformasiSearch";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Sistem Informasi | Politeknik Indonusa Surakarta",
  description: "Daftar Sistem Informasi Kampus Politeknik Indonusa Surakarta",
};

async function getCampusSystems(): Promise<CampusSystem[]> {
  try {
    return await fetchAPI<CampusSystem[]>("/campus-systems");
  } catch {
    return [];
  }
}

async function getHeroSliders(): Promise<HeroSlider[]> {
  try {
    return await fetchAPI<HeroSlider[]>("/hero-sliders");
  } catch {
    return [];
  }
}

export default async function SistemInformasiPage() {
  const [systems, sliders] = await Promise.all([
    getCampusSystems(),
    getHeroSliders(),
  ]);

  return (
    <div style={{ minHeight: "80vh" }}>
      <HeroSection sliders={sliders} />

      <SistemInformasiSearch systems={systems} />
    </div>
  );
}
