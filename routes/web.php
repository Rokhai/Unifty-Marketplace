<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\MyStoreController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('market', [\App\Http\Controllers\MarketController::class, 'create'])
        ->middleware('role:customer') // Only allow customers
        ->name('market');

    // Users management routes
    Route::resource('users', UserController::class)
        ->middleware('role:admin') // Only allow admins
        ->names('users');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/store.php';