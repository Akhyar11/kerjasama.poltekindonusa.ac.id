<?php

namespace App\Filament\Resources\News\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\DateTimePicker;
use Filament\Schemas\Schema;

class NewsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // ── Informasi Berita ──────────────────────────────────────
                Select::make('news_category_id')
                    ->relationship('category', 'name')
                    ->required(fn () => auth()->user()->isAdmin() || auth()->user()->isEditorBerita())
                    ->searchable()
                    ->preload()
                    ->hidden(fn () => auth()->user()->isStudyProgram() || auth()->user()->isCampusOrganization()),
                TextInput::make('title')
                    ->required()
                    ->live(debounce: 500)
                    ->afterStateUpdated(function ($set, $state) {
                        $set('slug', \Illuminate\Support\Str::slug($state));
                        $set('meta_title', $state);
                    }),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),
                RichEditor::make('content')
                    ->required()
                    ->toolbarButtons([
                        'h2', 'h3', 'bold', 'italic', 'link',
                        'bulletList', 'orderedList', 'blockquote',
                        'alignStart', 'alignCenter', 'alignEnd', 'alignJustify',
                        'table',
                        'undo', 'redo',
                    ])
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->label('Main Image')
                    ->image()
                    ->disk('public')
                    ->directory('news'),
                Repeater::make('images')
                    ->relationship('images')
                    ->schema([
                        FileUpload::make('image_path')
                            ->label('Image')
                            ->image()
                            ->disk('public')
                            ->directory('news/gallery')
                            ->required(),
                    ])
                    ->label('Additional Images')
                    ->reorderable(false)
                    ->defaultItems(0)
                    ->maxItems(3)
                    ->grid(3),
                Toggle::make('is_published')
                    ->required()
                    ->default(true),
                DateTimePicker::make('published_at')
                    ->label('Tanggal Publish')
                    ->helperText('Tanggal dan waktu berita akan/sudah diterbitkan. Kosongkan untuk menggunakan tanggal saat ini.')
                    ->default(now())
                    ->nullable()
                    ->native(false)
                    ->displayFormat('d M Y, H:i')
                    ->timezone('Asia/Jakarta'),

                // ── SEO & Meta ────────────────────────────────────────────
                TextInput::make('meta_title')
                    ->label('Meta Title (SEO)')
                    ->helperText('Judul di Google/tab browser. Maks 60 karakter. Otomatis terisi dari judul berita.')
                    ->maxLength(60)
                    ->placeholder('Otomatis terisi dari judul berita')
                    ->columnSpanFull(),
                Textarea::make('meta_description')
                    ->label('Meta Description (SEO)')
                    ->helperText('Deskripsi di Google. Idealnya 120–160 karakter.')
                    ->rows(3)
                    ->maxLength(160)
                    ->placeholder('Ringkasan singkat isi berita untuk hasil pencarian Google...')
                    ->columnSpanFull(),
                TextInput::make('meta_keywords')
                    ->label('Meta Keywords')
                    ->helperText('Kata kunci dipisah koma. Contoh: politeknik, berita, akademik')
                    ->placeholder('kata kunci 1, kata kunci 2, kata kunci 3')
                    ->columnSpanFull(),
                TextInput::make('tags')
                    ->label('Tags')
                    ->helperText('Tag untuk berita terkait. Dipisah koma. Contoh: wisuda, akademik, kegiatan')
                    ->placeholder('tag1, tag2, tag3')
                    ->columnSpanFull(),
            ]);
    }
}
