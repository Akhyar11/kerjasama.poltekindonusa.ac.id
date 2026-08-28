<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Page;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        Page::updateOrCreate(
            ['slug' => 'visi'],
            [
                'title' => 'Visi',
                'content' => '<p>Menjadi perguruan tinggi vokasi yang unggul, berdaya saing global, inovatif, dan berkarakter pada tahun 2030.</p>',
            ]
        );

        Page::updateOrCreate(
            ['slug' => 'misi'],
            [
                'title' => 'Misi',
                'content' => '<ol><li>Menyelenggarakan pendidikan vokasi yang bermutu, adaptif terhadap perkembangan teknologi, dan berorientasi pada kebutuhan industri.</li><li>Melaksanakan penelitian terapan yang inovatif dan solutif guna mendukung kemandirian bangsa.</li><li>Melaksanakan pengabdian kepada masyarakat yang berkesinambungan berbasis hasil penelitian dan kebutuhan masyarakat.</li><li>Memperluas dan memperkuat kerjasama tridharma perguruan tinggi di tingkat nasional dan internasional.</li><li>Mewujudkan tata kelola organisasi perguruan tinggi yang profesional, transparan, dan akuntabel.</li></ol>',
            ]
        );

        Page::updateOrCreate(
            ['slug' => 'sejarah'],
            [
                'title' => 'Sejarah Singkat Politeknik Indonusa Surakarta',
                'content' => '<p>Politeknik Indonusa Surakarta didirikan sebagai wujud dedikasi untuk memajukan pendidikan vokasi di Indonesia, khususnya di wilayah Surakarta dan sekitarnya. Institusi ini lahir dengan visi mencetak tenaga profesional terampil yang memiliki integritas dan kesiapan kerja tinggi dalam menghadapi era transformasi industri.</p><p>Seiring berjalannya waktu, Politeknik Indonusa terus memperluas program studi strategis, meningkatkan akreditasi program pendidikan, mengembangkan sarana prasarana modern, serta memperkuat jalinan kemitraan dengan ratusan mitra industri, dunia usaha, dan instansi pendidikan tinggi global.</p>',
            ]
        );

        Page::updateOrCreate(
            ['slug' => 'struktur-organisasi'],
            [
                'title' => 'Struktur Organisasi Politeknik Indonusa Surakarta',
                'content' => '<p>Struktur Organisasi Politeknik Indonusa Surakarta dirancang untuk memastikan tata kelola akademik dan non-akademik berjalan secara efektif, efisien, akuntabel, dan transparan.</p>',
            ]
        );
    }
}
