export interface MenuItem {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
}

export interface CartItem extends MenuItem {
    qty: number;
}

export type Tab = 'home' | 'cart' | 'profile';