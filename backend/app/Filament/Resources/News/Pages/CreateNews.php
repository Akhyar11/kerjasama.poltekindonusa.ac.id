<?php

namespace App\Filament\Resources\News\Pages;

use App\Filament\Resources\News\NewsResource;
use Filament\Resources\Pages\CreateRecord;

class CreateNews extends CreateRecord
{
    protected static string $resource = NewsResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $user = auth()->user();
        if ($user->isStudyProgram()) {
            $categoryName = "Prodi " . $user->studyProgram->name;
            $category = \App\Models\NewsCategory::firstOrCreate(['name' => $categoryName], ['slug' => \Illuminate\Support\Str::slug($categoryName)]);
            $data['news_category_id'] = $category->id;
        } elseif ($user->isCampusOrganization()) {
            $categoryName = "Organisasi " . $user->campusOrganization->name;
            $category = \App\Models\NewsCategory::firstOrCreate(['name' => $categoryName], ['slug' => \Illuminate\Support\Str::slug($categoryName)]);
            $data['news_category_id'] = $category->id;
        }
        return $data;
    }
}
