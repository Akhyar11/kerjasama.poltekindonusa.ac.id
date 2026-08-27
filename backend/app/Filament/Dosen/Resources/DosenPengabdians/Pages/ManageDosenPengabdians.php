<?php

namespace App\Filament\Dosen\Resources\DosenPengabdians\Pages;

use App\Filament\Dosen\Resources\DosenPengabdians\DosenPengabdianResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageDosenPengabdians extends ManageRecords
{
    protected static string $resource = DosenPengabdianResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
