import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { columns, Product } from "./columns"
import { DataTable } from "./data-table"
import TablePagination from '@/components/table-pagination';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import Create from './Create';
import Edit from './Edit';
import Show from './Show';
import DeleteAlert from './delete-alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
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
    products: PaginatedResponse<Product>;
    categories: { id: number, name: string }[];
}

export default function Index({ products, categories }: IndexProps) {
    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [viewedProduct, setViewedProduct] = useState<Product | null>(null);
    const [deletedId, setDeletedId] = useState<number | null>(null);[]

    const handleShowCreateDialog = () => {
        setCreateDialogOpen(true);
    };

    const handleDelete = (productId: number) => {
        router.delete(route('products.admin.destroy', productId));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <header className='container mx-auto my-4 flex justify-end'>
                <Button onClick={handleShowCreateDialog}>
                    Add Product
                </Button>
            </header>

            <section className='container mx-auto'>

                <DataTable columns={columns({ setDeletedId, setEditProduct, setViewedProduct })} data={products.data} />
            </section>

            <DeleteAlert deleteId={deletedId} setDeletedId={setDeletedId} handleDelete={handleDelete} alertMessage={"product"} />
            <section className='absolute bottom-10 left-0 right-0 flex justify-center'>
                <TablePagination props={products} />
            </section>

            {/* Create Product Dialog */}
            <Create categories={categories} isDialogOpen={isCreateDialogOpen} setDialogOpen={setCreateDialogOpen} />
            {/* Show Product Dialog */}
            <Show
                product={viewedProduct}
                categories={categories}
                isDialogOpen={!!viewedProduct}
                setDialogOpen={() => setViewedProduct(null)}
            />
            {/* Edit Product Dialog */}
            <Edit
                product={editProduct}
                categories={categories}
                isDialogOpen={!!editProduct}
                setDialogOpen={() => setEditProduct(null)}
            />
        </AppLayout>
    )
}  
