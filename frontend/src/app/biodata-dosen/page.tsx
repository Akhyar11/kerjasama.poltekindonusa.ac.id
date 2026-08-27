import { fetchAPI, fetchSippmAPI } from "@/lib/api";
import DosenListClient, { Dosen, ProgdiGroup } from "@/components/DosenListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biodata Dosen - Politeknik Indonusa Surakarta",
  description: "Daftar Dosen dan Biodata Pengajar Politeknik Indonusa Surakarta.",
};

export const dynamic = 'force-dynamic';

export default async function BiodataDosenPage() {
  let dosens: Dosen[] = [];
  let progdiGroups: ProgdiGroup[] = [];

  try {
    // 1. Try fetching lecturers grouped by Program Studi directly from SIPPM API
    const groupedRes = await fetchSippmAPI<any>("/api/biodata-dosen/grouped-by-progdi");
    
    if (groupedRes && groupedRes.status && Array.isArray(groupedRes.data)) {
      const allDosens: Dosen[] = [];
      
      progdiGroups = groupedRes.data.map((group: any) => {
        const mappedDosens: Dosen[] = (group.dosen || []).map((item: any) => ({
          nidn: item.nidn,
          nama: item.nama_lengkap || item.nama || "",
          foto: item.foto_url || item.foto || null,
          keahlian: item.jabatan_akademik || item.keahlian || null,
          publikasi: null,
          prodi_homebase: group.program_studi_nama,
          prodi_id: group.program_studi_id,
          email: item.email || null,
        }));
        
        allDosens.push(...mappedDosens);

        return {
          id: group.program_studi_id,
          nama: group.program_studi_nama,
          total_dosen: group.total_dosen || mappedDosens.length,
        };
      });

      dosens = allDosens;
    } else {
      // 2. Fallback to standard list if grouped response is unavailable
      const listRes = await fetchSippmAPI<any>("/api/biodata-dosen?limit=100");
      if (listRes && listRes.data && Array.isArray(listRes.data)) {
        dosens = listRes.data.map((item: any) => ({
          nidn: item.nidn,
          nama: item.nama_lengkap || item.nama || "",
          foto: item.foto_url || item.foto || null,
          keahlian: item.jabatan_akademik || item.keahlian || null,
          publikasi: null,
          prodi_homebase: typeof item.program_studi === "object" ? item.program_studi?.nama : item.program_studi || null,
          prodi_id: typeof item.program_studi === "object" ? item.program_studi?.id : null,
          email: item.email || null,
        }));
      }
    }
  } catch (error) {
    console.error("Gagal memuat data dosen dari SIPPM, mencoba fallback ke API lokal...", error);
    try {
      dosens = await fetchAPI<Dosen[]>("/biodata-dosens");
    } catch (fallbackError) {
      console.error("Gagal memuat data dosen", fallbackError);
    }
  }

  return (
    <div>
      {/* Header Banner */}
      <section style={{ position: "relative", overflow: "hidden", padding: "4rem 1.5rem 5rem", background: "linear-gradient(135deg, #0a192f 0%, #112240 100%)", textAlign: "center" }}>
        {/* Decorative Orbs */}
        <div style={{ position: "absolute", top: "-50px", left: "10%", width: "200px", height: "200px", background: "rgba(240, 165, 0, 0.15)", filter: "blur(60px)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-50px", right: "10%", width: "250px", height: "250px", background: "rgba(30, 136, 229, 0.15)", filter: "blur(80px)", borderRadius: "50%" }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: "8px", background: "rgba(240,165,0,0.15)", color: "#ffc940", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem", border: "1px solid rgba(240,165,0,0.3)" }}>
            Akademik
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "white", marginBottom: "0.5rem", letterSpacing: "-1px" }}>
            Biodata Dosen
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
            Daftar pengajar dan tenaga pendidik profesional di Politeknik Indonusa Surakarta per Program Studi.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--section-bg)", minHeight: "60vh" }}>
        <DosenListClient dosens={dosens} progdiGroups={progdiGroups} />
      </section>
    </div>
  );
}
