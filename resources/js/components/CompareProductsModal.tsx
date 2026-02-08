import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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

export default function CompareProductsModal({
    open,
    onClose,
    products,
}: CompareProductsModalProps) {
    const { t } = useTranslate();
    const [leftId, setLeftId] = useState<number | ''>('');
    const [rightId, setRightId] = useState<number | ''>('');

    const leftProduct = products.find((p) => p.id === leftId);
    const rightProduct = products.find((p) => p.id === rightId);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="mx-auto max-w-4xl sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{t('compare', 'title')}</DialogTitle>
                </DialogHeader>

                {/* Selectors */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                    <select
                        value={leftId}
                        onChange={(e) => setLeftId(Number(e.target.value))}
                        className="cursor-pointer rounded border p-2"
                    >
                        <option value="">
                            {t('compare', 'select_product')}
                        </option>
                        {products.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={rightId}
                        onChange={(e) => setRightId(Number(e.target.value))}
                        className="cursor-pointer rounded border p-2"
                    >
                        <option value="">
                            {t('compare', 'select_product')}
                        </option>
                        {products.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Comparison */}
                <div className="grid grid-cols-2 gap-6">
                    <CompareCard product={leftProduct} t={t} />
                    <CompareCard product={rightProduct} t={t} />
                </div>

                <div className="mt-6 flex justify-end">
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={onClose}
                    >
                        {t('compare', 'close')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function CompareCard({
    product,
    t,
}: {
    product?: Product;
    t: (group: string, key: string) => string;
}) {
    if (!product) {
        return (
            <div className="rounded-lg border p-4 text-center text-gray-400">
                {t('compare', 'select_product')}
            </div>
        );
    }

    return (
        <div className="space-y-2 rounded-lg border p-4">
            {product.image_url && (
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-32 w-full object-contain"
                />
            )}
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold text-pink-600">${product.price}</p>
        </div>
    );
}
