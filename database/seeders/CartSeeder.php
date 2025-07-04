<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cart;
class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
       $cart = [
            ['user_id' => 1, 'product_id' => 1, 'quantity' => 2],
            ['user_id' => 1, 'product_id' => 4, 'quantity' => 2],
            // ['user_id' => 1, 'product_id' => 2, 'quantity' => 2],
       ];

        foreach ($cart as $item) {
            Cart::create($item);
        }

        
    }
}
