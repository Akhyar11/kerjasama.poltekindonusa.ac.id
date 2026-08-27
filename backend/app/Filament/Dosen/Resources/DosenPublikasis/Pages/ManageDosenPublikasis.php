<?php

namespace App\Filament\Dosen\Resources\DosenPublikasis\Pages;

use App\Filament\Dosen\Resources\DosenPublikasis\DosenPublikasiResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageDosenPublikasis extends ManageRecords
{
    protected static string $resource = DosenPublikasiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
