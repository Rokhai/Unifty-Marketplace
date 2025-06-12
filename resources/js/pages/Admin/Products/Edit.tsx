import { useState, FormEventHandler, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch"
import { LoaderCircle } from "lucide-react";
import { Product } from "./columns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogClose,
    DialogTitle,
} from "@/components/ui/dialog"
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
    isDialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    product: Product | null;
    categories?: { id: number; name: string }[];

}

type UpdateProductForm = {
    name?: string;
    image?: File | null;
    stock?: number;
    price?: number;
    description?: string;
    category_id?: number;
    is_active?: boolean;
    is_approved?: boolean;
}

export default function Edit({ product, categories, isDialogOpen, setDialogOpen }: EditProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, put, processing, errors, reset } = useForm<UpdateProductForm>({
        name: '',
        image: null, // File type for image
        stock: 0,
        price: 0,
        description: '',
        category_id: 0,
        is_active: true,
        is_approved: false,
    });
    // console.log("Edit form data:", data);

    // Update form data when product changes
    useEffect(() => {
        if (product) {
            setData({
                name: product.name ?? '',
                image: null,
                stock: product.stock ?? 0,
                price: product.price ?? 0,
                description: product.description ?? '',
                category_id: product.category_id ?? 0, // always string for FormData
                is_active: !!product.is_active,
                is_approved: !!product.is_approved,
            });

        }
    }, [product]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!product) return;
        put(route("products.update", product.id), {
            onSuccess: () => {
                reset('name', 'image', 'stock', 'price', 'description', 'category_id', 'is_active', 'is_approved');
                setImagePreview(null); // Reset image preview
                setDialogOpen(false); // Close the dialog after submission
            },
            onError: () => {
                console.error("Failed to update product:", errors);
            }
        });
    };

    const handleCancel = () => {
        // setImagePreview(null); // Reset image preview
        setDialogOpen(false); // Close the dialog without saving
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
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className=" w-full md:!max-w-5xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit product</DialogTitle>
                    <DialogDescription>
                        Edit product details below.
                    </DialogDescription>
                </DialogHeader>
                <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* Image update currently disabled */}
                        <div className='grid gap-2 mx-1.5 w-lg '>
                            <Label htmlFor='image'>Product Image</Label>
                            {/* Show preview if image is selected */}
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mb-2  rounded border  w-full object-cover"
                                />
                            ) : product?.image ? (
                                <img src={`/storage/${product.image}`} alt={product.image} className="mb-2 rounded border" />
                            ) : null}
                            {/* <Input
                                id='image'
                                type='file'
                                name='image'
                                accept='image/*'
                                onChange={handleImageChange}
                                disabled={processing}
                                placeholder='Upload product image'
                            /> */}
                            {/* <InputError message={errors.image} className="mt-2" /> */}
                        </div>
                        <div className="my-8 md:my-0 flex-1">
                            <div className='grid gap-4' >
                                <div className='grid gap-2'>
                                    <Label htmlFor='name'>Product Name</Label>
                                    <Input
                                        id='name'
                                        type='text'
                                        name='name'
                                        required
                                        autoFocus
                                        autoComplete='name'
                                        tabIndex={1}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder='Enter product name'
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor='description'>Description</Label>
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
                                        className="resize-none h-24 overflow-y-auto"
                                        maxLength={1000}
                                    />
                                    <div className="text-xs text-muted-foreground text-right">
                                        {data.description.length} / 1000 characters
                                    </div>

                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Label>Category</Label>
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

                                <div className="flex gap-4">
                                    <div className='flex-1 grid gap-2'>
                                        <Label htmlFor='stock'>Stock</Label>
                                        <Input
                                            id='stock'
                                            type='number'
                                            name='stock'
                                            required
                                            autoComplete='stock'
                                            tabIndex={2}
                                            value={data.stock}
                                            onChange={(e) => setData('stock', parseInt(e.target.value))}
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
                                            tabIndex={3}
                                            value={data.price}
                                            onChange={(e) => setData('price', parseFloat(e.target.value))}
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
                                                checked={data.is_active}
                                                onCheckedChange={checked => setData('is_active', checked)}
                                                disabled={processing}
                                            />
                                            <Label htmlFor="is_active" className="cursor-pointer">
                                                {data.is_active ? 'Active' : 'Inactive'}
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="is_approved"
                                                checked={data.is_approved}
                                                onCheckedChange={checked => setData('is_approved', checked)}
                                                disabled={processing}
                                            />
                                            <Label htmlFor="is_approved" className="cursor-pointer">
                                                {data.is_approved ? 'Approved' : 'Pending Approval'}
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button type="submit" disabled={processing}>
                            {processing && (<LoaderCircle className="h-4 w-4 animate-spin mr-2" />)}
                            Save Changes
                        </Button>
                        <DialogClose asChild>
                            <Button variant="secondary" disabled={processing} onClick={handleCancel}>
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

