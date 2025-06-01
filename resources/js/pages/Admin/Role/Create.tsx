import { Head, router, useForm } from "@inertiajs/react";
import { FormEventHandler } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import InputError from '@/components/input-error';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type RoleForm = {
    name: string;
    permissions: string[];
}

interface PermissionsProp {
    permissions: string[]; // Assuming permissions are strings, adjust type as needed
}

export default function Create({ permissions }: PermissionsProp) {
    const { data, setData, post, processing, errors, reset } = useForm<RoleForm>({
        name: '',
        permissions: [], // Default can be empty or pre-populated
    });

    const submitRole: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('roles.store'), {
            onFinish: () => {
                reset('name', 'permissions');
            }
        });
    };

    const handleCheckboxChange = (permission: string, checked: boolean | string) => {
        if (checked === true) {
            setData('permissions', [...data.permissions, permission]);
        } else {
            setData('permissions', data.permissions.filter((p) => p !== permission));
        }
    };

    const handleCancel = () => {
        reset('name', 'permissions');
        router.visit(route('roles.index'));
    }

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <Head title="Create Role" />
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">Create Role</h1>
                            <p className="text-muted-foreground text-center text-sm">Create role with specific permissions</p>
                        </div>
                    </div>
                    <form onSubmit={submitRole} className="flex flex-col gap-6 border-2 border-border rounded-lg p-6">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Role Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Enter role name"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Permissions</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary">Open Permissions</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>{"Permissions"}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {permissions.map((permission) => (
                                            <DropdownMenuCheckboxItem
                                                key={permission.id}
                                                checked={data.permissions.includes(permission)}
                                                onSelect={(e) => e.preventDefault()} // Prevent default behavior
                                                onCheckedChange={(checked) => handleCheckboxChange(permission, checked)}
                                            >
                                                {permission.name}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <InputError message={errors.permissions} />
                            </div>
                            <Separator className="my-4" />
                            <div>
                                <Button
                                    type="submit"
                                    className="mt-4 w-full"
                                    disabled={processing}

                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Create Role
                                </Button>
                                <Button variant="outline" className="mt-4 w-full" onClick={handleCancel} disabled={processing}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}