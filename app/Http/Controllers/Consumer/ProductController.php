<?php

namespace App\Http\Controllers\Consumer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a product by its ID
     */
    public function show(string $id)
    {
        // Find the product by ID
        $product = Product::with('category')->findOrFail($id);

        // Transform the product to include category name
        $product->category_name = $product->category?->name ?? '';
        unset($product->category); // Remove the category object to avoid sending it to the frontend

        return Inertia::render('Consumer/Product/Show', [
            'product' => $product,
        ]);
    }


}
