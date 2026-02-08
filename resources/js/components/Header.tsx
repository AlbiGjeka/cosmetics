import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { dashboardProducts, login, register } from '@/routes';
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
                    <Link href="/" className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-pink-600">
                            {t('header', 'brand_primary')}
                            <span className="text-gray-900">
                                {t('header', 'brand_secondary')}
                            </span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation + Language */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {/* Language selector */}
                        <LanguageSelect />

                        {/* Desktop navigation */}
                        {auth.user ? (
                            <Link
                                href={dashboardProducts()}
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
                                href={dashboardProducts()}
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
