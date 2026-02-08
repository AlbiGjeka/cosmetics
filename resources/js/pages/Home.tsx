import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslate } from '@/context/LanguageContext';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_urls: string[];
    affiliate_link: string;
}

interface Category {
    id: number;
    name: string;
    products: Product[];
}

export default function Welcome({
    canRegister = true,
    categories,
}: {
    canRegister?: boolean;
    categories: Category[];
}) {
    const { auth } = usePage<SharedData>().props;
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
    const scrollRef = useRef<HTMLDivElement>(null);
    const featuredProducts = categories.flatMap((c) => c.products).slice(0, 6);
    const { t } = useTranslate();

    return (
        <>
            <Head title={`GlowBeauty | ${t('welcome', 'hero_title')}`} />
            <div className="flex min-h-screen flex-col bg-gradient-to-b from-pink-50 to-white">
                {/* Header */}
                <Header auth={auth} />

                {/* Main Content */}
                <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    {/* HERO SECTION */}
                    <section className="mx-auto mb-12 max-w-7xl rounded-3xl bg-gradient-to-r from-pink-100 to-purple-50 p-8 shadow-sm">
                        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    {t('welcome', 'hero_title')}
                                </h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    {t('welcome', 'hero_text')}
                                </p>
                                <div className="mt-8 flex gap-4">
                                    <Link
                                        href="#featured"
                                        className="rounded-full bg-pink-600 px-6 py-2.5 text-white shadow-sm transition hover:bg-pink-700"
                                    >
                                        {t('welcome', 'shop_now')}
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-8 lg:mt-0">
                                <img
                                    src="/storage/skincare.webp"
                                    alt="Beauty Products"
                                    className="w-full rounded-2xl shadow-xl"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </section>

                    {/* CATEGORY FILTER */}
                    <section className="mx-auto mb-12 max-w-7xl">
                        <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-4">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition ${
                                    activeCategory === 'all'
                                        ? 'bg-pink-600 text-white'
                                        : 'border border-pink-200 bg-white text-pink-600'
                                }`}
                            >
                                {t('welcome', 'all_products')}
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() =>
                                        setActiveCategory(category.id)
                                    }
                                    className={`rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition ${
                                        activeCategory === category.id
                                            ? 'bg-pink-600 text-white'
                                            : 'border border-pink-200 bg-white text-pink-600'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* FEATURED PRODUCTS CAROUSEL */}
                    <section id="featured" className="mx-auto mb-16 max-w-7xl">
                        <h3 className="mb-6 text-2xl font-bold text-gray-900">
                            {t('welcome', 'featured_picks')}
                        </h3>
                        <div className="relative">
                            <div
                                ref={scrollRef}
                                className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6"
                            >
                                {featuredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="min-w-[160px] snap-start rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-lg sm:min-w-[200px]"
                                    >
                                        <div className="h-32 w-full overflow-hidden rounded-xl bg-pink-50">
                                            <img
                                                src={
                                                    product.image_urls &&
                                                    product.image_urls.length >
                                                        0
                                                        ? `/storage/${product.image_urls[0]}`
                                                        : '/placeholder.png'
                                                }
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <h4 className="mt-3 line-clamp-1 text-sm font-medium">
                                            {product.name}
                                        </h4>
                                        <p className="text-sm font-bold text-pink-600">
                                            ${product.price}
                                        </p>
                                        <a
                                            href={product.affiliate_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 block w-full rounded-full bg-pink-600 py-2 text-center text-xs font-medium text-white transition hover:bg-pink-700"
                                        >
                                            {t('welcome', 'buy_now')}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ALL PRODUCTS GRID */}
                    <section className="mx-auto mb-20 max-w-7xl">
                        {categories
                            .filter(
                                (c) =>
                                    activeCategory === 'all' ||
                                    c.id === activeCategory,
                            )
                            .map((category) => (
                                <div key={category.id} className="mb-12">
                                    <h3 className="mb-6 text-2xl font-bold text-gray-900">
                                        {category.name}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                                        {category.products.map((product) => (
                                            <div
                                                key={product.id}
                                                className="rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-md"
                                            >
                                                <Link
                                                    href={`/product/${product.id}`}
                                                    className="block"
                                                >
                                                    <div className="aspect-square overflow-hidden rounded-xl bg-pink-50">
                                                        <img
                                                            src={
                                                                product.image_urls &&
                                                                product
                                                                    .image_urls
                                                                    .length > 0
                                                                    ? `/storage/${product.image_urls[0]}`
                                                                    : '/placeholder.png'
                                                            }
                                                            alt={product.name}
                                                            className="h-full w-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <h4 className="mt-3 line-clamp-1 text-sm font-medium">
                                                        {product.name}
                                                    </h4>
                                                    <p className="mt-1 text-sm font-bold text-pink-600">
                                                        ${product.price}
                                                    </p>
                                                </Link>
                                                <a
                                                    href={
                                                        product.affiliate_link
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-2 block w-full rounded-full bg-pink-600 py-1.5 text-center text-xs font-medium text-white transition hover:bg-pink-700"
                                                >
                                                    {t('welcome', 'buy_now')}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </section>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
