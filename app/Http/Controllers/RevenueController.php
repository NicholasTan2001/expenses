<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Income;

class RevenueController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $income = Income::where('user_id', $user->id)->first();

        return Inertia::render('Revenue', [
            'hasRevenue' => $income !== null,
            'year' => $income?->year,
            'month' => $income?->month,
            'day' => $income?->day,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'year' => 'required|numeric|min:0',
            'month' => 'required|numeric|min:0',
            'day' => 'required|numeric|min:0',
        ]);

        $income = Income::where('user_id', Auth::id())->first();

        if ($income) {
            $income->update([
                'year' => $request->year,
                'month' => $request->month,
                'day' => $request->day,
            ]);
        }

        return redirect()->route('dashboard')->with('success', 'Revenue added successfully.');
    }
}
