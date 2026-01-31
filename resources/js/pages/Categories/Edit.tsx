import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

interface Category {
    id: number;
    name: string;
}

interface CategoryEditProps {
    category: Category;
}

export default function CategoryEdit({ category }: CategoryEditProps) {
    const { data, setData, put, errors } = useForm<{ name: string }>({
        name: category.name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/dashboard/categories/${category.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Category" />
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Edit Category</h1>
                    <Link href="/dashboard/categories">
                        <Button variant="outline">Back to Categories</Button>
                    </Link>
                </div>
                <div className="max-w-md rounded-lg bg-white p-6 shadow">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Category name"
                                className="w-full"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <Button type="submit">Update Category</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
