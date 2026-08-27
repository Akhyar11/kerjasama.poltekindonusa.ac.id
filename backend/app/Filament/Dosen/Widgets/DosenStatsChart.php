<?php

namespace App\Filament\Dosen\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\DosenPublikasi;
use App\Models\DosenPengabdian;
use App\Models\DosenHki;
use App\Models\DosenSertifikatKompetensi;
use App\Models\DosenSertifikatPenghargaan;
use App\Models\DosenBuku;
use Illuminate\Support\Facades\Auth;

class DosenStatsChart extends ChartWidget
{
    protected ?string $heading = 'Grafik Data Akademik';
    
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $dosen = Auth::guard('dosen')->user();
        if (!$dosen) {
            return [
                'datasets' => [],
                'labels' => [],
            ];
        }
        
        $nidn = $dosen->nidn;
        
        $penelitian = DosenPublikasi::where('nidn', $nidn)->count();
        $pengabdian = DosenPengabdian::where('nidn', $nidn)->count();
        $hki = DosenHki::where('nidn', $nidn)->count();
        $buku = DosenBuku::where('nidn', $nidn)->count();
        $kompetensi = DosenSertifikatKompetensi::where('nidn', $nidn)->count();
        $penghargaan = DosenSertifikatPenghargaan::where('nidn', $nidn)->count();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Data',
                    'data' => [$penelitian, $pengabdian, $hki, $buku, $kompetensi, $penghargaan],
                    'backgroundColor' => [
                        'rgba(59, 130, 246, 0.75)', // Penelitian - Blue
                        'rgba(16, 185, 129, 0.75)', // Pengabdian - Emerald
                        'rgba(245, 158, 11, 0.75)', // HKI - Amber
                        'rgba(217, 119, 6, 0.75)',  // Buku Karya - Amber Darker
                        'rgba(99, 102, 241, 0.75)', // Kompetensi - Indigo
                        'rgba(244, 63, 94, 0.75)',  // Penghargaan - Rose
                    ],
                    'borderColor' => [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#d97706',
                        '#6366f1',
                        '#f43f5e',
                    ],
                    'borderWidth' => 1.5,
                ],
            ],
            'labels' => [
                'Penelitian',
                'Pengabdian',
                'HKI',
                'Buku Karya',
                'Sertifikat Kompetensi',
                'Sertifikat Penghargaan',
            ],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
