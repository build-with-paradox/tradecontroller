"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import ReusableTable from "@/components/ui/ReusableTable";

// Fake data for customers
const customersData = [
  { id: 1, username: "john_doe", email: "john.doe@example.com", status: "Active", cartItems: 3, boughtProducts: ["Laptop", "Headphones"], totalSpent: 1200 },
  { id: 2, username: "jane_smith", email: "jane.smith@example.com", status: "Active", cartItems: 5, boughtProducts: ["Smartphone", "T-shirt", "Shoes"], totalSpent: 900 },
  { id: 3, username: "sam_lee", email: "sam.lee@example.com", status: "Banned", cartItems: 2, boughtProducts: ["Watch"], totalSpent: 250 },
  { id: 4, username: "chris_brown", email: "chris.brown@example.com", status: "Active", cartItems: 0, boughtProducts: ["Tablet"], totalSpent: 350 },
];


const handleOpenCartItems = (customerId: number) => {
    alert(`Open cart items popup for customer ${customerId}`);
  };

  const handleOpenBoughtProducts = (customerId: number) => {
    alert(`Open bought products popup for customer ${customerId}`);
  };
// Define the columns for the table
const columns: ColumnDef<typeof customersData[0]>[] = [
  {
    id: "sno",
    header: "S.No.",
    cell: (info) => info.row.index + 1 + ".",
  },
  {
    id: "username",
    header: "Username",
    cell: (info) => <span className="whitespace-nowrap">{info.row.original.username}</span>,
  },
  {
    id: "email",
    header: "Email",
    cell: (info) => (
      <span className="block w-[10rem] ">{info.row.original.email}</span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (info) => {
      const status = info.row.original.status;
      return (
        <span
          className={`px-2 py-1 rounded-full  text-sm font-medium whitespace-nowrap ${
            status === "Active" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-700"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "cartItems",
    header: "Cart Items",
    cell: (info) => (
      <button
        onClick={() => handleOpenCartItems(info.row.original.id)}
        className="px-3 py-1 rounded-full w-[5rem] h-[2rem] bg-blue-100 text-blue-700 text-xs font-medium"
      >
        {info.row.original.cartItems} Items
      </button>
    ),
  },
  {
    id: "boughtProducts",
    header: "Bought",
    cell: (info) => (
      <button
        onClick={() => handleOpenBoughtProducts(info.row.original.id)}
        className="px-3 py-1 rounded-full w-[5rem] h-[2rem] bg-green-100 text-green-700 text-xs font-medium"
      >
        {info.row.original.boughtProducts.length} Prod.
      </button>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (info) => {
      const [status, setStatus] = useState(info.row.original.status);

      const handleBanToggle = () => {
        setStatus((prevStatus) => (prevStatus === "Active" ? "Banned" : "Active"));
      };

      return (
        <button
          onClick={handleBanToggle}
          className={`px-3 py-1 rounded-full w-[5rem] h-[2rem] text-white text-xs font-medium ${
            status === "Active" ? "bg-indigo-600 opacity-72 hover:bg-indigo-700" : "bg-gray-500 hover:bg-gray-600"
          } `}
        >
          {status === "Active" ? "Ban" : "Unban"}
        </button>
      );
    },
  },

];

const Customers = () => {
  // These are placeholders for the popup windows (you can implement modals or new pages for these)


  return (
    <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-10 mt-4 mx-4">
      <h1 className="text-3xl font-semibold text-gray-800 mt-2 ml-3">Customers Overview</h1>
      <p className="text-md text-gray-600 mt-3 ml-3">
        📊 Here's a snapshot of <span className="text-gray-900 font-semibold">Customers</span>, including their status, cart items, bought products, and total spent.
      </p>

      {/* Reusable table displaying customers */}
      <div className="flex-1 bg-white w-full rounded-lg overflow-hidden">
        <ReusableTable columns={columns} data={customersData} perpage={5} />
      </div>
    </div>
  );
};

export default Customers;
