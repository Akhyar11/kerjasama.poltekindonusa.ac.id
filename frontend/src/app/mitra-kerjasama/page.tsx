import { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { HomeData } from "@/lib/types";
import MitraSearch from "@/components/MitraSearch";

export const metadata: Metadata = {
  title: "Mitra Kerja Sama | Politeknik Indonusa Surakarta",
  description: "Jejaring kemitraan dan kerja sama Politeknik Indonusa Surakarta dengan berbagai instansi dan dunia industri.",
};

async function getPartnerships() {
  try {
    // Mitra diambil dari endpoint /home karena disertakan di sana
    const homeData = await fetchAPI<HomeData>("/home");
    return homeData?.partnerships || [];
  } catch {
    return [];
  }
}

export default async function MitraKerjasamaPage() {
  const partnerships = await getPartnerships();

  return (
    <div>
      {/* Header Mirip Berita namun Disesuaikan untuk Mitra */}
      <section style={{ padding: "4rem 1.5rem 6rem", background: "linear-gradient(135deg, #0d2440, #1a3a5c)", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: "8px", background: "rgba(240,165,0,0.15)", color: "#ffc940", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>Kemitraan & Kolaborasi</div>
        <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, color: "white", marginBottom: "0.5rem", letterSpacing: "-1px" }}>Mitra Kerja Sama</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          Jejaring sinergi Politeknik Indonusa Surakarta dengan instansi pemerintah, dunia usaha, dan dunia industri (DUDI)
        </p>
      </section>

      {/* Komponen Pencarian dan Grid Mitra */}
      <MitraSearch initialPartnerships={partnerships} />
    </div>
  );
}
