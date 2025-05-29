import { usePage } from "@inertiajs/react";

export function role(role: string | string[]): boolean {

    const { auth } = (usePage().props as unknown as { auth: { roles: string[] } });

    if (Array.isArray(role)) {
        return role.some(r => auth.roles.includes(r));
    }

    return auth.roles.includes(role);

}