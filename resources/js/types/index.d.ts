import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    role?: string | string[]; // Role(s) required to access this item
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    // role?: string | string; // role of the user, e.g., 'admin', 'user', etc.
    [key: string]: unknown; // This allows for additional properties...
}

// This interface represents a product in the marketplace.
export interface Product {
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