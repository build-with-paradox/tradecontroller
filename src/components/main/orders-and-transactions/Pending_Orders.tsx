"use client";

import React, { useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import ReusableTable from "@/components/ui/ReusableTable";
import { OrderInterface } from '@/types/OrderTypes';
import OrderDetails from '@/components/modals-and-popups/Order_details';

// Fake data for pending orders
const pendingOrders = [
    {
        id: 1,
        order_id: "ORD98765",
        username: "mike_jones",
        email: "mike@example.com",
        payment: "Pending",
        payment_type: "Cash",
        product_count: 2,
        total_amount: 75.50,
        storeName: "Mike's Fashion Store",
        totalRevenue: 300.00,
        orderDetails: [
            {
                id: 1,
                product: "Men's Leather Wallet",
                image: "https://m.media-amazon.com/images/I/71HfJ1+xYXL._SX569_.jpg",
                description: "Premium quality leather wallet with multiple compartments.",
                color: "Brown",
                qty: 1,
                price: 45.50,
                total: 45.50
            },
            {
                id: 2,
                product: "Sunglasses",
                image: "https://m.media-amazon.com/images/I/51eLh3o3GqL._SX679_.jpg",
                description: "Polarized sunglasses with UV protection.",
                color: "Black",
                qty: 1,
                price: 30.00,
                total: 30.00
            }
        ]
    },
    {
        id: 2,
        order_id: "ORD98766",
        username: "sarah_connor",
        email: "sarah@example.com",
        payment: "Pending",
        payment_type: "Cash",
        product_count: 1,
        total_amount: 120.00,
        storeName: "Sarah's Beauty Essentials",
        totalRevenue: 500.00,
        orderDetails: [
            {
                id: 1,
                product: "Luxury Perfume",
                image: "https://m.media-amazon.com/images/I/71J2QnBkwSL._SY679_.jpg",
                description: "Long-lasting fragrance with floral and woody notes.",
                color: "N/A",
                qty: 1,
                price: 120.00,
                total: 120.00
            }
        ]
    }
];

const Pending_Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(null);
    const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = pendingOrders.filter(
        (order) =>
            order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCloseOrderDetail = () => {
        setIsOrderDetailOpen(false);
        setSelectedOrder(null);
    };

    const columns: ColumnDef<typeof pendingOrders[0]>[] = [
        { id: "username", header: "Username", cell: (info) => info.row.original.username },
        { id: "email", header: "Email", cell: (info) => info.row.original.email },
        {
            id: "payment",
            header: "Payment",
            cell: (info) => (
                <div className="inline-block px-4 py-2 whitespace-nowrap rounded-full text-xs font-medium bg-red-200 text-red-800">
                    {info.row.original.payment}
                </div>
            ),
        },
        {
            id: "payment_type",
            header: "Payment Type",
            cell: (info) => {
                const paymentType = info.row.original.payment_type;

                let cloudStyle = "px-4 py-2 rounded-full text-sm font-medium ";
                let cloudColor = "";

                if (paymentType === "Card") {
                    cloudColor = "bg-green-200 text-green-800";
                } else if (paymentType === "Cash") {
                    cloudColor = "bg-yellow-200 text-yellow-800";
                } else if (paymentType === "PayPal" || "GPay" || "Paytm" || "Apple Pay") {
                    cloudColor = "bg-blue-200 text-blue-800";
                }

                return (
                    <div className={`inline-block whitespace-nowrap ${cloudStyle} ${cloudColor}`}>
                        {paymentType}
                    </div>
                );
            },
        },
        { id: "product_count", header: "Product Count", cell: (info) => info.row.original.product_count },
        { id: "total_amount", header: "Total Amount", cell: (info) => `₹${info.row.original.total_amount.toFixed(2)}` },
        {
            id: "orderDetail",
            header: "Order Detail",
            cell: (info) => (
                <button
                    onClick={() => handleOrderDetailClick(info.row.original)}
                    className="bg-blue-100 text-blue-700 text-sm py-1 px-2 rounded-full whitespace-nowrap cursor-pointer"
                >
                    Order Detail
                </button>
            ),
        },
    ];

    const handleOrderDetailClick = (order: OrderInterface) => {
        setSelectedOrder(order);
        setIsOrderDetailOpen(true);
    };

    return (
        <>
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-4 ml-3">
                <h1 className="text-xl font-semibold text-gray-800">⏳ Pending Orders</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Here's a snapshot of <span className="text-gray-900 font-semibold">⏳ Pending Orders</span> 📦 with 🆔 order ID, 💳 payment status, 🏷️ payment type, 📦 product count, and 💰 total amount.
                </p>

                {/* Search Box */}
                <div className="mt-5 flex w-full">
                    <input
                        type="text"
                        placeholder="🔍 Search by username or email..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="flex-1 max-w-full mt-4 overflow-x-auto">
                    <ReusableTable columns={columns} data={filteredOrders} perpage={2} />
                </div>
            </div>

            {/* OrderDetails Popup */}
            {isOrderDetailOpen && selectedOrder && (
                <OrderDetails
                    order={selectedOrder}
                    onClose={handleCloseOrderDetail}
                    chartData={{ data: [50, 50], labels: ['Product 1', 'Product 2'] }}
                />
            )}
        </>
    );
};

export default Pending_Orders;
