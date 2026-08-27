<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;
use App\Models\HeroSlider;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class EnhancementSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Users
        User::updateOrCreate(
            ['email' => 'editor@polinus.ac.id'],
            [
                'name' => 'News Editor',
                'password' => Hash::make('password123'),
                'role' => 'editor_berita',
            ]
        );

        // 2. Settings
        $settings = [
            [
                'key' => 'site_name',
                'value' => 'Politeknik Indonusa Surakarta',
                'type' => 'text',
                'group' => 'general',
            ],
            [
                'key' => 'site_description',
                'value' => 'Politeknik Indonusa Surakarta adalah perguruan tinggi vokasi yang unggul dan berdaya saing.',
                'type' => 'textarea',
                'group' => 'seo',
            ],
            [
                'key' => 'site_logo',
                'value' => null,
                'type' => 'image',
                'group' => 'general',
            ],
            [
                'key' => 'site_icon',
                'value' => null,
                'type' => 'image',
                'group' => 'general',
            ],
            [
                'key' => 'contact_email',
                'value' => 'info@polinus.ac.id',
                'type' => 'text',
                'group' => 'contact',
            ],
            [
                'key' => 'contact_phone',
                'value' => '(0271) 712345',
                'type' => 'text',
                'group' => 'contact',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }

        // 3. Hero Sliders
        $sliders = [
            [
                'title' => 'Membangun Masa Depan Gemilang',
                'subtitle' => 'Pendidikan Vokasi Terpercaya di Surakarta',
                'image' => 'hero/slider1.jpg',
                'button_text' => 'Daftar Sekarang',
                'button_url' => '/pendaftaran',
                'order' => 1,
            ],
            [
                'title' => 'Unggul dalam Teknologi & Bisnis',
                'subtitle' => 'Kurikulum Berbasis Industri & Kebutuhan Masa Depan',
                'image' => 'hero/slider2.jpg',
                'button_text' => 'Lihat Program Studi',
                'button_url' => '/program-studi',
                'order' => 2,
            ],
        ];

        foreach ($sliders as $slider) {
            HeroSlider::updateOrCreate(['title' => $slider['title']], $slider);
        }
    }
}
