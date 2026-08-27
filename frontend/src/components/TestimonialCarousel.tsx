"use client";

import { useState, useEffect, useCallback } from "react";
import { Testimonial } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

interface Props {
  testimonials: Testimonial[];
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    alumni_name: "Ahmad Fauzi",
    graduation_year: "Google Indonesia",
    message: "Politeknik Indonusa Surakarta memberikan bekal ilmu dan pengalaman yang luar biasa. Kurikulum berbasis industri membuat saya langsung siap kerja setelah lulus.",
    image: null,
  },
  {
    id: 2,
    alumni_name: "Siti Nurhaliza",
    graduation_year: "Bank Mandiri",
    message: "Dosen-dosen yang kompeten dan fasilitas yang modern membuat proses belajar sangat menyenangkan. Saya bangga menjadi alumni Polinus!",
    image: null,
  },
  {
    id: 3,
    alumni_name: "Rizky Pratama",
    graduation_year: "Tokopedia",
    message: "Program magang dan kerjasama industri yang kuat membantu saya mendapatkan pekerjaan impian bahkan sebelum wisuda. Terima kasih Polinus!",
    image: null,
  },
];

export default function TestimonialCarousel({ testimonials }: Props) {
  const items = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  // Potong ke kelipatan 3 agar semua slide punya jumlah card sama
  const trimmedItems = items.slice(0, Math.floor(items.length / 3) * 3 || 3);
  const chunkedItems: typeof items[] = [];
  for (let i = 0; i < trimmedItems.length; i += 3) {
    chunkedItems.push(trimmedItems.slice(i, i + 3));
  }

  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % chunkedItems.length);
  }, [current, chunkedItems.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + chunkedItems.length) % chunkedItems.length);
  }, [current, chunkedItems.length, goTo]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <section
      id="testimonials"
      style={{
        padding: "6rem 1.5rem",
        background: "linear-gradient(rgba(13, 36, 64, 0.88), rgba(26, 58, 92, 0.88)), url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-20%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "rgba(240, 165, 0, 0.06)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(42, 90, 140, 0.15)",
          filter: "blur(60px)",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "8px",
              background: "rgba(240, 165, 0, 0.15)",
              color: "#ffc940",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Testimonial Alumni
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            Kata <span style={{ color: "#f0a500" }}>Mereka</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            opacity: animating ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {chunkedItems[current].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--card)",
                opacity: 0.95,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--border)",
                borderRadius: "24px",
                padding: "2.5rem 2rem",
                textAlign: "center",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
                <div>
                  <div
                    style={{
                      fontSize: "3rem",
                      color: "rgba(240, 165, 0, 0.3)",
                      lineHeight: 1,
                      marginBottom: "1rem",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    &ldquo;
                  </div>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "var(--foreground)",
                      opacity: 0.9,
                      lineHeight: 1.6,
                      marginBottom: "1.5rem",
                      fontStyle: "italic",
                    }}
                  >
                    {item.message}
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #f0a500, #ffc940)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#0d2440",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      overflow: "hidden",
                    }}
                  >
                    {item.image ? (
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.alumni_name}
                        loading="lazy"
                        decoding="async"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.innerText = item.alumni_name.charAt(0);
                          }
                        }}
                      />
                    ) : (
                      item.alumni_name.charAt(0)
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text-heading)", fontSize: "0.95rem" }}>
                      {item.alumni_name}
                    </div>
                    {item.graduation_year && (
                      <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                        Bekerja di {item.graduation_year}
                      </div>
                    )}
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.5rem",
            marginTop: "2.5rem",
          }}
        >
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.06)",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div style={{ display: "flex", gap: "8px" }}>
            {chunkedItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to testimonial page ${idx + 1}`}
                style={{
                  width: current === idx ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "9999px",
                  border: "none",
                  background: current === idx ? "#f0a500" : "rgba(255, 255, 255, 0.25)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.06)",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
