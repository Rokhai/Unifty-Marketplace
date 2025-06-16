<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\MyStoreController;

// Admin Controllers
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\ProductController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Home page route
    Route::get('home', [\App\Http\Controllers\HomeController::class, 'index'])
        ->name('home');

    // Admin routes 
    Route::middleware(['role:admin'])->group(function () {
        // Users management routes
        Route::resource('users', UserController::class)
            ->names('users');

        // Role management routes
        Route::resource('roles', RoleController::class)
            ->names('roles');

        // Product management routes
        Route::resource('products', ProductController::class)
            ->names('products');
    });


    // Route::resource('roles', RoleController::class)
    //     ->middleware('role:admin') // Only allow admins
    //     ->names('roles');

    // Route::resource('products', ProductController::class)
    //     ->middleware(['role:admin']) // Only allow admins
    //     ->names('products');



    Route::get('market', [\App\Http\Controllers\MarketController::class, 'create'])
        ->middleware('role:consumer') // Only allow consumers
        ->name('market');


});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/store.php';