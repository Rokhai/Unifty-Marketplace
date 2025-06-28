<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $categories = Category::all(['id', 'name']); // Fetch all categories
        $products = Product::with('category')->orderBy('created_at', 'desc')->paginate(7); // Get newest inserted first

        $products->getCollection()->transform(function ($product) {
            $product->category_name = $product->category?->name ?? '';
            unset($product->category); // Remove the category object to avoid sending it to the frontend
            return $product;
        });
       

        return Inertia::render('Admin/Products/Index', [
            'products' => $products, // Paginated products with links
            'categories' => $categories, // All categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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

        return redirect()->route('products.admin.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
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
            'is_approved' => 'boolean',

        ]);

        $product = Product::findOrFail($id); // Find the product by ID

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        } 

        $updatedProduct = [
            
            'name' => $validated['name'],
            'image' => $validated['image'] ?? $product->image, // Use existing image if not updated
            'stock' => $validated['stock'],
            'price' => $validated['price'],
            'description' => $validated['description'] ?? '', // Use existing description if not updated
            'category_id' => $validated['category_id'],
            'is_active' => $request['is_active'], // Default to false if not provided
            'is_approved' => $request['is_approved'] , // Default to false if not provided
        ];

        // Update the product
        Product::where('id', $id)->update($updatedProduct);
        return redirect()->route('products.admin.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Delete the product
        Product::find($id)->delete();
        return redirect()->route('products.admin.index')->with('success', 'Product deleted successfully.');
    }
}
