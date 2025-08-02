<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FoodsBeverages;
use App\Models\Transportation;
use App\Models\Clothes;
use App\Models\Others;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Redirect;

class ModificationController extends Controller
{
    public function storeFoodsBeverages(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'total_price' => 'required|numeric|min:0',
            'remarks' => 'required|string',
        ]);

        FoodsBeverages::create([
            'user_id' => Auth::id(),
            'date' => $request->date,
            'name' => $request->name,
            'type' => $request->type,
            'total_price' => $request->total_price,
            'remarks' => $request->remarks,
        ]);

        $income = \App\Models\Income::where('user_id', auth()->id())->first();

        if ($income) {
            $income->income -= $request->total_price;
            $income->save();
        }

        return redirect('/dashboard')->with('success', 'Foods & Beverages data saved!');
    }

    public function storeTransportation(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'transport' => 'required|string|max:255',
            'place' => 'required|string|max:255',
            'total_price' => 'required|numeric|min:0',
            'remarks' => 'required|string',
        ]);

        Transportation::create([
            'user_id' => auth()->id(),
            'date' => $request->date,
            'transport' => $request->transport,
            'place' => $request->place,
            'total_price' => $request->total_price,
            'remarks' => $request->remarks,
        ]);

        $income = \App\Models\Income::where('user_id', auth()->id())->first();

        if ($income) {
            $income->income -= $request->total_price;
            $income->save();
        }

        return redirect('/dashboard')->with('success', 'Transportation data saved!');
    }

    public function storeClothes(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'type' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'total_price' => 'required|numeric|min:0',
            'remarks' => 'required|string',
        ]);

        Clothes::create([
            'user_id' => auth()->id(),
            'date' => $request->date,
            'type' => $request->type,
            'brand' => $request->brand,
            'total_price' => $request->total_price,
            'remarks' => $request->remarks,
        ]);

        $income = \App\Models\Income::where('user_id', auth()->id())->first();

        if ($income) {
            $income->income -= $request->total_price;
            $income->save();
        }

        return redirect('/dashboard')->with('success', 'Clothes data saved!');
    }

     public function storeOthers(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'name' => 'required|string|max:255',
            'place' => 'required|string|max:255',
            'total_price' => 'required|numeric|min:0',
            'remarks' => 'required|string',
        ]);

        Others::create([
            'user_id' => auth()->id(),
            'date' => $request->date,
            'name' => $request->name,
            'place' => $request->place,
            'total_price' => $request->total_price,
            'remarks' => $request->remarks,
        ]);

        $income = \App\Models\Income::where('user_id', auth()->id())->first();

        if ($income) {
            $income->income -= $request->total_price;
            $income->save();
        }

        return redirect('/dashboard')->with('success', 'Others data saved!');
    }

    public function show()
    {
        return Inertia::render('Modification', [
            'allData' => [
                'transportation' => Transportation::where('user_id', auth()->id())->orderBy('date', 'desc')->get(),
                'foodsbeverages' => FoodsBeverages::where('user_id', auth()->id())->orderBy('date', 'desc')->get(),
                'clothes' => Clothes::where('user_id', auth()->id())->orderBy('date', 'desc')->get(),
                'others' => Others::where('user_id', auth()->id())->orderBy('date', 'desc')->get(),
            ]
        ]);
    }

    public function destroy($category, $id)
    {
        $modelMap = [
            'foodsbeverages' => FoodsBeverages::class,
            'transportation' => Transportation::class,
            'clothes' => Clothes::class,
            'others' => Others::class,
        ];

        if (!isset($modelMap[$category])) {
            abort(404);
        }

        $model = $modelMap[$category];
        $record = $model::findOrFail($id);

        $income = \App\Models\Income::where('user_id', auth()->id())->first();
        if ($income) {
            $income->income += $record->total_price;
            $income->save();
        }

        $record->delete();
        
        return redirect('/dashboard')->with('success', 'Others data saved!');

    }

    public function edit($category, $id)
    {
        $modelMap = [
            'foodsbeverages' => FoodsBeverages::class,
            'transportation' => Transportation::class,
            'clothes' => Clothes::class,
            'others' => Others::class,
        ];

        if (!isset($modelMap[$category])) {
            abort(404);
        }

        $model = $modelMap[$category];
        $record = $model::where('user_id', auth()->id())->findOrFail($id);

        return Inertia::render('ModificationUpdate', [
            'category' => $category,
            'record' => $record,
            'id' => $id,
        ]);
    }

    public function update(Request $request, $category, $id)
    {
        $modelMap = [
            'foodsbeverages' => [FoodsBeverages::class, [
                'date' => 'required|date',
                'name' => 'required|string|max:255',
                'type' => 'required|string|max:100',
                'total_price' => 'required|numeric|min:0',
                'remarks' => 'required|string',
            ]],
            'transportation' => [Transportation::class, [
                'date' => 'required|date',
                'transport' => 'required|string|max:255',
                'place' => 'required|string|max:255',
                'total_price' => 'required|numeric|min:0',
                'remarks' => 'required|string',
            ]],
            'clothes' => [Clothes::class, [
                'date' => 'required|date',
                'type' => 'required|string|max:255',
                'brand' => 'required|string|max:255',
                'total_price' => 'required|numeric|min:0',
                'remarks' => 'required|string',
            ]],
            'others' => [Others::class, [
                'date' => 'required|date',
                'name' => 'required|string|max:255',
                'place' => 'required|string|max:255',
                'total_price' => 'required|numeric|min:0',
                'remarks' => 'required|string',
            ]],
        ];

        if (!isset($modelMap[$category])) {
            abort(404);
        }

        [$model, $rules] = $modelMap[$category];

        $validated = $request->validate($rules);

        $record = $model::where('user_id', auth()->id())->findOrFail($id);
        $oldPrice = $record->total_price;
        $newPrice = $validated['total_price'];

        $record->update($validated);

        $income = \App\Models\Income::where('user_id', auth()->id())->first();
        if ($income) {
            $difference = abs($newPrice - $oldPrice);

            if ($newPrice > $oldPrice) {
                $income->income -= $difference;
            } elseif ($oldPrice > $newPrice) {
                $income->income += $difference;
            }

            $income->save();
        }

        return redirect()->route('dashboard')->with('success', ucfirst($category) . ' updated successfully!');
    }

}
