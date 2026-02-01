import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
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

    const visibleCategories =
        activeCategory === 'all'
            ? categories
            : categories.filter((c) => c.id === activeCategory);

    return (
        <>
            <Head title="Beauty Store" />

            <div className="min-h-screen bg-[#fdf7f8] px-6 py-8 text-gray-900">
                {/* NAVBAR */}
                <nav className="mx-auto mb-10 flex max-w-7xl items-center justify-between">
                    <h1 className="text-xl font-semibold tracking-wide">
                        GlowBeauty
                    </h1>

                    <div className="flex gap-4 text-sm">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-full bg-pink-600 px-4 py-1.5 text-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={login()}>Login</Link>
                                {canRegister && (
                                    <Link href={register()}>Register</Link>
                                )}
                            </>
                        )}
                    </div>
                </nav>

                {/* HERO */}
                <section className="mx-auto max-w-7xl">
                    <h2 className="max-w-xl text-3xl leading-tight font-semibold">
                        Discover Beauty That Fits You
                    </h2>
                    <p className="mt-3 max-w-md text-sm text-gray-600">
                        Premium skincare & cosmetics curated from trusted
                        brands.
                    </p>

                    {/* CATEGORY FILTER */}
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`rounded-full px-4 py-1.5 text-sm transition ${
                                activeCategory === 'all'
                                    ? 'bg-pink-600 text-white'
                                    : 'bg-pink-100 text-pink-700'
                            }`}
                        >
                            All
                        </button>

                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`rounded-full px-4 py-1.5 text-sm transition ${
                                    activeCategory === category.id
                                        ? 'bg-pink-600 text-white'
                                        : 'bg-pink-100 text-pink-700'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* FEATURED CAROUSEL */}
                <section className="mx-auto mt-14 max-w-7xl">
                    <h3 className="mb-4 text-xl font-semibold">
                        Featured Products
                    </h3>

                    <div className="relative">
                        {/* Left Arrow */}
                        <button
                            onClick={() =>
                                scrollRef.current?.scrollBy({
                                    left: -240,
                                    behavior: 'smooth',
                                })
                            }
                            className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100"
                        >
                            &#8592;
                        </button>

                        {/* Scrollable Carousel */}
                        <div
                            ref={scrollRef}
                            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
                        >
                            {featuredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="min-w-[220px] snap-start rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
                                >
                                    <div className="h-40 w-full overflow-hidden rounded-xl">
                                        <img
                                            src={
                                                product.image_url
                                                    ? `/storage/${product.image_url}`
                                                    : '/placeholder.png'
                                            }
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <h4 className="mt-2 text-sm font-medium">
                                        {product.name}
                                    </h4>
                                    <p className="text-sm font-semibold text-pink-600">
                                        ${product.price}
                                    </p>
                                    <a
                                        href={product.affiliate_link}
                                        target="_blank"
                                        className="mt-2 block rounded-full bg-pink-600 py-1.5 text-center text-xs text-white hover:bg-pink-700"
                                    >
                                        Shop Now
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() =>
                                scrollRef.current?.scrollBy({
                                    left: 240,
                                    behavior: 'smooth',
                                })
                            }
                            className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100"
                        >
                            &#8594;
                        </button>
                    </div>
                </section>

                {/* ALL PRODUCTS */}
                <section className="mx-auto mt-16 max-w-7xl">
                    {visibleCategories.map((category) => (
                        <div key={category.id} className="mb-14">
                            <h3 className="mb-6 text-xl font-semibold">
                                {category.name}
                            </h3>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {category.products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-lg"
                                    >
                                        <Link href={`/product/${product.id}`}>
                                            <div className="overflow-hidden rounded-xl">
                                                <img
                                                    src={
                                                        product.image_url
                                                            ? `/storage/${product.image_url}`
                                                            : '/placeholder.png'
                                                    }
                                                    alt={product.name}
                                                    className="..."
                                                />
                                            </div>
                                        </Link>

                                        <h4 className="mt-3 text-sm font-medium">
                                            {product.name}
                                        </h4>

                                        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                                            {product.description}
                                        </p>

                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-sm font-semibold text-pink-600">
                                                ${product.price}
                                            </span>

                                            <a
                                                href={product.affiliate_link}
                                                target="_blank"
                                                className="rounded-full bg-pink-600 px-4 py-1.5 text-xs text-white hover:bg-pink-700"
                                            >
                                                Buy
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
}
