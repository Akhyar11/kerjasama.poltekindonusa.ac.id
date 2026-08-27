<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dosen_riwayat_sekolahs', function (Blueprint $table) {
            $table->id();
            $table->string('nidn')->index();
            $table->string('jenjang')->nullable();
            $table->string('nama_pt')->nullable();
            $table->string('fakultas_prodi')->nullable();
            $table->string('tahun_masuk')->nullable();
            $table->string('tahun_lulus')->nullable();
            $table->string('gelar')->nullable();
            $table->timestamps();
        });

        Schema::create('dosen_publikasis', function (Blueprint $table) {
            $table->id();
            $table->string('nidn')->index();
            $table->text('judul');
            $table->string('nama_jurnal')->nullable();
            $table->string('jenis_publikasi')->nullable(); // SINTA 1, SINTA 2, SINTA 3, SINTA 4, SINTA 5 atau Internasional
            $table->string('issn')->nullable();
            $table->string('url_artikel')->nullable();
            $table->string('doi')->nullable();
            $table->string('pdf_artikel')->nullable();
            $table->timestamps();
        });

        Schema::create('dosen_pengabdians', function (Blueprint $table) {
            $table->id();
            $table->string('nidn')->index();
            $table->text('judul');
            $table->string('jenis_kegiatan')->nullable();
            $table->string('lokasi_mitra')->nullable();
            $table->string('durasi')->nullable();
            $table->string('sumber_dana')->nullable();
            $table->string('nominal_dana')->nullable();
            $table->string('peran')->nullable(); // Ketua/Anggota
            $table->string('sk_tugas')->nullable();
            $table->string('laporan_akhir')->nullable();
            $table->string('surat_mitra')->nullable();
            $table->timestamps();
        });

        Schema::create('dosen_hkis', function (Blueprint $table) {
            $table->id();
            $table->string('nidn')->index();
            $table->string('jenis_hki')->nullable(); // Hak Cipta/Paten
            $table->text('judul');
            $table->string('nomor_permohonan')->nullable();
            $table->string('nomor_sertifikat')->nullable();
            $table->string('tanggal_disetujui')->nullable();
            $table->text('daftar_pencipta')->nullable();
            $table->string('sertifikat_djki')->nullable();
            $table->timestamps();
        });

        Schema::create('dosen_sertifikat_kompetensis', function (Blueprint $table) {
            $table->id();
            $table->string('nidn')->index();
            $table->text('nama_sertifikat');
            $table->string('penerbit')->nullable(); // BNSP/Global
            $table->string('no_sertifikat')->nullable();
            $table->string('tanggal_terbit')->nullable();
            $table->string('masa_berlaku')->nullable();
            $table->string('skala_level')->nullable(); // Nasional/Internasional
            $table->string('file_sertifikat')->nullable();
            $table->timestamps();
        });

        Schema::create('dosen_sertifikat_penghargaans', function (Blueprint $table) {
            $table->id();
            $table->string('nidn')->index();
            $table->text('nama_penghargaan');
            $table->string('pemberi')->nullable();
            $table->string('no_sertifikat')->nullable(); // Nomor SK/Sertifikat
            $table->string('tanggal_perolehan')->nullable();
            $table->string('skala_level')->nullable(); // Nasional/Internasional
            $table->string('file_penghargaan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dosen_sertifikat_penghargaans');
        Schema::dropIfExists('dosen_sertifikat_kompetensis');
        Schema::dropIfExists('dosen_hkis');
        Schema::dropIfExists('dosen_pengabdians');
        Schema::dropIfExists('dosen_publikasis');
        Schema::dropIfExists('dosen_riwayat_sekolahs');
    }
};
