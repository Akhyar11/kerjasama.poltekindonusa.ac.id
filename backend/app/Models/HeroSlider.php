<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlider extends Model
{
    protected $fillable = [
        'title', 
        'subtitle', 
        'image', 
        'button_text', 
        'button_url', 
        'show_title', 
        'show_overlay', 
        'order', 
        'is_active'
    ];
}
