<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $roles = \Spatie\Permission\Models\Role::with(['permissions'])->paginate(10);
        $permissions = \Spatie\Permission\Models\Permission::all();

        return Inertia::render('Admin/Role/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Show the form for creating a new role
        // Fetch all permissions to display in the form
        $permissions = \Spatie\Permission\Models\Permission::all();
        return Inertia::render('Admin/Role/Create', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'array',
        ]);
        // Check if the role already exists
        if (\Spatie\Permission\Models\Role::where('name', $validated['name'])->exists()) {
            return redirect()->back()->withErrors(['name' => 'Role already exists.']);
        }

        // Create the role and assign permissions if provided
        $role = \Spatie\Permission\Models\Role::create(['name' => $validated['name']]);
        if (isset($validated['permissions'])) {
            $role->syncPermissions(\Spatie\Permission\Models\Permission::find($validated['permissions']));
        }

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
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
        // Validate the request data
        $role = \Spatie\Permission\Models\Role::findOrFail($id);
        $validated = $request->validate([

            'permissions' => 'array',
            'current_page' => 'integer',
        ]);

        // Sync permissions if provided
        if (isset($validated['permissions']) && isset($role)) {
            $role->syncPermissions(\Spatie\Permission\Models\Permission::find($validated['permissions']));
            $role->save();
        }

        // Preserve the current page
        $currentPage = $validated['current_page'] ?? 1;

        return redirect()->route('roles.index', ['page' => $currentPage])->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
