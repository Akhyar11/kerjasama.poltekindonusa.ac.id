<?php

namespace App\Filament\Resources\News\Pages;

use App\Filament\Resources\News\NewsResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditNews extends EditRecord
{
    protected static string $resource = NewsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
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
