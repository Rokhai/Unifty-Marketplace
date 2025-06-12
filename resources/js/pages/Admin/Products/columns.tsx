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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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

export const columns = ({ setDeletedId, setEditProduct, setViewedProduct }: {
    setDeletedId: (id: number | null) => void;
    setEditProduct: (product: Product | null) => void;
    setViewedProduct: (product: Product | null) => void;
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

        // {
        //     accessorKey: "created_at",
        //     header: "Created At",
        // },
        {
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
                                    onSelect={e => {
                                        e.preventDefault();
                                        setViewedProduct(product);
                                    }}>
                                    View

                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={e => {
                                        e.preventDefault();
                                        setEditProduct(product);
                                    }}
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={e => {
                                    e.preventDefault();
                                    setDeletedId(product.id);
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
    ]