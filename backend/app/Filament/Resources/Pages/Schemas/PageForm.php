<?php

namespace App\Filament\Resources\Pages\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Components\Section;
use Illuminate\Support\Str;
use Filament\Schemas\Schema;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // ── Informasi Halaman ──────────────────────────────
                Section::make('Informasi Halaman')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->live(debounce: 500)
                            ->afterStateUpdated(fn ($set, $state) => $set('slug', Str::slug($state))),
                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),
                        RichEditor::make('content')
                            ->toolbarButtons([
                                'h2',
                                'h3',
                                'bold',
                                'italic',
                                'link',
                                'bulletList',
                                'orderedList',
                                'blockquote',
                                'alignStart',
                                'alignCenter',
                                'alignEnd',
                                'alignJustify',
                                'table',
                                'undo',
                                'redo',
                            ])
                            ->columnSpanFull(),
                    ]),

                // ── Media (Gambar & YouTube) ──────────────────────
                Section::make('Media (Gambar & YouTube)')
                    ->description('Tambahkan gambar dan/atau video YouTube untuk halaman ini. Anda bisa menambahkan beberapa media.')
                    ->schema([
                        // Legacy single image field (tetap ada untuk backward compatibility)
                        FileUpload::make('image')
                            ->label('Gambar Utama (Opsional)')
                            ->helperText('Gambar utama halaman yang tampil di bagian atas.')
                            ->image()
                            ->disk('public')
                            ->directory('pages')
                            ->imageEditor()
                            ->maxSize(5120),

                        // Legacy YouTube URL field
                        TextInput::make('youtube_url')
                            ->label('URL YouTube Utama (Opsional)')
                            ->helperText('Video YouTube utama. Jika diisi, akan ditampilkan di atas gambar.')
                            ->url()
                            ->placeholder('https://www.youtube.com/watch?v=...')
                            ->maxLength(255),

                        // Multiple media items via repeater
                        Repeater::make('media')
                            ->relationship('media')
                            ->label('Media Tambahan')
                            ->schema([
                                Select::make('type')
                                    ->label('Tipe Media')
                                    ->options([
                                        'image' => '🖼️ Gambar',
                                        'youtube' => '▶️ Video YouTube',
                                    ])
                                    ->default('image')
                                    ->required()
                                    ->live()
                                    ->afterStateUpdated(function ($set, $state) {
                                        // Clear the other field when type changes
                                        if ($state === 'image') {
                                            $set('youtube_url', null);
                                        } else {
                                            $set('image_path', null);
                                        }
                                    }),

                                FileUpload::make('image_path')
                                    ->label('Upload Gambar')
                                    ->image()
                                    ->disk('public')
                                    ->directory('pages/gallery')
                                    ->imageEditor()
                                    ->maxSize(5120)
                                    ->visible(fn ($get) => $get('type') === 'image')
                                    ->required(fn ($get) => $get('type') === 'image'),

                                TextInput::make('youtube_url')
                                    ->label('URL YouTube')
                                    ->url()
                                    ->placeholder('https://www.youtube.com/watch?v=...')
                                    ->maxLength(255)
                                    ->visible(fn ($get) => $get('type') === 'youtube')
                                    ->required(fn ($get) => $get('type') === 'youtube'),

                                TextInput::make('caption')
                                    ->label('Keterangan (Opsional)')
                                    ->placeholder('Keterangan gambar atau video...')
                                    ->maxLength(255),

                                TextInput::make('sort_order')
                                    ->label('Urutan')
                                    ->numeric()
                                    ->default(0)
                                    ->minValue(0),
                            ])
                            ->reorderable(true)
                            ->collapsible()
                            ->cloneable()
                            ->defaultItems(0)
                            ->createItemButtonLabel('+ Tambah Media')
                            ->grid(1)
                            ->itemLabel(fn (array $state): ?string => 
                                match($state['type'] ?? 'image') {
                                    'image' => '🖼️ Gambar' . (!empty($state['caption']) ? ': ' . $state['caption'] : ''),
                                    'youtube' => '▶️ YouTube' . (!empty($state['caption']) ? ': ' . $state['caption'] : ''),
                                    default => 'Media',
                                }
                            ),
                    ]),
            ]);
    }
}
