import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Appearance settings', href: editAppearance().url },
];

const BORDER = '#E0D8CC';
const MUTED  = '#7A7268';

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div style={{ background: 'white', border: `0.5px solid ${BORDER}` }}>
                    <div style={{ padding: '20px 24px', borderBottom: `0.5px solid ${BORDER}` }}>
                        <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED }}>
                            Appearance
                        </p>
                        <p style={{ fontSize: '11px', color: MUTED, marginTop: '4px', fontFamily: "'Montserrat', sans-serif" }}>
                            Update your account's appearance settings.
                        </p>
                    </div>
                    <div style={{ padding: '24px' }}>
                        <AppearanceTabs />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
