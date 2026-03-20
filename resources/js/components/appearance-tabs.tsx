import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';

const GOLD   = '#C9A84C';
const DARK   = '#0A0A0A';
const BORDER = '#E0D8CC';
const MUTED  = '#7A7268';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
);

const MonitorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
    </svg>
);

const TABS: { value: Appearance; icon: () => JSX.Element; label: string }[] = [
    { value: 'light',  icon: SunIcon,     label: 'Light'     },
    { value: 'dark',   icon: MoonIcon,    label: 'Dark'      },
    { value: 'system', icon: MonitorIcon, label: 'Automatic' },
];

export default function AppearanceTabs({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div {...props}>
            <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, marginBottom: '16px', fontFamily: "'Montserrat', sans-serif" }}>
                Theme
            </p>

            <div style={{ display: 'inline-flex', border: `0.5px solid ${BORDER}`, overflow: 'hidden' }}>
                {TABS.map(({ value, icon: Icon, label }, i) => {
                    const active = appearance === value;
                    return (
                        <button
                            key={value}
                            onClick={() => updateAppearance(value)}
                            style={{
                                display:        'flex',
                                alignItems:     'center',
                                gap:            '7px',
                                padding:        '11px 22px',
                                fontSize:       '9px',
                                letterSpacing:  '2px',
                                textTransform:  'uppercase',
                                fontFamily:     "'Montserrat', sans-serif",
                                cursor:         'pointer',
                                border:         'none',
                                borderLeft:     i > 0 ? `0.5px solid ${BORDER}` : 'none',
                                background:     active ? DARK : 'white',
                                color:          active ? '#F8F6F2' : MUTED,
                                transition:     'background 0.2s, color 0.2s',
                            }}
                            onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = '#F8F6F2'; (e.currentTarget as HTMLElement).style.color = DARK; } }}
                            onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.color = MUTED; } }}
                        >
                            <Icon />
                            {label}
                        </button>
                    );
                })}
            </div>

            <p style={{ marginTop: '16px', fontSize: '10px', color: MUTED, letterSpacing: '0.5px', fontFamily: "'Montserrat', sans-serif" }}>
                {appearance === 'light'  && 'Always use the light theme.'}
                {appearance === 'dark'   && 'Always use the dark theme.'}
                {appearance === 'system' && 'Follows your device\'s system setting automatically.'}
            </p>
        </div>
    );
}
