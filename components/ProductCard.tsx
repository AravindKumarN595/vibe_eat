import React from 'react';
import { MenuItem } from '../types';

interface ProductCardProps {
    item: MenuItem;
    onAdd: (item: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, onAdd }) => {
    return (
        <div className="item-card rounded-2xl p-3 flex gap-3 items-center active:scale-[0.98] transition-transform duration-100 shadow-sm hover:shadow-md hover:bg-white/10">
            <img 
                src={item.image} 
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover bg-gray-800" 
                loading="lazy" 
            />
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base truncate text-gray-100">{item.name}</h3>
                <p className="text-xs text-gray-400 mb-1">{item.category}</p>
                <div className="text-purple-400 font-bold">₹{item.price}</div>
            </div>
            <button 
                onClick={() => onAdd(item)}
                className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg active:bg-purple-700 active:scale-90 transition-all"
                aria-label={`Add ${item.name} to cart`}
            >
                <i className="fas fa-plus text-white"></i>
            </button>
        </div>
    );
};