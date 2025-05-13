"use client";

import React from "react";
import { CiFileOn } from "react-icons/ci";

const transactions = [
  {
    id: "#12345",
    items: 3,
    date: "March 14, 2025",
    totalCost: "₹2,500",
    paid: true,
    images: [
      "https://m.media-amazon.com/images/I/31WT3X-vk8L._SX342_SY445_.jpg",
      "https://m.media-amazon.com/images/I/61UCYmEBklL._SY741_.jpg",
      "https://m.media-amazon.com/images/I/617j6Lo0bZL._SY741_.jpg",
    ],
  },
  {
    id: "#12346",
    items: 2,
    date: "March 13, 2025",
    totalCost: "₹1,800",
    paid: false,
    images: [
      "https://m.media-amazon.com/images/I/51U8BM3JwBL._SY695_.jpg",
      "https://m.media-amazon.com/images/I/51wBFzVxrFL._SY695_.jpg",
    ],
  },
  {
    id: "#12347",
    items: 4,
    date: "March 12, 2025",
    totalCost: "₹3,200",
    paid: true,
    images: [
      "https://m.media-amazon.com/images/I/61XL8VtS4FL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71m-irzinzL._SY741_.jpg",
      "https://m.media-amazon.com/images/I/51TMjj-XwAL._SX569_.jpg",
    ],
  },
];

const RecentTransactions = () => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-3">
      {/* Header */}
      <div className="flex items-center mb-4">
        <CiFileOn className="text-gray-600" size={20} />
        <h2 className="text-md font-semibold text-gray-800 ml-2">
          Recent Transactions
        </h2>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow-sm"
          >
            {/* Images */}
            <div className="flex -space-x-2">
              {transaction.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Product"
                  className="w-10 h-10 rounded-full border border-white shadow-sm"
                  style={{ zIndex: transaction.images.length - i }}
                />
              ))}
            </div>

            {/* Order Details */}
            <div className="flex-1 text-gray-700 ml-4">
              <p className="font-medium text-sm">Order ID: {transaction.id}</p>
              <div className="flex text-xs text-gray-600 space-x-4">
                <p>{transaction.items} items</p>
                <p>{transaction.date}</p>
              </div>
            </div>

            {/* Total Cost */}
            <p className="font-semibold text-gray-800 text-sm">
              {transaction.totalCost}
            </p>

            {/* Payment Status */}
            <div
              className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                transaction.paid
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {transaction.paid ? (
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-700 text-white mr-2 text-xs">
                  ✓
                </div>
              ) : null}
              {transaction.paid ? "Paid" : "Cash on delivery"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
