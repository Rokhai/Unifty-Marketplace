import AppLayout from "@/layouts/app-layout";
import { Head, router, useForm } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoveLeft, ShoppingCart } from "lucide-react";
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Product",
        href: "/product",
    }
]

import { Product } from "@/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

type ShowProps = {
    product: Product;
}

export default function Show({ product }: ShowProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            if (value < 1) {
                setData('quantity', 1);
            }
            else if (value > product.stock) {
                setData('quantity', product.stock);
            }
            else {
                setData('quantity', value);
            }
        }
    }

    const handleAddToCart = () => {
        post(route('cart.store'), {
            onSuccess: () => {
                toast.success('Product added to cart successfully.', {
                    duration: 3000,
                    position: 'top-right',
                });
                reset('quantity');
                console.log('Toast len:', toast.length);
            }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} />
            <div className="mt-4">
                <Button variant={'link'} onClick={() => router.get(route('home'))}>
                    <MoveLeft className="mr-2" />
                    <span>Back to Home</span>
                </Button>
            </div>
            <section className="my-4 bg-neutral-500/5 p-4 rounded-lg">

                <div className="mt-4 flex flex-col md:flex-row ">
                    <div className="mx-auto shrink-0" style={{ width: '450px', height: '450px' }}>
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="gap-4 ml-10 w-full   flex flex-col">
                        <div>
                            <h1 className="text-lg md:text-xl">{product.name}</h1>
                        </div>
                        <div className="bg-zinc-100/2 p-4 rounded-md">
                            <span>₱ </span>
                            <span className="text-2xl font-semibold">{product.price}</span>
                        </div>

                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative grow-1 overflow-hidden rounded-xl border ">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>


                        <div className="flex items-center">
                            <Label className="text-muted-foreground">Quantity</Label>
                            <div className="mx-5 flex ">
                                <Button variant={'outline'} className="rounded-none"
                                    onClick={() => {
                                        if (data.quantity > 1) {
                                            setData('quantity', data.quantity - 1);
                                        }
                                    }}
                                    disabled={data.quantity <= 1}
                                >
                                    <span className="text-sm">-</span>
                                </Button>
                                <Input
                                    name="quantity"
                                    type="number"
                                    value={data.quantity}
                                    onChange={handleQuantityChange}
                                    disabled={product.stock <= 0}
                                    min={1}
                                    max={product.stock > 0 ? product.stock : 1}
                                    className="w-16 text-center  rounded-none
                                    [-moz-appearance:_textfield] 
                                    [&::-webkit-inner-spin-button]:m-0 
                                    [&::-webkit-inner-spin-button]:appearance-none 
                                    [&::-webkit-outer-spin-button]:m-0 
                                    [&::-webkit-outer-spin-button]:appearance-none
                                "
                                />
                                <Button variant={'outline'} className="rounded-none"
                                    onClick={() => {
                                        if (product.stock > 0) {
                                            setData('quantity', data.quantity + 1);
                                        }
                                    }}
                                    disabled={product.stock <= 0 || data.quantity >= product.stock}
                                >
                                    <span className="text-sm">+</span>
                                </Button>
                            </div>

                            <span className={`text-sm ${product.stock > 0 ? 'text-muted-foreground' : 'text-red-600'}`}>
                                {product.stock > 0 ? `${product.stock} pieces available` : 'Out of stock'}
                            </span>
                        </div>
                        <div>
                            <div>
                                <Button className="w-1/4 h-12" onClick={handleAddToCart} disabled={product.stock <= 0 || processing}>
                                    <ShoppingCart className="mr-2" />
                                    <span className="text-sm  capitalize">Add to Cart</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className="mt-6 bg-neutral-500/5 p-4 rounded-lg">
                <div className="mb-4 gap-4">
                    <h2 className="text-lg font-semibold bg-zinc-100/2 p-4 mb-4 rounded-md">Product Specification</h2>
                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-muted-foreground">Category:</span>
                        <Badge className="text-sm font-semibold" variant="outline">
                            {product.category_name}
                        </Badge>
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-muted-foreground">Stock: </span>
                        <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-zinc-200' : 'text-red-600'}`}>
                            {product.stock > 0 ? `${product.stock}` : 'Out of stock'}
                        </span>
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-muted-foreground">Ships from: </span>
                        <span>Arayat, Pampanga</span>

                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold bg-zinc-100/2 p-4 rounded-md">Product Description</h2>
                    <p className="text-sm text-muted-foreground p-4">{product.description}</p>
                </div>
            </section>
            <Toaster />
        </AppLayout>
    )
}