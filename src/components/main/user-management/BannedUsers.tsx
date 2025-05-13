"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import ReusableTable from "@/components/ui/ReusableTable";
import PieChart from "@/components/charts/PieChart";

// Fake data for banned users
const bannedUsersData = [
    { id: 1, username: "john_doe", email: "john.doe@example.com", usertype: "Buyer", status: "Banned" },
    { id: 2, username: "jane_smith", email: "jane.smith@example.com", usertype: "Seller", status: "Banned" },
    { id: 3, username: "sam_lee", email: "sam.lee@example.com", usertype: "Buyer", status: "Banned" },
    { id: 4, username: "chris_brown", email: "chris.brown@example.com", usertype: "Seller", status: "Banned" },
];

const handleUnbanUser = (userId: number) => {
    alert(`Unban user with ID: ${userId}`);
};

// Calculate the number of Buyers and Sellers
const userTypeCounts = bannedUsersData.reduce(
    (acc, user) => {
        if (user.usertype === "Buyer") acc.buyers += 1;
        if (user.usertype === "Seller") acc.sellers += 1;
        return acc;
    },
    { buyers: 0, sellers: 0 }
);

// Define the columns for the banned users table
const columns: ColumnDef<typeof bannedUsersData[0]>[] = [
    {
    id: "sno",
    header: "S.No.",
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
        cell: (info) => {
             const email = info.row.original.email;

             return(
                <span
                    className="px-2 py-1 rounded-full text-sm -ml-5"
                >
                    {email}
                </span>
             )
        }
    },
    {
        id: "usertype",
        header: "User Type",
        cell: (info) => {
            const userType = info.row.original.usertype;
            return (
                <span
                    className={`px-2 py-1 rounded-full text-sm ${userType === "Buyer" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-700"
                        }`}
                >
                    {userType}
                </span>
            );
        },
    },
    {
        id: "status",
        header: "Status",
        cell: (info) => (
            <span className="px-3 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700">
                {info.row.original.status}
            </span>
        ),
    },
    {
        id: "action",
        header: "Action",
        cell: (info) => {
            return (
                <button
                    onClick={() => handleUnbanUser(info.row.original.id)}
                    className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm cursor-pointer"
                >
                    Unban
                </button>
            );
        },
    },
];

const BannedUsers = () => {
    return (
        <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-2 mt-4 mx-4">
            <h1 className="text-3xl font-semibold text-gray-800 mt-2 ml-3">Banned Users</h1>
            <p className="text-md text-gray-600 mt-3 ml-3 ">
                🚫 These are the users who are currently banned. You can unban them if needed.
            </p>

            {/* Flex container to display table and pie chart side by side */}
            <div className="flex justify-between items-start gap-5">
                {/* Reusable table displaying banned users */}
                <div className="flex-1 bg-white rounded-lg overflow-hidden">
                    <ReusableTable columns={columns} data={bannedUsersData} perpage={5} />
                </div>

                {/* Pie chart displaying user type distribution */}
                <div className="flex-none shadow-md rounded-lg p-5 -ml-8 mt-10">
                    <h2 className="text-sm font-semibold text-gray-800 ">Banned Users Distribution</h2>
                    <PieChart
                        data={[userTypeCounts.buyers, userTypeCounts.sellers]}
                        labels={["Buyers", "Sellers"]}
                        width={200}
                        height={250}
                    />
                </div>
            </div>
        </div>
    );
};

export default BannedUsers;
