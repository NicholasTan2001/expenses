<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FoodsBeveragesController;
use App\Http\Controllers\TransportationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ClothesController;
use App\Http\Controllers\OthersController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\ModificationController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\RevenueController;
use App\Http\Controllers\InvestmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Income;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return redirect('/login');
});

// Dashboard route (protected)
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Authenticated routes
Route::middleware('auth')->group(function () {

    // Profile management routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Foods & Beverages page
    Route::get('/foodsbeverages', [FoodsBeveragesController::class, 'totalprice'])->name('foodsbeverages');

    // Trasnportation page
    Route::get('/transportation', [TransportationController::class, 'totalprice'])->name('transportation');

    // Clothes page
    Route::get('/clothes', [ClothesController::class, 'totalprice'])->name('clothes');

     // Others page
    Route::get('/others', [OthersController::class, 'totalprice'])->name('others');

    // Hostory page
    Route::get('/history', [HistoryController::class, 'totalprice'])->name('history');

    // History Filter page
    Route::get('/history/filter/{category}', [HistoryController::class, 'filter'])->name('history.filter');

    // Expenses Modification page
    Route::get('/modification', [ModificationController::class, 'show'])->name('modification');

    // Expenses Modification - Update page
    Route::get('/modification/edit/{category}/{id}', [ModificationController::class, 'edit'])->name('modification.edit');

    // Income page    
    Route::get('/income', [IncomeController::class, 'index'])->name('income');

    // Revenue page
    Route::get('/revenue', [RevenueController::class, 'show'])->name('revenue');

    // Investment page
    Route::get('/investment', [InvestmentController::class, 'show'])->name('investment');

    // Foods & Beverages form submission
    Route::post('/foodsbeverages', [FoodsBeveragesController::class, 'store'])->name('foodsbeverages.store');

    // Transportation form submission
    Route::post('/transportation', [TransportationController::class, 'store'])->name('transportation.store');

    // Clothes form submission
    Route::post('/clothes', [ClothesController::class, 'store'])->name('clothes.store');

    // Others form submission
    Route::post('/others', [OthersController::class, 'store'])->name('others.store');

    // Modification - Foods & Beverages form submission
    Route::post('/modification/store-foodsbeverages', [ModificationController::class, 'storeFoodsBeverages'])->name('modification.store.foodsbeverages');

    // Modification - Transportation form submission
    Route::post('/modification/store-transportation', [ModificationController::class, 'storeTransportation'])->name('modification.store.transportation');
    
    // Modification - Clothes form submission
    Route::post('/modification/store-clothes', [ModificationController::class, 'storeClothes'])->name('modification.store.clothes');

    // Modification - Others form submission
    Route::post('/modification/store-others', [ModificationController::class, 'storeOthers'])->name('modification.store.others');

    // Income form submission
    Route::post('/income', [IncomeController::class, 'store'])->name('income.store');
    
    // Income form submission
    Route::post('/investment/store', [InvestmentController::class, 'store'])->name('investment.store');

    // Receive from investemnt
    Route::post('/investment/receive/{id}', [InvestmentController::class, 'receive'])->name('investment.receive');

    // Modification - Update submission
    Route::put('/modification/update/{category}/{id}', [ModificationController::class, 'update'])->name('modification.update');

    // Revenue - Update submission
    Route::put('/revenue/update', [RevenueController::class, 'update'])->name('revenue.update');    

    // Modification - Delete expenses
    Route::delete('/modification/delete/{category}/{id}', [ModificationController::class, 'destroy'])
    ->name('modification.destroy');   
    
    // Investment - Delete investment
    Route::delete('/investment/destroy/{id}', [InvestmentController::class, 'destroy'])->name('investment.destroy');

});

require __DIR__.'/auth.php';
