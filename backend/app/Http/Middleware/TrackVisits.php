<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisits
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Don't log if it's a file, asset, or filament livewire request
        if ($request->is('livewire/*') || $request->is('filament/*') || $request->is('storage/*') || $request->is('assets/*')) {
            return $response;
        }

        try {
            $agent = new \Jenssegers\Agent\Agent();
            $agent->setUserAgent($request->userAgent());

            $ip = $request->ip();
            $geo = \App\Helpers\GeoIP::resolve($ip);

            \App\Models\VisitorLog::create([
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'ip_address' => $ip,
                'country' => $geo['country'],
                'region' => $geo['region'],
                'city' => $geo['city'],
                'user_agent' => $request->userAgent(),
                'browser' => $agent->browser(),
                'platform' => $agent->platform(),
                'device' => $agent->device(),
                'user_id' => auth()->id(),
            ]);
        } catch (\Exception $e) {
            // Silently fail
            \Log::error('Visitor tracking failed: ' . $e->getMessage());
        }

        return $response;
    }
}
