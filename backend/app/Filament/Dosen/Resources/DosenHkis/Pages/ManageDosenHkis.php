<?php

namespace App\Filament\Dosen\Resources\DosenHkis\Pages;

use App\Filament\Dosen\Resources\DosenHkis\DosenHkiResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageDosenHkis extends ManageRecords
{
    protected static string $resource = DosenHkiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
