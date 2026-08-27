<?php

namespace App\Filament\Dosen\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\DosenPublikasi;
use Illuminate\Support\Facades\Auth;

class DosenPenelitianChart extends ChartWidget
{
    protected ?string $heading = 'Perbandingan Kategori Penelitian';
    
    protected static ?int $sort = 3;

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
        
        $sinta1 = DosenPublikasi::where('nidn', $nidn)->where('jenis_publikasi', 'SINTA 1')->count();
        $sinta2 = DosenPublikasi::where('nidn', $nidn)->where('jenis_publikasi', 'SINTA 2')->count();
        $sinta3 = DosenPublikasi::where('nidn', $nidn)->where('jenis_publikasi', 'SINTA 3')->count();
        $sinta4 = DosenPublikasi::where('nidn', $nidn)->where('jenis_publikasi', 'SINTA 4')->count();
        $sinta5 = DosenPublikasi::where('nidn', $nidn)->where('jenis_publikasi', 'SINTA 5')->count();
        $internasional = DosenPublikasi::where('nidn', $nidn)->where('jenis_publikasi', 'Internasional')->count();

        return [
            'datasets' => [
                [
                    'label' => 'Kategori Publikasi',
                    'data' => [$sinta1, $sinta2, $sinta3, $sinta4, $sinta5, $internasional],
                    'backgroundColor' => [
                        'rgba(59, 130, 246, 0.85)',   // SINTA 1 - Blue
                        'rgba(99, 102, 241, 0.85)',   // SINTA 2 - Indigo
                        'rgba(139, 92, 246, 0.85)',   // SINTA 3 - Violet
                        'rgba(168, 85, 247, 0.85)',   // SINTA 4 - Purple
                        'rgba(236, 72, 153, 0.85)',   // SINTA 5 - Pink
                        'rgba(244, 63, 94, 0.85)',    // Internasional - Rose
                    ],
                    'borderColor' => [
                        '#3b82f6',
                        '#6366f1',
                        '#8b5cf6',
                        '#a855f7',
                        '#ec4899',
                        '#f43f5e',
                    ],
                    'borderWidth' => 1.5,
                ],
            ],
            'labels' => [
                'SINTA 1',
                'SINTA 2',
                'SINTA 3',
                'SINTA 4',
                'SINTA 5',
                'Internasional',
            ],
        ];
    }

    protected function getType(): string
    {
        return 'pie';
    }
}
