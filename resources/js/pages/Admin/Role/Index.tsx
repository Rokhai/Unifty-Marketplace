import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import TablePagination from '@/components/table-pagination';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import Show from './Show';
import Edit from './Edit';

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

type Role = {
    id: number;
    name: string;
    permissions: { id: number; name: string }[];
}

type IndexProps = {
    roles: PaginatedResponse<Role>;
    permissions: { id: number; name: string }[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];


export default function Index({ roles, permissions }: IndexProps) {
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isShowDialogOpen, setShowDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);

    // Function to handle showing the role details, and opening the dialog
    // This will set the selected role and open the show dialog
    const handleShow = (role: Role) => {
        setSelectedRole(role);
        setShowDialogOpen(true);
    }

    // Function to handle editing the role
    // This will open the edit dialog with the selected role
    const handleEditRole = (role: Role) => {
        setSelectedRole(role);
        setEditDialogOpen(true);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role" />
            <header>
                <div className='flex max-w-lvw justify-end my-4'>
                    <Button onClick={() => router.get(route('roles.create'))}>
                        Add Role
                    </Button>
                    {/* <Create permissions={permissions} /> */}
                </div>
            </header>
            <main>
                <Table>
                    <TableCaption>
                        Manage roles and their permissions. You can view, edit, and assign permissions to each role.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Permissions</TableHead>
                            <TableHead className='text-right'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roles.data.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell>{role.id}</TableCell>
                                <TableCell>{role.name}</TableCell>
                                <TableCell >
                                    {role.permissions.slice(0, 4).map((permission) => (

                                        <Badge key={permission.id} className='mx-0.5' variant={'secondary'}>
                                            {permission.name}
                                        </Badge>
                                    ))}
                                    {/* Display how many is not display */}
                                    {role.permissions.length > 4 && (
                                        <span className="text-muted-foreground text-sm ml-2">
                                            +{role.permissions.length - 4} more
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className='text-right mr-2'>
                                    <Button className='mr-2' variant={'outline'} onClick={() => handleShow(role)}>
                                        Show
                                    </Button>
                                    <Button variant={'secondary'} onClick={() => handleEditRole(role)}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>


            <footer className='absolute bottom-10 left-0 right-0 flex justify-center'>
                <TablePagination props={roles} />
            </footer>

            {/* Edit selected role  */}
            <Edit
                key="edit-dialog"
                isDialogOpen={isEditDialogOpen}
                setDialogOpen={setEditDialogOpen}
                permissions={permissions}
                selectedRole={selectedRole}
                current_page={roles.current_page}
            />


            {/* Show role & permissions information */}
            <Show
                key="show-dialog"
                isDialogOpen={isShowDialogOpen}
                setDialogOpen={setShowDialogOpen}
                title="Role Details"
                description="View details of the selected role."
            >
                {selectedRole && (
                    <div className="grid gap-4">
                        <div>
                            <strong>Name:</strong> {selectedRole.name}
                        </div>
                        <Separator className="my-4" />
                        <div>
                            <strong>Permissions:</strong>
                            <div>
                                {selectedRole.permissions.map((permission) => (
                                    <Badge key={permission.id} className='mx-0.5' variant={'secondary'}>
                                        {permission.name}
                                    </Badge>
                                ))}
                                {selectedRole.permissions.length === 0 && (
                                    <span className="text-muted-foreground text-sm">
                                        No permissions assigned
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Show>
        </AppLayout>
    );
}
