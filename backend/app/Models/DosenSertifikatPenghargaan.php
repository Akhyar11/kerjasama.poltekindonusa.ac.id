<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DosenSertifikatPenghargaan extends Model
{
    protected $table = 'dosen_sertifikat_penghargaans';

    protected $fillable = [
        'nidn',
        'nama_penghargaan',
        'pemberi',
        'no_sertifikat',
        'tanggal_perolehan',
        'skala_level',
        'file_penghargaan',
    ];
}
