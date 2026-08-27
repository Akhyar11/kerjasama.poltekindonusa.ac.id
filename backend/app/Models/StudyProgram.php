<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudyProgram extends Model
{
    protected $guarded = [];

    protected $casts = [
        'org_structure' => 'array',
    ];
}
