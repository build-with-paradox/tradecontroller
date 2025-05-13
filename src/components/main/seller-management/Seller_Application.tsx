"use client";

import React, { useState } from "react";
import ReusableTable from "@/components/ui/ReusableTable";

const Seller_Application = () => {

    const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      id: "sno",
      header: "S.No.",
      cell: (info: any) => info.row.index + 1 + ".",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "storeName",
      header: "Store Name",
    },
    {
      accessorKey: "documents",
      header: "Documents",
      cell: () => (
        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium cursor-pointer">
          Docs
        </button>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium cursor-pointer">
            Approve
          </button>
          <button className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium cursor-pointer">
            Disapprove
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      username: "john_doe",
      email: "john@example.com",
      storeName: "Doe Electronics",
    },
    {
      username: "alice_wonder",
      email: "alice@example.com",
      storeName: "Alice's Handmade Crafts",
    },
    {
      username: "mike_tyson",
      email: "mike@example.com",
      storeName: "Tyson Sports Gear",
    },
  ];

  const filteredData = data.filter(
    (seller) =>
      seller.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-5 mx-4">
      <h1 className="text-2xl font-semibold text-gray-800">Sellers Applications</h1>
      <p className="text-base text-gray-600 mt-2">
        📊 Here's a snapshot of{" "}
        <span className="text-gray-900 font-semibold">All Newly Submitted Seller Applications</span>{" "}
        with their usernames, emails, company/store names, and required documents.
      </p>

      <div className="mt-5 flex justify-end">
      <input
          type="text"
          placeholder="🔍 Search by username or store name..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <ReusableTable columns={columns} data={filteredData} perpage={2}/>
      </div>
    </div>
  );
};

export default Seller_Application;
