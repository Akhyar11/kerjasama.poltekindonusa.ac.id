<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'Politeknik Indonusa Surakarta', 'type' => 'text', 'group' => 'General'],
            ['key' => 'site_logo', 'value' => null, 'type' => 'image', 'group' => 'General'],
            ['key' => 'site_icon', 'value' => null, 'type' => 'image', 'group' => 'General'],
            ['key' => 'meta_description', 'value' => 'Building Your Excellent Skill', 'type' => 'textarea', 'group' => 'SEO'],
            ['key' => 'contact_email', 'value' => 'info@poltekindonusa.ac.id', 'type' => 'text', 'group' => 'Contact'],
            ['key' => 'contact_phone', 'value' => '(0271) 123456', 'type' => 'text', 'group' => 'Contact'],
            ['key' => 'whatsapp_number', 'value' => '6281234567890', 'type' => 'text', 'group' => 'Contact'],
            ['key' => 'whatsapp_text', 'value' => 'Halo Admin, saya ingin bertanya tentang Poltek Indonusa.', 'type' => 'text', 'group' => 'Contact'],
            ['key' => 'address', 'value' => 'Jl. KH. Samanhudi No. 47, Purwosari, Laweyan, Kota Surakarta, Jawa Tengah 57142', 'type' => 'textarea', 'group' => 'Contact'],
            ['key' => 'upm_email', 'value' => 'upm@poltekindonusa.ac.id', 'type' => 'text', 'group' => 'Email Settings'],
            ['key' => 'mail_host', 'value' => 'smtp.mailtrap.io', 'type' => 'text', 'group' => 'Email Settings'],
            ['key' => 'mail_port', 'value' => '2525', 'type' => 'text', 'group' => 'Email Settings'],
            ['key' => 'mail_username', 'value' => null, 'type' => 'text', 'group' => 'Email Settings'],
            ['key' => 'mail_password', 'value' => null, 'type' => 'text', 'group' => 'Email Settings'],
            ['key' => 'mail_from_address', 'value' => 'noreply@poltekindonusa.ac.id', 'type' => 'text', 'group' => 'Email Settings'],
            ['key' => 'facebook_url', 'value' => 'https://facebook.com/poltekindonusa', 'type' => 'text', 'group' => 'Social Media'],
            ['key' => 'instagram_url', 'value' => 'https://instagram.com/poltekindonusa', 'type' => 'text', 'group' => 'Social Media'],
            ['key' => 'youtube_url', 'value' => 'https://youtube.com/poltekindonusa', 'type' => 'text', 'group' => 'Social Media'],
            ['key' => 'tiktok_url', 'value' => 'https://tiktok.com/@poltekindonusa', 'type' => 'text', 'group' => 'Social Media'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
