<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    //

    protected $fillable = [
        'name',
        'image',
        'description',
        'stock',
        'price',  
        'category_id',
        'is_active',
    ];

  
    protected static function booted(){
        static::creating(function ($product) {
            if (auth()->check() && is_null($product->user_id)) {
                $product->user_id = auth()->id(); 
            }
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
