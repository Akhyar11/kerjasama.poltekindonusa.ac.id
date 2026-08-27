import { fetchAPI, fetchSippmAPI, getImageUrl, getSippmImageUrl } from "@/lib/api";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Interfaces for SIPPM data
export interface SippmPenelitian {
  id: number;
  judul: string;
  tahun_akademik?: string | null;
  peran?: string | null;
  sumber_dana?: string | null;
  mitra?: string | null;
  bentuk_integrasi?: string | null;
  link_integrasi?: string | null;
  mata_kuliah_integrasi?: string | null;
}

export interface SippmPengabdian {
  id: number;
  judul: string;
  tahun_akademik?: string | null;
  peran?: string | null;
  sumber_dana?: string | null;
  mitra?: string | null;
}

export interface SippmArtikelJurnal {
  id: number;
  judul: string;
  sumber_artikel?: string | null;
  jenis_publikasi?: string | null;
  p_issn?: string | null;
  e_issn?: string | null;
  issue?: string | null;
  tanggal_terbit?: string | null;
  url_artikel?: string | null;
  url_homepage?: string | null;
  url_profil_jurnal?: string | null;
}

export interface SippmArtikelProsiding {
  id: number;
  judul: string;
  sumber_artikel?: string | null;
  jenis_publikasi?: string | null;
  tanggal_terbit?: string | null;
  url_artikel?: string | null;
  url_profil_prosiding?: string | null;
}

export interface SippmBuku {
  id: number;
  judul: string;
  tahun?: string | null;
  jenis_buku?: string | null;
  peran?: string | null;
  nama_penerbit?: string | null;
  kota_terbit?: string | null;
  url?: string | null;
}

export interface SippmHki {
  id: number;
  judul: string;
  tanggal_pencatatan?: string | null;
  nomor_sertifikat?: string | null;
  nomor_pencatatan?: string | null;
  status?: string | null;
  url?: string | null;
}

export interface NormalizedDosen {
  nidn: string;
  nama: string;
  foto: string | null;
  email: string | null;
  jenis_kelamin: string | null;
  website_personal: string | null;
  prodi_homebase: string | null;
  jabatan_akademik: string | null;
  golongan: string | null;
  jenjang_pendidikan: string | null;
  keahlian: string | null;
  id_eksternal?: {
    sinta_id?: string | null;
    scopus_id?: string | null;
    google_scholar_id?: string | null;
    orcid_id?: string | null;
    wos_id?: string | null;
  } | null;
  unit_usaha?: {
    is_aktif?: number;
    nama?: string | null;
  } | null;
  portofolio?: {
    penelitian: SippmPenelitian[];
    pengabdian: SippmPengabdian[];
    artikel_jurnal: SippmArtikelJurnal[];
    artikel_prosiding: SippmArtikelProsiding[];
    buku: SippmBuku[];
    hki: SippmHki[];
  };
  // Fallback support for legacy structures
  riwayat_sekolah_list?: any[];
  sertifikat_kompetensi_list?: any[];
  sertifikat_penghargaan_list?: any[];
}

