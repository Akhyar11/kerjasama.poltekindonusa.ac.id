<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hero_sliders', function (Blueprint $blueprint) {
            $blueprint->boolean('show_title')->default(true)->after('subtitle');
            $blueprint->boolean('show_overlay')->default(true)->after('image');
        });
    }

    public function down(): void
    {
        Schema::table('hero_sliders', function (Blueprint $blueprint) {
            $blueprint->dropColumn(['show_title', 'show_overlay']);
        });
    }
};
