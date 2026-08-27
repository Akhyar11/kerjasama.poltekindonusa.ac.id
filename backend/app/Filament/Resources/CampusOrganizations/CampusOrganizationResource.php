<?php

namespace App\Filament\Resources\CampusOrganizations;

use App\Filament\Resources\CampusOrganizations\Pages\CreateCampusOrganization;
use App\Filament\Resources\CampusOrganizations\Pages\EditCampusOrganization;
use App\Filament\Resources\CampusOrganizations\Pages\ListCampusOrganizations;
use App\Filament\Resources\CampusOrganizations\Schemas\CampusOrganizationForm;
use App\Filament\Resources\CampusOrganizations\Tables\CampusOrganizationsTable;
use App\Models\CampusOrganization;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CampusOrganizationResource extends Resource
{
    protected static ?string $model = CampusOrganization::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-user-group';

    protected static string|\UnitEnum|null $navigationGroup = 'Academic';

    protected static ?int $navigationSort = 3;

    protected static ?string $recordTitleAttribute = 'name';

    public static function canViewAny(): bool
    {
        return auth()->user()->isAdmin() || auth()->user()->isCampusOrganization();
    }

    public static function getNavigationUrl(): string
    {
        $user = auth()->user();
        if ($user->isCampusOrganization() && $user->campus_organization_id) {
            return static::getUrl('edit', ['record' => $user->campus_organization_id]);
        }
        return parent::getNavigationUrl();
    }

    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
    {
        $query = parent::getEloquentQuery();
        $user = auth()->user();
        
        if ($user->isCampusOrganization()) {
            $query->where('id', $user->campus_organization_id);
        }
        
        return $query;
    }
    public static function form(Schema $schema): Schema
    {
        return CampusOrganizationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CampusOrganizationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCampusOrganizations::route('/'),
            'create' => CreateCampusOrganization::route('/create'),
            'edit' => EditCampusOrganization::route('/{record}/edit'),
        ];
    }
}
