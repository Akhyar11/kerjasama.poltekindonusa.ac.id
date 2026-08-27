<?php

namespace App\Filament\Resources\CampusSystems;

use App\Filament\Resources\CampusSystems\Pages\CreateCampusSystem;
use App\Filament\Resources\CampusSystems\Pages\EditCampusSystem;
use App\Filament\Resources\CampusSystems\Pages\ListCampusSystems;
use App\Models\CampusSystem;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;

class CampusSystemResource extends Resource
{
    protected static ?string $model = CampusSystem::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-computer-desktop';

    protected static string | UnitEnum | null $navigationGroup = 'Campus';

    protected static ?string $navigationLabel = 'Sistem Informasi';

    protected static ?string $modelLabel = 'Sistem Informasi';

    protected static ?string $pluralModelLabel = 'Sistem Informasi';

    protected static ?int $navigationSort = 1;

    public static function canViewAny(): bool
    {
        return auth()->user()->isAdmin();
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')
                ->label('Nama Aplikasi')
                ->required()
                ->maxLength(255),
            TextInput::make('link')
                ->label('URL / Link Aplikasi')
                ->required()
                ->url()
                ->placeholder('https://...')
                ->maxLength(500),
            TextInput::make('icon')
                ->label('Icon (Heroicon Name)')
                ->placeholder('heroicon-o-computer-desktop')
                ->helperText('Contoh: heroicon-o-computer-desktop, heroicon-o-globe-alt, heroicon-o-document-text')
                ->maxLength(100),
            Textarea::make('description')
                ->label('Deskripsi')
                ->rows(3)
                ->nullable(),
            TextInput::make('sort_order')
                ->label('Urutan Tampil')
                ->numeric()
                ->default(0),
            Toggle::make('is_active')
                ->label('Aktif')
                ->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')
                    ->label('#')
                    ->sortable()
                    ->width(50),
                TextColumn::make('name')
                    ->label('Nama Aplikasi')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('link')
                    ->label('Link')
                    ->limit(50)
                    ->url(fn ($record) => $record->link, true)
                    ->searchable(),
                TextColumn::make('icon')
                    ->label('Icon')
                    ->limit(30),
                ToggleColumn::make('is_active')
                    ->label('Aktif'),
                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TernaryFilter::make('is_active')
                    ->label('Status Aktif'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->reorderable('sort_order')
            ->defaultSort('sort_order');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => ListCampusSystems::route('/'),
            'create' => CreateCampusSystem::route('/create'),
            'edit'   => EditCampusSystem::route('/{record}/edit'),
        ];
    }
}
