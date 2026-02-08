import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface Category {
    id: number;
    name: string;
}

interface CategoriesIndexProps {
    categories: Category[];
}

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
    const { t } = useTranslate();

    const { data, setData, post, errors, reset } = useForm<{ name: string }>({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/categories', {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id: number) => {
        if (confirm(t('categories', 'confirm_delete'))) {
            router.delete(`/dashboard/categories/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title={t('categories', 'title')} />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        {t('categories', 'title')}
                    </h1>
                </div>

                {/* Create Category */}
                <div className="mb-6 rounded-lg bg-white p-6 shadow">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={t('categories', 'category_name')}
                            className="flex-1"
                        />
                        <Button type="submit">{t('categories', 'add')}</Button>
                    </form>

                    {errors.name && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Categories Table */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('categories', 'name')}</TableHead>
                                <TableHead>
                                    {t('categories', 'actions')}
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link
                                            href={`/dashboard/categories/${category.id}/edit`}
                                        >
                                            <Button variant="outline" size="sm">
                                                {t('categories', 'edit')}
                                            </Button>
                                        </Link>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
                                        >
                                            {t('categories', 'delete')}
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
