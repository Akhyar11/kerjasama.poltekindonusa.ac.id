"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { UpcomingEvent } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

interface Props {
  events: UpcomingEvent[];
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "13,36,64";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

function getCountdown(datetime: string): TimeLeft | null {
  const diff = new Date(datetime).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <div style={{
        position: "relative",
        width: "clamp(56px, 14vw, 82px)",
        height: "clamp(56px, 14vw, 82px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "14px",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: "10%",
          width: "80%", height: "45%",
          borderRadius: "14px 14px 50% 50%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.10), transparent)",
          pointerEvents: "none",
        }} />
        <span style={{
          position: "relative",
          fontSize: "clamp(1.3rem, 4vw, 2rem)",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.5px",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}>
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span style={{
        fontSize: "clamp(0.55rem, 1.5vw, 0.62rem)",
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.6)",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </div>
  );
}

export default function UpcomingEventsCarousel({ events }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<(TimeLeft | null)[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const update = () => {
      setTimeLeft(events.map((e) => getCountdown(e.event_datetime)));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [events]);

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsTransitioning(false);
    }, 280);
  }, [isTransitioning]);

  const handleNext = () => goTo((currentIndex + 1) % events.length);
  const handlePrev = () => goTo((currentIndex - 1 + events.length) % events.length);

  if (!events || events.length === 0) return null;

  const event = events[currentIndex];
  const time = timeLeft[currentIndex];
  const bgBase = event.bg_color || "#1a2a4a";
  const rgb = hexToRgb(bgBase);

  const sectionBgImage = event.section_bg_image ? getImageUrl(event.section_bg_image) : null;
  const cardBgImage = event.card_bg_image ? getImageUrl(event.card_bg_image) : null;
  const flyerImage = event.flyer_image ? getImageUrl(event.flyer_image) : null;

