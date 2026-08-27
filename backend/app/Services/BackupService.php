<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class BackupService
{
    protected string $backupDir;

    public function __construct()
    {
        $this->backupDir = storage_path('app/backups');
        if (!File::exists($this->backupDir)) {
            File::makeDirectory($this->backupDir, 0755, true, true);
        }
    }

    /**
     * Get list of backup files.
     */
    public function getBackups(): array
    {
        if (!File::exists($this->backupDir)) {
            return [];
        }

        $files = File::files($this->backupDir);
        $backups = [];

        foreach ($files as $file) {
            $backups[] = [
                'name' => $file->getFilename(),
                'size' => $this->formatBytes($file->getSize()),
                'size_bytes' => $file->getSize(),
                'modified_at' => date('Y-m-d H:i:s', $file->getMTime()),
                'path' => $file->getPathname(),
            ];
        }

        usort($backups, function ($a, $b) {
            return strtotime($b['modified_at']) <=> strtotime($a['modified_at']);
        });

        return $backups;
    }

    /**
     * Generate database backup.
     */
    public function createBackup(): string
    {
        $timestamp = date('Y-m-d_H-i-s');
        $driver = config('database.default');

        if ($driver === 'sqlite') {
            $dbPath = config('database.connections.sqlite.database');
            if (File::exists($dbPath)) {
                $filename = "backup_sqlite_{$timestamp}.sqlite";
                $targetPath = $this->backupDir . '/' . $filename;
                File::copy($dbPath, $targetPath);
                return $filename;
            }
        }

        $filename = "backup_db_{$timestamp}.sql";
        $targetPath = $this->backupDir . '/' . $filename;

        $sqlContent = "-- Database Backup\n-- Generated: " . date('Y-m-d H:i:s') . "\n\n";

        ini_set('memory_limit', '512M');

        if ($driver === 'sqlite') {
            $tables = DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
            foreach ($tables as $tableObj) {
                $tableName = $tableObj->name;
                $sqlContent .= "-- Table: {$tableName}\n";
                $createStmt = DB::selectOne("SELECT sql FROM sqlite_master WHERE type='table' AND name = ?", [$tableName]);
                if ($createStmt && isset($createStmt->sql)) {
                    $sqlContent .= $createStmt->sql . ";\n\n";
                }
                DB::table($tableName)->orderByRaw('1')->chunk(500, function ($rows) use (&$sqlContent, $tableName) {
                    foreach ($rows as $row) {
                        $values = array_map(function ($val) {
                            return is_null($val) ? 'NULL' : DB::getPdo()->quote((string)$val);
                        }, (array)$row);
                        if (!empty($values)) {
                            $sqlContent .= "INSERT INTO `{$tableName}` VALUES (" . implode(', ', $values) . ");\n";
                        }
                    }
                });
                $sqlContent .= "\n";
            }
        } else {
            try {
                $tables = DB::select('SHOW TABLES');
                foreach ($tables as $tableObj) {
                    $props = get_object_vars($tableObj);
                    $tableName = reset($props);

                    $createTable = DB::select("SHOW CREATE TABLE `{$tableName}`");
                    if (!empty($createTable)) {
                        $createProps = get_object_vars($createTable[0]);
                        $sqlContent .= "-- Table structure for {$tableName}\n";
                        $sqlContent .= ($createProps['Create Table'] ?? reset($createProps)) . ";\n\n";
                    }

                    DB::table($tableName)->orderByRaw('1')->chunk(500, function ($rows) use (&$sqlContent, $tableName) {
                        foreach ($rows as $row) {
                            $values = array_map(function ($val) {
                                return is_null($val) ? 'NULL' : DB::getPdo()->quote((string)$val);
                            }, (array)$row);
                            if (!empty($values)) {
                                $sqlContent .= "INSERT INTO `{$tableName}` VALUES (" . implode(', ', $values) . ");\n";
                            }
                        }
                    });
                    $sqlContent .= "\n";
                }
            } catch (\Exception $e) {
                $sqlContent .= "-- Error generating full dump: " . $e->getMessage() . "\n";
            }
        }

        File::put($targetPath, $sqlContent);

        return $filename;
    }

    /**
     * Download backup file safely.
     */
    public function downloadBackup(string $filename): BinaryFileResponse
    {
        ini_set('memory_limit', '512M');

        $cleanName = basename($filename);
        $filePath = $this->backupDir . '/' . $cleanName;

        if (!File::exists($filePath)) {
            abort(404, 'Backup file not found');
        }

        return response()->download($filePath, $cleanName, [
            'Content-Type' => 'application/octet-stream',
        ]);
    }

    /**
     * Delete backup file.
     */
    public function deleteBackup(string $filename): bool
    {
        $cleanName = basename($filename);
        $filePath = $this->backupDir . '/' . $cleanName;

        if (File::exists($filePath)) {
            return File::delete($filePath);
        }

        return false;
    }

    /**
     * Format bytes to human readable form.
     */
    protected function formatBytes(int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);

        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}
