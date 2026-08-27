<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NewsCategory;
use App\Models\News;
use App\Models\Document;
use App\Models\StudyProgram;
use App\Models\DirectorGreeting;
use App\Models\Partnership;
use App\Models\Testimonial;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Page;
use Illuminate\Support\Str;

class SiteSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Director Greeting
        DirectorGreeting::create([
            'name' => 'Dr. H. Darmanto, M.M.',
            'position' => 'Direktur Politeknik Indonusa Surakarta',
            'message' => 'Selamat datang di Kampus Politeknik Indonusa Surakarta. Kami berkomitmen untuk menyelenggarakan pendidikan vokasi yang berkualitas dan relevan dengan kebutuhan industri. Melalui program studi yang kami tawarkan, kami berupaya mencetak lulusan yang tidak hanya cerdas secara intelektual, tetapi juga memiliki keterampilan teknis yang mumpuni dan karakter yang kuat untuk bersaing di dunia kerja global.',
            'image' => null,
        ]);

        // 2. Study Programs
        $programs = [
            [
                'name' => 'Teknologi Rekayasa Otomotif',
                'degree' => 'S1 Terapan',
                'accreditation' => 'Baik Sekali',
                'description' => 'Program studi yang fokus pada teknologi otomotif modern, termasuk kendaraan listrik dan sistem kontrol otomotif terbaru.',
                'hover_bg_color' => 'linear-gradient(135deg, #1e293b 0%, #3f0e0e 100%)',
                'hover_border_color' => '#ef4444',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Teknologi Rekayasa Perangkat Lunak',
                'degree' => 'S1 Terapan',
                'accreditation' => 'Baik Sekali',
                'description' => 'Mempelajari pengembangan aplikasi web, mobile, serta teknologi cloud dan kecerdasan buatan.',
                'hover_bg_color' => 'linear-gradient(135deg, #0d2440 0%, #1e3a8a 100%)',
                'hover_border_color' => '#f0a500',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Produksi Media',
                'degree' => 'S1 Terapan',
                'accreditation' => 'Baik',
                'description' => 'Menyiapkan tenaga profesional di bidang konten kreatif, penyiaran, dan manajemen media digital.',
                'hover_bg_color' => 'linear-gradient(135deg, #1f1235 0%, #3b0764 100%)',
                'hover_border_color' => '#a855f7',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Bisnis Manajemen Ritel',
                'degree' => 'S1 Terapan',
                'accreditation' => 'Baik Sekali',
                'description' => 'Fokus pada manajemen bisnis modern, strategi pemasaran ritel, dan e-commerce.',
                'hover_bg_color' => 'linear-gradient(135deg, #062f22 0%, #064e3b 100%)',
                'hover_border_color' => '#34d399',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Akuntansi Perpajakan',
                'degree' => 'S1 Terapan',
                'accreditation' => 'Baik Sekali',
                'description' => 'Kombinasi antara keahlian akuntansi dan spesialisasi perpajakan untuk kebutuhan industri saat ini.',
                'hover_bg_color' => 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                'hover_border_color' => '#818cf8',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Perhotelan',
                'degree' => 'D3',
                'accreditation' => 'Baik',
                'description' => 'Mempersiapkan tenaga profesional di bidang layanan hotel, manajemen perhotelan, dan pariwisata.',
                'hover_bg_color' => 'linear-gradient(135deg, #2d1a0e 0%, #451a03 100%)',
                'hover_border_color' => '#fbbf24',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Farmasi',
                'degree' => 'D3',
                'accreditation' => 'Baik Sekali',
                'description' => 'Mempelajari pembuatan, pengolahan, dan pendistribusian obat-obatan secara profesional.',
                'hover_bg_color' => 'linear-gradient(135deg, #064e3b 0%, #0d9488 100%)',
                'hover_border_color' => '#2dd4bf',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Manajemen Informasi Kesehatan',
                'degree' => 'S1 Terapan',
                'accreditation' => 'Baik',
                'description' => 'Fokus pada pengelolaan data rekam medis dan sistem informasi kesehatan berbasis digital.',
                'hover_bg_color' => 'linear-gradient(135deg, #0d3b66 0%, #1e40af 100%)',
                'hover_border_color' => '#60a5fa',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Teknologi Laboratorium Medis',
                'degree' => 'S1 Terapan',
                'accreditation' => 'Baik',
                'description' => 'Mempelajari teknik analisis laboratorium untuk mendukung diagnosis medis yang akurat.',
                'hover_bg_color' => 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                'hover_border_color' => '#94a3b8',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Informatika',
                'degree' => 'S1',
                'accreditation' => 'Coming Soon',
                'description' => 'Mempelajari komputasi, kecerdasan buatan, keamanan siber, dan jaringan komputer.',
                'hover_bg_color' => 'linear-gradient(135deg, #0c1c2e 0%, #0f766e 100%)',
                'hover_border_color' => '#14b8a6',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'PGSD',
                'degree' => 'S1',
                'accreditation' => 'Coming Soon',
                'description' => 'Mendidik calon guru SD yang kompeten, berkarakter, inovatif, dan profesional.',
                'hover_bg_color' => 'linear-gradient(135deg, #2c1a0e 0%, #a16207 100%)',
                'hover_border_color' => '#eab308',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Pendidikan Jasmani',
                'degree' => 'S1',
                'accreditation' => 'Coming Soon',
                'description' => 'Membentuk pendidik jasmani, olahraga, kesehatan, dan kepelatihan yang handal.',
                'hover_bg_color' => 'linear-gradient(135deg, #1c1917 0%, #7f1d1d 100%)',
                'hover_border_color' => '#f87171',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Fisioterapi',
                'degree' => 'S1',
                'accreditation' => 'Coming Soon',
                'description' => 'Mengembangkan keahlian rehabilitasi fisik dan pemulihan gerak tubuh manusia.',
                'hover_bg_color' => 'linear-gradient(135deg, #180d2b 0%, #6d28d9 100%)',
                'hover_border_color' => '#a78bfa',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Kesehatan Lingkungan',
                'degree' => 'S1',
                'accreditation' => 'Coming Soon',
                'description' => 'Mengidentifikasi, mencegah, dan mengontrol faktor lingkungan yang mempengaruhi kesehatan.',
                'hover_bg_color' => 'linear-gradient(135deg, #022c22 0%, #047857 100%)',
                'hover_border_color' => '#34d399',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Manajemen',
                'degree' => 'S1',
                'accreditation' => 'Coming Soon',
                'description' => 'Mengembangkan kemampuan manajerial, kepemimpinan, dan kewirausahaan.',
                'hover_bg_color' => 'linear-gradient(135deg, #1e1b4b 0%, #1d4ed8 100%)',
                'hover_border_color' => '#3b82f6',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Psikologi',
                'degree' => 'S1',
                'accreditation' => 'Coming Soon',
                'description' => 'Mempelajari perilaku manusia, proses mental, kesehatan jiwa, dan bimbingan konseling.',
                'hover_bg_color' => 'linear-gradient(135deg, #2a0b25 0%, #db2777 100%)',
                'hover_border_color' => '#f472b6',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Hukum',
                'degree' => 'S1',
                'accreditation' => 'Coming Soon',
                'description' => 'Memahami sistem hukum, perundang-undangan, advokasi, dan keadilan sosial.',
                'hover_bg_color' => 'linear-gradient(135deg, #2e0e0e 0%, #b91c1c 100%)',
                'hover_border_color' => '#f87171',
                'hover_text_color' => '#ffffff',
            ],
            [
                'name' => 'Kebidanan',
                'degree' => 'D3',
                'accreditation' => 'Coming Soon',
                'description' => 'Mempersiapkan bidan yang terampil, tanggap, dan berdedikasi dalam pelayanan ibu dan anak.',
                'hover_bg_color' => 'linear-gradient(135deg, #3b0712 0%, #be123c 100%)',
                'hover_border_color' => '#fb7185',
                'hover_text_color' => '#ffffff',
            ],
        ];

        foreach ($programs as $p) {
            StudyProgram::create([
                'name' => $p['name'],
                'slug' => Str::slug($p['name']),
                'degree' => $p['degree'],
                'accreditation' => $p['accreditation'],
                'description' => $p['description'],
                'hover_bg_color' => $p['hover_bg_color'],
                'hover_border_color' => $p['hover_border_color'],
                'hover_text_color' => $p['hover_text_color'],
            ]);
        }

        // 3. News Categories & News
        $catAkademik = NewsCategory::create(['name' => 'Akademik', 'slug' => 'akademik']);
        $catKegiatan = NewsCategory::create(['name' => 'Kegiatan', 'slug' => 'kegiatan']);
        $catPrestasi = NewsCategory::create(['name' => 'Prestasi', 'slug' => 'prestasi']);

        News::create([
            'news_category_id' => $catAkademik->id,
            'title' => 'Pendaftaran Mahasiswa Baru Gelombang 2 Dibuka',
            'slug' => Str::slug('Pendaftaran Mahasiswa Baru Gelombang 2 Dibuka'),
            'content' => 'Kabar gembira bagi calon mahasiswa! Pendaftaran mahasiswa baru Politeknik Indonusa Surakarta untuk Gelombang 2 resmi dibuka hari ini. Tersedia berbagai beasiswa bagi lulusan berprestasi.',
            'is_published' => true,
        ]);

        News::create([
            'news_category_id' => $catPrestasi->id,
            'title' => 'Tim Robotika Polinus Juara 1 Tingkat Nasional',
            'slug' => Str::slug('Tim Robotika Polinus Juara 1 Tingkat Nasional'),
            'content' => 'Selamat kepada Tim Robotika Politeknik Indonusa Surakarta yang berhasil meraih Juara 1 dalam Kontes Robot Nasional 2025. Inovasi robot penyelamat mereka mendapat apresiasi tinggi dari dewan juri.',
            'is_published' => true,
        ]);

        News::create([
            'news_category_id' => $catKegiatan->id,
            'title' => 'Workshop Kerjasama Industri dengan Astra Honda Motor',
            'slug' => Str::slug('Workshop Kerjasama Industri dengan Astra Honda Motor'),
            'content' => 'Guna meningkatkan sinkronisasi kurikulum dengan kebutuhan industri, Polinus mengadakan workshop bersama AHM untuk program studi Teknologi Rekayasa Otomotif.',
            'is_published' => true,
        ]);

        // 4. Testimonials
        Testimonial::create([
            'alumni_name' => 'Andi Saputra',
            'graduation_year' => '2022',
            'message' => 'Belajar di Polinus memberikan saya keterampilan praktis yang sangat berguna. Sekarang saya bekerja di perusahaan multinasional berkat bimbingan para dosen.',
        ]);

        Testimonial::create([
            'alumni_name' => 'Sinta Dewi',
            'graduation_year' => '2021',
            'message' => 'Fasilitas laboratorium yang lengkap di Polinus membantu saya memahami teori dengan lebih baik melalui praktik langsung.',
        ]);

        // 5. Partnerships
        $partners = ['PT. Astra Honda Motor', 'PT. Telkom Indonesia', 'Bank Jateng', 'Rumah Sakit Dr. Moewardi', 'Lorin Hotel Solo'];
        foreach ($partners as $partner) {
            Partnership::create([
                'name' => $partner,
                'logo' => 'placeholder.png',
            ]);
        }

        // 6. Documents
        Document::create(['title' => 'Kalender Akademik 2024/2025', 'file_path' => 'docs/kalender.pdf', 'type' => 'pedoman']);
        Document::create(['title' => 'Panduan Pendaftaran Mahasiswa Baru', 'file_path' => 'docs/panduan.pdf', 'type' => 'pengumuman']);

        // 7. Pages
        Page::create([
            'title' => 'Sejarah',
            'slug' => 'sejarah',
            'content' => 'Politeknik Indonusa Surakarta berdiri sejak tahun 2002 dengan visi menjadi institusi pendidikan vokasi yang unggul di tingkat nasional...',
        ]);

        Page::create([
            'title' => 'Visi',
            'slug' => 'visi',
            'content' => 'Menjadi Politeknik yang unggul, berkarakter, dan berdaya saing global pada tahun 2030.',
        ]);

        Page::create([
            'title' => 'Misi',
            'slug' => 'misi',
            'content' => '<ul><li>Menyelenggarakan pendidikan vokasi yang berkualitas.</li><li>Melaksanakan penelitian terapan.</li><li>Melakukan pengabdian kepada masyarakat.</li></ul>',
        ]);

        Page::create([
            'title' => 'Struktur Organisasi',
            'slug' => 'struktur-organisasi',
            'content' => 'Berikut adalah struktur organisasi Politeknik Indonusa Surakarta yang dipimpin oleh Direktur beserta para jajarannya.',
        ]);

        Page::create([
            'title' => 'Gallery',
            'slug' => 'gallery',
            'content' => 'Dokumentasi kegiatan dan fasilitas kampus Politeknik Indonusa Surakarta.',
        ]);

        // 8. Menus
        $mainMenu = Menu::create(['name' => 'Main Navigation']);
        
        $profil = MenuItem::create(['menu_id' => $mainMenu->id, 'title' => 'Profil', 'order' => 1]);
        MenuItem::create(['menu_id' => $mainMenu->id, 'parent_id' => $profil->id, 'title' => 'Sejarah', 'url' => '/sejarah', 'order' => 1]);
        MenuItem::create(['menu_id' => $mainMenu->id, 'parent_id' => $profil->id, 'title' => 'Visi Misi Tujuan', 'url' => '/visi-misi-tujuan', 'order' => 2]);
        
        $akademik = MenuItem::create(['menu_id' => $mainMenu->id, 'title' => 'Akademik', 'order' => 2]);
        MenuItem::create(['menu_id' => $mainMenu->id, 'parent_id' => $akademik->id, 'title' => 'Program Studi', 'url' => '/program-studi', 'order' => 1]);
        MenuItem::create(['menu_id' => $mainMenu->id, 'parent_id' => $akademik->id, 'title' => 'Berita', 'url' => '/berita', 'order' => 2]);
        
        $jurnal = MenuItem::create(['menu_id' => $mainMenu->id, 'parent_id' => $akademik->id, 'title' => 'Jurnal', 'order' => 3]);
        MenuItem::create(['menu_id' => $mainMenu->id, 'parent_id' => $jurnal->id, 'title' => 'Informa', 'url' => 'https://jurnal.poltekindonusa.ac.id/index.php/informa', 'order' => 1]);
        MenuItem::create(['menu_id' => $mainMenu->id, 'parent_id' => $jurnal->id, 'title' => 'Bengawan', 'url' => 'https://jurnal.poltekindonusa.ac.id/index.php/bengawan', 'order' => 2]);
        
        MenuItem::create(['menu_id' => $mainMenu->id, 'title' => 'Download', 'url' => '/download', 'order' => 3]);
    }
}
