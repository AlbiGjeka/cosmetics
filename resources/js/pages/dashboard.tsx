import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, SharedData } from '@/types';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    image_urls: string[];
    category?: { name: string };
}

interface Props {
    wishlistItems:       Product[];
    wishlistCount:       number;
    recommendedProducts: Product[];
    recentProducts:      Product[];
    memberSince:         string;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

const GOLD     = '#C9A84C';
const DARK     = '#0A0A0A';
const BORDER   = '#E0D8CC';
const MUTED    = '#7A7268';
const OFFWHITE = '#F8F6F2';

/* ── Daily tips ────────────────────────────────────────────── */
const TIPS = [
    { tip: 'Apply serum on damp skin — it absorbs up to 70% better.',         tag: 'Serum tip' },
    { tip: 'Massage moisturizer upward and outward. Always upward.',           tag: 'Technique' },
    { tip: 'SPF is non-negotiable. Even on cloudy days. Especially then.',     tag: 'Sun care' },
    { tip: 'Pat, never rub. Your barrier will thank you for it.',              tag: 'Application' },
    { tip: 'Double cleanse at night — one cleanse just moves the day around.', tag: 'Cleansing' },
    { tip: 'Let retinol absorb for 20 min before layering anything over it.',  tag: 'Retinol' },
    { tip: 'Vitamin C works best on fresh skin, first thing in the morning.',  tag: 'Vitamin C' },
    { tip: 'Your neck and décolleté are part of your face. Treat them so.',    tag: 'Routine' },
    { tip: 'Silk pillowcase. Not a luxury — a necessity.',                     tag: 'Beauty sleep' },
    { tip: 'Hyaluronic acid needs water to work. Apply to damp skin only.',    tag: 'Hydration' },
    { tip: 'Less is more with actives. Introduce one at a time, always.',      tag: 'Actives' },
    { tip: 'Patch test every new product. Even if you\'ve "used it before."',  tag: 'Safety' },
    { tip: 'Cold water rinse after cleansing closes pores and boosts glow.',   tag: 'Glow tip' },
    { tip: 'Store your Vitamin C serum away from light — it oxidises fast.',   tag: 'Storage' },
];

function getDailyTip() {
    const d = new Date();
    const seed = d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate();
    return TIPS[seed % TIPS.length];
}

/* ── Helpers ────────────────────────────────────────────────── */
function imgSrc(urls: string[]) {
    return urls?.length > 0 ? `/storage/${urls[0]}` : '/placeholder.png';
}
function finalPrice(price: number | string) {
    return Number(price).toFixed(2);
}

/* ── Stat card ──────────────────────────────────────────────── */
function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
    return (
        <div style={{ background: 'white', border: `0.5px solid ${BORDER}`, padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '44px', height: '44px', border: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: GOLD }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>
                    {label}
                </p>
                <p className="font-display" style={{ fontSize: '28px', fontWeight: 300, color: DARK, lineHeight: 1 }}>
                    {value}
                </p>
            </div>
        </div>
    );
}

/* ── Section header ─────────────────────────────────────────── */
function SectionHeader({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
    return (
        <div style={{ padding: '18px 24px', borderBottom: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: MUTED, fontFamily: "'Montserrat', sans-serif" }}>
                {title}
            </p>
            {href && linkLabel && (
                <Link href={href} style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: GOLD, textDecoration: 'none', borderBottom: `0.5px solid ${GOLD}`, paddingBottom: '1px' }}>
                    {linkLabel} →
                </Link>
            )}
        </div>
    );
}

/* ── Mini product card ──────────────────────────────────────── */
function MiniProduct({ product }: { product: Product }) {
    const price = finalPrice(product.price);
    return (
        <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
            <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: OFFWHITE, border: `0.5px solid ${BORDER}`, position: 'relative' }}>
                <img
                    src={imgSrc(product.image_urls)}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.04)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
                    loading="lazy"
                />
            </div>
            <div style={{ padding: '10px 0 0' }}>
                <p style={{ fontSize: '11px', color: DARK, fontWeight: 400, lineHeight: 1.3, marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: "'Montserrat', sans-serif" }}>
                    {product.name}
                </p>
                <p style={{ fontSize: '12px', color: GOLD, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                    ${price}
                </p>
            </div>
        </Link>
    );
}

