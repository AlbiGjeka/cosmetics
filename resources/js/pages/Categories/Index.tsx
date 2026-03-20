import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useTranslate } from '@/context/LanguageContext';

interface Category {
    id: number;
    name: string;
}

interface CategoriesIndexProps {
    categories: Category[];
}

const GOLD   = '#C9A84C';
const DARK   = '#0A0A0A';
const BORDER = '#E0D8CC';
const MUTED  = '#7A7268';
const OFFWHITE = '#F8F6F2';

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
    const { t } = useTranslate();

    const { data, setData, post, errors, reset } = useForm<{ name: string }>({ name: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/categories', { onSuccess: () => reset() });
    };

    const handleDelete = (id: number) => {
        if (confirm(t('categories', 'confirm_delete'))) {
            router.delete(`/dashboard/categories/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title={t('categories', 'title')} />

            <div style={{ padding: '32px', fontFamily: "'Montserrat', sans-serif" }}>

                {/* Page header */}
                <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: `0.5px solid ${BORDER}` }}>
                    <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>Admin</p>
                    <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 300, color: DARK }}>
                        {t('categories', 'title')}
                    </h1>
                </div>

                {/* Add category form */}
                <div style={{ background: 'white', border: `0.5px solid ${BORDER}`, padding: '24px', marginBottom: '24px' }}>
                    <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, marginBottom: '16px' }}>
                        Add new category
                    </p>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder={t('categories', 'category_name')}
                                style={{ width: '100%', padding: '10px 14px', border: `0.5px solid ${BORDER}`, fontSize: '12px', fontFamily: "'Montserrat', sans-serif", color: DARK, background: OFFWHITE, outline: 'none', letterSpacing: '1px', boxSizing: 'border-box' }}
                            />
                            {errors.name && (
                                <p style={{ marginTop: '6px', fontSize: '10px', color: '#e53e3e', letterSpacing: '1px' }}>{errors.name}</p>
                            )}
                        </div>
                        <button type="submit" className="btn-luxury btn-luxury-dark" style={{ marginTop: 0, padding: '10px 28px' }}>
                            {t('categories', 'add')}
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div style={{ background: 'white', border: `0.5px solid ${BORDER}`, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: `0.5px solid ${BORDER}` }}>
                                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, fontWeight: 400, fontFamily: "'Montserrat', sans-serif" }}>
                                    {t('categories', 'name')}
                                </th>
                                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, fontWeight: 400, fontFamily: "'Montserrat', sans-serif" }}>
                                    {t('categories', 'actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, i) => (
                                <tr
                                    key={category.id}
                                    style={{ borderBottom: `0.5px solid ${BORDER}`, background: i % 2 === 0 ? 'white' : OFFWHITE, transition: 'background .15s' }}
                                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#f0ede8')}
                                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'white' : OFFWHITE)}
                                >
                                    <td style={{ padding: '14px 20px', fontSize: '12px', color: DARK, fontWeight: 500 }}>
                                        {category.name}
                                    </td>
                                    <td style={{ padding: '14px 20px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Link
                                                href={`/dashboard/categories/${category.id}/edit`}
                                                style={{ padding: '6px 16px', border: `0.5px solid ${BORDER}`, fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', transition: 'all .2s' }}
                                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.color = GOLD; }}
                                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = MUTED; }}
                                            >
                                                {t('categories', 'edit')}
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                style={{ padding: '6px 16px', border: '0.5px solid #e53e3e', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#e53e3e', background: 'none', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", transition: 'all .2s' }}
                                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e53e3e'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#e53e3e'; }}
                                            >
                                                {t('categories', 'delete')}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={2} style={{ padding: '48px', textAlign: 'center', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED }}>
                                        No categories yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
