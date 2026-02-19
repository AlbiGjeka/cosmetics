<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'image_urls',
        'affiliate_link',
        'category_id'
    ];

    protected $casts = [
        'image_urls' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function wishlistUsers()
    {
        return $this->belongsToMany(User::class, 'wishlists')->withTimestamps();
    }
}
