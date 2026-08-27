"use client";

import Link from "next/link";
import { Settings, StudyProgram } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

interface FooterClientProps {
  settings: Settings;
  programs?: StudyProgram[];
}

const fallbackPrograms = [
  { name: "Teknologi Rekayasa Otomotif", slug: "teknologi-rekayasa-otomotif" },
  { name: "Teknologi Rekayasa Perangkat Lunak", slug: "teknologi-rekayasa-perangkat-lunak" },
  { name: "Produksi Media", slug: "produksi-media" },
  { name: "Bisnis Manajemen Ritel", slug: "bisnis-manajemen-ritel" },
  { name: "Akuntansi Perpajakan", slug: "akuntansi-perpajakan" },
  { name: "Perhotelan", slug: "perhotelan" },
  { name: "Farmasi", slug: "farmasi" },
  { name: "Manajemen Informasi Kesehatan", slug: "manajemen-informasi-kesehatan" },
  { name: "Teknologi Laboratorium Medis", slug: "teknologi-laboratorium-medis" }
];

export default function FooterClient({ settings, programs = [] }: FooterClientProps) {
  const displayPrograms = programs.length > 0 ? programs : fallbackPrograms as StudyProgram[];

  const logoSrc = settings.site_logo
    ? settings.site_logo.startsWith("http")
      ? settings.site_logo
      : getImageUrl(settings.site_logo)
    : null;

  return (
    <footer style={{ background: "var(--footer-bg)", color: "rgba(255, 255, 255, 0.6)", position: "relative", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt="Logo"
                    loading="lazy"
                    decoding="async"
                    style={{ height: "60px", width: "auto" }}
                  />
                ) : (
                  <>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "linear-gradient(135deg, #f0a500, #c08400)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: "1.2rem" }}>PI</div>
                    <div>
                      <div style={{ fontWeight: 800, color: "white", fontSize: "1rem", lineHeight: 1.2 }}>
                        Politeknik<br />Indonusa
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.5)", letterSpacing: "2px", textTransform: "uppercase", marginTop: "2px" }}>
                        Surakarta
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.5rem", color: "rgba(255, 255, 255, 0.7)" }}>
              {settings.meta_description || "Membangun keunggulan melalui pendidikan vokasi berkualitas dan kerjasama industri yang kuat."}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                {
                  key: 'facebook_url',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  )
                },
                {
                  key: 'instagram_url',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )
                },
                {
                  key: 'youtube_url',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                    </svg>
                  )
                },
                {
                  key: 'tiktok_url',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  )
                }
              ].map((social) => {
                const url = settings[social.key];
                if (!url) return null;

                return (
                  <a
                    key={social.key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255, 255, 255, 0.6)",
                      textDecoration: "none",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {social.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 style={{ fontWeight: 700, color: "white", fontSize: "0.95rem", marginBottom: "1.5rem", letterSpacing: "0.5px" }}>Program Studi</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
              {displayPrograms.map((p) => (
                <Link key={p.name} href={`/program-studi/${p.slug}`} style={{ color: "rgba(255, 255, 255, 0.6)", textDecoration: "none", fontSize: "0.82rem", transition: "all 0.2s" }}>
                  {p.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontWeight: 700, color: "white", fontSize: "0.95rem", marginBottom: "1.5rem", letterSpacing: "0.5px" }}>Tautan Cepat</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
              {[
                { label: "Berita", href: "/berita" },
                { label: "Download", href: "/download" },
                { label: "Layanan Pengaduan", href: "/layanan-pengaduan-online" },
                { label: "Visi Misi", href: "/visi-misi-tujuan" },
                { label: "Akreditasi", href: "/akreditasi" }
              ].map((link) => (
                <Link key={link.label} href={link.href} style={{ color: "rgba(255, 255, 255, 0.6)", textDecoration: "none", fontSize: "0.82rem", transition: "all 0.2s" }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, color: "white", fontSize: "0.95rem", marginBottom: "1.5rem", letterSpacing: "0.5px" }}>Kontak Kami</h4>
            <div style={{ fontSize: "0.82rem", display: "flex", flexDirection: "column", gap: "15px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.1rem", opacity: 0.7, marginTop: "2px", flexShrink: 0 }}>📍</span>
                <div style={{ lineHeight: 1.6 }}>
                  {settings.contact_location ? (
                    <span style={{ whiteSpace: "pre-line" }}>{settings.contact_location}</span>
                  ) : (
                    <>
                      <div style={{ marginBottom: "0.75rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#f0a500", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "3px" }}>Kampus 1</span>
                        <span style={{ display: "block" }}>Jl. KH. Samanhudi No. 31 Bumi,</span>
                        <span style={{ display: "block" }}>Laweyan, Kota Surakarta,</span>
                        <span style={{ display: "block" }}>Jawa Tengah 57142</span>
                      </div>
                      <div>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#f0a500", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "3px" }}>Kampus 2</span>
                        <span style={{ display: "block" }}>Jl. Palem No. 8 Cemani,</span>
                        <span style={{ display: "block" }}>Grogol, Sukoharjo,</span>
                        <span style={{ display: "block" }}>Jawa Tengah 57552</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "1.1rem", opacity: 0.7 }}>📞</span>
                <span>{settings.contact_phone || "(0271) 123456"}</span>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "1.1rem", opacity: 0.7 }}>📧</span>
                <span style={{ color: "#f0a500", fontWeight: 600 }}>{settings.contact_email || "info@poltekindonusa.ac.id"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)" }}>
            &copy; {new Date().getFullYear()} {settings.site_name || "Politeknik Indonusa Surakarta"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
