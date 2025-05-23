<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    // Table name
    protected $table = 'stores';

    // Fillable attributes
    protected $fillable = [
        'user_id',
        'name',
        'image',
        'location',
    ];

    // This belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
