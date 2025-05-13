"use client";

import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface CategoryDetail {
    id: string;
    itemCategory: string;
    commissionRate: string;
    fixedFee: string;
    referralFee: string;
    closingFee: string;
}

interface SellerCommissionProps {
    category: CategoryDetail;
    onClose: () => void;
}

const Update_Seller_Commission: React.FC<SellerCommissionProps> = ({ category, onClose }) => {
    const [commissionRate, setCommissionRate] = useState<string>('');
    const [fixedFee, setFixedFee] = useState<string>('');
    const [referralFee, setReferralFee] = useState<string>('');
    const [closingFee, setClosingFee] = useState<string>('');

    // Function to clean the input and extract only numeric values
    const cleanInput = (input: string): string => {
        return input.replace(/[^\d.]/g, ''); // Remove anything that isn't a number or a decimal point
    };

    // On component mount, clean and set the initial values from props
    useEffect(() => {
        setCommissionRate(cleanInput(category.commissionRate));
        setFixedFee(cleanInput(category.fixedFee));
        setReferralFee(cleanInput(category.referralFee));
        setClosingFee(cleanInput(category.closingFee));
    }, [category]);

    // Handle changes in input fields to ensure only numbers are entered
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const value = e.target.value.replace(/[^\d.]/g, ''); // Remove any non-numeric characters
        setter(value);
    };

    // Handle Save Changes logic
    const handleSaveChanges = () => {
        // Convert string values to numbers
        const commissionRateNum = parseFloat(commissionRate);
        const fixedFeeNum = parseFloat(fixedFee);
        const referralFeeNum = parseFloat(referralFee);
        const closingFeeNum = parseFloat(closingFee);

        // Validate that all fields are valid numbers
        if (isNaN(commissionRateNum) || isNaN(fixedFeeNum) || isNaN(referralFeeNum) || isNaN(closingFeeNum)) {
            alert("Please enter valid numeric values.");
            return;
        }

        // Proceed with sending the data to the backend
        const updatedCategory = {
            ...category,
            commissionRate: commissionRateNum,
            fixedFee: fixedFeeNum,
            referralFee: referralFeeNum,
            closingFee: closingFeeNum,
        };

        // Replace the below line with your actual API call
        console.log("Sending updated category to backend:", updatedCategory);

        // Close the modal after saving changes
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50 p-4 ml-[16rem]">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-[600px] md:w-[700px] transform transition-all ease-out duration-300">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                    <AiOutlineClose size={24} />
                </button>
                <h1 className="text-3xl font-semibold text-gray-800">Set Commission Rates</h1>
                <p className="text-base text-gray-600 mt-2">
                    🌟 Order Details for <span className="text-gray-900 font-semibold">{category.itemCategory}</span>.
                </p>

                {/* Commission Fields */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="commissionRate" className="text-gray-700 block mb-2">Commission Rate</label>
                        <input 
                            id="commissionRate"
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={commissionRate} 
                            onChange={(e) => handleInputChange(e, setCommissionRate)}
                        />
                    </div>
                    <div>
                        <label htmlFor="fixedFee" className="text-gray-700 block mb-2">Fixed Fee</label>
                        <input 
                            id="fixedFee"
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={fixedFee} 
                            onChange={(e) => handleInputChange(e, setFixedFee)}
                        />
                    </div>
                    <div>
                        <label htmlFor="referralFee" className="text-gray-700 block mb-2">Referral Fee</label>
                        <input 
                            id="referralFee"
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={referralFee} 
                            onChange={(e) => handleInputChange(e, setReferralFee)}
                        />
                    </div>
                    <div>
                        <label htmlFor="closingFee" className="text-gray-700 block mb-2">Closing Fee</label>
                        <input 
                            id="closingFee"
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={closingFee} 
                            onChange={(e) => handleInputChange(e, setClosingFee)}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-300 rounded-full text-gray-700 cursor-pointer transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSaveChanges}
                        className="px-6 py-2 bg-blue-200 text-blue-700 rounded-full cursor-pointer transition-colors duration-200"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Update_Seller_Commission;
