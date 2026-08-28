<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\News;
use App\Models\Document;
use App\Models\StudyProgram;
use App\Models\DirectorGreeting;
use App\Models\Partnership;
use App\Models\Testimonial;
use App\Models\Menu;
use App\Models\Page;
use App\Models\CampusSystem;



Route::get('/settings', [App\Http\Controllers\Api\SettingController::class, 'index']);
Route::get('/hero-sliders', [App\Http\Controllers\Api\HeroSliderController::class, 'index']);

Route::get('/home', function () {
    return response()->json([
        'hero_sliders'   => App\Models\HeroSlider::where('is_active', true)->orderBy('order')->get(),
        'greeting'       => DirectorGreeting::first(),
        'partnerships'   => Partnership::all(),
        'testimonials'   => Testimonial::all(),
        'latest_news'    => News::with('category')->where('is_published', true)->orderByRaw('COALESCE(published_at, created_at) DESC')->take(3)->get(),
        'study_programs' => StudyProgram::all(),
        'campus_systems' => CampusSystem::where('is_active', true)->orderBy('sort_order')->get(),
        'upcoming_events'=> App\Models\UpcomingEvent::with('studyProgram')->where('is_active', true)->where('event_datetime', '>=', now())->orderBy('event_datetime', 'asc')->get(),
    ]);
});

Route::get('/menus', function () {
    return response()->json(Menu::with(['items' => function($q) {
        $q->whereNull('parent_id')->with('children');
    }])->get());
});

Route::get('/news', function (Request $request) {
    $query = News::with('category')->where('is_published', true);

    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('content', 'like', "%{$search}%")
              ->orWhere('tags', 'like', "%{$search}%");
        });
    }

    if ($request->filled('category')) {
        $category = $request->category;
        $query->whereHas('category', function($q) use ($category) {
            $q->where('name', $category)->orWhere('slug', $category);
        });
    }

    $query->orderByRaw('COALESCE(published_at, created_at) DESC');

    if ($request->get('per_page') === 'all') {
        return response()->json(['data' => $query->get()]);
    }

    $perPage = (int) $request->get('per_page', 500);
    return response()->json($query->paginate($perPage));
});

Route::get('/news/{slug}', function ($slug) {
    $news = News::with(['category', 'images'])->where('slug', $slug)->where('is_published', true)->firstOrFail();

    // Cari berita terkait berdasarkan tags atau kategori yang sama
    $related = collect();
    if ($news->tags) {
        $tagList = array_map('trim', explode(',', $news->tags));
        // Cari berita yang memiliki tag yang sama
        foreach ($tagList as $tag) {
            $byTag = News::with('category')
                ->where('is_published', true)
                ->where('id', '!=', $news->id)
                ->where(function($q) use ($tag) {
                    $q->where('tags', 'like', "%{$tag}%")
                      ->orWhere('meta_keywords', 'like', "%{$tag}%");
                })
                ->latest()
                ->take(3)
                ->get();
            $related = $related->merge($byTag);
        }
    }
    // Jika berita terkait dari tags kurang dari 3, tambahkan dari kategori yang sama
    if ($related->count() < 3) {
        $byCategory = News::with('category')
            ->where('is_published', true)
            ->where('id', '!=', $news->id)
            ->where('news_category_id', $news->news_category_id)
            ->latest()
            ->take(3 - $related->count())
            ->get();
        $related = $related->merge($byCategory);
    }
    $related = $related->unique('id')->take(3)->values();

    return response()->json(array_merge($news->toArray(), ['related_news' => $related]));
});

Route::get('/study-programs', function () {
    return response()->json(StudyProgram::all());
});

Route::get('/study-programs/{slug}', function ($slug) {
    $program = StudyProgram::where('slug', $slug)->firstOrFail();
    return response()->json($program);
});

Route::get('/documents', function () {
    return response()->json(Document::all());
});

Route::get('/pages/{slug}', function ($slug) {
    $page = Page::with(['media' => function ($q) {
        $q->orderBy('sort_order');
    }])->where('slug', $slug)->firstOrFail();
    return response()->json($page);
});

// Campus Information Systems
Route::get('/campus-systems', function () {
    return response()->json(
        CampusSystem::where('is_active', true)->orderBy('sort_order')->get()
    );
});

Route::post('/complaints', [App\Http\Controllers\Api\ComplaintController::class, 'store']);

Route::get('/campus-organizations', function () {
    return response()->json(App\Models\CampusOrganization::all());
});

Route::get('/campus-organizations/{slug}', function ($slug) {
    $organization = App\Models\CampusOrganization::where('slug', $slug)->firstOrFail();
    return response()->json($organization);
});

// ── Frontend Visitor Tracking ─────────────────────────────────────────────────
// Dipanggil oleh Next.js frontend untuk mencatat kunjungan halaman publik
Route::post('/track-visit', [App\Http\Controllers\Api\VisitorTrackController::class, 'track'])
    ->middleware('throttle:60,1');

// Auth Dosen
Route::post('/auth/login', [App\Http\Controllers\AuthController::class, 'login']);

// Biodata Dosen
Route::get('/biodata-dosens', [App\Http\Controllers\BiodataDosenController::class, 'index']);
Route::get('/biodata-dosens/{nidn}', [App\Http\Controllers\BiodataDosenController::class, 'show']);
Route::post('/biodata-dosens/{nidn}', [App\Http\Controllers\BiodataDosenController::class, 'update']);
