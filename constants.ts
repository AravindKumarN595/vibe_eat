

import { MenuItem } from './types';

export const ADMIN_UPI = "9110220118@ibl";
export const ADMIN_NAME = "Canteen Admin";

// If you have a Play Store link, paste it here (e.g., "https://play.google.com/store/apps/details?id=com.vibeeats")
// If left empty, the Share button will share the current App URL (PWA).
export const PLAY_STORE_URL: string = ""; 

export const CATEGORIES = ["All", "Meals", "Drinks", "Snacks"];

export const MENU_ITEMS: MenuItem[] = [
    { id: 1, name: "Masala Dosa", category: "Meals", price: 80, image: "https://picsum.photos/300/300?random=1" },
    { id: 2, name: "Veg Biryani", category: "Meals", price: 150, image: "https://picsum.photos/300/300?random=2" },
    { id: 3, name: "Cold Coffee", category: "Drinks", price: 90, image: "https://picsum.photos/300/300?random=3" },
    { id: 4, name: "Chicken Roll", category: "Meals", price: 120, image: "https://picsum.photos/300/300?random=4" },
    { id: 5, name: "Samosa (2pcs)", category: "Snacks", price: 40, image: "https://picsum.photos/300/300?random=5" },
    { id: 6, name: "Mango Lassi", category: "Drinks", price: 70, image: "https://picsum.photos/300/300?random=6" },
    { id: 7, name: "Cheese Burger", category: "Snacks", price: 110, image: "https://picsum.photos/300/300?random=7" },
    { id: 8, name: "Brownie", category: "Snacks", price: 60, image: "https://picsum.photos/300/300?random=8" },
];