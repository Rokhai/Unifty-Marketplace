import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "My Cart",
        href: "/cart",
    },
];

export default function Index({ cartItems}) {

    const hadnleDeleteCartItem = (id: string) => {
        router.delete(route('cart.destroy', id), {
            onSuccess: () => {
                toast.success('Cart item deleted successfully.', {
                    duration: 3000,
                    position: 'top-right',  
                });
            },
            onError: () => {
                toast.error('Failed to delete cart item.', {
                    duration: 3000,
                    position: 'top-right',
                });
            }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Cart" />
            <section className="relative " style={{ height: 'calc(100vh - 81px)' }}>
                <section className="w-full h-full overflow-y-scroll">
                    <section className="bg-neutral-500/5 my-6">
                        <div className="w-full py-4 flex ">
                            <div className="w-1/2 ">

                                <Checkbox
                                    id="products"
                                    className="mx-4"
                                />
                                <Label htmlFor="products">
                                    <span className="text-base">Products</span>
                                </Label>
                            </div>
                            <div className="px-12">Unit Price</div>
                            <div className="px-11">Quantity</div>
                            <div className="px-11">Total Price</div>
                            <div className="px-11">Action</div>
                        </div>
                    </section>

                    <section className="my-4 w-full rounded-lg ">

                        {/* Item listings */}
                        {Object.entries(cartItems).map(([ownerId, items]) => (
                            <div key={ownerId} className="bg-neutral-500/5 my-6">
                                {/* Vendor info */}
                                <div className="flex py-6">
                                    <Checkbox id={`vendor-${ownerId}`} className="mx-4" />
                                    <Label htmlFor={`vendor-${ownerId}`}>
                                        <h2>{items[0]?.product?.user?.name ?? 'Unknown Vendor'}</h2>
                                    </Label>
                                </div>
                                {/* Products for this vendor */}
                                {items.map((item, idx) => (
                                    <div className="flex w-full items-center border-t-2" key={item.id}>
                                        <div className="w-1/2 flex py-4 items-center">
                                            <Checkbox id={`product-${item.id}`} className="mx-4" />
                                            <Label htmlFor={`product-${item.id}`} className="flex gap-4">
                                                <img
                                                    src={`storage/${item.product.image}`}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                                <h2 className="text-base">{item.product.name}</h2>
                                            </Label>
                                        </div>
                                        <div className="px-12">₱ {item.product.price}</div>
                                        <div className="px-16">{item.quantity}</div>
                                        <div className="px-13">₱ {item.product.price * item.quantity}</div>
                                        <div className="px-10">
                                            <Button variant="link" onClick={() => hadnleDeleteCartItem(item.id)}>
                                                <span>Remove</span>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        
                    </section>
                </section>
                <section className="absolute bottom-0 right-0 left-0 bg-neutral-100 dark:bg-neutral-900 mx-auto p-4  shadow-[0_-9px_16px_-4px_rgba(0,0,0,0.35)] flex gap-6 justify-end">
                    <div>
                        <h2 className="text-lg text-muted-foreground font-semibold">Total (1 Item):  <span className="text-primary">₱ 100.00</span></h2>
                    </div>
                    <div>
                        <Button>
                            <span className="text-lg py-4 px-6 ">Checkout</span>
                        </Button>
                    </div>
                </section>
            </section>
            <Toaster />
        </AppLayout>
    )

}