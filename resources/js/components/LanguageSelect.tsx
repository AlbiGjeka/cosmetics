import { useState } from 'react';
import { useTranslate } from '@/context/LanguageContext';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'sq', label: 'Shqip' },
];

export default function LanguageSelect() {
    const { lang, setLang } = useTranslate();
    const [open, setOpen] = useState(false);

    const selectLanguage = (code: string) => {
        setLang(code as 'en' | 'sq');
        setOpen(false);
    };

    const current = LANGUAGES.find((l) => l.code === lang);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
                🌐 {current?.label}
                <span className="ml-1">▼</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-36 rounded-lg bg-white shadow-lg">
                    {LANGUAGES.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => selectLanguage(l.code)}
                            className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                l.code === lang
                                    ? 'font-semibold text-pink-600'
                                    : 'text-gray-700'
                            }`}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
