import { fetchAPI } from "@/lib/api";
import { Settings } from "@/lib/types";

export default async function FloatingWhatsApp() {
  let settings: Settings | null = null;
  try {
    settings = await fetchAPI<Settings>("/settings");
  } catch (error: any) {
    console.warn("Failed to fetch settings for WhatsApp: " + (error.message || error));
  }

  const phone = settings?.whatsapp_number;
  if (!phone) return null;

  // Clean the number
  const cleanPhone = phone.replace(/\D/g, "");
  const text = settings?.whatsapp_text || "Halo, saya ingin bertanya.";
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "60px",
        height: "60px",
        backgroundColor: "#25d366",
        color: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        zIndex: 1000,
        transition: "transform 0.2s",
      }}
      className="hover:scale-110"
      aria-label="Chat WhatsApp"
    >
      <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    </a>
  );
}
