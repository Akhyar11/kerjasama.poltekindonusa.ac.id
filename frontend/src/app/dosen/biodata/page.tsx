"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const ArrowRightOnRectangleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
  </svg>
);

const AcademicCapIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

const PhotoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

export default function BiodataDosenEditPage() {
  const router = useRouter();
  const [nidn, setNidn] = useState("");
  const [nama, setNama] = useState("");
  
  const [formData, setFormData] = useState({
    foto: "",
    keahlian: "",
    publikasi: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("dosen_token");
    const storedNidn = localStorage.getItem("dosen_nidn");
    const storedNama = localStorage.getItem("dosen_nama");

    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || "https://backend-web.poltekindonusa.ac.id/api").replace("/api", "");

    if (!token || !storedNidn) {
      window.location.href = `${backendUrl}/dosen/login`;
      return;
    }

    setNidn(storedNidn);
    setNama(storedNama || "");

    // Fetch existing biodata
    const fetchBiodata = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://backend-web.poltekindonusa.ac.id/api"}/biodata-dosens/${storedNidn}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            foto: data.foto || "",
            keahlian: data.keahlian || "",
            publikasi: data.publikasi || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch biodata", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBiodata();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("dosen_token");
    localStorage.removeItem("dosen_nidn");
    localStorage.removeItem("dosen_nama");
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || "https://backend-web.poltekindonusa.ac.id/api").replace("/api", "");
    window.location.href = `${backendUrl}/dosen/login`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://backend-web.poltekindonusa.ac.id/api"}/biodata-dosens/${nidn}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");
      
      setMessage({ type: "success", text: "Biodata berhasil disimpan!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-32">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <UserIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-lg">{nama}</h1>
              <p className="text-sm text-slate-500 font-medium">NIDN: {nidn}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 md:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">Edit Biodata</h2>
            <Link href="/biodata-dosen" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Lihat Profil Publik &rarr;
            </Link>
          </div>

          {message.text && (
            <div className={`mb-6 p-4 rounded-xl border font-medium ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
              
              {/* Foto URL */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <PhotoIcon className="w-5 h-5 mr-2 text-slate-400" />
                  URL Foto Profil
                </label>
                <input
                  type="text"
                  name="foto"
                  value={formData.foto}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                  placeholder="https://example.com/foto.jpg"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Masukkan URL gambar langsung atau biarkan kosong jika belum ada.
                </p>
              </div>

              {/* Keahlian */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <AcademicCapIcon className="w-5 h-5 mr-2 text-slate-400" />
                  Keahlian di Bidang
                </label>
                <textarea
                  name="keahlian"
                  value={formData.keahlian}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none resize-y"
                  placeholder="Contoh: Rekayasa Perangkat Lunak, Kecerdasan Buatan..."
                ></textarea>
              </div>

              {/* Publikasi */}
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                  <BookOpenIcon className="w-5 h-5 mr-2 text-slate-400" />
                  Daftar Publikasi Jurnal atau Buku
                </label>
                <textarea
                  name="publikasi"
                  value={formData.publikasi}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none resize-y"
                  placeholder="Contoh: 1. Judul Jurnal (Tahun) - Penerbit..."
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className={`px-8 py-3 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-500/30 transition-all ${
                    saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/40"
                  }`}
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
