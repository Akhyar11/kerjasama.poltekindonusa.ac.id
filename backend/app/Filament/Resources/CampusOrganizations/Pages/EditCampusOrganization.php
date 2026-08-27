<?php

namespace App\Filament\Resources\CampusOrganizations\Pages;

use App\Filament\Resources\CampusOrganizations\CampusOrganizationResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCampusOrganization extends EditRecord
{
    protected static string $resource = CampusOrganizationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
