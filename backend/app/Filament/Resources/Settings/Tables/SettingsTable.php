<?php

namespace App\Filament\Resources\Settings\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('key')
                    ->searchable(),
                TextColumn::make('group')
                    ->badge()
                    ->searchable(),
                TextColumn::make('value')
                    ->limit(50),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                \Filament\Tables\Filters\SelectFilter::make('group')
                    ->options([
                        'General' => 'General',
                        'SEO' => 'SEO',
                        'Contact' => 'Contact',
                        'Email Settings' => 'Email Settings',
                        'Social Media' => 'Social Media',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([]);
    }
}
