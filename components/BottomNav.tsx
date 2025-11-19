import React from 'react';
import { Tab } from '../types';

interface BottomNavProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, cartCount }) => {
    return (
        <div className="glass-nav absolute bottom-0 w-full pb-8 pt-4 px-8 flex justify-between items-end z-30 max-w-md">
            <button 
                onClick={() => setActiveTab('home')} 
                className={`flex flex-col items-center gap-1 transition-colors duration-200 ${activeTab === 'home' ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
                <i className="fas fa-home text-xl"></i>
                <span className="text-[10px] font-medium">Home</span>
            </button>
            
            <button 
                onClick={() => setActiveTab('cart')} 
                className={`flex flex-col items-center gap-1 relative transition-colors duration-200 ${activeTab === 'cart' ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
                <div className="relative">
                    <i className="fas fa-shopping-bag text-xl"></i>
                    {cartCount > 0 && (
                        <span 
                            id="cart-badge" 
                            className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-transform animate-pulse"
                        >
                            {cartCount}
                        </span>
                    )}
                </div>
                <span className="text-[10px] font-medium">Cart</span>
            </button>
            
            <button 
                onClick={() => setActiveTab('profile')} 
                className={`flex flex-col items-center gap-1 transition-colors duration-200 ${activeTab === 'profile' ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
                <i className="fas fa-user text-xl"></i>
                <span className="text-[10px] font-medium">Profile</span>
            </button>
        </div>
    );
};