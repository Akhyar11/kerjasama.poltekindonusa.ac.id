<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:setup-accounts')]
#[Description('Setup multi level accounts for study programs and campus organizations')]
class SetupAccountsCommand extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $studyPrograms = \App\Models\StudyProgram::all();
        $organizations = \App\Models\CampusOrganization::all();
        
        $this->info("Creating accounts...");
        $accounts = [];

        foreach ($studyPrograms as $sp) {
            // Ensure News Category exists
            $categoryName = "Prodi " . $sp->name;
            $category = \App\Models\NewsCategory::firstOrCreate(['name' => $categoryName], ['slug' => \Illuminate\Support\Str::slug($categoryName)]);
            
            $email = \Illuminate\Support\Str::slug($sp->name) . '@polinus.ac.id';
            // Create user
            $user = \App\Models\User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => 'Admin ' . $sp->name,
                    'password' => bcrypt('password123'),
                    'role' => 'study_program',
                    'study_program_id' => $sp->id
                ]
            );
            $user->update(['role' => 'study_program', 'study_program_id' => $sp->id]);
            
            $accounts[] = ['Entity' => 'Prodi: ' . $sp->name, 'Email' => $email, 'Password' => 'password123'];
        }

        foreach ($organizations as $org) {
            $categoryName = "Organisasi " . $org->name;
            $category = \App\Models\NewsCategory::firstOrCreate(['name' => $categoryName], ['slug' => \Illuminate\Support\Str::slug($categoryName)]);
            
            $email = \Illuminate\Support\Str::slug($org->name) . '@polinus.ac.id';
            $user = \App\Models\User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => 'Admin ' . $org->name,
                    'password' => bcrypt('password123'),
                    'role' => 'campus_organization',
                    'campus_organization_id' => $org->id
                ]
            );
            $user->update(['role' => 'campus_organization', 'campus_organization_id' => $org->id]);
            
            $accounts[] = ['Entity' => 'Org: ' . $org->name, 'Email' => $email, 'Password' => 'password123'];
        }

        $this->table(['Entity', 'Email', 'Password'], $accounts);
        $this->info("Done! (Store this list to show the user)");
    }
}
