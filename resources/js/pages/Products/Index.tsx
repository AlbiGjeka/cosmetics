import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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

export default function ProductsIndex({
    products,
    categories,
    filters,
}: ProductsIndexProps) {
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

    const handleFilterChange = (
        key: 'category_id' | 'search',
        value: string,
    ) => {
        setData(key, value);
        router.get(
            '/dashboard/products',
            { ...data, [key]: value },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout>
            <Head title={t('products', 'title')} />

            <div className="p-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold">
                        {t('products', 'title')}
                    </h1>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        {/* Category Filter */}
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                handleFilterChange(
                                    'category_id',
                                    e.target.value,
                                )
                            }
                            className="rounded border border-gray-300 py-1.5"
                        >
                            <option value="">
                                {t('products', 'all_categories')}
                            </option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {/* Search */}
                        <input
                            type="text"
                            value={data.search}
                            onChange={(e) =>
                                handleFilterChange('search', e.target.value)
                            }
                            placeholder={t('products', 'search')}
                            className="rounded border border-gray-300 py-1.5 pl-3"
                        />

                        {/* Create */}
                        <Link href="/dashboard/products/create">
                            <Button>{t('products', 'create')}</Button>
                        </Link>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('products', 'name')}</TableHead>
                                <TableHead>
                                    {t('products', 'description')}
                                </TableHead>
                                <TableHead>{t('products', 'price')}</TableHead>
                                <TableHead>
                                    {t('products', 'category')}
                                </TableHead>
                                <TableHead>
                                    {t('products', 'actions')}
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>
                                        {product.category.name}
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link
                                            href={`/dashboard/products/${product.id}/edit`}
                                        >
                                            <Button variant="outline">
                                                {t('products', 'edit')}
                                            </Button>
                                        </Link>

                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                        >
                                            {t('products', 'delete')}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
