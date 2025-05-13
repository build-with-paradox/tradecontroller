"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import ReusableTable from "@/components/ui/ReusableTable";
import Update_Seller_Commission from "@/components/modals-and-popups/Update_Seller_Commission";
import Update_Customer_Commission from "@/components/modals-and-popups/Update_Customer_Commission";

// Define data structure for Seller Commission Rates
type SellerCommission = {
    id: string;
    itemCategory: string;
    commissionRate: string;
    fixedFee: string;
    referralFee: string;
    closingFee: string;
};

type CustomerCommission = {
    id: string;
    itemCategory: string;
    shippingFee: string;
    handlingFee: string;
    salesTax: string;
    giftWrappingFee: string;
};

const Set_Commission_Rates = () => {
    const [selectedCommission, setSelectedCommission] = useState<SellerCommission | null>(null);
    const [activeTab, setActiveTab] = useState<"seller" | "customer">("seller");

    const [selectedConsumerCommission, setSelectedConsumerCommission] = useState<CustomerCommission | null>(null);

    const handleSellerCommissionUpdate = (commission: SellerCommission) => {
        setSelectedCommission(commission);
    };

    const handleCustomerCommissionUpdate = (commission: CustomerCommission) => {
        setSelectedConsumerCommission(commission);
    };

    const closeModal = () => {
        setSelectedCommission(null);
    };

    const closeCustomerModal = () => {
        setSelectedConsumerCommission(null);  // Corrected this line
    };

    // Seller Commission Rate Columns
    const sellerColumns: ColumnDef<SellerCommission>[] = [
        { header: "Item Category", accessorKey: "itemCategory" },
        { header: "Commission Rate", accessorKey: "commissionRate" },
        { header: "Fixed Fee", accessorKey: "fixedFee" },
        { header: "Referral Fee", accessorKey: "referralFee" },
        { header: "Closing Fee", accessorKey: "closingFee" },
        {
            header: "Action",
            cell: ({ row }) => (
                <button
                    className="bg-blue-100 text-blue-700 whitespace-nowrap cursor-pointer py-2 px-4 rounded-full"
                    onClick={() => handleSellerCommissionUpdate(row.original)}
                >
                    Update Seller Commission
                </button>
            ),
        },
    ];

    // Customer Commission Rate Columns
    const customerColumns: ColumnDef<CustomerCommission>[] = [
        { header: "Item Category", accessorKey: "itemCategory" },
        { header: "Shipping Fee", accessorKey: "shippingFee" },
        { header: "Handling Fee", accessorKey: "handlingFee" },
        { header: "Sales Tax", accessorKey: "salesTax" },
        { header: "Gift Wrapping Fee", accessorKey: "giftWrappingFee" },
        {
            header: "Action",
            cell: ({ row }) => (
                <button
                    className="bg-blue-100 text-blue-700 whitespace-nowrap cursor-pointer py-2 px-4 rounded-full"
                    onClick={() => handleCustomerCommissionUpdate(row.original)}
                >
                    Update Commission
                </button>
            ),
        },
    ];

    // Example data for Seller Commission Rates
    const sellerData: SellerCommission[] = [
        { id: "1", itemCategory: "Electronics", commissionRate: "15%", fixedFee: "₹100", referralFee: "₹200", closingFee: "₹50" },
        { id: "2", itemCategory: "Clothing", commissionRate: "20%", fixedFee: "₹150", referralFee: "₹175", closingFee: "₹30" },
        { id: "3", itemCategory: "Books", commissionRate: "10%", fixedFee: "₹30", referralFee: "₹50", closingFee: "₹20" },
        { id: "4", itemCategory: "Home & Kitchen", commissionRate: "12%", fixedFee: "₹50", referralFee: "₹75", closingFee: "₹40" },
        { id: "5", itemCategory: "Health & Beauty", commissionRate: "18%", fixedFee: "₹120", referralFee: "₹150", closingFee: "₹35" },
    ];

    // Example data for Customer Commission Rates
    const customerData: CustomerCommission[] = [
        { id: "1", itemCategory: "Electronics", shippingFee: "₹50", handlingFee: "₹30", salesTax: "10%", giftWrappingFee: "₹20" },
        { id: "2", itemCategory: "Clothing", shippingFee: "₹40", handlingFee: "₹20", salesTax: "8%", giftWrappingFee: "₹15" },
        { id: "3", itemCategory: "Books", shippingFee: "₹30", handlingFee: "₹15", salesTax: "5%", giftWrappingFee: "₹10" },
        { id: "4", itemCategory: "Home & Kitchen", shippingFee: "₹35", handlingFee: "₹18", salesTax: "7%", giftWrappingFee: "₹12" },
    ];

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg justify-center p-4 mt-3 ml-10 mx-4">
            <h1 className="text-2xl font-semibold text-gray-800 ml-3 mt-3">Set Commission Rates</h1>
            <p className="text-base text-gray-600 mt-2 ml-3">
                <span className="text-yellow-600 font-bold">$</span> Set Commission Rates for <span className="text-gray-900 font-semibold">Product selling charge, Delivery charge</span> on your Platform.
            </p>
            {/* Navigation Tabs */}
            <div className="flex space-x-6 border-b border-gray-200 mb-4 mt-3">
                <button
                    onClick={() => setActiveTab("seller")}
                    className={`pb-2 px-4 text-lg font-medium cursor-pointer ${activeTab === "seller" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                        }`}
                >
                    Seller Commission Rates
                </button>
                <button
                    onClick={() => setActiveTab("customer")}
                    className={`pb-2 px-4 text-lg font-medium cursor-pointer ${activeTab === "customer" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                        }`}
                >
                    Customer Commission Rates
                </button>
            </div>

            {/* Table Rendering Based on Active Tab */}
            {activeTab === "seller" ? (
                <ReusableTable columns={sellerColumns} data={sellerData} perpage={3} />
            ) : (
                <ReusableTable columns={customerColumns} data={customerData} perpage={3} />
            )}

            {selectedCommission && (
                <Update_Seller_Commission category={selectedCommission} onClose={closeModal} />
            )}

            {
                selectedConsumerCommission && (
                    <Update_Customer_Commission category={selectedConsumerCommission} onClose={closeCustomerModal} />
                )
            }
        </div>
    );
};

export default Set_Commission_Rates;
