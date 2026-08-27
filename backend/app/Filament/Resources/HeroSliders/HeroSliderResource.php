<?php

namespace App\Filament\Resources\HeroSliders;

use App\Filament\Resources\HeroSliders\Pages\CreateHeroSlider;
use App\Filament\Resources\HeroSliders\Pages\EditHeroSlider;
use App\Filament\Resources\HeroSliders\Pages\ListHeroSliders;
use App\Filament\Resources\HeroSliders\Schemas\HeroSliderForm;
use App\Filament\Resources\HeroSliders\Tables\HeroSlidersTable;
use App\Models\HeroSlider;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class HeroSliderResource extends Resource
{
    protected static ?string $model = HeroSlider::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-presentation-chart-line';

    protected static string | UnitEnum | null $navigationGroup = 'Homepage';

    public static function canViewAny(): bool
    {
        return auth()->user()->isAdmin();
    }

    public static function form(Schema $schema): Schema
    {
        return HeroSliderForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return HeroSlidersTable::configure($table);
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
            'index' => ListHeroSliders::route('/'),
            'create' => CreateHeroSlider::route('/create'),
            'edit' => EditHeroSlider::route('/{record}/edit'),
        ];
    }
}
