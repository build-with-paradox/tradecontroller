"use client";

import { UpdateStripeAccountPopup } from '@/components/modals-and-popups/UpdateStripeAccount';
import React, { useState } from 'react';

const Payment_Gateways: React.FC = () => {
    // Fake card data for testing
    const cardNumber = "acct_1I6O5dG6qB5Q2W";  
    const cardHolderName = "Prashant Bhatt"; 

    const [isOpenUpdateStripe, setIsOpenUpdateStripe] = useState(false);

    return (
        <>
            <div className="bg-white shadow-md border border-gray-200 rounded-lg justify-center p-4 mt-16 ml-16 mx-4">
            <h1 className="text-2xl font-semibold text-gray-800 ml-3 mt-3">Payment Gateway - Stripe</h1>
<p className="text-base text-gray-600 mt-2 ml-3">
    <span className="text-yellow-600 font-bold">$</span> Set up your <span className="text-gray-900 font-semibold">Stripe</span> account to easily accept payments and manage transactions securely on your platform.
</p>

                {/* Stripe CARD */}
                <div className="ml-24 mb-3 mt-10 relative w-full max-w-sm bg-gradient-to-r from-gray-800 via-gray-700 to-zinc-950 text-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <h3 className="text-base font-bold tracking-wider uppercase">Stripe</h3>
                            <p className="text-lg font-mono mt-2 tracking-widest text-gray-400">
                                <span className="metallic-text">{cardNumber}</span>
                            </p>
                        </div>
                        <img
                            className="w-16 h-12 -mt-10"
                            src="/assets/stripe_logo.png"
                            alt="Stripe Logo"
                        />
                    </div>
                    <div className="relative z-10 mt-6">
                        <p className="text-xs uppercase tracking-wide text-gray-400">Card holder Name: {cardHolderName}</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-600 opacity-20 rounded-2xl z-0"></div>

                    {/* Update Button */}
                    <button
                        className="relative z-20 w-full mt-4 py-2 bg-white text-gray-800 rounded-full shadow hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                        onClick={() => setIsOpenUpdateStripe(true)}
                    >
                        Update Wallet Info
                    </button>
                </div>
{/* Stripe Card end */}
                {isOpenUpdateStripe && (
                    <UpdateStripeAccountPopup onClose={() => setIsOpenUpdateStripe(false)} stripeAccountNumber={cardNumber} />
                )}

            </div>
        </>
    );
};

export default Payment_Gateways;
