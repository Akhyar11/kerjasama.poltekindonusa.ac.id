import { fetchAPI } from "@/lib/api";
import { CampusOrganization } from "@/lib/types";
import { Metadata } from "next";
import OrganisasiKampusListClient from "@/components/OrganisasiKampusListClient";

export const metadata: Metadata = {
  title: "Organisasi Kampus - Politeknik Indonusa Surakarta",
  description: "Daftar Organisasi Kampus BEM, HMJ, dan UKM di Politeknik Indonusa Surakarta",
};

export const dynamic = 'force-dynamic';

export default async function OrganisasiKampusPage() {
  let organizations: CampusOrganization[] = [];
  try {
    organizations = await fetchAPI<CampusOrganization[]>("/campus-organizations");
  } catch (error) {
    console.error("Error fetching campus organizations:", error);
  }

  return (
    <div>
      <section style={{ position: "relative", overflow: "hidden", padding: "8rem 1.5rem 5rem", background: "linear-gradient(135deg, #0a192f 0%, #112240 100%)", textAlign: "center" }}>
        {/* Decorative Orbs */}
        <div style={{ position: "absolute", top: "-50px", left: "10%", width: "200px", height: "200px", background: "rgba(240, 165, 0, 0.15)", filter: "blur(60px)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-50px", right: "10%", width: "250px", height: "250px", background: "rgba(30, 136, 229, 0.15)", filter: "blur(80px)", borderRadius: "50%" }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: "8px", background: "rgba(240,165,0,0.15)", color: "#ffc940", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem", border: "1px solid rgba(240,165,0,0.3)" }}>
            Kemahasiswaan
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "white", marginBottom: "0.5rem", letterSpacing: "-1px" }}>
            Organisasi Kampus
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
            Wadah pengembangan diri dan kreativitas mahasiswa Politeknik Indonusa Surakarta melalui berbagai organisasi BEM, Himpunan Mahasiswa Jurusan (HMJ), dan Unit Kegiatan Mahasiswa (UKM).
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "var(--section-bg)", minHeight: "60vh" }}>
        <OrganisasiKampusListClient organizations={organizations} />
      </section>
    </div>
  );
}
