<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampusOrganization extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'type',
        'logo',
        'vision',
        'mission',
        'achievements',
    ];
}
