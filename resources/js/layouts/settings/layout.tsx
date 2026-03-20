import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';
import type { NavItem } from '@/types';

const GOLD     = '#C9A84C';
const BORDER   = '#E0D8CC';
const MUTED    = '#7A7268';
const DARK     = '#0A0A0A';

const sidebarNavItems: NavItem[] = [
    { title: 'Profile',         href: edit(),           icon: null },
    { title: 'Password',        href: editPassword(),   icon: null },
    { title: 'Two-Factor Auth', href: show(),           icon: null },
    { title: 'Appearance',      href: editAppearance(), icon: null },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentUrl } = useCurrentUrl();

    if (typeof window === 'undefined') return null;

    return (
        <div style={{ padding: '32px', fontFamily: "'Montserrat', sans-serif" }}>

            {/* Page header */}
            <div style={{ marginBottom: '40px', paddingBottom: '24px', borderBottom: `0.5px solid ${BORDER}` }}>
                <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>
                    Account
                </p>
                <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 300, color: DARK }}>
                    Settings
                </h1>
                <p style={{ fontSize: '11px', color: MUTED, marginTop: '6px', letterSpacing: '1px' }}>
                    Manage your profile and account settings
                </p>
            </div>

            <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

                {/* Sidebar nav */}
                <aside style={{ width: '160px', flexShrink: 0 }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', borderLeft: `0.5px solid ${BORDER}` }}>
                        {sidebarNavItems.map((item, index) => {
                            const active = isCurrentUrl(item.href);
                            return (
                                <Link
                                    key={`${toUrl(item.href)}-${index}`}
                                    href={item.href}
                                    style={{
                                        display: 'block',
                                        padding: '10px 16px',
                                        fontSize: '9px',
                                        letterSpacing: '3px',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        color: active ? GOLD : MUTED,
                                        borderLeft: `2px solid ${active ? GOLD : 'transparent'}`,
                                        marginLeft: '-0.5px',
                                        transition: 'all .2s',
                                        fontFamily: "'Montserrat', sans-serif",
                                    }}
                                    onMouseEnter={e => {
                                        if (!active) {
                                            (e.currentTarget as HTMLElement).style.color = GOLD;
                                            (e.currentTarget as HTMLElement).style.borderLeftColor = GOLD;
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!active) {
                                            (e.currentTarget as HTMLElement).style.color = MUTED;
                                            (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
                                        }
                                    }}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0, maxWidth: '560px' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
