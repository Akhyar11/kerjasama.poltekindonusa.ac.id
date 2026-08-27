import { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { StudyProgram } from "@/lib/types";
import ProgramListClient from "@/components/ProgramListClient";

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

export default async function ProgramStudiPage() {
  const programs = await getPrograms();
  const list = programs.length > 0 ? programs : fallback;

  return (
    <div>
      <section style={{ position: "relative", overflow: "hidden", padding: "4rem 1.5rem 5rem", background: "linear-gradient(135deg, #0a192f 0%, #112240 100%)", textAlign: "center" }}>
        {/* Decorative Orbs */}
        <div style={{ position: "absolute", top: "-50px", left: "10%", width: "200px", height: "200px", background: "rgba(240, 165, 0, 0.15)", filter: "blur(60px)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-50px", right: "10%", width: "250px", height: "250px", background: "rgba(30, 136, 229, 0.15)", filter: "blur(80px)", borderRadius: "50%" }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: "8px", background: "rgba(240,165,0,0.15)", color: "#ffc940", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem", border: "1px solid rgba(240,165,0,0.3)" }}>
            Akademik
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "white", marginBottom: "0.5rem", letterSpacing: "-1px" }}>
            Program Studi
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Temukan 18 Program Studi unggulan terakreditasi yang siap mengantarkan Anda menuju karir masa depan yang gemilang.
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "var(--section-bg)", minHeight: "60vh" }}>
        <ProgramListClient programs={list} />
      </section>
    </div>
  );
}