async function getDosenDetail(nidn: string): Promise<NormalizedDosen | null> {
  // 1. Try fetching from SIPPM API direct route or alias endpoint
  try {
    const res = await fetchSippmAPI<any>(`/api/biodata-dosen/${nidn}`);
    if (res && res.status && res.data) {
      const data = res.data;
      return {
        nidn: data.nidn || nidn,
        nama: data.nama_lengkap || data.nama || "",
        foto: data.foto_url || (data.foto ? getSippmImageUrl(data.foto) : null),
        email: data.email || null,
        jenis_kelamin: data.jenis_kelamin || null,
        website_personal: data.website_personal || null,
        prodi_homebase: typeof data.program_studi === 'object' ? data.program_studi?.nama : (data.program_studi || null),
        jabatan_akademik: data.akademik?.jabatan_akademik || data.jabatan_fungsional || null,
        golongan: data.akademik?.golongan || data.pangkat_golongan || null,
        jenjang_pendidikan: data.akademik?.jenjang_pendidikan || null,
        keahlian: data.akademik?.jabatan_akademik ? `Dosen (${data.akademik.jabatan_akademik})` : (data.keahlian || null),
        id_eksternal: data.id_eksternal || null,
        unit_usaha: data.unit_usaha || null,
        portofolio: {
          penelitian: data.portofolio?.penelitian || [],
          pengabdian: data.portofolio?.pengabdian || [],
          artikel_jurnal: data.portofolio?.artikel_jurnal || [],
          artikel_prosiding: data.portofolio?.artikel_prosiding || [],
          buku: data.portofolio?.buku || [],
          hki: data.portofolio?.hki || [],
        }
      };
    }
  } catch (error) {
    console.warn(`SIPPM API fetch failed for NIDN ${nidn}, attempting fallback...`, error);
  }

  // 2. Fallback to legacy local backend API
  try {
    const legacy = await fetchAPI<any>(`/biodata-dosens/${nidn}`);
    if (legacy) {
      return {
        nidn: legacy.nidn || nidn,
        nama: legacy.nama_lengkap || legacy.nama || "",
        foto: legacy.foto ? getImageUrl(legacy.foto) : null,
        email: legacy.email || null,
        jenis_kelamin: null,
        website_personal: null,
        prodi_homebase: legacy.prodi_homebase || null,
        jabatan_akademik: legacy.jabatan_fungsional || null,
        golongan: legacy.pangkat_golongan || null,
        jenjang_pendidikan: null,
        keahlian: legacy.keahlian || null,
        portofolio: {
          penelitian: [],
          pengabdian: legacy.pengabdian_masyarakat_list || [],
          artikel_jurnal: legacy.publikasi_list || [],
          artikel_prosiding: [],
          buku: legacy.buku_list || [],
          hki: legacy.hki_list || [],
        },
        riwayat_sekolah_list: legacy.riwayat_sekolah_list || [],
        sertifikat_kompetensi_list: legacy.sertifikat_kompetensi_list || [],
        sertifikat_penghargaan_list: legacy.sertifikat_penghargaan_list || [],
      };
    }
  } catch (fallbackErr) {
    console.error(`Legacy API fetch failed for NIDN ${nidn}:`, fallbackErr);
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
          Belum ada data portofolio
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
        .action-btn-secondary {
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
        }
        .action-btn-secondary:hover {
          border-color: #ffc940;
          color: #ffc940;
          background: rgba(240, 165, 0, 0.05);
          transform: translateY(-1px);
        }
      `}</style>
      
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Back Link */}
        <Link
          href="/biodata-dosen"
          className="back-link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.95rem",
            textDecoration: "none",
            marginBottom: "2.5rem",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: "16px", height: "16px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Kembali ke Daftar Dosen
        </Link>

        {/* Layout Wrapper */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}>
          {/* Main Card */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              background: "#112240",
              borderRadius: "28px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              overflow: "hidden",
            }}
          >
            {/* Header / Top Profile Row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2.5rem",
                padding: "3rem",
                background: "linear-gradient(135deg, #112240 0%, #0a192f 100%)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Photo */}
              <div
                style={{
                  position: "relative",
                  width: "180px",
                  height: "220px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "3px solid rgba(240, 165, 0, 0.3)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  background: "#0a192f",
                  flexShrink: 0,
                }}
              >
                {dosen.foto ? (
                  <img
                    src={dosen.foto}
                    alt={dosen.nama}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  />
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "rgba(255,255,255,0.2)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "64px", height: "64px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Title Info */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
                <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.5rem", lineHeight: "1.2" }}>
                  {dosen.nama}
                </h1>
                <div style={{ display: "inline-flex", gap: "10px", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                  <span style={{ padding: "4px 12px", borderRadius: "8px", background: "rgba(240, 165, 0, 0.15)", color: "#ffc940", fontSize: "0.85rem", fontWeight: 700 }}>
                    NIDN: {dosen.nidn}
                  </span>
                  {dosen.prodi_homebase && (
                    <span style={{ padding: "4px 12px", borderRadius: "8px", background: "rgba(30, 136, 229, 0.15)", color: "#64b5f6", fontSize: "0.85rem", fontWeight: 700 }}>
                      {dosen.prodi_homebase}
                    </span>
                  )}
                  {dosen.jabatan_akademik && (
                    <span style={{ padding: "4px 12px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399", fontSize: "0.85rem", fontWeight: 700 }}>
                      {dosen.jabatan_akademik}
                    </span>
                  )}
                </div>

                {/* External ID Badges (SINTA, Scopus, Google Scholar, ORCID, WoS) */}
                {dosen.id_eksternal && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "0.25rem" }}>
                    {dosen.id_eksternal.sinta_id && (
                      <a
                        href={`https://sinta.kemdikbud.go.id/authors/profile/${dosen.id_eksternal.sinta_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn action-btn-primary"
                        style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                      >
                        SINTA ID: {dosen.id_eksternal.sinta_id}
                      </a>
                    )}
                    {dosen.id_eksternal.scopus_id && (
                      <a
                        href={`https://www.scopus.com/authid/detail.uri?authorId=${dosen.id_eksternal.scopus_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn action-btn-secondary"
                        style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                      >
                        Scopus ID
                      </a>
                    )}
                    {dosen.id_eksternal.google_scholar_id && (
                      <a
                        href={`https://scholar.google.com/citations?user=${dosen.id_eksternal.google_scholar_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn action-btn-secondary"
                        style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                      >
                        Google Scholar
                      </a>
                    )}
                    {dosen.id_eksternal.orcid_id && (
                      <a
                        href={`https://orcid.org/${dosen.id_eksternal.orcid_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn action-btn-secondary"
                        style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                      >
                        ORCID
                      </a>
                    )}
                    {dosen.id_eksternal.wos_id && (
                      <a
                        href={`https://www.webofscience.com/wos/author/record/${dosen.id_eksternal.wos_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn action-btn-secondary"
                        style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                      >
                        WoS ID
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Content Row */}
            <div style={{ padding: "3rem", display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}>
              
              {/* Profil & Data Diri Grid */}
              <div>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "white", borderBottom: "2px solid rgba(255,255,255,0.1)", paddingBottom: "10px", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px", color: "#ffc940" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm-3.75 7.5c0-.994.806-1.808 1.808-1.808h.134c.994 0 1.808.806 1.808 1.808v.125a.375.375 0 0 1-.375.375h-3a.375.375 0 0 1-.375-.375v-.125Z" />
                  </svg>
                  Data Diri Akademis
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem 2.5rem" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>NIDN</label>
                    <span style={{ fontSize: "1rem", color: "white", fontWeight: 600 }}>{dosen.nidn}</span>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Email</label>
                    <span style={{ fontSize: "1rem", color: "white", fontWeight: 600 }}>{dosen.email || "-"}</span>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Jenis Kelamin</label>
                    <span style={{ fontSize: "1rem", color: "white", fontWeight: 600 }}>{dosen.jenis_kelamin || "-"}</span>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Jenjang Pendidikan</label>
                    <span style={{ fontSize: "1rem", color: "white", fontWeight: 600 }}>{dosen.jenjang_pendidikan || "-"}</span>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Jabatan Akademik</label>
                    <span style={{ fontSize: "1rem", color: "white", fontWeight: 600 }}>{dosen.jabatan_akademik || "-"}</span>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Golongan</label>
                    <span style={{ fontSize: "1rem", color: "white", fontWeight: 600 }}>{dosen.golongan || "-"}</span>
                  </div>
                  {dosen.website_personal && (
                    <div>
                      <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Website Personal</label>
                      <a href={dosen.website_personal} target="_blank" rel="noopener noreferrer" style={{ color: "#ffc940", textDecoration: "none", fontWeight: 600 }}>
                        {dosen.website_personal}
                      </a>
                    </div>
                  )}
                  {dosen.unit_usaha?.is_aktif === 1 && (
                    <div>
                      <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Unit Usaha</label>
                      <span style={{ fontSize: "1rem", color: "#34d399", fontWeight: 600 }}>{dosen.unit_usaha.nama || "Aktif"}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Portofolio Tridharma Sections */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}>
                
                {/* Penelitian */}
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 1.25rem 0", color: "#ffc940", display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.037-.501.08-.75.129m0 0a2.25 2.25 0 0 0-1.928 2.015L6.5 8.75m3.25-5.517a48.108 48.108 0 0 1 6.5 0m-9.75 0V3m9.75 0v.104m0 0a2.25 2.25 0 0 1 1.928 2.015l.572 3.518m0 0a2.25 2.25 0 0 1-.659 1.591l-4.091 4.091" />
                    </svg>
                    Penelitian
                  </h3>
                  {renderTable<SippmPenelitian>(
                    ["Judul Penelitian", "Tahun Akademik", "Peran", "Sumber Dana & Mitra", "Bentuk Integrasi"],
                    dosen.portofolio?.penelitian,
                    (item, idx) => (
                      <tr key={idx}>
                        <td style={{ minWidth: "220px", fontWeight: 500 }}>{item.judul}</td>
                        <td>{item.tahun_akademik || "-"}</td>
                        <td>
                          {item.peran ? (
                            <span style={{ padding: "2px 8px", borderRadius: "6px", background: "rgba(240, 165, 0, 0.15)", color: "#ffc940", fontSize: "0.8rem", fontWeight: 600 }}>
                              {item.peran}
                            </span>
                          ) : "-"}
                        </td>
                        <td>
                          <div>{item.sumber_dana || "-"}</div>
                          {item.mitra && <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>Mitra: {item.mitra}</div>}
                        </td>
                        <td>
                          {item.bentuk_integrasi || item.mata_kuliah_integrasi ? (
                            <div>
                              <div>{item.bentuk_integrasi || "Integrasi Bahan Ajar"}</div>
                              {item.mata_kuliah_integrasi && <div style={{ fontSize: "0.78rem", color: "#64b5f6" }}>MK: {item.mata_kuliah_integrasi}</div>}
                              {item.link_integrasi && (
                                <a href={item.link_integrasi} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-secondary" style={{ padding: "2px 6px", fontSize: "0.75rem", marginTop: "4px" }}>
                                  Link Integrasi
                                </a>
                              )}
                            </div>
                          ) : "-"}
                        </td>
                      </tr>
                    )
                  )}
                </div>

                {/* Pengabdian Masyarakat */}
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 1.25rem 0", color: "#ffc940", display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    Pengabdian Masyarakat (PKM)
                  </h3>
                  {renderTable<SippmPengabdian>(
                    ["Judul Kegiatan PKM", "Tahun Akademik", "Peran", "Sumber Dana", "Mitra"],
                    dosen.portofolio?.pengabdian,
                    (item, idx) => (
                      <tr key={idx}>
                        <td style={{ minWidth: "200px", fontWeight: 500 }}>{item.judul}</td>
                        <td>{item.tahun_akademik || "-"}</td>
                        <td>
                          {item.peran ? (
                            <span style={{ padding: "2px 8px", borderRadius: "6px", background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc", fontSize: "0.8rem", fontWeight: 600 }}>
                              {item.peran}
                            </span>
                          ) : "-"}
                        </td>
                        <td>{item.sumber_dana || "-"}</td>
                        <td>{item.mitra || "-"}</td>
                      </tr>
                    )
                  )}
                </div>

                {/* Artikel Jurnal */}
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 1.25rem 0", color: "#ffc940", display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    Artikel Jurnal
                  </h3>
                  {renderTable<SippmArtikelJurnal>(
                    ["Judul Artikel", "Sumber / Akreditasi", "Jenis Publikasi", "ISSN & Issue", "Tanggal Terbit", "Tautan"],
                    dosen.portofolio?.artikel_jurnal,
                    (item, idx) => (
                      <tr key={idx}>
                        <td style={{ minWidth: "220px", fontWeight: 500 }}>{item.judul}</td>
                        <td>
                          {item.sumber_artikel ? (
                            <span style={{ padding: "2px 8px", borderRadius: "6px", background: "rgba(240, 165, 0, 0.15)", color: "#ffc940", fontSize: "0.8rem", fontWeight: 600 }}>
                              {item.sumber_artikel}
                            </span>
                          ) : "-"}
                        </td>
                        <td>{item.jenis_publikasi || "-"}</td>
                        <td style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
                          {item.p_issn && <div>p-ISSN: {item.p_issn}</div>}
                          {item.e_issn && <div>e-ISSN: {item.e_issn}</div>}
                          {item.issue && <div>{item.issue}</div>}
                          {!item.p_issn && !item.e_issn && !item.issue && "-"}
                        </td>
                        <td>{item.tanggal_terbit || "-"}</td>
                        <td>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {item.url_artikel && (
                              <a href={item.url_artikel} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-primary" style={{ padding: "3px 8px", fontSize: "0.78rem" }}>
                                Artikel
                              </a>
                            )}
                            {item.url_profil_jurnal && (
                              <a href={item.url_profil_jurnal} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-secondary" style={{ padding: "3px 8px", fontSize: "0.78rem" }}>
                                Profil Jurnal
                              </a>
                            )}
                            {!item.url_artikel && !item.url_profil_jurnal && <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>-</span>}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </div>

                {/* Artikel Prosiding */}
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 1.25rem 0", color: "#ffc940", display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Artikel Prosiding
                  </h3>
                  {renderTable<SippmArtikelProsiding>(
                    ["Judul Prosiding", "Sumber", "Jenis Publikasi", "Tanggal Terbit", "Tautan"],
                    dosen.portofolio?.artikel_prosiding,
                    (item, idx) => (
                      <tr key={idx}>
                        <td style={{ minWidth: "220px", fontWeight: 500 }}>{item.judul}</td>
                        <td>
                          {item.sumber_artikel ? (
                            <span style={{ padding: "2px 8px", borderRadius: "6px", background: "rgba(30, 136, 229, 0.15)", color: "#64b5f6", fontSize: "0.8rem", fontWeight: 600 }}>
                              {item.sumber_artikel}
                            </span>
                          ) : "-"}
                        </td>
                        <td>{item.jenis_publikasi || "-"}</td>
                        <td>{item.tanggal_terbit || "-"}</td>
                        <td>
                          {item.url_artikel ? (
                            <a href={item.url_artikel} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-primary" style={{ padding: "3px 8px", fontSize: "0.78rem" }}>
                              Prosiding
                            </a>
                          ) : "-"}
                        </td>
                      </tr>
                    )
                  )}
                </div>

                {/* Buku Karya Dosen */}
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 1.25rem 0", color: "#ffc940", display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    Buku Karya Dosen
                  </h3>
                  {renderTable<SippmBuku>(
                    ["Judul Buku", "Jenis Buku", "Peran", "Penerbit & Kota", "Tahun", "Tautan"],
                    dosen.portofolio?.buku,
                    (item, idx) => (
                      <tr key={idx}>
                        <td style={{ minWidth: "220px", fontWeight: 500 }}>{item.judul}</td>
                        <td>
                          {item.jenis_buku ? (
                            <span style={{ padding: "2px 8px", borderRadius: "6px", background: "rgba(240, 165, 0, 0.15)", color: "#ffc940", fontSize: "0.8rem", fontWeight: 600 }}>
                              {item.jenis_buku}
                            </span>
                          ) : "-"}
                        </td>
                        <td>{item.peran || "-"}</td>
                        <td>{item.nama_penerbit ? `${item.nama_penerbit}${item.kota_terbit ? ` (${item.kota_terbit})` : ''}` : "-"}</td>
                        <td>{item.tahun || "-"}</td>
                        <td>
                          {item.url ? (
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-primary" style={{ padding: "3px 8px", fontSize: "0.78rem" }}>
                              Tautan Buku
                            </a>
                          ) : "-"}
                        </td>
                      </tr>
                    )
                  )}
                </div>

                {/* HKI */}
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 1.25rem 0", color: "#ffc940", display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                    Hak Kekayaan Intelektual (HKI)
                  </h3>
                  {renderTable<SippmHki>(
                    ["Judul Karya HKI", "No. Sertifikat / Pencatatan", "Tanggal Pencatatan", "Status", "Tautan"],
                    dosen.portofolio?.hki,
                    (item, idx) => (
                      <tr key={idx}>
                        <td style={{ minWidth: "220px", fontWeight: 500 }}>{item.judul}</td>
                        <td style={{ fontSize: "0.85rem" }}>
                          {item.nomor_sertifikat && <div>Sertifikat: {item.nomor_sertifikat}</div>}
                          {item.nomor_pencatatan && <div>Pencatatan: {item.nomor_pencatatan}</div>}
                          {!item.nomor_sertifikat && !item.nomor_pencatatan && "-"}
                        </td>
                        <td>{item.tanggal_pencatatan || "-"}</td>
                        <td>
                          {item.status ? (
                            <span style={{ padding: "2px 8px", borderRadius: "6px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399", fontSize: "0.8rem", fontWeight: 600 }}>
                              {item.status}
                            </span>
                          ) : "-"}
                        </td>
                        <td>
                          {item.url ? (
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-primary" style={{ padding: "3px 8px", fontSize: "0.78rem" }}>
                              Sertifikat HKI
                            </a>
                          ) : "-"}
                        </td>
                      </tr>
                    )
                  )}
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
