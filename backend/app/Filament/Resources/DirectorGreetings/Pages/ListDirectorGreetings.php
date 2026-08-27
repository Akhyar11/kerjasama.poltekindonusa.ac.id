<?php

namespace App\Filament\Resources\DirectorGreetings\Pages;

use App\Filament\Resources\DirectorGreetings\DirectorGreetingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListDirectorGreetings extends ListRecords
{
    protected static string $resource = DirectorGreetingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
