<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VisitorLog;
use Illuminate\Http\Request;

class VisitorTrackController extends Controller
{
    /**
     * Terima data kunjungan dari frontend Next.js dan simpan ke visitor_logs.
     */
    public function track(Request $request)
    {
        try {
            $agent = new \Jenssegers\Agent\Agent();
            $userAgent = $request->header('User-Agent') ?? $request->input('user_agent', '');
            $agent->setUserAgent($userAgent);

            $ip = $request->ip();
            $geo = \App\Helpers\GeoIP::resolve($ip);

            VisitorLog::create([
                'url'        => $request->input('url', $request->header('Referer', '/')),
                'source'     => 'frontend',
                'page_title' => $request->input('page_title'),
                'referrer'   => $request->input('referrer'),
                'method'     => 'GET',
                'ip_address' => $ip,
                'country'    => $geo['country'],
                'region'     => $geo['region'],
                'city'       => $geo['city'],
                'user_agent' => $userAgent,
                'browser'    => $agent->browser(),
                'platform'   => $agent->platform(),
                'device'     => $agent->device() ?: ($agent->isMobile() ? 'mobile' : ($agent->isTablet() ? 'tablet' : 'desktop')),
                'user_id'    => null,
            ]);

            return response()->json(['ok' => true], 201);
        } catch (\Exception $e) {
            \Log::error('Frontend visitor tracking failed: ' . $e->getMessage());
            return response()->json(['ok' => false], 500);
        }
    }
}
