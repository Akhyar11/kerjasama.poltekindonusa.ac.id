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
            $table->string('email')->nullable()->after('prodi_homebase');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('biodata_dosens', function (Blueprint $table) {
            $table->dropColumn('email');
        });
    }
};
