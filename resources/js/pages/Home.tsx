import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/home',
    },
];


type Product = {
    id: number;
    name: string;
    image: string;
    stock: number;
    price: number;
    description: string;
    category_id: number;
    category_name: string;
    is_active: boolean;
    is_approved: boolean;
}

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

type HomeProps = {
    products: PaginatedResponse<Product>;
}

export default function Home({ products }: HomeProps) {
    console.log('Products:', products);

    const handleShowProduct = (id: number) => {
        // Navigate to the product details page
        router.get(route('products.show', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Home' />
            <section className='grid grid-cols-2 gap-4 my-4 md:grid-cols-3 lg:grid-cols-4'>
                {products.data.map((product) => (
                    <Card key={product.id} className='flex flex-col relative'>
                        <CardHeader>
                            <img src={`/storage/${product.image}`} alt={product.name} className='h-48 w-full rounded-md object-cover' />
                        </CardHeader>
                        <CardContent className='mb-12'>
                            <CardTitle className='mb-2'>{product.name.length > 25 ? `${product.name.slice(0, 50)}...` : product.name}</CardTitle>
                            <CardDescription>
                                {/* {product.description.length > 50 ? `${product.description.slice(0, 50)}...` : product.description} */}
                            </CardDescription>
                            <div className='flex flex-col my-1'>
                                {/* <p className="text-sm text-gray-500">Stock: {product.stock}</p> */}
                            </div>
                        </CardContent>
                        <CardFooter className='flex justify-between items-center absolute bottom-0 right-0 left-0 p-4'>
                            <div className='flex items-center gap-2'>
                                <span>
                                    ₱
                                </span>
                                <span>
                                    <p className="text-lg font-semibold">{product.price}</p>
                                </span>

                            </div>
                            <div>
                                <Button onClick={() => handleShowProduct(product.id)} variant='outline' className='flex items-center gap-2'>
                                    {/* <ShoppingCart className="mr-2" /> */}
                                    View Details
                                </Button>
                            </div>

                        </CardFooter>
                    </Card>
                ))}
            </section>
        </AppLayout>
    )


}