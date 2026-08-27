<?php

namespace App\Filament\Resources\Settings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class SettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->required()
                    ->disabled()
                    ->maxLength(255),
                FileUpload::make('value')
                    ->label('Value (Image)')
                    ->image()
                    ->disk('public')
                    ->directory('settings')
                    ->hidden(fn ($record) => $record?->type !== 'image'),
                TextInput::make('value')
                    ->label('Value')
                    ->hidden(fn ($record) => $record?->type !== 'text'),
                Textarea::make('value')
                    ->label('Value (Long Text)')
                    ->hidden(fn ($record) => $record?->type !== 'textarea'),
                TextInput::make('group')
                    ->required()
                    ->maxLength(255),
            ]);
    }
}
