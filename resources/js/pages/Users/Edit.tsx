import { FormEventHandler, useState, useEffect } from 'react';
import { router, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from '@/components/ui/checkbox';
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



type UserForm = {
    id: number; // Assuming you might need an ID for updates
    name: string;
    email: string;
    password: string;
    roles: string[];
}


interface EditProps {
    user: {
        id: number;
        name: string;
        email: string;
        password?: string; // Password may not be provided on edit
        roles: string[];
    } | null;
    roles: string[];
}

export default function Edit({ user, roles }: EditProps)  {

    const [isEditUserDialogOpen, setEditUserDialogOpen] = useState(true);


    const { data, setData, post, processing, errors, reset } = useForm<UserForm>({
        id: 0, // Set ID if user is provided, otherwise default to 0
        name: '',
        email: '',
        password: '',
        roles: [], // Default roles, can be empty or pre-populated
    });

    const handleCheckboxChange = (role: string, checked: boolean | string) => {
        // If checked is 'indeterminate', treat as unchecked (or handle as needed)
        if (checked === true) {
            setData('roles', [...data.roles, role]);
        } else {
            setData('roles', data.roles.filter(r => r !== role));
        }
    }


    const submitUser : FormEventHandler = (e) => {
        e.preventDefault();
        router.patch(route('users.update', user?.id), data, {
            onFinish: () => {
                reset('name', 'email', 'password', 'roles');
                setEditUserDialogOpen(false);
            }
        });
    }

    const handleCloseDialog = () => {
        setEditUserDialogOpen(false);
        router.get(route('users.index'));
    }

    useEffect(() => {
        if (!isEditUserDialogOpen && user) {
            // If the dialog is closed and a user is provided, reset the form data
            reset('name', 'email', 'password', 'roles');
            handleCloseDialog();
        }
        if (isEditUserDialogOpen && user) {
            setData({
                id: user.id || 0, // Ensure ID is set if user exists
                name: user.name || '',
                email: user.email || '',
                password: user.password || '',
                roles: user.roles || [],
            });
        }

    }, [isEditUserDialogOpen, user, setData]);


    return (
        <div>
            <Dialog open={isEditUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
                <DialogTrigger asChild>
                    {/* <Button onClick={onClick}>Edit</Button> */}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Add new user
                        </DialogTitle>
                        <DialogDescription>
                            Enter new user details below.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitUser} className='grid gap-4'>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id='name'
                                    type='text'
                                    name='name'
                                    required
                                    autoFocus
                                    autoComplete='name'
                                    tabIndex={1}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder='Enter name'

                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    name='email'
                                    required
                                    autoComplete='email'
                                    tabIndex={2}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder='Enter email'

                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id='password'
                                    type='password'
                                    name='password'
                                    autoComplete='password'
                                    tabIndex={3}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder='Enter password'

                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='roles'>Roles</Label>
                                {roles.map((role) =>
                                    <div key={role}>

                                        <Checkbox
                                            id={role}

                                            name='roles'
                                            value={role}
                                            checked={data.roles.includes(role)}
                                            onCheckedChange={(checked) => handleCheckboxChange(role, checked)}
                                            tabIndex={4}
                                            disabled={processing}
                                        />
                                        <Label htmlFor={role} className='ml-2'>{role}</Label>
                                    </div>

                                )}
                                <InputError message={errors.roles} className="mt-2" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={processing}>{processing && (<LoaderCircle className="h-4 w-4 animate-spin" />)} Update</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    );
}