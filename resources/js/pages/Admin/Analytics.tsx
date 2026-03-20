import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface TopProduct {
    id: number;
    name: string;
    price: number;
    image_urls: string[];
    clicks_count: number;
}

interface TrafficSource {
    utm_source: string;
    total: number;
}

interface ClicksByDay {
    date: string;
    total: number;
}

interface Props {
    totalClicks: number;
    clicksToday: number;
    clicksThisWeek: number;
    topProducts: TopProduct[];
    trafficSources: TrafficSource[];
    clicksByDay: ClicksByDay[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Analytics', href: '/dashboard/analytics' },
];

const GOLD     = '#C9A84C';
const DARK     = '#0A0A0A';
const BORDER   = '#E0D8CC';
const MUTED    = '#7A7268';
const OFFWHITE = '#F8F6F2';

/* Platform accent colors — kept as inline bg for badges */
const SOURCE_BG: Record<string, string> = {
    tiktok:    '#0A0A0A',
    instagram: '#8B5CF6',
    facebook:  '#2563EB',
    twitter:   '#0EA5E9',
    youtube:   '#DC2626',
    google:    '#16A34A',
    direct:    '#6B7280',
};

const shortDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()}`;
};

/* ── Stat card ──────────────────────────────────────────────── */
function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div style={{ background: 'white', border: `0.5px solid ${BORDER}`, padding: '24px 28px' }}>
            <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, marginBottom: '10px', fontFamily: "'Montserrat', sans-serif" }}>
                {label}
            </p>
            <p className="font-display" style={{ fontSize: '36px', fontWeight: 300, color: DARK, lineHeight: 1 }}>
                {value.toLocaleString()}
            </p>
        </div>
    );
}

/* ── Panel ──────────────────────────────────────────────────── */
function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <section style={{ background: 'white', border: `0.5px solid ${BORDER}`, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: `0.5px solid ${BORDER}` }}>
                <p className="font-display" style={{ fontSize: '20px', fontWeight: 300, color: DARK }}>
                    {title}
                </p>
                {subtitle && (
                    <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, marginTop: '2px', fontFamily: "'Montserrat', sans-serif" }}>
                        {subtitle}
                    </p>
                )}
            </div>
            <div style={{ padding: '24px' }}>{children}</div>
        </section>
    );
}

/* ── Empty state ────────────────────────────────────────────── */
function EmptyState({ text, hint }: { text: string; hint?: string }) {
    return (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '40px', height: '40px', border: `0.5px solid ${BORDER}`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: GOLD, fontSize: '18px' }}>·</span>
            </div>
            <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED }}>{text}</p>
            {hint && (
                <div style={{ marginTop: '16px', border: `0.5px dashed ${BORDER}`, padding: '16px', maxWidth: '360px', margin: '16px auto 0', textAlign: 'left' }}>
                    <p style={{ fontSize: '10px', color: MUTED, marginBottom: '8px', fontFamily: "'Montserrat', sans-serif" }}>
                        Add to your TikTok bio link to start tracking:
                    </p>
                    <code style={{ fontSize: '10px', fontFamily: 'monospace', color: GOLD, display: 'block', wordBreak: 'break-all' }}>
                        {hint}
                    </code>
                </div>
            )}
        </div>
    );
}

/* ── Main ───────────────────────────────────────────────────── */
export default function Analytics({
    totalClicks,
    clicksToday,
    clicksThisWeek,
    topProducts,
    trafficSources,
    clicksByDay,
}: Props) {
    const maxDayClicks    = Math.max(...clicksByDay.map((d) => d.total), 1);
    const maxProductClicks = Math.max(...topProducts.map((p) => p.clicks_count), 1);
    const maxSource       = Math.max(...trafficSources.map((s) => s.total), 1);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />

            <div style={{ background: OFFWHITE, minHeight: '100%', padding: '32px', fontFamily: "'Montserrat', sans-serif" }}>

                {/* ── Page header ──────────────────────────────── */}
                <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: `0.5px solid ${BORDER}` }}>
                    <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>
                        Admin · Live data
                    </p>
                    <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 300, color: DARK }}>
                        Affiliate Analytics
                    </h1>
                    <p style={{ fontSize: '11px', color: MUTED, marginTop: '6px', letterSpacing: '1px' }}>
                        Track every click, source and product performance in real time.
                    </p>
                </div>

                {/* ── Stat row ─────────────────────────────────── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: BORDER, marginBottom: '32px' }}>
                    <StatCard label="Total clicks"  value={totalClicks}     />
                    <StatCard label="Today"          value={clicksToday}     />
                    <StatCard label="This week"      value={clicksThisWeek}  />
                </div>

                {/* ── 30-day chart ─────────────────────────────── */}
                <div style={{ marginBottom: '24px' }}>
                    <Panel title="Clicks — Last 30 Days" subtitle="Daily affiliate link clicks">
                        {clicksByDay.length === 0 ? (
                            <EmptyState text="No click data yet" />
                        ) : (
                            <div style={{ position: 'relative', paddingTop: '8px' }}>
                                {/* Guide lines */}
                                <div style={{ pointerEvents: 'none', position: 'absolute', inset: '0 0 24px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} style={{ borderTop: `0.5px solid ${BORDER}` }} />
                                    ))}
                                </div>

                                {/* Bars */}
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '160px' }}>
                                    {clicksByDay.map((day) => {
                                        const pct = (day.total / maxDayClicks) * 100;
                                        return (
                                            <div
                                                key={day.date}
                                                title={`${shortDate(day.date)}: ${day.total}`}
                                                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default' }}
                                            >
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        background: GOLD,
                                                        height: `${Math.max(pct, 2)}%`,
                                                        transition: 'opacity .2s',
                                                        opacity: 0.85,
                                                    }}
                                                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                                                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* X-axis labels */}
                                <div style={{ display: 'flex', gap: '3px', marginTop: '6px' }}>
                                    {clicksByDay.map((day, i) => (
                                        <div key={day.date} style={{ flex: 1, textAlign: 'center' }}>
                                            {i % 7 === 0 && (
                                                <span style={{ fontSize: '9px', color: MUTED }}>
                                                    {shortDate(day.date)}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Panel>
                </div>

                {/* ── Bottom two panels ────────────────────────── */}
                <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '24px' }}>

                    {/* Top Products */}
                    <Panel title="Top Products" subtitle="Ranked by affiliate clicks">
                        {topProducts.length === 0 ? (
                            <EmptyState text="No clicks yet" />
                        ) : (
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px', listStyle: 'none', padding: 0, margin: 0 }}>
                                {topProducts.map((product, i) => {
                                    const pct = (product.clicks_count / maxProductClicks) * 100;
                                    const rank = ['01', '02', '03'][i] ?? `0${i + 1}`;
                                    return (
                                        <li key={product.id}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                                {/* Rank */}
                                                <span className="font-display" style={{ fontSize: '18px', fontWeight: 300, color: i === 0 ? GOLD : MUTED, minWidth: '28px', flexShrink: 0 }}>
                                                    {rank}
                                                </span>

                                                {/* Thumbnail */}
                                                <div style={{ width: '36px', height: '36px', flexShrink: 0, overflow: 'hidden', border: `0.5px solid ${BORDER}` }}>
                                                    <img
                                                        src={product.image_urls?.length > 0 ? `/storage/${product.image_urls[0]}` : '/placeholder.png'}
                                                        alt={product.name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>

                                                {/* Name + clicks */}
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                                        <Link
                                                            href={`/product/${product.id}`}
                                                            style={{ fontSize: '11px', fontWeight: 500, color: DARK, textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = GOLD)}
                                                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = DARK)}
                                                        >
                                                            {product.name}
                                                        </Link>
                                                        <span style={{ fontSize: '9px', letterSpacing: '1px', color: GOLD, flexShrink: 0, fontFamily: "'Montserrat', sans-serif" }}>
                                                            {product.clicks_count}
                                                        </span>
                                                    </div>
                                                    {/* Progress bar */}
                                                    <div style={{ marginTop: '6px', height: '1px', background: BORDER, overflow: 'hidden' }}>
                                                        <div style={{ height: '100%', background: GOLD, width: `${pct}%`, transition: 'width .7s' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </Panel>

                    {/* Traffic Sources */}
                    <Panel title="Traffic Sources" subtitle="Where your visitors come from">
                        {trafficSources.length === 0 ? (
                            <EmptyState
                                text="No UTM source data yet"
                                hint="?utm_source=tiktok&utm_medium=bio"
                            />
                        ) : (
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', padding: 0, margin: 0 }}>
                                {trafficSources.map((source) => {
                                    const key  = source.utm_source.toLowerCase();
                                    const pct  = (source.total / maxSource) * 100;
                                    const bg   = SOURCE_BG[key] ?? '#9CA3AF';
                                    return (
                                        <li key={source.utm_source} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            {/* Badge */}
                                            <span style={{ padding: '3px 10px', background: bg, color: 'white', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', flexShrink: 0, fontFamily: "'Montserrat', sans-serif" }}>
                                                {source.utm_source}
                                            </span>
                                            {/* Bar */}
                                            <div style={{ flex: 1, height: '1px', background: BORDER, overflow: 'hidden' }}>
                                                <div style={{ height: '100%', background: GOLD, width: `${Math.max(pct, 3)}%`, transition: 'width .7s' }} />
                                            </div>
                                            {/* Count */}
                                            <span className="font-display" style={{ fontSize: '18px', fontWeight: 300, color: DARK, minWidth: '32px', textAlign: 'right' }}>
                                                {source.total}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </Panel>
                </div>

                {/* ── Footer action ────────────────────────────── */}
                <div style={{ background: 'white', border: `0.5px solid ${BORDER}`, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                        <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, marginBottom: '4px' }}>
                            Your public store
                        </p>
                        <p className="font-display" style={{ fontSize: '16px', fontWeight: 300, color: DARK }}>
                            Share this link in your TikTok bio
                        </p>
                    </div>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-luxury btn-luxury-dark"
                    >
                        Open store →
                    </a>
                </div>

            </div>
        </AppLayout>
    );
}
