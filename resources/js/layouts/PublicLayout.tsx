import { ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { SharedData } from '@/types';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Enxhi Beauty | Discover Your Perfect Look" />
            <div className="flex min-h-screen flex-col bg-[#fdf7f8] text-gray-900">
                <Header auth={auth} />
                <main className="mx-auto max-w-7xl flex-1 p-6">{children}</main>
                <Footer />
            </div>
        </>
    );
}
