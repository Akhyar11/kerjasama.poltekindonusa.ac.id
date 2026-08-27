<?php

namespace App\Filament\Dosen\Resources\DosenSertifikatKompetensis\Pages;

use App\Filament\Dosen\Resources\DosenSertifikatKompetensis\DosenSertifikatKompetensiResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageDosenSertifikatKompetensis extends ManageRecords
{
    protected static string $resource = DosenSertifikatKompetensiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
