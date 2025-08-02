<?php

namespace App\Http\Controllers;

use App\Models\FoodsBeverages;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class FoodsBeveragesController extends Controller
{
    public function totalprice()
    {
        $today = Carbon::now('Asia/Kuala_Lumpur')->format('Y-m-d');

        $totalToday = FoodsBeverages::whereDate('date', $today)
            ->where('user_id', auth()->id())
            ->sum('total_price');

        return Inertia::render('FoodsBeverages', [
            'totalToday' => $totalToday,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:Foods,Beverages',
            'total_price' => 'required|numeric|min:0',
            'remarks' => 'required|string|max:1000',
            'date' => 'required|date',
        ]);

        FoodsBeverages::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'type' => $validated['type'],
            'total_price' => $validated['total_price'],
            'remarks' => $validated['remarks'],
            'date' => $validated['date'],
        ]);

         $income = \App\Models\Income::where('user_id', auth()->id())->first();

        if ($income) {
            $income->income -= $validated['total_price'];
            $income->save();
        }

        return redirect()->route('foodsbeverages')->with('success', 'Added successfully.');
    }
}
