import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_urls: string[];
    affiliate_link: string;
    discount?: number;
}

interface Props {
    wishlistItems: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'My Wishlist', href: '/wishlist' },
];

export default function WishlistIndex({ wishlistItems }: Props) {
    const handleRemove = (productId: number) => {
        router.delete(`/wishlist/${productId}`, { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Wishlist" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        My Wishlist
                    </h1>
                    <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-700">
                        {wishlistItems.length}{' '}
                        {wishlistItems.length === 1 ? 'item' : 'items'}
                    </span>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-20 text-center dark:border-gray-700">
                        {/* Empty heart */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mb-4 h-16 w-16 text-pink-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                        </svg>
                        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                            Your wishlist is empty
                        </p>
                        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                            Browse products and click "Add to Wishlist" to save them here.
                        </p>
                        <Link
                            href="/"
                            className="mt-6 rounded-full bg-pink-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-pink-700"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {wishlistItems.map((product) => {
                            const imgUrl =
                                product.image_urls && product.image_urls.length > 0
                                    ? `/storage/${product.image_urls[0]}`
                                    : '/placeholder.png';

                            const finalPrice = (
                                product.price -
                                (product.price * (product.discount || 0)) / 100
                            ).toFixed(2);

                            return (
                                <div
                                    key={product.id}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                >
                                    {/* Image */}
                                    <Link href={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-gray-50">
                                        <img
                                            src={imgUrl}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </Link>

                                    {/* Discount badge */}
                                    {product.discount && (
                                        <span className="absolute left-3 top-3 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                                            -{product.discount}%
                                        </span>
                                    )}

                                    {/* Info */}
                                    <div className="flex flex-1 flex-col p-4">
                                        <Link
                                            href={`/product/${product.id}`}
                                            className="line-clamp-2 text-sm font-semibold text-gray-900 transition hover:text-pink-600 dark:text-white"
                                        >
                                            {product.name}
                                        </Link>

                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-base font-bold text-gray-900 dark:text-white">
                                                ${finalPrice}
                                            </span>
                                            {product.discount && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    ${product.price}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            <a
                                                href={product.affiliate_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 rounded-full bg-pink-600 px-3 py-2 text-center text-xs font-medium text-white transition hover:bg-pink-700"
                                            >
                                                Buy Now
                                            </a>
                                            <button
                                                onClick={() => handleRemove(product.id)}
                                                title="Remove from wishlist"
                                                className="rounded-full border border-gray-200 p-2 text-gray-400 transition hover:border-red-300 hover:text-red-500 dark:border-gray-600"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    className="h-4 w-4"
                                                >
                                                    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
