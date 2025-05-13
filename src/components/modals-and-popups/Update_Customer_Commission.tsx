import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface CategoryDetail {
    id: string;
    itemCategory: string;
    shippingFee: string;
    handlingFee: string;
    salesTax: string;
    giftWrappingFee: string;
}

interface CustomerCommissionProps {
    category: CategoryDetail;
    onClose: () => void;
}

const Update_Customer_Commission: React.FC<CustomerCommissionProps> = ({ category, onClose }) => {
    const [shippingFee, setShippingFee] = useState<string>('');
    const [handlingFee, setHandlingFee] = useState<string>('');
    const [salesTax, setSalesTax] = useState<string>('');
    const [giftWrappingFee, setGiftWrappingFee] = useState<string>('');

    const cleanInput = (input: string): string => {
        return input.replace(/[^\d.]/g, '');
    };

    useEffect(() => {
        setShippingFee(cleanInput(category.shippingFee));
        setHandlingFee(cleanInput(category.handlingFee));
        setSalesTax(cleanInput(category.salesTax));
        setGiftWrappingFee(cleanInput(category.giftWrappingFee));
    }, [category]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const value = e.target.value.replace(/[^\d.]/g, '');
        setter(value);
    };

    const handleSaveChanges = () => {
        const shippingFeeNum = parseFloat(shippingFee);
        const handlingFeeNum = parseFloat(handlingFee);
        const salesTaxNum = parseFloat(salesTax);
        const giftWrappingFeeNum = parseFloat(giftWrappingFee);

        if (isNaN(shippingFeeNum) || isNaN(handlingFeeNum) || isNaN(salesTaxNum) || isNaN(giftWrappingFeeNum)) {
            alert("Please enter valid numeric values.");
            return;
        }

        alert("Customer commission updated successfully!");
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50 p-4 ml-[16rem]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Update Customer Commission</h2>
                    <AiOutlineClose className="text-xl cursor-pointer" onClick={onClose} />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="block text-gray-700">Shipping Fee</label>
                            <input
                                type="text"
                                value={shippingFee}
                                onChange={(e) => handleInputChange(e, setShippingFee)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-gray-700">Handling Fee</label>
                            <input
                                type="text"
                                value={handlingFee}
                                onChange={(e) => handleInputChange(e, setHandlingFee)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="block text-gray-700">Sales Tax</label>
                            <input
                                type="text"
                                value={salesTax}
                                onChange={(e) => handleInputChange(e, setSalesTax)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-gray-700">Gift Wrapping Fee</label>
                            <input
                                type="text"
                                value={giftWrappingFee}
                                onChange={(e) => handleInputChange(e, setGiftWrappingFee)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <button
                        className="w-full py-2 px-4 bg-blue-200 text-blue-600 rounded-full"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Update_Customer_Commission;
