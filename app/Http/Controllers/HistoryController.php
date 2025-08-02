<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\FoodsBeverages;
use App\Models\Transportation;
use App\Models\Clothes;
use App\Models\Others;

class HistoryController extends Controller
{
    public function totalprice()
    {
        $userId = auth()->id();
        $today = Carbon::now('Asia/Kuala_Lumpur')->toDateString();

        $totalFoodsBeverages = FoodsBeverages::where('user_id', $userId)
            ->whereDate('date', $today)
            ->sum('total_price');

        $totalTransportation = Transportation::where('user_id', $userId)
            ->whereDate('date', $today)
            ->sum('total_price');

        $totalClothes = Clothes::where('user_id', $userId)
            ->whereDate('date', $today)
            ->sum('total_price');

        $totalOthers = Others::where('user_id', $userId)
            ->whereDate('date', $today)
            ->sum('total_price');

        $totalToday = $totalFoodsBeverages + $totalTransportation + $totalClothes + $totalOthers;

        return Inertia::render('History', [
            'totalFoodsBeverages' => $totalFoodsBeverages,
            'totalTransportation' => $totalTransportation,
            'totalClothes' => $totalClothes,
            'totalOthers' => $totalOthers,
            'totalToday' => $totalToday,
        ]);
    }

    public function filter(Request $request, $category)
    {
        $userId = auth()->id();
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $labels = [
            'foodsbeverages' => 'Foods & Beverages',
            'transportation' => 'Transportation',
            'clothes' => 'Clothes',
            'others' => 'Others',
        ];

        $categoryLabel = $labels[$category] ?? ucfirst($category);

        $queryDate = fn($query) => $query
            ->where('user_id', $userId)
            ->when($startDate && $endDate, fn($q) =>
                $q->whereBetween('date', [$startDate, $endDate])
            )
            ->orderByDesc('date');

        switch ($category) {
            case 'foodsbeverages':
                $data = $queryDate(app(FoodsBeverages::class))
                    ->get(['date', 'name', 'type', 'total_price', 'remarks']);
                break;

            case 'transportation':
                $data = $queryDate(app(Transportation::class))
                    ->get(['date', 'transport as name', 'place as type', 'total_price', 'remarks']);
                break;

            case 'clothes':
                $data = $queryDate(app(Clothes::class))
                    ->get(['date', 'type as name', 'brand as type', 'total_price', 'remarks']);
                break;

            case 'others':
                $data = $queryDate(app(Others::class))
                    ->get(['date', 'name', 'place as type', 'total_price', 'remarks']);
                break;

            default:
                $data = collect();
        }

        $totalExpenses = $data->sum('total_price');

        $overallExpenses =
            $queryDate(app(FoodsBeverages::class))->sum('total_price') +
            $queryDate(app(Transportation::class))->sum('total_price') +
            $queryDate(app(Clothes::class))->sum('total_price') +
            $queryDate(app(Others::class))->sum('total_price');

        return Inertia::render('HistoryFilter', [
            'categoryLabel' => $categoryLabel,
            'data' => $data,
            'totalExpenses' => $totalExpenses,
            'overallExpenses' => $overallExpenses,
        ]);
    }
}
