import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useTranslate } from '@/context/LanguageContext';

interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    image_urls: (File | string)[];
    affiliate_link: string;
    _method?: 'put';
}

interface ProductFormProps {
    product?: Product;
    categories: Array<{ id: number; name: string }>;
}

const GOLD     = '#C9A84C';
const DARK     = '#0A0A0A';
const BORDER   = '#E0D8CC';
const MUTED    = '#7A7268';
const OFFWHITE = '#F8F6F2';

const fieldLabel: React.CSSProperties = {
    fontSize: '9px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: MUTED,
    marginBottom: '8px',
    display: 'block',
    fontFamily: "'Montserrat', sans-serif",
};

const fieldInput: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: `0.5px solid ${BORDER}`,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: `0.5px solid ${BORDER}`,
    background: 'white',
    fontSize: '13px',
    fontFamily: "'Montserrat', sans-serif",
    color: DARK,
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color .2s',
};

export default function ProductForm({ product, categories }: ProductFormProps) {
    const { t } = useTranslate();
    const isEdit = !!product;

    const { data, setData, post, processing, errors } = useForm<Product>({
        name:           product?.name || '',
        description:    product?.description || '',
        price:          product?.price || 0,
        category_id:    product?.category_id || 0,
        image_urls:     product?.image_urls || [],
        affiliate_link: product?.affiliate_link || '',
    });

    const images = data.image_urls;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const getImageSrc = (img: File | string) =>
        typeof img === 'string' ? `/storage/${img}` : URL.createObjectURL(img);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setData('image_urls', [...images, ...Array.from(e.target.files)]);
        e.target.value = '';
    };

    const removeImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index);
        setData('image_urls', updated);
        if (currentImageIndex >= updated.length) {
            setCurrentImageIndex(Math.max(0, updated.length - 1));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            setData('_method', 'put');
            post(`/dashboard/products/${product!.id}`, { forceFormData: true });
        } else {
            post('/dashboard/products', { forceFormData: true });
        }
    };

    return (
        <AppLayout>
            <Head title={isEdit ? t('product_form', 'edit_title') : t('product_form', 'create_title')} />

            <div style={{ padding: '32px', fontFamily: "'Montserrat', sans-serif" }}>

                {/* Page header */}
                <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '6px' }}>
                            Admin · {isEdit ? 'Edit' : 'Create'}
                        </p>
                        <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 300, color: DARK }}>
                            {isEdit ? t('product_form', 'edit_title') : t('product_form', 'create_title')}
                        </h1>
                    </div>
                    <Link
                        href="/dashboard/products"
                        style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', borderBottom: `0.5px solid ${BORDER}`, paddingBottom: '2px' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GOLD; (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = MUTED; (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
                    >
                        ← {t('product_form', 'back')}
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '900px' }}
                         className="block lg:grid">

                        {/* ── Left column ───────────────────────── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                            {/* Name */}
                            <div style={{ background: 'white', border: `0.5px solid ${BORDER}`, padding: '20px 24px' }}>
                                <label style={fieldLabel}>{t('product_form', 'name')}</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    style={fieldInput}
                                    onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                    onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                />
                                {errors.name && <p style={{ marginTop: '6px', fontSize: '10px', color: '#e53e3e', letterSpacing: '1px' }}>{errors.name}</p>}
                            </div>

                            {/* Description */}
                            <div style={{ background: 'white', border: `0.5px solid ${BORDER}`, padding: '20px 24px' }}>
                                <label style={fieldLabel}>{t('product_form', 'description')}</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={4}
                                    style={{ ...fieldInput, resize: 'vertical' }}
                                    onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                    onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                />
                                {errors.description && <p style={{ marginTop: '6px', fontSize: '10px', color: '#e53e3e', letterSpacing: '1px' }}>{errors.description}</p>}
                            </div>

                            {/* Price + Category */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: BORDER }}>
                                <div style={{ background: 'white', padding: '20px 24px' }}>
                                    <label style={fieldLabel}>{t('product_form', 'price')}</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={e => setData('price', Number(e.target.value))}
                                        style={fieldInput}
                                        onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                        onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                    />
                                    {errors.price && <p style={{ marginTop: '6px', fontSize: '10px', color: '#e53e3e', letterSpacing: '1px' }}>{errors.price}</p>}
                                </div>

                                <div style={{ background: 'white', padding: '20px 24px' }}>
                                    <label style={fieldLabel}>{t('product_form', 'category')}</label>
                                    <select
                                        value={data.category_id}
                                        onChange={e => setData('category_id', Number(e.target.value))}
                                        style={{ ...fieldInput, cursor: 'pointer' }}
                                        onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                        onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                    >
                                        <option value="">{t('product_form', 'select_category')}</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p style={{ marginTop: '6px', fontSize: '10px', color: '#e53e3e', letterSpacing: '1px' }}>{errors.category_id}</p>}
                                </div>
                            </div>

                            {/* Affiliate link */}
                            <div style={{ background: 'white', border: `0.5px solid ${BORDER}`, padding: '20px 24px' }}>
                                <label style={fieldLabel}>{t('product_form', 'affiliate_link')}</label>
                                <input
                                    type="text"
                                    value={data.affiliate_link}
                                    onChange={e => setData('affiliate_link', e.target.value)}
                                    style={fieldInput}
                                    onFocus={e => (e.target as HTMLElement).style.borderBottomColor = GOLD}
                                    onBlur={e => (e.target as HTMLElement).style.borderBottomColor = BORDER}
                                />
                            </div>
                        </div>

                        {/* ── Right column — Images ──────────────── */}
                        <div style={{ background: 'white', border: `0.5px solid ${BORDER}` }}>
                            <div style={{ padding: '20px 24px', borderBottom: `0.5px solid ${BORDER}` }}>
                                <p style={fieldLabel}>{t('product_form', 'images')}</p>
                            </div>

                            <div style={{ padding: '20px 24px' }}>
                                {images.length > 0 ? (
                                    <>
                                        {/* Main preview */}
                                        <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', border: `0.5px solid ${BORDER}`, background: OFFWHITE, marginBottom: '12px' }}>
                                            <img
                                                src={getImageSrc(images[currentImageIndex])}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                alt="preview"
                                            />
                                            {images.length > 1 && (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => setCurrentImageIndex(i => i === 0 ? images.length - 1 : i - 1)}
                                                        style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: `0.5px solid ${BORDER}`, width: '32px', height: '32px', cursor: 'pointer', fontSize: '18px' }}
                                                    >‹</button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setCurrentImageIndex(i => i === images.length - 1 ? 0 : i + 1)}
                                                        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: `0.5px solid ${BORDER}`, width: '32px', height: '32px', cursor: 'pointer', fontSize: '18px' }}
                                                    >›</button>
                                                </>
                                            )}
                                        </div>

                                        {/* Thumbnails strip */}
                                        {images.length > 1 && (
                                            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                                {images.map((img, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => setCurrentImageIndex(i)}
                                                        style={{ width: '48px', height: '48px', overflow: 'hidden', border: `0.5px solid ${i === currentImageIndex ? GOLD : BORDER}`, cursor: 'pointer', padding: 0, background: OFFWHITE, flexShrink: 0 }}
                                                    >
                                                        <img src={getImageSrc(img)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`thumb ${i + 1}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Counter + remove */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                            <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED }}>
                                                {t('product_form', 'image')} {currentImageIndex + 1} {t('product_form', 'of')} {images.length}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(currentImageIndex)}
                                                style={{ padding: '5px 14px', border: '0.5px solid #e53e3e', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#e53e3e', background: 'none', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", transition: 'all .2s' }}
                                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e53e3e'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#e53e3e'; }}
                                            >
                                                {t('product_form', 'remove_image')}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ aspectRatio: '1/1', border: `0.5px dashed ${BORDER}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: OFFWHITE, marginBottom: '16px' }}>
                                        <span style={{ fontSize: '28px', color: BORDER, marginBottom: '8px' }}>+</span>
                                        <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED }}>No images yet</p>
                                    </div>
                                )}

                                {/* Upload input */}
                                <label style={{ display: 'block', padding: '10px', border: `0.5px solid ${BORDER}`, textAlign: 'center', cursor: 'pointer', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, transition: 'all .2s' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.color = GOLD; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = MUTED; }}
                                >
                                    + Add images
                                    <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: `0.5px solid ${BORDER}` }}>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-luxury btn-luxury-dark"
                            style={{ opacity: processing ? 0.6 : 1 }}
                        >
                            {isEdit ? t('product_form', 'update') : t('product_form', 'create')}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