  const eventDate = new Date(event.event_datetime);
  const dateStr = eventDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const timeStr = eventDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: sectionBgImage
          ? `#000`
          : `linear-gradient(135deg, ${bgBase} 0%, rgba(${rgb},0.75) 50%, ${bgBase} 100%)`,
        transition: "background 0.8s ease",
      }}
    >
      {/* Section background image */}
      {sectionBgImage && (
        <>
          <Image
            src={sectionBgImage}
            alt="Event background"
            fill
            style={{ objectFit: "cover", zIndex: 0 }}
          />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.55)" }} />
        </>
      )}

      {/* Decorative overlays (only if no bg image) */}
      {!sectionBgImage && (
        <>
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 20% 0%, rgba(255,255,255,0.07) 0%, transparent 70%),
              radial-gradient(ellipse 60% 40% at 80% 100%, rgba(255,255,255,0.05) 0%, transparent 70%)
            `,
          }} />
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />
          <div style={{
            position: "absolute", top: "-15%", right: "-10%", zIndex: 0,
            width: "500px", height: "500px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
            filter: "blur(50px)",
          }} />
          <div style={{
            position: "absolute", bottom: "-20%", left: "-8%", zIndex: 0,
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }} />
        </>
      )}

      {/* Glow lines */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />

      {/* MAIN CONTENT */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: "1200px", margin: "0 auto", padding: "clamp(2.5rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem)" }}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(1.5rem, 4vw, 2.5rem)", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "1px" }}>
                Jangan Sampai Terlewat
              </p>
              <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>
                Event Mendatang
              </h2>
            </div>
          </div>

          {events.length > 1 && (
            <div style={{ display: "flex", gap: "8px" }}>
              {[handlePrev, handleNext].map((fn, i) => (
                <button
                  key={i}
                  onClick={fn}
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s", backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={i === 0 ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CARD */}
        <div
          className="event-card-outer"
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "translateY(6px) scale(0.99)" : "translateY(0) scale(1)",
            transition: "opacity 0.28s ease, transform 0.28s ease",
          }}
        >
          {/* Card background image */}
          {cardBgImage && (
            <>
              <Image src={cardBgImage} alt="Card background" fill style={{ objectFit: "cover", zIndex: 0 }} />
              <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }} />
            </>
          )}

          {/* Card fallback glass */}
          {!cardBgImage && (
            <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)" }} />
          )}

          {/* Card inner grid: [info] [flyer?] | [countdown] */}
          <div className="event-card-grid" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>

            {/* LEFT PANEL: Info + Countdown stacked on mobile */}
            <div style={{ padding: "clamp(1.25rem, 4vw, 2.5rem)", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {/* Prodi badge */}
              {event.study_program && (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  padding: "5px 14px", borderRadius: "9999px", width: "fit-content",
                  background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.9)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                  {event.study_program.name}
                </span>
              )}

              {/* Title — clamped to prevent overflow */}
              <h3 style={{
                fontSize: "clamp(1.4rem, 4vw, 2.6rem)",
                fontWeight: 900, color: "#fff",
                lineHeight: 1.15, letterSpacing: "-0.5px",
                textShadow: "0 3px 16px rgba(0,0,0,0.25)",
                margin: 0,
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}>
                {event.title}
              </h3>

              {/* Date/time */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px", flexWrap: "wrap",
                padding: "7px 14px", borderRadius: "10px", width: "fit-content",
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.8)", fontSize: "0.78rem", fontWeight: 600,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span style={{ wordBreak: "break-word" }}>{dateStr} · {timeStr}</span>
              </div>

              {/* Description */}
              {event.description && (
                <p style={{
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  color: "rgba(255,255,255,0.72)", lineHeight: 1.7, margin: 0,
                  wordBreak: "break-word", overflowWrap: "break-word",
                }}>
                  {event.description}
                </p>
              )}

              {/* Flyer image — shown only on mobile (inside left panel), hidden on desktop (shown in right panel) */}
              {flyerImage && (
                <div className="flyer-mobile-only" style={{ borderRadius: "14px", overflow: "hidden", position: "relative", aspectRatio: "4/5", maxWidth: "260px", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 12px 32px rgba(0,0,0,0.3)" }}>
                  <Image src={flyerImage} alt={`Flyer ${event.title}`} fill style={{ objectFit: "cover" }} />
                </div>
              )}

              {/* Countdown — on mobile it sits here below description */}
              <div className="countdown-mobile" style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem", textAlign: "center" }}>
                  — Event Dimulai Dalam —
                </p>
                {time ? (
                  <div style={{ display: "flex", gap: "clamp(6px, 2vw, 14px)", alignItems: "flex-start", justifyContent: "center", flexWrap: "nowrap" }}>
                    <CountdownBox value={time.days} label="Hari" />
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(1rem, 3vw, 1.6rem)", fontWeight: 900, alignSelf: "center", marginTop: "-10px" }}>:</span>
                    <CountdownBox value={time.hours} label="Jam" />
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(1rem, 3vw, 1.6rem)", fontWeight: 900, alignSelf: "center", marginTop: "-10px" }}>:</span>
                    <CountdownBox value={time.minutes} label="Menit" />
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(1rem, 3vw, 1.6rem)", fontWeight: 900, alignSelf: "center", marginTop: "-10px" }}>:</span>
                    <CountdownBox value={time.seconds} label="Detik" />
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", padding: "16px 24px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "16px", backdropFilter: "blur(8px)" }}>
                    <span style={{ fontSize: "1.6rem" }}>🎉</span>
                    <p style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem", margin: 0, textAlign: "center" }}>Event Sedang Berlangsung!</p>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.7)", animation: "ue-pulse 2s infinite" }} />
                </div>
              </div>

              {/* Read more button */}
              {event.link_url && (
                <a
                  href={event.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    padding: "11px 24px", background: "#fff", color: bgBase,
                    fontWeight: 800, fontSize: "0.88rem", borderRadius: "12px",
                    textDecoration: "none", width: "fit-content",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.25)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)"; }}
                >
                  Selengkapnya
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              )}
            </div>

            {/* RIGHT PANEL: Flyer (desktop) + Countdown (desktop) — hidden on mobile */}
            <div className="event-right-panel" style={{
              display: "none",
              flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "1.5rem",
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
            }}>
              {/* Flyer image on desktop */}
              {flyerImage && (
                <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative", width: "100%", maxWidth: "260px", aspectRatio: "4/5", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 16px 40px rgba(0,0,0,0.35)", flexShrink: 0 }}>
                  <Image src={flyerImage} alt={`Flyer ${event.title}`} fill style={{ objectFit: "cover" }} />
                </div>
              )}

              {/* Countdown on desktop */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "100%" }}>
                <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textAlign: "center", margin: 0 }}>
                  — Event Dimulai Dalam —
                </p>
                {time ? (
                  <div style={{ display: "flex", gap: "clamp(6px, 1.5vw, 14px)", alignItems: "flex-start", flexWrap: "nowrap" }}>
                    <CountdownBox value={time.days} label="Hari" />
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(1rem, 2vw, 1.6rem)", fontWeight: 900, alignSelf: "center", marginTop: "-10px" }}>:</span>
                    <CountdownBox value={time.hours} label="Jam" />
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(1rem, 2vw, 1.6rem)", fontWeight: 900, alignSelf: "center", marginTop: "-10px" }}>:</span>
                    <CountdownBox value={time.minutes} label="Menit" />
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(1rem, 2vw, 1.6rem)", fontWeight: 900, alignSelf: "center", marginTop: "-10px" }}>:</span>
                    <CountdownBox value={time.seconds} label="Detik" />
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", padding: "16px 24px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "16px", backdropFilter: "blur(8px)" }}>
                    <span style={{ fontSize: "1.6rem" }}>🎉</span>
                    <p style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem", margin: 0, textAlign: "center" }}>Event Sedang Berlangsung!</p>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.7)", animation: "ue-pulse 2s infinite" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        {events.length > 1 && (
          <div style={{ display: "flex", gap: "7px", justifyContent: "center", marginTop: "1.5rem" }}>
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                style={{
                  height: "5px",
                  width: idx === currentIndex ? "28px" : "5px",
                  borderRadius: "9999px",
                  background: idx === currentIndex ? "#fff" : "rgba(255,255,255,0.3)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.3s ease",
                  boxShadow: idx === currentIndex ? "0 0 10px rgba(255,255,255,0.5)" : "none",
                }}
                aria-label={`Go to event ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        /* Desktop: 2-column card layout, show right panel, hide mobile countdown */
        @media (min-width: 768px) {
          .event-card-grid {
            grid-template-columns: 1.2fr 1fr !important;
          }
          .event-right-panel {
            display: flex !important;
          }
          .countdown-mobile {
            display: none !important;
          }
          .flyer-mobile-only {
            display: none !important;
          }
        }
        @keyframes ue-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.5); }
          70%  { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
      `}</style>
    </section>
  );
}
