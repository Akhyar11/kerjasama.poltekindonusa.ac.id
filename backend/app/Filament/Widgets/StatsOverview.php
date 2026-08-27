<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\VisitorLog;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $frontendVisits = VisitorLog::where('source', 'frontend')->count();
        $todayFrontend  = VisitorLog::where('source', 'frontend')
            ->whereDate('created_at', today())
            ->count();

        return [
            Stat::make('Total Berita', \App\Models\News::count())
                ->description('Berita yang telah dipublikasikan')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('success'),
            Stat::make('Pengunjung Frontend', $frontendVisits)
                ->description("Hari ini: {$todayFrontend} kunjungan")
                ->descriptionIcon('heroicon-m-globe-alt')
                ->color('info'),
            Stat::make('Pengaduan Baru', \App\Models\Complaint::count())
                ->description('Total aspirasi & saran masuk')
                ->descriptionIcon('heroicon-m-chat-bubble-left-right')
                ->color('warning'),
        ];
    }
}
