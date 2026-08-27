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
        Schema::table('upcoming_events', function (Blueprint $table) {
            $table->string('flyer_image')->nullable()->after('description');
            $table->string('section_bg_image')->nullable()->after('bg_color');
            $table->string('card_bg_image')->nullable()->after('section_bg_image');
        });
    }

    public function down(): void
    {
        Schema::table('upcoming_events', function (Blueprint $table) {
            $table->dropColumn(['flyer_image', 'section_bg_image', 'card_bg_image']);
        });
    }
};
