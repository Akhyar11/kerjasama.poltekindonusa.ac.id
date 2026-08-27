<?php

namespace App\Filament\Resources\CampusSystems\Pages;

use App\Filament\Resources\CampusSystems\CampusSystemResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCampusSystems extends ListRecords
{
    protected static string $resource = CampusSystemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
