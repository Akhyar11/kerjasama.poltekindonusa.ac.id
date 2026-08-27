<?php

namespace App\Filament\Resources\HeroSliders\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class HeroSliderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('subtitle')
                    ->maxLength(255),
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->required()
                    ->directory('hero'),
                TextInput::make('button_text')
                    ->maxLength(255),
                TextInput::make('button_url')
                    ->maxLength(255),
                TextInput::make('order')
                    ->numeric()
                    ->default(0),
                Toggle::make('show_title')
                    ->label('Show Title & Subtitle')
                    ->default(true),
                Toggle::make('show_overlay')
                    ->label('Enable Dark Overlay')
                    ->default(true),
                Toggle::make('is_active')
                    ->default(true),
            ]);
    }
}
