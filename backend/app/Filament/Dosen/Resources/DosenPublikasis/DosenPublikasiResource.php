<?php

namespace App\Filament\Dosen\Resources\DosenPublikasis;

use App\Filament\Dosen\Resources\DosenPublikasis\Pages\ManageDosenPublikasis;
use App\Models\DosenPublikasi;
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

class DosenPublikasiResource extends Resource
{
    protected static ?string $model = DosenPublikasi::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationLabel = 'Publikasi Penelitian';

    protected static ?string $modelLabel = 'Publikasi Penelitian';

    protected static ?string $pluralModelLabel = 'Publikasi Penelitian';

    protected static ?string $slug = 'publikasi-penelitian';

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
                    ->label('Judul Penelitian')
                    ->required(),
                TextInput::make('nama_jurnal')
                    ->label('Nama Jurnal / Prosiding')
                    ->required(),
                Select::make('jenis_publikasi')
                    ->label('Jenis Publikasi')
                    ->options([
                        'SINTA 1' => 'SINTA 1',
                        'SINTA 2' => 'SINTA 2',
                        'SINTA 3' => 'SINTA 3',
                        'SINTA 4' => 'SINTA 4',
                        'SINTA 5' => 'SINTA 5',
                        'Internasional' => 'Internasional',
                    ])
                    ->required(),
                TextInput::make('issn')
                    ->label('ISSN'),
                TextInput::make('url_artikel')
                    ->label('URL Artikel')
                    ->placeholder('https://example.com')
                    ->url(),
                TextInput::make('doi')
                    ->label('DOI'),
                FileUpload::make('pdf_artikel')
                    ->label('Upload PDF Artikel Ilmiah')
                    ->disk('public')
                    ->directory('dosen/publikasi'),
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
                TextColumn::make('nama_jurnal')
                    ->label('Jurnal/Prosiding')
                    ->searchable(),
                TextColumn::make('jenis_publikasi')
                    ->label('Jenis')
                    ->sortable(),
                TextColumn::make('issn')
                    ->label('ISSN'),
                TextColumn::make('doi')
                    ->label('DOI'),
                TextColumn::make('url_artikel')
                    ->label('URL')
                    ->limit(20),
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
            'index' => ManageDosenPublikasis::route('/'),
        ];
    }
}
