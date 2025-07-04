<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Cart extends Model
{
    /**
     * Summary of fillable
     * @var array
     */
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
    ];


    /**
     * Get the product associated with the cart item.
     */
    // public function product(): HasOne
    // {
    //     return $this->hasOne(Product::class);
    // }
    
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
