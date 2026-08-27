import { fetchAPI, getImageUrl } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export interface NormalizedDosen {
  nidn: string;
  nama: string;
  foto: string | null;
  email: string | null;
  prodi_homebase: string | null;
  jabatan_akademik: string | null;
  golongan: string | null;
  keahlian: string | null;
  riwayat_sekolah_list: any[];
  sertifikat_kompetensi_list: any[];
  sertifikat_penghargaan_list: any[];
  pengabdian_masyarakat_list: any[];
  publikasi_list: any[];
  buku_list: any[];
  hki_list: any[];
}

async function getDosenDetail(nidn: string): Promise<NormalizedDosen | null> {
  try {
    const legacy = await fetchAPI<any>(`/biodata-dosens/${nidn}`);
    if (legacy) {
      return {
        nidn: legacy.nidn || nidn,
        nama: legacy.nama_lengkap || legacy.nama || "",
        foto: legacy.foto ? getImageUrl(legacy.foto) : null,
        email: legacy.email || null,
        prodi_homebase: legacy.prodi_homebase || null,
        jabatan_akademik: legacy.jabatan_fungsional || null,
        golongan: legacy.pangkat_golongan || null,
        keahlian: legacy.keahlian || null,
        riwayat_sekolah_list: legacy.riwayat_sekolah_list || [],
        sertifikat_kompetensi_list: legacy.sertifikat_kompetensi_list || [],
        sertifikat_penghargaan_list: legacy.sertifikat_penghargaan_list || [],
        pengabdian_masyarakat_list: legacy.pengabdian_masyarakat_list || [],
        publikasi_list: legacy.publikasi_list || [],
        buku_list: legacy.buku_list || [],
        hki_list: legacy.hki_list || [],
      };
    }
  } catch (err) {
    console.error(`Legacy API fetch failed for NIDN ${nidn}:`, err);
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ nidn: string }> }): Promise<Metadata> {
  try {
    const { nidn } = await params;
    const dosen = await getDosenDetail(nidn);
    if (dosen) {
      return {
        title: `${dosen.nama} - Biodata Dosen`,
        description: `Profil dan biodata akademis dari ${dosen.nama} di Politeknik Indonusa Surakarta.`,
      };
    }
  } catch {}
  return {
    title: "Profil Dosen - Politeknik Indonusa Surakarta",
  };
}

export const dynamic = 'force-dynamic';

