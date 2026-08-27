<?php

namespace App\Filament\Resources\Menus\Pages;

use App\Filament\Resources\Menus\MenuResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditMenu extends EditRecord
{
    protected static string $resource = MenuResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    public function getView(): string
    {
        return 'admin.menu-builder';
    }

    protected function getViewData(): array
    {
        return [
            'menu' => $this->record,
            'pages' => \App\Models\Page::orderBy('title')->get(),
            'categories' => \App\Models\NewsCategory::orderBy('name')->get(),
            'studyPrograms' => \App\Models\StudyProgram::orderBy('name')->get(),
            'existingItems' => $this->record->items()
                ->whereNull('parent_id')
                ->with('children')
                ->orderBy('order')
                ->get(),
        ];
    }
}
