"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { getImageUrl } from "@/lib/api";
import { MenuItem, Settings } from "@/lib/types";

interface NavbarClientProps {
  menuItems: MenuItem[];
  settings: Settings;
}

export default function NavbarClient({ menuItems, settings }: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<Record<string, boolean>>({});

  const toggleMobileSubmenu = (key: string) => {
    setMobileSubmenuOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Script
        id="google-translate-script"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
      <Script id="google-translate-init" strategy="lazyOnload">
        {`
          function googleTranslateElementInit() {
            if (!window.google?.translate) return;
            new window.google.translate.TranslateElement({
              pageLanguage: 'id',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
          }
        `}
      </Script>
      <style>{`
        #google_translate_element {
          position: absolute;
          width: 0px;
          height: 0px;
          overflow: hidden;
          opacity: 0;
        }
        .skiptranslate iframe {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        .dropdown-item-wrapper {
          position: relative;
        }
        .sub-dropdown-menu {
          position: absolute;
          top: 0;
          left: 100%;
          padding-left: 8px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translateX(10px);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1001;
        }
        .dropdown-item-wrapper:hover .sub-dropdown-menu {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(0);
        }
        .dropdown-link-item {
          transition: all 0.2s ease;
        }
        .dropdown-link-item:hover {
          background-color: var(--muted) !important;
          color: var(--primary-light) !important;
        }
        .search-modal-form {
          display: flex;
          gap: 12px;
          flex-direction: row;
        }
        @media (max-width: 640px) {
          .search-modal-form {
            flex-direction: column !important;
          }
          .search-modal-form button {
            padding: 12px 2rem !important;
            width: 100% !important;
            height: 48px !important;
          }
        }
      `}</style>

    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: "linear-gradient(135deg, rgba(26, 58, 92, 0.8) 0%, rgba(42, 90, 140, 0.8) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
        borderBottom: "1px solid #ffffff",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: "#f0a500",
          padding: "6px 0",
          fontSize: "0.75rem",
          color: "#0d2440",
          fontWeight: 600,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left: contact info */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <a
              href={`mailto:${settings?.contact_email || "info@poltekindonusa.ac.id"}`}
              style={{ display: "flex", alignItems: "center", gap: "5px", color: "#0d2440", textDecoration: "none" }}
              title={settings?.contact_email || "info@poltekindonusa.ac.id"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span className="topbar-text">{settings?.contact_email || "info@poltekindonusa.ac.id"}</span>
            </a>
            <a
              href={`tel:${settings?.contact_phone || ""}`}
              style={{ display: "flex", alignItems: "center", gap: "5px", color: "#0d2440", textDecoration: "none" }}
              title={settings?.contact_phone || "(0271) 123456"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="topbar-text">{settings?.contact_phone || "(0271) 123456"}</span>
            </a>
          </div>

          {/* Right: actions */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {/* Custom Flag Translator */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <button
                onClick={() => {
                  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                  if (select && Array.from(select.options).some(opt => opt.value === 'id')) {
                    select.value = 'id';
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                  } else {
                    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + window.location.hostname + '; path=/;';
                    window.location.reload();
                  }
                }}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, transform: 'translateY(1px)', transition: 'transform 0.2s', display: 'flex', alignItems: 'center' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px) scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(1px) scale(1)'}
                title="Bahasa Indonesia"
              >
                <img src="https://flagcdn.com/w20/id.png" width="20" height="15" alt="ID" style={{ borderRadius: "2px" }} />
              </button>
              <button
                onClick={() => {
                  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                  if (select && Array.from(select.options).some(opt => opt.value === 'en')) {
                    select.value = 'en';
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                  } else {
                    document.cookie = 'googtrans=/id/en; path=/';
                    document.cookie = 'googtrans=/id/en; domain=' + window.location.hostname + '; path=/';
                    window.location.reload();
                  }
                }}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, transform: 'translateY(1px)', transition: 'transform 0.2s', display: 'flex', alignItems: 'center' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px) scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(1px) scale(1)'}
                title="English"
              >
                <img src="https://flagcdn.com/w20/gb.png" width="20" height="15" alt="EN" style={{ borderRadius: "2px" }} />
              </button>
            </div>

            {/* Hidden Google Translate Target */}
            <div id="google_translate_element" style={{ display: "none" }}></div>

            {/* Campus Tour */}
            <a
              href="https://campus-tour.poltekindonusa.ac.id/tour/gerbang-kampus"
              target="_blank"
              rel="noopener noreferrer"
              title="Campus Tour Politeknik Indonusa"
              style={{
                background: "#0d2440",
                color: "#ffffff",
                padding: "4px 12px",
                borderRadius: "9999px",
                fontWeight: 700,
                fontSize: "0.7rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#1a3a5c";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#0d2440";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span className="topbar-text">CAMPUS TOUR</span>
              <span className="topbar-icon">🧭</span>
            </a>

            {/* Pendaftaran */}
            <a
              href="http://spmb.poltekindonusa.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              title="Pendaftaran Mahasiswa Baru"
              style={{
                background: "#0d2440",
                color: "#ffffff",
                padding: "4px 12px",
                borderRadius: "9999px",
                fontWeight: 700,
                fontSize: "0.7rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                whiteSpace: "nowrap",
              }}
            >
              <span className="topbar-text">PENDAFTARAN</span>
              <span className="topbar-icon">🎓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          {settings?.site_logo ? (
            <img
              src={settings.site_logo.startsWith("http") ? settings.site_logo : getImageUrl(settings.site_logo)}
              alt="Logo"
              style={{ height: "48px", width: "auto", objectFit: "contain" }}
            />
          ) : (
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #1a3a5c, #2a5a8c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f0a500",
                fontWeight: 900,
                fontSize: "1.2rem",
                boxShadow: "0 2px 8px rgba(26, 58, 92, 0.3)",
              }}
            >
              PI
            </div>
          )}
          {!settings?.site_logo && (
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  color: "white",
                  lineHeight: 1.2,
                  letterSpacing: "-0.3px",
                }}
              >
                Politeknik
                <br />
                {settings?.site_name || 'Indonusa'}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Surakarta
              </div>
            </div>
          )}
        </Link>

        {/* Desktop Menu */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
          }}
          className="desktop-menu"
        >
          {menuItems?.map((item, index) => (
            <div
              key={index}
              style={{ position: "relative" }}
              onMouseEnter={() => setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.url && (!item.children || item.children.length === 0) ? (
                <Link
                  href={item.url}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "white",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </Link>
              ) : (
                <div
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                >
                  {item.title}
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    style={{
                      transition: "transform 0.2s",
                      transform: activeDropdown === index ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                  >
                    <path d="M1 1l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Dropdown */}
              {item.children && item.children.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    paddingTop: "8px",
                    opacity: activeDropdown === index ? 1 : 0,
                    visibility: activeDropdown === index ? "visible" : "hidden",
                    transition: "all 0.2s ease",
                    pointerEvents: activeDropdown === index ? "auto" : "none",
                  }}
                >
                  <div
                    style={{
                      background: "var(--card)",
                      borderRadius: "16px",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                      border: "1px solid var(--border)",
                      padding: "8px",
                      minWidth: "220px",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}
                  >
                    {item.children.map((child, childIdx) => {
                      const hasSubChildren = child.children && child.children.length > 0;
                      return (
                        <div
                          key={childIdx}
                          className="dropdown-item-wrapper"
                          style={{ position: "relative" }}
                        >
                          {hasSubChildren ? (
                            <>
                              <Link
                                href={child.url ?? "#"}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "10px 16px",
                                  borderRadius: "10px",
                                  color: "var(--text-main)",
                                  fontSize: "0.85rem",
                                  fontWeight: 500,
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  whiteSpace: "nowrap",
                                  gap: "12px",
                                }}
                                className="dropdown-link-item"
                              >
                                <span>{child.title}</span>
                                <svg
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                  style={{ opacity: 0.6 }}
                                >
                                  <path d="M2 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </Link>
                              
                              {/* Sub Dropdown */}
                              <div className="sub-dropdown-menu">
                                <div
                                  style={{
                                    background: "var(--card)",
                                    borderRadius: "16px",
                                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                                    border: "1px solid var(--border)",
                                    padding: "8px",
                                    minWidth: "200px",
                                    backdropFilter: "blur(20px)",
                                    WebkitBackdropFilter: "blur(20px)",
                                  }}
                                >
                                  {child.children!.map((grandchild, gcIdx) => (
                                    <Link
                                      key={gcIdx}
                                      href={grandchild.url ?? "#"}
                                      style={{
                                        display: "block",
                                        padding: "10px 16px",
                                        borderRadius: "10px",
                                        textDecoration: "none",
                                        color: "var(--text-main)",
                                        fontSize: "0.85rem",
                                        fontWeight: 500,
                                        whiteSpace: "nowrap",
                                      }}
                                      className="dropdown-link-item"
                                    >
                                      {grandchild.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </>
                          ) : (
                            <Link
                              href={child.url ?? "#"}
                              style={{
                                display: "block",
                                padding: "10px 16px",
                                borderRadius: "10px",
                                textDecoration: "none",
                                color: "var(--text-main)",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                              }}
                              className="dropdown-link-item"
                            >
                              {child.title}
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Search Icon */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              cursor: "pointer",
              padding: "8px",
              marginLeft: "12px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }}
            aria-label="Buka Pencarian"
            title="Pencarian"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </div>

        {/* Mobile controls (Search + Hamburger) */}
        <div style={{ display: "none", alignItems: "center", gap: "8px" }} className="mobile-controls">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              cursor: "pointer",
              padding: "8px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Buka Pencarian"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              {isMobileMenuOpen ? (
                <path d="M6 6L18 18M6 18L18 6" />
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-panel"
          style={{
            background: "var(--card)",
            borderTop: "1px solid var(--border)",
            padding: "1rem 1.5rem 2rem",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {menuItems?.map((item, index) => (
            <div key={index}>
              {item.url && (!item.children || item.children.length === 0) ? (
                <Link
                  href={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 0",
                    color: "var(--foreground)",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {item.title}
                </Link>
              ) : (
                <div style={{ borderBottom: "1px solid var(--border)" }}>
                  <div
                    style={{
                      padding: "12px 0",
                      color: "var(--foreground)",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ paddingLeft: "1rem", paddingBottom: "8px" }}>
                    {item.children?.map((child, childIdx) => {
                      const hasSubChildren = child.children && child.children.length > 0;
                      const isOpen = mobileSubmenuOpen[`${index}-${childIdx}`];
                      return (
                        <div key={childIdx}>
                          {hasSubChildren ? (
                            <div style={{ padding: "4px 0" }}>
                              <button
                                onClick={() => toggleMobileSubmenu(`${index}-${childIdx}`)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  background: "transparent",
                                  border: "none",
                                  color: "var(--foreground)",
                                  fontWeight: 600,
                                  fontSize: "0.88rem",
                                  cursor: "pointer",
                                  padding: "8px 0",
                                  textAlign: "left",
                                }}
                              >
                                <span>{child.title}</span>
                                <svg
                                  width="10"
                                  height="6"
                                  viewBox="0 0 10 6"
                                  fill="none"
                                  style={{
                                    transition: "transform 0.2s",
                                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                    marginLeft: "8px",
                                    opacity: 0.7,
                                  }}
                                >
                                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                              
                              <div
                                style={{
                                  paddingLeft: "1rem",
                                  borderLeft: "2px solid var(--border)",
                                  marginLeft: "4px",
                                  display: isOpen ? "block" : "none",
                                  animation: "fadeIn 0.2s ease",
                                }}
                              >
                                {child.children!.map((grandchild, gcIdx) => (
                                  <Link
                                    key={gcIdx}
                                    href={grandchild.url ?? "#"}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                      display: "block",
                                      padding: "8px 0",
                                      color: "var(--muted-foreground)",
                                      textDecoration: "none",
                                      fontSize: "0.85rem",
                                    }}
                                  >
                                    {grandchild.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              href={child.url ?? "#"}
                              onClick={() => setIsMobileMenuOpen(false)}
                              style={{
                                display: "block",
                                padding: "8px 0",
                                color: "var(--muted-foreground)",
                                textDecoration: "none",
                                fontSize: "0.88rem",
                              }}
                            >
                              {child.title}
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(13, 36, 64, 0.8)",
          backdropFilter: "blur(8px)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "15vh"
        }}>
          <div style={{
            background: "var(--card)",
            width: "90%",
            maxWidth: "600px",
            borderRadius: "24px",
            padding: "2.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            position: "relative",
            animation: "fadeInUp 0.3s ease-out forwards"
          }}>
            <button 
              onClick={() => setIsSearchModalOpen(false)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "var(--muted)",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--muted-foreground)",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--border)";
                e.currentTarget.style.color = "var(--foreground)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--muted)";
                e.currentTarget.style.color = "var(--muted-foreground)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "0.5rem" }}>Pencarian Global</h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>Temukan berita, dokumen pedoman, dan informasi akademik dengan mudah.</p>
            <form action="/search" method="GET" className="search-modal-form">
              <input 
                type="text" 
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik kata kunci..." 
                autoFocus
                style={{
                  flex: 1,
                  padding: "1rem 1.5rem",
                  borderRadius: "14px",
                  border: "2px solid var(--border)",
                  background: "var(--background)",
                  fontSize: "1.05rem",
                  color: "var(--foreground)",
                  outline: "none",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "var(--primary-light)"}
                onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              />
              <button type="submit" style={{ padding: "0 2rem", borderRadius: "14px", background: "linear-gradient(135deg, #f0a500, #c08400)", color: "white", fontWeight: 700, border: "none", cursor: "pointer", transition: "transform 0.2s", boxShadow: "0 4px 15px rgba(240, 165, 0, 0.3)" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                Cari
              </button>
            </form>
          </div>
        </div>
      )}

    </header>
    </>
  );
}
