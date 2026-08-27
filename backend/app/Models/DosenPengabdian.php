<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DosenPengabdian extends Model
{
    protected $table = 'dosen_pengabdians';

    protected $fillable = [
        'nidn',
        'judul',
        'jenis_kegiatan',
        'lokasi_mitra',
        'durasi',
        'sumber_dana',
        'nominal_dana',
        'peran',
        'sk_tugas',
        'laporan_akhir',
        'surat_mitra',
    ];
}
