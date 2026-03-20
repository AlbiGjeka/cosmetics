<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AffiliateClick extends Model
{
    protected $fillable = [
        'product_id',
        'user_id',
        'ip_address',
        'user_agent',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'referer',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
