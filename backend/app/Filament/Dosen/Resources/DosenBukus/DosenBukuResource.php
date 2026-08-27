<?php

namespace App\Filament\Dosen\Resources\DosenBukus;

use App\Filament\Dosen\Resources\DosenBukus\Pages\ManageDosenBukus;
use App\Models\DosenBuku;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

class DosenBukuResource extends Resource
{
    protected static ?string $model = DosenBuku::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-book-open';

    protected static ?string $navigationLabel = 'Buku Karya Dosen';

    protected static ?string $modelLabel = 'Buku Karya Dosen';

    protected static ?string $pluralModelLabel = 'Buku Karya Dosen';

    protected static ?string $slug = 'buku-karya';

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->where('nidn', auth()->guard('dosen')->user()?->nidn);
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Hidden::make('nidn')
                    ->default(fn () => auth()->guard('dosen')->user()?->nidn),
                Select::make('kategori_kegiatan')
                    ->label('Kategori Kegiatan')
                    ->options([
                        'Buku Ajar' => 'Buku Ajar',
                        'Referensi' => 'Referensi',
                        'Monograf' => 'Monograf',
                    ])
                    ->required(),
                TextInput::make('judul')
                    ->label('Judul Buku')
                    ->required(),
                TextInput::make('isbn')
                    ->label('ISBN'),
                TextInput::make('penerbit')
                    ->label('Nama Penerbit'),
                TextInput::make('tahun_terbit')
                    ->label('Tahun Terbit'),
                TextInput::make('jumlah_halaman')
                    ->label('Jumlah Halaman'),
                Select::make('status_penulis')
                    ->label('Status Penulis')
                    ->options([
                        'Utama' => 'Utama',
                        'Anggota' => 'Anggota',
                    ])
                    ->required(),
                FileUpload::make('scan_cover')
                    ->label('Scan Cover')
                    ->disk('public')
                    ->directory('dosen/buku/cover'),
                FileUpload::make('daftar_isi')
                    ->label('Daftar Isi')
                    ->disk('public')
                    ->directory('dosen/buku/daftar-isi'),
                FileUpload::make('halaman_editorial')
                    ->label('Halaman Editorial / KDT')
                    ->disk('public')
                    ->directory('dosen/buku/editorial'),
                TextInput::make('link_publikasi')
                    ->label('Link Publikasi Penerbit')
                    ->placeholder('https://example.com')
                    ->url(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('kategori_kegiatan')
                    ->label('Kategori')
                    ->sortable(),
                TextColumn::make('judul')
                    ->label('Judul Buku')
                    ->searchable()
                    ->limit(40),
                TextColumn::make('isbn')
                    ->label('ISBN')
                    ->searchable(),
                TextColumn::make('penerbit')
                    ->label('Penerbit')
                    ->searchable(),
                TextColumn::make('tahun_terbit')
                    ->label('Tahun')
                    ->sortable(),
                TextColumn::make('status_penulis')
                    ->label('Penulis')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageDosenBukus::route('/'),
        ];
    }
}
