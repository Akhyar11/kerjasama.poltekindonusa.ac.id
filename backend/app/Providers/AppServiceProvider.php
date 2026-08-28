<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === 'production' || str_contains(config('app.url'), 'https://') || request()->header('x-forwarded-proto') === 'https' || (request()->header('cf-visitor') && str_contains(request()->header('cf-visitor'), 'https'))) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
            request()->server->set('HTTPS', 'on');
            request()->server->set('SERVER_PORT', 443);
            request()->headers->set('X-Forwarded-Proto', 'https');
            request()->headers->set('X-Forwarded-Port', 443);
        }
        \Illuminate\Support\Facades\Gate::before(function ($user, $ability, $models) {
            if ($user instanceof \App\Models\User) {
                if ($user->isAdmin()) {
                    return true;
                }

                if ($user->isStudyProgram()) {
                    if (isset($models[0])) {
                        $modelClass = is_string($models[0]) ? $models[0] : get_class($models[0]);
                        if (!in_array($modelClass, [\App\Models\News::class, \App\Models\StudyProgram::class, \App\Models\NewsCategory::class, \App\Models\NewsImage::class])) {
                            return false;
                        }
                    } else {
                        // For things without a model, deny by default except specific abilities if needed.
                    }
                }

                if ($user->isCampusOrganization()) {
                    if (isset($models[0])) {
                        $modelClass = is_string($models[0]) ? $models[0] : get_class($models[0]);
                        if (!in_array($modelClass, [\App\Models\News::class, \App\Models\CampusOrganization::class, \App\Models\NewsCategory::class, \App\Models\NewsImage::class])) {
                            return false;
                        }
                    }
                }
            }
        });

        // Increase PCRE limits to prevent issues with large/complex HTML in RichEditor/Livewire
        ini_set('pcre.backtrack_limit', '10000000');
        ini_set('pcre.recursion_limit', '10000000');

        // Rate limit for admin login: max 5 attempts per minute per IP
        RateLimiter::for('admin-login', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip())->response(function () {
                return response()->json([
                    'message' => 'Terlalu banyak percobaan login. Coba lagi dalam 1 menit.',
                ], 429);
            });
        });

        // Rate limit for general API: max 60 requests per minute per IP
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->ip());
        });
    }
}
