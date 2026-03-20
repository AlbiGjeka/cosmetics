import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

interface Product {
    id: number;
    name: string;
    price: number;
    image_urls: string[];
    affiliate_link: string;
    discount?: number;
}

interface Props {
    wishlistItems: Product[];
    wishlistCount: number;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

const GOLD   = '#C9A84C';
const DARK   = '#0A0A0A';
const BORDER = '#E0D8CC';
const MUTED  = '#7A7268';
const OFFWHITE = '#F8F6F2';

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
    return (
        <div style={{ background: 'white', border: `0.5px solid ${BORDER}`, padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '44px', height: '44px', border: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: GOLD }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>
                    {label}
                </p>
                <p className="font-display" style={{ fontSize: '28px', fontWeight: 300, color: DARK, lineHeight: 1 }}>
                    {value}
                </p>
            </div>
        </div>
    );
}

export default function Dashboard({ wishlistItems, wishlistCount }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div style={{ padding: '32px', fontFamily: "'Montserrat', sans-serif" }}>

                {/* Page title */}
                <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: `0.5px solid ${BORDER}` }}>
                    <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>
                        Welcome back
                    </p>
                    <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 300, color: DARK }}>
                        Your Dashboard
                    </h1>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: BORDER, marginBottom: '32px' }}>
                    <StatCard
                        label="Wishlist Items"
                        value={wishlistCount}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
                                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        }
                    />
                    <StatCard
                        label="Orders"
                        value="—"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" width="18" height="18">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                            </svg>
                        }
                    />
                    <StatCard
                        label="Reviews"
                        value="—"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" width="18" height="18">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        }
                    />
                </div>

                {/* Wishlist section */}
                <div style={{ background: 'white', border: `0.5px solid ${BORDER}` }}>
                    <div style={{ padding: '20px 24px', borderBottom: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: MUTED }}>
                            My Wishlist
                        </p>
                        <Link
                            href="/wishlist"
                            style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: GOLD, textDecoration: 'none', borderBottom: `0.5px solid ${GOLD}`, paddingBottom: '1px' }}
                        >
                            View all →
                        </Link>
                    </div>

                    <div style={{ padding: '24px' }}>
                        {wishlistItems.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '48px 0' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke={BORDER} width="48" height="48" style={{ margin: '0 auto 16px', display: 'block' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED }}>No wishlist items yet</p>
                                <Link
                                    href="/"
                                    style={{ display: 'inline-block', marginTop: '16px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, textDecoration: 'none', borderBottom: `0.5px solid ${GOLD}`, paddingBottom: '1px' }}
                                >
                                    Browse products
                                </Link>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1px', background: BORDER }}>
                                {wishlistItems.map((product) => {
                                    const imgUrl = product.image_urls?.length > 0 ? `/storage/${product.image_urls[0]}` : '/placeholder.png';
                                    const finalPrice = (product.price - (product.price * (product.discount || 0)) / 100).toFixed(2);
                                    return (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.id}`}
                                            style={{ background: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', transition: 'background .2s' }}
                                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = OFFWHITE)}
                                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'white')}
                                        >
                                            <div style={{ width: '56px', height: '56px', flexShrink: 0, overflow: 'hidden', border: `0.5px solid ${BORDER}` }}>
                                                <img src={imgUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ fontSize: '11px', fontWeight: 500, color: DARK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '4px' }}>
                                                    {product.name}
                                                </p>
                                                <p style={{ fontSize: '11px', color: GOLD, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                                                    ${finalPrice}
                                                    {product.discount && (
                                                        <span style={{ marginLeft: '6px', color: MUTED, textDecoration: 'line-through', fontSize: '10px' }}>
                                                            ${product.price}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
