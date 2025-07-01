<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(RolesAndPermissionsSeeder::class);
      

        $user = User::factory()->create([
            'name' => 'Rokhai',
            'email' => 'rokhai@gmail.com',
            'password' => bcrypt('password'),
         
        ]);

        // Assign the 'admin' role to the user
        $user->assignRole(Role::findByName('admin'));
        $user->assignRole(Role::findByName('vendor'));
        // $user->assignRole(Role::findByName('customer'));

        // $user->syncRoles([
        //     Role::findByName('admin'),
        //     Role::findByName('vendor'),
        //     Role::findByName('customer'),
        // ]);

        // dd($user);

        $user1 = User::factory()->create([
            'name' => 'Customer1',
            'email' => 'customer1@gmail.com',
            'password' => bcrypt('password'),
        ]);
        $user1->assignRole(Role::findByName('consumer'));

        $user2 = User::factory()->create([
            'name' => 'Vendor1',
            'email' => 'vendor1@gmail.com',
            'password' => bcrypt('password'),
        ]);
        $user2->assignRole(Role::findByName('vendor'));

        $user3 = User::factory()->create([
            'name' => 'Customer2',
            'email' => 'customer2@gmail.com',
            'password' => bcrypt('password'),
        ]);
        $user3->assignRole(Role::findByName('consumer'));
        $user4 = User::factory()->create([
            'name' => 'Rolex',
            'email' => 'rolex@gmail.com',
            'password' => bcrypt('password'),
        ]);
        $user4->assignRole(Role::findByName('admin'));

        $this->call(CategorySeeder::class);
        $this->call(ProductSeeder::class);
    }
}
