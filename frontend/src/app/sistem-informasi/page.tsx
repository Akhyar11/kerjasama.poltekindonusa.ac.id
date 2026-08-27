import { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { CampusSystem } from "@/lib/types";
import SistemInformasiSearch from "@/components/SistemInformasiSearch";

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

export default async function SistemInformasiPage() {
  const systems = await getCampusSystems();

  return (
    <div style={{ minHeight: "80vh" }}>
      <section style={{ padding: "3rem 1.5rem 2rem", background: "linear-gradient(135deg, #0d2440, #1a3a5c)", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: "8px", background: "rgba(240,165,0,0.15)", color: "#ffc940", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>Layanan Digital</div>
        <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>Sistem Informasi</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>Akses cepat ke berbagai platform digital kampus</p>
      </section>

      <SistemInformasiSearch systems={systems} />
    </div>
  );
}
