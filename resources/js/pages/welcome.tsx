import { Head, Link, usePage } from '@inertiajs/react';
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

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-1 font-medium">
                                Welcome to Our Store
                            </h1>
                            <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                                Browse our products by category.
                            </p>

                            {/* Categories and Products */}
                            <div className="mt-6 space-y-8">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="space-y-4"
                                    >
                                        <h2 className="text-lg font-semibold">
                                            {category.name}
                                        </h2>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {category.products.map(
                                                (product) => (
                                                    <div
                                                        key={product.id}
                                                        className="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700"
                                                    >
                                                        <img
                                                            src={
                                                                product.image_url
                                                            }
                                                            alt={product.name}
                                                            className="mb-2 h-32 w-full rounded object-cover"
                                                        />
                                                        <h3 className="font-medium">
                                                            {product.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {
                                                                product.description
                                                            }
                                                        </p>
                                                        <p className="mt-1 font-bold">
                                                            ${product.price}
                                                        </p>
                                                        <Link
                                                            href={
                                                                product.affiliate_link
                                                            }
                                                            target="_blank"
                                                            className="mt-2 inline-block rounded bg-blue-500 px-3 py-1 text-center text-xs text-white hover:bg-blue-600"
                                                        >
                                                            View Product
                                                        </Link>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side SVG */}
                        <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#fff2f2] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#1D0002]">
                            <svg
                                className="w-full max-w-none translate-y-0 text-[#F53003] opacity-100 transition-all duration-750 dark:text-[#F61500] starting:translate-y-6 starting:opacity-0"
                                viewBox="0 0 438 104"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Your existing SVG paths */}
                            </svg>
                            <svg
                                className="relative -mt-[4.9rem] -ml-8 w-[448px] max-w-none lg:-mt-[6.6rem] lg:ml-0 dark:hidden"
                                viewBox="0 0 440 376"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Your existing SVG paths */}
                            </svg>
                            <svg
                                className="relative -mt-[4.9rem] -ml-8 hidden w-[448px] max-w-none lg:-mt-[6.6rem] lg:ml-0 dark:block"
                                viewBox="0 0 440 376"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Your existing SVG paths */}
                            </svg>
                            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
