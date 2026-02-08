import React, { useState } from 'react';
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
    image_urls: (File | string)[];
    affiliate_link: string;
    _method?: 'put';
}

interface ProductFormProps {
    product?: Product;
    categories: Array<{ id: number; name: string }>;
}

export default function ProductForm({ product, categories }: ProductFormProps) {
    const { data, setData, post, put, processing, errors } = useForm<Product>({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        category_id: product?.category_id || 0,
        image_urls: product?.image_urls || [],
        affiliate_link: product?.affiliate_link || '',
    });

    const images = data.image_urls;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    /* ----------------------------- helpers ----------------------------- */

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

        if (product) {
            setData('_method', 'put');
            post(`/dashboard/products/${product.id}`, {
                forceFormData: true,
            });
        } else {
            post('/dashboard/products', {
                forceFormData: true,
            });
        }
    };

    /* ----------------------------- render ----------------------------- */

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
                    {/* NAME */}
                    <div>
                        <Label>Name</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <Label>Description</Label>
                        <Textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* PRICE */}
                    <div>
                        <Label>Price</Label>
                        <Input
                            type="number"
                            value={data.price}
                            onChange={(e) =>
                                setData('price', Number(e.target.value))
                            }
                        />
                        {errors.price && (
                            <p className="text-sm text-red-500">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <Label>Category</Label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData('category_id', Number(e.target.value))
                            }
                            className="mt-1 w-full rounded-md border px-3 py-2"
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="text-sm text-red-500">
                                {errors.category_id}
                            </p>
                        )}
                    </div>

                    {/* IMAGE MANAGER */}
                    <div>
                        <Label>Product Images</Label>

                        {images.length > 0 && (
                            <div className="mt-3">
                                <div className="relative h-64 w-full overflow-hidden rounded-lg border">
                                    <img
                                        src={getImageSrc(
                                            images[currentImageIndex],
                                        )}
                                        className="h-full w-full object-cover"
                                    />

                                    {images.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setCurrentImageIndex((i) =>
                                                        i === 0
                                                            ? images.length - 1
                                                            : i - 1,
                                                    )
                                                }
                                                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white p-2 shadow"
                                            >
                                                ‹
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setCurrentImageIndex((i) =>
                                                        i === images.length - 1
                                                            ? 0
                                                            : i + 1,
                                                    )
                                                }
                                                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white p-2 shadow"
                                            >
                                                ›
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                        Image {currentImageIndex + 1} of{' '}
                                        {images.length}
                                    </p>

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() =>
                                            removeImage(currentImageIndex)
                                        }
                                    >
                                        Remove Image
                                    </Button>
                                </div>
                            </div>
                        )}

                        <Input
                            className="mt-4"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />

                        {errors.image_urls && (
                            <p className="text-sm text-red-500">
                                {errors.image_urls}
                            </p>
                        )}
                    </div>

                    {/* AFFILIATE LINK */}
                    <div>
                        <Label>Affiliate Link</Label>
                        <Input
                            value={data.affiliate_link}
                            onChange={(e) =>
                                setData('affiliate_link', e.target.value)
                            }
                        />
                        {errors.affiliate_link && (
                            <p className="text-sm text-red-500">
                                {errors.affiliate_link}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={processing}>
                        {product ? 'Update Product' : 'Create Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
