<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\MyStoreController;

// Admin Controllers
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;

use App\Http\Controllers\Vendor\ProductController as VendorProductController;
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
        Route::resource('products/admin', AdminProductController::class)
            ->names('products.admin');
    });

    // Consumer routes
    
    // Add vendor role to the user
    Route::get('start-store', function(){
        $user = auth()->user();
        if (!$user) {
            return redirect()->back()->with('error', 'User not found.');
        }

        // Sync the vendor role to the user
        $user->assignRole(\Spatie\Permission\Models\Role::findByName('vendor'));
        $user->save();

        return redirect()->route('vendor.products.index')->with('success', 'Store created successfully.');
    })->name('start-store');
 


    // Vendor routes
    Route::middleware(['role:vendor'])->group(function () {
        Route::resource('vendor/products', VendorProductController::class)
            ->names('vendor.products'); 
    });

    // Route::resource('roles', RoleController::class)
    //     ->middleware('role:admin') // Only allow admins
    //     ->names('roles');

    // Route::resource('products', ProductController::class)
    //     ->middleware(['role:admin']) // Only allow admins
    //     ->names('products');



});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/store.php';