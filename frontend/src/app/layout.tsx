import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisitorTracker from "@/components/VisitorTracker";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

import { ThemeProvider } from "@/components/ThemeProvider";
import { fetchAPI, getImageUrl } from "@/lib/api";

export async function generateMetadata() {
  try {
    const settings = await fetchAPI<any>("/settings");
    const iconUrl = settings?.site_icon 
      ? `${getImageUrl(settings.site_icon)}?v=${Date.now()}` 
      : (settings?.site_logo ? `${getImageUrl(settings.site_logo)}?v=${Date.now()}` : "/favicon.ico");
    
    return {
      title: settings?.site_name ? `${settings.site_name} | Building Your Excellent Skill` : "Politeknik Indonusa Surakarta",
      description: settings?.meta_description || "Politeknik Indonusa Surakarta - Kampus vokasi unggulan",
      icons: {
        icon: iconUrl,
        shortcut: iconUrl,
        apple: iconUrl,
      },
    };
  } catch {
    return {
      title: "Politeknik Indonusa Surakarta",
      icons: {
        icon: "/favicon.ico",
      }
    };
  }
}

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${raleway.variable} antialiased`}>
      <head>
        <link rel="stylesheet" href="https://chatbot.poltekindonusa.ac.id/widget/isa-widget.css" />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-42WBQGD1ZM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-42WBQGD1ZM');
          `}
        </Script>

        <ThemeProvider>
          <VisitorTracker />
          <Navbar />
          {/* Spacer to prevent content from hiding behind the fixed navbar (Top bar ~26px + Main Nav 80px = 106px) */}
          <div style={{ height: "106px", flexShrink: 0 }} />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </ThemeProvider>
        <Script src="https://chatbot.poltekindonusa.ac.id/widget/isa-widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
