import { MetadataRoute } from 'next'
import { fetchAPI } from '@/lib/api'
import { News, StudyProgram, PaginatedResponse } from '@/lib/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ganti dengan domain utama jika menggunakan environment variable
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://poltekindonusa.ac.id'
  
  // Rute statis (Halaman utama)
  const routes = [
    '',
    '/berita',
    '/program-studi',
    '/download',
    '/layanan-pengaduan-online',
    '/sistem-informasi',
    '/visi-misi-tujuan',
    '/akreditasi'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  let dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    // Fetch data untuk rute dinamis secara paralel
    const [newsData, programsData] = await Promise.all([
      fetchAPI<PaginatedResponse<News>>("/news").catch(() => null),
      fetchAPI<StudyProgram[]>("/study-programs").catch(() => null)
    ])

    // Generate sitemap untuk detail berita
    if (newsData && newsData.data) {
      const newsRoutes = newsData.data.map((article) => ({
        url: `${baseUrl}/berita/${article.slug}`,
        lastModified: new Date(article.updated_at || article.created_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
      dynamicRoutes = [...dynamicRoutes, ...newsRoutes]
    }

    // Generate sitemap untuk detail program studi
    if (programsData && Array.isArray(programsData)) {
      const programRoutes = programsData.map((program) => ({
        url: `${baseUrl}/program-studi/${program.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9, // Prodi sangat penting untuk SEO
      }))
      dynamicRoutes = [...dynamicRoutes, ...programRoutes]
    }
  } catch (error) {
    console.error("Gagal men-generate sitemap dinamis:", error)
  }

  return [...routes, ...dynamicRoutes]
}
