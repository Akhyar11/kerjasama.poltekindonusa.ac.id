<?php

namespace App\Filament\Resources\UpcomingEvents\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Schemas\Components\Grid;

class UpcomingEventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Event')
                    ->schema([
                        Select::make('study_program_id')
                            ->relationship('studyProgram', 'name')
                            ->nullable()
                            ->label('Program Studi'),
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Textarea::make('description')
                            ->maxLength(65535)
                            ->columnSpanFull(),
                        DateTimePicker::make('event_datetime')
                            ->required(),
                        TextInput::make('link_url')
                            ->url()
                            ->maxLength(255)
                            ->label('Link Read More (opsional)'),
                        Toggle::make('is_active')
                            ->required()
                            ->default(true)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Flyer / Gambar Event')
                    ->description('Upload flyer atau gambar promosi event. Akan ditampilkan di sebelah kanan informasi event.')
                    ->schema([
                        FileUpload::make('flyer_image')
                            ->image()
                            ->disk('public')
                            ->directory('events/flyers')
                            ->imageEditor()
                            ->nullable()
                            ->label('Flyer Event')
                            ->columnSpanFull(),
                    ]),

                Section::make('Tampilan Latar Belakang')
                    ->description('Atur warna atau gambar latar untuk section dan card.')
                    ->schema([
                        ColorPicker::make('bg_color')
                            ->label('Warna Latar (fallback jika tidak ada gambar)')
                            ->default('#1a2a4a'),
                        Grid::make(2)
                            ->schema([
                                FileUpload::make('section_bg_image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('events/backgrounds')
                                    ->nullable()
                                    ->label('Background Section (gambar penuh di belakang)')
                                    ->helperText('Gambar yang menutupi seluruh area section'),
                                FileUpload::make('card_bg_image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('events/backgrounds')
                                    ->nullable()
                                    ->label('Background Card (gambar di dalam kartu)')
                                    ->helperText('Gambar yang ditampilkan sebagai latar dalam kartu'),
                            ]),
                    ]),
            ]);
    }
}
