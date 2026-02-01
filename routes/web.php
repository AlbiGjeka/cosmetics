<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $categories = Category::with('products')->get();
    return Inertia::render('Home', [
        'canRegister' => Features::enabled(Features::registration()),
        'categories' => $categories,
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('admin')->group(function () {
    Route::apiResource('products', ProductController::class);
    Route::apiResource('categories', CategoryController::class);
});

// routes/web.php

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/dashboard/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/dashboard/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/dashboard/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/dashboard/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/dashboard/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/dashboard/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/dashboard/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/dashboard/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/dashboard/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

require __DIR__ . '/settings.php';
