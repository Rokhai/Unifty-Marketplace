
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";

import { useState, FormEventHandler } from 'react';
import { LoaderCircle } from "lucide-react";
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { MoveLeft } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "My Store",
        href: "/store",
    },
];

type ProductForm = {
    name: string;
    image: File | null;
    stock: number;
    price: number;
    description?: string;
    category_id?: number;
    is_active?: boolean;
}

type CreateProps = {
    categories: { id: number; name: string }[];
}

export default function Create({ categories }: CreateProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm<ProductForm>({
        name: '',
        image: null,
        stock: 0,
        price: 0,
        description: '',
        category_id: undefined,
        is_active: false,
    });

    const submitProduct: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('vendor.products.store'), {
            forceFormData: true, // Use FormData to handle file uploads
            onSuccess: () => {
                reset('name', 'image', 'stock', 'price', 'description', 'category_id', 'is_active'); // Reset form fields
                setImagePreview(null); // Reset image preview
            },
            onError: () => {
                console.error("Failed to create product: ", errors)  // Handle errors if needed
            },
        });
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    return (
        <AppLayout>
            <Head title="Add Product" />
            <section className="my-4 w-full md:max-w-5xl overflow-y-auto mx-auto">
                <div>
                    <Button variant={'link'}>
                        <MoveLeft className="mr-2" />
                        <span onClick={() => router.get(route('vendor.products.index'))}>Back to My Store</span>
                    </Button>
                </div>
                <form onSubmit={submitProduct} className="border rounded-lg mt-4 p-4">
                    <div className="my-2">

                        <h1 className="font-bold text-lg md:text-4xl">Add Product</h1>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="grid gap-2 w-lg">
                            <Label htmlFor="image">Product Image</Label>
                            {!imagePreview ? (
                                <div className="mb-2  rounded border flex items-center justify-center bg-muted text-muted-foreground" style={{ height: '378px' }}>
                                    <span className="text-sm">No Image Selected</span>
                                </div>
                            ) : (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mb-2 rounded border"
                                />
                            )}
                            <Input
                                id='image'
                                type='file'
                                name='image'
                                required
                                autoComplete='image'
                                tabIndex={1}
                                accept='image/*'
                                onChange={handleImageChange}
                                disabled={processing}
                                placeholder='Upload product image'
                            />
                            <InputError message={errors.image} className="mt-2" />
                        </div>
                        <div className="flex-1 my-8 md:my-0">
                            <div className="grid gap-4">
                                <div>
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id='name'
                                        type='text'
                                        name='name'
                                        required
                                        autoComplete='name'
                                        tabIndex={2}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder='Enter product name'
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className='grid gap-2'>
                                    <Label>Product Description</Label>
                                    <Textarea
                                        name="description"
                                        autoComplete="description"
                                        tabIndex={3}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        disabled={processing}
                                        placeholder='Enter product description'
                                        className="resize-none h-24  overflow-y-auto"
                                        maxLength={1000}
                                    />
                                    <div className="text-xs text-muted-foreground text-left mt-1">
                                        {data.description.length} / 1000 characters
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Label>Category</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">
                                                {data.category_id
                                                    ? categories?.find(cat => cat.id === data.category_id)?.name || 'Select Category'
                                                    : 'Select Category'}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>Category</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuRadioGroup
                                                tabIndex={4}
                                                value={data.category_id?.toString() ?? ''}
                                                onValueChange={value => setData('category_id', parseInt(value))}
                                            >
                                                {categories?.map(category => (
                                                    <DropdownMenuRadioItem
                                                        key={category.id}
                                                        value={category.id.toString()}
                                                    >
                                                        {category.name}
                                                    </DropdownMenuRadioItem>
                                                ))}
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <InputError message={errors.category_id} className="mt-2" />
                                </div>
                                <div className="flex gap-4">
                                    <div className='flex-1 grid gap-2'>
                                        <Label htmlFor='stock'>Stock</Label>
                                        <Input
                                            id='stock'
                                            type='number'
                                            name='stock'
                                            required
                                            autoComplete='stock'
                                            tabIndex={5}
                                            value={data.stock === 0 ? '' : data.stock}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setData('stock', value === '' ? 0 : parseInt(value));
                                            }}
                                            disabled={processing}
                                            placeholder='Enter stock quantity'
                                        />
                                        <InputError message={errors.stock} className="mt-2" />
                                    </div>
                                    <div className="flex-1 grid gap-2">
                                        <Label htmlFor='price'>Price</Label>
                                        <Input
                                            id='price'
                                            type='number'
                                            name='price'
                                            required
                                            autoComplete='price'
                                            tabIndex={6}
                                            value={data.price === 0 ? '' : data.price}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setData('price', value === '' ? 0 : parseFloat(value));
                                            }}
                                            disabled={processing}
                                            placeholder='Enter product price'
                                        />
                                        <InputError message={errors.price} className="mt-2" />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-muted-foreground mb-1">Product Status</Label>
                                    <div className="flex flex-wrap gap-6">
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="is_active"
                                                tabIndex={7}
                                                checked={data.is_active}
                                                onCheckedChange={checked => setData('is_active', checked)}
                                                disabled={processing}
                                            />
                                            <Label htmlFor="is_active" className="cursor-pointer">
                                                {data.is_active ? 'Active' : 'Inactive'}
                                            </Label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end  mt-4 gap-2">
                        <Button type="submit">
                            {processing ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                'Add Product'
                            )}
                        </Button>
                        <Button variant={"secondary"} onClick={() => {
                            reset()
                            router.get(route('store.index'))
                        }} disabled={processing}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </section>
        </AppLayout>
    )
}