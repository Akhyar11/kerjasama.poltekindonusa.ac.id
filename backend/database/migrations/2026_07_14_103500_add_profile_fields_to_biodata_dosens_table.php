<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('biodata_dosens', function (Blueprint $table) {
            $table->string('nama_lengkap')->nullable()->after('nidn');
            $table->string('nik')->nullable()->after('nama_lengkap');
            $table->string('tempat_lahir')->nullable()->after('nik');
            $table->string('tanggal_lahir')->nullable()->after('tempat_lahir');
            $table->string('agama')->nullable()->after('tanggal_lahir');
            $table->string('status_kepegawaian')->nullable()->after('agama');
            $table->string('jabatan_fungsional')->nullable()->after('status_kepegawaian');
            $table->string('pangkat_golongan')->nullable()->after('jabatan_fungsional');
            $table->string('prodi_homebase')->nullable()->after('pangkat_golongan');
            $table->string('pasfoto')->nullable()->after('foto');
            $table->string('ktp')->nullable()->after('pasfoto');
            $table->string('sk_dosen')->nullable()->after('ktp');
        });
    }

    public function down(): void
    {
        Schema::table('biodata_dosens', function (Blueprint $table) {
            $table->dropColumn([
                'nama_lengkap',
                'nik',
                'tempat_lahir',
                'tanggal_lahir',
                'agama',
                'status_kepegawaian',
                'jabatan_fungsional',
                'pangkat_golongan',
                'prodi_homebase',
                'pasfoto',
                'ktp',
                'sk_dosen'
            ]);
        });
    }
};
