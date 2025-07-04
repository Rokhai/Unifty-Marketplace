<?php

namespace App\Http\Controllers\Consumer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Cart;

use Inertia\Inertia;
class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cartItems = Cart::where('user_id', auth()->id())
            ->with([
                'product' => function ($query) {
                    $query->select('id', 'name', 'price', 'user_id', 'image');
                    $query->with([
                        'user' => function ($q) {
                            $q->select('id', 'name');
                        }
                    ]);
                }
            ])
            ->get(['id', 'product_id', 'quantity', 'user_id']);

        // Group cart items by product owner (user)
        $groupedByOwner = $cartItems->groupBy(function ($cartItem) {
            return $cartItem->product->user->id ?? null;
        });

        return Inertia::render('Consumer/Cart/Index', [
            'cartItems' => $groupedByOwner,
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
        //
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        // dd($validated);
        $cart = new Cart();
        $cart->user_id = auth()->id();
        $cart->product_id = $validated['product_id'];
        $cart->quantity = $validated['quantity'];
        $cart->save();

        return redirect()->back()->with('success', 'Product added to cart successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Delete the cart item by ID
        $cart = new Cart();
        $cartItem = $cart->where('id', $id)->where('user_id', auth()->id())->first();
        $cartItem?->delete();
        return redirect()->back()->with('success', 'Cart item removed successfully.');
    }
}
