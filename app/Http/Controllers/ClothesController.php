<?php

namespace App\Http\Controllers;

use App\Models\Clothes;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ClothesController extends Controller
{
    public function totalprice()
    {
        $today = Carbon::now('Asia/Kuala_Lumpur')->format('Y-m-d');

        $totalToday = Clothes::whereDate('date', $today)
            ->where('user_id', auth()->id())
            ->sum('total_price');

        return Inertia::render('Clothes', [
            'totalToday' => $totalToday,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type'        => 'required|string|max:255',
            'brand'       => 'required|string|max:255',
            'total_price' => 'required|numeric|min:0',
            'remarks'     => 'required|string|max:1000',
            'date'        => 'required|date',
        ]);

        Clothes::create([
            'user_id'     => auth()->id(),
            'type'        => $validated['type'],
            'brand'       => $validated['brand'],
            'total_price' => $validated['total_price'],
            'remarks'     => $validated['remarks'],
            'date'        => $validated['date'],
        ]);

        $income = \App\Models\Income::where('user_id', auth()->id())->first();

        if ($income) {
            $income->income -= $validated['total_price'];
            $income->save();
        }


        return redirect()->route('dashboard')->with('success', 'Clothes expense added successfully.');
    }
}
