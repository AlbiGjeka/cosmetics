import { useState } from 'react';
import { useTranslate } from '@/context/LanguageContext';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url?: string;
}

interface CompareProductsModalProps {
    open: boolean;
    onClose: () => void;
    products: Product[];
}

const GOLD     = '#C9A84C';
const DARK     = '#0A0A0A';
const BORDER   = '#E0D8CC';
const MUTED    = '#7A7268';
const OFFWHITE = '#F8F6F2';

export default function CompareProductsModal({ open, onClose, products }: CompareProductsModalProps) {
    const { t } = useTranslate();
    const [leftId, setLeftId]   = useState<number | ''>('');
    const [rightId, setRightId] = useState<number | ''>('');

    const leftProduct  = products.find((p) => p.id === leftId);
    const rightProduct = products.find((p) => p.id === rightId);

    if (!open) return null;

    return (
        <div
            style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            {/* Backdrop */}
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.6)' }} />

            {/* Modal */}
            <div style={{ position: 'relative', background: OFFWHITE, border: `0.5px solid ${BORDER}`, width: '100%', maxWidth: '860px', fontFamily: "'Montserrat', sans-serif" }}>

                {/* Header */}
                <div style={{ padding: '24px 32px', borderBottom: `0.5px solid ${BORDER}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: GOLD, marginBottom: '4px' }}>
                            Store · Compare
                        </p>
                        <h2 className="font-display" style={{ fontSize: '28px', fontWeight: 300, color: DARK, lineHeight: 1 }}>
                            {t('compare', 'title')}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: `0.5px solid ${BORDER}`, width: '32px', height: '32px', cursor: 'pointer', fontSize: '16px', color: MUTED, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.color = GOLD; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = MUTED; }}
                    >
                        ×
                    </button>
                </div>

                <div style={{ padding: '32px' }}>
                    {/* Selectors */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: BORDER, marginBottom: '24px' }}>
                        {[
                            { value: leftId,  onChange: (v: number | '') => setLeftId(v) },
                            { value: rightId, onChange: (v: number | '') => setRightId(v) },
                        ].map((sel, i) => (
                            <div key={i} style={{ background: 'white', padding: '16px 20px' }}>
                                <label style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: MUTED, display: 'block', marginBottom: '8px' }}>
                                    {i === 0 ? 'Product A' : 'Product B'}
                                </label>
                                <select
                                    value={sel.value}
                                    onChange={e => sel.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                                    style={{ width: '100%', padding: '8px 12px', border: `0.5px solid ${BORDER}`, background: OFFWHITE, fontSize: '12px', fontFamily: "'Montserrat', sans-serif", color: DARK, outline: 'none', cursor: 'pointer', appearance: 'none' }}
                                    onFocus={e => (e.target as HTMLElement).style.borderColor = GOLD}
                                    onBlur={e => (e.target as HTMLElement).style.borderColor = BORDER}
                                >
                                    <option value="">{t('compare', 'select_product')}</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    {/* Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: BORDER }}>
                        <CompareCard product={leftProduct}  t={t} />
                        <CompareCard product={rightProduct} t={t} />
                    </div>
                </div>

                {/* Footer */}
                <div style={{ padding: '16px 32px', borderTop: `0.5px solid ${BORDER}`, display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        className="btn-luxury btn-luxury-ghost"
                    >
                        {t('compare', 'close')}
                    </button>
                </div>
            </div>
        </div>
    );
}

function CompareCard({ product, t }: { product?: Product; t: (g: string, k: string) => string }) {
    if (!product) {
        return (
            <div style={{ background: 'white', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '240px' }}>
                <div style={{ width: '40px', height: '40px', border: `0.5px dashed ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                    <span style={{ color: BORDER, fontSize: '20px' }}>+</span>
                </div>
                <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: MUTED }}>
                    {t('compare', 'select_product')}
                </p>
            </div>
        );
    }

    return (
        <div style={{ background: 'white', padding: '24px' }}>
            {/* Image */}
            <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#F8F6F2', border: `0.5px solid ${BORDER}`, marginBottom: '20px' }}>
                {product.image_url ? (
                    <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: BORDER, fontSize: '28px' }}>·</span>
                    </div>
                )}
            </div>

            {/* Name */}
            <h3 className="font-display" style={{ fontSize: '20px', fontWeight: 300, color: DARK, marginBottom: '6px', lineHeight: 1.2 }}>
                {product.name}
            </h3>

            {/* Price */}
            <p style={{ fontSize: '13px', letterSpacing: '2px', color: GOLD, marginBottom: '14px', fontFamily: "'Montserrat', sans-serif" }}>
                ${product.price}
            </p>

            {/* Divider */}
            <div style={{ borderTop: `0.5px solid ${BORDER}`, paddingTop: '14px' }}>
                <p style={{ fontSize: '11px', color: MUTED, lineHeight: 1.7, fontFamily: "'Montserrat', sans-serif" }}>
                    {product.description}
                </p>
            </div>
        </div>
    );
}
