import { usePage } from '@inertiajs/react';
import { LayoutGrid, Package, Tag } from 'lucide-react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
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
        <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="16" cy="9"  rx="3" ry="5.5" fill="#ec4899" />
                    <ellipse cx="16" cy="23" rx="3" ry="5.5" fill="#ec4899" />
                    <ellipse cx="9"  cy="16" rx="5.5" ry="3" fill="#f9a8d4" />
                    <ellipse cx="23" cy="16" rx="5.5" ry="3" fill="#f9a8d4" />
                    <ellipse cx="10.9" cy="10.9" rx="3" ry="5.5" transform="rotate(-45 10.9 10.9)" fill="#ec4899" opacity="0.7" />
                    <ellipse cx="21.1" cy="21.1" rx="3" ry="5.5" transform="rotate(-45 21.1 21.1)" fill="#ec4899" opacity="0.7" />
                    <ellipse cx="21.1" cy="10.9" rx="3" ry="5.5" transform="rotate(45 21.1 10.9)" fill="#f9a8d4" opacity="0.7" />
                    <ellipse cx="10.9" cy="21.1" rx="3" ry="5.5" transform="rotate(45 10.9 21.1)" fill="#f9a8d4" opacity="0.7" />
                    <circle cx="16" cy="16" r="4" fill="#be185d" />
                    <circle cx="16" cy="16" r="2" fill="#fce7f3" />
                </svg>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                    <span className="text-pink-600">Enxhi</span> Beauty
                </span>
            </div>
        </div>
    );
}

function SmartSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = (auth?.user as { role?: string })?.role === 'admin';

    const mainNavItems: NavItem[] = [
        { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
        ...(isAdmin ? [
            { title: 'Products',   href: '/dashboard/products',   icon: Package },
            { title: 'Categories', href: '/dashboard/categories', icon: Tag },
        ] : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <SidebarLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
            <SidebarFooter>
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
