import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

const GOLD     = '#C9A84C';
const DARK     = '#0A0A0A';
const BORDER   = '#E0D8CC';
const MUTED    = '#7A7268';
const OFFWHITE = '#F8F6F2';

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div style={{ minHeight: '100vh', background: OFFWHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat', sans-serif", padding: '32px 16px' }}>
            <div style={{ width: '100%', maxWidth: '420px' }}>

                {/* Logo / wordmark */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Link href={home()} style={{ textDecoration: 'none' }}>
                        <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>
                            Enxhi Beauty
                        </p>
                        <h2 className="font-display" style={{ fontSize: '28px', fontWeight: 300, color: DARK, lineHeight: 1.2 }}>
                            {title}
                        </h2>
                    </Link>
                    {description && (
                        <p style={{ marginTop: '10px', fontSize: '11px', letterSpacing: '1px', color: MUTED }}>
                            {description}
                        </p>
                    )}
                </div>

                {/* Card */}
                <div style={{ background: 'white', border: `0.5px solid ${BORDER}`, padding: '40px 36px' }}>
                    {children}
                </div>

                {/* Back to store */}
                <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED }}>
                    <Link href={home()} style={{ color: MUTED, textDecoration: 'none', borderBottom: `0.5px solid ${BORDER}`, paddingBottom: '1px' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; (e.currentTarget as HTMLElement).style.borderBottomColor = GOLD; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED; (e.currentTarget as HTMLElement).style.borderBottomColor = BORDER; }}
                    >
                        ← Back to store
                    </Link>
                </p>
            </div>
        </div>
    );
}
