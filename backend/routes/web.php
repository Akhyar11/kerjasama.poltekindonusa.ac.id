<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/sitemap.xml', [\App\Http\Controllers\SitemapController::class, 'index']);

Route::post('/admin/menu-builder/{menu}/save', [\App\Http\Controllers\MenuBuilderController::class, 'save'])->name('admin.menu-builder.save');

Route::get('/admin/backups/download/{filename}', function ($filename, \App\Services\BackupService $backupService) {
    if (!auth()->check() || !auth()->user()->isAdmin()) {
        abort(403, 'Unauthorized access.');
    }
    return $backupService->downloadBackup($filename);
})->name('admin.backups.download')->middleware(['web', 'auth']);

