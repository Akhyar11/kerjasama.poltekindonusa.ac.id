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
        Schema::create('biodata_dosens', function (Blueprint $table) {
            $table->id();
            $table->string('nidn')->unique();
            $table->string('foto')->nullable();
            $table->text('keahlian')->nullable();
            $table->text('publikasi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biodata_dosens');
    }
};
