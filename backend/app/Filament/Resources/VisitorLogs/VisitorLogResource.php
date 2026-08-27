<?php

namespace App\Filament\Resources\VisitorLogs;

use App\Models\VisitorLog;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Forms\Components\DatePicker;
use App\Filament\Resources\VisitorLogs\Pages\ListVisitorLogs;

class VisitorLogResource extends Resource
{
    protected static ?string $model = VisitorLog::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-chart-bar';

    protected static string | UnitEnum | null $navigationGroup = 'Analytics';

    protected static ?string $navigationLabel = 'Visitor Logs';

    protected static ?string $modelLabel = 'Visitor Log';

    protected static ?string $pluralModelLabel = 'Visitor Logs';

    protected static ?int $navigationSort = 1;

    public static function canViewAny(): bool
    {
        return auth()->user()->isAdmin();
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit($record): bool
    {
        return false;
    }

    public static function canDelete($record): bool
    {
        return auth()->user()->isAdmin();
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('ID')
                    ->sortable()
                    ->width(60),
                TextColumn::make('source')
                    ->label('Sumber')
                    ->badge()
                    ->color(fn (string $state): string => $state === 'frontend' ? 'success' : 'gray')
                    ->formatStateUsing(fn (string $state) => ucfirst($state))
                    ->sortable(),
                TextColumn::make('url')
                    ->label('URL')
                    ->limit(50)
                    ->searchable()
                    ->tooltip(fn ($record) => $record->url),
                TextColumn::make('page_title')
                    ->label('Judul Halaman')
                    ->limit(40)
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: false),
                TextColumn::make('referrer')
                    ->label('Referrer')
                    ->limit(40)
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('method')
                    ->label('Method')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'GET'    => 'success',
                        'POST'   => 'info',
                        'PUT', 'PATCH'  => 'warning',
                        'DELETE' => 'danger',
                        default  => 'gray',
                    }),
                TextColumn::make('ip_address')
                    ->label('IP Address')
                    ->searchable()
                    ->copyable(),
                TextColumn::make('country')
                    ->label('Negara')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: false),
                TextColumn::make('region')
                    ->label('Daerah/Provinsi')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: false),
                TextColumn::make('city')
                    ->label('Kota')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: false),
                TextColumn::make('browser')
                    ->label('Browser')
                    ->searchable()
                    ->badge()
                    ->color('gray'),
                TextColumn::make('platform')
                    ->label('OS / Platform')
                    ->searchable()
                    ->badge()
                    ->color('info'),
                TextColumn::make('device')
                    ->label('Device')
                    ->searchable()
                    ->badge()
                    ->color('warning'),
                TextColumn::make('user.name')
                    ->label('User')
                    ->default('Guest')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->label('Waktu Akses')
                    ->dateTime('d M Y, H:i:s')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('source')
                    ->label('Sumber')
                    ->options([
                        'frontend' => 'Frontend (Pengunjung Publik)',
                        'backend'  => 'Backend (Admin Panel)',
                    ]),
                SelectFilter::make('device')
                    ->label('Tipe Perangkat')
                    ->options([
                        'desktop' => 'Desktop/PC',
                        'mobile' => 'HP/Mobile',
                        'tablet' => 'Tablet',
                    ]),
                SelectFilter::make('platform')
                    ->label('Sistem Operasi (OS)')
                    ->options([
                        'AndroidOS' => 'Android',
                        'iOS' => 'iOS (iPhone/iPad)',
                        'Windows' => 'Windows',
                        'OS X' => 'macOS',
                        'Linux' => 'Linux',
                    ]),
                SelectFilter::make('method')
                    ->options([
                        'GET'    => 'GET',
                        'POST'   => 'POST',
                        'PUT'    => 'PUT',
                        'DELETE' => 'DELETE',
                    ]),
                Filter::make('created_at')
                    ->form([
                        DatePicker::make('from')->label('Dari Tanggal'),
                        DatePicker::make('until')->label('Sampai Tanggal'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['from'], fn ($q, $date) => $q->whereDate('created_at', '>=', $date))
                            ->when($data['until'], fn ($q, $date) => $q->whereDate('created_at', '<=', $date));
                    }),
            ])
            ->recordActions([
                DeleteAction::make(),
            ])
            ->toolbarActions([
                \Filament\Actions\Action::make('export')
                    ->label('Ekspor ke CSV')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('success')
                    ->action(function ($livewire) {
                        $query = $livewire->getFilteredTableQuery();
                        $records = $query->get();

                        $csvFileName = 'visitor_logs_' . date('Y-m-d_H-i-s') . '.csv';
                        $headers = [
                            'Content-Type' => 'text/csv',
                            'Content-Disposition' => "attachment; filename=\"$csvFileName\"",
                            'Pragma' => 'no-cache',
                            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
                            'Expires' => '0'
                        ];

                        return response()->streamDownload(function() use ($records) {
                            $file = fopen('php://output', 'w');
                            // Add UTF-8 BOM for Excel compatibility
                            fputs($file, chr(0xEF) . chr(0xBB) . chr(0xBF));
                            
                            fputcsv($file, ['ID', 'Sumber', 'URL', 'Judul Halaman', 'Referrer', 'IP Address', 'Negara', 'Daerah/Provinsi', 'Kota', 'Browser', 'Platform', 'Device', 'Waktu Akses']);

                            foreach ($records as $record) {
                                fputcsv($file, [
                                    $record->id,
                                    $record->source,
                                    $record->url,
                                    $record->page_title,
                                    $record->referrer,
                                    $record->ip_address,
                                    $record->country,
                                    $record->region,
                                    $record->city,
                                    $record->browser,
                                    $record->platform,
                                    $record->device,
                                    $record->created_at->format('Y-m-d H:i:s')
                                ]);
                            }

                            fclose($file);
                        }, $csvFileName, $headers);
                    }),
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped();
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListVisitorLogs::route('/'),
        ];
    }
}
