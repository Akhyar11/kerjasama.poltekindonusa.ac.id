import { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { StudyProgram, HeroSlider } from "@/lib/types";
import ProgramListClient from "@/components/ProgramListClient";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Program Studi | Politeknik Indonusa Surakarta",
  description: "18 Program Studi unggulan terakreditasi di Politeknik Indonusa Surakarta",
};

const fallback: StudyProgram[] = [
  { id: 1, name: "Teknologi Rekayasa Otomotif", slug: "teknologi-rekayasa-otomotif", description: "Program studi yang mempelajari teknologi otomotif modern.", image: null, icon: null, accreditation: "Baik Sekali", degree: "S1 Terapan" },
  { id: 2, name: "Teknologi Rekayasa Perangkat Lunak", slug: "teknologi-rekayasa-perangkat-lunak", description: "Mempelajari pengembangan perangkat lunak dan teknologi informasi.", image: null, icon: null, accreditation: "Baik Sekali", degree: "S1 Terapan" },
  { id: 3, name: "Produksi Media", slug: "produksi-media", description: "Fokus pada produksi konten digital dan desain grafis.", image: null, icon: null, accreditation: "Baik", degree: "S1 Terapan" },
  { id: 4, name: "Bisnis Manajemen Ritel", slug: "bisnis-manajemen-ritel", description: "Mempelajari strategi bisnis retail modern.", image: null, icon: null, accreditation: "Baik Sekali", degree: "S1 Terapan" },
  { id: 5, name: "Akuntansi Perpajakan", slug: "akuntansi-perpajakan", description: "Mendalami akuntansi dan perpajakan.", image: null, icon: null, accreditation: "Baik Sekali", degree: "S1 Terapan" },
  { id: 6, name: "Perhotelan", slug: "perhotelan", description: "Mempersiapkan tenaga profesional hospitality.", image: null, icon: null, accreditation: "Baik", degree: "D3" },
  { id: 7, name: "Farmasi", slug: "farmasi", description: "Ilmu kefarmasian untuk tenaga farmasi kompeten.", image: null, icon: null, accreditation: "Baik Sekali", degree: "D3" },
  { id: 8, name: "Manajemen Informasi Kesehatan", slug: "manajemen-informasi-kesehatan", description: "Pengelolaan data kesehatan digital.", image: null, icon: null, accreditation: "Baik", degree: "S1 Terapan" },
  { id: 9, name: "Teknologi Laboratorium Medis", slug: "teknologi-laboratorium-medis", description: "Teknik laboratorium medis untuk diagnosis.", image: null, icon: null, accreditation: "Baik", degree: "S1 Terapan" },
  { id: 10, name: "Informatika", slug: "informatika", description: "Mempelajari komputasi, kecerdasan buatan, keamanan siber, dan jaringan komputer.", image: null, icon: null, accreditation: "Coming Soon", degree: "S1" },
  { id: 11, name: "PGSD", slug: "pgsd", description: "Mendidik calon guru SD yang kompeten, berkarakter, inovatif, dan profesional.", image: null, icon: null, accreditation: "Coming Soon", degree: "S1" },
  { id: 12, name: "Pendidikan Jasmani", slug: "pendidikan-jasmani", description: "Membentuk pendidik jasmani, olahraga, kesehatan, dan kepelatihan yang handal.", image: null, icon: null, accreditation: "Coming Soon", degree: "S1" },
  { id: 13, name: "Fisioterapi", slug: "fisioterapi", description: "Mengembangkan keahlian rehabilitasi fisik dan pemulihan gerak tubuh manusia.", image: null, icon: null, accreditation: "Coming Soon", degree: "S1" },
  { id: 14, name: "Kesehatan Lingkungan", slug: "kesehatan-lingkungan", description: "Mengidentifikasi, mencegah, dan mengontrol faktor lingkungan yang mempengaruhi kesehatan.", image: null, icon: null, accreditation: "Coming Soon", degree: "S1" },
  { id: 15, name: "Manajemen", slug: "manajemen", description: "Mengembangkan kemampuan manajerial, kepemimpinan, dan kewirausahaan.", image: null, icon: null, accreditation: "Coming Soon", degree: "S1" },
  { id: 16, name: "Psikologi", slug: "psikologi", description: "Mempelajari perilaku manusia, proses mental, kesehatan jiwa, dan bimbingan konseling.", image: null, icon: null, accreditation: "Coming Soon", degree: "S1" },
  { id: 17, name: "Hukum", slug: "hukum", description: "Memahami sistem hukum, perundang-undangan, advokasi, dan keadilan sosial.", image: null, icon: null, accreditation: "Coming Soon", degree: "S1" },
  { id: 18, name: "Kebidanan", slug: "kebidanan", description: "Mempersiapkan bidan yang terampil, tanggap, dan berdedikasi dalam pelayanan ibu dan anak.", image: null, icon: null, accreditation: "Coming Soon", degree: "D3" },
];

async function getPrograms(): Promise<StudyProgram[]> {
  try {
    return await fetchAPI<StudyProgram[]>("/study-programs");
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

export default async function ProgramStudiPage() {
  const [programs, sliders] = await Promise.all([
    getPrograms(),
    getHeroSliders(),
  ]);
  const list = programs.length > 0 ? programs : fallback;

  return (
    <div>
      <HeroSection sliders={sliders} />

      <section style={{ padding: "4rem 1.5rem", background: "var(--section-bg)", minHeight: "60vh" }}>
        <ProgramListClient programs={list} />
      </section>
    </div>
  );
}
