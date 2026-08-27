<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitorLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'source',       // 'frontend' | 'backend'
        'page_title',   // judul halaman (dari frontend)
        'referrer',     // halaman asal
        'method',
        'ip_address',
        'country',
        'region',
        'city',
        'user_agent',
        'browser',
        'platform',
        'device',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
