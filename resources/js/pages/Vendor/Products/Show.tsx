
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";

import { Product } from "./columns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoveLeft, ShoppingCart } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "My Store",
        href: "/store",
    },
];

interface ShowProps {
    product: Product;
}

export default function Show({ product }: ShowProps) {


    return (

        <AppLayout>
            <Head title={product.name} />
            <div className="mt-4">
                <Button variant={'link'}>
                    <MoveLeft className="mr-2" />
                    <span onClick={() => router.get(route('vendor.products.index'))}>Back to My Products</span>
                </Button>
            </div>
            <section className="my-4 bg-zinc-300/10 p-4 rounded-lg">

                <div className="mt-4  grid md:grid-cols-2">

                    <div className="gap-2 w-xl ">
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            className="w-full h-auto object-cover rounded-lg"
                            style={{ height: '620px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="gap-4  w-full  flex flex-col">
                        <div>
                            <h1 className="text-lg md:text-xl">{product.name}</h1>
                        </div>
                        <div className="bg-zinc-100/2 p-4 rounded-md">
                            <span>₱ </span>
                            <span className="text-2xl font-semibold">{product.price}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Category:</span>
                            <Badge className="text-sm font-semibold" variant="outline">
                                {product.category_name}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Stock:</span>
                            <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-zinc-200' : 'text-red-600'}`}>
                                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {product.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Approval Status:</span>

                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${product.is_approved ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {product.is_approved ? 'Approved' : 'Pending'}
                            </span>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground">Created At: </span>
                            <span className="text-sm font-semibold">{new Date(product.created_at).toLocaleDateString()}</span>
                        </div>

                        {/* <div className="mt-4 flex justify-end">
                            <Button>
                                <ShoppingCart className="mr-2" />
                                <span className="text-sm">Add to Cart</span>
                            </Button>
                        </div> */}
                    </div>
                </div>

            </section>
            <section className="mt-6 bg-zinc-300/10 p-4 rounded-lg">

                <div>
                    <h2 className="text-lg font-semibold bg-zinc-100/2 p-4 rounded-md">Product Description</h2>
                    <p className="text-sm text-muted-foreground p-4">{product.description}</p>
                </div>
            </section>
        </AppLayout>
    )
}