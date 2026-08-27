<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('admin')->after('email'); // admin, editor_berita
        });

        Schema::table('study_programs', function (Blueprint $table) {
            $table->text('graduate_profile')->nullable()->after('description');
            $table->string('video_url')->nullable()->after('graduate_profile');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });

        Schema::table('study_programs', function (Blueprint $table) {
            $table->dropColumn(['graduate_profile', 'video_url']);
        });
    }
};
