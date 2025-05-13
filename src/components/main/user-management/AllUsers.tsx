import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import ReusableTable from "@/components/ui/ReusableTable";
import PieChart from "@/components/charts/PieChart"; // Import PieChart instead of BarChart

// Fake data for All Users with username, email, and user type
const allUsersData = [
  { id: 1, username: "john_doe", email: "john@example.com", userType: "Customer" },
  { id: 2, username: "jane_smith", email: "jane@example.com", userType: "Seller" },
  { id: 3, username: "sam_wilson", email: "sam@example.com", userType: "Customer" },
  { id: 4, username: "chris_brown", email: "chris@example.com", userType: "Seller" },
  { id: 5, username: "patricia_lee", email: "patricia@example.com", userType: "Customer" },
];

// Define the columns for the table
const columns: ColumnDef<typeof allUsersData[0]>[] = [
  {
    id: "sno",
    header: "S.No",
    cell: (info) => info.row.index + 1 + ".", // Generates serial number dynamically
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
    id: "userType",
    header: "User Type",
    cell: (info) => {
      const userType = info.row.original.userType;
      return (
        <span className={`px-2 py-1 rounded-full ${userType === "Customer" ? "bg-blue-200 text-blue-700" : "bg-[#D4DAE4] text-gray-500"}`}>
          {userType}
        </span>
      );
    },
  },
];

const AllUsers = () => {
  // Prepare the chart data (Customer vs Seller distribution for Pie chart)
  const customerCount = allUsersData.filter((user) => user.userType === "Customer").length;
  const sellerCount = allUsersData.filter((user) => user.userType === "Seller").length;
  const [searchQuery, setSearchQuery] = useState("");
  
  const pieChartData = [customerCount, sellerCount];
  const pieChartLabels = ["Customers", "Sellers"];

  const filteredData = allUsersData.filter(
    (seller) =>
      seller.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mt-3 ml-10">
      <h1 className="text-2xl font-semibold text-gray-800">All Users Overview</h1>
      <p className="text-base text-gray-600 mt-2">
        📊 Here's a snapshot of <span className="text-gray-900 font-semibold">All Users</span> with their usernames, emails, and user types (Customer or Seller).
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

      {/* Flex container for Table and PieChart */}
      <div className="flex gap-6 mt-6">
        {/* Reusable table displaying all users */}
        <div className="flex-1">
          <ReusableTable columns={columns} data={filteredData} perpage={3} />
        </div>

        {/* Pie chart displaying user type distribution (Customers vs Sellers) */}
        <div className="flex-1">
          <div className="shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">User Type Distribution</h2>
            <PieChart data={pieChartData} labels={pieChartLabels} width={250} height={250}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
