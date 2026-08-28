const isServer = typeof window === 'undefined';
// Gunakan INTERNAL_API_URL di server (build time) jika ada, untuk menghindari ETIMEDOUT (masalah NAT loopback)
const API_BASE = isServer 
  ? (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001/api")
  : (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001/api");

export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export function getImageUrl(path: string | null): string {
  if (!path) return "/placeholder.jpg";
  if (path.startsWith("http")) return path;
  
  const storageBase = process.env.NEXT_PUBLIC_STORAGE_URL || "http://127.0.0.1:8001/storage";
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${storageBase}/${cleanPath}`;
}

export function formatDate(dateStr: string | null | undefined, options?: Intl.DateTimeFormatOptions): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", options || { day: "numeric", month: "long", year: "numeric" });
}

