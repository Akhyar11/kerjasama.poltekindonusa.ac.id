<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\News;
use App\Models\Page;
use App\Models\StudyProgram;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
        $news = News::where('is_published', true)->get();
        $pages = Page::all();
        $programs = StudyProgram::all();

        $content = view('sitemap', compact('news', 'pages', 'programs', 'frontendUrl'))->render();

        return response($content, 200)->header('Content-Type', 'text/xml');
    }
}
