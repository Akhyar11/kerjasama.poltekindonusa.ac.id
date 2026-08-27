<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Page extends Model
{
    protected $guarded = [];

    public function media(): HasMany
    {
        return $this->hasMany(PageMedia::class)->orderBy('sort_order');
    }
}
