import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { router } from "@inertiajs/react"

export type Product = {
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

export const columns = ({setProductId} : {
    setProductId: (id: number | null) => void;
}): ColumnDef<Product>[] => [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            return (
                <img
                    src={`/storage/${row.getValue("image")}`}
                    alt={row.getValue("name")}
                    className="w-16 h-16 object-cover rounded"
                />
            )
        }
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name = row.getValue("name");
            return (
                <span className="font-medium">
                    {name.length > 20 ? `${name.slice(0, 20)}...` : name}
                </span>
            )
        }
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = row.getValue("price");
            return (
                <span className="font-medium">
                    {`PHP ${price}`}
                </span>
            )
        }
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const description = row.getValue("description");
            return (
                <span className="text-sm text-neutral-500">
                    {description.length > 50 ? `${description.slice(0, 50)}...` : description}
                </span>
            )
        }
    },
    {
        accessorKey: "category_name",
        header: "Category",
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.getValue("is_active");
            return (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isActive ? 'Active' : 'Inactive'}
                </span>
            )
        }
    },
    {
        accessorKey: "is_approved",
        header: "Approval Status",
        cell: ({ row }) => {
            const isApproved = row.getValue("is_approved");
            return (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${isApproved ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {isApproved ? 'Approved' : 'Pending'}
                </span>
            )
        }
    },

    {
        accessorKey: "actions",
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const product = row.original

            return (
                <>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    router.get(route('vendor.products.show', product.id))
                                }}
                              >
                                View

                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    router.get(route('vendor.products.edit', product.id))
                                }}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onSelect={e => {
                                    e.preventDefault();
                                    setProductId(product.id);
                                }}
                                className="text-red-500">
                                Delete

                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                </>
            )
        },
    },


    // {
    //     accessorKey: "created_at",
    //     header: "Created At",
    // },

]