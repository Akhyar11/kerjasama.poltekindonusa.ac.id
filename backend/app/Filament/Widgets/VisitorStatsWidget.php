<?php

namespace App\Filament\Widgets;

use App\Models\VisitorLog;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class VisitorStatsWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected int | string | array $columnSpan = 'full';

    protected function getStats(): array
    {
        $q = fn() => VisitorLog::where('source', 'frontend');

        $uniqueToday        = $q()->whereDate('created_at', today())->distinct('ip_address')->count('ip_address');
        $pageviewsToday     = $q()->whereDate('created_at', today())->count();
        $uniqueWeek         = $q()->where('created_at', '>=', now()->subWeek())->distinct('ip_address')->count('ip_address');
        $uniqueMonth        = $q()->where('created_at', '>=', now()->subMonth())->distinct('ip_address')->count('ip_address');

        $topBrowser = VisitorLog::where('source', 'frontend')
            ->selectRaw('browser, COUNT(*) as count')
            ->whereNotNull('browser')
            ->groupBy('browser')
            ->orderByDesc('count')
            ->first();

        return [
            Stat::make('Pengunjung Hari Ini', $uniqueToday)
                ->description("{$pageviewsToday} pageview hari ini")
                ->descriptionIcon('heroicon-m-user-group')
                ->color('success'),

            Stat::make('Pengunjung 7 Hari', $uniqueWeek)
                ->description('Pengunjung unik (IP)')
                ->descriptionIcon('heroicon-m-chart-bar')
                ->color('info'),

            Stat::make('Pengunjung 30 Hari', $uniqueMonth)
                ->description('Pengunjung unik (IP)')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('warning'),

            Stat::make('Browser Terpopuler', $topBrowser?->browser ?? '-')
                ->description($topBrowser ? "{$topBrowser->count} kunjungan" : 'Belum ada data')
                ->descriptionIcon('heroicon-m-globe-alt')
                ->color('primary'),
        ];
    }
}
