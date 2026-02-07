import { createContext, useContext, useState, ReactNode } from 'react';
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
    t: (group, key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Language>('en');

    const t = (group: string, key: string) =>
        TRANSLATIONS[lang]?.[group]?.[key] ?? key;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslate = () => useContext(LanguageContext);
