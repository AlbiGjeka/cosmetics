import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/Textarea';
import AppLayout from '@/layouts/app-layout';

interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    image_url: string;
    affiliate_link: string;
}

interface ProductFormProps {
    product?: Product;
    categories: Array<{ id: number; name: string }>;
}

export default function ProductForm({ product, categories }: ProductFormProps) {
    const { data, setData, post, put, errors } = useForm<Product>({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        category_id: product?.category_id || 0,
        image_url: product?.image_url || '',
        affiliate_link: product?.affiliate_link || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (product) {
            put(`/dashboard/products/${product.id}`);
        } else {
            post('/dashboard/products');
        }
    };

    return (
        <AppLayout>
            <Head title={product ? 'Edit Product' : 'Create Product'} />
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        {product ? 'Edit Product' : 'Create Product'}
                    </h1>
                    <Link href="/dashboard/products">
                        <Button variant="outline">Back to Products</Button>
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            value={data.price}
                            onChange={(e) =>
                                setData('price', parseFloat(e.target.value))
                            }
                            className="mt-1 block w-full"
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="category_id">Category</Label>
                        <select
                            id="category_id"
                            value={data.category_id}
                            onChange={(e) =>
                                setData('category_id', parseInt(e.target.value))
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.category_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="image_url">Image URL</Label>
                        <Input
                            id="image_url"
                            value={data.image_url}
                            onChange={(e) =>
                                setData('image_url', e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        {errors.image_url && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.image_url}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="affiliate_link">Affiliate Link</Label>
                        <Input
                            id="affiliate_link"
                            value={data.affiliate_link}
                            onChange={(e) =>
                                setData('affiliate_link', e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        {errors.affiliate_link && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.affiliate_link}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="mt-4">
                        {product ? 'Update Product' : 'Create Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
