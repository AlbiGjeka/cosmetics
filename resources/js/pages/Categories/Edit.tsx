import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useTranslate } from '@/context/LanguageContext';

interface Category {
    id: number;
    name: string;
}

interface CategoryEditProps {
    category: Category;
}

const GOLD   = '#C9A84C';
const DARK   = '#0A0A0A';
const BORDER = '#E0D8CC';
const MUTED  = '#7A7268';
const OFFWHITE = '#F8F6F2';

export default function CategoryEdit({ category }: CategoryEditProps) {
    const { t } = useTranslate();

    const { data, setData, put, errors } = useForm<{ name: string }>({
        name: category.name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/dashboard/categories/${category.id}`);
    };

    return (
        <AppLayout>
            <Head title={t('category_edit', 'title')} />

            <div style={{ padding: '32px', fontFamily: "'Montserrat', sans-serif" }}>

                {/* Page header */}
                <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>
                            Admin · Edit
                        </p>
                        <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 300, color: DARK }}>
                            {t('category_edit', 'title')}
                        </h1>
                    </div>
                    <Link
                        href="/dashboard/categories"
                        style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', borderBottom: `0.5px solid ${BORDER}`, paddingBottom: '2px' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED; (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
                    >
                        ← {t('category_edit', 'back')}
                    </Link>
                </div>

                {/* Form card */}
                <div style={{ maxWidth: '480px', background: 'white', border: `0.5px solid ${BORDER}` }}>
                    <div style={{ padding: '20px 24px', borderBottom: `0.5px solid ${BORDER}` }}>
                        <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED }}>
                            Category details
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, marginBottom: '8px', display: 'block' }}>
                                {t('category_edit', 'category_name')}
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder={t('category_edit', 'category_name')}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    border: `0.5px solid ${BORDER}`,
                                    background: OFFWHITE,
                                    fontSize: '13px',
                                    fontFamily: "'Montserrat', sans-serif",
                                    color: DARK,
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color .2s',
                                }}
                                onFocus={e => (e.target as HTMLElement).style.borderColor = GOLD}
                                onBlur={e => (e.target as HTMLElement).style.borderColor = BORDER}
                            />
                            {errors.name && (
                                <p style={{ marginTop: '6px', fontSize: '10px', color: '#e53e3e', letterSpacing: '1px' }}>
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div style={{ paddingTop: '8px', borderTop: `0.5px solid ${BORDER}` }}>
                            <button
                                type="submit"
                                className="btn-luxury btn-luxury-dark"
                            >
                                {t('category_edit', 'update')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
