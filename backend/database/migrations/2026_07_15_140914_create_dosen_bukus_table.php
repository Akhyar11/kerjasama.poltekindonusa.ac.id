<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dosen_bukus', function (Blueprint $table) {
            $table->id();
            $table->string('nidn')->index();
            $table->string('kategori_kegiatan'); // Buku Ajar/Referensi/Monograf
            $table->text('judul');
            $table->string('isbn')->nullable();
            $table->string('penerbit')->nullable();
            $table->string('tahun_terbit')->nullable();
            $table->string('jumlah_halaman')->nullable();
            $table->string('status_penulis'); // Utama/Anggota
            $table->string('scan_cover')->nullable();
            $table->string('daftar_isi')->nullable();
            $table->string('halaman_editorial')->nullable();
            $table->string('link_publikasi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dosen_bukus');
    }
};
