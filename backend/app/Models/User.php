<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'role', 'study_program_id', 'campus_organization_id'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    public function canAccessPanel(Panel $panel): bool
    {
        return in_array($this->role, ['admin', 'editor_berita', 'study_program', 'campus_organization']);
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isEditorBerita(): bool
    {
        return $this->role === 'editor_berita';
    }
    
    public function isStudyProgram(): bool
    {
        return $this->role === 'study_program';
    }

    public function isCampusOrganization(): bool
    {
        return $this->role === 'campus_organization';
    }

    public function studyProgram()
    {
        return $this->belongsTo(StudyProgram::class);
    }

    public function campusOrganization()
    {
        return $this->belongsTo(CampusOrganization::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
