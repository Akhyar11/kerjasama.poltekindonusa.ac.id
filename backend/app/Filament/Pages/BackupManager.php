<?php

namespace App\Filament\Pages;

use App\Services\BackupService;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use BackedEnum;
use UnitEnum;

class BackupManager extends Page
{
    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-archive-box';

    protected static string | UnitEnum | null $navigationGroup = 'Settings';

    protected static ?string $title = 'File Manager Backup';

    protected string $view = 'filament.pages.backup-manager';

    public array $backups = [];

    public static function canAccess(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    public function mount(BackupService $backupService): void
    {
        $this->loadBackups($backupService);
    }

    public function loadBackups(BackupService $backupService): void
    {
        $this->backups = $backupService->getBackups();
    }

    public function createBackup(BackupService $backupService): void
    {
        try {
            $filename = $backupService->createBackup();
            $this->loadBackups($backupService);

            Notification::make()
                ->title('Backup Berhasil Dibuat')
                ->body("File backup {$filename} telah disimpan di storage.")
                ->success()
                ->send();
        } catch (\Exception $e) {
            Notification::make()
                ->title('Gagal Membuat Backup')
                ->body($e->getMessage())
                ->danger()
                ->send();
        }
    }

    public function downloadBackup(string $filename, BackupService $backupService)
    {
        return $backupService->downloadBackup($filename);
    }

    public function deleteBackup(string $filename, BackupService $backupService): void
    {
        if ($backupService->deleteBackup($filename)) {
            $this->loadBackups($backupService);
            Notification::make()
                ->title('File Backup Dihapus')
                ->success()
                ->send();
        } else {
            Notification::make()
                ->title('Gagal Menghapus File')
                ->danger()
                ->send();
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('createBackup')
                ->label('Buat Backup Baru')
                ->icon('heroicon-m-plus')
                ->color('primary')
                ->action(fn (BackupService $backupService) => $this->createBackup($backupService)),
        ];
    }
}
