<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlider;
use Illuminate\Http\Request;

class HeroSliderController extends Controller
{
    public function index()
    {
        $sliders = HeroSlider::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($slider) {
                if ($slider->image) {
                    $slider->image = url('storage/' . $slider->image);
                }
                return $slider;
            });

        return response()->json($sliders);
    }
}
