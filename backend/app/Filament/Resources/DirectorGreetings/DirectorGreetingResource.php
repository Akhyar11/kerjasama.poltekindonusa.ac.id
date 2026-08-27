<?php

namespace App\Filament\Resources\DirectorGreetings;

use App\Filament\Resources\DirectorGreetings\Pages\CreateDirectorGreeting;
use App\Filament\Resources\DirectorGreetings\Pages\EditDirectorGreeting;
use App\Filament\Resources\DirectorGreetings\Pages\ListDirectorGreetings;
use App\Filament\Resources\DirectorGreetings\Schemas\DirectorGreetingForm;
use App\Filament\Resources\DirectorGreetings\Tables\DirectorGreetingsTable;
use App\Models\DirectorGreeting;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class DirectorGreetingResource extends Resource
{
    protected static ?string $model = DirectorGreeting::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-user-circle';

    protected static string | UnitEnum | null $navigationGroup = 'Homepage';

    public static function canViewAny(): bool
    {
        return auth()->user()->isAdmin();
    }

    public static function form(Schema $schema): Schema
    {
        return DirectorGreetingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DirectorGreetingsTable::configure($table);
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
            'index' => ListDirectorGreetings::route('/'),
            'create' => CreateDirectorGreeting::route('/create'),
            'edit' => EditDirectorGreeting::route('/{record}/edit'),
        ];
    }
}
