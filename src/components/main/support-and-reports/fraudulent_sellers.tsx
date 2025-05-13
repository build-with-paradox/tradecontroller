"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import ReusableTable from "@/components/ui/ReusableTable";

// Fake data for sellers
const sellersData = [
  { id: 1, username: "john_seller", email: "john.seller@example.com", status: "Active", totalProducts: 50, totalRevenue: 50000 },
  { id: 2, username: "jane_seller", email: "jane.seller@example.com", status: "Active", totalProducts: 120, totalRevenue: 120000 },
  { id: 3, username: "sam_seller", email: "sam.seller@example.com", status: "Banned", totalProducts: 30, totalRevenue: 30000 },
  { id: 4, username: "chris_seller", email: "chris.seller@example.com", status: "Active", totalProducts: 75, totalRevenue: 75000 },
];

// Define the columns for the table
const columns: ColumnDef<typeof sellersData[0]>[] = [
  {
    id: "sno",
    header: "S.No",
    cell: (info) => info.row.index + 1 + ".",
  },
  {
    id: "username",
    header: "Username",
    cell: (info) => info.row.original.username,
  },
  {
    id: "email",
    header: "Email",
    cell: (info) => info.row.original.email,
  },
  {
    id: "status",
    header: "Status",
    cell: (info) => {
      const status = info.row.original.status;
      return (
        <span
          className={`px-3 py-2 rounded-full text-sm font-medium ${
            status === "Active" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-700"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "totalProducts",
    header: "Total Products",
    cell: (info) => info.row.original.totalProducts,
  },
  {
    id: "totalRevenue",
    header: "Total Revenue",
    cell: (info) => `$${info.row.original.totalRevenue.toLocaleString()}`,
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
          className={`px-3 py-2 rounded-full text-sm font-medium cursor-pointer ${
            status === "Active" ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-700"
          }`}
        >
          {status === "Active" ? "Ban" : "Unban"}
        </button>
      );
    },
  },
];

const Fraudulent_Sellers = () => {
  return (
    <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-2 mt-4 mx-4">
      <h1 className="text-3xl font-semibold text-gray-800 mt-2 ml-3">Fraudulent Sellers Overview</h1>
      <p className="text-lg text-gray-600 mt-3 ml-3">
        📊 Here's a snapshot of <span className="text-gray-900 font-semibold">Fraudulent Sellers</span>, including their status, total products, and revenue.
      </p>

      <div className="flex-1 bg-white rounded-lg overflow-hidden">
        <ReusableTable columns={columns} data={sellersData} perpage={5} />
      </div>
    </div>
  );
};

export default Fraudulent_Sellers;
