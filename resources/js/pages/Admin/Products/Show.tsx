import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Badge } from "@/components/ui/badge";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogClose,
    DialogTitle,
} from "@/components/ui/dialog"

import { Product } from "./columns";

export default function Show({ product, categories, isDialogOpen, setDialogOpen }: {
    product: Product | null,
    categories?: { id: number; name: string }[],
    isDialogOpen: boolean,
    setDialogOpen: (open: boolean) => void
}) {
    if (!product) return null;

    console.log("Product details:", product);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="w-full md:!max-w-5xl   max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Product Details</DialogTitle>
                    <DialogDescription>
                        Details for <b>{product.name}</b>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* Image update currently disabled */}
                    <div className='grid gap-2 mx-1.5 w-lg '>
                        <Label htmlFor='image'>Product Image</Label>
                        {/* Show preview if image is selected */}
                        <img src={`/storage/${product.image}`} alt={product.image} className="mb-2 rounded border" />
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
                                <Label htmlFor='name' className="text-muted-foreground">Product Name</Label>
                                {product.name ? (
                                    <p className="text-lg font-semibold">{product.name}</p>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No name provided</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor='description' className="text-muted-foreground text-sm font-medium">
                                    Description
                                </Label>
                                {product.description ? (
                                    <div className="rounded bg-muted/50 p-3 text-sm max-h-40 overflow-y-auto border">
                                        {product.description}
                                    </div>
                                ) : (
                                    <div className="rounded bg-muted/30 p-3 text-sm text-muted-foreground flex items-center gap-2">
                                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
                                        No description provided
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4">
                                <Label className="text-muted-foreground">Category</Label>
                                {product.category_id && (
                                    <Badge className="text-sm">
                                        {categories?.find(cat => cat.id === product.category_id)?.name || 'Unknown Category'}
                                    </Badge>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <div className='flex-1 flex flex-row gap-2'>
                                    <Label htmlFor='stock' className="text-lg text-muted-foreground">Stock: </Label>
                                    <p className="text-lg font-semibold">
                                        {product.stock !== null ? product.stock : 'N/A'}
                                    </p>
                                </div>
                                <div className="flex-1 flex flex-row gap-2">
                                    <Label htmlFor='price' className="text-lg text-muted-foreground">Price</Label>
                                    <p className="text-lg font-semibold">
                                        {product.price !== null ? product.price : 'N/A'}
                                    </p>

                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-muted-foreground mb-1">Product Status</Label>
                                <div className="flex flex-wrap gap-6">
                                    <div className="flex items-center gap-2">

                                        <Label htmlFor="is_active" className="cursor-pointer">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {product.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">

                                        <Label htmlFor="is_approved" className="cursor-pointer">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${product.is_approved ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {product.is_approved ? 'Approved' : 'Pending'}
                                            </span>
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}