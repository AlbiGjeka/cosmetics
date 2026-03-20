import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { dashboard, login, register } from '@/routes';
import LanguageSelect from './LanguageSelect';
import { useTranslate } from '@/context/LanguageContext';

interface Auth {
    user: {
        id?: number;
        name?: string;
        email?: string;
    } | null;
}

interface HeaderProps {
    auth: Auth;
}

const GOLD   = '#C9A84C';
const BORDER = '#E0D8CC';
const OFFWHITE = '#F8F6F2';
const MUTED  = '#7A7268';
const DARK   = '#0A0A0A';

export default function Header({ auth }: HeaderProps) {
    const [open, setOpen] = useState(false);
    const { t } = useTranslate();

    const navLink = {
        fontSize: '9px',
        letterSpacing: '3px',
        textTransform: 'uppercase' as const,
        color: MUTED,
        textDecoration: 'none',
        transition: 'color .2s',
        fontFamily: "'Montserrat', sans-serif",
    };

    return (
        <header style={{ background: OFFWHITE, borderBottom: `0.5px solid ${BORDER}`, position: 'sticky', top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <span className="font-display" style={{ fontSize: '20px', fontWeight: 300, letterSpacing: '6px', textTransform: 'uppercase', color: DARK }}>
                        Enxhi <span style={{ color: GOLD }}>B</span>eauty
                    </span>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-7">
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

                {/* Mobile toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: DARK, fontSize: '20px', padding: '4px' }}
                    aria-label="Toggle menu"
                >
                    {open ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile menu */}
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
                                <Link href={login().url} style={{ ...navLink, display: 'block' }}>
                                    {t('header', 'login')}
                                </Link>
                                <Link href={register().url} className="btn-luxury btn-luxury-dark" style={{ textAlign: 'center' }}>
                                    {t('header', 'register')}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
