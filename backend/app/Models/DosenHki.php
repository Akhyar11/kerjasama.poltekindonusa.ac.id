<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DosenHki extends Model
{
    protected $table = 'dosen_hkis';

    protected $fillable = [
        'nidn',
        'jenis_hki',
        'judul',
        'nomor_permohonan',
        'nomor_sertifikat',
        'tanggal_disetujui',
        'daftar_pencipta',
        'sertifikat_djki',
    ];
}
