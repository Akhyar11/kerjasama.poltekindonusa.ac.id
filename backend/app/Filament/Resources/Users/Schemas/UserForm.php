<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                Select::make('role')
                    ->options([
                        'admin' => 'Administrator',
                        'editor_berita' => 'Editor Berita',
                        'study_program' => 'Program Studi',
                        'campus_organization' => 'Organisasi Kampus',
                    ])
                    ->required()
                    ->default('admin')
                    ->live(),
                Select::make('study_program_id')
                    ->label('Program Studi')
                    ->relationship('studyProgram', 'name')
                    ->required(fn ($get) => $get('role') === 'study_program')
                    ->visible(fn ($get) => $get('role') === 'study_program')
                    ->searchable()
                    ->preload(),
                Select::make('campus_organization_id')
                    ->label('Organisasi Kampus')
                    ->relationship('campusOrganization', 'name')
                    ->required(fn ($get) => $get('role') === 'campus_organization')
                    ->visible(fn ($get) => $get('role') === 'campus_organization')
                    ->searchable()
                    ->preload(),
                TextInput::make('password')
                    ->password()
                    ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                    ->dehydrated(fn ($state) => filled($state))
                    ->required(fn (string $context): bool => $context === 'create'),
            ]);
    }
}
