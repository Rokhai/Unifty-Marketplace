<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyStoreController extends Controller
{
    /**
     * Show the my store page.
     */
    public function index()
    {

        $store = Store::where('user_id', auth()->id())->first();


        return Inertia::render(
            'my-store',
            [
                'store' => $store,
            ]
        );
    }

    /**
     * Create a new store.
     */

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
            'location' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('store-images', 'public');
        }

        $store = Store::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'image' => $request->file('image')->store('images', 'public'),
            'location' => $request->location,
        ]);
        // Store the store data in the database
        // ...

        return redirect()->route('my-store', ['store' => $store])->with('success', 'Store created successfully.');
    }
}
