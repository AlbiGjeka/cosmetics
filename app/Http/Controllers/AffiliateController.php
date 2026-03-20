<?php

namespace App\Http\Controllers;

use App\Models\AffiliateClick;
use App\Models\Product;
use Illuminate\Http\Request;

class AffiliateController extends Controller
{
    public function redirect(Request $request, Product $product)
    {
        AffiliateClick::create([
            'product_id'   => $product->id,
            'user_id'      => $request->user()?->id,
            'ip_address'   => $request->ip(),
            'user_agent'   => $request->userAgent(),
            'utm_source'   => $request->query('utm_source'),
            'utm_medium'   => $request->query('utm_medium'),
            'utm_campaign' => $request->query('utm_campaign'),
            'utm_content'  => $request->query('utm_content'),
            'referer'      => $request->header('Referer'),
        ]);

        return redirect()->away($product->affiliate_link);
    }
}
