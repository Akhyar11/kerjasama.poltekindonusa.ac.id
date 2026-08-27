import Link from 'next/link';

export const metadata = {
  title: 'Under Maintenance | Politeknik Indonusa Surakarta',
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0d2440 0%, #1a3a5c 100%)',
      color: '#ffffff',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        .maintenance-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(240, 165, 0, 0.5) !important;
        }
        .pulse-icon {
          animation: pulseIcon 3s infinite ease-in-out;
        }
        @keyframes pulseIcon {
          0% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(240,165,0,0)); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 15px rgba(240,165,0,0.4)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(240,165,0,0)); }
        }
      `}</style>

      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: '300px',
        height: '300px',
        background: 'rgba(240, 165, 0, 0.08)',
        filter: 'blur(80px)',
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '20%',
        width: '350px',
        height: '350px',
        background: 'rgba(42, 90, 140, 0.4)',
        filter: 'blur(100px)',
        borderRadius: '50%'
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '650px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(13, 36, 64, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '3rem',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        {/* Animated Icon */}
        <div className="pulse-icon" style={{ marginBottom: '1.5rem', animationDelay: '0.2s' }}>
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </div>

        <div style={{
          background: 'rgba(240, 165, 0, 0.1)',
          color: '#f0a500',
          padding: '4px 12px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          border: '1px solid rgba(240, 165, 0, 0.2)'
        }}>
          Under Maintenance
        </div>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          marginBottom: '1rem',
          color: '#ffffff',
          letterSpacing: '-0.5px',
          lineHeight: 1.2,
        }}>
          Halaman Sedang <span style={{ color: '#f0a500' }}>Diperbarui</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '2.5rem',
          lineHeight: 1.6,
        }}>
          Mohon maaf, halaman yang Anda coba akses saat ini sedang dalam proses perbaikan atau tahap pengembangan.
          Kami sedang menyiapkan antarmuka dan fitur yang lebih baik untuk Anda.
        </p>

        <Link href="/" className="maintenance-btn" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: '#f0a500',
          color: '#0d2440',
          padding: '14px 32px',
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '1rem',
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(240, 165, 0, 0.3)',
          transition: 'all 0.3s ease',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
