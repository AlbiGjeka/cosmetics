import { useTranslate } from '@/context/LanguageContext';

export default function Footer() {
    const { t } = useTranslate();
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-pink-100 bg-gradient-to-b from-white to-pink-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-2">
                        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <circle cx="16" cy="16" r="16" fill="#fce7f3" />
                            <ellipse cx="16" cy="9"  rx="3" ry="5.5" fill="#ec4899" />
                            <ellipse cx="16" cy="23" rx="3" ry="5.5" fill="#ec4899" />
                            <ellipse cx="9"  cy="16" rx="5.5" ry="3" fill="#f9a8d4" />
                            <ellipse cx="23" cy="16" rx="5.5" ry="3" fill="#f9a8d4" />
                            <ellipse cx="10.9" cy="10.9" rx="3" ry="5.5" transform="rotate(-45 10.9 10.9)" fill="#ec4899" opacity="0.7" />
                            <ellipse cx="21.1" cy="21.1" rx="3" ry="5.5" transform="rotate(-45 21.1 21.1)" fill="#ec4899" opacity="0.7" />
                            <ellipse cx="21.1" cy="10.9" rx="3" ry="5.5" transform="rotate(45 21.1 10.9)" fill="#f9a8d4" opacity="0.7" />
                            <ellipse cx="10.9" cy="21.1" rx="3" ry="5.5" transform="rotate(45 10.9 21.1)" fill="#f9a8d4" opacity="0.7" />
                            <circle cx="16" cy="16" r="4" fill="#be185d" />
                            <circle cx="16" cy="16" r="2" fill="#fce7f3" />
                        </svg>
                        <span className="text-2xl font-bold tracking-tight">
                            <span className="text-pink-600">Enxhi</span>
                            <span className="text-gray-800"> Beauty</span>
                        </span>
                    </div>

                    {/* Tagline */}
                    <p className="mt-3 max-w-sm text-sm text-gray-500">
                        {t('footer', 'about_text')}
                    </p>

                    {/* Social icons */}
                    <div className="mt-6 flex items-center gap-5">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition hover:bg-pink-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.9v-2.89h2.538V9.796c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                            </svg>
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition hover:bg-pink-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                        <a
                            href="#"
                            aria-label="TikTok"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition hover:bg-pink-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Divider + copyright */}
                <div className="mt-10 border-t border-pink-100 pt-6 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {year} Enxhi Beauty. {t('footer', 'rights_reserved')}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        {t('footer', 'affiliate_disclaimer')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
