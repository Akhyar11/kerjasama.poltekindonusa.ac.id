<?php

namespace App\Filament\Dosen\Resources\DosenSertifikatPenghargaans\Pages;

use App\Filament\Dosen\Resources\DosenSertifikatPenghargaans\DosenSertifikatPenghargaanResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageDosenSertifikatPenghargaans extends ManageRecords
{
    protected static string $resource = DosenSertifikatPenghargaanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
