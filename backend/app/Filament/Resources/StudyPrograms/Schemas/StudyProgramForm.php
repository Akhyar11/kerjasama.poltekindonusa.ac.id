<?php

namespace App\Filament\Resources\StudyPrograms\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Select;
use Illuminate\Support\Str;
use Filament\Schemas\Schema;

class StudyProgramForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->live(debounce: 500)
                    ->afterStateUpdated(fn ($set, $state) => $set('slug', \Illuminate\Support\Str::slug($state))),
                TextInput::make('icon')
                    ->label('Icon (Heroicon Name)')
                    ->placeholder('heroicon-o-academic-cap')
                    ->helperText('Nama heroicon, contoh: heroicon-o-academic-cap, heroicon-o-book-open, heroicon-o-beaker')
                    ->nullable(),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),
                TextInput::make('degree')
                    ->default(null),
                TextInput::make('accreditation')
                    ->default(null),
                RichEditor::make('description')
                    ->default(null)
                    ->toolbarButtons([
                        'h2', 'h3', 'bold', 'italic', 'link',
                        'bulletList', 'orderedList', 'blockquote', 'codeBlock',
                        'alignStart', 'alignCenter', 'alignEnd', 'alignJustify',
                        'table',
                        'undo', 'redo',
                    ])
                    ->columnSpanFull(),
                RichEditor::make('graduate_profile')
                    ->label('Profil Lulusan')
                    ->toolbarButtons([
                        'h2', 'h3', 'bold', 'italic', 'link',
                        'bulletList', 'orderedList', 'blockquote',
                        'alignStart', 'alignCenter', 'alignEnd', 'alignJustify',
                        'table',
                        'undo', 'redo',
                    ])
                    ->columnSpanFull(),
                TextInput::make('video_url')
                    ->label('YouTube Video URL')
                    ->placeholder('https://www.youtube.com/watch?v=...'),
                FileUpload::make('image')
                    ->label('Program Icon/Image')
                    ->image()
                    ->disk('public')
                    ->directory('study-programs'),
                FileUpload::make('cover_image')
                    ->label('Background Cover Image')
                    ->image()
                    ->disk('public')
                    ->directory('study-programs/covers')
                    ->live(),
                \Filament\Forms\Components\ViewField::make('cover_image_focus')
                    ->view('admin.focal-point-picker')
                    ->default('50% 50%')
                    ->columnSpanFull(),
                TextInput::make('hover_bg_color')
                    ->label('Hover Card Background (Hex or CSS Gradient)')
                    ->placeholder('e.g., linear-gradient(135deg, #0d2440, #1e3a8a)')
                    ->helperText('Mendukung format Hex (#0d2440) atau CSS Gradient (linear-gradient(...))')
                    ->default('linear-gradient(135deg, #0d2440 0%, #1e3a8a 100%)'),
                ColorPicker::make('hover_border_color')
                    ->label('Hover Card Border Color')
                    ->default('#f0a500'),
                ColorPicker::make('hover_text_color')
                    ->label('Hover Card Text Color')
                    ->default('#ffffff'),
                RichEditor::make('prestasi')
                    ->label('Prestasi Program Studi')
                    ->toolbarButtons([
                        'h2', 'h3', 'bold', 'italic', 'link',
                        'bulletList', 'orderedList', 'blockquote',
                        'alignStart', 'alignCenter', 'alignEnd', 'alignJustify',
                        'table',
                        'undo', 'redo',
                    ])
                    ->columnSpanFull(),
                FileUpload::make('sertifikat_akreditasi')
                    ->label('Sertifikat Akreditasi')
                    ->directory('study-programs/certificates')
                    ->acceptedFileTypes(['image/*', 'application/pdf']),
                \Filament\Schemas\Components\Section::make('Struktur Organisasi (Org Chart)')
                    ->description('Atur hierarki struktur organisasi program studi. Anggota teratas (seperti Ketua Program Studi) dikosongkan bagian Atasan Langsung-nya.')
                    ->schema([
                        \Filament\Forms\Components\Repeater::make('org_structure')
                            ->label('Anggota Organisasi')
                            ->schema([
                                \Filament\Forms\Components\Hidden::make('id')
                                    ->default(fn () => (string) \Illuminate\Support\Str::uuid()),
                                \Filament\Forms\Components\TextInput::make('name')
                                    ->label('Nama Lengkap & Gelar')
                                    ->required()
                                    ->live(onBlur: true),
                                \Filament\Forms\Components\TextInput::make('position')
                                    ->label('Jabatan')
                                    ->required()
                                    ->live(onBlur: true),
                                \Filament\Forms\Components\FileUpload::make('photo')
                                    ->label('Foto Anggota')
                                    ->image()
                                    ->disk('public')
                                    ->directory('study-programs/org-charts'),
                                \Filament\Forms\Components\Select::make('parent_id')
                                    ->label('Atasan Langsung (Laporan Ke)')
                                    ->placeholder('Pilih Atasan (Kosongkan jika ini Pimpinan Tertinggi/Kaprodi)')
                                    ->options(function (callable $get) {
                                        try {
                                            $repeaterItems = $get('../..') ?? [];
                                            $options = [];
                                            if (is_array($repeaterItems)) {
                                                foreach ($repeaterItems as $item) {
                                                    if (is_array($item)) {
                                                        $itemId = $item['id'] ?? null;
                                                        if ($itemId && (!empty($item['position']) || !empty($item['name']))) {
                                                            $options[$itemId] = ($item['position'] ?? '') . ' - ' . ($item['name'] ?? '');
                                                        }
                                                    }
                                                }
                                            }
                                            return $options;
                                        } catch (\Throwable $e) {
                                            \Illuminate\Support\Facades\Log::error('Error in parent_id options: ' . $e->getMessage());
                                            return [];
                                        }
                                    })
                                    ->searchable()
                                    ->live(),
                            ])
                            ->columns(2)
                            ->itemLabel(function ($state): ?string {
                                if (!is_array($state)) {
                                    return null;
                                }
                                $label = [];
                                if (!empty($state['position'])) {
                                    $label[] = $state['position'];
                                }
                                if (!empty($state['name'])) {
                                    $label[] = $state['name'];
                                }
                                return count($label) > 0 ? implode(' - ', $label) : 'Anggota Baru';
                            })
                            ->columnSpanFull()
                            ->createItemButtonLabel('Tambah Anggota Struktur')
                    ])
                    ->collapsible()
                    ->columnSpanFull(),
            ]);
    }
}
