<?php

namespace App\Filament\Widgets;

use App\Models\VisitorLog;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Widgets\TableWidget as BaseWidget;

class TopCitiesWidget extends BaseWidget
{
    protected static ?int $sort = 4;

    protected int | string | array $columnSpan = 1;

    protected static ?string $heading = '🏢 Kota Terbanyak Pengunjung';

    public function getTableRecordKey(\Illuminate\Database\Eloquent\Model|array $record): string
    {
        $city = is_array($record) ? ($record['city'] ?? '') : ($record->city ?? '');
        $region = is_array($record) ? ($record['region'] ?? '') : ($record->region ?? '');
        return md5(($city . $region) ?: uniqid());
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(
                VisitorLog::selectRaw('city, region, COUNT(*) as visit_count, MIN(id) as id')
                    ->where('source', 'frontend')
                    ->whereNotNull('city')
                    ->where('city', '!=', 'Unknown')
                    ->groupBy('city', 'region')
                    ->orderByDesc('visit_count')
                    ->limit(10)
            )
            ->columns([
                TextColumn::make('city')
                    ->label('Kota')
                    ->default('-')
                    ->weight('bold'),
                TextColumn::make('region')
                    ->label('Provinsi / Daerah')
                    ->default('-')
                    ->color('gray'),
                TextColumn::make('visit_count')
                    ->label('Jumlah Pengunjung')
                    ->badge()
                    ->color('info'),
            ])
            ->filters([
                \Filament\Tables\Filters\Filter::make('period')
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
