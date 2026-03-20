import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useTranslate } from '@/context/LanguageContext';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: { id: number; name: string };
    image_url: string;
    affiliate_link: string;
}

interface Category {
    id: number;
    name: string;
}

interface ProductsIndexProps {
    products: Product[];
    categories: Category[];
    filters: { category_id?: string; search?: string };
}

const GOLD     = '#C9A84C';
const DARK     = '#0A0A0A';
const BORDER   = '#E0D8CC';
const MUTED    = '#7A7268';
const OFFWHITE = '#F8F6F2';

export default function ProductsIndex({ products, categories, filters }: ProductsIndexProps) {
    const { t } = useTranslate();

    const { data, setData } = useForm({
        category_id: filters.category_id || '',
        search: filters.search || '',
    });

    const handleDelete = (id: number) => {
        if (confirm(t('products', 'confirm_delete'))) {
            router.delete(`/dashboard/products/${id}`);
        }
    };

    const handleFilterChange = (key: 'category_id' | 'search', value: string) => {
        setData(key, value);
        router.get('/dashboard/products', { ...data, [key]: value }, { preserveState: true, replace: true });
    };

    const inputStyle = {
        padding: '8px 12px',
        fontSize: '11px',
        border: `0.5px solid ${BORDER}`,
        background: 'white',
        color: DARK,
        fontFamily: "'Montserrat', sans-serif",
        outline: 'none',
        letterSpacing: '1px',
        minWidth: '140px',
    };

    return (
        <AppLayout>
            <Head title={t('products', 'title')} />

            <div style={{ padding: '32px', fontFamily: "'Montserrat', sans-serif" }}>

                {/* Page header */}
                <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>Admin</p>
                        <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 300, color: DARK }}>
                            {t('products', 'title')}
                        </h1>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <select
                            value={data.category_id}
                            onChange={e => handleFilterChange('category_id', e.target.value)}
                            style={inputStyle}
                        >
                            <option value="">{t('products', 'all_categories')}</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            value={data.search}
                            onChange={e => handleFilterChange('search', e.target.value)}
                            placeholder={t('products', 'search')}
                            style={inputStyle}
                        />

                        <Link href="/dashboard/products/create" className="btn-luxury btn-luxury-dark">
                            {t('products', 'create')}
                        </Link>
                    </div>
                </div>

                {/* Table */}
                <div style={{ background: 'white', border: `0.5px solid ${BORDER}`, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: `0.5px solid ${BORDER}` }}>
                                {[t('products', 'name'), t('products', 'description'), t('products', 'price'), t('products', 'category'), t('products', 'actions')].map(h => (
                                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, fontWeight: 400, fontFamily: "'Montserrat', sans-serif", whiteSpace: 'nowrap' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, i) => (
                                <tr
                                    key={product.id}
                                    style={{ borderBottom: `0.5px solid ${BORDER}`, background: i % 2 === 0 ? 'white' : OFFWHITE, transition: 'background .15s' }}
                                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#f0ede8')}
                                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'white' : OFFWHITE)}
                                >
                                    <td style={{ padding: '14px 20px', fontSize: '12px', color: DARK, fontWeight: 500, maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {product.name}
                                    </td>
                                    <td style={{ padding: '14px 20px', fontSize: '11px', color: MUTED, maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {product.description}
                                    </td>
                                    <td style={{ padding: '14px 20px', fontSize: '12px', color: DARK, whiteSpace: 'nowrap', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                                        ${product.price}
                                    </td>
                                    <td style={{ padding: '14px 20px' }}>
                                        <span style={{ padding: '3px 10px', border: `0.5px solid ${BORDER}`, fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED }}>
                                            {product.category.name}
                                        </span>
                                    </td>
                                    <td style={{ padding: '14px 20px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Link
                                                href={`/dashboard/products/${product.id}/edit`}
                                                style={{ padding: '6px 16px', border: `0.5px solid ${BORDER}`, fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', transition: 'all .2s' }}
                                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.color = GOLD; }}
                                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = MUTED; }}
                                            >
                                                {t('products', 'edit')}
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                style={{ padding: '6px 16px', border: '0.5px solid #e53e3e', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#e53e3e', background: 'none', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", transition: 'all .2s' }}
                                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e53e3e'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#e53e3e'; }}
                                            >
                                                {t('products', 'delete')}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ padding: '48px', textAlign: 'center', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED }}>
                                        No products found
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
