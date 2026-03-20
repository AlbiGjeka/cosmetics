<?php

namespace App\Http\Controllers;

use App\Models\AffiliateClick;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        $totalClicks = AffiliateClick::count();

        $clicksToday = AffiliateClick::whereDate('created_at', today())->count();

        $clicksThisWeek = AffiliateClick::where('created_at', '>=', now()->startOfWeek())->count();

        $topProducts = Product::withCount('clicks')
            ->orderByDesc('clicks_count')
            ->take(10)
            ->get(['id', 'name', 'price', 'image_urls']);

        $trafficSources = AffiliateClick::select('utm_source', DB::raw('count(*) as total'))
            ->whereNotNull('utm_source')
            ->groupBy('utm_source')
            ->orderByDesc('total')
            ->get();

        $clicksByDay = AffiliateClick::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('count(*) as total')
            )
            ->where('created_at', '>=', now()->subDays(29))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('Admin/Analytics', [
            'totalClicks'    => $totalClicks,
            'clicksToday'    => $clicksToday,
            'clicksThisWeek' => $clicksThisWeek,
            'topProducts'    => $topProducts,
            'trafficSources' => $trafficSources,
            'clicksByDay'    => $clicksByDay,
        ]);
    }
}
