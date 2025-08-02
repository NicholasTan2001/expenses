<?php

namespace App\Http\Controllers;

use App\Models\Transportation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class TransportationController extends Controller
{
     public function totalprice()
    {
        $today = Carbon::now('Asia/Kuala_Lumpur')->format('Y-m-d');

        $totalToday = Transportation::whereDate('date', $today)
            ->where('user_id', auth()->id())
            ->sum('total_price');

        return Inertia::render('Transportation', [
            'totalToday' => $totalToday,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'transport'    => 'required|string|max:255',
            'place'        => 'required|string|max:255',
            'total_price'  => 'required|numeric|min:0',
            'remarks'      => 'required|string|max:1000',
            'date'         => 'required|date',
        ]);

        Transportation::create([
            'user_id'     => auth()->id(),
            'transport'   => $validated['transport'],
            'place'       => $validated['place'],
            'total_price' => $validated['total_price'],
            'remarks'     => $validated['remarks'],
            'date'        => $validated['date'],
        ]);

        $income = \App\Models\Income::where('user_id', auth()->id())->first();

        if ($income) {
            $income->income -= $validated['total_price'];
            $income->save();
        }

        return redirect()->route('dashboard')->with('success', 'Transportation added successfully.');
    }
}

