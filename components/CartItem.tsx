import React from 'react';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
    item: CartItemType;
    updateQty: (id: number, delta: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, updateQty }) => {
    return (
        <div className="bg-gray-800/50 p-3 rounded-xl flex items-center gap-3 border border-white/5 shadow-sm">
            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover opacity-80" />
            <div className="flex-1">
                <div className="font-medium text-gray-200">{item.name}</div>
                <div className="text-xs text-gray-400">₹{item.price * item.qty}</div>
            </div>
            <div className="flex items-center bg-gray-900 rounded-lg p-1 border border-white/5">
                <button 
                    onClick={() => updateQty(item.id, -1)} 
                    className="w-8 h-8 flex items-center justify-center text-gray-400 active:text-white hover:bg-gray-800 rounded-md transition-colors"
                >
                    <i className="fas fa-minus text-xs"></i>
                </button>
                <span className="w-6 text-center font-bold text-sm text-gray-200">{item.qty}</span>
                <button 
                    onClick={() => updateQty(item.id, 1)} 
                    className="w-8 h-8 flex items-center justify-center text-gray-400 active:text-white hover:bg-gray-800 rounded-md transition-colors"
                >
                    <i className="fas fa-plus text-xs"></i>
                </button>
            </div>
        </div>
    );
};