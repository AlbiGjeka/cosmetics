import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { SharedData } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslate } from '@/context/LanguageContext';
import CompareProductsModal from '@/components/CompareProductsModal';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_urls: string[];
    affiliate_link: string;
    is_featured: boolean;
}

interface Category {
    id: number;
    name: string;
    products: Product[];
}

const GOLD     = '#C9A84C';
const OFFWHITE = '#F8F6F2';
const DARK     = '#0A0A0A';
const BORDER   = '#E0D8CC';
const MUTED    = '#7A7268';

/* ── Product Card ───────────────────────────────────────────── */
function ProductCard({
    product,
    categoryName,
    buyNowLabel,
    viewLabel,
}: {
    product: Product;
    categoryName: string;
    buyNowLabel: string;
    viewLabel: string;
}) {
    const imgUrl =
        product.image_urls?.length > 0
            ? `/storage/${product.image_urls[0]}`
            : '/placeholder.png';

    return (
        <div className="luxury-card">
            {/* Image */}
            <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: OFFWHITE, position: 'relative' }}>
                <Link href={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                    <img
                        src={imgUrl}
                        alt={product.name}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    />
                </Link>
                {product.is_featured && (
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: GOLD, padding: '3px 10px' }}>
                        <span style={{ fontSize: '7px', letterSpacing: '2px', textTransform: 'uppercase', color: 'white', fontFamily: "'Montserrat', sans-serif" }}>
                            Editor's Choice
                        </span>
                    </div>
                )}
                {/* Hover overlay — vertical buttons */}
                <div className="card-overlay" style={{ flexDirection: 'column', gap: '8px' }}>
                    <Link
                        href={`/product/${product.id}`}
                        style={{
                            padding: '10px 28px',
                            border: '0.5px solid white',
                            color: 'white',
                            fontSize: '8px',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            fontFamily: "'Montserrat', sans-serif",
                            background: 'transparent',
                            transition: 'background .2s',
                            textAlign: 'center',
                        }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                    >
                        {viewLabel}
                    </Link>
                    <a
                        href={`/go/${product.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '10px 28px',
                            border: '0.5px solid white',
                            color: DARK,
                            fontSize: '8px',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            fontFamily: "'Montserrat', sans-serif",
                            background: 'white',
                            transition: 'background .2s, color .2s',
                            textAlign: 'center',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.color = DARK; }}
                    >
                        {buyNowLabel}
                    </a>
                </div>
            </div>

            {/* Info */}
            <div style={{ padding: '14px 16px', borderTop: `0.5px solid ${BORDER}` }}>
                <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, marginBottom: '4px', fontFamily: "'Montserrat', sans-serif" }}>
                    {categoryName}
                </p>
                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <p className="font-display" style={{ fontSize: '16px', fontWeight: 300, color: DARK, lineHeight: 1.3, marginBottom: '8px' }}>
                        {product.name}
                    </p>
                </Link>
                <p style={{ fontSize: '13px', fontWeight: 500, color: DARK, fontFamily: "'Montserrat', sans-serif" }}>
                    ${product.price}
                </p>
            </div>
        </div>
    );
}

/* ── Featured Strip ─────────────────────────────────────────── */
function FeaturedStrip({ product, categoryName }: { product: Product; categoryName: string }) {
    const imgUrl =
        product.image_urls?.length > 0
            ? `/storage/${product.image_urls[0]}`
            : '/placeholder.png';

    return (
        <section style={{ borderTop: `0.5px solid ${BORDER}`, borderBottom: `0.5px solid ${BORDER}`, padding: '48px 32px', background: 'white', fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
                <div style={{ width: '120px', height: '155px', flexShrink: 0, overflow: 'hidden', border: `0.5px solid ${BORDER}`, background: OFFWHITE }}>
                    <img src={imgUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <p style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '8px' }}>
                        Editor's pick of the week
                    </p>
                    <h2 className="font-display" style={{ fontSize: '28px', fontWeight: 300, lineHeight: 1.2, marginBottom: '10px', color: DARK }}>
                        {categoryName} · {product.name}
                    </h2>
                    <p style={{ fontSize: '11px', color: MUTED, lineHeight: 1.8, marginBottom: '20px' }}>
                        {product.description?.slice(0, 130)}{product.description?.length > 130 ? '…' : ''}
                    </p>
                    <Link
                        href={`/product/${product.id}`}
                        style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: DARK, textDecoration: 'none', borderBottom: `0.5px solid ${GOLD}`, paddingBottom: '2px' }}
                    >
                        View product →
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ── Main Page ──────────────────────────────────────────────── */
export default function Welcome({
    canRegister = true,
    categories,
}: {
    canRegister?: boolean;
    categories: Category[];
}) {
    const { auth } = usePage<SharedData>().props;
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
    const { t } = useTranslate();
    const [compareOpen, setCompareOpen] = useState(false);

    const allProducts = categories.flatMap((c) => c.products);
    const featuredProduct = allProducts[0] ?? null;
    const featuredCategory = featuredProduct
        ? categories.find((c) => c.products.some((p) => p.id === featuredProduct.id))
        : null;

    const marqueeItems = [
        'Free shipping on orders over $50',
        'Luxury beauty · honest prices',
        "Editor's picks updated weekly",
        'Skincare & makeup essentials',
    ];

    const buyNowLabel = t('welcome', 'buy_now') as string;
    const viewLabel   = t('welcome', 'view') as string || 'View';

    return (
        <>
            <Head title={`Enxhi Beauty | ${t('welcome', 'hero_title')}`} />

            <div style={{ background: OFFWHITE, color: DARK, fontFamily: "'Montserrat', sans-serif", minHeight: '100vh' }}>
                <Header auth={auth} />

                {/* ── HERO ──────────────────────────────────────── */}
                <section style={{ padding: 'clamp(48px, 8vw, 96px) 32px clamp(40px, 6vw, 72px)', textAlign: 'center', borderBottom: `0.5px solid ${BORDER}` }}>
                    <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: GOLD, marginBottom: '20px', fontFamily: "'Montserrat', sans-serif" }}>
                        Curated beauty edits
                    </p>

                    <h1 className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 300, lineHeight: 1.15, color: DARK, marginBottom: '16px' }}>
                        {t('welcome', 'hero_title')}
                    </h1>

                    <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, marginBottom: '36px', fontFamily: "'Montserrat', sans-serif" }}>
                        {t('welcome', 'hero_text')}
                    </p>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="#products" className="btn-luxury btn-luxury-dark">
                            {t('welcome', 'shop_now')}
                        </a>
                        <button
                            onClick={() => setCompareOpen(true)}
                            className="btn-luxury btn-luxury-ghost"
                        >
                            {t('welcome', 'compare_products')}
                        </button>
                    </div>

                    {/* TikTok divider */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '52px' }}>
                        <span style={{ width: '40px', height: '0.5px', background: GOLD, display: 'inline-block' }} />
                        <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, fontFamily: "'Montserrat', sans-serif" }}>
                            As seen on TikTok
                        </p>
                        <span style={{ width: '40px', height: '0.5px', background: GOLD, display: 'inline-block' }} />
                    </div>
                </section>

                {/* ── MARQUEE ───────────────────────────────────── */}
                <div style={{ borderBottom: `0.5px solid ${BORDER}`, padding: '12px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <div className="animate-marquee">
                        {[...marqueeItems, ...marqueeItems].map((item, i) => (
                            <span
                                key={i}
                                style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: MUTED, padding: '0 32px', fontFamily: "'Montserrat', sans-serif" }}
                            >
                                {item}
                                <span style={{ color: GOLD, margin: '0 12px' }}>·</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── CATEGORY FILTER ───────────────────────────── */}
                <div style={{ borderBottom: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '20px 32px', flexWrap: 'wrap' }}>
                    <button
                        className={`luxury-filter-tab${activeCategory === 'all' ? ' active' : ''}`}
                        onClick={() => setActiveCategory('all')}
                    >
                        {t('welcome', 'all_products')}
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`luxury-filter-tab${activeCategory === cat.id ? ' active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* ── PRODUCT GRID ──────────────────────────────── */}
                <section id="products" style={{ padding: '40px 32px 64px' }}>
                    <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: MUTED, marginBottom: '32px', textAlign: 'center', fontFamily: "'Montserrat', sans-serif" }}>
                        The Edit
                    </p>

                    {categories
                        .filter((c) => activeCategory === 'all' || c.id === activeCategory)
                        .map((category) => (
                            <div key={category.id} style={{ marginBottom: '52px' }}>
                                {activeCategory === 'all' && (
                                    <p style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: MUTED, marginBottom: '20px', fontFamily: "'Montserrat', sans-serif" }}>
                                        {category.name}
                                    </p>
                                )}
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                                        gap: '24px',
                                    }}
                                >
                                    {category.products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            categoryName={category.name}
                                            buyNowLabel={buyNowLabel}
                                            viewLabel={viewLabel}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                </section>

                {/* ── FEATURED STRIP ────────────────────────────── */}
                {featuredProduct && (
                    <FeaturedStrip
                        product={featuredProduct}
                        categoryName={featuredCategory?.name ?? 'Beauty'}
                    />
                )}

                <CompareProductsModal
                    open={compareOpen}
                    onClose={() => setCompareOpen(false)}
                    products={allProducts}
                />

                <Footer />
            </div>
        </>
    );
}
