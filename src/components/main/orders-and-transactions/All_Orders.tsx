"use client";

import React, { useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import ReusableTable from "@/components/ui/ReusableTable"; // Import your reusable table component
import { OrderInterface } from '@/types/OrderTypes';
import OrderDetails from '@/components/modals-and-popups/Order_details';

// Fake data for orders
const orders = [
    {
      id: 1,
      order_id: "ORD12345",
      username: "john_doe",
      email: "john@example.com",
      payment: "Card Payment",
      payment_type: "Card",  // Combined Debit and Credit Card as 'Card'
      product_count: 3,
      total_amount: 99.99,
      storeName: "John's Electronics Store",  // Added realistic store name
      totalRevenue: 500.00, // Example revenue for the store
      orderDetails: [
        { 
          id: 1, 
          product: "AUSK Mens Hoodies", 
          image: "https://m.media-amazon.com/images/I/51TMjj-XwAL._SX569_.jpg", 
          description: "Regular Fit Full Sleeve.", 
          color: "Black", 
          qty: 2, 
          price: 35.99, 
          total: 71.98 
        },
        { 
          id: 2, 
          product: " Richscot Mens Stylish Trackpant with Cargo Pocket", 
          image: "https://m.media-amazon.com/images/I/61C45VQjoXL._SY741_.jpg", 
          description: "Portable power bank with 10000mAh capacity, fast charging, and multiple ports for devices.", 
          color: "Black", 
          qty: 1, 
          price: 28.99, 
          total: 28.99 
        },
        { 
          id: 3, 
          product: "Smartphone Stand", 
          image: "https://m.media-amazon.com/images/I/31aFR1dtSaL.jpg", 
          description: "Adjustable smartphone stand for hands-free viewing, perfect for video calls and media consumption.", 
          color: "Silver", 
          qty: 1, 
          price: 12.99, 
          total: 12.99 
        }
      ]
    },
    {
      id: 2,
      order_id: "ORD12346",
      username: "alice_smith",
      email: "alice@example.com",
      payment: "Online Payment",
      payment_type: "GPay",
      product_count: 2,
      total_amount: 84.95,
      storeName: "Alice's Kitchen Supplies",
      totalRevenue: 650.00,
      orderDetails: [
        { 
          id: 1, 
          product: "Non-Stick Cookware Set", 
          image: "https://m.media-amazon.com/images/I/61w2eRTCulL._SL1500_.jpg", 
          description: "A complete set of non-stick cookware, perfect for everyday cooking with easy cleanup.", 
          color: "Gray", 
          qty: 1, 
          price: 49.99, 
          total: 49.99 
        },
        { 
          id: 2, 
          product: "Stainless Steel Knife Set", 
          image:"https://m.media-amazon.com/images/I/51xQyGixaAL._SX679_.jpg", 
          description: "A set of high-quality stainless steel kitchen knives with ergonomic handles.", 
          color: "Silver", 
          qty: 1, 
          price: 34.96, 
          total: 34.96 
        }
      ]
    }
  ];
  

const All_Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false); // To control the popup visibility
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on search term (usernames or emails)
  const filteredOrders = orders.filter(
    (order) =>
      order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle closing of the OrderDetails popup
  const handleCloseOrderDetail = () => {
    setIsOrderDetailOpen(false);
    setSelectedOrder(null);
  };

  // Define the columns for the table
  const columns: ColumnDef<typeof orders[0]>[] = [
    { id: "username", header: "Username", cell: (info) => info.row.original.username },
    { id: "email", header: "Email", cell: (info) => info.row.original.email },
    {
      id: "payment",
      header: "Payment",
      cell: (info) => {
        const paymentStatus = info.row.original.payment;

        let cloudStyle = "px-4 py-2 rounded-full text-sm font-medium ";
        let cloudColor = "";

        if (paymentStatus === "Card Payment") {
          cloudColor = "bg-green-200 text-green-800"; 
        } else if (paymentStatus === "Cash on Delivery") {
          cloudColor = "bg-yellow-200 text-yellow-800"; 
        } else if (paymentStatus === "Online Payment") {
          cloudColor = "bg-blue-200 text-blue-800"; 
        }

        return (
          <div className={`inline-block whitespace-nowrap ${cloudStyle} ${cloudColor}`}>
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

        let cloudStyle = "px-4 py-2 rounded-full text-sm font-medium ";
        let cloudColor = "";

        if (paymentType === "Card") {
          cloudColor = "bg-green-200 text-green-800"; // Card (Green)
        } else if (paymentType === "Cash") {
          cloudColor = "bg-yellow-200 text-yellow-800"; // Cash (Yellow)
        } else if (paymentType === "PayPal" || "GPay" || "Paytm" || "Apple Pay") {
          cloudColor = "bg-blue-200 text-blue-800"; // PayPal (Blue)
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

  // Handle order detail click
  const handleOrderDetailClick = (order: OrderInterface) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

  return (
    <>
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-4 ml-3">
        <h1 className="text-xl font-semibold text-gray-800">All Orders</h1>
        <p className="text-sm text-gray-600 mt-2">
          Here's a snapshot of <span className="text-gray-900 font-semibold">All Orders</span> with order_id, payment status, payment type, product count, and total amount
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
          chartData={{ data: [40, 60], labels: ['Product 1', 'Product 2'] }} // Example chart data
        />
      )}
    </>
  );
};

export default All_Orders;
