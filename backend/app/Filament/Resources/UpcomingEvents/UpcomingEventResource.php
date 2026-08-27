<?php

namespace App\Filament\Resources\UpcomingEvents;

use App\Filament\Resources\UpcomingEvents\Pages\CreateUpcomingEvent;
use App\Filament\Resources\UpcomingEvents\Pages\EditUpcomingEvent;
use App\Filament\Resources\UpcomingEvents\Pages\ListUpcomingEvents;
use App\Filament\Resources\UpcomingEvents\Schemas\UpcomingEventForm;
use App\Filament\Resources\UpcomingEvents\Tables\UpcomingEventsTable;
use App\Models\UpcomingEvent;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class UpcomingEventResource extends Resource
{
    protected static ?string $model = UpcomingEvent::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return UpcomingEventForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return UpcomingEventsTable::configure($table);
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
            'index' => ListUpcomingEvents::route('/'),
            'create' => CreateUpcomingEvent::route('/create'),
            'edit' => EditUpcomingEvent::route('/{record}/edit'),
        ];
    }
}
