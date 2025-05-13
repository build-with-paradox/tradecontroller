"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import ReusableTable from "@/components/ui/ReusableTable";
import { CancelOrderInterface } from "@/types/OrderTypes";
import CancelOrderDetails from "@/components/modals-and-popups/Cancel_Order_details";

// Fake cancelled orders data
const cancelledOrders: CancelOrderInterface[] = [
    {
        id: 1,
        order_id: "ORD12345",
        username: "john_doe",
        email: "john@example.com",
        payment: "Refunded",
        payment_type: "Card",
        product_count: 2,
        total_amount: 100.00,
        storeName: "John's Tech Store",
        cancelOrderDetails: [
            {
                id: 1,
                product: "Wireless Mouse",
                image: "https://m.media-amazon.com/images/I/71HfJ1+xYXL._SX569_.jpg",
                description: "Ergonomic wireless mouse with fast scrolling.",
                color: "Black",
                qty: 1,
                price: 50.00,
                total: 50.00
            },
            {
                id: 2,
                product: "Mechanical Keyboard",
                image: "https://m.media-amazon.com/images/I/51eLh3o3GqL._SX679_.jpg",
                description: "RGB mechanical keyboard with brown switches.",
                color: "Black",
                qty: 1,
                price: 50.00,
                total: 50.00
            }
        ]
    },
    {
        id: 2,
        order_id: "ORD12346",
        username: "emma_smith",
        email: "emma@example.com",
        payment: "Cancelled",
        payment_type: "PayPal",
        product_count: 1,
        total_amount: 80.00,
        storeName: "Emma's Fashion Hub",
        cancelOrderDetails: [
            {
                id: 1,
                product: "Women's Handbag",
                image: "https://m.media-amazon.com/images/I/71J2QnBkwSL._SY679_.jpg",
                description: "Stylish leather handbag with multiple compartments.",
                color: "Brown",
                qty: 1,
                price: 80.00,
                total: 80.00
            }
        ]
    }
];

const Cancelled_Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState<CancelOrderInterface | null>(null);
    const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
        key: "order_id",
        direction: "asc",
    });

    const handleSort = (key: string) => {
        setSortConfig((prevSortConfig) => {
            const direction = prevSortConfig.key === key && prevSortConfig.direction === "asc" ? "desc" : "asc";
            return { key, direction };
        });
    };

    const sortedOrders = [...cancelledOrders].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof CancelOrderInterface];
        const bValue = b[sortConfig.key as keyof CancelOrderInterface];

        if (aValue < bValue) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    const filteredOrders = sortedOrders.filter(
        (order) => order.order_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCloseOrderDetail = () => {
        setIsOrderDetailOpen(false);
        setSelectedOrder(null);
    };

    const handleOrderDetailClick = (order: CancelOrderInterface) => {
        setSelectedOrder(order);
        setIsOrderDetailOpen(true);
    };

    const handleRefund = (order: CancelOrderInterface) => {
        if (order.payment === "Refunded") return;
        alert(`Refund processed for order: ${order.order_id}`);
        order.payment = "Refunded"; // Updating status in UI
    };

    const columns: ColumnDef<CancelOrderInterface>[] = [
        { 
            id: "order_id", 
            header: () => (
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("order_id")}>
                    Order ID
                    <span>{sortConfig.key === "order_id" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}</span>
                </div>
            ),
            cell: (info) => info.row.original.order_id 
        },
        {
            id: "payment",
            header: "Payment",
            cell: (info) => {
                const paymentStatus = info.row.original.payment;
                const bgColor = paymentStatus === "Refunded" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800";
                return (
                    <div className={`inline-block px-4 py-2 rounded-full text-xs font-medium ${bgColor}`}>
                        {paymentStatus}
                    </div>
                );
            },
        },
        {
            id: "payment_type",
            header: "Payment Type",
            cell: (info) => {
                const paymentType = info.row.original.payment_type;
                const cloudColor =
                    paymentType === "Card"
                        ? "bg-green-200 text-green-800"
                        : paymentType === "Cash"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-blue-200 text-blue-800";

                return (
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${cloudColor}`}>
                        {paymentType}
                    </div>
                );
            },
        },
        { 
            id: "product_count", 
            header: () => (
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("product_count")}>
                    Product Count
                    <span>{sortConfig.key === "product_count" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}</span>
                </div>
            ),
            cell: (info) => info.row.original.product_count 
        },
        { 
            id: "total_amount", 
            header: () => (
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("total_amount")}>
                    Total Amount
                    <span>{sortConfig.key === "total_amount" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}</span>
                </div>
            ),
            cell: (info) => `₹${info.row.original.total_amount.toFixed(2)}`
        },
        {
            id: "orderDetail",
            header: "Order Detail",
            cell: (info) => (
                <button
                    onClick={() => handleOrderDetailClick(info.row.original)}
                    className="bg-blue-100 text-blue-700 text-sm py-1 px-2 rounded-full whitespace-nowrap cursor-pointer"
                >
                    View Details
                </button>
            ),
        },
        {
            id: "refund",
            header: "Refund",
            cell: (info) => (
                <button
                    onClick={() => handleRefund(info.row.original)}
                    className={`text-sm py-1 px-3 rounded-full whitespace-nowrap cursor-pointer ${
                        info.row.original.payment === "Refunded"
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-red-200 text-red-800"
                    }`}
                    disabled={info.row.original.payment === "Refunded"}
                >
                    Refund
                </button>
            ),
        },
    ];

    return (
        <>
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-4 ml-3">
                <h1 className="text-xl font-semibold text-gray-800">❌ Cancelled Orders</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Here’s a list of <span className="text-gray-900 font-semibold">❌ Cancelled Orders</span> 🛑 and
                    💰 refunded orders.
                </p>

                {/* Search Box */}
                <div className="mt-5 flex w-full">
                    <input
                        type="text"
                        placeholder="🔍 Search by order ID..."
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
                <CancelOrderDetails
                    order={selectedOrder}
                    onClose={handleCloseOrderDetail}
                    chartData={{ data: [50, 50], labels: ["Product 1", "Product 2"] }} // Providing chartData to fix TypeScript error
                />
            )}
        </>
    );
};

export default Cancelled_Orders;
