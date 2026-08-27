<?php

namespace App\Filament\Widgets;

use App\Models\VisitorLog;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentVisitorsWidget extends BaseWidget
{
    protected static ?int $sort = 5;

    protected int | string | array $columnSpan = 'full';

    protected static ?string $heading = '👥 Pengunjung Frontend Terbaru';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                VisitorLog::query()
                    ->where('source', 'frontend')
                    ->latest()
                    ->limit(15)
            )
            ->columns([
                TextColumn::make('created_at')
                    ->label('Waktu')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
                TextColumn::make('page_title')
                    ->label('Halaman')
                    ->default(fn ($record) => $record->url)
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->url),
                TextColumn::make('country')
                    ->label('Negara')
                    ->default('-')
                    ->badge()
                    ->color('gray'),
                TextColumn::make('city')
                    ->label('Kota')
                    ->default('-'),
                TextColumn::make('browser')
                    ->label('Browser')
                    ->badge()
                    ->color('info'),
                TextColumn::make('device')
                    ->label('Perangkat')
                    ->default('-')
                    ->badge()
                    ->color('warning'),
                TextColumn::make('ip_address')
                    ->label('IP')
                    ->copyable()
                    ->badge()
                    ->color('gray')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->paginated(false);
    }
}
