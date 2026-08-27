"use client";

import { DirectorGreeting as DirectorGreetingType } from "@/lib/types";
import { getImageUrl } from "@/lib/api";
import Image from "next/image";

interface Props {
  greeting: DirectorGreetingType | null;
}

export default function DirectorGreeting({ greeting }: Props) {
  if (!greeting) return null;

  return (
    <section
      id="about"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--section-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(26, 58, 92, 0.05) 0%, transparent 70%)",
          zIndex: 1
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(240, 165, 0, 0.05) 0%, transparent 70%)",
          zIndex: 1
        }}
      />

      {/* Pattern Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.03,
        backgroundImage: `radial-gradient(var(--foreground) 0.5px, transparent 0.5px)`,
        backgroundSize: "24px 24px",
        zIndex: 1
      }} />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 2
        }}
        className="greeting-grid"
      >
        {/* Image Container */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
            {/* Background decorative frame */}
            <div style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              right: "-20px",
              bottom: "-20px",
              border: "2px solid rgba(240, 165, 0, 0.2)",
              borderRadius: "30px",
              zIndex: 1
            }} />

            <div style={{
              position: "relative",
              borderRadius: "30px",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              aspectRatio: "4/5",
              zIndex: 2,
              background: "var(--card)"
            }}>
              <Image
                src={getImageUrl(greeting.image)}
                alt={greeting.name}
                fill
                style={{
                  objectFit: "cover",
                }}
              />

              {/* Badge */}
              <div style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                background: "linear-gradient(to top, rgba(13, 36, 64, 0.9), transparent)",
                padding: "2rem 1.5rem 1.5rem",
                color: "white"
              }}>
                <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "4px" }}>{greeting.name}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)", letterSpacing: "0.5px" }}>{greeting.position}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            top: "-40px",
            left: "-20px",
            fontSize: "8rem",
            color: "rgba(240, 165, 0, 0.1)",
            fontFamily: "serif",
            lineHeight: 1,
            zIndex: -1
          }}>
            &ldquo;
          </div>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "12px",
            background: "rgba(240, 165, 0, 0.1)",
            color: "var(--accent-dark)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: "1.5rem"
          }}>
            <span style={{ width: "20px", height: "1px", background: "currentColor" }} />
            Sambutan Direktur
          </div>

          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 900,
            color: "var(--foreground)",
            lineHeight: 1.1,
            marginBottom: "2rem",
            letterSpacing: "-1px"
          }}>
            Dedikasi Untuk <br />
            <span style={{ color: "#f0a500" }}>Masa Depan Bangsa</span>
          </h2>

          <div style={{
            fontSize: "1.1rem",
            color: "var(--text-main)",
            lineHeight: 1.8,
            fontStyle: "italic"
          }}>
            <p>
              {greeting.message ||
                "Politeknik Indonusa Surakarta berkomitmen untuk mencetak lulusan yang berkualitas, berkarakter, dan siap bersaing di era global. Dengan kurikulum berbasis industri dan fasilitas modern, kami menyiapkan mahasiswa untuk menjadi profesional yang unggul."
              }
            </p>
          </div>

          <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "40px", height: "2px", background: "#f0a500" }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .greeting-grid {
            grid-template-columns: 320px 1fr !important;
          }
        }
        @media (min-width: 992px) {
          .greeting-grid {
            grid-template-columns: 380px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
