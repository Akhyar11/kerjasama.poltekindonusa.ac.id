<?php

namespace App\Filament\Dosen\Resources\DosenSertifikatKompetensis;

use App\Filament\Dosen\Resources\DosenSertifikatKompetensis\Pages\ManageDosenSertifikatKompetensis;
use App\Models\DosenSertifikatKompetensi;
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

class DosenSertifikatKompetensiResource extends Resource
{
    protected static ?string $model = DosenSertifikatKompetensi::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-identification';

    protected static ?string $navigationLabel = 'Sertifikat Kompetensi';

    protected static ?string $modelLabel = 'Sertifikat Kompetensi';

    protected static ?string $pluralModelLabel = 'Sertifikat Kompetensi';

    protected static ?string $slug = 'sertifikat-kompetensi';

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
                TextInput::make('nama_sertifikat')
                    ->label('Nama Sertifikasi')
                    ->required(),
                TextInput::make('penerbit')
                    ->label('Lembaga Penerbit')
                    ->placeholder('Contoh: BNSP / Cisco / Microsoft / Oracle')
                    ->required(),
                TextInput::make('no_sertifikat')
                    ->label('Nomor Sertifikat')
                    ->required(),
                TextInput::make('tanggal_terbit')
                    ->label('Tanggal Terbit')
                    ->placeholder('Contoh: 15 Mei 2025')
                    ->required(),
                TextInput::make('masa_berlaku')
                    ->label('Masa Berlaku')
                    ->placeholder('Contoh: 15 Mei 2028 / Selamanya'),
                Select::make('skala_level')
                    ->label('Skala Level')
                    ->options([
                        'Nasional' => 'Nasional',
                        'Internasional' => 'Internasional',
                    ])
                    ->required(),
                FileUpload::make('file_sertifikat')
                    ->label('Upload Dokumen Sertifikat')
                    ->disk('public')
                    ->directory('dosen/sertifikat/kompetensi'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama_sertifikat')
                    ->label('Nama Sertifikasi')
                    ->searchable()
                    ->limit(40),
                TextColumn::make('penerbit')
                    ->label('Penerbit')
                    ->searchable(),
                TextColumn::make('no_sertifikat')
                    ->label('No. Sertifikat')
                    ->searchable(),
                TextColumn::make('tanggal_terbit')
                    ->label('Tanggal Terbit'),
                TextColumn::make('masa_berlaku')
                    ->label('Masa Berlaku'),
                TextColumn::make('skala_level')
                    ->label('Level')
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
            'index' => ManageDosenSertifikatKompetensis::route('/'),
        ];
    }
}
