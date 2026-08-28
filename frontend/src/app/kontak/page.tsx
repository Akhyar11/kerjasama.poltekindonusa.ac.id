import { fetchAPI } from "@/lib/api";
import { Settings } from "@/lib/types";
import Reveal from "@/components/Reveal";
import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import { HeroSlider } from "@/lib/types";

export const metadata: Metadata = {
  title: "Kontak | Politeknik Indonusa Surakarta",
  description: "Hubungi Politeknik Indonusa Surakarta untuk informasi pendaftaran, kerja sama, dan layanan lainnya.",
};

async function getSettings(): Promise<Settings> {
  try {
    const settings = await fetchAPI<Settings>("/settings");
    return settings || {};
  } catch {
    return {};
  }
}

async function getHeroSliders(): Promise<HeroSlider[]> {
  try {
    return await fetchAPI<HeroSlider[]>("/hero-sliders");
  } catch {
    return [];
  }
}

export default async function KontakPage() {
  const [settings, sliders] = await Promise.all([
    getSettings(),
    getHeroSliders(),
  ]);

  const email = settings.contact_email || "info@poltekindonusa.ac.id";
  const phone = settings.contact_phone || "(0271) 728888"; // default Indonusa
  const whatsappNumber = settings.whatsapp_number || "6281234567890";
  const whatsappText = settings.whatsapp_text || "Halo, saya ingin bertanya mengenai Politeknik Indonusa.";
  const address = settings.address || "Jl. KH. Samanhudi No. 47, Purwosari, Laweyan, Kota Surakarta, Jawa Tengah 57142";
  const instagram = settings.instagram_url || "https://instagram.com/poltekindonusa";
  
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div style={{ position: "relative", overflow: "hidden", paddingBottom: "6rem", background: "var(--background)", minHeight: "100vh" }}>
      
      {/* Decorative Background Orbs */}
      <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(240,165,0,0.05) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }} />

      {/* Hero Header */}
      <HeroSection sliders={sliders} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 2 }}>
        <style>{`
          @media (max-width: 768px) {
            .contact-layout { flex-direction: column !important; }
            .contact-info, .contact-map { width: 100% !important; }
          }
          .contact-card {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
            padding: 1.5rem;
            border-radius: 16px;
            background: rgba(255,255,255,0.02);
            border: 1px solid var(--border);
            transition: all 0.3s ease;
          }
          .contact-card:hover {
            background: rgba(255,255,255,0.05);
            transform: translateX(5px);
            border-color: rgba(0, 162, 232, 0.3);
          }
          .contact-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          }
        `}</style>
        
        <div className="contact-layout" style={{ display: "flex", gap: "2.5rem" }}>
          
          {/* Kolom Kiri: Informasi Kontak */}
          <div className="contact-info" style={{ width: "40%", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Reveal delay={0.1}>
              <div className="contact-card">
                <div className="contact-icon" style={{ background: "linear-gradient(135deg, #00a2e8, #0077b6)", boxShadow: "0 5px 15px rgba(0,162,232,0.3)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.5rem", color: "var(--foreground)" }}>Alamat Kampus</h3>
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{address}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="contact-card">
                <div className="contact-icon" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 5px 15px rgba(37,211,102,0.3)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.5rem", color: "var(--foreground)" }}>Telepon & WhatsApp</h3>
                  <p style={{ margin: "0 0 0.25rem", fontSize: "0.95rem", color: "var(--muted-foreground)" }}>Telp: <strong>{phone}</strong></p>
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--muted-foreground)" }}>WA: <strong>+{whatsappNumber}</strong></p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="contact-card">
                <div className="contact-icon" style={{ background: "linear-gradient(135deg, #f0a500, #c08400)", boxShadow: "0 5px 15px rgba(240,165,0,0.3)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.5rem", color: "var(--foreground)" }}>Alamat Email</h3>
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{email}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div style={{ marginTop: "1rem" }}>
                <style>{`
                  .wa-btn-hover {
                    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
                  }
                  .wa-btn-hover:hover {
                    transform: translateY(-3px) !important;
                    box-shadow: 0 12px 25px rgba(0,0,0,0.15) !important;
                  }
                `}</style>
                <a 
                  href={waUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="wa-btn-hover"
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: "0.75rem",
                    width: "100%",
                    padding: "1rem", 
                    background: "var(--foreground)", 
                    color: "var(--background)", 
                    borderRadius: "12px", 
                    textDecoration: "none", 
                    fontWeight: 700,
                    fontSize: "1rem"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  Tanya Sekarang (WhatsApp)
                </a>
              </div>
            </Reveal>
          </div>

          {/* Kolom Kanan: Google Maps */}
          <div className="contact-map" style={{ width: "60%" }}>
            <Reveal delay={0.2}>
              <div style={{ 
                background: "var(--card)", 
                borderRadius: "20px", 
                border: "1px solid var(--border)", 
                boxShadow: "0 15px 40px rgba(0,0,0,0.04)", 
                overflow: "hidden", 
                height: "100%", 
                minHeight: "400px",
                position: "relative"
              }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.1278142828695!2d110.7968595152542!3d-7.560980994547072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1670da72722d%3A0xc6c7d3be62ec4281!2sPoliteknik%20Indonusa%20Surakarta!5e0!3m2!1sid!2sid!4v1689230582098!5m2!1sid!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, position: "absolute", inset: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </div>
  );
}
