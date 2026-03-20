import { ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { SharedData } from '@/types';
import { useLuxuryTheme } from '@/hooks/use-luxury-theme';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { auth } = usePage<SharedData>().props;
    const { OFFWHITE, DARK } = useLuxuryTheme();

    return (
        <>
            <Head title="Enxhi Beauty | Discover Your Perfect Look" />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: OFFWHITE, color: DARK }}>
                <Header auth={auth} />
                <main style={{ flex: 1 }}>{children}</main>
                <Footer />
            </div>
        </>
    );
}
