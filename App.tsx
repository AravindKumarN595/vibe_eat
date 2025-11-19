
import React, { useState, useMemo, useEffect } from 'react';
import { MENU_ITEMS, CATEGORIES, PLAY_STORE_URL } from './constants';
import { MenuItem, CartItem as CartItemType, Tab } from './types';
import { ProductCard } from './components/ProductCard';
import { CartItem } from './components/CartItem';
import { PaymentSheet } from './components/PaymentSheet';
import { BottomNav } from './components/BottomNav';
import { InstallSheet } from './components/InstallSheet';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>("home");
    const [cart, setCart] = useState<CartItemType[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [isPaymentOpen, setPaymentOpen] = useState(false);
    
    // Fixed: Added missing state variables
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isInstallSheetOpen, setInstallSheetOpen] = useState(false);

    // Capture install prompt on mount
    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = () => {
        // Fixed: Check deferredPrompt state, not the setter
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    setDeferredPrompt(null);
                }
            });
        } else {
            setInstallSheetOpen(true);
        }
    };

    const handleShare = async () => {
        // Determine which URL to share: Play Store (if config exists) or current PWA URL
        const urlToShare = PLAY_STORE_URL 
            ? PLAY_STORE_URL 
            : window.location.href;

        const shareData = {
            title: 'VibeEats',
            text: 'Order food from VibeEats!',
            url: urlToShare,
        };

        // 1. Try Native Share
        if (navigator.share) {
            try {
                // Check protocol to avoid "Invalid URL" error on some environments
                if (urlToShare.startsWith('http') || urlToShare.startsWith('https')) {
                    await navigator.share(shareData);
                    return; // Success
                }
            } catch (err) {
                console.log("Native share dismissed or failed, trying fallback...", err);
            }
        }

        // 2. Fallback: Clipboard
        try {
            await navigator.clipboard.writeText(urlToShare);
            alert(`Link copied to clipboard!\n${urlToShare}`);
        } catch (err) {
            // 3. Fallback: Manual Copy Prompt (Last resort)
            console.error("Clipboard failed", err);
            prompt("Copy this link to share:", urlToShare);
        }
    };

    const filteredItems = useMemo(() => MENU_ITEMS.filter(i => 
        (category === "All" || i.category === category) && 
        i.name.toLowerCase().includes(search.toLowerCase())
    ), [category, search]);

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...item, qty: 1 }];
        });

        // Simple Haptic Visual Feedback
        const badge = document.getElementById('cart-badge');
        if (badge) {
            badge.classList.add('scale-150');
            setTimeout(() => badge.classList.remove('scale-150'), 200);
        }
    };

    const updateQty = (id: number, delta: number) => {
        setCart(prev => prev.map(i => 
            i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i
        ).filter(i => i.qty > 0));
    };

    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    const finalTotal = total + (total * 0.05); // 5% Tax

    return (
        <div className="h-full flex flex-col max-w-md mx-auto bg-gray-900 relative shadow-2xl overflow-hidden border-x border-gray-800">
            
            {/* HEADER (Only on Home) */}
            {activeTab === 'home' && (
                <div className="pt-12 pb-4 px-5 bg-gray-900/90 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-white">
                                Vibe<span className="text-purple-500">Eats</span>
                            </h1>
                            <p className="text-xs text-gray-400">Hi, Student 👋</p>
                        </div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center border border-white/10 shadow-sm">
                            <i className="fas fa-bell text-xs text-gray-400"></i>
                        </div>
                    </div>
                    
                    {/* Search */}
                    <div className="relative group">
                        <i className="fas fa-search absolute left-4 top-3.5 text-gray-500 text-sm group-focus-within:text-purple-500 transition-colors"></i>
                        <input 
                            type="text" 
                            placeholder="Search hungry mode..." 
                            className="w-full bg-gray-800/50 text-white pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-transparent focus:border-purple-500/30 transition-all placeholder-gray-600"
                            onChange={e => setSearch(e.target.value)}
                            value={search}
                        />
                    </div>
                </div>
            )}

            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-24 scroll-smooth">
                
                {/* HOME TAB */}
                {activeTab === 'home' && (
                    <div className="p-5">
                        {/* Categories */}
                        <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 pb-2">
                            {CATEGORIES.map(c => (
                                <button 
                                    key={c} 
                                    onClick={() => setCategory(c)}
                                    className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${category === c ? 'bg-white text-black shadow-lg scale-105' : 'bg-gray-800 text-gray-400 border border-white/5 hover:bg-gray-700'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>

                        {/* Grid */}
                        {filteredItems.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {filteredItems.map(item => (
                                    <ProductCard key={item.id} item={item} onAdd={addToCart} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 opacity-50">
                                <i className="fas fa-search text-4xl mb-4 text-gray-600"></i>
                                <p>No items found</p>
                            </div>
                        )}
                        <div className="h-20"></div> {/* Spacer */}
                    </div>
                )}

                {/* CART TAB */}
                {activeTab === 'cart' && (
                    <div className="p-5 pt-12 animate-fadeIn">
                        <h2 className="text-2xl font-bold mb-6 text-white">Your Tray</h2>
                        {cart.length === 0 ? (
                            <div className="text-center py-20 opacity-50 flex flex-col items-center">
                                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                    <i className="fas fa-shopping-basket text-3xl text-gray-600"></i>
                                </div>
                                <p className="text-gray-400">Hungry? Add items!</p>
                                <button 
                                    onClick={() => setActiveTab('home')} 
                                    className="mt-4 text-purple-400 font-bold text-sm hover:text-purple-300 transition-colors"
                                >
                                    Go to Menu
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {cart.map(i => <CartItem key={i.id} item={i} updateQty={updateQty} />)}
                                
                                <div className="bg-gray-800/50 p-4 rounded-xl mt-6 border border-white/5 space-y-2 shadow-sm">
                                    <div className="flex justify-between text-sm text-gray-400">
                                        <span>Item Total</span>
                                        <span>₹{total}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-400">
                                        <span>Tax (5%)</span>
                                        <span>₹{(total * 0.05).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                                        <span className="text-gray-200">To Pay</span>
                                        <span className="text-green-400">₹{finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setPaymentOpen(true)}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg mt-4 active:scale-[0.98] transition-all hover:shadow-purple-500/20 hover:shadow-xl"
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                    <div className="p-5 pt-12 text-center animate-fadeIn">
                        <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden border-4 border-gray-800 shadow-xl">
                            <img src="https://picsum.photos/200/200?random=99" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Student User</h2>
                        <p className="text-gray-400 text-sm mb-8">+91 98765 43210</p>
                        
                        <div className="bg-gray-800 rounded-xl overflow-hidden text-left border border-white/5 shadow-sm">
                            
                            {/* INSTALL APP BUTTON */}
                            <button 
                                onClick={handleInstallClick}
                                className="w-full p-4 border-b border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors group"
                            >
                                <span className="text-purple-400 font-medium group-hover:text-purple-300 transition-colors">Install App</span>
                                <i className="fas fa-download text-purple-400 group-hover:text-purple-300 transition-colors"></i>
                            </button>

                             {/* SHARE APP BUTTON */}
                             <button 
                                onClick={handleShare}
                                className="w-full p-4 border-b border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors group"
                            >
                                <span className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors">Share App Link</span>
                                <i className="fas fa-share-alt text-blue-400 group-hover:text-blue-300 transition-colors"></i>
                            </button>

                            <button className="w-full p-4 border-b border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors">
                                <span className="text-gray-300">Previous Orders</span>
                                <i className="fas fa-chevron-right text-xs text-gray-500"></i>
                            </button>
                            <button className="w-full p-4 border-b border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors">
                                <span className="text-gray-300">Help & Support</span>
                                <i className="fas fa-chevron-right text-xs text-gray-500"></i>
                            </button>
                            <button className="w-full p-4 text-red-400 flex justify-between items-center hover:bg-red-500/10 transition-colors">
                                <span>Logout</span>
                                <i className="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* BOTTOM NAVIGATION */}
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cart.length} />

            {/* PAYMENT MODAL */}
            <PaymentSheet 
                isOpen={isPaymentOpen} 
                onClose={() => setPaymentOpen(false)} 
                total={finalTotal} 
            />

            {/* INSTALL INSTRUCTIONS SHEET */}
            <InstallSheet
                isOpen={isInstallSheetOpen}
                onClose={() => setInstallSheetOpen(false)}
            />
            
        </div>
    );
};

export default App;
