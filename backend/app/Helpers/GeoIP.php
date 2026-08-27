<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeoIP
{
    public static function resolve(?string $ip): array
    {
        if (!$ip) {
            return [
                'country' => 'Unknown',
                'region'  => 'Unknown',
                'city'    => 'Unknown',
            ];
        }

        // Default values for local/private range
        if ($ip === '127.0.0.1' || $ip === '::1' || str_starts_with($ip, '192.168.') || str_starts_with($ip, '10.') || str_starts_with($ip, '172.16.') || str_starts_with($ip, '172.17.') || str_starts_with($ip, '172.18.') || str_starts_with($ip, '172.19.') || str_starts_with($ip, '172.20.') || str_starts_with($ip, '172.21.') || str_starts_with($ip, '172.22.') || str_starts_with($ip, '172.23.') || str_starts_with($ip, '172.24.') || str_starts_with($ip, '172.25.') || str_starts_with($ip, '172.26.') || str_starts_with($ip, '172.27.') || str_starts_with($ip, '172.28.') || str_starts_with($ip, '172.29.') || str_starts_with($ip, '172.30.') || str_starts_with($ip, '172.31.')) {
            return [
                'country' => 'Indonesia (Local Dev)',
                'region'  => 'Jawa Tengah',
                'city'    => 'Surakarta',
            ];
        }

        // 1. Coba ip-api.com (limit 45 req/min)
        try {
            $response = Http::timeout(3)->get("http://ip-api.com/json/{$ip}");
            
            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['status']) && $data['status'] === 'success') {
                    return [
                        'country' => $data['country'] ?? 'Unknown',
                        'region'  => $data['regionName'] ?? 'Unknown',
                        'city'    => $data['city'] ?? 'Unknown',
                    ];
                }
            }
        } catch (\Exception $e) {
            Log::warning('GeoIP (ip-api.com) failed for IP ' . $ip . ': ' . $e->getMessage());
        }

        // 2. Fallback ke ipwho.is (jika ip-api.com gagal/limit)
        try {
            $response = Http::timeout(3)->get("https://ipwho.is/{$ip}");
            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['success']) && $data['success'] === true) {
                    return [
                        'country' => $data['country'] ?? 'Unknown',
                        'region'  => $data['region'] ?? 'Unknown',
                        'city'    => $data['city'] ?? 'Unknown',
                    ];
                }
            }
        } catch (\Exception $e) {
            Log::warning('GeoIP fallback (ipwho.is) failed for IP ' . $ip . ': ' . $e->getMessage());
        }

        return [
            'country' => 'Unknown',
            'region'  => 'Unknown',
            'city'    => 'Unknown',
        ];
    }
}
