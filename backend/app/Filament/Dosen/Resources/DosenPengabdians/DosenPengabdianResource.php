<?php

namespace App\Filament\Dosen\Resources\DosenPengabdians;

use App\Filament\Dosen\Resources\DosenPengabdians\Pages\ManageDosenPengabdians;
use App\Models\DosenPengabdian;
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

class DosenPengabdianResource extends Resource
{
    protected static ?string $model = DosenPengabdian::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationLabel = 'Pengabdian Masyarakat';

    protected static ?string $modelLabel = 'Pengabdian Masyarakat';

    protected static ?string $pluralModelLabel = 'Pengabdian Masyarakat';

    protected static ?string $slug = 'pengabdian-masyarakat';

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
                TextInput::make('judul')
                    ->label('Judul Kegiatan')
                    ->required(),
                TextInput::make('jenis_kegiatan')
                    ->label('Jenis Kegiatan')
                    ->required(),
                TextInput::make('lokasi_mitra')
                    ->label('Lokasi & Mitra Sasaran')
                    ->required(),
                TextInput::make('durasi')
                    ->label('Durasi Pelaksanaan')
                    ->placeholder('Contoh: 6 bulan / 1 semester')
                    ->required(),
                TextInput::make('sumber_dana')
                    ->label('Sumber Pendanaan'),
                TextInput::make('nominal_dana')
                    ->label('Nominal Pendanaan (Rp)')
                    ->placeholder('Contoh: 10000000'),
                Select::make('peran')
                    ->label('Peran')
                    ->options([
                        'Ketua' => 'Ketua',
                        'Anggota' => 'Anggota',
                    ])
                    ->required(),
                FileUpload::make('sk_tugas')
                    ->label('Scan SK Tugas (PDF / Gambar)')
                    ->disk('public')
                    ->directory('dosen/pengabdian/sk'),
                FileUpload::make('laporan_akhir')
                    ->label('Laporan Akhir (PDF)')
                    ->disk('public')
                    ->directory('dosen/pengabdian/laporan'),
                FileUpload::make('surat_mitra')
                    ->label('Surat Keterangan Mitra (PDF / Gambar)')
                    ->disk('public')
                    ->directory('dosen/pengabdian/mitra'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('judul')
                    ->label('Judul')
                    ->searchable()
                    ->limit(40),
                TextColumn::make('jenis_kegiatan')
                    ->label('Jenis')
                    ->searchable(),
                TextColumn::make('lokasi_mitra')
                    ->label('Lokasi/Mitra')
                    ->searchable(),
                TextColumn::make('durasi')
                    ->label('Durasi'),
                TextColumn::make('peran')
                    ->label('Peran')
                    ->sortable(),
                TextColumn::make('nominal_dana')
                    ->label('Nominal Dana'),
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
            'index' => ManageDosenPengabdians::route('/'),
        ];
    }
}
