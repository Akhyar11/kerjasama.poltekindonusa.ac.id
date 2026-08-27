<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DosenRiwayatSekolah extends Model
{
    protected $table = 'dosen_riwayat_sekolahs';

    protected $fillable = [
        'nidn',
        'jenjang',
        'nama_pt',
        'fakultas_prodi',
        'tahun_masuk',
        'tahun_lulus',
        'gelar',
    ];
}
