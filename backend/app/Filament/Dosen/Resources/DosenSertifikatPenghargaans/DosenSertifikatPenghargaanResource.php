<?php

namespace App\Filament\Dosen\Resources\DosenSertifikatPenghargaans;

use App\Filament\Dosen\Resources\DosenSertifikatPenghargaans\Pages\ManageDosenSertifikatPenghargaans;
use App\Models\DosenSertifikatPenghargaan;
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

class DosenSertifikatPenghargaanResource extends Resource
{
    protected static ?string $model = DosenSertifikatPenghargaan::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-trophy';

    protected static ?string $navigationLabel = 'Sertifikat Penghargaan';

    protected static ?string $modelLabel = 'Sertifikat Penghargaan';

    protected static ?string $pluralModelLabel = 'Sertifikat Penghargaan';

    protected static ?string $slug = 'sertifikat-penghargaan';

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
                TextInput::make('nama_penghargaan')
                    ->label('Nama Penghargaan')
                    ->required(),
                TextInput::make('pemberi')
                    ->label('Lembaga Pemberi')
                    ->required(),
                TextInput::make('no_sertifikat')
                    ->label('Nomor SK / Sertifikat'),
                TextInput::make('tanggal_perolehan')
                    ->label('Tanggal Perolehan')
                    ->placeholder('Contoh: 15 Mei 2025')
                    ->required(),
                Select::make('skala_level')
                    ->label('Tingkat Skala')
                    ->options([
                        'Nasional' => 'Nasional',
                        'Internasional' => 'Internasional',
                    ])
                    ->required(),
                FileUpload::make('file_penghargaan')
                    ->label('Scan Piagam Asli')
                    ->disk('public')
                    ->directory('dosen/sertifikat/penghargaan'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama_penghargaan')
                    ->label('Nama Penghargaan')
                    ->searchable()
                    ->limit(40),
                TextColumn::make('pemberi')
                    ->label('Pemberi')
                    ->searchable(),
                TextColumn::make('no_sertifikat')
                    ->label('No. SK/Sertifikat')
                    ->searchable(),
                TextColumn::make('tanggal_perolehan')
                    ->label('Tanggal Perolehan'),
                TextColumn::make('skala_level')
                    ->label('Skala Level')
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
            'index' => ManageDosenSertifikatPenghargaans::route('/'),
        ];
    }
}
