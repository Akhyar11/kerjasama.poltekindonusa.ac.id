<?php

namespace App\Filament\Resources\DirectorGreetings\Pages;

use App\Filament\Resources\DirectorGreetings\DirectorGreetingResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditDirectorGreeting extends EditRecord
{
    protected static string $resource = DirectorGreetingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
