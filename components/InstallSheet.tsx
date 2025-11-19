
import React from 'react';
import { PLAY_STORE_URL } from '../constants';

interface InstallSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export const InstallSheet: React.FC<InstallSheetProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center" onClick={onClose}>
            <div 
                className="bg-gray-900 w-full max-w-md rounded-t-3xl p-6 sheet-enter border-t border-white/10 relative max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-6"></div>
                
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gray-800 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg border border-white/5">
                        <i className="fas fa-mobile-alt text-3xl text-purple-500"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Install VibeEats</h2>
                    <p className="text-gray-400 text-sm mt-1">Open this website on your phone's browser (Chrome/Safari) to install.</p>
                </div>

                {/* Mock Google Play Button for visual appeal (or functional if URL provided) */}
                <a 
                    href={PLAY_STORE_URL || "#"}
                    onClick={(e) => { if(!PLAY_STORE_URL) e.preventDefault(); }}
                    className={`block w-full bg-[#303030] border border-white/10 py-3 rounded-xl mb-6 flex items-center justify-center gap-3 transition-all ${!PLAY_STORE_URL ? 'opacity-50 cursor-default' : 'active:scale-95 hover:bg-[#3a3a3a]'}`}
                >
                    <i className="fab fa-google-play text-xl text-green-400"></i>
                    <div className="text-left leading-tight">
                        <div className="text-[10px] text-gray-400 uppercase font-bold">Get it on</div>
                        <div className="text-sm font-bold text-white">Google Play</div>
                    </div>
                </a>

                <div className="space-y-4 mb-8">
                    {/* Android Instructions */}
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <i className="fab fa-android text-xl text-green-400"></i>
                            <h3 className="font-bold text-gray-200">Android (Chrome)</h3>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">This creates a native-feeling app on your device.</p>
                        <ol className="list-decimal list-inside text-sm text-gray-400 space-y-2 ml-1">
                            <li>Tap the <strong className="text-white">Menu</strong> button <i className="fas fa-ellipsis-v mx-1"></i> (three dots).</li>
                            <li>Select <strong className="text-white">Install App</strong> or <strong className="text-white">Add to Home screen</strong>.</li>
                            <li>Confirm by clicking <strong className="text-white">Install</strong>.</li>
                        </ol>
                    </div>

                    {/* iOS Instructions */}
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <i className="fab fa-apple text-xl text-gray-300"></i>
                            <h3 className="font-bold text-gray-200">iOS (iPhone/iPad)</h3>
                        </div>
                        <ol className="list-decimal list-inside text-sm text-gray-400 space-y-2 ml-1">
                            <li>Tap the <strong className="text-white">Share</strong> button <i className="fas fa-share-from-square mx-1"></i> in Safari.</li>
                            <li>Scroll down and tap <strong className="text-white">Add to Home Screen</strong> <i className="fas fa-plus-square mx-1"></i>.</li>
                            <li>Tap <strong className="text-white">Add</strong> in the top right corner.</li>
                        </ol>
                    </div>
                </div>

                <button 
                    onClick={onClose} 
                    className="w-full py-4 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg"
                >
                    Got it
                </button>
            </div>
        </div>
    );
};
