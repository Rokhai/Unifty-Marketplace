<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $users = User::with('roles')->paginate(10); // Ensure pagination is used
        $roles = Role::pluck('name');

        // Validate the requested page number
        $currentPage = $request->query('page', 1); // Default to page 1
        if ($currentPage > $users->lastPage() || $currentPage < 1) {
            return redirect()->route('users.index', ['page' => 1]); // Redirect to page 1
        }

        return Inertia::render('Admin/Users/Index', [
            'users' => $users, // Paginated users with links
            'roles' => $roles,
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'roles' => 'array',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),

        ]);

        // dd($validated['roles']);

        foreach ($validated['roles'] as $role) {
            $user->assignRole(Role::findByName($role));
        }

        return redirect()->route('users.index')->with('success', 'User created successfully.');
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
        // Find the user by ID and return the edit view with user data
        $user = User::findOrFail($id);
        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                // 'password' => '', // Password should not be pre-filled
                'roles' => $user->roles->pluck('name')->toArray(),
            ],
            'roles' => Role::pluck('name')
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
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
            'roles' => 'array',
        ]);
        $user = User::findOrFail($id);
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        // dd($validated);
        // Sync roles   
        $user->syncRoles($validated['roles']);
        $user->save();

        // return Inertia::render('Users/Index')->with('success', 'User updated successfully.');
        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Delete the user based on the provided ID
        User::find($id)->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
