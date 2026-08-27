<?php

namespace App\Filament\Dosen\Resources\DosenBukus\Pages;

use App\Filament\Dosen\Resources\DosenBukus\DosenBukuResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageDosenBukus extends ManageRecords
{
    protected static string $resource = DosenBukuResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
