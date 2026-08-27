<?php

namespace App\Filament\Dosen\Resources\DosenRiwayatSekolahs;

use App\Filament\Dosen\Resources\DosenRiwayatSekolahs\Pages\ManageDosenRiwayatSekolahs;
use App\Models\DosenRiwayatSekolah;
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
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

class DosenRiwayatSekolahResource extends Resource
{
    protected static ?string $model = DosenRiwayatSekolah::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationLabel = 'Riwayat Sekolah';

    protected static ?string $modelLabel = 'Riwayat Sekolah';

    protected static ?string $pluralModelLabel = 'Riwayat Sekolah';

    protected static ?string $slug = 'riwayat-sekolah';

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
                TextInput::make('jenjang')
                    ->label('Jenjang')
                    ->placeholder('Contoh: S1 / S2 / S3')
                    ->required(),
                TextInput::make('nama_pt')
                    ->label('Nama PT (Perguruan Tinggi)')
                    ->required(),
                TextInput::make('fakultas_prodi')
                    ->label('Fakultas / Prodi')
                    ->placeholder('Contoh: Teknik / Teknik Informatika'),
                TextInput::make('tahun_masuk')
                    ->label('Tahun Masuk')
                    ->placeholder('Contoh: 2015'),
                TextInput::make('tahun_lulus')
                    ->label('Tahun Lulus')
                    ->placeholder('Contoh: 2019'),
                TextInput::make('gelar')
                    ->label('Gelar')
                    ->placeholder('Contoh: S.Kom., M.Cs.'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('jenjang')
                    ->label('Jenjang')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('nama_pt')
                    ->label('Perguruan Tinggi')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('fakultas_prodi')
                    ->label('Fakultas/Prodi')
                    ->searchable(),
                TextColumn::make('tahun_masuk')
                    ->label('Tahun Masuk')
                    ->sortable(),
                TextColumn::make('tahun_lulus')
                    ->label('Tahun Lulus')
                    ->sortable(),
                TextColumn::make('gelar')
                    ->label('Gelar'),
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
            'index' => ManageDosenRiwayatSekolahs::route('/'),
        ];
    }
}
