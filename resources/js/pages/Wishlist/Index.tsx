import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_urls: string[];
    affiliate_link: string;
    discount?: number;
}

interface Props {
    wishlistItems: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'My Wishlist', href: '/wishlist' },
];

const GOLD     = '#C9A84C';
const DARK     = '#0A0A0A';
const BORDER   = '#E0D8CC';
const MUTED    = '#7A7268';
const OFFWHITE = '#F8F6F2';

export default function WishlistIndex({ wishlistItems }: Props) {
    const handleRemove = (productId: number) => {
        router.delete(`/wishlist/${productId}`, { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Wishlist" />

            <div style={{ padding: '32px', fontFamily: "'Montserrat', sans-serif" }}>

                {/* Header */}
                <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>
                            Saved items
                        </p>
                        <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 300, color: DARK }}>
                            My Wishlist
                        </h1>
                    </div>
                    <span style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED }}>
                        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
                    </span>
                </div>

                {wishlistItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0', border: `0.5px dashed ${BORDER}` }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke={BORDER} width="64" height="64" style={{ margin: '0 auto 20px', display: 'block' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, marginBottom: '8px' }}>Your wishlist is empty</p>
                        <p style={{ fontSize: '11px', color: MUTED, marginBottom: '28px' }}>Browse products and save your favourites</p>
                        <Link href="/" className="btn-luxury btn-luxury-dark">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
                        {wishlistItems.map((product) => {
                            const imgUrl = product.image_urls?.length > 0 ? `/storage/${product.image_urls[0]}` : '/placeholder.png';
                            const finalPrice = (product.price - (product.price * (product.discount || 0)) / 100).toFixed(2);

                            return (
                                <div key={product.id} className="luxury-card">
                                    {/* Image */}
                                    <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: OFFWHITE, position: 'relative' }}>
                                        <Link href={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                                            <img src={imgUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                                        </Link>
                                        {product.discount && (
                                            <span style={{ position: 'absolute', top: '12px', left: '12px', padding: '3px 10px', background: DARK, color: 'white', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                                -{product.discount}%
                                            </span>
                                        )}
                                        {/* Remove button */}
                                        <button
                                            onClick={() => handleRemove(product.id)}
                                            title="Remove from wishlist"
                                            style={{ position: 'absolute', top: '12px', right: '12px', width: '28px', height: '28px', background: 'white', border: `0.5px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e53e3e'; (e.currentTarget as HTMLElement).style.color = '#e53e3e'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = MUTED; }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="12" height="12">
                                                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Info */}
                                    <div style={{ padding: '14px 16px', borderTop: `0.5px solid ${BORDER}` }}>
                                        <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <p className="font-display" style={{ fontSize: '15px', fontWeight: 300, color: DARK, marginBottom: '8px', lineHeight: 1.3 }}>
                                                {product.name}
                                            </p>
                                        </Link>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 500, color: DARK }}>
                                                ${finalPrice}
                                            </span>
                                            {product.discount && (
                                                <span style={{ fontSize: '11px', color: MUTED, textDecoration: 'line-through' }}>
                                                    ${product.price}
                                                </span>
                                            )}
                                        </div>
                                        <a
                                            href={`/go/${product.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-luxury btn-luxury-dark"
                                            style={{ display: 'block', textAlign: 'center', padding: '10px' }}
                                        >
                                            Buy Now
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
