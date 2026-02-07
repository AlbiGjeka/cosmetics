import { Link } from '@inertiajs/react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { SiTiktok } from '@icons-pack/react-simple-icons';
import { useTranslate } from '@/context/LanguageContext';

export default function Footer() {
    const { t } = useTranslate();

    return (
        <footer className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {t('footer', 'brand')}
                        </h3>
                        <p className="mt-4 text-sm text-gray-600">
                            {t('footer', 'about_text')}
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-400 transition hover:text-pink-600"
                            >
                                <span className="sr-only">Facebook</span>
                                <FaFacebook className="h-6 w-6" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 transition hover:text-pink-600"
                            >
                                <span className="sr-only">Instagram</span>
                                <FaInstagram className="h-6 w-6" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 transition hover:text-pink-600"
                            >
                                <span className="sr-only">TikTok</span>
                                <SiTiktok className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {t('footer', 'quick_links')}
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm text-gray-600 transition hover:text-pink-600"
                                >
                                    {t('footer', 'home')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#featured"
                                    className="text-sm text-gray-600 transition hover:text-pink-600"
                                >
                                    {t('footer', 'featured')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#categories"
                                    className="text-sm text-gray-600 transition hover:text-pink-600"
                                >
                                    {t('footer', 'categories')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {t('footer', 'categories')}
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link
                                    href="/category/skincare"
                                    className="text-sm text-gray-600 transition hover:text-pink-600"
                                >
                                    {t('footer', 'skincare')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/category/makeup"
                                    className="text-sm text-gray-600 transition hover:text-pink-600"
                                >
                                    {t('footer', 'makeup')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/category/haircare"
                                    className="text-sm text-gray-600 transition hover:text-pink-600"
                                >
                                    {t('footer', 'haircare')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {t('footer', 'contact')}
                        </h3>
                        <address className="mt-4 text-sm text-gray-600 not-italic">
                            <p>Tirana, Albania</p>
                            <p className="mt-2">
                                <a
                                    href="mailto:info@glowbeauty.com"
                                    className="transition hover:text-pink-600"
                                >
                                    info@glowbeauty.com
                                </a>
                            </p>
                        </address>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {t('footer', 'newsletter_title')}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">
                                {t('footer', 'newsletter_text')}
                            </p>
                        </div>
                        <form className="mt-4 sm:mt-0 sm:ml-8">
                            <div className="flex rounded-md shadow-sm">
                                <input
                                    type="email"
                                    placeholder={t(
                                        'footer',
                                        'email_placeholder',
                                    )}
                                    className="block w-full min-w-0 flex-1 rounded-l-md border-gray-300 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-r-md border border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    {t('footer', 'subscribe')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        <Link
                            href="/privacy"
                            className="text-sm text-gray-600 transition hover:text-pink-600"
                        >
                            {t('footer', 'privacy')}
                        </Link>
                        <Link
                            href="/terms"
                            className="text-sm text-gray-600 transition hover:text-pink-600"
                        >
                            {t('footer', 'terms')}
                        </Link>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 md:order-1 md:mt-0">
                        &copy; {new Date().getFullYear()} GlowBeauty. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
