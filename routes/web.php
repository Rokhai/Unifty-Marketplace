<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\MyStoreController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('market', [\App\Http\Controllers\MarketController::class, 'create'])
        ->name('market');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/store.php';