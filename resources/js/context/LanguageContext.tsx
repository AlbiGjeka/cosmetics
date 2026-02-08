import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import en from '@/translations/en.json';
import sq from '@/translations/sq.json';

type Language = 'en' | 'sq';

const TRANSLATIONS: Record<Language, any> = { en, sq };

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (group: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: 'en',
    setLang: () => {},
    t: (_group, key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    // ⬇️ Load language once (safe for browser)
    const [lang, setLangState] = useState<Language>(() => {
        if (typeof window === 'undefined') return 'en';
        return (localStorage.getItem('lang') as Language) || 'en';
    });

    // ⬇️ Persist language on change
    const setLang = (language: Language) => {
        setLangState(language);
        localStorage.setItem('lang', language);
    };

    const t = (group: string, key: string) =>
        TRANSLATIONS[lang]?.[group]?.[key] ?? key;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslate = () => useContext(LanguageContext);
