<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;
use Filament\Panel;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Dosen extends Authenticatable implements FilamentUser, HasName
{
    protected $connection = 'siakad';
    protected $table = 'wsia_dosen';
    protected $primaryKey = 'nidn';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'nidn',
        'nm_ptk',
        'gelar_depan',
        'gelar_belakang',
        'pass',
        'email',
    ];

    protected $hidden = [
        'pass',
    ];

    public function getAuthPassword()
    {
        return $this->pass;
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $panel->getId() === 'dosen';
    }

    public function getFilamentName(): string
    {
        $name = trim(($this->gelar_depan ? $this->gelar_depan . ' ' : '') . $this->nm_ptk . ($this->gelar_belakang ? ', ' . $this->gelar_belakang : ''));
        return $name ?: ($this->email ?: $this->nidn);
    }
}
