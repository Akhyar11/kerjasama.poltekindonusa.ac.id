<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;
use App\Models\MenuItem;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // Buat grup Menu Utama
        $mainMenu = Menu::create([
            'name' => 'Main Navigation'
        ]);

        // Beranda
        MenuItem::create([
            'menu_id' => $mainMenu->id,
            'title' => 'Home',
            'url' => '/',
            'order' => 1,
        ]);

        // Profil (Parent)
        $profil = MenuItem::create([
            'menu_id' => $mainMenu->id,
            'title' => 'Profil',
            'url' => null,
            'order' => 2,
        ]);

        MenuItem::create([
            'menu_id' => $mainMenu->id,
            'parent_id' => $profil->id,
            'title' => 'Profil',
            'url' => '/profil',
            'order' => 1,
        ]);

        MenuItem::create([
            'menu_id' => $mainMenu->id,
            'parent_id' => $profil->id,
            'title' => 'Struktur Organisasi',
            'url' => '/struktur-organisasi',
            'order' => 2,
        ]);

        // Berita
        MenuItem::create([
            'menu_id' => $mainMenu->id,
            'title' => 'Berita',
            'url' => '/berita',
            'order' => 3,
        ]);

        // Mitra Kerjasama
        MenuItem::create([
            'menu_id' => $mainMenu->id,
            'title' => 'Mitra Kerjasama',
            'url' => '/mitra-kerjasama',
            'order' => 4,
        ]);

        // Gallery
        MenuItem::create([
            'menu_id' => $mainMenu->id,
            'title' => 'Gallery',
            'url' => '/gallery',
            'order' => 6, // Disamakan dengan index static
        ]);

        // Kontak
        MenuItem::create([
            'menu_id' => $mainMenu->id,
            'title' => 'Kontak',
            'url' => '/kontak',
            'order' => 7,
        ]);
    }
}
