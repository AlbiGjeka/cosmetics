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

export default function Header({ auth }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useTranslate();

    return (
        <header className="sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                        {/* Flower / sparkle logo mark */}
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <circle cx="16" cy="16" r="16" fill="#fce7f3" />
                            {/* Petals */}
                            <ellipse cx="16" cy="9" rx="3" ry="5.5" fill="#ec4899" />
                            <ellipse cx="16" cy="23" rx="3" ry="5.5" fill="#ec4899" />
                            <ellipse cx="9" cy="16" rx="5.5" ry="3" fill="#f9a8d4" />
                            <ellipse cx="23" cy="16" rx="5.5" ry="3" fill="#f9a8d4" />
                            <ellipse cx="10.9" cy="10.9" rx="3" ry="5.5" transform="rotate(-45 10.9 10.9)" fill="#ec4899" opacity="0.7" />
                            <ellipse cx="21.1" cy="21.1" rx="3" ry="5.5" transform="rotate(-45 21.1 21.1)" fill="#ec4899" opacity="0.7" />
                            <ellipse cx="21.1" cy="10.9" rx="3" ry="5.5" transform="rotate(45 21.1 10.9)" fill="#f9a8d4" opacity="0.7" />
                            <ellipse cx="10.9" cy="21.1" rx="3" ry="5.5" transform="rotate(45 10.9 21.1)" fill="#f9a8d4" opacity="0.7" />
                            {/* Center */}
                            <circle cx="16" cy="16" r="4" fill="#be185d" />
                            <circle cx="16" cy="16" r="2" fill="#fce7f3" />
                        </svg>
                        <span className="text-2xl font-bold tracking-tight">
                            <span className="text-pink-600">Enxhi</span>
                            <span className="text-gray-800"> Beauty</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation + Language */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {/* Language selector */}
                        <LanguageSelect />

                        {/* Desktop navigation */}
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-full bg-pink-600 px-5 py-2 text-white transition hover:bg-pink-700"
                            >
                                {t('header', 'dashboard')}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-gray-700 hover:text-pink-600"
                                >
                                    {t('header', 'login')}
                                </Link>
                                <Link
                                    href={register()}
                                    className="rounded-full bg-pink-600 px-5 py-2 text-white transition hover:bg-pink-700"
                                >
                                    {t('header', 'register')}
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="rounded-md p-2 text-gray-700 hover:text-pink-600 md:hidden"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="bg-white shadow-md md:hidden">
                    <div className="flex flex-col items-start space-y-2 px-4 py-3">
                        {/* Language selector */}
                        <LanguageSelect />

                        {/* Auth links */}
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-flex justify-center rounded-full bg-pink-600 px-5 py-2 text-white transition hover:bg-pink-700"
                            >
                                {t('header', 'dashboard')}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-flex justify-center rounded px-5 py-2 text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
                                >
                                    {t('header', 'login')}
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-flex justify-center rounded-full bg-pink-600 px-5 py-2 text-white transition hover:bg-pink-700"
                                >
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
