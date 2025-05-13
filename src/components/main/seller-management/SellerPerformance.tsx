"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import ReusableTable from "@/components/ui/ReusableTable";
import CheckSellerReport from "@/components/modals-and-popups/CheckSellerReport";

interface Seller {
    id: number;
    username: string;
    storeName: string;
    status: string;
    totalProducts: number;
    totalRevenue: number;
}

interface ChartData {
    data: number[];
    labels: string[];
}

const sellersData: Seller[] = [
    { id: 1, username: "john_seller", storeName: "John's Store", status: "Active", totalProducts: 50, totalRevenue: 50000 },
    { id: 2, username: "jane_seller", storeName: "Jane's Boutique", status: "Active", totalProducts: 120, totalRevenue: 120000 },
    { id: 3, username: "sam_seller", storeName: "Sam's Electronics", status: "Banned", totalProducts: 30, totalRevenue: 30000 },
    { id: 4, username: "chris_seller", storeName: "Chris's Mart", status: "Active", totalProducts: 75, totalRevenue: 75000 },
];

const SellerPerformance = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
    const [chartData, setChartData] = useState<ChartData | null>(null);

    // Function to open the modal and set selected seller
    const handleOpenModal = (seller: Seller) => {
        setSelectedSeller(seller);
        setChartData({
            data: [seller.totalRevenue / 1000, seller.totalProducts],
            labels: ["Revenue (in thousands)", "Total Products"],
        });
        setIsModalOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSeller(null);
        setChartData(null);
    };

    // Filtering sellers based on search query
    const filteredData = sellersData.filter((seller) =>
        seller.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.storeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Define the columns for the table
    const columns: ColumnDef<Seller>[] = [
        { id: "sno", header: "S.No", cell: (info) => info.row.index + 1 + "." },
        { id: "sellername", header: "Seller Name", cell: (info) => info.row.original.username },
        { id: "storeName", header: "Store Name", cell: (info) => info.row.original.storeName },
        { id: "status", header: "Status", cell: (info) => {
            const status = info.row.original.status;
            return (
                <span className={`px-3 py-2 rounded-full text-sm font-medium ${status === "Active" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-700"}`}>{status}</span>
            );
        }},
        { id: "totalProducts", header: "Total Products", cell: (info) => info.row.original.totalProducts },
        { id: "totalRevenue", header: "Total Revenue", cell: (info) => `$${info.row.original.totalRevenue.toLocaleString()}` },
        { id: "report", header: "Report", cell: (info) => {
            const seller = info.row.original;
            return (
                <button onClick={() => handleOpenModal(seller)} className="px-4 py-2 rounded-full text-xs font-medium cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200">Report</button>
            );
        }},
    ];

    return (
        <>
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mt-10 mx-4">
                <h1 className="text-2xl font-semibold text-gray-800">Sellers Performance</h1>
                <p className="text-base text-gray-600 mt-2">🌟 Dive into the performance metrics of <span className="text-gray-900 font-semibold">All Sellers</span>.</p>

                {/* Search Bar */}
                <div className="mt-5 flex justify-end">
                    <input
                        type="text"
                        placeholder="🔍 Search by Seller username or store name..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="flex-1 bg-white rounded-lg overflow-hidden w-full mt-4">
                    <ReusableTable columns={columns} data={filteredData} perpage={2} />
                </div>
            </div>

            {/* Report Modal */}
            {isModalOpen && selectedSeller && chartData && (
                <CheckSellerReport seller={selectedSeller} onClose={handleCloseModal} chartData={chartData} />
            )}
        </>
    );
};

export default SellerPerformance;
