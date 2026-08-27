<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\StudyProgram;
use App\Models\CampusOrganization;
use App\Models\NewsCategory;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        User::firstOrCreate(
            ['email' => 'admin@polinus.ac.id'],
            [
                'name' => 'Admin Polinus',
                'password' => bcrypt('password123'),
                'role' => 'admin'
            ]
        );

        $studyPrograms = StudyProgram::all();
        foreach ($studyPrograms as $sp) {
            $categoryName = "Prodi " . $sp->name;
            NewsCategory::firstOrCreate(
                ['name' => $categoryName], 
                ['slug' => Str::slug($categoryName)]
            );
            
            $email = Str::slug($sp->name) . '@polinus.ac.id';
            User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => 'Admin ' . $sp->name,
                    'password' => bcrypt('password123'),
                    'role' => 'study_program',
                    'study_program_id' => $sp->id
                ]
            );
        }

        $organizations = CampusOrganization::all();
        foreach ($organizations as $org) {
            $categoryName = "Organisasi " . $org->name;
            NewsCategory::firstOrCreate(
                ['name' => $categoryName], 
                ['slug' => Str::slug($categoryName)]
            );
            
            $email = Str::slug($org->name) . '@polinus.ac.id';
            User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => 'Admin ' . $org->name,
                    'password' => bcrypt('password123'),
                    'role' => 'campus_organization',
                    'campus_organization_id' => $org->id
                ]
            );
        }
    }
}
