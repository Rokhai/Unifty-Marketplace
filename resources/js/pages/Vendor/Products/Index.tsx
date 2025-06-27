import AppLayout from "@/layouts/app-layout";
import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";

import TablePagination from '@/components/table-pagination';
import { Product, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";

import DeleteItemAlert from "@/components/delete-item-alert";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "My Store",
        href: "/store",
    },
];

interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

type IndexProps = {
    user: any;
    products: PaginatedResponse<Product>;
}

export default function Index({ user, products }: IndexProps) {

    console.log(user);
    console.log("User role:", user.roles);
    
    const [productId, setProductId] = useState<number | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Products" />
            <section className="my-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
            </section>

            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Products</h2>
                    <Button onClick={() => router.get(route('vendor.products.create'))}>
                        Add Product
                    </Button>
                </div>
                    <section>
                        <DataTable columns={columns({setProductId})} data={products.data} />
                    </section>
                <section className='absolute bottom-2 left-0 right-0 flex justify-center'>
                    <TablePagination props={products} />
                </section>
            </section>
            <DeleteItemAlert 
                deleteId={productId} 
                setDeletedId={setProductId} 
                handleDelete={() => {
                    if (productId) {
                        router.delete(route('vendor.products.destroy', productId));
                    }
                }} 
                alertMessage={"product"}
            />


        </AppLayout>
    );
}