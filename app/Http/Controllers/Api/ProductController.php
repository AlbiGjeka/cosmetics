<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        // Filter by category
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Search by name or description
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $products = $query->get();
        $categories = Category::all();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['category_id', 'search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Form', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'affiliate_link' => 'required|url',
            'image_urls.*' => 'nullable|image',
        ]);

        if ($request->hasFile('image_urls')) {
            $data['image_urls'] = [];
            foreach ($request->file('image_urls') as $image) {
                $data['image_urls'][] = $image->store('products', 'public');
            }
        }

        Product::create($data);

        return redirect()
            ->route('products.index')
            ->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Form', [
            'product' => $product,
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'affiliate_link' => 'required|url',
            'image_urls' => 'array',
            'image_urls.*' => 'nullable',
        ]);

        /** ---------------------------------------------
         * 1. Images sent as strings = KEEP
         * --------------------------------------------- */
        $existingImages = collect($request->input('image_urls', []))
            ->filter(fn($img) => is_string($img))
            ->values();

        /** ---------------------------------------------
         * 2. Delete removed images
         * --------------------------------------------- */
        collect($product->image_urls ?? [])
            ->diff($existingImages)
            ->each(fn($img) => Storage::disk('public')->delete($img));

        /** ---------------------------------------------
         * 3. Store newly uploaded images
         * --------------------------------------------- */
        if ($request->hasFile('image_urls')) {
            foreach ($request->file('image_urls') as $file) {
                if ($file instanceof \Illuminate\Http\UploadedFile) {
                    $existingImages->push(
                        $file->store('products', 'public')
                    );
                }
            }
        }

        $data['image_urls'] = $existingImages->toArray();

        $product->update($data);

        return redirect()
            ->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        if ($product->image_urls) {
            foreach ($product->image_urls as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $product->delete();

        return redirect()
            ->route('products.index')
            ->with('success', 'Product deleted successfully.');
    }

    public function show(Product $product)
    {
        return Inertia::render('Products/Show', [
            'product' => $product
        ]);
    }

}