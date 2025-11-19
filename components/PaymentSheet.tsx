import React from 'react';
import QRCode from 'react-qr-code';
import { ADMIN_UPI, ADMIN_NAME } from '../constants';

interface PaymentSheetProps {
    isOpen: boolean;
    onClose: () => void;
    total: number;
}

export const PaymentSheet: React.FC<PaymentSheetProps> = ({ isOpen, onClose, total }) => {
    if (!isOpen) return null;

    const upiUrl = `upi://pay?pa=${ADMIN_UPI}&pn=${encodeURIComponent(ADMIN_NAME)}&am=${total.toFixed(2)}&cu=INR`;

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center" onClick={onClose}>
            <div 
                className="bg-gray-900 w-full max-w-md rounded-t-3xl p-6 sheet-enter border-t border-white/10 relative max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-6"></div>
                
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Pay ₹{total.toFixed(2)}</h2>
                    <p className="text-gray-400 text-sm">Secure HDFC Gateway</p>
                </div>

                <a 
                    href={upiUrl} 
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-xl text-center font-bold text-lg shadow-lg mb-6 hover:opacity-90 transition active:scale-[0.99] text-white"
                >
                    Pay via UPI App <i className="fas fa-external-link-alt ml-2"></i>
                </a>

                <div className="relative flex py-2 items-center mb-6">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Or Scan QR</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div>

                <div className="bg-white p-4 rounded-xl mx-auto w-fit mb-4 shadow-inner">
                    <div className="w-[160px] h-[160px]">
                         <QRCode
                            value={upiUrl}
                            size={160}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            viewBox={`0 0 160 160`}
                        />
                    </div>
                </div>
                <p className="text-center text-xs text-gray-500 mb-6 font-mono">{ADMIN_UPI}</p>

                <button 
                    onClick={onClose} 
                    className="w-full py-4 rounded-xl font-bold text-gray-400 bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};