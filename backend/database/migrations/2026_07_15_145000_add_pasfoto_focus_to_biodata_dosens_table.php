<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('biodata_dosens', function (Blueprint $table) {
            $table->string('pasfoto_focus')->nullable()->default('50% 50%')->after('pasfoto');
        });
    }

    public function down(): void
    {
        Schema::table('biodata_dosens', function (Blueprint $table) {
            $table->dropColumn('pasfoto_focus');
        });
    }
};
