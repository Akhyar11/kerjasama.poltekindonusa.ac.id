import { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { News, Document, Menu, PaginatedResponse } from "@/lib/types";
import SearchResults from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Pencarian | Politeknik Indonusa Surakarta",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q || "";

  let news: News[] = [];
  let documents: Document[] = [];
  let pages: { title: string; url: string }[] = [];

  if (query) {
    try {
      const [newsData, allDocs, menus] = await Promise.all([
        fetchAPI<PaginatedResponse<News>>(`/news?search=${encodeURIComponent(query)}`).catch(() => null),
        fetchAPI<Document[]>("/documents").catch(() => []),
        fetchAPI<Menu[]>("/menus").catch(() => [])
      ]);

      const rawNews = newsData?.data || [];
      news = rawNews.filter(n => 
        n.title.toLowerCase().includes(query.toLowerCase()) || 
        (n.content && n.content.toLowerCase().includes(query.toLowerCase())) ||
        (n.tags && n.tags.toLowerCase().includes(query.toLowerCase()))
      );
      documents = (allDocs || []).filter(d => d.title.toLowerCase().includes(query.toLowerCase()));
      
      const extractMenuPages = (items: any[]) => {
        let result: { title: string; url: string }[] = [];
        for (const item of items) {
          if (item.url && item.url.startsWith('/') && !item.url.startsWith('http')) {
            result.push({ title: item.title, url: item.url });
          }
          if (item.children) {
            result.push(...extractMenuPages(item.children));
          }
        }
        return result;
      };

      const allMenuPages = extractMenuPages(menus?.[0]?.items || []);
      const uniquePages = Array.from(new Map(allMenuPages.map(item => [item.url, item])).values());
      pages = uniquePages.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

    } catch (e) {
      console.error("Search fetch error", e);
    }
  }

  return (
    <div>
      <section style={{ padding: "4rem 1.5rem 5rem", background: "linear-gradient(135deg, #0d2440, #1a3a5c)", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>Hasil Pencarian</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem" }}>
          {query ? `Menampilkan hasil untuk: "${query}"` : "Masukkan kata kunci untuk mencari."}
        </p>
      </section>

      <SearchResults initialQuery={query} initialNews={news} initialDocs={documents} initialPages={pages} />
    </div>
  );
}
