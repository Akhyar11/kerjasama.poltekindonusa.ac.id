<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->mapWithKeys(function ($setting) {
            $value = $setting->value;
            // Biarkan frontend yang menambahkan base url storage (lewat NEXT_PUBLIC_STORAGE_URL)
            // agar tidak terjadi hardcode URL internal (seperti 192.168.x.x) di frontend
            return [$setting->key => $value];
        });

        return response()->json($settings);
    }
}
