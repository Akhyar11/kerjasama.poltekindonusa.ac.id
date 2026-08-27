<?php

namespace App\Filament\Resources\CampusOrganizations\Pages;

use App\Filament\Resources\CampusOrganizations\CampusOrganizationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCampusOrganizations extends ListRecords
{
    protected static string $resource = CampusOrganizationResource::class;

    public function mount(): void
    {
        parent::mount();
        $user = auth()->user();
        if ($user->isCampusOrganization() && $user->campus_organization_id) {
            redirect()->to(CampusOrganizationResource::getUrl('edit', ['record' => $user->campus_organization_id]));
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