/* ── Wishlist row item ──────────────────────────────────────── */
function WishlistRow({ product }: { product: Product }) {
    const price = finalPrice(product.price);
    return (
        <div style={{ background: 'white', display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 24px', borderBottom: `0.5px solid ${BORDER}` }}>
            <Link href={`/product/${product.id}`} style={{ flexShrink: 0 }}>
                <div style={{ width: '52px', height: '52px', overflow: 'hidden', border: `0.5px solid ${BORDER}` }}>
                    <img src={imgSrc(product.image_urls)} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
            </Link>
            <div style={{ flex: 1, minWidth: 0 }}>
                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <p style={{ fontSize: '12px', fontWeight: 500, color: DARK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '2px', fontFamily: "'Montserrat', sans-serif" }}>
                        {product.name}
                    </p>
                </Link>
                {product.category && (
                    <p style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: GOLD, marginBottom: '2px', fontFamily: "'Montserrat', sans-serif" }}>
                        {product.category.name}
                    </p>
                )}
                <p style={{ fontSize: '12px', color: MUTED, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                    ${price}
                </p>
            </div>
            <a
                href={`/go/${product.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury btn-luxury-dark"
                style={{ padding: '8px 16px', fontSize: '7px', letterSpacing: '2px', flexShrink: 0 }}
            >
                Buy
            </a>
        </div>
    );
}

/* ── Main ───────────────────────────────────────────────────── */
export default function Dashboard({ wishlistItems, wishlistCount, recommendedProducts, recentProducts, memberSince }: Props) {
    const { auth } = usePage<SharedData>().props;
    const user     = auth?.user;
    const tip      = getDailyTip();

    const initials = user?.name
        ? user.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
        : '?';

    const [tipVisible, setTipVisible] = useState(true);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div style={{ background: OFFWHITE, minHeight: '100%', fontFamily: "'Montserrat', sans-serif" }}>

                {/* ── Hero header ──────────────────────────────── */}
                <div style={{ background: DARK, padding: '40px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {/* Avatar */}
                        <div style={{ width: '56px', height: '56px', border: `0.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span className="font-display" style={{ fontSize: '22px', fontWeight: 300, color: GOLD }}>
                                {initials}
                            </span>
                        </div>
                        <div>
                            <p style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>
                                Welcome back
                            </p>
                            <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 300, color: '#F8F6F2', lineHeight: 1.1 }}>
                                {user?.name ?? 'Guest'}
                            </h1>
                        </div>
                    </div>
                    <p style={{ fontSize: '9px', letterSpacing: '2px', color: MUTED }}>
                        Member since {memberSince}
                    </p>
                </div>

                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* ── Stats ────────────────────────────────── */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: BORDER }}>
                        <StatCard label="Saved items" value={wishlistCount}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>}
                        />
                        <StatCard label="New arrivals" value={recentProducts.length}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>}
                        />
                        <StatCard label="Recommended" value={recommendedProducts.length}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>}
                        />
                    </div>

                    {/* ── Quick Actions ────────────────────────── */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1px', background: BORDER }}>
                        {[
                            { label: 'Browse store',    hint: 'Discover new products',         href: '/',         external: false },
                            { label: 'Full wishlist',   hint: 'All your saved items',           href: '/wishlist', external: false },
                            { label: 'Settings',        hint: 'Profile & preferences',          href: '/settings/profile', external: false },
                        ].map((action) => (
                            <Link
                                key={action.href}
                                href={action.href}
                                style={{ background: 'white', padding: '24px', textDecoration: 'none', display: 'block', transition: 'background .2s' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = OFFWHITE; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
                            >
                                <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>
                                    {action.label}
                                </p>
                                <p style={{ fontSize: '11px', color: MUTED, letterSpacing: '0.5px' }}>
                                    {action.hint}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* ── Daily Beauty Tip ─────────────────────── */}
                    {tipVisible && (
                        <div style={{ background: DARK, padding: '28px 32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', position: 'relative' }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '12px' }}>
                                    Beauty tip of the day · {tip.tag}
                                </p>
                                <p className="font-display" style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 300, color: '#F8F6F2', lineHeight: 1.4 }}>
                                    "{tip.tip}"
                                </p>
                            </div>
                            <button
                                onClick={() => setTipVisible(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED, fontSize: '18px', lineHeight: 1, flexShrink: 0, paddingTop: '2px' }}
                                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                                onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                            >×</button>
                        </div>
                    )}

                    {/* ── Two-column layout: Wishlist + Side panels ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: '24px' }} className="block lg:grid">

                        {/* Left: Wishlist */}
                        <div style={{ background: 'white', border: `0.5px solid ${BORDER}` }}>
                            <SectionHeader title="My Wishlist" href="/wishlist" linkLabel="View all" />

                            {wishlistItems.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke={BORDER} width="40" height="40" style={{ margin: '0 auto 14px', display: 'block' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    <p style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, marginBottom: '16px' }}>Nothing saved yet</p>
                                    <Link href="/" className="btn-luxury btn-luxury-dark" style={{ padding: '10px 24px', fontSize: '8px' }}>
                                        Browse products
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    {wishlistItems.map(p => <WishlistRow key={p.id} product={p} />)}
                                </>
                            )}
                        </div>

                        {/* Right: Recommended + New Arrivals */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                            {/* Recommended */}
                            <div style={{ background: 'white', border: `0.5px solid ${BORDER}` }}>
                                <SectionHeader title="Recommended for you" />
                                <div style={{ padding: '20px' }}>
                                    {recommendedProducts.length === 0 ? (
                                        <p style={{ fontSize: '10px', color: MUTED, textAlign: 'center', padding: '24px 0', letterSpacing: '1px' }}>
                                            Save items to get recommendations.
                                        </p>
                                    ) : (
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                            {recommendedProducts.map(p => <MiniProduct key={p.id} product={p} />)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* New Arrivals */}
                            <div style={{ background: 'white', border: `0.5px solid ${BORDER}` }}>
                                <SectionHeader title="New arrivals" href="/" linkLabel="Shop all" />
                                <div style={{ padding: '20px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        {recentProducts.map(p => <MiniProduct key={p.id} product={p} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
