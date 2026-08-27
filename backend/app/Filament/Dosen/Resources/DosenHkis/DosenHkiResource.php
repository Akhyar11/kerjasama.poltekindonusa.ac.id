<?php

namespace App\Filament\Dosen\Resources\DosenHkis;

use App\Filament\Dosen\Resources\DosenHkis\Pages\ManageDosenHkis;
use App\Models\DosenHki;
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
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

class DosenHkiResource extends Resource
{
    protected static ?string $model = DosenHki::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-shield-check';

    protected static ?string $navigationLabel = 'HKI';

    protected static ?string $modelLabel = 'HKI';

    protected static ?string $pluralModelLabel = 'HKI';

    protected static ?string $slug = 'hki';

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
                Select::make('jenis_hki')
                    ->label('Jenis HKI')
                    ->options([
                        'Hak Cipta' => 'Hak Cipta',
                        'Paten' => 'Paten',
                    ])
                    ->required(),
                TextInput::make('judul')
                    ->label('Judul Karya')
                    ->required(),
                TextInput::make('nomor_permohonan')
                    ->label('Nomor Permohonan'),
                TextInput::make('nomor_sertifikat')
                    ->label('Nomor Sertifikat'),
                TextInput::make('tanggal_disetujui')
                    ->label('Tanggal Disetujui')
                    ->placeholder('Contoh: 15 Mei 2025'),
                Textarea::make('daftar_pencipta')
                    ->label('Daftar Pencipta')
                    ->placeholder('Contoh: Budi, Joko, Ani')
                    ->rows(3),
                FileUpload::make('sertifikat_djki')
                    ->label('Upload Sertifikat Resmi DJKI')
                    ->disk('public')
                    ->directory('dosen/hki'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('jenis_hki')
                    ->label('Jenis')
                    ->sortable(),
                TextColumn::make('judul')
                    ->label('Judul Karya')
                    ->searchable()
                    ->limit(40),
                TextColumn::make('nomor_permohonan')
                    ->label('No. Permohonan')
                    ->searchable(),
                TextColumn::make('nomor_sertifikat')
                    ->label('No. Sertifikat')
                    ->searchable(),
                TextColumn::make('tanggal_disetujui')
                    ->label('Tanggal Disetujui')
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
            'index' => ManageDosenHkis::route('/'),
        ];
    }
}
