import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
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
import { LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FormEventHandler, useState } from 'react';
import { useForm } from "@inertiajs/react";

type UserForm = {
    name: string;
    email: string;
    password: string;
    roles: string[];
}

interface CreateProps {
    roles: string[];
}

export default function Create({ roles }: CreateProps) {
    const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<UserForm>({
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


    const submitUser: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onFinish: () => {
                reset('name', 'email', 'password', 'roles');
                setAddUserDialogOpen(false);
            }
        });
    }


    return (
        <Dialog open={isAddUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
            <DialogTrigger asChild>
                <Button>Add User</Button>
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
                                required
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
                                        // checked={data.roles.includes(role)}
                                        // checked={data.roles.includes(role)}
                                        // onChange={(e) => handleCheckboxChange(role, (e.target as HTMLInputElement).checked)}
                                        onCheckedChange={(checked) => handleCheckboxChange(role, checked)}

                                        tabIndex={4}
                                        disabled={processing}
                                    />
                                    <Label htmlFor={role} className='ml-2'>{role}</Label>
                                </div>

                            )}
                            <InputError message={errors.roles} className="mt-2" />
                        </div>

                        {/* <div className='grid gap-2'>
                                        <Label htmlFor='roles'>Roles</Label>
                                        {roles.map((r) => (
                                            <label key={r} className='inline-flex items-center space-x-2'>
                                                <input type='checkbox' name='roles' value={r} />
                                                <span>{r}</span>
                                            </label>
                                        ))}
                                    </div> */}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>{processing && (<LoaderCircle className="h-4 w-4 animate-spin" />)} Create</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );

}