<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroSlider;

class HeroSliderSeeder extends Seeder
{
    public function run(): void
    {
        HeroSlider::updateOrCreate(
            ['title' => 'Kerjasama & Kemitraan Strategis'],
            [
                'subtitle' => 'Membangun sinergi tridharma perguruan tinggi bersama mitra industri, pemerintah, dan institusi global.',
                'button_text' => 'Pelajari Selengkapnya',
                'button_url' => '/profil',
                'show_title' => true,
                'show_overlay' => true,
                'order' => 1,
                'is_active' => true,
            ]
        );
    }
}
