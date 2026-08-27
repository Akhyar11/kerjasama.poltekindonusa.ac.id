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
            if ($setting->type === 'image' && $value) {
                $value = url('storage/' . $value);
            }
            return [$setting->key => $value];
        });

        return response()->json($settings);
    }
}
