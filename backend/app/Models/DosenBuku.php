<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DosenBuku extends Model
{
    protected $table = 'dosen_bukus';

    protected $fillable = [
        'nidn',
        'kategori_kegiatan',
        'judul',
        'isbn',
        'penerbit',
        'tahun_terbit',
        'jumlah_halaman',
        'status_penulis',
        'scan_cover',
        'daftar_isi',
        'halaman_editorial',
        'link_publikasi',
    ];
}
