<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{{ $frontendUrl }}</loc>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>{{ $frontendUrl }}/berita</loc>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ $frontendUrl }}/program-studi</loc>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ $frontendUrl }}/download</loc>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>{{ $frontendUrl }}/pengaduan</loc>
        <priority>0.5</priority>
    </url>

    @foreach($news as $item)
    <url>
        <loc>{{ $frontendUrl }}/berita/{{ $item->slug }}</loc>
        <lastmod>{{ $item->updated_at->tz('UTC')->toAtomString() }}</lastmod>
        <priority>0.6</priority>
    </url>
    @endforeach

    @foreach($programs as $program)
    <url>
        <loc>{{ $frontendUrl }}/program-studi/{{ $program->slug }}</loc>
        <priority>0.7</priority>
    </url>
    @endforeach

    @foreach($pages as $page)
    <url>
        <loc>{{ $frontendUrl }}/{{ $page->slug }}</loc>
        <priority>0.4</priority>
    </url>
    @endforeach
</urlset>
