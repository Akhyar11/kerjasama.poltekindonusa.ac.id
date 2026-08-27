"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HeroSlider } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

interface HeroSectionProps {
  sliders: HeroSlider[];
}

export default function HeroSection({ sliders }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (sliders.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [sliders.length]);

  if (!sliders || sliders.length === 0) return null;

  const slide = sliders[currentSlide];
  const imageUrl = getImageUrl(slide.image);

  return (
    <section
      id="hero-section"
      className="hero-section"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "var(--hero-bg, #0d2440)",
        transition: "all 1s ease",
      }}
    >
      {/* Background Images with Overlay */}
      {sliders.map((s, idx) => {
        const bgUrl = getImageUrl(s.image);
        return (
          <div
            key={s.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: currentSlide === idx ? 1 : 0,
              transition: "opacity 1s ease",
              zIndex: 1,
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={bgUrl}
                alt={s.title || "Hero Banner"}
                fill
                priority={idx === 0}
                className="hero-bg-img"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              {s.show_overlay && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(rgba(13, 36, 64, 0.7), rgba(13, 36, 64, 0.8))",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: slide.show_overlay ? "rgba(240, 165, 0, 0.08)" : "transparent",
          filter: "blur(80px)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        key={currentSlide}
        className="animate-fade-in-up hero-content"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: "800px",
          padding: "0 2rem",
          width: "100%",
        }}
      >
        {slide.show_title ? (
          <>
            <div
              style={{
                display: "inline-block",
                padding: "6px 20px",
                borderRadius: "9999px",
                background: "rgba(240, 165, 0, 0.15)",
                border: "1px solid rgba(240, 165, 0, 0.3)",
                color: "#ffc940",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              {slide.subtitle}
            </div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 900,
                color: "white",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                letterSpacing: "-1px",
                textShadow: slide.show_overlay ? "none" : "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              {slide.title}
            </h1>
          </>
        ) : null}

        {slide.button_text ? (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={slide.button_url || "#"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                background: "linear-gradient(135deg, #f0a500, #ffc940)",
                color: "#0d2440",
                fontWeight: 700,
                fontSize: "0.95rem",
                borderRadius: "14px",
                textDecoration: "none",
                boxShadow: "0 8px 30px rgba(240, 165, 0, 0.35)",
                transition: "all 0.3s ease",
              }}
            >
              {slide.button_text}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        ) : null}
      </div>

      {/* Slide indicators */}
      {sliders.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            zIndex: 10,
          }}
        >
          {sliders.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? "32px" : "10px",
                height: "10px",
                borderRadius: "9999px",
                border: "none",
                background:
                  currentSlide === idx
                    ? "#f0a500"
                    : "rgba(255, 255, 255, 0.35)",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      )}

    </section>
  );
}

