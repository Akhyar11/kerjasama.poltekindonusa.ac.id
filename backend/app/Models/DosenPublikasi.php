<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DosenPublikasi extends Model
{
    protected $table = 'dosen_publikasis';

    protected $fillable = [
        'nidn',
        'judul',
        'nama_jurnal',
        'jenis_publikasi',
        'issn',
        'url_artikel',
        'doi',
        'pdf_artikel',
    ];
}
