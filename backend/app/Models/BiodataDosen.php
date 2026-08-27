<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BiodataDosen extends Model
{
    protected $fillable = [
        'nidn',
        'nama_lengkap',
        'nik',
        'tempat_lahir',
        'tanggal_lahir',
        'agama',
        'status_kepegawaian',
        'jabatan_fungsional',
        'pangkat_golongan',
        'prodi_homebase',
        'email',
        'foto',
        'pasfoto',
        'pasfoto_focus',
        'ktp',
        'sk_dosen',
        'keahlian',
        'publikasi',
        'riwayat_sekolah',
        'pengabdian_masyarakat',
        'hki',
        'sertifikat_kompetensi',
        'sertifikat_penghargaan',
    ];

    public function riwayatSekolahs()
    {
        return $this->hasMany(DosenRiwayatSekolah::class, 'nidn', 'nidn');
    }

    public function getRiwayatSekolahAttribute()
    {
        $records = $this->riwayatSekolahs()->get();
        if ($records->isEmpty()) {
            return null;
        }
        return $records->map(function ($r) {
            $parts = [];
            if ($r->jenjang) $parts[] = $r->jenjang;
            if ($r->nama_pt) $parts[] = $r->nama_pt;
            if ($r->fakultas_prodi) $parts[] = $r->fakultas_prodi;
            if ($r->tahun_masuk && $r->tahun_lulus) {
                $parts[] = "({$r->tahun_masuk}-{$r->tahun_lulus})";
            } elseif ($r->tahun_lulus) {
                $parts[] = "Lulus {$r->tahun_lulus}";
            }
            if ($r->gelar) $parts[] = $r->gelar;
            return "- " . implode(' - ', $parts);
        })->implode("\n");
    }

    public function publikasis()
    {
        return $this->hasMany(DosenPublikasi::class, 'nidn', 'nidn');
    }

    public function getPublikasiAttribute()
    {
        $records = $this->publikasis()->get();
        if ($records->isEmpty()) {
            return null;
        }
        return $records->map(function ($r, $index) {
            $parts = [];
            if ($r->judul) $parts[] = '"' . $r->judul . '"';
            if ($r->nama_jurnal) $parts[] = $r->nama_jurnal;
            if ($r->jenis_publikasi) $parts[] = $r->jenis_publikasi;
            if ($r->issn) $parts[] = "ISSN: " . $r->issn;
            if ($r->doi) $parts[] = "DOI: " . $r->doi;
            return ($index + 1) . ". " . implode(' - ', $parts);
        })->implode("\n");
    }

    public function pengabdians()
    {
        return $this->hasMany(DosenPengabdian::class, 'nidn', 'nidn');
    }

    public function getPengabdianMasyarakatAttribute()
    {
        $records = $this->pengabdians()->get();
        if ($records->isEmpty()) {
            return null;
        }
        return $records->map(function ($r) {
            $parts = [];
            if ($r->judul) $parts[] = $r->judul;
            if ($r->jenis_kegiatan) $parts[] = $r->jenis_kegiatan;
            if ($r->lokasi_mitra) $parts[] = "Mitra: " . $r->lokasi_mitra;
            if ($r->peran) $parts[] = "Peran: " . $r->peran;
            return "- " . implode(' - ', $parts);
        })->implode("\n");
    }

    public function hkis()
    {
        return $this->hasMany(DosenHki::class, 'nidn', 'nidn');
    }

    public function getHkiAttribute()
    {
        $records = $this->hkis()->get();
        if ($records->isEmpty()) {
            return null;
        }
        return $records->map(function ($r) {
            $parts = [];
            if ($r->judul) $parts[] = $r->judul;
            if ($r->jenis_hki) $parts[] = $r->jenis_hki;
            if ($r->nomor_sertifikat) {
                $parts[] = "Sertifikat: " . $r->nomor_sertifikat;
            } elseif ($r->nomor_permohonan) {
                $parts[] = "Permohonan No: " . $r->nomor_permohonan;
            }
            if ($r->tanggal_disetujui) $parts[] = "Disetujui: " . $r->tanggal_disetujui;
            return "- " . implode(' - ', $parts);
        })->implode("\n");
    }

    public function sertifikatKompetensis()
    {
        return $this->hasMany(DosenSertifikatKompetensi::class, 'nidn', 'nidn');
    }

    public function getSertifikatKompetensiAttribute()
    {
        $records = $this->sertifikatKompetensis()->get();
        if ($records->isEmpty()) {
            return null;
        }
        return $records->map(function ($r) {
            $parts = [];
            if ($r->nama_sertifikat) $parts[] = $r->nama_sertifikat;
            if ($r->penerbit) $parts[] = $r->penerbit;
            if ($r->no_sertifikat) $parts[] = "No: " . $r->no_sertifikat;
            if ($r->tanggal_terbit) $parts[] = $r->tanggal_terbit;
            if ($r->skala_level) $parts[] = "Skala: " . $r->skala_level;
            return "- " . implode(' - ', $parts);
        })->implode("\n");
    }

    public function sertifikatPenghargaans()
    {
        return $this->hasMany(DosenSertifikatPenghargaan::class, 'nidn', 'nidn');
    }

    public function getSertifikatPenghargaanAttribute()
    {
        $records = $this->sertifikatPenghargaans()->get();
        if ($records->isEmpty()) {
            return null;
        }
        return $records->map(function ($r) {
            $parts = [];
            if ($r->nama_penghargaan) $parts[] = $r->nama_penghargaan;
            if ($r->pemberi) $parts[] = $r->pemberi;
            if ($r->no_sertifikat) $parts[] = "No: " . $r->no_sertifikat;
            if ($r->tanggal_perolehan) $parts[] = $r->tanggal_perolehan;
            if ($r->skala_level) $parts[] = "Skala: " . $r->skala_level;
            return "- " . implode(' - ', $parts);
        })->implode("\n");
    }

    public function bukus()
    {
        return $this->hasMany(DosenBuku::class, 'nidn', 'nidn');
    }

    public function getBukuKaryaAttribute()
    {
        $records = $this->bukus()->get();
        if ($records->isEmpty()) {
            return null;
        }
        return $records->map(function ($r) {
            $parts = [];
            if ($r->judul) $parts[] = '"' . $r->judul . '"';
            if ($r->kategori_kegiatan) $parts[] = $r->kategori_kegiatan;
            if ($r->penerbit) $parts[] = $r->penerbit;
            if ($r->tahun_terbit) $parts[] = $r->tahun_terbit;
            if ($r->isbn) $parts[] = "ISBN: " . $r->isbn;
            return "- " . implode(' - ', $parts);
        })->implode("\n");
    }
}
