<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MyStoreController;

Route::middleware(['auth', 'role:vendor'])->group(function () {
    Route::get('my-store', [MyStoreController::class, 'index'])
        ->name('my-store');
    Route::post('my-store', [MyStoreController::class, 'store'])
        ->name('my-store.store');
});
