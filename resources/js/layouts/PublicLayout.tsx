import { ReactNode } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Auth {
    user: {
        id?: number;
        name?: string;
        email?: string;
    } | null;
}

interface PublicLayoutProps {
    children: ReactNode;
    auth?: Auth; // Make auth optional if not always provided
}

export default function PublicLayout({
    children,
    auth = { user: null },
}: PublicLayoutProps) {
    return (
        <>
            <Head title="GlowBeauty | Premium Cosmetics & Skincare" />
            <div className="flex min-h-screen flex-col bg-[#fdf7f8] text-gray-900">
                {/* Header */}
                <Header auth={auth} />

                {/* Main Content */}
                <main className="mx-auto max-w-7xl flex-1 p-6">{children}</main>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
