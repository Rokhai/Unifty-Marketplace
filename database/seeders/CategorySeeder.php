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
            ['name' => 'No category', 'slug' => 'no-category', 'description' => 'No specific category assigned'],
            ['name' => 'Handmade Crafts', 'slug' => 'handmade-crafts', 'description' => 'Unique handmade items and crafts'],
            ['name' => 'Art & Design', 'slug' => 'art-design', 'description' => 'Creative artworks and designs'],
            ['name' => 'Music & Audio', 'slug' => 'music-audio', 'description' => 'Music tracks and audio files'],
            ['name' => 'Photography', 'slug' => 'photography', 'description' => 'Stunning photographs and images'],
            ['name' => 'Collectibles', 'slug' => 'collectibles', 'description' => 'Rare and collectible items'],
            ['name' => 'Toys & Games', 'slug' => 'toys-games', 'description' => 'Fun and educational toys for all ages'],
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