export default async function DosenDetailPage({ params }: { params: Promise<{ nidn: string }> }) {
  const { nidn } = await params;
  const dosen = await getDosenDetail(nidn);

  if (!dosen) {
    return notFound();
  }

  const renderTable = <T,>(
    headers: string[],
    data: T[] | undefined,
    renderRow: (item: T, idx: number) => React.ReactNode
  ) => {
    if (!data || data.length === 0) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", fontStyle: "italic", background: "rgba(255,255,255,0.01)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
          Belum ada data
        </div>
      );
    }

    return (
      <div className="premium-table-container">
        <table className="premium-table">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => renderRow(item, idx))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ background: "#0a192f", minHeight: "100vh", color: "white", padding: "106px 1.5rem 5rem" }}>
      <style>{`
        .back-link {
          color: rgba(255, 255, 255, 0.7);
          transition: color 0.3s;
        }
        .back-link:hover {
          color: #ffc940 !important;
        }
        .premium-table-container {
          width: 100%;
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.01);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }
        .premium-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.85rem;
        }
        .premium-table th {
          background: rgba(240, 165, 0, 0.1);
          color: #ffc940;
          font-weight: 700;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          white-space: nowrap;
        }
        .premium-table td {
          padding: 12px 16px;
          color: rgba(255, 255, 255, 0.85);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          line-height: 1.5;
        }
        .premium-table tr:hover {
          background: rgba(255, 255, 255, 0.03);
        }
        .premium-table tr:last-child td {
          border-bottom: none;
        }
        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .action-btn-primary {
          background: #ffc940;
          color: #0a192f;
        }
        .action-btn-primary:hover {
          background: #ffe082;
          transform: translateY(-1px);
        }
        
        .tab-button {
          padding: 0.75rem 1.25rem;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: rgba(255,255,255,0.5);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .tab-button:hover {
          color: rgba(255,255,255,0.8);
        }
        .tab-button.active {
          color: #ffc940;
          border-bottom-color: #ffc940;
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Breadcrumb / Back Navigation */}
        <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "10px" }}>
          <Link href="/biodata-dosen" className="back-link" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Kembali ke Daftar Dosen
          </Link>
        </div>

        {/* Profile Card */}
        <div style={{ 
          background: "rgba(255, 255, 255, 0.02)", 
          border: "1px solid rgba(255, 255, 255, 0.1)", 
          borderRadius: "20px", 
          padding: "2.5rem", 
          display: "flex", 
          gap: "3rem", 
          flexWrap: "wrap",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Decorative background blur */}
          <div style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "300px", background: "rgba(240, 165, 0, 0.05)", filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none" }} />
          
          <div style={{ flex: "0 0 220px", position: "relative", zIndex: 1 }}>
            <div style={{ 
              width: "220px", 
              height: "280px", 
              borderRadius: "16px", 
              overflow: "hidden",
              border: "3px solid rgba(240, 165, 0, 0.3)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
            }}>
              {dosen.foto ? (
                <img src={dosen.foto} alt={dosen.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)" }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
            </div>
            
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem" }}>
              <div style={{ flex: 1, padding: "0.8rem", background: "rgba(0,0,0,0.2)", borderRadius: "12px", textAlign: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>NIDN</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffc940", letterSpacing: "1px" }}>{dosen.nidn}</div>
              </div>
            </div>
          </div>

          <div style={{ flex: "1 1 400px", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h1 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 800, margin: "0 0 0.5rem", lineHeight: 1.2 }}>{dosen.nama}</h1>
            
            {dosen.prodi_homebase && (
              <div style={{ display: "inline-block", padding: "6px 14px", background: "rgba(30, 136, 229, 0.15)", border: "1px solid rgba(30, 136, 229, 0.3)", borderRadius: "20px", color: "#64b5f6", fontSize: "0.85rem", fontWeight: 600, alignSelf: "flex-start", marginBottom: "1.5rem" }}>
                Program Studi {dosen.prodi_homebase}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>Jabatan Fungsional</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 500 }}>{dosen.jabatan_akademik || "-"}</div>
              </div>
              
              <div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>Pangkat/Golongan</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 500 }}>{dosen.golongan || "-"}</div>
              </div>
              
              <div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>Bidang Keahlian</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 500 }}>{dosen.keahlian || "-"}</div>
              </div>

              {dosen.email && (
                <div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>Email</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#ffc940" }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <a href={`mailto:${dosen.email}`} style={{ color: "white", textDecoration: "none" }}>{dosen.email}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Tabs (Simplified Server Component rendering all tables vertically with sections) */}
        <div style={{ marginTop: "3rem" }}>
          
          <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", overflow: "hidden" }}>
            
            {/* Riwayat Sekolah */}
            <div style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <div style={{ width: "8px", height: "8px", background: "#ffc940", borderRadius: "50%" }}></div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Riwayat Pendidikan</h3>
              </div>
              
              {renderTable<any>(
                ["Jenjang", "Institusi", "Tahun Lulus", "Bidang Ilmu"],
                dosen.riwayat_sekolah_list,
                (item, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{item.jenjang || "-"}</td>
                    <td>{item.institusi || "-"}</td>
                    <td>{item.tahun_lulus || "-"}</td>
                    <td>{item.bidang_ilmu || "-"}</td>
                  </tr>
                )
              )}
            </div>

            {/* Publikasi */}
            <div style={{ padding: "2rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <div style={{ width: "8px", height: "8px", background: "#4ade80", borderRadius: "50%" }}></div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Publikasi Jurnal / Artikel</h3>
              </div>
              
              {renderTable<any>(
                ["Tahun", "Judul", "Jurnal/Publisher", "Tautan"],
                dosen.publikasi_list,
                (item, idx) => (
                  <tr key={idx}>
                    <td>{item.tahun || "-"}</td>
                    <td style={{ fontWeight: 500, lineHeight: 1.4 }}>{item.judul || "-"}</td>
                    <td>{item.jurnal || "-"}</td>
                    <td>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noreferrer" className="action-btn action-btn-primary">
                          Buka Link
                        </a>
                      ) : "-"}
                    </td>
                  </tr>
                )
              )}
            </div>

            {/* Pengabdian Masyarakat */}
            <div style={{ padding: "2rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <div style={{ width: "8px", height: "8px", background: "#60a5fa", borderRadius: "50%" }}></div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Pengabdian Masyarakat</h3>
              </div>
              
              {renderTable<any>(
                ["Tahun", "Judul Pengabdian", "Sumber Dana"],
                dosen.pengabdian_masyarakat_list,
                (item, idx) => (
                  <tr key={idx}>
                    <td>{item.tahun || "-"}</td>
                    <td style={{ fontWeight: 500, lineHeight: 1.4 }}>{item.judul || "-"}</td>
                    <td>{item.sumber_dana || "-"}</td>
                  </tr>
                )
              )}
            </div>
            
            {/* Buku */}
            <div style={{ padding: "2rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <div style={{ width: "8px", height: "8px", background: "#f472b6", borderRadius: "50%" }}></div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Buku & Bahan Ajar</h3>
              </div>
              
              {renderTable<any>(
                ["Tahun", "Judul Buku", "Penerbit"],
                dosen.buku_list,
                (item, idx) => (
                  <tr key={idx}>
                    <td>{item.tahun || "-"}</td>
                    <td style={{ fontWeight: 500, lineHeight: 1.4 }}>{item.judul || "-"}</td>
                    <td>{item.penerbit || "-"}</td>
                  </tr>
                )
              )}
            </div>

            {/* HKI */}
            <div style={{ padding: "2rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <div style={{ width: "8px", height: "8px", background: "#c084fc", borderRadius: "50%" }}></div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Hak Kekayaan Intelektual (HKI)</h3>
              </div>
              
              {renderTable<any>(
                ["Tahun", "Judul Ciptaan", "Nomor Pencatatan"],
                dosen.hki_list,
                (item, idx) => (
                  <tr key={idx}>
                    <td>{item.tahun || "-"}</td>
                    <td style={{ fontWeight: 500, lineHeight: 1.4 }}>{item.judul || "-"}</td>
                    <td>{item.nomor || "-"}</td>
                  </tr>
                )
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
