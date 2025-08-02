<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Income;
use App\Models\FoodsBeverages;
use App\Models\Transportation;
use App\Models\Clothes;
use App\Models\Others;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class IncomeController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $income = Income::where('user_id', $userId)->first();

        if ($income) {
            $currentDate = Carbon::now('Asia/Kuala_Lumpur')->toDateString();
            $current = explode('-', $currentDate); 
            $stored = explode('-', $income->date); 

            $updateNeeded = false;
            $additionalIncome = 0;

            $currentYear = (int) $current[0];
            $currentMonth = (int) $current[1];
            $currentDay = (int) $current[2];

            $storedYear = (int) $stored[0];
            $storedMonth = (int) $stored[1];
            $storedDay = (int) $stored[2];

            if ($currentYear > $storedYear) {
                $yearDiff = $currentYear - $storedYear;
                $additionalIncome += $income->year * $yearDiff;
                $updateNeeded = true;
            }

            if ($currentMonth > $storedMonth || $currentYear > $storedYear) {
                $totalCurrentMonths = $currentYear * 12 + $currentMonth;
                $totalStoredMonths = $storedYear * 12 + $storedMonth;
                $monthDiff = $totalCurrentMonths - $totalStoredMonths;

                if ($monthDiff > 0) {
                    $additionalIncome += $income->month * $monthDiff;
                    $updateNeeded = true;
                }
            }

            if ($currentDay > $storedDay || $currentMonth > $storedMonth || $currentYear > $storedYear) {
                $currentTotalDays = $currentYear * 365 + $currentMonth * 30 + $currentDay;
                $storedTotalDays = $storedYear * 365 + $storedMonth * 30 + $storedDay;
                $dayDiff = $currentTotalDays - $storedTotalDays;

                if ($dayDiff > 0) {
                    $additionalIncome += $income->day * $dayDiff;
                    $updateNeeded = true;
                }
            }

            if ($updateNeeded) {
                $income->income += $additionalIncome;
                $income->date = $currentDate;
                $income->save();
            }
        }
        
        $records = collect()
            ->merge(FoodsBeverages::where('user_id', $userId)->get())
            ->merge(Clothes::where('user_id', $userId)->get())
            ->merge(Transportation::where('user_id', $userId)->get())
            ->merge(Others::where('user_id', $userId)->get());

        $latestRecords = $records
            ->sortByDesc('updated_at')
            ->take(10)
            ->map(function ($record) {
                if ($record instanceof \App\Models\Clothes) {
                    $name = $record->type;
                } elseif ($record instanceof \App\Models\Transportation) {
                    $name = $record->transport;
                } else {
                    $name = $record->name;
                }

                return [
                    'date' => $record->date,
                    'name' => $name,
                    'total_price' => number_format($record->total_price, 2),
                ];
            })
            ->values(); 

        return Inertia::render('Income', [
            'hasIncome' => !!$income,
            'incomeAmount' => $income?->income ?? 0,
            'latestRecords' => $latestRecords,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'income' => 'required|numeric|min:0',
        ]);

        Income::create([
            'user_id' => Auth::id(),
            'income' => $request->income,
            'date' => Carbon::now('Asia/Kuala_Lumpur')->toDateString(),
            'year' => 0.00,
            'month' => 0.00,
            'day' => 0.00,
        ]);

        return redirect()->route('income');
    }
}
