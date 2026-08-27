<?php

namespace App\Filament\Resources\StudyPrograms\Pages;

use App\Filament\Resources\StudyPrograms\StudyProgramResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListStudyPrograms extends ListRecords
{
    protected static string $resource = StudyProgramResource::class;

    public function mount(): void
    {
        parent::mount();
        $user = auth()->user();
        if ($user->isStudyProgram() && $user->study_program_id) {
            redirect()->to(StudyProgramResource::getUrl('edit', ['record' => $user->study_program_id]));
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
