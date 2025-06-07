<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category; // Assuming you have a Category model
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $categories = [
            ['name' => 'Electronics', 'slug' => 'electronics', 'description' => 'Electronic items and gadgets'],
            ['name' => 'Fashion', 'slug' => 'fashion', 'description' => 'Clothing, accessories, and more'],
            ['name' => 'Home & Kitchen', 'slug' => 'home-kitchen', 'description' => 'Home appliances and kitchenware'],
            ['name' => 'Books', 'slug' => 'books', 'description' => 'Books of various genres'],
            ['name' => 'Sports & Outdoors', 'slug' => 'sports-outdoors', 'description' => 'Sports equipment and outdoor gear'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => $category['slug'],
                'description' => $category['description'],
            ]);
        }
    }
}
