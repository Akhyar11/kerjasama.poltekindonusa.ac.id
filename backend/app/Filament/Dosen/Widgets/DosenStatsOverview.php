<?php

namespace App\Filament\Dosen\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\DosenPublikasi;
use App\Models\DosenPengabdian;
use App\Models\DosenHki;
use App\Models\DosenSertifikatKompetensi;
use App\Models\DosenSertifikatPenghargaan;
use App\Models\DosenBuku;
use Illuminate\Support\Facades\Auth;

class DosenStatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $dosen = Auth::guard('dosen')->user();
        if (!$dosen) {
            return [];
        }
        
        $nidn = $dosen->nidn;
        
        $penelitian = DosenPublikasi::where('nidn', $nidn)->count();
        $pengabdian = DosenPengabdian::where('nidn', $nidn)->count();
        $hki = DosenHki::where('nidn', $nidn)->count();
        $kompetensi = DosenSertifikatKompetensi::where('nidn', $nidn)->count();
        $penghargaan = DosenSertifikatPenghargaan::where('nidn', $nidn)->count();
        $buku = DosenBuku::where('nidn', $nidn)->count();

        return [
            Stat::make('Penelitian', $penelitian)
                ->description('Publikasi & Karya Ilmiah')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('info'),
            Stat::make('Pengabdian', $pengabdian)
                ->description('Kegiatan Pengabdian')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('success'),
            Stat::make('HKI', $hki)
                ->description('Hak Kekayaan Intelektual')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color('warning'),
            Stat::make('Buku Karya', $buku)
                ->description('Buku Ajar/Referensi/Monograf')
                ->descriptionIcon('heroicon-m-book-open')
                ->color('warning'),
            Stat::make('Sertifikat Kompetensi', $kompetensi)
                ->description('Sertifikasi Keahlian')
                ->descriptionIcon('heroicon-m-shield-check')
                ->color('primary'),
            Stat::make('Sertifikat Penghargaan', $penghargaan)
                ->description('Penghargaan & Prestasi')
                ->descriptionIcon('heroicon-m-trophy')
                ->color('danger'),
        ];
    }
}
