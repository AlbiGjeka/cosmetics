<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\WishlistController;
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
    $wishlistItems = auth()->user()
        ->wishlist()
        ->with('category')
        ->latest('wishlists.created_at')
        ->take(6)
        ->get();

    return Inertia::render('dashboard', [
        'wishlistItems' => $wishlistItems,
        'wishlistCount' => auth()->user()->wishlist()->count(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('admin')->middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::apiResource('products', ProductController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('categories', CategoryController::class)->only(['store', 'update', 'destroy']);
});

// routes/web.php

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/dashboard/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/dashboard/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/dashboard/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/dashboard/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/dashboard/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::post('/dashboard/products/{product}', [ProductController::class, 'update']);
    Route::delete('/dashboard/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/dashboard/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/dashboard/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/dashboard/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/dashboard/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/dashboard/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('/wishlist/{product}', [WishlistController::class, 'store'])->name('wishlist.store');
    Route::delete('/wishlist/{product}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');
});

require __DIR__ . '/settings.php';
