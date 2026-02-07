import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    affiliate_link: string;
    discount?: number;
    rating?: number;
    reviewCount?: number;
}

export default function ProductShow({ product }: { product: Product }) {
    return (
        <PublicLayout>
            <Head title={product.name} />
            <div className="bg-gradient-to-b from-pink-50 to-white">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
                        {/* IMAGE GALLERY */}
                        <div className="flex flex-col-reverse gap-4">
                            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block">
                                <div className="grid grid-cols-4 gap-4">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="group relative aspect-square overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
                                        >
                                            <img
                                                src={
                                                    product.image_url
                                                        ? `/storage/${product.image_url}`
                                                        : '/placeholder.png'
                                                }
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-pink-50 shadow-lg">
                                <img
                                    src={
                                        product.image_url
                                            ? `/storage/${product.image_url}`
                                            : '/placeholder.png'
                                    }
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* PRODUCT INFO */}
                        <div className="mt-8 px-4 sm:px-0 lg:mt-0">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`h-5 w-5 ${
                                                    i <
                                                    Math.floor(
                                                        product.rating || 0,
                                                    )
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {product.reviewCount || 0} reviews
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-end gap-3">
                                    <p className="text-3xl font-bold text-gray-900">
                                        $
                                        {(
                                            product.price -
                                            (product.price *
                                                (product.discount || 0)) /
                                                100
                                        ).toFixed(2)}
                                    </p>
                                    {product.discount && (
                                        <>
                                            <p className="text-lg text-gray-400 line-through">
                                                ${product.price}
                                            </p>
                                            <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                -{product.discount}%
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-4">
                                <a
                                    href={product.affiliate_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-pink-600 px-6 py-3 text-center text-lg font-medium text-white shadow-sm transition hover:bg-pink-700"
                                >
                                    Buy Now →
                                </a>
                                <button className="rounded-full border-2 border-pink-600 px-6 py-3 text-center text-lg font-medium text-pink-600 transition hover:bg-pink-50">
                                    Add to Wishlist
                                </button>
                            </div>

                            <section className="mt-12">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Product Details
                                </h2>
                                <div className="prose mt-4 max-w-none text-gray-600">
                                    <p>{product.description}</p>
                                    <ul className="mt-4 list-disc pl-5">
                                        <li>Cruelty-free & vegan</li>
                                        <li>Dermatologist-tested</li>
                                        <li>Suitable for all skin types</li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
