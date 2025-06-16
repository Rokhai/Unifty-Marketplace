<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class HomeController extends Controller
{
    //
    public function index(Request $request)
    {

        $products = Product::with('category')
            ->where('is_active', '1') // Only active products
            ->where('is_approved', '1') // Only approved products
            ->paginate(10); // Paginate results
        // Render the home page using Inertia
        return Inertia::render('Home', [
            'products' => $products, // Pass paginated products
            // 'filters' => $request->all('search', 'category'), // Pass filters if any
        ]);
    }
}
