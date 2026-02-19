<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WishlistController extends Controller
{
    /**
     * Display the authenticated user's full wishlist.
     */
    public function index()
    {
        $items = Auth::user()
            ->wishlist()
            ->with('category')
            ->get();

        return Inertia::render('Wishlist/Index', [
            'wishlistItems' => $items,
        ]);
    }

    /**
     * Add a product to the authenticated user's wishlist.
     */
    public function store(Product $product)
    {
        Auth::user()->wishlist()->syncWithoutDetaching([$product->id]);

        return back()->with('success', 'Added to wishlist.');
    }

    /**
     * Remove a product from the authenticated user's wishlist.
     */
    public function destroy(Product $product)
    {
        Auth::user()->wishlist()->detach($product->id);

        return back()->with('success', 'Removed from wishlist.');
    }
}
