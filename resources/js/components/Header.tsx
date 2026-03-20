import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { dashboard, login, register } from '@/routes';
import LanguageSelect from './LanguageSelect';
import { useTranslate } from '@/context/LanguageContext';
import { useLuxuryTheme } from '@/hooks/use-luxury-theme';
import { useAppearance } from '@/hooks/use-appearance';

interface Auth {
    user: { id?: number; name?: string; email?: string } | null;
}

function ThemeToggle() {
    const { GOLD, BORDER, MUTED, SURFACE, isDark } = useLuxuryTheme();
    const { updateAppearance } = useAppearance();

    return (
        <button
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
                width: '34px', height: '34px', borderRadius: '50%',
                border: `0.5px solid ${BORDER}`,
                background: SURFACE,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: MUTED,
                flexShrink: 0,
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = GOLD;
                (e.currentTarget as HTMLElement).style.color = GOLD;
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = BORDER;
                (e.currentTarget as HTMLElement).style.color = MUTED;
            }}
        >
            {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
            )}
        </button>
    );
}

export default function Header({ auth }: { auth: Auth }) {
    const [open, setOpen] = useState(false);
    const { t } = useTranslate();
    const { GOLD, DARK, BORDER, MUTED, OFFWHITE } = useLuxuryTheme();

    const navLink: React.CSSProperties = {
        fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
        color: MUTED, textDecoration: 'none', transition: 'color .2s',
        fontFamily: "'Montserrat', sans-serif",
    };

    return (
        <header style={{ background: OFFWHITE, borderBottom: `0.5px solid ${BORDER}`, position: 'sticky', top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

                <Link href="/" style={{ textDecoration: 'none' }}>
                    <span className="font-display" style={{ fontSize: '20px', fontWeight: 300, letterSpacing: '6px', textTransform: 'uppercase', color: DARK }}>
                        Enxhi <span style={{ color: GOLD }}>B</span>eauty
                    </span>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-5">
                    <ThemeToggle />
                    <LanguageSelect />
                    {auth.user ? (
                        <Link href={dashboard().url} style={navLink}
                            onMouseEnter={e => ((e.target as HTMLElement).style.color = GOLD)}
                            onMouseLeave={e => ((e.target as HTMLElement).style.color = MUTED)}>
                            {t('header', 'dashboard')}
                        </Link>
                    ) : (
                        <>
                            <Link href={login().url} style={navLink}
                                onMouseEnter={e => ((e.target as HTMLElement).style.color = GOLD)}
                                onMouseLeave={e => ((e.target as HTMLElement).style.color = MUTED)}>
                                {t('header', 'login')}
                            </Link>
                            <Link href={register().url} className="btn-luxury btn-luxury-dark">
                                {t('header', 'register')}
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile */}
                <div className="md:hidden flex items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={() => setOpen(!open)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: DARK, fontSize: '20px', padding: '4px' }}
                        aria-label="Toggle menu"
                    >
                        {open ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {open && (
                <div style={{ background: OFFWHITE, borderTop: `0.5px solid ${BORDER}`, padding: '20px 32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <LanguageSelect />
                        {auth.user ? (
                            <Link href={dashboard().url} className="btn-luxury btn-luxury-dark" style={{ textAlign: 'center' }}>
                                {t('header', 'dashboard')}
                            </Link>
                        ) : (
                            <>
                                <Link href={login().url} style={{ ...navLink, display: 'block' }}>{t('header', 'login')}</Link>
                                <Link href={register().url} className="btn-luxury btn-luxury-dark" style={{ textAlign: 'center' }}>{t('header', 'register')}</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
