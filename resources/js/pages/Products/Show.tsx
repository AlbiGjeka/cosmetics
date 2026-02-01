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
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <div className="grid grid-cols-4 gap-6">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="group relative h-24 overflow-hidden rounded-lg bg-white hover:opacity-75"
                                    >
                                        <img
                                            src={
                                                product.image_url
                                                    ? `/storage/${product.image_url}`
                                                    : '/placeholder.png'
                                            }
                                            alt={product.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="aspect-w-1 aspect-h-1 w-full">
                            <img
                                src={
                                    product.image_url
                                        ? `/storage/${product.image_url}`
                                        : '/placeholder.png'
                                }
                                alt={product.name}
                                className="h-full w-full object-cover object-center sm:rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                                {product.name}
                            </h1>
                            <div className="ml-4 border-l border-gray-300 pl-4">
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="ml-2 text-sm text-gray-500">
                                        {product.reviewCount || 0} reviews
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <div className="flex items-center">
                                <p className="text-2xl text-gray-900">
                                    $
                                    {(
                                        product.price -
                                        (product.price *
                                            (product.discount || 0)) /
                                            100
                                    ).toFixed(2)}{' '}
                                    –
                                    <span className="ml-1 text-gray-500 line-through">
                                        ${product.price}
                                    </span>
                                </p>
                                {product.discount && (
                                    <div className="ml-4 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                        -{product.discount}%
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="sm:flex-col1 mt-10 flex">
                                <button
                                    type="button"
                                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-none sm:w-full"
                                >
                                    Add to bag
                                </button>
                                <button
                                    type="button"
                                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                >
                                    <svg
                                        className="h-6 w-6 flex-shrink-0"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <section
                            aria-labelledby="details-heading"
                            className="mt-12"
                        >
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>
                            <div className="divide-y divide-gray-200 border-t">
                                <div className="py-6">
                                    <p className="text-sm text-gray-600">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
