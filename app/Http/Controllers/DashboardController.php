<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\FoodsBeverages;
use App\Models\Transportation;
use App\Models\Clothes;
use App\Models\Others;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::now('Asia/Kuala_Lumpur')->format('Y-m-d');

        $totalFoods = FoodsBeverages::whereDate('date', $today)
            ->where('user_id', auth()->id())
            ->sum('total_price');

        $totalTransport = Transportation::whereDate('date', $today)
            ->where('user_id', auth()->id())
            ->sum('total_price');

        $totalClothes = Clothes::whereDate('date', $today)
            ->where('user_id', auth()->id())
            ->sum('total_price');
        
        $totalOthers = Others::whereDate('date', $today)
            ->where('user_id', auth()->id())
            ->sum('total_price');

        $totalToday = $totalFoods + $totalTransport + $totalClothes + $totalOthers;

        return Inertia::render('Dashboard', [
            'totalToday' => $totalToday
        ]);
    }
}

