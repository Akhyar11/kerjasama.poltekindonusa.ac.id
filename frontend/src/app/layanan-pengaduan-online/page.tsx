"use client";

import { useState } from "react";

export default function PengaduanPage() {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message });
        setFormData({ name: "", status: "", email: "", message: "" });
      } else {
        setStatus({ type: 'error', message: result.message || "Gagal mengirim pengaduan." });
      }
    } catch (error) {
      setStatus({ type: 'error', message: "Terjadi kesalahan koneksi." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section style={{ padding: "4rem 1.5rem 5rem", background: "linear-gradient(135deg, #0d2440, #1a3a5c)", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", padding: "8px 20px", borderRadius: "10px", background: "rgba(240,165,0,0.15)", color: "#ffc940", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1.5rem", border: "1px solid rgba(240,165,0,0.3)" }}>Layanan Publik</div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, color: "white", marginBottom: "1rem", lineHeight: 1.1 }}>Pengaduan Online</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>Sampaikan aspirasi, saran, atau pengaduan Anda untuk perbaikan Politeknik Indonusa Surakarta yang lebih baik.</p>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "var(--section-bg, #f8fafc)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ background: "var(--card, white)", padding: "2.5rem", borderRadius: "24px", border: "1px solid var(--border, #e2e8f0)", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
            {status && (
              <div style={{ 
                padding: "1rem 1.5rem", 
                borderRadius: "12px", 
                marginBottom: "2rem",
                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: status.type === 'success' ? '#10b981' : '#ef4444',
                border: `1px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`,
                fontSize: "0.95rem",
                fontWeight: 500
              }}>
                {status.type === 'success' ? '✅' : '❌'} {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "8px" }}>Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama lengkap Anda"
                  style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: "0.95rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "8px" }}>Status</label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: "0.95rem", outline: "none" }}
                >
                  <option value="" style={{ background: "var(--card)", color: "var(--foreground)" }}>Pilih Status</option>
                  <option value="dosen" style={{ background: "var(--card)", color: "var(--foreground)" }}>Dosen</option>
                  <option value="tendik" style={{ background: "var(--card)", color: "var(--foreground)" }}>Tendik</option>
                  <option value="mahasiswa" style={{ background: "var(--card)", color: "var(--foreground)" }}>Mahasiswa</option>
                  <option value="orang tua/wali" style={{ background: "var(--card)", color: "var(--foreground)" }}>Orang Tua/Wali</option>
                  <option value="mitra" style={{ background: "var(--card)", color: "var(--foreground)" }}>Mitra</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "8px" }}>Email (Opsional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@contoh.com (untuk balasan)"
                  style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: "0.95rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "8px" }}>Saran / Masukan</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan saran atau pengaduan Anda di sini..."
                  style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: "0.95rem", outline: "none", resize: "vertical" }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #1a3a5c, #2a5a8c)",
                  color: "white",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                  opacity: isSubmitting ? 0.7 : 1,
                  boxShadow: "0 8px 25px rgba(26, 58, 92, 0.25)"
                }}
              >
                {isSubmitting ? "Mengirim..." : "Kirim Pengaduan"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
