<?php

namespace App\Filament\Resources\Documents\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DocumentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pengumuman' => 'info',
                        'pedoman' => 'warning',
                        'akademik' => 'success',
                        default => 'gray',
                    }),
                TextColumn::make('is_external')
                    ->label('Tautan?')
                    ->formatStateUsing(fn ($state) => $state ? '🔗 Link' : '📁 File')
                    ->badge()
                    ->color(fn ($state) => $state ? 'warning' : 'info'),
                TextColumn::make('file_path')
                    ->label('Source')
                    ->formatStateUsing(fn ($record) => $record->is_external ? $record->external_url : $record->file_path)
                    ->limit(30)
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
