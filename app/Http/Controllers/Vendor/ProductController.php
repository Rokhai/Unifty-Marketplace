<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;

use Inertia\Inertia;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $products = Product::where('user_id', auth()->id())
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->paginate(5); // Get newest inserted first
        $products->getCollection()->transform(function ($product) {
            $product->category_name = $product->category?->name ?? '';
            unset($product->category); // Remove the category object to avoid sending it to the frontend
            return $product;
        });

        // dd($products);
        return Inertia::render('Vendor/Products/Index', [
            'user' => auth()->user(),
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $categories = Category::all(['id', 'name']); // Fetch all categories

        return Inertia::render('Vendor/Products/Create', [
            'user' => auth()->user(),
            'categories' => $categories, // All categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([

            'name' => 'required|string|max:255',
            'image' => 'required|image|max:2048',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string|max:1000',
            'category_id' => 'required|numeric',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        // Create the product
        Product::create([
            'name' => $validated['name'],
            'image' => $validated['image'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'description' => $validated['description'] ?? 'No description provided.',
            'category_id' => $validated['category_id'],
            'is_active' => $validated['is_active'] ?? false, // Default to false if not provided
            'is_approved' => false, // Default to false
        ]);

        return redirect()->route('vendor.products.index')->with('success', 'Product created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Find the product by ID and ensure it belongs to the authenticated user
        $product = Product::where('user_id', auth()->id())
            ->with('category')
            ->findOrFail($id);
        $product->category_name = $product->category?->name ?? '';
        unset($product->category); // Remove the category object to avoid sending it to the frontend
        return Inertia::render('Vendor/Products/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $product = Product::where('user_id', auth()->id())
            ->with('category')
            ->findOrFail($id);
        $product->category_name = $product->category?->name ?? '';
        unset($product->category); // Remove the category object to avoid sending it to the frontend    
        $categories = Category::all(['id', 'name']); // Fetch all categories    
        return Inertia::render('Vendor/Products/Edit', [
            'product' => $product,
            'categories' => $categories, // All categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image', // Make image optional for update
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:1000',
            'category_id' => 'required|exists:categories,id',
            'is_active' => 'boolean',
        ]);

        // Find the product by ID and ensure it belongs to the authenticated user
        $product = Product::where('user_id', auth()->id())->findOrFail($id);
       
        $validated['image'] = $product->image; // Default to existing image if not updated
        if ($request->hasFile('image')) {
            // If a new image is uploaded, store it and update the path
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        // Update the product with the validated data
        $product->update($validated);
        return redirect()->route('vendor.products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Delete the product by ID and ensure it belongs to the authenticated user
        $product = Product::where('user_id', auth()->id())->findOrFail($id);
        $product->delete();
        return redirect()->route('vendor.products.index')->with('success', 'Product deleted successfully.');
    }
}
