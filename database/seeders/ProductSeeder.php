<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $products = [
            [
                "user_id" => 1,
                "name" => "Yugi Muto Crochet Doll",
                "image" => "products/yugi.jpg",
                "stock" => 10,
                "price" => 25.00,
                "description" => "A handmade crochet doll of Yugi Muto from Yu-Gi-Oh! Perfect for fans and collectors.",
                "category_id" => 2,
                "is_active" => true,
                "is_approved" => true,

            ],
            [
                "user_id" => 1,
                "name" => "Yugi Muto Crochet Doll",
                "image" => "products/yugi.jpg",
                "stock" => 10,
                "price" => 250.00,
                "description" => "A handmade crochet doll of Yugi Muto from Yu-Gi-Oh! Perfect for fans and collectors.",
                "category_id" => 2,
                "is_active" => false,
                "is_approved" => false,

            ],
            [
                "user_id" => 1,
                "name" => "Yugi Muto Crochet Doll",
                "image" => "products/yugi.jpg",
                "stock" => 10,
                "price" => 1000.00,
                "description" => "A handmade crochet doll of Yugi Muto from Yu-Gi-Oh! Perfect for fans and collectors.",
                "category_id" => 1,
                "is_active" => true,
                "is_approved" => false,

            ],
           

        ];

        foreach ($products as $product) {
            \App\Models\Product::create([
                'user_id' => $product['user_id'],
                'name' => $product['name'],
                'image' => $product['image'],
                'stock' => $product['stock'],
                'price' => $product['price'],
                'description' => $product['description'],
                'category_id' => $product['category_id'],
                'is_active' => $product['is_active'],
                'is_approved' => $product['is_approved'],
                
                // 'slug' => $product['slug'],
                // 'description' => $product['description'],
                // 'price' => $product['price'],
            ]);
        }
    }
}
