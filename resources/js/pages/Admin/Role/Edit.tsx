import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from '@radix-ui/react-dropdown-menu';
import { Button } from "@/components/ui/button";
import InputError from '@/components/input-error';
import { useForm, router } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import { LoaderCircle } from "lucide-react";


type RoleForm = {
    permissions: { id: number; name: string }[];
    current_page: number; // Assuming you want to keep track of the current page
}

type EditProps = {
   
    isDialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    permissions: { id: number; name: string }[]; // Assuming permissions are objects with id and name
    selectedRole: {
        id: number;
        name: string,
        permissions: RoleForm['permissions'];
    } | null; // Assuming selectedRole is an object with id and name
    current_page?: number; // Optional, if you want to keep track of the current page
}


export default function Edit({  isDialogOpen, setDialogOpen, permissions, selectedRole, current_page }: EditProps) {
    const { data, setData, patch, processing, errors, reset } = useForm<RoleForm>({
        permissions:  [], // Default can be empty or pre-populated
        current_page: current_page || 1, // Assuming you want to keep track of the current page
    });

    // function to handle checkbox changes for permissions
    const handlePermissionsCheckboxChange = (permission: { id: number; name: string }, checked: boolean | string) => {
        if (checked === true) {
            setData('permissions', [...data.permissions, permission]);
        } else {
            setData('permissions', data.permissions.filter(p => p.id !== permission.id));
        }
    }

    // function to submit the form for editing the role
    const submitEditRole = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('roles.update', selectedRole?.id), {
            onFinish: () => {
                reset('permissions');
                setDialogOpen(false);
            }
        });
    }

    // set the permissions in the form data when the selected role changes 
    useEffect(() => {
        if (selectedRole?.permissions) {
            setData('permissions', selectedRole.permissions);
        }
    }, [selectedRole]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Role</DialogTitle>
                    <DialogDescription>
                        Edit the selected role's details and permissions.
                    </DialogDescription>
                </DialogHeader>
                {selectedRole && (
                    <form className="grid gap-4" onSubmit={submitEditRole}>

                        <div className='grid gap-2'>
                            <Label className='text-muted-foreground'>Role Name</Label>
                            <div >
                                {selectedRole.name}
                            </div>


                        </div>
                        <div className='grid gap-2'>
                            <Label className='text-muted-foreground'>Permissions</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary">Select Permissions</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>{"Permissions"}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {permissions.map((permission) => (
                                        <DropdownMenuCheckboxItem
                                            key={permission.id}
                                            onSelect={(e) => e.preventDefault()} // Prevent default behavior
                                            checked={data.permissions.some((p) => p.id == permission.id)} // Check if permission is selected
                                            onCheckedChange={(checked) => {
                                                handlePermissionsCheckboxChange(permission, checked);
                                            }}
                                        >
                                            {permission.name}
                                        </DropdownMenuCheckboxItem>

                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <InputError message={errors.permissions} className="mt-2" />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={processing}> {processing && (<LoaderCircle className="h-4 w-4 animate-spin" />)} Save Changes</Button>
                            <DialogClose asChild onClick={() => {
                                reset('permissions');
                                setDialogOpen(false);
                            }}>
                                <Button variant="secondary">Cancel</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}