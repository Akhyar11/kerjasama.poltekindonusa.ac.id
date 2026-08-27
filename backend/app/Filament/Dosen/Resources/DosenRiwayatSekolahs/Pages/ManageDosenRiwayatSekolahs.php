<?php

namespace App\Filament\Dosen\Resources\DosenRiwayatSekolahs\Pages;

use App\Filament\Dosen\Resources\DosenRiwayatSekolahs\DosenRiwayatSekolahResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageDosenRiwayatSekolahs extends ManageRecords
{
    protected static string $resource = DosenRiwayatSekolahResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
