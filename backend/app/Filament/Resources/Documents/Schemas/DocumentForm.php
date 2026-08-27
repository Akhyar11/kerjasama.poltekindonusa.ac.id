<?php

namespace App\Filament\Resources\Documents\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class DocumentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                Select::make('type')
                    ->options([
                        'pengumuman' => 'Pengumuman',
                        'pedoman' => 'Pedoman',
                        'akademik' => 'Akademik',
                        'lainnya' => 'Lainnya',
                    ])
                    ->required()
                    ->default('pengumuman'),
                Toggle::make('is_external')
                    ->label('Tautan Luar (Google Drive, dll)')
                    ->live()
                    ->default(false),
                FileUpload::make('file_path')
                    ->label('File')
                    ->directory('documents')
                    ->visible(fn ($get) => !$get('is_external'))
                    ->required(fn ($get) => !$get('is_external')),
                TextInput::make('external_url')
                    ->label('URL Tautan')
                    ->placeholder('https://drive.google.com/...')
                    ->visible(fn ($get) => $get('is_external'))
                    ->required(fn ($get) => $get('is_external'))
                    ->url(),
            ]);
    }
}
