import { Head, router, usePage } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import { useTranslate } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import type { SharedData } from '@/types';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_urls: string[];
    affiliate_link: string;
    discount?: number;
    rating?: number;
    reviewCount?: number;
}

interface Props {
    product: Product;
    isWishlisted: boolean;
}

const GOLD   = '#C9A84C';
const DARK   = '#0A0A0A';
const BORDER = '#E0D8CC';
const MUTED  = '#7A7268';
const OFFWHITE = '#F8F6F2';

export default function ProductShow({ product, isWishlisted: initialWishlisted }: Props) {
    const { t } = useTranslate();
    const { auth } = usePage<SharedData>().props;

    const images =
        product.image_urls && product.image_urls.length > 0
            ? product.image_urls
            : ['/placeholder.png'];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [wishlisted, setWishlisted] = useState(initialWishlisted);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 15000);
        return () => clearInterval(interval);
    }, [images.length]);

    const handleWishlistToggle = () => {
        if (!auth?.user) { router.visit('/login'); return; }
        setLoading(true);
        if (wishlisted) {
            router.delete(`/wishlist/${product.id}`, {
                preserveScroll: true,
                onSuccess: () => setWishlisted(false),
                onFinish: () => setLoading(false),
            });
        } else {
            router.post(`/wishlist/${product.id}`, {}, {
                preserveScroll: true,
                onSuccess: () => setWishlisted(true),
                onFinish: () => setLoading(false),
            });
        }
    };

    const finalPrice = (product.price - (product.price * (product.discount || 0)) / 100).toFixed(2);

    return (
        <PublicLayout>
            <Head title={product.name} />

            <div style={{ background: OFFWHITE, minHeight: '100vh', fontFamily: "'Montserrat', sans-serif" }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 32px' }}>

                    {/* Breadcrumb */}
                    <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, marginBottom: '40px' }}>
                        <a href="/" style={{ color: MUTED, textDecoration: 'none' }}>Store</a>
                        <span style={{ margin: '0 8px', color: BORDER }}>·</span>
                        <span style={{ color: GOLD }}>{product.name}</span>
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}
                         className="block lg:grid">

                        {/* ── IMAGE GALLERY ─────────────────────────── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                            {/* Main image */}
                            <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', border: `0.5px solid ${BORDER}`, background: 'white' }}>
                                <img
                                    src={images[currentIndex].startsWith('/') ? images[currentIndex] : `/storage/${images[currentIndex]}`}
                                    alt={`${product.name} ${currentIndex + 1}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .4s' }}
                                />

                                {product.discount && (
                                    <span style={{ position: 'absolute', top: '16px', left: '16px', padding: '4px 12px', background: DARK, color: '#fff', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                        -{product.discount}%
                                    </span>
                                )}

                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
                                            style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: `0.5px solid ${BORDER}`, width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >‹</button>
                                        <button
                                            onClick={() => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
                                            style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: `0.5px solid ${BORDER}`, width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >›</button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                                    {images.slice(0, 4).map((url, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentIndex(i)}
                                            style={{
                                                aspectRatio: '1/1',
                                                overflow: 'hidden',
                                                border: `0.5px solid ${currentIndex === i ? GOLD : BORDER}`,
                                                background: 'white',
                                                cursor: 'pointer',
                                                padding: 0,
                                                transition: 'border-color .2s',
                                            }}
                                        >
                                            <img
                                                src={url.startsWith('/') ? url : `/storage/${url}`}
                                                alt={`${product.name} ${i + 1}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                loading="lazy"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ── PRODUCT INFO ──────────────────────────── */}
                        <div style={{ paddingTop: '8px' }}>

                            {/* Category label */}
                            <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '12px' }}>
                                Beauty
                            </p>

                            {/* Title */}
                            <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, lineHeight: 1.2, color: DARK, marginBottom: '20px' }}>
                                {product.name}
                            </h1>

                            {/* Stars */}
                            {(product.rating !== undefined) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill={i < Math.floor(product.rating || 0) ? GOLD : BORDER}>
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                            </svg>
                                        ))}
                                    </div>
                                    <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED }}>
                                        {t('product', 'reviews').replace('{count}', String(product.reviewCount || 0))}
                                    </span>
                                </div>
                            )}

                            {/* Divider */}
                            <div style={{ height: '0.5px', background: BORDER, marginBottom: '24px' }} />

                            {/* Price */}
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '32px' }}>
                                <span className="font-display" style={{ fontSize: '32px', fontWeight: 300, color: DARK }}>
                                    ${finalPrice}
                                </span>
                                {product.discount && (
                                    <>
                                        <span style={{ fontSize: '16px', color: MUTED, textDecoration: 'line-through' }}>
                                            ${product.price}
                                        </span>
                                        <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: GOLD }}>
                                            Save {product.discount}%
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                                <a
                                    href={`/go/${product.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-luxury btn-luxury-dark"
                                    style={{ textAlign: 'center', display: 'block' }}
                                >
                                    {t('product', 'buy_now')}
                                </a>

                                <button
                                    onClick={handleWishlistToggle}
                                    disabled={loading}
                                    className="btn-luxury"
                                    style={{
                                        border: `1px solid ${wishlisted ? GOLD : BORDER}`,
                                        color: wishlisted ? GOLD : MUTED,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        width: '100%',
                                        opacity: loading ? 0.6 : 1,
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill={wishlisted ? 'currentColor' : 'none'}
                                        stroke="currentColor" strokeWidth={1.5}
                                        width="14" height="14">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    {wishlisted
                                        ? (t('product', 'remove_from_wishlist') as string || 'Remove from Wishlist')
                                        : (t('product', 'add_to_wishlist') as string)}
                                </button>
                            </div>

                            {/* Divider */}
                            <div style={{ height: '0.5px', background: BORDER, marginBottom: '32px' }} />

                            {/* Details */}
                            <div>
                                <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: MUTED, marginBottom: '16px' }}>
                                    {t('product', 'product_details')}
                                </p>
                                <p className="font-display" style={{ fontSize: '16px', fontWeight: 300, color: MUTED, lineHeight: 1.8 }}>
                                    {product.description}
                                </p>
                                <ul style={{ marginTop: '16px', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {(t('product', 'features') as unknown as string[]).map((feature, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '11px', color: MUTED, letterSpacing: '1px' }}>
                                            <span style={{ color: GOLD, marginTop: '2px' }}>·</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
