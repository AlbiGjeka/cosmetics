import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

interface Product {
    id: number;
    name: string;
    price: number;
    image_urls: string[];
    affiliate_link: string;
    discount?: number;
}

interface Props {
    wishlistItems: Product[];
    wishlistCount: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ wishlistItems, wishlistCount }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Stats row */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {/* Wishlist stat card */}
                    <div className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 to-white p-5 shadow-sm dark:border-pink-900/30 dark:from-pink-950/20 dark:to-gray-800">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900/40">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="h-6 w-6 text-pink-600"
                            >
                                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Wishlist Items</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{wishlistCount}</p>
                        </div>
                    </div>

                    {/* Placeholder stat 2 */}
                    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Orders</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">—</p>
                        </div>
                    </div>

                    {/* Placeholder stat 3 */}
                    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Reviews</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">—</p>
                        </div>
                    </div>
                </div>

                {/* Wishlist section */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            My Wishlist
                        </h2>
                        <Link
                            href="/wishlist"
                            className="text-sm font-medium text-pink-600 transition hover:text-pink-700"
                        >
                            View all →
                        </Link>
                    </div>

                    {wishlistItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="mb-3 h-12 w-12 text-pink-200"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <p className="text-gray-500 dark:text-gray-400">No wishlist items yet.</p>
                            <Link
                                href="/"
                                className="mt-3 text-sm font-medium text-pink-600 hover:text-pink-700"
                            >
                                Browse products
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        className="group flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition hover:border-pink-200 hover:bg-pink-50/50 dark:border-gray-700 dark:hover:border-pink-800 dark:hover:bg-pink-950/20"
                                    >
                                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                                            <img
                                                src={imgUrl}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                {product.name}
                                            </p>
                                            <p className="mt-0.5 text-sm font-bold text-pink-600">
                                                ${finalPrice}
                                                {product.discount && (
                                                    <span className="ml-1 text-xs font-normal text-gray-400 line-through">
                                                        ${product.price}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            className="h-4 w-4 shrink-0 text-pink-400"
                                        >
                                            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
