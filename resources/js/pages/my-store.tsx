import { FormEventHandler } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "My Store",
        href: "/my-store",
    },
];



type StoreForm = {
    name: string;
    image: File | null;
    location: string;
}

export default function MyStore({ store }) {
    const { data, setData, post, progress, processing, errors, reset } = useForm<StoreForm>({
        name: '',
        image: null,
        location: '',
    })


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        post(route('my-store.store'), {
            // forceFormData: true,
            onFinish: () => reset('name', 'image', 'location'),
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Store" />
            {/* This will display if the user doesn't have store yet */}
            {!store && (
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="flex justify-center items-center flex-col gap-4 p-4 bg-gray-800 rounded-lg">
                        <h1 className="text-4xl text-white font-bold">My Store</h1>
                        <p>
                            You don't have any stores yet. You can create a new store by clicking the button below.
                        </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                {/* This button will open the dialog > DialogContent */}
                                <Button>Create Store</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create a new store</DialogTitle>
                                    <DialogDescription>
                                        Enter the name of your new store below.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={submit} className="grid gap-4">
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Store Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                disabled={processing}
                                                placeholder="Store Name"
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>
                                        <div className="grid w-full items-center gap-2">
                                            <Label htmlFor="image">Image</Label>
                                            <Input
                                                id="image"
                                                type="file"

                                                onChange={(e) => {
                                                    setData('image', e.target.files ? e.target.files[0] : null);
                                                }}
                                                disabled={processing}

                                            />
                                            {progress && (
                                                <progress value={progress.percentage} max="100">
                                                    {progress.percentage}%
                                                </progress>
                                            )}
                                        </div>
                                        {/* Location */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                type="text"
                                                autoComplete="location"
                                                value={data.location}
                                                onChange={(e) => setData('location', e.target.value)}
                                                disabled={processing}
                                                placeholder="Store Location"
                                            />
                                        </div>
                                    </div>

                                    <DialogFooter className="my-4">
                                        <Button type="submit" disabled={processing}>{processing && (<LoaderCircle className="h-4 w-4 animate-spin" />)} Create</Button>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            )}
            {/* This will display if the user has store */}
            {store && (

                <div className="flex h-full  flex-col gap-4 rounded-xl p-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex">
                            <div className=" w-32 h-32flex justify-center items-center rounded-full">

                                <img src={`/storage/${store.image}`} className="h-full w-full" />
                            </div>
                            <div className="mx-4 flex flex-col justify-center">
                                <h2 className="text-4xl">

                                    {store.name}'s Store
                                </h2>
                                <p className="text-base text-neutral-500">{store.location ?? 'No location'}</p>
                                <p>
                                    <span>Following: {store.total_following} </span>
                                    <span>Follower: {store.total_followers} </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Products */}
                    <div>
                        <h2 className="text-3xl">Products</h2>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}