"use client";

import { Partnership } from "@/lib/types";
import { getImageUrl } from "@/lib/api";
import Image from "next/image";

interface Props {
  partnerships: Partnership[];
}

const fallbackPartners: Partnership[] = [
  { id: 1, name: "Pertamina", logo: "" },
  { id: 2, name: "Telkom Indonesia", logo: "" },
  { id: 3, name: "Bank BRI", logo: "" },
  { id: 4, name: "Toyota Astra", logo: "" },
  { id: 5, name: "Kimia Farma", logo: "" },
  { id: 6, name: "RS Dr. Moewardi", logo: "" },
];

export default function PartnershipCarousel({ partnerships }: Props) {
  const items = partnerships.length > 0 ? partnerships : fallbackPartners;
  const duplicated = [...items, ...items];

  return (
    <section id="partnerships" style={{ padding: "5rem 1.5rem", background: "#ffffff", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: "8px", background: "rgba(240, 165, 0, 0.15)", color: "#c08400", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>
          Mitra Kerjasama
        </div>
        <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>
          Mitra <span style={{ color: "#f0a500" }}>Industri</span>
        </h2>
      </div>
      <div style={{ maskImage: "linear-gradient(to right,transparent,black 10%,black 90%,transparent)", WebkitMaskImage: "linear-gradient(to right,transparent,black 10%,black 90%,transparent)", overflow: "hidden" }}>
        <div className="animate-marquee" style={{ display: "flex", gap: "3rem", width: "max-content", alignItems: "center" }}>
          {duplicated.map((p, i) => (
            <div key={`${p.id}-${i}`} style={{ flexShrink: 0, width: "160px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              {p.logo ? (
                <Image 
                  src={getImageUrl(p.logo)} 
                  alt={p.name} 
                  fill
                  sizes="160px"
                  style={{ objectFit: "contain", mixBlendMode: "multiply" }} 
                />
              ) : (
                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#64748b", textAlign: "center" }}>{p.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
