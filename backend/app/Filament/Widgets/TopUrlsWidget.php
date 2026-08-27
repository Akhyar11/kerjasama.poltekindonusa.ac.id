<?php

namespace App\Filament\Widgets;

use App\Models\VisitorLog;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Widgets\TableWidget as BaseWidget;

class TopUrlsWidget extends BaseWidget
{
    protected static ?int $sort = 2;

    protected int | string | array $columnSpan = 'full';

    protected static ?string $heading = '🔥 Halaman Terpopuler Frontend (30 Hari Terakhir)';

    // Override karena query pakai groupBy tanpa kolom id
    public function getTableRecordKey(\Illuminate\Database\Eloquent\Model|array $record): string
    {
        $url = is_array($record) ? ($record['url'] ?? '') : ($record->url ?? '');
        return md5($url ?: uniqid());
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(
                VisitorLog::selectRaw('url, page_title, COUNT(*) as visit_count, MIN(id) as id')
                    ->where('created_at', '>=', now()->subDays(30))
                    ->where('source', 'frontend')
                    ->groupBy('url', 'page_title')
                    ->orderByDesc('visit_count')
                    ->limit(10)
            )
            ->columns([
                TextColumn::make('page_title')
                    ->label('Halaman')
                    ->default(fn ($record) => $record->url)
                    ->limit(60)
                    ->tooltip(fn ($record) => $record->url),
                TextColumn::make('url')
                    ->label('URL')
                    ->limit(70)
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->tooltip(fn ($record) => $record->url),
                TextColumn::make('visit_count')
                    ->label('Jumlah Kunjungan')
                    ->badge()
                    ->color('success'),
            ])
            ->paginated(false);
    }
}

