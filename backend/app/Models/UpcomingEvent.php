<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UpcomingEvent extends Model
{
    protected $fillable = [
        'study_program_id',
        'title',
        'description',
        'flyer_image',
        'event_datetime',
        'bg_color',
        'section_bg_image',
        'card_bg_image',
        'link_url',
        'is_active',
    ];

    protected $casts = [
        'event_datetime' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function studyProgram()
    {
        return $this->belongsTo(StudyProgram::class);
    }
}
