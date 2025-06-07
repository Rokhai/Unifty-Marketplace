<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Role
        $adminRole = Role::create(['name' => 'admin']);
        $vendorRole = Role::create(['name' => 'vendor']);
        $consumerRole = Role::create(['name' => 'consumer']);


        // Create Permissions
        // Admin Permissions
        $manageUsers = Permission::create(['name' => 'manage users']);

        // Vendor Permissions
        $manageProducts = Permission::create(['name' => 'manage products']);
        $manageOrders = Permission::create(['name' => 'manage orders']);
        $viewReports = Permission::create(['name' => 'view reports']);


        // Customer Permissions
        $viewProducts = Permission::create(['name' => 'view products']);
        $placeOrders = Permission::create(['name' => 'place orders']);
        $viewOrderHistory = Permission::create(['name' => 'view order history']);

        // Assign Permissions to Roles

        // Admin Role Permissions
        $adminRole->givePermissionTo([
            $manageUsers,
            $manageProducts,
            $manageOrders,
            $viewReports,
        ]);

        // Vendor Role Permissions
        $vendorRole->givePermissionTo([
            $manageProducts,
            $manageOrders,
            $viewReports,
        ]);

        // Customer Role Permissions
        $consumerRole->givePermissionTo([
            $viewProducts,
            $placeOrders,
            $viewOrderHistory,
        ]);
    }
}
