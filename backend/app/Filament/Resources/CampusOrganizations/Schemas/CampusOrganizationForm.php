<?php

namespace App\Filament\Resources\CampusOrganizations\Schemas;

use Filament\Schemas\Schema;

class CampusOrganizationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $operation, $state, \Filament\Forms\Set $set) => $operation === 'create' ? $set('slug', \Illuminate\Support\Str::slug($state)) : null),
                \Filament\Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
                \Filament\Forms\Components\Select::make('type')
                    ->options([
                        'BEM' => 'BEM',
                        'HMJ' => 'HMJ',
                        'UKM' => 'UKM',
                    ])
                    ->required(),
                \Filament\Forms\Components\FileUpload::make('logo')
                    ->image()
                    ->directory('campus-organizations'),
                \Filament\Forms\Components\RichEditor::make('vision')
                    ->columnSpanFull(),
                \Filament\Forms\Components\RichEditor::make('mission')
                    ->columnSpanFull(),
                \Filament\Forms\Components\RichEditor::make('achievements')
                    ->columnSpanFull(),
            ]);
    }
}
