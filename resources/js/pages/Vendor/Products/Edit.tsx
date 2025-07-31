
import AppLayout from "@/layouts/app-layout";
import { Head, router, useForm } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import { useState, FormEventHandler, useEffect } from "react";

import { Product } from "./columns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoveLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
type EditProps = {
    product: Product;
    categories: { id: number; name: string }[];
    user: any;
};

type UpdateProductForm = {
    name?: string;
    image?: File | null;
    stock?: number;
    price?: number;
    description?: string;
    category_id?: number;
    is_active?: boolean;
    _method?: string; // For PUT requests
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "My Store",
        href: "/store",
    },
];

export default function Edit({ product, categories }: EditProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<UpdateProductForm>({
        name: product.name || '',
        image: null, // File type for image
        stock: product.stock || 0,
        price: product.price || 0,
        description: product.description || '',
        category_id: product.category_id || 0, // always string for FormData
        is_active: product.is_active || false,
        // _method: 'PUT', // For PUT requests
        _method: 'PATCH', // Use PATCH for partial updates
    });

    // useEffect(() => {
    //     if (product) {
    //         setData({
    //             name: product.name ?? '',
    //             image: null,
    //             stock: product.stock ?? 0,
    //             price: product.price ?? 0,
    //             description: product.description ?? '',
    //             category_id: product.category_id ?? 0, // always string for FormData
    //             is_active: !!product.is_active,
    //         });

    //     }
    // }, [product]);

    // const handleSubmit: FormEventHandler = (e) => {
    //     e.preventDefault();
    //     if (!product) return;
    //     put(route("vendor.products.update", product.id), {
    //         forceFormData: true,
    //         onSuccess: () => {
    //             reset('name', 'image', 'stock', 'price', 'description', 'category_id', 'is_active');
    //             setImagePreview(null); // Reset image preview
    //         },
    //         onError: () => {
    //             console.error("Failed to update product:", errors);
    //         }
            
    //     });
    // };
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!product) return;

        post(route("vendor.products.update", product.id), {
            forceFormData: true, // Use FormData to handle file uploads
            onSuccess: () => {
                reset('name', 'image', 'stock', 'price', 'description', 'category_id', 'is_active');
                setImagePreview(null); // Reset image preview
            },
            onError: () => {
                console.error("Failed to update product:", errors);
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file); // Set the image file in form data
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="mt-4">
                <Button variant={'link'} onClick={() => router.get(route('vendor.products.index'))}>
                    <MoveLeft className="mr-2" />
                    <span>Back to My Products</span>
                </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <section className="my-4 bg-neutral-500/5 p-4 rounded-lg">

                    <div className="mt-4 grid md:grid-cols-2">

                        <div className="gap-2 w-xl ">
                            {/* 
                                image height is set to 620px to match the original design
                                 style={{ height: '620px', objectFit: 'cover' }}
                            */}
                            {/* <img
                                src={`/storage/${product.image}`}
                                alt={product.name}
                                className="w-full object-cover rounded-lg"
                                style={{ height: '620px', objectFit: 'cover' }}
                            /> */}
                            <div className='grid gap-4 mx-1.5 w-lg '>
                                <Label htmlFor='image' className="text-muted-foreground">Product Image</Label>
                                {/* Show preview if image is selected */}
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mb-2  rounded border  w-full object-cover"
                                        style={{ height: '620px', objectFit: 'cover' }}
                                    />
                                ) : product?.image ? (
                                    <img src={`/storage/${product.image}`} alt={product.image} className="mb-2 rounded border" style={{ height: '620px', objectFit: 'cover' }} />
                                ) : null}
                                <Input
                                    id='image'
                                    type='file'
                                    name='image'
                                    autoComplete="image"
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    disabled={processing}
                                    placeholder='Upload product image'
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                        </div>
                        <div className="gap-4  w-full  flex flex-col">
                            <div>
                                <Label htmlFor="name" className="text-muted-foreground">Product Name</Label>
                                {/* <h1 className="text-lg md:text-xl">{product.name}</h1> */}
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    autoComplete="name"
                                    tabIndex={2}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    className="text-lg md:text-xl "
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="price" className="text-muted-foreground">Price</Label>
                                    <div className="relative flex items-center rounded-md w-full">
                                        <span className="absolute left-3 text-2xl font-semibold text-zinc-500">₱</span>
                                        <Input
                                            id="price"
                                            type="number"
                                            name="price"
                                            required
                                            autoComplete="price"
                                            tabIndex={3}
                                            value={data.price}
                                            onChange={(e) => setData('price', parseFloat(e.target.value))}
                                            disabled={processing}
                                            className="text-2xl font-semibold w-full pl-8"
                                        />
                                    </div>
                                    <InputError message={errors.price} className="mt-2" />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="stock" className="text-muted-foreground">Stock</Label>
                                    <div className="relative flex items-center rounded-md w-full">
                                        <span className="absolute left-3 text-lg font-semibold text-zinc-500">Qty:</span>
                                        <Input
                                            id="stock"
                                            type="number"
                                            name="stock"
                                            required
                                            autoComplete="stock"
                                            tabIndex={4}
                                            value={data.stock}
                                            onChange={(e) => setData('stock', parseInt(e.target.value))}
                                            disabled={processing}
                                            className="w-full pl-13 text-lg font-semibold"
                                        />
                                    </div>
                                    <InputError message={errors.stock} className="mt-2" />
                                </div>
                            </div>


                            <div className="flex flex-col gap-4">
                                <Label htmlFor="category" className="text-muted-foreground">Category</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            {data.category_id ? `${categories?.find(cat => cat.id === data.category_id)?.name || 'Select Category'}` : ''}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup value={data.category_id?.toString() ?? ''} onValueChange={(value) => setData('category_id', parseInt(value))}>
                                            {categories?.map((category) => (
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
                            <div className="grid gap-4">
                                <Label className="text-muted-foreground">Product Status</Label>
                                <div className="flex items-center gap-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                        disabled={processing}
                                    />
                                    {/* <span className="text-sm text-muted-foreground">Status:</span> */}
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${data.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {data.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <Label htmlFor="description" className="text-muted-foreground">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    required
                                    autoComplete="description"
                                    tabIndex={1}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    disabled={processing}
                                    placeholder='Enter product description'
                                    className="resize-none h-64 overflow-y-auto"
                                    maxLength={1000}
                                />
                                <div className="text-xs text-muted-foreground text-right">
                                    {data.description.length} / 1000 characters
                                </div>

                                <InputError message={errors.description} className="mt-2" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mt-4 p-4 flex flex-col md:flex-row gap-4 justify-end">

                    <Button type="submit">
                        Apply Changes
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.get(route('vendor.products.index'))}>
                        Back to My Products
                    </Button>
                </section>
            </form>
        </AppLayout>
    );
}