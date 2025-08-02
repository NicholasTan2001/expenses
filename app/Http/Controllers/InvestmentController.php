<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\Investment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvestmentController extends Controller
{

public function show()
{
    $userId = Auth::id();

    $hasIncome = Income::where('user_id', $userId)->exists();

    $investments = Investment::where('user_id', $userId)->get();

    $today = now()->startOfDay(); 

    foreach ($investments as $investment) {
        $updatedAt = $investment->updated_at->startOfDay(); 
        $startDate = \Carbon\Carbon::parse($investment->date)->startOfDay();
        $durationDays = $investment->duration;

        if ($updatedAt->eq($today)) {
            continue;
        }

        $targetDate = $startDate->copy()->addDays($durationDays);

        if ($today->greaterThanOrEqualTo($targetDate)) {

            $investment->amount += $investment->amount * ($investment->rates / 100);

            $investment->date = $targetDate->toDateString();
        }

        $investment->updated_at = now();
        $investment->save();
    }

    $totalInvestment = Investment::where('user_id', $userId)->sum('amount');

    return Inertia::render('Investment', [
        'hasIncome' => $hasIncome,
        'totalInvestment' => $totalInvestment,
        'investments' => Investment::where('user_id', $userId)->get(), // Refresh data
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'rates' => 'required|numeric|min:0.01',
            'duration' => 'required|integer|min:1',
            'date' => 'required|date',
        ]);

        $user = auth()->user();

        // Reduce user's income by the investment amount
        $income = Income::where('user_id', $user->id)->first();
        if ($income) {
            $income->income -= $request->amount;
            $income->save();
        }

        Investment::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'amount' => $request->amount,
            'rates' => $request->rates,
            'duration' => $request->duration,
            'date' => $request->date,
        ]);

        return redirect()->route('dashboard')->with('success', 'Investment added successfully.');
    }

    public function destroy($id)
    {
        $investment = Investment::where('id', $id)->where('user_id', auth()->id())->firstOrFail();

        // Increase user's income back by the investment amount
        $income = Income::where('user_id', auth()->id())->first();
        if ($income) {
            $income->income += $investment->amount;
            $income->save();
        }

        $investment->delete();

        return redirect()->route('dashboard')->with('success', 'Investment deleted successfully.');
    }

    public function receive(Request $request, $id)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
        ]);

        $investment = Investment::where('id', $id)->where('user_id', auth()->id())->firstOrFail();

        if ($request->amount > $investment->amount) {
            return back()->withErrors(['amount' => 'The amount exceeds the available investment.']);
        }

        // Increase user's income back
        $income = Income::where('user_id', auth()->id())->first();
        if ($income) {
            $income->income += $request->amount;
            $income->save();
        }

        // Reduce investment amount
        $investment->amount -= $request->amount;

        // If fully withdrawn, delete the investment
        if ($investment->amount <= 0) {
            $investment->delete();
        } else {
            $investment->save();
        }

        return redirect()->route('dashboard')->with('success', 'Investment received successfully.');
    }


}
