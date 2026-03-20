import { useEffect, useRef, useState } from 'react';
import { useTranslate } from '@/context/LanguageContext';

const LANGUAGES = [
    { code: 'en', label: 'EN' },
    { code: 'sq', label: 'SQ' },
];

const GOLD   = '#C9A84C';
const BORDER = '#E0D8CC';
const MUTED  = '#7A7268';
const DARK   = '#0A0A0A';

export default function LanguageSelect() {
    const { lang, setLang } = useTranslate();
    const [open, setOpen]   = useState(false);
    const ref               = useRef<HTMLDivElement>(null);

    const current = LANGUAGES.find((l) => l.code === lang);

    const selectLanguage = (code: string) => {
        setLang(code as 'en' | 'sq');
        setOpen(false);
    };

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    border: `0.5px solid ${open ? GOLD : BORDER}`,
                    background: 'transparent',
                    cursor: 'pointer',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '9px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: open ? GOLD : MUTED,
                    transition: 'all .2s',
                }}
                onMouseEnter={e => {
                    if (!open) {
                        (e.currentTarget as HTMLElement).style.borderColor = GOLD;
                        (e.currentTarget as HTMLElement).style.color = GOLD;
                    }
                }}
                onMouseLeave={e => {
                    if (!open) {
                        (e.currentTarget as HTMLElement).style.borderColor = BORDER;
                        (e.currentTarget as HTMLElement).style.color = MUTED;
                    }
                }}
            >
                {current?.label}
                <span style={{ fontSize: '7px', opacity: 0.7, transition: 'transform .2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ▼
                </span>
            </button>

            {open && (
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 4px)',
                    background: 'white',
                    border: `0.5px solid ${BORDER}`,
                    minWidth: '100%',
                    zIndex: 50,
                }}>
                    {LANGUAGES.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => selectLanguage(l.code)}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px 14px',
                                textAlign: 'left',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '9px',
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                                color: l.code === lang ? GOLD : DARK,
                                borderLeft: `2px solid ${l.code === lang ? GOLD : 'transparent'}`,
                                transition: 'all .15s',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.color = GOLD;
                                (e.currentTarget as HTMLElement).style.borderLeftColor = GOLD;
                                (e.currentTarget as HTMLElement).style.background = '#F8F6F2';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.color = l.code === lang ? GOLD : DARK;
                                (e.currentTarget as HTMLElement).style.borderLeftColor = l.code === lang ? GOLD : 'transparent';
                                (e.currentTarget as HTMLElement).style.background = 'none';
                            }}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
