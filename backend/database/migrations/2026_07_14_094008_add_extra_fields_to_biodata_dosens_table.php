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
        Schema::table('biodata_dosens', function (Blueprint $table) {
            $table->text('riwayat_sekolah')->nullable()->after('publikasi');
            $table->text('pengabdian_masyarakat')->nullable()->after('riwayat_sekolah');
            $table->text('hki')->nullable()->after('pengabdian_masyarakat');
            $table->text('sertifikat_kompetensi')->nullable()->after('hki');
            $table->text('sertifikat_penghargaan')->nullable()->after('sertifikat_kompetensi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('biodata_dosens', function (Blueprint $table) {
            $table->dropColumn([
                'riwayat_sekolah',
                'pengabdian_masyarakat',
                'hki',
                'sertifikat_kompetensi',
                'sertifikat_penghargaan',
            ]);
        });
    }
};
