"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * VisitorTracker – komponen client-side yang mencatat setiap kunjungan halaman
 * frontend ke backend melalui endpoint POST /api/track-visit.
 *
 * Dipasang di layout.tsx agar aktif di seluruh halaman frontend.
 * Hanya mengirim satu request per navigasi (menggunakan ref sebagai guard).
 */
export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    // Hindari duplikasi tracking untuk pathname yang sama dalam satu render cycle
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://backend-web.poltekindonusa.ac.id/api";

    // Jalankan asinkron tanpa memblokir render
    const track = async () => {
      try {
        await fetch(`${apiBase}/track-visit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Kirim User-Agent supaya Laravel bisa parse browser/device
            "X-User-Agent": navigator.userAgent,
          },
          body: JSON.stringify({
            url: window.location.href,
            page_title: document.title || pathname,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
          }),
          // keepalive agar request tetap terkirim saat navigasi
          keepalive: true,
        });
      } catch {
        // Silently fail – tracking tidak boleh mempengaruhi pengalaman pengguna
      }
    };

    track();
  }, [pathname]);

  // Komponen tidak merender apapun ke DOM
  return null;
}
