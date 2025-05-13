"use client";

import React, { useState } from "react";
import ReusableTable from "@/components/ui/ReusableTable";

const Approved_Sellers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bannedSellers, setBannedSellers] = useState<{ [key: string]: boolean }>({});

  const toggleBan = (username: string) => {
    setBannedSellers((prev) => ({
      ...prev,
      [username]: !prev[username], // Toggle the ban status
    }));
  };

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
      accessorKey: "businessType",
      header: "Business Type",
    },
    {
      accessorKey: "rating",
      header: "Overall Rating",
      cell: (info: any) => {
        const rating = info.getValue();
        return (
          <div className="flex items-center">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="ml-1 font-medium">{rating} / 5</span>
          </div>
        );
      },
    },
    {
      accessorKey: "ban",
      header: "Ban/Unban",
      cell: (info: any) => {
        const username = info.row.original.username;
        const isBanned = bannedSellers[username] || false;

        return (
          <button
            onClick={() => toggleBan(username)}
            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
              isBanned ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {isBanned ? "Unban" : "Ban"}
          </button>
        );
      },
    },
  ];

  const data = [
    {
      username: "john_doe",
      email: "john@example.com",
      storeName: "Doe Electronics",
      businessType: "Retail",
      rating: 4.8,
    },
    {
      username: "alice_wonder",
      email: "alice@example.com",
      storeName: "Alice's Handmade Crafts",
      businessType: "Handmade",
      rating: 4.6,
    },
    {
      username: "mike_tyson",
      email: "mike@example.com",
      storeName: "Tyson Sports Gear",
      businessType: "Sports Equipment",
      rating: 4.9,
    },
  ];

  const filteredData = data.filter(
    (seller) =>
      seller.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mt-5 mx-4">
      <h1 className="text-2xl font-semibold text-gray-800">Approved Sellers Applications</h1>
      <p className="text-base text-gray-600 mt-2">
        📊 Here's a snapshot of{" "}
        <span className="text-gray-900 font-semibold">All Approved Sellers</span>{" "}
        with their usernames, emails, overall ratings, business type, store name, and ban/unban status.
      </p>

      {/* Search Bar */}
      <div className="mt-5 flex justify-end">
      <input
          type="text"
          placeholder="🔍 Search by username or store name..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="mt-2">
        <ReusableTable columns={columns} data={filteredData} perpage={2}/>
      </div>
    </div>
  );
};

export default Approved_Sellers;
