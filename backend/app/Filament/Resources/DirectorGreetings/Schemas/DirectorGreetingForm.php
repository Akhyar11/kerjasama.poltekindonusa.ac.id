<?php

namespace App\Filament\Resources\DirectorGreetings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class DirectorGreetingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('position')
                    ->required(),
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('director'),
                \Filament\Forms\Components\RichEditor::make('message')
                    ->required()
                    ->toolbarButtons([
                        'h2', 'h3', 'bold', 'italic', 'link',
                        'bulletList', 'orderedList', 'blockquote',
                        'alignStart', 'alignCenter', 'alignEnd', 'alignJustify',
                        'undo', 'redo',
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
