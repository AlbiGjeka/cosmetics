// resources/js/layouts/PublicLayout.tsx
import { ReactNode } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Head title="Beauty Store" />
            <div className="min-h-screen bg-[#fdf7f8] text-gray-900">
                <header className="border-b bg-white px-6 py-4 shadow-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between">
                        <Link href="/" className="text-xl font-semibold">
                            GlowBeauty
                        </Link>
                        <nav className="flex gap-4 text-sm">
                            <Link href="/">Home</Link>
                            <Link href="/login">Login</Link>
                        </nav>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl p-6">{children}</main>
            </div>
        </>
    );
}
