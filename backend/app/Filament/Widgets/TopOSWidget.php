<?php

namespace App\Filament\Widgets;

use App\Models\VisitorLog;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Widgets\TableWidget as BaseWidget;

class TopOSWidget extends BaseWidget
{
    protected static ?int $sort = 3;

    protected int | string | array $columnSpan = 1;

    protected static ?string $heading = '📱 OS Terpopuler Frontend';

    public function getTableRecordKey(\Illuminate\Database\Eloquent\Model|array $record): string
    {
        $platform = is_array($record) ? ($record['platform'] ?? '') : ($record->platform ?? '');
        return md5($platform ?: uniqid());
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(
                VisitorLog::selectRaw('platform, COUNT(*) as visit_count, MIN(id) as id')
                    ->where('source', 'frontend')
                    ->whereNotNull('platform')
                    ->groupBy('platform')
                    ->orderByDesc('visit_count')
                    ->limit(10)
            )
            ->columns([
                TextColumn::make('platform')
                    ->label('Sistem Operasi (OS)')
                    ->default('Unknown')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn (string $state) => $state === 'AndroidOS' ? 'Android' : $state),
                TextColumn::make('visit_count')
                    ->label('Jumlah Kunjungan')
                    ->badge()
                    ->color('success'),
            ])
            ->filters([
                Tables\Filters\Filter::make('period')
                    ->form([
                        \Filament\Forms\Components\Select::make('days')
                            ->label('Periode Waktu')
                            ->options([
                                '7' => '7 Hari Terakhir',
                                '30' => '30 Hari Terakhir',
                                '90' => '90 Hari Terakhir',
                                'all' => 'Semua Waktu',
                            ])
                            ->default('30'),
                    ])
                    ->query(function ($query, array $data) {
                        $days = $data['days'] ?? '30';
                        if ($days !== 'all') {
                            return $query->where('created_at', '>=', now()->subDays((int)$days));
                        }
                        return $query;
                    })
            ])
            ->paginated(false);
    }
}
