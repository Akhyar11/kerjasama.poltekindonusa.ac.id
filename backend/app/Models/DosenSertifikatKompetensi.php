<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DosenSertifikatKompetensi extends Model
{
    protected $table = 'dosen_sertifikat_kompetensis';

    protected $fillable = [
        'nidn',
        'nama_sertifikat',
        'penerbit',
        'no_sertifikat',
        'tanggal_terbit',
        'masa_berlaku',
        'skala_level',
        'file_sertifikat',
    ];
}
