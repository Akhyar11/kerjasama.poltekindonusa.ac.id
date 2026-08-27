<?php

namespace App\Filament\Resources\VisitorLogs\Pages;

use App\Filament\Resources\VisitorLogs\VisitorLogResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Actions;
use App\Models\VisitorLog;
use Filament\Infolists\Components\TextEntry;

class ListVisitorLogs extends ListRecords
{
    protected static string $resource = VisitorLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('clear_all')
                ->label('Hapus Semua Log')
                ->icon('heroicon-o-trash')
                ->color('danger')
                ->requiresConfirmation()
                ->modalHeading('Hapus Semua Visitor Logs?')
                ->modalDescription('Tindakan ini tidak bisa dibatalkan. Semua log pengunjung akan dihapus.')
                ->action(fn () => VisitorLog::truncate())
                ->successNotificationTitle('Semua log berhasil dihapus'),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            \App\Filament\Widgets\VisitorStatsWidget::class,
        ];
    }
}
