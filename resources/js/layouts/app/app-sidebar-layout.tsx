import { usePage } from '@inertiajs/react';
import { BarChart2, LayoutGrid, Package, ShoppingBag, Tag } from 'lucide-react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { AppLayoutProps, NavItem, SharedData } from '@/types';
import { Link } from '@inertiajs/react';

function SidebarLogo() {
    return (
        <div className="flex items-center gap-3">
            {/* Gold monogram badge */}
            <div
                className="flex h-9 w-9 shrink-0 items-center justify-center"
                style={{ border: '0.5px solid #C9A84C', background: '#F8F6F2' }}
            >
                <span
                    className="font-display"
                    style={{ fontSize: '18px', fontWeight: 300, color: '#C9A84C', lineHeight: 1 }}
                >
                    E
                </span>
            </div>

            <div className="grid flex-1 text-left leading-tight">
                <span className="font-display truncate" style={{ fontSize: '14px', fontWeight: 300, letterSpacing: '4px', textTransform: 'uppercase', color: '#0A0A0A' }}>
                    Enxhi <span style={{ color: '#C9A84C' }}>B</span>eauty
                </span>
                <span className="truncate" style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#7A7268', fontFamily: "'Montserrat', sans-serif" }}>
                    Affiliate Dashboard
                </span>
            </div>
        </div>
    );
}

function SmartSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = (auth?.user as { role?: string })?.role === 'admin';

    const mainNavItems: NavItem[] = [
        { title: 'Dashboard', href: dashboard().url, icon: LayoutGrid },
        ...(isAdmin ? [
            { title: 'Products',   href: '/dashboard/products',   icon: Package },
            { title: 'Categories', href: '/dashboard/categories', icon: Tag },
            { title: 'Analytics',  href: '/dashboard/analytics',  icon: BarChart2 },
        ] : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="border-b border-sidebar-border/50 pb-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <SidebarLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="pt-2">
                <NavMain items={mainNavItems} />

                {/* Quick link to public store */}
                <div className="px-3 mt-auto pt-4">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 px-3 py-2.5 transition"
                        style={{ border: '0.5px solid #E0D8CC', background: '#F8F6F2' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E0D8CC'; }}
                    >
                        <ShoppingBag className="h-3.5 w-3.5 shrink-0" style={{ color: '#C9A84C' }} />
                        <span className="truncate" style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#7A7268', fontFamily: "'Montserrat', sans-serif" }}>
                            View public store
                        </span>
                    </a>
                </div>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border/50 pt-2">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

export default function AppSidebarLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <SmartSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
