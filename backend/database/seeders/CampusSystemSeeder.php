<?php

namespace Database\Seeders;

use App\Models\CampusSystem;
use Illuminate\Database\Seeder;

class CampusSystemSeeder extends Seeder
{
    public function run(): void
    {
        $systems = [
            [
                'name'        => 'SIAKAD (Akademik)',
                'link'        => 'https://siakad.poltekindonusa.ac.id',
                'icon'        => 'heroicon-o-academic-cap',
                'description' => 'Sistem Informasi Akademik untuk mahasiswa dan dosen',
                'is_active'   => true,
                'sort_order'  => 1,
            ],
            [
                'name'        => 'SIMPEG (Kepegawaian)',
                'link'        => 'https://simpeg.poltekindonusa.ac.id',
                'icon'        => 'heroicon-o-user-group',
                'description' => 'Sistem Informasi Manajemen Kepegawaian',
                'is_active'   => true,
                'sort_order'  => 2,
            ],
            [
                'name'        => 'E-Learning',
                'link'        => 'https://elearning.poltekindonusa.ac.id',
                'icon'        => 'heroicon-o-computer-desktop',
                'description' => 'Platform pembelajaran daring Politeknik Indonusa',
                'is_active'   => true,
                'sort_order'  => 3,
            ],
            [
                'name'        => 'Perpustakaan Digital',
                'link'        => 'https://lib.poltekindonusa.ac.id',
                'icon'        => 'heroicon-o-book-open',
                'description' => 'Akses koleksi buku dan jurnal digital',
                'is_active'   => true,
                'sort_order'  => 4,
            ],
            [
                'name'        => 'Portal Mahasiswa',
                'link'        => 'https://portal.poltekindonusa.ac.id',
                'icon'        => 'heroicon-o-identification',
                'description' => 'Portal layanan terpadu mahasiswa',
                'is_active'   => true,
                'sort_order'  => 5,
            ],
            [
                'name'        => 'SIMKEU (Keuangan)',
                'link'        => 'https://simkeu.poltekindonusa.ac.id',
                'icon'        => 'heroicon-o-banknotes',
                'description' => 'Sistem Informasi Manajemen Keuangan',
                'is_active'   => true,
                'sort_order'  => 6,
            ],
        ];

        foreach ($systems as $system) {
            CampusSystem::updateOrCreate(
                ['name' => $system['name']],
                $system
            );
        }
    }
}
