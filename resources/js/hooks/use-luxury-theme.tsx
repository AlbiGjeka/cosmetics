import { useAppearance } from './use-appearance';

export interface LuxuryTheme {
    GOLD:     string;
    DARK:     string;
    BORDER:   string;
    MUTED:    string;
    OFFWHITE: string;
    SURFACE:  string;
    isDark:   boolean;
}

export function useLuxuryTheme(): LuxuryTheme {
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    return {
        GOLD:     '#C9A84C',
        DARK:     isDark ? '#F0EDE8' : '#0A0A0A',
        BORDER:   isDark ? '#2E2C28' : '#E0D8CC',
        MUTED:    isDark ? '#8A8278' : '#7A7268',
        OFFWHITE: isDark ? '#111009' : '#F8F6F2',
        SURFACE:  isDark ? '#1A1814' : '#ffffff',
        isDark,
    };
}
